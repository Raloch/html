import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Icon,message ,Select} from 'antd'
import { BeforeSendPost, Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import { inject, observer } from 'mobx-react'
import Cookies from 'js-cookie'
import boundSuc from '../img/boundSuccess.png'
import emailPng from '../img/emailPng.png'
import transNum from '../img/transNum.png'
import Phone from '../img/phone.png'
import googlePng from '../img/googlePng.png'
const FormItem = Form.Item
const Option = Select.Option;

@inject('store')
@observer
class PhoChangeTwo extends Component {
    constructor(){
        super()
    }
    state={
        codeHtml:'获取短信验证码',
        timeAll: 60,
        codeDisType:false,
        email: Cookies.get('account')
    }
    countDown = () => {
        var num = this.state.timeAll;
        var _this = this;
        setTimeout(function(){
            if(num){
                _this.setState({codeHtml:num + '秒后重新获取',codeDisType:true})
                _this.state.timeAll = num - 1;
                _this.countDown();
            }else {
                _this.setState({codeHtml: '获取邮箱验证码',codeDisType:false})
                _this.state.timeAll = 60;
            } 
        },1000)
    }
    // 获取短信验证码
    getPhoMessage = ()=>{
        let _this=this
        let inputPhoNumber = this.props.form.getFieldValue('changePhoNumber')
        if (inputPhoNumber == "" || inputPhoNumber == undefined || inputPhoNumber.length !== 11) {
            message.error('请填写正确的手机号码')
            return
        } 

        this.setState({codeLoading:true})
        // let captcha = new TencentCaptcha('2027665311', function(res) {
        //     if(res.ret == 0){
                let obj = {
                    type: 'phone-check',
                    email: _this.state.email,
                    phone: inputPhoNumber,
                    // userip: res.appid,
                    // ticket: res.ticket,
                    // randstr: res.randstr
                }
                BeforeSendPost("/api/v1/user/phone_code", obj, function(d){
                    if(d.result) {
                        message.success('已向您的手机号发送了验证短信，请注意查收');
                        _this.countDown()
                    }else {
                        // message.error(GetErrorMsg(d));
                        message.error('获取失败!');
                    }
                });
        //     }
        // });
        // captcha.show();
        setTimeout(() => {  
            this.setState({ codeLoading: false});
        }, 3000);
    }

    // 点击下一步
    phoChangeNextSuc= (e) => {
        let _this = this;
        let inputPhoNumber = this.props.form.getFieldValue('changePhoNumber');
        let newInputPhoCode = this.props.form.getFieldValue('newInputPhoCode');
        if(newInputPhoCode == '' || newInputPhoCode == undefined){
            message.error('手机验证码不能为空')
            return
        }else if(newInputPhoCode.length !== 6){
            message.error('验证码有误')
        }
        if (inputPhoNumber == "" || inputPhoNumber == undefined || inputPhoNumber.length !== 11) {
            message.error('请填写正确的手机号码')
            return
        } 
        let objPho = {
            phone: inputPhoNumber,
            email: this.state.email,
            code: newInputPhoCode
        }
        console.log(this.props)
        // if (this.props.oldPhoCode) {
            BeforeSendPost("/api/v1/user/bind-phone", objPho, function (d) {
                if (d.result) {
                    _this.props.changeNextThree()
                    setTimeout(()=>{
                        location.reload(true)
                    },1000)
                } else {
                    if (d.code == 5006) {
                        _this.props.codeExpires()
                        message.error('验证码过期');
                        return
                    } else if (d.code == 7001) {
                        message.error('该手机号已经被注册');
                        return
                    } else if (d.code == -50004){
                        message.error('验证码错误');
                        return
                    } 
                    // message.error(GetErrorMsg(d));
                    message.error('获取失败!');
                }
            })
        // }
        // let objAut = {
        //     authtoken: this.props.oldGoogleCode,
        //     emailcode : this.props.emailCode,
        //     newphonecode: newInputPhoCode,
        //     phone:inputPhoNumber
        // }
        // if(this.props.oldGoogleCode){
        //     CgicallPost("/apiv1/user/modifyBindPhoneWithAuth",objAut,function(d){
        //         if(d.result) {
        //             _this.props.changeNextThree()
        //         }else {
        //             message.error(GetErrorMsg(d));
        //             if(d.error.code==5006){
        //                 _this.props.codeExpires()
        //             }
        //         } 
        //     });
        // }
    }
    render(){
        const { getFieldDecorator } = this.props.form
        const { loading,loadingLogin } = this.props.store
        const selectPhoAfter = getFieldDecorator('prefix', {
        initialValue: 'china',
        })(
        <Select className='selectCouPho'>
            <Option value="china">中国</Option>
            <Option value="america">美国</Option>
            <Option value="france">法国</Option>
            <Option value="britain">英国</Option>
            <Option value="korea">韩国</Option>
            <Option value="Japan">日本</Option>
            <Option value="canada">加拿大</Option>
            <Option value="brazil">巴西</Option>
        </Select>
        );
        return (
            <Form className='pho-input-two'>
                <FormItem className='pho-input-two-wrapper'>
                    {getFieldDecorator('changePhoNumber', {
                        rules: [{ required: true, message: '请输入手机号' }],
                    })(
                        // <Input autocomplete="off" prefix={<Icon type="user" />} placeholder="手机号/邮箱" />
                        <Input 
                            className='pho-input-email'
                            placeholder="输入手机号" 
                            size="large" 
                            prefix={<img className='pho-input-emailimg'style={{height:'20px',width:'14px'}} src={Phone}/>} 
                            addonAfter={selectPhoAfter}
                             />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('newInputPhoCode', {
                        rules: [{ required: true, message: '请输入验证码' }],
                    })(
                        // <Input autocomplete="new-password"  prefix={<span className='font icon-mima'></span>} type="password" placeholder="admin" />
                        <Input 
                        className='pho-input-trans' 
                        size="large" 
                        prefix={<img className='pho-input-emailimg' style={{width:'20px'}} src={transNum}/>} 
                        placeholder="输入验证码"
                        addonAfter={
                            <Button 
                                size="large" 
                                disabled={this.state.codeDisType} 
                                onClick={this.getPhoMessage}
                                loading={this.state.codeLoading} 
                                type="primary">
                                {this.state.codeHtml}
                            </Button>}
                        />
                    )}
                </FormItem>
                <Button className='nextMessageNum' type="primary" onClick={this.phoChangeNextSuc}>下一步</Button>
            </Form>
        )
    }
}

export default Form.create()(PhoChangeTwo);
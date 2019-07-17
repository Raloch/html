import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Icon ,message} from 'antd'
import { BeforeSendPost, Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import { inject, observer } from 'mobx-react'
import boundSuc from '../img/boundSuccess.png'
import emailPng from '../img/emailPng.png'
import transNum from '../img/transNum.png'
import googlePng from '../img/googlePng.png'
const FormItem = Form.Item

@inject('store')
@observer
class PhoChangeOne extends Component {
    constructor(){
        super()
    }
    state={
        codeHtml:'获取邮箱验证码',
        // codePhoHtml:'获取短信验证码',
        timeAll: 60,
        timePhoAll:60,
        codeDisType:false,
        codePhoType:false,
        arr:[],
        type: '',
        changePho:'phone',
        changeGoogle:'google',
        codeLoading:false,
    }
    // 邮箱验证码倒计时
    countDown = () => {
        let num = this.state.timeAll;
        let _this = this;
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
    // 获取邮箱验证码
    getEmailMessage=()=>{
        let _this=this
        this.setState({codeLoading:true})
        let captcha = new TencentCaptcha('2027665311', function(res) {
            if(res.ret == 0){
                let obj = {
                    type: 'email-check',
                    email: _this.props.email,
                    userip: res.appid,
                    ticket: res.ticket,
                    randstr: res.randstr
                }
                BeforeSendPost("/api/v1/user/email_code", obj, function(d){
                    if(d.code == 0) {
                        message.success('已向您的邮箱发送了验证邮件，请注意查收');
                        _this.countDown()
        
                    }else {
                        // message.error(GetErrorMsg(d));
                        message.error('获取失败!');
                    }
                });
            }
        });
        captcha.show();
        setTimeout(() => {  
            this.setState({ codeLoading: false});
        }, 3000);
    }
    // 手机验证码倒计时
    countPhoDown = () => {
        let numChange = this.state.timePhoAll;
        let _this = this;
        setTimeout(function(){
            if(numChange){
                _this.setState({codePhoHtml:numChange + '秒后重新获取',codePhoType:true})
                _this.state.timePhoAll = numChange - 1;
                _this.countPhoDown();
            }else {
                _this.setState({codePhoHtml: '获取短信验证码',codePhoType:false})
                _this.state.timePhoAll = 60;
            } 
        },1000)
    }
    // 获取手机验证码
    getPhoMessage = () => {
        let _this=this
        this.setState({codeLoading:true})
        // let captcha = new TencentCaptcha('2027665311', function(res) {
        //     if(res.ret == 0){
                let obj = {
                    type: 'phone-check',
                    phone: _this.props.phone,
                    email: _this.props.email,
                    // userip: res.appid,
                    // ticket: res.ticket,
                    // randstr: res.randstr
                }
                BeforeSendPost("/api/v1/user/phone_code", obj, function(d){
                    if(d.result) {
                        message.success('已向您的手机号发送了验证短信，请注意查收');
                        _this.countPhoDown()
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
    changeType = (e) => {
        this.setState({
            type:e
        }) 
    }
    componentWillMount =()=>{
        if(this.props.isAuthentication) this.state.arr.push("google")
        if(this.props.phone) this.state.arr.push("phone");
    }

    // 点击下一步
    changePhoNext = (e) => {
        let _this=this
        let changeGoogleCode = this.props.form.getFieldValue('changeGoogleInputCode')
        let changePhoCode = this.props.form.getFieldValue('changePhoInputCode')
        let changeEmailCode = this.props.form.getFieldValue('changeEmailInputCode')
        // if(this.state.type=='phone'){
        //     if(this.props.phone){
        //         if(changePhoCode == '' || changePhoCode == undefined){
        //             message.error('手机验证码不能为空')
        //             return
        //         }else if(changePhoCode.length !== 6){
        //             message.error('手机验证码输入有误!')
        //         }
        //     }
        // }else if(this.state.type == 'google'){
        //     if(this.props.isAuthentication){
        //         if(changeGoogleCode == '' || changeGoogleCode == undefined){
        //             message.error('google验证码不能为空')
        //             return
        //         }
        //     }
        // }
        if(changeEmailCode == '' || changeEmailCode == undefined){
            message.error('邮箱验证码不能为空')
            return
        }else if(changeEmailCode.length !== 6){
            message.error('邮箱验证码输入有误!')
        }
        let obj = {
            email: this.props.email,
            code : changeEmailCode
        }
        let obj1 = {
            phone: this.props.phone,
            email: this.props.email,
            code : changePhoCode
        }
        BeforeSendPost("/api/v1/user/email_check", obj, function(d){
            if(d.code === -50004){
                message.error('邮箱验证码错误');
                return
            } 
            if(d.code === 0) {
                _this.props.changePassValueTwo({changeGoogleCode, changeEmailCode, changePhoCode})
            }
            // if(d.result) {
            //     BeforeSendPost("/api/v1/user/bind-phone", obj1, function(e){
            //         if(e.result) {
            //         } else {
            //             message.error('手机验证码有误!');
            //             return
            //         } 
            //     })
            // } else {
            //     message.error(GetErrorMsg(d));
            //     message.error('验证码有误!')
            // } 

        })
    }
   /* **************** */
    render(){
        const { getFieldDecorator } = this.props.form
        const { loading,loadingLogin } = this.props.store

        if(!this.state.type) {
            this.state.type = this.state.arr[0];//如果是存在两种认证的时候arr=['google','phone'];
        }
        return (
            <Form className='pho-input-one'>
                 {/* <FormItem>
                    {getFieldDecorator('changePhoInputCode', {
                        rules: [{ required: true, message: '请输入手机验证码' }],
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
                                disabled={this.state.codePhoType} 
                                onClick={this.getPhoMessage}
                                loading={this.state.codeLoading} 
                                type="primary">
                                {this.state.codePhoHtml}
                            </Button>}
                        />
                    )}
                </FormItem> */}
                {/* ********************* */}
                <div style={{display:(this.state.type == 'google')?'block':'none'}} >
                    <FormItem className={(this.state.arr.length > 1)?'changeCode':null}>
                        {getFieldDecorator('changeGoogleInputCode', {
                            rules: [{ required: true, message: '请输入验证码' }],
                        })(
                            // <Input autocomplete="off" prefix={<Icon type="user" />} placeholder="手机号/邮箱" />
                            <Input 
                                className='pho-input-google' 
                                size="large" 
                                prefix={<img className='pho-input-emailimg'style={{width:'20px'}} src={googlePng}/>}
                                />
                        )}
                    </FormItem>
                    <p style={{display:(this.state.arr.length > 1)?"block":"none"}} className='changeGooglePho'>使用<a href="javascript:void(0);" onClick={this.changeType.bind(this,'phone')}>手机验证码</a></p>
                </div> 
                {/* <div style={{display:(this.state.type == 'phone')?'block':'none'}}>
                    <FormItem className={(this.state.arr.length > 1)?'changeCode':null}>
                        {getFieldDecorator('changePhoInputCode', {
                            rules: [{ required: true, message: '请输入手机验证码' }],
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
                                    disabled={this.state.codePhoType}
                                    onClick={this.getPhoMessage}
                                    loading={this.state.codeLoading}
                                    type="primary">
                                    {this.state.codePhoHtml}
                                </Button>}
                            />
                        )}
                    </FormItem>
                    <p style={{display:(this.state.arr.length > 1)?"block":"none"}} className='changeGooglePho'>使用<a href="javascript:void(0);" onClick={this.changeType.bind(this,'google')}>Google验证码</a></p>
                </div>   */}
                {/* ********************* */}
                <FormItem>
                    {getFieldDecorator('emailName', {
                        initialValue:this.props.email
                    })(
                        <Input 
                            className='pho-input-email' 
                            size="large" 
                            prefix={<img className='pho-input-emailimg'style={{width:'20px'}} src={emailPng}/>} 
                            disabled
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('changeEmailInputCode', {
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
                                onClick={this.getEmailMessage}
                                loading={this.state.codeLoading} 
                                type="primary">
                                {this.state.codeHtml}
                            </Button>}
                        />
                    )}
                </FormItem>
                <Button className='nextMessageNum' type="primary" onClick={this.changePhoNext}>下一步</Button>
            </Form>
        )
    }
}

export default Form.create()(PhoChangeOne);
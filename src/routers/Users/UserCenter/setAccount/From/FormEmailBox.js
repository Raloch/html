import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Icon, message } from 'antd'
import { Cgicallget, CgicallPost, GetErrorMsg, BeforeSendPost } from '@/components/Ajax'
import { inject, observer } from 'mobx-react'
import boundSuc from '../img/boundSuccess.png'
import emailPng from '../img/emailPng.png'
import transNum from '../img/transNum.png'
import googlePng from '../img/googlePng.png'

const FormItem = Form.Item

@inject('store')
@observer
class BoundPhoOne extends Component {
    constructor() {
        super()
    }
    state = {
        codeHtml: '获取邮箱验证码',
        timeAll: 60,
        codeDisType: false,
    }
    countDown = () => {
        var num = this.state.timeAll;
        var _this = this;
        setTimeout(function () {
            if (num) {
                _this.setState({ codeHtml: num + '秒后重新获取', codeDisType: true })
                _this.state.timeAll = num - 1;
                _this.countDown();
            } else {
                _this.setState({ codeHtml: '获取邮箱验证码', codeDisType: false })
                _this.state.timeAll = 60;
            }
        }, 1000)
    }

    //获取邮箱验证码
    getEmailMessage = () => {
        let _this = this

        this.setState({codeLoading:true})
        let captcha1 = new TencentCaptcha('2027665311', function(res) {
            if(res.ret === 0){
                _this.setState({codeLoading:true})

                let obj = {
                    type: 'email-check',
                    email: _this.props.email,
                    userip: res.appid,
                    ticket: res.ticket,
                    randstr: res.randstr
                }
                BeforeSendPost("/api/v1/user/email_code", obj, function (d) {
                    if (d.code == 0) {
                        _this.setState({ codeLoading: false});
                        message.success('已向您的邮箱发送了验证邮件，请注意查收');
                        _this.countDown()
                    } else if (d.code == -1) {
                        // message.error(GetErrorMsg(d));
                        message.error('获取失败')
                    }
                })

                // CgicallPost("/api/v1/visitor/email-code",obj,function(d){
                //     if(d.code === 0) {
                //         _this.setState({codeLoading:true})
                //         _this.getAuthCode();
                //     }else {
                //         message.error(GetErrorMsg(d));
                //     }
                    
                // });
            }
        });
        captcha1.show();
        setTimeout(() => {
            this.setState({ codeLoading: false});
        }, 3000);
    }

    //点击下一步
    phoNextNum = (e) => {
        let _this = this
        //验证码
        let inputEmailCode = this.props.form.getFieldValue('inputEmailCode');
        let googleCode = this.props.form.getFieldValue('googleCode') || '';
        if (inputEmailCode == '' || inputEmailCode == undefined) {
            message.error('邮箱验证码不能为空')
            return
        }else if(inputEmailCode.length !== 6){
            message.error('验证码输入有误!')
        }
        if (this.props.isAuthentication) {
            if (googleCode == '' || googleCode == undefined) {
                message.error('Google验证码不能为空')
                return
            }
        }
        let obj = {
            email: _this.props.email,
            code: inputEmailCode,
        }
        BeforeSendPost("/api/v1/user/email_code_check", obj, function (d) {
            if (d.code == 0) {
                _this.props.passValueTwo({ inputEmailCode, googleCode })
            } else {
                // message.error(GetErrorMsg(d));
                message.error('验证码输入有误!')
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { loading, loadingLogin } = this.props.store
        return (
            <Form className='pho-input-one'>
                {
                    this.props.isAuthentication ?
                        <FormItem>
                            {getFieldDecorator('googleCode', {
                                rules: [{ required: true, message: '请输入验证码' }],
                            })(
                                // <Input autocomplete="off" prefix={<Icon type="user" />} placeholder="手机号/邮箱" />
                                <Input
                                    className='pho-input-google'
                                    size="large"
                                    prefix={<img className='pho-input-emailimg' style={{ width: '20px' }} src={googlePng} />}
                                />
                            )}
                        </FormItem> : null
                }
                <FormItem>
                    {getFieldDecorator('userName', {
                        initialValue: this.props.email
                    })(
                        // <Input autocomplete="off" prefix={<Icon type="user" />} placeholder="手机号/邮箱" />
                        <Input
                            className='pho-input-email'
                            size="large"
                            prefix={<img className='pho-input-emailimg' style={{ width: '20px' }} src={emailPng} />}
                            disabled
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('inputEmailCode', {
                        rules: [{ required: true, message: '请输入验证码' }],
                    })(
                        // <Input autocomplete="new-password"  prefix={<span className='font icon-mima'></span>} type="password" placeholder="admin" />
                        <Input
                            className='pho-input-trans'
                            size="large"
                            prefix={<img className='pho-input-emailimg' style={{ width: '20px' }} src={transNum} />}
                            placeholder="输入验证码"
                            addonAfter={
                                <Button
                                    size="large"
                                    disabled={this.state.codeDisType}
                                    onClick={this.getEmailMessage}
                                    loading={this.state.codeLoading}
                                    type="primary">
                                    {this.state.codeHtml}
                                    {/* 获取邮箱验证码 */}
                                </Button>}
                        />
                    )}
                </FormItem>
                <Button className='nextMessageNum' type="primary" onClick={this.phoNextNum} >下一步</Button>
            </Form>
        )
    }
}

export default Form.create()(BoundPhoOne);
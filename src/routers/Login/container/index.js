import React, { Component } from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { message, Modal, Button, Input, Form, Icon, Tabs } from 'antd'
import $ from  'jquery'
import CryptoJS from 'crypto-js'
import FormBox from '../components/FormBox'
import Cookies from 'js-cookie'
import store from '../store'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import { sha256, sha224 } from 'js-sha256'
import CodeModal from '../codeModal'
import PassModal from '../pwModal'
import './index.less'
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
@inject('Store')
@observer
class Login extends Component {
	
    constructor() {
        super()
        this.store = new store() // 在这里实例化，保证每次加载组件数据的初始化。 
    }
    state = {
        loading: false,
        LoginLoading: false,
        visiblePhone: false,
        visiblePass: false,
        email: '',
        phone: '',
        verifyArr: [],
        isAuthentication: false,
        codeValue: '',
        codeDisType:false,
        pwKey: 'fdec3af2f062f9d5893d22ffb46164d7ffcbee648cffb96af79121e7b274d979'
    }
    showModalPhone = () => {
        let arr = [];
        if(this.state.isAuthentication) arr.push('google');
        if(this.state.phone) arr.push('phone');
        this.setState({
            verifyArr: arr,
            visiblePhone: true,
        });
    }
    codeChange = (e) => {
        this.state.codeValue = e.target.value;
    }
    handleOkPhone = (type) => {
        if(!type) {
            if(this.state.phone) type = 'phone';
            if(this.state.isAuthentication) type ='google';
        }
        if(this.state.codeValue.length <6 || this.state.codeValue.length >6) {
            message.error('验证码格式错误')
            return false;
        }else {
            if(parseInt(this.state.codeValue.length) <6) {
                message.error('验证码格式只能为数字')
                return false;
            }
        }
        var obj = {
            account: this.state.userName,
            password : sha256(sha256(this.state.password) + sha256(this.state.password) + this.state.pwKey),
            code : this.state.codeValue
        }
        var _this = this;
        if(type == "google") {
            this.GoogleVerify(obj);
        }else {
            this.PhoneVerify(obj);
        }
        setTimeout(() => {
            // this.setState({ loading: false, visiblePhone: false,LoginLoading:false });
            this.setState({ loading: false, LoginLoading:false });
        }, 3000);
        
    }
    PhoneVerify = (obj) => {
        let _this = this;
        CgicallPost("/apiv1/visitor/loginWithCode",obj,function(d){
            if(d.result) {
                message.success('登录成功!');
                _this.props.history.push('/home')
            }else {
                message.error(GetErrorMsg(d))
            }
            
        });
    }
    GoogleVerify = (obj) => {
        let _this = this;
        CgicallPost("/apiv1/visitor/loginWithAuth",obj,function(d){
            if(d.result) {
                message.success('登录成功!');
                _this.props.history.push('/home')
            }else {
                message.error(GetErrorMsg(d))
            }
            
        });
    }
    drawingImg = () => {
        let _this = this;
        var captcha1 = new TencentCaptcha('2038116476', function(res) {
            if(res.ret === 0){
                var obj = {
                    "Aid" : res.appid,
                    "Ticket" : res.ticket,
                    "Randstr" : res.randstr
                }
                CgicallPost("/apiv1/captchaReg",obj,function(d){
                    if(d.result) {
                        if((_this.state.isAuthentication == "false" || !_this.state.isAuthentication) && !_this.state.phone) {
                            _this.onlyEmailLogin();
                        }else {
                            _this.showModalPhone();
                        }
                    }else {
                        message.error(GetErrorMsg(d));
                    }
                    
                });
            }
        });
        captcha1.show();
    }
    onlyEmailLogin = () => {
        var obj = {
            account: this.state.userName,
            password : sha256(sha256(this.state.password) + sha256(this.state.password) + this.state.pwKey),
        }
        var _this = this;
        this.setState({ LoginLoading: true });
        CgicallPost("/apiv1/visitor/login",obj,function(d){
            if(d.result) {
                message.success('登录成功!');
                _this.props.history.push('/home');
            }else {
                message.error(GetErrorMsg(d))
            }
            this.setState({ LoginLoading: false });
        });
        setTimeout(() => {
            _this.setState({ LoginLoading: false});
        }, 10000);
    }

    handleCancelPhone = () => {
        this.setState({ visiblePhone: false });
    }
    cancelPass = () => {
        this.setState({ visiblePass: false });
    }
    forgetPass = () => {
        this.setState({ visiblePass: true });
    }
    submit = (form, updateLoading) => {
        form.validateFields((err, values) => {
            if (!err) {
                let { userName, password } = values
                var obj = {
                    account: userName,
                    password : sha256(sha256(password) + sha256(password) +this.state.pwKey)
                }
                this.state.userName =  userName;
                this.state.password =  password;
                var _this = this;
                this.setState({ LoginLoading: true });
                setTimeout(function(){
                    _this.setState({ LoginLoading: false });
                },3000)
                CgicallPost("/apiv1/visitor/loginCheck",obj,function(d){
                    if(d.result) {
                        _this.state.email = d.result.email
                        _this.state.phone =  d.result.phone;
                        _this.state.isAuthentication = d.result.isAuthentication;
                        _this.drawingImg();
                    }else {
                        message.error(GetErrorMsg(d,'loginCheck'))
                    }
                    
                });
            }
        });
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    componentWillMount() {
        if(Cookies.get('account')) {
            if(this.props.history.length < 3) this.props.history.push('/home')
            else this.props.history.goBack();
        } 
    }
    render() {
        const { visiblePhone, loading, verifyArr, visiblePass } = this.state;
        return (
            <Provider store={this.store}>
                <div className='Login_wrap clearFix'>
                    <div className='form P_auto'>
                        <h3>欢迎登录</h3>
                        <FormBox submit={this.submit} LoginLoading={this.state.LoginLoading} forgetPass={this.forgetPass}/>
                    </div>
                    <CodeModal title='验证' 
                        handleOkPhone={this.handleOkPhone} 
                        cancelPhone={this.handleCancelPhone} 
                        visiblePhone={visiblePhone} 
                        verifyArr={verifyArr} 
                        getAuthCode={this.getAuthCode}
                        codeChange={this.codeChange}
                        codeType='login'
                        account={this.state.phone}
                    />
                    <PassModal
                        cancelPass={this.cancelPass} 
                        visiblePass={visiblePass} 
                        portPass='forgotPassword'
                        bindingPhone={true}
                        account={this.state.phone}
                    />
                </div>
            </Provider>
        )
    }
}
export default Login

import React, { Component } from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { message, Modal, Button, Input, Form, Icon, Tabs } from 'antd'
import $ from  'jquery'
import CryptoJS from 'crypto-js'
import md5 from 'js-md5'
import FormBox from '../components/FormBox'
import Cookies from 'js-cookie'
import store from '../store'
import { BeforeSendPost, Cgicallget, Cgicallgets, CgicallPost, GetErrorMsg } from '@/components/Ajax'
import { sha256, sha224 } from 'js-sha256'
import CodeModal from '../codeModal'
import PassModal from '../pwModal'
import './index.less'
import { md } from 'node-forge';
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
        pwKey: 'fdec3af2f062f9d5893d22ffb46164d7ffcbee648cffb96af79121e7b274d979',
        hidePhone: '', // 登录输入手机验证码时显示的半隐藏手机号码
        ip: '',
        address: ''
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
        if(this.state.codeValue.length < 6 || this.state.codeValue.length > 6) {
            message.error('验证码格式错误')
            return false;
        }else {
            if(parseInt(this.state.codeValue.length) <6) {
                message.error('验证码格式只能为数字')
                return false;
            }
        }
        var obj = {
            username: this.state.userName,
            // password : sha256(sha256(this.state.password) + sha256(this.state.password) + this.state.pwKey),
            password: md5(this.state.password),
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
            this.setState({ loading: false, LoginLoading: false });
        }, 3000);
        
    }
    // 登录验证获取token、获取登录历史信息
    PhoneVerify = (obj) => {
        let _this = this;
        var account = _this.state.userName
        if (obj.code.length == 0) {
            obj.code = "100000"
        }
        CgicallPost("/api/v1/visitor/login", obj, function (d) {
            let System = _this.getOperationSys();
            let Browser = _this.getBrowser();
            let LoginMethod = System + ' ' + Browser;
            let obj1 = {
                username: account,
                loginip: _this.state.ip,
                loginaddr: _this.state.address,
                loginmethod: LoginMethod
            }
            if (d.code === 0) {
                CgicallPost("/api/v1/visitor/logs/set-log", obj1, function (e) {
                    if (e.code === 0) {
                        // message.success('获取登录历史信息!')
                    } else {
                        message.error(e.message)
                    }
                })
                message.success('登录成功!');
                Cookies.set('account', obj.username)
                Cookies.set('loginState', Cookies.get('account') ? true : false)
                Cookies.set('token', "Bearer " + d.result.token)
                _this.props.history.push('/home')
            } else {
                message.error(d.message)
            }
        });
    }
    // PhoneVerify = (obj) => {
    //     let _this = this;
    //     var account = _this.state.userName
    //     if (obj.code.length == 0) {
    //         obj.code = "100000"
    //     }
    //     CgicallPost("/api/v1/visitor/login", obj, function (d) {
    //         // let System = _this.getOperationSys();
    //         // let Browser = _this.getBrowser();
    //         let LoginMethod = System + ' ' + Browser;
    //         let token = "Bearer " + d.result.token;
    //         let obj1 = {
    //             username: account,
    //             loginip: _this.state.ip,
    //             loginaddr: _this.state.address,
    //             loginmethod: LoginMethod
    //         }
    //         if (d.code === 0) {
    //             CgicallPost("/api/v1/visitor/logs/set-log", obj1, function (e) {
    //                 if (e.code === 0) {
    //                     // message.success('获取登录历史信息!')
    //                 } else {
    //                     message.error(e.message)
    //                 }
    //             })
    //             message.success('登录成功!');
    //             Cookies.set('token', token)
    //             Cookies.set('account', account)
    //             _this.props.history.push('/home')
    //         } else {
    //             message.error(d.message)
    //         }
    //     })
    // }
    // componentWillMount() {
    //     var script = document.createElement('script');
    //     script.type = 'text/javascript';
    //     script.src = 'http://pv.sohu.com/cityjson?ie=utf-8'; 
    //     document.body.appendChild(script)
    //     setTimeout(() => {
    //         var obj = window.returnCitySN
    //         this.setState({
    //             ip: obj.cip,
    //             address: obj.cname
    //         })
    //     }, 500);
    //     if (Cookies.get('account')) {
    //         if (this.props.history.length < 3) this.props.history.push('/home')
    //         else this.props.history.goBack();
    //     }
    // }
    // 获取操作系统名称
    getOperationSys = () => {
        var OS = '';
        var OSArray = {};
        var UserAgent = navigator.userAgent.toLowerCase();
        OSArray.Windows = (navigator.platform == 'Win32') || (navigator.platform == 'Windows');
        OSArray.Mac = (navigator.platform == 'Mac68K') || (navigator.platform == 'MacPPC')
            || (navigator.platform == 'Macintosh') || (navigator.platform == 'MacIntel');
        OSArray.iphone = UserAgent.indexOf('iPhone') > -1;
        OSArray.ipod = UserAgent.indexOf('iPod') > -1;
        OSArray.ipad = UserAgent.indexOf('iPad') > -1;
        OSArray.Android = UserAgent.indexOf('Android') > -1;
        for (var i in OSArray) {
            if (OSArray[i]) {
                OS = i;
            }
        }
        return OS;
    }
    // 获取浏览器名称
    getBrowser = () => {
        var UserAgent = navigator.userAgent.toLowerCase();
        var browser = null;
        var browserArray = {
            IE: window.ActiveXObject || "ActiveXObject" in window, // IE
            Chrome: UserAgent.indexOf('chrome') > -1 && UserAgent.indexOf('safari') > -1, // Chrome浏览器
            Firefox: UserAgent.indexOf('firefox') > -1, // 火狐浏览器
            Opera: UserAgent.indexOf('opera') > -1, // Opera浏览器
            Safari: UserAgent.indexOf('safari') > -1 && UserAgent.indexOf('chrome') == -1, // safari浏览器
            Edge: UserAgent.indexOf('edge') > -1,// Edge浏览器
            QQBrowser: /qqbrowser/.test(UserAgent), // qq浏览器
            WeixinBrowser: /MicroMessenger/i.test(UserAgent) // 微信浏览器
        };
        for (var i in browserArray) {
            if (browserArray[i]) {
                browser = i;
            }
        }
        return browser;
    }
    GoogleVerify = (obj) => {
        let _this = this;
        BeforeSendPost("/apiv1/visitor/loginWithAuth", obj, function (d) {
            if (d.result) {
                message.success('登录成功!');
                _this.props.history.push('/home')
            } else {
                message.error(GetErrorMsg(d))
            }
            
        });
    }
    drawingImg = (email) => {
        let _this = this;
        //--------------------2019-7-5 出现两次滑动验证,体验不好 暂时隐藏一个

        // var captcha1 = new TencentCaptcha('2027665311', function (res) {
        //     if (res.ret === 0) {
                var obj = {
                    type: 'login',
                    username: email,
                    // userip: res.appid,
                    // ticket: res.ticket,
                    // randstr: res.randstr
                }
                CgicallPost("/api/v1/visitor/phone-code", obj, function (d) {
                    if (d.code === 0) {
                        _this.setState({
                            visiblePhone: true
                        })
                        // Cookies.set('account', d.result.account)
                        // _this.props.history.push('/home')
                    }else{
                        message.error("请求失败 ")
                    }
                })
                // CgicallPost("/apiv1/captchaReg",obj,function(d){
                //     if(d.result) {
                //         if((_this.state.isAuthentication == "false" || !_this.state.isAuthentication) && !_this.state.phone) {
                //             _this.onlyEmailLogin();
                //         }else {
                //             _this.showModalPhone();
                //         }
                //     }else {
                //         message.error(GetErrorMsg(d));
                //     }
                    
                // });
            // }
        // captcha1.show();
    }
    // onlyEmailLogin = () => {
    //     var obj = {
    //         account: this.state.userName,
    //         // password : sha256(sha256(this.state.password) + sha256(this.state.password) + this.state.pwKey),
    //         password: md5(this.state.password)
    //     }
    //     var _this = this;
    //     this.setState({ LoginLoading: true });
    //     CgicallPost("/apiv1/visitor/login", obj, function (d) {
    //         if (d.result) {
    //             message.success('登录成功!');
    //             _this.props.history.push('/home');
    //         } else {
    //             message.error(GetErrorMsg(d))
    //         }
    //         this.setState({ LoginLoading: false });
    //     });
    //     setTimeout(() => {
    //         _this.setState({ LoginLoading: false });
    //     }, 10000);
    // }

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
                    username: userName,
                    // password : sha256(sha256(password) + sha256(password) +this.state.pwKey)
                    // password: md5(password)
                }
                this.state.userName = userName;
                this.state.password = password;
                var _this = this;
                this.setState({ LoginLoading: true });
                setTimeout(function(){
                    _this.setState({ LoginLoading: false });
                }, 3000)
                let objs = {
                    username: userName,
                    password: md5(password)
                }
                let captcha1 = new TencentCaptcha('2027665311', function(res) {
                    if (res.ret === 0) {
                        // 判断用户输入邮箱密码是否正确
                        CgicallPost('/api/v1/visitor/check-user', objs, function (d) {
                            if (d.code === 0) {
                                // 判断邮箱是否绑定了手机号码
                                Cgicallgets("/api/v1/visitor/bind-info", obj, function (d) {
                                    if (d.code === 0) {
                                        if (d.result.Phone) {
                                            _this.setState({
                                                hidePhone: d.result.Phone
                                            })
                                            _this.drawingImg(_this.state.userName);
                                        } else {
                                            let obj = {
                                                username: _this.state.userName,
                                                password: md5(_this.state.password),
                                                code: ''
                                            }
                                            _this.PhoneVerify(obj)
                                        }
                                    }
                                })
                            } else {
                                // message.error(GetErrorMsg(d))
                            }
                        })
                    } else {
                        message.error(d.message)
                    }
                })
                captcha1.show()
                    
                // CgicallPost("/api/v1/visitor/login",obj,function(d){
                //     console.log(d)
                //     if(d.result) {
                //         _this.state.email = d.result.email
                //         _this.state.phone =  d.result.phone;
                //         _this.state.isAuthentication = d.result.isAuthentication;
                //         _this.drawingImg();
                //     }else {
                //         message.error(GetErrorMsg(d,'loginCheck'))
                //     }
                    
                // });
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
                    {/* 谷歌验证码输入框 */}
                    <CodeModal title='验证' 
                        handleOkPhone={this.handleOkPhone} 
                        cancelPhone={this.handleCancelPhone} 
                        visiblePhone={visiblePhone} 
                        verifyArr={verifyArr} 
                        getAuthCode={this.getAuthCode}
                        codeChange={this.codeChange}
                        codeType='login'
                        account={this.state.phone}
                        hidePhone={this.state.hidePhone}
                    />
                    {/* 绑定手机验证码输入框 */}
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

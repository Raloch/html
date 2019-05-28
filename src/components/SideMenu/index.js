import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, message, Select } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup;
import './index.less'
import Cookies from 'js-cookie'
import menuConfig from '@/config/menu'
import menuLoginBefore from '@/config/menuLoginBefore'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import logo from '@/routers/Layouts/assets/logo-vv.png'
import Fire from '@/routers/Layouts/assets/fire.png'

// Option--Select选项
const { Option, OptGroup } = Select;
@withRouter
class SideMenu extends Component {
    state={
        keys:[],
        // loginState:Cookies.get('userName')?true:false
        loginState:Cookies.get('account')?true:false,
        menuReviver:menuConfig
    }
    selectKey = () =>{
        let keys = []
        keys.push(this.props.history.location.pathname)
        this.setState({keys:keys})
        if(keys && keys[0] != '/users/userCenter/googleTrans') sessionStorage.googleT = '';
        if(keys && (keys[0] != '/users/userCenter/googleTrans') && (keys[0] != '/users/userCenter/setAccount')){
            sessionStorage.gooBoundCode = '';
            sessionStorage.inputEmailCode = '';
            sessionStorage.phoneCode = '';
            sessionStorage.changeSuc = true;
            sessionStorage.emailChangeCode = '';
            sessionStorage.phoneChangeCode = '';
            sessionStorage.googleChangeCode = '';
            sessionStorage.boundGoogleSuc = '';
        } 

    }
    componentWillMount(){
        // let { userInfo,updateName } = this.props.Store
        // if (userInfo.name == '') {
        //     updateName(Cookies.get('userName'))
        // }
        this.selectKey();
    }
    // 点击导航栏切换至对应界面
    onSelect = ({key}) =>{
        // 用户退出操作
        if(key) {
            if(key == "/users/login") {
                key = "/login";
                this.logout();
            }
        }
        // 当key存在切不是语言时进行操作
        if(key && key !="zh_CN" && key !="zh_CN" && key !="zh_HK" && key !="en_US") {
            if(key != '/volunteer') sessionStorage.dtkey = "";
            this.props.history.push(key)
        }
    }
    // 用户退出--设置Cookies存储
    logout = () =>{
        // Cookies.remove('account', { path: '/',domain: 'nbc.test' })
        Cookies.remove('account', { path: '/'})
        Cookies.remove('transactionverification', { path: '/' })
        this.setState({'loginState': (Cookies.get('account')?true:false)})
        // 退出登录请求
        CgicallPost("/apiv1/visitor/logout",'',function(d){
            if(d.result) {
            }else {
                // message.error('退出登录失败！')
            }
        });
    }
    // 语言切换
    langSwitcher = (value) => {
        console.log(value);
    }
    // 点击白皮书
    getNotice = (key,event) => {
        let _this = this;
        if(key == "/notice" ) {
	        if(sessionStorage.dtkey || sessionStorage.WalletMenu) {
                sessionStorage.dtkey = "";
                sessionStorage.WalletMenu = "";
                window.location.reload()
            }
        }
        if(key == "/whitepaper"){
        
        }
    }
    componentWillReceiveProps (nextProps){
        this.setState({'loginState': (Cookies.get('account')?true:false)})
        if (this.props.location.pathname != nextProps.location.pathname && nextProps.location.pathnam !="/") {
            this.selectKey()
        }
    }
    render() {
        // 通过读取cookies中的账号信息来设置用户头像出的名称
        let userInfoEmail = '';
        if(Cookies.get('account')) {
            let arrInfo = Cookies.get('account').split("@");
            let arrInfoN = arrInfo?arrInfo[arrInfo.length - 2]:'';
            if(arrInfo && arrInfoN) {
                userInfoEmail = Cookies.get('account').substring(0,3) + '***' + arrInfoN[arrInfoN.length - 1]  + '@' +  arrInfo[arrInfo.length - 1];
            }  
        }
        // 根据登录状态来显示不同的头部导航栏内容
        if(this.state.loginState) {
            this.menuReviver = menuConfig
        }else {
            this.menuReviver = menuLoginBefore
        }
        return (
            <div className='SideMenu_wrap'>
                <Menu theme="light" onSelect={this.onSelect} selectedKeys={this.state.keys} mode="horizontal">
                    {this.menuReviver.map((item,i)=>
                        item.list && item.list.length > 0 ?
                            item.key?
                            (<SubMenu key={item.key} className={item.type} trigger="hover" title={<span><span className={'font icon-' +item.icon}></span><span>{(item.key == "/users")?userInfoEmail:item.title}</span></span>}>
                                {/*点击用户账号下拉菜单*/}
                                {item.list.map((listItem,ii)=>
                                    <Menu.Item
	                                    disabled = { listItem.state}
                                        key={item.key+listItem.key}>
                                        <span >{listItem.title}</span>
                                    </Menu.Item>
                                )}
                            </SubMenu>)
                            :
                            (<Select className={"langSwitcher " + item.type} labelInValue defaultValue={{ key: 'zh_CN' }} onChange={this.langSwitcher}>
                                {item.list.map((listItem,ii)=>
                                    <Option value={listItem.key}>{listItem.title}</Option>
                                )}
                              </Select>)
                            :((item.key == '/whiteBook')?
                            ((<Menu.Item key='' disabled={item.state} className={item.type} onClick={this.getNotice.bind(this,item.key)}>
                                    <a href = './whitepaper.pdf' target = '_blank'>{item.title}</a>
                                </Menu.Item>))
                            :
                            (<Menu.Item key={item.key} disabled={item.state} className={item.type} onClick={this.getNotice.bind(this,item.key)}>
                                <span>{(item.key == '/home')?(<img className='menu_logo' src={logo} />):((item.key == '/gosub')?(<span>{item.title} <img src={Fire} /></span>):(item.title))}</span>
                            </Menu.Item>))
                    )}
                </Menu>
	            {/* <a
		            href = './whitepaper.pdf'
		            target = '_blank'
                    style={{color:'#ffffff'}}
		            className = 'test'>白皮书
                </a> */}
            </div>
        )
        // }else {
        //     return (
        //         <div className='SideMenu_wrap'>
        //             <Menu mode="inline" theme="dark" onSelect={this.onSelect} selectedKeys={this.state.keys}>
        //                 {menuLoginBefore.map((item,i)=>
        //                     item.list && item.list.length > 0 ?
        //                         <SubMenu key={item.key} className={item.type} title={<span><span className={'font icon-' +item.icon}></span><span>{item.title}</span></span>}>
        //                             {item.list.map((listItem,ii)=>
        //                                 <Menu.Item key={item.key+listItem.key}>
        //                                     <span>{listItem.title}</span>
        //                                 </Menu.Item>
        //                             )}
        //                         </SubMenu>
        //                         :
        //                         <Menu.Item key={item.key} className={item.type}>
        //                             {/* <span></span> */}
        //                             <span>{item.title}</span>
        //                         </Menu.Item> 
        //                 )}
        //             </Menu>
        //         </div>
        //     )
        // }
        
    }
    // render() {
    //     return (
    //         <div className='SideMenu_wrap'>
    //             <Menu mode="inline" theme="dark" onSelect={this.onSelect} selectedKeys={this.state.keys}>
    //                 {menuConfig.map((item,i)=>
    //                     item.list && item.list.length > 0 ?
    //                         <SubMenu key={item.key} title={<span><span className={'font icon-' +item.icon}></span><span>{item.title}</span></span>}>
    //                             {item.list.map((listItem,ii)=>
    //                                 <Menu.Item key={item.key+listItem.key}>
    //                                     <span>{listItem.title}</span>
    //                                 </Menu.Item>
    //                             )}
    //                         </SubMenu>
    //                         :
    //                         <Menu.Item key={item.key}>
    //                             <span className={'font icon-' +item.icon}></span>
    //                             <span>{item.title}</span>
    //                         </Menu.Item>
    //                 )}
    //             </Menu>
    //         </div>
    //     )
    // }
}
export default SideMenu
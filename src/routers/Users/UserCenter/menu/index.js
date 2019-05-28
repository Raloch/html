import React, { Component } from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { Router,Route, withRouter ,Link} from 'react-router-dom'
import { Menu } from 'antd'
// import axios from 'axios'
import '../container/index.less'
class WalletMenu extends Component {
    render() {
        return (
            <Menu mode="inline" defaultSelectedKeys={[this.props.showKey]}>
                <Menu.Item className ="select-hover" key ="setAccount">
                    <Link to="/users/UserCenter/setAccount">
                    <span className ="nav-text">账号设置</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="message">
                    <Link to="/users/UserCenter/message">
                        <span className ="nav-text">消息中心</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key ="aktionen">
                    <Link to="/users/UserCenter/aktionen">
                        <span className ="nav-text">注册奖励</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key ="recomAward">    
                    <Link to="/users/UserCenter/recomAward">
                        <span className ="nav-text">邀请奖励</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="secretKey" disabled>
                    <Link to="/users/UserCenter/secretKey">
                        <span className ="nav-text">API密钥</span>
                    </Link>
                </Menu.Item>
            </Menu>  
        )
    }
}
export default WalletMenu

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
                <Menu.Item key="asset">
                    <Link to="/wallet/asset">
                        <span className="nav-text">我的资产</span>
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="recRecord">
                    <Link to="/wallet/recRecord">
                        <span className="nav-text">充值记录</span>
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="withDrawal">
                    <Link to="/wallet/withDrawal">
                        <span className="nav-text">提现记录</span>
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="daybook">
                    <Link to="/wallet/daybook">
                        <span className="nav-text">资产流水</span>
                    </Link>
                </Menu.Item>
            </Menu>  
        )
    }
}
export default WalletMenu

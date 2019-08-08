import React, { Component } from 'react'
import Left from '../components/Left'
// import Right from '../components/Right'
import Main from '../components/main'
import Bottom from '../components/bottom'
import './index.less'
import Cookies from 'js-cookie'
import { observer, inject } from 'mobx-react'

@inject('Store')
@observer
class Layouts extends Component {
    // logout = () =>{
    //     Cookies.remove('JSESSIONID', { path: '/' })
    //     Cookies.remove('userName', { path: '/' })
    //     this.props.history.replace('/login')
    // }
    render() {
        this.clsArr = this.props.location.pathname.split('/');
        this.cls = this.clsArr[1]?(this.clsArr[1]+'Wrapper'):''
        // console.log(this.cls);
        return (
            <div className='Layouts_wrap clearFix'>
                <div className={"main-wrapper " + this.cls}>
                    <Left logout={this.logout} />
                    <Main />
                </div>
                <Bottom />
            </div>
        )
    }
}

export default Layouts


import React, { Component } from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { message, Modal, Button, Input, Form, Tabs, Icon, Table, Divider, Tag } from 'antd'
// import Highlighter from 'react-highlight-words'
import $ from  'jquery'
import CryptoJS from 'crypto-js'
import FormBox from '../components/FormBox'
import Cookies from 'js-cookie'
import store from '../store'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
// import axios from 'axios'
import ReactSwiper from 'reactjs-swiper';
import './index.less'
import './index.scss'
import sliders1 from '../images/banner1.jpg'
import sliders2 from '../images/banner2.jpg'
import strength from '../images/bg2.png'
import strth1 from '../images/strth1.png'
import strth2 from '../images/strth2.png'
import strth3 from '../images/strth3.png'
import strth4 from '../images/strth4.png'
import strth5 from '../images/strth5.png'
import cnCode from '../images/cn-cade.png'
import enCode from '../images/en-cade.png'
import qqCode from '../images/qq-cade.png'
import partner1 from '../images/partner1.png'
import partner2 from '../images/partner2.png'
import partner3 from '../images/partner3.png'
import partner4 from '../images/partner4.png'
import partner5 from '../images/partner5.png'
import media from '../images/mediaBg.png'
import wechatCode from '../images/wechat-cade.png'
import Notices from '@/routers/Notice/NoticeMenu/noticeMenu'
import sliders3 from '../images/banner3.jpg'
import ExchangeMarket from '../components/Market'
// import { withRouter } from 'react-router-dom'
const Search = Input.Search;
const FormItem = Form.Item
const { TabPane } = Tabs

@inject('Store')
@observer
// @withRouter
class Home extends Component {
    constructor() {
        super()
        this.store = new store() // 在这里实例化，保证每次加载组件数据的初始化。
        console.log(this.store);
    }
    state = {
        loading: false,
    }
    getNotice = ( key, event) => {
        sessionStorage.dtkey = key;
	    this.props.history.push('/notice');
    }
    getNoticeAll = () => {
        sessionStorage.dtkey = "";
        this.props.history.push('/notice');
    }
    setDtkey = (key,event) => {
	    console.log ( event );
	    sessionStorage.dtkey = key;
	    this.props.history.push('/notice');
    }
    render() {
        const { visiblePhone, loading } = this.state;
        return (
            <Provider store={this.store}>
                <div className='Home_wrap clearFix'>
                    <BannerSlider getNotice={this.getNotice}/>
                    <div className='home_notice'>
                        <ul>
                            <marquee>
                                <div>
                            {Notices.map((item,i)=>
                                i< 4?
                                (<li>
                                    <a href='javascript:;' onClick={this.getNotice.bind(this,item.key)}>
                                        <span className='bourse_name'>{item.boruse}</span>
                                        <span className='notice_msg'>{item.homeShow}</span>
                                    </a>
                                </li>)
                                :
                                ('')
                                
                            )}
                                </div>
                            </marquee>
                            <li className='notice_more'>
                                <a href='javascript:;' onClick={this.getNoticeAll}>
                                   更多>>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='home_strength'>
                        <div className='strength_bg'>
                            <ExchangeMarket />
                            <div className='strength_box'>
                                <img className='strth_main' src={strength} />
                                <StrengthMode />
                            </div>
	                        <Media />
                        </div>
                    </div>
                    <div>
                    </div>
                    <Contact />
                </div>
            </Provider>
        )
    }
}

class BannerSlider extends Component {
	getNotice = (event) => {
        console.log(event.clickedIndex,2222)
        /*轮播图对应索引*/
        if( event.clickedIndex){
		    this.props.getNotice (event.clickedIndex+1);
        }
	}
	render () {
		const items = [ {
            image: sliders1,
            
		}, {
            image: sliders2,
		},
        {
            image: sliders3,
        }
		];
		const swiperOptions = {
			preloadImages               : true,
			autoplay                    : 4000,
			loop                        : true,
			paginationClickable         : true,
			autoplayDisableOnInteraction: false,
			onClick                     : this.getNotice
		};
		return (
			<div
				 className = 'banner_slider'>
				<ReactSwiper
					showPagination={true}
                    options = { swiperOptions } items = { items } className = "swiper-example"/>
			</div>
		)
	}
}

// 主页功能福利展示区
class StrengthMode extends Component {
    render() {
        const strthMode = [
            {
                img: strth3,
                title: "社区节点奖励",
                cls: "strth1",
                msg: "成为节点用户 · 尊享超额奖励"
            },
            {
                img: strth2,
                title: "顶级安全防护",
                cls: "strth2",
                msg: "顶尖安全团队 · 多重加密保护"
            },
            {
                img: strth3,
                title: "社区节点奖励",
                cls: "strth3",
                msg: "成为节点用户 · 尊享超额奖励"
            },
            {
                img: strth4,
                title: "高速撮合引擎",
                cls: "strth4",
                msg: "自主研发系统 · 每秒万笔交易"
            },
            {
                img: strth5,
                title: "极速充值提现",
                cls: "strth5",
                msg: "自动审核系统 · 智能充提确认"
            },
        ]
        return(
            // <div className='Strength_mode'>
                <ul className='Strength_mode'>
                {strthMode.map((item,i) => 
                    <li className={item.cls}>
                        <div className='strth_img'>
                            <img src={item.img}/>
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.msg}</p>
                    </li>
                )}
                    
                </ul>
            // </div>
        )
    }
}
// 循环显示商标（切成一个个小图）
/* 
class Partner extends Component {
    render() {
        const partner = [
            partner1,partner2,partner3,partner4,partner5
        ]
        return(
            <div className='home_mode_main'>
                <div className='home_mode_title'>投资机构</div>
                <div className='home_mode_line'></div>
                <ul className='home_mode_list'>
                    {partner.map((item, index) => 
                        <li className='home_mode_item'><div className='image-wrapper'><img src={item}/></div></li>
                    )}
                </ul>
            </div>
        )
    }
}
*/
// 显示整个商标大图（切整个图）
class Media extends Component {
    render() {
/*        const media = [
            media1,media2,media3,media4,media5,media6,media7,media8,media9,media10
        ]*/
        return (
            <div className='home_mode_main'>
                <div className='home_mode_title'>投资机构与合作媒体</div>
                <div className='home_mode_line'></div>
	            <img className ='partner-bg' src={ media } alt=""/>
            </div>
        )
    }
}
class Contact extends Component {
    render() {
        return(
            <div className='home_contact'>
                <div className='home_contact_main'>
                    {/* <div className='home_mode_title'>联系我们</div>
                    <div className='home_mode_line'></div> */}
                    <div className='home_contact_left'>
                        {/* <div className='home_contact_left_title'>联系我们</div> */}
                         <ul className='home_mode_contact_list'>
                            <li className='contact_left_title'>联系我们</li>
                            <li><label>服务邮箱：</label><span>service@bitcoco.com</span></li>
                            <li><label>商务合作：</label><span>bussiness@bitcoco.com</span></li>
                            <li><label>志愿者招募：</label><span>partner@bitcoco.com</span></li>
                            <li><label>加入我们：</label><span>joinus@bitcoco.com</span></li>
                        </ul>
                    </div>
                    <div className='home_contact_right'>
                        <ul className='home_mode_list'>
                            <li><div className='home_code'><div className='image_wrapper'><img src={qqCode}/></div><p>QQ群</p></div></li>
                            <li><div className='home_code'><div className='image_wrapper'><img src={wechatCode}/></div><p>微信客服</p></div></li>
                            <li><div className='home_code'><div className='image_wrapper'><img src={cnCode}/></div><p>电报中文群</p></div></li>
                            <li><div className='home_code'><div className='image_wrapper encode'><img src={enCode}/></div><p>电报英文群</p></div></li>
                        </ul>
                    </div>
                </div>  
            </div>
        )
    }
}
export default Home

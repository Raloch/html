import React, {Component} from 'react'
import './MessageCenter.less'
import { Badge,List, Avatar, Icon,Layout } from 'antd';
import store from '../store'
import UserCenterMenu from '../menu'
import { Cgicallget, CgicallPost, GetErrorMsg} from '@/components/Ajax'
import { Provider, inject, observer } from 'mobx-react'
import { Router, Route, withRouter ,Link} from 'react-router-dom'
import messageImg from './img/messageImg.png'
const { Header, Footer, Sider, Content } = Layout;


@withRouter
@inject('Store')
@observer


class Message extends Component {
    constructor(){
        super()
        this.store = new store()
    }
    state = {
        dataMessage:[],
        limit:10,
        page:1,
        total:1,
        all:'all',
        noRead:'noRead',
        type:'all',
        noReadNum:0,
        loading: false,
        hasMore: true,
        readNoYes:false,
        handleAll:true,
        handleNoread:false,
    }
    handleList =(index,id) =>{
        console.log(id)
        let obj={
            id:id
        }
        CgicallPost("/apiv1/user/readMessage",obj,function(d){
          if(d.result) {
            console.log('d.resultd.resultd.resultd.result',d.result)
          }else {
              message.error(GetErrorMsg(d));
          } 
        });


        // this.state.data[index].read = true;
        // this.forceUpdate();
    }
    handleAll=()=>{
        let _this = this
        this.setState({
            page:1
        });
        let obj = {
            page:1,
            limit:this.state.limit,
            type:this.state.all
        }
        CgicallPost("/apiv1/user/message",obj,function(d){
            
            if(d.result) {
                _this.setState({
                    dataMessage: d.result.messages,
                    limit:d.result.limit,
                    total:d.result.total,
                    handleAll:true,
                    handleNoread:false,
                    type:'all',
                });
            }else {
              message.error(GetErrorMsg(d));
            } 
        });
    }
    handleNoreadNum=()=>{
        let _this = this
        _this.setState({
            page:1
        });
        let obj = {
            page:1,
            limit:this.state.limit,
            type:this.state.noRead
        }
        CgicallPost("/apiv1/user/message",obj,function(d){
            
            if(d.result) {
                _this.setState({
                    dataMessage: d.result.messages,
                    limit:d.result.limit,
                    total:d.result.total,
                    handleAll:false,
                    handleNoread:true,
                    type:'noRead',
                });
            }else {
              message.error(GetErrorMsg(d));
            } 
        });
    }
    setAllRead=(e)=>{
        let _this = this
        if(this.state.type=='all'){
            let obj={
                page:this.state.page,
                limit:this.state.limit,
                type:this.state.type
            }
            CgicallPost("/apiv1/user/readAllMessage",obj,function(d){
                
                if(d.result) {
                    //获取信息
                    CgicallPost("/apiv1/user/message",obj,function(e){
                        
                        if(d.result) {
                            _this.setState({
                                dataMessage: e.result.messages,
                                total:e.result.total,
                            });
                        }else {
                          message.error(GetErrorMsg(e));
                        } 
                    });
                    _this.noReadNumber()
                }else {
                  message.error(GetErrorMsg(d));
                } 
            });
            
        }else{
            let obj1={
                page:this.state.page,
                limit:this.state.limit,
                type:this.state.type
            }
            CgicallPost("/apiv1/user/readAllMessage",obj1,function(d){
                let ReadNum=(_this.state.total-(_this.state.total%_this.state.limit))
                let pageNum = Math.ceil(ReadNum/_this.state.limit)
                if(d.result) {
                    if(_this.state.page >= pageNum){
                        let obj2={
                            page:_this.state.page-1,
                            limit:_this.state.limit,
                            type:_this.state.type
                        }
                        CgicallPost("/apiv1/user/message",obj2,function(e){
                            _this.setState({
                                page:_this.state.page-1,
                                total:e.result.total,
                                noReadNum:e.result.total,
                                dataMessage: e.result.messages,
                            });
                        });

                    }else if(pageNum==1){
                        let obj3={
                            page:1,
                            limit:_this.state.limit,
                            type:_this.state.type
                        }
                        CgicallPost("/apiv1/user/message",obj3,function(e){
                            _this.setState({
                                page:_this.state.page,
                                total:e.result.total,
                                noReadNum:e.result.total,
                                dataMessage: e.result.messages,
                            });
                        });
                    }else{
                        CgicallPost("/apiv1/user/message",obj1,function(e){
                            _this.setState({
                                page:_this.state.page,
                                total:e.result.total,
                                noReadNum:e.result.total,
                                dataMessage: e.result.messages,
                            });
                        });
                    }
                    
                }else {
                  message.error(GetErrorMsg(d));
                } 
            });
        }
    }
    //获取未读的数目
    noReadNumber=()=>{
        let _this=this
        let obj1 = {
            page:1,
            limit:10,
            type:'noRead'
        }
        CgicallPost("/apiv1/user/message",obj1,function(d){
          if(d.result) {
            _this.setState({
                noReadNum:d.result.total
            });
          }else {
              message.error(GetErrorMsg(d));
          } 
        });
    }
    ShowSizeChange=(page, pageSize)=>{
        let _this = this
        if(this.state.type==='noRead'){
            let obj = {
                page:page,
                limit:this.state.limit,
                type:this.state.type
            }
            CgicallPost("/apiv1/user/message",obj,function(d){
              if(d.result) {
                _this.setState({
                    // noReadNum:d.result.total,
                    dataMessage: d.result.messages,
                    limit:d.result.limit,
                    total:d.result.total,
                    page:page,
                });
              }else {
                  message.error(GetErrorMsg(d));
              } 
            });
        }else{
            let obj = {
                page:page,
                limit:this.state.limit,
                type:this.state.type
            }
            CgicallPost("/apiv1/user/message",obj,function(d){
              if(d.result) {
                _this.setState({
                    // noReadNum:d.result.total,
                    dataMessage: d.result.messages,
                    limit:d.result.limit,
                    total:d.result.total,
                    page:page,
                });
              }else {
                  message.error(GetErrorMsg(d));
              } 
            });
        }
        
    }
    componentDidMount=()=>{
        let _this = this
        let obj = {
            page:this.state.page,
            limit:this.state.limit,
            type:this.state.all
        }
        
        CgicallPost("/apiv1/user/message",obj,function(d){
          if(d.result) {
            _this.setState({
                dataMessage: d.result.messages,
                limit:d.result.limit,
                total:d.result.total
            });
          }else {
              message.error(GetErrorMsg(d));
          } 
        });
        this.noReadNumber()
      }
    render() {
        const pagination={
            current:this.state.page,
            total:this.state.total,
            pageSize:this.state.limit,
            onChange:this.ShowSizeChange
          }
        return (
            <Provider store={this.store}>
                <div className='users_wrap plate-container clearFix'>
                    <Layout>
                        <Sider theme='light' className="subpage-menu line-menu" width='260'>
                            <UserCenterMenu showKey='message'/>
                        </Sider>
                        <Layout>
                            <Content>
            <div className='messageList'>
               <div className='messageBox-header'><span>消息中心</span></div>
               <div className='messageBox-choice'>
                    <div className='choice-wrapper'>
                        <div className='choice-left'>
                            <span>类型&nbsp;:</span>
                            <span className={this.state.handleAll?'choice-left-color':''} onClick={this.handleAll}>全部</span>
                            <span className={this.state.handleNoread?'choice-left-color':''} onClick={this.handleNoreadNum}>未读&nbsp;({this.state.noReadNum})</span>
                            
                        </div>
                        <span className='choice-right' onClick={this.setAllRead}>全部标记为已读</span>
                    </div>
               </div>
               <div className='messageBox-list'>
                    {!(this.state.dataMessage === undefined || this.state.dataMessage.length == 0)?
                    <List
                    size="small"
                    bordered
                    pagination={pagination}
                    dataSource={this.state.dataMessage}
                    renderItem={(item,index) => (
                        <List.Item key={item.id} onClick={this.handleList.bind(this,index,item.id)} className={item.isRead ?'listRead':'listNoRead'}>
                            <List.Item.Meta
                                avatar={<Badge status = {item.isRead ? "default":"error"} />}
                                title={item.content}
                            >
                            </List.Item.Meta>
                            <div className='messageBox-list-time'>
                                {new Date(item.createTime*1000).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item.createTime*1000).toTimeString().substr(0, 8)}
                            </div>
                        </List.Item>
                        )}
                    />:<div className='noMessageData'><div className='messageImg'><img src={messageImg} /></div></div>
                    }
                    {/* <Table  columns={this.state.columns} rowKey={ record => record.userID} dataSource={this.state.dataHistory} pagination={false} /> */}
               </div>
            </div>
            </Content>
                        </Layout>
                    </Layout>
                </div>
            </Provider>
        )
    }
}

export default Message
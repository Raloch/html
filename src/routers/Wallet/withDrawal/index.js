import React, {Component} from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { Router,Route, withRouter ,Link} from 'react-router-dom'
import{ Icon, Table, Tooltip, Input,Button, Layout, message } from 'antd'
import $ from 'jquery'
import store from '../store'
import TableNoData from '../images/table_no_data.png'
import { Cgicallget, CgicallPost, GetErrorMsg, BeforeSendGet} from '@/components/Ajax'
import WalletMenu from '../menu'
import ExportJsonExcel from 'js-export-excel';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Cookies from 'js-cookie'

const { Header, Footer, Sider, Content } = Layout;

@withRouter
@inject('Store')
@observer
class Daybook extends Component {
    constructor(){
        super()
        this.store = new store()
    }
    state = {
        loading: false,
        currency: '',
    }
    onsearch = (event) => {
        this.childTable.onsearch(event.target.value);
        this.setState({currency: event.target.value})
    }
    //修改导出文件  zsl 2019-7-10 ---------------------------------------
    export = () => {
        let _this = this;
        let obj = {
            asset: this.state.currency
        }
        let asset= this.state.currency?this.state.currency : "all"

        // this.setState({exportLoding: true})
        // setTimeout(function() {
        //     _this.setState({exportLoding: false});
        // },10000)
        // message.loading('正在刷写数据...', 30)
        // Cgicallget('/apiv1/user/wallet/export/withdraw', obj ,function(d){
        //     if(d.result) {
        //         let data = d.result.records;
        //         if(data && data.length) {
        //             _this.goExport(d.result.records);
        //         }else {
        //             message.destroy();
        //             message.warning('该条件下的无数据');
        //             _this.setState({exportLoding: false})
        //         }
        //     }else {
        //         message.error(GetErrorMsg(d))
        //         _this.setState({exportLoding: false})
        //     }
        // })
        let token = Cookies.get("token")
        var url = "http://192.168.100.204:8000/api/v1/user/export/withdraw/"+ asset
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.setRequestHeader("Authorization", token);
        xhr.setRequestHeader("client_type", "DESKTOP_WEB");
        xhr.onload = function() {
            if (this.status == 200) {
                var blob = this.response;
                //这里导出src
                var src = URL.createObjectURL(blob);
                var link = document.createElement('a');
                //设置下载的文件名
                link.download = "提现记录.xlsx";
                link.style.display = 'none';
                //设置下载路径
                link.href = src;
                //触发点击
                document.body.appendChild(link);
                link.click();
                //移除节点
                document.body.removeChild(link);
            }
        }
        xhr.send();
    }
    // goExport = (data) => { 
    //     var option={};
    //     let dataTable = [];
    //     if (data) {
    //         for (let i in data) {
    //             if(data){
    //             let obj = {
    //                 '提现时间': data[i].timestamp,
    //                 '币种': data[i].asset,
    //                 '数量': data[i].change,
    //                 '提现地址': data[i].address,
    //                 '状态': data[i].state,
    //                 '交易ID': (data[i].withdraw_type != 'common')?'站内转账':data[i].tx_id || '--',
    //             }
    //             dataTable.push(obj);
    //             }
    //         }
    //     }
    //     option.fileName = '提现记录'+ moment().format('YYYYMMDDHHmmss');
    //     option.datas=[
    //     {
    //         sheetData:dataTable,
    //         sheetName:'sheet',
    //         sheetFilter:['提现时间','币种','数量','提现地址','状态','交易ID'],
    //         sheetHeader:['提现时间','币种','数量','提现地址','状态','交易ID'],
    //     }
    //     ];
    //     message.destroy();
    //     message.success('提现记录已导出');
    //     this.setState({exportLoding: false});
    //     var toExcel = new ExportJsonExcel(option); //new
    //     toExcel.saveExcel();    
    // }
    //修改导出文件  zsl 2019-7-10 ---------------------------------------
    setChild = (childTable) => {
        this.childTable = childTable
    }
    componentDidMount() {
    }
    render() {
        const { loading, currency, exportLoding } = this.state;
        return (
            <Provider store={this.store}>
                <div className='wallet_wrap plate-container clearFix'>
                    <Layout>
                        <Sider theme='light' className="subpage-menu" width='260'>
                            <WalletMenu showKey='withDrawal'/>
                        </Sider>
                        <Layout>
                            <Content>
                                <div className='plate-wrapper'>
                                    <div className='plate-wrapper-table plate-wrapper-stick'>
                                        <div className='plate-wrapper-header'>
                                            <h3>提现记录</h3>
                                            
                                        </div>
                                        <div className='plate-wrapper-center'>
                                            <div className='plate-wrapper-center-search'>
                                                <label>币种</label>
                                                <div className='search-area'>
                                                    <Input prefix={<Icon type="search" />} onChange={this.onsearch} placeholder="输入搜索币种" />
                                                </div>
                                                
                                            </div>
                                            <div className='plate-wrapper-center-export'>
                                                <Button type="primary" onClick={this.export} loading={exportLoding} ghost>导出</Button>
                                            </div>
                                        </div>
                                        <DaybookTable setChild={this.setChild}/>
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
class DaybookTable extends Component {
    constructor(){
        super()
    }
    state = {
        loading: false,
        data: [],
        page: 1,
        limit: 10,
        count: 0,
        asset: '',
        offset:"0,10",
    }
    handleChange = (val) => {
    }
    getTableData = (page,asset) => {
        let _this = this;
        let obj = {
            // page: page,
            // limit: this.state.limit,
            asset: asset,
            business:"withdraw",
            starttime:"0",
            endtime:"0",
            offset:this.state.offset,
        }
        // Cgicallget('/apiv1/user/wallet/history/withdraw', obj ,function(d){
        //     if(d.result) {
        //         _this.setState({data: d.result.records,page: d.result.page,count: d.result.count});
        //     }else {
        //         message.error(GetErrorMsg(d))
        //     }
        // })
        BeforeSendGet('/api/v1/user/query/with/draw', obj, function(d){
            console.log(d.result.Data)
            if(d.result) {
                _this.setState({data: d.result.Data,page: d.result.offset,count: d.result.limit});
            }else {
                message.error(GetErrorMsg(d))
            }
        })
    }
    onsearch = (data) => {
        this.state.asset = data;
        this.getTableData(1,data);
    }
    pageTurn = (current) => {
        this.getTableData(current,this.state.asset);
    }
    componentDidMount() {
        // 基于准备好的dom，初始化table实例
        this.props.setChild(this);
        this.getTableData(this.state.page,this.state.asset);
    }
    getState = (type) => {
        let msg = '';
        switch (type) {
            case 'canceled':
                msg = '已取消';
                break;
            case 'canceling':
                msg = '正在取消';
                break;
            case 'finished':
                msg = '已完成';
                break;
            case 'failed':
                msg = '提现失败';
                break;
            case 'pending':
                msg = '正在提现';
                break;
            case 'checking':
                msg = '审核中';
                break;
            case 'checked':
                msg = '已审核';
                break;
            default:
                msg = '审核失败';
                break;
        }
        return msg;
    }
    itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
          return <a>&laquo;</a>;
        } if (type === 'next') {
          return <a>&raquo;</a>;
        }
        return originalElement;
      }
    render() {
        const columns = [{
            title: '提现时间',
            dataIndex: 'Modified',
            render: function(text,record) {
                return moment(parseInt(text)*1000).format("YYYY-MM-DD HH:mm:ss")
            }
          }, {
            title: '币种',
            dataIndex: 'Asset',
          }, {
            title: '数量',
            dataIndex: 'Amount',
          },{
            title: '提现地址',
            dataIndex: 'ToAddr',
            render: function(text,record) {
                return(
                    <Tooltip placement="top" title={text.from} overlayClassName='word-spill-tip'>
                        <span className='word-spill'>{text.from}</span>
                    </Tooltip>
                )
            } 
          },{
            title: '状态',
            dataIndex: 'State',
            render: text => this.getState(text)
          },{
            title: '交易ID',
            dataIndex: 'BusinessID',
            render: function(text,record) {
                return(
                    <Tooltip placement="top"  overlayClassName='word-spill-tip'>
                        {/* {(record.withdraw_type == 'common')? */}
                            {/* <a className='word-spill' href="javascript:;">{text || '--'}</a>: */}
                            <span className='word-spill'>{text.id}</span>
                        {/* } */}
                    </Tooltip>
                )
            }
          }];
        return (
            <div className='plate-table table-header-white'>
                <Table 
                    rowKey={record => record.id} 
                    columns={columns} 
                    dataSource={this.state.data} 
                    onChange={this.handleChange}
                    pagination = {{
                        total: this.state.count,
                        current: this.state.page,
                        defaultCurrent: 1,
                        pageSize: this.state.limit,
                        onChange:(current, pageSize) => {
                            this.pageTurn(current)
                        },
                    }} 
                    locale={{"emptyText": <div><img src={TableNoData} /><p>暂无数据</p></div>}}
                />
            </div>
        )
    }
}
export default Daybook
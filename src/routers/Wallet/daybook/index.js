import React, {Component} from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import{ Table, Button, Select, DatePicker, Layout, message  } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import store from '../store'
import { Cgicallget, CgicallPost, GetErrorMsg, BeforeSendGet} from '@/components/Ajax'
import TableNoData from '../images/table_no_data.png'
import search from '@/routers/Layouts/assets/search.png'
import WalletMenu from '../menu'
import ExportJsonExcel from 'js-export-excel'; 
import Cookies from 'js-cookie'
const { Sider, Content } = Layout;
const Option = Select.Option;
const { RangePicker } = DatePicker;

@withRouter
@inject('Store')
@observer
class WithDrawal extends Component {
    constructor(){
        super()
        this.store = new store()
    }
    state = {
        loading: false,
        currency: 'BTC',
        objData: [ //下拉框数据  暂时写死
            {
                key:'withdraw',
                msg:'提现'
            },
            {
                key:'deposit',
                msg:'充值'
            }
        ], 
        operate: '',
        schT: false,
        startT: 0,
        endT: 0,
        exportLoding: false
    }
    componentDidMount() {
    }
    pickerOk = (key) => {
    }
    pickerChange = (key,dateStrings) => {
        let arr = [];
        for(var k in dateStrings) {
            arr.push(moment(dateStrings[k], 'YYYY-MM-DD HH:mm:ss').valueOf()/1000)
        }
        let arr1 = [];
        for(var s in arr) {
            arr1.push(moment(arr[s]*1000).format("YYYY-MM-DD HH:mm:ss"));
        }
        this.setState({startT: arr[0] || 0,endT: arr[1] || 0});
    }
    handleChange = (key) => {
        this.setState({operate: key})
    }

    //设置下拉框
    getSetting = () => {
        let _this = this;
        let arr = [];
        setTimeout(() => {
            console.log(this.childTable.state.data)
            let data = this.childTable.state.data
        }, 1000);

        // Cgicallget('/apiv1/user/wallet/setting', '' ,function(d){
        // Cgicallget('/api/v1/user/balance/history', '' ,function(d){
        //     if(d.result) {
        //         let data = d.result.records;
        //         for(var key in data) {
        //             console.log(key)
        //             // if(key.business === "withdraw"){
        //             //     data[key].
        //             // }
        //             arr.push({key: key,msg: data[key]})
        //         }
        //         if(arr.length) {
        //             _this.setState({objData: arr})
        //         }
        //     }else {
        //         message.error(GetErrorMsg(d))
        //     }
        // })
    }
    onsearch = () => {
        this.childTable.onsearch();
    }
    setChild = (childTable) => {
        this.childTable = childTable
    }
    //修改导出文件  zsl 2019-7-10 ---------------------------------------
    export = () => {
        let _this = this;
        let obj = {
            start_time: this.state.startT,
            end_time: this.state.endT,
            business: this.state.operate
        }
        let business = this.state.operate? this.state.operate : "balance"
        // this.setState({exportLoding: true})
        // setTimeout(function() {
        //     _this.setState({exportLoding: false});
        // },10000)
        // message.loading('正在刷写数据...', 30)
        // Cgicallget('/apiv1/user/wallet/export/asset', obj ,function(d){
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
        var url = "http://192.168.100.204:8000/api/v1/user/export/"+business+"/all"
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
                link.download = "资产流水记录.xlsx";
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
    //                 '时间': moment(parseInt(data[i].time)*1000).format("YYYY-MM-DD HH:mm:ss"),
    //                 '操作': this.childTable.operateType(data[i].business),
    //                 '币种': data[i].asset,
    //                 '资产变化': data[i].change,
    //                 '账户余额': data[i].balance,
    //             }
    //             dataTable.push(obj);
    //             }
    //         }
    //     }
    //     option.fileName = '资产流水'+ moment().format('YYYYMMDDHHmmss');
    //     option.datas=[
    //     {
    //         sheetData:dataTable,
    //         sheetName:'sheet',
    //         sheetFilter:['时间','操作','币种','资产变化','账户余额'],
    //         sheetHeader:['时间','操作','币种','资产变化','账户余额'],
    //     }
    //     ];
    //     message.destroy();
    //     message.success('资产流水记录已导出');
    //     this.setState({exportLoding: false});
    //     var toExcel = new ExportJsonExcel(option); //new
    //     toExcel.saveExcel();    
    // }
    //修改导出文件  zsl 2019-7-10 ---------------------------------------
    componentDidMount() {
        this.getSetting();
    }
    render() {
        const { objData, schT, operate, startT, endT, exportLoding } = this.state;
        return (
            <Provider store={this.store}>
                <div className='wallet_wrap plate-container clearFix'>
                    <Layout>
                        <Sider theme='light' className="subpage-menu" width='260'>
                            <WalletMenu showKey='daybook'/>
                        </Sider>
                        <Layout>
                            <Content>
                                <div className='plate-wrapper'>
                                    <div className='plate-wrapper-table plate-wrapper-stick'>
                                        <div className='plate-wrapper-header'>
                                            <h3>资产流水</h3>
                                            
                                        </div>
                                        <div className='plate-wrapper-center'>
                                            <div className='plate-wrapper-center-search'>
                                                <label>操作</label>
                                                <div className='search-area'>
                                                    <Select 
                                                        defaultValue="" 
                                                        style={{ width: 180 }} 
                                                        onChange={this.handleChange}
                                                    >
                                                        <Option value="">全部</Option>
                                                        {objData.map((item,i)=>
                                                            <Option value={item.key}>{item.msg}</Option>
                                                        )}
                                                    </Select>
                                                </div>
                                                <label>起止时间</label>
                                                <div className='search-area'>
                                                    <RangePicker 
                                                        dropdownClassName='time-frame'
                                                        style={{width: 280, position: 'relative', top:6, }} 
                                                        locale={locale} 
                                                        onOk={this.pickerOk}
                                                        onChange={this.pickerChange} 
                                                        autoFocus={false}
                                                        format="YYYY-MM-DD"
                                                    />
                                                </div>
                                                <div className='search-area'>
                                                    <Button onClick={this.onsearch}><img src={search} /></Button>
                                                </div>
                                                
                                            </div>
                                            <div className='plate-wrapper-center-export'>
                                                <Button type="primary" onClick={this.export} ghost loading={exportLoding}>导出</Button>
                                            </div>
                                        </div>
                                        <RecRecordTable search={schT} operate={operate} setChild={this.setChild} objData={objData} startT={startT} endT={endT}/>
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
class RecRecordTable extends Component {
    constructor(){
        super()
    }
    state = {
        loading: false,
        data: [],
        page: 1,
        limit: 10,
        total: 0,
        business: '',
        start_time: 0,
        end_time: 0,
        offset:"0,10"
    }
    handleChange = (val) => {
    }
    setNextPage = () => {
        this.props.setNextPage('withDrawal');
    }
    getTableData = (page,business,start_time,end_time,asset) => {
        let _this = this;
        let obj = {
            // page: page,
            limit: this.state.limit,
            business: business,
            asset: "",
            starttime:start_time,
            endtime:end_time,
            offset:this.state.offset,

        }
        // Cgicallget('/api/v1/user/balance/history', obj ,function(d){
        //     if(d.result) {
        //         _this.setState({data: d.result.records,page: d.result.page,count: d.result.count});
        //     }else {
        //         message.error(GetErrorMsg(d))
        //     }
        // })
        BeforeSendGet('/api/v1/user/balance/history', obj, function(d){
            if(d.result) {
                let j = 0
                for(let i of d.result.records) {
                    j++
                    i.id = j
                }   
                _this.setState({data: d.result.records,page: d.result.offset,count: d.result.limit});
            }else {
                message.error(GetErrorMsg(d))
            }
        })
    }
    onsearch () {
        this.state.business = this.props.operate || '';
        this.state.start_time = this.props.startT || 0;
        this.state.end_time = this.props.endT || 0;
        this.getTableData(1,this.props.operate,this.props.startT,this.props.endT);
    }
    pageTurn = (current) => {
        this.getTableData(current,this.state.business,this.state.start_time,this.state.end_time);
    }
    operateType = (type) => {
        // let data = this.props.objData;
        let msg = '--';
        // for(var k in data) {
        //     if(data[k].key == type) {
        //         msg = data[k].msg;
        //     }
        // }
        msg = type === "withdraw"?"提现":"充值"
        return msg;
    }
    componentDidMount() {
        // 基于准备好的dom，初始化table实例
        this.props.setChild(this);
        this.getTableData(this.state.page,this.state.business,this.state.start_time,this.state.end_time);
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
            title: '时间',
            dataIndex: 'time',
            render: function(text,record) {
                return moment(parseInt(text)*1000).format("YYYY-MM-DD HH:mm:ss")
            }
          }, {
            title: '操作',
            dataIndex: 'business',
            render: text => this.operateType(text)
          }, {
            title: '币种',
            dataIndex: 'asset',
          },{
            title: '资产变化',
            dataIndex: 'change',
          },{
            title: '账户余额',
            dataIndex: 'balance',
          }];
        return (
            <div className='plate-table table-header-white'>
                <Table 
                    rowKey={record => record.id}   
                    columns={columns} 
                    dataSource={this.state.data} 
                    onChange={this.handleChange} 
                    pagination = {{
                        // disabled: true,
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
export default WithDrawal
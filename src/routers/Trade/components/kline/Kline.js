import React, {Component} from 'react'
import { message, Button } from 'antd'
import $ from  'jquery'
// import chartLib from '../plug/charting_library.min.js'
// import { widget, TradingView } from '../../../../charting_library/charting_library.min.js'
//  require('../plug/chartingLibrary.js')
let ws=null
// let historyData = []
// let HCk
// let SUB
// let dataFeed 
// let timeStamp = 0 
/*dataFeed需要看TradingView的文档 */
class Kline extends Component {
    state = {
        historyData:[],
        HCk:null,
        SUB:null,
        dataFeed:null, 
        timeStamp:0, 
    }
    WebSocketInit = () =>{
        let _this = this;
        if ("WebSocket" in window) {
            //alert("您的浏览器支持 WebSocket!");
            if(ws === null){
                ws = new WebSocket("wss://socket.coinex.com/")
            }
            ws.onopen = function() {
                // Web Socket 已连接上
                // start
                ws.send(JSON.stringify({"id":2,"method":"depth.subscribe","params":["BTCUSDT",20,"1"]}))
                ws.send(JSON.stringify({"id":1,"method":"server.ping","params":[]}))
            }
            ws.onmessage = function (evt) {
                //var received_msg = evt.data;
                _this.WSHandler(JSON.parse(evt.data))
            }
            ws.onclose = function() {
                //alert("连接已关闭...");
            }
        } else {
            // 浏览器不支持 WebSocket
            message.error("您的浏览器不支持 WebSocket!");
        }
    }
    //发送信息
    SendData(ws, id, method, params) {
        let data = {
            "id": id,
            "method": method,
            "params": params,
        }
        if(ws.readyState === 1){
            ws.send(JSON.stringify(data))
        }else {
            ws.onopen = function() {
                ws.send(JSON.stringify(data))
            }
        }
    }
    //发送查询信息（历史数据）
    initKlineReQuery = (ws,params) => {
        let queryId
        let method
        queryId=this.coinChoiceQueryId(params)
        method = "kline.query"
        this.SendData(ws, queryId, method, params)
    }
    //*********订阅数据
    initKlineSub = (params) => {
        let subId
        let mrthodSub
        subId = this.coinChoiceSubId(params)
        mrthodSub = 'kline.subscribe'
        this.SendData(ws, subId,mrthodSub,params)
    }
    //*********选择查询数据（历史数据）分辨率
    reqResolutionHistory =(resolution,params) =>{
        this.initKlineReQuery(ws,params)
    }
    //接受数据并处理
    funcTable = (f,data) =>{
        let historyQuery;
        switch(f){
            case "func_1":
            case "func_2":
            case "func_3":
            case "func_4":
            case "func_5":
            case "func_6":
            case "func_7":
            case "func_8":
                historyQuery = this.handlerHistory(data)
                break
            default:
        }
        this.state.historyData = []
        if(!historyQuery){
            return
        }else{
            this.state.historyData=historyQuery
            this.HistoryDataPush(this.state.historyData)
        }
    }
    handlerHistory(data){
        let result = data?data.result:''
        let bars
        let handlerTime
        if(result) {
            bars = result.map(el=>{
                return{
                    time: Number(el[0])*1000,
                    open: Number(el[1]),
                    close: Number(el[2]),
                    high: Number(el[3]),
                    low: Number(el[4]),
                    volume: Number(el[5])
                }
            })
            if(bars[bars.length-1]){
                handlerTime = bars[bars.length-1]
                this.state.timeStamp = handlerTime.time
            }
        }
        return bars?bars:''
    }
    //历史数据
    HistoryDataPush = (historyData)=>{
        let _this = this
        let bars
        bars = historyData
        if(bars && bars.length){
            setTimeout(()=>{
                _this.state.HCk(bars,{ noData: false })
            },0)
        } else {
            _this.state.HCk(bars,{ noData: true })
        }
    }
    //实时数据
    ServerPush = (data) => {
        let _this = this
        let bars = {}
        let temporaryBars
        temporaryBars = this.HandlerealTimeData(data)
        for (let i=0;i<temporaryBars.length;i++){
            bars = temporaryBars[i]
            if(_this.state.timeStamp<bars.time){
                setTimeout(()=>{
                    _this.state.SUB(bars)
                },0)
            }
        }
    }
    //实时数据处理
    HandlerealTimeData(data) {
        let bars
        let result = data.params
        if(result) {
            bars = result.map(el=>{
                return{
                    time: Number(el[0])*1000,
                    open: Number(el[1]),
                    close: Number(el[2]),
                    high: Number(el[3]),
                    low: Number(el[4]),
                    volume: Number(el[5])
                }
            })
        }
        return bars
    }
    //根据id选着接受的数据数据，以后扩张处理数据
    WSHandler = (data) =>{
        let id = data.id
        let f
        // switch (id) {
        //     case  null: // server push推送
        //         this.ServerPush(data)
        //         break
        //     default: // request & respone接受数据

        //         f= "func_" + id
        //         this.funcTable(f,data)
        // }
        if(id === null){
            this.ServerPush(data)
        }else{
            f = "func_" + id
            this.funcTable(f,data)
        }
    }
    //分钟转化为秒
    historyResolution(resolution) {
        // if(resolution==="1M"||resolution==="1W"||resolution==="1D"||resolution==="D"){
        //     resolution=86400
        // }else if(resolution=="240"){
        //     resolution=14400
        // }else if(resolution=="120"){
        //     resolution=7200
        // }else if(resolution=="60"){
        //     resolution=3600
        // }else if(resolution=="30"){
        //     resolution=1800
        // } else if(resolution=="15"){
        //     resolution=900
        // }else if(resolution=="5"){
        //     resolution=300
        // }else if(resolution=="1"){
        //     resolution=60
        // }
        switch (resolution){
            case "1M":
            case "1W":
            case "1D":
            case "D":
                resolution = 86400
                break;
            case "240":
                resolution = 14400
                break;
            case "120":
                resolution = 7200
                break;
            case "60":
                resolution = 3600
                break;
            case "30":
                resolution = 1800
                break;
            case "15":
                resolution = 900
                break;
            case "5":
                resolution = 300
                break;
            case "1":
                resolution = 60
                break;
            default:
                resolution = 86400
        }
        return resolution
    }
    //根据不同币编写历史发送的id判断
    coinChoiceQueryId(params) {
        let id
        // if(params[0]=='BTCBCH'){
        //     id = 1
        // }else if(params[0]=='ETHBCH'){
        //     id =2
        // }else if(params[0]=='LTCBCH'){
        //     id =3
        // }else if(params[0]=='ETCBCH'){
        //     id =4
        // }else if(params[0]=='ZECBCH'){
        //     id =5
        // }else if(params[0]=='XMRBCH'){
        //     id =6
        // }else if(params[0]=='DSHBCH'){
        //     id =7
        // }
        switch (params[0]){
            case 'BTCBCH':
                id = 1
                break;
            case 'ETHBCH':
                id = 2
                break;
            case 'LTCBCH':
                id = 3
                break;
            case 'ETCBCH':
                id = 4
                break;
            case 'ZECBCH':
                id = 5
                break;
            case 'XMRBCH':
                id = 6
                break;
            case 'DSHBCH':
                id = 7
                break;
            default:
                id = null
        }
        return id
    }
    //根据不同币编写实时发送的id判断
    coinChoiceSubId(params) {
        let id
        // if(params[0]=='BTCBCH'){
        //     id = 11
        // }else if(params[0]=='ETHBCH'){
        //     id =12
        // }else if(params[0]=='LTCBCH'){
        //     id =13
        // }else if(params[0]=='ETCBCH'){
        //     id =14
        // }else if(params[0]=='ZECBCH'){
        //     id =15
        // }else if(params[0]=='XMRBCH'){
        //     id =16
        // }else if(params[0]=='DSHBCH'){
        //     id =17
        // }
        switch (params[0]){
            case 'BTCBCH':
                id = 11
                break;
            case 'ETHBCH':
                id = 12
                break;
            case 'LTCBCH':
                id = 13
                break;
            case 'ETCBCH':
                id = 14
                break;
            case 'ZECBCH':
                id = 15
                break;
            case 'XMRBCH':
                id = 16
                break;
            case 'DSHBCH':
                id = 17
                break;
            default:
                id = null
        }
        return id
    }
    dataFeedFun = () => {
        let _this = this;
        this.state.dataFeed = {
            //提供填充配置数据的对象
            readyConfig:{
                supported_resolutions:["1", "5", "15", "30", "60", "240","1D","1W", "1M"],
                supports_search: false,
                supports_group_request: false,
                supports_marks: true,
                supports_timescale_marks:false,
                supports_time: true,
                exchanges:[{ //交易所数组
                    "value": "NCN",
                    "name": "All Exchanges",
                    "desc": ""
                }],
            },
            onReady(callback){
                setTimeout(()=>{
                    callback(this.readyConfig)
                },0)
            },
            //商品解析
            resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback){
                let initSymbol = {
                    'name': symbolName,
                    'ticker': symbolName,
                    'description': symbolName,
                    'timezone': 'Asia/Shanghai',
                    'minmov': 1,
                    'minmov2': 0,
                    'pointvalue': 1,
                    'fractional': false,
                    'session': '24x7',
                    'has_intraday': true,
                    'has_no_volume': false,
                    'pricescale': 100000,
                    'supported_resolutions': ['1', '5','15','30', '60', '240','1D', '1W', '1M'],
                    'data_status':'streaming',
                    "volume_precision": 8,
                    "has_daily":true,
                    "has_weekly_and_monthly":true,
                }
                setTimeout(()=>{
                    onSymbolResolvedCallback(initSymbol)
                },0)

            },
            //查询数据（历史数据）
            getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest){
                resolution = _this.historyResolution(resolution)//分钟转化为秒
                let params = [
                    symbolInfo.name,
                    from,
                    to,
                    resolution
                ]
                _this.reqResolutionHistory(resolution,params)//发送数据
                _this.state.HCk = onHistoryCallback;
            },
            //实时数据
            subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback){
                resolution = _this.historyResolution(resolution)//分钟转化为秒
                let params = [
                    symbolInfo.name,
                    resolution
                ]
                _this.initKlineSub(params)
                _this.state.SUB=onRealtimeCallback

            },
            unsubscribeBars(subscriberUID){

            },
            getMarks(symbolInfo, startDate, endDate, onDataCallback, resolution){

            }
        }
    }
    widgetInit = () => {
        var _this=this
        // var widget = window.tvWidget = new TradingView.widget({
        //     // debug: true
        //     // uncomment this line to see Library errors and warnings in the console
        //     fullscreen: false,
        //     width: 960,
        //     height: 500,
        //     symbol: 'BTCBCH',
        //     interval: '1D',
        //     container_id: "tv_chart_container",
        //     //	BEWARE: no trailing slash is expected in feed URL
        //     datafeed: _this.state.dataFeed,   //new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
        //     library_path: "charting_library/",
        //     locale: "zh",
        //     timezone:"Asia/Shanghai",
        //     timeframe:["1", "5", "60", "240", "1D","1W","1M"],
        //     //	Regression Trend-related functionality is not implemented yet, so it's hidden for a while
        //     drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } ] },
        //     disabled_features: [
        //         "use_localstorage_for_settings",
        //         "header_screenshot",
        //         "header_saveload",
        //         "header_interval_dialog_button",
        //         "header_compare",
        //         "volume_force_overlay",
        //         "header_symbol_search",
        //         "control_bar"
        //     ],
        //     enabled_features: ["study_templates","hide_last_na_study_output","dont_show_boolean_study_arguments"],
        //     charts_storage_url: 'http://saveload.tradingview.com',
        //     charts_storage_api_version: "1.1",
        //     client_id: 'tradingview.com',
        //     user_id: 'public_user_id',
        //     overrides:{
        //         "paneProperties.legendProperties.showLegend": false,
        //         "volumePaneSize":"medium",
        //         "scalesProperties.backgroundColor" : "#ffffff",//*******
        //     },
        //     studies_overrides:{
        //         "volume.show ma": true,
        //     },
        //     time_frames:[
        //         { text: "1M", resolution: "1M", description: "1月" },
        //         { text: "1W", resolution: "7D" ,description: "1周"},
        //         { text: "1d", resolution: "1D" },
        //         { text: "4h", resolution: "240" },
        //         { text: "1h", resolution: "60" }
        //     ]
        // });
        // widget.onChartReady(function () {
        //     // $("ul li").click(function(){
        //     //     var item = $(this).index();
        //     //     var textword = $(this).text();
        //     //     widget.chart().setSymbol(textword, (data)=>{

        //     //     });
        //     // })
        //     widget.chart().createStudy("Moving Average", false, false, [7], null, {"Plot.linewidth": 2,"plot.color": "#ffba70"});
        //     widget.chart().createStudy("Moving Average", false, false, [30], null, {"Plot.linewidth": 2,"plot.color": "#6bcaed"})
        // });
    }
    componentDidMount () {
        this.dataFeedFun();
        this.widgetInit();
        this.WebSocketInit();
    }
    // constructor(props) {
    //     super(props);
    //     this.state = { items: [], text: '' };
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //   }
    render() {
        return (
            <div className = 'Trade_main_wrap'>
               <div id = "tv_chart_container"></div>
            </div>
        )
    }
}
export default Kline
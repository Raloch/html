import React, {Component} from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { withRouter ,Link} from 'react-router-dom'
import{ Icon, Table, Tooltip, Input, Button, message, Layout, Breadcrumb, Tabs, Form, Select } from 'antd'
import TableNoData from '@/routers/Layouts/assets/table_no_data.png'
import { Cgicallget, CgicallPost, GetErrorMsg, BeforeSendGet, BeforeSendPost} from '@/components/Ajax'
import Cookies from 'js-cookie'
import { func } from 'prop-types';
const FormItem = Form.Item;
const Option = Select.Option;

@withRouter
@inject('Store')
@observer
class GeneralMentions extends Component {
    constructor(props) {
        super(props);
        this.lastFetchId = 0;
        // this.inputaaa = React.createRef();
    }
    state = {
        data: [],
        value: [],
        focus: false,
        fetching: false,
        selectOpen: false,
        codeDisType: false,
        onlyOneType: true,
        codeType:'phone',
        currency: 'BTC',
        isRealName: false,
        fee: 0,
        usable: 0,
        actualValue: '',
        phone: ''
    }    
    codeType = (rule, value, callback) => {
        const form = this.props.form;
        const reg =/^[0-9]*$/;
        let codeVal = form.getFieldValue('PhoneCode');
        if(codeVal && !reg.test(codeVal)) {
            callback("请输入有效的数字！");
        }
        callback();
    }
    actualBal = (rule, value, callback) => {
        const form = this.props.form;
        const reg =/^\d+(\.\d+)?$/;
        let actualVal = form.getFieldValue('actualVal');
        if(actualVal && !reg.test(actualVal)) {
            callback("请输入有效的数字！");
        }else if((parseFloat(actualVal) + parseFloat(this.state.fee)) > parseFloat(this.state.usable)){
            callback("可提币数量不足");
        }else {
            this.setState({actualValue: parseFloat(actualVal) || 0})
        }
        callback();
    }
    filterOption = (inputValue, option) => {
        let _this = this;
        if(option) {
            if(option.props.children.indexOf(inputValue) >= 0) return true;   
            else  return false;
        }      
    }
    getUserInfo = (data) => {
        let onlyOneType = false;
        let codeType = 'google';
        let isRealName = false;
        if(data.isAuthentication && data.phone) {
            onlyOneType = false;
        }else {
            onlyOneType = true;
        }
        if(!data.isAuthentication) {
            codeType = 'phone';
        }
        if((data.isAuthentication != "false" || data.phone) && (data.isCertification == "yes")) {
            isRealName = true;
        }
        // this.setState({onlyOneType: onlyOneType,codeType: codeType,isRealName: isRealName}) //暂时只使用短信验证码
        this.setState({onlyOneType: onlyOneType,isRealName: isRealName}) 
    }
    setCodeState = (type) => {
        this.setState({codeDisType: type})
    }
    getAddress = () => {
        let _this = this;
        const searchParams = new URLSearchParams(this.props.location.search)
        const currency = searchParams.get('code')
        // if(!currency) this.props.history.push('/wallet/asset');
        // let obj = {
        //     person_type: 'common'
        // }
        let arr = [];
        BeforeSendGet('/api/v1/user/get/withdraw/addr/'+ currency, "" ,function(d){
            if(d.result) {
                let persons = d.result;
                for(var k in persons) {
                    arr.push({value: persons[k].Address,currency: currency})
                }
                _this.setState({data: arr});
            }else {
                message.error(d.message)
                _this.setState({currency: currency})
            }
        })
    }
    getFee = (data) => {
        for(var k in data) {
            if(data[k].key == this.state.currency) {
                this.setState({fee: data[k].value});
            }
        }
    }
    getRate = (data) => {
        for(var k in data) {
            if(data[k].asset == this.state.currency) {
                this.setState({usable: data[k].available});
            }
        }
    }
    selectChange = (value,val,e) => {
    }
    onSearch = (value) => {
        this.props.form.setFieldsValue({
            withdrawAddress: value
          });
    }
    handleFocusBlur = (e) => {
        if(!e) this.setState({focus: true});
        else {
            this.setState({
                focus: e.target === document.activeElement,
            });
        }    
    }
    componentDidMount(){
        //必须在这里声明，所以 ref 回调可以引用它
        let _this = this;
        this.props.setChild(this);
        this.getAddress();
    }
    phoneShow = () => {
        // this.setState({codeType: 'phone'}); //暂时只使用短信验证码
    }
    googleShow = () => {
        // this.setState({codeType: 'google'}); //暂时只使用短信验证码
    }
    handleSubmit  = (e) => {
        e.preventDefault()
        let { form, amount } = this.props;
        const {codeType} = this.state;
        let arr = ['withdrawAddress','actualVal','PhoneCode'];
        if(codeType == 'google') arr = ['withdrawAddress','actualVal','googleCode'];
        form.validateFields(arr,{},(err, values) => {
            if (!err) {
                let { withdrawAddress, actualVal, PhoneCode, googleCode } = values
                var obj = {
                    asset: amount,
                    toaddr: withdrawAddress,
                    amount: actualVal,
                    // validate_code: (codeType == 'google')?googleCode:PhoneCode,
                    // validate_type: codeType
                    code: PhoneCode,
                    email: Cookies.get('account')
                }
                var _this = this;
                this.setState({ LoginLoading: true });
                setTimeout(function(){
                    _this.setState({ LoginLoading: false });
                },3000)
                BeforeSendPost("/api/v1/user/withdraw/apply" ,obj,function(d){
                    if(d.result) {
                        message.success('提币成功');
                        _this.props.goWithDrawaled(d.result.id);
                    }else {
                        message.error(d.message)
                    }
                    
                });
            }
        });
    }
    render() {
        const { fetching, value, data, fee, usable, actualValue, codeDisType, codeType, onlyOneType } = this.state;
        const { getFieldDecorator } = this.props.form
        const { amount } = this.props;
        return(
            <div className='plate-form-area'>
                <div className='plate-top-tip'>
                    <span>当采用普通提币时，您的提币将走区块链转账，转账过程需等待区块确认。</span>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="提币地址" colon={false}>
                        <Input.Group compact = {true}>
                            {getFieldDecorator('withdrawAddress', {
                                rules: [
                                    { required: true, message: '请输入提币地址!'}
                                ],
                            })(
                                <Select
                                    notFoundContent =''
                                    combobox
                                    allowClear={true}
                                    placeholder="请输入或选择已有提币地址"
                                    searchPlaceholder='请输入或选择已有提币地址'
                                    showArrow={true}
                                    showSearch={true}
                                    onSearch={this.onSearch}
                                    filterOption={this.filterOption}
                                    onChange={this.selectChange}
                                    onFocus={this.handleFocusBlur}
                                    style={{ width: 460,height: 44 }}
                                    onBlur={this.handleFocusBlur}>
                                    {data.map((item,i) => <Option key={item.value}>{item.value}</Option>)}
                                </Select>
                            )}
                        </Input.Group>
                        <a className='plate-form-link-right' onClick={this.props.visible}>新增地址</a>
                    </FormItem>
                    <FormItem label="实际到账" colon={false}>
                        <Input.Group compact = {true}>
                            {getFieldDecorator('actualVal', {
                                rules: [
                                    { required: true, message: '请输入数量!'},
                                    { validator: this.actualBal },
                                ],
                            })(
                                <Input autocomplete="off" suffix={amount} />
                            )}
                        </Input.Group>
                    </FormItem>
                    <FormItem label=" " colon={false}>
                        <div className='plate-show-msg'>
                            <div>
                                <label>可提币数量： </label>
                                <span className='color-blue'>{usable}</span>
                                <span> {amount}</span>
                                <Tooltip placement="right" overlayClassName='tip-msg' title='存在充值未完成确认或挂单冻结的情况，部分金额无法提现'>
                                    <Icon type="info-circle" theme="outlined" />
                                </Tooltip>
                            </div>
                            <div>
                                <div className='plate-show-msg-left'>
                                    <label>网络手续费：</label><span>{ fee + amount}</span>
                                </div>
                                <div className='plate-show-msg-right'>
                                    <label>实际扣币：</label><span>{actualValue + fee + amount}</span>
                                </div>
                            </div>
                        </div>
                    </FormItem>
                    {/* <FormItem label="验证码" colon={false}  className='plate-code-switch' style={{display: (codeType == 'google')?'none':'block'}}> */}
                    <FormItem label="验证码" colon={false}  className='plate-code-switch'>
                        <div>
                            <div>
                                {getFieldDecorator('PhoneCode', {
                                    validateFirst:true,
                                    rules: [
                                        { required: (codeType == 'google')?false:true, message: '输入6位短信验证码!'},
                                        { validator: this.codeType },
                                        { len: 6, message: '手机验证码的长度为6!'}
                                    ],
                                })(
                                    <Input autocomplete="off" className="code_input" prefix={<Icon codeType="safety" />} 
                                        placeholder="输入6位短信验证码" 
                                        addonAfter={<Button  disabled={this.props.codeDisType} 
                                        className="searchInBtn" 
                                        onClick={this.props.getAuthCode.bind(this,'general')}
                                    >
                                        {this.props.phoneHtml}
                                    </Button>} />
                                )}
                            </div>
                            {/* <div className='plate-msg-text-right' >使用<a href='javascript:;' onClick={this.googleShow}>Google验证码</a></div> */}
                        </div>
                    </FormItem>
                    {/* <FormItem label="验证码" colon={false}  className='plate-code-switch' style={{display: (codeType == 'google')?'block':'none'}}>
                        <div>
                            <div>
                                {getFieldDecorator('googleCode', {
                                    validateFirst:true,
                                    rules: [
                                        {required: (codeType == 'google')?true:false, message: '输入6位Google验证码!'}, 
                                        {validator: this.codeType },
                                        { len: 6, message: 'Google验证码的长度为6!'}
                                    ],
                                })(
                                    <Input className="code_input" autocomplete="off" placeholder="输入6位Google验证码" />
                                )}
                            </div>
                            <div className='plate-msg-text-right'>使用<a href='javascript:;' onClick={this.phoneShow}>手机验证码</a></div>
                        </div>
                    </FormItem> */}
                    <FormItem className='ellipse-btn plate-form-btn'>
                        <Button type="primary" htmlType="submit" className="l_button" loading={this.props.LoginLoading}>
                            立即提现
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
@withRouter
@inject('Store')
@observer
class InstationMentions extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        data: [],
        value: [],
        focus: false,
        fetching: false,
        selectOpen: false,
        codeDisType: false,
        onlyOneType: true,
        codeType:'phone',
        currency: 'BTC',
        isRealName: false,
        fee: 0,
        usable: 0,
        actualValue: '',
        phone: ''
    }
    codeType = (rule, value, callback) => {
        const form = this.props.form;
        const reg =/^[0-9]*$/;
        let codeVal = form.getFieldValue('PhoneCode');
        if(codeVal && !reg.test(codeVal)) {
            callback("请输入有效的数字！");
        }
        callback();
    }
    actualBal = (rule, value, callback) => {
        const form = this.props.form;
        const reg =/^\d+(\.\d+)?$/;
        let actualVal = form.getFieldValue('actualVal');
        if(actualVal && !reg.test(actualVal)) {
            callback("请输入有效的数字！");
        }else if((parseFloat(actualVal) + parseFloat(this.state.fee)) > parseFloat(this.state.usable)){
            callback("可提币数量不足");
        }else {
            this.setState({actualValue: parseFloat(actualVal) || 0})
        }
        callback();
    }
    filterOption = (inputValue, option) => {
        if(option) {
            if(option.props.children.indexOf(inputValue) >= 0) return true;   
            else  return false;
        }   
        
    }
    getUserInfo = (data) => {
        let onlyOneType = false;
        let codeType = 'google';
        let isRealName = false;
        if(data.isAuthentication && data.phone) {
            onlyOneType = false;
        }else {
            onlyOneType = true;
        }
        if(!data.isAuthentication) {
            codeType = 'phone';
        }
        if((data.isAuthentication != "false" || data.phone) && (data.isCertification == "yes")) {
            isRealName = true;
        }
        this.setState({onlyOneType: onlyOneType,isRealName: isRealName})
        // this.setState({onlyOneType: onlyOneType,codeType: codeType,isRealName: isRealName})
    }
    setCodeState = (type) => {
        this.setState({codeDisType: type})
    }
    getLinkman = () => {
        let _this = this;
        const searchParams = new URLSearchParams(this.props.location.search)
        const currency = searchParams.get('code');
        // if(!currency) this.props.history.push('/wallet/asset');
        // let obj = {
        //     person_type: 'inner'
        // }
        let arr = [];
        BeforeSendGet('/api/v1/user/get/contacts', "" ,function(d){
            if(d.result) {
                let persons = d.result;
                for(var k in persons) {
                    arr.push({value: persons[k].Email,currency: currency})
                }
                _this.setState({data: arr});
            }else {
                message.error(GetErrorMsg(d))
                _this.setState({currency: currency})
            }
        })
    }
    getFeeFee = (data) => {
        for(var k in data) {
            if(data[k].key == this.state.currency) {
                this.setState({fee: data[k].value});
            }
        }
    }
    getRate = (data) => {
        for(var k in data) {
            if(data[k].asset == this.state.currency) {
                this.setState({usable: data[k].available});
            }
        }
    }
    selectChange = (value,val,e) => {
    }
    onSearch = (value) => {
        this.props.form.setFieldsValue({
            linkman: value
          });
    }
    handleFocusBlur = (e) => {
        if(!e) this.setState({focus: true});
        else {
            this.setState({
                focus: e.target === document.activeElement,
            });
        }    
    }
    componentDidMount(){
        //必须在这里声明，所以 ref 回调可以引用它
        let _this = this;
        this.props.setChild(this);
        this.getLinkman();
    }
    phoneShow = () => {
        this.setState({codeType: 'phone'});
    }
    googleShow = () => {
        this.setState({codeType: 'google'});
    }
    handleSubmit  = (e) => {
        e.preventDefault()
        let { form } = this.props;
        const {codeType} = this.state;
        let arr = ['linkman','actualVal','PhoneCode'];
        if(codeType == 'google') arr = ['linkman','actualVal','googleCode'];
        form.validateFields(arr,{},(err, values) => {
            if (!err) {
                let { linkman, actualVal, PhoneCode, googleCode } = values
                var obj = {
                    email: linkman, //转入的邮箱
                    amount: actualVal, //转入的数量
                    username: Cookies.get("account"), //用户的邮箱
                    asset:this.props.amount,  //父组件接收的币种
                    code: PhoneCode  //验证码
                
                    // validate_code: (codeType == 'google')?googleCode:PhoneCode,
                    // validate_type: codeType

                }
                var _this = this;
                this.setState({ LoginLoading: true });
                setTimeout(function(){
                    _this.setState({ LoginLoading: false });
                },3000)
                BeforeSendPost("/api/v1/user/balance/transfer" ,obj,function(d){
                    if(d.result) {
                        message.success('提币成功');
                        _this.props.goWithDrawaled(d.result.id);
                    }else {
                        message.error(d.message)
                    }
                });
            }
        });
    }
    render() {
        const { fetching, value, data, fee, usable, actualValue, codeDisType, codeType, onlyOneType } = this.state;
        const { getFieldDecorator } = this.props.form;
        const { amount } = this.props;
        return(
            <div className='plate-form-area'>
                <div className='plate-top-tip'>
                    <span>当提币地址为BitCoCo账号地址时，可选择站内转账。提币将不走区块链转账，通过平台内部实时划转，过程无需区块确认。</span>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="BitCoCo账号" colon={false}>
                        <Input.Group compact = {true}>
                            {getFieldDecorator('linkman', {
                                rules: [
                                    { required: true, message: '请输入手机/邮箱或选择已有联系人!'}
                                ],
                            })(
                                <Select
                                    notFoundContent =''
                                    combobox
                                    allowClear={true}
                                    placeholder="请输入手机/邮箱或选择已有联系人"
                                    searchPlaceholder='请输入手机/邮箱或选择已有联系人'
                                    showArrow={true}
                                    showSearch={true}
                                    onSearch={this.onSearch}
                                    filterOption={this.filterOption}
                                    onChange={this.selectChange}
                                    onFocus={this.handleFocusBlur}
                                    style={{ width: 460,height: 44 }}
                                    onBlur={this.handleFocusBlur}>
                                    {data.map((item,i) => <Option key={item.value}>{item.value}</Option>)}
                                </Select>
                            )}
                        </Input.Group>
                        <a className='plate-form-link-right' onClick={this.props.visible}>新增站内联系人</a>
                    {/* )} */}
                    </FormItem>
                    <FormItem label="实际到账" colon={false}>
                        <Input.Group compact = {true}>
                            {getFieldDecorator('actualVal', {
                                rules: [
                                    { required: true, message: '请输入数量!'},
                                    { validator: this.actualBal },
                                ],
                            })(
                                <Input autocomplete="off" suffix={amount} />
                            )}
                        </Input.Group>
                    </FormItem>
                    <FormItem label=" " colon={false}>
                        <div className='plate-show-msg'>
                            <div>
                                <label>可提币数量： </label>
                                <span className='color-blue'>{usable}</span>
                                <span> {amount}</span>
                                <Tooltip placement="right" overlayClassName='tip-msg' title='存在充值未完成确认或挂单冻结的情况，部分金额无法提现'>
                                    <Icon type="info-circle" theme="outlined" />
                                </Tooltip>
                            </div>
                            <div>
                                <div className='plate-show-msg-left'>
                                    <label>网络手续费：</label><span>{fee + amount}</span>
                                </div>
                                <div className='plate-show-msg-right'>
                                    <label>实际扣币：</label><span>{actualValue + fee + amount}</span>
                                </div>
                            </div>
                        </div>
                    </FormItem>
                    {/* <FormItem label="验证码" colon={false}  className='plate-code-switch' style={{display: (codeType == 'google')?'none':'block'}}> */}
                    <FormItem label="验证码" colon={false}  className='plate-code-switch' >
                        <div>
                            <div>
                                {getFieldDecorator('PhoneCode', {
                                    rules: [
                                        { required: false, message: '请输入手机验证码!'},
                                        {validator: this.codeType },
                                        {len: 6, message: '手机验证码的长度为6!'}
                                    ],
                                })(
                                    <Input autocomplete="off" className="code_input" prefix={<Icon codeType="safety" />} 
                                        placeholder="输入6位短信验证码" 
                                        addonAfter={<Button  disabled={this.props.codeDisType} 
                                        className="searchInBtn" 
                                        onClick={this.props.getAuthCode.bind(this,'phone')}
                                    >
                                        {this.props.phoneHtml}
                                    </Button>} />
                                )}
                            </div>
                            {/* <div className='plate-msg-text-right' style={{display: onlyOneType?'none':'block'}}>使用<a href='javascript:;' onClick={this.googleShow}>Google验证码</a></div> */}
                        </div>
                    </FormItem>
                    {/* <FormItem label="验证码" colon={false}  className='plate-code-switch' style={{display: (codeType == 'google')?'block':'none'}}>
                        <div>
                            <div>
                                {getFieldDecorator('googleCode', {
                                    initialValue:this.props.phone || '',
                                    validateFirst:true,
                                    rules: [
                                        {required: true, message: '请输入Google验证码!'}, 
                                        {validator: this.codeType },
                                        {len: 6, message: 'Google验证码的长度为6!'}
                                    ],
                                })(
                                    <Input className="code_input" autocomplete="off" placeholder="输入6位Google验证码" />
                                )}
                            </div>
                            <div className='plate-msg-text-right' style={{display: onlyOneType?'none':'block'}}>使用<a href='javascript:;' onClick={this.phoneShow}>手机验证码</a></div>
                        </div>
                    </FormItem> */}
                    <FormItem className='ellipse-btn plate-form-btn'>
                        <Button type="primary" htmlType="submit" className="l_button" loading={this.props.LoginLoading}>
                            立即提现
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
class RechargeTable extends Component {
    constructor(){
        super()
    }
    state = {
        loading: false,
        data: [],page: 1,
        limit: 5,
        count: 0,
        asset: ''
    }
    handleChange = (val) => {
    }
    getTableData = (page,asset) => {
        let _this = this;
        // let obj = {
        //     page: page,
        //     limit: this.state.limit,
        //     asset: asset || ''
        // }
        // Cgicallget('/apiv1/user/wallet/history/withdraw', obj ,function(d){
        //     if(d.result) {
        //         _this.setState({data: d.result.records,page: d.result.page,count: d.result.count});
        //     }else {
        //         message.error(GetErrorMsg(d))
        //     }
        // })
        let obj = {
            asset: _this.props.amount,
            // business:"withdraw",
            // starttime:"0",
            // endtime:"0",
            offset:"0,10",
        }
        BeforeSendPost('/api/v1/user/query/with/draw', obj, function(d){
            if(d.result) {
                _this.setState({data: d.result.Data,page: d.result.offset,count: d.result.limit});
            }else {
                message.error(d.message)
            }
        })
    }
    componentWillMount() {
        console.log(this.props.amount)

    }
    componentDidMount() {
        // 基于准备好的dom，初始化table实例
        this.getTableData(this.state.page,this.state.asset);
    }
    getState = (type) => {
        let msg = '';
        // switch (type) {
        //     case 'canceled':
        //         msg = '已取消';
        //         break;
        //     case 'canceling':
        //         msg = '正在取消';
        //         break;
        //     case 'finished':
        //         msg = '已完成';
        //         break;
        //     case 'failed':
        //         msg = '提现失败';
        //         break;
        //     case 'pending':
        //         msg = '正在提现';
        //         break;
        //     case 'checking':
        //         msg = '审核中';
        //         break;
        //     case 'checked':
        //         msg = '已审核';
        //         break;
        //     default:
        //         msg = '审核失败';
        //         break;
        // }
        if(type){
            msg = "提现成功"
        }else {
            msg = "提现成功"
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
            dataIndex: 'Created',
            render: function (t){
                let d = t.split("T")
                d[1].split("+")
                console.log(d)
                return d[0] + " " + d[1].split("+")[0]
            }
          }, {
            title: '金额(' + this.props.amount + ')',
            dataIndex: 'Amount',
          }, {
            title: '提现地址',
            dataIndex: 'ToAddr',
          },{
            title: '状态',
            dataIndex: 'State',
            render: text => this.getState(text)
          },{
            title: '交易ID',
            dataIndex: 'BusinessID',
            render: function(text,record) {
                return(
                    <Tooltip placement="top" title={text} overlayClassName='word-spill-tip'>
                        {/* {(record.withdraw_type == 'outer')? */}
                            <a className='word-spill' href="javascript:;">{text}</a>:
                            {/* <span className='word-spill'>站内转账</span> */}
                        {/* } */}
                    </Tooltip>
                )
            }
          },
        ];
        return (
            <div className='plate-table'>
                <Table 
                    rowKey={record => record.id}  
                    columns={columns} 
                    dataSource={this.state.data} 
                    onChange={this.handleChange}
                    pagination = {{
                        hideOnSinglePage: true,
                    }}  
                    locale={{"emptyText": <div><img src={TableNoData} /><p>暂无数据</p></div>}}
                />
            </div>
        )
    }
}
const GeneralMention = Form.create()(GeneralMentions)
const InstationMention = Form.create()(InstationMentions)
export { GeneralMention, InstationMention, RechargeTable}
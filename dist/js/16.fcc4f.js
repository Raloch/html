(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1211:function(e,t,n){"use strict";n.r(t);n(200);var a,r,l,i,o=n(46),s=n.n(o),u=n(4),d=n.n(u),c=n(6),f=n.n(c),p=n(3),h=n.n(p),m=n(5),v=n.n(m),y=(n(524),n(523)),b=n.n(y),g=n(1),w=n.n(g),x=n(23),_=n(24),O=(n(22),n(103),n(76),n(25)),k=n.n(O),C=(k.a.Item,Object(x.inject)("store")(a=Object(x.observer)(a=function(e){function t(){return d()(this,t),h()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return v()(t,e),f()(t,[{key:"render",value:function(){}}]),t}(g.Component))||a)||a),E=(k.a.create()(C),n(12));function j(e,t,n,a){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(a):void 0})}function S(e,t,n,a,r){var l={};return Object.keys(a).forEach(function(e){l[e]=a[e]}),l.enumerable=!!l.enumerable,l.configurable=!!l.configurable,("value"in l||l.initializer)&&(l.writable=!0),l=n.slice().reverse().reduce(function(n,a){return a(e,t,n)||n},l),r&&void 0!==l.initializer&&(l.value=l.initializer?l.initializer.call(r):void 0,l.initializer=void 0),void 0===l.initializer&&(Object.defineProperty(e,t,l),l=null),l}var P,N,M=(l=S((r=function e(){d()(this,e),j(this,"loading",l,this),j(this,"updateLoading",i,this)}).prototype,"loading",[E.observable],{enumerable:!0,initializer:function(){return!1}}),i=S(r.prototype,"updateLoading",[E.action],{enumerable:!0,initializer:function(){var e=this;return function(t){e.loading=t}}}),r),H=(n(17),n(10)),W=n.n(H),z=n(9),A=(n(484),b.a.Header,b.a.Footer,b.a.Sider),I=b.a.Content,q=void 0,F=(P=Object(x.inject)("Store"),Object(_.withRouter)(N=P(N=Object(x.observer)(N=function(e){function t(){d()(this,t);var e=h()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={loading:!1,crtMenu:sessionStorage.WalletMenu||"asset"},e.getContMain=function(t){sessionStorage.WalletMenu=t.key,e.getPage(t.key),e.forceUpdate()},e.getPage=function(e){switch(console.log("**********************"),console.log(e),e){case"setAccount":q=W()({loader:function(){return n.e(62).then(n.bind(null,1238))},loading:z.a});break;case"registrationAward":q=W()({loader:function(){return n.e(61).then(n.bind(null,1237))},loading:z.a});break;case"recommendedAward":q=W()({loader:function(){return n.e(60).then(n.bind(null,1236))},loading:z.a});break;case"secretKey":q=W()({loader:function(){return n.e(59).then(n.bind(null,1235))},loading:z.a});break;default:q=W()({loader:function(){return Promise.all([n.e(0),n.e(1),n.e(58)]).then(n.bind(null,1234))},loading:z.a})}},e.store=new M,console.log(e.store),e}return v()(t,e),f()(t,[{key:"componentWillUnmount",value:function(){clearTimeout(this.timer)}},{key:"componentWillMount",value:function(){this.getPage(this.state.crtMenu)}},{key:"render",value:function(){return w.a.createElement(x.Provider,{store:this.store},w.a.createElement("div",{className:"wallet_wrap clearFix"},w.a.createElement(b.a,{className:"wallet_content_wrap"},w.a.createElement(A,{theme:"light",className:"walletMenu",width:"260"},w.a.createElement(s.a,{defaultSelectedKeys:[this.state.crtMenu],mode:"inline",onSelect:this.getContMain},w.a.createElement(s.a.Item,{key:"setAccount"},w.a.createElement("span",{className:"nav-text"},"账号设置")),w.a.createElement(s.a.Item,{key:"messageCenter"},w.a.createElement("span",{className:"nav-text"},"信息中心")),w.a.createElement(s.a.Item,{key:"registrationAward"},w.a.createElement("span",{className:"nav-text"},"注册奖励")),w.a.createElement(s.a.Item,{key:"recommendedAward"},w.a.createElement("span",{className:"nav-text"},"推荐奖励")),w.a.createElement(s.a.Item,{key:"secretKey"},w.a.createElement("span",{className:"nav-text"},"API密钥")))),w.a.createElement(b.a,null,w.a.createElement(I,null,w.a.createElement(q,null))))))}}]),t}(g.Component))||N)||N)||N);t.default=F},523:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l(n(527)),r=l(n(526));function l(e){return e&&e.__esModule?e:{default:e}}a.default.Sider=r.default,t.default=a.default,e.exports=t.default},524:function(e,t,n){"use strict";n(30),n(473)},525:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},e.exports=t.default},526:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=y(n(7)),r=y(n(2)),l=y(n(4)),i=y(n(6)),o=y(n(3)),s=y(n(5)),u=v(n(1)),d=n(75),c=y(n(11)),f=y(n(62)),p=v(n(0)),h=y(n(20)),m=y(n(525));function v(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function y(e){return e&&e.__esModule?e:{default:e}}var b=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&(n[a[r]]=e[a[r]])}return n};if("undefined"!=typeof window){window.matchMedia=window.matchMedia||function(e){return{media:e,matches:!1,addListener:function(){},removeListener:function(){}}}}var g,w={xs:"480px",sm:"576px",md:"768px",lg:"992px",xl:"1200px",xxl:"1600px"},x=(g=0,function(){return""+(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")+(g+=1)}),_=function(e){function t(e){(0,l.default)(this,t);var n=(0,o.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));n.responsiveHandler=function(e){n.setState({below:e.matches});var t=n.props.onBreakpoint;t&&t(e.matches),n.state.collapsed!==e.matches&&n.setCollapsed(e.matches,"responsive")},n.setCollapsed=function(e,t){"collapsed"in n.props||n.setState({collapsed:e});var a=n.props.onCollapse;a&&a(e,t)},n.toggle=function(){var e=!n.state.collapsed;n.setCollapsed(e,"clickTrigger")},n.belowShowChange=function(){n.setState({belowShow:!n.state.belowShow})},n.uniqueId=x("ant-sider-");var a=void 0;"undefined"!=typeof window&&(a=window.matchMedia),a&&e.breakpoint&&e.breakpoint in w&&(n.mql=a("(max-width: "+w[e.breakpoint]+")"));var r=void 0;return r="collapsed"in e?e.collapsed:e.defaultCollapsed,n.state={collapsed:r,below:!1},n}return(0,s.default)(t,e),(0,i.default)(t,[{key:"getChildContext",value:function(){return{siderCollapsed:this.state.collapsed,collapsedWidth:this.props.collapsedWidth}}},{key:"componentDidMount",value:function(){this.mql&&(this.mql.addListener(this.responsiveHandler),this.responsiveHandler(this.mql)),this.context.siderHook&&this.context.siderHook.addSider(this.uniqueId)}},{key:"componentWillUnmount",value:function(){this.mql&&this.mql.removeListener(this.responsiveHandler),this.context.siderHook&&this.context.siderHook.removeSider(this.uniqueId)}},{key:"render",value:function(){var e,t=this.props,n=t.prefixCls,l=t.className,i=t.theme,o=t.collapsible,s=t.reverseArrow,d=t.trigger,p=t.style,v=t.width,y=t.collapsedWidth,g=b(t,["prefixCls","className","theme","collapsible","reverseArrow","trigger","style","width","collapsedWidth"]),w=(0,f.default)(g,["collapsed","defaultCollapsed","onCollapse","breakpoint","onBreakpoint"]),x=this.state.collapsed?y:v,_=(0,m.default)(x)?x+"px":String(x),O=0===parseFloat(String(y||0))?u.createElement("span",{onClick:this.toggle,className:n+"-zero-width-trigger"},u.createElement(h.default,{type:"bars"})):null,k={expanded:s?u.createElement(h.default,{type:"right"}):u.createElement(h.default,{type:"left"}),collapsed:s?u.createElement(h.default,{type:"left"}):u.createElement(h.default,{type:"right"})}[this.state.collapsed?"collapsed":"expanded"],C=null!==d?O||u.createElement("div",{className:n+"-trigger",onClick:this.toggle,style:{width:_}},d||k):null,E=(0,r.default)({},p,{flex:"0 0 "+_,maxWidth:_,minWidth:_,width:_}),j=(0,c.default)(l,n,n+"-"+i,(e={},(0,a.default)(e,n+"-collapsed",!!this.state.collapsed),(0,a.default)(e,n+"-has-trigger",o&&null!==d&&!O),(0,a.default)(e,n+"-below",!!this.state.below),(0,a.default)(e,n+"-zero-width",0===parseFloat(_)),e));return u.createElement("div",(0,r.default)({className:j},w,{style:E}),u.createElement("div",{className:n+"-children"},this.props.children),o||this.state.below&&O?C:null)}}],[{key:"getDerivedStateFromProps",value:function(e){return"collapsed"in e?{collapsed:e.collapsed}:null}}]),t}(u.Component);_.__ANT_LAYOUT_SIDER=!0,_.defaultProps={prefixCls:"ant-layout-sider",collapsible:!1,defaultCollapsed:!1,reverseArrow:!1,width:200,collapsedWidth:80,style:{},theme:"dark"},_.childContextTypes={siderCollapsed:p.bool,collapsedWidth:p.oneOfType([p.number,p.string])},_.contextTypes={siderHook:p.object},(0,d.polyfill)(_),t.default=_,e.exports=t.default},527:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=h(n(7)),r=h(n(77)),l=h(n(2)),i=h(n(4)),o=h(n(6)),s=h(n(3)),u=h(n(5)),d=p(n(1)),c=p(n(0)),f=h(n(11));function p(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function h(e){return e&&e.__esModule?e:{default:e}}var m=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&(n[a[r]]=e[a[r]])}return n};function v(e){return function(t){return function(n){function a(){return(0,i.default)(this,a),(0,s.default)(this,(a.__proto__||Object.getPrototypeOf(a)).apply(this,arguments))}return(0,u.default)(a,n),(0,o.default)(a,[{key:"render",value:function(){var n=e.prefixCls;return d.createElement(t,(0,l.default)({prefixCls:n},this.props))}}]),a}(d.Component)}}var y=function(e){function t(){return(0,i.default)(this,t),(0,s.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return(0,u.default)(t,e),(0,o.default)(t,[{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=e.className,a=e.children,r=m(e,["prefixCls","className","children"]),i=(0,f.default)(n,t);return d.createElement("div",(0,l.default)({className:i},r),a)}}]),t}(d.Component),b=function(e){function t(){(0,i.default)(this,t);var e=(0,s.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.state={siders:[]},e}return(0,u.default)(t,e),(0,o.default)(t,[{key:"getChildContext",value:function(){var e=this;return{siderHook:{addSider:function(t){e.setState({siders:[].concat((0,r.default)(e.state.siders),[t])})},removeSider:function(t){e.setState({siders:e.state.siders.filter(function(e){return e!==t})})}}}}},{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=e.className,r=e.children,i=e.hasSider,o=m(e,["prefixCls","className","children","hasSider"]),s=(0,f.default)(n,t,(0,a.default)({},t+"-has-sider",i||this.state.siders.length>0));return d.createElement("div",(0,l.default)({className:s},o),r)}}]),t}(d.Component);b.childContextTypes={siderHook:c.object};var g=v({prefixCls:"ant-layout"})(b),w=v({prefixCls:"ant-layout-header"})(y),x=v({prefixCls:"ant-layout-footer"})(y),_=v({prefixCls:"ant-layout-content"})(y);g.Header=w,g.Footer=x,g.Content=_,t.default=g,e.exports=t.default}}]);
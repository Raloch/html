(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{1238:function(e,t,n){"use strict";n.r(t);n(47);var r,a,o=n(13),l=n.n(o),i=n(3),s=n.n(i),c=n(6),u=n.n(c),p=n(2),f=n.n(p),d=n(4),m=n.n(d),y=(n(534),n(533)),h=n.n(y),b=n(1),v=n.n(b),g=n(23),w=n(24),O=(n(22),n(671)),E=(n(668),n(16)),C=n(675),x=(h.a.Header,h.a.Footer,h.a.Sider),j=h.a.Content,k=(r=Object(g.inject)("Store"),Object(w.withRouter)(a=r(a=Object(g.observer)(a=function(e){function t(){s()(this,t);var e=f()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={loading:!1,realname:"no",registerReward:!1},e.getCertification=function(){var t=e;Object(E.c)("/apiv1/user/getUserInfo","",function(e){if(e.result){var n=e.result.isCertification;t.setState({realname:"yes"==n?n:"pending"==n?n:"no",registerReward:e.result.registerReward})}else l.a.error(Object(E.f)(e))})},e.store=new O.a,e}return m()(t,e),u()(t,[{key:"componentDidMount",value:function(){this.getCertification()}},{key:"render",value:function(){var e=this.state,t=(e.loading,e.amonnt,e.realname),n=e.registerReward;return v.a.createElement(g.Provider,{store:this.store},v.a.createElement("div",{className:"users_wrap plate-container clearFix"},v.a.createElement(h.a,null,v.a.createElement(x,{theme:"light",className:"subpage-menu",width:"260"},v.a.createElement(C.a,{showKey:"aktionen"})),v.a.createElement(h.a,null,v.a.createElement(j,null,v.a.createElement("div",{className:"plate-wrapper"},v.a.createElement("div",{className:"plate-wrapper-interval plate-wrapper-stick"},v.a.createElement("div",{className:"plate-wrapper-header"},v.a.createElement("h3",null,"注册奖励")),v.a.createElement("div",{className:"plate-interval"}),v.a.createElement("div",{className:"plate-wrapper-main"},v.a.createElement("div",{className:"aktionen-main"},v.a.createElement("div",{className:"not-realname",style:{display:"no"==t?"block":"none"}},v.a.createElement("div",{className:"gold-text"},"您还未进行实名认证"),v.a.createElement("div",{className:"ellipse-btn"},v.a.createElement(w.Link,{to:"/users/UserCenter/realName"},v.a.createElement("span",null,"实名认证")))),v.a.createElement("div",{className:"has-realname gold-text",style:{display:"pending"==t?"block":"none"}},"您已提交实名认证，等待系统审核"),v.a.createElement("div",{className:"has-realname gold-text",style:{display:"yes"==t&&n?"block":"none"}},"您已成功领取实名认证奖励100 coco币"),v.a.createElement("div",{className:"has-realname gold-text",style:{display:"yes"!=t||n?"none":"block"}},"您已通过实名认证，等待系统发放奖励")),v.a.createElement("div",{className:"plate-rules"},v.a.createElement("p",{className:"rule-title"},"活动规则："),v.a.createElement("ul",{className:"rule-msg"},v.a.createElement("li",null,"1.领取实名奖励的用户必须是实名认证用户，非实名认证用户无法获得奖励，成功完成实名认证，即可获得100coco币；"),v.a.createElement("li",null,"2.一旦您成功完成实名认证，获得的奖励将会在24小时内充值到您的账户，具体入账时间可能存在延迟；"),v.a.createElement("li",null,"3.平台严查恶意注册的账户，一经发现，将不会收到奖励。")))),v.a.createElement("div",{className:"plate-out-tip"},v.a.createElement("ul",{className:"out-tip"},v.a.createElement("li",null,"* 注册即可进行实名认证"),v.a.createElement("li",null,"* 官方根据实际运营情况，保留对活动规则做出修改的权利，请关注官方公告。"))))))))))}}]),t}(b.Component))||a)||a)||a);t.default=k},533:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n(537)),a=o(n(536));function o(e){return e&&e.__esModule?e:{default:e}}r.default.Sider=a.default;var l=r.default;t.default=l},534:function(e,t,n){"use strict";n(31),n(484)},535:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(e){return!isNaN(parseFloat(e))&&isFinite(e)};t.default=r},536:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(26),a=f(n(1)),o=n(46),l=p(n(10)),i=p(n(60)),s=f(n(0)),c=p(n(17)),u=p(n(535));function p(e){return e&&e.__esModule?e:{default:e}}function f(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(){return(y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(e,t){return!t||"object"!==d(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var w=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]])}return n};if("undefined"!=typeof window){window.matchMedia=window.matchMedia||function(e){return{media:e,matches:!1,addListener:function(){},removeListener:function(){}}}}var O,E={xs:"480px",sm:"576px",md:"768px",lg:"992px",xl:"1200px",xxl:"1600px"},C=(O=0,function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return O+=1,"".concat(e).concat(O)}),x=function(e){function t(e){var n,r,o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=b(this,v(t).call(this,e))).responsiveHandler=function(e){n.setState({below:e.matches});var t=n.props.onBreakpoint;t&&t(e.matches),n.state.collapsed!==e.matches&&n.setCollapsed(e.matches,"responsive")},n.setCollapsed=function(e,t){"collapsed"in n.props||n.setState({collapsed:e});var r=n.props.onCollapse;r&&r(e,t)},n.toggle=function(){var e=!n.state.collapsed;n.setCollapsed(e,"clickTrigger")},n.belowShowChange=function(){n.setState({belowShow:!n.state.belowShow})},n.renderSider=function(e){var t,r=e.getPrefixCls,o=n.props,s=o.prefixCls,p=o.className,f=o.theme,d=o.collapsible,h=o.reverseArrow,b=o.trigger,v=o.style,g=o.width,O=o.collapsedWidth,E=w(o,["prefixCls","className","theme","collapsible","reverseArrow","trigger","style","width","collapsedWidth"]),C=r("layout-sider",s),x=(0,i.default)(E,["collapsed","defaultCollapsed","onCollapse","breakpoint","onBreakpoint"]),j=n.state.collapsed?O:g,k=(0,u.default)(j)?"".concat(j,"px"):String(j),_=0===parseFloat(String(O||0))?a.createElement("span",{onClick:n.toggle,className:"".concat(C,"-zero-width-trigger")},a.createElement(c.default,{type:"bars"})):null,P={expanded:h?a.createElement(c.default,{type:"right"}):a.createElement(c.default,{type:"left"}),collapsed:h?a.createElement(c.default,{type:"left"}):a.createElement(c.default,{type:"right"})}[n.state.collapsed?"collapsed":"expanded"],S=null!==b?_||a.createElement("div",{className:"".concat(C,"-trigger"),onClick:n.toggle,style:{width:k}},b||P):null,N=y({},v,{flex:"0 0 ".concat(k),maxWidth:k,minWidth:k,width:k}),A=(0,l.default)(p,C,"".concat(C,"-").concat(f),(m(t={},"".concat(C,"-collapsed"),!!n.state.collapsed),m(t,"".concat(C,"-has-trigger"),d&&null!==b&&!_),m(t,"".concat(C,"-below"),!!n.state.below),m(t,"".concat(C,"-zero-width"),0===parseFloat(k)),t));return a.createElement("div",y({className:A},x,{style:N}),a.createElement("div",{className:"".concat(C,"-children")},n.props.children),d||n.state.below&&_?S:null)},n.uniqueId=C("ant-sider-"),"undefined"!=typeof window&&(r=window.matchMedia),r&&e.breakpoint&&e.breakpoint in E&&(n.mql=r("(max-width: ".concat(E[e.breakpoint],")"))),o="collapsed"in e?e.collapsed:e.defaultCollapsed,n.state={collapsed:o,below:!1},n}var n,o,s;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(t,a.Component),n=t,s=[{key:"getDerivedStateFromProps",value:function(e){return"collapsed"in e?{collapsed:e.collapsed}:null}}],(o=[{key:"getChildContext",value:function(){return{siderCollapsed:this.state.collapsed,collapsedWidth:this.props.collapsedWidth}}},{key:"componentDidMount",value:function(){this.mql&&(this.mql.addListener(this.responsiveHandler),this.responsiveHandler(this.mql)),this.context.siderHook&&this.context.siderHook.addSider(this.uniqueId)}},{key:"componentWillUnmount",value:function(){this.mql&&this.mql.removeListener(this.responsiveHandler),this.context.siderHook&&this.context.siderHook.removeSider(this.uniqueId)}},{key:"render",value:function(){return a.createElement(r.ConfigConsumer,null,this.renderSider)}}])&&h(n.prototype,o),s&&h(n,s),t}();x.__ANT_LAYOUT_SIDER=!0,x.defaultProps={collapsible:!1,defaultCollapsed:!1,reverseArrow:!1,width:200,collapsedWidth:80,style:{},theme:"dark"},x.childContextTypes={siderCollapsed:s.bool,collapsedWidth:s.oneOfType([s.number,s.string])},x.contextTypes={siderHook:s.object},(0,o.polyfill)(x);var j=x;t.default=j},537:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,a=s(n(1)),o=s(n(0)),l=(r=n(10))&&r.__esModule?r:{default:r},i=n(26);function s(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t,n){return t&&d(e.prototype,t),n&&d(e,n),e}function y(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var g=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]])}return n};function w(e){var t=e.suffixCls;return function(e){return function(n){function r(){var n;return f(this,r),(n=y(this,h(r).apply(this,arguments))).renderComponent=function(r){var o=r.getPrefixCls,l=n.props.prefixCls,i=o(t,l);return a.createElement(e,p({prefixCls:i},n.props))},n}return b(r,a.Component),m(r,[{key:"render",value:function(){return a.createElement(i.ConfigConsumer,null,this.renderComponent)}}]),r}()}}var O=function(e){function t(){return f(this,t),y(this,h(t).apply(this,arguments))}return b(t,a.Component),m(t,[{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=e.className,r=e.children,o=g(e,["prefixCls","className","children"]),i=(0,l.default)(n,t);return a.createElement("div",p({className:i},o),r)}}]),t}(),E=function(e){function t(){var e;return f(this,t),(e=y(this,h(t).apply(this,arguments))).state={siders:[]},e}return b(t,a.Component),m(t,[{key:"getChildContext",value:function(){var e=this;return{siderHook:{addSider:function(t){e.setState(function(e){return{siders:[].concat(u(e.siders),[t])}})},removeSider:function(t){e.setState(function(e){return{siders:e.siders.filter(function(e){return e!==t})}})}}}}},{key:"render",value:function(){var e,t,n,r=this.props,o=r.prefixCls,i=r.className,s=r.children,c=r.hasSider,u=g(r,["prefixCls","className","children","hasSider"]),f=(0,l.default)(i,o,(e={},t="".concat(o,"-has-sider"),n=c||this.state.siders.length>0,t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e));return a.createElement("div",p({className:f},u),s)}}]),t}();E.childContextTypes={siderHook:o.object};var C=w({suffixCls:"layout"})(E),x=w({suffixCls:"layout-header"})(O),j=w({suffixCls:"layout-footer"})(O),k=w({suffixCls:"layout-content"})(O);C.Header=x,C.Footer=j,C.Content=k;var _=C;t.default=_},668:function(e,t,n){e.exports=n.p+"images/df9b08efd159f54aee9a45bcff21a9ac.png"},671:function(e,t,n){"use strict";var r,a,o,l=n(3),i=n.n(l),s=n(12);function c(e,t,n,r){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(r):void 0})}function u(e,t,n,r,a){var o={};return Object.keys(r).forEach(function(e){o[e]=r[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=n.slice().reverse().reduce(function(n,r){return r(e,t,n)||n},o),a&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(a):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}var p=(a=u((r=function e(){i()(this,e),c(this,"loading",a,this),c(this,"updateLoading",o,this)}).prototype,"loading",[s.observable],{enumerable:!0,initializer:function(){return!1}}),o=u(r.prototype,"updateLoading",[s.action],{enumerable:!0,initializer:function(){var e=this;return function(t){e.loading=t}}}),r);t.a=p},675:function(e,t,n){"use strict";n(197);var r=n(48),a=n.n(r),o=n(3),l=n.n(o),i=n(6),s=n.n(i),c=n(2),u=n.n(c),p=n(4),f=n.n(p),d=n(1),m=n.n(d),y=(n(23),n(24)),h=(n(485),function(e){function t(){return l()(this,t),u()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return f()(t,e),s()(t,[{key:"render",value:function(){return m.a.createElement(a.a,{mode:"inline",defaultSelectedKeys:[this.props.showKey]},m.a.createElement(a.a.Item,{className:"select-hover",key:"setAccount"},m.a.createElement(y.Link,{to:"/users/UserCenter/setAccount"},m.a.createElement("span",{className:"nav-text"},"账号设置"))),m.a.createElement(a.a.Item,{key:"message"},m.a.createElement(y.Link,{to:"/users/UserCenter/message"},m.a.createElement("span",{className:"nav-text"},"消息中心"))),m.a.createElement(a.a.Item,{key:"aktionen"},m.a.createElement(y.Link,{to:"/users/UserCenter/aktionen"},m.a.createElement("span",{className:"nav-text"},"注册奖励"))),m.a.createElement(a.a.Item,{key:"recomAward"},m.a.createElement(y.Link,{to:"/users/UserCenter/recomAward"},m.a.createElement("span",{className:"nav-text"},"邀请奖励"))),m.a.createElement(a.a.Item,{key:"secretKey",disabled:!0},m.a.createElement(y.Link,{to:"/users/UserCenter/secretKey"},m.a.createElement("span",{className:"nav-text"},"API密钥"))))}}]),t}(d.Component));t.a=h}}]);
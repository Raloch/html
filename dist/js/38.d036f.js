(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{1116:function(e,t){},1118:function(e,t){},1202:function(e,t,i){"use strict";i.r(t);i(711);var n,a,r,o=i(710),l=i.n(o),u=i(3),c=i.n(u),s=i(6),p=i.n(s),f=i(2),b=i.n(f),d=i(4),m=i.n(d),h=i(1),v=i.n(h),g=i(23),w=i(12);function z(e,t,i,n){i&&Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(n):void 0})}function k(e,t,i,n,a){var r={};return Object.keys(n).forEach(function(e){r[e]=n[e]}),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=i.slice().reverse().reduce(function(i,n){return n(e,t,i)||i},r),a&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(a):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(e,t,r),r=null),r}var y,j=(a=k((n=function e(){c()(this,e),z(this,"loading",a,this),z(this,"updateLoading",r,this)}).prototype,"loading",[w.observable],{enumerable:!0,initializer:function(){return!1}}),r=k(n.prototype,"updateLoading",[w.action],{enumerable:!0,initializer:function(){var e=this;return function(t){e.loading=t}}}),n),O=i(1121),E=(i(513),i(22),Object(g.inject)("Store")(y=Object(g.observer)(y=function(e){function t(){c()(this,t);var e=b()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={loading:!1,len:0,page:1},e.onDocumentComplete=function(t){e.setState({len:t})},e.pageTurn=function(t){e.setState({page:t})},e.store=new j,e}return m()(t,e),p()(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){return v.a.createElement(g.Provider,{store:this.store},v.a.createElement("div",{className:"whiteBook_wrap clearFix"},v.a.createElement("div",{className:"whiteBook_main"},v.a.createElement(O.a,{file:"./whiteBook.pdf",onDocumentComplete:this.onDocumentComplete,page:this.state.page}),v.a.createElement(l.a,{onChange:this.pageTurn,current:this.state.page,pageSize:1,total:this.state.len}))))}}]),t}(h.Component))||y)||y);t.default=E}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{168:function(e,t,a){"use strict";a.r(t);a(711);var n,i=a(710),r=a.n(i),c=a(3),l=a.n(c),s=a(6),o=a.n(s),m=a(2),d=a.n(m),u=a(4),p=a.n(u),_=a(1),v=a.n(_),E=a(23),f=(a(24),a(730)),b=(a(668),a(488),a(22),a(704)),h=Object(E.inject)("Store")(n=Object(E.observer)(n=function(e){function t(){l()(this,t);var e=d()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={loading:!1,data:{},len:0,current:0,prvT:"暂无",nextT:"暂无",dtkey:sessionStorage.dtkey?sessionStorage.dtkey:""},e.getNoticeList=function(){sessionStorage.dtkey="",e.props.getDetails()},e.pageTurn=function(t){sessionStorage.dtkey=b.a[t-1].key,e.state.dtkey=sessionStorage.dtkey,e.setDetail()},e.itemRender=function(t,a,n){return"prev"===a?v.a.createElement("a",null,"上一篇：",e.state.prvT):"next"===a?v.a.createElement("a",null,"下一篇：",e.state.nextT):n},e.setDetail=function(){var t=e;e.state.len=b.a.length;for(var a=0;a<b.a.length;a++)b.a[a].key==t.state.dtkey&&t.setState({data:b.a[a],current:a+1,prvT:0!=a?b.a[a-1].title:"暂无",nextT:a<e.state.len-1?b.a[a+1].title:"暂无"})},e.store=new f.a,e}return p()(t,e),o()(t,[{key:"componentDidMount",value:function(){this.setDetail()}},{key:"render",value:function(){var e=this.state,t=e.data,a=e.current,n=e.len,i=t.detail||[];return v.a.createElement("div",{className:"notice_details"},v.a.createElement("div",{className:"notice_dt_top"},v.a.createElement("a",{href:"javascript:;",onClick:this.getNoticeList},"公告列表"),v.a.createElement("span",null," > 详情")),v.a.createElement("div",{className:"notice_dt_main"},v.a.createElement("div",{className:"notice_dt_header"},v.a.createElement("div",{className:"notice_dt_title"},t.title),v.a.createElement("div",{className:"notice_dt_time"},t.time)),v.a.createElement("div",{className:"notice_dt_body"},i.map(function(e,t){return v.a.createElement("div",null,v.a.createElement("div",{className:"notice_foxbase_title",style:{display:e.title?"block":"none"}},e.title),e.data.map(function(e,t){return v.a.createElement("div",{className:"notice_dt_text"},e)}),e.para.map(function(e,t){return v.a.createElement("div",{className:"notice_dt_para"},e)}),v.a.createElement("table",{width:"650px",className:"notice_tb",border:"1px"},e.tb.map(function(e,t){return v.a.createElement("tr",{className:"notice_dt_para tb1"},e.split(",").map(function(e,t){return v.a.createElement("td",null,e)}))})))}),v.a.createElement("div",{className:"notice_publich_name"},t.publichPeople),v.a.createElement("div",{className:"notice_publich_time"},t.bottomTime)),v.a.createElement("div",{className:"notice_dt_page"},v.a.createElement(r.a,{onChange:this.pageTurn,current:a,total:n,pageSize:1,itemRender:this.itemRender}))))}}]),t}(_.Component))||n)||n;t.default=h}}]);
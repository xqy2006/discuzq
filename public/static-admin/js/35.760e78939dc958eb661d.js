(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{"/TFo":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i,n=e("oF3Q"),s=(i=n)&&i.__esModule?i:{default:i};a.default={data:function(){return{financialList:[{title:"用户总充值",num:"0",icon:"iconchongzhi",key:"totalIncome",iconShow:!0},{title:"用户总提现",num:"0",icon:"icontixian",key:"totalWithdrawal",iconShow:!0},{title:"用户钱包总金额",num:"0",icon:"iconqianbaozongjine",key:"totalWallet",iconShow:!0},{title:"用户订单总数",num:"0",icon:"icondingdanzongshu",key:"orderCount",iconShow:!1},{title:"平台总盈利",num:"0",icon:"iconcaiwutongji",key:"totalProfit",iconShow:!0},{title:"提现手续费收入",num:"0",icon:"iconshouxufeishouru",key:"withdrawalProfit",iconShow:!0},{title:"打赏提成收入",num:"0",icon:"icondashangtichengshouru",key:"orderRoyalty",iconShow:!0},{title:"注册加入收入",num:"0",icon:"iconzhucejiarushouru",key:"totalRegisterProfit",iconShow:!0}],financialEcharts:null,financiaOrderEchart:null,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var a=new Date,e=new Date;e.setTime(e.getTime()-6048e5),t.$emit("pick",[e,a])}},{text:"最近一个月",onClick:function(t){var a=new Date,e=new Date;e.setTime(e.getTime()-2592e6),t.$emit("pick",[e,a])}},{text:"最近三个月",onClick:function(t){var a=new Date,e=new Date;e.setTime(e.getTime()-7776e6),t.$emit("pick",[e,a])}}]},financialTime:["",""],orderTime:["",""],valueMouth:["",""],valueOrder:["",""],noData:!1,noDataOrder:!1,istrue:0,istrueOder:0,mouthTab:!1,dayTab:!0,mouthOrderTab:!1,dayOderTab:!0,indexOrderTab:!1,indexStatistics:!1,items:[{name:"按日统计",index:1},{name:"按周统计",index:2},{name:"按月统计",index:3}]}},created:function(){this.statistic()},mounted:function(){this.earningsStatistics(),this.orderStatistics()},methods:{tab:function(t){this.istrue=t,0!=t&&1!=t||(this.dayTab=!0,this.mouthTab=!1,this.indexStatistics=!1),2==t&&(this.mouthTab=!0,this.dayTab=!1,this.indexStatistics=!0),this.earningsStatistics()},tabOrder:function(t){this.istrueOder=t,0!=t&&1!=t||(this.dayOderTab=!0,this.mouthOrderTab=!1,this.indexOrderTab=!1),2==t&&(this.mouthOrderTab=!0,this.dayOderTab=!1,this.indexOrderTab=!0),this.orderStatistics()},statistic:function(){var t=this;this.appFetch({url:"finance_get_v3",method:"get",data:{}}).then((function(a){if(0===a.Code)for(var e=(0,s.default)(a.Data),i=0;i<t.financialList.length;i++)for(var n=0;n<e.length;n++)t.financialList[i].key==e[n][0]&&(t.financialList[i].num=e[n][1]);else t.$message.error(a.Message)}))},change:function(){this.earningsStatistics()},changeOrder:function(){this.orderStatistics()},getDateInfo:function(t){var a=t.split(" ")[0].split("-"),e=t.indexOf(" "),i=new Date(a[0],a[1],0).getDate();return t.substring(0,e-2)+i+t.substring(e)},changeMouth:function(){null==this.valueMouth?this.valueMouth=["",""]:""!==this.valueMouth[0]&&""!==this.valueMouth[1]&&(this.valueMouth[0]=this.valueMouth[0]+"-00-00-00",this.valueMouth[1]=this.getDateInfo(this.valueMouth[1])+"-24-00-00"),this.earningsStatistics()},changeOrderMouth:function(){this.orderStatistics()},earningsStatistics:function(){var t=this;this.financialTime=null==this.financialTime?["",""]:this.financialTime,this.valueMouth=null==this.valueMouth?["",""]:this.valueMouth;var a,e={type:this.istrue+1,createdAtBegin:this.financialTime[0],createdAtEnd:this.financialTime[1]},i={type:this.istrue+1,createdAtBegin:this.valueMouth[0],createdAtEnd:this.valueMouth[1]};a=0==this.indexStatistics?e:i,this.appFetch({url:"financeChart_get_v3",method:"get",data:a}).then((function(a){if(0===a.Code){0===a.Data.length?t.noData=!0:t.noData=!1;var e=[],i=[],n=[],s=[],r=[];a.Data.map((function(t){e.push(t.date),i.push(t.totalProfit),n.push(t.withdrawalProfit),s.push(t.masterPortion),r.push(t.registerProfit)})),t.earningsEcharts(e,i,n,s,r)}else t.$message.error(a.Message)}))},orderStatistics:function(){var t=this;this.orderTime=null==this.orderTime?["",""]:this.orderTime,this.valueOrder=null==this.valueOrder?["",""]:this.valueOrder;var a,e={type:this.istrueOder+1,createdAtBegin:this.orderTime[0],createdAtEnd:this.orderTime[1]},i={type:this.istrueOder+1,createdAtBegin:this.valueOrder[0],createdAtEnd:this.valueOrder[1]};0==this.indexOrderTab&&(a=e),1==this.indexOrderTab&&(a=i),this.appFetch({url:"financeChart_get_v3",method:"get",data:a}).then((function(a){if(0===a.Code){0===a.Data.length?t.noDataOrder=!0:t.noDataOrder=!1;var e=[],i=[],n=[];a.Data.map((function(t){e.push(t.date),i.push(t.orderCount),n.push(t.orderAmount)})),t.orderEcharts(e,i,n)}else t.$message.error(a.Message)}))},earningsEcharts:function(t,a,e,i,n){this.financialEcharts||(this.financialEcharts=this.$echarts.init(this.$refs.financialProfitEcharts));var s={tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#6a7985"}}},legend:{data:["平台总盈利","提现手续费收入","打赏提成收入","注册加入收入"]},grid:{left:"1%",right:"6%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",boundaryGap:!1,data:t,axisLabel:{interval:0,rotate:-40}}],yAxis:[{type:"value"}],series:[{name:"平台总盈利",type:"line",stack:"总量",areaStyle:{},data:a},{name:"提现手续费收入",type:"line",stack:"总量",areaStyle:{},data:e},{name:"打赏提成收入",type:"line",stack:"总量",areaStyle:{},data:i},{name:"注册加入收入",type:"line",stack:"总量",areaStyle:{},data:n}]};this.financialEcharts.setOption(s)},orderEcharts:function(t,a,e){this.financiaOrderEchart||(this.financiaOrderEchart=this.$echarts.init(this.$refs.financialOrderEcharts));var i={tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#6a7985"}}},legend:{data:["订单数量","订单金额"]},grid:{left:"1%",right:"6%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",boundaryGap:!1,data:t,axisLabel:{interval:0,rotate:-40}}],yAxis:[{type:"value"}],series:[{name:"订单数量",type:"line",stack:"总量",areaStyle:{},data:a},{name:"订单金额",type:"line",stack:"总量",areaStyle:{},data:e}]};this.financiaOrderEchart.setOption(i)}}}},"76xR":function(t,a,e){"use strict";e.d(a,"a",(function(){return i})),e.d(a,"b",(function(){return n}));var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"financial-box"},[e("div",{staticClass:"financial-statistics"},t._l(t.financialList,(function(a,i){return e("div",{key:i,staticClass:"financial"},[e("div",{staticClass:"financial-head"},[e("div",{staticClass:"financial-title"},[t._v(t._s(a.title))]),t._v(" "),e("span",{staticClass:"iconfont",class:a.icon}),t._v(" "),e("span",{staticClass:"financial-con"},[a.iconShow?e("span",[t._v("¥")]):t._e(),t._v(" "),e("span",{staticClass:"financial-num",attrs:{title:a.num}},[t._v(t._s(a.num))])])])])})),0),t._v(" "),e("div",{staticClass:"financial-profit"},[e("div",{staticClass:"financial-profit-title"},[t._m(0),t._v(" "),e("div",{staticClass:"financial-profit-title-right"},[e("ul",t._l(t.items,(function(a,i){return e("li",{key:i,class:{active:t.istrue==i},on:{click:function(a){return t.tab(i)}}},[t._v(t._s(a.name))])})),0),t._v(" "),e("el-date-picker",{directives:[{name:"show",rawName:"v-show",value:t.mouthTab,expression:"mouthTab"}],staticClass:"input-class",attrs:{size:"small","value-format":"yyyy-MM-dd HH:mm:ss",type:"monthrange","range-separator":"至","start-placeholder":"开始月份","end-placeholder":"结束月份"},on:{change:t.changeMouth},model:{value:t.valueMouth,callback:function(a){t.valueMouth=a},expression:"valueMouth"}}),t._v(" "),e("el-date-picker",{directives:[{name:"show",rawName:"v-show",value:t.dayTab,expression:"dayTab"}],staticClass:"input-class",attrs:{size:"small",clearable:"",type:"daterange","value-format":"yyyy-MM-dd","default-time":["00:00:00","23:59:59"],"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.change},model:{value:t.financialTime,callback:function(a){t.financialTime=a},expression:"financialTime"}})],1)]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.noData,expression:"noData"}],staticClass:"noData"},[t._v("暂无数据")]),t._v(" "),e("div",{ref:"financialProfitEcharts",staticClass:"financial-profit-chart"})]),t._v(" "),e("div",{staticClass:"financial-order"},[e("div",{staticClass:"financial-profit-title"},[t._m(1),t._v(" "),e("div",{staticClass:"financial-profit-title-right"},[e("ul",t._l(t.items,(function(a,i){return e("li",{key:i,class:{active:t.istrueOder==i},on:{click:function(a){return t.tabOrder(i)}}},[t._v(t._s(a.name))])})),0),t._v(" "),e("el-date-picker",{directives:[{name:"show",rawName:"v-show",value:t.mouthOrderTab,expression:"mouthOrderTab"}],staticClass:"input-class",attrs:{size:"small","value-format":"yyyy-MM-dd HH:mm:ss",type:"monthrange","range-separator":"至","start-placeholder":"开始月份","end-placeholder":"结束月份"},on:{change:t.changeOrderMouth},model:{value:t.valueOrder,callback:function(a){t.valueOrder=a},expression:"valueOrder"}}),t._v(" "),e("el-date-picker",{directives:[{name:"show",rawName:"v-show",value:t.dayOderTab,expression:"dayOderTab"}],staticClass:"input-class",attrs:{size:"small",clearable:"",type:"daterange","value-format":"yyyy-MM-dd HH:mm:ss","default-time":["00:00:00","23:59:59"],"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.changeOrder},model:{value:t.orderTime,callback:function(a){t.orderTime=a},expression:"orderTime"}})],1)]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.noDataOrder,expression:"noDataOrder"}],staticClass:"noData"},[t._v("暂无数据")]),t._v(" "),e("div",{ref:"financialOrderEcharts",staticClass:"financial-profit-chart"})])])},n=[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"financial-profit-title-left"},[a("span",{staticClass:"iconfont iconcaiwutongji"}),this._v(" "),a("span",{staticClass:"financial-profit-titles"},[this._v("盈利统计")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"financial-profit-title-left"},[a("span",{staticClass:"iconfont icondingdanzongshu"}),this._v(" "),a("span",{staticClass:"financial-profit-titles"},[this._v("订单统计")])])}]},BdDw:function(t,a,e){"use strict";e.r(a);var i=e("76xR"),n=e("fQMi");for(var s in n)["default"].indexOf(s)<0&&function(t){e.d(a,t,(function(){return n[t]}))}(s);var r=e("KHd+"),o=Object(r.a)(n.default,i.a,i.b,!1,null,null,null);a.default=o.exports},YF4W:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=s(e("QbLZ"));e("z99J");var n=s(e("/TFo"));function s(t){return t&&t.__esModule?t:{default:t}}a.default=(0,i.default)({name:"financial-statistics-view"},n.default)},fQMi:function(t,a,e){"use strict";e.r(a);var i=e("YF4W"),n=e.n(i);for(var s in i)["default"].indexOf(s)<0&&function(t){e.d(a,t,(function(){return i[t]}))}(s);a.default=n.a},nGDx:function(t,a,e){var i=e("Y7ZC"),n=e("E8gZ")(!0);i(i.S,"Object",{entries:function(t){return n(t)}})},oF3Q:function(t,a,e){t.exports={default:e("tgZa"),__esModule:!0}},tgZa:function(t,a,e){e("nGDx"),t.exports=e("WEpk").Object.entries}}]);
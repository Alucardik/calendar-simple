(function(t){function e(e){for(var n,i,o=e[0],c=e[1],l=e[2],d=0,p=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&p.push(r[i][0]),r[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(p.length)p.shift()();return s.push.apply(s,l||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,o=1;o<a.length;o++){var c=a[o];0!==r[c]&&(n=!1)}n&&(s.splice(e--,1),t=i(i.s=a[0]))}return t}var n={},r={app:0},s=[];function i(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=n,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/calendar-simple/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"0729":function(t,e,a){},4132:function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("router-view")},s=[],i={name:"App"},o=i,c=a("2877"),l=Object(c["a"])(o,r,s,!1,null,null,null),u=l.exports,d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"page"},[t._m(0),a("div",{staticClass:"home"},[a("router-link",{staticClass:"home__link",attrs:{to:"/about"}},[t._v(" Начать сессию ")]),a("router-link",{staticClass:"home__link",attrs:{to:"/config"}},[t._v(" Настройки сессии ")])],1)])},p=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"home__welcome"},[a("span",[t._v("Добро пожаловать.")]),a("span",[t._v("Пожалуйста, выберите действие.")])])}],h={name:"Home"},f=h,m=(a("6c1e"),Object(c["a"])(f,d,p,!1,null,"6e349070",null)),_=m.exports,v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"page page_type_main"},[a("CalendarHeader",{attrs:{probeStart:t.probeStart,selectedDate:t.privateState.curDate,period:t.privateState.curPeriod,stats:t.privateState.workSpaceItems,onInterrupt:t.handleProbeInterrupt.bind(this)}}),a("SimpleCalendarView",{attrs:{selectedDate:t.privateState.curDate}}),a("AdvancedCalendarView",{attrs:{selectedDate:t.privateState.curDate,period:t.privateState.curPeriod,eventsArray:t.privateState.workSpaceItems,stats:t.statistics,probeNum:t.probesTaken}}),a("TaskPopup",{attrs:{targetArray:t.pullSet[0],isOpen:t.privateState.taskPopupOpened}})],1)},g=[],b=(a("99af"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"header"},[n("div",{staticClass:"header__info"},[n("button",{staticClass:"header__button header__button_type_menu",attrs:{type:"button"},on:{click:t.triggerAPI}}),n("div",{staticClass:"header__project-name"},[n("img",{staticClass:"header__project-image",attrs:{src:a("ecac"),alt:"App logo"},on:{click:function(e){return t.$router.push({path:"/"})}}}),t._v(" Календарь ")]),n("button",{staticClass:"header__button header__button_type_today",attrs:{type:"button"},on:{click:function(e){t.selectedDate=t.getCurDate(t.selectedDate)}}},[t._v(" Сегодня ")]),n("button",{staticClass:"header__button header__button_type_change-per",attrs:{type:"button"},on:{click:function(e){t.selectedDate=t.decMonth(t.selectedDate)}}}),n("button",{staticClass:"header__button header__button_type_change-per",attrs:{type:"button"},on:{click:function(e){t.selectedDate=t.incMonth(t.selectedDate)}}}),n("div",{staticClass:"header__date"},[t._v(" "+t._s(t.months[t.selectedDate.month-1])+" "+t._s(t.selectedDate.year)+" ")])]),n("nav",{staticClass:"header__settings"},[n("button",{staticClass:"header__button header__button_type_options",attrs:{type:"button"},on:{click:t.toggleDropdown}},[t._v(t._s(t.calcPeriodName)+" ▼")]),n("div",{staticClass:"header__dropdown"},[n("span",{staticClass:"header__dropdown-elem",on:{click:function(e){t.period.days=1,t.toggleDropdown()}}},[t._v("День")]),n("span",{staticClass:"header__dropdown-elem",on:{click:function(e){t.period.days=4,t.toggleDropdown()}}},[t._v("4 Дня")]),n("span",{staticClass:"header__dropdown-elem",on:{click:function(e){t.period.days=7,t.toggleDropdown()}}},[t._v("Неделя")])]),n("button",{staticClass:"header__button header__button_type_exit",attrs:{type:"button"},on:{click:t.onInterrupt}},[t._v(" Завершить ")])])])}),y=[],k=(a("a9e3"),{proofreading:{intro:"Сейчас перед Вами появится список слов для запоминания.",memTime:"Время предъявления (в секундах): ",conclusion:"После этого вы будете перенаправлены в пространство ежедневника.Вы должны щелчком мыши отмечать дела, соответствующие только что запомненным словам.",taskTime:"Время на выполнение (в секундах): "}}),S={proofreading:{Probe:0,Time:0,Total_words_struck:0,Total_targets:0,Targets_struck:0}},w=["ВС","ПН","ВТ","СР","ЧТ","ПТ","СБ"],C=["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],D=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],T={weekdays:w,weekdayNames:C,months:D,tasksTexts:k,sampleStatObjects:S},O={getCurDate:function(t){var e=new Date;return t.day=e.getDate(),t.month=e.getMonth()+1,t.year=e.getFullYear(),t},getDayOfTheWeek:function(t,e){var a=new Date(t.year,t.month-1,t.day+e);return a.getDay()},sessionConfig:{taskType:"proofreading",numberOfProbes:3,memOffset:5,taskOffset:60},genTaskInstruction:function(t){var e=T.tasksTexts[t.taskType];switch(t.taskType){case"proofreading":return"<span class='instruction__line'>"+"".concat(e.intro)+"</span><span class='instruction__line'>"+"".concat(e.memTime+t.memOffset)+"</span><span class='instruction__line'>"+"".concat(e.conclusion)+"</span> <span class='instruction__line'>"+"".concat(e.taskTime+t.taskOffset)+"</span> <span class='instruction__line'>"+"Вам предстоит пройти задание ".concat(t.numberOfProbes," раз(-а).")+"</span>";default:return"Задание указанного типа не было найдено."}}},I={name:"CalendarHeader",created:function(){this.getCurDate=O.getCurDate,this.months=T.months,this.sessionInfo=O.sessionConfig},mounted:function(){var t=this;this.dropdown=document.querySelector(".header__dropdown"),this.timerId=setInterval((function(){t.privateState.elapsed=Math.floor((Date.now()-t.probeStart)/1e3)-t.sessionInfo.memOffset}),500)},beforeUnmount:function(){clearInterval(this.timerId)},props:{selectedDate:Object,period:Object,stats:Array,probeStart:Number,onInterrupt:Function},data:function(){return{privateState:{elapsed:0}}},computed:{calcPeriodName:function(){return 7===this.period.days?"Неделя":4===this.period.days?"4 Дня":"День"}},methods:{triggerAPI:function(){},decMonth:function(t){return t.month-=1,t.month||(t.month=12,t.year-=1),t},incMonth:function(t){return t.month+=1,t.month>12&&(t.month=1,t.year+=1),t},toggleDropdown:function(){this.dropdown.classList.toggle("header__dropdown_visible")}}},P=I,x=Object(c["a"])(P,b,y,!1,null,"1d557459",null),j=x.exports,A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"calendar-mini"},[a("h3",{staticClass:"calendar-mini__heading"},[t._v(" "+t._s(t.months[t.selectedDate.month-1])+" "+t._s(t.selectedDate.year)+" ")]),a("div",{staticClass:"calendar-mini__table"},[t._l(7,(function(e){return a("div",{key:"dayName"+e,staticClass:"calendar-mini__cell calendar-mini__cell_type_weekday"},[t._v(" "+t._s(t.weekdayNamesShort[e-1])+" ")])})),t._l(new Date(t.selectedDate.year,t.selectedDate.month,0).getDate(),(function(e){return a("div",{key:e,staticClass:"calendar-mini__cell",on:{click:function(e){t.prevSelectedDay=t.handleCellClick(e,t.selectedDate,t.prevSelectedDay)}}},[t._v(" "+t._s(e)+" ")])}))],2)])},M=[],N={name:"SimpleCalendarView",created:function(){this.months=T.months,this.weekdayNamesShort=T.weekdays,this.getDayOfTheWeek=O.getDayOfTheWeek},data:function(){return{prevSelectedDay:""}},computed:{},methods:{handleCellClick:function(t,e,a){var n=t.target;return a&&a.classList.remove("calendar-mini__cell_selected"),n.classList.add("calendar-mini__cell_selected"),e.day=parseInt(n.textContent),n}},props:{selectedDate:Object}},E=N,W=Object(c["a"])(E,A,M,!1,null,"3ae03b31",null),R=W.exports,$=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main-space"},[a("div",{staticClass:"weekdays-row",style:t.calcWeekRowAlignment},t._l(t.period.days,(function(e){return a("div",{key:"day"+e,staticClass:"weekdays-row__cell"},[t._v(" "+t._s(t.weekdays[t.getDayOfTheWeek(t.selectedDate,e-1)])+" "),a("h2",{staticClass:"weekdays-row__day"},[t._v(t._s(t.selectedDate.day+e-1))])])})),0),a("div",{staticClass:"date-cell",style:t.calcTableSz},[a("div"),t._l(t.period.days,(function(t){return a("div",{key:"border-day"+t,staticClass:"date-cell__border-gap"})})),a("div",{staticStyle:{"min-height":"100%",width:"100%",display:"flex","flex-direction":"column"}},t._l(24,(function(e){return a("div",{key:"timeline-cell"+e,staticClass:"date-cell__border-gap date-cell__border-gap_type_vertical"},[a("span",{staticStyle:{position:"relative",right:"30px",bottom:"6px"}},[t._v(t._s(e-1)+":00")])])})),0),t._l(t.period.days,(function(e){return a("div",{key:"column"+e,staticClass:"date-cell__contents"},[a("TableCell",{attrs:{column:e,items:t.eventsArray,stats:t.stats,probeNum:t.probeNum}}),t._l(24,(function(t){return a("div",{key:"column"+e+"cell"+t,staticClass:"date-cell__table-cell",attrs:{row:t}})}))],2)}))],2)])},z=[],L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"drag-n-drop__drop-zone",on:{drop:t.onDrop,dragover:function(t){t.preventDefault()},dragenter:function(t){t.preventDefault()}}},t._l(t.filteredItems,(function(e){return a("div",{directives:[{name:"resize",rawName:"v-resize",value:{callOnAdd:!1},expression:"{ callOnAdd: false }"}],key:e.id,class:"drag-n-drop__drag-item "+(e.isStriked&&"drag-n-drop__drag-item_striked"),style:t.renderItem(e),attrs:{draggable:"true"},on:{resize:function(a){return t.onResize(a,e)},click:function(a){return t.onClick(a,e)},dragstart:function(a){return t.onDragStart(a,e)}}},[t._v(" "+t._s(e.title)+" ")])})),0)},V=[],G=(a("4de4"),a("7db0"),{name:"TableCell",created:function(){},props:{items:Array,column:Number,stats:Array,probeNum:Number},computed:{filteredItems:function(){var t=this;return this.items.filter((function(e){return e.column===t.column}))}},methods:{onResize:function(t,e){e.firstRender?e.firstRender=!1:(e.height=t.detail.height,e.firstRender=!0)},renderItem:function(t){return{top:"calc(100% / 24 * ".concat(t.row-1),height:"".concat(t.height,"px"),color:t.isTarget?"hsl(279, 89%, 36%)":"white"}},onDragStart:function(t,e){t.dataTransfer.effectAllowed="move",t.dataTransfer.dropEffect="move",t.dataTransfer.setData("itemID",e.id)},onDrop:function(t){t.target.classList.add("drag-n-drop");var e=document.elementFromPoint(t.clientX,t.clientY);t.target.classList.remove("drag-n-drop");var a=t.dataTransfer.getData("itemID"),n=this.items.find((function(t){return t.id===a}));n.column=this.column,n.row=parseInt(e.attributes["row"].textContent)},onClick:function(t,e){var a=e.isTarget,n=e.isStriked;n?(a&&--this.stats[this.probeNum-1]["Targets_struck"],--this.stats[this.probeNum-1]["Total_words_struck"]):(a&&++this.stats[this.probeNum-1]["Targets_struck"],++this.stats[this.probeNum-1]["Total_words_struck"]),e.isStriked=!e.isStriked}}}),H=G,U=Object(c["a"])(H,L,V,!1,null,"2b7b3a1a",null),Y=U.exports,q={name:"AdvancedCalendarView",components:{TableCell:Y},props:{eventsArray:Array,selectedDate:Object,period:Object,stats:Array,probeNum:Number},created:function(){this.months=T.months,this.weekdays=T.weekdays,this.getDayOfTheWeek=O.getDayOfTheWeek},computed:{calcTableSz:function(){return{"grid-template-columns":"10px repeat(".concat(this.period.days,", 1fr)")}},calcWeekRowAlignment:function(){return{"justify-content":1===this.period.days?"flex-start":"space-around","padding-left":1===this.period.days?"40px":"0"}}},methods:{}},F=q,J=Object(c["a"])(F,$,z,!1,null,"46ece774",null),Q=J.exports,B=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"popup",style:t.checkPopup},[a("div",{staticStyle:{margin:"auto"}},t._l(t.targetArray.length,(function(e){return a("span",{key:"target"+e,staticStyle:{"margin-right":"20px"}},[t._v(" "+t._s(t.targetArray[e-1])+" ")])})),0)])},K=[],X={name:"TaskPopup",data:function(){return{privateState:{},sharedState:O.sessionConfig}},props:{targetArray:Array,isOpen:Boolean},computed:{checkPopup:function(){return this.isOpen?"visibility: visible;":""}},methods:{}},Z=X,tt=Object(c["a"])(Z,B,K,!1,null,"29d5edd1",null),et=tt.exports,at=[["тренировка","звонок","отдых"],["покупка","свидание","встреча"],["оплата","поездка","экзамен"],["собрание","уборка","работа"],["отдых","встреча","собрание"],["экзамен","оплата","работа"]],nt=[["выходной","отпуск","магазин","пробежка","переезд","ужин","офис","занятие","лекция"],["выходной","отпуск","магазин","пробежка","переезд","ужин","офис","занятие","лекция"],["выходной","отпуск","магазин","пробежка","переезд","ужин","офис","занятие","лекция"],["выходной","отпуск","магазин","пробежка","переезд","ужин","офис","занятие","лекция"],["выходной","отпуск","магазин","пробежка","переезд","ужин","офис","занятие","лекция"],["выходной","отпуск","магазин","пробежка","переезд","ужин","офис","занятие","лекция"]];function rt(){var t=Math.floor(Math.random()*at.length);return[at[t],nt[t]]}a("d3b7");var st=a("16d0"),it=new st["a"]({host:"https://psyc-calendar.herokuapp.com/",publishableKey:"pope8Qy8qfYyppnHRMgLMpQ8MuEUKDGeyhfGCj"}),ot="1Ruh0BsRYzwbePVC8SczTSGxLRlNQtCyCMZn7ez0W14U",ct="6cd51f80-b7f1-11eb-88ce-f3631f229918",lt=function(t){it.integration("google-sheets").auth(ct).post("".concat(ot,":batchUpdate"),{body:JSON.stringify({requests:[{pasteData:{coordinate:{sheetId:0,rowIndex:0,columnIndex:0},data:t,type:"PASTE_VALUES",delimiter:","}}],includeSpreadsheetInResponse:!1,responseRanges:[],responseIncludeGridData:!1})}).then((function(t){return t.ok?(window.alert("Data was successfully retrieved"),t.json()):Promise.reject(t.status)})).then((function(t){console.log(t)})).catch((function(t){window.alert("API encountered error with status:\n".concat(t))}))},ut=lt,dt={name:"Main",created:function(){this.json2csv=a("1fd8"),this.statistics=[],this.pullSet=[],this.probesTaken=1,this.probeStart=Date.now(),this.initWorkspace()},mounted:function(){this.intervalId=setInterval(this.reinitWorkspace,1e3*(this.sharedState.memOffset+this.sharedState.taskOffset))},beforeDestroy:function(){clearInterval(this.intervalId)},data:function(){return{privateState:{curDate:O.getCurDate({}),curPeriod:{days:7},workSpaceItems:[],taskPopupOpened:!0,pullSet:[]},sharedState:O.sessionConfig}},components:{CalendarHeader:j,AdvancedCalendarView:Q,SimpleCalendarView:R,TaskPopup:et},methods:{collectStat:function(){this.statistics[this.probesTaken-1]["Time"]=Math.round(Math.floor(Date.now()-this.probeStart)/1e3)-this.sharedState.memOffset},initWorkspace:function(){var t=this;this.statistics.push(Object.create(T.sampleStatObjects[this.sharedState.taskType])),this.statistics[this.probesTaken-1]["Probe"]=this.probesTaken,this.pullSet=rt(),this.privateState.workSpaceItems=this.genWorkSpace(15,.5),this.privateState.taskPopupOpened=!0,setTimeout((function(){t.privateState.taskPopupOpened=!1}),1e3*this.sharedState.memOffset)},reinitWorkspace:function(){if(this.collectStat(),console.log("NEW STAT",this.statistics),this.probeStart=Date.now(),++this.probesTaken,this.probesTaken>this.sharedState.numberOfProbes)return console.log("Probes finished"),clearInterval(this.intervalId),this.$router.push("/"),void ut(this.json2csv(this.statistics));console.log("taking probe:",this.probesTaken),this.initWorkspace()},handleProbeInterrupt:function(){clearInterval(this.intervalId),this.reinitWorkspace(),this.intervalId=setInterval(this.reinitWorkspace,1e3*(this.sharedState.memOffset+this.sharedState.taskOffset))},genDragItem:function(t,e){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return{id:"act".concat(e.row).concat(e.column),row:e.row,column:e.column,duration:15,height:1,title:t,firstRender:!0,isTarget:a,isStriked:!1}},genWorkSpace:function(t,e){var a=[],n=Math.ceil(t*e);console.log("TARGETS TO GENERATE:",n);for(var r=0;r<this.privateState.curPeriod.days;++r){this.statistics[this.probesTaken-1]["Total_targets"]+=n;for(var s=n,i=0;i<t;++i)t-i!==s?Math.random()>.5&&s?(a.push(this.genDragItem(this.pullSet[0][Math.floor(Math.random()*this.pullSet[0].length)],{column:r+1,row:i+1},!0)),--s):a.push(this.genDragItem(this.pullSet[1][Math.floor(Math.random()*this.pullSet[1].length)],{column:r+1,row:i+1})):(a.push(this.genDragItem(this.pullSet[0][Math.floor(Math.random()*this.pullSet[0].length)],{column:r+1,row:i+1},!0)),--s)}return a}}},pt=dt,ht=(a("c266"),Object(c["a"])(pt,v,g,!1,null,null,null)),ft=ht.exports,mt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"page"},[a("div",{staticClass:"instruction"},[a("p",{staticClass:"instruction__container",domProps:{innerHTML:t._s(this.taskText)}}),a("router-link",{staticClass:"instruction__link",attrs:{to:"/workspace"}},[t._v(" Приступить к выполнению задания ")])],1)])},_t=[],vt={name:"Instruction",created:function(){this.taskText=O.genTaskInstruction(this.sharedState)},data:function(){return{privateState:{},sharedState:O.sessionConfig}}},gt=vt,bt=(a("7867"),Object(c["a"])(gt,mt,_t,!1,null,"0d885ee2",null)),yt=bt.exports,kt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"page"},[t._v(" Config will be here ")])},St=[],wt={name:"Config",data:function(){return{privateState:{},sharedState:O.sessionConfig}}},Ct=wt,Dt=Object(c["a"])(Ct,kt,St,!1,null,"52618d37",null),Tt=Dt.exports,Ot=a("06aa"),It=a.n(Ot),Pt=a("8c4f");n["a"].config.productionTip=!1,n["a"].use(It.a),n["a"].use(Pt["a"]);var xt=[{path:"/workspace",component:ft},{path:"/about",component:yt},{path:"/config",component:Tt},{path:"*",component:_}],jt=new Pt["a"]({routes:xt});new n["a"]({render:function(t){return t(u)},router:jt}).$mount("#app")},"6c1e":function(t,e,a){"use strict";a("4132")},7867:function(t,e,a){"use strict";a("b191")},b191:function(t,e,a){},c266:function(t,e,a){"use strict";a("0729")},ecac:function(t,e,a){t.exports=a.p+"img/calendar-image.131994ee.svg"}});
//# sourceMappingURL=app.d2d4071a.js.map
import{g as W,l as K,m as w}from"./chunk-VNINKI3Y.js";import{k as G,n as J}from"./chunk-Y4Q22GGC.js";import{U as L,X as P,ka as j,la as q,ta as O,ua as N,z as A}from"./chunk-AR5P2KL7.js";import{Ab as k,Bb as u,Cb as b,Dc as Q,Fb as D,I as T,Ia as z,Ib as $,Oa as E,Sa as R,Ua as p,Wb as B,Xb as F,Ya as M,Zb as H,cb as f,ia as m,ib as I,ka as V,l as y,nb as r,ob as s,pa as d,pb as v,qa as _,tb as h,vb as c,wb as g}from"./chunk-QKGFT424.js";import{a as x,b as C}from"./chunk-ZFMGZBFO.js";var U=["table"];function X(i,o){if(i&1){let l=h();r(0,"div",6)(1,"div",7),v(2,"i",8),r(3,"input",9,10),c("input",function(){d(l);let e=k(4),n=g();return _(n.onSearchFilter(e.value))}),s()()()}}function Y(i,o){if(i&1){let l=h();r(0,"div",11)(1,"div",12)(2,"p-button",13),c("onClick",function(){d(l);let e=g();return _(e.onMessage(""))}),s()()()}i&2&&(p(2),f("rounded",!0)("rounded",!0)("plain",!0))}function Z(i,o){i&1&&(r(0,"tr"),v(1,"th",14),r(2,"th",15)(3,"div",6)(4,"span",6),u(5,"Source"),s()()(),r(6,"th",6)(7,"div",6)(8,"span",6),u(9,"Provide"),s()()()())}function ee(i,o){if(i&1){let l=h();r(0,"tr",16)(1,"td",14)(2,"p-button",17),c("onClick",function(){let n=d(l).$implicit,a=g();return _(a.onMessage("",n))}),s()(),r(3,"td",15)(4,"div",6)(5,"span",6),u(6),s()()(),r(7,"td",6)(8,"div",6)(9,"span",6),u(10),s()()()()}if(i&2){let l=o.$implicit;p(2),f("rounded",!0)("text",!0)("plain",!0),p(4),b(l.name),p(4),b(l.provide)}}var xe=(()=>{let o=class o{constructor(){this._sourcesSignal=R({sources:[],searchText:""}),this._sourcesEffect=M(()=>this.createTableValue(this._sourcesSignal())),this._store$=m(A),this._elementRef=m(E),this._dialogService=m(w),this._subscriptions=[this._store$.select(W).subscribe(t=>this._sourcesSignal.update(e=>C(x({},e),{sources:t})))],this.messageType={},this.tableValue=[]}onWindowResize(){this._onResize&&typeof this._onResize=="function"&&this._onResize()}createTableValue({sources:t,searchText:e}){if(this.tableValue=e.length===0?t:t.filter(({name:n})=>`${n}`.toLowerCase().indexOf(e)>=0),!this._onResize){this._onResize=()=>{let a=this._elementRef.nativeElement.querySelector(".row");if(a){let{height:S}=a.getBoundingClientRect();this.table.virtualScrollItemSize=S}};let n=y([!0]).pipe(T(0)).subscribe(()=>{this._onResize(),n.unsubscribe()})}}onSearchFilter(t){this._sourcesSignal.update(e=>C(x({},e),{searchText:`${t}`.toLowerCase()}))}onMessage(t,e){switch(t){default:this._store$.dispatch(P.showConfirmDialog({header:"Error",message:"Not implemented yet",accept:{label:"Close"}}));break}}ngOnDestroy(){this._subscriptions.forEach(t=>t.unsubscribe())}};o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=V({type:o,selectors:[["app-sources"]],viewQuery:function(e,n){if(e&1&&F(U,5),e&2){let a;B(a=H())&&(n.table=a.first)}},hostAttrs:[1,"flex","flex-column","overflow-hidden","h-full","settings-page"],hostBindings:function(e,n){e&1&&c("resize",function(S){return n.onWindowResize(S)},!1,z)},standalone:!0,features:[D([w]),$],decls:6,vars:4,consts:[["scrollHeight","flex",1,"w-full","h-full",3,"value","scrollable","virtualScroll","virtualScrollItemSize"],["table",""],["pTemplate","caption"],["pTemplate","summary"],["pTemplate","header"],["pTemplate","body"],[1,""],[1,"p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Search",1,"w-30rem",3,"input"],["searchInput",""],[1,"flex","justify-content-end"],[1,"px-2"],["icon","pi pi-plus text-xl","styleClass","w-3rem h-3rem","size","large",3,"rounded","plain","onClick"],[1,"w-3rem"],[1,"w-24rem"],[1,"row"],["icon","pi pi-pencil","styleClass","",3,"rounded","text","plain","onClick"]],template:function(e,n){e&1&&(r(0,"p-table",0,1),I(2,X,5,0,"ng-template",2)(3,Y,3,3,"ng-template",3)(4,Z,10,0,"ng-template",4)(5,ee,11,5,"ng-template",5),s()),e&2&&f("value",n.tableValue)("scrollable",!0)("virtualScroll",!0)("virtualScrollItemSize",0)},dependencies:[Q,q,j,N,O,L,J,G,K]});let i=o;return i})();export{xe as SourcesComponent};

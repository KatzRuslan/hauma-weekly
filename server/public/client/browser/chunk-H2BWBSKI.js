import{d as W,l as K,m as S}from"./chunk-VNINKI3Y.js";import{k as G,n as J}from"./chunk-Y4Q22GGC.js";import{U as Q,X as O,ka as j,la as q,ta as N,ua as P,z as L}from"./chunk-AR5P2KL7.js";import{Ab as k,Bb as m,Cb as w,Dc as H,Fb as I,I as T,Ia as V,Ib as $,Oa as z,Sa as E,Ua as p,Wb as D,Xb as B,Ya as R,Zb as F,cb as _,ia as c,ib as M,ka as A,l as y,nb as r,ob as s,pa as d,pb as v,qa as h,tb as f,vb as u,wb as g}from"./chunk-QKGFT424.js";import{a as C,b}from"./chunk-ZFMGZBFO.js";var U=["table"];function X(i,o){if(i&1){let a=f();r(0,"div",6)(1,"div",7),v(2,"i",8),r(3,"input",9,10),u("input",function(){d(a);let e=k(4),n=g();return h(n.onSearchFilter(e.value))}),s()()()}}function Y(i,o){if(i&1){let a=f();r(0,"div",11)(1,"div",12)(2,"p-button",13),u("onClick",function(){d(a);let e=g();return h(e.onMessage(""))}),s()()()}i&2&&(p(2),_("rounded",!0)("rounded",!0)("plain",!0))}function Z(i,o){i&1&&(r(0,"tr"),v(1,"th",14),r(2,"th",15)(3,"div",6)(4,"span",6),m(5,"Author Name"),s()()(),r(6,"th",6)(7,"div",6)(8,"span",6),m(9,"Author Link"),s()()()())}function ee(i,o){if(i&1){let a=f();r(0,"tr",16)(1,"td",14)(2,"p-button",17),u("onClick",function(){let n=d(a).$implicit,l=g();return h(l.onMessage("",n))}),s()(),r(3,"td",15)(4,"div",6)(5,"span",6),m(6),s()()(),r(7,"td",6)(8,"div",6)(9,"span",6),m(10),s()()()()}if(i&2){let a=o.$implicit;p(2),_("rounded",!0)("text",!0)("plain",!0),p(4),w(a.name),p(4),w(a.link)}}var Ce=(()=>{let o=class o{constructor(){this._authorsSignal=E({authors:[],searchText:""}),this._articlesEffect=R(()=>this.createTableValue(this._authorsSignal())),this._store$=c(L),this._elementRef=c(z),this._dialogService=c(S),this._subscriptions=[this._store$.select(W).subscribe(t=>this._authorsSignal.update(e=>b(C({},e),{authors:t})))],this.messageType={},this.tableValue=[]}onWindowResize(){this._onResize&&typeof this._onResize=="function"&&this._onResize()}createTableValue({authors:t,searchText:e}){if(this.tableValue=e.length===0?t:t.filter(({name:n,link:l})=>`${n}`.toLowerCase().indexOf(e)>=0||`${l}`.toLowerCase().indexOf(e)>=0),!this._onResize){this._onResize=()=>{let l=this._elementRef.nativeElement.querySelector(".row");if(l){let{height:x}=l.getBoundingClientRect();this.table.virtualScrollItemSize=x}};let n=y([!0]).pipe(T(0)).subscribe(()=>{this._onResize(),n.unsubscribe()})}}onSearchFilter(t){this._authorsSignal.update(e=>b(C({},e),{searchText:`${t}`.toLowerCase()}))}onMessage(t,e){switch(t){default:this._store$.dispatch(O.showConfirmDialog({header:"Error",message:"Not implemented yet",accept:{label:"Close"}}));break}}ngOnDestroy(){this._subscriptions.forEach(t=>t.unsubscribe())}};o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=A({type:o,selectors:[["app-authors"]],viewQuery:function(e,n){if(e&1&&B(U,5),e&2){let l;D(l=F())&&(n.table=l.first)}},hostAttrs:[1,"flex","flex-column","overflow-hidden","h-full","settings-page"],hostBindings:function(e,n){e&1&&u("resize",function(x){return n.onWindowResize(x)},!1,V)},standalone:!0,features:[I([S]),$],decls:6,vars:4,consts:[["scrollHeight","flex",1,"w-full","h-full",3,"value","scrollable","virtualScroll","virtualScrollItemSize"],["table",""],["pTemplate","caption"],["pTemplate","summary"],["pTemplate","header"],["pTemplate","body"],[1,""],[1,"p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Search",1,"w-30rem",3,"input"],["searchInput",""],[1,"flex","justify-content-end"],[1,"px-2"],["icon","pi pi-plus text-xl","styleClass","w-3rem h-3rem","size","large",3,"rounded","plain","onClick"],[1,"w-3rem"],[1,"w-4"],[1,"row"],["icon","pi pi-pencil","styleClass","",3,"rounded","text","plain","onClick"]],template:function(e,n){e&1&&(r(0,"p-table",0,1),M(2,X,5,0,"ng-template",2)(3,Y,3,3,"ng-template",3)(4,Z,10,0,"ng-template",4)(5,ee,11,5,"ng-template",5),s()),e&2&&_("value",n.tableValue)("scrollable",!0)("virtualScroll",!0)("virtualScrollItemSize",0)},dependencies:[H,q,j,P,N,Q,J,G,K]});let i=o;return i})();export{Ce as AuthorsComponent};
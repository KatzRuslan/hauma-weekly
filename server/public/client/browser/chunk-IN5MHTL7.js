import{a as W}from"./chunk-ATKJGPFU.js";import{f as P,l as X,m as v}from"./chunk-VNINKI3Y.js";import"./chunk-XGC7MIBL.js";import"./chunk-7BTGCGPX.js";import"./chunk-SOWXVAUG.js";import{k as J,n as K}from"./chunk-Y4Q22GGC.js";import{U as L,X as O,ka as j,la as q,ta as N,ua as U,xa as G,z as Q}from"./chunk-AR5P2KL7.js";import{Ab as D,Bb as x,Cb as I,Dc as A,Fb as k,I as w,Ia as V,Ib as $,Oa as z,Sa as R,Ua as _,Wb as B,Xb as F,Ya as M,Zb as H,cb as d,ia as p,ib as E,ka as S,l as b,nb as o,ob as a,pa as c,pb as C,qa as u,tb as f,vb as m,wb as h}from"./chunk-QKGFT424.js";import{a as g,b as T}from"./chunk-ZFMGZBFO.js";var Y=["table"];function Z(i,r){if(i&1){let s=f();o(0,"div",6)(1,"div",7),C(2,"i",8),o(3,"input",9,10),m("input",function(){c(s);let e=D(4),n=h();return u(n.onSearchFilter(e.value))}),a()()()}}function ee(i,r){if(i&1){let s=f();o(0,"div",11)(1,"div",12)(2,"p-button",13),m("onClick",function(){c(s);let e=h();return u(e.onMessage(""))}),a()()()}i&2&&(_(2),d("rounded",!0)("rounded",!0)("plain",!0))}function te(i,r){i&1&&(o(0,"tr"),C(1,"th",14),o(2,"th",6)(3,"div",6)(4,"span",6),x(5,"Type Name"),a()()()())}function ie(i,r){if(i&1){let s=f();o(0,"tr",15)(1,"td",14)(2,"p-button",16),m("onClick",function(){let n=c(s).$implicit,l=h();return u(l.onMessage("",n))}),a()(),o(3,"td",6)(4,"div",6)(5,"span",6),x(6),a()()()()}if(i&2){let s=r.$implicit;_(2),d("rounded",!0)("text",!0)("plain",!0),_(4),I(s.name)}}var Se=(()=>{let r=class r{constructor(){this._articleTypesSignal=R({articleTypes:[],searchText:""}),this._articleTypesEffect=M(()=>this.createTableValue(this._articleTypesSignal())),this._store$=p(Q),this._utilsService=p(W),this._elementRef=p(z),this._dialogService=p(v),this._subscriptions=[this._store$.select(P).subscribe(t=>this._articleTypesSignal.update(e=>T(g({},e),{articleTypes:t})))],this.messageType={},this.tableValue=[]}onWindowResize(){this._onResize&&typeof this._onResize=="function"&&this._onResize()}createTableValue({articleTypes:t,searchText:e}){if(this.tableValue=e.length===0?t:t.filter(({name:n})=>`${n}`.toLowerCase().indexOf(e)>=0),!this._onResize){this._onResize=()=>{let l=this._elementRef.nativeElement.querySelector(".row");if(l){let{height:y}=l.getBoundingClientRect();this.table.virtualScrollItemSize=y}};let n=b([!0]).pipe(w(0)).subscribe(()=>{this._onResize(),n.unsubscribe()})}}onSearchFilter(t){this._articleTypesSignal.update(e=>T(g({},e),{searchText:`${t}`.toLowerCase()}))}onMessage(t,e){switch(t){default:this._store$.dispatch(O.showConfirmDialog({header:"Error",message:"Not implemented yet",accept:{label:"Close"}}));break}}ngOnDestroy(){this._subscriptions.forEach(t=>t.unsubscribe())}};r.\u0275fac=function(e){return new(e||r)},r.\u0275cmp=S({type:r,selectors:[["app-types"]],viewQuery:function(e,n){if(e&1&&F(Y,5),e&2){let l;B(l=H())&&(n.table=l.first)}},hostAttrs:[1,"flex","flex-column","overflow-hidden","h-full","settings-page"],hostBindings:function(e,n){e&1&&m("resize",function(y){return n.onWindowResize(y)},!1,V)},standalone:!0,features:[k([v]),$],decls:6,vars:4,consts:[["scrollHeight","flex",1,"w-full","h-full",3,"value","scrollable","virtualScroll","virtualScrollItemSize"],["table",""],["pTemplate","caption"],["pTemplate","summary"],["pTemplate","header"],["pTemplate","body"],[1,""],[1,"p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Search",1,"w-30rem",3,"input"],["searchInput",""],[1,"flex","justify-content-end"],[1,"px-2"],["icon","pi pi-plus text-xl","styleClass","w-3rem h-3rem","size","large",3,"rounded","plain","onClick"],[1,"w-3rem"],[1,"row"],["icon","pi pi-pencil","styleClass","",3,"rounded","text","plain","onClick"]],template:function(e,n){e&1&&(o(0,"p-table",0,1),E(2,Z,5,0,"ng-template",2)(3,ee,3,3,"ng-template",3)(4,te,6,0,"ng-template",4)(5,ie,7,4,"ng-template",5),a()),e&2&&d("value",n.tableValue)("scrollable",!0)("virtualScroll",!0)("virtualScrollItemSize",0)},dependencies:[A,q,j,U,N,L,G,K,J,X],styles:[".article-type-provides-cell[_ngcontent-%COMP%]{max-width:32rem;min-width:32rem}"]});let i=r;return i})();export{Se as TypesComponent};

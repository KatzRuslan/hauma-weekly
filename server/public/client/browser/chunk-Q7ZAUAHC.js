import{a as K}from"./chunk-G2SKXV7L.js";import{c as j}from"./chunk-VCWKP6TM.js";import{e as J,f as S}from"./chunk-5DINNPRL.js";import{k as U,n as G}from"./chunk-53EWOXEW.js";import{U as L,X as W,ka as q,la as O,ta as P,ua as N,z as A}from"./chunk-DL4SJKHN.js";import{Ab as I,Bb as v,Cb as k,Dc as Q,Fb as D,I as y,Ia as V,Ib as $,Oa as z,Sa as R,Ua as _,Wb as B,Xb as F,Ya as E,Zb as H,cb as f,ia as p,ib as M,ka as T,l as w,nb as r,ob as a,pa as m,pb as b,qa as u,tb as d,vb as c,wb as g}from"./chunk-6B4JMWCY.js";import{a as C,b as x}from"./chunk-CGT2X6C5.js";var X=["table"];function Y(i,o){if(i&1){let l=d();r(0,"div",6)(1,"div",7),b(2,"i",8),r(3,"input",9,10),c("input",function(){m(l);let e=I(4),n=g();return u(n.onSearchFilter(e.value))}),a()()()}}function Z(i,o){if(i&1){let l=d();r(0,"div",11)(1,"div",12)(2,"p-button",13),c("onClick",function(){m(l);let e=g();return u(e.onMessage(""))}),a()()()}i&2&&(_(2),f("rounded",!0)("rounded",!0)("plain",!0))}function ee(i,o){i&1&&(r(0,"tr"),b(1,"th",14),r(2,"th",6)(3,"div",6)(4,"span",6),v(5,"Category"),a()()()())}function te(i,o){if(i&1){let l=d();r(0,"tr",15)(1,"td",14)(2,"p-button",16),c("onClick",function(){let n=m(l).$implicit,s=g();return u(s.onMessage("",n))}),a()(),r(3,"td",6)(4,"div",6)(5,"span",6),v(6),a()()()()}if(i&2){let l=o.$implicit;_(2),f("rounded",!0)("text",!0)("plain",!0),_(4),k(l.name)}}var ve=(()=>{let o=class o{constructor(){this._categoriesSignal=R({categories:[],searchText:""}),this._categoriesEffect=E(()=>this.createTableValue(this._categoriesSignal())),this._store$=p(A),this._utilsService=p(K),this._elementRef=p(z),this._dialogService=p(S),this._subscriptions=[this._store$.select(j).subscribe(t=>this._categoriesSignal.update(e=>x(C({},e),{categories:t})))],this.messageType={},this.tableValue=[]}onWindowResize(){this._onResize&&typeof this._onResize=="function"&&this._onResize()}createTableValue({categories:t,searchText:e}){if(this.tableValue=e.length===0?t:t.filter(({name:n})=>`${n}`.toLowerCase().indexOf(e)>=0),!this._onResize){this._onResize=()=>{let s=this._elementRef.nativeElement.querySelector(".row");if(s){let{height:h}=s.getBoundingClientRect();this.table.virtualScrollItemSize=h}};let n=w([!0]).pipe(y(0)).subscribe(()=>{this._onResize(),n.unsubscribe()})}}onSearchFilter(t){this._categoriesSignal.update(e=>x(C({},e),{searchText:`${t}`.toLowerCase()}))}onMessage(t,e){switch(t){default:this._store$.dispatch(W.showConfirmDialog({header:"Error",message:"Not implemented yet",accept:{label:"Close"}}));break}}ngOnDestroy(){this._subscriptions.forEach(t=>t.unsubscribe())}};o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=T({type:o,selectors:[["app-categories"]],viewQuery:function(e,n){if(e&1&&F(X,5),e&2){let s;B(s=H())&&(n.table=s.first)}},hostAttrs:[1,"flex","flex-column","overflow-hidden","h-full","settings-page"],hostBindings:function(e,n){e&1&&c("resize",function(h){return n.onWindowResize(h)},!1,V)},standalone:!0,features:[D([S]),$],decls:6,vars:4,consts:[["scrollHeight","flex",1,"w-full","h-full",3,"value","scrollable","virtualScroll","virtualScrollItemSize"],["table",""],["pTemplate","caption"],["pTemplate","summary"],["pTemplate","header"],["pTemplate","body"],[1,""],[1,"p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Search",1,"w-30rem",3,"input"],["searchInput",""],[1,"flex","justify-content-end"],[1,"px-2"],["icon","pi pi-plus text-xl","styleClass","w-3rem h-3rem","size","large",3,"rounded","plain","onClick"],[1,"w-3rem"],[1,"row"],["icon","pi pi-pencil","styleClass","",3,"rounded","text","plain","onClick"]],template:function(e,n){e&1&&(r(0,"p-table",0,1),M(2,Y,5,0,"ng-template",2)(3,Z,3,3,"ng-template",3)(4,ee,6,0,"ng-template",4)(5,te,7,4,"ng-template",5),a()),e&2&&f("value",n.tableValue)("scrollable",!0)("virtualScroll",!0)("virtualScrollItemSize",0)},dependencies:[Q,O,q,N,P,L,G,U,J]});let i=o;return i})();export{ve as CategoriesComponent};
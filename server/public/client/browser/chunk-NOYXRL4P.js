import{b as N,h as O,u as K,x as W}from"./chunk-AWRCFJFY.js";import{Ba as X,Ca as w,W as q,la as H,ma as U,ua as G,va as J,z as k}from"./chunk-WJVBO42W.js";import{k as j,n as F,p as P}from"./chunk-WWUOJ4AY.js";import{Db as y,Eb as _,Ib as z,Jb as c,Kb as C,Nb as M,Qa as L,Sb as $,Y as h,Za as p,ac as V,bc as B,ec as D,fc as R,g as T,hb as s,hc as Q,ka as m,m as f,ma as I,nb as x,ra as g,sa as v,sb as o,tb as r,ub as u,vb as A,wb as E,yb as S,z as b}from"./chunk-WNSXTYT4.js";import"./chunk-5FZOKLP6.js";var Y=["table"];function Z(t,n){if(t&1){let l=S();o(0,"div",7)(1,"div",8),u(2,"i",9),o(3,"input",10,11),y("input",function(){g(l);let e=z(4),a=_(2);return v(a.onInputSearch(e.value))}),r()()()}}function ee(t,n){t&1&&(o(0,"div",12)(1,"div",13),u(2,"p-button",14),r()()),t&2&&(p(2),s("rounded",!0)("rounded",!0)("plain",!0))}function te(t,n){t&1&&(o(0,"tr")(1,"th",15)(2,"div",7)(3,"span",7),c(4,"Author Name"),r()()(),o(5,"th",15)(6,"div",7)(7,"span",7),c(8,"Author Link"),r()()(),o(9,"th",16)(10,"div",7),u(11,"span",7),r()()())}function ie(t,n){if(t&1&&(o(0,"tr",17)(1,"td",18)(2,"div",7)(3,"span",7),c(4),r()()(),o(5,"td",7)(6,"div",7)(7,"span",7),c(8),r()()(),o(9,"td",19),u(10,"p-button",20),r()()),t&2){let l=n.$implicit,i=_().ngIf;p(4),C(l.name),p(4),C(l.link),p(2),s("rounded",!0)("text",!0)("plain",!0)("disabled",i.length<=1)}}function ne(t,n){if(t&1){let l=S();A(0),o(1,"p-table",1,2),y("onLazyLoad",function(){g(l);let e=_();return v(e.onLazyLoad())}),x(3,Z,5,0,"ng-template",3)(4,ee,3,3,"ng-template",4)(5,te,12,0,"ng-template",5)(6,ie,11,6,"ng-template",6),r(),E()}if(t&2){let l=n.ngIf;p(1),s("value",l)("scrollable",!0)("virtualScroll",!0)("virtualScrollItemSize",0)("lazy",!0)}}var Ce=(()=>{let n=class n{constructor(){this._store$=m(k),this._utilsService=m(O),this._elementRef=m(L),this._dialogService=m(w),this.authors$=this._store$.select(N).pipe(h(i=>this._search$.pipe(h(e=>b(()=>!!e&&e.length>1,f(i.filter(({name:a,link:d})=>a.toLowerCase().indexOf(e)>=0||d.toLowerCase().indexOf(e)>=0)),f(i)))))),this._search$=new T("")}onInputSearch(i){this._search$.next(i.toLowerCase())}onLazyLoad(){let i=this._elementRef.nativeElement.querySelector(".author-row");if(i){let{height:e}=i.getBoundingClientRect();this.table.virtualScrollItemSize=e}}};n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=I({type:n,selectors:[["app-authors"]],viewQuery:function(e,a){if(e&1&&R(Y,5),e&2){let d;D(d=Q())&&(a.table=d.first)}},hostAttrs:[1,"flex","flex-column","overflow-hidden","h-full","settings-page"],standalone:!0,features:[M([w]),$],decls:2,vars:3,consts:[[4,"ngIf"],["scrollHeight","flex",1,"w-full","h-full",3,"value","scrollable","virtualScroll","virtualScrollItemSize","lazy","onLazyLoad"],["table",""],["pTemplate","caption"],["pTemplate","summary"],["pTemplate","header"],["pTemplate","body"],[1,""],[1,"p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Search",3,"input"],["searchInput",""],[1,"flex","justify-content-end"],[1,"px-2"],["icon","pi pi-plus text-xl","styleClass","w-3rem h-3rem","size","large",3,"rounded","plain"],[1,"text-cell"],[1,"icon-cell"],[1,"author-row"],[1,"w-4"],[1,"w-3rem"],["icon","pi pi-trash","styleClass","",3,"rounded","text","plain","disabled"]],template:function(e,a){e&1&&(x(0,ne,7,5,"ng-container",0),V(1,"async")),e&2&&s("ngIf",B(1,1,a.authors$))},dependencies:[P,j,F,U,H,J,G,q,W,K,X]});let t=n;return t})();export{Ce as AuthorsComponent};

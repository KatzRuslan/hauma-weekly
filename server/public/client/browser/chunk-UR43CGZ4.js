import{g as y,i as k,j as x}from"./chunk-YGPIIVOW.js";import{Bb as h,Cb as g,Ib as i,Ua as o,cb as c,ka as r,kb as l,lb as d,mb as f,nb as s,ob as p,pb as v}from"./chunk-6B4JMWCY.js";import"./chunk-CGT2X6C5.js";function w(t,e){if(t&1&&(s(0,"li",2)(1,"a",3)(2,"span",4),h(3),p()()()),t&2){let m=e.$implicit;o(1),c("routerLink",m.routerLink),o(2),g(m.name)}}var L=(()=>{let e=class e{constructor(){this.navigations=[{name:"Authors",routerLink:["authors"]},{name:"Categories",routerLink:["categories"]},{name:"Sources",routerLink:["sources"]},{name:"Types",routerLink:["types"]},{name:"Import Data from Excel",routerLink:["excel-uploader"]}]}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=r({type:e,selectors:[["app-side-menu"]],hostAttrs:[1,"settings-menu"],standalone:!0,features:[i],decls:4,vars:0,consts:[[1,"surface-50","h-full","border-top-1","border-200"],[1,"list-none","m-0","p-2"],[1,"m-2","surface-100"],["routerLinkActive","text-primary-600 font-bold",1,"block","text-primary-400","py-2","px-3","no-underline",3,"routerLink"],[1,""],["class","m-2 surface-100"]],template:function(n,u){n&1&&(s(0,"nav",0)(1,"ul",1),d(2,w,4,2,"li",5,l),p()()),n&2&&(o(2),f(u.navigations))},dependencies:[k,x]});let t=e;return t})();var F=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=r({type:e,selectors:[["app-settings"]],hostAttrs:[1,"flex","overflow-hidden","w-full","h-full","w-screen"],standalone:!0,features:[i],decls:2,vars:0,consts:[[1,""]],template:function(n,u){n&1&&v(0,"app-side-menu",0)(1,"router-outlet")},dependencies:[y,L],styles:["[_nghost-%COMP%]     .settings-menu{width:24rem}[_nghost-%COMP%]     .settings-page{width:calc(100vw - 24rem)}"]});let t=e;return t})();export{F as SettingsComponent};
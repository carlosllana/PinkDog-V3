import{a as U}from"./chunk-OIN77ZIN.js";import{a as V,b as B,c as H,d as W}from"./chunk-37O235QL.js";import"./chunk-5M45MVM6.js";import{b as j,c as T,d as L,e as M,f as _,i as z}from"./chunk-M4TDATJR.js";import{f as Y,g as v,h as E,m as Z,n as O,p as G,u as X}from"./chunk-MMDDSW2H.js";import"./chunk-WXI33M2S.js";import{d as w}from"./chunk-43UHBQCO.js";import{$ as c,Hb as s,K as P,Kb as p,Ta as I,V as A,Va as b,Xa as C,_a as N,db as S,ka as g,lb as R,qb as F,ra as h,ta as y,ua as f,ub as a,vb as r,wa as D,wb as l}from"./chunk-X3ETWY4L.js";var q=[{path:"home",loadComponent:()=>import("./chunk-FIQUD4FY.js")},{path:"portfolio",loadComponent:()=>import("./chunk-UG6JYMTW.js")},{path:"casestudies",loadComponent:()=>import("./chunk-RXHX4JXM.js")},{path:"team",loadComponent:()=>import("./chunk-SHVBS6OG.js")},{path:"services",loadComponent:()=>import("./chunk-W26U3XBZ.js")},{path:"dashboard",loadComponent:()=>import("./chunk-J5K3OWZS.js")},{path:"",loadComponent:()=>import("./chunk-FIQUD4FY.js")}];var le=(()=>{let e=class e extends O{constructor(o,t,d){super(o,t,d,f(b,{optional:!0}))}ngOnDestroy(){this.flush()}};e.\u0275fac=function(t){return new(t||e)(y(w),y(v),y(E))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let i=e;return i})();function se(){return new Z}function de(i,e,n){return new X(i,e,n)}var J=[{provide:E,useFactory:se},{provide:O,useClass:le},{provide:C,useFactory:de,deps:[M,O,S]}],me=[{provide:v,useFactory:()=>new G},{provide:h,useValue:"BrowserAnimations"},...J],Oe=[{provide:v,useClass:Y},{provide:h,useValue:"NoopAnimations"},...J];function K(){return[...me]}var Q=(()=>{let e=class e{constructor(){this.isLoading=N(!1)}hide(){this.isLoading.set(!1)}show(){this.isLoading.set(!0)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=g({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();var $=(i,e)=>{let n=f(Q);return n.show(),e(i).pipe(P(()=>n.hide()))};var ce="@",pe=(()=>{let e=class e{constructor(o,t,d,m,x){this.doc=o,this.delegate=t,this.zone=d,this.animationType=m,this.moduleImpl=x,this._rendererFactoryPromise=null,this.scheduler=f(b,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-HCC5VS6D.js")).catch(t=>{throw new A(5300,!1)}).then(({\u0275createEngine:t,\u0275AnimationRendererFactory:d})=>{this._engine=t(this.animationType,this.doc,this.scheduler);let m=new d(this.delegate,this._engine,this.zone);return this.delegate=m,m})}createRenderer(o,t){let d=this.delegate.createRenderer(o,t);if(d.\u0275type===0)return d;typeof d.throwOnSyntheticProps=="boolean"&&(d.throwOnSyntheticProps=!1);let m=new k(d);return t?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(x=>{let ae=x.createRenderer(o,t);m.use(ae)}).catch(x=>{m.use(d)}),m}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(t){I()},e.\u0275prov=g({token:e,factory:e.\u0275fac});let i=e;return i})(),k=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let n of this.replay)n(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,n){return this.delegate.createElement(e,n)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,n){this.delegate.appendChild(e,n)}insertBefore(e,n,o,t){this.delegate.insertBefore(e,n,o,t)}removeChild(e,n,o){this.delegate.removeChild(e,n,o)}selectRootElement(e,n){return this.delegate.selectRootElement(e,n)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,n,o,t){this.delegate.setAttribute(e,n,o,t)}removeAttribute(e,n,o){this.delegate.removeAttribute(e,n,o)}addClass(e,n){this.delegate.addClass(e,n)}removeClass(e,n){this.delegate.removeClass(e,n)}setStyle(e,n,o,t){this.delegate.setStyle(e,n,o,t)}removeStyle(e,n,o){this.delegate.removeStyle(e,n,o)}setProperty(e,n,o){this.shouldReplay(n)&&this.replay.push(t=>t.setProperty(e,n,o)),this.delegate.setProperty(e,n,o)}setValue(e,n){this.delegate.setValue(e,n)}listen(e,n,o){return this.shouldReplay(n)&&this.replay.push(t=>t.listen(e,n,o)),this.delegate.listen(e,n,o)}shouldReplay(e){return this.replay!==null&&e.startsWith(ce)}};function ee(i="animations"){return D([{provide:C,useFactory:(e,n,o)=>new pe(e,n,o,i),deps:[w,M,S]},{provide:h,useValue:i==="noop"?"NoopAnimations":"BrowserAnimations"}])}var te={providers:[K(),H(q,W()),j(L(),T([$])),z(),ee()]};var ne=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c({type:e,selectors:[["app-header"]],standalone:!0,features:[p],decls:29,vars:0,consts:[[1,"container-flex",2,"border-bottom","solid 1px #4C0054"],["id","mainnav",1,"container"],[1,"d-flex","justify-content-center","py-3"],["href","#",1,"nav-link","navbar-brand","logosmall"],["src","../../assets/img/logosmall.svg"],[1,"navbar","navbar-expand-md"],["type","button","data-toggle","collapse","data-target","#collapsibleNavbar",1,"navbar-toggler"],[1,"navbar-toggler-icon"],["id","collapsibleNavbar",1,"collapse","navbar-collapse"],[1,"nav","nav-pills"],[1,"nav-item"],["routerLinkActive","active","routerLink","/portfolio",1,"nav-link"],["href","#","routerLink","/services",1,"nav-link"],["routerLink","/home",1,"nav-link","navbar-brand"],["src","../../assets/img/logo.svg"],["href","#","routerLink","/casestudies",1,"nav-link"],["href","#","routerLink","/team",1,"nav-link"],["id","btnheader",1,"nav-item"],["href","#","data-bs-toggle","modal","data-bs-target","#exampleModal",1,"nav-link"]],template:function(t,d){t&1&&(a(0,"div",0)(1,"div",1)(2,"header",2)(3,"a",3),l(4,"img",4),r(),a(5,"nav",5)(6,"button",6),l(7,"span",7),r(),a(8,"div",8)(9,"ul",9)(10,"li",10)(11,"a",11),s(12,"Portfolio"),r()(),a(13,"li",10)(14,"a",12),s(15,"Services"),r()(),a(16,"li")(17,"a",13),l(18,"img",14),r()(),a(19,"li",10)(20,"a",15),s(21,"What we do"),r()(),a(22,"li",10)(23,"a",16),s(24,"Our team"),r()(),a(25,"li",17)(26,"a",18),s(27,"Contact"),r()()()()()()()(),l(28,"app-modal"))},dependencies:[B,U],styles:[".nav-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:active{color:#ff7bc9;text-decoration:none}.nav-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus{color:#ff7bc9}.nav-item[_ngcontent-%COMP%]:hover{text-decoration:none;color:#e8ff48;padding-bottom:0;-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear}.nav-link[_ngcontent-%COMP%]:hover{text-decoration:none}#btnheader[_ngcontent-%COMP%]{background-color:#ff7bc9;border-radius:30px;padding-left:10px;padding-right:10px;float:right;right:-300px;position:absolute;text-align:center;height:40px;line-height:22px;border:solid 1px #4C0054;-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear}#btnheader[_ngcontent-%COMP%]:hover{background-color:#4c0054;border-radius:30px;padding-left:10px;padding-right:10px;text-align:center;line-height:22px;border:solid 1px #4C0054;-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear}.navbar-brand[_ngcontent-%COMP%]{text-align:center;margin-right:0;margin-left:0;width:300px}"]});let i=e;return i})();var ie=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c({type:e,selectors:[["app-footer"]],standalone:!0,features:[p],decls:69,vars:0,consts:[[1,"container-fluid",2,"background-color","#450351"],[1,"justify-content-center","d-flex"],[1,"d-flex",2,"height","320px"],[1,"col-xxl-3","offset-xxl-1","pt-3","text-end",2,"text-align","center","align-items","center"],["src","../../assets/img/logowhite.svg","id","logofooter"],[1,"col-4","align-bottom","p-5","justify-content-center",2,"border-left","solid 1px white","border-right","solid 1px white","text-align","start"],[2,"color","white"],["href","#"],[1,"d-grid","gap-2"],["type","button","data-bs-toggle","modal","data-bs-target","#exampleModal",1,"btn","btn-primary","btnverde",2,"max-width","100%"],[1,"col-xl-3","col-lg-3","align-bottom","pt-3"],[1,"row","my-3"],[1,"col-xl-3","col-lg-2","text-start","footerlinks"],[1,"col-xl-4","col-lg-6","text-start","footerlinks"],[1,"d-flex","pt-4","text-end"],[1,"col-2","footericons1"],["href","#",1,"footericons"],[1,"bi","bi-linkedin"],[1,"col-2"],[1,"bi","bi-youtube"],[1,"bi","bi-instagram"],[1,"bi","bi-google"],[1,"col-auto","ml-auto","mr-auto"],[1,"row","d-flex",2,"border-top","solid 1px white","height","80px","line-height","40px","text-align","center"],[1,"col-md-12","d-flex","justify-content-center"],[1,"justify-content-center","px-4","px-md-2","px-lg-4","pt-3"],["href","#",1,"text-white"],["href","#",1,"text-white",2,"opacity","50%"]],template:function(t,d){t&1&&(a(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),l(4,"img",4),r(),a(5,"div",5)(6,"div")(7,"h2",6),s(8,"Give us a whistle!"),r(),a(9,"p")(10,"a",7),s(11,"hellopinkdogstudio.com"),r()(),a(12,"p")(13,"a",7),s(14,"SLC +56 9 3708 8574"),r()(),a(15,"p")(16,"a",7),s(17,"SLC +56 9 3708 8574"),r()(),a(18,"div",8)(19,"button",9),s(20,"Contact"),r()()()(),a(21,"div",10)(22,"div",11)(23,"div",12)(24,"a",7),s(25,"Portfolio"),r(),l(26,"br"),a(27,"a",7),s(28,"Services"),r(),l(29,"br"),a(30,"a",7),s(31,"Portfolio"),r(),l(32,"br"),r(),a(33,"div",13)(34,"a",7),s(35,"Our Team"),r(),l(36,"br"),a(37,"a",7),s(38,"Blog"),r(),l(39,"br"),a(40,"a",7),s(41,"Our Team"),r(),l(42,"br"),r(),a(43,"div",14)(44,"div",15)(45,"a",16),l(46,"i",17),r()(),a(47,"div",18)(48,"a",16),l(49,"i",19),r()(),a(50,"div",18)(51,"a",16),l(52,"i",20),r()(),a(53,"div",18)(54,"a",16),l(55,"i",21),r()()()()(),l(56,"div",22)(57,"div",22),r()(),a(58,"div",23)(59,"div",24)(60,"div",25)(61,"a",26),s(62,"Privacy Policy"),r()(),a(63,"div",25)(64,"a",26),s(65,"Disclaimer"),r()(),a(66,"div",25)(67,"a",27),s(68,"Copyright \xA9 2024 \u2022 Pink Dog"),r()()()()())},styles:["a[_ngcontent-%COMP%]{color:#fff;text-decoration:none;font-family:HelveticaNeve}a[_ngcontent-%COMP%]:hover{color:#e8ff48;-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear}p[_ngcontent-%COMP%]{color:#4c0054;font-size:16px;font-family:HelveticaNeve;font-weight:100;word-wrap:break-word;margin-bottom:20px}h2[_ngcontent-%COMP%]{line-height:28px}.btnverde[_ngcontent-%COMP%]{-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear}.footerlinks[_ngcontent-%COMP%]{margin-top:42px;margin-left:60px;line-height:40px}.footericons[_ngcontent-%COMP%]{margin-left:0;margin-right:0}.footericons1[_ngcontent-%COMP%]{margin-left:14px;margin-right:0}#logofooter[_ngcontent-%COMP%]{margin-right:70px;margin-top:40px;max-height:160px;max-width:200px}@media only screen and (max-width: 1200px){h2[_ngcontent-%COMP%]{font-size:26px}.footericons[_ngcontent-%COMP%], .footericons1[_ngcontent-%COMP%]{margin-left:10px;margin-right:10px}.footerlinks[_ngcontent-%COMP%]{margin-left:40px}#logofooter[_ngcontent-%COMP%]{margin-right:20px;margin-top:40px;max-height:120px;max-width:160px}}"]});let i=e;return i})();var oe=(()=>{let e=class e{constructor(){this.isLoading=!1}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c({type:e,selectors:[["app-spinner"]],inputs:{isLoading:"isLoading"},standalone:!0,features:[p],decls:6,vars:0,consts:[[1,"container-fluid","justify-content-center","align-items-center","align-middle","overlay"],[1,"row","justify-content-center","align-items-center","align-middle"],[1,"col","mx-auto","my-auto"],[1,"col","mx-auto","my-auto","justify-content-center","align-items-center","align-middle",2,"text-align","center"],["src","../../../assets/img/logo-white.svg",1,"justify-content-center","align-items-center","align-middle","overlayimg"]],template:function(t,d){t&1&&(a(0,"div",0)(1,"div",1),l(2,"div",2),a(3,"div",3),l(4,"img",4),r(),l(5,"div",2),r()())},styles:[".overlay[_ngcontent-%COMP%]{max-width:100%;max-height:100%;width:100%;height:100%;inset:0;background-color:#4c0054;position:fixed;z-index:999;overflow:hidden;transition:all .3s ease-in-out}.overlayimg[_ngcontent-%COMP%]{margin-top:70%;transition:all .3s ease-in-out}"]});let i=e;return i})();function ge(i,e){i&1&&l(0,"app-spinner")}var re=(()=>{let e=class e{constructor(){this.isLoading=!0}ngOnInit(){setTimeout(()=>{this.isLoading=!1},3e3)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c({type:e,selectors:[["app-root"]],standalone:!0,features:[p],decls:4,vars:1,template:function(t,d){t&1&&(R(0,ge,1,0,"app-spinner"),l(1,"app-header")(2,"router-outlet")(3,"app-footer")),t&2&&F(0,d.isLoading?0:-1)},dependencies:[V,ne,ie,oe]});let i=e;return i})();_(re,te).catch(i=>console.error(i));

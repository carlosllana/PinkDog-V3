import{f as U,g as x,h as P,m as V,n as k,p as W,u as q}from"./chunk-XA4VBUPZ.js";import"./chunk-WXI33M2S.js";import{a as H}from"./chunk-I3DHGDSL.js";import{b as z,c as B,d as G,e as Y}from"./chunk-2YVLKKGX.js";import{b as j,c as N,d as O,e as T,h as L}from"./chunk-6M567NFD.js";import{d as M}from"./chunk-MXPZBIT6.js";import"./chunk-3PCBEIQK.js";import{J as S,Jb as l,Mb as p,Ta as D,U as A,Va as y,Xa as C,_ as m,_a as _,eb as w,ja as g,mb as F,qa as u,rb as R,sa as b,ta as f,va as I,vb as a,wb as o,xb as s}from"./chunk-CP4DLZFY.js";var Z=[{path:"home",loadComponent:()=>import("./chunk-JTTHHVRI.js").then(t=>t.default)},{path:"portfolio",loadComponent:()=>import("./chunk-AVQDL4MS.js").then(t=>t.default)},{path:"casestudies",loadComponent:()=>import("./chunk-QXQTJ7ZQ.js").then(t=>t.default)},{path:"casestudies2",loadComponent:()=>import("./chunk-KXYGZJ7N.js").then(t=>t.default)},{path:"casestudies3",loadComponent:()=>import("./chunk-U5WNWQXS.js").then(t=>t.default)},{path:"team",loadComponent:()=>import("./chunk-EWOBQKYR.js").then(t=>t.default)},{path:"services",loadComponent:()=>import("./chunk-DABLP24H.js").then(t=>t.default)},{path:"dashboard",loadComponent:()=>import("./chunk-3YF5CJK7.js").then(t=>t.default)},{path:"",loadComponent:()=>import("./chunk-JTTHHVRI.js").then(t=>t.default)}];var ae=(()=>{let e=class e extends k{constructor(r,n,d){super(r,n,d,f(y,{optional:!0}))}ngOnDestroy(){this.flush()}};e.\u0275fac=function(n){return new(n||e)(b(M),b(x),b(P))},e.\u0275prov=g({token:e,factory:e.\u0275fac});let t=e;return t})();function le(){return new V}function se(t,e,i){return new q(t,e,i)}var J=[{provide:P,useFactory:le},{provide:k,useClass:ae},{provide:C,useFactory:se,deps:[O,k,w]}],de=[{provide:x,useFactory:()=>new W},{provide:u,useValue:"BrowserAnimations"},...J],Pe=[{provide:x,useClass:U},{provide:u,useValue:"NoopAnimations"},...J];function Q(){return[...de]}var X=(()=>{let e=class e{constructor(){this.isLoading=_(!1)}hide(){this.isLoading.set(!1)}show(){this.isLoading.set(!0)}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=g({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();var K=(t,e)=>{let i=f(X);return i.show(),e(t).pipe(S(()=>i.hide()))};var ce="@",me=(()=>{let e=class e{constructor(r,n,d,c,v){this.doc=r,this.delegate=n,this.zone=d,this.animationType=c,this.moduleImpl=v,this._rendererFactoryPromise=null,this.scheduler=f(y,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-7F34R5RU.js")).catch(n=>{throw new A(5300,!1)}).then(({\u0275createEngine:n,\u0275AnimationRendererFactory:d})=>{this._engine=n(this.animationType,this.doc,this.scheduler);let c=new d(this.delegate,this._engine,this.zone);return this.delegate=c,c})}createRenderer(r,n){let d=this.delegate.createRenderer(r,n);if(d.\u0275type===0)return d;typeof d.throwOnSyntheticProps=="boolean"&&(d.throwOnSyntheticProps=!1);let c=new E(d);return n?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(v=>{let re=v.createRenderer(r,n);c.use(re)}).catch(v=>{c.use(d)}),c}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(n){D()},e.\u0275prov=g({token:e,factory:e.\u0275fac});let t=e;return t})(),E=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let i of this.replay)i(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,i){return this.delegate.createElement(e,i)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,i){this.delegate.appendChild(e,i)}insertBefore(e,i,r,n){this.delegate.insertBefore(e,i,r,n)}removeChild(e,i,r){this.delegate.removeChild(e,i,r)}selectRootElement(e,i){return this.delegate.selectRootElement(e,i)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,i,r,n){this.delegate.setAttribute(e,i,r,n)}removeAttribute(e,i,r){this.delegate.removeAttribute(e,i,r)}addClass(e,i){this.delegate.addClass(e,i)}removeClass(e,i){this.delegate.removeClass(e,i)}setStyle(e,i,r,n){this.delegate.setStyle(e,i,r,n)}removeStyle(e,i,r){this.delegate.removeStyle(e,i,r)}setProperty(e,i,r){this.shouldReplay(i)&&this.replay.push(n=>n.setProperty(e,i,r)),this.delegate.setProperty(e,i,r)}setValue(e,i){this.delegate.setValue(e,i)}listen(e,i,r){return this.shouldReplay(i)&&this.replay.push(n=>n.listen(e,i,r)),this.delegate.listen(e,i,r)}shouldReplay(e){return this.replay!==null&&e.startsWith(ce)}};function $(t="animations"){return I([{provide:C,useFactory:(e,i,r)=>new me(e,i,r,t),deps:[M,O,w]},{provide:u,useValue:t==="noop"?"NoopAnimations":"BrowserAnimations"}])}var ee={providers:[Q(),G(Z,Y()),j(N([K])),L(),$()]};var te=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=m({type:e,selectors:[["app-header"]],standalone:!0,features:[p],decls:48,vars:0,consts:[[1,"container-fluid","mx-auto","justify-content-center","align-items-center","fixed-top",2,"border-bottom","solid 1px #4C0054","height","80px","background-color","white","z-index","998"],["id","mainnav",1,"container","p-0","d-flex","justify-content-center","align-items-center"],[1,"d-flex","w-100","p-0","py-2","justify-content-between","align-items-center"],[1,"navbar","navbar-expand-md","navbar-light","w-100","justify-content-center"],["href","","routerLink","/home"],["id","logomovil","src","../../assets/img/logo.svg",1,"p-0",2,"text-align","center"],["type","button","data-bs-toggle","collapse","data-bs-target","#navbarToggleExternalContent","aria-controls","navbarToggleExternalContent","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler",2,"margin-left","20px"],[1,"navbar-toggler-icon"],["id","navbarToggleExternalContent",1,"collapse","navbar-collapse","d-none","d-md-block"],[1,"navbar-nav","mx-auto"],[1,"nav-item"],["routerLinkActive","active","routerLink","/portfolio",1,"nav-link"],["href","#","routerLink","/services",1,"nav-link"],["routerLink","/home",1,"nav-link","navbar-brand"],["src","../../assets/img/logo.svg"],["href","#","routerLink","/casestudies",1,"nav-link"],["href","#","routerLink","/team",1,"nav-link"],["href","#","id","btnheader","data-bs-toggle","modal","data-bs-target","#exampleModal",1,"nav-link"],[2,"margin-top","80px"],["id","navbarToggleExternalContent",1,"collapse",2,"position","fixed","background-color","white","z-index","999","width","100%"],[1,"p-4","justify-content-end","align-items-end"],[1,"nav","nav-pills","align-items-end","mx-auto"],["href","#","data-bs-toggle","modal","data-bs-target","#exampleModal",1,"nav-link"]],template:function(n,d){n&1&&(a(0,"div",0)(1,"div",1)(2,"header",2)(3,"nav",3)(4,"a",4),s(5,"img",5),o(),a(6,"button",6),s(7,"span",7),o(),a(8,"div",8)(9,"ul",9)(10,"li",10)(11,"a",11),l(12,"Portfolio"),o()(),a(13,"li",10)(14,"a",12),l(15,"Services"),o()(),a(16,"li",10)(17,"a",13),s(18,"img",14),o()(),a(19,"li",10)(20,"a",15),l(21,"Case Studies"),o()(),a(22,"li",10)(23,"a",16),l(24,"Our team"),o()(),a(25,"li",10)(26,"a",17),l(27,"Contact"),o()()()()()()()(),s(28,"div",18),a(29,"div",19)(30,"div",20)(31,"ul",21)(32,"li",10)(33,"a",11),l(34,"Portfolio"),o()(),a(35,"li",10)(36,"a",12),l(37,"Services"),o()(),a(38,"li",10)(39,"a",15),l(40,"Case Studies"),o()(),a(41,"li",10)(42,"a",16),l(43,"Our team"),o()(),a(44,"li",10)(45,"a",22),l(46,"Contact"),o()()()()(),s(47,"app-modal"))},dependencies:[B,H],styles:["#logomovil[_ngcontent-%COMP%]{visibility:hidden;display:none}.nav-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:active{color:#ff7bc9;text-decoration:none}.nav-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus{color:#ff7bc9}.nav-item[_ngcontent-%COMP%]:hover{text-decoration:none;color:#e8ff48;padding-bottom:0;-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear}.nav-link[_ngcontent-%COMP%]:hover{text-decoration:none}#btnheader[_ngcontent-%COMP%]{background-color:#ff7bc9;border-radius:30px;padding-left:20px;padding-right:20px;float:right;margin-left:150px;position:absolute;text-align:center;height:40px;line-height:22px;border:solid 1px #4C0054;-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear}#btnheader[_ngcontent-%COMP%]:hover{background-color:#4c0054;border:solid 1px #4C0054;-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear}.navbar-brand[_ngcontent-%COMP%]{text-align:center;margin-right:0;margin-left:0;width:300px}@media only screen and (max-width: 1400px){#btnheader[_ngcontent-%COMP%]{right:-260px}}@media only screen and (max-width: 1200px){#btnheader[_ngcontent-%COMP%]{right:-120px}}@media only screen and (max-width: 992px){#btnheader[_ngcontent-%COMP%]{right:-120px}li[_ngcontent-%COMP%]{font-size:12px}.navbar-brand[_ngcontent-%COMP%]{width:140px}.navbar-brand[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:120px}}@media only screen and (max-width: 768px){#logomovil[_ngcontent-%COMP%]{visibility:visible;display:block}#navbarToggleExternalContentSmall[_ngcontent-%COMP%]{position:absolute;top:100%;width:100%;background-color:#fff;z-index:997}ul[_ngcontent-%COMP%]{background-color:#fff}li[_ngcontent-%COMP%]{width:100%;height:60px;font-size:19px;background-color:#fff}#btnheader[_ngcontent-%COMP%]{right:-260px}}"]});let t=e;return t})();var ne=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=m({type:e,selectors:[["app-footer"]],standalone:!0,features:[p],decls:67,vars:0,consts:[[1,"container-fluid",2,"background-color","#450351"],[1,"row","p-0","justify-content-center","d-flex"],[1,"d-flex","row",2,"height","100%"],[1,"col-xxl-3","offset-xxl-1","col-xl-3","offset-xl-1","col-lg-3","offset-md-1","col-md-3","offset-sm-0","col-sm-12","offset-lg-1","pt-3","text-center",2,"text-align","center","align-items","center"],["src","../../assets/img/logowhite.svg","id","logofooter"],["id","footercenter",1,"col-xxl-4","col-xl-4","col-lg-4","col-md-4","col-sm-12","align-bottom","p-xl-5","p-sm-3","justify-content-center"],["id","menucenter"],[2,"color","white"],["href","#"],[1,"d-grid","gap-2","pb-xl-4","pb-sm-0","px-xxl-5","mx-xxl-5"],["type","button","data-bs-toggle","modal","data-bs-target","#exampleModal",1,"btn","btn-primary","btnverde","justify-content-center","mx-auto"],[1,"col-xxl-4","col-xl-3","col-lg-4","offset-md-0","col-md-4","col-sm-8","offset-sm-3","offset-lg-0","align-bottom","pt-3"],[1,"row","justify-content-center","align-items-center"],[1,"col-3","offset-xxl-2","offset-lg-2","text-start","footerlinks"],[1,"col-4","col-sm-5","text-start","footerlinks","footerlinks2"],[1,"d-flex","pt-4","col-xxl-8","col-xl-8","col-md-11","offset-xxl-0","offset-xl-2","offset-lg-1","offset-md-1","offset-sm-0","pb-4","justify-content-center","align-items-center","mx-auto"],[1,"col-lg-2","col-md-2"],["href","https://www.linkedin.com/company/pinkdogstudio/","target","_blank",1,"footericons"],[1,"bi","bi-linkedin"],["href","https://vimeo.com/pinkdog","target","_blank",1,"footericons"],[1,"bi","bi-vimeo"],["href","https://www.instagram.com/pnkdog/","target","_blank",1,"footericons"],[1,"bi","bi-instagram"],["href","https://www.google.com/search?q=pink+dog+studio&rlz=1C5CHFA_enCL952CL952&oq=pink+dog+studi&gs_lcrp=EgZjaHJvbWUqCQgAEEUYOxiABDIJCAAQRRg7GIAEMgYIARBFGDkyCAgCEAAYFhgeMg0IAxAAGIYDGIAEGIoFMg0IBBAAGIYDGIAEGIoFMg0IBRAAGIYDGIAEGIoFMgYIBhBFGDwyBggHEEUYPagCALACAA&sourceid=chrome&ie=UTF-8","target","_blank",1,"footericons"],[1,"bi","bi-google"],[1,"row","d-flex",2,"border-top","solid 1px white","height","80px","line-height","40px","text-align","center"],[1,"col-md-12","d-flex","justify-content-center"],[1,"justify-content-center","px-md-2","px-lg-4","px-sm-0","pt-3"],["href","#",1,"text-white"],["href","#",1,"text-white",2,"opacity","50%"]],template:function(n,d){n&1&&(a(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),s(4,"img",4),o(),a(5,"div",5)(6,"div",6)(7,"h2",7),l(8,"Give us a whistle!"),o(),a(9,"p")(10,"a",8),l(11,"hellopinkdogstudio.com"),o()(),a(12,"p")(13,"a",8),l(14,"SLC +56 9 3708 8574"),o()(),a(15,"p")(16,"a",8),l(17,"SLC +56 9 3708 8574"),o()(),a(18,"div",9)(19,"button",10),l(20,"Contact"),o()()()(),a(21,"div",11)(22,"div",12)(23,"div",13)(24,"a",8),l(25,"Portfolio"),o(),s(26,"br"),a(27,"a",8),l(28,"Services"),o(),s(29,"br"),a(30,"a",8),l(31,"Portfolio"),o(),s(32,"br"),o(),a(33,"div",14)(34,"a",8),l(35,"Our Team"),o(),s(36,"br"),a(37,"a",8),l(38,"Blog"),o(),s(39,"br"),a(40,"a",8),l(41,"Our Team"),o(),s(42,"br"),o()(),a(43,"div",15)(44,"div",16)(45,"a",17),s(46,"i",18),o()(),a(47,"div",16)(48,"a",19),s(49,"i",20),o()(),a(50,"div",16)(51,"a",21),s(52,"i",22),o()(),a(53,"div",16)(54,"a",23),s(55,"i",24),o()()()()()(),a(56,"div",25)(57,"div",26)(58,"div",27)(59,"a",28),l(60,"Privacy Policy"),o()(),a(61,"div",27)(62,"a",28),l(63,"Disclaimer"),o()(),a(64,"div",27)(65,"a",29),l(66,"Copyright \xA9 2024 \u2022 Pink Dog"),o()()()()())},styles:["a[_ngcontent-%COMP%]{color:#fff;text-decoration:none;font-family:HelveticaNeve}a[_ngcontent-%COMP%]:hover{color:#e8ff48;-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear}p[_ngcontent-%COMP%]{color:#4c0054;font-size:16px;font-family:HelveticaNeve;font-weight:100;word-wrap:break-word;margin-bottom:20px}h2[_ngcontent-%COMP%]{line-height:28px}.btnverde[_ngcontent-%COMP%]{-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear;width:100%}.footerlinks[_ngcontent-%COMP%]{margin-top:42px;line-height:40px}#footercenter[_ngcontent-%COMP%]{border-left:solid 1px white;border-right:solid 1px white;text-align:center}.footericons[_ngcontent-%COMP%], .footericons1[_ngcontent-%COMP%]{margin-left:0;margin-right:0}#logofooter[_ngcontent-%COMP%]{margin-right:120px;margin-top:40px;max-height:160px;max-width:200px}@media only screen and (max-width: 1200px){h2[_ngcontent-%COMP%]{font-size:26px}.footericons[_ngcontent-%COMP%]{margin-left:10px;margin-right:10px}.footericons1[_ngcontent-%COMP%]{margin-left:26px;margin-right:10px}.footerlinks[_ngcontent-%COMP%]{margin-left:40px}#logofooter[_ngcontent-%COMP%]{margin-right:20px;margin-top:40px;max-height:120px;max-width:160px}}@media only screen and (max-width: 768px){.footerlinks[_ngcontent-%COMP%]{margin-left:20px;margin-top:0}#logofooter[_ngcontent-%COMP%]{margin-right:0;margin-top:40px;max-height:160px;max-width:200px}.btnverde[_ngcontent-%COMP%]{max-width:200px}#menucenter[_ngcontent-%COMP%]{text-align:center!important}#footercenter[_ngcontent-%COMP%]{border-left:none;border-right:none;text-align:start;margin-bottom:0;padding-bottom:0}.footerlinks2[_ngcontent-%COMP%]{margin-left:-18px}.footericons[_ngcontent-%COMP%]{margin-left:10px;padding-bottom:20px}}@media only screen and (max-width: 576px){.text-white[_ngcontent-%COMP%]{font-size:9px;padding-left:10px;padding-right:10px}#footercenter[_ngcontent-%COMP%]{padding-bottom:0!important}}"]});let t=e;return t})();var ie=(()=>{let e=class e{constructor(){this.isLoading=!1}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=m({type:e,selectors:[["app-spinner"]],inputs:{isLoading:"isLoading"},standalone:!0,features:[p],decls:6,vars:0,consts:[[1,"container-fluid","justify-content-center","align-items-center","align-middle","overlay"],[1,"row","justify-content-center","align-items-center","align-middle"],[1,"col","mx-auto","my-auto"],[1,"col","mx-auto","my-auto","justify-content-center","align-items-center","align-middle",2,"text-align","center"],["src","../../../assets/img/logo-white.svg",1,"justify-content-center","align-items-center","align-middle","overlayimg"]],template:function(n,d){n&1&&(a(0,"div",0)(1,"div",1),s(2,"div",2),a(3,"div",3),s(4,"img",4),o(),s(5,"div",2),o()())},styles:[".overlay[_ngcontent-%COMP%]{max-width:100%;max-height:100%;width:100%;height:100%;inset:0;background-color:#4c0054;position:fixed;z-index:999;overflow:hidden;transition:all .3s ease-in-out}.overlayimg[_ngcontent-%COMP%]{margin-top:70%;transition:all .3s ease-in-out}"]});let t=e;return t})();function pe(t,e){t&1&&s(0,"app-spinner")}var oe=(()=>{let e=class e{constructor(){this.isLoading=!0}ngOnInit(){setTimeout(()=>{this.isLoading=!1},3e3)}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=m({type:e,selectors:[["app-root"]],standalone:!0,features:[p],decls:4,vars:1,consts:[[2,"position","absolute","margin-top","200px"]],template:function(n,d){n&1&&(F(0,pe,1,0,"app-spinner"),s(1,"app-header")(2,"router-outlet",0)(3,"app-footer")),n&2&&R(0,d.isLoading?0:-1)},dependencies:[z,te,ne,ie]});let t=e;return t})();T(oe,ee).catch(t=>console.error(t));

import{a as ae}from"./chunk-K2PDF6JC.js";import{a as ke,c as Ae,d as Fe,e as j,f as Be}from"./chunk-PBEPDB7A.js";import{b as Ie}from"./chunk-UKSJRJRX.js";import{k as z}from"./chunk-ZADCQF72.js";import{$a as Me,A as T,Ab as Ne,B as be,Ba as ne,C as k,Cb as K,Db as V,Eb as W,Ga as F,Gb as h,I as x,Jb as b,M as ve,Qb as Pe,V as ye,Va as B,Vb as $,W as p,Wa as M,X as De,Y as ee,Ya as Ce,Zb as U,_ as E,a as q,b as _e,ba as Se,ca as m,da as te,db as I,ea as we,f as fe,i as v,ja as A,jc as xe,kb as se,l as ge,lb as Ee,ma as C,mb as G,n as Z,na as ie,nb as L,ob as H,pa as Oe,pb as oe,r as X,tb as l,ub as r,vb as d,x as S,xa as u,xb as _,y as me,za as Te,zb as Re}from"./chunk-U25DPLNG.js";var Ye=["*"];var qe=["dialog"];var Ge={animation:!0,transitionTimerDelayMs:5},Le=(()=>{let e=class e{constructor(){this.animation=Ge.animation}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();function Ze(i){let{transitionDelay:e,transitionDuration:a}=window.getComputedStyle(i),t=parseFloat(e),n=parseFloat(a);return(t+n)*1e3}function He(i){return typeof i=="string"}function re(i){return i!=null}function Xe(i){return i&&i.then}function de(i){return(i||document.body).getBoundingClientRect()}function et(i){return e=>new fe(a=>{let t=o=>i.run(()=>a.next(o)),n=o=>i.run(()=>a.error(o)),s=()=>i.run(()=>a.complete());return e.subscribe({next:t,error:n,complete:s})})}var tt=()=>{},{transitionTimerDelayMs:it}=Ge,Q=new Map,w=(i,e,a,t)=>{let n=t.context||{},s=Q.get(e);if(s)switch(t.runningTransition){case"continue":return ge;case"stop":i.run(()=>s.transition$.complete()),n=Object.assign(s.context,n),Q.delete(e)}let o=a(e,t.animation,n)||tt;if(!t.animation||window.getComputedStyle(e).transitionProperty==="none")return i.run(()=>o()),Z(void 0).pipe(et(i));let c=new v,f=new v,g=c.pipe(ve(!0));Q.set(e,{transition$:c,complete:()=>{f.next(),f.complete()},context:n});let y=Ze(e);return i.runOutsideAngular(()=>{let P=S(e,"transitionend").pipe(p(g),T(({target:O})=>O===e)),D=me(y+it).pipe(p(g));be(D,P,f).pipe(p(g)).subscribe(()=>{Q.delete(e),i.run(()=>{o(),c.next(),c.complete()})})}),c.asObservable()};function nt(i,e){if(typeof navigator>"u")return"0px";let{classList:a}=i,t=a.contains("show");t||a.add("show"),i.style[e]="";let n=i.getBoundingClientRect()[e]+"px";return t||a.remove("show"),n}var st=(i,e,a)=>{let{direction:t,maxSize:n,dimension:s}=a,{classList:o}=i;function c(){o.add("collapse"),t==="show"?o.add("show"):o.remove("show")}if(!e){c();return}return n||(n=nt(i,s),a.maxSize=n,i.style[s]=t!=="show"?n:"0px",o.remove("collapse"),o.remove("collapsing"),o.remove("show"),de(i),o.add("collapsing")),i.style[s]=t==="show"?n:"0px",()=>{c(),o.remove("collapsing"),i.style[s]=""}},ot=(()=>{let e=class e{constructor(){this._ngbConfig=u(Le),this.horizontal=!1}get animation(){return this._animation??this._ngbConfig.animation}set animation(t){this._animation=t}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})(),Ke=(()=>{let e=class e{constructor(){this._config=u(ot),this._element=u(A),this._zone=u(I),this.animation=this._config.animation,this._afterInit=!1,this._isCollapsed=!1,this.ngbCollapseChange=new E,this.horizontal=this._config.horizontal,this.shown=new E,this.hidden=new E}set collapsed(t){this._isCollapsed!==t&&(this._isCollapsed=t,this._afterInit&&this._runTransitionWithEvents(t,this.animation))}ngOnInit(){this._runTransition(this._isCollapsed,!1),this._afterInit=!0}toggle(t=this._isCollapsed){this.collapsed=!t,this.ngbCollapseChange.next(this._isCollapsed)}_runTransition(t,n){return w(this._zone,this._element.nativeElement,st,{animation:n,runningTransition:"stop",context:{direction:t?"hide":"show",dimension:this.horizontal?"width":"height"}})}_runTransitionWithEvents(t,n){this._runTransition(t,n).subscribe(()=>{t?this.hidden.emit():this.shown.emit()})}};e.\u0275fac=function(n){return new(n||e)},e.\u0275dir=we({type:e,selectors:[["","ngbCollapse",""]],hostVars:2,hostBindings:function(n,s){n&2&&L("collapse-horizontal",s.horizontal)},inputs:{animation:"animation",collapsed:[Se.None,"ngbCollapse","collapsed"],horizontal:"horizontal"},outputs:{ngbCollapseChange:"ngbCollapseChange",shown:"shown",hidden:"hidden"},exportAs:["ngbCollapse"],standalone:!0});let i=e;return i})();var N=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=te({type:e}),e.\u0275inj=ie({});let i=e;return i})();var he=function(i){return i[i.Tab=9]="Tab",i[i.Enter=13]="Enter",i[i.Escape=27]="Escape",i[i.Space=32]="Space",i[i.PageUp=33]="PageUp",i[i.PageDown=34]="PageDown",i[i.End=35]="End",i[i.Home=36]="Home",i[i.ArrowLeft=37]="ArrowLeft",i[i.ArrowUp=38]="ArrowUp",i[i.ArrowRight=39]="ArrowRight",i[i.ArrowDown=40]="ArrowDown",i}(he||{});var Li=(()=>{let i=()=>/iPad|iPhone|iPod/.test(navigator.userAgent)||/Macintosh/.test(navigator.userAgent)&&navigator.maxTouchPoints&&navigator.maxTouchPoints>2,e=()=>/Android/.test(navigator.userAgent);return typeof navigator<"u"?!!navigator.userAgent&&(i()||e()):!1})();var at=["a[href]","button:not([disabled])",'input:not([disabled]):not([type="hidden"])',"select:not([disabled])","textarea:not([disabled])","[contenteditable]",'[tabindex]:not([tabindex="-1"])'].join(", ");function Ve(i){let e=Array.from(i.querySelectorAll(at)).filter(a=>a.tabIndex!==-1);return[e[0],e[e.length-1]]}var rt=(i,e,a,t=!1)=>{i.runOutsideAngular(()=>{let n=S(e,"focusin").pipe(p(a),X(s=>s.target));S(e,"keydown").pipe(p(a),T(s=>s.which===he.Tab),ee(n)).subscribe(([s,o])=>{let[c,f]=Ve(e);(o===c||o===e)&&s.shiftKey&&(f.focus(),s.preventDefault()),o===f&&!s.shiftKey&&(c.focus(),s.preventDefault())}),t&&S(e,"click").pipe(p(a),ee(n),X(s=>s[1])).subscribe(s=>s.focus())})};var Hi=new Date(1882,10,12),Ki=new Date(2174,10,25);var Vi=1e3*60*60*24;var ue=1080,lt=24*ue,ct=12*ue+793,Wi=29*lt+ct,$i=11*ue+204;var dt=(()=>{let e=class e{constructor(){this._ngbConfig=u(Le),this.backdrop=!0,this.fullscreen=!1,this.keyboard=!0}get animation(){return this._animation??this._ngbConfig.animation}set animation(t){this._animation=t}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})(),R=class{constructor(e,a,t){this.nodes=e,this.viewRef=a,this.componentRef=t}};var ht=(()=>{let e=class e{constructor(){this._document=u(U)}hide(){let t=Math.abs(window.innerWidth-this._document.documentElement.clientWidth),n=this._document.body,s=n.style,{overflow:o,paddingRight:c}=s;if(t>0){let f=parseFloat(window.getComputedStyle(n).paddingRight);s.paddingRight=`${f+t}px`}return s.overflow="hidden",()=>{t>0&&(s.paddingRight=c),s.overflow=o}}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})(),ut=(()=>{let e=class e{constructor(){this._nativeElement=u(A).nativeElement,this._zone=u(I)}ngOnInit(){this._zone.onStable.asObservable().pipe(x(1)).subscribe(()=>{w(this._zone,this._nativeElement,(t,n)=>{n&&de(t),t.classList.add("show")},{animation:this.animation,runningTransition:"continue"})})}hide(){return w(this._zone,this._nativeElement,({classList:t})=>t.remove("show"),{animation:this.animation,runningTransition:"stop"})}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=m({type:e,selectors:[["ngb-modal-backdrop"]],hostAttrs:[2,"z-index","1055"],hostVars:6,hostBindings:function(n,s){n&2&&(H("modal-backdrop"+(s.backdropClass?" "+s.backdropClass:"")),L("show",!s.animation)("fade",s.animation))},inputs:{animation:"animation",backdropClass:"backdropClass"},standalone:!0,features:[b],decls:0,vars:0,template:function(n,s){},encapsulation:2});let i=e;return i})(),J=class{update(e){}close(e){}dismiss(e){}},pt=["animation","ariaLabelledBy","ariaDescribedBy","backdrop","centered","fullscreen","keyboard","scrollable","size","windowClass","modalDialogClass"],_t=["animation","backdropClass"],le=class{_applyWindowOptions(e,a){pt.forEach(t=>{re(a[t])&&(e[t]=a[t])})}_applyBackdropOptions(e,a){_t.forEach(t=>{re(a[t])&&(e[t]=a[t])})}update(e){this._applyWindowOptions(this._windowCmptRef.instance,e),this._backdropCmptRef&&this._backdropCmptRef.instance&&this._applyBackdropOptions(this._backdropCmptRef.instance,e)}get componentInstance(){if(this._contentRef&&this._contentRef.componentRef)return this._contentRef.componentRef.instance}get closed(){return this._closed.asObservable().pipe(p(this._hidden))}get dismissed(){return this._dismissed.asObservable().pipe(p(this._hidden))}get hidden(){return this._hidden.asObservable()}get shown(){return this._windowCmptRef.instance.shown.asObservable()}constructor(e,a,t,n){this._windowCmptRef=e,this._contentRef=a,this._backdropCmptRef=t,this._beforeDismiss=n,this._closed=new v,this._dismissed=new v,this._hidden=new v,e.instance.dismissEvent.subscribe(s=>{this.dismiss(s)}),this.result=new Promise((s,o)=>{this._resolve=s,this._reject=o}),this.result.then(null,()=>{})}close(e){this._windowCmptRef&&(this._closed.next(e),this._resolve(e),this._removeModalElements())}_dismiss(e){this._dismissed.next(e),this._reject(e),this._removeModalElements()}dismiss(e){if(this._windowCmptRef)if(!this._beforeDismiss)this._dismiss(e);else{let a=this._beforeDismiss();Xe(a)?a.then(t=>{t!==!1&&this._dismiss(e)},()=>{}):a!==!1&&this._dismiss(e)}}_removeModalElements(){let e=this._windowCmptRef.instance.hide(),a=this._backdropCmptRef?this._backdropCmptRef.instance.hide():Z(void 0);e.subscribe(()=>{let{nativeElement:t}=this._windowCmptRef.location;t.parentNode.removeChild(t),this._windowCmptRef.destroy(),this._contentRef&&this._contentRef.viewRef&&this._contentRef.viewRef.destroy(),this._windowCmptRef=null,this._contentRef=null}),a.subscribe(()=>{if(this._backdropCmptRef){let{nativeElement:t}=this._backdropCmptRef.location;t.parentNode.removeChild(t),this._backdropCmptRef.destroy(),this._backdropCmptRef=null}}),k(e,a).subscribe(()=>{this._hidden.next(),this._hidden.complete()})}},ce=function(i){return i[i.BACKDROP_CLICK=0]="BACKDROP_CLICK",i[i.ESC=1]="ESC",i}(ce||{}),ft=(()=>{let e=class e{constructor(){this._document=u(U),this._elRef=u(A),this._zone=u(I),this._closed$=new v,this._elWithFocus=null,this.backdrop=!0,this.keyboard=!0,this.dismissEvent=new E,this.shown=new v,this.hidden=new v}get fullscreenClass(){return this.fullscreen===!0?" modal-fullscreen":He(this.fullscreen)?` modal-fullscreen-${this.fullscreen}-down`:""}dismiss(t){this.dismissEvent.emit(t)}ngOnInit(){this._elWithFocus=this._document.activeElement,this._zone.onStable.asObservable().pipe(x(1)).subscribe(()=>{this._show()})}ngOnDestroy(){this._disableEventHandling()}hide(){let{nativeElement:t}=this._elRef,n={animation:this.animation,runningTransition:"stop"},s=w(this._zone,t,()=>t.classList.remove("show"),n),o=w(this._zone,this._dialogEl.nativeElement,()=>{},n),c=k(s,o);return c.subscribe(()=>{this.hidden.next(),this.hidden.complete()}),this._disableEventHandling(),this._restoreFocus(),c}_show(){let t={animation:this.animation,runningTransition:"continue"},n=w(this._zone,this._elRef.nativeElement,(o,c)=>{c&&de(o),o.classList.add("show")},t),s=w(this._zone,this._dialogEl.nativeElement,()=>{},t);k(n,s).subscribe(()=>{this.shown.next(),this.shown.complete()}),this._enableEventHandling(),this._setFocus()}_enableEventHandling(){let{nativeElement:t}=this._elRef;this._zone.runOutsideAngular(()=>{S(t,"keydown").pipe(p(this._closed$),T(s=>s.which===he.Escape)).subscribe(s=>{this.keyboard?requestAnimationFrame(()=>{s.defaultPrevented||this._zone.run(()=>this.dismiss(ce.ESC))}):this.backdrop==="static"&&this._bumpBackdrop()});let n=!1;S(this._dialogEl.nativeElement,"mousedown").pipe(p(this._closed$),De(()=>n=!1),ye(()=>S(t,"mouseup").pipe(p(this._closed$),x(1))),T(({target:s})=>t===s)).subscribe(()=>{n=!0}),S(t,"click").pipe(p(this._closed$)).subscribe(({target:s})=>{t===s&&(this.backdrop==="static"?this._bumpBackdrop():this.backdrop===!0&&!n&&this._zone.run(()=>this.dismiss(ce.BACKDROP_CLICK))),n=!1})})}_disableEventHandling(){this._closed$.next()}_setFocus(){let{nativeElement:t}=this._elRef;if(!t.contains(document.activeElement)){let n=t.querySelector("[ngbAutofocus]"),s=Ve(t)[0];(n||s||t).focus()}}_restoreFocus(){let t=this._document.body,n=this._elWithFocus,s;n&&n.focus&&t.contains(n)?s=n:s=t,this._zone.runOutsideAngular(()=>{setTimeout(()=>s.focus()),this._elWithFocus=null})}_bumpBackdrop(){this.backdrop==="static"&&w(this._zone,this._elRef.nativeElement,({classList:t})=>(t.add("modal-static"),()=>t.remove("modal-static")),{animation:this.animation,runningTransition:"continue"})}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=m({type:e,selectors:[["ngb-modal-window"]],viewQuery:function(n,s){if(n&1&&K(qe,7),n&2){let o;V(o=W())&&(s._dialogEl=o.first)}},hostAttrs:["role","dialog","tabindex","-1"],hostVars:7,hostBindings:function(n,s){n&2&&(Ee("aria-modal",!0)("aria-labelledby",s.ariaLabelledBy)("aria-describedby",s.ariaDescribedBy),H("modal d-block"+(s.windowClass?" "+s.windowClass:"")),L("fade",s.animation))},inputs:{animation:"animation",ariaLabelledBy:"ariaLabelledBy",ariaDescribedBy:"ariaDescribedBy",backdrop:"backdrop",centered:"centered",fullscreen:"fullscreen",keyboard:"keyboard",scrollable:"scrollable",size:"size",windowClass:"windowClass",modalDialogClass:"modalDialogClass"},outputs:{dismissEvent:"dismiss"},standalone:!0,features:[b],ngContentSelectors:Ye,decls:4,vars:2,consts:[["role","document"],["dialog",""],[1,"modal-content"]],template:function(n,s){n&1&&(Re(),l(0,"div",0,1)(2,"div",2),Ne(3),r()()),n&2&&H("modal-dialog"+(s.size?" modal-"+s.size:"")+(s.centered?" modal-dialog-centered":"")+s.fullscreenClass+(s.scrollable?" modal-dialog-scrollable":"")+(s.modalDialogClass?" "+s.modalDialogClass:""))},styles:[`ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}
`],encapsulation:2});let i=e;return i})(),gt=(()=>{let e=class e{constructor(){this._applicationRef=u(Pe),this._injector=u(F),this._environmentInjector=u(ne),this._document=u(U),this._scrollBar=u(ht),this._activeWindowCmptHasChanged=new v,this._ariaHiddenValues=new Map,this._scrollBarRestoreFn=null,this._modalRefs=[],this._windowCmpts=[],this._activeInstances=new E;let t=u(I);this._activeWindowCmptHasChanged.subscribe(()=>{if(this._windowCmpts.length){let n=this._windowCmpts[this._windowCmpts.length-1];rt(t,n.location.nativeElement,this._activeWindowCmptHasChanged),this._revertAriaHidden(),this._setAriaHidden(n.location.nativeElement)}})}_restoreScrollBar(){let t=this._scrollBarRestoreFn;t&&(this._scrollBarRestoreFn=null,t())}_hideScrollBar(){this._scrollBarRestoreFn||(this._scrollBarRestoreFn=this._scrollBar.hide())}open(t,n,s){let o=s.container instanceof HTMLElement?s.container:re(s.container)?this._document.querySelector(s.container):this._document.body;if(!o)throw new Error(`The specified modal container "${s.container||"body"}" was not found in the DOM.`);this._hideScrollBar();let c=new J;t=s.injector||t;let f=t.get(ne,null)||this._environmentInjector,g=this._getContentRef(t,f,n,c,s),y=s.backdrop!==!1?this._attachBackdrop(o):void 0,P=this._attachWindowComponent(o,g.nodes),D=new le(P,g,y,s.beforeDismiss);return this._registerModalRef(D),this._registerWindowCmpt(P),D.hidden.pipe(x(1)).subscribe(()=>Promise.resolve(!0).then(()=>{this._modalRefs.length||(this._document.body.classList.remove("modal-open"),this._restoreScrollBar(),this._revertAriaHidden())})),c.close=O=>{D.close(O)},c.dismiss=O=>{D.dismiss(O)},c.update=O=>{D.update(O)},D.update(s),this._modalRefs.length===1&&this._document.body.classList.add("modal-open"),y&&y.instance&&y.changeDetectorRef.detectChanges(),P.changeDetectorRef.detectChanges(),D}get activeInstances(){return this._activeInstances}dismissAll(t){this._modalRefs.forEach(n=>n.dismiss(t))}hasOpenModals(){return this._modalRefs.length>0}_attachBackdrop(t){let n=$(ut,{environmentInjector:this._applicationRef.injector,elementInjector:this._injector});return this._applicationRef.attachView(n.hostView),t.appendChild(n.location.nativeElement),n}_attachWindowComponent(t,n){let s=$(ft,{environmentInjector:this._applicationRef.injector,elementInjector:this._injector,projectableNodes:n});return this._applicationRef.attachView(s.hostView),t.appendChild(s.location.nativeElement),s}_getContentRef(t,n,s,o,c){return s?s instanceof Ce?this._createFromTemplateRef(s,o):He(s)?this._createFromString(s):this._createFromComponent(t,n,s,o,c):new R([])}_createFromTemplateRef(t,n){let s={$implicit:n,close(c){n.close(c)},dismiss(c){n.dismiss(c)}},o=t.createEmbeddedView(s);return this._applicationRef.attachView(o),new R([o.rootNodes],o)}_createFromString(t){let n=this._document.createTextNode(`${t}`);return new R([[n]])}_createFromComponent(t,n,s,o,c){let f=F.create({providers:[{provide:J,useValue:o}],parent:t}),g=$(s,{environmentInjector:n,elementInjector:f}),y=g.location.nativeElement;return c.scrollable&&y.classList.add("component-host-scrollable"),this._applicationRef.attachView(g.hostView),new R([[y]],g.hostView,g)}_setAriaHidden(t){let n=t.parentElement;n&&t!==this._document.body&&(Array.from(n.children).forEach(s=>{s!==t&&s.nodeName!=="SCRIPT"&&(this._ariaHiddenValues.set(s,s.getAttribute("aria-hidden")),s.setAttribute("aria-hidden","true"))}),this._setAriaHidden(n))}_revertAriaHidden(){this._ariaHiddenValues.forEach((t,n)=>{t?n.setAttribute("aria-hidden",t):n.removeAttribute("aria-hidden")}),this._ariaHiddenValues.clear()}_registerModalRef(t){let n=()=>{let s=this._modalRefs.indexOf(t);s>-1&&(this._modalRefs.splice(s,1),this._activeInstances.emit(this._modalRefs))};this._modalRefs.push(t),this._activeInstances.emit(this._modalRefs),t.result.then(n,n)}_registerWindowCmpt(t){this._windowCmpts.push(t),this._activeWindowCmptHasChanged.next(),t.onDestroy(()=>{let n=this._windowCmpts.indexOf(t);n>-1&&(this._windowCmpts.splice(n,1),this._activeWindowCmptHasChanged.next())})}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})(),pe=(()=>{let e=class e{constructor(){this._injector=u(F),this._modalStack=u(gt),this._config=u(dt)}open(t,n={}){let s=q(_e(q({},this._config),{animation:this._config.animation}),n);return this._modalStack.open(this._injector,t,s)}get activeInstances(){return this._modalStack.activeInstances}dismissAll(t){this._modalStack.dismissAll(t)}hasOpenModals(){return this._modalStack.hasOpenModals()}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=C({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})(),We=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=te({type:e}),e.\u0275inj=ie({providers:[pe]});let i=e;return i})();var Ui=new Oe("live announcer delay",{providedIn:"root",factory:()=>100});var bt=["navbarCollapse"],$e=(()=>{let e=class e{constructor(t,n){this.modalService=t,this.renderer=n,this.isCollapsed=!0}toggleMenu(){this.isCollapsed=!this.isCollapsed}closeMenu(){this.isCollapsed=!0}openModal(){this.closeMenu(),this.modalService.open(ae)}};e.\u0275fac=function(n){return new(n||e)(M(pe),M(Me))},e.\u0275cmp=m({type:e,selectors:[["app-header"]],viewQuery:function(n,s){if(n&1&&K(bt,5),n&2){let o;V(o=W())&&(s.navbarCollapse=o.first)}},standalone:!0,features:[b],decls:50,vars:2,consts:[[1,"container-fluid","mx-auto","justify-content-center","align-items-center","fixed-top",2,"border-bottom","solid 1px #4C0054","height","80px","background-color","white","z-index","998"],["id","mainnav",1,"container","p-0","d-flex","justify-content-center","align-items-center"],[1,"d-flex","w-100","p-0","py-2","justify-content-between","align-items-center"],[1,"navbar","navbar-expand-md","navbar-light","w-100","m-0","justify-content-center"],["href","","routerLink","/home"],["id","logomovil","src","../../assets/img/logo.svg",1,"p-0",2,"text-align","left"],["type","button","aria-controls","navbarToggleExternalContent","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler",2,"margin-left","47px","box-shadow","none","border","none",3,"click"],[1,"navbar-toggler-icon"],["id","navbarToggleExternalContent",1,"collapse","navbar-collapse","d-none","d-md-block",3,"ngbCollapse"],["navbarCollapse",""],[1,"navbar-nav","mx-auto"],[1,"nav-item"],["routerLinkActive","active","routerLink","/portfolio",1,"nav-link",3,"click"],["routerLink","/services",1,"nav-link",3,"click"],["routerLink","/home",1,"nav-link","navbar-brand",3,"click"],["src","../../assets/img/logo.svg"],["routerLink","/casestudies",1,"nav-link",3,"click"],["routerLink","/team",1,"nav-link",3,"click"],["id","btnheader","data-bs-toggle","modal","data-bs-target","#exampleModal",1,"nav-link",3,"click"],[2,"margin-top","80px"],["id","navbarToggleExternalContent",1,"collapse",2,"position","fixed","background-color","white","z-index","999","width","100%",3,"ngbCollapse"],[1,"p-4","justify-content-end","align-items-end"],[1,"nav","nav-pills","align-items-end","mx-auto"],["data-bs-toggle","modal","data-bs-target","#exampleModal",1,"nav-link"]],template:function(n,s){n&1&&(l(0,"div",0)(1,"div",1)(2,"header",2)(3,"nav",3)(4,"a",4),d(5,"img",5),r(),l(6,"button",6),_("click",function(){return s.toggleMenu()}),d(7,"span",7),r(),l(8,"div",8,9)(10,"ul",10)(11,"li",11)(12,"a",12),_("click",function(){return s.closeMenu()}),h(13,"Portfolio"),r()(),l(14,"li",11)(15,"a",13),_("click",function(){return s.closeMenu()}),h(16,"Services"),r()(),l(17,"li",11)(18,"a",14),_("click",function(){return s.closeMenu()}),d(19,"img",15),r()(),l(20,"li",11)(21,"a",16),_("click",function(){return s.closeMenu()}),h(22,"Case Studies"),r()(),l(23,"li",11)(24,"a",17),_("click",function(){return s.closeMenu()}),h(25,"Our Team"),r()(),l(26,"li",11)(27,"a",18),_("click",function(){return s.closeMenu()}),h(28,"Contact"),r()()()()()()()(),d(29,"div",19),l(30,"div",20,9)(32,"div",21)(33,"ul",22)(34,"li",11)(35,"a",12),_("click",function(){return s.closeMenu()}),h(36,"Portfolio"),r()(),l(37,"li",11)(38,"a",13),_("click",function(){return s.closeMenu()}),h(39,"Services"),r()(),l(40,"li",11)(41,"a",16),_("click",function(){return s.closeMenu()}),h(42,"Case Studies"),r()(),l(43,"li",11)(44,"a",17),_("click",function(){return s.closeMenu()}),h(45,"Our Team"),r()(),l(46,"li",11)(47,"a",23),h(48,"Contact"),r()()()()(),d(49,"app-modal")),n&2&&(B(8),G("ngbCollapse",s.isCollapsed),B(22),G("ngbCollapse",s.isCollapsed))},dependencies:[j,ae,N,Ke],styles:["#logomovil[_ngcontent-%COMP%]{visibility:hidden;display:none}.nav-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#4c0054}.nav-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:active{color:#ff7bc9;text-decoration:none}.nav-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus{color:#ff7bc9}.nav-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:none;color:#ff7bc9!important;padding-bottom:0;-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear;-webkit-transition:color .5s linear;-ms-transition:color .5s linear;transition:color .5s linear}.nav-link[_ngcontent-%COMP%]:hover{text-decoration:none;cursor:pointer}#btnheader[_ngcontent-%COMP%]{background-color:#ff7bc9;border-radius:30px;padding-left:20px;padding-right:20px;float:right;margin-left:150px;position:absolute;text-align:center;height:40px;line-height:22px;border:solid 1px #4C0054;-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear}#btnheader[_ngcontent-%COMP%]:hover{color:#fff!important;background-color:#4c0054;border:solid 1px #4C0054;-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear}#btnheader[_ngcontent-%COMP%]:active{color:#4c0054}#btnheader[_ngcontent-%COMP%]:focus{color:#4c0054}.navbar-brand[_ngcontent-%COMP%]{text-align:center;margin-right:0;margin-left:0;width:300px;transition:transform 2s ease-in-out}.navbar-brand[_ngcontent-%COMP%]:hover{transform:rotate(4deg) scale(1.05)}@media only screen and (max-width: 1400px){#btnheader[_ngcontent-%COMP%]{right:-260px}}@media only screen and (max-width: 1200px){#btnheader[_ngcontent-%COMP%]{right:-120px}}@media only screen and (max-width: 992px){#btnheader[_ngcontent-%COMP%]{right:-120px}li[_ngcontent-%COMP%]{font-size:12px}.navbar-brand[_ngcontent-%COMP%]{width:140px}.navbar-brand[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:120px}}@media only screen and (max-width: 768px){#logomovil[_ngcontent-%COMP%]{visibility:visible;display:block}#navbarToggleExternalContentSmall[_ngcontent-%COMP%]{position:absolute;top:100%;width:100%;background-color:#fff;z-index:997;box-shadow:none;border:none}ul[_ngcontent-%COMP%]{background-color:#fff}li[_ngcontent-%COMP%]{width:100%;height:60px;font-size:19px;background-color:#fff}#btnheader[_ngcontent-%COMP%]{right:-260px}}"]});let i=e;return i})();var Ue=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=m({type:e,selectors:[["app-footer"]],standalone:!0,features:[b],decls:55,vars:0,consts:[[1,"container-fluid",2,"background-color","#450351"],[1,"row","p-0","justify-content-center","d-flex"],[1,"d-flex","row",2,"height","100%"],[1,"col-xxl-3","offset-xxl-1","col-xl-3","offset-xl-1","col-lg-3","offset-md-1","col-md-3","offset-sm-0","col-sm-12","offset-lg-1","pt-3","text-center",2,"text-align","center","align-items","center"],["src","../../assets/img/logowhite.svg","id","logofooter"],["id","footercenter",1,"col-xxl-4","col-xl-4","col-lg-4","col-md-4","col-sm-12","align-bottom","p-xl-5","p-sm-3","justify-content-center"],["id","menucenter",1,"pt-3"],[2,"color","white"],["href","mailTo:hello@pinkdogstudio.com"],["href","tel:+61 433 288 751"],["href","tel:+56 9 3708 8574"],[1,"d-grid","gap-2","pb-xl-4","pb-sm-0","px-xxl-5","mx-xxl-5"],["type","button","data-bs-toggle","modal","data-bs-target","#exampleModal",1,"btn","btn-primary","btnverde","justify-content-center","mx-auto"],[1,"col-xxl-4","col-xl-3","col-lg-4","offset-md-0","col-md-4","col-sm-8","offset-sm-3","offset-lg-0","align-bottom","pt-3"],[1,"row","justify-content-center","align-items-center"],[1,"col-3","offset-xxl-2","offset-lg-2","text-start","footerlinks","footerlinks1"],["routerLink","/portfolio"],["routerLink","/services"],[1,"col-4","col-sm-5","text-start","footerlinks","footerlinks2"],["routerLink","/casestudies"],["routerLink","/team"],[1,"d-flex","pt-4","col-xxl-9","col-xl-8","col-md-11","offset-xxl-0","offset-xl-2","offset-lg-1","offset-md-1","offset-sm-0","pb-4","justify-content-center","align-items-center","mx-auto"],[1,"col-lg-2","col-md-2"],["href","https://www.instagram.com/pnkdog/","target","_blank",1,"footericons",2,"margin-left","7px"],[1,"bi","bi-instagram"],["href","https://www.linkedin.com/company/pinkdogstudio/","target","_blank",1,"footericons"],[1,"bi","bi-linkedin"],["href","https://www.google.com/search?q=pink+dog+studio&rlz=1C5CHFA_enCL952CL952&oq=pink+dog+studi&gs_lcrp=EgZjaHJvbWUqCQgAEEUYOxiABDIJCAAQRRg7GIAEMgYIARBFGDkyCAgCEAAYFhgeMg0IAxAAGIYDGIAEGIoFMg0IBBAAGIYDGIAEGIoFMg0IBRAAGIYDGIAEGIoFMgYIBhBFGDwyBggHEEUYPagCALACAA&sourceid=chrome&ie=UTF-8","target","_blank",1,"footericons"],[1,"bi","bi-google"],["href","https://vimeo.com/pinkdog","target","_blank",1,"footericons"],[1,"bi","bi-vimeo"],[1,"row","d-flex",2,"border-top","solid 1px white","height","80px","line-height","40px","text-align","center"],[1,"col-md-12","d-flex","justify-content-center"],[1,"justify-content-center","px-md-2","px-lg-4","px-sm-0","pt-3"],["href","#",1,"text-white",2,"opacity","50%"]],template:function(n,s){n&1&&(l(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),d(4,"img",4),r(),l(5,"div",5)(6,"div",6)(7,"h2",7),h(8,"Give us a whistle!"),r(),l(9,"p")(10,"a",8),h(11,"hello@pinkdogstudio.com"),r()(),l(12,"p")(13,"a",9),h(14,"SYD +61 433 288 751"),r()(),l(15,"p")(16,"a",10),h(17,"SLC +56 9 3708 8574"),r()(),l(18,"div",11)(19,"button",12),h(20,"Contact"),r()()()(),l(21,"div",13)(22,"div",14)(23,"div",15)(24,"a",16),h(25,"Portfolio"),r(),d(26,"br"),l(27,"a",17),h(28,"Services"),r(),d(29,"br"),r(),l(30,"div",18)(31,"a",19),h(32,"Case Studies"),r(),d(33,"br"),l(34,"a",20),h(35,"Our Team"),r(),d(36,"br"),r()(),l(37,"div",21)(38,"div",22)(39,"a",23),d(40,"i",24),r()(),l(41,"div",22)(42,"a",25),d(43,"i",26),r()(),l(44,"div",22)(45,"a",27),d(46,"i",28),r()(),l(47,"div",22)(48,"a",29),d(49,"i",30),r()()()()()(),l(50,"div",31)(51,"div",32)(52,"div",33)(53,"a",34),h(54,"Copyright \xA9 2024 \u2022 Pink Dog"),r()()()()())},dependencies:[j],styles:["a[_ngcontent-%COMP%]{color:#fff;text-decoration:none;font-family:HelveticaNeve}a[_ngcontent-%COMP%]:hover{color:#e8ff48;-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear}p[_ngcontent-%COMP%]{color:#4c0054;font-size:16px;font-family:HelveticaNeve;font-weight:100;word-wrap:break-word;margin-bottom:20px}h2[_ngcontent-%COMP%]{line-height:28px}.btnverde[_ngcontent-%COMP%]{-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear;width:100%}.footerlinks[_ngcontent-%COMP%]{margin-top:42px;line-height:40px}#footercenter[_ngcontent-%COMP%]{border-left:solid 1px white;border-right:solid 1px white;text-align:center}.footericons[_ngcontent-%COMP%]{margin-left:0;margin-right:0;font-size:25px;color:#fff;-webkit-transition:color .5s linear;-ms-transition:color .5s linear;transition:color .5s linear}.footericons[_ngcontent-%COMP%]:hover{color:#ff7bc9;-webkit-transition:color .5s linear;-ms-transition:color .5s linear;transition:color .5s linear}.footericons1[_ngcontent-%COMP%]{margin-left:0;margin-right:0}#logofooter[_ngcontent-%COMP%]{margin-right:120px;margin-top:40px;max-height:160px;max-width:200px}@media only screen and (max-width: 1200px){h2[_ngcontent-%COMP%]{font-size:26px}.footericons[_ngcontent-%COMP%]{margin-left:10px;margin-right:10px}.footericons1[_ngcontent-%COMP%]{margin-left:26px;margin-right:10px}.footerlinks[_ngcontent-%COMP%]{margin-left:40px}#logofooter[_ngcontent-%COMP%]{margin-right:20px;margin-top:40px;max-height:120px;max-width:160px}}@media only screen and (max-width: 768px){.footerlinks[_ngcontent-%COMP%]{margin-left:20px;margin-top:0}#logofooter[_ngcontent-%COMP%]{margin-right:0;margin-top:40px;max-height:160px;max-width:200px}.btnverde[_ngcontent-%COMP%]{max-width:200px}#menucenter[_ngcontent-%COMP%]{text-align:center!important}#footercenter[_ngcontent-%COMP%]{border-left:none;border-right:none;text-align:start;margin-bottom:0;padding-bottom:0}.footerlinks2[_ngcontent-%COMP%]{margin-left:-18px}.footericons[_ngcontent-%COMP%]{margin-left:10px;padding-bottom:20px}}@media only screen and (max-width: 576px){.footerlinks1[_ngcontent-%COMP%]{margin-left:34px}.text-white[_ngcontent-%COMP%]{font-size:9px;padding-left:10px;padding-right:10px}#footercenter[_ngcontent-%COMP%]{padding-bottom:0!important}#logofooter[_ngcontent-%COMP%]{margin-bottom:20px}}"]});let i=e;return i})();var je=(()=>{let e=class e{constructor(){this.isLoading=!1}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=m({type:e,selectors:[["app-spinner"]],inputs:{isLoading:"isLoading"},standalone:!0,features:[b],decls:6,vars:0,consts:[[1,"container-fluid","justify-content-center","align-items-center","align-middle","overlay"],[1,"row","justify-content-center","align-items-center","align-middle"],[1,"col","mx-auto","my-auto"],[1,"col","mx-auto","my-auto","justify-content-center","align-items-center","align-middle",2,"text-align","center"],["src","../../../assets/img/logo-white.svg",1,"justify-content-center","align-items-center","align-middle","overlayimg"]],template:function(n,s){n&1&&(l(0,"div",0)(1,"div",1),d(2,"div",2),l(3,"div",3),d(4,"img",4),r(),d(5,"div",2),r()())},styles:[".overlay[_ngcontent-%COMP%]{max-width:100%;max-height:100%;width:100%;height:100%;inset:0;background-color:#4c0054;position:fixed;z-index:999;overflow:hidden;transition:all .3s ease-in-out}.overlayimg[_ngcontent-%COMP%]{margin-top:70%;transition:all .3s ease-in-out}"]});let i=e;return i})();function vt(i,e){i&1&&d(0,"app-spinner")}var ze=(()=>{let e=class e{constructor(t,n){this.router=t,this.viewportScroller=n,this.isLoading=!0}ngOnInit(){this.router.events.pipe(T(t=>t instanceof ke)).subscribe(()=>{this.viewportScroller.scrollToPosition([0,0])}),setTimeout(()=>{this.isLoading=!1},3e3)}};e.\u0275fac=function(n){return new(n||e)(M(Fe),M(xe))},e.\u0275cmp=m({type:e,selectors:[["app-root"]],standalone:!0,features:[b],decls:4,vars:1,template:function(n,s){n&1&&(se(0,vt,1,0,"app-spinner"),d(1,"app-header")(2,"router-outlet")(3,"app-footer")),n&2&&oe(0,s.isLoading?0:-1)},dependencies:[Ae,$e,Ue,je,N,z]});let i=e;return i})();var Qe=[{path:"home",loadComponent:()=>import("./chunk-7VFFYZLB.js").then(i=>i.default)},{path:"portfolio",loadComponent:()=>import("./chunk-XR5RHILR.js").then(i=>i.default)},{path:"casestudies",loadComponent:()=>import("./chunk-VM3LJR7N.js").then(i=>i.default)},{path:"casestudies2",loadComponent:()=>import("./chunk-DJ2VF5JH.js").then(i=>i.default)},{path:"casestudies3",loadComponent:()=>import("./chunk-3KI25MHV.js").then(i=>i.default)},{path:"team",loadComponent:()=>import("./chunk-ILVPBJCI.js").then(i=>i.default)},{path:"services",loadComponent:()=>import("./chunk-KSZXGLBP.js").then(i=>i.default)},{path:"dashboard",loadComponent:()=>import("./chunk-OQMKSC77.js").then(i=>i.default)},{path:"",loadComponent:()=>import("./chunk-7VFFYZLB.js").then(i=>i.default)}];Ie(ze,{providers:[Be(Qe),Te(N,z,We)]}).catch(i=>console.error(i));

import{$a as m,Ob as O,Pb as P,Sa as c,Ua as L,V as S,W as v,Y as b,Ya as p,_,aa as I,ab as R,ba as f,ca as M,fb as T,ha as D,ka as o,la as B,na as g,ta as a,ua as d}from"./chunk-X3ETWY4L.js";var V=null;function F(){return V}function Ge(i){V??=i}var k=class{};var j=new g(""),G=(()=>{let t=class t{historyGo(e){throw new Error("")}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=o({token:t,factory:()=>d(Y),providedIn:"platform"});let i=t;return i})();var Y=(()=>{let t=class t extends G{constructor(){super(),this._doc=d(j),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return F().getBaseHref(this._doc)}onPopState(e){let n=F().getGlobalEventTarget(this._doc,"window");return n.addEventListener("popstate",e,!1),()=>n.removeEventListener("popstate",e)}onHashChange(e){let n=F().getGlobalEventTarget(this._doc,"window");return n.addEventListener("hashchange",e,!1),()=>n.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,n,r){this._history.pushState(e,n,r)}replaceState(e,n,r){this._history.replaceState(e,n,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=o({token:t,factory:()=>new t,providedIn:"platform"});let i=t;return i})();function H(i,t){if(i.length==0)return t;if(t.length==0)return i;let s=0;return i.endsWith("/")&&s++,t.startsWith("/")&&s++,s==2?i+t.substring(1):s==1?i+t:i+"/"+t}function N(i){let t=i.match(/#|\?|$/),s=t&&t.index||i.length,e=s-(i[s-1]==="/"?1:0);return i.slice(0,e)+i.slice(s)}function u(i){return i&&i[0]!=="?"?"?"+i:i}var A=(()=>{let t=class t{historyGo(e){throw new Error("")}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=o({token:t,factory:()=>d(Z),providedIn:"root"});let i=t;return i})(),W=new g(""),Z=(()=>{let t=class t extends A{constructor(e,n){super(),this._platformLocation=e,this._removeListenerFns=[],this._baseHref=n??this._platformLocation.getBaseHrefFromDOM()??d(j).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return H(this._baseHref,e)}path(e=!1){let n=this._platformLocation.pathname+u(this._platformLocation.search),r=this._platformLocation.hash;return r&&e?`${n}${r}`:n}pushState(e,n,r,l){let h=this.prepareExternalUrl(r+u(l));this._platformLocation.pushState(e,n,h)}replaceState(e,n,r,l){let h=this.prepareExternalUrl(r+u(l));this._platformLocation.replaceState(e,n,h)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}};t.\u0275fac=function(n){return new(n||t)(a(G),a(W,8))},t.\u0275prov=o({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();var K=(()=>{let t=class t{constructor(e){this._subject=new v,this._urlChangeListeners=[],this._urlChangeSubscription=null,this._locationStrategy=e;let n=this._locationStrategy.getBaseHref();this._basePath=J(N($(n))),this._locationStrategy.onPopState(r=>{this._subject.emit({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,n=""){return this.path()==this.normalize(e+u(n))}normalize(e){return t.stripTrailingSlash(q(this._basePath,$(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,n="",r=null){this._locationStrategy.pushState(r,"",e,n),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+u(n)),r)}replaceState(e,n="",r=null){this._locationStrategy.replaceState(r,"",e,n),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+u(n)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(n=>{this._notifyUrlChangeListeners(n.url,n.state)}),()=>{let n=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(n,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",n){this._urlChangeListeners.forEach(r=>r(e,n))}subscribe(e,n,r){return this._subject.subscribe({next:e,error:n,complete:r})}};t.normalizeQueryParams=u,t.joinWithSlash=H,t.stripTrailingSlash=N,t.\u0275fac=function(n){return new(n||t)(a(A))},t.\u0275prov=o({token:t,factory:()=>X(),providedIn:"root"});let i=t;return i})();function X(){return new K(a(A))}function q(i,t){if(!i||!t.startsWith(i))return t;let s=t.substring(i.length);return s===""||["/",";","?","#"].includes(s[0])?s:t}function $(i){return i.replace(/\/index.html$/,"")}function J(i){if(new RegExp("^(https?:)?//").test(i)){let[,s]=i.split(/\/\/[^\/]+/);return s}return i}function He(i,t){t=encodeURIComponent(t);for(let s of i.split(";")){let e=s.indexOf("="),[n,r]=e==-1?[s,""]:[s.slice(0,e),s.slice(e+1)];if(n.trim()===t)return decodeURIComponent(r)}return null}var C=/\s+/,x=[],Ye=(()=>{let t=class t{constructor(e,n){this._ngEl=e,this._renderer=n,this.initialClasses=x,this.stateMap=new Map}set klass(e){this.initialClasses=e!=null?e.trim().split(C):x}set ngClass(e){this.rawClass=typeof e=="string"?e.trim().split(C):e}ngDoCheck(){for(let n of this.initialClasses)this._updateState(n,!0);let e=this.rawClass;if(Array.isArray(e)||e instanceof Set)for(let n of e)this._updateState(n,!0);else if(e!=null)for(let n of Object.keys(e))this._updateState(n,!!e[n]);this._applyStateDiff()}_updateState(e,n){let r=this.stateMap.get(e);r!==void 0?(r.enabled!==n&&(r.changed=!0,r.enabled=n),r.touched=!0):this.stateMap.set(e,{enabled:n,changed:!0,touched:!0})}_applyStateDiff(){for(let e of this.stateMap){let n=e[0],r=e[1];r.changed?(this._toggleClass(n,r.enabled),r.changed=!1):r.touched||(r.enabled&&this._toggleClass(n,!1),this.stateMap.delete(n)),r.touched=!1}}_toggleClass(e,n){e=e.trim(),e.length>0&&e.split(C).forEach(r=>{n?this._renderer.addClass(this._ngEl.nativeElement,r):this._renderer.removeClass(this._ngEl.nativeElement,r)})}};t.\u0275fac=function(n){return new(n||t)(c(D),c(p))},t.\u0275dir=f({type:t,selectors:[["","ngClass",""]],inputs:{klass:[_.None,"class","klass"],ngClass:"ngClass"},standalone:!0});let i=t;return i})();var We=(()=>{let t=class t{constructor(e,n){this._viewContainer=e,this._context=new E,this._thenTemplateRef=null,this._elseTemplateRef=null,this._thenViewRef=null,this._elseViewRef=null,this._thenTemplateRef=n}set ngIf(e){this._context.$implicit=this._context.ngIf=e,this._updateView()}set ngIfThen(e){U("ngIfThen",e),this._thenTemplateRef=e,this._thenViewRef=null,this._updateView()}set ngIfElse(e){U("ngIfElse",e),this._elseTemplateRef=e,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngTemplateContextGuard(e,n){return!0}};t.\u0275fac=function(n){return new(n||t)(c(T),c(L))},t.\u0275dir=f({type:t,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"},standalone:!0});let i=t;return i})(),E=class{constructor(){this.$implicit=null,this.ngIf=null}};function U(i,t){if(!!!(!t||t.createEmbeddedView))throw new Error(`${i} must be a TemplateRef, but received '${b(t)}'.`)}function Q(i,t){return new S(2100,!1)}var w=class{createSubscription(t,s){return m(()=>t.subscribe({next:s,error:e=>{throw e}}))}dispose(t){m(()=>t.unsubscribe())}},y=class{createSubscription(t,s){return t.then(s,e=>{throw e})}dispose(t){}},ee=new y,te=new w,Ze=(()=>{let t=class t{constructor(e){this._latestValue=null,this._subscription=null,this._obj=null,this._strategy=null,this._ref=e}ngOnDestroy(){this._subscription&&this._dispose(),this._ref=null}transform(e){return this._obj?e!==this._obj?(this._dispose(),this.transform(e)):this._latestValue:(e&&this._subscribe(e),this._latestValue)}_subscribe(e){this._obj=e,this._strategy=this._selectStrategy(e),this._subscription=this._strategy.createSubscription(e,n=>this._updateLatestValue(e,n))}_selectStrategy(e){if(O(e))return ee;if(P(e))return te;throw Q(t,e)}_dispose(){this._strategy.dispose(this._subscription),this._latestValue=null,this._subscription=null,this._obj=null}_updateLatestValue(e,n){e===this._obj&&(this._latestValue=n,this._ref.markForCheck())}};t.\u0275fac=function(n){return new(n||t)(c(R,16))},t.\u0275pipe=M({name:"async",type:t,pure:!1,standalone:!0});let i=t;return i})();var Ke=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=I({type:t}),t.\u0275inj=B({});let i=t;return i})(),ne="browser",ie="server";function Xe(i){return i===ne}function qe(i){return i===ie}var z=class{};export{F as a,Ge as b,k as c,j as d,A as e,K as f,He as g,Ye as h,We as i,Ze as j,Ke as k,ne as l,Xe as m,qe as n,z as o};

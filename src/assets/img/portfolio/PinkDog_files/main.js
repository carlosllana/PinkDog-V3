// src/main.ts
import { bootstrapApplication } from "/@fs/Users/Carlos/Desktop/WORKS/PINKDOG NEW/ANGULAR2/PinkDog/.angular/cache/17.2.0/vite/deps/@angular_platform-browser.js?v=2da1635d";

// src/app/app.config.ts
import { provideRouter, withViewTransitions } from "/@fs/Users/Carlos/Desktop/WORKS/PINKDOG NEW/ANGULAR2/PinkDog/.angular/cache/17.2.0/vite/deps/@angular_router.js?v=2da1635d";

// src/app/app.routes.ts
var routes = [
  {
    path: "home",
    loadComponent: () => import("/chunk-VRYTZTOO.js")
  },
  {
    path: "portfolio",
    loadComponent: () => import("/chunk-VVI2QZ54.js")
  },
  {
    path: "casestudies",
    loadComponent: () => import("/chunk-NF6BWHYI.js")
  },
  {
    path: "",
    loadComponent: () => import("/chunk-VRYTZTOO.js")
  }
];

// src/app/app.config.ts
import { provideClientHydration } from "/@fs/Users/Carlos/Desktop/WORKS/PINKDOG NEW/ANGULAR2/PinkDog/.angular/cache/17.2.0/vite/deps/@angular_platform-browser.js?v=2da1635d";
var appConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideClientHydration()
  ]
};

// src/app/app.component.ts
import { Component as Component3 } from "/@fs/Users/Carlos/Desktop/WORKS/PINKDOG NEW/ANGULAR2/PinkDog/.angular/cache/17.2.0/vite/deps/@angular_core.js?v=2da1635d";
import { RouterOutlet } from "/@fs/Users/Carlos/Desktop/WORKS/PINKDOG NEW/ANGULAR2/PinkDog/.angular/cache/17.2.0/vite/deps/@angular_router.js?v=2da1635d";

// src/app/header/header.component.ts
import { Component } from "/@fs/Users/Carlos/Desktop/WORKS/PINKDOG NEW/ANGULAR2/PinkDog/.angular/cache/17.2.0/vite/deps/@angular_core.js?v=2da1635d";
import { RouterLink } from "/@fs/Users/Carlos/Desktop/WORKS/PINKDOG NEW/ANGULAR2/PinkDog/.angular/cache/17.2.0/vite/deps/@angular_router.js?v=2da1635d";
import * as i0 from "/@fs/Users/Carlos/Desktop/WORKS/PINKDOG NEW/ANGULAR2/PinkDog/.angular/cache/17.2.0/vite/deps/@angular_core.js?v=2da1635d";
var _HeaderComponent = class _HeaderComponent {
};
_HeaderComponent.\u0275fac = function HeaderComponent_Factory(t) {
  return new (t || _HeaderComponent)();
};
_HeaderComponent.\u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], standalone: true, features: [i0.\u0275\u0275StandaloneFeature], decls: 28, vars: 0, consts: [[1, "container-flex", 2, "border-bottom", "solid 1px #4C0054"], ["id", "mainnav", 1, "container"], [1, "d-flex", "justify-content-center", "py-3"], ["href", "#", 1, "nav-link", "navbar-brand", "logosmall"], ["src", "../../assets/img/logosmall.svg"], [1, "navbar", "navbar-expand-md"], ["type", "button", "data-toggle", "collapse", "data-target", "#collapsibleNavbar", 1, "navbar-toggler"], [1, "navbar-toggler-icon"], ["id", "collapsibleNavbar", 1, "collapse", "navbar-collapse"], [1, "nav", "nav-pills"], [1, "nav-item"], ["routerLinkActive", "active", "routerLink", "/portfolio", 1, "nav-link"], ["href", "#", "routerLink", "/casestudies", 1, "nav-link"], ["routerLink", "/home", 1, "nav-link", "navbar-brand"], ["src", "../../assets/img/logo.svg"], ["href", "#", 1, "nav-link"], ["id", "btnheader", 1, "nav-item"]], template: function HeaderComponent_Template(rf, ctx) {
  if (rf & 1) {
    i0.\u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "header", 2)(3, "a", 3);
    i0.\u0275\u0275element(4, "img", 4);
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(5, "nav", 5)(6, "button", 6);
    i0.\u0275\u0275element(7, "span", 7);
    i0.\u0275\u0275elementEnd();
    i0.\u0275\u0275elementStart(8, "div", 8)(9, "ul", 9)(10, "li", 10)(11, "a", 11);
    i0.\u0275\u0275text(12, "Portfolio");
    i0.\u0275\u0275elementEnd()();
    i0.\u0275\u0275elementStart(13, "li", 10)(14, "a", 12);
    i0.\u0275\u0275text(15, "Services");
    i0.\u0275\u0275elementEnd()();
    i0.\u0275\u0275elementStart(16, "li")(17, "a", 13);
    i0.\u0275\u0275element(18, "img", 14);
    i0.\u0275\u0275elementEnd()();
    i0.\u0275\u0275elementStart(19, "li", 10)(20, "a", 15);
    i0.\u0275\u0275text(21, "What we do");
    i0.\u0275\u0275elementEnd()();
    i0.\u0275\u0275elementStart(22, "li", 10)(23, "a", 15);
    i0.\u0275\u0275text(24, "Out team");
    i0.\u0275\u0275elementEnd()();
    i0.\u0275\u0275elementStart(25, "li", 16)(26, "a", 15);
    i0.\u0275\u0275text(27, "Contact");
    i0.\u0275\u0275elementEnd()()()()()()()();
  }
}, dependencies: [RouterLink], styles: ["\n\n.nav-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:active {\n  color: #FF7BC9;\n}\n.nav-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus {\n  color: #FF7BC9;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  color: #E8FF48;\n  padding-bottom: 0px;\n  -webkit-transition: background-color 500ms linear;\n  -ms-transition: background-color 500ms linear;\n  transition: background-color 500ms linear;\n}\n#btnheader[_ngcontent-%COMP%] {\n  background-color: #FF7BC9;\n  border-radius: 30px;\n  padding-left: 10px;\n  padding-right: 10px;\n  float: right;\n  right: -300px;\n  position: absolute;\n  text-align: center;\n  height: 40px;\n  line-height: 22px;\n  border: solid 1px #4C0054;\n  -webkit-transition: background-color 500ms linear;\n  -ms-transition: background-color 500ms linear;\n  transition: background-color 500ms linear;\n}\n#btnheader[_ngcontent-%COMP%]:hover {\n  background-color: #4C0054;\n  border-radius: 30px;\n  padding-left: 10px;\n  padding-right: 10px;\n  text-align: center;\n  line-height: 22px;\n  border: solid 1px #4C0054;\n  -webkit-transition: background-color 500ms linear;\n  -ms-transition: background-color 500ms linear;\n  transition: background-color 500ms linear;\n}\n.navbar-brand[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-right: 0px;\n  margin-left: 0px;\n  width: 300px;\n}\n/*# sourceMappingURL=header.component.css.map */"] });
var HeaderComponent = _HeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent" });
})();

// src/app/footer/footer.component.ts
import { Component as Component2 } from "/@fs/Users/Carlos/Desktop/WORKS/PINKDOG NEW/ANGULAR2/PinkDog/.angular/cache/17.2.0/vite/deps/@angular_core.js?v=2da1635d";
import * as i02 from "/@fs/Users/Carlos/Desktop/WORKS/PINKDOG NEW/ANGULAR2/PinkDog/.angular/cache/17.2.0/vite/deps/@angular_core.js?v=2da1635d";
var _FooterComponent = class _FooterComponent {
};
_FooterComponent.\u0275fac = function FooterComponent_Factory(t) {
  return new (t || _FooterComponent)();
};
_FooterComponent.\u0275cmp = /* @__PURE__ */ i02.\u0275\u0275defineComponent({ type: _FooterComponent, selectors: [["app-footer"]], standalone: true, features: [i02.\u0275\u0275StandaloneFeature], decls: 70, vars: 0, consts: [[1, "container-fluid", 2, "background-color", "#450351", "margin-top", "100px"], [1, "justify-content-center"], [1, "d-flex", 2, "height", "320px"], [1, "col-auto"], [1, "col-xl-3", "col-lg-3", "offset-xl-1", "pt-3", "text-end", 2, "text-align", "center", "align-items", "center"], ["src", "../../assets/img/logowhite.svg", "id", "logofooter"], [1, "col-3", "align-bottom", "p-5", "justify-content-center", "ml-auto", "mr-auto", 2, "border-left", "solid 1px white", "border-right", "solid 1px white", "text-align", "start"], [2, "color", "white"], ["href", "#"], [1, "d-grid", "gap-2"], ["type", "button", 1, "btn", "btn-primary", "btnverde", 2, "max-width", "100%"], [1, "col-xl-3", "col-lg-3", "align-bottom", "pt-3"], [1, "row", "my-3"], [1, "col-xl-3", "col-lg-2", "text-start", "footerlinks"], [1, "col-xl-4", "col-lg-6", "text-start", "footerlinks"], [1, "d-flex", "pt-4", "text-end"], [1, "col-2", "footericons1"], ["href", "#", 1, "footericons"], [1, "bi", "bi-linkedin"], [1, "col-2"], [1, "bi", "bi-youtube"], [1, "bi", "bi-instagram"], [1, "bi", "bi-google"], [1, "col-auto", "ml-auto", "mr-auto"], [1, "row", "d-flex", 2, "border-top", "solid 1px white", "height", "80px", "line-height", "40px", "text-align", "center"], [1, "col-md-12", "d-flex", "justify-content-center"], [1, "justify-content-center", "px-4", "px-md-2", "px-lg-4", "pt-3"], ["href", "#", 1, "text-white"], ["href", "#", 1, "text-white", 2, "opacity", "50%"]], template: function FooterComponent_Template(rf, ctx) {
  if (rf & 1) {
    i02.\u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
    i02.\u0275\u0275element(3, "div", 3);
    i02.\u0275\u0275elementStart(4, "div", 4);
    i02.\u0275\u0275element(5, "img", 5);
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(6, "div", 6)(7, "div")(8, "h2", 7);
    i02.\u0275\u0275text(9, "Give us a whistle!");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(10, "p")(11, "a", 8);
    i02.\u0275\u0275text(12, "hellopinkdogstudio.com");
    i02.\u0275\u0275elementEnd()();
    i02.\u0275\u0275elementStart(13, "p")(14, "a", 8);
    i02.\u0275\u0275text(15, "SLC +56 9 3708 8574");
    i02.\u0275\u0275elementEnd()();
    i02.\u0275\u0275elementStart(16, "p")(17, "a", 8);
    i02.\u0275\u0275text(18, "SLC +56 9 3708 8574");
    i02.\u0275\u0275elementEnd()();
    i02.\u0275\u0275elementStart(19, "div", 9)(20, "button", 10);
    i02.\u0275\u0275text(21, "Contact");
    i02.\u0275\u0275elementEnd()()()();
    i02.\u0275\u0275elementStart(22, "div", 11)(23, "div", 12)(24, "div", 13)(25, "a", 8);
    i02.\u0275\u0275text(26, "Portfolio");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275element(27, "br");
    i02.\u0275\u0275elementStart(28, "a", 8);
    i02.\u0275\u0275text(29, "Services");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275element(30, "br");
    i02.\u0275\u0275elementStart(31, "a", 8);
    i02.\u0275\u0275text(32, "Portfolio");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275element(33, "br");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(34, "div", 14)(35, "a", 8);
    i02.\u0275\u0275text(36, "Our Team");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275element(37, "br");
    i02.\u0275\u0275elementStart(38, "a", 8);
    i02.\u0275\u0275text(39, "Blog");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275element(40, "br");
    i02.\u0275\u0275elementStart(41, "a", 8);
    i02.\u0275\u0275text(42, "Our Team");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275element(43, "br");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(44, "div", 15)(45, "div", 16)(46, "a", 17);
    i02.\u0275\u0275element(47, "i", 18);
    i02.\u0275\u0275elementEnd()();
    i02.\u0275\u0275elementStart(48, "div", 19)(49, "a", 17);
    i02.\u0275\u0275element(50, "i", 20);
    i02.\u0275\u0275elementEnd()();
    i02.\u0275\u0275elementStart(51, "div", 19)(52, "a", 17);
    i02.\u0275\u0275element(53, "i", 21);
    i02.\u0275\u0275elementEnd()();
    i02.\u0275\u0275elementStart(54, "div", 19)(55, "a", 17);
    i02.\u0275\u0275element(56, "i", 22);
    i02.\u0275\u0275elementEnd()()()()();
    i02.\u0275\u0275element(57, "div", 23)(58, "div", 23);
    i02.\u0275\u0275elementEnd()();
    i02.\u0275\u0275elementStart(59, "div", 24)(60, "div", 25)(61, "div", 26)(62, "a", 27);
    i02.\u0275\u0275text(63, "Privacy Policy");
    i02.\u0275\u0275elementEnd()();
    i02.\u0275\u0275elementStart(64, "div", 26)(65, "a", 27);
    i02.\u0275\u0275text(66, "Disclaimer");
    i02.\u0275\u0275elementEnd()();
    i02.\u0275\u0275elementStart(67, "div", 26)(68, "a", 28);
    i02.\u0275\u0275text(69, "Copyright \xA9 2024 \u2022 Pink Dog");
    i02.\u0275\u0275elementEnd()()()()();
  }
}, styles: ["\n\na[_ngcontent-%COMP%] {\n  color: white;\n  text-decoration: none;\n  font-family: HelveticaNeve;\n}\na[_ngcontent-%COMP%]:hover {\n  color: #E8FF48;\n  -webkit-transition: background-color 500ms linear;\n  -ms-transition: background-color 500ms linear;\n  transition: background-color 500ms linear;\n}\np[_ngcontent-%COMP%] {\n  color: #4C0054;\n  font-size: 16px;\n  font-family: HelveticaNeve;\n  font-weight: 100;\n  word-wrap: break-word;\n  margin-bottom: 20px;\n}\nh2[_ngcontent-%COMP%] {\n  line-height: 28px;\n}\n.btnverde[_ngcontent-%COMP%] {\n  -webkit-transition: background-color 500ms linear;\n  -ms-transition: background-color 500ms linear;\n  transition: background-color 500ms linear;\n}\n.footerlinks[_ngcontent-%COMP%] {\n  margin-top: 42px;\n  margin-left: 60px;\n  line-height: 40px;\n}\n.footericons[_ngcontent-%COMP%] {\n  margin-left: 0px;\n  margin-right: 0px;\n}\n.footericons1[_ngcontent-%COMP%] {\n  margin-left: 14px;\n  margin-right: 0px;\n}\n#logofooter[_ngcontent-%COMP%] {\n  margin-right: 70px;\n  margin-top: 40px;\n  max-height: 160px;\n  max-width: 200px;\n}\n@media only screen and (max-width: 1200px) {\n  h2[_ngcontent-%COMP%] {\n    font-size: 26px;\n  }\n  .footericons[_ngcontent-%COMP%] {\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n  .footericons1[_ngcontent-%COMP%] {\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n  .footerlinks[_ngcontent-%COMP%] {\n    margin-left: 40px;\n  }\n  #logofooter[_ngcontent-%COMP%] {\n    margin-right: 20px;\n    margin-top: 40px;\n    max-height: 120px;\n    max-width: 160px;\n  }\n}\n/*# sourceMappingURL=footer.component.css.map */"] });
var FooterComponent = _FooterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i02.\u0275setClassDebugInfo(FooterComponent, { className: "FooterComponent" });
})();

// src/app/app.component.ts
import * as i03 from "/@fs/Users/Carlos/Desktop/WORKS/PINKDOG NEW/ANGULAR2/PinkDog/.angular/cache/17.2.0/vite/deps/@angular_core.js?v=2da1635d";
var _AppComponent = class _AppComponent {
  constructor() {
    this.title = "PinkDog";
  }
  ngOnInit() {
  }
};
_AppComponent.\u0275fac = function AppComponent_Factory(t) {
  return new (t || _AppComponent)();
};
_AppComponent.\u0275cmp = /* @__PURE__ */ i03.\u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [i03.\u0275\u0275StandaloneFeature], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) {
  if (rf & 1) {
    i03.\u0275\u0275element(0, "app-header")(1, "router-outlet")(2, "app-footer");
  }
}, dependencies: [RouterOutlet, HeaderComponent, FooterComponent], styles: ["\n\n/*# sourceMappingURL=app.component.css.map */"] });
var AppComponent = _AppComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i03.\u0275setClassDebugInfo(AppComponent, { className: "AppComponent" });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tYWluLnRzIiwic3JjL2FwcC9hcHAuY29uZmlnLnRzIiwic3JjL2FwcC9hcHAucm91dGVzLnRzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50LnRzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50Lmh0bWwiLCJzcmMvYXBwL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LnRzIiwic3JjL2FwcC9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5odG1sIiwic3JjL2FwcC9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC50cyIsInNyYy9hcHAvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cIkBhbmd1bGFyL2xvY2FsaXplXCIgLz5cblxuaW1wb3J0IHsgYm9vdHN0cmFwQXBwbGljYXRpb24gfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IGFwcENvbmZpZyB9IGZyb20gJy4vYXBwL2FwcC5jb25maWcnO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAvYXBwLmNvbXBvbmVudCc7XG5cbmJvb3RzdHJhcEFwcGxpY2F0aW9uKEFwcENvbXBvbmVudCwgYXBwQ29uZmlnKVxuICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcbiIsImltcG9ydCB7IEFwcGxpY2F0aW9uQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwcm92aWRlUm91dGVyLCB3aXRoVmlld1RyYW5zaXRpb25zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9hcHAucm91dGVzJztcbmltcG9ydCB7IHByb3ZpZGVDbGllbnRIeWRyYXRpb24gfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuZXhwb3J0IGNvbnN0IGFwcENvbmZpZzogQXBwbGljYXRpb25Db25maWcgPSB7XG4gIHByb3ZpZGVyczogW1xuICAgICBwcm92aWRlUm91dGVyKHJvdXRlcyxcbiAgICAgIHdpdGhWaWV3VHJhbnNpdGlvbnMoKVxuICAgICAgKSxcbiAgICAgcHJvdmlkZUNsaWVudEh5ZHJhdGlvbigpXVxufTtcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gIFxuICB7XG4gIFxuICBwYXRoOiAnaG9tZScsIFxuICBsb2FkQ29tcG9uZW50OiAoKSA9PiBpbXBvcnQoJy4vaG9tZS9ob21lLmNvbXBvbmVudCcpLFxuXG59LCBcbntcbiAgXG4gIHBhdGg6ICdwb3J0Zm9saW8nLCBcbiAgbG9hZENvbXBvbmVudDogKCkgPT4gaW1wb3J0KCcuL3BvcnRmb2xpby9wb3J0Zm9saW8uY29tcG9uZW50JyksXG5cbn0sXG5cbntcbiAgXG4gIHBhdGg6ICdjYXNlc3R1ZGllcycsIFxuICBsb2FkQ29tcG9uZW50OiAoKSA9PiBpbXBvcnQoJy4vcG9ydGZvbGlvL3BvcnRmb2xpby1jYXNlLXN0dWR5L3BvcnRmb2xpby1jYXNlLXN0dWR5LmNvbXBvbmVudCcpLFxuXG59LFxuXG57XG5wYXRoOicnLFxuIGxvYWRDb21wb25lbnQ6ICgpID0+IGltcG9ydCgnLi9ob21lL2hvbWUuY29tcG9uZW50JyksfVxuIFxuXTtcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEhlYWRlckNvbXBvbmVudCB9IGZyb20gXCIuL2hlYWRlci9oZWFkZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBGb290ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9mb290ZXIvZm9vdGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1yb290JyxcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsOiAnLi9hcHAuY29tcG9uZW50LmNzcycsXG4gICAgaW1wb3J0czogW1JvdXRlck91dGxldCwgSGVhZGVyQ29tcG9uZW50LCBGb290ZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIG5nT25Jbml0KCkge1xuICAgXG4gIH1cbiAgdGl0bGUgPSAnUGlua0RvZyc7XG59XG4iLCI8YXBwLWhlYWRlcj48L2FwcC1oZWFkZXI+XG5cbjxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cblxuPGFwcC1mb290ZXI+PC9hcHAtZm9vdGVyPiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTGlua30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWhlYWRlcicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFsgUm91dGVyTGlua10sXG4gIHRlbXBsYXRlVXJsOiAnLi9oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vaGVhZGVyLmNvbXBvbmVudC5jc3MnXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCB7XG5cbn1cbiIsIlxuXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsZXhcIiBzdHlsZT1cImJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjNEMwMDU0O1wiPlxuIFxuICA8ZGl2IGlkPVwibWFpbm5hdlwiIGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGhlYWRlciBjbGFzcz1cImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIHB5LTNcIiAgPlxuICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm5hdi1saW5rIG5hdmJhci1icmFuZCBsb2dvc21hbGxcIj48aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWcvbG9nb3NtYWxsLnN2Z1wiPjwvYT5cbiAgICAgIFxuICAgICAgPG5hdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItZXhwYW5kLW1kIFwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwibmF2YmFyLXRvZ2dsZXJcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiI2NvbGxhcHNpYmxlTmF2YmFyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdG9nZ2xlci1pY29uXCI+PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICA8ZGl2IGNsYXNzPVwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXCIgaWQ9XCJjb2xsYXBzaWJsZU5hdmJhclwiPlxuICBcbiAgICAgIDx1bCBjbGFzcz1cIm5hdiBuYXYtcGlsbHNcIiA+XG4gICAgICAgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+PGEgcm91dGVyTGlua0FjdGl2ZT1cImFjdGl2ZVwiIHJvdXRlckxpbms9XCIvcG9ydGZvbGlvXCIgY2xhc3M9XCJuYXYtbGlua1wiID5Qb3J0Zm9saW88L2E+PC9saT5cbiAgICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj48YSBocmVmPVwiI1wiIGNsYXNzPVwibmF2LWxpbmtcIiByb3V0ZXJMaW5rPVwiL2Nhc2VzdHVkaWVzXCI+U2VydmljZXM8L2E+PC9saT5cbiAgICAgICAgPGxpID48YSAgcm91dGVyTGluaz1cIi9ob21lXCIgY2xhc3M9XCJuYXYtbGluayBuYXZiYXItYnJhbmRcIj48aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWcvbG9nby5zdmdcIj48L2E+PC9saT5cbiAgICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj48YSBocmVmPVwiI1wiIGNsYXNzPVwibmF2LWxpbmtcIj5XaGF0IHdlIGRvPC9hPjwvbGk+XG4gICAgICAgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+PGEgaHJlZj1cIiNcIiBjbGFzcz1cIm5hdi1saW5rXCI+T3V0IHRlYW08L2E+PC9saT4gXG4gICAgICAgIDxsaSBjbGFzcz1cIm5hdi1pdGVtIFwiIGlkPVwiYnRuaGVhZGVyXCI+PGEgaHJlZj1cIiNcIiBjbGFzcz1cIm5hdi1saW5rXCI+Q29udGFjdDwvYT48L2xpPiBcblxuICAgICAgPC91bD5cblxuICAgICAgPC9kaXY+XG4gICAgPC9uYXY+XG4gICAgPC9oZWFkZXI+XG4gIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWZvb3RlcicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtdLFxuICB0ZW1wbGF0ZVVybDogJy4vZm9vdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2Zvb3Rlci5jb21wb25lbnQuY3NzJ1xufSlcbmV4cG9ydCBjbGFzcyBGb290ZXJDb21wb25lbnQge1xuXG59XG4iLCI8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjNDUwMzUxOyAgbWFyZ2luLXRvcDogMTAwcHg7XCI+XG4gICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianVzdGlmeS1jb250ZW50LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIExlZnQgU2lkZSBDb250ZW50IC0tPlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXhcIiBzdHlsZT1cIiBoZWlnaHQ6IDMyMHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtYXV0b1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhsLTMgY29sLWxnLTMgb2Zmc2V0LXhsLTEgICBwdC0zIHRleHQtZW5kXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IGFsaWduLWl0ZW1zOiBjZW50ZXI7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWcvbG9nb3doaXRlLnN2Z1wiICBpZD1cImxvZ29mb290ZXJcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMyBhbGlnbi1ib3R0b20gcC01ICBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyICBtbC1hdXRvIG1yLWF1dG9cIiBzdHlsZT1cIiBib3JkZXItbGVmdDpzb2xpZCAxcHggd2hpdGU7Ym9yZGVyLXJpZ2h0OnNvbGlkIDFweCB3aGl0ZTsgdGV4dC1hbGlnbjogc3RhcnQ7IFwiID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgc3R5bGU9XCJjb2xvcjogd2hpdGU7XCI+R2l2ZSB1cyBhIHdoaXN0bGUhPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48YSBocmVmPVwiI1wiID5oZWxsb3Bpbmtkb2dzdHVkaW8uY29tPC9hPjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48YSBocmVmPVwiI1wiPlNMQyArNTYgOSAzNzA4IDg1NzQ8L2E+PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxhIGhyZWY9XCIjXCI+U0xDICs1NiA5IDM3MDggODU3NDwvYT48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZ3JpZCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bnZlcmRlXCIgdHlwZT1cImJ1dHRvblwiIHN0eWxlPVwiICBtYXgtd2lkdGg6IDEwMCU7XCI+Q29udGFjdDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteGwtMyBjb2wtbGctMyBhbGlnbi1ib3R0b20gcHQtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbXktM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhsLTMgY29sLWxnLTIgdGV4dC1zdGFydCBmb290ZXJsaW5rc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5Qb3J0Zm9saW88L2E+IDxicj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+U2VydmljZXM8L2E+IDxicj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+UG9ydGZvbGlvPC9hPiA8YnI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14bC00IGNvbC1sZy02IHRleHQtc3RhcnQgZm9vdGVybGlua3NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+T3VyIFRlYW08L2E+IDxicj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+QmxvZzwvYT4gPGJyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5PdXIgVGVhbTwvYT4gPGJyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggcHQtNCAgdGV4dC1lbmRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMiBmb290ZXJpY29uczFcIj48YSBocmVmPVwiI1wiIGNsYXNzPVwiIGZvb3Rlcmljb25zXCI+PGkgY2xhc3M9XCJiaSBiaS1saW5rZWRpblwiID48L2k+PC9hPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0yXCI+IDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJmb290ZXJpY29uc1wiID48aSBjbGFzcz1cImJpIGJpLXlvdXR1YmVcIj48L2k+PC9hPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0yXCI+ICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiZm9vdGVyaWNvbnNcIj48aSBjbGFzcz1cImJpIGJpLWluc3RhZ3JhbVwiPjwvaT48L2E+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTJcIj4gPGEgaHJlZj1cIiNcIiBjbGFzcz1cImZvb3Rlcmljb25zXCI+PGkgY2xhc3M9XCJiaSBiaS1nb29nbGVcIj48L2k+PC9hPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWF1dG8gbWwtYXV0byBtci1hdXRvXCI+PC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1hdXRvIG1sLWF1dG8gbXItYXV0b1wiPjwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+IDwhLS0gQm90dG9tIENvbnRlbnQgLS0+XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIDwvZGl2PlxuXG5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBkLWZsZXhcIiBzdHlsZT1cImJvcmRlci10b3A6IHNvbGlkIDFweCB3aGl0ZTsgaGVpZ2h0OiA4MHB4OyBsaW5lLWhlaWdodDogNDBweDsgdGV4dC1hbGlnbjogY2VudGVyO1wiPlxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXJcIiA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIganVzdGlmeS1jb250ZW50LWNlbnRlciBweC00IHB4LW1kLTIgcHgtbGctNCBwdC0zXCI+IDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJ0ZXh0LXdoaXRlXCI+UHJpdmFjeSBQb2xpY3k8L2E+IDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiIGp1c3RpZnktY29udGVudC1jZW50ZXIgcHgtNCBweC1tZC0yIHB4LWxnLTQgcHQtM1wiPiA8YSBocmVmPVwiI1wiIGNsYXNzPVwidGV4dC13aGl0ZVwiPkRpc2NsYWltZXI8L2E+IDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiIGp1c3RpZnktY29udGVudC1jZW50ZXIgcHgtNCBweC1tZC0yIHB4LWxnLTQgcHQtM1wiPiA8YSBocmVmPVwiI1wiIGNsYXNzPVwidGV4dC13aGl0ZVwiIHN0eWxlPVwib3BhY2l0eTogNTAlO1wiPkNvcHlyaWdodCDCqSAyMDI0IOKAoiBQaW5rIERvZzwvYT4gPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICBcbiAgICAgICAgPC9kaXY+ICAgICAgICAgICBcbiAgICAgICAgXG4gICBcbiJdLCJtYXBwaW5ncyI6IjtBQUVBLFNBQVMsNEJBQTRCOzs7QUNEckMsU0FBUyxlQUFlLDJCQUEyQjs7O0FDRzVDLElBQU0sU0FBaUI7RUFFNUI7SUFFQSxNQUFNO0lBQ04sZUFBZSxNQUFNLE9BQU8scUJBQXVCOztFQUdyRDtJQUVFLE1BQU07SUFDTixlQUFlLE1BQU0sT0FBTyxxQkFBaUM7O0VBSS9EO0lBRUUsTUFBTTtJQUNOLGVBQWUsTUFBTSxPQUFPLHFCQUFpRTs7RUFJL0Y7SUFDQSxNQUFLO0lBQ0osZUFBZSxNQUFNLE9BQU8scUJBQXVCOzs7OztBRHhCcEQsU0FBUyw4QkFBOEI7QUFFaEMsSUFBTSxZQUErQjtFQUMx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
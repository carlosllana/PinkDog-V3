import{b}from"./chunk-7PLWRM7K.js";import{i as f}from"./chunk-SLIYNY4R.js";import{$ as u,Bb as h,Jb as d,Mb as v,Pa as m,Sa as s,nb as x,pb as a,qb as g,wb as o,xb as n,yb as c}from"./chunk-HYBCPQJV.js";function y(r,e){if(r&1&&(o(0,"div",9),c(1,"img",10),n()),r&2){let p=e.$implicit,t=e.index,i=h();g("active",t===i.activeSlideIndex),s(),a("src",p.src,m)("alt",p.alt)}}var P=(()=>{let e=class e{constructor(){this.activeSlideIndex=0,this.items=[{src:"../../../assets/img/carousel_casestudies1.png",alt:"First slide",route:"/casestudies"},{src:"../../../assets/img/carousel_casestudies2.png",alt:"Second slide",route:"/casestudies2"},{src:"../../../assets/img/carousel_casestudies3.png",alt:"Third slide",route:"/casestudies3"}]}get nextRoute(){let t=(this.activeSlideIndex+1)%this.items.length;return this.items[t].route}get prevRoute(){let t=(this.activeSlideIndex-1+this.items.length)%this.items.length;return this.items[t].route}ngAfterViewInit(){let t=document.querySelector("#carouselExampleFade");new bootstrap.Carousel(t,{interval:2e3,wrap:!0}).to(this.activeSlideIndex)}};e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=u({type:e,selectors:[["app-portfoliocarousel"]],inputs:{activeSlideIndex:"activeSlideIndex"},standalone:!0,features:[v],decls:13,vars:3,consts:[["id","carouselExampleFade",1,"carousel","slide","carousel-fade"],[1,"carousel-inner"],["class","carousel-item",3,"active",4,"ngFor","ngForOf"],["type","button",1,"carousel-control-prev",3,"routerLink"],["aria-hidden","true",1,"carousel-control-prev-icon"],["src","../../../assets/img/portfolio/sliderarrow.svg",2,"margin-top","10px"],[1,"visually-hidden"],["type","button",1,"carousel-control-next",3,"routerLink"],["aria-hidden","true",1,"carousel-control-next-icon"],[1,"carousel-item"],[1,"d-block","w-100",3,"src","alt"]],template:function(i,l){i&1&&(o(0,"div",0)(1,"div",1),x(2,y,2,4,"div",2),n(),o(3,"button",3)(4,"span",4),c(5,"img",5),n(),o(6,"span",6),d(7,"Previous"),n()(),o(8,"button",7)(9,"span",8),c(10,"img",5),n(),o(11,"span",6),d(12,"Next"),n()()()),i&2&&(s(2),a("ngForOf",l.items),s(),a("routerLink",l.prevRoute),s(5),a("routerLink",l.nextRoute))},dependencies:[b,f],styles:["ngb-carousel[_ngcontent-%COMP%]{max-width:700px;margin:50px auto}ngb-carousel[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;outline:none}ngb-carousel[_ngcontent-%COMP%]{width:inherit;height:inherit}.carousel-inner[_ngcontent-%COMP%]{overflow:visible}.carousel-item[_ngcontent-%COMP%]{display:flex!important;opacity:0;visibility:hidden;transition:opacity 1.2s ease-in-out,visibility 1.2s;z-index:-1}.carousel-item.active[_ngcontent-%COMP%]{opacity:1;visibility:visible;z-index:10}.carousel-control-prev[_ngcontent-%COMP%], .carousel-control-next[_ngcontent-%COMP%], .carousel-indicators[_ngcontent-%COMP%]{z-index:20}.carousel-control-next-icon[_ngcontent-%COMP%]{transform:rotate(180deg);scale:1;z-index:998;position:absolute;opacity:1;background-color:#fff;height:40px;width:40px;border-radius:40px;box-shadow:0 0 1px #0000001a}.carousel-control-next-icon[_ngcontent-%COMP%]:hover{margin-right:-4%;scale:1.1;opacity:1;box-shadow:5px -5px 1px #000c;transition:all .3s ease-in-out}.carousel-control-prev-icon[_ngcontent-%COMP%]{transform:rotate(0);margin-top:24px;scale:1;z-index:998;position:absolute;opacity:1;background-color:#fff;height:40px;width:40px;border-radius:40px;box-shadow:0 0 1px #0000001a}.carousel-control-prev-icon[_ngcontent-%COMP%]:hover{margin-left:-4%;scale:1.1;opacity:1;box-shadow:5px 5px 1px #000c;transition:all .3s ease-in-out}.portfolioproject[_ngcontent-%COMP%]{background-color:#ff7bc9;color:#4c0054;width:246px;float:right;margin-right:30px;border-radius:40px;border:solid 1px #4C0054;height:54px;line-height:50px;margin-bottom:4px;box-shadow:0 0 #0000}.portfolioproject[_ngcontent-%COMP%]:hover{margin-bottom:8px;margin-right:34px;box-shadow:5px 5px 1px #000c;transition:all .3s ease-in-out}"]});let r=e;return r})();export{P as a};

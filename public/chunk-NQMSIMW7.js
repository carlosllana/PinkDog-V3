import{a as f,b as _,c as m,d as v,e as M,f as P,g as O,h as y,j as E,k as w}from"./chunk-ZADCQF72.js";import{Gb as n,Hb as h,Jb as C,Va as s,Wa as g,c,ca as b,mb as x,tb as t,ub as e,vb as r,xb as p}from"./chunk-U25DPLNG.js";var I=(()=>{let i=class i{constructor(o){this.fb=o,this.buttonText="Contact me"}ngOnInit(){this.form=this.fb.group({from_name:["",m.required],phone_number:["",m.required],from_email:["",[m.required,m.email]],message:["",m.required]})}send(){return c(this,null,function*(){console.log("Sending email..."),console.log(this.form.value),f.init("YJ4Ybd_Ct7vKR-5e3");try{let o=yield f.send("service_zyxd8o4","template_n1csuhg",{from_name:this.form.value.from_name,phone_number:this.form.value.phone_number,from_email:this.form.value.from_email,message:this.form.value.message});console.log("Email sent successfully!",o.status,o.text),alert("Mensaje enviado"),this.form.reset()}catch(o){console.error("Failed to send email. Error:",o),alert("Error al enviar el mensaje")}})}changeButtonText(o){this.buttonText=o}};i.\u0275fac=function(l){return new(l||i)(g(E))},i.\u0275cmp=b({type:i,selectors:[["app-home-brand-consultation"]],standalone:!0,features:[C],decls:37,vars:2,consts:[[1,"container-fluid",2,"border-top","solid 1px #450351","border-bottom","solid 1px #450351"],[1,"container"],[1,"row"],[1,"col-lg-6","col-md-12","justify-content-center","align-items-center","mx-auto","p-0"],["id","freebrandtxt",1,"freebrand"],[1,"freebrand",2,"font-family","PPMonumentEXT","font-weight","200"],[1,"freebrand",2,"font-family","Helvetica Neue","font-weight","300"],[1,"freebrand",2,"font-family","PPMonument","font-weight","800"],[1,"row","justify-content-center","align-items-center","mx-auto"],["id","logoform","src","../../assets/img/imagen2.svg",1,"justify-content-center","align-items-center",2,"max-height","50%","max-width","50%","margin-top","10%","margin-left","-50px"],["id","formulario",1,"col-lg-4","col-md-12",2,"background-color","rgba(196,161,224,0.2)","border-left","solid 1px #450351","border-right","solid 1px #450351"],[2,"margin-bottom","50px","font-family","PPMonument"],[3,"formGroup","ngSubmit"],[1,"mb-3"],["for","exampleInputName1",1,"form-label"],["type","text","formControlName","from_name","id","exampleInputName1",1,"form-control"],["for","exampleInputPhone1",1,"form-label"],["type","tel","formControlName","phone_number","id","exampleInputPhone1",1,"form-control"],["for","exampleInputEmail1",1,"form-label"],["type","email","formControlName","from_email","id","exampleInputEmail1",1,"form-control"],["for","exampleInputMessage1",1,"form-label"],["type","text","formControlName","message","id","exampleInputMessage1",1,"form-control"],["type","submit",1,"btn","btn-primary","w-auto","btnmorado",2,"min-width","200px","margin-right","10px",3,"mouseover","mouseout"],[1,"col-lg-1","col-md-0"]],template:function(l,a){l&1&&(t(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"span",5),n(6,"Book a "),e(),r(7,"span",6),t(8,"span",7),n(9,"FREE "),r(10,"br"),n(11,"BRAND CONSULTATION!"),e()(),t(12,"div",8),r(13,"img",9),e()(),t(14,"div",10)(15,"h2",11),n(16,"Contact"),e(),t(17,"form",12),p("ngSubmit",function(){return a.send()}),t(18,"div",13)(19,"label",14),n(20,"Name"),e(),r(21,"input",15),e(),t(22,"div",13)(23,"label",16),n(24,"Phone Number"),e(),r(25,"input",17),e(),t(26,"div",13)(27,"label",18),n(28,"Email address"),e(),r(29,"input",19),e(),t(30,"div",13)(31,"label",20),n(32,"Message"),e(),r(33,"input",21),e(),t(34,"button",22),p("mouseover",function(){return a.changeButtonText("Contact me")})("mouseout",function(){return a.changeButtonText("Contact me")}),n(35),e()()(),r(36,"div",23),e()()()),l&2&&(s(17),x("formGroup",a.form),s(18),h(" ",a.buttonText," "))},dependencies:[w,P,_,v,M,O,y],styles:[".form-control[_ngcontent-%COMP%]{background-color:transparent;border:none;border-bottom:solid 1px #4C0054;border-radius:0}.form-label[_ngcontent-%COMP%]{color:#4c0054}.freebrand[_ngcontent-%COMP%]{color:#4c0054;font-size:36px;line-height:48px;border-bottom:none!important}#freebrandtxt[_ngcontent-%COMP%]{border-bottom:solid 1px #4C0054;padding-bottom:60px;width:100%;margin-top:80px}#formulario[_ngcontent-%COMP%]{background-color:#fff;padding:100px 40px}.btn-outline-primary[_ngcontent-%COMP%]{border-radius:1.3em;margin-top:.2em;margin-bottom:.2em}input[_ngcontent-%COMP%]:focus{border:none;border-bottom:1px solid #8EFFD5!important;box-shadow:#e8ff48}textarea[_ngcontent-%COMP%]:focus{border:none;border-bottom:1px solid #8EFFD5!important;box-shadow:#e8ff48}.form-control[_ngcontent-%COMP%]:focus{box-shadow:none!important}.btnrosado[_ngcontent-%COMP%], .btnheader[_ngcontent-%COMP%]{-webkit-transition:background-color .5s linear;-ms-transition:background-color .5s linear;transition:background-color .5s linear}@media (max-width: 1400px){.freebrand[_ngcontent-%COMP%]{font-size:32px;line-height:30px;border-bottom:none}}@media (max-width: 1200px){.freebrand[_ngcontent-%COMP%]{font-size:28px;border-bottom:none}}@media (max-width: 992px){.freebrand[_ngcontent-%COMP%]{font-size:34px;border-bottom:none}#logoform[_ngcontent-%COMP%]{display:none}#freebrandtxt[_ngcontent-%COMP%]{border-bottom:solid 1px #4C0054;padding-bottom:60px;width:100%;margin-top:80px}}@media (max-width: 576px){#formulario[_ngcontent-%COMP%]{border-top:solid 1px #4C0054;padding-top:50px;padding-bottom:60px}.freebrand[_ngcontent-%COMP%]{font-size:32px;line-height:38px}#freebrandtxt[_ngcontent-%COMP%]{border-bottom:solid 1px #4C0054}#logoform[_ngcontent-%COMP%]{display:none}@media (max-width: 406px){#formulario[_ngcontent-%COMP%]{border-top:solid 1px #4C0054;padding-top:50px;padding-bottom:60px}.freebrand[_ngcontent-%COMP%]{font-size:29px;line-height:36px}#freebrandtxt[_ngcontent-%COMP%]{border-bottom:solid 1px #4C0054}#logoform[_ngcontent-%COMP%]{display:none}}}"]});let d=i;return d})();export{I as a};
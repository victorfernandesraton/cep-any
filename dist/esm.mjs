var l=class extends Error{constructor(e){super(e)}};var u=class extends l{constructor(e){super(`invalid params ${e}`)}};var s=class o{constructor(e,t,r=""){this.api=e,this.requester=t,this.baseUrl=r}overrideRequest(e){this.requester=e}static generalParse(e){return e.replace("-","").replace(".","")}static validateCep(e){return/[0-9]{8}/.test(e)}async execute(e){let t="";typeof e=="number"?t=e.toString():t=e;let r=o.generalParse(t);if(!o.validateCep(r))throw new u(r);return this.handler(r)}handler(e){throw new Error("Not implemented")}};var i=class{#e;constructor(e){this.#e=e}async execute(e){return await Promise.any(this.#e.map(r=>r.execute(e)))}};var p=class{async execute({url:e,body:t,headers:r,method:n,params:x}){let a=new URLSearchParams(x),y={method:n,body:t,headers:r},g=`${e}?${a.toString()}`;return fetch(g,y)}};var m=class extends s{constructor(e){super("apicep",e,"https://ws.apicep.com/cep.json")}async handler(e){let t=await this.requester.execute({url:this.baseUrl,params:{code:e}}),r=await t.json();if(!t.ok)throw new Error(...r);return{cep:r.code.replace("-",""),city:r.city,state:r.state,neighborhood:r.district??"",street:r.address}}};var h=class extends s{constructor(e){super("brasilAPI",e,"https://brasilapi.com.br/api/cep/v1")}async handler(e){let t=await this.requester.execute({url:`${this.baseUrl}/${e}`}),r=await t.json();if(!t.ok)throw new Error(r);return{...r}}};var c=class extends Error{api="";constructor(e,t){t?super(t):super(),this.api=e}};function v(o){return`<?xml version="1.0"?>
	<soapenv:Envelope 		xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">  <soapenv:Header />  <soapenv:Body>    <cli:consultaCEP>      <cep>${o}</cep>    </cli:consultaCEP>  </soapenv:Body></soapenv:Envelope>`}function b(o){try{let e=o.replace(/\r?\n|\r/g,"").match(/<return>(.*)<\/return>/)?.[0]??"";if(e=="")throw new c(`invalid regex got ${o}`,"correios");let r=e.replace("<return>","").replace("</return>","").split(/</).reduce((n,x)=>{let a=x.split(">");return a.length>1&&a[1].trim().length&&(n[a?.[0]]=a[1]),n},{});if(r?.cep===""||!r?.cep)throw new c("not returnd a cep to parse","correios");return{cep:r.cep??"",state:r.uf??"",city:r.cidade??"",street:r.bairro??"",neighborhood:r.end??""}}catch{throw new c("not implement xml","correios")}}var d=class extends s{constructor(e){super("correios",e,"https://apps.correios.com.br")}async handler(e){let t=await this.requester.execute({url:`${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`,body:v(e),method:"POST",headers:{"Content-Type":"application/xml"}}),r=await t.text();if(!t.ok)throw new Error(r);return b(r)}};var f=class extends s{static baseUrl;constructor(e){super("viacep",e,"https://viacep.com.br")}async handler(e){let t=await this.requester.execute({url:`${this.baseUrl}/ws/${e}/json`,method:"GET"}),r=await t.json();if(!t.ok)throw new Error(r);return{cep:r?.cep?.replace("-","")??"",state:r?.uf??"",city:r?.localidade??"",street:r?.logradouro??"",neighborhood:r?.bairro??""}}};function w({useDefaultProviders:o=!0,custonProviders:e=[],requester:t=new p}){let r=[];return o&&(r=[new f(t),new h(t),new m(t),new d(t)]),e?.length&&(r=[...r,...e]),t&&(r=[...r.map(n=>(n.overrideRequest(t),n))]),new i(r)}var S=o=>w({useDefaultProviders:!0}).execute(o);var Z=s;export{s as CepService,i as Provider,p as RequestWIthFetch,S as cep,w as factory,Z as service};

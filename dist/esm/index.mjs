var $=Object.defineProperty;var q=(r,e,t)=>e in r?$(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var f=(r,e,t)=>(q(r,typeof e!="symbol"?e+"":e,t),t);var s=class{constructor({cep:e,street:t,city:o,state:p,neighborhood:c}){this.cep=e,this.street=t,this.city=o,this.state=p,this.neighborhood=c}static create({cep:e,street:t,city:o,state:p,neighborhood:c}){return new s({cep:e,street:t,city:o,state:p,neighborhood:c})}};var d=class extends Error{};var x=class extends d{constructor(e){super(`invalid params ${e}`)}};var n=class{baseUrl="";constructor(e){this.api=e}generalParse(e){return e.replaceAll("-","")}validateCep(e){if(!/[0-9]{8}/.test(e))throw new x(e)}async execute(e){let t=this.generalParse(e);return this.validateCep(t),await this.handler(e)}async handler(e){throw new Error("not implemented")}};f(n,"api");var m=class{services;constructor(e){this.services=e}async execute(e){try{return await Promise.any(this.services.map(o=>o.execute(e)))}catch{throw new Error("error in execute cep")}}};function i({url:r,method:e="GET",body:t,params:o,headers:p}){let c=new URLSearchParams,a={method:e,body:t,headers:p};if(o)for(let y in o)c.set(y,o[y]);let R=`${r}?${c.toString()}`;return fetch(R,a)}function g(r){return s.create({cep:r.code.replaceAll("-",""),city:r.city,state:r.state,neighborhood:r.district??"",street:r.address})}var w=class extends n{constructor(){super("apicep"),this.baseUrl="https://ws.apicep.com/cep.json"}async handler(e){let t=await i({url:this.baseUrl,params:{code:e}}),o=await t.json();if(!t.ok)throw new Error(o);return g(o)}};function E(r){return s.create({...r})}var v=class extends n{constructor(){super("brasilAPI"),this.baseUrl="https://brasilapi.com.br/api/cep/v1/"}async handler(e){let t=await i({url:`${this.baseUrl}/${e}`}),o=await t.json();if(!t.ok)throw new Error(o);return E(o)}};var l=class extends Error{api="";constructor(e,t){super(t),this.api=e}};function P(r){return`<?xml version="1.0"?>
	<soapenv:Envelope 		xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">  <soapenv:Header />  <soapenv:Body>    <cli:consultaCEP>      <cep>${r}</cep>    </cli:consultaCEP>  </soapenv:Body></soapenv:Envelope>`}function S(r){try{let e=r.replace(/\r?\n|\r/g,"").match(/<return>(.*)<\/return>/)?.[0]??"";if(e=="")throw new l(`invalid regex got ${r}`,"correios");let o=e.replace("<return>","").replace("</return>","").split(/</).reduce((p,c)=>{let a=c.split(">");return a.length>1&&a[1].trim().length&&(p[a?.[0]]=a[1]),p},{});if(o?.cep===""||!o?.cep)throw new l("not returnd a cep to parse","correios");return s.create({cep:o.cep??"",state:o.uf??"",city:o.cidade??"",street:o.bairro??"",neighborhood:o.end??""})}catch{throw new l("not implement xml","correios")}}var b=class extends n{constructor(){super("correios"),this.baseUrl="https://apps.correios.com.br"}async handler(e){let t=await i({url:`${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`,body:P(e),method:"POST",headers:{"Content-Type":"application/xml"}}),o=await t.text();if(!t.ok)throw new Error(o);return S(o)}};function T(r){return s.create({cep:r?.cep?.replace("-","")??"",state:r?.uf??"",city:r?.localidade??"",street:r?.logradouro??"",neighborhood:r?.bairro??""})}var h=class extends n{constructor(){super("viacep"),this.baseUrl="https://viacep.com.br"}async handler(e){let t=await i({url:`${this.baseUrl}/ws/${e}/json`,method:"GET"}),o=await t.json();if(!t.ok)throw new Error(o);return T(o)}};f(h,"baseUrl");function C({useDefaultProviders:r=!0,custonProviders:e}){let t=[];return r&&(t=[new h,new v,new w,new b]),e?.length&&(t=[...t,...e]),new m(t)}var U=r=>C({useDefaultProviders:!0}).execute(r);var u={Cep:s,cep:U,CepService:n,Provider:m,factory:C};var Ae=u.cep,je=u.Provider,ke=u.Cep,Le=u.CepService,Me=u.factory;export{ke as Cep,Le as CepService,je as Provider,Ae as cep,Me as factory};

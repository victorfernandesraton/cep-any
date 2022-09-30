var P=Object.defineProperty;var C=(s,e,t)=>e in s?P(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var y=(s,e,t)=>(C(s,typeof e!="symbol"?e+"":e,t),t);var l=class extends Error{constructor(e){super(e)}};var h=class extends l{constructor(e){super(`invalid params ${e}`)}};function a({url:s,method:e="GET",body:t,params:r,headers:n}){let m=new URLSearchParams,i={method:e,body:t,headers:n};if(r)for(let x in r)m.set(x,r[x]);let q=`${s}?${m.toString()}`;return fetch(q,i)}var o=class{api;requester;baseUrl="";constructor(e,t=a){this.api=e,this.requester=t}overrideRequest(e){this.requester=e}generalParse(e){return e.replaceAll("-","")}validateCep(e){if(!/[0-9]{8}/.test(e))throw new h(e)}async execute(e){let t=this.generalParse(e);return this.validateCep(t),await this.handler(e)}};var c=class{services;constructor(e){this.services=e}async execute(e){return await Promise.any(this.services.map(r=>r.execute(e)))}};var d=class extends o{constructor(){super("apicep"),this.baseUrl="https://ws.apicep.com/cep.json"}async handler(e){let t=await a({url:this.baseUrl,params:{code:e}}),r=await t.json();if(!t.ok)throw new Error(r);return{cep:r.code.replaceAll("-",""),city:r.city,state:r.state,neighborhood:r.district??"",street:r.address}}};var f=class extends o{constructor(){super("brasilAPI"),this.baseUrl="https://brasilapi.com.br/api/cep/v1/"}async handler(e){let t=await this.requester({url:`${this.baseUrl}/${e}`}),r=await t.json();if(!t.ok)throw new Error(r);return{...r}}};var p=class extends Error{api="";constructor(e,t){t?super(t):super(),this.api=e}};function b(s){return`<?xml version="1.0"?>
	<soapenv:Envelope 		xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">  <soapenv:Header />  <soapenv:Body>    <cli:consultaCEP>      <cep>${s}</cep>    </cli:consultaCEP>  </soapenv:Body></soapenv:Envelope>`}function g(s){try{let e=s.replace(/\r?\n|\r/g,"").match(/<return>(.*)<\/return>/)?.[0]??"";if(e=="")throw new p(`invalid regex got ${s}`,"correios");let r=e.replace("<return>","").replace("</return>","").split(/</).reduce((n,m)=>{let i=m.split(">");return i.length>1&&i[1].trim().length&&(n[i?.[0]]=i[1]),n},{});if(r?.cep===""||!r?.cep)throw new p("not returnd a cep to parse","correios");return{cep:r.cep??"",state:r.uf??"",city:r.cidade??"",street:r.bairro??"",neighborhood:r.end??""}}catch{throw new p("not implement xml","correios")}}var w=class extends o{constructor(){super("correios"),this.baseUrl="https://apps.correios.com.br"}async handler(e){let t=await this.requester({url:`${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`,body:b(e),method:"POST",headers:{"Content-Type":"application/xml"}}),r=await t.text();if(!t.ok)throw new Error(r);return g(r)}};var u=class extends o{constructor(){super("viacep"),this.baseUrl="https://viacep.com.br"}async handler(e){let t=await this.requester({url:`${this.baseUrl}/ws/${e}/json`,method:"GET"}),r=await t.json();if(!t.ok)throw new Error(r);return{cep:r?.cep?.replace("-","")??"",state:r?.uf??"",city:r?.localidade??"",street:r?.logradouro??"",neighborhood:r?.bairro??""}}};y(u,"baseUrl");function v({useDefaultProviders:s=!0,custonProviders:e,requester:t=a}){let r=[];return s&&(r=[new u,new f,new d,new w]),e?.length&&(r=[...r,...e]),t&&(r=[...r.map(n=>(n.overrideRequest(t),n))]),new c(r)}var R=s=>v({useDefaultProviders:!0}).execute(s);export{o as CepService,c as Provider,a as Requester,R as cep,v as factory};

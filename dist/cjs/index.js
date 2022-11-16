"use strict";var u=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var R=Object.getOwnPropertyNames;var S=Object.prototype.hasOwnProperty;var E=(s,e,t)=>e in s?u(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var T=(s,e)=>{for(var t in e)u(s,t,{get:e[t],enumerable:!0})},U=(s,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of R(e))!S.call(s,o)&&o!==t&&u(s,o,{get:()=>e[o],enumerable:!(r=C(e,o))||r.enumerable});return s};var $=s=>U(u({},"__esModule",{value:!0}),s);var P=(s,e,t)=>(E(s,typeof e!="symbol"?e+"":e,t),t);var A={};T(A,{CepService:()=>a,Provider:()=>p,Requester:()=>n,cep:()=>q,factory:()=>v});module.exports=$(A);var l=class extends Error{constructor(e){super(e)}};var d=class extends l{constructor(e){super(`invalid params ${e}`)}};function n({url:s,body:e,headers:t,method:r,params:o}){let w=new URLSearchParams(o),i={method:r,body:e,headers:t},g=`${s}?${w.toString()}`;return fetch(g,i)}var a=class{constructor(e){this.api=e;this.api=e,this.requester=n}baseUrl="";requester;overrideRequest(e){this.requester=e}generalParse(e){return e.replaceAll("-","")}validateCep(e){if(!/[0-9]{8}/.test(e))throw new d(e)}async execute(e){let t=this.generalParse(e);return this.validateCep(t),await this.handler(e)}};var p=class{services;constructor(e){this.services=e}async execute(e){return await Promise.any(this.services.map(r=>r.execute(e)))}};var h=class extends a{constructor(){super("apicep"),this.baseUrl="https://ws.apicep.com/cep.json"}async handler(e){let t=await n({url:this.baseUrl,params:{code:e}}),r=await t.json();if(!t.ok)throw new Error(r);return{cep:r.code.replaceAll("-",""),city:r.city,state:r.state,neighborhood:r.district??"",street:r.address}}};var f=class extends a{constructor(){super("brasilAPI"),this.baseUrl="https://brasilapi.com.br/api/cep/v1/"}async handler(e){let t=await this.requester({url:`${this.baseUrl}/${e}`}),r=await t.json();if(!t.ok)throw new Error(r);return{...r}}};var c=class extends Error{api="";constructor(e,t){t?super(t):super(),this.api=e}};function b(s){return`<?xml version="1.0"?>
	<soapenv:Envelope 		xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">  <soapenv:Header />  <soapenv:Body>    <cli:consultaCEP>      <cep>${s}</cep>    </cli:consultaCEP>  </soapenv:Body></soapenv:Envelope>`}function y(s){try{let e=s.replace(/\r?\n|\r/g,"").match(/<return>(.*)<\/return>/)?.[0]??"";if(e=="")throw new c(`invalid regex got ${s}`,"correios");let r=e.replace("<return>","").replace("</return>","").split(/</).reduce((o,w)=>{let i=w.split(">");return i.length>1&&i[1].trim().length&&(o[i?.[0]]=i[1]),o},{});if(r?.cep===""||!r?.cep)throw new c("not returnd a cep to parse","correios");return{cep:r.cep??"",state:r.uf??"",city:r.cidade??"",street:r.bairro??"",neighborhood:r.end??""}}catch{throw new c("not implement xml","correios")}}var x=class extends a{constructor(){super("correios"),this.baseUrl="https://apps.correios.com.br"}async handler(e){let t=await this.requester({url:`${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`,body:b(e),method:"POST",headers:{"Content-Type":"application/xml"}}),r=await t.text();if(!t.ok)throw new Error(r);return y(r)}};var m=class extends a{constructor(){super("viacep"),this.baseUrl="https://viacep.com.br"}async handler(e){let t=await this.requester({url:`${this.baseUrl}/ws/${e}/json`,method:"GET"}),r=await t.json();if(!t.ok)throw new Error(r);return{cep:r?.cep?.replace("-","")??"",state:r?.uf??"",city:r?.localidade??"",street:r?.logradouro??"",neighborhood:r?.bairro??""}}};P(m,"baseUrl");function v({useDefaultProviders:s=!0,custonProviders:e,requester:t=n}){let r=[];return s&&(r=[new m,new f,new h,new x]),e?.length&&(r=[...r,...e]),t&&(r=[...r.map(o=>(o.overrideRequest(t),o))]),new p(r)}var q=s=>v({useDefaultProviders:!0}).execute(s);0&&(module.exports={CepService,Provider,Requester,cep,factory});

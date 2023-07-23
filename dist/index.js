"use strict";var v=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var P=Object.getOwnPropertyNames;var $=Object.prototype.hasOwnProperty;var q=(o,e)=>{for(var t in e)v(o,t,{get:e[t],enumerable:!0})},R=(o,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of P(e))!$.call(o,s)&&s!==t&&v(o,s,{get:()=>e[s],enumerable:!(r=E(e,s))||r.enumerable});return o};var U=o=>R(v({},"__esModule",{value:!0}),o);var T={};q(T,{CepService:()=>n,Provider:()=>c,RequestWIthFetch:()=>i,cep:()=>g,factory:()=>x,service:()=>j});module.exports=U(T);var l=class extends Error{constructor(e){super(e)}};var u=class extends l{constructor(e){super(`invalid params ${e}`)}};var n=class o{constructor(e,t,r=""){this.api=e,this.requester=t,this.baseUrl=r}overrideRequest(e){this.requester=e}static generalParse(e){return e.split("-").join("").split(".").join("")}static validateCep(e){return/[0-9]{8}/.test(e)}async execute(e){let t="";typeof e=="number"?t=e.toString():t=e;let r=o.generalParse(t);if(!o.validateCep(r))throw new u(r);return this.handler(r)}handler(e){throw new Error("Not implemented")}};var c=class{#e;constructor(e){this.#e=e}async execute(e){return await Promise.any(this.#e.map(r=>r.execute(e)))}};var i=class{async execute({url:e,body:t,headers:r,method:s,params:w}){let a=new URLSearchParams(w),S={method:s,body:t,headers:r},C=`${e}?${a.toString()}`;return fetch(C,S)}};var m=class extends n{constructor(e){super("apicep",e,"https://ws.apicep.com/cep.json")}async handler(e){let t=await this.requester.execute({url:this.baseUrl,params:{code:e}}),r=await t.json();if(!t.ok)throw new Error(...r);return{cep:r.code.replace("-",""),city:r.city,state:r.state,neighborhood:r.district??"",street:r.address}}};var h=class extends n{constructor(e){super("brasilAPI",e,"https://brasilapi.com.br/api/cep/v1")}async handler(e){let t=await this.requester.execute({url:`${this.baseUrl}/${e}`}),r=await t.json();if(!t.ok)throw new Error(r);return{...r}}};var p=class extends Error{api="";constructor(e,t){t?super(t):super(),this.api=e}};function b(o){return`<?xml version="1.0"?>
	<soapenv:Envelope 		xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">  <soapenv:Header />  <soapenv:Body>    <cli:consultaCEP>      <cep>${o}</cep>    </cli:consultaCEP>  </soapenv:Body></soapenv:Envelope>`}function y(o){try{let e=o.replace(/\r?\n|\r/g,"").match(/<return>(.*)<\/return>/)?.[0]??"";if(e=="")throw new p(`invalid regex got ${o}`,"correios");let r=e.replace("<return>","").replace("</return>","").split(/</).reduce((s,w)=>{let a=w.split(">");return a.length>1&&a[1].trim().length&&(s[a?.[0]]=a[1]),s},{});if(r?.cep===""||!r?.cep)throw new p("not returnd a cep to parse","correios");return{cep:r.cep??"",state:r.uf??"",city:r.cidade??"",street:r.bairro??"",neighborhood:r.end??""}}catch{throw new p("not implement xml","correios")}}var d=class extends n{constructor(e){super("correios",e,"https://apps.correios.com.br")}async handler(e){let t=await this.requester.execute({url:`${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`,body:b(e),method:"POST",headers:{"Content-Type":"application/xml"}}),r=await t.text();if(!t.ok)throw new Error(r);return y(r)}};var f=class extends n{static baseUrl;constructor(e){super("viacep",e,"https://viacep.com.br")}async handler(e){let t=await this.requester.execute({url:`${this.baseUrl}/ws/${e}/json`,method:"GET"}),r=await t.json();if(!t.ok)throw new Error(r);return{cep:r?.cep?.replace("-","")??"",state:r?.uf??"",city:r?.localidade??"",street:r?.logradouro??"",neighborhood:r?.bairro??""}}};function x({useDefaultProviders:o=!0,custonProviders:e=[],requester:t=new i}){let r=[];return o&&(r=[new f(t),new h(t),new m(t),new d(t)]),e?.length&&(r=[...r,...e]),t&&(r=[...r.map(s=>(s.overrideRequest(t),s))]),new c(r)}var g=o=>x({useDefaultProviders:!0}).execute(o);var j=n;

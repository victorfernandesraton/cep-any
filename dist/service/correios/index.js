(function(global,factory){if(typeof define==="function"&&define.amd){define(["exports","../../requester","../index","./adapters"],factory)}else if(typeof exports!=="undefined"){factory(exports,require("../../requester"),require("../index"),require("./adapters"))}else{var mod={exports:{}};factory(mod.exports,global.requester,global.index,global.adapters);global.index=mod.exports}})(this,function(_exports,_requester,_index,_adapters){"use strict";Object.defineProperty(_exports,"__esModule",{value:true});class CorreiosService extends _index.CepService{constructor(){super("correios");this.baseUrl="https://apps.correios.com.br"}async handler(cep){const request=await (0,_requester).Requester({url:`${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`,body:(0,_adapters).parseParamsToXML(cep),method:"POST",headers:{"Content-Type":"application/xml"}});const data=await request.text();if(!request.ok){throw new Error(data)}return(0,_adapters).responseToCep(data)}}_exports.CorreiosService=CorreiosService})
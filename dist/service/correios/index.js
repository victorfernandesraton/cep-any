!function(global,factory){if("function"==typeof define&&define.amd)define(["exports","axios","../index","./adapters"],factory);else if("undefined"!=typeof exports)factory(exports,require("axios"),require("../index"),require("./adapters"));else{var mod={exports:{}};factory(mod.exports,global.axios,global.index,global.adapters),global.index=mod.exports}}(this,function(_exports,_axios,_index,_adapters){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});class CorreiosService extends _index.CepService{async handler(cep){const requestData=await _axios.default.post(`${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`,_adapters.parseParamsToXML(cep),{headers:{"Content-Type":"application/xml"}}),data=await requestData.data;return _adapters.responseToCep(data)}constructor(){super("correios"),this.baseUrl="https://apps.correios.com.br"}}_exports.CorreiosService=CorreiosService})
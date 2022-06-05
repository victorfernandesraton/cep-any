!function(global,factory){if("function"==typeof define&&define.amd)define(["exports","../../requester","../index","./adapters"],factory);else if("undefined"!=typeof exports)factory(exports,require("../../requester"),require("../index"),require("./adapters"));else{var mod={exports:{}};factory(mod.exports,global.requester,global.index,global.adapters),global.index=mod.exports}}(this,function(_exports,_requester,_index,_adapters){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});class ViaCepService extends _index.CepService{constructor(){super("viacep"),this.baseUrl="https://viacep.com.br"}async handler(cep){let request=await _requester.Requester({url:`${this.baseUrl}/ws/${cep}/json`,method:"GET"}),data=await request.json();if(!request.ok)throw new Error(data);return _adapters.responseToCep(data)}}_exports.ViaCepService=ViaCepService})
!function(global,factory){if("function"==typeof define&&define.amd)define(["exports","../../requester","../index","./adapters"],factory);else if("undefined"!=typeof exports)factory(exports,require("../../requester"),require("../index"),require("./adapters"));else{var mod={exports:{}};factory(mod.exports,global.requester,global.index,global.adapters),global.index=mod.exports}}(this,function(_exports,_requester,_index,_adapters){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});class BrasilAPIService extends _index.CepService{constructor(){super("brasilAPI"),this.baseUrl="https://brasilapi.com.br/api/cep/v1/"}async handler(cep){let request=await _requester.Requester({url:`${this.baseUrl}/${cep}`}),data=await request.json();if(!request.ok)throw new Error(data);return _adapters.responseToCep(data)}}_exports.BrasilAPIService=BrasilAPIService})
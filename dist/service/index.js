!function(global,factory){if("function"==typeof define&&define.amd)define(["exports","core-js/modules/es.string.replace-all.js","../errors/paramError"],factory);else if("undefined"!=typeof exports)factory(exports,require("core-js/modules/es.string.replace-all.js"),require("../errors/paramError"));else{var mod={exports:{}};factory(mod.exports,global.esStringReplaceAllJs,global.paramError),global.index=mod.exports}}(this,function(_exports,_esStringReplaceAllJs,_paramError){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.CepService=class{generalParse(cep){return cep.replaceAll("-","")}validateCep(cep){if(!/[0-9]{8}/.test(cep))throw new _paramError.ParamError(cep)}async execute(cep){const value=this.generalParse(cep);this.validateCep(value);const response=await this.handler(cep);return response}constructor(api){this.baseUrl="",this.api=api}}})
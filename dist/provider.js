!function(global,factory){if("function"==typeof define&&define.amd)define(["exports","core-js/modules/es.promise.any.js"],factory);else if("undefined"!=typeof exports)factory(exports,require("core-js/modules/es.promise.any.js"));else{var mod={exports:{}};factory(mod.exports,global.esPromiseAnyJs),global.provider=mod.exports}}(this,function(_exports,_esPromiseAnyJs){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.Provider=class{async execute(cep){try{const result=await Promise.any(this.services.map(item=>item.execute(cep)));return result}catch(error){throw new Error("error in execute cep")}}constructor(services){this.services=services}}})
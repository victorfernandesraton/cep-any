(function(global,factory){if(typeof define==="function"&&define.amd){define(["exports","./basicError"],factory)}else if(typeof exports!=="undefined"){factory(exports,require("./basicError"))}else{var mod={exports:{}};factory(mod.exports,global.basicError);global.paramError=mod.exports}})(this,function(_exports,_basicError){"use strict";Object.defineProperty(_exports,"__esModule",{value:true});class ParamError extends _basicError.BasicError{constructor(args){super(`invalid params ${args}`)}}_exports.ParamError=ParamError})
!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "regenerator-runtime",
        "../errors/paramError"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("regenerator-runtime"), require("../errors/paramError"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.regeneratorRuntime, global.paramError), global.index = mod.exports;
    }
}(this, function(_exports, _regeneratorRuntime, _paramError) {
    "use strict";
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg), value = info.value;
        } catch (error) {
            reject(error);
            return;
        }
        info.done ? resolve(value) : Promise.resolve(value).then(_next, _throw);
    }
    _regeneratorRuntime = (obj = _regeneratorRuntime) && obj.__esModule ? obj : {
        default: obj
    }, Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.CepService = void 0;
    var obj, CepService = function() {
        function CepService(api) {
            !function(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, CepService), this.baseUrl = "", this.api = api;
        }
        var _proto = CepService.prototype;
        return _proto.generalParse = function(cep) {
            return cep.replaceAll("-", "");
        }, _proto.validateCep = function(cep) {
            if (!/[0-9]{8}/.test(cep)) throw new _paramError.ParamError(cep);
        }, _proto.execute = function(cep) {
            var fn, _this = this;
            return (fn = _regeneratorRuntime.default.mark(function _callee() {
                var value, response;
                return _regeneratorRuntime.default.wrap(function(_ctx) {
                    for(;;)switch(_ctx.prev = _ctx.next){
                        case 0:
                            return value = _this.generalParse(cep), _this.validateCep(value), _ctx.next = 4, _this.handler(cep);
                        case 4:
                            return response = _ctx.sent, _ctx.abrupt("return", response);
                        case 6:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee);
            }), function() {
                var self = this, args = arguments;
                return new Promise(function(resolve, reject) {
                    var gen = fn.apply(self, args);
                    function _next(value) {
                        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                    }
                    function _throw(err) {
                        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                    }
                    _next(void 0);
                });
            })();
        }, CepService;
    }();
    _exports.CepService = CepService;
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "regenerator-runtime"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("regenerator-runtime"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.regeneratorRuntime), global.provider = mod.exports;
    }
}(this, function(_exports, _regeneratorRuntime) {
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
    }), _exports.Provider = void 0;
    var obj, Provider = function() {
        function Provider(services) {
            !function(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, Provider), this.services = services;
        }
        return Provider.prototype.execute = function(cep) {
            var fn, _this = this;
            return (fn = _regeneratorRuntime.default.mark(function _callee() {
                var result;
                return _regeneratorRuntime.default.wrap(function(_ctx) {
                    for(;;)switch(_ctx.prev = _ctx.next){
                        case 0:
                            return _ctx.prev = 0, _ctx.next = 3, Promise.any(_this.services.map(function(item) {
                                return item.execute(cep);
                            }));
                        case 3:
                            return result = _ctx.sent, _ctx.abrupt("return", result);
                        case 7:
                            throw _ctx.prev = 7, _ctx.t0 = _ctx.catch(0), new Error("error in execute cep");
                        case 10:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee, null, [
                    [
                        0,
                        7
                    ]
                ]);
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
        }, Provider;
    }();
    _exports.Provider = Provider;
});

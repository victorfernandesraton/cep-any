!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "regenerator-runtime",
        "axios",
        "../index",
        "./adapters"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("regenerator-runtime"), require("axios"), require("../index"), require("./adapters"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.regeneratorRuntime, global.axios, global.index, global.adapters), global.index = mod.exports;
    }
}(this, function(_exports, _regeneratorRuntime, _axios, _index, _adapters) {
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
    function _getPrototypeOf(o) {
        return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        }, _getPrototypeOf(o);
    }
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function _setPrototypeOf(o, p) {
        return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            return o.__proto__ = p, o;
        }, _setPrototypeOf(o, p);
    }
    _regeneratorRuntime = _interopRequireDefault(_regeneratorRuntime), _axios = _interopRequireDefault(_axios), Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.ViaCepService = void 0;
    var ViaCepService = function(CepService) {
        !function(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && _setPrototypeOf(subClass, superClass);
        }(ViaCepService, CepService);
        var Derived, hasNativeReflectConstruct, _super = (Derived = ViaCepService, hasNativeReflectConstruct = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct || Reflect.construct.sham) return !1;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
            } catch (e) {
                return !1;
            }
        }(), function() {
            var obj, self, call, result, Super = _getPrototypeOf(Derived);
            if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
            } else result = Super.apply(this, arguments);
            return self = this, (call = result) && ("object" == ((obj = call) && "undefined" != typeof Symbol && obj.constructor === Symbol ? "symbol" : typeof obj) || "function" == typeof call) ? call : function(self) {
                if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return self;
            }(self);
        });
        function ViaCepService() {
            var _this;
            return !function(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, ViaCepService), (_this = _super.call(this, "viacep")).baseUrl = "https://viacep.com.br", _this;
        }
        return ViaCepService.prototype.handler = function(cep) {
            var fn, _this = this;
            return (fn = _regeneratorRuntime.default.mark(function _callee() {
                var requestData, data;
                return _regeneratorRuntime.default.wrap(function(_ctx) {
                    for(;;)switch(_ctx.prev = _ctx.next){
                        case 0:
                            return _ctx.next = 2, _axios.default.get("".concat(_this.baseUrl, "/ws/").concat(cep, "/json"), {
                                method: "GET"
                            });
                        case 2:
                            return data = (requestData = _ctx.sent).data, _ctx.abrupt("return", _adapters.responseToCep(data));
                        case 5:
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
        }, ViaCepService;
    }(_index.CepService);
    _exports.ViaCepService = ViaCepService;
});

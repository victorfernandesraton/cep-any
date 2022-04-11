!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "./basicError"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("./basicError"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.basicError), global.paramError = mod.exports;
    }
}(this, function(_exports, _basicError) {
    "use strict";
    function _getPrototypeOf(o) {
        return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        }, _getPrototypeOf(o);
    }
    function _setPrototypeOf(o, p) {
        return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            return o.__proto__ = p, o;
        }, _setPrototypeOf(o, p);
    }
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.ParamError = void 0;
    var ParamError = function(BasicError) {
        !function(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && _setPrototypeOf(subClass, superClass);
        }(ParamError, BasicError);
        var Derived, hasNativeReflectConstruct, _super = (Derived = ParamError, hasNativeReflectConstruct = function() {
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
        function ParamError(args) {
            return !function(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, ParamError), _super.call(this, "invalid params ".concat(args));
        }
        return ParamError;
    }(_basicError.BasicError);
    _exports.ParamError = ParamError;
});

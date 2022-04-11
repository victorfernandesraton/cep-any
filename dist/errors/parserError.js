!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports);
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports), global.parserError = mod.exports;
    }
}(this, function(_exports) {
    "use strict";
    function _construct(Parent, args, Class) {
        return (_construct = !function() {
            if ("undefined" == typeof Reflect || !Reflect.construct || Reflect.construct.sham) return !1;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0;
            } catch (e) {
                return !1;
            }
        }() ? function _construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a), instance = new Constructor();
            return Class && _setPrototypeOf(instance, Class.prototype), instance;
        } : Reflect.construct).apply(null, arguments);
    }
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
    function _wrapNativeSuper(Class) {
        var _cache = "function" == typeof Map ? new Map() : void 0;
        return _wrapNativeSuper = function _wrapNativeSuper(Class) {
            var fn;
            if (null === Class || (fn = Class, -1 === Function.toString.call(fn).indexOf("[native code]"))) return Class;
            if ("function" != typeof Class) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== _cache) {
                if (_cache.has(Class)) return _cache.get(Class);
                _cache.set(Class, Wrapper);
            }
            function Wrapper() {
                return _construct(Class, arguments, _getPrototypeOf(this).constructor);
            }
            return Wrapper.prototype = Object.create(Class.prototype, {
                constructor: {
                    value: Wrapper,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), _setPrototypeOf(Wrapper, Class);
        }, _wrapNativeSuper(Class);
    }
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.ParserError = void 0;
    var ParserError = function(Error) {
        !function(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && _setPrototypeOf(subClass, superClass);
        }(ParserError, Error);
        var Derived, hasNativeReflectConstruct, _super = (Derived = ParserError, hasNativeReflectConstruct = function() {
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
        function ParserError(message, api) {
            var _this;
            return !function(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, ParserError), (_this = _super.call(this, message)).api = api, _this;
        }
        return ParserError;
    }(_wrapNativeSuper(Error));
    _exports.ParserError = ParserError;
});

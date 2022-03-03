"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserError = void 0;
var ParserError = (function (_super) {
    __extends(ParserError, _super);
    function ParserError(message, api) {
        var _this = _super.call(this, message) || this;
        Object.defineProperty(_this, "api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.api = api;
        return _this;
    }
    return ParserError;
}(Error));
exports.ParserError = ParserError;

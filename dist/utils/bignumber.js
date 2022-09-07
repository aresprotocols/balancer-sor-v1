'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.INFINITY = exports.ONE = exports.ZERO = exports.bnum = exports.BigNumber = void 0;
const bignumber_js_1 = require('bignumber.js');
Object.defineProperty(exports, 'BigNumber', {
    enumerable: true,
    get: function() {
        return bignumber_js_1.BigNumber;
    },
});
bignumber_js_1.BigNumber.config({
    EXPONENTIAL_AT: [-100, 100],
    ROUNDING_MODE: 1,
    DECIMAL_PLACES: 18,
});
function bnum(val) {
    return new bignumber_js_1.BigNumber(val.toString());
}
exports.bnum = bnum;
exports.ZERO = bnum(0);
exports.ONE = bnum(1);
exports.INFINITY = bnum('Infinity');

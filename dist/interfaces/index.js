"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatedOrder = void 0;
var ValidatedOrder;
(function (ValidatedOrder) {
    ValidatedOrder[ValidatedOrder["NONE"] = 0] = "NONE";
    ValidatedOrder[ValidatedOrder["BID"] = 1] = "BID";
    ValidatedOrder[ValidatedOrder["OFFER"] = 2] = "OFFER";
    ValidatedOrder[ValidatedOrder["BOTH"] = 3] = "BOTH";
})(ValidatedOrder || (exports.ValidatedOrder = ValidatedOrder = {}));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateTimestampFromString = void 0;
const getDateTimestampFromString = (date) => {
    return new Date(date).getTime();
};
exports.getDateTimestampFromString = getDateTimestampFromString;

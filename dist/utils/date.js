"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateTimestampFromString = void 0;
const getDateTimestampFromString = (date) => {
    return Math.floor(new Date(date).getTime() / 1000);
};
exports.getDateTimestampFromString = getDateTimestampFromString;

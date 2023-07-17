"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMysqlDateTimeString = exports.getUnixTimestampFromMysqlDateTime = void 0;
const getUnixTimestampFromMysqlDateTime = (mysqlDateTime) => {
    return Math.floor(new Date(`${mysqlDateTime}Z`).getTime() / 1000);
};
exports.getUnixTimestampFromMysqlDateTime = getUnixTimestampFromMysqlDateTime;
const getMysqlDateTimeString = (time) => {
    return new Date(time * 1000).toISOString().slice(0, 19).replace('T', ' ');
};
exports.getMysqlDateTimeString = getMysqlDateTimeString;

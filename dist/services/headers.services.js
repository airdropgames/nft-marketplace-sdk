"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = exports.HeaderFile = exports.HeaderAuth = void 0;
function HeaderAuth(token = "") {
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: token ?? ""
        }
    };
}
exports.HeaderAuth = HeaderAuth;
function HeaderFile(token = "") {
    return {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ?? "",
            Accept: "*/*",
            responseType: "blob"
        }
    };
}
exports.HeaderFile = HeaderFile;
function Header() {
    return {
        headers: {
            "Content-Type": "application/json"
        }
    };
}
exports.Header = Header;

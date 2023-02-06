"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDateTime = void 0;
const getCurrentDateTime = () => {
    const date = new Date();
    let curDateTime = `${date.getMonth() + 1}-${date.getDay()}-${date.getFullYear()} || ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return curDateTime;
};
exports.getCurrentDateTime = getCurrentDateTime;

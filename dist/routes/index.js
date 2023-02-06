"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRouter = void 0;
const express_1 = require("express");
const kanbanboard_1 = require("./kanbanboard");
exports.defaultRouter = (0, express_1.Router)();
exports.defaultRouter.use('/kanbanboard', kanbanboard_1.kanbanRouter);
exports.defaultRouter.get('/', (req, res) => {
    res.send('Note Board Server is Running');
});

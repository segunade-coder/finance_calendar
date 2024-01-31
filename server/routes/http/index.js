"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = require("./login");
const router = (0, express_1.Router)();
router.use("/login", login_1.routes);
exports.default = router;

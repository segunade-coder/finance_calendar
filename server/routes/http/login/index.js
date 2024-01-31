"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const functions_1 = require("../../../utils/functions");
const mysqlApi_1 = __importDefault(require("../../../utils/mysqlApi"));
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { email, password } = req.body;
    const isEmpty = (0, functions_1.checkIfEmpty)([{ email }, { password }]);
    if (isEmpty.length > 0) {
        return (0, functions_1.returnJSONError)(res, { data: isEmpty[0] }, 200);
    }
    try {
        const data = yield mysqlApi_1.default.queryString(`SELECT user_id, admin, email FROM people WHERE email = ? AND password = ?`, [email, password]);
        if (data.length > 0) {
            req.session.user_id = (_a = data[0]) === null || _a === void 0 ? void 0 : _a.user_id;
            req.session.user = (_b = data[0]) === null || _b === void 0 ? void 0 : _b.email;
            req.session.isAdmin = (_c = data[0]) === null || _c === void 0 ? void 0 : _c.admin;
            return (0, functions_1.returnJSONSuccess)(res, { admin: (_d = data[0]) === null || _d === void 0 ? void 0 : _d.admin });
        }
        else {
            (0, functions_1.returnJSONError)(res, { message: "Invalid credentials provided" });
        }
    }
    catch (error) {
        console.log(error);
    }
}));

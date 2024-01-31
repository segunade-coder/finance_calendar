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
exports.broadcastToAll = exports.checkIfEmpty = exports.validateAPi = exports.generateUserId = exports.escape = exports.returnErrorSocket = exports.returnSuccessSocket = exports.returnJSONError = exports.returnJSONSuccess = exports.sendEmail = exports.generateRandomId = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mysql_1 = __importDefault(require("mysql"));
const validator_1 = __importDefault(require("validator"));
dotenv_1.default.config({ path: "../.env" });
const nodemailer_1 = __importDefault(require("nodemailer"));
const generateRandomId = function () {
    let randomValues = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return randomValues
        .split("")
        .sort(() => 0.5 - Math.random())
        .join("");
};
exports.generateRandomId = generateRandomId;
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});
const sendEmail = (from = "Ush Engineering Team", subject, to, html) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: from + " <ushengineering@gmail.com>",
        to,
        subject,
        html,
    };
    try {
        const result = yield transporter.sendMail(mailOptions);
        return {
            status: true,
            message: result,
        };
    }
    catch (error) {
        return {
            status: false,
            message: error,
        };
    }
});
exports.sendEmail = sendEmail;
const returnJSONSuccess = (responseObject, rest, status = 200) => {
    responseObject.status(status);
    return responseObject.json(Object.assign({ status: true, message: "Successful" }, rest));
};
exports.returnJSONSuccess = returnJSONSuccess;
const returnJSONError = (responseObject, rest, status = 400) => {
    responseObject.status(status);
    responseObject.json(Object.assign({ status: false, message: "Error: An error occurred" }, rest));
};
exports.returnJSONError = returnJSONError;
const returnSuccessSocket = (rest = {}) => (Object.assign({ status: true, message: "Successful" }, rest));
exports.returnSuccessSocket = returnSuccessSocket;
const returnErrorSocket = (rest = {}) => (Object.assign({ status: false, message: "Error" }, rest));
exports.returnErrorSocket = returnErrorSocket;
const escape = (value) => mysql_1.default.escape(value);
exports.escape = escape;
const generateUserId = (repeatNumber = 4) => Math.floor(Math.random() * parseInt("9".repeat(repeatNumber)));
exports.generateUserId = generateUserId;
const validateAPi = (key) => {
    if (key === null || key === undefined) {
        return false;
    }
    else {
        if (validator_1.default.isEmpty(key) ||
            !validator_1.default.equals(key, process.env.API_KEY)) {
            return false;
        }
    }
    return true;
};
exports.validateAPi = validateAPi;
const checkIfEmpty = (values) => {
    let errors = [];
    values.forEach((value) => {
        let objValues = Object.values(value)[0] || null;
        if (objValues === "" || objValues === null || objValues === undefined) {
            let objKey = Object.keys(value);
            errors.push(`${objKey[0]} is required`);
        }
    });
    return errors;
};
exports.checkIfEmpty = checkIfEmpty;
const broadcastToAll = (socket, data, event_name) => {
    socket.emit(event_name, { data });
    socket.broadcast.emit(event_name, { data });
};
exports.broadcastToAll = broadcastToAll;

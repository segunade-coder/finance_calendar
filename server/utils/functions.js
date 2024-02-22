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
exports.sendExpirationEmails = exports.formatTimeAgo = exports.transformData = exports.convertToString = exports.broadcastToAll = exports.checkIfEmpty = exports.validateAPi = exports.generateUserId = exports.escape = exports.returnErrorSocket = exports.returnSuccessSocket = exports.returnJSONError = exports.returnJSONSuccess = exports.sendEmail = exports.generateRandomId = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mysql_1 = __importDefault(require("mysql"));
const validator_1 = __importDefault(require("validator"));
dotenv_1.default.config({ path: "../.env" });
const nodemailer_1 = __importDefault(require("nodemailer"));
const logToFile_1 = require("../logToFile");
const mysqlApi_1 = __importDefault(require("./mysqlApi"));
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
const convertToString = (date) => new Date(date).toJSON().slice(0, 10);
exports.convertToString = convertToString;
const transformData = (array) => array.map((items) => ({
    id: items.id,
    sendTo: JSON.parse(items.assignTo),
    deadline: (0, exports.convertToString)(new Date(items.deadline)),
    task: items.task,
}));
exports.transformData = transformData;
const formatTimeAgo = (date) => {
    let formatter = new Intl.RelativeTimeFormat(undefined, {
        numeric: "auto",
    });
    const DIVISION = [
        { amount: 60, name: "seconds" },
        { amount: 60, name: "minutes" },
        { amount: 24, name: "hours" },
        { amount: 7, name: "days" },
        { amount: 4.34524, name: "weeks" },
        { amount: 12, name: "months" },
        { amount: Number.POSITIVE_INFINITY, name: "years" },
    ];
    let duration = (date.valueOf() - new Date().valueOf()) / 1000;
    for (let i = 0; i < DIVISION.length; i++) {
        const division = DIVISION[i];
        if (Math.abs(duration) < division.amount) {
            // @ts-ignore
            return formatter.format(Math.round(duration), division.name);
        }
        duration /= division.amount;
    }
};
exports.formatTimeAgo = formatTimeAgo;
const sendExpirationEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [twoWeeksData, oneWeeksData, twoDaysData] = yield mysqlApi_1.default.getDataForMail();
        let transformedTwoWeeks = (0, exports.transformData)(twoWeeksData);
        let transformedOneWeeks = (0, exports.transformData)(oneWeeksData);
        let transformedTwoDays = (0, exports.transformData)(twoDaysData);
        const getEmails = [
            ...transformedTwoWeeks.map((data) => data.sendTo).flat(),
            ...transformedOneWeeks.map((data) => data.sendTo).flat(),
            ...transformedTwoDays.map((data) => data.sendTo).flat(),
        ];
        let namesToGetMail = Array.from(new Set(getEmails));
        if (namesToGetMail.length > 0) {
            const placeholders = namesToGetMail.map(() => "?").join(",");
            const mails = yield mysqlApi_1.default.queryString(`SELECT name, email FROM people WHERE name IN (${placeholders})`, namesToGetMail);
            yield sendMailFnc(transformedTwoDays, mails, 3);
            yield sendMailFnc(transformedOneWeeks, mails, 2);
            yield sendMailFnc(transformedTwoWeeks, mails, 1);
        }
        else {
            console.log("no data to run");
            (0, logToFile_1.logToFile)("no data to run");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendExpirationEmails = sendExpirationEmails;
const sendMailFnc = (tasksData, emailsToSendTo, statusNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        tasksData.forEach((item, i) => __awaiter(void 0, void 0, void 0, function* () {
            const findEmail = item.sendTo.map((name) => emailsToSendTo.find((mail) => mail.name === name).email);
            const mailResponse = yield (0, exports.sendEmail)("Ush Engineering Team", `Reminder of task '${item.task.slice(0, 5)}...'`, findEmail, `The Task with task name '${item.task}' which has been appointed to you still dose\'nt have a status of 'done', and this task will expire ${(0, exports.formatTimeAgo)(new Date(item.deadline))}. Do well to complete it. <p>Click <a href="${process.env.CLIENT_URL}/events/event/${item.id}">here</a> to go to task</p>. <p>Best Regards <br /> Ush Engineering Team.</p>`);
            if (mailResponse.status) {
                (0, logToFile_1.logToFile)("Mail sent successfully with status number " + statusNumber);
                yield mysqlApi_1.default.changeMailStatus(item.id, statusNumber);
            }
            else {
                (0, logToFile_1.logToFile)("Failed to send mail with status number " +
                    statusNumber +
                    " Error is " +
                    mailResponse.message);
            }
        }));
    }
    catch (error) {
        (0, logToFile_1.logToFile)(error);
    }
});

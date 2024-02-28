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
const createTables_1 = __importDefault(require("../../models/createTables"));
const mysqlApi_1 = __importDefault(require("../../utils/mysqlApi"));
const functions_1 = require("../../utils/functions");
const emailStatus = [];
const handleSockets = (socket) => {
    (0, createTables_1.default)();
    const req = socket.request;
    socket.on("disconnect", (user) => {
        //   logToFile("disconnect");
    });
    socket.on("check-status", () => {
        socket.emit("status", {
            user_id: req.session.user_email,
            user: req.session.user,
            admin: req.session.isAdmin,
        });
    });
    socket.on("get-mailStatus", () => {
        socket.emit("mail-response", {});
    });
    socket.on("get-others", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield mysqlApi_1.default.getAll("others");
            socket.emit("set-others", { data });
        }
        catch (error) {
            // logToFile(error);
            console.log(error);
        }
    }));
    socket.on("get-summary", () => __awaiter(void 0, void 0, void 0, function* () {
        // .catch((err) => logToFile(err));
    }));
    socket.on("get-others-category", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield mysqlApi_1.default.query("SELECT others_category FROM settings");
            socket.emit("set-others-category", { data: data[0] });
        }
        catch (error) {
            // logToFile(error);
            console.log(error);
        }
    }));
    socket.on("add-cashin", ({ amount, desc, category }) => __awaiter(void 0, void 0, void 0, function* () {
        yield mysqlApi_1.default
            .insert("cashin", {
            amount,
            category: category.toLowerCase().trim(),
            description: desc.toLowerCase().trim(),
        })
            .then((data) => {
            try {
                mysqlApi_1.default.getAll("cashin")
                    .then((data) => {
                    socket.emit("set-cashin", { data });
                    socket.broadcast.emit("set-cashin", { data });
                })
                    .catch((err) => {
                    // logToFile(err);
                });
            }
            catch (error) {
                // logToFile(error);
            }
        });
        // .catch((err) => logToFile(err));
    }));
    socket.on("add-cashout", ({ amount, desc, category }) => __awaiter(void 0, void 0, void 0, function* () {
        mysqlApi_1.default.insert("cashout", {
            amount,
            category: category.toLowerCase().trim(),
            description: desc.toLowerCase().trim(),
        }).then((data) => {
            try {
                mysqlApi_1.default.getAll("cashout")
                    .then((data) => {
                    socket.emit("set-cashout", { data });
                    socket.broadcast.emit("set-cashout", { data });
                })
                    .catch((err) => {
                    // logToFile(err);
                });
            }
            catch (error) {
                // logToFile(error);
            }
        });
        // .catch((err) => logToFile(err));
    }));
    socket.on("add-others", ({ desc, amount, category }) => __awaiter(void 0, void 0, void 0, function* () {
        if (desc !== "" && amount !== "" && category !== "") {
            mysqlApi_1.default.insert("others", {
                description: desc.trim(),
                amount,
                category,
            })
                .then((data) => {
                mysqlApi_1.default.getAll("others")
                    .then((data) => {
                    socket.emit("set-others", { data });
                    socket.broadcast.emit("set-others", { data });
                })
                    .catch((err) => {
                    // logToFile(err);
                });
            })
                .catch((err) => {
                // logToFile(err);
            });
        }
    }));
    socket.on("add-others-category", ({ category }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mysqlApi_1.default.queryString(`INSERT INTO settings (id, others_category) VALUES(1, '${JSON.stringify(category)}') ON DUPLICATE KEY UPDATE others_category = ?`, [JSON.stringify(category)]);
            const data = yield mysqlApi_1.default.query("SELECT others_category FROM settings");
            (0, functions_1.broadcastToAll)(socket, data[0], "set-others-category");
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on("add-task", ({ task, assignTo, priority, status, deadline, progress }, then) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            yield mysqlApi_1.default.insert("tasks", {
                task: task.toLowerCase().trim(),
                assignTo: JSON.stringify(assignTo),
                priority,
                status,
                deadline: deadline[1],
                progress,
            });
            (0, functions_1.broadcastToAll)(socket, yield mysqlApi_1.default.getAll("tasks"), "set-tasks");
            const emails = yield mysqlApi_1.default.queryString(`SELECT email FROM people WHERE name IN (?)`, [assignTo]);
            const mailToSend = emails.map((email) => email.email);
            const mailResponse = yield (0, functions_1.sendEmail)("Ush Engineering Team", "Task Assigned To You", mailToSend, "A task has been assigned to you. Do well to check it out.");
            socket.emit("mail-response", {
                status: mailResponse.status,
                message: (_b = (_a = mailResponse.message) === null || _a === void 0 ? void 0 : _a.response) === null || _b === void 0 ? void 0 : _b.slice(0, 13),
                to: (_d = (_c = mailResponse.message) === null || _c === void 0 ? void 0 : _c.envelope) === null || _d === void 0 ? void 0 : _d.to,
            });
            then((0, functions_1.returnSuccessSocket)());
        }
        catch (error) {
            console.log(error);
            then((0, functions_1.returnErrorSocket)({ message: "Something went wrong. Try again" }));
        }
    }));
    socket.on("update-person", ({ id, value }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mysqlApi_1.default.queryString("UPDATE people SET role = ? WHERE id = ?", [
                JSON.stringify(value),
                id,
            ]);
            (0, functions_1.broadcastToAll)(socket, yield mysqlApi_1.default.getAll("people"), "set-people");
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on("delete-others", ({ id }, then) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (id) {
                yield mysqlApi_1.default.queryString("DELETE FROM others WHERE id = ?", [id]);
                then((0, functions_1.returnSuccessSocket)());
                (0, functions_1.broadcastToAll)(socket, yield mysqlApi_1.default.getAll("others"), "set-others");
            }
        }
        catch (error) {
            console.log(error);
            then((0, functions_1.returnErrorSocket)({ message: error }));
        }
    }));
};
exports.default = handleSockets;

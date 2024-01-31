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
const handleSockets = (socket) => {
    (0, createTables_1.default)();
    const req = socket.request;
    socket.on("disconnect", (user) => {
        //   logToFile("disconnect");
    });
    socket.on("check-status", () => {
        socket.emit("status", {
            user_id: req.session.user_id,
            user: req.session.user,
            admin: req.session.isAdmin,
        });
    });
    socket.on("get-cashin", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield mysqlApi_1.default.getAll("cashin");
            socket.emit("set-cashin", { data });
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on("get-cashout", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield mysqlApi_1.default.getAll("cashout");
            socket.emit("set-cashout", { data });
        }
        catch (error) {
            // logToFile(error);
            console.log(error);
        }
    }));
    socket.on("get-people", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield mysqlApi_1.default.getAll("people");
            socket.emit("set-people", { data });
        }
        catch (error) {
            // logToFile(error);
            console.log(error);
        }
    }));
    socket.on("get-person", (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield mysqlApi_1.default.queryString("SELECT * FROM people WHERE user_id = ?", [id]);
            socket.emit("set-person", { data });
        }
        catch (error) {
            // logToFile(error);
        }
    }));
    // route to get individual tasks
    socket.on("get-task", (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield mysqlApi_1.default.queryString("SELECT * FROM tasks WHERE id = ?", [
                id,
            ]);
            socket.emit("set-task", { data });
        }
        catch (error) {
            // logToFile(error);
        }
    }));
    socket.on("get-tasks", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield mysqlApi_1.default.getAll("tasks");
            socket.emit("set-tasks", { data });
        }
        catch (error) {
            // logToFile(error);
            console.log(error);
        }
    }));
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
        var _a, _b;
        try {
            const totalCashin = yield mysqlApi_1.default.query(`SELECT SUM(amount) AS cashin, category FROM cashin GROUP BY category`);
            const totalCashout = yield mysqlApi_1.default.query("SELECT SUM(amount) AS cashout, category FROM cashout GROUP BY category");
            let revenue = yield mysqlApi_1.default.queryString("SELECT SUM(amount) AS totalRevenue FROM cashin WHERE category = ?", ["revenue"]);
            let debt = yield mysqlApi_1.default.queryString("SELECT SUM(amount) AS totalDebt FROM cashin WHERE category = ?", ["debt"]);
            let othersArr = yield mysqlApi_1.default.query("SELECT SUM(amount) AS amount, category FROM others GROUP BY category");
            let totalRevenue = (_a = revenue[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue;
            let totalDebt = (_b = debt[0]) === null || _b === void 0 ? void 0 : _b.totalDebt;
            socket.emit("set-summary", {
                cashin: totalCashin,
                cashout: totalCashout,
                totalRevenue,
                totalDebt,
                other: totalDebt / totalRevenue,
                others2: othersArr,
            });
        }
        catch (error) {
            // logToFile(error);
            console.log(error);
        }
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
    socket.on("add-person", ({ name, role, email }, then) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mysqlApi_1.default.insert("people", {
                name: name.trim().toLowerCase(),
                role: JSON.stringify(role),
                email: email.trim(),
                password: "123456",
                user_id: (0, functions_1.generateUserId)(),
            });
            then((0, functions_1.returnSuccessSocket)());
            (0, functions_1.broadcastToAll)(socket, yield mysqlApi_1.default.getAll("people"), "set-people");
        }
        catch (error) {
            then((0, functions_1.returnErrorSocket)());
            console.log(error);
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
        var _c, _d, _e, _f;
        try {
            yield mysqlApi_1.default.insert("tasks", {
                task: task.toLowerCase().trim(),
                assignTo: JSON.stringify(assignTo),
                priority,
                status,
                deadline: deadline[1],
                progress,
            });
            then((0, functions_1.returnSuccessSocket)());
            (0, functions_1.broadcastToAll)(socket, yield mysqlApi_1.default.getAll("tasks"), "set-tasks");
            const emails = yield mysqlApi_1.default.queryString(`SELECT email FROM people WHERE name IN (?)`, [assignTo]);
            const mailToSend = emails.map((email) => email.email);
            const mailResponse = yield (0, functions_1.sendEmail)("Ush Engineering Team", "Task Assigned To You", mailToSend, "testing");
            console.log(mailResponse);
            socket.emit("mail-response", {
                status: mailResponse,
                message: (_d = (_c = mailResponse.message) === null || _c === void 0 ? void 0 : _c.response) === null || _d === void 0 ? void 0 : _d.slice(0, 13),
                to: (_f = (_e = mailResponse.message) === null || _e === void 0 ? void 0 : _e.envelope) === null || _f === void 0 ? void 0 : _f.to,
            });
            console.log("done");
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
    socket.on("update-task", ({ id, task, assignTo, deadline, status, progress, priority }, then) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (id) {
                yield mysqlApi_1.default.queryString(`UPDATE tasks SET task = ?, assignTo = ?, deadline = ?, status = ?, progress = ?, priority = ? WHERE id = ?`, [
                    task,
                    JSON.stringify(assignTo),
                    deadline,
                    status,
                    progress,
                    priority,
                    id,
                ]);
                then((0, functions_1.returnSuccessSocket)());
                (0, functions_1.broadcastToAll)(socket, yield mysqlApi_1.default.getAll("tasks"), "set-tasks");
            }
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on("delete-person", ({ id }, then) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (id) {
                yield mysqlApi_1.default.queryString("DELETE FROM people WHERE id = ?", [id]);
                then((0, functions_1.returnSuccessSocket)());
                (0, functions_1.broadcastToAll)(socket, yield mysqlApi_1.default.getAll("people"), "set-people");
            }
        }
        catch (error) {
            console.log(error);
            then((0, functions_1.returnErrorSocket)({ message: error }));
        }
    }));
    socket.on("delete-task", ({ id }, then) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (id) {
                yield mysqlApi_1.default.queryString("DELETE FROM tasks WHERE id = ?", [id]);
                then((0, functions_1.returnSuccessSocket)());
                (0, functions_1.broadcastToAll)(socket, yield mysqlApi_1.default.getAll("tasks"), "set-tasks");
            }
        }
        catch (error) {
            console.log(error);
            then((0, functions_1.returnErrorSocket)({ message: error }));
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

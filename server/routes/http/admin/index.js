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
exports.router = void 0;
const express_1 = require("express");
const mysqlApi_1 = __importDefault(require("../../../utils/mysqlApi"));
const functions_1 = require("../../../utils/functions");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/cashin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield mysqlApi_1.default.getAll("cashin");
        res.json({ data });
    }
    catch (error) {
        (0, functions_1.returnJSONError)(res, { error }, 500);
    }
}));
router.get("/cashout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield mysqlApi_1.default.getAll("cashout");
        res.json({ data });
    }
    catch (error) {
        (0, functions_1.returnJSONError)(res, { error }, 500);
    }
}));
router.get("/all-people", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield mysqlApi_1.default.getAll("people");
        res.json({ data });
    }
    catch (error) {
        res.json(error);
    }
}));
router.get("/people", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _page, _limit } = req.query;
    // @ts-ignore
    const offset = (parseInt(_page) - 1) * parseInt(_limit);
    try {
        const [count, data] = yield mysqlApi_1.default.query(`SELECT COUNT(id) AS total FROM people;SELECT * FROM people LIMIT ${_limit} OFFSET ${offset}`);
        res.json({
            data,
            hasMore: 
            // @ts-ignore
            Math.ceil(count[0]["total"] / parseInt(_limit)) !== parseInt(_page),
        });
    }
    catch (error) {
        res.json(error);
    }
}));
router.get("/person", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const data = yield mysqlApi_1.default.queryString("SELECT * FROM people WHERE user_id = ?", [id]);
        res.json({ data });
    }
    catch (error) {
        console.log(error);
        (0, functions_1.returnJSONError)(res, {}, 5000);
        // logToFile(error);
    }
}));
router.get("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _page, _limit } = req.query;
    // @ts-ignore
    const offset = (parseInt(_page) - 1) * parseInt(_limit);
    try {
        const [count, countNotApproved, data] = yield mysqlApi_1.default.query(`SELECT COUNT(id) AS total FROM tasks;SELECT COUNT(id) AS totalNotApproved FROM tasks WHERE status = 2 AND adminApprove = 0;SELECT * FROM tasks LIMIT ${_limit} OFFSET ${offset}`);
        res.json({
            data,
            hasMore: 
            // @ts-ignore
            Math.ceil(count[0]["total"] / parseInt(_limit)) !== parseInt(_page),
            notApproved: countNotApproved[0]["totalNotApproved"],
        });
    }
    catch (error) {
        res.json(error);
    }
}));
router.get("/task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        if (id) {
            const data = yield mysqlApi_1.default.queryString("SELECT * FROM tasks WHERE id = ?", [
                id,
            ]);
            res.json({ data });
        }
    }
    catch (error) {
        console.log(error);
        (0, functions_1.returnJSONError)(res, {}, 500);
        // logToFile(error);
    }
}));
router.get("/not-approved", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield mysqlApi_1.default.query("SELECT * FROM tasks WHERE status = 2 AND adminApprove = 0");
        res.json({ data });
    }
    catch (error) {
        console.log(error);
        (0, functions_1.returnJSONError)(res, {}, 500);
        // logToFile(error);
    }
}));
router.get("/role", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield mysqlApi_1.default.query("SELECT role_category FROM settings WHERE id = 1");
    res.json({ data: data[0]["role_category"] });
}));
router.get("/summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const getTotalSqlTemplate = (table, alias = table) => `SELECT SUM(amount) AS ${alias}, category FROM ${table} GROUP BY category`;
        const getByCategory = (alias) => `SELECT SUM(amount) AS ${alias} FROM cashin WHERE category = ?`;
        const totalCashin = yield mysqlApi_1.default.query(getTotalSqlTemplate("cashin"));
        const totalCashout = yield mysqlApi_1.default.query(getTotalSqlTemplate("cashout"));
        let revenue = yield mysqlApi_1.default.queryString(getByCategory("totalRevenue"), [
            "revenue",
        ]);
        let debt = yield mysqlApi_1.default.queryString(getByCategory("totalDebt"), ["debt"]);
        let othersArr = yield mysqlApi_1.default.query(getTotalSqlTemplate("others", "amount"));
        let totalRevenue = (_a = revenue[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue;
        let totalDebt = (_b = debt[0]) === null || _b === void 0 ? void 0 : _b.totalDebt;
        res.json({
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
        (0, functions_1.returnJSONError)(res, { error }, 500);
    }
}));
router.post("/create-person", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, role, email } = req.body;
    try {
        yield mysqlApi_1.default.insert("people", {
            name: name.trim().toLowerCase(),
            role: JSON.stringify(role),
            email: email.trim(),
            password: "123456",
            user_id: (0, functions_1.generateUserId)(),
        });
        (0, functions_1.returnJSONSuccess)(res);
        // broadcastToAll(socket, await db.getAll("people"), "set-people");
    }
    catch (error) {
        (0, functions_1.returnJSONError)(res, { error });
        console.log(error);
    }
}));
router.put("/person", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, value } = req.body;
        yield mysqlApi_1.default.queryString("UPDATE people SET role = ? WHERE id = ?", [
            JSON.stringify(value),
            id,
        ]);
        (0, functions_1.returnJSONSuccess)(res);
    }
    catch (error) {
        console.log(error);
        (0, functions_1.returnJSONError)(res, {}, 500);
    }
}));
router.delete("/person", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        if (id) {
            yield mysqlApi_1.default.queryString("DELETE FROM people WHERE id = ?", [id]);
            (0, functions_1.returnJSONSuccess)(res);
        }
    }
    catch (error) {
        console.log(error);
        (0, functions_1.returnJSONError)(res, { error: error });
    }
}));
router.delete("/task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        if (id) {
            yield mysqlApi_1.default.queryString("DELETE FROM tasks WHERE id = ?", [id]);
            (0, functions_1.returnJSONSuccess)(res);
        }
    }
    catch (error) {
        console.log(error);
        (0, functions_1.returnJSONError)(res, { message: error }, 5000);
    }
}));
router.post("/add-role", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.body;
        const roles = yield mysqlApi_1.default.query("SELECT role_category FROM settings");
        let newRoles;
        if (roles.length > 0) {
            newRoles = JSON.parse(roles[0]["role_category"]);
            newRoles = [...newRoles, role];
        }
        else {
            newRoles = [role];
        }
        yield mysqlApi_1.default.queryString(`INSERT INTO settings (id, role_category) VALUES(1, '${JSON.stringify(newRoles)}') ON DUPLICATE KEY UPDATE role_category = ?`, [JSON.stringify(newRoles)]);
        (0, functions_1.returnJSONSuccess)(res);
    }
    catch (error) {
        console.log(error);
    }
}));
router.put("/task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task, assignTo, deadline, status, progress, priority, id } = req.body;
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
            (0, functions_1.returnJSONSuccess)(res);
        }
    }
    catch (error) {
        (0, functions_1.returnJSONError)(res, {}, 500);
    }
}));

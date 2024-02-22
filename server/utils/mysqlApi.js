"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const db_1 = __importDefault(require("../configs/db"));
const functions_1 = require("./functions");
class dbQueries {
    constructor(connection) {
        this.createTable = (table, ...params) => {
            return new Promise((resolve, reject) => {
                let query_string = ``;
                let columnNames = [];
                let dataType = [];
                let condition = [];
                let dataTypeLength = [];
                let qry = "";
                params.forEach((param) => {
                    columnNames.push(param.columnName);
                    dataType.push(param.dataType);
                    (param === null || param === void 0 ? void 0 : param.dataTypeLength) !== undefined
                        ? dataTypeLength.push("(" + (param === null || param === void 0 ? void 0 : param.dataTypeLength) + ")")
                        : dataTypeLength.push(null);
                    condition.push((param === null || param === void 0 ? void 0 : param.condition) || null);
                });
                // console.log({condition, dataType, dataTypeLength});
                for (let i = 0; i < columnNames.length; i++) {
                    qry += `${columnNames[i]} ${dataType[i].toUpperCase()}${dataTypeLength[i] || ""} ${condition[i] || ""} ${i === columnNames.length - 1 ? "" : ","} `;
                }
                // this.connection.query(`SELECT * FROM ${table}`, (err, data ))
                query_string = `CREATE TABLE IF NOT EXISTS ${table} (id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, ${qry}, last_modified TIMESTAMP NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
                this.connection.query(query_string, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            });
        };
        this.query = (query) => {
            return new Promise((resolve, reject) => {
                this.connection.query(query, (err, data) => {
                    err ? reject(err) : resolve(data);
                });
            });
        };
        this.queryString = (query, options = []) => {
            return new Promise((resolve, reject) => {
                this.connection.query(query, options, (err, data) => {
                    err ? reject(err.sqlMessage) : resolve(data);
                });
            });
        };
        this.getAll = (table) => {
            return new Promise((resolve, reject) => {
                let sql = "SELECT * FROM " + table;
                this.connection.query(sql, (err, data) => {
                    err ? reject(err.sqlMessage) : resolve(data);
                });
            });
        };
        this.getById = (id, table) => {
            if (typeof id !== "number" && typeof table !== "string") {
                return new Promise((resolve, reject) => reject(new SyntaxError("Id be of type 'number' and table name must be type 'string'")));
            }
            return new Promise((resolve, reject) => {
                let sql = "SELECT * FROM " + table + " WHERE id = ?";
                this.connection.query(sql, [id], (err, data) => {
                    err ? reject(err.sqlMessage) : resolve(data);
                });
            });
        };
        // getByColumnName = (columnName, value, table) => {
        //   if (typeof columnName && typeof value && typeof table !== "string") {
        //     return new Promise((resolve, reject) =>
        //       reject(new SyntaxError("Must be of type 'string'"))
        //     );
        //   }
        //   return new Promise((resolve, reject) => {
        //     let sql = `SELECT * FROM ${table} WHERE ${columnName} = ?`;
        //     this.connection.query(sql, [value], (err, data) => {
        //       err ? reject(err.sqlMessage) : resolve(data);
        //     });
        //   });
        // };
        // updateByColumnName = (columnName, value, table) => {
        //   if (typeof columnName && typeof value && typeof table !== "string") {
        //     return new Promise((resolve, reject) =>
        //       reject(new SyntaxError("Must be of type 'string'"))
        //     );
        //   }
        //   return new Promise((resolve, reject) => {
        //     let sql = `UPDATE ${table} SET ${columnName} = ?`;
        //     this.connection.query(sql, [value], (err, data) => {
        //       err ? reject(err.sqlMessage) : resolve(data);
        //     });
        //   });
        // };
        this.delete = (table, id) => {
            if (typeof id !== "number" && typeof table !== "string") {
                return new Promise((resolve, reject) => reject(new SyntaxError("Must be of type 'string'")));
            }
            return new Promise((resolve, reject) => {
                let sql = `DELETE FROM ${table} WHERE id = ?`;
                this.connection.query(sql, [id], (err, data) => {
                    err ? reject(err.sqlMessage) : resolve(data);
                });
            });
        };
        this.insert = (table, values) => {
            if (typeof table !== "string" && typeof values !== "object") {
                return new Promise((_resolve, reject) => reject(new SyntaxError("Must be of type 'string'")));
            }
            return new Promise((resolve, reject) => {
                let keyArray = [];
                let valueArray = [];
                let sqlInject = [];
                for (let key in values) {
                    keyArray.push(key);
                    valueArray.push(`${mysql_1.default.escape(values[key])}`);
                    sqlInject.push("?");
                }
                let sql = `INSERT INTO ${table} (${keyArray.join(", ")}) VALUES(${valueArray.join(", ")})`;
                this.connection.query(sql, (err, data) => {
                    err ? reject(err) : resolve(data);
                });
            });
        };
        this.getDataForMail = () => {
            const currentDate = new Date();
            const inTwoWeeks = new Date(currentDate);
            const inOneWeeks = new Date(currentDate);
            const inTwoDays = new Date(currentDate);
            const inOneDay = new Date(currentDate);
            inTwoWeeks.setDate(currentDate.getDate() + 15);
            inOneWeeks.setDate(currentDate.getDate() + 8);
            inTwoDays.setDate(currentDate.getDate() + 3);
            inOneDay.setDate(currentDate.getDate() + 1);
            return new Promise((resolve, reject) => {
                const sql = `SELECT id, task, assignTo, deadline FROM tasks WHERE WEEK(DATE(deadline)) = WEEK(DATE('${(0, functions_1.convertToString)(inTwoWeeks)}')) AND (sentMail = '' OR sentMail = 0) AND status != 2;SELECT id, task, assignTo, deadline FROM tasks WHERE WEEK(DATE(deadline)) = WEEK(DATE('${(0, functions_1.convertToString)(inOneWeeks)}')) AND (sentMail = '' OR sentMail = 0 OR sentMail = 1) AND status != 2;SELECT id, task, assignTo, deadline FROM tasks WHERE DATE(deadline) BETWEEN DATE('${(0, functions_1.convertToString)(inOneDay)}') AND DATE('${(0, functions_1.convertToString)(inTwoDays)}') AND (sentMail = '' OR sentMail = 0 OR sentMail = 2) AND status != 2`;
                this.connection.query(sql, (err, data) => {
                    err ? reject(err) : resolve(data);
                });
            });
        };
        this.changeMailStatus = (id, status) => {
            if (typeof id !== "number" && typeof status !== "string") {
                return new Promise((resolve, reject) => reject(new SyntaxError("Must be of type 'string'")));
            }
            return new Promise((resolve, reject) => {
                let sql = `UPDATE tasks SET sentMail = ? WHERE id = ?`;
                this.connection.query(sql, [status, id], (err, data) => {
                    err ? reject(err.sqlMessage) : resolve(data);
                });
            });
        };
        this.connection = connection;
    }
    get returnConnection() {
        return this.connection;
    }
}
const db = new dbQueries(db_1.default);
exports.default = db;

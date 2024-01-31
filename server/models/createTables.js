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
const mysqlApi_1 = __importDefault(require("../utils/mysqlApi"));
const createTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mysqlApi_1.default.createTable("cashin", {
            columnName: "amount",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "100",
        }, {
            columnName: "category",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "255",
        }, {
            columnName: "description",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "255",
        });
        yield mysqlApi_1.default.createTable("cashout", {
            columnName: "amount",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "100",
        }, {
            columnName: "category",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "255",
        }, {
            columnName: "description",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "255",
        });
        yield mysqlApi_1.default.createTable("people", {
            columnName: "user_id",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "20",
        }, {
            columnName: "name",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "100",
        }, {
            columnName: "role",
            dataType: "JSON",
            condition: "CHECK (JSON_VALID(role))",
        }, {
            columnName: "email",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "255",
        }, {
            columnName: "password",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "255",
        }, {
            columnName: "admin",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "255",
        });
        yield mysqlApi_1.default.createTable("tasks", {
            columnName: "task",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "150",
        }, {
            columnName: "assignTo",
            dataType: "JSON",
            condition: "CHECK (JSON_VALID(assignTo))",
        }, {
            columnName: "deadline",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "60",
        }, {
            columnName: "status",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "50",
        }, {
            columnName: "progress",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "50",
        }, {
            columnName: "priority",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "50",
        });
        yield mysqlApi_1.default.createTable("others", {
            columnName: "amount",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "100",
        }, {
            columnName: "category",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "255",
        }, {
            columnName: "description",
            dataType: "varchar",
            condition: "NOT NULL",
            dataTypeLength: "255",
        });
        yield mysqlApi_1.default.createTable("settings", {
            columnName: "others_category",
            dataType: "JSON",
            condition: "CHECK (JSON_VALID(others_category))",
        }, {
            columnName: "role_category",
            dataType: "JSON",
            condition: "CHECK (JSON_VALID(role_category))",
        }, {
            columnName: "cashin_category",
            dataType: "JSON",
            condition: "CHECK (JSON_VALID(cashin_category))",
        }, {
            columnName: "cashout_category",
            dataType: "JSON",
            condition: "CHECK (JSON_VALID(cashout_category))",
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = createTable;

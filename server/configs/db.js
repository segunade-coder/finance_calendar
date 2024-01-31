"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
const db_cred = {
    host: process.env.M_HOST,
    user: process.env.M_USERNAME,
    password: process.env.M_PASSWORD || "",
    database: process.env.M_DATABASE,
    port: parseInt(process.env.MYSQL_PORT),
};
// create a database connection with the credentials above
const connection = mysql_1.default.createConnection(db_cred);
//connect to the apache server
connection.connect((err) => {
    if (err) {
        console.log("App started. Error connecting to database", err);
        throw err;
    }
});
// export the connection
exports.default = connection;

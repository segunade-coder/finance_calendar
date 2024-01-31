import { CorsOptions } from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import session from "express-session";
const MysqlStore = require("express-mysql-session")(session);
export const corsConfig: CorsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

const storeOptions = {
  host: process.env.M_HOST as string,
  user: process.env.M_USERNAME as string,
  password: (process.env.M_PASSWORD as string) || "",
  database: process.env.M_DATABASE as string,
  port: parseInt(process.env.MYSQL_PORT as string),
  clearExpired: true,
  checkExpirationInterval: 50000,
  expiration: 1000 * 60 * 60 * 24,
  createDatabaseTable: true,
  connectionLimit: 1,
  endconnectionOnClose: true,
  charset: "utf8mb4_bin",
  schema: {
    tableName: "sessions",
    columnNames: {
      session_id: "session_id",
      expires: "expires",
      data: "data",
    },
  },
};

const sessionStore = new MysqlStore(storeOptions);

export const sessionMiddleware = session({
  secret: "something worth hiding48798",
  saveUninitialized: false,
  resave: false,
  store: sessionStore,
  name: "ushengineering",
  cookie: {
    secure: process.env.NODE_ENV === "production" ? true : "auto",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  },
});

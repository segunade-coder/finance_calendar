import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { corsConfig, sessionMiddleware } from "./configs/configOptions";
import path from "path";
import { Server } from "socket.io";
import router from "./routes/http";
import * as schedule from "node-schedule";
const app = express();
const server = http.createServer(app);

import handleSockets from "./routes/sockets";
import db from "./utils/mysqlApi";
import { SendMail, tasks } from "./types";
import {
  formatTimeAgo,
  sendEmail,
  sendExpirationEmails,
  transformData,
} from "./utils/functions";
import { logToFile } from "./logToFile";
const PORT = process.env.PORT || 3000;
const io: Server = new Server(server, {
  cors: corsConfig,
});
app.set("trust proxy", 1);
app.use(express.static(path.resolve(__dirname, "./dist")));
app.use(cors(corsConfig));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(sessionMiddleware);
app.use(router);
io.use((socket, next) =>
  sessionMiddleware(
    socket.request as Request,
    {} as Response,
    next as NextFunction
  )
);
io.use((socket, next) => {
  const request = socket.request as Request;
  if (
    request.session.user === "" ||
    request.session.user === null ||
    request.session.user === undefined
  ) {
    next(new Error("Not authorized"));
    console.log("Not Authenticated");
  } else {
    next();
  }
});

io.on("connection", handleSockets);
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./dist", "index.html"));
// });

// const job = schedule.scheduleJob("*/5 * * * * *", async () => {

// });

sendExpirationEmails();
server.listen(PORT, () => {
  console.log(`Live on ${PORT}`);
});

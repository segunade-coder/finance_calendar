"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const configOptions_1 = require("./configs/configOptions");
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const http_2 = __importDefault(require("./routes/http"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const sockets_1 = __importDefault(require("./routes/sockets"));
const functions_1 = require("./utils/functions");
const PORT = process.env.PORT || 3000;
const io = new socket_io_1.Server(server, {
    cors: configOptions_1.corsConfig,
});
app.set("trust proxy", 1);
app.use(express_1.default.static(path_1.default.resolve(__dirname, "./dist")));
app.use((0, cors_1.default)(configOptions_1.corsConfig));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(configOptions_1.sessionMiddleware);
app.use(http_2.default);
io.use((socket, next) => (0, configOptions_1.sessionMiddleware)(socket.request, {}, next));
io.use((socket, next) => {
    const request = socket.request;
    if (request.session.user === "" ||
        request.session.user === null ||
        request.session.user === undefined) {
        next(new Error("Not authorized"));
        console.log("Not Authenticated");
    }
    else {
        next();
    }
});
io.on("connection", sockets_1.default);
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./dist", "index.html"));
// });
// const job = schedule.scheduleJob("*/5 * * * * *", async () => {
// });
(0, functions_1.sendExpirationEmails)();
server.listen(PORT, () => {
    console.log(`Live on ${PORT}`);
});

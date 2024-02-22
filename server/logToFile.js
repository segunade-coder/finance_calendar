"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logToFile = void 0;
const fs = require("fs");
const os = require("os");
const path = require("path");
let formatter = Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "long",
});
const logToFile = (text) => {
    fs.open(path.resolve(__dirname, "log.txt"), "a", 666, function (_, id) {
        fs.write(id, text + " " + ", on " + formatter.format(new Date(Date.now())) + os.EOL, null, "utf-8", function () {
            fs.close(id, function () {
                // console.log("file updated");
            });
        });
    });
};
exports.logToFile = logToFile;

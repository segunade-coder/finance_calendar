const fs = require("fs");
const os = require("os");
const path = require("path");
let formatter = Intl.DateTimeFormat(undefined, {
  dateStyle: "full",
  timeStyle: "long",
});
module.exports = function processInput(text, user = "user") {
  fs.open(path.resolve(__dirname, "log.txt"), "a", 666, function (e, id) {
    fs.write(
      id,
      text +
        " " +
        " by " +
        user +
        ", on " +
        formatter.format(new Date(Date.now())) +
        os.EOL,
      null,
      "utf-8",
      function () {
        fs.close(id, function () {
          // console.log("file updated");
        });
      }
    );
  });
};

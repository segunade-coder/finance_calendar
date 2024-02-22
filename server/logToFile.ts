const fs = require("fs");
const os = require("os");
const path = require("path");
let formatter = Intl.DateTimeFormat(undefined, {
  dateStyle: "full",
  timeStyle: "long",
});
export const logToFile = (text: string) => {
  fs.open(
    path.resolve(__dirname, "log.txt"),
    "a",
    666,
    function (_: any, id: any) {
      fs.write(
        id,
        text + " " + ", on " + formatter.format(new Date(Date.now())) + os.EOL,
        null,
        "utf-8",
        function () {
          fs.close(id, function () {
            // console.log("file updated");
          });
        }
      );
    }
  );
};

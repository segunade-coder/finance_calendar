const mysql = require("mysql");
const logToFile = require("./logToFile");

const connection = mysql.createConnection({
  host: "ushengineering.com",
  user: "ushengin_segun",
  password: "*M9fcF*X_Js#",
  database: "ushengin_dashboard",
});

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "event_calendar",
// });

connection.connect((err) => {
  if (err) {
    logToFile("App started. Error connecting to database", err);
    logToFile(
      "Error connecting to apache database",
      __filename,
      new Error().stack.match(/(:[\d]+)/)[0].replace(":", "")
    );
  } else {
    logToFile("connected to apache database...");
    console.log("connected to apache database...");
  }
});

// export the connection
module.exports = connection;

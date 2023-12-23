const connection = require("./db");
const dbQueries = require("./mysqlApi");
const logToFile = require("./logToFile.js");
const db = new dbQueries(connection);

const createTable = async () => {
  try {
    db.query(`SHOW TABLES LIKE "settings"`)
      .then((data) => {
        if (data.length === 0) {
          db.createTable(
            "cashin",
            { columnName: "amount", dataType: "varchar" },
            { columnName: "category", dataType: "varchar" },
            { columnName: "description", dataType: "varchar" }
          )
            .then()
            .catch((err) => err?.sqlMessage);

          db.createTable(
            "cashout",
            { columnName: "amount", dataType: "varchar" },
            { columnName: "category", dataType: "varchar" },
            { columnName: "description", dataType: "varchar" }
          )
            .then()
            .catch((err) => logToFile(err?.sqlMessage));

          db.createTable(
            "people",
            { columnName: "name", dataType: "varchar" },
            { columnName: "role", dataType: "varchar" }
          )
            .then()
            .catch((err) => logToFile(err?.sqlMessage));
          db.createTable(
            "tasks",
            { columnName: "task", dataType: "varchar" },
            { columnName: "assignTo", dataType: "varchar" },
            { columnName: "deadline", dataType: "varchar" },
            { columnName: "status", dataType: "varchar" },
            { columnName: "progress", dataType: "varchar" },
            { columnName: "priority", dataType: "varchar" }
          )
            .then()
            .catch((err) => logToFile(err?.sqlMessage));
          db.createTable(
            "others",
            { columnName: "amount", dataType: "varchar" },
            { columnName: "description", dataType: "varchar" },
            { columnName: "category", dataType: "varchar" }
          )
            .then()
            .catch((err) => logToFile(err?.sqlMessage));
          db.createTable(
            "settings",
            { columnName: "others_category", dataType: "varchar" },
            { columnName: "role_category", dataType: "varchar" },
            { columnName: "cashin_category", dataType: "varchar" },
            { columnName: "cashout_category", dataType: "varchar" }
          )
            .then()
            .catch((err) => logToFile(err?.sqlMessage));
        }
      })
      .catch((err) => {
        logToFile(err);
      });
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createTable,
};

import mysql, { Connection } from "mysql";
import { cash, settings, people, tasks } from "../types";
import connection from "../configs/db";
import { convertToString, formatTimeAgo } from "./functions";
type TableType = string;
class dbQueries {
  connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }
  createTable = (
    table: TableType,
    ...params:
      | [
          {
            columnName: string;
            dataType: string;
            condition?: string;
            dataTypeLength?: string;
          }
        ]
      | any[]
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      let query_string: string = ``;
      let columnNames: string[] = [];
      let dataType: string[] = [];
      let condition: string[] | any = [];
      let dataTypeLength: any[] = [];
      let qry = "";
      params.forEach((param) => {
        columnNames.push(param.columnName);
        dataType.push(param.dataType);
        param?.dataTypeLength !== undefined
          ? dataTypeLength.push("(" + param?.dataTypeLength + ")")
          : dataTypeLength.push(null);

        condition.push(param?.condition || null);
      });
      // console.log({condition, dataType, dataTypeLength});
      for (let i = 0; i < columnNames.length; i++) {
        qry += `${columnNames[i]} ${dataType[i].toUpperCase()}${
          dataTypeLength[i] || ""
        } ${condition[i] || ""} ${i === columnNames.length - 1 ? "" : ","} `;
      }
      // this.connection.query(`SELECT * FROM ${table}`, (err, data ))
      query_string = `CREATE TABLE IF NOT EXISTS ${table} (id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, ${qry}, last_modified TIMESTAMP NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
      this.connection.query(query_string, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  };
  query = (query: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
  };
  queryString = (query: string, options: any[] = []): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      this.connection.query(query, options, (err, data) => {
        err ? reject(err.sqlMessage) : resolve(data);
      });
    });
  };
  get returnConnection() {
    return this.connection;
  }
  getAll = (
    table: string
  ): Promise<Array<cash | people | tasks | settings>> => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM " + table;
      this.connection.query(sql, (err, data) => {
        err ? reject(err.sqlMessage) : resolve(data);
      });
    });
  };
  getById = (id: string, table: string) => {
    if (typeof id !== "number" && typeof table !== "string") {
      return new Promise((resolve, reject) =>
        reject(
          new SyntaxError(
            "Id be of type 'number' and table name must be type 'string'"
          )
        )
      );
    }
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM " + table + " WHERE id = ?";
      this.connection.query(sql, [id], (err, data) => {
        err ? reject(err.sqlMessage) : resolve(data);
      });
    });
  };
  // getByColumnName = (columnName, value, table) => {
  //   if (typeof columnName && typeof value && typeof table !== "string") {
  //     return new Promise((resolve, reject) =>
  //       reject(new SyntaxError("Must be of type 'string'"))
  //     );
  //   }
  //   return new Promise((resolve, reject) => {
  //     let sql = `SELECT * FROM ${table} WHERE ${columnName} = ?`;
  //     this.connection.query(sql, [value], (err, data) => {
  //       err ? reject(err.sqlMessage) : resolve(data);
  //     });
  //   });
  // };
  // updateByColumnName = (columnName, value, table) => {
  //   if (typeof columnName && typeof value && typeof table !== "string") {
  //     return new Promise((resolve, reject) =>
  //       reject(new SyntaxError("Must be of type 'string'"))
  //     );
  //   }
  //   return new Promise((resolve, reject) => {
  //     let sql = `UPDATE ${table} SET ${columnName} = ?`;
  //     this.connection.query(sql, [value], (err, data) => {
  //       err ? reject(err.sqlMessage) : resolve(data);
  //     });
  //   });
  // };
  delete = (table: string, id: string) => {
    if (typeof id !== "number" && typeof table !== "string") {
      return new Promise((resolve, reject) =>
        reject(new SyntaxError("Must be of type 'string'"))
      );
    }
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM ${table} WHERE id = ?`;
      this.connection.query(sql, [id], (err, data) => {
        err ? reject(err.sqlMessage) : resolve(data);
      });
    });
  };
  insert = (table: string, values: any) => {
    if (typeof table !== "string" && typeof values !== "object") {
      return new Promise((_resolve, reject) =>
        reject(new SyntaxError("Must be of type 'string'"))
      );
    }
    return new Promise((resolve, reject) => {
      let keyArray = [];
      let valueArray = [];
      let sqlInject = [];
      for (let key in values) {
        keyArray.push(key);
        valueArray.push(`${mysql.escape(values[key as keyof typeof values])}`);
        sqlInject.push("?");
      }
      let sql = `INSERT INTO ${table} (${keyArray.join(
        ", "
      )}) VALUES(${valueArray.join(", ")})`;
      this.connection.query(sql, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
  };
  getDataForMail = (): Promise<Array<tasks[] | []>> => {
    const currentDate = new Date();
    const inTwoWeeks = new Date(currentDate);
    const inOneWeeks = new Date(currentDate);
    const inTwoDays = new Date(currentDate);
    const inOneDay = new Date(currentDate);
    inTwoWeeks.setDate(currentDate.getDate() + 15);
    inOneWeeks.setDate(currentDate.getDate() + 8);
    inTwoDays.setDate(currentDate.getDate() + 3);
    inOneDay.setDate(currentDate.getDate() + 1);
    return new Promise((resolve, reject) => {
      const sql: string = `SELECT id, task, assignTo, deadline FROM tasks WHERE WEEK(DATE(deadline)) = WEEK(DATE('${convertToString(
        inTwoWeeks
      )}')) AND (sentMail = '' OR sentMail = 0) AND status != 2;SELECT id, task, assignTo, deadline FROM tasks WHERE WEEK(DATE(deadline)) = WEEK(DATE('${convertToString(
        inOneWeeks
      )}')) AND (sentMail = '' OR sentMail = 0 OR sentMail = 1) AND status != 2;SELECT id, task, assignTo, deadline FROM tasks WHERE DATE(deadline) BETWEEN DATE('${convertToString(
        inOneDay
      )}') AND DATE('${convertToString(
        inTwoDays
      )}') AND (sentMail = '' OR sentMail = 0 OR sentMail = 2) AND status != 2`;
      this.connection.query(sql, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
  };
  changeMailStatus = (id: number, status: number) => {
    if (typeof id !== "number" && typeof status !== "string") {
      return new Promise((resolve, reject) =>
        reject(new SyntaxError("Must be of type 'string'"))
      );
    }
    return new Promise((resolve, reject) => {
      let sql = `UPDATE tasks SET sentMail = ? WHERE id = ?`;
      this.connection.query(sql, [status, id], (err, data) => {
        err ? reject(err.sqlMessage) : resolve(data);
      });
    });
  };
}
const db = new dbQueries(connection);
export default db;

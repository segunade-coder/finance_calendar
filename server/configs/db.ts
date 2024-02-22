import mysql, { ConnectionConfig } from "mysql";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { Database } from "../types";

const db_cred: ConnectionConfig = {
  host: process.env.M_HOST as string,
  user: process.env.M_USERNAME as string,
  password: (process.env.M_PASSWORD as string) || "",
  database: process.env.M_DATABASE as string,
  port: parseInt(process.env.MYSQL_PORT as string),
  multipleStatements: true,
};

// create a database connection with the credentials above
const connection = mysql.createConnection(db_cred);

//connect to the apache server
connection.connect((err) => {
  if (err) {
    console.log("App started. Error connecting to database", err);
    throw err;
  }
});
// export the connection
export default connection;

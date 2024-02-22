import { Request, Response, Router } from "express";
import {
  checkIfEmpty,
  returnJSONError,
  returnJSONSuccess,
} from "../../../utils/functions";
import db from "../../../utils/mysqlApi";
import createTable from "../../../models/createTables";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  createTable();
  const { email, password } = req.body;
  const isEmpty = checkIfEmpty([{ email }, { password }]);
  if (isEmpty.length > 0) {
    return returnJSONError(res, { data: isEmpty[0] }, 200);
  }
  try {
    const data = await db.queryString(
      `SELECT user_id, admin, email FROM people WHERE email = ? AND password = ?`,
      [email, password]
    );
    if (data.length > 0) {
      req.session.user = data[0]?.email;
      req.session.user_email = data[0]?.email;
      req.session.isAdmin = data[0]?.admin === "true" ? true : false;
      return returnJSONSuccess(res, {
        admin: data[0]?.admin === "true" ? true : false,
      });
    } else {
      returnJSONError(res, { message: "Invalid credentials provided" });
    }
  } catch (error) {
    console.log(error);
  }
});

export { router };

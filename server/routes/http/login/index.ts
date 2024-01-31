import { Request, Response, Router } from "express";
import {
  checkIfEmpty,
  returnJSONError,
  returnJSONSuccess,
} from "../../../utils/functions";
import db from "../../../utils/mysqlApi";

const routes = Router();

routes.post("/", async (req: Request, res: Response) => {
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
      req.session.user_id = data[0]?.user_id;
      req.session.user = data[0]?.email;
      req.session.isAdmin = data[0]?.admin;
      return returnJSONSuccess(res, { admin: data[0]?.admin });
    } else {
      returnJSONError(res, { message: "Invalid credentials provided" });
    }
  } catch (error) {
    console.log(error);
  }
});

export { routes };

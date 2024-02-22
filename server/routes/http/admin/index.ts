import { Request, Response, Router } from "express";
import db from "../../../utils/mysqlApi";
import {
  generateUserId,
  returnJSONError,
  returnJSONSuccess,
} from "../../../utils/functions";

const router = Router();

router.get("/cashin", async (req: Request, res: Response) => {
  try {
    const data = await db.getAll("cashin");
    res.json({ data });
  } catch (error) {
    returnJSONError(res, { error }, 500);
  }
});
router.get("/cashout", async (req: Request, res: Response) => {
  try {
    const data = await db.getAll("cashout");
    res.json({ data });
  } catch (error) {
    returnJSONError(res, { error }, 500);
  }
});
router.get("/people", async (req: Request, res: Response) => {
  try {
    const data = await db.getAll("people");
    res.json({ data });
  } catch (error) {
    res.json(error);
  }
});
router.get("/person", async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const data = await db.queryString(
      "SELECT * FROM people WHERE user_id = ?",
      [id]
    );
    res.json({ data });
  } catch (error) {
    console.log(error);
    returnJSONError(res, {}, 5000);
    // logToFile(error);
  }
});
router.get("/tasks", async (req: Request, res: Response) => {
  try {
    const data = await db.getAll("tasks");
    res.json({ data });
  } catch (error) {
    res.json(error);
  }
});
router.get("/task", async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    if (id) {
      const data = await db.queryString("SELECT * FROM tasks WHERE id = ?", [
        id,
      ]);
      res.json({ data });
    }
  } catch (error) {
    console.log(error);
    returnJSONError(res, {}, 500);
    // logToFile(error);
  }
});
router.get("/role", async (req: Request, res: Response) => {
  const data = await db.query(
    "SELECT role_category FROM settings WHERE id = 1"
  );
  res.json({ data: data[0]["role_category" as keyof typeof data] });
});
router.get("/summary", async (req: Request, res: Response) => {
  try {
    const getTotalSqlTemplate = (table: string, alias = table) =>
      `SELECT SUM(amount) AS ${alias}, category FROM ${table} GROUP BY category`;
    const getByCategory = (alias: string) =>
      `SELECT SUM(amount) AS ${alias} FROM cashin WHERE category = ?`;
    const totalCashin = await db.query(getTotalSqlTemplate("cashin"));
    const totalCashout = await db.query(getTotalSqlTemplate("cashout"));
    let revenue = await db.queryString(getByCategory("totalRevenue"), [
      "revenue",
    ]);
    let debt = await db.queryString(getByCategory("totalDebt"), ["debt"]);
    let othersArr = await db.query(getTotalSqlTemplate("others", "amount"));
    let totalRevenue = revenue[0]?.totalRevenue;
    let totalDebt = debt[0]?.totalDebt;
    res.json({
      cashin: totalCashin,
      cashout: totalCashout,
      totalRevenue,
      totalDebt,
      other: totalDebt / totalRevenue,
      others2: othersArr,
    });
  } catch (error) {
    // logToFile(error);
    console.log(error);
    returnJSONError(res, { error }, 500);
  }
});
router.post("/create-person", async (req: Request, res: Response) => {
  const { name, role, email } = req.body;
  try {
    await db.insert("people", {
      name: name.trim().toLowerCase(),
      role: JSON.stringify(role),
      email: email.trim(),
      password: "123456",
      user_id: generateUserId(),
    });
    returnJSONSuccess(res);
    // broadcastToAll(socket, await db.getAll("people"), "set-people");
  } catch (error) {
    returnJSONError(res, { error });
    console.log(error);
  }
});
router.delete("/person", async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    if (id) {
      await db.queryString("DELETE FROM people WHERE id = ?", [id]);
      returnJSONSuccess(res);
    }
  } catch (error) {
    console.log(error);
    returnJSONError(res, { error: error });
  }
});
router.delete("/task", async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    if (id) {
      await db.queryString("DELETE FROM tasks WHERE id = ?", [id]);
      returnJSONSuccess(res);
    }
  } catch (error) {
    console.log(error);
    returnJSONError(res, { message: error }, 5000);
  }
});
router.post("/add-role", async (req: Request, res: Response) => {
  try {
    const { role } = req.body;
    const roles = await db.query("SELECT role_category FROM settings");
    let newRoles;
    if (roles.length > 0) {
      newRoles = JSON.parse(roles[0]["role_category" as keyof typeof roles]);
      newRoles = [...newRoles, role];
    } else {
      newRoles = [role];
    }
    await db.queryString(
      `INSERT INTO settings (id, role_category) VALUES(1, '${JSON.stringify(
        newRoles
      )}') ON DUPLICATE KEY UPDATE role_category = ?`,
      [JSON.stringify(newRoles)]
    );
    returnJSONSuccess(res);
  } catch (error) {
    console.log(error);
  }
});
export { router };

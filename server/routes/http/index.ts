import { Request, Response, Router } from "express";
import { router as loginRoute } from "./login";
import { router as adminRoute } from "./admin";
import { returnJSONError, returnJSONSuccess } from "../../utils/functions";

const router = Router();

router.use("/login", loginRoute);
router.use("/admin", adminRoute);
router.delete("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return returnJSONError(res, { message: "Something went wrong" }, 500);
    }
    return returnJSONSuccess(res);
  });
});
router.get("/account", (req, res) => {
  console.log(req.session);
  if (req.session?.user && req.session?.user_email) {
    return res.json({
      user: req.session.user,
      user_email: req.session.user_email,
      admin: req.session.isAdmin,
      loggedIn: true,
    });
  } else {
    return res.json({
      loggedIn: null,
      admin: null,
    });
  }
});
export default router;

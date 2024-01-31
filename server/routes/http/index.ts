import { Router } from "express";
import { routes as loginRoute } from "./login";

const router = Router();

router.use("/login", loginRoute);
export default router;

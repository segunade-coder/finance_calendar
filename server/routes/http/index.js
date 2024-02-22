"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = require("./login");
const admin_1 = require("./admin");
const functions_1 = require("../../utils/functions");
const router = (0, express_1.Router)();
router.use("/login", login_1.router);
router.use("/admin", admin_1.router);
router.delete("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return (0, functions_1.returnJSONError)(res, { message: "Something went wrong" }, 500);
        }
        return (0, functions_1.returnJSONSuccess)(res);
    });
});
router.get("/account", (req, res) => {
    var _a, _b;
    console.log(req.session);
    if (((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) && ((_b = req.session) === null || _b === void 0 ? void 0 : _b.user_email)) {
        return res.json({
            user: req.session.user,
            user_email: req.session.user_email,
            admin: req.session.isAdmin,
            loggedIn: true,
        });
    }
    else {
        return res.json({
            loggedIn: null,
            admin: null,
        });
    }
});
exports.default = router;

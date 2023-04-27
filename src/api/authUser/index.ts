import express from "express";
import authenticateToken from "../middleware/authenticateToken";
const router = express.Router();

const { userValidationRules, validate } = require('../middleware/validation')

import authController from "./authUser.controller";

const ctrl = new authController();
const userToken = new authenticateToken();

router.get("/get-user/:id", ctrl.getUser);
router.post("/insert-signup",
    userValidationRules(),
    validate,
    ctrl.signUp);
router.post("/insert-login",
    ctrl.logIn,
    ctrl.tokenGen
);
router.put("/update-user/:id", ctrl.updateUser);
router.delete("/delete-user/:id", ctrl.deleteUser);
router.get("/get-login",
    userToken.checkToken,
    userToken.getUser
);

module.exports = router;
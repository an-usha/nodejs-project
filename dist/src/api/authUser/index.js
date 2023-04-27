"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const router = express_1.default.Router();
const { userValidationRules, validate } = require('../middleware/validation');
const authUser_controller_1 = __importDefault(require("./authUser.controller"));
const ctrl = new authUser_controller_1.default();
const userToken = new authenticateToken_1.default();
router.get("/get-user/:id", ctrl.getUser);
router.post("/insert-signup", userValidationRules(), validate, ctrl.signUp);
router.post("/insert-login", ctrl.logIn, ctrl.tokenGen);
router.put("/update-user/:id", ctrl.updateUser);
router.delete("/delete-user/:id", ctrl.deleteUser);
router.get("/get-login", userToken.checkToken, userToken.getUser);
module.exports = router;
//# sourceMappingURL=index.js.map
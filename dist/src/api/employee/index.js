"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_controller_1 = __importDefault(require("./employee.controller"));
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const router = express_1.default.Router();
const userToken = new authenticateToken_1.default();
const { employeeRules, validateEmployee } = require('../middleware/validation');
const controller = new employee_controller_1.default();
router.get('/get-all', controller.getAll);
router.get('/get-employee/:id', controller.getEmployee);
// this is for the chaining method for verifying the token
// router.post('/insert-employee',
//     userToken.checkToken,
//     employeeRules(), validateEmployee,
//     controller.insertEmployee);
router.post('/insert-employee', controller.insertEmployee);
router.put('/update-employee/:id', controller.updateEmployee);
router.delete('/delete-employee/:id', controller.deleteEmployee);
module.exports = router;
//# sourceMappingURL=index.js.map
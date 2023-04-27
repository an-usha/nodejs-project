import express from "express";
import employeeController from "./employee.controller";
import authenticateToken from "../middleware/authenticateToken";

const router = express.Router();
const userToken = new authenticateToken();
const { employeeRules, validateEmployee } = require('../middleware/validation')

const controller = new employeeController();

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

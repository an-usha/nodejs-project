"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const employee_model_1 = __importDefault(require("./employee.model"));
class employeeController {
    constructor() {
        this.model = employee_model_1.default;
        this.getAll = (req, res, next) => {
            employee_model_1.default.find().then(resp => {
                return res.status(200).json({ employee: resp });
            }, error => {
                return res.status(500).send(error);
            });
        };
        this.getEmployee = (req, res, next) => {
            console.log(req.params.id);
            employee_model_1.default.find({ _id: new mongodb_1.ObjectId(req.params.id) }).then(response => {
                console.log(response);
                return res.status(200).json({ employee: response });
            }, error => {
                return res.status(500).json({ error: error });
            });
        };
        this.insertEmployee = (req, res) => {
            const allEmp = new employee_model_1.default({
                name: req.body.name,
                address: req.body.address,
                position: req.body.position,
                salary: req.body.salary,
                // hobbies: req.body.hobbies
                hobbies: req.body.hobbies.map((hobby) => {
                    return { hobby: hobby.hname };
                }),
            });
            allEmp.save().then(response => {
                return res.status(200).send(response);
            }, error => {
                return res.status(500).send(error);
            });
        };
        this.updateEmployee = (req, res) => {
            const updateId = req.params.id;
            employee_model_1.default.updateOne({
                _id: new mongodb_1.ObjectId(updateId)
            }, req.body).then(response => {
                return res.status(200).send(response);
            }, error => {
                return res.status(500).send(error);
            });
        };
        this.deleteEmployee = (req, res) => {
            const delId = req.params.id;
            employee_model_1.default.deleteOne({ _id: new mongodb_1.ObjectId(delId) }).then(response => {
                return res.status(200).send(response);
            }, error => {
            });
        };
    }
}
exports.default = employeeController;
//# sourceMappingURL=employee.controller.js.map
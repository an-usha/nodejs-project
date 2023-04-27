"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const user_model_1 = __importDefault(require("./user.model"));
class userController {
    constructor() {
        this.getUser = (req, res, next) => {
            const userId = req.params.id;
            user_model_1.default.find({ _id: new mongodb_1.ObjectId(userId) }).then(response => {
                return res.json({ users: response });
            }, error => {
                return express_1.response.json({ error: error });
            });
        };
        this.insertUser = (req, res, next) => {
            console.log(req.body);
            const newuser = new user_model_1.default(req.body);
            console.log(newuser);
            newuser.save().then(response => {
                // console.log('response');
                return res.status(200).json({ message: "DATA Added", });
            }, error => {
                return res.status(500).json({ error: error });
            });
        };
        this.updateUser = (req, res) => {
            const UserId = req.params.id;
            user_model_1.default.updateOne({ _id: new mongodb_1.ObjectId(UserId) }, req.body).then(response => {
                return res.status(200).send(response);
            }, error => {
                return res.status(500).json({ error: error });
            });
        };
        this.deleteUser = (req, res) => {
            const delId = req.params.id;
            user_model_1.default.deleteOne({ _id: new mongodb_1.ObjectId(delId) }).then(response => {
                return res.status(200).send(response);
            }, error => {
                return res.status(500).json({ error: error });
            });
        };
    }
}
exports.default = userController;
//# sourceMappingURL=user.controller.js.map
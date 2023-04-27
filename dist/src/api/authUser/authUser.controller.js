"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authUser_model_1 = __importDefault(require("./authUser.model"));
const config_1 = __importDefault(require("../../../config/config"));
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const crypto = require("crypto");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class userController {
    constructor() {
        this.getUser = (req, res, next) => {
            const userId = req.params.id;
            authUser_model_1.default.find({ _id: new mongodb_1.ObjectId(userId) }).then(response => {
                return res.json({ users: response });
            }, error => {
                return express_1.response.json({ error: error });
            });
        };
        this.updateUser = (req, res) => {
            const UserId = req.params.id;
            authUser_model_1.default.updateOne({ _id: new mongodb_1.ObjectId(UserId) }, req.body).then(response => {
                return res.status(200).send(response);
            }, error => {
                return res.status(500).json({ error: error });
            });
        };
        this.deleteUser = (req, res) => {
            const delId = req.params.id;
            authUser_model_1.default.deleteOne({ _id: new mongodb_1.ObjectId(delId) }).then(response => {
                return res.status(200).send(response);
            }, error => {
                return res.status(500).json({ error: error });
            });
        };
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            //checking existing user
            try {
                const existingUser = yield authUser_model_1.default.findOne({ email: email });
                if (existingUser) {
                    return res.status(400).json({
                        msg: "User already exist"
                    });
                }
                const newUser = new authUser_model_1.default(req.body);
                newUser.save().then((response) => {
                    return res.status(201).json({ message: "Data Inserted" });
                }, (error) => {
                    return res.status(500).json({ error: error });
                });
                //generating token using jwt
                // const token = jwt.sign({ email: result.email, id: result._id }, config.secret)
                // res.status(201).json({
                //     user: result,
                //     token: token,
                // });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Something went wrong"
                });
            }
        });
        this.logIn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const existingUser = yield authUser_model_1.default.findOne({ email: email });
                if (!existingUser) {
                    return res.status(404).json({
                        msg: "User not found"
                    });
                }
                // const matchPassword = await bcrypt.compare(password, existingUser.password)
                // if(!matchPassword){
                //     return res.status(400).json({
                //         msg:"Invalid"
                //     });
                // }
                const pass = crypto.pbkdf2Sync(password, config_1.default.salt, 1000, 64, 'sha512').toString('hex');
                console.log("Logged password---->", existingUser.password);
                console.log("Match password---->", pass);
                if (existingUser.password === pass) {
                    return next();
                }
                else {
                    return res.status(500).json({
                        msg: "Invalid Data Entered"
                    });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    msg: "Something went wrong",
                });
            }
        });
        this.tokenGen = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const user = yield authUser_model_1.default.findOne({ email: email });
            const token = jwt.sign({ email: email, id: user._id }, config_1.default.secret, { expiresIn: "60s" });
            res.status(201).json({
                token,
                msg: "Success"
            });
        });
    }
}
exports.default = userController;
//# sourceMappingURL=authUser.controller.js.map
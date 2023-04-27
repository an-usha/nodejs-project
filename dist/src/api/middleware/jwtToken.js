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
const config_1 = __importDefault(require("../../../config/config"));
const jwt = require("jsonwebtoken");
class jwtToken {
    constructor() {
        this.checkToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.headers.authorization) {
                res.send({ message: "token is not found" });
            }
            try {
                const token = req.headers.authorization.split(" ")[1];
                const verify = yield jwt.verify(token, config_1.default.secret);
                req.user = verify;
                next();
            }
            catch (error) {
                res.json({
                    status: false,
                    msg: "Error",
                });
            }
        });
        this.getUser = (req, res, next) => {
            try {
                res.json({
                    status: true,
                    message: "User Info",
                    data: [
                        req.user.id,
                        req.user.email
                    ]
                });
            }
            catch (error) {
                res.json({
                    status: false,
                    message: "Error getting user info",
                });
            }
        };
    }
}
exports.default = jwtToken;
//# sourceMappingURL=jwtToken.js.map
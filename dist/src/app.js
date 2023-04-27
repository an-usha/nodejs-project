"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const router_1 = __importDefault(require("./router"));
const config_1 = __importDefault(require("../config/config"));
const app = (0, express_1.default)();
const port = 3000;
// const url = "mongodb+srv://anushashresthacharya:anusha@cluster0.pb5xvui.mongodb.net/users?retryWrites=true&w=majority";
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
(0, router_1.default)(app);
mongoose
    .connect(config_1.default.db)
    .then(() => console.log("Mongo is connected"))
    .catch((err) => console.log("mongo error", err));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map
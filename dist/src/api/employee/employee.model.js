"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const employee = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    hobbies: [mongoose.Schema.Types.Mixed]
});
exports.default = mongoose.model("employee", employee);
//# sourceMappingURL=employee.model.js.map
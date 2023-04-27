import { StreamDescription } from "mongodb";

const mongoose = require("mongoose");
const employee = mongoose.Schema(
    {
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
    }
);

export default mongoose.model("employee", employee);
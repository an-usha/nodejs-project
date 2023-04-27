const mongoose = require('mongoose');
const crypto = require('crypto');

import config from "../../../config/config";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,


        }
    }
);

//pre save hashing
userSchema.pre('save', async function (next) {
    const authUser = this;
    if (!authUser.isModified('password')) return next();
    // Creating a unique salt for a particular user
    // const salt = crypto.randomBytes(16).toString('hex'); // Store this salt in .env also it should accesable from config.ts file , salt=myNewSalt
    // Hashing user's salt and password with 1000 iterations
    const hash = await crypto.pbkdf2Sync(
        authUser.password,
        config.salt,
        1000,
        64,
        'sha512'
    ).toString('hex');
    authUser.password = hash;
    next();
});

export default mongoose.model("authUser", userSchema);
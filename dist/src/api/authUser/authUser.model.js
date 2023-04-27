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
const mongoose = require('mongoose');
const crypto = require('crypto');
const config_1 = __importDefault(require("../../../config/config"));
const userSchema = mongoose.Schema({
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
});
//pre save hashing
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authUser = this;
        if (!authUser.isModified('password'))
            return next();
        // Creating a unique salt for a particular user
        // const salt = crypto.randomBytes(16).toString('hex'); // Store this salt in .env also it should accesable from config.ts file , salt=myNewSalt
        // Hashing user's salt and password with 1000 iterations
        const hash = yield crypto.pbkdf2Sync(authUser.password, config_1.default.salt, 1000, 64, 'sha512').toString('hex');
        authUser.password = hash;
        next();
    });
});
exports.default = mongoose.model("authUser", userSchema);
//# sourceMappingURL=authUser.model.js.map
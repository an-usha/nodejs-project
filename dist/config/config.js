"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    salt: process.env.SALT_VALUE,
    db: process.env.DB_URL,
    secret: process.env.SECRETE_KEY,
};
//# sourceMappingURL=config.js.map
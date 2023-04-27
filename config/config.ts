require('dotenv').config();
export default {
    salt: process.env.SALT_VALUE,
    db: process.env.DB_URL,
    secret: process.env.SECRETE_KEY,
};
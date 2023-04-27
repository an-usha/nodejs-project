import config from '../../../config/config';

const jwt = require("jsonwebtoken");

export default class authenticateToken {

    checkToken = async (req, res, next) => {
        if (!req.headers.authorization) {
            res.send({ message: "token is not found" })
        }
        try {
            const token = req.headers.authorization.split(" ")[1];
            const verify = await jwt.verify(token, config.secret);
            req.user = verify
            next();
        }

        catch (error) {
            return res.status(500).send(error);
        }
    }

    getUser = (req, res, next) => {
        try {
            res.json({
                status: true,
                message: "User Info",
                data: [
                    req.user.id,
                    req.user.email
                ]
            })
        } catch (error) {
            res.json({
                status: false,
                message: "Error getting user info",
            })
        }
    }
}
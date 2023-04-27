import authUser from './authUser.model';
import config from '../../../config/config';
import { response } from 'express';
import { ObjectId } from 'mongodb';

const crypto = require("crypto");
// const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

export default class userController {
    getUser = (req, res, next) => {
        const userId = req.params.id;
        authUser.find({ _id: new ObjectId(userId) }).then(response => {
            return res.json({ users: response });
        },
            error => {
                return response.json({ error: error });
            });
    }
    updateUser = (req, res) => {
        const UserId = req.params.id;
        authUser.updateOne({ _id: new ObjectId(UserId) }, req.body).then(response => {
            return res.status(200).send(response)
        }, error => {
            return res.status(500).json({ error: error });
        });
    }
    deleteUser = (req, res) => {
        const delId = req.params.id;
        authUser.deleteOne({ _id: new ObjectId(delId) }).then(response => {
            return res.status(200).send(response)
        }, error => {
            return res.status(500).json({ error: error });
        });
    }

    signUp = async (req, res) => {
        const { name, email, password } = req.body;
        //checking existing user
        try {
            const existingUser = await authUser.findOne({ email: email })
            if (existingUser) {
                return res.status(400).json({
                    msg: "User already exist"
                });
            }
            const newUser = new authUser(req.body);
            newUser.save().then(
                (response) => {
                    return res.status(201).json({ message: "Data Inserted" });
                },
                (error) => {
                    return res.status(500).json({ error: error });
                }
            )
            //generating token using jwt
            // const token = jwt.sign({ email: result.email, id: result._id }, config.secret)
            // res.status(201).json({
            //     user: result,
            //     token: token,
            // });

        } catch (error) {
            res.status(500).json({
                msg: "Something went wrong"
            })

        }

    }

    logIn = async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const existingUser = await authUser.findOne({ email: email });
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
            const pass = crypto.pbkdf2Sync(
                password,
                config.salt,
                1000,
                64,
                'sha512').toString('hex')
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

        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: "Something went wrong",
            });

        }
    }
    tokenGen = async (req, res, next) => {
        const { email } = req.body;
        const user = await authUser.findOne({ email: email });
        const token = jwt.sign({ email: email, id: user._id }, config.secret, { expiresIn: "60s" });
        res.status(201).json({
            token,
            msg: "Success"
        });
    }
}

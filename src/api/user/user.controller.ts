import { request, response } from "express";
import { ObjectId } from "mongodb";
import user from './user.model'

export default class userController {
    getUser = (req, res, next) => {
        const userId = req.params.id;
        user.find({ _id: new ObjectId(userId) }).then(response => {
            return res.json({ users: response });
        },
            error => {
                return response.json({ error: error });
            });
    }
    insertUser = (req, res, next) => {
        console.log(req.body);

        const newuser = new user(req.body);
        console.log(newuser);

        newuser.save().then(response => {
            // console.log('response');
            return res.status(200).json({ message: "DATA Added", });
        }, error => {
            return res.status(500).json({ error: error });
        });
    }
    updateUser = (req, res) => {
        const UserId = req.params.id;
        user.updateOne({ _id: new ObjectId(UserId) }, req.body).then(response => {
            return res.status(200).send(response)
        }, error => {
            return res.status(500).json({ error: error });
        });
    }
    deleteUser = (req, res) => {
        const delId = req.params.id;
        user.deleteOne({ _id: new ObjectId(delId) }).then(response => {
            return res.status(200).send(response)
        }, error => {
            return res.status(500).json({ error: error });
        });
    }

}
import { ObjectId } from "mongodb";
import employee from "./employee.model";
import { response } from "express";

export default class employeeController {
    model = employee;
    getAll = (req, res, next) => {
        employee.find().then(resp => {
            return res.status(200).json({ employee: resp });
        },
            error => {
                return res.status(500).send(error);
            }
        );
    }
    getEmployee = (req, res, next) => {
        console.log(req.params.id);
        employee.find({ _id: new ObjectId(req.params.id) }).then(response => {
            console.log(response);
            return res.status(200).json({ employee: response });
        }, error => {
            return res.status(500).json({ error: error });
        });
    }

    insertEmployee = (req, res) => {
        const allEmp = new employee({
            name: req.body.name,
            address: req.body.address,
            position: req.body.position,
            salary: req.body.salary,
            // hobbies: req.body.hobbies
            hobbies: req.body.hobbies.map((hobby) => {
                return { hobby: hobby.hname };
            }),
        });


        allEmp.save().then(response => {
            return res.status(200).send(response);
        },
            error => {
                return res.status(500).send(error);
            }
        );
    }

    updateEmployee = (req, res) => {
        const updateId = req.params.id;
        employee.updateOne(
            {
                _id: new ObjectId(updateId)
            }, req.body).then(response => {
                return res.status(200).send(response);
            }, error => {
                return res.status(500).send(error);
            });
    }

    deleteEmployee = (req, res) => {
        const delId = req.params.id;
        employee.deleteOne(
            { _id: new ObjectId(delId) }
        ).then(response => {
            return res.status(200).send(response)
        }, error => {
        });
    }
}
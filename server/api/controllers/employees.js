const Employer = require("../models/Employer");
const mongoose = require("mongoose");
const protectedFields = [];

exports.employees_get_all = (req, res, next) => {
    Employer.find()
    .select('name rate employerImage')
    .exec()
    .then(data => {
        response = {
            count: data.length,
            employees: data.map(d => {
                return {
                    id: d._id,
                    name: d.name,
                    rate: d.rate,
                    image: d.employerImage,
                    request: {
                        method: "GET",
                        url: `${process.env.rootURL}:${process.env.PORT}/employees/${d._id}`
                    }
                }
            })
        }
        if(data.length >= 0)
        {
            res.status(200).json(response)
        } else {
            res.status(404).json({
                message: "No entries found"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
};
exports.employees_add_one = (req, res, next) => {
    if(req.file) {
        req.body.employerImage = req.file.path;
    }
    const employer = new Employer({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
    })
    employer.save()
    .then(result => {
        createdEmployer = {
            id: result._id,
            name: result.name,
            request: {
                method: "GET",
                url: `${process.env.rootURL}:${process.env.PORT}/employees/${result._id}`
            }
        }
        res.status(201).json({
            message: "Created employer successfully!",
            employer: createdEmployer
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}

exports.employees_get_one = (req, res, next) => {
    const id = req.params.employerId;
    Employer.findById(id)
    .select("name rate employerImage")
    .exec()
    .then(data => {
        if(data != null){
            employerData = {
                id: data._id,
                name: data.name,
                rate: data.rate,
                employerImage: data.employerImage,
                request: {
                    method: "GET",
                    url: `${process.env.rootURL}:${process.env.PORT}/employees/${data._id}`
                }
            }
            res.status(200).json(employerData)
        }else{
            res.status(404).json({
                message: "No vaild entry found for provided ID"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}
exports.employees_edit_one = (req, res, next) => {
    const id = req.params.employerId;
    if(req.file) {
        req.body.employerImage = req.file.path;
    }
    const request = Object.entries(req.body);
    const updateOps = {}
    for (const ops of request)
    {
        if(!protectedFields.includes(ops[0]))
            updateOps[ops[0]] = ops[1]
    }
    Employer.findOneAndUpdate({_id: id}, { $set: updateOps}, {new: true})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Employer updated!",
            request: {
                method: "GET",
                url: `${process.env.rootURL}:${process.env.PORT}/employees/${id}`
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}
exports.employees_delete_one = (req, res, next) => {
    (req, res, next) =>{
        const id = req.params.employerId;
        Employer.findOneAndRemove({_id: id})
        .exec()
        .then(result => {
            if(result != null){
                res.status(200).json({
                    message: "Employer deleted!",
                    request: {
                        method: "DELETE",
                        url: `${process.env.rootURL}:${process.env.PORT}/employees/${id}`
                    }
                })
            } else {
                res.status(401).json({
                    message: "No entries found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
    }
}
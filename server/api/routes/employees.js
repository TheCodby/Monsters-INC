const express = require("express")
const mongoose = require("mongoose")
const Employer = require("../models/Employer");
const multer = require('multer');
const protectedFields = [];
const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png']
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/employees/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(allowedFormats.includes(file.mimetype))
    {
        cb(null, true)
    } else {
        cb(new Error(`You can't upload files in this format`), false)
    }
    
}
const upload = multer(
    {storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter});
const router = express.Router();

router.get('/', async(req, res, next) => {
    Employer.find()
    .select('name rate employerImage')
    .exec()
    .then(data => {
        console.log("From database: ", data)
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
                        url: `${process.env.rootURL}/employees/${d._id}`
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
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})
router.post('/', upload.single('employerImage'), async (req, res, next) =>{
    const employer = new Employer({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        employerImage: req.file.path
    })
    employer.save()
    .then(result => {
        createdEmployer = {
            id: result._id,
            name: result.name,
            request: {
                method: "GET",
                url: `${process.env.rootURL}/employees/${result._id}`
            }
        }
        res.status(201).json({
            message: "Created employer successfully!",
            employer: createdEmployer
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})
router.get('/:employerId', async (req, res, next) =>{
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
                    url: `${process.env.rootURL}/employees/${data._id}`
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
})
router.patch('/:employerId', upload.single('employerImage'), async (req, res, next) =>{
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
                url: `${process.env.rootURL}/employees/${id}`
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})
router.delete('/:employerId', async (req, res, next) =>{
    const id = req.params.employerId;
    Employer.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Employer deleted!",
            request: {
                method: "DELETE",
                url: `${process.env.rootURL}/employees/${id}`
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})
module.exports = router
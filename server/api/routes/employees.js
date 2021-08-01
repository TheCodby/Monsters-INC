const express = require("express")
const mongoose = require("mongoose")
const Employer = require("../models/Employer");
const multer = require('multer');
const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
const auth = require("../middleware/check-auth")

const employerController = require('../controllers/employees');

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

router.get('/', auth, employerController.employees_get_all)
router.post('/', upload.single('employerImage'), employerController.employees_add_one)
router.get('/:employerId', employerController.employees_get_one)
router.patch('/:employerId', upload.single('employerImage'), employerController.employees_edit_one)
router.delete('/:employerId', employerController.employees_delete_one)
module.exports = router
const mongoose = require('mongoose');

// const multer  = require('multer');
// const path = require('path');
// const AVATAR_PATH = path.join('/uploads/users/avatars');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    }, 
    status: {
        type: Boolean, 
        required: true
    },
    college: {
        type: String,
        required: true
    },
    scores: {
        dsa: {
            type: String,
            required: true
        },
        web: {
            type: String,
            required: true
        },
        react: {
            type: String,
            required: true
        }
    },
    // include the array of ids of all the interview in the student schema itself
    interviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interview', 
            result: {
                type: String,
                reuired: true
            }
        },
    ], 
    
    // avatar: {
    //     type: String
    // }
}, {
    timestamps: true
});


// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // console.log('31', req, file);
//         cb(null, path.join(__dirname, '..', AVATAR_PATH));
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });


// statics
// userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
// userSchema.statics.avatarPath = AVATAR_PATH;


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
const Student = require('../models/student');
const Interview = require('../models/interview');

module.exports.create = async function(req, res) {
    try {
        console.log('6', req.body);
        let student = await Student.create({
            name: req.body.name,
            batch: req.body.batch,
            status: req.body.status,
            college: req.body.college
        });
        // console.log(student);
        
        req.flash('success', 'Student added!');
        return res.redirect('back');
    } catch (error) {
        req.flash('error', error);
        console.log('error');
        return;
    }
}

module.exports.destroy = async function(req, res) {
    try {
        let student = await Student.findById(req.params.id);
        if(student.user == student.user.id) {
            student.remove();
    
            // delete the student from interviews db
            // await Comment.deleteMany({post: req.params.id});

            // if(req.xhr) {
            //     return res.status(200).json({
            //         data: {
            //             student: req.params.id
            //         },
            //         message: "Student removed!"
            //     })
            // }

            req.flash('success', 'Student removed!');
            return res.redirect('back');
        } else {
            req.flash('error', 'You cannot delete this student!');

            return res.redirect('back');
        }
    } catch (error) {
        console.log('Error', error);
        return;
    }
}


module.exports.student = async function (req, res) {
    let students = await Student.find({});
    res.render('student', {
        title: 'Hello Students',
        students: students
    })
    // return res.redirect('/students');
}

module.exports.update = async function (req, res) {
    try {

        let student = await Student.findById(req.params.s_id);
        let interview = await Interview.findById(req.params.i_id);
        console.log(80,student, interview);

        // student.interviews.forEach( )

        let idx = student.interviews.findIndex(inter=>inter._id == interview.id);
        console.log(idx);
        console.log(idx, req.body, req.body.result, student.interviews[idx].result);
        student.interviews[idx].result = req.body.result;
        console.log(student.interviews[idx].result);

        student.save();
        return res.redirect('back');
        // console.log('79', student);
        // User.uploadedAvatar(req, res, function(err) {
        //     if(err) {console.log('*****Multer error', err)};

        //     user.name = req.body.name;
        //     user.email = req.body.email;

        //     if(req.file) {

        //         if(user.avatar) {
        //             if (fs.existsSync(path.join(__dirname, '..', user.avatar))) {
        //                 fs.unlinkSync(path.join(__dirname, '..', user.avatar));
        //             }
        //         }
                
        //         // this is saving the path of the uploaded file into the avatar field in the user
        //         user.avatar = User.avatarPath + '/' + req.file.filename;
        //         console.log(user.avatar);
        //     }

        //     user.save();
        //     return res.redirect('back');
        // })
    } catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}


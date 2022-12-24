const Student = require('../models/student');
// const Interview = require('../models/interview');

module.exports.create = async function(req, res) {
    try {
        console.log('6', req.body);
        let student = await Student.create({
            name: req.body.name,
            batch: req.body.batch,
            status: req.body.status,
            college: req.body.college
        });
        console.log(student);

        // if(req.xhr) {
        //     return res.status(200).json({
        //         data: {
        //             student: student
        //         },
        //         message: "Student created!"
        //     });
        // }

        // req.flash('success', 'Student Added!');
        return res.redirect('back');
        // return;
    } catch (error) {
        // req.flash('error', error);
        console.log('error');
        return;
    }
}

module.exports.destroy = async function(req, res) {
    try {
        let student = await Student.findById(req.params.id);
        // .id means converting the object id into string
        if(student.user == student.user.id) {
            student.remove();
    
            // delete the student from interviews db
            // await Comment.deleteMany({post: req.params.id});

            if(req.xhr) {
                return res.status(200).json({
                    data: {
                        student: req.params.id
                    },
                    message: "Student removed!"
                })
            }

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


module.exports.show = async function (req, res) {
    let students = await Student.find({});
    res.render('student', {
        title: 'Hello Students',
        students: students
    })
    // return res.redirect('/students');
}

const Interview = require('../models/interview');
const Student = require('../models/student');
const { student } = require('./students_controller');

module.exports.create = async function(req, res) {
    try {
        await Interview.create({
            name: req.body.name,
            date: req.body.date
        });

        req.flash('success', 'Interview published');
        return res.redirect('back');
    } catch (error) {
        req.flash('error', error);
        return;
    }
}

module.exports.delete = async function(req, res) {
    try {
        let interview = await Interview.findById(req.params.id).populate('students');
        if(interview) {
            let students = interview.students;
            students.forEach(student => {
                student.interviews = student.interviews.filter(i_id => i_id != req.params.id);
                student.save();
            })
            interview.remove();

            req.flash('success', 'Interview deleted!');
            return res.redirect('back');
        } else {
            req.flash('error', 'You cannot delete this interview!');
            return res.redirect('back');
        }
    } catch (error) {
        console.log('Error', error);
        return;
    }
}


module.exports.show = async function (req, res) {
    try {
        let interviews = await Interview.find({}).sort('-createdAt');
        res.render('interview', {
            title: 'Hello Interviews',
            interviews: interviews
        })
    } catch (error) {
        console.log(error);
        return;
    }
}


module.exports.allocate = async function(req, res) {
    try {
        let students = await Student.find({});
        let interview = await Interview.findById(req.params.id);

        let allocated_students = students.filter(student=> interview.students.includes(student._id));
        let remaining_students = students.filter(student=> !interview.students.includes(student._id));

        res.render('allocate_students', {
            title: 'Add students to Interview',

            interview: interview,
            allocated_students: allocated_students,
            remaining_students: remaining_students
        })
    } catch(error) {
        console.log(error);
        return;
    }
}


module.exports.addStudent = async function(req, res) {
    try {
        let interview = await Interview.findById(req.params.i_id);
        let student = await Student.findById(req.params.s_id);
        if(interview && student) {
            interview.students.push(student.id);
            interview.save();

            student.interviews.push({id: interview._id, result: 'On Hold'});
            student.save();
        }
        res.redirect('back');
    } catch (error) {
        console.log(error);
        return;
    }
}


module.exports.removeStudent = async function(req, res) {
    try {
        let interview = await Interview.findById(req.params.i_id);
        let student = await Student.findById(req.params.s_id);

        if(interview && student) {
            interview.students = interview.students.filter(s_id=>s_id!=student.id);
            interview.save();

            student.interviews = student.interviews.filter(i=>i.id!=interview.id);
            student.save();
        }

        res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}



module.exports.result = async function(req, res) {
    try {
        let students = await Student.find({});
        let interview = await Interview.findById(req.params.id);

        let allocated_students = students.filter(student=> interview.students.includes(student._id));

        res.render('update_results', {
            title: 'Update Students Result for ',
            interview: interview,
            allocated_students: allocated_students
        })
    } catch (error) {
        console.log(error);
        return;
    }
}
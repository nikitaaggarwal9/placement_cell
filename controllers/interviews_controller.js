const Interview = require('../models/interview');
const Student = require('../models/student');

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

module.exports.destroy = async function(req, res) {
    try {
        let interview = await Interview.findById(req.params.id);
        if(interview.user == interview.user.id) {
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
    let interviews = await Interview.find({});
    res.render('interview', {
        title: 'Hello Interviews',
        interviews: interviews
    })
}


module.exports.allocate = async function(req, res) {
    let students = await Student.find({});
    let interview = await Interview.findById(req.params.id);

    let allocated_students = students.filter(student=> interview.students.includes(student._id));
    let remaining_students = students.filter(student=> !interview.students.includes(student._id));

    // console.log(allocated_students);
    res.render('allocate_students', {
        title: 'Add students to Interview',
        interview: interview,
        allocated_students: allocated_students,
        remaining_students: remaining_students
    })
}


module.exports.addStudent = async function(req, res) {
    let interview = await Interview.findById(req.params.i_id);
    let student = await Student.findById(req.params.s_id);
    if(interview && student) {
        // console.log(interview.id, student.id);
        interview.students.push(student._id);
        interview.save();

        student.interviews.push({id: interview._id});
        student.save();
    }
    res.redirect('back');
}


module.exports.removeStudent = async function(req, res) {
    let interview = await Interview.findById(req.params.i_id);
    let student = await Student.findById(req.params.s_id);

    if(interview && student) {
        interview.students = interview.students.filter(s_id=>s_id!=student.id);
        interview.save();

        student.interviews = student.interviews.filter(i_id=>i_id!=interview.id);
        student.save();
    }

    res.redirect('back');
}



module.exports.result = async function(req, res) {
    let students = await Student.find({});
    let interview = await Interview.findById(req.params.id);

    let allocated_students = students.filter(student=> interview.students.includes(student._id));

    // console.log(allocated_students);
    res.render('update_results', {
        title: 'Update Students Result for ',
        interview: interview,
        allocated_students: allocated_students
    })
}
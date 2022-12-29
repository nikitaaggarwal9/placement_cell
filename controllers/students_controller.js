const Student = require("../models/student");
const Interview = require("../models/interview");

module.exports.create = async function (req, res) {
  try {
    let student = await Student.create({
      name: req.body.name,
      batch: req.body.batch,
      status: req.body.status,
      college: req.body.college,
    });

    if (student) {
      req.flash("success", "Student added!");
      return res.redirect("back");
    } else {
      req.flash("error", "Try Again!");
    }
  } catch (error) {
    req.flash("error", error);
    console.log("error");
    return;
  }
};

module.exports.delete = async function (req, res) {
  try {
    let student = await Student.findById(req.params.id);
    if (student) {
      let interviews = student.interviews;
      console.log(interviews, interviews.length);

      for (inter of interviews) {
        let interview = await Interview.findById(inter.iid);
        interview.students = interview.students.filter((s_id) => s_id != req.params.id);
        interview.save();
      }

      await student.remove();

      req.flash("success", "Student removed!");
      return res.redirect("back");
    } else {
      req.flash("error", "You cannot delete this student!");

      return res.redirect("back");
    }
  } catch (err) {
    console.log("error", err);
    return;
  }
};

module.exports.student = async function (req, res) {
  try {
    let students = await Student.find({}).sort("createdAt");
    res.render("student", {
      students: students,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

module.exports.update = async function (req, res) {
  try {
    let student = await Student.findById(req.params.id);
    console.log(student);
    if (student) {
      res.render("update_student", {
        student: student,
      });
    }

    req.flash("error", "Failed, Try Again!");
    return;
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.updateData = async function (req, res) {
  try {
    let student = await Student.findById(req.params.id);
    if (student) {
      student.name = req.body.name;
      student.batch = req.body.batch;
      student.college = req.body.college;
      student.status = req.body.status;

      student.save();
      req.flash("success", "Student Updated!");
      return res.redirect("back");
    }

    req.flash("error", "Failed, Try Again!");
    return;
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.updateRes = async function (req, res) {
  try {
    let student = await Student.findById(req.params.s_id);

    let idx = student.interviews.findIndex((i) => i.iid == req.params.i_id);
    student.interviews[idx].result = req.body.result;

    student.save();
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    return;
  }
};

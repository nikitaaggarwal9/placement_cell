const Student = require("../models/student");
const Interview = require("../models/interview");

const excelJS = require("exceljs");

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
      
      // console.log(interviews, interviews.length);
      // interviews.forEach((inter) => async function() {
      //   let interview = await Interview.findById(inter.iid);
      //   console.log(interview);
      //   interview.students = interview.students.filter(
      //     (s_id) => s_id != req.params.id
      //   );
      //   await interview.save();
      // })

      for (inter of interviews) {
        let interview = await Interview.findById(inter.iid);
        console.log(interview);
        interview.students = interview.students.filter(
          (s_id) => s_id != req.params.id
        );
        await interview.save();
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

module.exports.download = async function (req, res) {
  try {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Student Data");

    worksheet.columns = [
      { header: "S.No.", key: "sno" },
      { header: "U.Id", key: "uid" },
      { header: "Name", key: "name" },
      { header: "Batch", key: "batch" },
      { header: "College", key: "college" },
      { header: "Status", key: "status" },
      { header: "React Score", key: "react" },
      { header: "DSA Score", key: "dsa" },
      { header: "WebD Score", key: "webd" },
      { header: "Company Name", key: "c_name" },
      { header: "Company Date", key: "date" },
      {header: "Result", key:"result" },
    ];

    let counter = 1;
    const interviews = await Interview.find({}).populate("students");

    interviews.forEach((interview) => {
      let int_students = interview.students;

      int_students.forEach((student) => {
        let idx = student.interviews.findIndex((inter) => (inter.iid == interview.id));
    
        worksheet.addRow({
          sno: counter,
          uid: student.id,
          name: student.name,
          batch: student.batch,
          college: student.college,
          status: student.status,
          react: student.scores.react,
          dsa: student.scores.dsa,
          webd: student.scores.web,
          c_name: interview.name,
          date: interview.date,
          result: student.interviews[idx].result
        });
        counter++;
          
        });
      });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
    );

    res.setHeader("Content-Disposition", `attachment; filename=users.xlsx`);

    return workbook.xlsx.write(res).then(() => {
      res.status(200);
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

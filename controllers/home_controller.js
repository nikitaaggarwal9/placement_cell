const Student = require('../models/student');
const User = require('../models/user');

module.exports.home = async function(req, res) {
    try {    
        return res.render('home', {
            title: "Home",
        });
    } catch (error) {
        console.log("Error", error);
        return;
    }
}
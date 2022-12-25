const express = require('express');
const router = express.Router();
const passport = require('passport');

const studentsController = require('../controllers/students_controller');

router.get('/', studentsController.student);
router.post('/create', passport.checkAuthentication, studentsController.create);
router.get('/destroy/:id', passport.checkAuthentication, studentsController.destroy);
router.post('/update/:s_id/:i_id', passport.checkAuthentication, studentsController.update);
console.log('11');
module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');

const studentsController = require('../controllers/students_controller');

router.get('/', studentsController.student);
router.post('/create', passport.checkAuthentication, studentsController.create);
router.get('/delete/:id', passport.checkAuthentication, studentsController.delete);
router.get('/update/:id', passport.checkAuthentication, studentsController.update);
router.post('/update_data/:id', passport.checkAuthentication, studentsController.updateData);
router.post('/update_res/:s_id/:i_id', passport.checkAuthentication, studentsController.updateRes);

module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');

const studentsController = require('../controllers/students_controller');

router.get('/', studentsController.show);
router.post('/create', passport.checkAuthentication, studentsController.create);
router.get('/destroy/:id', passport.checkAuthentication, studentsController.destroy);

module.exports = router;
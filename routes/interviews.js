const express = require('express');
const router = express.Router();
const passport = require('passport');

const interviewsController = require('../controllers/interviews_controller');

router.get('/', interviewsController.show);
router.post('/create', passport.checkAuthentication, interviewsController.create);
router.get('/delete/:id', passport.checkAuthentication, interviewsController.delete);
router.get('/allocate/:id', passport.checkAuthentication, interviewsController.allocate);
router.post('/add_student/:s_id/:i_id', passport.checkAuthentication, interviewsController.addStudent);
router.get('/remove_student/:s_id/:i_id', passport.checkAuthentication, interviewsController.removeStudent);
router.get('/result/:id', passport.checkAuthentication, interviewsController.result);


module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');

const interviewsController = require('../controllers/interviews_controller');

router.get('/', interviewsController.show);
router.post('/create', passport.checkAuthentication, interviewsController.create);
router.get('/destroy/:id', passport.checkAuthentication, interviewsController.destroy);

router.get('/allocate/:id', passport.checkAuthentication, interviewsController.allocate);
router.post('/add-student/:s_id/:i_id', passport.checkAuthentication, interviewsController.addStudent);
router.post('/remove-student/:s_id/:i_id', passport.checkAuthentication, interviewsController.removeStudent);

router.get('/result/:id', passport.checkAuthentication, interviewsController.result);


module.exports = router;
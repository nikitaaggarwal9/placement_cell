const express = require('express');
const router = express.Router();
const passport = require('passport');

const interviewsController = require('../controllers/interviews_controller');

router.get('/', interviewsController.show);
router.post('/create', passport.checkAuthentication, interviewsController.create);
router.get('/destroy/:id', passport.checkAuthentication, interviewsController.destroy);

module.exports = router;
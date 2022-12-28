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

{/* <link rel="stylesheet" href="/css/allocate_student.css">
<div id="cmp-name"><%= title %><%= interview.name %></div>

<div class="student-list">
    <ul>
        <% for(student of allocated_students) { %>
            <li>
                <div class="student">
                    <div class="st-name"><%= student.name %></div>
                    <div class="st-result">Result: <% for(i of student.interviews) { %> 
                        <% if(i.id == interview.id) { %>
                            <%= i.result %>
                        <%} %>
                    <%} %></div>
                    <div class="st-update-result">
                        <form action="/students/update/<%= student._id %>/<%= interview._id %>" method="POST" >
                            <select name="result">
                                <option value="On Hold">On Hold</option>
                                <option value="Didn't Attempt">Didn't Attempt</option>
                                <option value="Pass">Pass</option>
                                <option value="Fail">Fail</option>
                            </select>
                            <input type="submit" value="Update Result">
                        </form>
                    </div>
                </div>
            </li>
        <% } %>
    </ul>
</div> */}
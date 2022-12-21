const Interview = require('../models/interview');
// const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
    try {
        let interview = await Interview.create({
            content: req.body.content,
            user: req.user._id
        });
        
        if(req.xhr) {
            return res.status(200).json({
                data: {
                    interview: interview
                },
                message: "Interview created!"
            });
        }

        req.flash('success', 'Interview published');
        return res.redirect('back');
    } catch (error) {
        req.flash('error', error);

        return;
    }
}

module.exports.destroy = async function(req, res) {
    try {
        let interview = await Interview.findById(req.params.id);
        // .id means converting the object id into string
        if(interview.user == interview.user.id) {
            interview.remove();
    
            // delete interview from students db
            // await Comment.deleteMany({post: req.params.id});

            if(req.xhr) {
                return res.status(200).json({
                    data: {
                        interview_id: req.params.id
                    },
                    message: "Interview deleted!"
                })
            }

            req.flash('success', 'Interview deleted!');
            return res.redirect('back');
        } else {
            req.flash('error', 'You cannot delete this interview!');

            return res.redirect('back');
        }
    } catch (error) {
        console.log('Error', error);
        return;
    }
}
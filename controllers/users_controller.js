const User = require('../models/user')

module.exports.signUp = function(req, res) {
    try {
        res.render('sign_up');
    } catch(error) {
        console.log('err', error);
        return;
    }
}

module.exports.signIn = function(req, res) {
    try {
        res.render('sign_in');
    } catch(error) {
        console.log('err', error);
        return;
    }
}

module.exports.create = function(req, res) {
    try {
        if(req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }
    
        User.findOne({email: req.body.email}, function(err, user) {
            if(err) {
                console.log('error in finding user in signing up');
                return;
            }
    
            if(!user) {
                User.create(req.body, function(err, user) {
                    if(err) {
                        console.log('error in finding user while signing up'); 
                        return;
                    }
    
                    return res.redirect('/users/sign-in')
                })
            } else {
                return res.redirect('back');
            }
        })
    } catch(error) {
        console.log(error);
        return;
    }
}


module.exports.createSession = function(req, res) {
    try {
        req.flash('success', 'Logged In Successfully');
        return res.redirect('/');
    } catch(error) {
        console.log('err', error);
        return;
    }
}


module.exports.destroySession = function(req, res) {
    try {
        req.logout(function(err) {
            if (err) { return next(err); }
            
            req.flash('success', 'Logged out!');
    
            res.redirect('/');
        });
    } catch(error) {
        console.log('err', error);
        return;
    }
}
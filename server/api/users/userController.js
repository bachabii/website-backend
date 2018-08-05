var User = require('./userModel');
var _ = require('lodash');
var signToken = require('../../auth/auth').signToken;

exports.params = function(req, res, next, id) {
    User.findById(id)
    .select('-password')
    .then(function(user) {
        if (!user) {
            next(new Error('No user with that id'));
        } else {
            req.user = user;
            next();
        }
    }, function(err) {
        next(err);
    });
};

exports.get = function(req, res, next) {
    User.find({})
        .select('-password')
        .then(function(users) {
            res.json(users);
        }, function(err) {
            next(err);
        });
};

exports.getOne = function(req, res, next) {
    res.json(req.user);
};

exports.put = function(req, res, next) {
    var user = req.user;

    var update = req.body;

    _.merge(user, update);

    _.forEach(Object.keys(update), item => {
        user.markModified(`${item}`);
    });

    user.save(function(err, saved) {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
};

exports.post = function(req, res, next) {
    var newUser = new User(req.body);

    newUser.save((err, user) => {
        if (err) {
            return next(err);
        }

        var token = signToken(user._id);
        res.json({token: token});
    });
};

exports.delete = function(req, res, next) {
    req.user.remove(function(err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};

exports.me = (req, res) => {
    res.json(req.user.toJson());
};

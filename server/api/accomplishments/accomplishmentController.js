var Accomplishment = require('./accomplishmentsModel');
var _ = require('lodash');

exports.params = (req, res, next, id) => {
    Accomplishment.findById(id)
        .then(accomplishment => {
            if (!accomplishment) {
                next(new Error('No accomplishment entry found with this id'));
            } else {
                req.accomplishment = accomplishment;
                next();
            }
        }, err => {
            next(err);
        });
};

exports.get = (req, res, next) => {
    Accomplishment.find({})
        .sort({'updatedAt': -1})
        .then(accomplishments => {
            res.json(accomplishments);
        }, err => {
            next(err);
        });
};

exports.getOne = (req, res, next) => {
    res.json(req.accomplishment);
};

exports.put = (req, res, next) => {
    var accomplishment = req.accomplishment;
    var update = req.body;

    _.merge(accomplishment, update);

    accomplishment.markModified('accomplishments');

    accomplishment.save((err, saved) => {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    });
};

exports.post = (req, res, next) => {
    var newAccomplishment = req.body;

    Accomplishment.create(newAccomplishment)
        .then(accomplishment => {
            res.json(accomplishment);
        }, err => {
            next(err);
        });
};

exports.delete = (req, res, next) => {
    req.accomplishment.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};

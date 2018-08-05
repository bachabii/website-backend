var Experience = require('./experienceModel');
var _ = require('lodash');

exports.params = (req, res, next, id) => {
    Experience.findById(id)
        .populate('accomplishments')
        .exec()
        .then(experience => {
            if (!experience) {
                next(new Error('No experience entry found with this id'));
            } else {
                req.experience = experience;
                next();
            }
        }, err => {
            next(err);
        });
};

exports.get = (req, res, next) => {
    Experience.find({})
        .populate('accomplishments')
        .exec()
        .then(experiences => {
            res.json(experiences)
        }, err => {
            next(err);
        });
};

exports.getOne = (req, res, next) => {
    res.json(req.experience);
};

exports.put = (req, res, next) => {
    var experience = req.experience;
    var update = req.body;

    _.merge(experience, update);

    _.forEach(Object.keys(update), item => {
        experience.markModified(`${item}`);
    });
    
    experience.save((err, saved) => {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    });
};

exports.post = (req, res, next) => {
    var newExperience = req.body;

    Experience.create(newExperience)
        .then(experience => {
            res.json(experience);
        }, err => {
            next(err);
        });
};

exports.delete = (req, res, next) => {
    req.experience.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};

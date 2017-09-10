var Skill = require('./skillsModel');
var _ = require('lodash');

exports.params = (req, res, next, id) => {
    Skill.findById(id)
        .then(skill => {
            if (!skill) {
                next(new Error('No skills entry found with that id'));
            } else {
                req.skill = skill;
                next();
            }
        }, err => {
            next(err);
        });
};

exports.get = (req, res, next) => {
    // TODO: Add Limit by 1 to the query after testing (maybe)
    // , {sort: {updated_at: -1}
    Skill.find({})
        .then(skills => {
            res.json(skills);
        }, err => {
            next(err);
        });
};

exports.getOne = (req, res, next) => {
    res.json(req.skill);
};

exports.put = (req, res, next) => {
    var skill = req.skill;
    var update = req.body;

    _.merge(skill, update);

    skill.save((err, saved) => {
        if(err) {
            next(err);
        } else {
            res.json(saved);
        }
    });
};

exports.post = (req, res, next) => {
    var newSkill = req.body;

    Skill.create(newSkill)
        .then(skill => {
            res.json(skill);
        }, err => {
            next(err);
        });
};

exports.delete = (req, res, next) => {
    req.skill.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};

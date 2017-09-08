var _ = require('lodash');
var Skill = require('../skills/skillsModel');
var Experience = require('../experience/experienceModel');

var resume = {};

exports.get = (req, res, next) => {
    Skill.find({})
        .then(skills => {
            resume.skills = skills[0];
        }, err => {
            next(err);
        });
    Experience.find({})
        .populate('accomplishments')
        .exec()
        .then(experiences => {
            resume.experience = experiences;
            res.json(resume);
        }, err => {
            next(err);
        });
};

var _ = require('lodash');
var Skill = require('../skills/skillsModel');
var Experience = require('../experience/experienceModel');

var resume = {};

exports.get = (req, res, next) => {
    Skill.find({}, {_id: 0, __v: 0, updatedAt: 0, createdAt: 0})
        .lean()
        .then(skills => {
            resume.skills = skills[0];
        }, err => {
            next(err);
        });
    Experience.find({}, {_id: 0, __v: 0, updatedAt: 0, createdAt: 0})
        .populate('accomplishments', {_id: 0, __v: 0, updatedAt: 0, createdAt: 0})
        .lean()
        .exec()
        .then(experiences => {
            resume.experience = experiences;
            res.json(resume);
        }, err => {
            next(err);
        });
};

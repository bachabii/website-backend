var _ = require('lodash');
var Skill = require('../skills/skillsModel');
var Experience = require('../experience/experienceModel');
var Education = require('../education/educationModel');

var resume = {};

exports.get = (req, res, next) => {
    Skill.find({}, {_id: 0, __v: 0, updatedAt: 0, createdAt: 0})
        .lean()
        .then(skills => {
          var skill = skills[0];
            _.merge(resume, {skill});

            Experience.find({}, {_id: 0, __v: 0, updatedAt: 0, createdAt: 0})
                .populate('accomplishments', {_id: 0, __v: 0, updatedAt: 0, createdAt: 0})
                .lean()
                .exec()
                .then(exps => {
                    var experiences = [];
                    _.forEach(exps, exp => {
                      exp.accomplishments = exp.accomplishments.accomplishments;
                      experiences.push(exp);
                    });
                    _.merge(resume, {experiences});

                    Education.find({}, {_id: 0, __v: 0, updatedAt: 0, createdAt: 0})
                        .then(edus => {
                            var educations = [];
                            _.forEach(edus, edu => {
                                educations.push(edu);
                            });
                            _.merge(resume, {educations});
                            res.json(resume);
                        }, err => {
                          next(err);
                        });
                }, err => {
                    next(err);
                });
        }, err => {
            next(err);
        });


};

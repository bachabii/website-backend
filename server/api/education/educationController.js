var Education = require('./educationModel');
var _ = require('lodash');

exports.params = (req, res, next, id) => {
  Education.findById(id)
    .then(education => {
      if (!education) {
        next(new Error('No education record found with this id'));
      } else {
        req.education = education;
        next();
      }
    }, err => {
      next(err);
    });
};

exports.get = (req, res, next) => {
  Education.find({})
    .then(educations => {
      res.json(educations);
    }, err => {
      next(err);
    });
};

exports.getOne = (req, res, next) => {
  res.json(req.education);
};

exports.post = (req, res, next) => {
  var newEducation = req.body;

  Education.create(newEducation)
    .then(education => {
      res.json(education);
    }, err => {
      next(err);
    });
};

exports.put = (req, res, next) => {
  var education = req.education;
  var update = req.body;

  _.merge(education, update);

  _.forEach(Object.keys(update), item => {
    education.markModified(`${item}`);
  });

  education.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.delete = (req, res, next) => {
  req.education.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};

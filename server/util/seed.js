var User = require('../api/users/userModel');
var Accomplishment = require('../api/accomplishments/accomplishmentsModel');
var Experience = require('../api/experience/experienceModel');
var Skill = require('../api/skills/skillsModel');
var _ = require('lodash');
var logger = require('./logger');

logger.log('Seeding the Database');

var users = [
    {username: 'Jimmylo', password: 'test'},
    {username: 'Xoko', password: 'test'},
    {username: 'katamon', password: 'test'}
];

var accomplishments = [
    {
        accomplishments: [
            "Developed code",
            "Developed automation",
            "Participated in code reviews"
        ]
    },
    {
        accomplishments: [
            "Developed test code",
            "Reviewed test cases"
        ]
    }
];

var experiences = [
    {
        position: 'Software Engineer',
        company: 'Fireeye',
        begin: '08/2015',
        end: 'Present'
    },
    {
        position: 'SDET',
        company: 'FINRA',
        begin: '07/2013',
        end: '07/2015'
    }
];

var skills = [
    {
        languages: {
            proficient: ['Python', 'Java', 'JavaScript'],
            familiar: ['React', 'Redux']
        },
        software: {
            database: ['NoSql', 'Postgres', 'Oracle'],
            platforms: ['Windows', 'OS X', 'Linux']
        }
    }
];

var createDoc = (model, doc) => {
    return new Promise((resolve, reject) => {
        new model(doc).save((err, saved) => {
            return err ? reject(err) : resolve(saved);
        });
    });
};

var cleanDB = () => {
    logger.log('... cleaning the DB');
    var cleanPromises = [User, Accomplishment, Experience, Skill]
        .map(model => {
            return model.remove().exec();
        });
    return Promise.all(cleanPromises);
};

var createUsers = data => {
    var promises = users.map(user => {
        return createDoc(User, user);
    });

    return Promise.all(promises)
        .then(users => {
            return _.merge({users: users}, data || {});
        });
};

var createAccomplishments = data => {
    var promises = accomplishments.map(accomplishment => {
        return createDoc(Accomplishment, accomplishment);
    });

    return Promise.all(promises)
        .then(accomplishments => {
            return _.merge({accomplishments: accomplishments}, data || {});
        });
};

var createSkills = data => {
    var promises = skills.map(skill => {
        return createDoc(Skill, skill);
    });

    return Promise.all(promises)
        .then(skills => {
            return _.merge({skills: skills}, data || {});
        });
};

var createExperiences = data => {
    var addAccomplishments = (experience, accomplishment) => {
        experience.accomplishments = accomplishment;

        return new Promise((resolve, reject) => {
            experience.save((err, saved) => {
                return err ? reject(err) : resolve(saved);
            });
        });
    };

    var newExperiences = experiences.map((experience, i) => {
        experience.accomplishments = data.accomplishments[i]._id;
        return createDoc(Experience, experience);
    });

    return Promise.all(newExperiences)
        .then(savedExperiences => {
            return Promise.all(savedExperiences.map((experience, i) => {
                return addAccomplishments(experience, data.accomplishments[i]);
            }));
        })
        .then(() => {
            return 'Seeded the DB with Users, Skills, Experiences, and Accomplishments';
        });
};

cleanDB()
    .then(createUsers)
    .then(createSkills)
    .then(createAccomplishments)
    .then(createExperiences)
    .then(logger.log.bind(logger))
    .catch(logger.log.bind(logger));

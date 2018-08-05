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
            "Participated in the Software Development Life Cycle process including requirements gathering, design, coding, testing, code reviews, debugging and maintenance",
            "Developed reusable, generic web components using Polymer 2 that utilize event dispatching and bi-directional data binding",
            "Contributed to the development effort to transition our product UI from Backbone to Polymer",
            "Developed feature to intake company signed installation packages for a new platform and transform the package for the customer to download upon request using Node.js",
            "Developed new API routes using Node.js for new features",
            "Developed local API routes in Node.js to generate test data for developer testing",
            "Developed Python framework tool to dynamically generate fully comprehensive result files for validating new audit analysis product feature which reduced file generation time from over 1 hour (manual) to less than 5 minutes (automated)",
            "Automated backend and frontend test cases using Python framework and Selenium"
        ]
    },
    {
        accomplishments: [
            "Automated product test cases using in-house automation framework",
            "Enhanced in-house automation framework to record test results in JIRA using Zephyr API (ZAPI)",
            "Developed, implemented, and continuously improved a new hire boot camp training program",
            "Coordinated testing activities, communicated testing status to management, and managed up to 8 testers across 3 company initiatives",
            "Assisted in the planning process for project roadmaps, determination of priority lists, and calculation of estimated level of efforts for all projects",
            "Product Owner for BETA, the in-house test automation framework",
            "Tested enhancements and migration of multiple projects from traditional RDBMS to AWS implementation",
            "Oversaw the training of FINRA QC procedures, tools, and best practices for newly established Chicago based QC team"
        ]
    }
];

var experiences = [
    {
        position: 'Software Development Engineer',
        company: 'Fireeye',
        begin: '08/2015',
        end: 'Present'
    },
    {
        position: 'Associate Tester II',
        company: 'FINRA',
        begin: '01/2014',
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

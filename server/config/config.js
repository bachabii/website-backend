var _ = require('lodash');

// default config object for api
var config = {
    dev: 'development',
    test: 'testing',
    prod: 'production',
    port: process.env.PORT || 3030,
    expireTime: 24 * 60, //1 day
    secrets: {
        jwt: process.env.JWT || 'gumball'
    }
};

// check to see if NODE_ENV was set, if not, set it to dev as default
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

//set config.env to whatever NODE_ENV is
config.env = process.env.NODE_ENV;

var envConfig;

try {
    envConfig = require('./' + config.env);

    envConfig = envConfig || {};
} catch(e) {
    envConfig = {};
}

module.exports = _.merge(config, envConfig);

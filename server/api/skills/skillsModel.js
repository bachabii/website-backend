var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkillSchema = new Schema({
    languages: {
        proficient: [],
        familiar: []
    },
    software: {
        database: [],
        platforms: []
    }
});

module.exports = mongoose.model('skill', SkillSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkillSchema = new Schema({
    languages: {
        proficient: [String],
        familiar: [String]
    },
    software: {
        database: [String],
        platforms: [String]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('skill', SkillSchema);

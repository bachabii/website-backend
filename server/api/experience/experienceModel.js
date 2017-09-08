var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExperienceSchema = new Schema({
    position: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    begin: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    accomplishments: {
        type: Schema.Types.ObjectId,
        ref: 'accomplishment'
    }
});

module.exports = mongoose.model('experience', ExperienceSchema);

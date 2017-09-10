var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccomplishmentSchema = new Schema({
    accomplishments: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('accomplishment', AccomplishmentSchema);

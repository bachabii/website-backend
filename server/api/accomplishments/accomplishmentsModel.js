var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccomplishmentSchema = new Schema({
    accomplishments: {
        type: [],
        required: true
    },
    timestamps: true
});

module.exports = mongoose.model('accomplishment', AccomplishmentSchema);

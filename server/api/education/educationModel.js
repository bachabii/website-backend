var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EducationSchema = new Schema({
    school: {
      type: String,
      required: true
    },
    major: {
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
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('education', EducationSchema);

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: Number },
    businessName: { type: String },
    businessType: { type: String },
    businessUrl: { type: String }
}, {
    versionKey: false
});


module.exports = mongoose.model('audit', schema);

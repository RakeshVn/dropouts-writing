const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: Number },
    query: { type: String },
    accepted: { type: String, default: false },
}, {
    versionKey: false
});


module.exports = mongoose.model('query', schema);

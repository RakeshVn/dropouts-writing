const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    mobile: { type: Number },
    dob: { type: String },
    gender: { type: String },
    address: { type: String },
    introduction: { type: String },
    Briefly: { type: String },
    professionExperience: { type: String },
    companyName: { type: String },
    position: { type: String },
    favoriteBook: { type: String },
    q1: { type: String }
}, {
    versionKey: false
});


module.exports = mongoose.model('writer', schema);

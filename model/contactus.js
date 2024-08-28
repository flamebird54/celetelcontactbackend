const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    phone: String,
    projectType: String
}, {
    timestamps: true
});

const contactUs = mongoose.model('ContactUs', contactUsSchema);

export default contactUs;

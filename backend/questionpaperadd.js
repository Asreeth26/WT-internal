const mongoose = require("mongoose");

mongoose.connect('mongodb://0.0.0.0:27017/Project')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const newSchema = new mongoose.Schema({
    file: Buffer,
    section: String,
    subject: String,
    pickedBy: {
        type: String,
        default: null
    }
});

const question = mongoose.model("question", newSchema); // Renamed the collection to "files"

module.exports = question;

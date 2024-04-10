const mongoose = require("mongoose");

mongoose.connect('mongodb://0.0.0.0:27017/Project')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const newSchema = new mongoose.Schema({
    file: {
        data: Buffer, // Buffer to store binary data of the PDF file
        contentType: String // Mime type of the file (e.g., application/pdf)
    },
    section: String,
    subject: String
});

const question = mongoose.model("question", newSchema); // Renamed the collection to "files"

module.exports = question;

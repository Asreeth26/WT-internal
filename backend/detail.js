const mongoose = require("mongoose");

mongoose.connect('mongodb://0.0.0.0:27017/Project')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("users", userSchema);

module.exports = User;

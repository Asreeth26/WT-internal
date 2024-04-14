const mongoose=require("mongoose")
mongoose.connect('mongodb://0.0.0.0:27017/Project')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const studentMarksSchema = new mongoose.Schema({
    marksData: {
        type: Object,
        required: true
    }
  });
  
  const StudentMarks = mongoose.model('marks', studentMarksSchema);
  

module.exports=StudentMarks
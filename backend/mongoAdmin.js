const mongoose=require("mongoose")
mongoose.connect('mongodb://0.0.0.0:27017/Project')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection1 = mongoose.model("admin",newSchema)

module.exports=collection1
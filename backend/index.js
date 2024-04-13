const express = require("express")

const collection = require("./mongo")
const question = require("./questionpaperadd")
const collection1 = require("./mongoAdmin")
const collection2 = require("./mongoHOD")


const session = require("express-session")
const multer = require('multer');
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(session({
    secret:"secret",
    cookie:{maxAge:300000},
    saveUninitialized:false
}))

app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email,password:password})

        if(check){
            req.session.mail = email;
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            await collection.insertMany([data])
            console.log("added")
            res.json("notexist")
            
        }

    }
    catch(e){
        res.json("fail")
    }

})

app.post("/admin",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection1.findOne({email:email,password:password})

        if(check){
            req.session.mail = email;
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})

app.post("/HOD",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection2.findOne({email:email,password:password})

        if(check){
            req.session.mail = email;
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.get('/home', (req, res) => {
    const userEmail = req.query.email;
    collection.findOne({ email: userEmail })
    .then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    })
    .catch(err => {
        console.error('Error retrieving user:', err);
        res.status(500).send('Internal Server Error');
    });
});


const upload = multer();
app.post('/questionpaper', upload.single('file'), async (req, res) => {
    try {
        const { section, subject } = req.body;
        const fileBuffer = req.file.buffer; // Access the uploaded file buffer from the request

        const filter = { section }; // Define the filter to find the document by section
        const update = {
            file: fileBuffer,
            section,
            subject
        };

        // Update existing document or insert new document if not found (upsert: true)
        await question.findOneAndUpdate(filter, update, { upsert: true });

        res.status(200).send('File uploaded successfully');
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Failed to upload file');
    }
});

app.get('/questionpaper', async (req, res) => {
    try {
        // Retrieve all documents from the collection
        const files = await question.find({});

        // Send the retrieved files as JSON response to the client
        res.status(200).json(files);
    } catch (error) {
        console.error('Error retrieving files:', error);
        res.status(500).send('Failed to retrieve files');
    }
});

app.post('/update-pick', async (req, res) => {
    try {
        // Find all documents in the collection
        question.updateMany({},
            {$set : {"pick":false}}
        ) 

        res.status(200).send('Records updated successfully');
    } catch (error) {
        console.error('Error updating records:', error);
        res.status(500).send('Failed to update records');
    }
});


app.post('/selectedfile', async (req, res) => {
    const selectedFile = req.body.selectedFile;
    console.log('Selected File received:', selectedFile);
    
    try {
        // Search for a document in the question collection with the matching section
        const question1 = await question.findOne({ section: selectedFile }); // Using 'question' instead of 'Question'
        
        if (question1) {
            // If a matching document is found, update the pickedBy field
            question1.pickedBy = true; // Assuming HOD is picking the file
            await question1.save();
            console.log('Question updated:', question1);
            res.status(200).send('Question updated successfully');
        } else {
            console.log('No matching question found');
            res.status(404).send('No matching question found');
        }
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).send('Failed to update question');
    }
});

app.get('/questionpaper/isclicked', async(req,res)=>{
    try {
        // Retrieve all documents from the collection where pickedBy is true
        const files = await question.find({ pickedBy: true });

        // Send the retrieved files as JSON response to the client
        res.status(200).json(files);
    } catch (error) {
        console.error('Error retrieving files:', error);
        res.status(500).send('Failed to retrieve files');
    }
})

app.listen(8000,()=>{
    console.log("port connected");
})

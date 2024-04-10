const express = require("express")
const collection = require("./mongo")
const session = require("express-session")

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

app.get('/home', (req, res) => {
   
    collection.find({})
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.error('Error retrieving users:', err);
            res.status(500).send('Internal Server Error');
        });
});

app.listen(8000,()=>{
    console.log("port connected");
})

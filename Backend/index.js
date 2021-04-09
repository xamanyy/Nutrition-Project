const express = require('express');
const mongo = require('mongoose');
const cors = require('cors');

const app = express();

//BE PERPARE FOR DATA MONGODB and it Create Proper Readble Object it is act as a Middleware

app.use(express.json());



//Middleware between Backend and Frontend

app.use(cors());



//SERVER CREATED
app.listen(8000)

app.get('/demo',(req,res)=>{
    console.log("Success")
    res.send("Connected")
})



//MONGO DB CONNECTION

mongo.connect("mongodb://127.0.0.1:27017/Nutrition",{
  useNewUrlParser:true,

  useUnifiedTopology:true
})
.then(() =>{
    console.log("conected")
})

//SCHEMA FOR DATABASE

const f_Schema = mongo.Schema({
    name:String,
    calories:Number,
    protiens:Number,
    carbs:Number,
    fats:Number,
    fibre:Number,
    sugar:Number,
    weight:Number

})

//Making Model to know Collection of MongoDB to follow this Schema

const f_Model = new mongo.model("foods",f_Schema);


//Creation of Route for Storing data by Client and Store in the database

app.post('/f_Create',(req,res)=>{

    const food = req.body;

    let f_object = new f_Model(food);

    f_object.save().then(()=>{

     res.send({status:"Food Stored Successfully"});
    })
    
})

// Creating Route to fetch the data from MongoDB

app.get('/food',async (req,res)=>{
 
    console.log("Success")

    let food_item =await f_Model.find();

    res.send({food_item:food_item});

})


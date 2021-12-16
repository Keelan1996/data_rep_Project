const express = require('express');
const app = express();
const mongoose = require('mongoose'); // mongoose for databas
const cors = require("cors");

const FoodModel = require("./models/Food");


// this is used as a bodyparser now with new update 
app.use(express.urlencoded({extended: false})); 
app.use(express.json());

app.use(cors());

mongoose.connect("mongodb+srv://admin:admin@cluster0.7dde6.mongodb.net/food?retryWrites=true&w=majority", {

    useNewUrlParser:true,

});

app.post("/insert", async (req, res)=>{

    const itemName = req.body.itemName
    const amount = req.body.amount

    const food = new FoodModel({ foodName: itemName, amount: amount});

    try{

        await food.save();
        res.send("inserted data");
    }catch(err){

        console.log(err);
    }

});

app.get("/read", async (req, res)=>{

    FoodModel.find({}, (err,result)=>{
      if(err) {
         
        res.send(err);

      }

      res.send(result);

    })

});

app.put("/update", async (req, res)=>{

    const newItem = req.body.newItem
    const id = req.body.id

   

    try{
       
       await FoodModel.findById(id,(err, updatedItem)=>{

            updatedItem.foodName = newItem;
            updatedItem.save();
            res.send("Update");
        })
        
    }catch(err){

        console.log(err);
    }

});


app.delete("/delete/:id", async (req, res)=>{

    const id = req.params.id;
   

    await FoodModel.findByIdAndRemove(id).exec();
    res.send("deleted");

});


app.listen(3001, () =>{

    console.log("Server running on port 3001...")

});
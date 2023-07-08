const dotenv = require("dotenv");
dotenv.config();
const mongoose = require ('mongoose');

const mongoURI = process.env.DATABASE

mongoose.set('strictQuery', true);
const mongoDB = async()=>{
    mongoose.set('strictQuery', true);
    await mongoose.connect(mongoURI , {useNewUrlParser: true, useUnifiedTopology: true } , async(err , result) =>{
        if(err){
            console.log("---" , err);
        }
        else{
            // console.log("Connected");
            const fetched_data = await mongoose.connection.db.collection("gofoodmern");
            fetched_data.find({}).toArray(async function(err , data){

                const food_Category = await mongoose.connection.db.collection("food_Category");
                food_Category.find({}).toArray(function(err , catData){

                    if(err){
                    console.log(err);
                    }
                    else{
                        global.food_items = data;
                        global.food_Category = catData;
                    }

                })
                if(err){
                    console.log(err);
                }
                else{
                    global.food_items = data;
                    
                }
            })
        }

    });
}

module.exports = mongoDB;
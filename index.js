const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoDB = require("./db")
mongoDB();

app.use((req, res , next) =>{
    res.setHeader("Access-Control-Allow-Origin" , "https://foodie-mernapp.onrender.com");
    res.header(
        "Access-Control-Allow-Headers" ,
        "Origin , X-Requested-With , Content-Type , Accept"
    );
    next();
})
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(express.json());
app.use('/api' , require('./Routes/CreateUser'));
app.use('/api' , require('./Routes/DisplayData'));
app.use('/api' , require('./Routes/OrderData'));
app.listen(port, () => {
    console.log(`Foodie is running on port ${port}`)
})

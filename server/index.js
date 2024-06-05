// express application and setup functions
const express =require("express");
const app = express();
const baseQuery = "/api/";
const path = require("path");
const {client} = require("./db");

app.use(express.json())
client.connect();

app.get(baseQuery, (req,res)=>{
    res.json({
        success:true
    })
})

app.use(baseQuery+"customers", require("./customers"));
app.use(baseQuery+"restaurants", require("./restaurants"));
app.use(baseQuery+"reservations", require("./reservations"));


app.listen(8080, ()=>{
    console.log("App is Running at port 8080")
})
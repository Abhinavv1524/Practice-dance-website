const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDetails');
}
app.use(express.urlencoded());
const port = 8000;

//creating mongoose schema
var contactDetails= new mongoose.Schema({
    text:String,
    phone:String,
    email:String,
    age:String
});
var Contact = mongoose.model("Contact",contactDetails);

app.use("/static",express.static("static"));//serving static file
app.set("view engine","pug");//setting view engine as pug
app.set("views",path.join(__dirname,"views"));//set the view directory

app.get("/",(req,res)=>{
    res.status(200).render("home.pug");
})
app.get("/contact",(req,res)=>{
    res.status(200).render("contact.pug");
})
app.post("/contact",(req,res)=>{ 
    insert = req.body;
    console.log(insert);
    var mydata = new Contact(insert);
    mydata.save().then(()=>{
        res.send("response have been submitted")
    }).catch(()=>{
        res.status(404).send("item not submitted")
    });
    // res.status(200).render("contact.pug");
})
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})
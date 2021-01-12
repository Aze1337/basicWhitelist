const express = require('express')
const app = express()
var bodyParser = require("body-parser")
const mongoose = require('mongoose');




app.use(bodyParser.json())


mongoose.connect('mongodb://localhost/basic_whitelist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


var userSchema = mongoose.Schema({
  username: String,
  password: String,
});


app.get('/', function (req, res) {
  res.send('Hello, for all HUmankind')
})
 



// POST /api/v1/signup
app.post("/api/v1/signup", function(req,res){
  if(req.body.username.length == 0 || req.body.password.length == null){
    res.status(400).send({error:"username/password cannot be empty"})
  }else{
    
  }
})



app.listen(3000)
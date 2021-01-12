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

var userModel = mongoose.model('accounts', userSchema)


app.get('/', function (req, res) {
  res.send('Hello, for all HUmankind')
})
 



// POST /api/v1/signup
app.post("/api/v1/signup", function(req,res){
  if(req.body.username.length == 0 || req.body.password.length == 0){
    res.status(400).send({error:"username/password cannot be empty"})
  }else{
    if(req.body.username.length < 4){
      res.status(400).send({erorr:"Your username must be atleast than 4 characters"})
    }else if(req.body.password.length < 8){
      res.status(400).send({error:"Your username must have a minimum of 8 characters"})
    }else{
      userModel.findOne({username:req.body.username}, function(err,doc){
        if(!err && doc == null){
          var account = new userModel({
            username:req.body.username,
            password:req.body.password
          })
          account.save()
          res.status(201).send({success:"Created account!"})
        }else{
          res.status(400).send({error:"Username is already used"})
        }
      })
    }
  }
})



app.listen(3000)
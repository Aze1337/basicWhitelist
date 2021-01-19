const express = require('express')
const app = express()
var bodyParser = require("body-parser")
const mongoose = require('mongoose');
const utils = require("./utils")



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
  auth:String
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
      res.status(400).send({error:"Your username must be atleast than 4 characters"})
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

// POST /api/v1/login
app.post("/api/v1/login", function(req,res){
  if(req.body.username.length == 0 || req.body.password.length == 0){
    res.status(400).send({error:"No empty fields"})
  }else{
    userModel.findOne({username:req.body.username}, function(err,doc){
      if(err || doc == null){
        res.status(404).send({error:"Username doesn't exist"})
      }else{
        if(doc.username == req.body.username && doc.password == req.body.password){
          res.status(200).send({success:"Successfully logged in"})
          doc.overwrite({
            username:doc.username,
            password:doc.password,
            auth:utils.generateCookie()
          })
          doc.save()
        }else{
          res.status(404).send({error:"Wrong username/password"})
        }
      }
    })
  }
})


// DELETE /api/v1/removeUser
app.delete("/api/v1/removeUser", function(req,res){
  if(req.body.username.length == 0){
    res.status(400).send({error:"Cannot delete empty username..."})
  }else{
    userModel.deleteOne({username:req.body.username}, function(err, doc){
      if(err || doc.deletedCount == 0){
        res.status(404).send({error:"Cannot delete account"})
      }else{
        res.status(200).send({success:"Deleted account!"})
      }
    })
  }
})

app.listen(3000)
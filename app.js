const express = require('express')
const app = express()
var bodyParser = require("body-parser")
const bcrypt = require('bcrypt');
const utils = require("./utils")
const mongoDB = require("./mongoDB")




// this pw is used to create an account and delete one from the whitelist system
var globalApiPassword = "randompwhaha123@@";
//salt rounds bcrypt #10
const saltRounds = 10;



app.use(bodyParser.json())




app.get('/', function (req, res) {
  res.send('Hello, for all HUmankind')
})
 



// POST /api/v1/signup
app.post("/api/v1/signup", function(req,res){
  if(req.headers.key != null && req.headers.key == globalApiPassword){
    if(req.body.username.length == 0 || req.body.password.length == 0){
      res.status(400).send({error:"username/password cannot be empty"})
    }else{
      if(req.body.username.length < 4){
        res.status(400).send({error:"Your username must be atleast than 4 characters"})
      }else if(req.body.password.length < 8){
        res.status(400).send({error:"Your username must have a minimum of 8 characters"})
      }else{
        mongoDB.userModel.findOne({username:req.body.username}, function(err,doc){

          bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
              if(!err && doc == null){
                var account = new mongoDB.userModel({
                  username:req.body.username,
                  password:hash,
                  auth:""
                })
                account.save()
                res.status(201).send({success:"Created account!"})
              }else{
                res.status(400).send({error:"Username is already used"})
              }
            });
            });
        })
      }
    }
  }else{
    res.status(401).send({error:"You do not have permission to use this api."})
  }
})

// POST /api/v1/login
app.post("/api/v1/login", function(req,res){
  if(req.body.username.length == 0 || req.body.password.length == 0){
    res.status(400).send({error:"No empty fields"})
  }else{
    mongoDB.userModel.findOne({username:req.body.username}, function(err,doc){
      if(err || doc == null){
        res.status(404).send({error:"Username doesn't exist"})
      }else{
        bcrypt.compare(req.body.password, doc.password, function(err, result) {
          if(doc.username == req.body.username && result == true){
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
        });
      }
    })
  }
})


// DELETE /api/v1/removeUser
app.delete("/api/v1/removeUser", function(req,res){
  if(req.headers.key != null && req.headers.key == globalApiPassword){
    if(req.body.username.length == 0){
      res.status(400).send({error:"Cannot delete empty username..."})
    }else{
      mongoDB.userModel.deleteOne({username:req.body.username}, function(err, doc){
        if(err || doc.deletedCount == 0){
          res.status(404).send({error:"Cannot delete account"})
        }else{
          res.status(200).send({success:"Deleted account!"})
        }
      })
    }
  }else{
    res.status(401).send({error:"You do not have permission to use this api."})
  }
})

app.listen(3000)
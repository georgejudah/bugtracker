require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
const saltRounds = 10;
// const md5  = require("md5")
// const encrypt = require('mongoose-encryption')
const port = 3000
let cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//DB Connection and Schema
mongoose.connect("mongodb://localhost:27017/bugsDB", { useNewUrlParser: true });
//schema
const usersSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  admin: Boolean
})
//mongoose encryption of password
// usersSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']})

const bugsSchema = new mongoose.Schema({
  title: String,
  description: String,
  time: String,
  date: String,
  assignee: String
},
  { strict: false })

const User = mongoose.model("User", usersSchema)
//user request handler routes **THE START**
app.route("/users")
  .post((req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      console.log("server post request")
      const user = new User({
        name: req.body.name,
        password: hash,
        email: req.body.email,
        admin: req.body.admin
      });
      user.save((err) => {
        if (!err) {
          res.status(200).send("successfully added a new User");
        } else {
          res.send(err);
        }
      });
    });

  })



app.get('isUserAuth', (req,res)=>{
  res.send("you are authenticated")
})
app.route("/login")
  .post((req, res) => {
    const email = req.body.username;
    const password = (req.body.pass);
    console.log(email)
    console.log(password)
    User.findOne({ email: email }, (err, foundUser) => {
      if (err) {
        console.log(err);
      }
      else {
        if (foundUser) {
            bcrypt.compare(password, foundUser.password, function(err, result) {
    if( result === true){
      const token=jwt.sign(
        {name:foundUser.name,
        _id: foundUser._id,
       email:foundUser.email},
        process.env.SECRET_JWT,{
          expiresIn: 300}
          
      )
      res.json({auth:true, token:token})
      // res.send('successfully logged in '+token)
    }
})
        }
      }
    })
  })
//user request handler routes **THE END**


//bugs request handler router **THE START**
//get time from the client side not from server side
const Bug = mongoose.model("Bug", bugsSchema)
app.route("/bugs")
  .get((req, res) => {
    Bug.find((err, result) => {
      if (!err) {
        res.send(result);
      } else {
        res.send(err);
      }
    });
  })
  .post((req, res) => {
    console.log(req.body)
    const bug = new Bug({
      title: req.body.title,
      description: req.body.description,
      time: req.body.time,
      date: req.body.date,
      assignee: req.body.assignee
    });
    bug.save((err) => {
      if (!err) {
        res.status(200).send("successfully added a new bug");
      } else {
        res.send(err);
      }
    });
  })

//route using request parameter
app.route("/bugs/:bugTitle")
  .get((req, res) => {
    Bug.findOne({ title: req.params.bugTitle }, (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send("No bugs matching that title was found");
      }
    })
  })
  .put((req, res) => {
    Bug.updateOne(
      { _id: req.params.bugTitle },
      { title: req.body.title, description: req.body.description, assignee: req.body.assignee, date: req.body.date, time: req.body.time },
      (err) => {
        if (!err) {
          res.send("successfully updated the bug");
          console.log(res)
        } else {
          res.send(err);
        }
      }

    )
  })
  .delete((req, res) => {
    Bug.deleteOne(
      { _id: req.params.bugTitle },
      (err) => {
        if (!err) {
          res.send("successfully deleted the corresponding bug")
        } else {
          res.send(err)
        }
      }
    )
  });

//route using query
app.get('/bug', (req, res) => {
  const { title, description, assignee } = req.query;
  if (title) {
    Bug.findOne({ title: title }, (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send("No bugs matching that title was found");
      }
    })
  }

  if (description) {
    Bug.findOne({ description: description }, (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send("No bugs matching that description was found");
      }
    })
  }

  if (assignee) {
    Bug.find({ assignee: assignee }, (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send("No bugs matching that assignee was found");
      }
    })
  }
});
//bugs request handler router **THE END**








//reference
// bug.save();

// Bug.find(function (err, bugs) {
//   if (err) {
//     console.log(err);
//   } else {
//     // mongoose.connection.close()
//     console.log(bugs)
//   }
// })

// Bug.updateOne({_id:"61c992f676fbc36504e7370e"}, {time: time}, function(err){
//   if (err){
//     console.log(err);
//   }
//   else{
//     console.log("Successfully updated the document")
//   }
// })

// Bug.deleteOne({_id: "61c992f676fbc36504e7370e"}, function(err){
//   if (err){
//         console.log(err);
//       }
//       else{
//         console.log("Successfully deleted the document")
//       }
// })
// const user = new User(
//   {
//     name: "Judah",
//     password: "judah123",
//     email: "georgejudah5@gmail.com",
//     admin: true
//   }
// )
// // user.save();



// const bug = new Bug({
//   title: "Screen Freeze",
//   description: "aaabbbbccc",
//   time: time,
//   date: today
// })


// const verifyJWT = (req,res,next)=>{
//   const token = req.headers["x-acess-tokes"]

//   if(!token){
//     res.send("Yo we need a token, please give to us nxt time")
//   }else{
//     jwt.verify(token, process.env.SECRET_JWT, (err, decoded)=>{
//       if(err){
//         res.json({auth: false, message: "You failed to authenticate"})
//       }
//       else{
//         req.userId = decoded.id;
//         next();
//       }
//     })
//   }
// }
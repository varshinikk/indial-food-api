import mongoose from 'mongoose'
import userSchema from '../models/signupModel'
import bcrypt from 'bcrypt';
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var jwt = require('jsonwebtoken')

const User = mongoose.model('User', userSchema)

exports.getUser = (req, res) => {
  User.find({}, (error, data) => {
    if (error) { res.json(error) }
    res.json(data)
  })
}
exports.signup = function (req, res) {
  // console.log(req)
  const reg_email = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]$/;
  const reg_mob = /^[0-9]{10}$/;
  const reg_pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/;
  if (!reg_pwd.test(req.body.password)) {
    res.send('password is invalid');
  }
  if (!reg_mob.test(req.body.phone_number)) {
    res.send('Mobile number is invalid');
  }
  if (reg_email.test(req.body.email)) {
    // console.log(req.body);
    User.find({ email: req.body.email }, function (err, data) {
      if (data != null && data != '') {
        res.send('User already exists');
      }
      else {
        var user = new User(req.body);
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            user.save(function (err, data) {
              if (err)
                res.send(err.message);
              // res.json(data);
              res.json("user succesfully created");
            })
          })
        })
      }
    });
  }
  else {
    res.send('Email is invalid');
  }
};

exports.signin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.send("Email does not exist")
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        res.send("wrong password")
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'secret',
      )
      res.status(200).json({ token: token, userId: loadedUser._id.toString() })
    })

    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);

    });
}
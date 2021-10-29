const mongoose = require('mongoose');
const express = require('express');
const app = express();
const userRoutes = express.Router();

//MongoDB URL in docker-compose file
const dbHost = 'mongodb://database/devopsTraining';

//Connect to mongodb
mongoose.connect(dbHost).catch(error => handleError(error));

// //New schema for mongoose
// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number
// });

// //New model for mongoose
// const User = mongoose.model('User', userSchema);

// // Get api listings
// userRoutes.get('/', (req,res) => {
//   res.send('Api get works');
// });

// // Get all users
// userRoutes.get('/users', (req,res) => {
//   User.find({}, (err, users) => {
//     if (err) res.status(500).send(error)

//     res.status(200).json(users);
//   });
// });

// //Get one user
// userRoutes.get('/users/:id',(req,res) => {
//     User.findById(req.param.id, (err, users) => {
//         if (err) res.status(500).send(error)

//         res.status(200).json(users);
//     });
// });

// //Create user
// userRoutes.post('/users', (req,res) => {
//   let user = new User({
//       name: req.body.name,
//       age: req.body.age
//   });

//   user.save(error => {
//       if (error) res.status(500).send(error);

//       res.status(201).json({
//           message: 'User created successfully'
//       });
//   });

// });

let User = require('../model/User');

// api to add user
userRoutes.route('/add').post(function (req, res) {
  let user = new User(req.body);
  user.save()
  .then(user => {
    res.status(200).json({'status': 'success','mssg': 'user added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get users
userRoutes.route('/').get(function (req, res) {
  User.find(function (err, users){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','users': users});
    }
  });
});

// api to edit user
userRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','user': user});
    }
  });
});

// api to update route
userRoutes.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function(err, user) {
    if (!user){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        user.name = req.body.name;
        user.email = req.body.email;
        user.phone_number = req.body.phone_number;

        user.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
userRoutes.route('/delete/:id').get(function (req, res) {
  User.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = userRoutes;
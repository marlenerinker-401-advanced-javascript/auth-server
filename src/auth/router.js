'use strict';

// Module that contains the routes and the callback functions for the routes

/**
 * Router module
 * @module router
 */


 const express = require('express');
 const router = express.Router();
 const UserModel = require('./models/users-model.js');
 const usersSchema = require('./models/users-schema.js');
 const User = new UserModel();

 router.post('/signup', signupFunction);
 router.post('/signin', signInFunction);
 router.get('/users', getUsers);


 async function signupFunction(request, response){
    // request.body.password = await User.hashPassword(request.body.password);
    let password = await UserModel.hashPassword(request.body.password);
    console.log(password);
    User.create({ username: request.body.username, password: password});
    response.send('user was signed up');


  // requires a token and user to sign them up
  // req.token, req.user, res.set, res.cookie, res.send
 }

 function signInFunction(request, response){
    response.send('user was signed in');
  // res.cookie, res.send
  
 }

 async function getUsers(request, response){
   let userQuery = await User.get();
   response.send(userQuery);
  }


 module.exports = router;
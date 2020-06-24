'use strict';

// Module that contains the routes and the callback functions for the routes

/**
 * Router module
 * @module router
 */


 const express = require('express');
 const router = express.Router();
 const auth = require('./middleware/basic.js');
 const UserModel = require('./models/users-model.js');
 const User = new UserModel();

 router.post('/signup', signUp);
 router.post('/signin', auth, signIn);
 router.get('/users', getUsers);



 async function signUp(request, response){
    
    let userExists = await User.exists({ username: request.body.username});
    if (userExists){
      response.send('user already exists');
      return;
    }
    let password = await UserModel.hashPassword(request.body.password);
    let newUser = await User.create({ username: request.body.username, password: password});
    if (newUser){
      let token = UserModel.generateToken({ username: request.body.username});
      response.cookie('token', token);
      response.header('token', token);
      response.send(token);
    }else {
      response.status(403).send('invalid user');
    }
 }

 async function signIn(request, response){
  if (request.user) {
    let token = await UserModel.generateToken({ username: request.user.username});
    response.cookie('token', token);
    response.header('token', token);
    response.send({token, user: request.user});
  } else {
    res.status(403).send('Invalid');
  }
  
 }

 async function getUsers(request, response){
   let userQuery = await User.get();
   response.send(userQuery);
  }


 module.exports = router;
'use strict';

// This sets up a User class that uses the schema from users-schema.js
/**
 * Users class
 * @module users-model
 */



const schema = require('./users-schema.js');
const Model = require('./mongo-interface.js');
const bcrypt = require('bcrypt');

class User extends Model {
  
  constructor() {
    super(schema);
  }


  static hashPassword(password){
    return bcrypt.hash(password, 5);
  }

  authenticateUser(password){
    //code goes here
  }

  generateToken(){
    //code goes here
    //generate token based off of username:password
  }

}

module.exports = User;
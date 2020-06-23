'use strict';

// This sets up a User class that uses the schema from users-schema.js
/**
 * Users class
 * @module users-model
 */



const schema = require('./users-schema.js');
const Model = require('./mongo-interface.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let SECRET = 'secretvalidationstring';

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

  static generateToken(username){
    let token = jwt.sign({username}, SECRET);
    return token;
    
    //Notes:
    //generate token based off of username:password
  }

}

module.exports = User;
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

// let SECRET = 'secretvalidationstring';
let SECRET = process.env.SECRET;

class User extends Model {
  
  constructor() {
    super(schema);
  }


  static hashPassword(password){
    return bcrypt.hash(password, 5);
  }

  static async authenticateUser(username, password){
    try{
      let user = await schema.find({username});
      let authorized = await bcrypt.compare(password, user[0].password);
      if (authorized){
      return user[0];
      } else {
        return false;
      }
    }catch (error){
      console.error('ERROR :: ', error)
      return false;
    }
  }

  static generateToken(username){
    let token = jwt.sign(username, SECRET);
    return token;
    
  }

}

module.exports = User;
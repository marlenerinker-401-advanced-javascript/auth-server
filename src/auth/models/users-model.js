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

const roles = {
  user: ['read'],
  writer: ['read', 'create'],
  editor: ['read', 'create', 'update'],
  admin: ['read', 'create', 'update', 'delete']
}


let SECRET = process.env.SECRET;
let EXPIRES = process.env.TOKEN_EXPIRATION;

class User extends Model {
  
  constructor() {
    super(schema);
  }


  static hashPassword(password) {
    return bcrypt.hash(password, 5);
  }

  static async authenticateUser(username, password) {
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

  static generateToken(username) {
    let token = jwt.sign(username, SECRET, {expiresIn: EXPIRES});
    return token;
    
  }

  static async validateToken(token) {
    try {

      let user = await jwt.verify(token, SECRET);
      return user;

    } catch (error) {

      return false;
    }
  }

  // async makeUser(data){
  //   let newUser = new this.schema(data);
  //   return newUser;
  // }

  async verifyPermissions(capability, user){
    if (roles[user.role].includes(capability)){
      console.log('returning true');
      return true;
    }
    console.log('returning false');
    return false;
    
  }


}

module.exports = User;
'use strict';

const base64 = require('base-64');

const UserModel = require('../models/users-model.js')

//does the authentication like in class example
async function basicAuth(request, response, next) {
  console.log(request.headers)

  // strings from our auth header
  let [authtype, authString] = request.headers.authorization.split(' ');
  let [username, password] = base64.decode(authString).split(':');

  // let verified = users[username] ? await bcrypt.compare(password, users[username].password) : false;
  let user = await UserModel.authenticateUsers(username, password)

  if (user) {
    request.user = user;
    next();
  } else {
    next('Invalid login');
  }

  return 0;
}

module.exports = basicAuth;
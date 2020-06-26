'use strict';

// This module is used to authorize the user when they try to go to a route to do something in the app
/**
 * permissions
 * @module permissions
 */

 /**
  * permissions authenticates the user
  * @param capability
  * @param request
  * @param response
  * @param next
  * @function permissions
  * @returns {object}
  */

const UserModel = require('../models/users-model.js');
const User = new UserModel();

const permissions = (capability) => async(request, response, next) => {
  let user = await User.getByName(request.user.username);
  // let user = await User.makeUser({username: userInfo.username, role: userInfo.role});
  // console.log(user);
  let hasPermission = await User.verifyPermissions(capability, user);
  if (hasPermission) {
      next();
  } else {
      next('Access Denied');
  }
};


module.exports = permissions;

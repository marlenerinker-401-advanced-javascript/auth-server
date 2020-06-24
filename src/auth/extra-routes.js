'use strict';

 const express = require('express');
 const router = express.Router();
 const bearerMiddleware = require('./middleware/bearer.js');
 const UserModel = require('./models/users-model.js');
 const User = new UserModel();

router.get('/secret', bearerMiddleware, (request, response) => {
  response.send(request.user);

} );



module.exports=router;
var express = require('express');
const { userFormSignup, userFormLogin, getUserById, contactusInfo } = require('../controller/apis');
var router = express.Router();


router.post('/signupuser', userFormSignup),
  router.post('/loginuser', userFormLogin),
  router.get('/getUserById/:id', getUserById),
  router.post('/contactUs', contactusInfo);

module.exports = router;

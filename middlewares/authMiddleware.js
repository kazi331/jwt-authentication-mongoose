const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();



// Protected routes middleware

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if jwt token exists and is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err)
        res.redirect('/login');
      } else {
        next();
      }
    })
  } else {
    res.redirect('/login')
  }
}




// Chech current user middleware for every single get request

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.xyz = 'xyz' // test
        res.locals.user = user;
        next();
      }
    })
  } else {
    res.locals.user = null;
    next();
  }
}


module.exports = { requireAuth, checkUser }
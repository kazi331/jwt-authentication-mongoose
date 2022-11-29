const jwt = require('jsonwebtoken')
require('dotenv').config();

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // check jwt token and verify
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

module.exports = { requireAuth }
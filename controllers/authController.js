const User = require("../models/User");
const jwt = require('jsonwebtoken')
require('dotenv').config();

// handle errors with mongoose
const handleErrors = (err) => {
  console.log(err.message)
  let errors = { email: '', password: '' }

  // duplicate email check
  if (err.message.includes('duplicate key error')) {
    errors.email = 'This email is already registered!';
    return errors;
  }
  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors;
}

// Create json token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge })
}

signUp_get = (req, res) => {
  res.render('signup');
}


signUp_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password })
    const token = createToken(user._id)
    // set cookie to the browser
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.status(201).json({ "status": "success", "message": "User created Successfully!", "user": user._id })
    // console.log(user)
  } catch (err) {
    // res.json({ status: 'error', message: 'User not created.' })
    const errors = handleErrors(err)
    res.status(400).json({errors})

  }
}




login_get = (req, res) => {
  res.render('login')
}
login_post = async (req, res) => {

}


module.exports = {
  signUp_get,
  signUp_post,
  login_get,
  login_post
}
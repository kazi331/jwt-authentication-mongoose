const User = require("../models/User");
const jwt = require('jsonwebtoken')
require('dotenv').config();

// handle errors with mongoose
const handleErrors = (err) => {
  // console.log(err.message)
  let errors = { email: '', password: '' }

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is incorrect'
  }
  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect'
  }

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

const signUp_get = (req, res) => {
  res.render('signup');
}

const login_get = (req, res) => {
  res.render('login')
}


// Sign up post

const signUp_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password })
    // set cookie to the browser
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json({ "status": "success", "message": "User created Successfully!", "user": user._id })
    // console.log(user)
  } catch (err) {
    // res.json({ status: 'error', message: 'User not created.' })
    const errors = handleErrors(err)
    res.status(400).json({ errors })

  }
}



// Login post


const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // set cookie to the browser
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({ user: user._id })
  } catch (err) {
    const errors = handleErrors(err);
    // console.log({errors})
    res.status(400).send({ errors })
  }
}


// loogut
const logout_get = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }); // replace the old cookie with new temporary one
  res.redirect('/')
}


module.exports = {
  signUp_get,
  signUp_post,
  login_get,
  login_post,
  logout_get
}


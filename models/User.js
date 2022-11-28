const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email.']
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minLength: [6, 'Password must be at least 6 characters long'],
  },
})

// mongoose hooks before and after
// Fire a function after doc saved in the db - optional
userSchema.post('save', (doc, next) => {
  console.log('new user created', doc)
  next();
})

// Fire a function before doc saved in the db - optional
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt); // hash the password and assign with the user object
  next();
})



const User = mongoose.model('user', userSchema)

module.exports = User;
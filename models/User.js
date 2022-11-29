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
    minLength: [6, 'minimum password length is 6 characters.'],
  },
})



// mongoose hooks before and after
// Fire a function after doc saved in the db - optional
userSchema.post('save', (doc, next) => {
  console.log('new user created', doc.email)
  next();
})

// Fire a function before doc saved in the db - optional
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt); // hash the password and assign with the user object
  next();
})


// Create static method for user login
userSchema.statics.login = async function (email, password) {
  const user = await User.findOne({ email });
  // console.log(email, password, user)
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user;
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}



const User = mongoose.model('user', userSchema)

module.exports = User;
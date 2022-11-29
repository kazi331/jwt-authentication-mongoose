const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose');
const router = require('./routes/authRoutes');


const app = express();

// middleware
app.use(express.static('public'));
require('dotenv').config();
app.use(express.json());
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// databasee connection

const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.oxxl7li.mongodb.net`

mongoose.connect(dbURI, { dbName: 'jwt-auth' })
  .then(() => app.listen(3000, () => console.log('DB Connected')))
  .catch((err) => console.log(err));


// app.listen(3000, ()=>console.log('Connected Locally')) // use for offline , will remove later


// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(router);



/* // set cookies only for testing purposes
app.get('/set-cookies', (req, res) => {
  // res.setHeader('set-cookie', 'newUser=true') // set cookie without package
  res.cookie('newUser', false) // set cookie useing cookie parser
  //  set cookie useing cookie parser
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true }) // 1000 * 60 * 60 * 24 = 1 day
  res.send('You got cookie')
})


// read cookies
app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  // console.log(cookies)
  res.send(cookies)
})
 */
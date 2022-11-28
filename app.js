const express = require('express')
const mongoose = require('mongoose');
const router = require('./routes/authRoutes');


const app = express();

// middleware
app.use(express.static('public'));
require('dotenv').config();
app.use(express.json())

// view engine
app.set('view engine', 'ejs');

// databasee connection
const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.oxxl7li.mongodb.net`

mongoose.connect(dbURI, { dbName: 'jwt-auth' })
  .then(() => app.listen(3000, () => console.log('DB Connected')))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(router);
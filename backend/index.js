const express = require('express')
const passport = require('passport');
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express() ;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connection error:', err)
);

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));

app.use('/',require('./routes/authRoutes'));

app.use(passport.initialize());
app.use('/auth', require('./routes/authRoutes')) ;

app.get('/logout', (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  res.status(200).json({ message: 'Logout successful' });   
});

app.get('/profile', (req, res) => {
  if(req.session.use){
    res.json(req.session.user);
  }else{
    res.status(401).json({ error: 'not logged in' });
  }
});


const port =process.env.PORT||8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

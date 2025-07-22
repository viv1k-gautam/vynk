const express = require('express')
require('dotenv').config();
const router = express.Router()
const cors = require('cors');
const { test, registerUser, loginUser, getProfile,logoutUser } = require('../controllers/authControllers')

const passport = require('passport');

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
}));

router.get('/auth/google/callback', 
    passport.authenticate('google',{ failureRedirect: '/login', session: false }) ,    (req,res)=>{
        const token = generateToken(req.user);
        res.cookie('token', token,)
            .redirect('http://localhost:5173/create');
    }
);

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);



router.get('/',test)
router.post('/register',registerUser)
router.post('/login', loginUser)
router.get('/profile',getProfile)
router.get('/logout' , logoutUser);

module.exports = router;
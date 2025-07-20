const express = require('express')
require('dotenv').config();
const router = express.Router()
const cors = require('cors');
const { test, registerUser, loginUser, getProfile } = require('../controllers/authControllers')

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

module.exports = router;
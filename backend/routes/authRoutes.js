const express = require('express')
require('dotenv').config();
const router = express.Router()
const cors = require('cors');
const { test, registerUser, loginUser, getProfile,
    logoutUser,roomCodeget,exitRoom ,checkRoomCode} = require('../controllers/authControllers')



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
router.get('/logout' , logoutUser)
router.get('/create' ,roomCodeget)
router.post('/exit', exitRoom)
router.post('/check-room',checkRoomCode)



module.exports = router;
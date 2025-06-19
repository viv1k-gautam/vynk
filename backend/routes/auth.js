// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("735330514847-fc7vgtn81rre8vsvppl8hdg61ggtgmq4.apps.googleusercontent.com");

router.post('/google-login', async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: "735330514847-fc7vgtn81rre8vsvppl8hdg61ggtgmq4.apps.googleusercontent.com"
    });

    const payload = ticket.getPayload(); // contains email, name, picture
    console.log(payload);

    // Store user in DB if needed
    res.json({ user: payload });

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid Google token" });
  }
});

module.exports = router;

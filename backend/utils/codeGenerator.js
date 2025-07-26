const express = require('express')

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); // 6-character alphanumeric
  
}


module.exports ={generateRoomCode};
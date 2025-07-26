const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomCodeSchema = new Schema({
   name :String,
   url :String,
  code: { type: String,
     required: true,
      unique: true },

owner: { type: mongoose.Schema.Types.ObjectId, 
   ref: 'User', 
   required: true },

  createdAt: { type: Date,
     default: Date.now,
      }
});


const RoomCodeModel = mongoose.model('RoomCode', roomCodeSchema);
module.exports = RoomCodeModel;
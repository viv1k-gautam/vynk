const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomCodeSchema = new Schema({
  code: { type: String,
     required: true,
      unique: true },

  createdAt: { type: Date,
     default: Date.now,
      expires: '1m' } // Code expires after 1 min
});
roomCodeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

const RoomCodeModel = mongoose.model('RoomCode', roomCodeSchema);
module.exports = RoomCodeModel;
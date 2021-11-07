const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: false,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

module.exports = mongoose.model("token", TokenSchema);

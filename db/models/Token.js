const {model,Schema} = require("mongoose");

const TokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
},{ timestamps:true});

module.exports = model("token", TokenSchema);

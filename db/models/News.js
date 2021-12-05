const { model, Schema } = require("mongoose");

const NewsSchema = new Schema(
  {
    category: {
      type: String,
    },
    datePublished: {
      type: Date,
      default: Date.now(),
    },
    description: {
      type: String,
    },
    image: {
      type: Object,
    },
    name: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("new", NewsSchema);

const { model, Schema } = require("mongoose");

const CoinSchema = new Schema(
  {
    description: {
      type: String,
      required: false,
    },
    iconUrl: {
      type: String,
      required: true,
    },
    marketCap: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    numberOfExchanges: {
      type: Number,
      required: false,
    },
    numberOfMarkets: {
      type: Number,
      required: false,
    },
    price: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
    webSearchUrl: {
      type: String,
      required: false,
    },
    change: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = model("coin", CoinSchema);

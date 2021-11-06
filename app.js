const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const router = require("./routes/router");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Database connection
mongoose
  .connect("mongodb://localhost:27017/cryptodb", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`Server is running on port:${PORT}`);
    });
    console.log(res);
  })
  .catch((error) => console.log(error));

//load env
dotenv.config({ path: "./config/env" });

//Allow json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

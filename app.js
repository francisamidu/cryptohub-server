const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const router = require("./routes/router");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authenticate = require("./middleware/authenticate");

//Auth middleware
app.use("/api", authenticate);

//Database connection
mongoose
  .connect("mongodb://localhost:27017/cryptodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

//load env
const env = dotenv.config();

//Allow json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

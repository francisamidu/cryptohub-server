//Base Dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const authenticate = require("./middleware/authenticate");

//load env
require("dotenv").config();

//API routes
app.use("/auth", require("./routes/auth"));
app.use("/api", [authenticate, require("./routes/api")]);

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

//Allow json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Base Dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const { connect } = require("mongoose");
const { join } = require("path");

//Middlewares
const authenticate = require("./middleware/authenticate");
const imageUploader = require("./middleware/image-uploader");

//load env
require("dotenv").config();

//setup cors
app.use(require("cors")());

//Allow json
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(join(__dirname, "public")));

//API routes
app.use("/auth", require("./routes/auth"));
app.use("/api", [authenticate, require("./routes/api")]);
app.use("/upload", imageUploader.single("image"));

//Database connection
connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
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

const User = require("./models/User");
const mongoose = require("mongoose");

// Creates a test account
const seed = async () => {
  try {
    const isAlreadyCreated = await User.findOne({ username: "test" });
    if (!isAlreadyCreated) {
      const newUser = new User({
        username: "test",
        email: "test@test.com",
        password: "(Testaccount1)",
      });
      await newUser.save();
      console.log(`seeded test user account`);
      mongoose.disconnect();
    } else {
      console.log("User account already exists");
      mongoose.disconnect();
    }
  } catch (error) {
    console.log(`Seed failed:${error}`);
    mongoose.disconnect();
  }
};

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}

//Database connection
mongoose
  .connect("mongodb://localhost:27017/cryptodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    runSeed();
  })
  .catch((error) => console.log(error));

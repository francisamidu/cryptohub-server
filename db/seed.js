const User = require("./models/User");

const seed = async () => {
  const newUser = new User({
    username: "test",
    email: "test@test.com",
    password: "(Testaccount1)",
  });
  await newUser.save();
  console.log(`seeded test user account`);
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

if (module === require.main) {
  runSeed();
}

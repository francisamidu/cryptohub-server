const News = require("./models/News");
const { connect, disconnect } = require("mongoose");

const { readFileSync } = require("fs");
const { join } = require("path");

// Creates dummy News data
const seed = async () => {
  const data = readFileSync(join(__dirname, "News.json"), "utf8");
  const tempNews = JSON.parse(data);
  try {
    await News.insertMany(tempNews.news);
    console.log("Seeded News");
    disconnect();
  } catch (error) {
    console.log(`Seed failed:${error}`);
    disconnect();
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
connect("mongodb://localhost:27017/cryptodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
})
  .then(() => {
    runSeed();
  })
  .catch((error) => console.log(error));

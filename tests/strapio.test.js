const { setupStrapi } = require("./helpers/strapi");
const Strapio = require("../index");

/** this code is called once before any test is called */
beforeAll(async (done) => {
  await setupStrapi(); // singleton so it can be called many times
  done();
});

/** this code is called once before all the tested are finished */
afterAll(async (done) => {
  const dbSettings = strapi.config.get("database.connections.default.settings");

  //delete test database after all tests
  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = `${__dirname}/../${dbSettings.filename}`;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
  done();
});

test("StrapIO send receive", async () => {
  strapi.StrapIO = new Strapio(strapi);
  expect(strapi.StrapIO).toBeDefined();
});

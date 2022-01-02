const User = require("./models/user.model");
const faker = require("faker");

async function seed(limit) {
  for (let index = 0; index < limit; index++) {
      
    try {
      const user = new User({
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      });
      await user.save();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = seed;

const { faker } = require("@faker-js/faker");

const getRandomUser = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const password = faker.internet.password({ length: 10 });
  return {
    firstName,
    lastName,
    email,
    password,
  };
};

module.exports = getRandomUser;

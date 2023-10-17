const { faker } = require("@faker-js/faker");

const getRandomContact = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const birthdate = '2001-01-01';
  const phone = '9121314151';
  const street1 = "1 Main St.";
  const street2 = "Apartment A";
  const city = "Anytown";
  const stateProvince = "KS";
  const postalCode = "12345";
  const country = "USA";

  return {
    firstName,
    lastName,
    birthdate,
    email,
    phone,
    street1,
    street2,
    city,
    stateProvince,
    postalCode,
    country,
  };
};

module.exports = getRandomContact;

const Client = require("../models/Client");
const { faker } = require("@faker-js/faker");
const { List, Office } = require("../models");

for (i = 0; i < 10; i++) {
  Client.create({
    fullName: faker.name.fullName(),
    company: faker.company.name(),
    area: faker.name.jobArea(),
    email: faker.internet.email(),
  });
}
for (i = 0; i < 10; i++) {
  List.create({
    description: faker.company.bs(),
  });
}

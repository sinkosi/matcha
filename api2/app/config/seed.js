const db = require('./db.config');
const faker = require('faker');
const Seeder = require('mysql-db-seed').Seeder;

//Generate new Seeder instance
const seed = new Seeder(
    10,
    db.HOST,
    db.USER,
    db.PASSWORD,
    db.DB
);

(async () => {
    await seed.seed(
        30,
        "users",
        {
            username: faker.internet.userName,
            email: faker.internet.email,
            firstname: faker.name.firstName,
            lastname: faker.name.lastName,
            password: faker.internet.password
        }
    )
    seed.exit();
    process.exit();
})();
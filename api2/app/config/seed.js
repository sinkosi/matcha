// const db = require('./db.config');
// const faker = require('faker');
// const Seeder = require('mysql-db-seed').Seeder;

// //Generate new Seeder instance
// const seed = new Seeder(
//     10,
//     db.HOST,
//     db.USER,
//     db.PASSWORD,
//     db.DB
// );

// (async () => {
//     await seed.seed(
//         30,
//         "users",
//         {
//             username: faker.internet.userName,
//             email: faker.internet.email,
//             firstname: faker.name.firstName,
//             lastname: faker.name.lastName,
//             password: faker.internet.password
//         }
//     )
//     seed.exit();
//     process.exit();
// })();

// function interests(){
//     const interestsPool = ["#singing", "#bowling", "#playing", "#dancing", "#art", "#drawing", "#travelling", "#fun", "#cooking", "#eating"];
//     const maxNumberOfInterests = 10;

//     let numberOfInterests = Math.floor(Math.random() * 100000) % maxNumberOfInterests + 1;
//     let interests = [];

//     console.log(numberOfInterests);

//     while (interests.length < numberOfInterests) {
//         interestIndex = Math.floor(Math.random() * 100000) % interestsPool.length;

//         if (interests.indexOf(interestsPool[interestIndex]) == -1)
//             interests.push(interestsPool[interestIndex]);
        
//     }
    
//     return interests;
// }

// console.log(interests());
const axios = require('axios');
const db = require('./db.config');
const faker = require('faker');
const Seeder = require('mysql-db-seed').Seeder;


seed();


function seed(){
    const numberOfProfiles = 3;

    const api = axios.create({baseURL: 'https://randomuser.me'})


    api.get("/api?results="+numberOfProfiles)
    .then(processResults)
    .catch(err => console.log(err))

}

function processResults(results){
    let users = results.data.results;
    let seedData = []
    
    console.log(users.length);
    console.log(users);


    users.forEach(user => {
        console.log(user);

        let username = user.login.username
        let email = user.email
        let firstname = user.name.first;
        let lastname = user.name.last;
        let password = user.login.password;
        let gender = user.gender;
        let biography = "dummy bio";
        let sexual_preferences = user.gender == "male"? "female": "male";
        let date_of_birth = user.dob.date;
        // let profile_pic
        // let location
        let activated = true;
        let completed = true;
        let registered = user.registered.date;
        let modified = user.registered.date;
        let activated_date = user.registered.date;
        let completed_date = user.registered.date;

        // ///images
        let url = user.picture.large
        // let user_id

        // ///interest

        // ///location
        let address1 = user.location.number + " " + user.location.name; 
        let address2
        let city = user.location.city;
        let state = user.location.state;
        let code = user.location.code;
        let longitude = user.location.coordinates.longitude;
        let latitude = user.location.coordinates.latitude;
        let user_id

        // //matches

        // //profile likes

        // //profile visits

        
    });


}




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
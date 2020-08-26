const axios = require('axios')

const api = axios.create({baseURL: 'https://randomuser.me'})

api.get("/api").then(processResults).catch(err => console.log(err))

function processResults(results){
    let users = results.data.results;
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
        let registered = registered.date;
        let modified = registered.date;
        let activated_date = registered.date;
        let completed_date = registered.date;

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
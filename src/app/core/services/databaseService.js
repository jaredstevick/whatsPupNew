'use strict';
const firebase = require("firebase/app");
require("firebase/database");

class DatabaseService {
    /*@ngInject*/
    constructor() {
        };

    //add new user to database
    createNewUser(userId, userEmail) {
        firebase.database().ref('users/' + userId).set({
            email: userEmail
        })
    }

    //check if existing user. if not, create new user in database
    checkForNewUser(userId, userEmail) {
        let ref = firebase.database().ref('users/' + userId);
        ref.once('value').then((snapshot) => {
            let a = snapshot.exists();
            console.log('DatabaseService | checkForNewUser() | isExistingUser', a);
            if (!a) {
                this.createNewUser(userId, userEmail);
            }
        });
    }

}

module.exports = DatabaseService;
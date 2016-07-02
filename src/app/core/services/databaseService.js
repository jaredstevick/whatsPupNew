'use strict';
  const firebase = require("firebase/app");
  require("firebase/database");

class DatabaseService {
    /*@ngInject*/
    constructor() {

        };

    createNewUser(userId, userEmail) {
        firebase.database().ref('users/' + userId).set({
            email: userEmail
        })
    }

    checkForNewUser(userId, userEmail) {
        let ref = firebase.database().ref('users/' + userId);
        ref.once('value').then((snapshot) => {
            let a = snapshot.exists();
            console.log('a isExistingUser', a);
            if (!a) {
                this.createNewUser(userId, userEmail);
            }
        });
    }

}

module.exports = DatabaseService;
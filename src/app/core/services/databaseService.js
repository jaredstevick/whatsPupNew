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
        });
    }

    //check if existing user. if not, create new user in database
    checkForNewUser(userId, userEmail) {
        let ref = firebase.database().ref('users/' + userId);
        ref.once('value').then((snapshot) => {
            let a = snapshot.exists();
            if (!a) {
                console.log('DatabaseService | checkForNewUser() | creating new user');
                this.createNewUser(userId, userEmail);
            } else {
                console.log('DatabaseService | checkForNewUser() | isExistingUser ', a);
            }
        });
    }


    //add new client to existing user
    addClient(userId, clientInfo) {
        firebase.database().ref('users/' + userId + '/clients/' + clientInfo.lastName + '_' + clientInfo.firstName).set({
            clientInfo
        });
    }

    getClientList(userId) {
        firebase.database().ref('users/' + userId + '/clients/').on('value', (snapshot) => {
            var data = snapshot.val();
            console.log('snapshot value', data);
        })
    }

}

module.exports = DatabaseService;
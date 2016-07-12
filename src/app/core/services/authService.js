'use strict';
const firebase = require("firebase/app");
require("firebase/auth");

class AuthService {
    /*@ngInject*/
    constructor($state, DatabaseService) {
        this.$state = $state;
        this.DatabaseService = DatabaseService;

        //FIXME: firebase config. move this to config file
        let config = {
            apiKey: "AIzaSyD-HLyjS9cTBFNnXQVq0dn5vCF0LI3jJlQ",
            authDomain: "whatspup1.firebaseapp.com",
            databaseURL: "https://whatspup1.firebaseio.com",
            storageBucket: "",
        };
        firebase.initializeApp(config);
    }

    //facebook login
    fbLogin() {
        let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            this.$state.go('clients');
            console.log('AuthService | fbLogin() | Success', result);
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
            console.log('AuthService | fbLogin() | Error on facebook sign-in ', errorCode, errorMessage, email, credential);
        });
    }

    //email login
    createEmailLogin(newUserEmail, newUserPassword) {
        firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPassword).then((result) => {
            console.log('AuthService | createEmailLogin() | Email Account Creation Successful ', result);
            let userId = result.uid;
            this.DatabaseService.createNewUser(userId, newUserEmail, newUserPassword);
            this.$state.go('clients');
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log('AuthService | createEmailLogin() | Email Account Creation Error: ', errorCode, errorMessage);
        });
    }

    //create new email user login
    emailLogin(userEmail, userPassword) {
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then((result) => {
            console.log('AuthService | emailLogin() | Email Login Successful');
            this.$state.go('clients');
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log('AuthService | emailLogin() | Email Login Error ', errorCode, errorMessage);
        });
    }

    // getUser() {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             console.log('AuthService | getUser() | Signed in user: ', user);
    //             const userId = user.uid
    //             let userEmail = user.email
    //             this.DatabaseService.checkForNewUser(userId, userEmail);
    //         } else {
    //             console.log('AuthService | getUser() | No user signed in');
    //         }
    //     });
    // }


    //logout
    logout() {
        firebase.auth().signOut().then(() => {
            console.log('AuthService | logout() | Log out succesful');
            this.$state.go('main');
        }).catch((error) => {
            console.log('AuthService | logout() | Error logging out ', error);
        });
    }

}

module.exports = AuthService;
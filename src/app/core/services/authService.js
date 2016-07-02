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

    //facebook login/create new authorized if they don't exist
    fbLogin() {
        let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            let userId = result.uid;
            let userEmail = result.email
            this.getUser();
            this.$state.go('clients');
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
            console.log('Error on facebook sign-in', errorCode, errorMessage, email, credential);
        });
    }

    //email login
    createEmailLogin(newUserEmail, newUserPassword) {
        firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPassword).then((result) => {
            console.log('Email Account Creation Successful', result);
            let userId = result.uid;
            console.log('uid', result.uid);
            this.DatabaseService.createNewUser(userId, newUserEmail, newUserPassword);
            this.$state.go('clients');
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log('email:', newUserEmail, 'password:', newUserPassword);
            console.log('Email Account Creation Error:', errorCode, errorMessage);
        });
    }

    //create new email user login
    emailLogin(userEmail, userPassword) {
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then((result) => {
            console.log('Email Login Successful');
            this.$state.go('clients');
            this.getUser();
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log('Email Login Error', errorCode, errorMessage);
        });
    }

    //get the user info and check if user exists in database
    getUser() {
        let user = firebase.auth().currentUser;
        if (user) {
            let userId = user.uid
            let userEmail = user.email
            console.log('Signed in user:', user);
            this.DatabaseService.checkForNewUser(userId, userEmail);
        } else {
            console.log('No user signed in');
        }
    }

    //logout
    logout() {
        firebase.auth().signOut().then(() => {
            console.log('Log out succesful');
            this.$state.go('main');
        }).catch((error) => {
            console.log('Error logging out', error);
        });
    }

}

module.exports = AuthService;
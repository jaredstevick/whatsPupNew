'use strict';
  const firebase = require("firebase/app");
  require("firebase/auth");
  require("firebase/database");
  require("firebase/storage");

class AuthService {
    /*@ngInject*/
    constructor($state) {
        this.$state = $state;
        let config = {
            apiKey: "AIzaSyD-HLyjS9cTBFNnXQVq0dn5vCF0LI3jJlQ",
            authDomain: "whatspup1.firebaseapp.com",
            databaseURL: "https://whatspup1.firebaseio.com",
            storageBucket: "",
        };
        firebase.initializeApp(config);
        let database = firebase.database();

    }

    fbLogin() {
        let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            let token = result.credential.accessToken;
            this.getUser();
            this.$state.go('clients');
            }).catch((error) => {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                // The email of the user's account used.
                let email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                let credential = error.credential;
                console.log('Error on sign-in', errorCode, errorMessage, email, credential);
            });
    }

    createEmailLogin(newUserEmail, newUserPassword) {
        console.log('email:', newUserEmail, 'password:', newUserPassword);
        firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPassword).then((result) => {
            console.log('Email Account Creation Successful', result);
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('email:', userEmail, 'password:', userPassword);
            console.log('Email Account Creation Error:', errorCode, errorMessage);
        });
    }

    emailLogin(userEmail, userPassword) {
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then((result) => {
            console.log('Email Login Successful');
            this.$state.go('clients');
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Email Login Error', errorCode, errorMessage);
        });
    }

    getUser() {
        let user = firebase.auth().currentUser;
        if (user) {
            console.log('Signed in user:', user);
        } else {
            console.log('No user signed in');
        }
    }

    logout() {
        firebase.auth().signOut().then(() => {
            console.log('Log out succesful');
            this.$state.go('main');
            //sign-out successful
        }).catch((error) => {
            console.log('Error logging out', error);
        });
    }

}

module.exports = AuthService;
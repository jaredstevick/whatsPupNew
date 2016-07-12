'use strict';
const firebase = require("firebase/app");
require("firebase/auth");

class UserService {
    /*@ngInject*/
    constructor() {
        this.init();
    }

    init() {
    }

    getUser() {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.userId = resolve(user.uid);
                    console.log('UserService | getUser() | Signed in user: ', user);
                } else {
                    reject('AuthService | getUser() | Error Getting User');
                }
            });
        });
    }


}


module.exports = UserService;
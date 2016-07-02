'use strict';

class MainController {
    /* @ngInject */
    constructor(AuthService, $state) {
        this.AuthService = AuthService;
        this.state = $state;
        this.user = {
            email: '',
            password: ''
        };

    }

    fbLogin() {
        this.AuthService.fbLogin();
    }

    createEmailLogin() {
        let userEmail = this.user.newEmail;
        let userPassword = this.user.newPassword;
        this.AuthService.createEmailLogin(userEmail, userPassword);
    }

    emailLogin() {
        let userEmail = this.user.email;
        let userPassword = this.user.password;
        this.AuthService.emailLogin(userEmail, userPassword);
    }
}

export default MainController;

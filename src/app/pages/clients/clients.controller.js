class ClientsController {
    /* @ngInject */
    constructor(AuthService) {
        this.AuthService = AuthService;
        this.init();
    }

    init() {
        // this.AuthService.getUser();
    }

    logout() {
        this.AuthService.logout();
    }

}

export default ClientsController;
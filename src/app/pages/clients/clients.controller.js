class ClientsController {
    /* @ngInject */
    constructor(AuthService, DatabaseService, UserService) {
        this.AuthService = AuthService;
        this.DatabaseService = DatabaseService;
        this.UserService = UserService;

        this.clientList = [
            {
                id: 1,
                firstName: 'Mario',
                lastName: 'Lemieux',
                pets: 'cat, dog',
                email: 'mario@penguins.com',
                phone: '412-555-1234',
                address: '1001 Fifth Ave',
                city: 'Pittsburgh',
                state: 'PA',
                zip: '15219'
            },
            {
                id: 2,
                firstName: 'Paul',
                lastName: 'Coffey',
                pets: 'cat1, dog1',
                email: 'paul@penguins.com',
                phone: '412-555-4321',
                address: '1001 Fifth Ave',
                city: 'Pittsburgh',
                state: 'PA',
                zip: '15219'
            }
        ];

        this.client = {
            id: this.clientList.length + 1,
            firstName: '',
            lastName: '',
            pets: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zip: ''
        };

        this.init();
    }

    init() {
        this.UserService.getUser().then((userId) => {
            this.userId = userId;
            console.log('ClientsController.init() | userId', userId);
        });
        this.DatabaseService.getClientList();
    }

    addClient() {
        this.clientList.push(this.client);
        this.DatabaseService.addClient(this.userId, this.client);
        this.client = {
            id: this.clientList.length + 1,
            firstName: '',
            lastName: '',
            pets: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zip: ''
        };
    }


    logout() {
        this.AuthService.logout();
    }

}

export default ClientsController;
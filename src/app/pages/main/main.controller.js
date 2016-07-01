'use strict';

class MainController {
    /* @ngInject */
    constructor($state, $firebaseObject, $timeout) {
        this.state = $state;
        this.firebaseObject = $firebaseObject;
        this.timeout = $timeout;
        this.auth = new Firebase('https://whatspup.firebaseio.com');
        this.currentUser = {};

    }

    login() {
        return this.auth.authWithOAuthPopup('facebook', (error, authData) => {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                this.timeout(() => {
                    console.log('Authenticated successfully with payload:', authData);
                })
                .then(this.state.go('clients'));
            }
        },
        { remember: 'sessionOnly' }
    );
    }

    loggedIn() {
        if (this.auth.getAuth()) {
            return true;
        }
    }

    getUser() {
        return currentUser;
    }

    logout() {
        this.auth.unauth();
        this.state.go('main');
        console.log('logging out');
    }

    updateUser(authdUser) {
        if (authdUser === null) {
            return null;
        }
        console.log('This will break if you login with anything other than FB')
            /**
             * Create a reference to the users collection within Firebase
             * Then create a child of the users collection named after the
             * authdUser's Facebook ID
             **/
        let fbUser = auth.child('petsitter').child(authdUser.facebook.id);

        console.log(fbUser);

        // Update the authdUser's information in Firebase
        fbUser.update({
            uid: authdUser.facebook.id,
            facebook: authdUser.facebook,
            fullName: authdUser.facebook.displayName,
            firstName: authdUser.facebook.cachedUserProfile.first_name,
            lastName: authdUser.facebook.cachedUserProfile.last_name,
            avatarUrl: authdUser.facebook.cachedUserProfile.picture.data.url,
            gender: authdUser.facebook.cachedUserProfile.gender
        });

        // Set user to the object reference of authdUser
        fbUser = $firebaseObject(this.auth
                    .child('petsitter')
                    .child(authdUser.facebook.id)
                )
        //stores the user information for use elsewhere
        currentUser = fbUser;

        return fbUser;
    }


}

export default MainController;

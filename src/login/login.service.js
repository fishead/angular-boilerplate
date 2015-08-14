const angular = require('angular');

module.exports = angular.module('ab.login.service', [
    'restangular',
]).service('LoginService', LoginService);

/* @ngInject */
function LoginService(Restangular, $rootScope, store, $state) {
    return {
        getToken: getToken,
        getProfile: getProfile,
        logout: logout,
    };

    function getToken(user) {
        return Restangular.all('auth').all('token').post(user);
    }

    function getProfile() {
        return Restangular.all('auth').get('profile');
    }

    function logout() {
        delete $rootScope.auth;

        store.remove('auth.profile');
        store.remove('auth.accessToken');

        $state.go('login');
    }
}

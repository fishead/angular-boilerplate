require('./login.less');
require('./login.service.js');
const angular = require('angular');

module.exports = angular.module('ab.login', [
    'ui.router',
    'angular-storage',
    'ab.common.service',
    'ab.login.service',
]).config(moduleConfig)
    .controller('LoginController', LoginController);

/* @ngInject */
function moduleConfig($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        template: require('./login.html'),
        controller: 'LoginController as vm',
    });
}

/* @ngInject */
function LoginController($rootScope, $location, store, LoginService, AlertService, $state) {
    const vm = this;
    vm.login = login;

    initController();

    function login(user) {
        LoginService.getToken(user).then((res) => {
            const token = res.access_token;
            store.set('auth.accessToken', token);
            if (!$rootScope.auth) { $rootScope.auth = {}; }
            $rootScope.auth.accessToken = token;
            return LoginService.getProfile();
        }).then((profile) => {
            store.set('auth.profile', profile);
            $rootScope.auth.profile = profile;

            $state.go('home');
        }).catch((err) => {
            AlertService.warning(err.data);
        });
    }

    function initController() {
        vm.user = {
            username: 'root',
            password: 'rootroot',
        };
    }
}

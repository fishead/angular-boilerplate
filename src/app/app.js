require('./app.less');
require('../common/service.js');
require('../login/login.js');
require('../home/home.js');

const angular = require('angular');

module.exports = angular.module('ab', [
    'ui.router',
    'ui.bootstrap',
    'angular-storage',
    'restangular',
    'ab.login',
    'ab.home',
]).config(moduleConfig).run(moduleRun);

/* @ngInject */
function moduleConfig($urlRouterProvider, $locationProvider, RestangularProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    RestangularProvider.setBaseUrl('/apis');
}

/* @ngInject */
function moduleRun($rootScope, $location, store) {
    if (!$rootScope.auth || !$rootScope.auth.profile || !$rootScope.auth.accessToken) {
        if (store.get('auth.profile') && store.get('auth.accessToken')) {
            $rootScope.auth = {
                profile: store.get('auth.profile'),
                accessToken: store.get('auth.accessToken'),
            };
            return null;
        }
    }
}

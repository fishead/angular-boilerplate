const angular = require('angular');

module.exports = angular.module('ab.home', [
    'ui.router',
    'ab.common.service',
]).config(moduleConfig)
    .controller('HomeController', HomeController);

/* @ngInject */
function moduleConfig($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        template: require('./home.html'),
        controller: 'HomeController as vm',
    });
}

/* @ngInject */
function HomeController() {

}

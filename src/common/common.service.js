const angular = require('angular');

module.exports = angular.module('ab.common.service', [

]).config(['$httpProvider', moduleConfig])
    .factory('BearerInterceptor', BearerInterceptor);


/* @ngInject */
function moduleConfig($httpProvider) {
    $httpProvider.interceptors.push('BearerInterceptor');
}

/* @ngInject */
function BearerInterceptor($rootScope, $q, $injector) {
    return {
        request: function request(conf) {
            conf.headers = conf.headers || {};
            if (!!$rootScope.auth && !!$rootScope.auth.accessToken) {
                conf.headers.Authorization = 'Bearer ' + $rootScope.auth.accessToken;
            }
            return conf;
        },
        responseError: function responseError(rejection) {
            const $state = $injector.get('$state');

            if (rejection.status === 401) {
                return $state.go('login');
            }
            if (rejection.status === 404) {
                return $q.reject({
                    data: '未找到此项目',
                });
            }
            if (rejection.status === 502) {
                return $q.reject({
                    data: '服务器离线',
                });
            }
            return $q.reject(rejection);
        },
    };
}

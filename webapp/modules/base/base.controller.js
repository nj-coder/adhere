/**
 * Adhere
 **/
(function () {
    "use strict";

    angular
        .module('adhere')
        .controller('mainController', mainController);

    /* ngInject */
    function mainController($scope, $state, $window, $timeout, $transitions, $http, appConfig, apiService, $rootScope, $mdDialog) {
        var vm = this;
        vm.online = true;

        /**
         * exection starts here
         **/
        function init() {

            /** set the center div height **/
            vm.setCenterheight();

            /** set the center div height on resize **/
            angular.element($window).bind('resize', function () {
                if (!vm.adjusting)
                    $timeout(function () {
                        vm.adjusting = true;
                        vm.setCenterheight();
                    }, 100)
            });

            vm.navList = [{
                title: "Home",
                active: true,
                href: "app.home"
            }, {
                title: "WorkBook",
                active: false,
                href: "app.workbook"
            }];

            vm.currentNavIdx = 0;
        };

        /**
         * set the center div height
         **/
        vm.setCenterheight = function () {
            if (!document.getElementsByTagName('header'))
                return; // retruns if view is not rendereded(login page)

            var html = document.documentElement,
                hHeight = (document.getElementsByTagName('header')[0]) ? document.getElementsByTagName('header')[0].offsetHeight : 0,
                centerContent = $('#center-wrapper');

            if (centerContent) {
                centerContent.css("minHeight", html.clientHeight - (100) + "px");
            }
            vm.adjusting = false;
        };
        /**
         *
         */
        vm.changeNavigation = function (item, index) {
            vm.navList[vm.currentNavIdx].active = false;
            vm.currentNavIdx = index;            
            item.active = true;
            $state.go(item.href);
            $timeout();
        }
        /**
         * logout action
         **/
        vm.logout = function () {
            apiService.logout();
            return;
            var confirm = $mdDialog.confirm()
                .title('Confirm logout?')
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function () {
                apiService.logout();
            }, function () {

            });
        };


        init();

    }

})();
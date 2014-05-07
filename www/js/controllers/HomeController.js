angular.module(['touristGuideModule.controllers'])
    .controller('HomeController', ['$scope', '$location',
        function($scope,$location) {


            $scope.init = function(){
                $scope.setHeaderTitleAndLink(lang.welcome,  "/home");


            }();


        }]);

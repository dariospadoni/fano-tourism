angular.module(['touristGuideModule.controllers'])
    .controller('MapController', ['$scope', '$location',
        function($scope,$location) {


            $scope.init = function(){
                $scope.setHeaderTitleAndLink(lang.menuSections.map ,"/map");
            }();


        }]);

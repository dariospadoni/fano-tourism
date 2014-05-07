angular.module(['touristGuideModule.controllers'])
    .controller('MenuController', ['$scope', '$location',
        function($scope,$location) {

            $scope.currentExpandedSection="";

            $scope.historySections = historySections;
            $scope.artSections = artSections;
            //$scope.eventSections = eventSections;
            $scope.itinerarySections = itinerarySections;

            $scope.submenuSelected = function(hash){
                return hash === $location.path();
            };

            $scope.showSubmenu = function (submenu){
                return $scope.currentExpandedSection==submenu;
            }

            $scope.toggleSubmenu = function (section){
                if($scope.currentExpandedSection==section)
                    $scope.currentExpandedSection="";
                else
                    $scope.currentExpandedSection=section;
            };

            $scope.gotoHome = function() {  $location.url("/home");}

            $scope.init = function(){

            }();


        }]);

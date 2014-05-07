

angular.module(['touristGuideModule.controllers'])
    .controller('SearchController', ['$scope','SearchServices', '$location',
        function($scope, $searchServices,$location  ) {

            $scope.setHeaderTitleAndLink(lang.menuSections.freeSearch,"/search");

            $scope.searchText="";

            $scope.results={ history:[], arts:[]};

            $scope.keyPress = function(evnt){
                if (evnt.which==13)
                    $scope.search();
            };

            $scope.go = function ( path ) {
                $location.path( path );
            };

            $scope.search = function(){
                if($scope.searchText=="")
                    return;

                if(gaPlugin)
                    gaPlugin.trackEvent( null, null, "FreeSearch", "Search", $scope.searchText, 0);

                $scope.results = $searchServices.search($scope.searchText);
                //$scope.$apply();
            };


        }]);
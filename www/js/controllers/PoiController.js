
angular.module(['touristGuideModule.controllers'])
    .controller('PoiSectionController',  ['$scope', '$location','$routeParams','BookmarkServices',
        function($scope,$location,$routeParams,$bookmarkServices) {

            $scope.addBookmark = function()
            {
                $bookmarkServices.add (  $location.path(), "poi", $scope.currentSection.name , $scope.currentSection.thumbnail   )
            };

            $scope.removeBookmark = function()
            {
                $bookmarkServices.remove ( $location.path() );
            };

            $scope.isBookmark = function(){
                return $bookmarkServices.findByUrl($location.path())!=null;
            };


            $scope.init = function(){


                $scope.currentSection = poiSections.filter( function(elem,indx) {
                        if (elem.slug==$routeParams.section){
                            sectionIndex = indx;
                            return true;
                        }}
                )[0];

                $scope.title =  $scope.currentSection.name ;
                $scope.content = $scope.currentSection.content;
                $scope.setHeaderTitleAndLink(lang.menuSections.cityVisit,"/poi");

                ScrollTop();
            }();





        }]);


angular.module(['touristGuideModule.controllers'])
    .controller('PoiHomeController', ['$scope',
        function($scope  ) {

            $scope.poiSections = poiSections;

            $scope.setHeaderTitleAndLink(lang.menuSections.cityVisit,"/poi");

        }]);



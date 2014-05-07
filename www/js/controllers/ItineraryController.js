
angular.module(['touristGuideModule.controllers'])
    .controller('ItinerarySectionController',  ['$scope', '$location','$routeParams','BookmarkServices',
        function($scope,$location,$routeParams,$bookmarkServices) {

            $scope.currentItinerary=null;
            $scope.currentSection = null;
            $scope.prevSection=null;
            $scope.nextSection=null;
            $scope.nextTitle="";
            $scope.prevTitle="";

            $scope.showPrevSection = function() {
                if($scope.prevSection)
                    $location.url ("/itinerary/{0}/{1}".format($scope.currentItinerary.slug, $scope.prevSection.slug));
            };

            $scope.showNextSection = function() {
                if($scope.nextSection)
                    $location.url ("/itinerary/{0}/{1}".format($scope.currentItinerary.slug, $scope.nextSection.slug));
            };

            $scope.addBookmark = function()
            {
                $bookmarkServices.add (  $location.path(), "itinerary", $scope.currentSection.name[locale], $scope.currentSection.thumbnail   )
            };

            $scope.removeBookmark = function()
            {
                $bookmarkServices.remove ( $location.path() );
            };

            $scope.isBookmark = function(){
                return $bookmarkServices.findByUrl($location.path())!=null;
            };


            $scope.init = function(){
                var sectionIndex=0;

                $scope.currentItinerary = itinerarySections.filter( function(elem,indx) {
                    if (elem.slug==$routeParams.itinerary){
                        return true;
                    }}
                )[0];

                if($routeParams.section)
                    $scope.currentSection = $scope.currentItinerary.pois.filter(function(elem,indx){
                        if (elem.slug==$routeParams.section){
                            sectionIndex=indx;
                            return true;
                        }}
                    )[0];
                else
                    $scope.currentSection =$scope.currentItinerary.pois[0];

                $scope.title = $scope.currentItinerary.name + " > " +  $scope.currentSection.name[locale];
                $scope.content = $scope.currentSection.content[locale];


                if(sectionIndex>0)
                {
                    $scope.prevSection = $scope.currentItinerary.pois[sectionIndex-1];
                    $scope.prevTitle = $scope.prevSection.name[locale];
                }
                if (sectionIndex<$scope.currentItinerary.pois.length-1)
                {
                    $scope.nextSection = $scope.currentItinerary.pois[sectionIndex+1];
                    $scope.nextTitle= $scope.nextSection.name[locale];
                }

                $scope.setHeaderTitleAndLink(lang.menuSections.itineraries,"/itinerary");

                ScrollTop();
            }();





        }]);


angular.module(['touristGuideModule.controllers'])
    .controller('ItineraryHomeController', ['$scope','BookmarkServices',
        function($scope  ) {

            $scope.itinerarySections = itinerarySections;

            $scope.setHeaderTitleAndLink(lang.menuSections.itineraries,"/itinerary");

        }]);



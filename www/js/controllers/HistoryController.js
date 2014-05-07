angular.module(['touristGuideModule.controllers'])
    .controller('HistorySectionController', ['$scope', '$location','$routeParams','BookmarkServices',
        function($scope,$location,$routeParams,$bookmarkServices) {

            $scope.historySections=historySections;
            $scope.currentSection = null;
            $scope.prevSection=null;
            $scope.nextSection=null;
            $scope.nextTitle="";
            $scope.prevTitle="";

            $scope.showPrevSection = function() {
                if($scope.prevSection)
                    $location.url ("/history/{0}".format($scope.prevSection.slug));
            };

            $scope.showNextSection = function() {
                if($scope.nextSection)
                    $location.url ("/history/{0}".format($scope.nextSection.slug));
            };


            $scope.addBookmark = function()
            {
                $bookmarkServices.add (  $location.path(), "history", $scope.currentSection.menuTitle, $scope.currentSection.thumbnail   )
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

                $scope.currentSection = historySections.filter( function(elem,indx) {
                        if (elem.slug==$routeParams.section){
                            sectionIndex = indx;
                            return true;
                        }}
                )[0];

                $scope.title = $scope.currentSection.menuTitle;
                $scope.content = $scope.currentSection.text;
                $scope.centuryFrom = $scope.currentSection.centuries[0];
                $scope.centuryTo = $scope.currentSection.centuries[1];


                if(sectionIndex>0)
                {
                    $scope.prevSection = historySections[sectionIndex-1];
                    $scope.prevTitle = $scope.prevSection.menuTitle;
                }
                if (sectionIndex<historySections.length-1)
                {
                    $scope.nextSection = historySections[sectionIndex+1];
                    $scope.nextTitle= $scope.nextSection.menuTitle;
                }

                $scope.setHeaderTitleAndLink(lang.menuSections.history,"/history");

                ScrollTop();
            }();

        }]);



angular.module(['touristGuideModule.controllers'])
    .controller('HistoryHomeController', ['$scope',
        function($scope  ) {

            $scope.historySections=historySections;

            $scope.setHeaderTitleAndLink(lang.menuSections.history,"/history");

        }]);
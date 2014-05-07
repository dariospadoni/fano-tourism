angular.module(['touristGuideModule.controllers'])
    .controller('ArtSectionController', ['$scope', '$location','$routeParams','BookmarkServices',
        function($scope,$location,$routeParams,$bookmarkServices) {

            $scope.artSections=artSections;

            $scope.currentSection = null;
            $scope.prevSection=null;
            $scope.nextSection=null;
            $scope.nextTitle="";
            $scope.prevTitle="";

            $scope.showPrevSection = function() {
                if($scope.prevSection)
                    $location.url ("/art/{0}".format($scope.prevSection.slug));
            };

            $scope.showNextSection = function() {
                if($scope.nextSection)
                    $location.url ("/art/{0}".format($scope.nextSection.slug));
            };

            $scope.addBookmark = function()
            {
                $bookmarkServices.add (  $location.path(), "art", $scope.currentSection.menuTitle, $scope.currentSection.thumbnail );
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


                $scope.currentSection = artSections.filter( function(elem,indx) {
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
                    $scope.prevSection = artSections[sectionIndex-1];
                    $scope.prevTitle = $scope.prevSection.menuTitle;
                }
                if (sectionIndex<artSections.length-1)
                {
                    $scope.nextSection = artSections[sectionIndex+1];
                    $scope.nextTitle= $scope.nextSection.menuTitle;
                }

                $scope.setHeaderTitleAndLink(lang.menuSections.arts ,"/art");

                ScrollTop();
            }();


        }]);



angular.module(['touristGuideModule.controllers'])
    .controller('ArtHomeController', ['$scope',
        function($scope  ) {

            $scope.summary = artDataSummary[locale];

            $scope.setHeaderTitleAndLink(lang.menuSections.arts ,"/art");

            $scope.artSections=artSections;

        }]);
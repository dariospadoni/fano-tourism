

angular.module(['touristGuideModule.controllers'])
    .controller('BookmarksController', ['$scope','BookmarkServices',
        function($scope, bookmarkServices  ) {

            $scope.setHeaderTitleAndLink(lang.menuSections.bookmarks ,"/bookmarks");

            $scope.init=function(){
                $scope.bookmarks = bookmarkServices.loadBookmarks() || [];
                $scope.poiBookmarks = $scope.bookmarks.filter(function(t){return t.type=="poi"});
                $scope.historyBookmarks = $scope.bookmarks.filter(function(t){return t.type=="history"});
                $scope.artBookmarks = $scope.bookmarks.filter(function(t){return t.type=="art"});
                $scope.itineraryBookmarks = $scope.bookmarks.filter(function(t){return t.type=="itinerary"});
            };

            $scope.removeFav=function(url){
                bookmarkServices.remove(url);
                $scope.init();
            };

            $scope.init();

        }]);
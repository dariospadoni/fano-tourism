

angular.module(['touristGuideModule.controllers'])
    .controller('AroundMeController', ['$scope','BookmarkServices',
        function($scope, bookmarkServices  ) {

            $scope.setHeaderTitleAndLink(lang.menuSections.aroundMe,"/around");

            $scope.records = [];

            $scope.init = function(){

                $scope.records=[];

                if(currentPosition && currentPosition.coords && currentPosition.coords.latitude && currentPosition.coords.longitude)
                {
                    for(var i=0;i<AROUNDME_NUM_RECS;i++)
                    {
                        if(poiSections[i].distance<MAX_POI_DISTANCE)
                            $scope.records.push(poiSections[i]);
                    }
                };

            }();
        }]);
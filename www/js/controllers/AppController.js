angular.module(['touristGuideModule.controllers'])
    .controller('AppController', ['$scope', '$location',"LanguageServices",
        function($scope,$location,$languageServices) {
            $scope.lang = lang;

            $scope.showAlertDialog=false;

            var headerLink="#";
            var pathsNotCollapsingMenu = [];//["/art","/history","/event","/itinerary"];

            $scope.setHeaderTitleAndLink =function (title,link) {
                $scope.headerTitle=title;
                headerLink=link;
            };

            $scope.gotoHeaderLink=function(){
                $location.url(headerLink);
            };

            $scope.switchLanguage = function(){
                if(locale=="it")
                    locale="en";
                else
                    locale="it";
                lang=localization[locale];
                $scope.lang=lang;
                $languageServices.saveLanguage(locale);
                LoadArtSections();
                LoadHistorySections();
                LoadItinerarySections();
                LoadPoi();

                if(gaPlugin)
                    gaPlugin.trackEvent( null, null, "SetLanguage", "Switch", locale, 0);
            };

            var snapper = new Snap({  element: document.getElementById('content') });



            $scope.toggleSidebar = function() {
                if( snapper.state().state=="left" ){
                    snapper.close();
                } else {
                    snapper.open('left');
                }
            }

            $scope.$on('$routeChangeStart', function(next, current) {
                if( pathsNotCollapsingMenu.indexOf( $location.path() )==-1)
                    if( snapper.state().state=="left" )
                        snapper.close();

                //here pages which do not have controllers associated
                if($location.path()=="/phones")
                    $scope.setHeaderTitleAndLink( lang.menuSections.touristInfo, "/phones");
                else if($location.path()=="/gallery")
                {
                    $scope.setHeaderTitleAndLink( lang.menuSections.photoGallery , "/gallery");
                    InitCarousel();
                }
                else if($location.path()=="/credits")
                    $scope.setHeaderTitleAndLink( lang.menuSections.credits, "/credits");

                if(gaPlugin)
                    gaPlugin.trackPage( null, null, $location.path());
                else
                    console.log($location.path());
            });



            $scope.hideAlertMsg=function(){$scope.showAlertDialog=false;}
            $scope.showAlertMsg = function(title,msg){
                $scope.dialogTitle=title || lang.warning;
                $scope.dialogMessage=msg || lang.warning;
                $scope.showAlertDialog=true;
            };

            $scope.CalculateDistances = function (d){
                var res=[];
                angular.forEach(d,function(v){
                    if(!v.distance && v.location!=false)
                        v.distance = GetDistance(v.location.lat,v.location.lng, currentPosition.coords.latitude , currentPosition.coords.longitude);
                    res.push(v);
                });
                sortByDistance(res);
                return res;
            };

            $scope.getCurrentPosition = function (successCallback) {
                GetCurrentPosition(
                    successCallback ,
                    function(err)
                    {
                        $scope.showAlertMsg(null, lang.positionUnavailable);
                    }
                );
            };


            $scope.init = function(){
                $scope.setHeaderTitleAndLink(lang.welcome,"#");
                $scope.getCurrentPosition( function() { $scope.CalculateDistances(poiSections  )}); ;
            };

        }]);

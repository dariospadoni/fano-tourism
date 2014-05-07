

touristGuideModule.directive('scrollTop', function(){
    return {
        restrict: 'AC',

        link: function(scope, element, attrs) {
            element.bind('click', function() {
                $('body,html,.page-content').animate({
                    scrollTop:0
                }, 800, 'easeOutExpo');
            });
        }
    }
});

touristGuideModule.directive('backButton', function(){
    return {
        restrict: 'AC',

        link: function(scope, element, attrs) {
            //Detect user agent for known mobile devices and show hide elements for each specific element
            var isiPhone = 	  navigator.userAgent.toLowerCase().indexOf("iphone")>-1;
            var isiPad = 		navigator.userAgent.toLowerCase().indexOf("ipad")>-1;
            var isiPod = 		navigator.userAgent.toLowerCase().indexOf("ipod")>-1;
            var isiAndroid = 	navigator.userAgent.toLowerCase().indexOf("android")>-1;

            //show only for iOS
            if(isiPhone || isiPad || isiPod )
            {
                element.removeClass("ng-hide");
                element.bind('click', goBack);

            }
        }
    }
});


touristGuideModule.directive('submenuToggle', function(){
    return {
        restrict: 'AC',

        link: function(scope, element, attrs) {
            var $scope=scope;
            var section=  attrs.section;
            element.bind('click', toggle);
            function toggle() {
                $scope.toggleSubmenu(section);
                $scope.$apply();
                for(var i=0;i<document.getElementsByClassName("submenuToggle").length;i++)
                {
                    if (document.getElementsByClassName("submenuToggle")[i].attributes["section"].value!=section )
                        document.getElementsByClassName("submenuToggle")[i].className="dropdown-nav submenuToggle";
                }
                element.toggleClass('dropdown-nav');
                return false;
            }
        }
    }
});


touristGuideModule.directive('ngVisible', function () {
    return function (scope, element, attr) {
        scope.$watch(attr.ngVisible, function (visible) {
            element.css('visibility', visible ? 'visible' : 'hidden');
        });
    };
})
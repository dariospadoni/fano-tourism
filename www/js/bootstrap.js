angular.module('touristGuideModule.services', []);
angular.module('touristGuideModule.controllers', ['touristGuideModule.services']);

angular.module('touristGuideModule.filters', []).filter('distance', function() {
    return function(input) {
        if(input)
            return input.toDistance() ;
        return "";
    };
}).filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i<total; i++)
                input.push(i);
            return input;
        };
    }).filter('timestamp', function() {
        return function(input) {
            var d = Date(input);
            return dateFormat(d, "mmmm dd.yyyy");
        };
    }).filter('format', function() {
        return function(input, format) {
            return input.format(format);
        };
    }).filter('distance',function(){
        return function(input, format) {
            return lang.distance + ": " + input.toDistance();
        };
    });



var touristGuideModule = angular.module('touristGuideModule', [  'ngRoute' ,'ngTouch', 'ngSanitize', 'touristGuideModule.controllers', 'touristGuideModule.filters']);

touristGuideModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/history/:section', { templateUrl: 'views/history/history.html', controller: 'HistorySectionController' });
    $routeProvider.when('/history', { templateUrl: 'views/history/index.html' , controller: 'HistoryHomeController'});

    $routeProvider.when('/poi', { templateUrl: 'views/poi/index.html',controller: 'PoiHomeController'   });
    $routeProvider.when('/poi/:section', { templateUrl: 'views/poi/poi.html',controller: 'PoiSectionController'    });

    $routeProvider.when('/itinerary/:itinerary/:section?', { templateUrl: 'views/itinerary/itinerary.html', controller: 'ItinerarySectionController' });
    $routeProvider.when('/itinerary', { templateUrl: 'views/itinerary/index.html' , controller: 'ItineraryHomeController'});

    $routeProvider.when('/art/:section', { templateUrl: 'views/art/art.html', controller: 'ArtSectionController' });
    $routeProvider.when('/art', { templateUrl: 'views/art/index.html' , controller: 'ArtHomeController'});

    $routeProvider.when('/event/:section', { templateUrl: 'views/event/event.html', controller: 'EventSectionController' });
    $routeProvider.when('/event', { templateUrl: 'views/event/index.html' , controller: 'EventHomeController'});

//    $routeProvider.when('/eating', { templateUrl: 'views/eating/index.html' , controller: 'EatingHomeController'});
//    $routeProvider.when('/eating/:restaurant', { templateUrl: 'views/eating/restaurant.html' , controller: 'EatingItemController'});
//
//    $routeProvider.when('/sleeping', { templateUrl: 'views/sleeping/index.html' , controller: 'SleepingHomeController'});
//    $routeProvider.when('/sleeping/:hotel', { templateUrl: 'views/sleeping/hotel.html' , controller: 'SleepingItemController'});


    $routeProvider.when('/bookmarks', { templateUrl: 'views/bookmarks.html' , controller: 'BookmarksController'});

    $routeProvider.when('/search', { templateUrl: 'views/search.html' , controller: 'SearchController'});
    $routeProvider.when('/credits', { templateUrl: 'views/credits.html' });
    $routeProvider.when('/phones', { templateUrl: 'views/phones.html' });
    $routeProvider.when('/map', { templateUrl: 'views/map.html', controller:'MapController' });
    $routeProvider.when('/gallery', { templateUrl: 'views/gallery.html' });

    $routeProvider.when('/around', { templateUrl: 'views/around.html', controller:"AroundMeController" });
    $routeProvider.when('/home', { templateUrl: 'views/home.html', controller:"HomeController" });

    $routeProvider.otherwise({  templateUrl: 'views/home.html', controller: 'AppController'});
}]) ;





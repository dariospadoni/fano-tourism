
function onDeviceReady() {
    console.log('device ready');
    console.log('running fano tourist guide on ' + device.platform + " " + device.version);

    if(!navigator.onLine){
        console.log("No Internet connection!");
    }

    console.log('initializing Google Analytics plugin...');
    gaPlugin = window.plugins.gaPlugin;
    gaPlugin.init(function(){
            console.log("Google Analytics Plugin initialised...");
        }, function(){
            console.log("Error in Google Analytics Plugin initialization! " + args);
        },
        "UA-50456333-1", 1);

    gaPlugin.trackEvent( null, null, "App", "Start", "", 1);

    var appScope = angular.element( document.querySelector( 'body' ) ).scope()
    appScope.$apply(function(){
        appScope.init();
    })
}
document.addEventListener('deviceready', onDeviceReady, false);


function GetCurrentPosition (onSuccess,onError){
    console.log("Getting current position...");
    navigator.geolocation.getCurrentPosition(
        function(position)  {
            console.log("Current position " + position.coords.latitude + " " + position.coords.longitude);
            currentPosition =  position;

            if(onSuccess)
                onSuccess();
            gaPlugin.trackEvent( null, null, "GetCurrentPosition", "Success",  position.coords.latitude + " " + position.coords.longitude, 0);

        },

        function(err){
            console.log("Could't get current position " + error.code + " " +  error.message );
            gaPlugin.trackEvent( null, null, "GetCurrentPosition", "Error", "", 0);
            if(onError)
                onError(err)
            //alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        },

        { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
}
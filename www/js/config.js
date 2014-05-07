var MAX_POI_DISTANCE=10000;//10km
var AROUNDME_NUM_RECS=5;
var gaPlugin=null;
var currentPosition = {
    coords: {}
};



function GetCurrentPosition (success,error){
    currentPosition.coords={
        latitude:43.841765,
        longitude:13.019388
    }
    if(success)
        success();
};


 
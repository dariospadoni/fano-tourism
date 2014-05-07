String.prototype.format = function() {
    var pattern = /\{\d+\}/g ;
    var args = arguments;
    return this.replace(pattern, function(capture) { return args[capture.match( /\d+/ )]; });
};

String.prototype.contains = function(it) { return this.search(new RegExp(it, "i") ) !=-1 ;   };

function ScrollTop(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

String.prototype.excerpt = function(text, length){
    var index = this.search(new RegExp(text, "i") );
    if(index==-1) return "";
    var orig=this;
    var start = this.substr(0,index - parseInt(length/2)).lastIndexOf(" ")+1;
    var end = this.substring(start+length).indexOf(" ");
    return  "..." + this.substr(start ,  length+end) + "..." ;
};


String.prototype.stripHtmlTags = function () {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = this;
    return tmp.textContent || tmp.innerText || "";
}


function InitCarousel (){
    console.log("InitCarousel");
    setTimeout(function (){
        var owl = $(".slider-controls");
        owl.owlCarousel({
            //Basic Stuff
            singleItem:true,
            slideSpeed : 250,
            paginationSpeed : 250,
            rewindSpeed : 250,
            pagination:false,
            autoPlay : true
        });

        // Custom Navigation Events
        $(".next-slider").click(function(){
            owl.trigger('owl.next');
            return false;
        });
        $(".prev-slider").click(function(){
            owl.trigger('owl.prev');
            return false;
        });
    },10);
}

function AdjustHacksHeight(){
    //70 = .page-header height + .page-header margin-bottom
    var h = Math.min( $(window).height() - 90, $(".page-sidebar").height() );
    $(".page-content ").height($(window).height());
    $("#hideIfMobileHack,#hideIfRespHack").height( h);
    console.log("Adjusting height to " + h)
}


Number.prototype.toDistance = function(){
    if (this<1000)
        return Math.round(this) + " m";
    return ( this/1000).toFixed(2) + " km";
};

Number.prototype.toRad = function() {  return this * Math.PI / 180; };

function GetDistance(lat1,lon1,lat2,lon2){
    var R = 6371*1000; // km
    //has a problem with the .toRad() method below.
    var x1 = lat2-lat1;
    var dLat = x1.toRad();
    var x2 = lon2-lon1;
    var dLon = x2.toRad();
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
}

function sortByDistance (d){  d.sort(function(a,b){ return a.distance-b.distance;});  }


function goBack() {
    history.back();
    //scope.$apply();
}
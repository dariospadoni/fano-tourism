

touristGuideModule.factory('SearchServices', function(){

    return {
        search:function(text){
            console.log(text);

            //todo: aggiungere eventi e poi
            var historyMatching = historySections.filter(function(t){ return t.text.contains(text);});
            var artsMatching = artSections.filter(function(t){ return t.text.contains(text);});
            var poiMatching = poiSections.filter(function(t){ return t.content.contains(text) || t.name.contains(text);});
            console.log(historyMatching);
            console.log(artsMatching);
            console.log(poiMatching);


            return {
                history: historyMatching,
                pois:    poiMatching,
                arts:    artsMatching
            };


        }


    }

} );
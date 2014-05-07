

touristGuideModule.factory('LanguageServices', function(){

    return {

        keyBookmarks : "tg_lang",

        load: function(key){
            return angular.fromJson (localStorage.getItem(key));
        },
        store: function (key, obj){
            localStorage.setItem( key, JSON.stringify(  obj ) ) ;
        },

        saveLanguage: function (data) {
            this.store(this.keyBookmarks, data);
        },

        detect: function() {
            var loaded = this.load();
            if ( loaded!=null)
                return loaded;
            if(navigator.language && navigator.language == "it"){
                return "it";
            }
            return "en";
        }
    }

} );
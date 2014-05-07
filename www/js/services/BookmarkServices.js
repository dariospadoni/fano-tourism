

touristGuideModule.factory('BookmarkServices', function(){

    return {

        keyBookmarks : "tg_bookmarks",

        load: function(key){
            return angular.fromJson (localStorage.getItem(key));
        },
        store: function (key, obj){
            localStorage.setItem( key, JSON.stringify(  obj ) ) ;
        },

        loadBookmarks: function(){
            return this.load( this.keyBookmarks ) || null ;
        },
        saveBookmarks: function (data) {
            this.store(this.keyBookmarks, data);
        },

        add : function(url,type,name,image){
            var bookmarks =this.load( this.keyBookmarks ) || [];
            bookmarks.push ({
                url:url, name:name, type:type, thumbnail: image
            });
            this.saveBookmarks(bookmarks);
        },

        remove: function(url){
            var bookmarks =this.load( this.keyBookmarks );
            var newList = [];
            for (var i=0;i<bookmarks.length;i++)
            {
                if (bookmarks[i].url!=url )
                    newList.push(bookmarks[i]);
            }
            this.saveBookmarks(newList);
        },

        findByUrl: function(url) {
             var bookmarks =this.load( this.keyBookmarks );
             if(bookmarks)
             {
                return bookmarks.filter(function(t){ return t.url==url})[0];
             }
             else
                 return null;
        }
    }

} );
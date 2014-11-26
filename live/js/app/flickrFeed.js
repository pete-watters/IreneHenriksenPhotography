$(window).bind("load", function() {
    $('#loading').fadeOut(2000);
    $('#wrapper').fadeIn(2000);
});

$(document).ready(function(){

     var PhotoCollection = Backbone.Collection.extend({
        url: 'http://api.flickr.com/services/feeds/photos_public.gne?id=129516682@N05&tags=live&tagmode=any&format=json&jsoncallback=?',
        parse: function(response) {
            return response.items;
        }
    });

    var PhotoView = Backbone.View.extend({
        el: $('#reel'),
        initialize: function() {
            _.bindAll(this, 'render');
            photoCollectionInstance.fetch({
                success: function(response, xhr) {
                    photoView.render();
                     // NB need to run init.js AFTER images have been obtained and written to DOM
                    $.getScript("js/app/init.js");
                }
            });
        },
        render: function() {
            for (var i = 0; i < photoCollectionInstance.length; i++) {

                        var imageTitle =  photoCollectionInstance.models[i].attributes.title;

                        var defaultSizeImage = photoCollectionInstance.models[i].attributes.media.m;
                        // need to manually change the image size in URL to get full size
                        var largeSizeImage = defaultSizeImage.replace("_m.jpg", "_b.jpg");

                        $(this.el).append('<article class="item thumb" data-width="282">'
                                            + '<h2>' + imageTitle + '</h2>'
                                            + '<a href="'+  largeSizeImage +'">'
                                            + '<img src="'+ defaultSizeImage +'" '
                                            + 'alt="' + imageTitle + '"></a>'
                                            + '</article>');
            }
        }
    });

    var photoCollectionInstance = new PhotoCollection();
    var photoView = new PhotoView();

});
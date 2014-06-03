require.config({
    baseUrl: 'scripts',
    paths: {
        jquery: 'jquery-1.11.1'
    }
});

require(['jquery', '../dist/jquery.dragger.amd.js'], function ($, Dragger) {

    'use strict';

    var example = new Dragger('.example', {
        drag: function (pos) {
            this.$el.find('img').css({ transform: 'translate('+pos.x+'px,'+pos.y+'px)' });
        }
    });

});
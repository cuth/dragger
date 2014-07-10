require.config({
    baseUrl: 'scripts/vendor',
    paths: {
        jquery: 'jquery-1.11.1'
    }
});

require(['jquery', '../dist/dragger.amd.js'], function ($, Dragger) {

    'use strict';

    var example = new Dragger('.example', {
        drag: function (pos) {
            $(this.el).find('img').css({ transform: 'translate('+pos.x+'px,'+pos.y+'px)' });
        }
    });

});
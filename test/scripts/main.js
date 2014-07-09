/*global Dragger */

(function (exports, $) {
    'use strict';

    // Transform
    exports.transform = new Dragger('.transform', {
        drag: function (pos) {
            $(this.el).find('img').css({ transform: 'translate('+pos.x+'px,'+pos.y+'px)' });
        },
        stop: function () {
            console.log(arguments);
        },
        allowVerticalScrolling: true
    });

    // Position
    exports.position = new Dragger('.position', {
        drag: function (pos) {
            $(this.el).find('img').css({ left: pos.x, top: pos.y });
        },
        stop: function () {
            console.log(arguments);
        },
        allowHorizontalScrolling: true
    });

    // Scroll
    (function () {
        var $scroll = $('.scroll'),
            $img = $scroll.find('img'),
            xSpace = $img.width() - $scroll.width(),
            ySpace = $img.height() - $scroll.height();

        exports.scroll = new Dragger($scroll[0], {
            drag: function (pos) {
                $scroll.scrollLeft(-pos.x);
                $scroll.scrollTop(-pos.y);
            },
            stop: function () {
                console.log(arguments);
            }
        });

        // Set the dragger bounds when adjusting scroll
        exports.scroll.setBounds({
            maxX: 0,
            maxY: 0,
            minX: -xSpace,
            minY: -ySpace
        });

        // Internet Explorer saves the scroll position and restores it after window load.
        $(window).load(function () {
            exports.scroll.setPosition({
                x: -$scroll.scrollLeft(),
                y: -$scroll.scrollTop()
            });
        });
    }());

    // Drag
    exports.drag = new Dragger('.drag img', {
        drag: function (pos) {
            $(this.el).css({ left: pos.x, top: pos.y });
        },
        stop: function () {
            console.log(arguments);
        }
    });

    // Text and Links
    exports.text = new Dragger('.text', {
        drag: function (pos) {
            $(this.el).find('.wrap').css({ left: pos.x, top: pos.y });
        },
        stop: function () {
            console.log(arguments);
        }
    });

    // Destroy
    exports.destroy = new Dragger('.destroy', {
        drag: function (pos) {
            $(this.el).find('img').css({ left: pos.x, top: pos.y });
        },
        stop: function () {
            console.log(arguments);
        },
        allowHorizontalScrolling: true
    });
    console.log($.extend({}, exports.destroy));
    exports.destroy.uninit();
    console.log($.extend({}, exports.destroy));
    exports.destroy.init();
    console.log($.extend({}, exports.destroy));

}(this, jQuery));
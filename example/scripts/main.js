//$('img').on('dragstart', function(event) { event.preventDefault(); });
var test = test || {};

// Transform
(function ($) {
    "use strict";
    test.transform = new Dragger('.transform', {
        drag: function (pos) {
            $(this.el).find('img').css({ transform: 'translate('+pos.x+'px,'+pos.y+'px)' });
        },
        stop: function () {
            console.log(arguments);
        },
        allowVerticalScrolling: true
    });
}(jQuery));

// Position
(function ($) {
    "use strict";
    test.position = new Dragger('.position', {
        drag: function (pos) {
            $(this.el).find('img').css({ left: pos.x, top: pos.y });
        },
        stop: function () {
            console.log(arguments);
        },
        allowHorizontalScrolling: true
    });
}(jQuery));

// Scroll
(function ($) {
    "use strict";
    var $scroll = $('.scroll'),
        $img = $scroll.find('img'),
        xSpace = $img.width() - $scroll.width(),
        ySpace = $img.height() - $scroll.height();
    test.scroll = new Dragger($scroll[0], {
        drag: function (pos) {
            $scroll.scrollLeft(-pos.x);
            $scroll.scrollTop(-pos.y);
        },
        stop: function () {
            console.log(arguments);
        }
    });

    // Set the dragger bounds when adjusting scroll
    test.scroll.setBounds({
        maxX: 0,
        maxY: 0,
        minX: -xSpace,
        minY: -ySpace
    });

    // Internet Explorer saves the scroll position and restores it after window load.
    $(window).load(function () {
        test.scroll.setPosition({
            x: -$scroll.scrollLeft(),
            y: -$scroll.scrollTop()
        });
    });
}(jQuery));

// Drag
(function ($) {
    "use strict";
    test.drag = new Dragger('.drag img', {
        drag: function (pos) {
            $(this.el).css({ left: pos.x, top: pos.y });
        },
        stop: function () {
            console.log(arguments);
        }
    });
}(jQuery));

// Text and Links
(function ($) {
    "use strict";
    var positionStart;

    test.text = new Dragger('.text', {
        drag: function (pos) {
            $(this.el).find('.wrap').css({ left: pos.x, top: pos.y });
        },
        stop: function () {
            console.log(arguments);
        }
    });
}(jQuery));
//$('img').on('dragstart', function(event) { event.preventDefault(); });
var test = test || {};

// Transform
(function ($) {
    "use strict";
    test.transform = new Dragger('.transform', {
        drag: function (pos) {
            this.$el.find('img').css({ transform: 'translate('+pos.x+'px,'+pos.y+'px)' });
        },
        allowVerticalScrolling: true
    });
}(jQuery));

// Position
(function ($) {
    "use strict";
    test.position = new Dragger('.position', {
        drag: function (pos) {
            this.$el.find('img').css({ left: pos.x, top: pos.y });
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
    test.scroll = new Dragger($scroll, {
        drag: function (pos) {
            this.$el.scrollLeft(-pos.x);
            this.$el.scrollTop(-pos.y);
        },
        bounds: {
            maxX: 0,
            maxY: 0,
            minX: -xSpace,
            minY: -ySpace
        }
    });
}(jQuery));

// Drag
(function ($) {
    "use strict";
    test.drag = new Dragger('.drag img', {
        drag: function (pos) {
            this.$el.css({ left: pos.x, top: pos.y });
        }
    });
}(jQuery));
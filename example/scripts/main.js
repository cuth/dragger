//$('img').on('dragstart', function(event) { event.preventDefault(); });
var test = test || {};

// Transform
(function ($) {
    "use strict";
    test.transform = new Dragger('.transform', {
        drag: function (x, y) {
            this.$el.find('img').css({ transform: 'translate('+x+'px,'+y+'px)' });
        }
    });
}(jQuery));

// Position
(function ($) {
    "use strict";
    test.position = new Dragger('.position', {
        drag: function (x, y) {
            this.$el.find('img').css({ left: x, top: y });
        }
    });
}(jQuery));

// Scroll
(function ($) {
    "use strict";
    test.scroll = new Dragger('.scroll', {
        drag: function (x, y) {
            this.$el.scrollLeft(-x);
            this.$el.scrollTop(-y);
        }
    });
}(jQuery));
//$('img').on('dragstart', function(event) { event.preventDefault(); });
var test = test || {};

// Transform
(function ($) {
    "use strict";
    test.transform = new Dragger('.transform', {
        drag: function (pos) {
            this.$el.find('img').css({ transform: 'translate('+pos.x+'px,'+pos.y+'px)' });
        }
    });
}(jQuery));

// Position
(function ($) {
    "use strict";
    test.position = new Dragger('.position', {
        drag: function (pos) {
            this.$el.find('img').css({ left: pos.x, top: pos.y });
        }
    });
}(jQuery));

// Scroll
(function ($) {
    "use strict";
    test.scroll = new Dragger('.scroll', {
        drag: function (pos) {
            this.$el.scrollLeft(-pos.x);
            this.$el.scrollTop(-pos.y);
        }
    });
}(jQuery));
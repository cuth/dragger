Dragger
=======

Dragger is a modules that gives you the ability to drag anything with either the mouse or touch event. How this script works is that you send the constructor a element that watches for mouse and touch events. Add functions that run on start, drag, and stop that pass an object with x and y parameters to indicate how far the mouse or touch event has traveled. Use the returned x and y position to change a position left and position top or translateX and translateY or scrollLeft and scrollTop or marginLeft and marginTop.

Example
-------
```javascript
// Use any element, jQuery object or selector as the first parameter
// Use an object to overwrite the defaults for the second parameter
new Dragger('#elementId', {
    'start': function (pos) {
        // drag has started
        // pos.x is the initial left position
        // pos.y is the initial top position
    },
    'drag': function (pos) {
        // drag has moved
        // pos.x is the new left position
        // pos.y is the new top position
    },
    'stop': function (pos) {
        // mouse or touch has ended
        if (pos) {
            // position has changed from the original position
            // pos.x is the final left position
            // pos.y is the final top position
        }
    },
    'initX': 0, // set the initial X position if it is not zero
    'initY': 0, // set the initial Y position if it is not zero
    'allowVerticalScrolling': true, // set this to allow vertical scrolling on touch devices
    'allowHorizontalScrolling': true, // set this to allow vertical scrolling on touch devices
    'bounds': {
        minX: null,
        maxX: null,
        minY: null,
        maxY: null
    } // set the bounds object to prevent dragging past any of these values.
});
```

If you are dragging anchor tags in IE you will need to prevent the 'dragstart' event as well as set a flag to stop any subsequent 'click' event.
```javascript
var preventClick = false;
$('a', '#context').on('dragstart', function (e) {
    e.preventDefault();
    preventClick = true;
}).on('click', function (e) {
    if (preventClick) {
        e.preventDefault();
        preventClick = false;
    }
});
```

jQuery
------
The only requirement is jQuery but it might be easy to write this script without this reqirement. JQuery is only used for binding events and extending objects.
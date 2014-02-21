Dragger
=======

Dragger is a modules that gives you the ability to drag anything with either the mouse or touch event. How this script works is that you send the constructor a element that watches for mouse and touch events. Add functions that run on start, drag, and stop that pass an object with x and y parameters to indicate how far the mouse or touch event has traveled. Use the returned x and y position to change a position left and position top or translateX and translateY or scrollLeft and scrollTop or marginLeft and marginTop.

Example
-------
```javascript
new Dragger(el, {
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
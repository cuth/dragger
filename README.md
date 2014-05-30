Dragger
=======

Dragger is a module that gives you the ability to drag anything with either the mouse or touch events. It doesn't do anything to the element except for add listeners. Add the functions 'start', 'drag', and 'stop' to get the position at each step.

Example
-------
```javascript
// Use an element or query selector as the first parameter
// Use an object to overwrite the defaults for the second parameter
var dragger = new Dragger('#elementId', {
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
    'stop': function (pos, hasChanged) {
        // mouse or touch has ended
        if (hasChanged) {
            // position has changed from the original position
            // pos.x is the final left position
            // pos.y is the final top position
        }
    },
    'initX': 0, // set the initial X position if it is not zero
    'initY': 0, // set the initial Y position if it is not zero
    'allowVerticalScrolling': true, // set this to allow vertical scrolling on touch devices
    'allowHorizontalScrolling': true // set this to allow horizontal scrolling on touch devices
});

// If the position of the element that is being dragged has changed, let the dragger know
dragger.setPosition({
    x: 0,
    y: 0
});

// If an element can't be dragged past a certain area, set the bounds
dragger.setBounds(
    minX: null,
    maxX: null,
    minY: null,
    maxY: null
});

// Check to see if the dragger handle has moved before allowing a click
dragger.hasDragged(); // returns true or false
```

jQuery
------
The jQuery version supports jQuery objects as the first parameter as well as a jQuery plugin syntax.
```javascript
var dragger = $('#elementId').Dragger(/* { options } */);
```
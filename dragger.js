/* dragger
 * version: 1.0.3
 * https://github.com/cuth/dragger
 */
;(function (exports) {
    'use strict';

    var defaults = {
        drag: null,
        start: null,
        stop: null,
        initX: 0,
        initY: 0,
        allowVerticalScrolling: false,
        allowHorizontalScrolling: false
    };

    var defaultBounds = {
        minX: null,
        maxX: null,
        minY: null,
        maxY: null
    };

    var extend = function (obj) {
        if (typeof obj !== 'object') return obj;
        Array.prototype.slice.call(arguments, 1).forEach(function (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        });
        return obj;
    };

    var setBounds = function (newBounds) {
        extend(this.bounds, newBounds);
    };

    var setPosition = function (pos) {
        extend(this.handle, pos);
        this.handleMove = this.handle;
    };

    var getPageScroll = function () {
        return {
            x: (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
            y: (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
        };
    };

    var getNewPos = function (cursorPos) {
        var diffX, diffY, newX, newY;

        // measure the difference from when the drag started till now
        diffX = cursorPos.x - this.dragStart.x;
        diffY = cursorPos.y - this.dragStart.y;

        // check to see if there has been any change since it was called last
        if (diffX === this.dragStart.diffX &&
            diffY === this.dragStart.diffY) {
            return false;
        }

        // store the difference variables to check if position has changed
        this.dragStart.diffX = diffX;
        this.dragStart.diffY = diffY;

        // set the new handle position
        newX = diffX + this.handle.x;
        newY = diffY + this.handle.y;

        // keep the new position inside the bounds
        if (typeof this.bounds.minX === 'number') {
            newX = Math.max(newX, this.bounds.minX);
        }
        if (typeof this.bounds.maxX === 'number') {
            newX = Math.min(newX, this.bounds.maxX);
        }
        if (typeof this.bounds.minY === 'number') {
            newY = Math.max(newY, this.bounds.minY);
        }
        if (typeof this.bounds.maxY === 'number') {
            newY = Math.min(newY, this.bounds.maxY);
        }

        return {
            x: newX,
            y: newY
        };
    };

    var startDrag = function (cursorPos) {
        var pageScroll = getPageScroll();
        this.dragStart = {
            x: cursorPos.x,
            y: cursorPos.y,
            diffX: 0,
            diffY: 0,
            scrollX: pageScroll.x,
            scrollY: pageScroll.y
        };
        if (typeof this.opts.start === 'function') {
            this.opts.start.call(this, this.handle);
        }
    };

    var moveHandle = function (cursorPos) {
        var newPos = getNewPos.call(this, cursorPos);
        this.handleMove = newPos;
        if (newPos && typeof this.opts.drag === 'function') {
            this.opts.drag.call(this, newPos);
        }
    };

    var stopDrag = function (fail) {
        if (this.isDragging && this.handleMove) {
            this.handle = this.handleMove;
        }
        if (typeof this.opts.stop === 'function') {
            this.opts.stop.call(this, !fail && this.handle);
        }
        this.isDragging = false;
    };

    var eventMouseDown = function (e) {
        document.onselectstart = function () { return false; };
        this.isDragging = true;
        startDrag.call(this, { x: e.clientX, y: e.clientY });
    };

    var eventMouseMove = function (e) {
        if (!this.isDragging) return;
        moveHandle.call(this, { x: e.clientX, y: e.clientY });
    };

    var eventMouseUp = function (e) {
        document.onselectstart = null;
        if (!this.isDragging) return;
        stopDrag.call(this);
    };

    var eventTouchStart = function (e) {
        // Allow touch to scroll the page before setting isDragging to true
        this.isDragging = false;
        startDrag.call(this, { x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    var didPageScroll = function () {
        var pageScroll = getPageScroll();
        if (this.opts.allowVerticalScrolling && pageScroll.y !== this.dragStart.scrollY) {
            return true;
        }
        if (this.opts.allowHorizontalScrolling && pageScroll.x !== this.dragStart.scrollX) {
            return true;
        }
        return false;
    };

    var didDragEnough = function (pos) {
        if (!this.opts.allowVerticalScrolling && Math.abs(pos.y - this.dragStart.y) > 10) {
            return true;
        }
        if (!this.opts.allowHorizontalScrolling && Math.abs(pos.x - this.dragStart.x) > 10) {
            return true;
        }
        return false;
    };

    var eventTouchMove = function (e) {
        if (this.isScrolling) return true;
        var pos = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
        if (!this.isDragging) {

            // check to see if the page has scrolled since touch has started
            if (didPageScroll.call(this)) {
                this.isScrolling = true;
                return true;
            }
            if (didDragEnough.call(this, pos)) {
                this.isDragging = true;
            } else {
                return true;
            }
        }
        e.preventDefault();
        moveHandle.call(this, pos);
    };

    var eventTouchEnd = function (e) {
        if (this.isDragging && !this.isScrolling) {
            e.preventDefault();
            stopDrag.call(this);
            return false;
        }
        stopDrag.call(this, true);
        this.isScrolling = false;
    };

    var preventDragStart = function (e) {
        //if (e.target.tagName === 'IMG' || e.target.tagName === 'A') {
            e.preventDefault();
        //}
    };

    var bindEvents = function () {
        this.el.addEventListener('mousedown', eventMouseDown.bind(this));
        document.addEventListener('mousemove', eventMouseMove.bind(this));
        document.addEventListener('mouseup', eventMouseUp.bind(this));
        this.el.addEventListener('touchstart', eventTouchStart.bind(this));
        this.el.addEventListener('touchmove', eventTouchMove.bind(this));
        this.el.addEventListener('touchend', eventTouchEnd.bind(this));
        this.el.addEventListener('dragstart', preventDragStart.bind(this));
    };

    var init = function (el, options) {
        this.el = (typeof el === 'string') ? document.querySelector(el) : el;
        if (typeof this.el !== 'object') return false;
        this.opts = extend({}, defaults, options);
        this.bounds = extend({}, defaultBounds);

        // initial position of the element that will be dragged
        this.handle = { x: this.opts.initX, y: this.opts.initY };

        // position of the element while it is moving
        this.handleMove = { x: 0, y: 0 };

        // set this object at the beginning of the drag
        this.dragStart = { x: 0, y: 0, diffX: 0, diffY: 0, scrollX: 0, scrollY: 0 };

        this.isDragging = false;
        this.isScrolling = false;

        bindEvents.call(this);
        return true;
    };

    var Dragger = function (el, options) {
        this.result = init.call(this, el, options);
    };
    Dragger.prototype.setBounds = setBounds;
    Dragger.prototype.setPosition = setPosition;

    exports.Dragger = Dragger;
}(this));
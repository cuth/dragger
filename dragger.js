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

    var getNewPos = function (cursorPos, force) {
        var diffX = cursorPos.x - this.dragStart.mouseX,
            diffY = cursorPos.y - this.dragStart.mouseY,
            newX, newY;
        if (!force && (diffX === this.dragStart.diffX && diffY === this.dragStart.diffY)) return false;
        this.dragStart.diffX = diffX;
        this.dragStart.diffY = diffY;
        newX = diffX + this.handle.x;
        newY = diffY + this.handle.y;
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

    var moveHandle = function (cursorPos) {
        var newPos = getNewPos.call(this, cursorPos);
        this.handleMove = newPos;
        if (newPos && typeof this.opts.drag === 'function') {
            this.opts.drag.call(this, newPos);
        }
    };

    var stopDrag = function (fail) {
        if (this.dragging && this.handleMove) {
            this.handle = this.handleMove;
        }
        if (typeof this.opts.stop === 'function') {
            this.opts.stop.call(this, !fail && this.handle);
        }
        this.dragging = false;
    };

    var startDrag = function (cursorPos) {
        var pageScroll = getPageScroll();
        this.dragStart = {
            mouseX: cursorPos.x,
            mouseY: cursorPos.y,
            diffX: 0,
            diffY: 0,
            scrollX: pageScroll.x,
            scrollY: pageScroll.y
        };
        if (typeof this.opts.start === 'function') {
            this.opts.start.call(this, this.handle);
        }
    };

    var bindEvents = function () {
        var self = this;
        console.log(this.el);
        console.log(this.el.addEventListener);
        this.el.addEventListener('mousedown', function (e) {
            document.onselectstart = function () { return false; };
            self.dragging = true;
            startDrag.call(self, { x: e.clientX, y: e.clientY });
        });
        document.addEventListener('mousemove', function (e) {
            if (!self.dragging) return;
            moveHandle.call(self, { x: e.clientX, y: e.clientY });
        });
        document.addEventListener('mouseup', function () {
            document.onselectstart = null;
            if (!self.dragging) return;
            stopDrag.call(self);
        });
        this.el.addEventListener('touchstart', function (e) {
            self.dragging = false;
            startDrag.call(self, { x: e.touches[0].clientX, y: e.touches[0].clientY });
        });
        this.el.addEventListener('touchmove', function (e) {
            if (!self.dragging) {
                if (self.flagScroll) return true;
                var pageScroll = getPageScroll();
                if ((self.opts.allowVerticalScrolling && pageScroll.y !== self.dragStart.scrollY) || (self.opts.allowHorizontalScrolling && pageScroll.x !== self.dragStart.scrollX)) {
                    self.flagScroll = true;
                    return true;
                }
                if ((!self.opts.allowVerticalScrolling && Math.abs(e.touches[0].clientY - self.dragStart.mouseY) > 10) || (!self.opts.allowHorizontalScrolling && Math.abs(e.touches[0].clientX - self.dragStart.mouseX) > 10)) {
                    self.dragging = true;
                } else {
                    return true;
                }
            }
            e.preventDefault();
            moveHandle.call(self, { x: e.touches[0].clientX, y: e.touches[0].clientY });
        });
        this.el.addEventListener('touchend', function (e) {
            if (self.dragging && !self.flagScroll) {
                e.preventDefault();
                stopDrag.call(self);
                return false;
            }
            stopDrag.call(self, true);
            self.flagScroll = false;
        });
        if (this.el.tagName === 'IMG') {
            this.el.addEventListener('dragstart', function (e) {
                e.preventDefault();
            });
        } else {
            this.el.querySelector('img').addEventListener('dragstart', function (e) {
                e.preventDefault();
            });
        }
    };

    var init = function (el, options) {
        this.el = (typeof el === 'string') ? document.querySelector(el) : el;
        if (typeof this.el !== 'object') return false;
        this.opts = extend({}, defaults, options);
        this.bounds = extend({}, defaultBounds);
        this.handle = { x: this.opts.initX, y: this.opts.initY };
        this.handleMove = { x: 0, y: 0 };
        this.dragStart = { mouseX: 0, mouseY: 0, diffX: 0, diffY: 0, scrollX: 0, scrollY: 0 };
        this.dragging = false;
        this.flagScroll = false;
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
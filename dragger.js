/* dragger
 * version: 1.1
 * https://github.com/cuth/dragger
 */
;(function (exports, $) {
    "use strict";
    var defaults = {
            drag: null,
            start: null,
            stop: null,
            initX: 0,
            initY: 0,
            bounds: {
                minX: null,
                maxX: null,
                minY: null,
                maxY: null
            },
            allowVerticalScrolling: false,
            allowHorizontalScrolling: false
        },
        setBounds = function (newBounds) {
            $.extend(this.opts.bounds, newBounds);
        },
        setPosition = function (pos) {
            $.extend(this.handle, pos);
        },
        getPageScroll = function () {
            return {
                x: (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
                y: (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
            }
        },
        getNewPos = function (cursorPos, force) {
            var diffX = cursorPos.x - this.dragStart.mouseX,
                diffY = cursorPos.y - this.dragStart.mouseY,
                newX, newY;
            if (!force && (diffX === this.dragStart.diffX && diffY === this.dragStart.diffY)) return false;
            this.dragStart.diffX = diffX;
            this.dragStart.diffY = diffY;
            newX = diffX + this.handle.x;
            newY = diffY + this.handle.y;
            if (typeof this.opts.bounds.minX === 'number') {
                newX = Math.max(newX, this.opts.bounds.minX);
            }
            if (typeof this.opts.bounds.maxX === 'number') {
                newX = Math.min(newX, this.opts.bounds.maxX);
            }
            if (typeof this.opts.bounds.minY === 'number') {
                newY = Math.max(newY, this.opts.bounds.minY);
            }
            if (typeof this.opts.bounds.maxY === 'number') {
                newY = Math.min(newY, this.opts.bounds.maxY);
            }
            return {
                x: newX,
                y: newY
            };
        },
        moveHandle = function (cursorPos) {
            var newPos = getNewPos.call(this, cursorPos);
            this.handleMove = newPos;
            if (newPos && typeof this.opts.drag === 'function') {
                this.opts.drag.call(this, newPos);
            }
        },
        stopDrag = function (fail) {
            if (this.dragging && this.handleMove) {
                this.handle = this.handleMove;
            }
            if (typeof this.opts.stop === 'function') {
                this.opts.stop.call(this, !fail && this.handle);
            }
            this.dragging = false;
        },
        startDrag = function (cursorPos) {
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
        },
        bindEvents = function () {
            var self = this;
            this.$el.on('mousedown', function (e) {
                document.onselectstart = function () { return false };
                self.dragging = true;
                startDrag.call(self, { x: e.clientX, y: e.clientY });
            });
            $(document).on('mousemove', function (e) {
                if (!self.dragging) return;
                moveHandle.call(self, { x: e.clientX, y: e.clientY });
            });
            $(document).on('mouseup', function (e) {
                document.onselectstart = null;
                if (!self.dragging) return;
                stopDrag.call(self);
            });
            this.$el.on('touchstart', function (e) {
                self.dragging = false;
                startDrag.call(self, { x: e.originalEvent.touches[0].clientX, y: e.originalEvent.touches[0].clientY });
            });
            this.$el.on('touchmove', function (e) {
                if (!self.dragging) {
                    if (self.flagScroll) return true;
                    var pageScroll = getPageScroll();
                    if ((self.opts.allowVerticalScrolling && pageScroll.y !== self.dragStart.scrollY) || (self.opts.allowHorizontalScrolling && pageScroll.x !== self.dragStart.scrollX)) {
                        self.flagScroll = true;
                        return true;
                    }
                    if ((!self.opts.allowVerticalScrolling && Math.abs(e.originalEvent.touches[0].clientY - self.dragStart.mouseY) > 10) || (!self.opts.allowHorizontalScrolling && Math.abs(e.originalEvent.touches[0].clientX - self.dragStart.mouseX) > 10)) {
                        self.dragging = true;
                    } else {
                        return true;
                    }
                }
                e.preventDefault();
                moveHandle.call(self, { x: e.originalEvent.touches[0].clientX, y: e.originalEvent.touches[0].clientY });
            });
            this.$el.on('touchend', function (e) {
                if (self.dragging && !self.flagScroll) {
                    e.preventDefault();
                    stopDrag.call(self);
                    return false;
                }
                stopDrag.call(self, true);
                self.flagScroll = false;
            });
            if (this.$el.is('img')) {
                this.$el.on('dragstart', function (e) {
                    e.preventDefault();
                });
            } else {
                this.$el.on('dragstart', 'img', function (e) {
                    e.preventDefault();
                });
            }
        },
        init = function (el, options) {
            this.$el = $(el);
            if (!this.$el.length) return false;
            this.opts = $.extend(true, {}, defaults, options);
            this.handle = { x: this.opts.initX, y: this.opts.initY };
            this.handleMove = { x: 0, y: 0 };
            this.dragStart = { mouseX: 0, mouseY: 0, diffX: 0, diffY: 0, scrollX: 0, scrollY: 0 };
            this.dragging = false;
            this.flagScroll = false;
            bindEvents.call(this);
            return true;
        };
    exports.Dragger = function (el, options) {
        this.result = init.call(this, el, options);
    };
    exports.Dragger.prototype.setBounds = setBounds;
    exports.Dragger.prototype.setPosition = setPosition;
}(this, jQuery));
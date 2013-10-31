(function (namespace, $) {
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
            }
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
            if (newPos && typeof this.opts.drag === 'function') {
                this.opts.drag.call(this, newPos);
            }
        },
        stopDrag = function (cursorPos) {
            if (!this.dragging) return;
            var newPos = getNewPos.call(this, cursorPos, true);
            this.handle.x = newPos.x;
            this.handle.y = newPos.y;
            if (typeof this.opts.stop === 'function') {
                this.opts.stop.call(this, newPos);
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
            this.$el.bind('mousedown', function (e) {
                document.onselectstart = function () { return false };
                self.dragging = true;
                startDrag.call(self, { x: e.clientX, y: e.clientY });
            });
            $(document).bind('mouseup', function (e) {
                document.onselectstart = null;
                if (!self.dragging) return;
                //moveHandle.call(self, { x: e.clientX, y: e.clientY });
                stopDrag.call(self, { x: e.clientX, y: e.clientY });
            });
            $(document).bind('mousemove', function (e) {
                if (!self.dragging) return;
                moveHandle.call(self, { x: e.clientX, y: e.clientY });
            });
            this.$el.bind('touchstart', function (e) {
                self.dragging = false;
                startDrag.call(self, { x: e.originalEvent.touches[0].clientX, y: e.originalEvent.touches[0].clientY });
            });
            this.$el.bind('touchend', function (e) {
                if (self.dragging && !self.flagScroll) {
                    e.preventDefault();
                    stopDrag.call(self, { x: e.originalEvent.touches[0].clientX, y: e.originalEvent.touches[0].clientY });
                    return false;
                }
                self.flagScroll = false;
            });
            this.$el.bind('touchmove', function (e) {
                if (!self.dragging) {
                    if (self.flagScroll || getPageScroll().y !== self.dragStart.scrollY) {
                        self.flagScroll = true;
                        return true;
                    }
                    if (Math.abs(e.originalEvent.touches[0].clientX - self.dragStart.mouseX) > 10) {
                        self.dragging = true;
                    } else {
                        return true;
                    }
                }
                e.preventDefault();
                moveHandle.call(self, { x: e.originalEvent.touches[0].clientX, y: e.originalEvent.touches[0].clientY });
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
            this.opts = $.extend({}, defaults, options);
            this.handle = { x: this.opts.initX, y: this.opts.initY };
            this.dragStart = { mouseX: 0, mouseY: 0, diffX: 0, diffY: 0, scrollX: 0, scrollY: 0 };
            this.dragging = false;
            this.flagScroll = false;
            bindEvents.call(this);
            return true;
        };
    namespace.Dragger = function (el, options) {
        this.result = init.call(this, el, options);
    };
} (this, jQuery));
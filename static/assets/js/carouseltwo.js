! function(s) {
    var l = "-animated";
    AsanaAnimations = {
        isOnScreen: function(t, e) {
            if (e = e || 0, t.length) {
                var n = {};
                n.top = s(window).scrollTop(), n.bottom = n.top + s(window).height();
                var r = {};
                return r.top = t.offset().top + e, r.bottom = r.top + t.outerHeight(), n.top >= r.top || r.top <= n.bottom && r.bottom >= n.top
            }
        },
        animateVisibleElement: function() {
            s("[data-animate-scroll]").each(function() {
                var t = s(this),
                    e = AsanaAnimations.isOnScreen(t),
                    n = t.prop("nodeName");
                "VIDEO" !== n && 1 == e && t.addClass(l)
            })
        },
        lazyLoadVideo: function(t) {
            var e = s(t),
                n = e.attr("src"),
                r = e.attr("data-src");
            if (void 0 === n) return e.attr("src", r)
        },
        animateVisibleVideo: function() {
            s(".videoAnimation").each(function() {
                var t = s(this),
                    e = t.height(),
                    n = -Math.abs(2 * e),
                    r = AsanaAnimations.isOnScreen(t, n),
                    i = AsanaAnimations.isOnScreen(t, e),
                    o = t.is(":visible"),
                    a = t.parent().is(":visible");
                1 == r && o && AsanaAnimations.lazyLoadVideo(this), 1 == i && a && (t.hasClass(l) || t[0].play(), t.addClass(l))
            })
        }
    }, s(window).load(function() {
        AsanaAnimations.animateVisibleElement(), AsanaAnimations.animateVisibleVideo()
    }), s(window).scroll(function() {
        AsanaAnimations.animateVisibleElement(), AsanaAnimations.animateVisibleVideo()
    })
}(jQuery),
function(u) {
    AsanaLessons = {
        documentReady: function() {
            var t = u("#productTour [data-target]"),
                e = u('a[href="#productTour"]'),
                n = AsanaLessons.getURLParam("lesson");
            e.on("click", function() {
                AsanaLessons.onLoad()
            }), t.on("click", function() {
                AsanaLessons.init(u(this))
            }), n && window.setTimeout(function() {
                AsanaLessons.onLoad(), AsanaLessons.init(n)
            }, 500)
        },
        windowHashChange: function() {
            var t = u("html"),
                e = "-no-scroll";
            "#productTour" === window.location.hash ? t.addClass(e) : "#close" === window.location.hash ? (t.removeClass(e), AsanaLessons.resetProductTour()) : t.removeClass(e)
        },
        onLoad: function() {
            AsanaLessons.escProductTour()
        },
        init: function(t) {
            navTarget = "object" == typeof t ? t.attr("data-target") : t, $currentLessonID = u("#" + navTarget), window.location.hash = "#productTour", AsanaLessons.setLessonImage("#" + navTarget), AsanaLessons.updateURLParam(navTarget), AsanaLessons.setTourElementState(t), AsanaLessons.moveLessonNavigation(navTarget), AsanaLessons.lessonNavigation(t), AsanaLessons.setActiveNavigationState(navTarget)
        },
        updateURLParam: function(t) {
            if (history.pushState) {
                var e = window.location.protocol + "//" + window.location.host + window.location.pathname + "#productTour";
                e += "productTour-panels" == t ? "" : "?lesson=" + t, window.history.pushState({
                    path: e
                }, "", e)
            }
        },
        getURLParam: function(t) {
            var e = window.location.href,
                n = (t = t.replace(/[\[\]]/g, "\\$&"), new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)").exec(e));
            return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
        },
        escProductTour: function() {
            document.addEventListener("keydown", function(t) {
                27 == t.keyCode && (window.location.hash = "#close")
            })
        },
        resetProductTour: function() {
            var t = u(".productTour-header-container"),
                e = u(".productTour-panels"),
                n = u(".productTour-details");
            setTimeout(function() {
                t.show(), e.show(), n.removeClass("-is-visible")
            }, 1e3)
        },
        getCurrentLessonId: function() {
            return "#" + $currentLessonID.attr("id")
        },
        moveLessonNavigation: function(s) {
            var t = u(".productTour-nav");
            u.each(t, function(t, e) {
                var n = u(e),
                    r = n.attr("data-lesson"),
                    i = n.detach(),
                    o = "#" + s + " .productTour-header-container",
                    a = u("#" + s).parent().attr("data-name");
                i.hide(), i.appendTo(o), a === r && i.show()
            })
        },
        setActiveNavigationState: function(i) {
            var t = u(".productTour-nav-item .productTour-nav-icon");
            u.each(t, function(t, e) {
                var n = u(e),
                    r = "-is-active";
                u(e).parent().attr("data-target") === i ? n.addClass(r) : n.removeClass(r)
            })
        },
        keyboardNavigation: function() {
            var e = 37,
                n = 39;
            u("body").on("keydown", function(t) {
                t.keyCode == n ? u(nextLesson).click() : t.keyCode == e && u(previousLesson).click()
            })
        },
        setTourElementState: function(t) {
            var e = window.location.hash.split("lesson")[1],
                n = u(".productTour-header-container.-introduction");
            "object" == typeof t ? t.hasClass("productTour-panel") ? n.hide() : null == e && n.show() : t && n.hide()
        },
        lessonNavigation: function(t) {
            var e = $currentLessonID.prev(),
                n = $currentLessonID.next(),
                r = u(".js-panel-previous"),
                i = u(".js-panel-next"),
                o = u(".productTour-details"),
                a = u("#productTour-panels");
            $currentLessonID.parent().is("section") ? a.hide() : a.fadeIn();
            var s = $currentLessonID.parent().next().children(".productTour-details:first-of-type").attr("id"),
                l = $currentLessonID.parent().prev().children(".productTour-details:last-of-type").attr("id");
            n.attr("id") ? i.attr("data-target", n.attr("id")) : s ? i.attr("data-target", s) : i.attr("data-target", "productTour-panels"), e.attr("id") ? r.attr("data-target", e.attr("id")) : l ? r.attr("data-target", l) : r.attr("data-target", "productTour-panels"), o.removeClass("-is-visible"), $currentLessonID.addClass("-is-visible")
        },
        setLessonImage: function(t) {
            var e = u(t),
                n = {
                    currentLesson: e.attr("id"),
                    nextLesson: e.next().attr("id"),
                    previousLesson: e.prev().attr("id")
                };
            u.each(n, function(t, e) {
                var n = u("#" + e + " img"),
                    r = n.attr("src"),
                    i = n.attr("data-src");
                void 0 === r && n.attr("src", i)
            })
        }
    }, u(document).ready(function() {
        AsanaLessons.documentReady()
    }), u(window).on("hashchange", function() {
        AsanaLessons.windowHashChange()
    })
}(jQuery), AsanaVideo = {
        init: function() {
            window._wq = window._wq || [], $(".video").each(function() {
                var t = $(this),
                    e = t.attr("data-name"),
                    n = t.attr("data-id"),
                    r = (t.find(".video-iframe", this), t.find(".video-image", this)),
                    i = t.find("[data-video-play]", this),
                    o = (t.parent(), t.width() / (16 / 9));

                function a() {
                    var t;
                    video_api = Wistia.api(n), t = !0, video_api.bind("play", function() {
                        t ? AsanaHelpers.pushEventToGA(["Video", "Play", e]) : AsanaHelpers.pushEventToGA(["Video", "Restart", e])
                    }), video_api.bind("pause", function() {
                        AsanaHelpers.pushEventToGA(["Video", "Pause", e])
                    }), video_api.bind("end", function() {
                        AsanaHelpers.pushEventToGA(["Video", "Finish", e]), t = !1, $("html").hasClass("is-logged-in") || (AsanaHelpers.showModal("get-started"), setTimeout(function() {
                            $("#signup-email-signup-modal-get-started").focus()
                        }, 300))
                    }), video_api.play()
                }
                if (t.height(o), r && $(r).is(":visible")) {
                    var s = $(r).outerHeight(),
                        l = s - (1.25 * s - s);
                    $(this).css("margin-bottom", l)
                }
                i.on("click", function(t) {
                    var e;
                    t.preventDefault(), "undefined" != typeof Wistia ? a() : ((e = document.createElement("script")).src = "//fast.wistia.com/assets/external/E-v1.js", e.async = !0, e.charset = "ISO-8859-1", document.head.appendChild(e), setTimeout(function() {
                        $(this).data("wistia-id"), a()
                    }, 1e3))
                })
            })
        }
    }, $(window).load(function() {
        AsanaVideo.init()
    }), $(window).on("resize", function() {
        AsanaVideo.init()
    }),
    function(s, l, t) {
        var e, u = "hashchange",
            n = document,
            r = s.event.special,
            i = n.documentMode,
            o = "on" + u in l && (void 0 === i || 7 < i);

        function c(t) {
            return "#" + (t = t || location.href).replace(/^[^#]*#?(.*)$/, "$1")
        }
        s.fn[u] = function(t) {
            return t ? this.bind(u, t) : this.trigger(u)
        }, s.fn[u].delay = 50, r[u] = s.extend(r[u], {
            setup: function() {
                if (o) return !1;
                s(e.start)
            },
            teardown: function() {
                if (o) return !1;
                s(e.stop)
            }
        }), e = function() {
            var n, t = {},
                r = c(),
                e = function(t) {
                    return t
                },
                i = e,
                o = e;

            function a() {
                var t = c(),
                    e = o(r);
                t !== r ? (i(r = t, e), s(l).trigger(u)) : e !== r && (location.href = location.href.replace(/#.*/, "") + e), n = setTimeout(a, s.fn[u].delay)
            }
            return t.start = function() {
                n || a()
            }, t.stop = function() {
                n && clearTimeout(n), n = void 0
            }, t
        }()
    }(jQuery, this),
    function(r) {
        r ? (r.Unslider = function(t, e) {
            var i = this;
            return i._ = "unslider", i.defaults = {
                autoplay: !1,
                delay: 3e3,
                speed: 750,
                easing: "swing",
                keys: {
                    prev: 37,
                    next: 39
                },
                nav: !0,
                arrows: {
                    prev: '<a class="' + i._ + '-arrow prev">Prev</a>',
                    next: '<a class="' + i._ + '-arrow next">Next</a>'
                },
                animation: "horizontal",
                selectors: {
                    container: "ul:first",
                    slides: "li"
                },
                animateHeight: !1,
                activeClass: i._ + "-active",
                swipe: !0,
                swipeThreshold: .2
            }, i.$context = t, i.options = {}, i.$parent = null, i.$container = null, i.$slides = null, i.$nav = null, i.$arrows = [], i.total = 0, i.current = 0, i.prefix = i._ + "-", i.eventSuffix = "." + i.prefix + ~~(2e3 * Math.random()), i.interval = null, i.init = function(t) {
                return i.options = r.extend({}, i.defaults, t), i.$container = i.$context.find(i.options.selectors.container).addClass(i.prefix + "wrap"), i.$slides = i.$container.children(i.options.selectors.slides), i.setup(), r.each(["nav", "arrows", "keys", "infinite"], function(t, e) {
                    i.options[e] && i["init" + r._ucfirst(e)]()
                }), jQuery.event.special.swipe && i.options.swipe && i.initSwipe(), i.options.autoplay && i.start(), i.calculateSlides(), i.$context.trigger(i._ + ".ready"), i.animate(i.options.index || i.current, "init")
            }, i.setup = function() {
                i.$context.addClass(i.prefix + i.options.animation).wrap('<div class="' + i._ + '" />'), i.$parent = i.$context.parent("." + i._), "static" === i.$context.css("position") && i.$context.css("position", "relative"), i.$context.css("overflow", "hidden")
            }, i.calculateSlides = function() {
                if (i.total = i.$slides.length, "fade" !== i.options.animation) {
                    var t = "width";
                    "vertical" === i.options.animation && (t = "height"), i.$container.css(t, 100 * i.total + "%").addClass(i.prefix + "carousel"), i.$slides.css(t, 100 / i.total + "%")
                }
            }, i.start = function() {
                return i.interval = setTimeout(function() {
                    i.next()
                }, i.options.delay), i
            }, i.stop = function() {
                return clearTimeout(i.interval), i
            }, i.initNav = function() {
                var n = r('<nav class="' + i.prefix + 'nav"><ol /></nav>');
                i.$slides.each(function(t) {
                    var e = this.getAttribute("data-nav") || t + 1;
                    r.isFunction(i.options.nav) && (e = i.options.nav.call(i.$slides.eq(t), t, e)), n.children("ol").append('<li data-slide="' + t + '">' + e + "</li>")
                }), i.$nav = n.insertAfter(i.$context), i.$nav.find("li").on("click" + i.eventSuffix, function() {
                    var t = r(this).addClass(i.options.activeClass);
                    t.siblings().removeClass(i.options.activeClass), i.animate(t.attr("data-slide"))
                })
            }, i.initArrows = function() {
                !0 === i.options.arrows && (i.options.arrows = i.defaults.arrows), r.each(i.options.arrows, function(t, e) {
                    i.$arrows.push(r(e).insertAfter(i.$context).on("click" + i.eventSuffix, i[t]))
                })
            }, i.initKeys = function() {
                !0 === i.options.keys && (i.options.keys = i.defaults.keys), r(document).on("keyup" + i.eventSuffix, function(n) {
                    r.each(i.options.keys, function(t, e) {
                        n.which === e && r.isFunction(i[t]) && i[t].call(i)
                    })
                })
            }, i.initSwipe = function() {
                var e = i.$slides.width();
                "fade" !== i.options.animation && i.$container.on({
                    movestart: function(t) {
                        return t.distX > t.distY && t.distX < -t.distY || t.distX < t.distY && t.distX > -t.distY ? !!t.preventDefault() : void i.$container.css("position", "relative")
                    },
                    move: function(t) {
                        i.$container.css("left", -100 * i.current + 100 * t.distX / e + "%")
                    },
                    moveend: function(t) {
                        Math.abs(t.distX) / e > i.options.swipeThreshold ? i[t.distX < 0 ? "next" : "prev"]() : i.$container.animate({
                            left: -100 * i.current + "%"
                        }, i.options.speed / 2)
                    }
                })
            }, i.initInfinite = function() {
                var n = ["first", "last"];
                r.each(n, function(t, e) {
                    i.$slides.push.apply(i.$slides, i.$slides.filter(':not(".' + i._ + '-clone")')[e]().clone().addClass(i._ + "-clone")["insert" + (0 === t ? "After" : "Before")](i.$slides[n[~~!t]]()))
                })
            }, i.destroyArrows = function() {
                r.each(i.$arrows, function(t, e) {
                    e.remove()
                })
            }, i.destroySwipe = function() {
                i.$container.off("movestart move moveend")
            }, i.destroyKeys = function() {
                r(document).off("keyup" + i.eventSuffix)
            }, i.setIndex = function(t) {
                return t < 0 && (t = i.total - 1), i.current = Math.min(Math.max(0, t), i.total - 1), i.options.nav && i.$nav.find('[data-slide="' + i.current + '"]')._active(i.options.activeClass), i.$slides.eq(i.current)._active(i.options.activeClass), i
            }, i.animate = function(t, e) {
                if ("first" === t && (t = 0), "last" === t && (t = i.total), isNaN(t)) return i;
                i.options.autoplay && i.stop().start(), i.setIndex(t), i.$context.trigger(i._ + ".change", [t, i.$slides.eq(t)]);
                var n = "animate" + r._ucfirst(i.options.animation);
                return r.isFunction(i[n]) && i[n](i.current, e), i
            }, i.next = function() {
                var t = i.current + 1;
                return t >= i.total && (t = 0), i.animate(t, "next")
            }, i.prev = function() {
                return i.animate(i.current - 1, "prev")
            }, i.animateHorizontal = function(t) {
                var e = "left";
                return "rtl" === i.$context.attr("dir") && (e = "right"), i.options.infinite && i.$container.css("margin-" + e, "-100%"), i.slide(e, t)
            }, i.animateVertical = function(t) {
                return i.options.animateHeight = !0, i.options.infinite && i.$container.css("margin-top", -i.$slides.outerHeight()), i.slide("top", t)
            }, i.slide = function(t, e) {
                var n;
                (i.options.animateHeight && i._move(i.$context, {
                    height: i.$slides.eq(e).outerHeight()
                }, !1), i.options.infinite) && (e === i.total - 1 && (n = i.total - 3, e = -1), e === i.total - 2 && (n = 0, e = i.total - 2), "number" == typeof n && (i.setIndex(n), i.$context.on(i._ + ".moved", function() {
                    i.current === n && i.$container.css(t, -100 * n + "%").off(i._ + ".moved")
                })));
                var r = {};
                return r[t] = -100 * e + "%", i._move(i.$container, r)
            }, i.animateFade = function(t) {
                var e = i.$slides.eq(t).addClass(i.options.activeClass);
                i._move(e.siblings().removeClass(i.options.activeClass), {
                    opacity: 0
                }), i._move(e, {
                    opacity: 1
                }, !1)
            }, i._move = function(t, e, n, r) {
                return !1 !== n && (n = function() {
                    i.$context.trigger(i._ + ".moved")
                }), t._move(e, r || i.options.speed, i.options.easing, n)
            }, i.init(e)
        }, r.fn._active = function(t) {
            return this.addClass(t).siblings().removeClass(t)
        }, r._ucfirst = function(t) {
            return (t + "").toLowerCase().replace(/^./, function(t) {
                return t.toUpperCase()
            })
        }, r.fn._move = function() {
            return this.stop(!0, !0), r.fn[r.fn.velocity ? "velocity" : "animate"].apply(this, arguments)
        }, r.fn.unslider = function(n) {
            return this.each(function() {
                var t = r(this);
                if ("string" == typeof n && t.data("unslider")) {
                    n = n.split(":");
                    var e = t.data("unslider")[n[0]];
                    if (r.isFunction(e)) return e.apply(t, n[1] ? n[1].split(",") : null)
                }
                return t.data("unslider", new r.Unslider(t, n))
            })
        }) : console.warn("Unslider needs jQuery")
    }(window.jQuery),
    function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(u) {
        "use strict";
        var i, a = window.Slick || {};
        i = 0, (a = function(t, e) {
            var n, r = this;
            r.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: u(t),
                appendDots: u(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(t, e) {
                    return u('<button type="button" data-role="none" role="button" tabindex="0" />').text(e + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, r.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, u.extend(r, r.initials), r.activeBreakpoint = null, r.animType = null, r.animProp = null, r.breakpoints = [], r.breakpointSettings = [], r.cssTransitions = !1, r.focussed = !1, r.interrupted = !1, r.hidden = "hidden", r.paused = !0, r.positionProp = null, r.respondTo = null, r.rowCount = 1, r.shouldClick = !0, r.$slider = u(t), r.$slidesCache = null, r.transformType = null, r.transitionType = null, r.visibilityChange = "visibilitychange", r.windowWidth = 0, r.windowTimer = null, n = u(t).data("slick") || {}, r.options = u.extend({}, r.defaults, e, n), r.currentSlide = r.options.initialSlide, r.originalSettings = r.options, void 0 !== document.mozHidden ? (r.hidden = "mozHidden", r.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (r.hidden = "webkitHidden", r.visibilityChange = "webkitvisibilitychange"), r.autoPlay = u.proxy(r.autoPlay, r), r.autoPlayClear = u.proxy(r.autoPlayClear, r), r.autoPlayIterator = u.proxy(r.autoPlayIterator, r), r.changeSlide = u.proxy(r.changeSlide, r), r.clickHandler = u.proxy(r.clickHandler, r), r.selectHandler = u.proxy(r.selectHandler, r), r.setPosition = u.proxy(r.setPosition, r), r.swipeHandler = u.proxy(r.swipeHandler, r), r.dragHandler = u.proxy(r.dragHandler, r), r.keyHandler = u.proxy(r.keyHandler, r), r.instanceUid = i++, r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, r.registerBreakpoints(), r.init(!0)
        }).prototype.activateADA = function() {
            this.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        }, a.prototype.addSlide = a.prototype.slickAdd = function(t, e, n) {
            var r = this;
            if ("boolean" == typeof e) n = e, e = null;
            else if (e < 0 || e >= r.slideCount) return !1;
            r.unload(), "number" == typeof e ? 0 === e && 0 === r.$slides.length ? u(t).appendTo(r.$slideTrack) : n ? u(t).insertBefore(r.$slides.eq(e)) : u(t).insertAfter(r.$slides.eq(e)) : !0 === n ? u(t).prependTo(r.$slideTrack) : u(t).appendTo(r.$slideTrack), r.$slides = r.$slideTrack.children(this.options.slide), r.$slideTrack.children(this.options.slide).detach(), r.$slideTrack.append(r.$slides), r.$slides.each(function(t, e) {
                u(e).attr("data-slick-index", t)
            }), r.$slidesCache = r.$slides, r.reinit()
        }, a.prototype.animateHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.animate({
                    height: e
                }, t.options.speed)
            }
        }, a.prototype.animateSlide = function(t, e) {
            var n = {},
                r = this;
            r.animateHeight(), !0 === r.options.rtl && !1 === r.options.vertical && (t = -t), !1 === r.transformsEnabled ? !1 === r.options.vertical ? r.$slideTrack.animate({
                left: t
            }, r.options.speed, r.options.easing, e) : r.$slideTrack.animate({
                top: t
            }, r.options.speed, r.options.easing, e) : !1 === r.cssTransitions ? (!0 === r.options.rtl && (r.currentLeft = -r.currentLeft), u({
                animStart: r.currentLeft
            }).animate({
                animStart: t
            }, {
                duration: r.options.speed,
                easing: r.options.easing,
                step: function(t) {
                    t = Math.ceil(t), !1 === r.options.vertical ? n[r.animType] = "translate(" + t + "px, 0px)" : n[r.animType] = "translate(0px," + t + "px)", r.$slideTrack.css(n)
                },
                complete: function() {
                    e && e.call()
                }
            })) : (r.applyTransition(), t = Math.ceil(t), !1 === r.options.vertical ? n[r.animType] = "translate3d(" + t + "px, 0px, 0px)" : n[r.animType] = "translate3d(0px," + t + "px, 0px)", r.$slideTrack.css(n), e && setTimeout(function() {
                r.disableTransition(), e.call()
            }, r.options.speed))
        }, a.prototype.getNavTarget = function() {
            var t = this.options.asNavFor;
            return t && null !== t && (t = u(t).not(this.$slider)), t
        }, a.prototype.asNavFor = function(e) {
            var t = this.getNavTarget();
            null !== t && "object" == typeof t && t.each(function() {
                var t = u(this).slick("getSlick");
                t.unslicked || t.slideHandler(e, !0)
            })
        }, a.prototype.applyTransition = function(t) {
            var e = this,
                n = {};
            !1 === e.options.fade ? n[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : n[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(n) : e.$slides.eq(t).css(n)
        }, a.prototype.autoPlay = function() {
            var t = this;
            t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
        }, a.prototype.autoPlayClear = function() {
            this.autoPlayTimer && clearInterval(this.autoPlayTimer)
        }, a.prototype.autoPlayIterator = function() {
            var t = this,
                e = t.currentSlide + t.options.slidesToScroll;
            t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 == 0 && (t.direction = 1))), t.slideHandler(e))
        }, a.prototype.buildArrows = function() {
            var t = this;
            !0 === t.options.arrows && (t.$prevArrow = u(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = u(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, a.prototype.buildDots = function() {
            var t, e, n = this;
            if (!0 === n.options.dots && n.slideCount > n.options.slidesToShow) {
                for (n.$slider.addClass("slick-dotted"), e = u("<ul />").addClass(n.options.dotsClass), t = 0; t <= n.getDotCount(); t += 1) e.append(u("<li />").append(n.options.customPaging.call(this, n, t)));
                n.$dots = e.appendTo(n.options.appendDots), n.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, a.prototype.buildOut = function() {
            var t = this;
            t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, e) {
                u(e).attr("data-slick-index", t).data("originalStyling", u(e).attr("style") || "")
            }), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? u('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), (!0 === t.options.centerMode || !0 === t.options.swipeToSlide) && (t.options.slidesToScroll = 1), u("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), !0 === t.options.draggable && t.$list.addClass("draggable")
        }, a.prototype.buildRows = function() {
            var t, e, n, r, i, o, a, s = this;
            if (r = document.createDocumentFragment(), o = s.$slider.children(), 1 < s.options.rows) {
                for (a = s.options.slidesPerRow * s.options.rows, i = Math.ceil(o.length / a), t = 0; t < i; t++) {
                    var l = document.createElement("div");
                    for (e = 0; e < s.options.rows; e++) {
                        var u = document.createElement("div");
                        for (n = 0; n < s.options.slidesPerRow; n++) {
                            var c = t * a + (e * s.options.slidesPerRow + n);
                            o.get(c) && u.appendChild(o.get(c))
                        }
                        l.appendChild(u)
                    }
                    r.appendChild(l)
                }
                s.$slider.empty().append(r), s.$slider.children().children().children().css({
                    width: 100 / s.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, a.prototype.checkResponsive = function(t, e) {
            var n, r, i, o = this,
                a = !1,
                s = o.$slider.width(),
                l = window.innerWidth || u(window).width();
            if ("window" === o.respondTo ? i = l : "slider" === o.respondTo ? i = s : "min" === o.respondTo && (i = Math.min(l, s)), o.options.responsive && o.options.responsive.length && null !== o.options.responsive) {
                for (n in r = null, o.breakpoints) o.breakpoints.hasOwnProperty(n) && (!1 === o.originalSettings.mobileFirst ? i < o.breakpoints[n] && (r = o.breakpoints[n]) : i > o.breakpoints[n] && (r = o.breakpoints[n]));
                null !== r ? null !== o.activeBreakpoint ? (r !== o.activeBreakpoint || e) && (o.activeBreakpoint = r, "unslick" === o.breakpointSettings[r] ? o.unslick(r) : (o.options = u.extend({}, o.originalSettings, o.breakpointSettings[r]), !0 === t && (o.currentSlide = o.options.initialSlide), o.refresh(t)), a = r) : (o.activeBreakpoint = r, "unslick" === o.breakpointSettings[r] ? o.unslick(r) : (o.options = u.extend({}, o.originalSettings, o.breakpointSettings[r]), !0 === t && (o.currentSlide = o.options.initialSlide), o.refresh(t)), a = r) : null !== o.activeBreakpoint && (o.activeBreakpoint = null, o.options = o.originalSettings, !0 === t && (o.currentSlide = o.options.initialSlide), o.refresh(t), a = r), t || !1 === a || o.$slider.trigger("breakpoint", [o, a])
            }
        }, a.prototype.changeSlide = function(t, e) {
            var n, r, i = this,
                o = u(t.currentTarget);
            switch (o.is("a") && t.preventDefault(), o.is("li") || (o = o.closest("li")), n = i.slideCount % i.options.slidesToScroll != 0 ? 0 : (i.slideCount - i.currentSlide) % i.options.slidesToScroll, t.data.message) {
                case "previous":
                    r = 0 === n ? i.options.slidesToScroll : i.options.slidesToShow - n, i.slideCount > i.options.slidesToShow && i.slideHandler(i.currentSlide - r, !1, e);
                    break;
                case "next":
                    r = 0 === n ? i.options.slidesToScroll : n, i.slideCount > i.options.slidesToShow && i.slideHandler(i.currentSlide + r, !1, e);
                    break;
                case "index":
                    var a = 0 === t.data.index ? 0 : t.data.index || o.index() * i.options.slidesToScroll;
                    i.slideHandler(i.checkNavigable(a), !1, e), o.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, a.prototype.checkNavigable = function(t) {
            var e, n;
            if (n = 0, t > (e = this.getNavigableIndexes())[e.length - 1]) t = e[e.length - 1];
            else
                for (var r in e) {
                    if (t < e[r]) {
                        t = n;
                        break
                    }
                    n = e[r]
                }
            return t
        }, a.prototype.cleanUpEvents = function() {
            var t = this;
            t.options.dots && null !== t.$dots && u("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", u.proxy(t.interrupt, t, !0)).off("mouseleave.slick", u.proxy(t.interrupt, t, !1)), t.$slider.off("focus.slick blur.slick"), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide)), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), u(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && u(t.$slideTrack).children().off("click.slick", t.selectHandler), u(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), u(window).off("resize.slick.slick-" + t.instanceUid, t.resize), u("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), u(window).off("load.slick.slick-" + t.instanceUid, t.setPosition), u(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
        }, a.prototype.cleanUpSlideEvents = function() {
            var t = this;
            t.$list.off("mouseenter.slick", u.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", u.proxy(t.interrupt, t, !1))
        }, a.prototype.cleanUpRows = function() {
            var t;
            1 < this.options.rows && ((t = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(t))
        }, a.prototype.clickHandler = function(t) {
            !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
        }, a.prototype.destroy = function(t) {
            var e = this;
            e.autoPlayClear(), e.touchObject = {}, e.cleanUpEvents(), u(".slick-cloned", e.$slider).detach(), e.$dots && e.$dots.remove(), e.$prevArrow && e.$prevArrow.length && (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()), e.$nextArrow && e.$nextArrow.length && (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove()), e.$slides && (e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                u(this).attr("style", u(this).data("originalStyling"))
            }), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.detach(), e.$list.detach(), e.$slider.append(e.$slides)), e.cleanUpRows(), e.$slider.removeClass("slick-slider"), e.$slider.removeClass("slick-initialized"), e.$slider.removeClass("slick-dotted"), e.unslicked = !0, t || e.$slider.trigger("destroy", [e])
        }, a.prototype.disableTransition = function(t) {
            var e = {};
            e[this.transitionType] = "", !1 === this.options.fade ? this.$slideTrack.css(e) : this.$slides.eq(t).css(e)
        }, a.prototype.fadeSlide = function(t, e) {
            var n = this;
            !1 === n.cssTransitions ? (n.$slides.eq(t).css({
                zIndex: n.options.zIndex
            }), n.$slides.eq(t).animate({
                opacity: 1
            }, n.options.speed, n.options.easing, e)) : (n.applyTransition(t), n.$slides.eq(t).css({
                opacity: 1,
                zIndex: n.options.zIndex
            }), e && setTimeout(function() {
                n.disableTransition(t), e.call()
            }, n.options.speed))
        }, a.prototype.fadeSlideOut = function(t) {
            var e = this;
            !1 === e.cssTransitions ? e.$slides.eq(t).animate({
                opacity: 0,
                zIndex: e.options.zIndex - 2
            }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
                opacity: 0,
                zIndex: e.options.zIndex - 2
            }))
        }, a.prototype.filterSlides = a.prototype.slickFilter = function(t) {
            var e = this;
            null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
        }, a.prototype.focusHandler = function() {
            var n = this;
            n.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(t) {
                t.stopImmediatePropagation();
                var e = u(this);
                setTimeout(function() {
                    n.options.pauseOnFocus && (n.focussed = e.is(":focus"), n.autoPlay())
                }, 0)
            })
        }, a.prototype.getCurrent = a.prototype.slickCurrentSlide = function() {
            return this.currentSlide
        }, a.prototype.getDotCount = function() {
            var t = this,
                e = 0,
                n = 0,
                r = 0;
            if (!0 === t.options.infinite)
                for (; e < t.slideCount;) ++r, e = n + t.options.slidesToScroll, n += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            else if (!0 === t.options.centerMode) r = t.slideCount;
            else if (t.options.asNavFor)
                for (; e < t.slideCount;) ++r, e = n + t.options.slidesToScroll, n += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            else r = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
            return r - 1
        }, a.prototype.getLeft = function(t) {
            var e, n, r, i = this,
                o = 0;
            return i.slideOffset = 0, n = i.$slides.first().outerHeight(!0), !0 === i.options.infinite ? (i.slideCount > i.options.slidesToShow && (i.slideOffset = i.slideWidth * i.options.slidesToShow * -1, o = n * i.options.slidesToShow * -1), i.slideCount % i.options.slidesToScroll != 0 && t + i.options.slidesToScroll > i.slideCount && i.slideCount > i.options.slidesToShow && (t > i.slideCount ? (i.slideOffset = (i.options.slidesToShow - (t - i.slideCount)) * i.slideWidth * -1, o = (i.options.slidesToShow - (t - i.slideCount)) * n * -1) : (i.slideOffset = i.slideCount % i.options.slidesToScroll * i.slideWidth * -1, o = i.slideCount % i.options.slidesToScroll * n * -1))) : t + i.options.slidesToShow > i.slideCount && (i.slideOffset = (t + i.options.slidesToShow - i.slideCount) * i.slideWidth, o = (t + i.options.slidesToShow - i.slideCount) * n), i.slideCount <= i.options.slidesToShow && (o = i.slideOffset = 0), !0 === i.options.centerMode && !0 === i.options.infinite ? i.slideOffset += i.slideWidth * Math.floor(i.options.slidesToShow / 2) - i.slideWidth : !0 === i.options.centerMode && (i.slideOffset = 0, i.slideOffset += i.slideWidth * Math.floor(i.options.slidesToShow / 2)), e = !1 === i.options.vertical ? t * i.slideWidth * -1 + i.slideOffset : t * n * -1 + o, !0 === i.options.variableWidth && (r = i.slideCount <= i.options.slidesToShow || !1 === i.options.infinite ? i.$slideTrack.children(".slick-slide").eq(t) : i.$slideTrack.children(".slick-slide").eq(t + i.options.slidesToShow), e = !0 === i.options.rtl ? r[0] ? -1 * (i.$slideTrack.width() - r[0].offsetLeft - r.width()) : 0 : r[0] ? -1 * r[0].offsetLeft : 0, !0 === i.options.centerMode && (r = i.slideCount <= i.options.slidesToShow || !1 === i.options.infinite ? i.$slideTrack.children(".slick-slide").eq(t) : i.$slideTrack.children(".slick-slide").eq(t + i.options.slidesToShow + 1), e = !0 === i.options.rtl ? r[0] ? -1 * (i.$slideTrack.width() - r[0].offsetLeft - r.width()) : 0 : r[0] ? -1 * r[0].offsetLeft : 0, e += (i.$list.width() - r.outerWidth()) / 2)), e
        }, a.prototype.getOption = a.prototype.slickGetOption = function(t) {
            return this.options[t]
        }, a.prototype.getNavigableIndexes = function() {
            var t, e = this,
                n = 0,
                r = 0,
                i = [];
            for (!1 === e.options.infinite ? t = e.slideCount : (n = -1 * e.options.slidesToScroll, r = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); n < t;) i.push(n), n = r + e.options.slidesToScroll, r += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return i
        }, a.prototype.getSlick = function() {
            return this
        }, a.prototype.getSlideCount = function() {
            var n, r, i = this;
            return r = !0 === i.options.centerMode ? i.slideWidth * Math.floor(i.options.slidesToShow / 2) : 0, !0 === i.options.swipeToSlide ? (i.$slideTrack.find(".slick-slide").each(function(t, e) {
                return e.offsetLeft - r + u(e).outerWidth() / 2 > -1 * i.swipeLeft ? (n = e, !1) : void 0
            }), Math.abs(u(n).attr("data-slick-index") - i.currentSlide) || 1) : i.options.slidesToScroll
        }, a.prototype.goTo = a.prototype.slickGoTo = function(t, e) {
            this.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(t)
                }
            }, e)
        }, a.prototype.init = function(t) {
            var e = this;
            u(e.$slider).hasClass("slick-initialized") || (u(e.$slider).addClass("slick-initialized"), e.buildRows(), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots(), e.checkResponsive(!0), e.focusHandler()), t && e.$slider.trigger("init", [e]), !0 === e.options.accessibility && e.initADA(), e.options.autoplay && (e.paused = !1, e.autoPlay())
        }, a.prototype.initADA = function() {
            var e = this;
            e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), e.$slideTrack.attr("role", "listbox"), e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
                u(this).attr({
                    role: "option",
                    "aria-describedby": "slick-slide" + e.instanceUid + t
                })
            }), null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function(t) {
                u(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + e.instanceUid + t,
                    id: "slick-slide" + e.instanceUid + t
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), e.activateADA()
        }, a.prototype.initArrowEvents = function() {
            var t = this;
            !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, t.changeSlide))
        }, a.prototype.initDotEvents = function() {
            var t = this;
            !0 === t.options.dots && t.slideCount > t.options.slidesToShow && u("li", t.$dots).on("click.slick", {
                message: "index"
            }, t.changeSlide), !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && u("li", t.$dots).on("mouseenter.slick", u.proxy(t.interrupt, t, !0)).on("mouseleave.slick", u.proxy(t.interrupt, t, !1))
        }, a.prototype.initSlideEvents = function() {
            var t = this;
            t.options.pauseOnHover && (t.$list.on("mouseenter.slick", u.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", u.proxy(t.interrupt, t, !1)))
        }, a.prototype.initializeEvents = function() {
            var t = this;
            t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), u(document).on(t.visibilityChange, u.proxy(t.visibility, t)), !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && u(t.$slideTrack).children().on("click.slick", t.selectHandler), u(window).on("orientationchange.slick.slick-" + t.instanceUid, u.proxy(t.orientationChange, t)), u(window).on("resize.slick.slick-" + t.instanceUid, u.proxy(t.resize, t)), u("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), u(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), u(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
        }, a.prototype.initUI = function() {
            var t = this;
            !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show()
        }, a.prototype.keyHandler = function(t) {
            var e = this;
            t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({
                data: {
                    message: !0 === e.options.rtl ? "next" : "previous"
                }
            }) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({
                data: {
                    message: !0 === e.options.rtl ? "previous" : "next"
                }
            }))
        }, a.prototype.lazyLoad = function() {
            function t(t) {
                u("img[data-lazy]", t).each(function() {
                    var t = u(this),
                        e = u(this).attr("data-lazy"),
                        n = document.createElement("img");
                    n.onload = function() {
                        t.animate({
                            opacity: 0
                        }, 100, function() {
                            t.attr("src", e).animate({
                                opacity: 1
                            }, 200, function() {
                                t.removeAttr("data-lazy").removeClass("slick-loading")
                            }), r.$slider.trigger("lazyLoaded", [r, t, e])
                        })
                    }, n.onerror = function() {
                        t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, t, e])
                    }, n.src = e
                })
            }
            var e, n, r = this;
            !0 === r.options.centerMode ? !0 === r.options.infinite ? n = (e = r.currentSlide + (r.options.slidesToShow / 2 + 1)) + r.options.slidesToShow + 2 : (e = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), n = r.options.slidesToShow / 2 + 1 + 2 + r.currentSlide) : (e = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = Math.ceil(e + r.options.slidesToShow), !0 === r.options.fade && (0 < e && e--, n <= r.slideCount && n++)), t(r.$slider.find(".slick-slide").slice(e, n)), r.slideCount <= r.options.slidesToShow ? t(r.$slider.find(".slick-slide")) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? t(r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow)) : 0 === r.currentSlide && t(r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow))
        }, a.prototype.loadSlider = function() {
            var t = this;
            t.setPosition(), t.$slideTrack.css({
                opacity: 1
            }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
        }, a.prototype.next = a.prototype.slickNext = function() {
            this.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, a.prototype.orientationChange = function() {
            this.checkResponsive(), this.setPosition()
        }, a.prototype.pause = a.prototype.slickPause = function() {
            this.autoPlayClear(), this.paused = !0
        }, a.prototype.play = a.prototype.slickPlay = function() {
            var t = this;
            t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1
        }, a.prototype.postSlide = function(t) {
            var e = this;
            e.unslicked || (e.$slider.trigger("afterChange", [e, t]), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay && e.autoPlay(), !0 === e.options.accessibility && e.initADA())
        }, a.prototype.prev = a.prototype.slickPrev = function() {
            this.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, a.prototype.preventDefault = function(t) {
            t.preventDefault()
        }, a.prototype.progressiveLazyLoad = function(t) {
            t = t || 1;
            var e, n, r, i = this,
                o = u("img[data-lazy]", i.$slider);
            o.length ? (e = o.first(), n = e.attr("data-lazy"), (r = document.createElement("img")).onload = function() {
                e.attr("src", n).removeAttr("data-lazy").removeClass("slick-loading"), !0 === i.options.adaptiveHeight && i.setPosition(), i.$slider.trigger("lazyLoaded", [i, e, n]), i.progressiveLazyLoad()
            }, r.onerror = function() {
                t < 3 ? setTimeout(function() {
                    i.progressiveLazyLoad(t + 1)
                }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), i.$slider.trigger("lazyLoadError", [i, e, n]), i.progressiveLazyLoad())
            }, r.src = n) : i.$slider.trigger("allImagesLoaded", [i])
        }, a.prototype.refresh = function(t) {
            var e, n, r = this;
            n = r.slideCount - r.options.slidesToShow, !r.options.infinite && r.currentSlide > n && (r.currentSlide = n), r.slideCount <= r.options.slidesToShow && (r.currentSlide = 0), e = r.currentSlide, r.destroy(!0), u.extend(r, r.initials, {
                currentSlide: e
            }), r.init(), t || r.changeSlide({
                data: {
                    message: "index",
                    index: e
                }
            }, !1)
        }, a.prototype.registerBreakpoints = function() {
            var t, e, n, r = this,
                i = r.options.responsive || null;
            if ("array" === u.type(i) && i.length) {
                for (t in r.respondTo = r.options.respondTo || "window", i)
                    if (n = r.breakpoints.length - 1, e = i[t].breakpoint, i.hasOwnProperty(t)) {
                        for (; 0 <= n;) r.breakpoints[n] && r.breakpoints[n] === e && r.breakpoints.splice(n, 1), n--;
                        r.breakpoints.push(e), r.breakpointSettings[e] = i[t].settings
                    }
                r.breakpoints.sort(function(t, e) {
                    return r.options.mobileFirst ? t - e : e - t
                })
            }
        }, a.prototype.reinit = function() {
            var t = this;
            t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && u(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
        }, a.prototype.resize = function() {
            var t = this;
            u(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
                t.windowWidth = u(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
            }, 50))
        }, a.prototype.removeSlide = a.prototype.slickRemove = function(t, e, n) {
            var r = this;
            return "boolean" == typeof t ? t = !0 === (e = t) ? 0 : r.slideCount - 1 : t = !0 === e ? --t : t, !(r.slideCount < 1 || t < 0 || t > r.slideCount - 1) && (r.unload(), !0 === n ? r.$slideTrack.children().remove() : r.$slideTrack.children(this.options.slide).eq(t).remove(), r.$slides = r.$slideTrack.children(this.options.slide), r.$slideTrack.children(this.options.slide).detach(), r.$slideTrack.append(r.$slides), r.$slidesCache = r.$slides, void r.reinit())
        }, a.prototype.setCSS = function(t) {
            var e, n, r = this,
                i = {};
            !0 === r.options.rtl && (t = -t), e = "left" == r.positionProp ? Math.ceil(t) + "px" : "0px", n = "top" == r.positionProp ? Math.ceil(t) + "px" : "0px", i[r.positionProp] = t, !1 === r.transformsEnabled || (!(i = {}) === r.cssTransitions ? i[r.animType] = "translate(" + e + ", " + n + ")" : i[r.animType] = "translate3d(" + e + ", " + n + ", 0px)"), r.$slideTrack.css(i)
        }, a.prototype.setDimensions = function() {
            var t = this;
            !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({
                padding: "0px " + t.options.centerPadding
            }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({
                padding: t.options.centerPadding + " 0px"
            })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
            var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
            !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
        }, a.prototype.setFade = function() {
            var n, r = this;
            r.$slides.each(function(t, e) {
                n = r.slideWidth * t * -1, !0 === r.options.rtl ? u(e).css({
                    position: "relative",
                    right: n,
                    top: 0,
                    zIndex: r.options.zIndex - 2,
                    opacity: 0
                }) : u(e).css({
                    position: "relative",
                    left: n,
                    top: 0,
                    zIndex: r.options.zIndex - 2,
                    opacity: 0
                })
            }), r.$slides.eq(r.currentSlide).css({
                zIndex: r.options.zIndex - 1,
                opacity: 1
            })
        }, a.prototype.setHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.css("height", e)
            }
        }, a.prototype.setOption = a.prototype.slickSetOption = function() {
            var t, e, n, r, i, o = this,
                a = !1;
            if ("object" === u.type(arguments[0]) ? (n = arguments[0], a = arguments[1], i = "multiple") : "string" === u.type(arguments[0]) && (n = arguments[0], r = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === u.type(arguments[1]) ? i = "responsive" : void 0 !== arguments[1] && (i = "single")), "single" === i) o.options[n] = r;
            else if ("multiple" === i) u.each(n, function(t, e) {
                o.options[t] = e
            });
            else if ("responsive" === i)
                for (e in r)
                    if ("array" !== u.type(o.options.responsive)) o.options.responsive = [r[e]];
                    else {
                        for (t = o.options.responsive.length - 1; 0 <= t;) o.options.responsive[t].breakpoint === r[e].breakpoint && o.options.responsive.splice(t, 1), t--;
                        o.options.responsive.push(r[e])
                    }
            a && (o.unload(), o.reinit())
        }, a.prototype.setPosition = function() {
            var t = this;
            t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
        }, a.prototype.setProps = function() {
            var t = this,
                e = document.body.style;
            t.positionProp = !0 === t.options.vertical ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && !0 === t.options.useCSS && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType
        }, a.prototype.setSlideClasses = function(t) {
            var e, n, r, i, o = this;
            n = o.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), o.$slides.eq(t).addClass("slick-current"), !0 === o.options.centerMode ? (e = Math.floor(o.options.slidesToShow / 2), !0 === o.options.infinite && (e <= t && t <= o.slideCount - 1 - e ? o.$slides.slice(t - e, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (r = o.options.slidesToShow + t, n.slice(r - e + 1, r + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? n.eq(n.length - 1 - o.options.slidesToShow).addClass("slick-center") : t === o.slideCount - 1 && n.eq(o.options.slidesToShow).addClass("slick-center")), o.$slides.eq(t).addClass("slick-center")) : 0 <= t && t <= o.slideCount - o.options.slidesToShow ? o.$slides.slice(t, t + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= o.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (i = o.slideCount % o.options.slidesToShow, r = !0 === o.options.infinite ? o.options.slidesToShow + t : t, o.options.slidesToShow == o.options.slidesToScroll && o.slideCount - t < o.options.slidesToShow ? n.slice(r - (o.options.slidesToShow - i), r + i).addClass("slick-active").attr("aria-hidden", "false") : n.slice(r, r + o.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === o.options.lazyLoad && o.lazyLoad()
        }, a.prototype.setupInfinite = function() {
            var t, e, n, r = this;
            if (!0 === r.options.fade && (r.options.centerMode = !1), !0 === r.options.infinite && !1 === r.options.fade && (e = null, r.slideCount > r.options.slidesToShow)) {
                for (n = !0 === r.options.centerMode ? r.options.slidesToShow + 1 : r.options.slidesToShow, t = r.slideCount; t > r.slideCount - n; t -= 1) e = t - 1, u(r.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e - r.slideCount).prependTo(r.$slideTrack).addClass("slick-cloned");
                for (t = 0; t < n; t += 1) e = t, u(r.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e + r.slideCount).appendTo(r.$slideTrack).addClass("slick-cloned");
                r.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    u(this).attr("id", "")
                })
            }
        }, a.prototype.interrupt = function(t) {
            t || this.autoPlay(), this.interrupted = t
        }, a.prototype.selectHandler = function(t) {
            var e = this,
                n = u(t.target).is(".slick-slide") ? u(t.target) : u(t.target).parents(".slick-slide"),
                r = parseInt(n.attr("data-slick-index"));
            return r || (r = 0), e.slideCount <= e.options.slidesToShow ? (e.setSlideClasses(r), void e.asNavFor(r)) : void e.slideHandler(r)
        }, a.prototype.slideHandler = function(t, e, n) {
            var r, i, o, a, s, l = null,
                u = this;
            return e = e || !1, !0 === u.animating && !0 === u.options.waitForAnimate || !0 === u.options.fade && u.currentSlide === t || u.slideCount <= u.options.slidesToShow ? void 0 : (!1 === e && u.asNavFor(t), r = t, l = u.getLeft(r), a = u.getLeft(u.currentSlide), u.currentLeft = null === u.swipeLeft ? a : u.swipeLeft, !1 === u.options.infinite && !1 === u.options.centerMode && (t < 0 || t > u.getDotCount() * u.options.slidesToScroll) ? void(!1 === u.options.fade && (r = u.currentSlide, !0 !== n ? u.animateSlide(a, function() {
                u.postSlide(r)
            }) : u.postSlide(r))) : !1 === u.options.infinite && !0 === u.options.centerMode && (t < 0 || t > u.slideCount - u.options.slidesToScroll) ? void(!1 === u.options.fade && (r = u.currentSlide, !0 !== n ? u.animateSlide(a, function() {
                u.postSlide(r)
            }) : u.postSlide(r))) : (u.options.autoplay && clearInterval(u.autoPlayTimer), i = r < 0 ? u.slideCount % u.options.slidesToScroll != 0 ? u.slideCount - u.slideCount % u.options.slidesToScroll : u.slideCount + r : r >= u.slideCount ? u.slideCount % u.options.slidesToScroll != 0 ? 0 : r - u.slideCount : r, u.animating = !0, u.$slider.trigger("beforeChange", [u, u.currentSlide, i]), o = u.currentSlide, u.currentSlide = i, u.setSlideClasses(u.currentSlide), u.options.asNavFor && ((s = (s = u.getNavTarget()).slick("getSlick")).slideCount <= s.options.slidesToShow && s.setSlideClasses(u.currentSlide)), u.updateDots(), u.updateArrows(), !0 === u.options.fade ? (!0 !== n ? (u.fadeSlideOut(o), u.fadeSlide(i, function() {
                u.postSlide(i)
            })) : u.postSlide(i), void u.animateHeight()) : void(!0 !== n ? u.animateSlide(l, function() {
                u.postSlide(i)
            }) : u.postSlide(i))))
        }, a.prototype.startLoad = function() {
            var t = this;
            !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
        }, a.prototype.swipeDirection = function() {
            var t, e, n, r, i = this;
            return t = i.touchObject.startX - i.touchObject.curX, e = i.touchObject.startY - i.touchObject.curY, n = Math.atan2(e, t), (r = Math.round(180 * n / Math.PI)) < 0 && (r = 360 - Math.abs(r)), r <= 45 && 0 <= r ? !1 === i.options.rtl ? "left" : "right" : r <= 360 && 315 <= r ? !1 === i.options.rtl ? "left" : "right" : 135 <= r && r <= 225 ? !1 === i.options.rtl ? "right" : "left" : !0 === i.options.verticalSwiping ? 35 <= r && r <= 135 ? "down" : "up" : "vertical"
        }, a.prototype.swipeEnd = function(t) {
            var e, n, r = this;
            if (r.dragging = !1, r.interrupted = !1, r.shouldClick = !(10 < r.touchObject.swipeLength), void 0 === r.touchObject.curX) return !1;
            if (!0 === r.touchObject.edgeHit && r.$slider.trigger("edge", [r, r.swipeDirection()]), r.touchObject.swipeLength >= r.touchObject.minSwipe) {
                switch (n = r.swipeDirection()) {
                    case "left":
                    case "down":
                        e = r.options.swipeToSlide ? r.checkNavigable(r.currentSlide + r.getSlideCount()) : r.currentSlide + r.getSlideCount(), r.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        e = r.options.swipeToSlide ? r.checkNavigable(r.currentSlide - r.getSlideCount()) : r.currentSlide - r.getSlideCount(), r.currentDirection = 1
                }
                "vertical" != n && (r.slideHandler(e), r.touchObject = {}, r.$slider.trigger("swipe", [r, n]))
            } else r.touchObject.startX !== r.touchObject.curX && (r.slideHandler(r.currentSlide), r.touchObject = {})
        }, a.prototype.swipeHandler = function(t) {
            var e = this;
            if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
                case "start":
                    e.swipeStart(t);
                    break;
                case "move":
                    e.swipeMove(t);
                    break;
                case "end":
                    e.swipeEnd(t)
            }
        }, a.prototype.swipeMove = function(t) {
            var e, n, r, i, o, a = this;
            return o = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!a.dragging || o && 1 !== o.length) && (e = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== o ? o[0].pageX : t.clientX, a.touchObject.curY = void 0 !== o ? o[0].pageY : t.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), !0 === a.options.verticalSwiping && (a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2)))), "vertical" !== (n = a.swipeDirection()) ? (void 0 !== t.originalEvent && 4 < a.touchObject.swipeLength && t.preventDefault(), i = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (i = a.touchObject.curY > a.touchObject.startY ? 1 : -1), r = a.touchObject.swipeLength, (a.touchObject.edgeHit = !1) === a.options.infinite && (0 === a.currentSlide && "right" === n || a.currentSlide >= a.getDotCount() && "left" === n) && (r = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = e + r * i : a.swipeLeft = e + r * (a.$list.height() / a.listWidth) * i, !0 === a.options.verticalSwiping && (a.swipeLeft = e + r * i), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))) : void 0)
        }, a.prototype.swipeStart = function(t) {
            var e, n = this;
            return n.interrupted = !0, 1 !== n.touchObject.fingerCount || n.slideCount <= n.options.slidesToShow ? !(n.touchObject = {}) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), n.touchObject.startX = n.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, n.touchObject.startY = n.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, void(n.dragging = !0))
        }, a.prototype.unfilterSlides = a.prototype.slickUnfilter = function() {
            var t = this;
            null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
        }, a.prototype.unload = function() {
            var t = this;
            u(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, a.prototype.unslick = function(t) {
            this.$slider.trigger("unslick", [this, t]), this.destroy()
        }, a.prototype.updateArrows = function() {
            var t = this;
            Math.floor(t.options.slidesToShow / 2), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, a.prototype.updateDots = function() {
            var t = this;
            null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, a.prototype.visibility = function() {
            this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
        }, u.fn.slick = function() {
            var t, e, n = this,
                r = arguments[0],
                i = Array.prototype.slice.call(arguments, 1),
                o = n.length;
            for (t = 0; t < o; t++)
                if ("object" == typeof r || void 0 === r ? n[t].slick = new a(n[t], r) : e = n[t].slick[r].apply(n[t].slick, i), void 0 !== e) return e;
            return n
        }
    }),
    function(t) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
        else if ("function" == typeof define && define.amd) define([], t);
        else {
            ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Chart = t()
        }
    }(function() {
        return function o(a, s, l) {
            function u(n, t) {
                if (!s[n]) {
                    if (!a[n]) {
                        var e = "function" == typeof require && require;
                        if (!t && e) return e(n, !0);
                        if (c) return c(n, !0);
                        var r = new Error("Cannot find module '" + n + "'");
                        throw r.code = "MODULE_NOT_FOUND", r
                    }
                    var i = s[n] = {
                        exports: {}
                    };
                    a[n][0].call(i.exports, function(t) {
                        var e = a[n][1][t];
                        return u(e || t)
                    }, i, i.exports, o, a, s, l)
                }
                return s[n].exports
            }
            for (var c = "function" == typeof require && require, t = 0; t < l.length; t++) u(l[t]);
            return u
        }({
            1: [function(t, e, n) {}, {}],
            2: [function(t, e, n) {
                function r(t) {
                    if (t) {
                        var e = [0, 0, 0],
                            n = 1,
                            r = t.match(/^#([a-fA-F0-9]{3})$/);
                        if (r) {
                            r = r[1];
                            for (var i = 0; i < e.length; i++) e[i] = parseInt(r[i] + r[i], 16)
                        } else if (r = t.match(/^#([a-fA-F0-9]{6})$/)) {
                            r = r[1];
                            for (i = 0; i < e.length; i++) e[i] = parseInt(r.slice(2 * i, 2 * i + 2), 16)
                        } else if (r = t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/)) {
                            for (i = 0; i < e.length; i++) e[i] = parseInt(r[i + 1]);
                            n = parseFloat(r[4])
                        } else if (r = t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/)) {
                            for (i = 0; i < e.length; i++) e[i] = Math.round(2.55 * parseFloat(r[i + 1]));
                            n = parseFloat(r[4])
                        } else if (r = t.match(/(\w+)/)) {
                            if ("transparent" == r[1]) return [0, 0, 0, 0];
                            if (!(e = h[r[1]])) return
                        }
                        for (i = 0; i < e.length; i++) e[i] = u(e[i], 0, 255);
                        return n = n || 0 == n ? u(n, 0, 1) : 1, e[3] = n, e
                    }
                }

                function i(t) {
                    if (t) {
                        var e = t.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
                        if (e) {
                            var n = parseFloat(e[4]);
                            return [u(parseInt(e[1]), 0, 360), u(parseFloat(e[2]), 0, 100), u(parseFloat(e[3]), 0, 100), u(isNaN(n) ? 1 : n, 0, 1)]
                        }
                    }
                }

                function o(t) {
                    if (t) {
                        var e = t.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
                        if (e) {
                            var n = parseFloat(e[4]);
                            return [u(parseInt(e[1]), 0, 360), u(parseFloat(e[2]), 0, 100), u(parseFloat(e[3]), 0, 100), u(isNaN(n) ? 1 : n, 0, 1)]
                        }
                    }
                }

                function a(t, e) {
                    return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")"
                }

                function s(t, e) {
                    return "rgba(" + Math.round(t[0] / 255 * 100) + "%, " + Math.round(t[1] / 255 * 100) + "%, " + Math.round(t[2] / 255 * 100) + "%, " + (e || t[3] || 1) + ")"
                }

                function l(t, e) {
                    return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")"
                }

                function u(t, e, n) {
                    return Math.min(Math.max(e, t), n)
                }

                function c(t) {
                    var e = t.toString(16).toUpperCase();
                    return e.length < 2 ? "0" + e : e
                }
                var h = t(6);
                e.exports = {
                    getRgba: r,
                    getHsla: i,
                    getRgb: function(t) {
                        var e = r(t);
                        return e && e.slice(0, 3)
                    },
                    getHsl: function(t) {
                        var e = i(t);
                        return e && e.slice(0, 3)
                    },
                    getHwb: o,
                    getAlpha: function(t) {
                        var e = r(t);
                        return e ? e[3] : (e = i(t)) ? e[3] : (e = o(t)) ? e[3] : void 0
                    },
                    hexString: function(t) {
                        return "#" + c(t[0]) + c(t[1]) + c(t[2])
                    },
                    rgbString: function(t, e) {
                        return e < 1 || t[3] && t[3] < 1 ? a(t, e) : "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")"
                    },
                    rgbaString: a,
                    percentString: function(t, e) {
                        return e < 1 || t[3] && t[3] < 1 ? s(t, e) : "rgb(" + Math.round(t[0] / 255 * 100) + "%, " + Math.round(t[1] / 255 * 100) + "%, " + Math.round(t[2] / 255 * 100) + "%)"
                    },
                    percentaString: s,
                    hslString: function(t, e) {
                        return e < 1 || t[3] && t[3] < 1 ? l(t, e) : "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)"
                    },
                    hslaString: l,
                    hwbString: function(t, e) {
                        return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + (void 0 !== e && 1 !== e ? ", " + e : "") + ")"
                    },
                    keyword: function(t) {
                        return d[t.slice(0, 3)]
                    }
                };
                var d = {};
                for (var f in h) d[h[f]] = f
            }, {
                6: 6
            }],
            3: [function(t, e, n) {
                var c = t(5),
                    r = t(2),
                    a = function(t) {
                        return t instanceof a ? t : this instanceof a ? (this.valid = !1, this.values = {
                            rgb: [0, 0, 0],
                            hsl: [0, 0, 0],
                            hsv: [0, 0, 0],
                            hwb: [0, 0, 0],
                            cmyk: [0, 0, 0, 0],
                            alpha: 1
                        }, void("string" == typeof t ? (e = r.getRgba(t)) ? this.setValues("rgb", e) : (e = r.getHsla(t)) ? this.setValues("hsl", e) : (e = r.getHwb(t)) && this.setValues("hwb", e) : "object" == typeof t && (void 0 !== (e = t).r || void 0 !== e.red ? this.setValues("rgb", e) : void 0 !== e.l || void 0 !== e.lightness ? this.setValues("hsl", e) : void 0 !== e.v || void 0 !== e.value ? this.setValues("hsv", e) : void 0 !== e.w || void 0 !== e.whiteness ? this.setValues("hwb", e) : void 0 === e.c && void 0 === e.cyan || this.setValues("cmyk", e)))) : new a(t);
                        var e
                    };
                a.prototype = {
                    isValid: function() {
                        return this.valid
                    },
                    rgb: function() {
                        return this.setSpace("rgb", arguments)
                    },
                    hsl: function() {
                        return this.setSpace("hsl", arguments)
                    },
                    hsv: function() {
                        return this.setSpace("hsv", arguments)
                    },
                    hwb: function() {
                        return this.setSpace("hwb", arguments)
                    },
                    cmyk: function() {
                        return this.setSpace("cmyk", arguments)
                    },
                    rgbArray: function() {
                        return this.values.rgb
                    },
                    hslArray: function() {
                        return this.values.hsl
                    },
                    hsvArray: function() {
                        return this.values.hsv
                    },
                    hwbArray: function() {
                        var t = this.values;
                        return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb
                    },
                    cmykArray: function() {
                        return this.values.cmyk
                    },
                    rgbaArray: function() {
                        var t = this.values;
                        return t.rgb.concat([t.alpha])
                    },
                    hslaArray: function() {
                        var t = this.values;
                        return t.hsl.concat([t.alpha])
                    },
                    alpha: function(t) {
                        return void 0 === t ? this.values.alpha : (this.setValues("alpha", t), this)
                    },
                    red: function(t) {
                        return this.setChannel("rgb", 0, t)
                    },
                    green: function(t) {
                        return this.setChannel("rgb", 1, t)
                    },
                    blue: function(t) {
                        return this.setChannel("rgb", 2, t)
                    },
                    hue: function(t) {
                        return t && (t = (t %= 360) < 0 ? 360 + t : t), this.setChannel("hsl", 0, t)
                    },
                    saturation: function(t) {
                        return this.setChannel("hsl", 1, t)
                    },
                    lightness: function(t) {
                        return this.setChannel("hsl", 2, t)
                    },
                    saturationv: function(t) {
                        return this.setChannel("hsv", 1, t)
                    },
                    whiteness: function(t) {
                        return this.setChannel("hwb", 1, t)
                    },
                    blackness: function(t) {
                        return this.setChannel("hwb", 2, t)
                    },
                    value: function(t) {
                        return this.setChannel("hsv", 2, t)
                    },
                    cyan: function(t) {
                        return this.setChannel("cmyk", 0, t)
                    },
                    magenta: function(t) {
                        return this.setChannel("cmyk", 1, t)
                    },
                    yellow: function(t) {
                        return this.setChannel("cmyk", 2, t)
                    },
                    black: function(t) {
                        return this.setChannel("cmyk", 3, t)
                    },
                    hexString: function() {
                        return r.hexString(this.values.rgb)
                    },
                    rgbString: function() {
                        return r.rgbString(this.values.rgb, this.values.alpha)
                    },
                    rgbaString: function() {
                        return r.rgbaString(this.values.rgb, this.values.alpha)
                    },
                    percentString: function() {
                        return r.percentString(this.values.rgb, this.values.alpha)
                    },
                    hslString: function() {
                        return r.hslString(this.values.hsl, this.values.alpha)
                    },
                    hslaString: function() {
                        return r.hslaString(this.values.hsl, this.values.alpha)
                    },
                    hwbString: function() {
                        return r.hwbString(this.values.hwb, this.values.alpha)
                    },
                    keyword: function() {
                        return r.keyword(this.values.rgb, this.values.alpha)
                    },
                    rgbNumber: function() {
                        var t = this.values.rgb;
                        return t[0] << 16 | t[1] << 8 | t[2]
                    },
                    luminosity: function() {
                        for (var t = this.values.rgb, e = [], n = 0; n < t.length; n++) {
                            var r = t[n] / 255;
                            e[n] = r <= .03928 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4)
                        }
                        return .2126 * e[0] + .7152 * e[1] + .0722 * e[2]
                    },
                    contrast: function(t) {
                        var e = this.luminosity(),
                            n = t.luminosity();
                        return n < e ? (e + .05) / (n + .05) : (n + .05) / (e + .05)
                    },
                    level: function(t) {
                        var e = this.contrast(t);
                        return 7.1 <= e ? "AAA" : 4.5 <= e ? "AA" : ""
                    },
                    dark: function() {
                        var t = this.values.rgb;
                        return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128
                    },
                    light: function() {
                        return !this.dark()
                    },
                    negate: function() {
                        for (var t = [], e = 0; e < 3; e++) t[e] = 255 - this.values.rgb[e];
                        return this.setValues("rgb", t), this
                    },
                    lighten: function(t) {
                        var e = this.values.hsl;
                        return e[2] += e[2] * t, this.setValues("hsl", e), this
                    },
                    darken: function(t) {
                        var e = this.values.hsl;
                        return e[2] -= e[2] * t, this.setValues("hsl", e), this
                    },
                    saturate: function(t) {
                        var e = this.values.hsl;
                        return e[1] += e[1] * t, this.setValues("hsl", e), this
                    },
                    desaturate: function(t) {
                        var e = this.values.hsl;
                        return e[1] -= e[1] * t, this.setValues("hsl", e), this
                    },
                    whiten: function(t) {
                        var e = this.values.hwb;
                        return e[1] += e[1] * t, this.setValues("hwb", e), this
                    },
                    blacken: function(t) {
                        var e = this.values.hwb;
                        return e[2] += e[2] * t, this.setValues("hwb", e), this
                    },
                    greyscale: function() {
                        var t = this.values.rgb,
                            e = .3 * t[0] + .59 * t[1] + .11 * t[2];
                        return this.setValues("rgb", [e, e, e]), this
                    },
                    clearer: function(t) {
                        var e = this.values.alpha;
                        return this.setValues("alpha", e - e * t), this
                    },
                    opaquer: function(t) {
                        var e = this.values.alpha;
                        return this.setValues("alpha", e + e * t), this
                    },
                    rotate: function(t) {
                        var e = this.values.hsl,
                            n = (e[0] + t) % 360;
                        return e[0] = n < 0 ? 360 + n : n, this.setValues("hsl", e), this
                    },
                    mix: function(t, e) {
                        var n = this,
                            r = t,
                            i = void 0 === e ? .5 : e,
                            o = 2 * i - 1,
                            a = n.alpha() - r.alpha(),
                            s = ((o * a == -1 ? o : (o + a) / (1 + o * a)) + 1) / 2,
                            l = 1 - s;
                        return this.rgb(s * n.red() + l * r.red(), s * n.green() + l * r.green(), s * n.blue() + l * r.blue()).alpha(n.alpha() * i + r.alpha() * (1 - i))
                    },
                    toJSON: function() {
                        return this.rgb()
                    },
                    clone: function() {
                        var t, e, n = new a,
                            r = this.values,
                            i = n.values;
                        for (var o in r) r.hasOwnProperty(o) && (t = r[o], "[object Array]" === (e = {}.toString.call(t)) ? i[o] = t.slice(0) : "[object Number]" === e ? i[o] = t : console.error("unexpected color value:", t));
                        return n
                    }
                }, a.prototype.spaces = {
                    rgb: ["red", "green", "blue"],
                    hsl: ["hue", "saturation", "lightness"],
                    hsv: ["hue", "saturation", "value"],
                    hwb: ["hue", "whiteness", "blackness"],
                    cmyk: ["cyan", "magenta", "yellow", "black"]
                }, a.prototype.maxes = {
                    rgb: [255, 255, 255],
                    hsl: [360, 100, 100],
                    hsv: [360, 100, 100],
                    hwb: [360, 100, 100],
                    cmyk: [100, 100, 100, 100]
                }, a.prototype.getValues = function(t) {
                    for (var e = this.values, n = {}, r = 0; r < t.length; r++) n[t.charAt(r)] = e[t][r];
                    return 1 !== e.alpha && (n.a = e.alpha), n
                }, a.prototype.setValues = function(t, e) {
                    var n, r, i = this.values,
                        o = this.spaces,
                        a = this.maxes,
                        s = 1;
                    if (this.valid = !0, "alpha" === t) s = e;
                    else if (e.length) i[t] = e.slice(0, t.length), s = e[t.length];
                    else if (void 0 !== e[t.charAt(0)]) {
                        for (n = 0; n < t.length; n++) i[t][n] = e[t.charAt(n)];
                        s = e.a
                    } else if (void 0 !== e[o[t][0]]) {
                        var l = o[t];
                        for (n = 0; n < t.length; n++) i[t][n] = e[l[n]];
                        s = e.alpha
                    }
                    if (i.alpha = Math.max(0, Math.min(1, void 0 === s ? i.alpha : s)), "alpha" === t) return !1;
                    for (n = 0; n < t.length; n++) r = Math.max(0, Math.min(a[t][n], i[t][n])), i[t][n] = Math.round(r);
                    for (var u in o) u !== t && (i[u] = c[t][u](i[t]));
                    return !0
                }, a.prototype.setSpace = function(t, e) {
                    var n = e[0];
                    return void 0 === n ? this.getValues(t) : ("number" == typeof n && (n = Array.prototype.slice.call(e)), this.setValues(t, n), this)
                }, a.prototype.setChannel = function(t, e, n) {
                    var r = this.values[t];
                    return void 0 === n ? r[e] : (n === r[e] || (r[e] = n, this.setValues(t, r)), this)
                }, "undefined" != typeof window && (window.Color = a), e.exports = a
            }, {
                2: 2,
                5: 5
            }],
            4: [function(t, e, n) {
                function i(t) {
                    var e, n, r = t[0] / 255,
                        i = t[1] / 255,
                        o = t[2] / 255,
                        a = Math.min(r, i, o),
                        s = Math.max(r, i, o),
                        l = s - a;
                    return s == a ? e = 0 : r == s ? e = (i - o) / l : i == s ? e = 2 + (o - r) / l : o == s && (e = 4 + (r - i) / l), (e = Math.min(60 * e, 360)) < 0 && (e += 360), n = (a + s) / 2, [e, 100 * (s == a ? 0 : n <= .5 ? l / (s + a) : l / (2 - s - a)), 100 * n]
                }

                function o(t) {
                    var e, n, r = t[0],
                        i = t[1],
                        o = t[2],
                        a = Math.min(r, i, o),
                        s = Math.max(r, i, o),
                        l = s - a;
                    return n = 0 == s ? 0 : l / s * 1e3 / 10, s == a ? e = 0 : r == s ? e = (i - o) / l : i == s ? e = 2 + (o - r) / l : o == s && (e = 4 + (r - i) / l), (e = Math.min(60 * e, 360)) < 0 && (e += 360), [e, n, s / 255 * 1e3 / 10]
                }

                function a(t) {
                    var e = t[0],
                        n = t[1],
                        r = t[2];
                    return [i(t)[0], 100 * (1 / 255 * Math.min(e, Math.min(n, r))), 100 * (r = 1 - 1 / 255 * Math.max(e, Math.max(n, r)))]
                }

                function s(t) {
                    var e, n = t[0] / 255,
                        r = t[1] / 255,
                        i = t[2] / 255;
                    return [100 * ((1 - n - (e = Math.min(1 - n, 1 - r, 1 - i))) / (1 - e) || 0), 100 * ((1 - r - e) / (1 - e) || 0), 100 * ((1 - i - e) / (1 - e) || 0), 100 * e]
                }

                function l(t) {
                    return C[JSON.stringify(t)]
                }

                function u(t) {
                    var e = t[0] / 255,
                        n = t[1] / 255,
                        r = t[2] / 255;
                    return [100 * (.4124 * (e = .04045 < e ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92) + .3576 * (n = .04045 < n ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92) + .1805 * (r = .04045 < r ? Math.pow((r + .055) / 1.055, 2.4) : r / 12.92)), 100 * (.2126 * e + .7152 * n + .0722 * r), 100 * (.0193 * e + .1192 * n + .9505 * r)]
                }

                function c(t) {
                    var e = u(t),
                        n = e[0],
                        r = e[1],
                        i = e[2];
                    return r /= 100, i /= 108.883, n = .008856 < (n /= 95.047) ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116, [116 * (r = .008856 < r ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116) - 16, 500 * (n - r), 200 * (r - (i = .008856 < i ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116))]
                }

                function h(t) {
                    var e, n, r, i, o, a = t[0] / 360,
                        s = t[1] / 100,
                        l = t[2] / 100;
                    if (0 == s) return [o = 255 * l, o, o];
                    e = 2 * l - (n = l < .5 ? l * (1 + s) : l + s - l * s), i = [0, 0, 0];
                    for (var u = 0; u < 3; u++)(r = a + 1 / 3 * -(u - 1)) < 0 && r++, 1 < r && r--, o = 6 * r < 1 ? e + 6 * (n - e) * r : 2 * r < 1 ? n : 3 * r < 2 ? e + (n - e) * (2 / 3 - r) * 6 : e, i[u] = 255 * o;
                    return i
                }

                function d(t) {
                    var e = t[0] / 60,
                        n = t[1] / 100,
                        r = t[2] / 100,
                        i = Math.floor(e) % 6,
                        o = e - Math.floor(e),
                        a = 255 * r * (1 - n),
                        s = 255 * r * (1 - n * o),
                        l = 255 * r * (1 - n * (1 - o));
                    r *= 255;
                    switch (i) {
                        case 0:
                            return [r, l, a];
                        case 1:
                            return [s, r, a];
                        case 2:
                            return [a, r, l];
                        case 3:
                            return [a, s, r];
                        case 4:
                            return [l, a, r];
                        case 5:
                            return [r, a, s]
                    }
                }

                function f(t) {
                    var e, n, i, o, a = t[0] / 360,
                        s = t[1] / 100,
                        l = t[2] / 100,
                        u = s + l;
                    switch (1 < u && (s /= u, l /= u), i = 6 * a - (e = Math.floor(6 * a)), 0 != (1 & e) && (i = 1 - i), o = s + i * ((n = 1 - l) - s), e) {
                        default:
                            case 6:
                            case 0:
                            r = n,
                        g = o,
                        b = s;
                        break;
                        case 1:
                                r = o,
                            g = n,
                            b = s;
                            break;
                        case 2:
                                r = s,
                            g = n,
                            b = o;
                            break;
                        case 3:
                                r = s,
                            g = o,
                            b = n;
                            break;
                        case 4:
                                r = o,
                            g = s,
                            b = n;
                            break;
                        case 5:
                                r = n,
                            g = s,
                            b = o
                    }
                    return [255 * r, 255 * g, 255 * b]
                }

                function p(t) {
                    var e = t[0] / 100,
                        n = t[1] / 100,
                        r = t[2] / 100,
                        i = t[3] / 100;
                    return [255 * (1 - Math.min(1, e * (1 - i) + i)), 255 * (1 - Math.min(1, n * (1 - i) + i)), 255 * (1 - Math.min(1, r * (1 - i) + i))]
                }

                function v(t) {
                    var e, n, r, i = t[0] / 100,
                        o = t[1] / 100,
                        a = t[2] / 100;
                    return n = -.9689 * i + 1.8758 * o + .0415 * a, r = .0557 * i + -.204 * o + 1.057 * a, e = .0031308 < (e = 3.2406 * i + -1.5372 * o + -.4986 * a) ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : e *= 12.92, n = .0031308 < n ? 1.055 * Math.pow(n, 1 / 2.4) - .055 : n *= 12.92, r = .0031308 < r ? 1.055 * Math.pow(r, 1 / 2.4) - .055 : r *= 12.92, [255 * (e = Math.min(Math.max(0, e), 1)), 255 * (n = Math.min(Math.max(0, n), 1)), 255 * (r = Math.min(Math.max(0, r), 1))]
                }

                function m(t) {
                    var e = t[0],
                        n = t[1],
                        r = t[2];
                    return n /= 100, r /= 108.883, e = .008856 < (e /= 95.047) ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116, [116 * (n = .008856 < n ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) - 16, 500 * (e - n), 200 * (n - (r = .008856 < r ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116))]
                }

                function y(t) {
                    var e, n, r, i, o = t[0],
                        a = t[1],
                        s = t[2];
                    return o <= 8 ? i = (n = 100 * o / 903.3) / 100 * 7.787 + 16 / 116 : (n = 100 * Math.pow((o + 16) / 116, 3), i = Math.pow(n / 100, 1 / 3)), [e = e / 95.047 <= .008856 ? e = 95.047 * (a / 500 + i - 16 / 116) / 7.787 : 95.047 * Math.pow(a / 500 + i, 3), n, r = r / 108.883 <= .008859 ? r = 108.883 * (i - s / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(i - s / 200, 3)]
                }

                function _(t) {
                    var e, n = t[0],
                        r = t[1],
                        i = t[2];
                    return (e = 360 * Math.atan2(i, r) / 2 / Math.PI) < 0 && (e += 360), [n, Math.sqrt(r * r + i * i), e]
                }

                function w(t) {
                    return v(y(t))
                }

                function x(t) {
                    var e, n = t[0],
                        r = t[1];
                    return e = t[2] / 360 * 2 * Math.PI, [n, r * Math.cos(e), r * Math.sin(e)]
                }

                function k(t) {
                    return S[t]
                }
                e.exports = {
                    rgb2hsl: i,
                    rgb2hsv: o,
                    rgb2hwb: a,
                    rgb2cmyk: s,
                    rgb2keyword: l,
                    rgb2xyz: u,
                    rgb2lab: c,
                    rgb2lch: function(t) {
                        return _(c(t))
                    },
                    hsl2rgb: h,
                    hsl2hsv: function(t) {
                        var e = t[0],
                            n = t[1] / 100,
                            r = t[2] / 100;
                        return 0 === r ? [0, 0, 0] : [e, 2 * (n *= (r *= 2) <= 1 ? r : 2 - r) / (r + n) * 100, (r + n) / 2 * 100]
                    },
                    hsl2hwb: function(t) {
                        return a(h(t))
                    },
                    hsl2cmyk: function(t) {
                        return s(h(t))
                    },
                    hsl2keyword: function(t) {
                        return l(h(t))
                    },
                    hsv2rgb: d,
                    hsv2hsl: function(t) {
                        var e, n, r = t[0],
                            i = t[1] / 100,
                            o = t[2] / 100;
                        return e = i * o, [r, 100 * (e = (e /= (n = (2 - i) * o) <= 1 ? n : 2 - n) || 0), 100 * (n /= 2)]
                    },
                    hsv2hwb: function(t) {
                        return a(d(t))
                    },
                    hsv2cmyk: function(t) {
                        return s(d(t))
                    },
                    hsv2keyword: function(t) {
                        return l(d(t))
                    },
                    hwb2rgb: f,
                    hwb2hsl: function(t) {
                        return i(f(t))
                    },
                    hwb2hsv: function(t) {
                        return o(f(t))
                    },
                    hwb2cmyk: function(t) {
                        return s(f(t))
                    },
                    hwb2keyword: function(t) {
                        return l(f(t))
                    },
                    cmyk2rgb: p,
                    cmyk2hsl: function(t) {
                        return i(p(t))
                    },
                    cmyk2hsv: function(t) {
                        return o(p(t))
                    },
                    cmyk2hwb: function(t) {
                        return a(p(t))
                    },
                    cmyk2keyword: function(t) {
                        return l(p(t))
                    },
                    keyword2rgb: k,
                    keyword2hsl: function(t) {
                        return i(k(t))
                    },
                    keyword2hsv: function(t) {
                        return o(k(t))
                    },
                    keyword2hwb: function(t) {
                        return a(k(t))
                    },
                    keyword2cmyk: function(t) {
                        return s(k(t))
                    },
                    keyword2lab: function(t) {
                        return c(k(t))
                    },
                    keyword2xyz: function(t) {
                        return u(k(t))
                    },
                    xyz2rgb: v,
                    xyz2lab: m,
                    xyz2lch: function(t) {
                        return _(m(t))
                    },
                    lab2xyz: y,
                    lab2rgb: w,
                    lab2lch: _,
                    lch2lab: x,
                    lch2xyz: function(t) {
                        return y(x(t))
                    },
                    lch2rgb: function(t) {
                        return w(x(t))
                    }
                };
                var S = {
                        aliceblue: [240, 248, 255],
                        antiquewhite: [250, 235, 215],
                        aqua: [0, 255, 255],
                        aquamarine: [127, 255, 212],
                        azure: [240, 255, 255],
                        beige: [245, 245, 220],
                        bisque: [255, 228, 196],
                        black: [0, 0, 0],
                        blanchedalmond: [255, 235, 205],
                        blue: [0, 0, 255],
                        blueviolet: [138, 43, 226],
                        brown: [165, 42, 42],
                        burlywood: [222, 184, 135],
                        cadetblue: [95, 158, 160],
                        chartreuse: [127, 255, 0],
                        chocolate: [210, 105, 30],
                        coral: [255, 127, 80],
                        cornflowerblue: [100, 149, 237],
                        cornsilk: [255, 248, 220],
                        crimson: [220, 20, 60],
                        cyan: [0, 255, 255],
                        darkblue: [0, 0, 139],
                        darkcyan: [0, 139, 139],
                        darkgoldenrod: [184, 134, 11],
                        darkgray: [169, 169, 169],
                        darkgreen: [0, 100, 0],
                        darkgrey: [169, 169, 169],
                        darkkhaki: [189, 183, 107],
                        darkmagenta: [139, 0, 139],
                        darkolivegreen: [85, 107, 47],
                        darkorange: [255, 140, 0],
                        darkorchid: [153, 50, 204],
                        darkred: [139, 0, 0],
                        darksalmon: [233, 150, 122],
                        darkseagreen: [143, 188, 143],
                        darkslateblue: [72, 61, 139],
                        darkslategray: [47, 79, 79],
                        darkslategrey: [47, 79, 79],
                        darkturquoise: [0, 206, 209],
                        darkviolet: [148, 0, 211],
                        deeppink: [255, 20, 147],
                        deepskyblue: [0, 191, 255],
                        dimgray: [105, 105, 105],
                        dimgrey: [105, 105, 105],
                        dodgerblue: [30, 144, 255],
                        firebrick: [178, 34, 34],
                        floralwhite: [255, 250, 240],
                        forestgreen: [34, 139, 34],
                        fuchsia: [255, 0, 255],
                        gainsboro: [220, 220, 220],
                        ghostwhite: [248, 248, 255],
                        gold: [255, 215, 0],
                        goldenrod: [218, 165, 32],
                        gray: [128, 128, 128],
                        green: [0, 128, 0],
                        greenyellow: [173, 255, 47],
                        grey: [128, 128, 128],
                        honeydew: [240, 255, 240],
                        hotpink: [255, 105, 180],
                        indianred: [205, 92, 92],
                        indigo: [75, 0, 130],
                        ivory: [255, 255, 240],
                        khaki: [240, 230, 140],
                        lavender: [230, 230, 250],
                        lavenderblush: [255, 240, 245],
                        lawngreen: [124, 252, 0],
                        lemonchiffon: [255, 250, 205],
                        lightblue: [173, 216, 230],
                        lightcoral: [240, 128, 128],
                        lightcyan: [224, 255, 255],
                        lightgoldenrodyellow: [250, 250, 210],
                        lightgray: [211, 211, 211],
                        lightgreen: [144, 238, 144],
                        lightgrey: [211, 211, 211],
                        lightpink: [255, 182, 193],
                        lightsalmon: [255, 160, 122],
                        lightseagreen: [32, 178, 170],
                        lightskyblue: [135, 206, 250],
                        lightslategray: [119, 136, 153],
                        lightslategrey: [119, 136, 153],
                        lightsteelblue: [176, 196, 222],
                        lightyellow: [255, 255, 224],
                        lime: [0, 255, 0],
                        limegreen: [50, 205, 50],
                        linen: [250, 240, 230],
                        magenta: [255, 0, 255],
                        maroon: [128, 0, 0],
                        mediumaquamarine: [102, 205, 170],
                        mediumblue: [0, 0, 205],
                        mediumorchid: [186, 85, 211],
                        mediumpurple: [147, 112, 219],
                        mediumseagreen: [60, 179, 113],
                        mediumslateblue: [123, 104, 238],
                        mediumspringgreen: [0, 250, 154],
                        mediumturquoise: [72, 209, 204],
                        mediumvioletred: [199, 21, 133],
                        midnightblue: [25, 25, 112],
                        mintcream: [245, 255, 250],
                        mistyrose: [255, 228, 225],
                        moccasin: [255, 228, 181],
                        navajowhite: [255, 222, 173],
                        navy: [0, 0, 128],
                        oldlace: [253, 245, 230],
                        olive: [128, 128, 0],
                        olivedrab: [107, 142, 35],
                        orange: [255, 165, 0],
                        orangered: [255, 69, 0],
                        orchid: [218, 112, 214],
                        palegoldenrod: [238, 232, 170],
                        palegreen: [152, 251, 152],
                        paleturquoise: [175, 238, 238],
                        palevioletred: [219, 112, 147],
                        papayawhip: [255, 239, 213],
                        peachpuff: [255, 218, 185],
                        peru: [205, 133, 63],
                        pink: [255, 192, 203],
                        plum: [221, 160, 221],
                        powderblue: [176, 224, 230],
                        purple: [128, 0, 128],
                        rebeccapurple: [102, 51, 153],
                        red: [255, 0, 0],
                        rosybrown: [188, 143, 143],
                        royalblue: [65, 105, 225],
                        saddlebrown: [139, 69, 19],
                        salmon: [250, 128, 114],
                        sandybrown: [244, 164, 96],
                        seagreen: [46, 139, 87],
                        seashell: [255, 245, 238],
                        sienna: [160, 82, 45],
                        silver: [192, 192, 192],
                        skyblue: [135, 206, 235],
                        slateblue: [106, 90, 205],
                        slategray: [112, 128, 144],
                        slategrey: [112, 128, 144],
                        snow: [255, 250, 250],
                        springgreen: [0, 255, 127],
                        steelblue: [70, 130, 180],
                        tan: [210, 180, 140],
                        teal: [0, 128, 128],
                        thistle: [216, 191, 216],
                        tomato: [255, 99, 71],
                        turquoise: [64, 224, 208],
                        violet: [238, 130, 238],
                        wheat: [245, 222, 179],
                        white: [255, 255, 255],
                        whitesmoke: [245, 245, 245],
                        yellow: [255, 255, 0],
                        yellowgreen: [154, 205, 50]
                    },
                    C = {};
                for (var T in S) C[JSON.stringify(S[T])] = T
            }, {}],
            5: [function(t, e, n) {
                var i = t(4),
                    o = function() {
                        return new u
                    };
                for (var r in i) {
                    o[r + "Raw"] = function(e) {
                        return function(t) {
                            return "number" == typeof t && (t = Array.prototype.slice.call(arguments)), i[e](t)
                        }
                    }(r);
                    var a = /(\w+)2(\w+)/.exec(r),
                        s = a[1],
                        l = a[2];
                    (o[s] = o[s] || {})[l] = o[r] = function(r) {
                        return function(t) {
                            "number" == typeof t && (t = Array.prototype.slice.call(arguments));
                            var e = i[r](t);
                            if ("string" == typeof e || void 0 === e) return e;
                            for (var n = 0; n < e.length; n++) e[n] = Math.round(e[n]);
                            return e
                        }
                    }(r)
                }
                var u = function() {
                    this.convs = {}
                };
                u.prototype.routeSpace = function(t, e) {
                    var n = e[0];
                    return void 0 === n ? this.getValues(t) : ("number" == typeof n && (n = Array.prototype.slice.call(e)), this.setValues(t, n))
                }, u.prototype.setValues = function(t, e) {
                    return this.space = t, this.convs = {}, this.convs[t] = e, this
                }, u.prototype.getValues = function(t) {
                    var e = this.convs[t];
                    if (!e) {
                        var n = this.space,
                            r = this.convs[n];
                        e = o[n][t](r), this.convs[t] = e
                    }
                    return e
                }, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(e) {
                    u.prototype[e] = function(t) {
                        return this.routeSpace(e, arguments)
                    }
                }), e.exports = o
            }, {
                4: 4
            }],
            6: [function(t, e, n) {
                e.exports = {
                    aliceblue: [240, 248, 255],
                    antiquewhite: [250, 235, 215],
                    aqua: [0, 255, 255],
                    aquamarine: [127, 255, 212],
                    azure: [240, 255, 255],
                    beige: [245, 245, 220],
                    bisque: [255, 228, 196],
                    black: [0, 0, 0],
                    blanchedalmond: [255, 235, 205],
                    blue: [0, 0, 255],
                    blueviolet: [138, 43, 226],
                    brown: [165, 42, 42],
                    burlywood: [222, 184, 135],
                    cadetblue: [95, 158, 160],
                    chartreuse: [127, 255, 0],
                    chocolate: [210, 105, 30],
                    coral: [255, 127, 80],
                    cornflowerblue: [100, 149, 237],
                    cornsilk: [255, 248, 220],
                    crimson: [220, 20, 60],
                    cyan: [0, 255, 255],
                    darkblue: [0, 0, 139],
                    darkcyan: [0, 139, 139],
                    darkgoldenrod: [184, 134, 11],
                    darkgray: [169, 169, 169],
                    darkgreen: [0, 100, 0],
                    darkgrey: [169, 169, 169],
                    darkkhaki: [189, 183, 107],
                    darkmagenta: [139, 0, 139],
                    darkolivegreen: [85, 107, 47],
                    darkorange: [255, 140, 0],
                    darkorchid: [153, 50, 204],
                    darkred: [139, 0, 0],
                    darksalmon: [233, 150, 122],
                    darkseagreen: [143, 188, 143],
                    darkslateblue: [72, 61, 139],
                    darkslategray: [47, 79, 79],
                    darkslategrey: [47, 79, 79],
                    darkturquoise: [0, 206, 209],
                    darkviolet: [148, 0, 211],
                    deeppink: [255, 20, 147],
                    deepskyblue: [0, 191, 255],
                    dimgray: [105, 105, 105],
                    dimgrey: [105, 105, 105],
                    dodgerblue: [30, 144, 255],
                    firebrick: [178, 34, 34],
                    floralwhite: [255, 250, 240],
                    forestgreen: [34, 139, 34],
                    fuchsia: [255, 0, 255],
                    gainsboro: [220, 220, 220],
                    ghostwhite: [248, 248, 255],
                    gold: [255, 215, 0],
                    goldenrod: [218, 165, 32],
                    gray: [128, 128, 128],
                    green: [0, 128, 0],
                    greenyellow: [173, 255, 47],
                    grey: [128, 128, 128],
                    honeydew: [240, 255, 240],
                    hotpink: [255, 105, 180],
                    indianred: [205, 92, 92],
                    indigo: [75, 0, 130],
                    ivory: [255, 255, 240],
                    khaki: [240, 230, 140],
                    lavender: [230, 230, 250],
                    lavenderblush: [255, 240, 245],
                    lawngreen: [124, 252, 0],
                    lemonchiffon: [255, 250, 205],
                    lightblue: [173, 216, 230],
                    lightcoral: [240, 128, 128],
                    lightcyan: [224, 255, 255],
                    lightgoldenrodyellow: [250, 250, 210],
                    lightgray: [211, 211, 211],
                    lightgreen: [144, 238, 144],
                    lightgrey: [211, 211, 211],
                    lightpink: [255, 182, 193],
                    lightsalmon: [255, 160, 122],
                    lightseagreen: [32, 178, 170],
                    lightskyblue: [135, 206, 250],
                    lightslategray: [119, 136, 153],
                    lightslategrey: [119, 136, 153],
                    lightsteelblue: [176, 196, 222],
                    lightyellow: [255, 255, 224],
                    lime: [0, 255, 0],
                    limegreen: [50, 205, 50],
                    linen: [250, 240, 230],
                    magenta: [255, 0, 255],
                    maroon: [128, 0, 0],
                    mediumaquamarine: [102, 205, 170],
                    mediumblue: [0, 0, 205],
                    mediumorchid: [186, 85, 211],
                    mediumpurple: [147, 112, 219],
                    mediumseagreen: [60, 179, 113],
                    mediumslateblue: [123, 104, 238],
                    mediumspringgreen: [0, 250, 154],
                    mediumturquoise: [72, 209, 204],
                    mediumvioletred: [199, 21, 133],
                    midnightblue: [25, 25, 112],
                    mintcream: [245, 255, 250],
                    mistyrose: [255, 228, 225],
                    moccasin: [255, 228, 181],
                    navajowhite: [255, 222, 173],
                    navy: [0, 0, 128],
                    oldlace: [253, 245, 230],
                    olive: [128, 128, 0],
                    olivedrab: [107, 142, 35],
                    orange: [255, 165, 0],
                    orangered: [255, 69, 0],
                    orchid: [218, 112, 214],
                    palegoldenrod: [238, 232, 170],
                    palegreen: [152, 251, 152],
                    paleturquoise: [175, 238, 238],
                    palevioletred: [219, 112, 147],
                    papayawhip: [255, 239, 213],
                    peachpuff: [255, 218, 185],
                    peru: [205, 133, 63],
                    pink: [255, 192, 203],
                    plum: [221, 160, 221],
                    powderblue: [176, 224, 230],
                    purple: [128, 0, 128],
                    rebeccapurple: [102, 51, 153],
                    red: [255, 0, 0],
                    rosybrown: [188, 143, 143],
                    royalblue: [65, 105, 225],
                    saddlebrown: [139, 69, 19],
                    salmon: [250, 128, 114],
                    sandybrown: [244, 164, 96],
                    seagreen: [46, 139, 87],
                    seashell: [255, 245, 238],
                    sienna: [160, 82, 45],
                    silver: [192, 192, 192],
                    skyblue: [135, 206, 235],
                    slateblue: [106, 90, 205],
                    slategray: [112, 128, 144],
                    slategrey: [112, 128, 144],
                    snow: [255, 250, 250],
                    springgreen: [0, 255, 127],
                    steelblue: [70, 130, 180],
                    tan: [210, 180, 140],
                    teal: [0, 128, 128],
                    thistle: [216, 191, 216],
                    tomato: [255, 99, 71],
                    turquoise: [64, 224, 208],
                    violet: [238, 130, 238],
                    wheat: [245, 222, 179],
                    white: [255, 255, 255],
                    whitesmoke: [245, 245, 245],
                    yellow: [255, 255, 0],
                    yellowgreen: [154, 205, 50]
                }
            }, {}],
            7: [function(t, e, n) {
                var r = t(28)();
                t(26)(r), t(40)(r), t(22)(r), t(25)(r), t(30)(r), t(21)(r), t(23)(r), t(24)(r), t(29)(r), t(32)(r), t(33)(r), t(31)(r), t(27)(r), t(34)(r), t(35)(r), t(36)(r), t(37)(r), t(38)(r), t(46)(r), t(44)(r), t(45)(r), t(47)(r), t(48)(r), t(49)(r), t(15)(r), t(16)(r), t(17)(r), t(18)(r), t(19)(r), t(20)(r), t(8)(r), t(9)(r), t(10)(r), t(11)(r), t(12)(r), t(13)(r), t(14)(r);
                var i = [];
                i.push(t(41)(r), t(42)(r), t(43)(r)), r.plugins.register(i), e.exports = r, "undefined" != typeof window && (window.Chart = r)
            }, {
                10: 10,
                11: 11,
                12: 12,
                13: 13,
                14: 14,
                15: 15,
                16: 16,
                17: 17,
                18: 18,
                19: 19,
                20: 20,
                21: 21,
                22: 22,
                23: 23,
                24: 24,
                25: 25,
                26: 26,
                27: 27,
                28: 28,
                29: 29,
                30: 30,
                31: 31,
                32: 32,
                33: 33,
                34: 34,
                35: 35,
                36: 36,
                37: 37,
                38: 38,
                40: 40,
                41: 41,
                42: 42,
                43: 43,
                44: 44,
                45: 45,
                46: 46,
                47: 47,
                48: 48,
                49: 49,
                8: 8,
                9: 9
            }],
            8: [function(t, e, n) {
                "use strict";
                e.exports = function(n) {
                    n.Bar = function(t, e) {
                        return e.type = "bar", new n(t, e)
                    }
                }
            }, {}],
            9: [function(t, e, n) {
                "use strict";
                e.exports = function(n) {
                    n.Bubble = function(t, e) {
                        return e.type = "bubble", new n(t, e)
                    }
                }
            }, {}],
            10: [function(t, e, n) {
                "use strict";
                e.exports = function(n) {
                    n.Doughnut = function(t, e) {
                        return e.type = "doughnut", new n(t, e)
                    }
                }
            }, {}],
            11: [function(t, e, n) {
                "use strict";
                e.exports = function(n) {
                    n.Line = function(t, e) {
                        return e.type = "line", new n(t, e)
                    }
                }
            }, {}],
            12: [function(t, e, n) {
                "use strict";
                e.exports = function(n) {
                    n.PolarArea = function(t, e) {
                        return e.type = "polarArea", new n(t, e)
                    }
                }
            }, {}],
            13: [function(t, e, n) {
                "use strict";
                e.exports = function(n) {
                    n.Radar = function(t, e) {
                        return e.type = "radar", new n(t, e)
                    }
                }
            }, {}],
            14: [function(t, e, n) {
                "use strict";
                e.exports = function(n) {
                    n.defaults.scatter = {
                        hover: {
                            mode: "single"
                        },
                        scales: {
                            xAxes: [{
                                type: "linear",
                                position: "bottom",
                                id: "x-axis-1"
                            }],
                            yAxes: [{
                                type: "linear",
                                position: "left",
                                id: "y-axis-1"
                            }]
                        },
                        tooltips: {
                            callbacks: {
                                title: function() {
                                    return ""
                                },
                                label: function(t) {
                                    return "(" + t.xLabel + ", " + t.yLabel + ")"
                                }
                            }
                        }
                    }, n.controllers.scatter = n.controllers.line, n.Scatter = function(t, e) {
                        return e.type = "scatter", new n(t, e)
                    }
                }
            }, {}],
            15: [function(t, e, n) {
                "use strict";
                e.exports = function(e) {
                    var u = e.helpers;
                    e.defaults.bar = {
                        hover: {
                            mode: "label"
                        },
                        scales: {
                            xAxes: [{
                                type: "category",
                                categoryPercentage: .8,
                                barPercentage: .9,
                                gridLines: {
                                    offsetGridLines: !0
                                }
                            }],
                            yAxes: [{
                                type: "linear"
                            }]
                        }
                    }, e.controllers.bar = e.DatasetController.extend({
                        dataElementType: e.elements.Rectangle,
                        initialize: function() {
                            var t;
                            e.DatasetController.prototype.initialize.apply(this, arguments), (t = this.getMeta()).stack = this.getDataset().stack, t.bar = !0
                        },
                        update: function(t) {
                            var e, n, r = this.getMeta().data;
                            for (this._ruler = this.getRuler(), e = 0, n = r.length; e < n; ++e) this.updateElement(r[e], e, t)
                        },
                        updateElement: function(t, e, n) {
                            var r = this,
                                i = r.chart,
                                o = r.getMeta(),
                                a = r.getDataset(),
                                s = t.custom || {},
                                l = i.options.elements.rectangle;
                            t._xScale = r.getScaleForId(o.xAxisID), t._yScale = r.getScaleForId(o.yAxisID), t._datasetIndex = r.index, t._index = e, t._model = {
                                datasetLabel: a.label,
                                label: i.data.labels[e],
                                borderSkipped: s.borderSkipped ? s.borderSkipped : l.borderSkipped,
                                backgroundColor: s.backgroundColor ? s.backgroundColor : u.getValueAtIndexOrDefault(a.backgroundColor, e, l.backgroundColor),
                                borderColor: s.borderColor ? s.borderColor : u.getValueAtIndexOrDefault(a.borderColor, e, l.borderColor),
                                borderWidth: s.borderWidth ? s.borderWidth : u.getValueAtIndexOrDefault(a.borderWidth, e, l.borderWidth)
                            }, r.updateElementGeometry(t, e, n), t.pivot()
                        },
                        updateElementGeometry: function(t, e, n) {
                            var r = this,
                                i = t._model,
                                o = r.getValueScale(),
                                a = o.getBasePixel(),
                                s = o.isHorizontal(),
                                l = r._ruler || r.getRuler(),
                                u = r.calculateBarValuePixels(r.index, e),
                                c = r.calculateBarIndexPixels(r.index, e, l);
                            i.horizontal = s, i.base = n ? a : u.base, i.x = s ? n ? a : u.head : c.center, i.y = s ? c.center : n ? a : u.head, i.height = s ? c.size : void 0, i.width = s ? void 0 : c.size
                        },
                        getValueScaleId: function() {
                            return this.getMeta().yAxisID
                        },
                        getIndexScaleId: function() {
                            return this.getMeta().xAxisID
                        },
                        getValueScale: function() {
                            return this.getScaleForId(this.getValueScaleId())
                        },
                        getIndexScale: function() {
                            return this.getScaleForId(this.getIndexScaleId())
                        },
                        getStackCount: function(t) {
                            var e, n, r = this.chart,
                                i = this.getIndexScale().options.stacked,
                                o = void 0 === t ? r.data.datasets.length : t + 1,
                                a = [];
                            for (e = 0; e < o; ++e)(n = r.getDatasetMeta(e)).bar && r.isDatasetVisible(e) && (!1 === i || !0 === i && -1 === a.indexOf(n.stack) || void 0 === i && (void 0 === n.stack || -1 === a.indexOf(n.stack))) && a.push(n.stack);
                            return a.length
                        },
                        getStackIndex: function(t) {
                            return this.getStackCount(t) - 1
                        },
                        getRuler: function() {
                            var t = this.getIndexScale(),
                                e = t.options,
                                n = this.getStackCount(),
                                r = (t.isHorizontal() ? t.width : t.height) / t.ticks.length,
                                i = r * e.categoryPercentage,
                                o = i / n,
                                a = o * e.barPercentage;
                            return {
                                stackCount: n,
                                tickSize: r,
                                categorySize: i,
                                categorySpacing: r - i,
                                fullBarSize: o,
                                barSize: a = Math.min(u.getValueOrDefault(e.barThickness, a), u.getValueOrDefault(e.maxBarThickness, 1 / 0)),
                                barSpacing: o - a,
                                scale: t
                            }
                        },
                        calculateBarValuePixels: function(t, e) {
                            var n, r, i, o, a, s, l = this.chart,
                                u = this.getMeta(),
                                c = this.getValueScale(),
                                h = l.data.datasets,
                                d = Number(h[t].data[e]),
                                f = c.options.stacked,
                                p = u.stack,
                                g = 0;
                            if (f || void 0 === f && void 0 !== p)
                                for (n = 0; n < t; ++n)(r = l.getDatasetMeta(n)).bar && r.stack === p && r.controller.getValueScaleId() === c.id && l.isDatasetVisible(n) && (i = Number(h[n].data[e]), (d < 0 && i < 0 || 0 <= d && 0 < i) && (g += i));
                            return o = c.getPixelForValue(g), {
                                size: s = ((a = c.getPixelForValue(g + d)) - o) / 2,
                                base: o,
                                head: a,
                                center: a + s / 2
                            }
                        },
                        calculateBarIndexPixels: function(t, e, n) {
                            var r = n.scale,
                                i = this.chart.isCombo,
                                o = this.getStackIndex(t),
                                a = r.getPixelForValue(null, e, t, i),
                                s = n.barSize;
                            return a -= i ? n.tickSize / 2 : 0, a += n.fullBarSize * o, a += n.categorySpacing / 2, {
                                size: s,
                                base: a += n.barSpacing / 2,
                                head: a + s,
                                center: a + s / 2
                            }
                        },
                        draw: function() {
                            var t, e = this.chart,
                                n = this.getMeta().data,
                                r = this.getDataset(),
                                i = n.length,
                                o = 0;
                            for (u.canvas.clipArea(e.ctx, e.chartArea); o < i; ++o) null == (t = r.data[o]) || isNaN(t) || n[o].draw();
                            u.canvas.unclipArea(e.ctx)
                        },
                        setHoverStyle: function(t) {
                            var e = this.chart.data.datasets[t._datasetIndex],
                                n = t._index,
                                r = t.custom || {},
                                i = t._model;
                            i.backgroundColor = r.hoverBackgroundColor ? r.hoverBackgroundColor : u.getValueAtIndexOrDefault(e.hoverBackgroundColor, n, u.getHoverColor(i.backgroundColor)), i.borderColor = r.hoverBorderColor ? r.hoverBorderColor : u.getValueAtIndexOrDefault(e.hoverBorderColor, n, u.getHoverColor(i.borderColor)), i.borderWidth = r.hoverBorderWidth ? r.hoverBorderWidth : u.getValueAtIndexOrDefault(e.hoverBorderWidth, n, i.borderWidth)
                        },
                        removeHoverStyle: function(t) {
                            var e = this.chart.data.datasets[t._datasetIndex],
                                n = t._index,
                                r = t.custom || {},
                                i = t._model,
                                o = this.chart.options.elements.rectangle;
                            i.backgroundColor = r.backgroundColor ? r.backgroundColor : u.getValueAtIndexOrDefault(e.backgroundColor, n, o.backgroundColor), i.borderColor = r.borderColor ? r.borderColor : u.getValueAtIndexOrDefault(e.borderColor, n, o.borderColor), i.borderWidth = r.borderWidth ? r.borderWidth : u.getValueAtIndexOrDefault(e.borderWidth, n, o.borderWidth)
                        }
                    }), e.defaults.horizontalBar = {
                        hover: {
                            mode: "label"
                        },
                        scales: {
                            xAxes: [{
                                type: "linear",
                                position: "bottom"
                            }],
                            yAxes: [{
                                position: "left",
                                type: "category",
                                categoryPercentage: .8,
                                barPercentage: .9,
                                gridLines: {
                                    offsetGridLines: !0
                                }
                            }]
                        },
                        elements: {
                            rectangle: {
                                borderSkipped: "left"
                            }
                        },
                        tooltips: {
                            callbacks: {
                                title: function(t, e) {
                                    var n = "";
                                    return 0 < t.length && (t[0].yLabel ? n = t[0].yLabel : 0 < e.labels.length && t[0].index < e.labels.length && (n = e.labels[t[0].index])), n
                                },
                                label: function(t, e) {
                                    return (e.datasets[t.datasetIndex].label || "") + ": " + t.xLabel
                                }
                            }
                        }
                    }, e.controllers.horizontalBar = e.controllers.bar.extend({
                        getValueScaleId: function() {
                            return this.getMeta().xAxisID
                        },
                        getIndexScaleId: function() {
                            return this.getMeta().yAxisID
                        }
                    })
                }
            }, {}],
            16: [function(t, e, n) {
                "use strict";
                e.exports = function(f) {
                    var p = f.helpers;
                    f.defaults.bubble = {
                        hover: {
                            mode: "single"
                        },
                        scales: {
                            xAxes: [{
                                type: "linear",
                                position: "bottom",
                                id: "x-axis-0"
                            }],
                            yAxes: [{
                                type: "linear",
                                position: "left",
                                id: "y-axis-0"
                            }]
                        },
                        tooltips: {
                            callbacks: {
                                title: function() {
                                    return ""
                                },
                                label: function(t, e) {
                                    var n = e.datasets[t.datasetIndex].label || "",
                                        r = e.datasets[t.datasetIndex].data[t.index];
                                    return n + ": (" + t.xLabel + ", " + t.yLabel + ", " + r.r + ")"
                                }
                            }
                        }
                    }, f.controllers.bubble = f.DatasetController.extend({
                        dataElementType: f.elements.Point,
                        update: function(n) {
                            var r = this,
                                t = r.getMeta().data;
                            p.each(t, function(t, e) {
                                r.updateElement(t, e, n)
                            })
                        },
                        updateElement: function(t, e, n) {
                            var r = this,
                                i = r.getMeta(),
                                o = r.getScaleForId(i.xAxisID),
                                a = r.getScaleForId(i.yAxisID),
                                s = t.custom || {},
                                l = r.getDataset(),
                                u = l.data[e],
                                c = r.chart.options.elements.point,
                                h = r.index;
                            p.extend(t, {
                                _xScale: o,
                                _yScale: a,
                                _datasetIndex: h,
                                _index: e,
                                _model: {
                                    x: n ? o.getPixelForDecimal(.5) : o.getPixelForValue("object" == typeof u ? u : NaN, e, h, r.chart.isCombo),
                                    y: n ? a.getBasePixel() : a.getPixelForValue(u, e, h),
                                    radius: n ? 0 : s.radius ? s.radius : r.getRadius(u),
                                    hitRadius: s.hitRadius ? s.hitRadius : p.getValueAtIndexOrDefault(l.hitRadius, e, c.hitRadius)
                                }
                            }), f.DatasetController.prototype.removeHoverStyle.call(r, t, c);
                            var d = t._model;
                            d.skip = s.skip ? s.skip : isNaN(d.x) || isNaN(d.y), t.pivot()
                        },
                        getRadius: function(t) {
                            return t.r || this.chart.options.elements.point.radius
                        },
                        setHoverStyle: function(t) {
                            f.DatasetController.prototype.setHoverStyle.call(this, t);
                            var e = this.chart.data.datasets[t._datasetIndex],
                                n = t._index,
                                r = t.custom || {};
                            t._model.radius = r.hoverRadius ? r.hoverRadius : p.getValueAtIndexOrDefault(e.hoverRadius, n, this.chart.options.elements.point.hoverRadius) + this.getRadius(e.data[n])
                        },
                        removeHoverStyle: function(t) {
                            f.DatasetController.prototype.removeHoverStyle.call(this, t, this.chart.options.elements.point);
                            var e = this.chart.data.datasets[t._datasetIndex].data[t._index],
                                n = t.custom || {};
                            t._model.radius = n.radius ? n.radius : this.getRadius(e)
                        }
                    })
                }
            }, {}],
            17: [function(t, e, n) {
                "use strict";
                e.exports = function(e) {
                    var P = e.helpers,
                        t = e.defaults;
                    t.doughnut = {
                        animation: {
                            animateRotate: !0,
                            animateScale: !1
                        },
                        aspectRatio: 1,
                        hover: {
                            mode: "single"
                        },
                        legendCallback: function(t) {
                            var e = [];
                            e.push('<ul class="' + t.id + '-legend">');
                            var n = t.data,
                                r = n.datasets,
                                i = n.labels;
                            if (r.length)
                                for (var o = 0; o < r[0].data.length; ++o) e.push('<li><span style="background-color:' + r[0].backgroundColor[o] + '"></span>'), i[o] && e.push(i[o]), e.push("</li>");
                            return e.push("</ul>"), e.join("")
                        },
                        legend: {
                            labels: {
                                generateLabels: function(l) {
                                    var u = l.data;
                                    return u.labels.length && u.datasets.length ? u.labels.map(function(t, e) {
                                        var n = l.getDatasetMeta(0),
                                            r = u.datasets[0],
                                            i = n.data[e],
                                            o = i && i.custom || {},
                                            a = P.getValueAtIndexOrDefault,
                                            s = l.options.elements.arc;
                                        return {
                                            text: t,
                                            fillStyle: o.backgroundColor ? o.backgroundColor : a(r.backgroundColor, e, s.backgroundColor),
                                            strokeStyle: o.borderColor ? o.borderColor : a(r.borderColor, e, s.borderColor),
                                            lineWidth: o.borderWidth ? o.borderWidth : a(r.borderWidth, e, s.borderWidth),
                                            hidden: isNaN(r.data[e]) || n.data[e].hidden,
                                            index: e
                                        }
                                    }) : []
                                }
                            },
                            onClick: function(t, e) {
                                var n, r, i, o = e.index,
                                    a = this.chart;
                                for (n = 0, r = (a.data.datasets || []).length; n < r; ++n)(i = a.getDatasetMeta(n)).data[o] && (i.data[o].hidden = !i.data[o].hidden);
                                a.update()
                            }
                        },
                        cutoutPercentage: 50,
                        rotation: -.5 * Math.PI,
                        circumference: 2 * Math.PI,
                        tooltips: {
                            callbacks: {
                                title: function() {
                                    return ""
                                },
                                label: function(t, e) {
                                    var n = e.labels[t.index],
                                        r = ": " + e.datasets[t.datasetIndex].data[t.index];
                                    return P.isArray(n) ? (n = n.slice())[0] += r : n += r, n
                                }
                            }
                        }
                    }, t.pie = P.clone(t.doughnut), P.extend(t.pie, {
                        cutoutPercentage: 0
                    }), e.controllers.doughnut = e.controllers.pie = e.DatasetController.extend({
                        dataElementType: e.elements.Arc,
                        linkScales: P.noop,
                        getRingIndex: function(t) {
                            for (var e = 0, n = 0; n < t; ++n) this.chart.isDatasetVisible(n) && ++e;
                            return e
                        },
                        update: function(n) {
                            var r = this,
                                t = r.chart,
                                e = t.chartArea,
                                i = t.options,
                                o = i.elements.arc,
                                a = e.right - e.left - o.borderWidth,
                                s = e.bottom - e.top - o.borderWidth,
                                l = Math.min(a, s),
                                u = {
                                    x: 0,
                                    y: 0
                                },
                                c = r.getMeta(),
                                h = i.cutoutPercentage,
                                d = i.circumference;
                            if (d < 2 * Math.PI) {
                                var f = i.rotation % (2 * Math.PI),
                                    p = (f += 2 * Math.PI * (f >= Math.PI ? -1 : f < -Math.PI ? 1 : 0)) + d,
                                    g = Math.cos(f),
                                    v = Math.sin(f),
                                    m = Math.cos(p),
                                    y = Math.sin(p),
                                    b = f <= 0 && 0 <= p || f <= 2 * Math.PI && 2 * Math.PI <= p,
                                    _ = f <= .5 * Math.PI && .5 * Math.PI <= p || f <= 2.5 * Math.PI && 2.5 * Math.PI <= p,
                                    w = f <= -Math.PI && -Math.PI <= p || f <= Math.PI && Math.PI <= p,
                                    x = f <= .5 * -Math.PI && .5 * -Math.PI <= p || f <= 1.5 * Math.PI && 1.5 * Math.PI <= p,
                                    k = h / 100,
                                    S = w ? -1 : Math.min(g * (g < 0 ? 1 : k), m * (m < 0 ? 1 : k)),
                                    C = x ? -1 : Math.min(v * (v < 0 ? 1 : k), y * (y < 0 ? 1 : k)),
                                    T = b ? 1 : Math.max(g * (0 < g ? 1 : k), m * (0 < m ? 1 : k)),
                                    A = _ ? 1 : Math.max(v * (0 < v ? 1 : k), y * (0 < y ? 1 : k)),
                                    E = .5 * (T - S),
                                    j = .5 * (A - C);
                                l = Math.min(a / E, s / j), u = {
                                    x: -.5 * (T + S),
                                    y: -.5 * (A + C)
                                }
                            }
                            t.borderWidth = r.getMaxBorderWidth(c.data), t.outerRadius = Math.max((l - t.borderWidth) / 2, 0), t.innerRadius = Math.max(h ? t.outerRadius / 100 * h : 0, 0), t.radiusLength = (t.outerRadius - t.innerRadius) / t.getVisibleDatasetCount(), t.offsetX = u.x * t.outerRadius, t.offsetY = u.y * t.outerRadius, c.total = r.calculateTotal(), r.outerRadius = t.outerRadius - t.radiusLength * r.getRingIndex(r.index), r.innerRadius = Math.max(r.outerRadius - t.radiusLength, 0), P.each(c.data, function(t, e) {
                                r.updateElement(t, e, n)
                            })
                        },
                        updateElement: function(t, e, n) {
                            var r = this,
                                i = r.chart,
                                o = i.chartArea,
                                a = i.options,
                                s = a.animation,
                                l = (o.left + o.right) / 2,
                                u = (o.top + o.bottom) / 2,
                                c = a.rotation,
                                h = a.rotation,
                                d = r.getDataset(),
                                f = n && s.animateRotate ? 0 : t.hidden ? 0 : r.calculateCircumference(d.data[e]) * (a.circumference / (2 * Math.PI)),
                                p = n && s.animateScale ? 0 : r.innerRadius,
                                g = n && s.animateScale ? 0 : r.outerRadius,
                                v = P.getValueAtIndexOrDefault;
                            P.extend(t, {
                                _datasetIndex: r.index,
                                _index: e,
                                _model: {
                                    x: l + i.offsetX,
                                    y: u + i.offsetY,
                                    startAngle: c,
                                    endAngle: h,
                                    circumference: f,
                                    outerRadius: g,
                                    innerRadius: p,
                                    label: v(d.label, e, i.data.labels[e])
                                }
                            });
                            var m = t._model;
                            this.removeHoverStyle(t), n && s.animateRotate || (m.startAngle = 0 === e ? a.rotation : r.getMeta().data[e - 1]._model.endAngle, m.endAngle = m.startAngle + m.circumference), t.pivot()
                        },
                        removeHoverStyle: function(t) {
                            e.DatasetController.prototype.removeHoverStyle.call(this, t, this.chart.options.elements.arc)
                        },
                        calculateTotal: function() {
                            var n, r = this.getDataset(),
                                t = this.getMeta(),
                                i = 0;
                            return P.each(t.data, function(t, e) {
                                n = r.data[e], isNaN(n) || t.hidden || (i += Math.abs(n))
                            }), i
                        },
                        calculateCircumference: function(t) {
                            var e = this.getMeta().total;
                            return 0 < e && !isNaN(t) ? 2 * Math.PI * (t / e) : 0
                        },
                        getMaxBorderWidth: function(t) {
                            for (var e, n, r = 0, i = this.index, o = t.length, a = 0; a < o; a++) r = (r = r < (e = t[a]._model ? t[a]._model.borderWidth : 0) ? e : r) < (n = t[a]._chart ? t[a]._chart.config.data.datasets[i].hoverBorderWidth : 0) ? n : r;
                            return r
                        }
                    })
                }
            }, {}],
            18: [function(t, e, n) {
                "use strict";
                e.exports = function(a) {
                    function f(t, e) {
                        return g.getValueOrDefault(t.showLine, e.showLines)
                    }
                    var g = a.helpers;
                    a.defaults.line = {
                        showLines: !0,
                        spanGaps: !1,
                        hover: {
                            mode: "label"
                        },
                        scales: {
                            xAxes: [{
                                type: "category",
                                id: "x-axis-0"
                            }],
                            yAxes: [{
                                type: "linear",
                                id: "y-axis-0"
                            }]
                        }
                    }, a.controllers.line = a.DatasetController.extend({
                        datasetElementType: a.elements.Line,
                        dataElementType: a.elements.Point,
                        update: function(t) {
                            var e, n, r, i = this,
                                o = i.getMeta(),
                                a = o.dataset,
                                s = o.data || [],
                                l = i.chart.options,
                                u = l.elements.line,
                                c = i.getScaleForId(o.yAxisID),
                                h = i.getDataset(),
                                d = f(h, l);
                            for (d && (r = a.custom || {}, void 0 !== h.tension && void 0 === h.lineTension && (h.lineTension = h.tension), a._scale = c, a._datasetIndex = i.index, a._children = s, a._model = {
                                    spanGaps: h.spanGaps ? h.spanGaps : l.spanGaps,
                                    tension: r.tension ? r.tension : g.getValueOrDefault(h.lineTension, u.tension),
                                    backgroundColor: r.backgroundColor ? r.backgroundColor : h.backgroundColor || u.backgroundColor,
                                    borderWidth: r.borderWidth ? r.borderWidth : h.borderWidth || u.borderWidth,
                                    borderColor: r.borderColor ? r.borderColor : h.borderColor || u.borderColor,
                                    borderCapStyle: r.borderCapStyle ? r.borderCapStyle : h.borderCapStyle || u.borderCapStyle,
                                    borderDash: r.borderDash ? r.borderDash : h.borderDash || u.borderDash,
                                    borderDashOffset: r.borderDashOffset ? r.borderDashOffset : h.borderDashOffset || u.borderDashOffset,
                                    borderJoinStyle: r.borderJoinStyle ? r.borderJoinStyle : h.borderJoinStyle || u.borderJoinStyle,
                                    fill: r.fill ? r.fill : void 0 !== h.fill ? h.fill : u.fill,
                                    steppedLine: r.steppedLine ? r.steppedLine : g.getValueOrDefault(h.steppedLine, u.stepped),
                                    cubicInterpolationMode: r.cubicInterpolationMode ? r.cubicInterpolationMode : g.getValueOrDefault(h.cubicInterpolationMode, u.cubicInterpolationMode)
                                }, a.pivot()), e = 0, n = s.length; e < n; ++e) i.updateElement(s[e], e, t);
                            for (d && 0 !== a._model.tension && i.updateBezierControlPoints(), e = 0, n = s.length; e < n; ++e) s[e].pivot()
                        },
                        getPointBackgroundColor: function(t, e) {
                            var n = this.chart.options.elements.point.backgroundColor,
                                r = this.getDataset(),
                                i = t.custom || {};
                            return i.backgroundColor ? n = i.backgroundColor : r.pointBackgroundColor ? n = g.getValueAtIndexOrDefault(r.pointBackgroundColor, e, n) : r.backgroundColor && (n = r.backgroundColor), n
                        },
                        getPointBorderColor: function(t, e) {
                            var n = this.chart.options.elements.point.borderColor,
                                r = this.getDataset(),
                                i = t.custom || {};
                            return i.borderColor ? n = i.borderColor : r.pointBorderColor ? n = g.getValueAtIndexOrDefault(r.pointBorderColor, e, n) : r.borderColor && (n = r.borderColor), n
                        },
                        getPointBorderWidth: function(t, e) {
                            var n = this.chart.options.elements.point.borderWidth,
                                r = this.getDataset(),
                                i = t.custom || {};
                            return isNaN(i.borderWidth) ? isNaN(r.pointBorderWidth) ? isNaN(r.borderWidth) || (n = r.borderWidth) : n = g.getValueAtIndexOrDefault(r.pointBorderWidth, e, n) : n = i.borderWidth, n
                        },
                        updateElement: function(t, e, n) {
                            var r, i, o = this,
                                a = o.getMeta(),
                                s = t.custom || {},
                                l = o.getDataset(),
                                u = o.index,
                                c = l.data[e],
                                h = o.getScaleForId(a.yAxisID),
                                d = o.getScaleForId(a.xAxisID),
                                f = o.chart.options.elements.point,
                                p = 1 === (o.chart.data.labels || []).length || 1 === l.data.length || o.chart.isCombo;
                            void 0 !== l.radius && void 0 === l.pointRadius && (l.pointRadius = l.radius), void 0 !== l.hitRadius && void 0 === l.pointHitRadius && (l.pointHitRadius = l.hitRadius), r = d.getPixelForValue("object" == typeof c ? c : NaN, e, u, p), i = n ? h.getBasePixel() : o.calculatePointY(c, e, u), t._xScale = d, t._yScale = h, t._datasetIndex = u, t._index = e, t._model = {
                                x: r,
                                y: i,
                                skip: s.skip || isNaN(r) || isNaN(i),
                                radius: s.radius || g.getValueAtIndexOrDefault(l.pointRadius, e, f.radius),
                                pointStyle: s.pointStyle || g.getValueAtIndexOrDefault(l.pointStyle, e, f.pointStyle),
                                backgroundColor: o.getPointBackgroundColor(t, e),
                                borderColor: o.getPointBorderColor(t, e),
                                borderWidth: o.getPointBorderWidth(t, e),
                                tension: a.dataset._model ? a.dataset._model.tension : 0,
                                steppedLine: !!a.dataset._model && a.dataset._model.steppedLine,
                                hitRadius: s.hitRadius || g.getValueAtIndexOrDefault(l.pointHitRadius, e, f.hitRadius)
                            }
                        },
                        calculatePointY: function(t, e, n) {
                            var r, i, o, a = this.chart,
                                s = this.getMeta(),
                                l = this.getScaleForId(s.yAxisID),
                                u = 0,
                                c = 0;
                            if (l.options.stacked) {
                                for (r = 0; r < n; r++)
                                    if (i = a.data.datasets[r], "line" === (o = a.getDatasetMeta(r)).type && o.yAxisID === l.id && a.isDatasetVisible(r)) {
                                        var h = Number(l.getRightValue(i.data[e]));
                                        h < 0 ? c += h || 0 : u += h || 0
                                    }
                                var d = Number(l.getRightValue(t));
                                return d < 0 ? l.getPixelForValue(c + d) : l.getPixelForValue(u + d)
                            }
                            return l.getPixelForValue(t)
                        },
                        updateBezierControlPoints: function() {
                            function t(t, e, n) {
                                return Math.max(Math.min(t, n), e)
                            }
                            var e, n, r, i, o = this.getMeta(),
                                a = this.chart.chartArea,
                                s = o.data || [];
                            if (o.dataset._model.spanGaps && (s = s.filter(function(t) {
                                    return !t._model.skip
                                })), "monotone" === o.dataset._model.cubicInterpolationMode) g.splineCurveMonotone(s);
                            else
                                for (e = 0, n = s.length; e < n; ++e) r = s[e]._model, i = g.splineCurve(g.previousItem(s, e)._model, r, g.nextItem(s, e)._model, o.dataset._model.tension), r.controlPointPreviousX = i.previous.x, r.controlPointPreviousY = i.previous.y, r.controlPointNextX = i.next.x, r.controlPointNextY = i.next.y;
                            if (this.chart.options.elements.line.capBezierPoints)
                                for (e = 0, n = s.length; e < n; ++e)(r = s[e]._model).controlPointPreviousX = t(r.controlPointPreviousX, a.left, a.right), r.controlPointPreviousY = t(r.controlPointPreviousY, a.top, a.bottom), r.controlPointNextX = t(r.controlPointNextX, a.left, a.right), r.controlPointNextY = t(r.controlPointNextY, a.top, a.bottom)
                        },
                        draw: function() {
                            var t = this.chart,
                                e = this.getMeta(),
                                n = e.data || [],
                                r = t.chartArea,
                                i = n.length,
                                o = 0;
                            for (a.canvasHelpers.clipArea(t.ctx, r), f(this.getDataset(), t.options) && e.dataset.draw(), a.canvasHelpers.unclipArea(t.ctx); o < i; ++o) n[o].draw(r)
                        },
                        setHoverStyle: function(t) {
                            var e = this.chart.data.datasets[t._datasetIndex],
                                n = t._index,
                                r = t.custom || {},
                                i = t._model;
                            i.radius = r.hoverRadius || g.getValueAtIndexOrDefault(e.pointHoverRadius, n, this.chart.options.elements.point.hoverRadius), i.backgroundColor = r.hoverBackgroundColor || g.getValueAtIndexOrDefault(e.pointHoverBackgroundColor, n, g.getHoverColor(i.backgroundColor)), i.borderColor = r.hoverBorderColor || g.getValueAtIndexOrDefault(e.pointHoverBorderColor, n, g.getHoverColor(i.borderColor)), i.borderWidth = r.hoverBorderWidth || g.getValueAtIndexOrDefault(e.pointHoverBorderWidth, n, i.borderWidth)
                        },
                        removeHoverStyle: function(t) {
                            var e = this,
                                n = e.chart.data.datasets[t._datasetIndex],
                                r = t._index,
                                i = t.custom || {},
                                o = t._model;
                            void 0 !== n.radius && void 0 === n.pointRadius && (n.pointRadius = n.radius), o.radius = i.radius || g.getValueAtIndexOrDefault(n.pointRadius, r, e.chart.options.elements.point.radius), o.backgroundColor = e.getPointBackgroundColor(t, r), o.borderColor = e.getPointBorderColor(t, r), o.borderWidth = e.getPointBorderWidth(t, r)
                        }
                    })
                }
            }, {}],
            19: [function(t, e, n) {
                "use strict";
                e.exports = function(e) {
                    var x = e.helpers;
                    e.defaults.polarArea = {
                        scale: {
                            type: "radialLinear",
                            angleLines: {
                                display: !1
                            },
                            gridLines: {
                                circular: !0
                            },
                            pointLabels: {
                                display: !1
                            },
                            ticks: {
                                beginAtZero: !0
                            }
                        },
                        animation: {
                            animateRotate: !0,
                            animateScale: !0
                        },
                        startAngle: -.5 * Math.PI,
                        aspectRatio: 1,
                        legendCallback: function(t) {
                            var e = [];
                            e.push('<ul class="' + t.id + '-legend">');
                            var n = t.data,
                                r = n.datasets,
                                i = n.labels;
                            if (r.length)
                                for (var o = 0; o < r[0].data.length; ++o) e.push('<li><span style="background-color:' + r[0].backgroundColor[o] + '"></span>'), i[o] && e.push(i[o]), e.push("</li>");
                            return e.push("</ul>"), e.join("")
                        },
                        legend: {
                            labels: {
                                generateLabels: function(s) {
                                    var l = s.data;
                                    return l.labels.length && l.datasets.length ? l.labels.map(function(t, e) {
                                        var n = s.getDatasetMeta(0),
                                            r = l.datasets[0],
                                            i = n.data[e].custom || {},
                                            o = x.getValueAtIndexOrDefault,
                                            a = s.options.elements.arc;
                                        return {
                                            text: t,
                                            fillStyle: i.backgroundColor ? i.backgroundColor : o(r.backgroundColor, e, a.backgroundColor),
                                            strokeStyle: i.borderColor ? i.borderColor : o(r.borderColor, e, a.borderColor),
                                            lineWidth: i.borderWidth ? i.borderWidth : o(r.borderWidth, e, a.borderWidth),
                                            hidden: isNaN(r.data[e]) || n.data[e].hidden,
                                            index: e
                                        }
                                    }) : []
                                }
                            },
                            onClick: function(t, e) {
                                var n, r, i, o = e.index,
                                    a = this.chart;
                                for (n = 0, r = (a.data.datasets || []).length; n < r; ++n)(i = a.getDatasetMeta(n)).data[o].hidden = !i.data[o].hidden;
                                a.update()
                            }
                        },
                        tooltips: {
                            callbacks: {
                                title: function() {
                                    return ""
                                },
                                label: function(t, e) {
                                    return e.labels[t.index] + ": " + t.yLabel
                                }
                            }
                        }
                    }, e.controllers.polarArea = e.DatasetController.extend({
                        dataElementType: e.elements.Arc,
                        linkScales: x.noop,
                        update: function(n) {
                            var r = this,
                                t = r.chart,
                                e = t.chartArea,
                                i = r.getMeta(),
                                o = t.options,
                                a = o.elements.arc,
                                s = Math.min(e.right - e.left, e.bottom - e.top);
                            t.outerRadius = Math.max((s - a.borderWidth / 2) / 2, 0), t.innerRadius = Math.max(o.cutoutPercentage ? t.outerRadius / 100 * o.cutoutPercentage : 1, 0), t.radiusLength = (t.outerRadius - t.innerRadius) / t.getVisibleDatasetCount(), r.outerRadius = t.outerRadius - t.radiusLength * r.index, r.innerRadius = r.outerRadius - t.radiusLength, i.count = r.countVisibleElements(), x.each(i.data, function(t, e) {
                                r.updateElement(t, e, n)
                            })
                        },
                        updateElement: function(t, e, n) {
                            for (var r = this, i = r.chart, o = r.getDataset(), a = i.options, s = a.animation, l = i.scale, u = x.getValueAtIndexOrDefault, c = i.data.labels, h = r.calculateCircumference(o.data[e]), d = l.xCenter, f = l.yCenter, p = 0, g = r.getMeta(), v = 0; v < e; ++v) isNaN(o.data[v]) || g.data[v].hidden || ++p;
                            var m = a.startAngle,
                                y = t.hidden ? 0 : l.getDistanceFromCenterForValue(o.data[e]),
                                b = m + h * p,
                                _ = b + (t.hidden ? 0 : h),
                                w = s.animateScale ? 0 : l.getDistanceFromCenterForValue(o.data[e]);
                            x.extend(t, {
                                _datasetIndex: r.index,
                                _index: e,
                                _scale: l,
                                _model: {
                                    x: d,
                                    y: f,
                                    innerRadius: 0,
                                    outerRadius: n ? w : y,
                                    startAngle: n && s.animateRotate ? m : b,
                                    endAngle: n && s.animateRotate ? m : _,
                                    label: u(c, e, c[e])
                                }
                            }), r.removeHoverStyle(t), t.pivot()
                        },
                        removeHoverStyle: function(t) {
                            e.DatasetController.prototype.removeHoverStyle.call(this, t, this.chart.options.elements.arc)
                        },
                        countVisibleElements: function() {
                            var n = this.getDataset(),
                                t = this.getMeta(),
                                r = 0;
                            return x.each(t.data, function(t, e) {
                                isNaN(n.data[e]) || t.hidden || r++
                            }), r
                        },
                        calculateCircumference: function(t) {
                            var e = this.getMeta().count;
                            return 0 < e && !isNaN(t) ? 2 * Math.PI / e : 0
                        }
                    })
                }
            }, {}],
            20: [function(t, e, n) {
                "use strict";
                e.exports = function(t) {
                    var u = t.helpers;
                    t.defaults.radar = {
                        aspectRatio: 1,
                        scale: {
                            type: "radialLinear"
                        },
                        elements: {
                            line: {
                                tension: 0
                            }
                        }
                    }, t.controllers.radar = t.DatasetController.extend({
                        datasetElementType: t.elements.Line,
                        dataElementType: t.elements.Point,
                        linkScales: u.noop,
                        update: function(n) {
                            var r = this,
                                t = r.getMeta(),
                                e = t.dataset,
                                i = t.data,
                                o = e.custom || {},
                                a = r.getDataset(),
                                s = r.chart.options.elements.line,
                                l = r.chart.scale;
                            void 0 !== a.tension && void 0 === a.lineTension && (a.lineTension = a.tension), u.extend(t.dataset, {
                                _datasetIndex: r.index,
                                _scale: l,
                                _children: i,
                                _loop: !0,
                                _model: {
                                    tension: o.tension ? o.tension : u.getValueOrDefault(a.lineTension, s.tension),
                                    backgroundColor: o.backgroundColor ? o.backgroundColor : a.backgroundColor || s.backgroundColor,
                                    borderWidth: o.borderWidth ? o.borderWidth : a.borderWidth || s.borderWidth,
                                    borderColor: o.borderColor ? o.borderColor : a.borderColor || s.borderColor,
                                    fill: o.fill ? o.fill : void 0 !== a.fill ? a.fill : s.fill,
                                    borderCapStyle: o.borderCapStyle ? o.borderCapStyle : a.borderCapStyle || s.borderCapStyle,
                                    borderDash: o.borderDash ? o.borderDash : a.borderDash || s.borderDash,
                                    borderDashOffset: o.borderDashOffset ? o.borderDashOffset : a.borderDashOffset || s.borderDashOffset,
                                    borderJoinStyle: o.borderJoinStyle ? o.borderJoinStyle : a.borderJoinStyle || s.borderJoinStyle
                                }
                            }), t.dataset.pivot(), u.each(i, function(t, e) {
                                r.updateElement(t, e, n)
                            }, r), r.updateBezierControlPoints()
                        },
                        updateElement: function(t, e, n) {
                            var r = this,
                                i = t.custom || {},
                                o = r.getDataset(),
                                a = r.chart.scale,
                                s = r.chart.options.elements.point,
                                l = a.getPointPositionForValue(e, o.data[e]);
                            void 0 !== o.radius && void 0 === o.pointRadius && (o.pointRadius = o.radius), void 0 !== o.hitRadius && void 0 === o.pointHitRadius && (o.pointHitRadius = o.hitRadius), u.extend(t, {
                                _datasetIndex: r.index,
                                _index: e,
                                _scale: a,
                                _model: {
                                    x: n ? a.xCenter : l.x,
                                    y: n ? a.yCenter : l.y,
                                    tension: i.tension ? i.tension : u.getValueOrDefault(o.lineTension, r.chart.options.elements.line.tension),
                                    radius: i.radius ? i.radius : u.getValueAtIndexOrDefault(o.pointRadius, e, s.radius),
                                    backgroundColor: i.backgroundColor ? i.backgroundColor : u.getValueAtIndexOrDefault(o.pointBackgroundColor, e, s.backgroundColor),
                                    borderColor: i.borderColor ? i.borderColor : u.getValueAtIndexOrDefault(o.pointBorderColor, e, s.borderColor),
                                    borderWidth: i.borderWidth ? i.borderWidth : u.getValueAtIndexOrDefault(o.pointBorderWidth, e, s.borderWidth),
                                    pointStyle: i.pointStyle ? i.pointStyle : u.getValueAtIndexOrDefault(o.pointStyle, e, s.pointStyle),
                                    hitRadius: i.hitRadius ? i.hitRadius : u.getValueAtIndexOrDefault(o.pointHitRadius, e, s.hitRadius)
                                }
                            }), t._model.skip = i.skip ? i.skip : isNaN(t._model.x) || isNaN(t._model.y)
                        },
                        updateBezierControlPoints: function() {
                            var i = this.chart.chartArea,
                                o = this.getMeta();
                            u.each(o.data, function(t, e) {
                                var n = t._model,
                                    r = u.splineCurve(u.previousItem(o.data, e, !0)._model, n, u.nextItem(o.data, e, !0)._model, n.tension);
                                n.controlPointPreviousX = Math.max(Math.min(r.previous.x, i.right), i.left), n.controlPointPreviousY = Math.max(Math.min(r.previous.y, i.bottom), i.top), n.controlPointNextX = Math.max(Math.min(r.next.x, i.right), i.left), n.controlPointNextY = Math.max(Math.min(r.next.y, i.bottom), i.top), t.pivot()
                            })
                        },
                        setHoverStyle: function(t) {
                            var e = this.chart.data.datasets[t._datasetIndex],
                                n = t.custom || {},
                                r = t._index,
                                i = t._model;
                            i.radius = n.hoverRadius ? n.hoverRadius : u.getValueAtIndexOrDefault(e.pointHoverRadius, r, this.chart.options.elements.point.hoverRadius), i.backgroundColor = n.hoverBackgroundColor ? n.hoverBackgroundColor : u.getValueAtIndexOrDefault(e.pointHoverBackgroundColor, r, u.getHoverColor(i.backgroundColor)), i.borderColor = n.hoverBorderColor ? n.hoverBorderColor : u.getValueAtIndexOrDefault(e.pointHoverBorderColor, r, u.getHoverColor(i.borderColor)), i.borderWidth = n.hoverBorderWidth ? n.hoverBorderWidth : u.getValueAtIndexOrDefault(e.pointHoverBorderWidth, r, i.borderWidth)
                        },
                        removeHoverStyle: function(t) {
                            var e = this.chart.data.datasets[t._datasetIndex],
                                n = t.custom || {},
                                r = t._index,
                                i = t._model,
                                o = this.chart.options.elements.point;
                            i.radius = n.radius ? n.radius : u.getValueAtIndexOrDefault(e.pointRadius, r, o.radius), i.backgroundColor = n.backgroundColor ? n.backgroundColor : u.getValueAtIndexOrDefault(e.pointBackgroundColor, r, o.backgroundColor), i.borderColor = n.borderColor ? n.borderColor : u.getValueAtIndexOrDefault(e.pointBorderColor, r, o.borderColor), i.borderWidth = n.borderWidth ? n.borderWidth : u.getValueAtIndexOrDefault(e.pointBorderWidth, r, o.borderWidth)
                        }
                    })
                }
            }, {}],
            21: [function(t, e, n) {
                "use strict";
                e.exports = function(t) {
                    var o = t.helpers;
                    t.defaults.global.animation = {
                        duration: 1e3,
                        easing: "easeOutQuart",
                        onProgress: o.noop,
                        onComplete: o.noop
                    }, t.Animation = t.Element.extend({
                        chart: null,
                        currentStep: 0,
                        numSteps: 60,
                        easing: "",
                        render: null,
                        onAnimationProgress: null,
                        onAnimationComplete: null
                    }), t.animationService = {
                        frameDuration: 17,
                        animations: [],
                        dropFrames: 0,
                        request: null,
                        addAnimation: function(t, e, n, r) {
                            var i, o, a = this.animations;
                            for (e.chart = t, r || (t.animating = !0), i = 0, o = a.length; i < o; ++i)
                                if (a[i].chart === t) return void(a[i] = e);
                            a.push(e), 1 === a.length && this.requestAnimationFrame()
                        },
                        cancelAnimation: function(e) {
                            var t = o.findIndex(this.animations, function(t) {
                                return t.chart === e
                            }); - 1 !== t && (this.animations.splice(t, 1), e.animating = !1)
                        },
                        requestAnimationFrame: function() {
                            var t = this;
                            null === t.request && (t.request = o.requestAnimFrame.call(window, function() {
                                t.request = null, t.startDigest()
                            }))
                        },
                        startDigest: function() {
                            var t = this,
                                e = Date.now(),
                                n = 0;
                            1 < t.dropFrames && (n = Math.floor(t.dropFrames), t.dropFrames = t.dropFrames % 1), t.advance(1 + n);
                            var r = Date.now();
                            t.dropFrames += (r - e) / t.frameDuration, 0 < t.animations.length && t.requestAnimationFrame()
                        },
                        advance: function(t) {
                            for (var e, n, r = this.animations, i = 0; i < r.length;) n = (e = r[i]).chart, e.currentStep = (e.currentStep || 0) + t, e.currentStep = Math.min(e.currentStep, e.numSteps), o.callback(e.render, [n, e], n), o.callback(e.onAnimationProgress, [e], n), e.currentStep >= e.numSteps ? (o.callback(e.onAnimationComplete, [e], n), n.animating = !1, r.splice(i, 1)) : ++i
                        }
                    }, Object.defineProperty(t.Animation.prototype, "animationObject", {
                        get: function() {
                            return this
                        }
                    }), Object.defineProperty(t.Animation.prototype, "chartInstance", {
                        get: function() {
                            return this.chart
                        },
                        set: function(t) {
                            this.chart = t
                        }
                    })
                }
            }, {}],
            22: [function(t, e, n) {
                "use strict";
                e.exports = function(g) {
                    var t = g.canvasHelpers = {};
                    t.drawPoint = function(t, e, n, r, i) {
                        var o, a, s, l, u, c;
                        if ("object" != typeof e || "[object HTMLImageElement]" !== (o = e.toString()) && "[object HTMLCanvasElement]" !== o) {
                            if (!(isNaN(n) || n <= 0)) {
                                switch (e) {
                                    default: t.beginPath(),
                                    t.arc(r, i, n, 0, 2 * Math.PI),
                                    t.closePath(),
                                    t.fill();
                                    break;
                                    case "triangle":
                                            t.beginPath(),
                                        u = (a = 3 * n / Math.sqrt(3)) * Math.sqrt(3) / 2,
                                        t.moveTo(r - a / 2, i + u / 3),
                                        t.lineTo(r + a / 2, i + u / 3),
                                        t.lineTo(r, i - 2 * u / 3),
                                        t.closePath(),
                                        t.fill();
                                        break;
                                    case "rect":
                                            c = 1 / Math.SQRT2 * n,
                                        t.beginPath(),
                                        t.fillRect(r - c, i - c, 2 * c, 2 * c),
                                        t.strokeRect(r - c, i - c, 2 * c, 2 * c);
                                        break;
                                    case "rectRounded":
                                            var h = n / Math.SQRT2,
                                            d = r - h,
                                            f = i - h,
                                            p = Math.SQRT2 * n;g.helpers.drawRoundedRectangle(t, d, f, p, p, n / 2),
                                        t.fill();
                                        break;
                                    case "rectRot":
                                            c = 1 / Math.SQRT2 * n,
                                        t.beginPath(),
                                        t.moveTo(r - c, i),
                                        t.lineTo(r, i + c),
                                        t.lineTo(r + c, i),
                                        t.lineTo(r, i - c),
                                        t.closePath(),
                                        t.fill();
                                        break;
                                    case "cross":
                                            t.beginPath(),
                                        t.moveTo(r, i + n),
                                        t.lineTo(r, i - n),
                                        t.moveTo(r - n, i),
                                        t.lineTo(r + n, i),
                                        t.closePath();
                                        break;
                                    case "crossRot":
                                            t.beginPath(),
                                        s = Math.cos(Math.PI / 4) * n,
                                        l = Math.sin(Math.PI / 4) * n,
                                        t.moveTo(r - s, i - l),
                                        t.lineTo(r + s, i + l),
                                        t.moveTo(r - s, i + l),
                                        t.lineTo(r + s, i - l),
                                        t.closePath();
                                        break;
                                    case "star":
                                            t.beginPath(),
                                        t.moveTo(r, i + n),
                                        t.lineTo(r, i - n),
                                        t.moveTo(r - n, i),
                                        t.lineTo(r + n, i),
                                        s = Math.cos(Math.PI / 4) * n,
                                        l = Math.sin(Math.PI / 4) * n,
                                        t.moveTo(r - s, i - l),
                                        t.lineTo(r + s, i + l),
                                        t.moveTo(r - s, i + l),
                                        t.lineTo(r + s, i - l),
                                        t.closePath();
                                        break;
                                    case "line":
                                            t.beginPath(),
                                        t.moveTo(r - n, i),
                                        t.lineTo(r + n, i),
                                        t.closePath();
                                        break;
                                    case "dash":
                                            t.beginPath(),
                                        t.moveTo(r, i),
                                        t.lineTo(r + n, i),
                                        t.closePath()
                                }
                                t.stroke()
                            }
                        } else t.drawImage(e, r - e.width / 2, i - e.height / 2, e.width, e.height)
                    }, t.clipArea = function(t, e) {
                        t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip()
                    }, t.unclipArea = function(t) {
                        t.restore()
                    }, t.lineTo = function(t, e, n, r) {
                        return n.steppedLine ? ("after" === n.steppedLine ? t.lineTo(e.x, n.y) : t.lineTo(n.x, e.y), void t.lineTo(n.x, n.y)) : n.tension ? void t.bezierCurveTo(r ? e.controlPointPreviousX : e.controlPointNextX, r ? e.controlPointPreviousY : e.controlPointNextY, r ? n.controlPointNextX : n.controlPointPreviousX, r ? n.controlPointNextY : n.controlPointPreviousY, n.x, n.y) : void t.lineTo(n.x, n.y)
                    }, g.helpers.canvas = t
                }
            }, {}],
            23: [function(t, e, n) {
                "use strict";
                e.exports = function(u) {
                    function s(t) {
                        return "top" === t || "bottom" === t
                    }
                    var c = u.helpers,
                        l = u.plugins,
                        h = u.platform;
                    u.types = {}, u.instances = {}, u.controllers = {}, c.extend(u.prototype, {
                        construct: function(t, e) {
                            var n, r, i = this;
                            (r = (n = (n = e) || {}).data = n.data || {}).datasets = r.datasets || [], r.labels = r.labels || [], n.options = c.configMerge(u.defaults.global, u.defaults[n.type], n.options || {}), e = n;
                            var o = h.acquireContext(t, e),
                                a = o && o.canvas,
                                s = a && a.height,
                                l = a && a.width;
                            return i.id = c.uid(), i.ctx = o, i.canvas = a, i.config = e, i.width = l, i.height = s, i.aspectRatio = s ? l / s : null, i.options = e.options, i._bufferedRender = !1, (i.chart = i).controller = i, u.instances[i.id] = i, Object.defineProperty(i, "data", {
                                get: function() {
                                    return i.config.data
                                },
                                set: function(t) {
                                    i.config.data = t
                                }
                            }), o && a ? (i.initialize(), void i.update()) : void console.error("Failed to create chart: can't acquire context from the given item")
                        },
                        initialize: function() {
                            var t = this;
                            return l.notify(t, "beforeInit"), c.retinaScale(t), t.bindEvents(), t.options.responsive && t.resize(!0), t.ensureScalesHaveIDs(), t.buildScales(), t.initToolTip(), l.notify(t, "afterInit"), t
                        },
                        clear: function() {
                            return c.clear(this), this
                        },
                        stop: function() {
                            return u.animationService.cancelAnimation(this), this
                        },
                        resize: function(t) {
                            var e = this,
                                n = e.options,
                                r = e.canvas,
                                i = n.maintainAspectRatio && e.aspectRatio || null,
                                o = Math.floor(c.getMaximumWidth(r)),
                                a = Math.floor(i ? o / i : c.getMaximumHeight(r));
                            if ((e.width !== o || e.height !== a) && (r.width = e.width = o, r.height = e.height = a, r.style.width = o + "px", r.style.height = a + "px", c.retinaScale(e), !t)) {
                                var s = {
                                    width: o,
                                    height: a
                                };
                                l.notify(e, "resize", [s]), e.options.onResize && e.options.onResize(e, s), e.stop(), e.update(e.options.responsiveAnimationDuration)
                            }
                        },
                        ensureScalesHaveIDs: function() {
                            var t = this.options,
                                e = t.scales || {},
                                n = t.scale;
                            c.each(e.xAxes, function(t, e) {
                                t.id = t.id || "x-axis-" + e
                            }), c.each(e.yAxes, function(t, e) {
                                t.id = t.id || "y-axis-" + e
                            }), n && (n.id = n.id || "scale")
                        },
                        buildScales: function() {
                            var o = this,
                                t = o.options,
                                a = o.scales = {},
                                e = [];
                            t.scales && (e = e.concat((t.scales.xAxes || []).map(function(t) {
                                return {
                                    options: t,
                                    dtype: "category",
                                    dposition: "bottom"
                                }
                            }), (t.scales.yAxes || []).map(function(t) {
                                return {
                                    options: t,
                                    dtype: "linear",
                                    dposition: "left"
                                }
                            }))), t.scale && e.push({
                                options: t.scale,
                                dtype: "radialLinear",
                                isDefault: !0,
                                dposition: "chartArea"
                            }), c.each(e, function(t) {
                                var e = t.options,
                                    n = c.getValueOrDefault(e.type, t.dtype),
                                    r = u.scaleService.getScaleConstructor(n);
                                if (r) {
                                    s(e.position) !== s(t.dposition) && (e.position = t.dposition);
                                    var i = new r({
                                        id: e.id,
                                        options: e,
                                        ctx: o.ctx,
                                        chart: o
                                    });
                                    a[i.id] = i, t.isDefault && (o.scale = i)
                                }
                            }), u.scaleService.addScalesToLayout(this)
                        },
                        buildOrUpdateControllers: function() {
                            var i = this,
                                o = [],
                                a = [];
                            if (c.each(i.data.datasets, function(t, e) {
                                    var n = i.getDatasetMeta(e);
                                    if (n.type || (n.type = t.type || i.config.type), o.push(n.type), n.controller) n.controller.updateIndex(e);
                                    else {
                                        var r = u.controllers[n.type];
                                        if (void 0 === r) throw new Error('"' + n.type + '" is not a chart type.');
                                        n.controller = new r(i, e), a.push(n.controller)
                                    }
                                }, i), 1 < o.length)
                                for (var t = 1; t < o.length; t++)
                                    if (o[t] !== o[t - 1]) {
                                        i.isCombo = !0;
                                        break
                                    }
                            return a
                        },
                        resetElements: function() {
                            var n = this;
                            c.each(n.data.datasets, function(t, e) {
                                n.getDatasetMeta(e).controller.reset()
                            }, n)
                        },
                        reset: function() {
                            this.resetElements(), this.tooltip.initialize()
                        },
                        update: function(t, e) {
                            var n, r, i = this;
                            if ((r = (n = i).options).scale ? n.scale.options = r.scale : r.scales && r.scales.xAxes.concat(r.scales.yAxes).forEach(function(t) {
                                    n.scales[t.id].options = t
                                }), n.tooltip._options = r.tooltips, !1 !== l.notify(i, "beforeUpdate")) {
                                i.tooltip._data = i.data;
                                var o = i.buildOrUpdateControllers();
                                c.each(i.data.datasets, function(t, e) {
                                    i.getDatasetMeta(e).controller.buildOrUpdateElements()
                                }, i), i.updateLayout(), c.each(o, function(t) {
                                    t.reset()
                                }), i.updateDatasets(), l.notify(i, "afterUpdate"), i._bufferedRender ? i._bufferedRequest = {
                                    lazy: e,
                                    duration: t
                                } : i.render(t, e)
                            }
                        },
                        updateLayout: function() {
                            !1 !== l.notify(this, "beforeLayout") && (u.layoutService.update(this, this.width, this.height), l.notify(this, "afterScaleUpdate"), l.notify(this, "afterLayout"))
                        },
                        updateDatasets: function() {
                            if (!1 !== l.notify(this, "beforeDatasetsUpdate")) {
                                for (var t = 0, e = this.data.datasets.length; t < e; ++t) this.updateDataset(t);
                                l.notify(this, "afterDatasetsUpdate")
                            }
                        },
                        updateDataset: function(t) {
                            var e = this.getDatasetMeta(t),
                                n = {
                                    meta: e,
                                    index: t
                                };
                            !1 !== l.notify(this, "beforeDatasetUpdate", [n]) && (e.controller.update(), l.notify(this, "afterDatasetUpdate", [n]))
                        },
                        render: function(t, e) {
                            var n = this;
                            if (!1 !== l.notify(n, "beforeRender")) {
                                var r = n.options.animation,
                                    i = function(t) {
                                        l.notify(n, "afterRender"), c.callback(r && r.onComplete, [t], n)
                                    };
                                if (r && (void 0 !== t && 0 !== t || void 0 === t && 0 !== r.duration)) {
                                    var o = new u.Animation({
                                        numSteps: (t || r.duration) / 16.66,
                                        easing: r.easing,
                                        render: function(t, e) {
                                            var n = c.easingEffects[e.easing],
                                                r = e.currentStep,
                                                i = r / e.numSteps;
                                            t.draw(n(i), i, r)
                                        },
                                        onAnimationProgress: r.onProgress,
                                        onAnimationComplete: i
                                    });
                                    u.animationService.addAnimation(n, o, t, e)
                                } else n.draw(), i(new u.Animation({
                                    numSteps: 0,
                                    chart: n
                                }));
                                return n
                            }
                        },
                        draw: function(t) {
                            var e = this;
                            e.clear(), null != t || (t = 1), e.transition(t), !1 !== l.notify(e, "beforeDraw", [t]) && (c.each(e.boxes, function(t) {
                                t.draw(e.chartArea)
                            }, e), e.scale && e.scale.draw(), e.drawDatasets(t), e.tooltip.draw(), l.notify(e, "afterDraw", [t]))
                        },
                        transition: function(t) {
                            for (var e = 0, n = (this.data.datasets || []).length; e < n; ++e) this.isDatasetVisible(e) && this.getDatasetMeta(e).controller.transition(t);
                            this.tooltip.transition(t)
                        },
                        drawDatasets: function(t) {
                            var e = this;
                            if (!1 !== l.notify(e, "beforeDatasetsDraw", [t])) {
                                for (var n = (e.data.datasets || []).length - 1; 0 <= n; --n) e.isDatasetVisible(n) && e.drawDataset(n, t);
                                l.notify(e, "afterDatasetsDraw", [t])
                            }
                        },
                        drawDataset: function(t, e) {
                            var n = this.getDatasetMeta(t),
                                r = {
                                    meta: n,
                                    index: t,
                                    easingValue: e
                                };
                            !1 !== l.notify(this, "beforeDatasetDraw", [r]) && (n.controller.draw(e), l.notify(this, "afterDatasetDraw", [r]))
                        },
                        getElementAtEvent: function(t) {
                            return u.Interaction.modes.single(this, t)
                        },
                        getElementsAtEvent: function(t) {
                            return u.Interaction.modes.label(this, t, {
                                intersect: !0
                            })
                        },
                        getElementsAtXAxis: function(t) {
                            return u.Interaction.modes["x-axis"](this, t, {
                                intersect: !0
                            })
                        },
                        getElementsAtEventForMode: function(t, e, n) {
                            var r = u.Interaction.modes[e];
                            return "function" == typeof r ? r(this, t, n) : []
                        },
                        getDatasetAtEvent: function(t) {
                            return u.Interaction.modes.dataset(this, t, {
                                intersect: !0
                            })
                        },
                        getDatasetMeta: function(t) {
                            var e = this.data.datasets[t];
                            e._meta || (e._meta = {});
                            var n = e._meta[this.id];
                            return n || (n = e._meta[this.id] = {
                                type: null,
                                data: [],
                                dataset: null,
                                controller: null,
                                hidden: null,
                                xAxisID: null,
                                yAxisID: null
                            }), n
                        },
                        getVisibleDatasetCount: function() {
                            for (var t = 0, e = 0, n = this.data.datasets.length; e < n; ++e) this.isDatasetVisible(e) && t++;
                            return t
                        },
                        isDatasetVisible: function(t) {
                            var e = this.getDatasetMeta(t);
                            return "boolean" == typeof e.hidden ? !e.hidden : !this.data.datasets[t].hidden
                        },
                        generateLegend: function() {
                            return this.options.legendCallback(this)
                        },
                        destroy: function() {
                            var t, e, n, r = this,
                                i = r.canvas;
                            for (r.stop(), e = 0, n = r.data.datasets.length; e < n; ++e)(t = r.getDatasetMeta(e)).controller && (t.controller.destroy(), t.controller = null);
                            i && (r.unbindEvents(), c.clear(r), h.releaseContext(r.ctx), r.canvas = null, r.ctx = null), l.notify(r, "destroy"), delete u.instances[r.id]
                        },
                        toBase64Image: function() {
                            return this.canvas.toDataURL.apply(this.canvas, arguments)
                        },
                        initToolTip: function() {
                            var t = this;
                            t.tooltip = new u.Tooltip({
                                _chart: t,
                                _chartInstance: t,
                                _data: t.data,
                                _options: t.options.tooltips
                            }, t), t.tooltip.initialize()
                        },
                        bindEvents: function() {
                            var e = this,
                                n = e._listeners = {},
                                r = function() {
                                    e.eventHandler.apply(e, arguments)
                                };
                            c.each(e.options.events, function(t) {
                                h.addEventListener(e, t, r), n[t] = r
                            }), e.options.responsive && (r = function() {
                                e.resize()
                            }, h.addEventListener(e, "resize", r), n.resize = r)
                        },
                        unbindEvents: function() {
                            var n = this,
                                t = n._listeners;
                            t && (delete n._listeners, c.each(t, function(t, e) {
                                h.removeEventListener(n, e, t)
                            }))
                        },
                        updateHoverStyle: function(t, e, n) {
                            var r, i, o, a = n ? "setHoverStyle" : "removeHoverStyle";
                            for (i = 0, o = t.length; i < o; ++i)(r = t[i]) && this.getDatasetMeta(r._datasetIndex).controller[a](r)
                        },
                        eventHandler: function(t) {
                            var e = this,
                                n = e.tooltip;
                            if (!1 !== l.notify(e, "beforeEvent", [t])) {
                                e._bufferedRender = !0, e._bufferedRequest = null;
                                var r = e.handleEvent(t);
                                r |= n && n.handleEvent(t), l.notify(e, "afterEvent", [t]);
                                var i = e._bufferedRequest;
                                return i ? e.render(i.duration, i.lazy) : r && !e.animating && (e.stop(), e.render(e.options.hover.animationDuration, !0)), e._bufferedRender = !1, e._bufferedRequest = null, e
                            }
                        },
                        handleEvent: function(t) {
                            var e, n = this,
                                r = n.options || {},
                                i = r.hover;
                            return n.lastActive = n.lastActive || [], "mouseout" === t.type ? n.active = [] : n.active = n.getElementsAtEventForMode(t, i.mode, i), i.onHover && i.onHover.call(n, t.native, n.active), "mouseup" !== t.type && "click" !== t.type || r.onClick && r.onClick.call(n, t.native, n.active), n.lastActive.length && n.updateHoverStyle(n.lastActive, i.mode, !1), n.active.length && i.mode && n.updateHoverStyle(n.active, i.mode, !0), e = !c.arrayEquals(n.active, n.lastActive), n.lastActive = n.active, e
                        }
                    }), u.Controller = u
                }
            }, {}],
            24: [function(t, e, n) {
                "use strict";
                e.exports = function(t) {
                    function o(e, t) {
                        var n = e._chartjs;
                        if (n) {
                            var r = n.listeners,
                                i = r.indexOf(t); - 1 !== i && r.splice(i, 1), 0 < r.length || (a.forEach(function(t) {
                                delete e[t]
                            }), delete e._chartjs)
                        }
                    }
                    var s = t.helpers,
                        a = ["push", "pop", "shift", "splice", "unshift"];
                    t.DatasetController = function(t, e) {
                        this.initialize(t, e)
                    }, s.extend(t.DatasetController.prototype, {
                        datasetElementType: null,
                        dataElementType: null,
                        initialize: function(t, e) {
                            this.chart = t, this.index = e, this.linkScales(), this.addElements()
                        },
                        updateIndex: function(t) {
                            this.index = t
                        },
                        linkScales: function() {
                            var t = this.getMeta(),
                                e = this.getDataset();
                            null === t.xAxisID && (t.xAxisID = e.xAxisID || this.chart.options.scales.xAxes[0].id), null === t.yAxisID && (t.yAxisID = e.yAxisID || this.chart.options.scales.yAxes[0].id)
                        },
                        getDataset: function() {
                            return this.chart.data.datasets[this.index]
                        },
                        getMeta: function() {
                            return this.chart.getDatasetMeta(this.index)
                        },
                        getScaleForId: function(t) {
                            return this.chart.scales[t]
                        },
                        reset: function() {
                            this.update(!0)
                        },
                        destroy: function() {
                            this._data && o(this._data, this)
                        },
                        createMetaDataset: function() {
                            var t = this.datasetElementType;
                            return t && new t({
                                _chart: this.chart,
                                _datasetIndex: this.index
                            })
                        },
                        createMetaData: function(t) {
                            var e = this.dataElementType;
                            return e && new e({
                                _chart: this.chart,
                                _datasetIndex: this.index,
                                _index: t
                            })
                        },
                        addElements: function() {
                            var t, e, n = this.getMeta(),
                                r = this.getDataset().data || [],
                                i = n.data;
                            for (t = 0, e = r.length; t < e; ++t) i[t] = i[t] || this.createMetaData(t);
                            n.dataset = n.dataset || this.createMetaDataset()
                        },
                        addElementAndReset: function(t) {
                            var e = this.createMetaData(t);
                            this.getMeta().data.splice(t, 0, e), this.updateElement(e, t, !0)
                        },
                        buildOrUpdateElements: function() {
                            var i, t, e = this,
                                n = e.getDataset(),
                                r = n.data || (n.data = []);
                            e._data !== r && (e._data && o(e._data, e), t = e, (i = r)._chartjs ? i._chartjs.listeners.push(t) : (Object.defineProperty(i, "_chartjs", {
                                configurable: !0,
                                enumerable: !1,
                                value: {
                                    listeners: [t]
                                }
                            }), a.forEach(function(t) {
                                var n = "onData" + t.charAt(0).toUpperCase() + t.slice(1),
                                    r = i[t];
                                Object.defineProperty(i, t, {
                                    configurable: !0,
                                    enumerable: !1,
                                    value: function() {
                                        var e = Array.prototype.slice.call(arguments),
                                            t = r.apply(this, e);
                                        return s.each(i._chartjs.listeners, function(t) {
                                            "function" == typeof t[n] && t[n].apply(t, e)
                                        }), t
                                    }
                                })
                            })), e._data = r), e.resyncElements()
                        },
                        update: s.noop,
                        transition: function(t) {
                            for (var e = this.getMeta(), n = e.data || [], r = n.length, i = 0; i < r; ++i) n[i].transition(t);
                            e.dataset && e.dataset.transition(t)
                        },
                        draw: function() {
                            var t = this.getMeta(),
                                e = t.data || [],
                                n = e.length,
                                r = 0;
                            for (t.dataset && t.dataset.draw(); r < n; ++r) e[r].draw()
                        },
                        removeHoverStyle: function(t, e) {
                            var n = this.chart.data.datasets[t._datasetIndex],
                                r = t._index,
                                i = t.custom || {},
                                o = s.getValueAtIndexOrDefault,
                                a = t._model;
                            a.backgroundColor = i.backgroundColor ? i.backgroundColor : o(n.backgroundColor, r, e.backgroundColor), a.borderColor = i.borderColor ? i.borderColor : o(n.borderColor, r, e.borderColor), a.borderWidth = i.borderWidth ? i.borderWidth : o(n.borderWidth, r, e.borderWidth)
                        },
                        setHoverStyle: function(t) {
                            var e = this.chart.data.datasets[t._datasetIndex],
                                n = t._index,
                                r = t.custom || {},
                                i = s.getValueAtIndexOrDefault,
                                o = s.getHoverColor,
                                a = t._model;
                            a.backgroundColor = r.hoverBackgroundColor ? r.hoverBackgroundColor : i(e.hoverBackgroundColor, n, o(a.backgroundColor)), a.borderColor = r.hoverBorderColor ? r.hoverBorderColor : i(e.hoverBorderColor, n, o(a.borderColor)), a.borderWidth = r.hoverBorderWidth ? r.hoverBorderWidth : i(e.hoverBorderWidth, n, a.borderWidth)
                        },
                        resyncElements: function() {
                            var t = this.getMeta(),
                                e = this.getDataset().data,
                                n = t.data.length,
                                r = e.length;
                            r < n ? t.data.splice(r, n - r) : n < r && this.insertElements(n, r - n)
                        },
                        insertElements: function(t, e) {
                            for (var n = 0; n < e; ++n) this.addElementAndReset(t + n)
                        },
                        onDataPush: function() {
                            this.insertElements(this.getDataset().data.length - 1, arguments.length)
                        },
                        onDataPop: function() {
                            this.getMeta().data.pop()
                        },
                        onDataShift: function() {
                            this.getMeta().data.shift()
                        },
                        onDataSplice: function(t, e) {
                            this.getMeta().data.splice(t, e), this.insertElements(t, arguments.length - 2)
                        },
                        onDataUnshift: function() {
                            this.insertElements(0, arguments.length)
                        }
                    }), t.DatasetController.extend = s.inherits
                }
            }, {}],
            25: [function(t, e, n) {
                "use strict";
                var p = t(3);
                e.exports = function(t) {
                    var e = t.helpers;
                    t.elements = {}, t.Element = function(t) {
                        e.extend(this, t), this.initialize.apply(this, arguments)
                    }, e.extend(t.Element.prototype, {
                        initialize: function() {
                            this.hidden = !1
                        },
                        pivot: function() {
                            var t = this;
                            return t._view || (t._view = e.clone(t._model)), t._start = {}, t
                        },
                        transition: function(t) {
                            var e = this,
                                n = e._model,
                                r = e._start,
                                i = e._view;
                            return n && 1 !== t ? (i || (i = e._view = {}), r || (r = e._start = {}), function(t, e, n, r) {
                                var i, o, a, s, l, u, c, h, d, f = Object.keys(n);
                                for (i = 0, o = f.length; i < o; ++i)
                                    if (u = n[a = f[i]], e.hasOwnProperty(a) || (e[a] = u), (s = e[a]) !== u && "_" !== a[0]) {
                                        if (t.hasOwnProperty(a) || (t[a] = s), (c = typeof u) == typeof(l = t[a]))
                                            if ("string" === c) {
                                                if ((h = p(l)).valid && (d = p(u)).valid) {
                                                    e[a] = d.mix(h, r).rgbString();
                                                    continue
                                                }
                                            } else if ("number" === c && isFinite(l) && isFinite(u)) {
                                            e[a] = l + (u - l) * r;
                                            continue
                                        }
                                        e[a] = u
                                    }
                            }(r, i, n, t)) : (e._view = n, e._start = null), e
                        },
                        tooltipPosition: function() {
                            return {
                                x: this._model.x,
                                y: this._model.y
                            }
                        },
                        hasValue: function() {
                            return e.isNumber(this._model.x) && e.isNumber(this._model.y)
                        }
                    }), t.Element.extend = e.inherits
                }
            }, {
                3: 3
            }],
            26: [function(t, e, n) {
                "use strict";
                var r = t(3);
                e.exports = function(a) {
                    function c(t, e, n) {
                        var r;
                        return "string" == typeof t ? (r = parseInt(t, 10), -1 !== t.indexOf("%") && (r = r / 100 * e.parentNode[n])) : r = t, r
                    }

                    function h(t) {
                        return null != t && "none" !== t
                    }

                    function e(t, e, n) {
                        var r = document.defaultView,
                            i = t.parentNode,
                            o = r.getComputedStyle(t)[e],
                            a = r.getComputedStyle(i)[e],
                            s = h(o),
                            l = h(a),
                            u = Number.POSITIVE_INFINITY;
                        return s || l ? Math.min(s ? c(o, t, n) : u, l ? c(a, i, n) : u) : "none"
                    }
                    var t, p = a.helpers = {};
                    p.each = function(t, e, n, r) {
                        var i, o;
                        if (p.isArray(t))
                            if (o = t.length, r)
                                for (i = o - 1; 0 <= i; i--) e.call(n, t[i], i);
                            else
                                for (i = 0; i < o; i++) e.call(n, t[i], i);
                        else if ("object" == typeof t) {
                            var a = Object.keys(t);
                            for (o = a.length, i = 0; i < o; i++) e.call(n, t[a[i]], a[i])
                        }
                    }, p.clone = function(t) {
                        var n = {};
                        return p.each(t, function(t, e) {
                            p.isArray(t) ? n[e] = t.slice(0) : n[e] = "object" == typeof t && null !== t ? p.clone(t) : t
                        }), n
                    }, p.extend = function(n) {
                        for (var t = function(t, e) {
                                n[e] = t
                            }, e = 1, r = arguments.length; e < r; e++) p.each(arguments[e], t);
                        return n
                    }, p.configMerge = function(t) {
                        var i = p.clone(t);
                        return p.each(Array.prototype.slice.call(arguments, 1), function(t) {
                            p.each(t, function(t, e) {
                                var n = i.hasOwnProperty(e),
                                    r = n ? i[e] : {};
                                "scales" === e ? i[e] = p.scaleMerge(r, t) : "scale" === e ? i[e] = p.configMerge(r, a.scaleService.getScaleDefaults(t.type), t) : !n || "object" != typeof r || p.isArray(r) || null === r || "object" != typeof t || p.isArray(t) ? i[e] = t : i[e] = p.configMerge(r, t)
                            })
                        }), i
                    }, p.scaleMerge = function(t, e) {
                        var o = p.clone(t);
                        return p.each(e, function(t, i) {
                            "xAxes" === i || "yAxes" === i ? o.hasOwnProperty(i) ? p.each(t, function(t, e) {
                                var n = p.getValueOrDefault(t.type, "xAxes" === i ? "category" : "linear"),
                                    r = a.scaleService.getScaleDefaults(n);
                                e >= o[i].length || !o[i][e].type ? o[i].push(p.configMerge(r, t)) : t.type && t.type !== o[i][e].type ? o[i][e] = p.configMerge(o[i][e], r, t) : o[i][e] = p.configMerge(o[i][e], t)
                            }) : (o[i] = [], p.each(t, function(t) {
                                var e = p.getValueOrDefault(t.type, "xAxes" === i ? "category" : "linear");
                                o[i].push(p.configMerge(a.scaleService.getScaleDefaults(e), t))
                            })) : o.hasOwnProperty(i) && "object" == typeof o[i] && null !== o[i] && "object" == typeof t ? o[i] = p.configMerge(o[i], t) : o[i] = t
                        }), o
                    }, p.getValueAtIndexOrDefault = function(t, e, n) {
                        return null == t ? n : p.isArray(t) ? e < t.length ? t[e] : n : t
                    }, p.getValueOrDefault = function(t, e) {
                        return void 0 === t ? e : t
                    }, p.indexOf = Array.prototype.indexOf ? function(t, e) {
                        return t.indexOf(e)
                    } : function(t, e) {
                        for (var n = 0, r = t.length; n < r; ++n)
                            if (t[n] === e) return n;
                        return -1
                    }, p.where = function(t, e) {
                        if (p.isArray(t) && Array.prototype.filter) return t.filter(e);
                        var n = [];
                        return p.each(t, function(t) {
                            e(t) && n.push(t)
                        }), n
                    }, p.findIndex = Array.prototype.findIndex ? function(t, e, n) {
                        return t.findIndex(e, n)
                    } : function(t, e, n) {
                        n = void 0 === n ? t : n;
                        for (var r = 0, i = t.length; r < i; ++r)
                            if (e.call(n, t[r], r, t)) return r;
                        return -1
                    }, p.findNextWhere = function(t, e, n) {
                        null != n || (n = -1);
                        for (var r = n + 1; r < t.length; r++) {
                            var i = t[r];
                            if (e(i)) return i
                        }
                    }, p.findPreviousWhere = function(t, e, n) {
                        null != n || (n = t.length);
                        for (var r = n - 1; 0 <= r; r--) {
                            var i = t[r];
                            if (e(i)) return i
                        }
                    }, p.inherits = function(t) {
                        var e = this,
                            n = t && t.hasOwnProperty("constructor") ? t.constructor : function() {
                                return e.apply(this, arguments)
                            },
                            r = function() {
                                this.constructor = n
                            };
                        return r.prototype = e.prototype, n.prototype = new r, n.extend = p.inherits, t && p.extend(n.prototype, t), n.__super__ = e.prototype, n
                    }, p.noop = function() {}, p.uid = (t = 0, function() {
                        return t++
                    }), p.isNumber = function(t) {
                        return !isNaN(parseFloat(t)) && isFinite(t)
                    }, p.almostEquals = function(t, e, n) {
                        return Math.abs(t - e) < n
                    }, p.almostWhole = function(t, e) {
                        var n = Math.round(t);
                        return n - e < t && t < n + e
                    }, p.max = function(t) {
                        return t.reduce(function(t, e) {
                            return isNaN(e) ? t : Math.max(t, e)
                        }, Number.NEGATIVE_INFINITY)
                    }, p.min = function(t) {
                        return t.reduce(function(t, e) {
                            return isNaN(e) ? t : Math.min(t, e)
                        }, Number.POSITIVE_INFINITY)
                    }, p.sign = Math.sign ? function(t) {
                        return Math.sign(t)
                    } : function(t) {
                        return 0 === (t = +t) || isNaN(t) ? t : 0 < t ? 1 : -1
                    }, p.log10 = Math.log10 ? function(t) {
                        return Math.log10(t)
                    } : function(t) {
                        return Math.log(t) / Math.LN10
                    }, p.toRadians = function(t) {
                        return t * (Math.PI / 180)
                    }, p.toDegrees = function(t) {
                        return t * (180 / Math.PI)
                    }, p.getAngleFromPoint = function(t, e) {
                        var n = e.x - t.x,
                            r = e.y - t.y,
                            i = Math.sqrt(n * n + r * r),
                            o = Math.atan2(r, n);
                        return o < -.5 * Math.PI && (o += 2 * Math.PI), {
                            angle: o,
                            distance: i
                        }
                    }, p.distanceBetweenPoints = function(t, e) {
                        return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
                    }, p.aliasPixel = function(t) {
                        return t % 2 == 0 ? 0 : .5
                    }, p.splineCurve = function(t, e, n, r) {
                        var i = t.skip ? e : t,
                            o = e,
                            a = n.skip ? e : n,
                            s = Math.sqrt(Math.pow(o.x - i.x, 2) + Math.pow(o.y - i.y, 2)),
                            l = Math.sqrt(Math.pow(a.x - o.x, 2) + Math.pow(a.y - o.y, 2)),
                            u = s / (s + l),
                            c = l / (s + l),
                            h = r * (u = isNaN(u) ? 0 : u),
                            d = r * (c = isNaN(c) ? 0 : c);
                        return {
                            previous: {
                                x: o.x - h * (a.x - i.x),
                                y: o.y - h * (a.y - i.y)
                            },
                            next: {
                                x: o.x + d * (a.x - i.x),
                                y: o.y + d * (a.y - i.y)
                            }
                        }
                    }, p.EPSILON = Number.EPSILON || 1e-14, p.splineCurveMonotone = function(t) {
                        var e, n, r, i, o, a, s, l, u, c = (t || []).map(function(t) {
                                return {
                                    model: t._model,
                                    deltaK: 0,
                                    mK: 0
                                }
                            }),
                            h = c.length;
                        for (e = 0; e < h; ++e)
                            if (!(r = c[e]).model.skip) {
                                if (n = 0 < e ? c[e - 1] : null, (i = e < h - 1 ? c[e + 1] : null) && !i.model.skip) {
                                    var d = i.model.x - r.model.x;
                                    r.deltaK = 0 !== d ? (i.model.y - r.model.y) / d : 0
                                }!n || n.model.skip ? r.mK = r.deltaK : !i || i.model.skip ? r.mK = n.deltaK : this.sign(n.deltaK) !== this.sign(r.deltaK) ? r.mK = 0 : r.mK = (n.deltaK + r.deltaK) / 2
                            }
                        for (e = 0; e < h - 1; ++e) r = c[e], i = c[e + 1], r.model.skip || i.model.skip || (p.almostEquals(r.deltaK, 0, this.EPSILON) ? r.mK = i.mK = 0 : (o = r.mK / r.deltaK, a = i.mK / r.deltaK, (l = Math.pow(o, 2) + Math.pow(a, 2)) <= 9 || (s = 3 / Math.sqrt(l), r.mK = o * s * r.deltaK, i.mK = a * s * r.deltaK)));
                        for (e = 0; e < h; ++e)(r = c[e]).model.skip || (n = 0 < e ? c[e - 1] : null, i = e < h - 1 ? c[e + 1] : null, n && !n.model.skip && (u = (r.model.x - n.model.x) / 3, r.model.controlPointPreviousX = r.model.x - u, r.model.controlPointPreviousY = r.model.y - u * r.mK), i && !i.model.skip && (u = (i.model.x - r.model.x) / 3, r.model.controlPointNextX = r.model.x + u, r.model.controlPointNextY = r.model.y + u * r.mK))
                    }, p.nextItem = function(t, e, n) {
                        return n ? e >= t.length - 1 ? t[0] : t[e + 1] : e >= t.length - 1 ? t[t.length - 1] : t[e + 1]
                    }, p.previousItem = function(t, e, n) {
                        return n ? e <= 0 ? t[t.length - 1] : t[e - 1] : e <= 0 ? t[0] : t[e - 1]
                    }, p.niceNum = function(t, e) {
                        var n = Math.floor(p.log10(t)),
                            r = t / Math.pow(10, n);
                        return (e ? r < 1.5 ? 1 : r < 3 ? 2 : r < 7 ? 5 : 10 : r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10) * Math.pow(10, n)
                    };
                    var n = p.easingEffects = {
                        linear: function(t) {
                            return t
                        },
                        easeInQuad: function(t) {
                            return t * t
                        },
                        easeOutQuad: function(t) {
                            return -1 * t * (t - 2)
                        },
                        easeInOutQuad: function(t) {
                            return (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
                        },
                        easeInCubic: function(t) {
                            return t * t * t
                        },
                        easeOutCubic: function(t) {
                            return 1 * ((t = t / 1 - 1) * t * t + 1)
                        },
                        easeInOutCubic: function(t) {
                            return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
                        },
                        easeInQuart: function(t) {
                            return t * t * t * t
                        },
                        easeOutQuart: function(t) {
                            return -1 * ((t = t / 1 - 1) * t * t * t - 1)
                        },
                        easeInOutQuart: function(t) {
                            return (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
                        },
                        easeInQuint: function(t) {
                            return 1 * (t /= 1) * t * t * t * t
                        },
                        easeOutQuint: function(t) {
                            return 1 * ((t = t / 1 - 1) * t * t * t * t + 1)
                        },
                        easeInOutQuint: function(t) {
                            return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
                        },
                        easeInSine: function(t) {
                            return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1
                        },
                        easeOutSine: function(t) {
                            return 1 * Math.sin(t / 1 * (Math.PI / 2))
                        },
                        easeInOutSine: function(t) {
                            return -.5 * (Math.cos(Math.PI * t / 1) - 1)
                        },
                        easeInExpo: function(t) {
                            return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1))
                        },
                        easeOutExpo: function(t) {
                            return 1 === t ? 1 : 1 * (1 - Math.pow(2, -10 * t / 1))
                        },
                        easeInOutExpo: function(t) {
                            return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * --t))
                        },
                        easeInCirc: function(t) {
                            return 1 <= t ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1)
                        },
                        easeOutCirc: function(t) {
                            return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t)
                        },
                        easeInOutCirc: function(t) {
                            return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                        },
                        easeInElastic: function(t) {
                            var e = 1.70158,
                                n = 0,
                                r = 1;
                            return 0 === t ? 0 : 1 == (t /= 1) ? 1 : (n || (n = .3), r < Math.abs(1) ? (r = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / r), -r * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / n))
                        },
                        easeOutElastic: function(t) {
                            var e = 1.70158,
                                n = 0,
                                r = 1;
                            return 0 === t ? 0 : 1 == (t /= 1) ? 1 : (n || (n = .3), r < Math.abs(1) ? (r = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / r), r * Math.pow(2, -10 * t) * Math.sin((1 * t - e) * (2 * Math.PI) / n) + 1)
                        },
                        easeInOutElastic: function(t) {
                            var e = 1.70158,
                                n = 0,
                                r = 1;
                            return 0 === t ? 0 : 2 == (t /= .5) ? 1 : (n || (n = .3 * 1.5 * 1), r < Math.abs(1) ? (r = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / r), t < 1 ? r * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / n) * -.5 : r * Math.pow(2, -10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / n) * .5 + 1)
                        },
                        easeInBack: function(t) {
                            return 1 * (t /= 1) * t * (2.70158 * t - 1.70158)
                        },
                        easeOutBack: function(t) {
                            return 1 * ((t = t / 1 - 1) * t * (2.70158 * t + 1.70158) + 1)
                        },
                        easeInOutBack: function(t) {
                            var e = 1.70158;
                            return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2)
                        },
                        easeInBounce: function(t) {
                            return 1 - n.easeOutBounce(1 - t)
                        },
                        easeOutBounce: function(t) {
                            return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t * 1 : t < 2 / 2.75 ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                        },
                        easeInOutBounce: function(t) {
                            return t < .5 ? .5 * n.easeInBounce(2 * t) : .5 * n.easeOutBounce(2 * t - 1) + .5
                        }
                    };
                    p.requestAnimFrame = "undefined" == typeof window ? function(t) {
                        t()
                    } : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
                        return window.setTimeout(t, 1e3 / 60)
                    }, p.getRelativePosition = function(t, e) {
                        var n, r, i = t.originalEvent || t,
                            o = t.currentTarget || t.srcElement,
                            a = o.getBoundingClientRect(),
                            s = i.touches;
                        s && 0 < s.length ? (n = s[0].clientX, r = s[0].clientY) : (n = i.clientX, r = i.clientY);
                        var l = parseFloat(p.getStyle(o, "padding-left")),
                            u = parseFloat(p.getStyle(o, "padding-top")),
                            c = parseFloat(p.getStyle(o, "padding-right")),
                            h = parseFloat(p.getStyle(o, "padding-bottom")),
                            d = a.right - a.left - l - c,
                            f = a.bottom - a.top - u - h;
                        return {
                            x: n = Math.round((n - a.left - l) / d * o.width / e.currentDevicePixelRatio),
                            y: r = Math.round((r - a.top - u) / f * o.height / e.currentDevicePixelRatio)
                        }
                    }, p.addEvent = function(t, e, n) {
                        t.addEventListener ? t.addEventListener(e, n) : t.attachEvent ? t.attachEvent("on" + e, n) : t["on" + e] = n
                    }, p.removeEvent = function(t, e, n) {
                        t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent ? t.detachEvent("on" + e, n) : t["on" + e] = p.noop
                    }, p.getConstraintWidth = function(t) {
                        return e(t, "max-width", "clientWidth")
                    }, p.getConstraintHeight = function(t) {
                        return e(t, "max-height", "clientHeight")
                    }, p.getMaximumWidth = function(t) {
                        var e = t.parentNode,
                            n = parseInt(p.getStyle(e, "padding-left"), 10),
                            r = parseInt(p.getStyle(e, "padding-right"), 10),
                            i = e.clientWidth - n - r,
                            o = p.getConstraintWidth(t);
                        return isNaN(o) ? i : Math.min(i, o)
                    }, p.getMaximumHeight = function(t) {
                        var e = t.parentNode,
                            n = parseInt(p.getStyle(e, "padding-top"), 10),
                            r = parseInt(p.getStyle(e, "padding-bottom"), 10),
                            i = e.clientHeight - n - r,
                            o = p.getConstraintHeight(t);
                        return isNaN(o) ? i : Math.min(i, o)
                    }, p.getStyle = function(t, e) {
                        return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e)
                    }, p.retinaScale = function(t) {
                        var e = t.currentDevicePixelRatio = window.devicePixelRatio || 1;
                        if (1 !== e) {
                            var n = t.canvas,
                                r = t.height,
                                i = t.width;
                            n.height = r * e, n.width = i * e, t.ctx.scale(e, e), n.style.height = r + "px", n.style.width = i + "px"
                        }
                    }, p.clear = function(t) {
                        t.ctx.clearRect(0, 0, t.width, t.height)
                    }, p.fontString = function(t, e, n) {
                        return e + " " + t + "px " + n
                    }, p.longestText = function(e, t, n, r) {
                        var i = (r = r || {}).data = r.data || {},
                            o = r.garbageCollect = r.garbageCollect || [];
                        r.font !== t && (i = r.data = {}, o = r.garbageCollect = [], r.font = t), e.font = t;
                        var a = 0;
                        p.each(n, function(t) {
                            null != t && !0 !== p.isArray(t) ? a = p.measureText(e, i, o, a, t) : p.isArray(t) && p.each(t, function(t) {
                                null == t || p.isArray(t) || (a = p.measureText(e, i, o, a, t))
                            })
                        });
                        var s = o.length / 2;
                        if (s > n.length) {
                            for (var l = 0; l < s; l++) delete i[o[l]];
                            o.splice(0, s)
                        }
                        return a
                    }, p.measureText = function(t, e, n, r, i) {
                        var o = e[i];
                        return o || (o = e[i] = t.measureText(i).width, n.push(i)), r < o && (r = o), r
                    }, p.numberOfLabelLines = function(t) {
                        var e = 1;
                        return p.each(t, function(t) {
                            p.isArray(t) && t.length > e && (e = t.length)
                        }), e
                    }, p.drawRoundedRectangle = function(t, e, n, r, i, o) {
                        t.beginPath(), t.moveTo(e + o, n), t.lineTo(e + r - o, n), t.quadraticCurveTo(e + r, n, e + r, n + o), t.lineTo(e + r, n + i - o), t.quadraticCurveTo(e + r, n + i, e + r - o, n + i), t.lineTo(e + o, n + i), t.quadraticCurveTo(e, n + i, e, n + i - o), t.lineTo(e, n + o), t.quadraticCurveTo(e, n, e + o, n), t.closePath()
                    }, p.color = r ? function(t) {
                        return t instanceof CanvasGradient && (t = a.defaults.global.defaultColor), r(t)
                    } : function(t) {
                        return console.error("Color.js not found!"), t
                    }, p.isArray = Array.isArray ? function(t) {
                        return Array.isArray(t)
                    } : function(t) {
                        return "[object Array]" === Object.prototype.toString.call(t)
                    }, p.arrayEquals = function(t, e) {
                        var n, r, i, o;
                        if (!t || !e || t.length !== e.length) return !1;
                        for (n = 0, r = t.length; n < r; ++n)
                            if (i = t[n], o = e[n], i instanceof Array && o instanceof Array) {
                                if (!p.arrayEquals(i, o)) return !1
                            } else if (i !== o) return !1;
                        return !0
                    }, p.callback = function(t, e, n) {
                        t && "function" == typeof t.call && t.apply(n, e)
                    }, p.getHoverColor = function(t) {
                        return t instanceof CanvasPattern ? t : p.color(t).saturate(.5).darken(.1).rgbString()
                    }, p.callCallback = p.callback
                }
            }, {
                3: 3
            }],
            27: [function(t, e, n) {
                "use strict";
                e.exports = function(t) {
                    function a(t, e) {
                        return t.native ? {
                            x: t.x,
                            y: t.y
                        } : c.getRelativePosition(t, e)
                    }

                    function l(t, e) {
                        var n, r, i, o, a;
                        for (r = 0, o = t.data.datasets.length; r < o; ++r)
                            if (t.isDatasetVisible(r))
                                for (i = 0, a = (n = t.getDatasetMeta(r)).data.length; i < a; ++i) {
                                    var s = n.data[i];
                                    s._view.skip || e(s)
                                }
                    }

                    function s(t, e) {
                        var n = [];
                        return l(t, function(t) {
                            t.inRange(e.x, e.y) && n.push(t)
                        }), n
                    }

                    function u(t, r, i, o) {
                        var a = Number.POSITIVE_INFINITY,
                            s = [];
                        return o || (o = c.distanceBetweenPoints), l(t, function(t) {
                            if (!i || t.inRange(r.x, r.y)) {
                                var e = t.getCenterPoint(),
                                    n = o(r, e);
                                n < a ? (s = [t], a = n) : n === a && s.push(t)
                            }
                        }), s
                    }

                    function n(r, t, e) {
                        var n = a(t, r),
                            i = e.intersect ? s(r, n) : u(r, n, !1, function(t, e) {
                                return Math.abs(t.x - e.x)
                            }),
                            o = [];
                        return i.length ? (r.data.datasets.forEach(function(t, e) {
                            if (r.isDatasetVisible(e)) {
                                var n = r.getDatasetMeta(e).data[i[0]._index];
                                n && !n._view.skip && o.push(n)
                            }
                        }), o) : []
                    }
                    var c = t.helpers;
                    t.Interaction = {
                        modes: {
                            single: function(t, e) {
                                var n = a(e, t),
                                    r = [];
                                return l(t, function(t) {
                                    if (t.inRange(n.x, n.y)) return r.push(t), r
                                }), r.slice(0, 1)
                            },
                            label: n,
                            index: n,
                            dataset: function(t, e, n) {
                                var r = a(e, t),
                                    i = n.intersect ? s(t, r) : u(t, r, !1);
                                return 0 < i.length && (i = t.getDatasetMeta(i[0]._datasetIndex).data), i
                            },
                            "x-axis": function(t, e) {
                                return n(t, e, !0)
                            },
                            point: function(t, e) {
                                return s(t, a(e, t))
                            },
                            nearest: function(t, e, n) {
                                var r = u(t, a(e, t), n.intersect);
                                return 1 < r.length && r.sort(function(t, e) {
                                    var n = t.getArea() - e.getArea();
                                    return 0 === n && (n = t._datasetIndex - e._datasetIndex), n
                                }), r.slice(0, 1)
                            },
                            x: function(t, e, n) {
                                var r = a(e, t),
                                    i = [],
                                    o = !1;
                                return l(t, function(t) {
                                    t.inXRange(r.x) && i.push(t), t.inRange(r.x, r.y) && (o = !0)
                                }), n.intersect && !o && (i = []), i
                            },
                            y: function(t, e, n) {
                                var r = a(e, t),
                                    i = [],
                                    o = !1;
                                return l(t, function(t) {
                                    t.inYRange(r.y) && i.push(t), t.inRange(r.x, r.y) && (o = !0)
                                }), n.intersect && !o && (i = []), i
                            }
                        }
                    }
                }
            }, {}],
            28: [function(t, e, n) {
                "use strict";
                e.exports = function() {
                    var t = function(t, e) {
                        return this.construct(t, e), this
                    };
                    return t.defaults = {
                        global: {
                            responsive: !0,
                            responsiveAnimationDuration: 0,
                            maintainAspectRatio: !0,
                            events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
                            hover: {
                                onHover: null,
                                mode: "nearest",
                                intersect: !0,
                                animationDuration: 400
                            },
                            onClick: null,
                            defaultColor: "rgba(0,0,0,0.1)",
                            defaultFontColor: "#666",
                            defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                            defaultFontSize: 12,
                            defaultFontStyle: "normal",
                            showLines: !0,
                            elements: {},
                            legendCallback: function(t) {
                                var e = [];
                                e.push('<ul class="' + t.id + '-legend">');
                                for (var n = 0; n < t.data.datasets.length; n++) e.push('<li><span style="background-color:' + t.data.datasets[n].backgroundColor + '"></span>'), t.data.datasets[n].label && e.push(t.data.datasets[n].label), e.push("</li>");
                                return e.push("</ul>"), e.join("")
                            }
                        }
                    }, t.Chart = t
                }
            }, {}],
            29: [function(t, e, n) {
                "use strict";
                e.exports = function(t) {
                    function B(t, e) {
                        return $.where(t, function(t) {
                            return t.position === e
                        })
                    }

                    function z(t, i) {
                        t.forEach(function(t, e) {
                            return t._tmpIndex_ = e, t
                        }), t.sort(function(t, e) {
                            var n = i ? e : t,
                                r = i ? t : e;
                            return n.weight === r.weight ? n._tmpIndex_ - r._tmpIndex_ : n.weight - r.weight
                        }), t.forEach(function(t) {
                            delete t._tmpIndex_
                        })
                    }
                    var $ = t.helpers;
                    t.layoutService = {
                        defaults: {},
                        addBox: function(t, e) {
                            t.boxes || (t.boxes = []), e.fullWidth = e.fullWidth || !1, e.position = e.position || "top", e.weight = e.weight || 0, t.boxes.push(e)
                        },
                        removeBox: function(t, e) {
                            var n = t.boxes ? t.boxes.indexOf(e) : -1; - 1 !== n && t.boxes.splice(n, 1)
                        },
                        configure: function(t, e, n) {
                            for (var r, i = ["fullWidth", "position", "weight"], o = i.length, a = 0; a < o; ++a) r = i[a], n.hasOwnProperty(r) && (e[r] = n[r])
                        },
                        update: function(e, n, t) {
                            function r(e) {
                                var t = $.findNextWhere(k, function(t) {
                                    return t.box === e
                                });
                                if (t)
                                    if (e.isHorizontal()) {
                                        var n = {
                                            left: Math.max(E, S),
                                            right: Math.max(j, C),
                                            top: 0,
                                            bottom: 0
                                        };
                                        e.update(e.fullWidth ? v : w, m / 2, n)
                                    } else e.update(t.minSize.width, x)
                            }

                            function i(t) {
                                t.isHorizontal() ? (t.left = t.fullWidth ? s : E, t.right = t.fullWidth ? n - l : E + w, t.top = F, t.bottom = F + t.height, F = t.bottom) : (t.left = D, t.right = D + t.width, t.top = P, t.bottom = P + x, D = t.right)
                            }
                            if (e) {
                                var o = e.options.layout,
                                    a = o ? o.padding : null,
                                    s = 0,
                                    l = 0,
                                    u = 0,
                                    c = 0;
                                isNaN(a) ? (s = a.left || 0, l = a.right || 0, u = a.top || 0, c = a.bottom || 0) : c = u = l = s = a;
                                var h = B(e.boxes, "left"),
                                    d = B(e.boxes, "right"),
                                    f = B(e.boxes, "top"),
                                    p = B(e.boxes, "bottom"),
                                    g = B(e.boxes, "chartArea");
                                z(h, !0), z(d, !1), z(f, !0), z(p, !1);
                                var v = n - s - l,
                                    m = t - u - c,
                                    y = m / 2,
                                    b = (n - v / 2) / (h.length + d.length),
                                    _ = (t - y) / (f.length + p.length),
                                    w = v,
                                    x = m,
                                    k = [];
                                $.each(h.concat(d, f, p), function(t) {
                                    var e, n = t.isHorizontal();
                                    n ? (e = t.update(t.fullWidth ? v : w, _), x -= e.height) : (e = t.update(b, y), w -= e.width), k.push({
                                        horizontal: n,
                                        minSize: e,
                                        box: t
                                    })
                                });
                                var S = 0,
                                    C = 0,
                                    T = 0,
                                    A = 0;
                                $.each(f.concat(p), function(t) {
                                    if (t.getPadding) {
                                        var e = t.getPadding();
                                        S = Math.max(S, e.left), C = Math.max(C, e.right)
                                    }
                                }), $.each(h.concat(d), function(t) {
                                    if (t.getPadding) {
                                        var e = t.getPadding();
                                        T = Math.max(T, e.top), A = Math.max(A, e.bottom)
                                    }
                                });
                                var E = s,
                                    j = l,
                                    P = u,
                                    M = c;
                                $.each(h.concat(d), r), $.each(h, function(t) {
                                    E += t.width
                                }), $.each(d, function(t) {
                                    j += t.width
                                }), $.each(f.concat(p), r), $.each(f, function(t) {
                                    P += t.height
                                }), $.each(p, function(t) {
                                    M += t.height
                                }), $.each(h.concat(d), function(e) {
                                    var t = $.findNextWhere(k, function(t) {
                                            return t.box === e
                                        }),
                                        n = {
                                            left: 0,
                                            right: 0,
                                            top: P,
                                            bottom: M
                                        };
                                    t && e.update(t.minSize.width, x, n)
                                }), E = s, j = l, P = u, M = c, $.each(h, function(t) {
                                    E += t.width
                                }), $.each(d, function(t) {
                                    j += t.width
                                }), $.each(f, function(t) {
                                    P += t.height
                                }), $.each(p, function(t) {
                                    M += t.height
                                });
                                var I = Math.max(S - E, 0);
                                E += I, j += Math.max(C - j, 0);
                                var R = Math.max(T - P, 0);
                                P += R, M += Math.max(A - M, 0);
                                var O = t - P - M,
                                    L = n - E - j;
                                L === w && O === x || ($.each(h, function(t) {
                                    t.height = O
                                }), $.each(d, function(t) {
                                    t.height = O
                                }), $.each(f, function(t) {
                                    t.fullWidth || (t.width = L)
                                }), $.each(p, function(t) {
                                    t.fullWidth || (t.width = L)
                                }), x = O, w = L);
                                var D = s + I,
                                    F = u + R;
                                $.each(h.concat(f), i), D += w, F += x, $.each(d, i), $.each(p, i), e.chartArea = {
                                    left: E,
                                    top: P,
                                    right: E + w,
                                    bottom: P + x
                                }, $.each(g, function(t) {
                                    t.left = e.chartArea.left, t.top = e.chartArea.top, t.right = e.chartArea.right, t.bottom = e.chartArea.bottom, t.update(w, x)
                                })
                            }
                        }
                    }
                }
            }, {}],
            30: [function(t, e, n) {
                "use strict";
                e.exports = function(s) {
                    var l = s.helpers;
                    s.defaults.global.plugins = {}, s.plugins = {
                        _plugins: [],
                        _cacheId: 0,
                        register: function(t) {
                            var e = this._plugins;
                            [].concat(t).forEach(function(t) {
                                -1 === e.indexOf(t) && e.push(t)
                            }), this._cacheId++
                        },
                        unregister: function(t) {
                            var n = this._plugins;
                            [].concat(t).forEach(function(t) {
                                var e = n.indexOf(t); - 1 !== e && n.splice(e, 1)
                            }), this._cacheId++
                        },
                        clear: function() {
                            this._plugins = [], this._cacheId++
                        },
                        count: function() {
                            return this._plugins.length
                        },
                        getAll: function() {
                            return this._plugins
                        },
                        notify: function(t, e, n) {
                            var r, i, o, a, s, l = this.descriptors(t),
                                u = l.length;
                            for (r = 0; r < u; ++r)
                                if ("function" == typeof(s = (o = (i = l[r]).plugin)[e]) && ((a = [t].concat(n || [])).push(i.options), !1 === s.apply(o, a))) return !1;
                            return !0
                        },
                        descriptors: function(t) {
                            var e = t._plugins || (t._plugins = {});
                            if (e.id === this._cacheId) return e.descriptors;
                            var r = [],
                                i = [],
                                n = t && t.config || {},
                                o = s.defaults.global.plugins,
                                a = n.options && n.options.plugins || {};
                            return this._plugins.concat(n.plugins || []).forEach(function(t) {
                                if (-1 === r.indexOf(t)) {
                                    var e = t.id,
                                        n = a[e];
                                    !1 !== n && (!0 === n && (n = l.clone(o[e])), r.push(t), i.push({
                                        plugin: t,
                                        options: n || {}
                                    }))
                                }
                            }), e.descriptors = i, e.id = this._cacheId, i
                        }
                    }, s.pluginService = s.plugins, s.PluginBase = s.Element.extend({})
                }
            }, {}],
            31: [function(t, e, n) {
                "use strict";
                e.exports = function(b) {
                    function w(t, e, n) {
                        return $.isArray(e) ? $.longestText(t, n, e) : t.measureText(e).width
                    }

                    function x(t) {
                        var e = $.getValueOrDefault,
                            n = b.defaults.global,
                            r = e(t.fontSize, n.defaultFontSize),
                            i = e(t.fontStyle, n.defaultFontStyle),
                            o = e(t.fontFamily, n.defaultFontFamily);
                        return {
                            size: r,
                            style: i,
                            family: o,
                            font: $.fontString(r, i, o)
                        }
                    }
                    var $ = b.helpers;
                    b.defaults.scale = {
                        display: !0,
                        position: "left",
                        gridLines: {
                            display: !0,
                            color: "rgba(0, 0, 0, 0.1)",
                            lineWidth: 1,
                            drawBorder: !0,
                            drawOnChartArea: !0,
                            drawTicks: !0,
                            tickMarkLength: 10,
                            zeroLineWidth: 1,
                            zeroLineColor: "rgba(0,0,0,0.25)",
                            zeroLineBorderDash: [],
                            zeroLineBorderDashOffset: 0,
                            offsetGridLines: !1,
                            borderDash: [],
                            borderDashOffset: 0
                        },
                        scaleLabel: {
                            labelString: "",
                            display: !1
                        },
                        ticks: {
                            beginAtZero: !1,
                            minRotation: 0,
                            maxRotation: 50,
                            mirror: !1,
                            padding: 0,
                            reverse: !1,
                            display: !0,
                            autoSkip: !0,
                            autoSkipPadding: 0,
                            labelOffset: 0,
                            callback: b.Ticks.formatters.values
                        }
                    }, b.Scale = b.Element.extend({
                        getPadding: function() {
                            return {
                                left: this.paddingLeft || 0,
                                top: this.paddingTop || 0,
                                right: this.paddingRight || 0,
                                bottom: this.paddingBottom || 0
                            }
                        },
                        beforeUpdate: function() {
                            $.callback(this.options.beforeUpdate, [this])
                        },
                        update: function(t, e, n) {
                            var r = this;
                            return r.beforeUpdate(), r.maxWidth = t, r.maxHeight = e, r.margins = $.extend({
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }, n), r.longestTextCache = r.longestTextCache || {}, r.beforeSetDimensions(), r.setDimensions(), r.afterSetDimensions(), r.beforeDataLimits(), r.determineDataLimits(), r.afterDataLimits(), r.beforeBuildTicks(), r.buildTicks(), r.afterBuildTicks(), r.beforeTickToLabelConversion(), r.convertTicksToLabels(), r.afterTickToLabelConversion(), r.beforeCalculateTickRotation(), r.calculateTickRotation(), r.afterCalculateTickRotation(), r.beforeFit(), r.fit(), r.afterFit(), r.afterUpdate(), r.minSize
                        },
                        afterUpdate: function() {
                            $.callback(this.options.afterUpdate, [this])
                        },
                        beforeSetDimensions: function() {
                            $.callback(this.options.beforeSetDimensions, [this])
                        },
                        setDimensions: function() {
                            var t = this;
                            t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0
                        },
                        afterSetDimensions: function() {
                            $.callback(this.options.afterSetDimensions, [this])
                        },
                        beforeDataLimits: function() {
                            $.callback(this.options.beforeDataLimits, [this])
                        },
                        determineDataLimits: $.noop,
                        afterDataLimits: function() {
                            $.callback(this.options.afterDataLimits, [this])
                        },
                        beforeBuildTicks: function() {
                            $.callback(this.options.beforeBuildTicks, [this])
                        },
                        buildTicks: $.noop,
                        afterBuildTicks: function() {
                            $.callback(this.options.afterBuildTicks, [this])
                        },
                        beforeTickToLabelConversion: function() {
                            $.callback(this.options.beforeTickToLabelConversion, [this])
                        },
                        convertTicksToLabels: function() {
                            var t = this.options.ticks;
                            this.ticks = this.ticks.map(t.userCallback || t.callback)
                        },
                        afterTickToLabelConversion: function() {
                            $.callback(this.options.afterTickToLabelConversion, [this])
                        },
                        beforeCalculateTickRotation: function() {
                            $.callback(this.options.beforeCalculateTickRotation, [this])
                        },
                        calculateTickRotation: function() {
                            var t = this,
                                e = t.ctx,
                                n = t.options.ticks,
                                r = x(n);
                            e.font = r.font;
                            var i = n.minRotation || 0;
                            if (t.options.display && t.isHorizontal())
                                for (var o, a = $.longestText(e, r.font, t.ticks, t.longestTextCache), s = a, l = t.getPixelForTick(1) - t.getPixelForTick(0) - 6; l < s && i < n.maxRotation;) {
                                    var u = $.toRadians(i);
                                    if (o = Math.cos(u), Math.sin(u) * a > t.maxHeight) {
                                        i--;
                                        break
                                    }
                                    i++, s = o * a
                                }
                            t.labelRotation = i
                        },
                        afterCalculateTickRotation: function() {
                            $.callback(this.options.afterCalculateTickRotation, [this])
                        },
                        beforeFit: function() {
                            $.callback(this.options.beforeFit, [this])
                        },
                        fit: function() {
                            var t = this,
                                e = t.minSize = {
                                    width: 0,
                                    height: 0
                                },
                                n = t.options,
                                r = n.ticks,
                                i = n.scaleLabel,
                                o = n.gridLines,
                                a = n.display,
                                s = t.isHorizontal(),
                                l = x(r),
                                u = 1.5 * x(i).size,
                                c = n.gridLines.tickMarkLength;
                            if (e.width = s ? t.isFullWidth() ? t.maxWidth - t.margins.left - t.margins.right : t.maxWidth : a && o.drawTicks ? c : 0, e.height = s ? a && o.drawTicks ? c : 0 : t.maxHeight, i.display && a && (s ? e.height += u : e.width += u), r.display && a) {
                                var h = $.longestText(t.ctx, l.font, t.ticks, t.longestTextCache),
                                    d = $.numberOfLabelLines(t.ticks),
                                    f = .5 * l.size;
                                if (s) {
                                    t.longestLabelWidth = h;
                                    var p = $.toRadians(t.labelRotation),
                                        g = Math.cos(p),
                                        v = Math.sin(p) * h + l.size * d + f * d;
                                    e.height = Math.min(t.maxHeight, e.height + v), t.ctx.font = l.font;
                                    var m = t.ticks[0],
                                        y = w(t.ctx, m, l.font),
                                        b = t.ticks[t.ticks.length - 1],
                                        _ = w(t.ctx, b, l.font);
                                    0 !== t.labelRotation ? (t.paddingLeft = "bottom" === n.position ? g * y + 3 : g * f + 3, t.paddingRight = "bottom" === n.position ? g * f + 3 : g * _ + 3) : (t.paddingLeft = y / 2 + 3, t.paddingRight = _ / 2 + 3)
                                } else r.mirror ? h = 0 : h += t.options.ticks.padding, e.width = Math.min(t.maxWidth, e.width + h), t.paddingTop = l.size / 2, t.paddingBottom = l.size / 2
                            }
                            t.handleMargins(), t.width = e.width, t.height = e.height
                        },
                        handleMargins: function() {
                            var t = this;
                            t.margins && (t.paddingLeft = Math.max(t.paddingLeft - t.margins.left, 0), t.paddingTop = Math.max(t.paddingTop - t.margins.top, 0), t.paddingRight = Math.max(t.paddingRight - t.margins.right, 0), t.paddingBottom = Math.max(t.paddingBottom - t.margins.bottom, 0))
                        },
                        afterFit: function() {
                            $.callback(this.options.afterFit, [this])
                        },
                        isHorizontal: function() {
                            return "top" === this.options.position || "bottom" === this.options.position
                        },
                        isFullWidth: function() {
                            return this.options.fullWidth
                        },
                        getRightValue: function(t) {
                            return null == t ? NaN : "number" != typeof t || isFinite(t) ? "object" == typeof t ? t instanceof Date || t.isValid ? t : this.getRightValue(this.isHorizontal() ? t.x : t.y) : t : NaN
                        },
                        getLabelForIndex: $.noop,
                        getPixelForValue: $.noop,
                        getValueForPixel: $.noop,
                        getPixelForTick: function(t, e) {
                            var n = this;
                            if (n.isHorizontal()) {
                                var r = (n.width - (n.paddingLeft + n.paddingRight)) / Math.max(n.ticks.length - (n.options.gridLines.offsetGridLines ? 0 : 1), 1),
                                    i = r * t + n.paddingLeft;
                                return e && (i += r / 2), n.left + Math.round(i) + (n.isFullWidth() ? n.margins.left : 0)
                            }
                            var o = n.height - (n.paddingTop + n.paddingBottom);
                            return n.top + t * (o / (n.ticks.length - 1))
                        },
                        getPixelForDecimal: function(t) {
                            var e = this;
                            if (e.isHorizontal()) {
                                var n = (e.width - (e.paddingLeft + e.paddingRight)) * t + e.paddingLeft;
                                return e.left + Math.round(n) + (e.isFullWidth() ? e.margins.left : 0)
                            }
                            return e.top + t * e.height
                        },
                        getBasePixel: function() {
                            return this.getPixelForValue(this.getBaseValue())
                        },
                        getBaseValue: function() {
                            var t = this.min,
                                e = this.max;
                            return this.beginAtZero ? 0 : t < 0 && e < 0 ? e : 0 < t && 0 < e ? t : 0
                        },
                        draw: function(S) {
                            var C = this,
                                T = C.options;
                            if (T.display) {
                                var A, t, i = C.ctx,
                                    E = b.defaults.global,
                                    j = T.ticks,
                                    P = T.gridLines,
                                    e = T.scaleLabel,
                                    M = 0 !== C.labelRotation,
                                    n = j.autoSkip,
                                    I = C.isHorizontal();
                                j.maxTicksLimit && (t = j.maxTicksLimit);
                                var r = $.getValueOrDefault(j.fontColor, E.defaultFontColor),
                                    o = x(j),
                                    R = P.drawTicks ? P.tickMarkLength : 0,
                                    a = $.getValueOrDefault(e.fontColor, E.defaultFontColor),
                                    s = x(e),
                                    O = $.toRadians(C.labelRotation),
                                    l = Math.cos(O),
                                    u = C.longestLabelWidth * l;
                                i.fillStyle = r;
                                var L = [];
                                if (I) {
                                    if (A = !1, (u + j.autoSkipPadding) * C.ticks.length > C.width - (C.paddingLeft + C.paddingRight) && (A = 1 + Math.floor((u + j.autoSkipPadding) * C.ticks.length / (C.width - (C.paddingLeft + C.paddingRight)))), t && C.ticks.length > t)
                                        for (; !A || C.ticks.length / (A || 1) > t;) A || (A = 1), A += 1;
                                    n || (A = !1)
                                }
                                var D = "right" === T.position ? C.left : C.right - R,
                                    F = "right" === T.position ? C.left + R : C.right,
                                    B = "bottom" === T.position ? C.top : C.bottom - R,
                                    z = "bottom" === T.position ? C.top + R : C.bottom;
                                if ($.each(C.ticks, function(t, e) {
                                        if (null != t) {
                                            var n = C.ticks.length === e + 1;
                                            if ((!(1 < A && 0 < e % A || e % A == 0 && e + A >= C.ticks.length) || n) && null != t) {
                                                var r, i, o, a;
                                                e === (void 0 !== C.zeroLineIndex ? C.zeroLineIndex : 0) ? (r = P.zeroLineWidth, i = P.zeroLineColor, o = P.zeroLineBorderDash, a = P.zeroLineBorderDashOffset) : (r = $.getValueAtIndexOrDefault(P.lineWidth, e), i = $.getValueAtIndexOrDefault(P.color, e), o = $.getValueOrDefault(P.borderDash, E.borderDash), a = $.getValueOrDefault(P.borderDashOffset, E.borderDashOffset));
                                                var s, l, u, c, h, d, f, p, g, v, m = "middle",
                                                    y = "middle";
                                                if (I) {
                                                    "bottom" === T.position ? (y = M ? "middle" : "top", m = M ? "right" : "center", v = C.top + R) : (y = M ? "middle" : "bottom", m = M ? "left" : "center", v = C.bottom - R);
                                                    var b = C.getPixelForTick(e) + $.aliasPixel(r);
                                                    g = C.getPixelForTick(e, P.offsetGridLines) + j.labelOffset, s = u = h = f = b, l = B, c = z, d = S.top, p = S.bottom
                                                } else {
                                                    var _, w = "left" === T.position,
                                                        x = j.padding;
                                                    j.mirror ? (m = w ? "left" : "right", _ = x) : (m = w ? "right" : "left", _ = R + x), g = w ? C.right - _ : C.left + _;
                                                    var k = C.getPixelForTick(e);
                                                    k += $.aliasPixel(r), v = C.getPixelForTick(e, P.offsetGridLines), s = D, u = F, h = S.left, f = S.right, l = c = d = p = k
                                                }
                                                L.push({
                                                    tx1: s,
                                                    ty1: l,
                                                    tx2: u,
                                                    ty2: c,
                                                    x1: h,
                                                    y1: d,
                                                    x2: f,
                                                    y2: p,
                                                    labelX: g,
                                                    labelY: v,
                                                    glWidth: r,
                                                    glColor: i,
                                                    glBorderDash: o,
                                                    glBorderDashOffset: a,
                                                    rotation: -1 * O,
                                                    label: t,
                                                    textBaseline: y,
                                                    textAlign: m
                                                })
                                            }
                                        }
                                    }), $.each(L, function(t) {
                                        if (P.display && (i.save(), i.lineWidth = t.glWidth, i.strokeStyle = t.glColor, i.setLineDash && (i.setLineDash(t.glBorderDash), i.lineDashOffset = t.glBorderDashOffset), i.beginPath(), P.drawTicks && (i.moveTo(t.tx1, t.ty1), i.lineTo(t.tx2, t.ty2)), P.drawOnChartArea && (i.moveTo(t.x1, t.y1), i.lineTo(t.x2, t.y2)), i.stroke(), i.restore()), j.display) {
                                            i.save(), i.translate(t.labelX, t.labelY), i.rotate(t.rotation), i.font = o.font, i.textBaseline = t.textBaseline, i.textAlign = t.textAlign;
                                            var e = t.label;
                                            if ($.isArray(e))
                                                for (var n = 0, r = 0; n < e.length; ++n) i.fillText("" + e[n], 0, r), r += 1.5 * o.size;
                                            else i.fillText(e, 0, 0);
                                            i.restore()
                                        }
                                    }), e.display) {
                                    var c, h, d = 0;
                                    if (I) c = C.left + (C.right - C.left) / 2, h = "bottom" === T.position ? C.bottom - s.size / 2 : C.top + s.size / 2;
                                    else {
                                        var f = "left" === T.position;
                                        c = f ? C.left + s.size / 2 : C.right - s.size / 2, h = C.top + (C.bottom - C.top) / 2, d = f ? -.5 * Math.PI : .5 * Math.PI
                                    }
                                    i.save(), i.translate(c, h), i.rotate(d), i.textAlign = "center", i.textBaseline = "middle", i.fillStyle = a, i.font = s.font, i.fillText(e.labelString, 0, 0), i.restore()
                                }
                                if (P.drawBorder) {
                                    i.lineWidth = $.getValueAtIndexOrDefault(P.lineWidth, 0), i.strokeStyle = $.getValueAtIndexOrDefault(P.color, 0);
                                    var p = C.left,
                                        g = C.right,
                                        v = C.top,
                                        m = C.bottom,
                                        y = $.aliasPixel(i.lineWidth);
                                    I ? (v = m = "top" === T.position ? C.bottom : C.top, v += y, m += y) : (p = g = "left" === T.position ? C.right : C.left, p += y, g += y), i.beginPath(), i.moveTo(p, v), i.lineTo(g, m), i.stroke()
                                }
                            }
                        }
                    })
                }
            }, {}],
            32: [function(t, e, n) {
                "use strict";
                e.exports = function(n) {
                    var r = n.helpers;
                    n.scaleService = {
                        constructors: {},
                        defaults: {},
                        registerScaleType: function(t, e, n) {
                            this.constructors[t] = e, this.defaults[t] = r.clone(n)
                        },
                        getScaleConstructor: function(t) {
                            return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0
                        },
                        getScaleDefaults: function(t) {
                            return this.defaults.hasOwnProperty(t) ? r.scaleMerge(n.defaults.scale, this.defaults[t]) : {}
                        },
                        updateScaleDefaults: function(t, e) {
                            var n = this.defaults;
                            n.hasOwnProperty(t) && (n[t] = r.extend(n[t], e))
                        },
                        addScalesToLayout: function(e) {
                            r.each(e.scales, function(t) {
                                t.fullWidth = t.options.fullWidth, t.position = t.options.position, t.weight = t.options.weight, n.layoutService.addBox(e, t)
                            })
                        }
                    }
                }
            }, {}],
            33: [function(t, e, n) {
                "use strict";
                e.exports = function(t) {
                    var c = t.helpers;
                    t.Ticks = {
                        generators: {
                            linear: function(t, e) {
                                var n, r = [];
                                if (t.stepSize && 0 < t.stepSize) n = t.stepSize;
                                else {
                                    var i = c.niceNum(e.max - e.min, !1);
                                    n = c.niceNum(i / (t.maxTicks - 1), !0)
                                }
                                var o = Math.floor(e.min / n) * n,
                                    a = Math.ceil(e.max / n) * n;
                                t.min && t.max && t.stepSize && c.almostWhole((t.max - t.min) / t.stepSize, n / 1e3) && (o = t.min, a = t.max);
                                var s = (a - o) / n;
                                s = c.almostEquals(s, Math.round(s), n / 1e3) ? Math.round(s) : Math.ceil(s), r.push(void 0 !== t.min ? t.min : o);
                                for (var l = 1; l < s; ++l) r.push(o + l * n);
                                return r.push(void 0 !== t.max ? t.max : a), r
                            },
                            logarithmic: function(t, e) {
                                var n, r, i = [],
                                    o = c.getValueOrDefault,
                                    a = o(t.min, Math.pow(10, Math.floor(c.log10(e.min)))),
                                    s = Math.floor(c.log10(e.max)),
                                    l = Math.ceil(e.max / Math.pow(10, s));
                                for (0 === a ? (n = Math.floor(c.log10(e.minNotZero)), r = Math.floor(e.minNotZero / Math.pow(10, n)), i.push(a), a = r * Math.pow(10, n)) : (n = Math.floor(c.log10(a)), r = Math.floor(a / Math.pow(10, n))); i.push(a), 10 === ++r && (r = 1, ++n), a = r * Math.pow(10, n), n < s || n === s && r < l;);
                                var u = o(t.max, a);
                                return i.push(u), i
                            }
                        },
                        formatters: {
                            values: function(t) {
                                return c.isArray(t) ? t : "" + t
                            },
                            linear: function(t, e, n) {
                                var r = 3 < n.length ? n[2] - n[1] : n[1] - n[0];
                                1 < Math.abs(r) && t !== Math.floor(t) && (r = t - Math.floor(t));
                                var i = c.log10(Math.abs(r)),
                                    o = "";
                                if (0 !== t) {
                                    var a = -1 * Math.floor(i);
                                    a = Math.max(Math.min(a, 20), 0), o = t.toFixed(a)
                                } else o = "0";
                                return o
                            },
                            logarithmic: function(t, e, n) {
                                var r = t / Math.pow(10, Math.floor(c.log10(t)));
                                return 0 === t ? "0" : 1 === r || 2 === r || 5 === r || 0 === e || e === n.length - 1 ? t.toExponential() : ""
                            }
                        }
                    }
                }
            }, {}],
            34: [function(t, e, n) {
                "use strict";
                e.exports = function(I) {
                    function d(t, e) {
                        var n = O.color(t);
                        return n.alpha(e * n.alpha()).rgbaString()
                    }

                    function a(t, e) {
                        return e && (O.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t
                    }

                    function R(t) {
                        var e = I.defaults.global,
                            n = O.getValueOrDefault;
                        return {
                            xPadding: t.xPadding,
                            yPadding: t.yPadding,
                            xAlign: t.xAlign,
                            yAlign: t.yAlign,
                            bodyFontColor: t.bodyFontColor,
                            _bodyFontFamily: n(t.bodyFontFamily, e.defaultFontFamily),
                            _bodyFontStyle: n(t.bodyFontStyle, e.defaultFontStyle),
                            _bodyAlign: t.bodyAlign,
                            bodyFontSize: n(t.bodyFontSize, e.defaultFontSize),
                            bodySpacing: t.bodySpacing,
                            titleFontColor: t.titleFontColor,
                            _titleFontFamily: n(t.titleFontFamily, e.defaultFontFamily),
                            _titleFontStyle: n(t.titleFontStyle, e.defaultFontStyle),
                            titleFontSize: n(t.titleFontSize, e.defaultFontSize),
                            _titleAlign: t.titleAlign,
                            titleSpacing: t.titleSpacing,
                            titleMarginBottom: t.titleMarginBottom,
                            footerFontColor: t.footerFontColor,
                            _footerFontFamily: n(t.footerFontFamily, e.defaultFontFamily),
                            _footerFontStyle: n(t.footerFontStyle, e.defaultFontStyle),
                            footerFontSize: n(t.footerFontSize, e.defaultFontSize),
                            _footerAlign: t.footerAlign,
                            footerSpacing: t.footerSpacing,
                            footerMarginTop: t.footerMarginTop,
                            caretSize: t.caretSize,
                            cornerRadius: t.cornerRadius,
                            backgroundColor: t.backgroundColor,
                            opacity: 0,
                            legendColorBackground: t.multiKeyBackground,
                            displayColors: t.displayColors,
                            borderColor: t.borderColor,
                            borderWidth: t.borderWidth
                        }
                    }
                    var O = I.helpers;
                    I.defaults.global.tooltips = {
                        enabled: !0,
                        custom: null,
                        mode: "nearest",
                        position: "average",
                        intersect: !0,
                        backgroundColor: "rgba(0,0,0,0.8)",
                        titleFontStyle: "bold",
                        titleSpacing: 2,
                        titleMarginBottom: 6,
                        titleFontColor: "#fff",
                        titleAlign: "left",
                        bodySpacing: 2,
                        bodyFontColor: "#fff",
                        bodyAlign: "left",
                        footerFontStyle: "bold",
                        footerSpacing: 2,
                        footerMarginTop: 6,
                        footerFontColor: "#fff",
                        footerAlign: "left",
                        yPadding: 6,
                        xPadding: 6,
                        caretPadding: 2,
                        caretSize: 5,
                        cornerRadius: 6,
                        multiKeyBackground: "#fff",
                        displayColors: !0,
                        borderColor: "rgba(0,0,0,0)",
                        borderWidth: 0,
                        callbacks: {
                            beforeTitle: O.noop,
                            title: function(t, e) {
                                var n = "",
                                    r = e.labels,
                                    i = r ? r.length : 0;
                                if (0 < t.length) {
                                    var o = t[0];
                                    o.xLabel ? n = o.xLabel : 0 < i && o.index < i && (n = r[o.index])
                                }
                                return n
                            },
                            afterTitle: O.noop,
                            beforeBody: O.noop,
                            beforeLabel: O.noop,
                            label: function(t, e) {
                                var n = e.datasets[t.datasetIndex].label || "";
                                return n && (n += ": "), n + t.yLabel
                            },
                            labelColor: function(t, e) {
                                var n = e.getDatasetMeta(t.datasetIndex).data[t.index]._view;
                                return {
                                    borderColor: n.borderColor,
                                    backgroundColor: n.backgroundColor
                                }
                            },
                            afterLabel: O.noop,
                            afterBody: O.noop,
                            beforeFooter: O.noop,
                            footer: O.noop,
                            afterFooter: O.noop
                        }
                    }, I.Tooltip = I.Element.extend({
                        initialize: function() {
                            this._model = R(this._options)
                        },
                        getTitle: function() {
                            var t = this._options.callbacks,
                                e = t.beforeTitle.apply(this, arguments),
                                n = t.title.apply(this, arguments),
                                r = t.afterTitle.apply(this, arguments),
                                i = [];
                            return a(i = a(i = a(i, e), n), r)
                        },
                        getBeforeBody: function() {
                            var t = this._options.callbacks.beforeBody.apply(this, arguments);
                            return O.isArray(t) ? t : void 0 !== t ? [t] : []
                        },
                        getBody: function(t, n) {
                            var r = this,
                                i = r._options.callbacks,
                                o = [];
                            return O.each(t, function(t) {
                                var e = {
                                    before: [],
                                    lines: [],
                                    after: []
                                };
                                a(e.before, i.beforeLabel.call(r, t, n)), a(e.lines, i.label.call(r, t, n)), a(e.after, i.afterLabel.call(r, t, n)), o.push(e)
                            }), o
                        },
                        getAfterBody: function() {
                            var t = this._options.callbacks.afterBody.apply(this, arguments);
                            return O.isArray(t) ? t : void 0 !== t ? [t] : []
                        },
                        getFooter: function() {
                            var t = this._options.callbacks,
                                e = t.beforeFooter.apply(this, arguments),
                                n = t.footer.apply(this, arguments),
                                r = t.afterFooter.apply(this, arguments),
                                i = [];
                            return a(i = a(i = a(i, e), n), r)
                        },
                        update: function(t) {
                            var e, n, r, i, o, a, s, l, u, c, h, d, f, p, g, v, m, y, b, _ = this,
                                w = _._options,
                                x = _._model,
                                k = _._model = R(w),
                                S = _._active,
                                C = _._data,
                                T = {
                                    xAlign: x.xAlign,
                                    yAlign: x.yAlign
                                },
                                A = {
                                    x: x.x,
                                    y: x.y
                                },
                                E = {
                                    width: x.width,
                                    height: x.height
                                },
                                j = {
                                    x: x.caretX,
                                    y: x.caretY
                                };
                            if (S.length) {
                                k.opacity = 1;
                                var P = [];
                                j = I.Tooltip.positioners[w.position](S, _._eventPosition);
                                var M = [];
                                for (e = 0, n = S.length; e < n; ++e) M.push((g = S[e], m = v = void 0, v = g._xScale, m = g._yScale || g._scale, y = g._index, b = g._datasetIndex, {
                                    xLabel: v ? v.getLabelForIndex(y, b) : "",
                                    yLabel: m ? m.getLabelForIndex(y, b) : "",
                                    index: y,
                                    datasetIndex: b,
                                    x: g._model.x,
                                    y: g._model.y
                                }));
                                w.filter && (M = M.filter(function(t) {
                                    return w.filter(t, C)
                                })), w.itemSort && (M = M.sort(function(t, e) {
                                    return w.itemSort(t, e, C)
                                })), O.each(M, function(t) {
                                    P.push(w.callbacks.labelColor.call(_, t, _._chart))
                                }), k.title = _.getTitle(M, C), k.beforeBody = _.getBeforeBody(M, C), k.body = _.getBody(M, C), k.afterBody = _.getAfterBody(M, C), k.footer = _.getFooter(M, C), k.x = Math.round(j.x), k.y = Math.round(j.y), k.caretPadding = w.caretPadding, k.labelColors = P, k.dataPoints = M, T = function(t, e) {
                                    var n = t._model,
                                        r = t._chart,
                                        i = t._chart.chartArea,
                                        o = "center",
                                        a = "center";
                                    n.y < e.height ? a = "top" : n.y > r.height - e.height && (a = "bottom");
                                    var s, l, u, c, h, d = (i.left + i.right) / 2,
                                        f = (i.top + i.bottom) / 2;
                                    "center" === a ? (s = function(t) {
                                        return t <= d
                                    }, l = function(t) {
                                        return d < t
                                    }) : (s = function(t) {
                                        return t <= e.width / 2
                                    }, l = function(t) {
                                        return t >= r.width - e.width / 2
                                    }), u = function(t) {
                                        return t + e.width > r.width
                                    }, c = function(t) {
                                        return t - e.width < 0
                                    }, h = function(t) {
                                        return t <= f ? "top" : "bottom"
                                    }, s(n.x) ? (o = "left", u(n.x) && (o = "center", a = h(n.y))) : l(n.x) && (o = "right", c(n.x) && (o = "center", a = h(n.y)));
                                    var p = t._options;
                                    return {
                                        xAlign: p.xAlign ? p.xAlign : o,
                                        yAlign: p.yAlign ? p.yAlign : a
                                    }
                                }(this, E = function(t, e) {
                                    var n = t._chart.ctx,
                                        r = 2 * e.yPadding,
                                        i = 0,
                                        o = e.body,
                                        a = o.reduce(function(t, e) {
                                            return t + e.before.length + e.lines.length + e.after.length
                                        }, 0);
                                    a += e.beforeBody.length + e.afterBody.length;
                                    var s = e.title.length,
                                        l = e.footer.length,
                                        u = e.titleFontSize,
                                        c = e.bodyFontSize,
                                        h = e.footerFontSize;
                                    r += s * u, r += s ? (s - 1) * e.titleSpacing : 0, r += s ? e.titleMarginBottom : 0, r += a * c, r += a ? (a - 1) * e.bodySpacing : 0, r += l ? e.footerMarginTop : 0, r += l * h, r += l ? (l - 1) * e.footerSpacing : 0;
                                    var d = 0,
                                        f = function(t) {
                                            i = Math.max(i, n.measureText(t).width + d)
                                        };
                                    return n.font = O.fontString(u, e._titleFontStyle, e._titleFontFamily), O.each(e.title, f), n.font = O.fontString(c, e._bodyFontStyle, e._bodyFontFamily), O.each(e.beforeBody.concat(e.afterBody), f), d = e.displayColors ? c + 2 : 0, O.each(o, function(t) {
                                        O.each(t.before, f), O.each(t.lines, f), O.each(t.after, f)
                                    }), d = 0, n.font = O.fontString(h, e._footerFontStyle, e._footerFontFamily), O.each(e.footer, f), {
                                        width: i += 2 * e.xPadding,
                                        height: r
                                    }
                                }(this, k)), i = E, o = T, a = (r = k).x, s = r.y, l = r.caretSize, u = r.caretPadding, c = r.cornerRadius, h = o.xAlign, d = o.yAlign, f = l + u, p = c + u, "right" === h ? a -= i.width : "center" === h && (a -= i.width / 2), "top" === d ? s += f : s -= "bottom" === d ? i.height + f : i.height / 2, "center" === d ? "left" === h ? a += f : "right" === h && (a -= f) : "left" === h ? a -= p : "right" === h && (a += p), A = {
                                    x: a,
                                    y: s
                                }
                            } else k.opacity = 0;
                            return k.xAlign = T.xAlign, k.yAlign = T.yAlign, k.x = A.x, k.y = A.y, k.width = E.width, k.height = E.height, k.caretX = j.x, k.caretY = j.y, _._model = k, t && w.custom && w.custom.call(_, k), _
                        },
                        drawCaret: function(t, e) {
                            var n = this._chart.ctx,
                                r = this._view,
                                i = this.getCaretPosition(t, e, r);
                            n.lineTo(i.x1, i.y1), n.lineTo(i.x2, i.y2), n.lineTo(i.x3, i.y3)
                        },
                        getCaretPosition: function(t, e, n) {
                            var r, i, o, a, s, l, u = n.caretSize,
                                c = n.cornerRadius,
                                h = n.xAlign,
                                d = n.yAlign,
                                f = t.x,
                                p = t.y,
                                g = e.width,
                                v = e.height;
                            if ("center" === d) s = p + v / 2, "left" === h ? (i = (r = f) - u, o = r, a = s + u, l = s - u) : (i = (r = f + g) + u, o = r, a = s - u, l = s + u);
                            else if (r = (i = "left" === h ? f + c + u : "right" === h ? f + g - c - u : f + g / 2) - u, o = i + u, "top" === d) s = (a = p) - u, l = a;
                            else {
                                s = (a = p + v) + u, l = a;
                                var m = o;
                                o = r, r = m
                            }
                            return {
                                x1: r,
                                x2: i,
                                x3: o,
                                y1: a,
                                y2: s,
                                y3: l
                            }
                        },
                        drawTitle: function(t, e, n, r) {
                            var i = e.title;
                            if (i.length) {
                                n.textAlign = e._titleAlign, n.textBaseline = "top";
                                var o, a, s = e.titleFontSize,
                                    l = e.titleSpacing;
                                for (n.fillStyle = d(e.titleFontColor, r), n.font = O.fontString(s, e._titleFontStyle, e._titleFontFamily), o = 0, a = i.length; o < a; ++o) n.fillText(i[o], t.x, t.y), t.y += s + l, o + 1 === i.length && (t.y += e.titleMarginBottom - l)
                            }
                        },
                        drawBody: function(n, r, i, o) {
                            var a = r.bodyFontSize,
                                e = r.bodySpacing,
                                t = r.body;
                            i.textAlign = r._bodyAlign, i.textBaseline = "top";
                            var s = d(r.bodyFontColor, o);
                            i.fillStyle = s, i.font = O.fontString(a, r._bodyFontStyle, r._bodyFontFamily);
                            var l = 0,
                                u = function(t) {
                                    i.fillText(t, n.x + l, n.y), n.y += a + e
                                };
                            O.each(r.beforeBody, u);
                            var c = r.displayColors;
                            l = c ? a + 2 : 0, O.each(t, function(t, e) {
                                O.each(t.before, u), O.each(t.lines, function(t) {
                                    c && (i.fillStyle = d(r.legendColorBackground, o), i.fillRect(n.x, n.y, a, a), i.strokeStyle = d(r.labelColors[e].borderColor, o), i.strokeRect(n.x, n.y, a, a), i.fillStyle = d(r.labelColors[e].backgroundColor, o), i.fillRect(n.x + 1, n.y + 1, a - 2, a - 2), i.fillStyle = s), u(t)
                                }), O.each(t.after, u)
                            }), l = 0, O.each(r.afterBody, u), n.y -= e
                        },
                        drawFooter: function(e, n, r, t) {
                            var i = n.footer;
                            i.length && (e.y += n.footerMarginTop, r.textAlign = n._footerAlign, r.textBaseline = "top", r.fillStyle = d(n.footerFontColor, t), r.font = O.fontString(n.footerFontSize, n._footerFontStyle, n._footerFontFamily), O.each(i, function(t) {
                                r.fillText(t, e.x, e.y), e.y += n.footerFontSize + n.footerSpacing
                            }))
                        },
                        drawBackground: function(t, e, n, r, i) {
                            n.fillStyle = d(e.backgroundColor, i), n.strokeStyle = d(e.borderColor, i), n.lineWidth = e.borderWidth;
                            var o = e.xAlign,
                                a = e.yAlign,
                                s = t.x,
                                l = t.y,
                                u = r.width,
                                c = r.height,
                                h = e.cornerRadius;
                            n.beginPath(), n.moveTo(s + h, l), "top" === a && this.drawCaret(t, r), n.lineTo(s + u - h, l), n.quadraticCurveTo(s + u, l, s + u, l + h), "center" === a && "right" === o && this.drawCaret(t, r), n.lineTo(s + u, l + c - h), n.quadraticCurveTo(s + u, l + c, s + u - h, l + c), "bottom" === a && this.drawCaret(t, r), n.lineTo(s + h, l + c), n.quadraticCurveTo(s, l + c, s, l + c - h), "center" === a && "left" === o && this.drawCaret(t, r), n.lineTo(s, l + h), n.quadraticCurveTo(s, l, s + h, l), n.closePath(), n.fill(), 0 < e.borderWidth && n.stroke()
                        },
                        draw: function() {
                            var t = this._chart.ctx,
                                e = this._view;
                            if (0 !== e.opacity) {
                                var n = {
                                        width: e.width,
                                        height: e.height
                                    },
                                    r = {
                                        x: e.x,
                                        y: e.y
                                    },
                                    i = Math.abs(e.opacity < .001) ? 0 : e.opacity,
                                    o = e.title.length || e.beforeBody.length || e.body.length || e.afterBody.length || e.footer.length;
                                this._options.enabled && o && (this.drawBackground(r, e, t, n, i), r.x += e.xPadding, r.y += e.yPadding, this.drawTitle(r, e, t, i), this.drawBody(r, e, t, i), this.drawFooter(r, e, t, i))
                            }
                        },
                        handleEvent: function(t) {
                            var e = this,
                                n = e._options,
                                r = !1;
                            if (e._lastActive = e._lastActive || [], "mouseout" === t.type ? e._active = [] : e._active = e._chart.getElementsAtEventForMode(t, n.mode, n), !(r = !O.arrayEquals(e._active, e._lastActive))) return !1;
                            if (e._lastActive = e._active, n.enabled || n.custom) {
                                e._eventPosition = {
                                    x: t.x,
                                    y: t.y
                                };
                                var i = e._model;
                                e.update(!0), e.pivot(), r |= i.x !== e._model.x || i.y !== e._model.y
                            }
                            return r
                        }
                    }), I.Tooltip.positioners = {
                        average: function(t) {
                            if (!t.length) return !1;
                            var e, n, r = 0,
                                i = 0,
                                o = 0;
                            for (e = 0, n = t.length; e < n; ++e) {
                                var a = t[e];
                                if (a && a.hasValue()) {
                                    var s = a.tooltipPosition();
                                    r += s.x, i += s.y, ++o
                                }
                            }
                            return {
                                x: Math.round(r / o),
                                y: Math.round(i / o)
                            }
                        },
                        nearest: function(t, e) {
                            var n, r, i, o = e.x,
                                a = e.y,
                                s = Number.POSITIVE_INFINITY;
                            for (r = 0, i = t.length; r < i; ++r) {
                                var l = t[r];
                                if (l && l.hasValue()) {
                                    var u = l.getCenterPoint(),
                                        c = O.distanceBetweenPoints(e, u);
                                    c < s && (s = c, n = l)
                                }
                            }
                            if (n) {
                                var h = n.tooltipPosition();
                                o = h.x, a = h.y
                            }
                            return {
                                x: o,
                                y: a
                            }
                        }
                    }
                }
            }, {}],
            35: [function(t, e, n) {
                "use strict";
                e.exports = function(t) {
                    var c = t.helpers,
                        e = t.defaults.global;
                    e.elements.arc = {
                        backgroundColor: e.defaultColor,
                        borderColor: "#fff",
                        borderWidth: 2
                    }, t.elements.Arc = t.Element.extend({
                        inLabelRange: function(t) {
                            var e = this._view;
                            return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2)
                        },
                        inRange: function(t, e) {
                            var n = this._view;
                            if (n) {
                                for (var r = c.getAngleFromPoint(n, {
                                        x: t,
                                        y: e
                                    }), i = r.angle, o = r.distance, a = n.startAngle, s = n.endAngle; s < a;) s += 2 * Math.PI;
                                for (; s < i;) i -= 2 * Math.PI;
                                for (; i < a;) i += 2 * Math.PI;
                                var l = a <= i && i <= s,
                                    u = o >= n.innerRadius && o <= n.outerRadius;
                                return l && u
                            }
                            return !1
                        },
                        getCenterPoint: function() {
                            var t = this._view,
                                e = (t.startAngle + t.endAngle) / 2,
                                n = (t.innerRadius + t.outerRadius) / 2;
                            return {
                                x: t.x + Math.cos(e) * n,
                                y: t.y + Math.sin(e) * n
                            }
                        },
                        getArea: function() {
                            var t = this._view;
                            return Math.PI * ((t.endAngle - t.startAngle) / (2 * Math.PI)) * (Math.pow(t.outerRadius, 2) - Math.pow(t.innerRadius, 2))
                        },
                        tooltipPosition: function() {
                            var t = this._view,
                                e = t.startAngle + (t.endAngle - t.startAngle) / 2,
                                n = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius;
                            return {
                                x: t.x + Math.cos(e) * n,
                                y: t.y + Math.sin(e) * n
                            }
                        },
                        draw: function() {
                            var t = this._chart.ctx,
                                e = this._view,
                                n = e.startAngle,
                                r = e.endAngle;
                            t.beginPath(), t.arc(e.x, e.y, e.outerRadius, n, r), t.arc(e.x, e.y, e.innerRadius, r, n, !0), t.closePath(), t.strokeStyle = e.borderColor, t.lineWidth = e.borderWidth, t.fillStyle = e.backgroundColor, t.fill(), t.lineJoin = "bevel", e.borderWidth && t.stroke()
                        }
                    })
                }
            }, {}],
            36: [function(t, e, n) {
                "use strict";
                e.exports = function(t) {
                    var c = t.helpers,
                        h = t.defaults.global;
                    t.defaults.global.elements.line = {
                        tension: .4,
                        backgroundColor: h.defaultColor,
                        borderWidth: 3,
                        borderColor: h.defaultColor,
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0,
                        borderJoinStyle: "miter",
                        capBezierPoints: !0,
                        fill: !0
                    }, t.elements.Line = t.Element.extend({
                        draw: function() {
                            var t, e, n, r, i = this._view,
                                o = this._chart.ctx,
                                a = i.spanGaps,
                                s = this._children.slice(),
                                l = h.elements.line,
                                u = -1;
                            for (this._loop && s.length && s.push(s[0]), o.save(), o.lineCap = i.borderCapStyle || l.borderCapStyle, o.setLineDash && o.setLineDash(i.borderDash || l.borderDash), o.lineDashOffset = i.borderDashOffset || l.borderDashOffset, o.lineJoin = i.borderJoinStyle || l.borderJoinStyle, o.lineWidth = i.borderWidth || l.borderWidth, o.strokeStyle = i.borderColor || h.defaultColor, o.beginPath(), u = -1, t = 0; t < s.length; ++t) e = s[t], n = c.previousItem(s, t), r = e._view, 0 === t ? r.skip || (o.moveTo(r.x, r.y), u = t) : (n = -1 === u ? n : s[u], r.skip || (u !== t - 1 && !a || -1 === u ? o.moveTo(r.x, r.y) : c.canvas.lineTo(o, n._view, e._view), u = t));
                            o.stroke(), o.restore()
                        }
                    })
                }
            }, {}],
            37: [function(t, e, n) {
                "use strict";
                e.exports = function(c) {
                    function t(t) {
                        var e = this._view;
                        return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hitRadius, 2)
                    }
                    var h = c.helpers,
                        d = c.defaults.global,
                        f = d.defaultColor;
                    d.elements.point = {
                        radius: 3,
                        pointStyle: "circle",
                        backgroundColor: f,
                        borderWidth: 1,
                        borderColor: f,
                        hitRadius: 1,
                        hoverRadius: 4,
                        hoverBorderWidth: 1
                    }, c.elements.Point = c.Element.extend({
                        inRange: function(t, e) {
                            var n = this._view;
                            return !!n && Math.pow(t - n.x, 2) + Math.pow(e - n.y, 2) < Math.pow(n.hitRadius + n.radius, 2)
                        },
                        inLabelRange: t,
                        inXRange: t,
                        inYRange: function(t) {
                            var e = this._view;
                            return !!e && Math.pow(t - e.y, 2) < Math.pow(e.radius + e.hitRadius, 2)
                        },
                        getCenterPoint: function() {
                            var t = this._view;
                            return {
                                x: t.x,
                                y: t.y
                            }
                        },
                        getArea: function() {
                            return Math.PI * Math.pow(this._view.radius, 2)
                        },
                        tooltipPosition: function() {
                            var t = this._view;
                            return {
                                x: t.x,
                                y: t.y,
                                padding: t.radius + t.borderWidth
                            }
                        },
                        draw: function(t) {
                            var e = this._view,
                                n = this._model,
                                r = this._chart.ctx,
                                i = e.pointStyle,
                                o = e.radius,
                                a = e.x,
                                s = e.y,
                                l = c.helpers.color,
                                u = 0;
                            e.skip || (r.strokeStyle = e.borderColor || f, r.lineWidth = h.getValueOrDefault(e.borderWidth, d.elements.point.borderWidth), r.fillStyle = e.backgroundColor || f, void 0 !== t && (n.x < t.left || 1.01 * t.right < n.x || n.y < t.top || 1.01 * t.bottom < n.y) && (n.x < t.left ? u = (a - n.x) / (t.left - n.x) : 1.01 * t.right < n.x ? u = (n.x - a) / (n.x - t.right) : n.y < t.top ? u = (s - n.y) / (t.top - n.y) : 1.01 * t.bottom < n.y && (u = (n.y - s) / (n.y - t.bottom)), u = Math.round(100 * u) / 100, r.strokeStyle = l(r.strokeStyle).alpha(u).rgbString(), r.fillStyle = l(r.fillStyle).alpha(u).rgbString()), c.canvasHelpers.drawPoint(r, i, o, a, s))
                        }
                    })
                }
            }, {}],
            38: [function(t, e, n) {
                "use strict";
                e.exports = function(t) {
                    function l(t) {
                        return void 0 !== t._view.width
                    }

                    function i(t) {
                        var e, n, r, i, o = t._view;
                        if (l(t)) {
                            var a = o.width / 2;
                            e = o.x - a, n = o.x + a, r = Math.min(o.y, o.base), i = Math.max(o.y, o.base)
                        } else {
                            var s = o.height / 2;
                            e = Math.min(o.x, o.base), n = Math.max(o.x, o.base), r = o.y - s, i = o.y + s
                        }
                        return {
                            left: e,
                            top: r,
                            right: n,
                            bottom: i
                        }
                    }
                    var e = t.defaults.global;
                    e.elements.rectangle = {
                        backgroundColor: e.defaultColor,
                        borderWidth: 0,
                        borderColor: e.defaultColor,
                        borderSkipped: "bottom"
                    }, t.elements.Rectangle = t.Element.extend({
                        draw: function() {
                            function t(t) {
                                return m[(y + t) % 4]
                            }
                            var e, n, r, i, o, a, s, l = this._chart.ctx,
                                u = this._view,
                                c = u.borderWidth;
                            if (u.horizontal ? (e = u.base, n = u.x, r = u.y - u.height / 2, i = u.y + u.height / 2, o = e < n ? 1 : -1, a = 1, s = u.borderSkipped || "left") : (e = u.x - u.width / 2, n = u.x + u.width / 2, o = 1, a = (r = u.y) < (i = u.base) ? 1 : -1, s = u.borderSkipped || "bottom"), c) {
                                var h = Math.min(Math.abs(e - n), Math.abs(r - i)),
                                    d = (c = h < c ? h : c) / 2,
                                    f = e + ("left" !== s ? d * o : 0),
                                    p = n + ("right" !== s ? -d * o : 0),
                                    g = r + ("top" !== s ? d * a : 0),
                                    v = i + ("bottom" !== s ? -d * a : 0);
                                f !== p && (r = g, i = v), g !== v && (e = f, n = p)
                            }
                            l.beginPath(), l.fillStyle = u.backgroundColor, l.strokeStyle = u.borderColor, l.lineWidth = c;
                            var m = [
                                    [e, i],
                                    [e, r],
                                    [n, r],
                                    [n, i]
                                ],
                                y = ["bottom", "left", "top", "right"].indexOf(s, 0); - 1 === y && (y = 0);
                            var b = t(0);
                            l.moveTo(b[0], b[1]);
                            for (var _ = 1; _ < 4; _++) b = t(_), l.lineTo(b[0], b[1]);
                            l.fill(), c && l.stroke()
                        },
                        height: function() {
                            var t = this._view;
                            return t.base - t.y
                        },
                        inRange: function(t, e) {
                            var n = !1;
                            if (this._view) {
                                var r = i(this);
                                n = t >= r.left && t <= r.right && e >= r.top && e <= r.bottom
                            }
                            return n
                        },
                        inLabelRange: function(t, e) {
                            if (!this._view) return !1;
                            var n = i(this);
                            return l(this) ? t >= n.left && t <= n.right : e >= n.top && e <= n.bottom
                        },
                        inXRange: function(t) {
                            var e = i(this);
                            return t >= e.left && t <= e.right
                        },
                        inYRange: function(t) {
                            var e = i(this);
                            return t >= e.top && t <= e.bottom
                        },
                        getCenterPoint: function() {
                            var t, e, n = this._view;
                            return l(this) ? (t = n.x, e = (n.y + n.base) / 2) : (t = (n.x + n.base) / 2, e = n.y), {
                                x: t,
                                y: e
                            }
                        },
                        getArea: function() {
                            var t = this._view;
                            return t.width * Math.abs(t.y - t.base)
                        },
                        tooltipPosition: function() {
                            var t = this._view;
                            return {
                                x: t.x,
                                y: t.y
                            }
                        }
                    })
                }
            }, {}],
            39: [function(t, e, n) {
                "use strict";
                e.exports = function(t) {
                    function s(t, e) {
                        var n = u.getStyle(t, e),
                            r = n && n.match(/^(\d+)(\.\d+)?px$/);
                        return r ? Number(r[1]) : void 0
                    }

                    function l(t, e, n, r, i) {
                        return {
                            type: t,
                            chart: e,
                            native: i || null,
                            x: void 0 !== n ? n : null,
                            y: void 0 !== r ? r : null
                        }
                    }

                    function i(t, e, n) {
                        var r, i, o = t._chartjs = {
                            ticking: !1
                        };
                        o.resizer = (r = function() {
                            o.ticking || (o.ticking = !0, u.requestAnimFrame.call(window, function() {
                                if (o.resizer) return o.ticking = !1, e(l("resize", n))
                            }))
                        }, (i = document.createElement("iframe")).className = "chartjs-hidden-iframe", i.style.cssText = "display:block;overflow:hidden;border:0;margin:0;top:0;left:0;bottom:0;right:0;height:100%;width:100%;position:absolute;pointer-events:none;z-index:-1;", i.tabIndex = -1, u.addEvent(i, "load", function() {
                            u.addEvent(i.contentWindow || i, "resize", r), r()
                        }), i), t.insertBefore(o.resizer, t.firstChild)
                    }
                    var u = t.helpers,
                        c = {
                            touchstart: "mousedown",
                            touchmove: "mousemove",
                            touchend: "mouseup",
                            pointerenter: "mouseenter",
                            pointerdown: "mousedown",
                            pointermove: "mousemove",
                            pointerup: "mouseup",
                            pointerleave: "mouseout",
                            pointerout: "mouseout"
                        };
                    return {
                        acquireContext: function(t, e) {
                            "string" == typeof t ? t = document.getElementById(t) : t.length && (t = t[0]), t && t.canvas && (t = t.canvas);
                            var n = t && t.getContext && t.getContext("2d");
                            return n && n.canvas === t ? (function(t, e) {
                                var n = t.style,
                                    r = t.getAttribute("height"),
                                    i = t.getAttribute("width");
                                if (t._chartjs = {
                                        initial: {
                                            height: r,
                                            width: i,
                                            style: {
                                                display: n.display,
                                                height: n.height,
                                                width: n.width
                                            }
                                        }
                                    }, n.display = n.display || "block", null === i || "" === i) {
                                    var o = s(t, "width");
                                    void 0 !== o && (t.width = o)
                                }
                                if (null === r || "" === r)
                                    if ("" === t.style.height) t.height = t.width / (e.options.aspectRatio || 2);
                                    else {
                                        var a = s(t, "height");
                                        void 0 !== o && (t.height = a)
                                    }
                            }(t, e), n) : null
                        },
                        releaseContext: function(t) {
                            var n = t.canvas;
                            if (n._chartjs) {
                                var r = n._chartjs.initial;
                                ["height", "width"].forEach(function(t) {
                                    var e = r[t];
                                    null == e ? n.removeAttribute(t) : n.setAttribute(t, e)
                                }), u.each(r.style || {}, function(t, e) {
                                    n.style[e] = t
                                }), n.width = n.width, delete n._chartjs
                            }
                        },
                        addEventListener: function(o, t, a) {
                            var e = o.canvas;
                            if ("resize" !== t) {
                                var n = a._chartjs || (a._chartjs = {}),
                                    r = (n.proxies || (n.proxies = {}))[o.id + "_" + t] = function(t) {
                                        var e, n, r, i;
                                        a((n = o, r = c[(e = t).type] || e.type, i = u.getRelativePosition(e, n), l(r, n, i.x, i.y, e)))
                                    };
                                u.addEvent(e, t, r)
                            } else i(e.parentNode, a, o)
                        },
                        removeEventListener: function(t, e, n) {
                            var r = t.canvas;
                            if ("resize" !== e) {
                                var i = ((n._chartjs || {}).proxies || {})[t.id + "_" + e];
                                i && u.removeEvent(r, e, i)
                            } else ! function(t) {
                                if (t && t._chartjs) {
                                    var e = t._chartjs.resizer;
                                    e && (e.parentNode.removeChild(e), t._chartjs.resizer = null), delete t._chartjs
                                }
                            }(r.parentNode)
                        }
                    }
                }
            }, {}],
            40: [function(t, e, n) {
                "use strict";
                var r = t(39);
                e.exports = function(t) {
                    t.platform = {
                        acquireContext: function() {},
                        releaseContext: function() {},
                        addEventListener: function() {},
                        removeEventListener: function() {}
                    }, t.helpers.extend(t.platform, r(t))
                }
            }, {
                39: 39
            }],
            41: [function(t, e, n) {
                "use strict";
                e.exports = function(d) {
                    function f(t, e, n) {
                        var r, i = t._model || {},
                            o = i.fill;
                        if (void 0 === o && (o = !!i.backgroundColor), !1 === o || null === o) return !1;
                        if (!0 === o) return "origin";
                        if (r = parseFloat(o, 10), isFinite(r) && Math.floor(r) === r) return "-" !== o[0] && "+" !== o[0] || (r = e + r), !(r === e || r < 0 || n <= r) && r;
                        switch (o) {
                            case "bottom":
                                return "start";
                            case "top":
                                return "end";
                            case "zero":
                                return "origin";
                            case "origin":
                            case "start":
                            case "end":
                                return o;
                            default:
                                return !1
                        }
                    }

                    function p(t) {
                        var e, n = t.el._model || {},
                            r = t.el._scale || {},
                            i = t.fill,
                            o = null;
                        if (isFinite(i)) return null;
                        if ("start" === i ? o = void 0 === n.scaleBottom ? r.bottom : n.scaleBottom : "end" === i ? o = void 0 === n.scaleTop ? r.top : n.scaleTop : void 0 !== n.scaleZero ? o = n.scaleZero : r.getBasePosition ? o = r.getBasePosition() : r.getBasePixel && (o = r.getBasePixel()), null != o) {
                            if (void 0 !== o.x && void 0 !== o.y) return o;
                            if ("number" == typeof o && isFinite(o)) return {
                                x: (e = r.isHorizontal()) ? o : null,
                                y: e ? null : o
                            }
                        }
                        return null
                    }

                    function g(t, e, n) {
                        var r, i = t[e].fill,
                            o = [e];
                        if (!n) return i;
                        for (; !1 !== i && -1 === o.indexOf(i);) {
                            if (!isFinite(i)) return i;
                            if (!(r = t[i])) return !1;
                            if (r.visible) return i;
                            o.push(i), i = r.fill
                        }
                        return !1
                    }

                    function b(t) {
                        return t && !t.skip
                    }

                    function _(t, e, n, r, i) {
                        var o;
                        if (r && i) {
                            for (t.moveTo(e[0].x, e[0].y), o = 1; o < r; ++o) a.canvas.lineTo(t, e[o - 1], e[o]);
                            for (t.lineTo(n[i - 1].x, n[i - 1].y), o = i - 1; 0 < o; --o) a.canvas.lineTo(t, n[o], n[o - 1], !0)
                        }
                    }
                    d.defaults.global.plugins.filler = {
                        propagate: !0
                    };
                    var l = d.defaults,
                        a = d.helpers,
                        v = {
                            dataset: function(t) {
                                var e = t.fill,
                                    n = t.chart,
                                    r = n.getDatasetMeta(e),
                                    i = r && n.isDatasetVisible(e) && r.dataset._children || [];
                                return i.length ? function(t, e) {
                                    return i[e]._view || null
                                } : null
                            },
                            boundary: function(t) {
                                var e = t.boundary,
                                    n = e ? e.x : null,
                                    r = e ? e.y : null;
                                return function(t) {
                                    return {
                                        x: null === n ? t.x : n,
                                        y: null === r ? t.y : r
                                    }
                                }
                            }
                        };
                    return {
                        id: "filler",
                        afterDatasetsUpdate: function(t, e) {
                            var n, r, i, o, a, s, l, u = (t.data.datasets || []).length,
                                c = e.propagate,
                                h = [];
                            for (r = 0; r < u; ++r) o = null, (i = (n = t.getDatasetMeta(r)).dataset) && i._model && i instanceof d.elements.Line && (o = {
                                visible: t.isDatasetVisible(r),
                                fill: f(i, r, u),
                                chart: t,
                                el: i
                            }), n.$filler = o, h.push(o);
                            for (r = 0; r < u; ++r)(o = h[r]) && (o.fill = g(h, r, c), o.boundary = p(o), o.mapper = (l = void 0, s = (a = o).fill, !(l = "dataset") === s ? null : (isFinite(s) || (l = "boundary"), v[l](a))))
                        },
                        beforeDatasetDraw: function(t, e) {
                            var n = e.meta.$filler;
                            if (n) {
                                var r = n.el,
                                    i = r._view,
                                    o = r._children || [],
                                    a = n.mapper,
                                    s = i.backgroundColor || l.global.defaultColor;
                                a && s && o.length && function(t, e, n, r, i, o) {
                                    var a, s, l, u, c, h, d, f = e.length,
                                        p = r.spanGaps,
                                        g = [],
                                        v = [],
                                        m = 0,
                                        y = 0;
                                    for (t.beginPath(), a = 0, s = f + !!o; a < s; ++a) c = n(u = e[l = a % f]._view, l, r), h = b(u), d = b(c), h && d ? (m = g.push(u), y = v.push(c)) : m && y && (p ? (h && g.push(u), d && v.push(c)) : (_(t, g, v, m, y), m = y = 0, g = [], v = []));
                                    _(t, g, v, m, y), t.closePath(), t.fillStyle = i, t.fill()
                                }(t.ctx, o, a, i, s, r._loop)
                            }
                        }
                    }
                }
            }, {}],
            42: [function(t, e, n) {
                "use strict";
                e.exports = function(C) {
                    function T(t, e) {
                        return t.usePointStyle ? e * Math.SQRT2 : t.boxWidth
                    }

                    function r(t, e) {
                        var n = new C.Legend({
                            ctx: t.ctx,
                            options: e,
                            chart: t
                        });
                        i.configure(t, n, e), i.addBox(t, n), t.legend = n
                    }
                    var A = C.helpers,
                        i = C.layoutService,
                        t = A.noop;
                    return C.defaults.global.legend = {
                        display: !0,
                        position: "top",
                        fullWidth: !0,
                        reverse: !1,
                        weight: 1e3,
                        onClick: function(t, e) {
                            var n = e.datasetIndex,
                                r = this.chart,
                                i = r.getDatasetMeta(n);
                            i.hidden = null === i.hidden ? !r.data.datasets[n].hidden : null, r.update()
                        },
                        onHover: null,
                        labels: {
                            boxWidth: 40,
                            padding: 10,
                            generateLabels: function(n) {
                                var t = n.data;
                                return A.isArray(t.datasets) ? t.datasets.map(function(t, e) {
                                    return {
                                        text: t.label,
                                        fillStyle: A.isArray(t.backgroundColor) ? t.backgroundColor[0] : t.backgroundColor,
                                        hidden: !n.isDatasetVisible(e),
                                        lineCap: t.borderCapStyle,
                                        lineDash: t.borderDash,
                                        lineDashOffset: t.borderDashOffset,
                                        lineJoin: t.borderJoinStyle,
                                        lineWidth: t.borderWidth,
                                        strokeStyle: t.borderColor,
                                        pointStyle: t.pointStyle,
                                        datasetIndex: e
                                    }
                                }, this) : []
                            }
                        }
                    }, C.Legend = C.Element.extend({
                        initialize: function(t) {
                            A.extend(this, t), this.legendHitBoxes = [], this.doughnutMode = !1
                        },
                        beforeUpdate: t,
                        update: function(t, e, n) {
                            var r = this;
                            return r.beforeUpdate(), r.maxWidth = t, r.maxHeight = e, r.margins = n, r.beforeSetDimensions(), r.setDimensions(), r.afterSetDimensions(), r.beforeBuildLabels(), r.buildLabels(), r.afterBuildLabels(), r.beforeFit(), r.fit(), r.afterFit(), r.afterUpdate(), r.minSize
                        },
                        afterUpdate: t,
                        beforeSetDimensions: t,
                        setDimensions: function() {
                            var t = this;
                            t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = {
                                width: 0,
                                height: 0
                            }
                        },
                        afterSetDimensions: t,
                        beforeBuildLabels: t,
                        buildLabels: function() {
                            var e = this,
                                n = e.options.labels,
                                t = n.generateLabels.call(e, e.chart);
                            n.filter && (t = t.filter(function(t) {
                                return n.filter(t, e.chart.data)
                            })), e.options.reverse && t.reverse(), e.legendItems = t
                        },
                        afterBuildLabels: t,
                        beforeFit: t,
                        fit: function() {
                            var r = this,
                                t = r.options,
                                i = t.labels,
                                e = t.display,
                                o = r.ctx,
                                n = C.defaults.global,
                                a = A.getValueOrDefault,
                                s = a(i.fontSize, n.defaultFontSize),
                                l = a(i.fontStyle, n.defaultFontStyle),
                                u = a(i.fontFamily, n.defaultFontFamily),
                                c = A.fontString(s, l, u),
                                h = r.legendHitBoxes = [],
                                d = r.minSize,
                                f = r.isHorizontal();
                            if (f ? (d.width = r.maxWidth, d.height = e ? 10 : 0) : (d.width = e ? 10 : 0, d.height = r.maxHeight), e)
                                if (o.font = c, f) {
                                    var p = r.lineWidths = [0],
                                        g = r.legendItems.length ? s + i.padding : 0;
                                    o.textAlign = "left", o.textBaseline = "top", A.each(r.legendItems, function(t, e) {
                                        var n = T(i, s) + s / 2 + o.measureText(t.text).width;
                                        p[p.length - 1] + n + i.padding >= r.width && (g += s + i.padding, p[p.length] = r.left), h[e] = {
                                            left: 0,
                                            top: 0,
                                            width: n,
                                            height: s
                                        }, p[p.length - 1] += n + i.padding
                                    }), d.height += g
                                } else {
                                    var v = i.padding,
                                        m = r.columnWidths = [],
                                        y = i.padding,
                                        b = 0,
                                        _ = 0,
                                        w = s + v;
                                    A.each(r.legendItems, function(t, e) {
                                        var n = T(i, s) + s / 2 + o.measureText(t.text).width;
                                        _ + w > d.height && (y += b + i.padding, m.push(b), _ = b = 0), b = Math.max(b, n), _ += w, h[e] = {
                                            left: 0,
                                            top: 0,
                                            width: n,
                                            height: s
                                        }
                                    }), y += b, m.push(b), d.width += y
                                }
                            r.width = d.width, r.height = d.height
                        },
                        afterFit: t,
                        isHorizontal: function() {
                            return "top" === this.options.position || "bottom" === this.options.position
                        },
                        draw: function() {
                            var c = this,
                                h = c.options,
                                d = h.labels,
                                f = C.defaults.global,
                                p = f.elements.line,
                                g = c.width,
                                v = c.lineWidths;
                            if (h.display) {
                                var m, y = c.ctx,
                                    b = A.getValueOrDefault,
                                    t = b(d.fontColor, f.defaultFontColor),
                                    _ = b(d.fontSize, f.defaultFontSize),
                                    e = b(d.fontStyle, f.defaultFontStyle),
                                    n = b(d.fontFamily, f.defaultFontFamily),
                                    r = A.fontString(_, e, n);
                                y.textAlign = "left", y.textBaseline = "top", y.lineWidth = .5, y.strokeStyle = t, y.fillStyle = t, y.font = r;
                                var w = T(d, _),
                                    x = c.legendHitBoxes,
                                    k = c.isHorizontal();
                                m = k ? {
                                    x: c.left + (g - v[0]) / 2,
                                    y: c.top + d.padding,
                                    line: 0
                                } : {
                                    x: c.left + d.padding,
                                    y: c.top + d.padding,
                                    line: 0
                                };
                                var S = _ + d.padding;
                                A.each(c.legendItems, function(t, e) {
                                    var n, r, i, o, a = y.measureText(t.text).width,
                                        s = w + _ / 2 + a,
                                        l = m.x,
                                        u = m.y;
                                    k ? g <= l + s && (u = m.y += S, m.line++, l = m.x = c.left + (g - v[m.line]) / 2) : u + S > c.bottom && (l = m.x = l + c.columnWidths[m.line] + d.padding, u = m.y = c.top + d.padding, m.line++),
                                        function(t, e, n) {
                                            if (!(isNaN(w) || w <= 0)) {
                                                y.save(), y.fillStyle = b(n.fillStyle, f.defaultColor), y.lineCap = b(n.lineCap, p.borderCapStyle), y.lineDashOffset = b(n.lineDashOffset, p.borderDashOffset), y.lineJoin = b(n.lineJoin, p.borderJoinStyle), y.lineWidth = b(n.lineWidth, p.borderWidth), y.strokeStyle = b(n.strokeStyle, f.defaultColor);
                                                var r = 0 === b(n.lineWidth, p.borderWidth);
                                                if (y.setLineDash && y.setLineDash(b(n.lineDash, p.borderDash)), h.labels && h.labels.usePointStyle) {
                                                    var i = _ * Math.SQRT2 / 2,
                                                        o = i / Math.SQRT2,
                                                        a = t + o,
                                                        s = e + o;
                                                    C.canvasHelpers.drawPoint(y, n.pointStyle, i, a, s)
                                                } else r || y.strokeRect(t, e, w, _), y.fillRect(t, e, w, _);
                                                y.restore()
                                            }
                                        }(l, u, t), x[e].left = l, x[e].top = u, n = l, r = u, i = t, o = a, y.fillText(i.text, w + _ / 2 + n, r), i.hidden && (y.beginPath(), y.lineWidth = 2, y.moveTo(w + _ / 2 + n, r + _ / 2), y.lineTo(w + _ / 2 + n + o, r + _ / 2), y.stroke()), k ? m.x += s + d.padding : m.y += S
                                })
                            }
                        },
                        handleEvent: function(t) {
                            var e = this,
                                n = e.options,
                                r = "mouseup" === t.type ? "click" : t.type,
                                i = !1;
                            if ("mousemove" === r) {
                                if (!n.onHover) return
                            } else {
                                if ("click" !== r) return;
                                if (!n.onClick) return
                            }
                            var o = t.x,
                                a = t.y;
                            if (o >= e.left && o <= e.right && a >= e.top && a <= e.bottom)
                                for (var s = e.legendHitBoxes, l = 0; l < s.length; ++l) {
                                    var u = s[l];
                                    if (o >= u.left && o <= u.left + u.width && a >= u.top && a <= u.top + u.height) {
                                        if ("click" === r) {
                                            n.onClick.call(e, t.native, e.legendItems[l]), i = !0;
                                            break
                                        }
                                        if ("mousemove" === r) {
                                            n.onHover.call(e, t.native, e.legendItems[l]), i = !0;
                                            break
                                        }
                                    }
                                }
                            return i
                        }
                    }), {
                        id: "legend",
                        beforeInit: function(t) {
                            var e = t.options.legend;
                            e && r(t, e)
                        },
                        beforeUpdate: function(t) {
                            var e = t.options.legend,
                                n = t.legend;
                            e ? (e = A.configMerge(C.defaults.global.legend, e), n ? (i.configure(t, n, e), n.options = e) : r(t, e)) : n && (i.removeBox(t, n), delete t.legend)
                        },
                        afterEvent: function(t, e) {
                            var n = t.legend;
                            n && n.handleEvent(e)
                        }
                    }
                }
            }, {}],
            43: [function(t, e, n) {
                "use strict";
                e.exports = function(m) {
                    function r(t, e) {
                        var n = new m.Title({
                            ctx: t.ctx,
                            options: e,
                            chart: t
                        });
                        i.configure(t, n, e), i.addBox(t, n), t.titleBlock = n
                    }
                    var y = m.helpers,
                        i = m.layoutService,
                        t = y.noop;
                    return m.defaults.global.title = {
                        display: !1,
                        position: "top",
                        fullWidth: !0,
                        weight: 2e3,
                        fontStyle: "bold",
                        padding: 10,
                        text: ""
                    }, m.Title = m.Element.extend({
                        initialize: function(t) {
                            y.extend(this, t), this.legendHitBoxes = []
                        },
                        beforeUpdate: t,
                        update: function(t, e, n) {
                            var r = this;
                            return r.beforeUpdate(), r.maxWidth = t, r.maxHeight = e, r.margins = n, r.beforeSetDimensions(), r.setDimensions(), r.afterSetDimensions(), r.beforeBuildLabels(), r.buildLabels(), r.afterBuildLabels(), r.beforeFit(), r.fit(), r.afterFit(), r.afterUpdate(), r.minSize
                        },
                        afterUpdate: t,
                        beforeSetDimensions: t,
                        setDimensions: function() {
                            var t = this;
                            t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = {
                                width: 0,
                                height: 0
                            }
                        },
                        afterSetDimensions: t,
                        beforeBuildLabels: t,
                        buildLabels: t,
                        afterBuildLabels: t,
                        beforeFit: t,
                        fit: function() {
                            var t = this,
                                e = y.getValueOrDefault,
                                n = t.options,
                                r = m.defaults.global,
                                i = n.display,
                                o = e(n.fontSize, r.defaultFontSize),
                                a = t.minSize;
                            t.isHorizontal() ? (a.width = t.maxWidth, a.height = i ? o + 2 * n.padding : 0) : (a.width = i ? o + 2 * n.padding : 0, a.height = t.maxHeight), t.width = a.width, t.height = a.height
                        },
                        afterFit: t,
                        isHorizontal: function() {
                            var t = this.options.position;
                            return "top" === t || "bottom" === t
                        },
                        draw: function() {
                            var t = this,
                                e = t.ctx,
                                n = y.getValueOrDefault,
                                r = t.options,
                                i = m.defaults.global;
                            if (r.display) {
                                var o, a, s, l = n(r.fontSize, i.defaultFontSize),
                                    u = n(r.fontStyle, i.defaultFontStyle),
                                    c = n(r.fontFamily, i.defaultFontFamily),
                                    h = y.fontString(l, u, c),
                                    d = 0,
                                    f = t.top,
                                    p = t.left,
                                    g = t.bottom,
                                    v = t.right;
                                e.fillStyle = n(r.fontColor, i.defaultFontColor), e.font = h, t.isHorizontal() ? (o = p + (v - p) / 2, a = f + (g - f) / 2, s = v - p) : (o = "left" === r.position ? p + l / 2 : v - l / 2, a = f + (g - f) / 2, s = g - f, d = Math.PI * ("left" === r.position ? -.5 : .5)), e.save(), e.translate(o, a), e.rotate(d), e.textAlign = "center", e.textBaseline = "middle", e.fillText(r.text, 0, 0, s), e.restore()
                            }
                        }
                    }), {
                        id: "title",
                        beforeInit: function(t) {
                            var e = t.options.title;
                            e && r(t, e)
                        },
                        beforeUpdate: function(t) {
                            var e = t.options.title,
                                n = t.titleBlock;
                            e ? (e = y.configMerge(m.defaults.global.title, e), n ? (i.configure(t, n, e), n.options = e) : r(t, e)) : n && (m.layoutService.removeBox(t, n), delete t.titleBlock)
                        }
                    }
                }
            }, {}],
            44: [function(t, e, n) {
                "use strict";
                e.exports = function(t) {
                    var r = t.helpers,
                        e = t.Scale.extend({
                            getLabels: function() {
                                var t = this.chart.data;
                                return (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels
                            },
                            determineDataLimits: function() {
                                var t, e = this,
                                    n = e.getLabels();
                                e.minIndex = 0, e.maxIndex = n.length - 1, void 0 !== e.options.ticks.min && (t = r.indexOf(n, e.options.ticks.min), e.minIndex = -1 !== t ? t : e.minIndex), void 0 !== e.options.ticks.max && (t = r.indexOf(n, e.options.ticks.max), e.maxIndex = -1 !== t ? t : e.maxIndex), e.min = n[e.minIndex], e.max = n[e.maxIndex]
                            },
                            buildTicks: function() {
                                var t = this,
                                    e = t.getLabels();
                                t.ticks = 0 === t.minIndex && t.maxIndex === e.length - 1 ? e : e.slice(t.minIndex, t.maxIndex + 1)
                            },
                            getLabelForIndex: function(t, e) {
                                var n = this,
                                    r = n.chart.data,
                                    i = n.isHorizontal();
                                return r.yLabels && !i ? n.getRightValue(r.datasets[e].data[t]) : n.ticks[t - n.minIndex]
                            },
                            getPixelForValue: function(t, e, n, r) {
                                var i, o = this,
                                    a = Math.max(o.maxIndex + 1 - o.minIndex - (o.options.gridLines.offsetGridLines ? 0 : 1), 1);
                                if (null != t && (i = o.isHorizontal() ? t.x : t.y), void 0 !== i || void 0 !== t && isNaN(e)) {
                                    t = i || t;
                                    var s = o.getLabels().indexOf(t);
                                    e = -1 !== s ? s : e
                                }
                                if (o.isHorizontal()) {
                                    var l = o.width / a,
                                        u = l * (e - o.minIndex);
                                    return (o.options.gridLines.offsetGridLines && r || o.maxIndex === o.minIndex && r) && (u += l / 2), o.left + Math.round(u)
                                }
                                var c = o.height / a,
                                    h = c * (e - o.minIndex);
                                return o.options.gridLines.offsetGridLines && r && (h += c / 2), o.top + Math.round(h)
                            },
                            getPixelForTick: function(t, e) {
                                return this.getPixelForValue(this.ticks[t], t + this.minIndex, null, e)
                            },
                            getValueForPixel: function(t) {
                                var e = this,
                                    n = Math.max(e.ticks.length - (e.options.gridLines.offsetGridLines ? 0 : 1), 1),
                                    r = e.isHorizontal(),
                                    i = (r ? e.width : e.height) / n;
                                return t -= r ? e.left : e.top, e.options.gridLines.offsetGridLines && (t -= i / 2), t <= 0 ? 0 : Math.round(t / i)
                            },
                            getBasePixel: function() {
                                return this.bottom
                            }
                        });
                    t.scaleService.registerScaleType("category", e, {
                        position: "bottom"
                    })
                }
            }, {}],
            45: [function(t, e, n) {
                "use strict";
                e.exports = function(r) {
                    var h = r.helpers,
                        t = {
                            position: "left",
                            ticks: {
                                callback: r.Ticks.formatters.linear
                            }
                        },
                        e = r.LinearScaleBase.extend({
                            determineDataLimits: function() {
                                function a(t) {
                                    return e ? t.xAxisID === s.id : t.yAxisID === s.id
                                }
                                var s = this,
                                    l = s.options,
                                    u = s.chart,
                                    t = u.data.datasets,
                                    e = s.isHorizontal();
                                s.min = null, s.max = null;
                                var r = l.stacked;
                                if (void 0 === r && h.each(t, function(t, e) {
                                        if (!r) {
                                            var n = u.getDatasetMeta(e);
                                            u.isDatasetVisible(e) && a(n) && void 0 !== n.stack && (r = !0)
                                        }
                                    }), l.stacked || r) {
                                    var c = {};
                                    h.each(t, function(t, e) {
                                        var r = u.getDatasetMeta(e),
                                            n = [r.type, void 0 === l.stacked && void 0 === r.stack ? e : "", r.stack].join(".");
                                        void 0 === c[n] && (c[n] = {
                                            positiveValues: [],
                                            negativeValues: []
                                        });
                                        var i = c[n].positiveValues,
                                            o = c[n].negativeValues;
                                        u.isDatasetVisible(e) && a(r) && h.each(t.data, function(t, e) {
                                            var n = +s.getRightValue(t);
                                            isNaN(n) || r.data[e].hidden || (i[e] = i[e] || 0, o[e] = o[e] || 0, l.relativePoints ? i[e] = 100 : n < 0 ? o[e] += n : i[e] += n)
                                        })
                                    }), h.each(c, function(t) {
                                        var e = t.positiveValues.concat(t.negativeValues),
                                            n = h.min(e),
                                            r = h.max(e);
                                        s.min = null === s.min ? n : Math.min(s.min, n), s.max = null === s.max ? r : Math.max(s.max, r)
                                    })
                                } else h.each(t, function(t, e) {
                                    var r = u.getDatasetMeta(e);
                                    u.isDatasetVisible(e) && a(r) && h.each(t.data, function(t, e) {
                                        var n = +s.getRightValue(t);
                                        isNaN(n) || r.data[e].hidden || (null === s.min ? s.min = n : n < s.min && (s.min = n), null === s.max ? s.max = n : n > s.max && (s.max = n))
                                    })
                                });
                                s.min = isFinite(s.min) ? s.min : 0, s.max = isFinite(s.max) ? s.max : 1, this.handleTickRangeOptions()
                            },
                            getTickLimit: function() {
                                var t, e = this.options.ticks;
                                if (this.isHorizontal()) t = Math.min(e.maxTicksLimit ? e.maxTicksLimit : 11, Math.ceil(this.width / 50));
                                else {
                                    var n = h.getValueOrDefault(e.fontSize, r.defaults.global.defaultFontSize);
                                    t = Math.min(e.maxTicksLimit ? e.maxTicksLimit : 11, Math.ceil(this.height / (2 * n)))
                                }
                                return t
                            },
                            handleDirectionalChanges: function() {
                                this.isHorizontal() || this.ticks.reverse()
                            },
                            getLabelForIndex: function(t, e) {
                                return +this.getRightValue(this.chart.data.datasets[e].data[t])
                            },
                            getPixelForValue: function(t) {
                                var e, n = this,
                                    r = n.start,
                                    i = +n.getRightValue(t),
                                    o = n.end - r;
                                return e = n.isHorizontal() ? n.left + n.width / o * (i - r) : n.bottom - n.height / o * (i - r), Math.round(e)
                            },
                            getValueForPixel: function(t) {
                                var e = this,
                                    n = e.isHorizontal(),
                                    r = n ? e.width : e.height,
                                    i = (n ? t - e.left : e.bottom - t) / r;
                                return e.start + (e.end - e.start) * i
                            },
                            getPixelForTick: function(t) {
                                return this.getPixelForValue(this.ticksAsNumbers[t])
                            }
                        });
                    r.scaleService.registerScaleType("linear", e, t)
                }
            }, {}],
            46: [function(t, e, n) {
                "use strict";
                e.exports = function(o) {
                    var a = o.helpers,
                        t = a.noop;
                    o.LinearScaleBase = o.Scale.extend({
                        handleTickRangeOptions: function() {
                            var t = this,
                                e = t.options.ticks;
                            if (e.beginAtZero) {
                                var n = a.sign(t.min),
                                    r = a.sign(t.max);
                                n < 0 && r < 0 ? t.max = 0 : 0 < n && 0 < r && (t.min = 0)
                            }
                            void 0 !== e.min ? t.min = e.min : void 0 !== e.suggestedMin && (null === t.min ? t.min = e.suggestedMin : t.min = Math.min(t.min, e.suggestedMin)), void 0 !== e.max ? t.max = e.max : void 0 !== e.suggestedMax && (null === t.max ? t.max = e.suggestedMax : t.max = Math.max(t.max, e.suggestedMax)), t.min === t.max && (t.max++, e.beginAtZero || t.min--)
                        },
                        getTickLimit: t,
                        handleDirectionalChanges: t,
                        buildTicks: function() {
                            var t = this,
                                e = t.options.ticks,
                                n = t.getTickLimit(),
                                r = {
                                    maxTicks: n = Math.max(2, n),
                                    min: e.min,
                                    max: e.max,
                                    stepSize: a.getValueOrDefault(e.fixedStepSize, e.stepSize)
                                },
                                i = t.ticks = o.Ticks.generators.linear(r, t);
                            t.handleDirectionalChanges(), t.max = a.max(i), t.min = a.min(i), e.reverse ? (i.reverse(), t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max)
                        },
                        convertTicksToLabels: function() {
                            var t = this;
                            t.ticksAsNumbers = t.ticks.slice(), t.zeroLineIndex = t.ticks.indexOf(0), o.Scale.prototype.convertTicksToLabels.call(t)
                        }
                    })
                }
            }, {}],
            47: [function(t, e, n) {
                "use strict";
                e.exports = function(i) {
                    var h = i.helpers,
                        t = {
                            position: "left",
                            ticks: {
                                callback: i.Ticks.formatters.logarithmic
                            }
                        },
                        e = i.Scale.extend({
                            determineDataLimits: function() {
                                function a(t) {
                                    return r ? t.xAxisID === s.id : t.yAxisID === s.id
                                }
                                var s = this,
                                    l = s.options,
                                    t = l.ticks,
                                    u = s.chart,
                                    e = u.data.datasets,
                                    n = h.getValueOrDefault,
                                    r = s.isHorizontal();
                                s.min = null, s.max = null, s.minNotZero = null;
                                var i = l.stacked;
                                if (void 0 === i && h.each(e, function(t, e) {
                                        if (!i) {
                                            var n = u.getDatasetMeta(e);
                                            u.isDatasetVisible(e) && a(n) && void 0 !== n.stack && (i = !0)
                                        }
                                    }), l.stacked || i) {
                                    var c = {};
                                    h.each(e, function(t, e) {
                                        var i = u.getDatasetMeta(e),
                                            o = [i.type, void 0 === l.stacked && void 0 === i.stack ? e : "", i.stack].join(".");
                                        u.isDatasetVisible(e) && a(i) && (void 0 === c[o] && (c[o] = []), h.each(t.data, function(t, e) {
                                            var n = c[o],
                                                r = +s.getRightValue(t);
                                            isNaN(r) || i.data[e].hidden || (n[e] = n[e] || 0, l.relativePoints ? n[e] = 100 : n[e] += r)
                                        }))
                                    }), h.each(c, function(t) {
                                        var e = h.min(t),
                                            n = h.max(t);
                                        s.min = null === s.min ? e : Math.min(s.min, e), s.max = null === s.max ? n : Math.max(s.max, n)
                                    })
                                } else h.each(e, function(t, e) {
                                    var r = u.getDatasetMeta(e);
                                    u.isDatasetVisible(e) && a(r) && h.each(t.data, function(t, e) {
                                        var n = +s.getRightValue(t);
                                        isNaN(n) || r.data[e].hidden || (null === s.min ? s.min = n : n < s.min && (s.min = n), null === s.max ? s.max = n : n > s.max && (s.max = n), 0 !== n && (null === s.minNotZero || n < s.minNotZero) && (s.minNotZero = n))
                                    })
                                });
                                s.min = n(t.min, s.min), s.max = n(t.max, s.max), s.min === s.max && (0 !== s.min && null !== s.min ? (s.min = Math.pow(10, Math.floor(h.log10(s.min)) - 1), s.max = Math.pow(10, Math.floor(h.log10(s.max)) + 1)) : (s.min = 1, s.max = 10))
                            },
                            buildTicks: function() {
                                var t = this,
                                    e = t.options.ticks,
                                    n = {
                                        min: e.min,
                                        max: e.max
                                    },
                                    r = t.ticks = i.Ticks.generators.logarithmic(n, t);
                                t.isHorizontal() || r.reverse(), t.max = h.max(r), t.min = h.min(r), e.reverse ? (r.reverse(), t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max)
                            },
                            convertTicksToLabels: function() {
                                this.tickValues = this.ticks.slice(), i.Scale.prototype.convertTicksToLabels.call(this)
                            },
                            getLabelForIndex: function(t, e) {
                                return +this.getRightValue(this.chart.data.datasets[e].data[t])
                            },
                            getPixelForTick: function(t) {
                                return this.getPixelForValue(this.tickValues[t])
                            },
                            getPixelForValue: function(t) {
                                var e, n, r, i = this,
                                    o = i.start,
                                    a = +i.getRightValue(t),
                                    s = i.options.ticks;
                                return i.isHorizontal() ? (r = h.log10(i.end) - h.log10(o), 0 === a ? n = i.left : (e = i.width, n = i.left + e / r * (h.log10(a) - h.log10(o)))) : (e = i.height, 0 !== o || s.reverse ? 0 === i.end && s.reverse ? (r = h.log10(i.start) - h.log10(i.minNotZero), n = a === i.end ? i.top : a === i.minNotZero ? i.top + .02 * e : i.top + .02 * e + .98 * e / r * (h.log10(a) - h.log10(i.minNotZero))) : 0 === a ? n = s.reverse ? i.top : i.bottom : (r = h.log10(i.end) - h.log10(o), e = i.height, n = i.bottom - e / r * (h.log10(a) - h.log10(o))) : (r = h.log10(i.end) - h.log10(i.minNotZero), n = a === o ? i.bottom : a === i.minNotZero ? i.bottom - .02 * e : i.bottom - .02 * e - .98 * e / r * (h.log10(a) - h.log10(i.minNotZero)))), n
                            },
                            getValueForPixel: function(t) {
                                var e, n, r = this,
                                    i = h.log10(r.end) - h.log10(r.start);
                                return r.isHorizontal() ? (n = r.width, e = r.start * Math.pow(10, (t - r.left) * i / n)) : (n = r.height, e = Math.pow(10, (r.bottom - t) * i / n) / r.start), e
                            }
                        });
                    i.scaleService.registerScaleType("logarithmic", e, t)
                }
            }, {}],
            48: [function(t, e, n) {
                "use strict";
                e.exports = function(e) {
                    function y(t) {
                        var e = t.options;
                        return e.angleLines.display || e.pointLabels.display ? t.chart.data.labels.length : 0
                    }

                    function b(t) {
                        var e = t.options.pointLabels,
                            n = w.getValueOrDefault(e.fontSize, x.defaultFontSize),
                            r = w.getValueOrDefault(e.fontStyle, x.defaultFontStyle),
                            i = w.getValueOrDefault(e.fontFamily, x.defaultFontFamily);
                        return {
                            size: n,
                            style: r,
                            family: i,
                            font: w.fontString(n, r, i)
                        }
                    }

                    function v(t, e, n, r, i) {
                        return t === r || t === i ? {
                            start: e - n / 2,
                            end: e + n / 2
                        } : t < r || i < t ? {
                            start: e - n - 5,
                            end: e
                        } : {
                            start: e,
                            end: e + n + 5
                        }
                    }

                    function _(t, e, n, r) {
                        if (w.isArray(e))
                            for (var i = n.y, o = 1.5 * r, a = 0; a < e.length; ++a) t.fillText(e[a], n.x, i), i += o;
                        else t.fillText(e, n.x, n.y)
                    }

                    function s(t) {
                        return w.isNumber(t) ? t : 0
                    }
                    var w = e.helpers,
                        x = e.defaults.global,
                        t = {
                            display: !0,
                            animate: !0,
                            position: "chartArea",
                            angleLines: {
                                display: !0,
                                color: "rgba(0, 0, 0, 0.1)",
                                lineWidth: 1
                            },
                            gridLines: {
                                circular: !1
                            },
                            ticks: {
                                showLabelBackdrop: !0,
                                backdropColor: "rgba(255,255,255,0.75)",
                                backdropPaddingY: 2,
                                backdropPaddingX: 2,
                                callback: e.Ticks.formatters.linear
                            },
                            pointLabels: {
                                display: !0,
                                fontSize: 10,
                                callback: function(t) {
                                    return t
                                }
                            }
                        },
                        n = e.LinearScaleBase.extend({
                            setDimensions: function() {
                                var t = this,
                                    e = t.options,
                                    n = e.ticks;
                                t.width = t.maxWidth, t.height = t.maxHeight, t.xCenter = Math.round(t.width / 2), t.yCenter = Math.round(t.height / 2);
                                var r = w.min([t.height, t.width]),
                                    i = w.getValueOrDefault(n.fontSize, x.defaultFontSize);
                                t.drawingArea = e.display ? r / 2 - (i / 2 + n.backdropPaddingY) : r / 2
                            },
                            determineDataLimits: function() {
                                var i = this,
                                    n = i.chart,
                                    o = Number.POSITIVE_INFINITY,
                                    a = Number.NEGATIVE_INFINITY;
                                w.each(n.data.datasets, function(t, e) {
                                    if (n.isDatasetVisible(e)) {
                                        var r = n.getDatasetMeta(e);
                                        w.each(t.data, function(t, e) {
                                            var n = +i.getRightValue(t);
                                            isNaN(n) || r.data[e].hidden || (o = Math.min(n, o), a = Math.max(n, a))
                                        })
                                    }
                                }), i.min = o === Number.POSITIVE_INFINITY ? 0 : o, i.max = a === Number.NEGATIVE_INFINITY ? 0 : a, i.handleTickRangeOptions()
                            },
                            getTickLimit: function() {
                                var t = this.options.ticks,
                                    e = w.getValueOrDefault(t.fontSize, x.defaultFontSize);
                                return Math.min(t.maxTicksLimit ? t.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * e)))
                            },
                            convertTicksToLabels: function() {
                                var t = this;
                                e.LinearScaleBase.prototype.convertTicksToLabels.call(t), t.pointLabels = t.chart.data.labels.map(t.options.pointLabels.callback, t)
                            },
                            getLabelForIndex: function(t, e) {
                                return +this.getRightValue(this.chart.data.datasets[e].data[t])
                            },
                            fit: function() {
                                var t, e;
                                this.options.pointLabels.display ? function(t) {
                                    var e, n, r, i = b(t),
                                        o = Math.min(t.height / 2, t.width / 2),
                                        a = {
                                            r: t.width,
                                            l: 0,
                                            t: t.height,
                                            b: 0
                                        },
                                        s = {};
                                    t.ctx.font = i.font, t._pointLabelSizes = [];
                                    var l, u, c, h = y(t);
                                    for (e = 0; e < h; e++) {
                                        r = t.getPointPosition(e, o), l = t.ctx, u = i.size, c = t.pointLabels[e] || "", n = w.isArray(c) ? {
                                            w: w.longestText(l, l.font, c),
                                            h: c.length * u + 1.5 * (c.length - 1) * u
                                        } : {
                                            w: l.measureText(c).width,
                                            h: u
                                        }, t._pointLabelSizes[e] = n;
                                        var d = t.getIndexAngle(e),
                                            f = w.toDegrees(d) % 360,
                                            p = v(f, r.x, n.w, 0, 180),
                                            g = v(f, r.y, n.h, 90, 270);
                                        p.start < a.l && (a.l = p.start, s.l = d), p.end > a.r && (a.r = p.end, s.r = d), g.start < a.t && (a.t = g.start, s.t = d), g.end > a.b && (a.b = g.end, s.b = d)
                                    }
                                    t.setReductions(o, a, s)
                                }(this) : (t = this, e = Math.min(t.height / 2, t.width / 2), t.drawingArea = Math.round(e), t.setCenterPoint(0, 0, 0, 0))
                            },
                            setReductions: function(t, e, n) {
                                var r = e.l / Math.sin(n.l),
                                    i = Math.max(e.r - this.width, 0) / Math.sin(n.r),
                                    o = -e.t / Math.cos(n.t),
                                    a = -Math.max(e.b - this.height, 0) / Math.cos(n.b);
                                r = s(r), i = s(i), o = s(o), a = s(a), this.drawingArea = Math.min(Math.round(t - (r + i) / 2), Math.round(t - (o + a) / 2)), this.setCenterPoint(r, i, o, a)
                            },
                            setCenterPoint: function(t, e, n, r) {
                                var i = this,
                                    o = i.width - e - i.drawingArea,
                                    a = t + i.drawingArea,
                                    s = n + i.drawingArea,
                                    l = i.height - r - i.drawingArea;
                                i.xCenter = Math.round((a + o) / 2 + i.left), i.yCenter = Math.round((s + l) / 2 + i.top)
                            },
                            getIndexAngle: function(t) {
                                return t * (2 * Math.PI / y(this)) + (this.chart.options && this.chart.options.startAngle ? this.chart.options.startAngle : 0) * Math.PI * 2 / 360
                            },
                            getDistanceFromCenterForValue: function(t) {
                                var e = this;
                                if (null === t) return 0;
                                var n = e.drawingArea / (e.max - e.min);
                                return e.options.reverse ? (e.max - t) * n : (t - e.min) * n
                            },
                            getPointPosition: function(t, e) {
                                var n = this.getIndexAngle(t) - Math.PI / 2;
                                return {
                                    x: Math.round(Math.cos(n) * e) + this.xCenter,
                                    y: Math.round(Math.sin(n) * e) + this.yCenter
                                }
                            },
                            getPointPositionForValue: function(t, e) {
                                return this.getPointPosition(t, this.getDistanceFromCenterForValue(e))
                            },
                            getBasePosition: function() {
                                var t = this.min,
                                    e = this.max;
                                return this.getPointPositionForValue(0, this.beginAtZero ? 0 : t < 0 && e < 0 ? e : 0 < t && 0 < e ? t : 0)
                            },
                            draw: function() {
                                var a = this,
                                    s = a.options,
                                    l = s.gridLines,
                                    u = s.ticks,
                                    c = w.getValueOrDefault;
                                if (s.display) {
                                    var h = a.ctx,
                                        d = c(u.fontSize, x.defaultFontSize),
                                        t = c(u.fontStyle, x.defaultFontStyle),
                                        e = c(u.fontFamily, x.defaultFontFamily),
                                        f = w.fontString(d, t, e);
                                    w.each(a.ticks, function(t, e) {
                                        if (0 < e || s.reverse) {
                                            var n = a.getDistanceFromCenterForValue(a.ticksAsNumbers[e]),
                                                r = a.yCenter - n;
                                            if (l.display && 0 !== e && function(t, e, n, r) {
                                                    var i = t.ctx;
                                                    if (i.strokeStyle = w.getValueAtIndexOrDefault(e.color, r - 1), i.lineWidth = w.getValueAtIndexOrDefault(e.lineWidth, r - 1), t.options.gridLines.circular) i.beginPath(), i.arc(t.xCenter, t.yCenter, n, 0, 2 * Math.PI), i.closePath(), i.stroke();
                                                    else {
                                                        var o = y(t);
                                                        if (0 === o) return;
                                                        i.beginPath();
                                                        var a = t.getPointPosition(0, n);
                                                        i.moveTo(a.x, a.y);
                                                        for (var s = 1; s < o; s++) a = t.getPointPosition(s, n), i.lineTo(a.x, a.y);
                                                        i.closePath(), i.stroke()
                                                    }
                                                }(a, l, n, e), u.display) {
                                                var i = c(u.fontColor, x.defaultFontColor);
                                                if (h.font = f, u.showLabelBackdrop) {
                                                    var o = h.measureText(t).width;
                                                    h.fillStyle = u.backdropColor, h.fillRect(a.xCenter - o / 2 - u.backdropPaddingX, r - d / 2 - u.backdropPaddingY, o + 2 * u.backdropPaddingX, d + 2 * u.backdropPaddingY)
                                                }
                                                h.textAlign = "center", h.textBaseline = "middle", h.fillStyle = i, h.fillText(t, a.xCenter, r)
                                            }
                                        }
                                    }), (s.angleLines.display || s.pointLabels.display) && function(t) {
                                        var e = t.ctx,
                                            n = w.getValueOrDefault,
                                            r = t.options,
                                            i = r.angleLines,
                                            o = r.pointLabels;
                                        e.lineWidth = i.lineWidth, e.strokeStyle = i.color;
                                        var a, s, l, u, c = t.getDistanceFromCenterForValue(r.reverse ? t.min : t.max),
                                            h = b(t);
                                        e.textBaseline = "top";
                                        for (var d = y(t) - 1; 0 <= d; d--) {
                                            if (i.display) {
                                                var f = t.getPointPosition(d, c);
                                                e.beginPath(), e.moveTo(t.xCenter, t.yCenter), e.lineTo(f.x, f.y), e.stroke(), e.closePath()
                                            }
                                            if (o.display) {
                                                var p = t.getPointPosition(d, c + 5),
                                                    g = n(o.fontColor, x.defaultFontColor);
                                                e.font = h.font, e.fillStyle = g;
                                                var v = t.getIndexAngle(d),
                                                    m = w.toDegrees(v);
                                                e.textAlign = 0 === (u = m) || 180 === u ? "center" : u < 180 ? "left" : "right", a = m, s = t._pointLabelSizes[d], l = p, 90 === a || 270 === a ? l.y -= s.h / 2 : (270 < a || a < 90) && (l.y -= s.h), _(e, t.pointLabels[d] || "", p, h.size)
                                            }
                                        }
                                    }(a)
                                }
                            }
                        });
                    e.scaleService.registerScaleType("radialLinear", n, t)
                }
            }, {}],
            49: [function(t, e, n) {
                "use strict";
                var s = t(1);
                s = "function" == typeof s ? s : window.moment, e.exports = function(c) {
                    function h(t, e) {
                        var n = t.options.time;
                        if ("string" == typeof n.parser) return s(e, n.parser);
                        if ("function" == typeof n.parser) return n.parser(e);
                        if ("function" == typeof e.getMonth || "number" == typeof e) return s(e);
                        if (e.isValid && e.isValid()) return e;
                        var r = n.format;
                        return "string" != typeof r && r.call ? (console.warn("options.time.format is deprecated and replaced by options.time.parser."), r(e)) : s(e, r)
                    }
                    var d = c.helpers,
                        f = {
                            millisecond: {
                                size: 1,
                                steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
                            },
                            second: {
                                size: 1e3,
                                steps: [1, 2, 5, 10, 30]
                            },
                            minute: {
                                size: 6e4,
                                steps: [1, 2, 5, 10, 30]
                            },
                            hour: {
                                size: 36e5,
                                steps: [1, 2, 3, 6, 12]
                            },
                            day: {
                                size: 864e5,
                                steps: [1, 2, 5]
                            },
                            week: {
                                size: 6048e5,
                                maxStep: 4
                            },
                            month: {
                                size: 2628e6,
                                maxStep: 3
                            },
                            quarter: {
                                size: 7884e6,
                                maxStep: 4
                            },
                            year: {
                                size: 3154e7,
                                maxStep: !1
                            }
                        };
                    c.Ticks.generators.time = function(t, e) {
                        var n, r, i = t.isoWeekday;
                        return "week" === t.unit && !1 !== i ? (n = s(e.min).startOf("isoWeek").isoWeekday(i).valueOf(), r = s(e.max).startOf("isoWeek").isoWeekday(i), 0 < e.max - r && r.add(1, "week")) : (n = s(e.min).startOf(t.unit).valueOf(), r = s(e.max).startOf(t.unit), 0 < e.max - r && r.add(1, t.unit)),
                            function(t, e, n) {
                                var r = [];
                                if (t.maxTicks) {
                                    var i = t.stepSize;
                                    r.push(void 0 !== t.min ? t.min : n.min);
                                    for (var o = s(n.min); o.add(i, t.unit).valueOf() < n.max;) r.push(o.valueOf());
                                    var a = t.max || n.max;
                                    r[r.length - 1] !== a && r.push(a)
                                }
                                return r
                            }(t, 0, {
                                min: n,
                                max: r = r.valueOf()
                            })
                    };
                    var t = c.Scale.extend({
                        initialize: function() {
                            if (!s) throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");
                            c.Scale.prototype.initialize.call(this)
                        },
                        determineDataLimits: function() {
                            var i, o = this,
                                a = o.options.time,
                                s = Number.MAX_SAFE_INTEGER,
                                l = Number.MIN_SAFE_INTEGER,
                                t = o.chart.data,
                                u = {
                                    labels: [],
                                    datasets: []
                                };
                            d.each(t.labels, function(t, e) {
                                var n = h(o, t);
                                n.isValid() && (a.round && n.startOf(a.round), i = n.valueOf(), s = Math.min(i, s), l = Math.max(i, l), u.labels[e] = i)
                            }), d.each(t.datasets, function(t, e) {
                                var r = [];
                                "object" == typeof t.data[0] && null !== t.data[0] && o.chart.isDatasetVisible(e) ? d.each(t.data, function(t, e) {
                                    var n = h(o, o.getRightValue(t));
                                    n.isValid() && (a.round && n.startOf(a.round), i = n.valueOf(), s = Math.min(i, s), l = Math.max(i, l), r[e] = i)
                                }) : r = u.labels.slice(), u.datasets[e] = r
                            }), o.dataMin = s, o.dataMax = l, o._parsedData = u
                        },
                        buildTicks: function() {
                            var t, e, n = this,
                                r = n.options.time,
                                i = n.dataMin,
                                o = n.dataMax;
                            if (r.min) {
                                var a = h(n, r.min);
                                r.round && a.round(r.round), t = a.valueOf()
                            }
                            r.max && (e = h(n, r.max).valueOf());
                            var s = n.getLabelCapacity(t || i),
                                l = r.unit || function(t, e, n, r) {
                                    for (var i, o = Object.keys(f), a = o.length, s = o.indexOf(t); s < a; s++) {
                                        i = o[s];
                                        var l = f[i],
                                            u = l.steps && l.steps[l.steps.length - 1] || l.maxStep;
                                        if (void 0 === u || Math.ceil((n - e) / (u * l.size)) <= r) break
                                    }
                                    return i
                                }(r.minUnit, t || i, e || o, s);
                            n.displayFormat = r.displayFormats[l];
                            var u = r.stepSize || function(t, e, n, r) {
                                var i = f[n],
                                    o = i.size,
                                    a = Math.ceil((e - t) / o),
                                    s = 1,
                                    l = e - t;
                                if (i.steps)
                                    for (var u = i.steps.length, c = 0; c < u && r < a; c++) s = i.steps[c], a = Math.ceil(l / (o * s));
                                else
                                    for (; r < a && 0 < r;) ++s, a = Math.ceil(l / (o * s));
                                return s
                            }(t || i, e || o, l, s);
                            n.ticks = c.Ticks.generators.time({
                                maxTicks: s,
                                min: t,
                                max: e,
                                stepSize: u,
                                unit: l,
                                isoWeekday: r.isoWeekday
                            }, {
                                min: i,
                                max: o
                            }), n.max = d.max(n.ticks), n.min = d.min(n.ticks)
                        },
                        getLabelForIndex: function(t, e) {
                            var n = this.chart.data.labels && t < this.chart.data.labels.length ? this.chart.data.labels[t] : "",
                                r = this.chart.data.datasets[e].data[t];
                            return null !== r && "object" == typeof r && (n = this.getRightValue(r)), this.options.time.tooltipFormat && (n = h(this, n).format(this.options.time.tooltipFormat)), n
                        },
                        tickFormatFunction: function(t, e, n) {
                            var r = t.format(this.displayFormat),
                                i = this.options.ticks,
                                o = d.getValueOrDefault(i.callback, i.userCallback);
                            return o ? o(r, e, n) : r
                        },
                        convertTicksToLabels: function() {
                            this.ticksAsTimestamps = this.ticks, this.ticks = this.ticks.map(function(t) {
                                return s(t)
                            }).map(this.tickFormatFunction, this)
                        },
                        getPixelForOffset: function(t) {
                            var e = this.max - this.min,
                                n = e ? (t - this.min) / e : 0;
                            if (this.isHorizontal()) {
                                var r = this.width * n;
                                return this.left + Math.round(r)
                            }
                            var i = this.height * n;
                            return this.top + Math.round(i)
                        },
                        getPixelForValue: function(t, e, n) {
                            var r = null;
                            if (void 0 !== e && void 0 !== n && (r = this._parsedData.datasets[n][e]), null === r && (t && t.isValid || (t = h(this, this.getRightValue(t))), t && t.isValid && t.isValid() && (r = t.valueOf())), null !== r) return this.getPixelForOffset(r)
                        },
                        getPixelForTick: function(t) {
                            return this.getPixelForOffset(this.ticksAsTimestamps[t])
                        },
                        getValueForPixel: function(t) {
                            var e = this.isHorizontal() ? this.width : this.height,
                                n = (t - (this.isHorizontal() ? this.left : this.top)) / e;
                            return s(this.min + n * (this.max - this.min))
                        },
                        getLabelWidth: function(t) {
                            var e = this.options.ticks,
                                n = this.ctx.measureText(t).width,
                                r = Math.cos(d.toRadians(e.maxRotation)),
                                i = Math.sin(d.toRadians(e.maxRotation));
                            return n * r + d.getValueOrDefault(e.fontSize, c.defaults.global.defaultFontSize) * i
                        },
                        getLabelCapacity: function(t) {
                            this.displayFormat = this.options.time.displayFormats.millisecond;
                            var e = this.tickFormatFunction(s(t), 0, []),
                                n = this.getLabelWidth(e);
                            return (this.isHorizontal() ? this.width : this.height) / n
                        }
                    });
                    c.scaleService.registerScaleType("time", t, {
                        position: "bottom",
                        time: {
                            parser: !1,
                            format: !1,
                            unit: !1,
                            round: !1,
                            displayFormat: !1,
                            isoWeekday: !1,
                            minUnit: "millisecond",
                            displayFormats: {
                                millisecond: "h:mm:ss.SSS a",
                                second: "h:mm:ss a",
                                minute: "h:mm:ss a",
                                hour: "MMM D, hA",
                                day: "ll",
                                week: "ll",
                                month: "MMM YYYY",
                                quarter: "[Q]Q - YYYY",
                                year: "YYYY"
                            }
                        },
                        ticks: {
                            autoSkip: !1
                        }
                    })
                }
            }, {
                1: 1
            }]
        }, {}, [7])(7)
    }),
    function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(c) {
        var e = Array.prototype.slice,
            r = Array.prototype.splice,
            s = {
                topSpacing: 0,
                bottomSpacing: 0,
                className: "is-sticky",
                wrapperClassName: "sticky-wrapper",
                center: !1,
                getWidthFrom: "",
                widthFromWrapper: !0,
                responsiveWidth: !1
            },
            h = c(window),
            d = c(document),
            f = [],
            p = h.height(),
            t = function() {
                for (var t = h.scrollTop(), e = d.height(), n = e - p, r = n < t ? n - t : 0, i = 0, o = f.length; i < o; i++) {
                    var a = f[i],
                        s = a.stickyWrapper.offset().top - a.topSpacing - r;
                    if (a.stickyWrapper.css("height", a.stickyElement.outerHeight()), t <= s) null !== a.currentTop && (a.stickyElement.css({
                        width: "",
                        position: "",
                        top: ""
                    }), a.stickyElement.parent().removeClass(a.className), a.stickyElement.trigger("sticky-end", [a]), a.currentTop = null);
                    else {
                        var l, u = e - a.stickyElement.outerHeight() - a.topSpacing - a.bottomSpacing - t - r;
                        if (u < 0 ? u += a.topSpacing : u = a.topSpacing, a.currentTop !== u) a.getWidthFrom ? l = c(a.getWidthFrom).width() || null : a.widthFromWrapper && (l = a.stickyWrapper.width()), null == l && (l = a.stickyElement.width()), a.stickyElement.css("width", l).css("position", "").css("top", u), a.stickyElement.parent().addClass(a.className), null === a.currentTop ? a.stickyElement.trigger("sticky-start", [a]) : a.stickyElement.trigger("sticky-update", [a]), a.currentTop === a.topSpacing && a.currentTop > u || null === a.currentTop && u < a.topSpacing ? a.stickyElement.trigger("sticky-bottom-reached", [a]) : null !== a.currentTop && u === a.topSpacing && a.currentTop < u && a.stickyElement.trigger("sticky-bottom-unreached", [a]), a.currentTop = u
                    }
                }
            },
            n = function() {
                p = h.height();
                for (var t = 0, e = f.length; t < e; t++) {
                    var n = f[t],
                        r = null;
                    n.getWidthFrom ? n.responsiveWidth && (r = c(n.getWidthFrom).width()) : n.widthFromWrapper && (r = n.stickyWrapper.width()), null != r && n.stickyElement.css("width", r)
                }
            },
            i = {
                init: function(t) {
                    var a = c.extend({}, s, t);
                    return this.each(function() {
                        var t = c(this),
                            e = t.attr("id"),
                            n = t.outerHeight(),
                            r = e ? e + "-" + s.wrapperClassName : s.wrapperClassName,
                            i = c("<div></div>").attr("id", r).addClass(a.wrapperClassName);
                        t.wrapAll(i);
                        var o = t.parent();
                        a.center && o.css({
                            width: t.outerWidth(),
                            marginLeft: "auto",
                            marginRight: "auto"
                        }), "right" === t.css("float") && t.css({
                            float: "none"
                        }).parent().css({
                            float: "right"
                        }), o.css("height", n), a.stickyElement = t, a.stickyWrapper = o, a.currentTop = null, f.push(a)
                    })
                },
                update: t,
                unstick: function(t) {
                    return this.each(function() {
                        for (var t = c(this), e = -1, n = f.length; 0 < n--;) f[n].stickyElement.get(0) === this && (r.call(f, n, 1), e = n); - 1 !== e && (t.unwrap(), t.css({
                            width: "",
                            position: "",
                            top: "",
                            float: ""
                        }))
                    })
                }
            };
        window.addEventListener ? (window.addEventListener("scroll", t, !1), window.addEventListener("resize", n, !1)) : window.attachEvent && (window.attachEvent("onscroll", t), window.attachEvent("onresize", n)), c.fn.sticky = function(t) {
            return i[t] ? i[t].apply(this, e.call(arguments, 1)) : "object" != typeof t && t ? void c.error("Method " + t + " does not exist on jQuery.sticky") : i.init.apply(this, arguments)
        }, c.fn.unstick = function(t) {
            return i[t] ? i[t].apply(this, e.call(arguments, 1)) : "object" != typeof t && t ? void c.error("Method " + t + " does not exist on jQuery.sticky") : i.unstick.apply(this, arguments)
        }, c(function() {
            setTimeout(t, 0)
        })
    }),
    function() {
        if (window && window.addEventListener) {
            var e, n, h = Object.create(null),
                d = function() {
                    clearTimeout(n), n = setTimeout(e, 100)
                },
                f = function() {},
                p = function(t) {
                    var e, n = location.hostname;
                    if (window.XMLHttpRequest) {
                        e = new XMLHttpRequest;
                        var r = document.createElement("a");
                        r.href = t, t = r.hostname, e = void 0 === e.withCredentials && "" !== t && t !== n ? XDomainRequest || void 0 : XMLHttpRequest
                    }
                    return e
                };
            e = function() {
                function r() {
                    var t;
                    0 === --c && (f(), window.addEventListener("resize", d, !1), window.addEventListener("orientationchange", d, !1), window.MutationObserver ? ((t = new MutationObserver(d)).observe(document.documentElement, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0
                    }), f = function() {
                        try {
                            t.disconnect(), window.removeEventListener("resize", d, !1), window.removeEventListener("orientationchange", d, !1)
                        } catch (t) {}
                    }) : (document.documentElement.addEventListener("DOMSubtreeModified", d, !1), f = function() {
                        document.documentElement.removeEventListener("DOMSubtreeModified", d, !1), window.removeEventListener("resize", d, !1), window.removeEventListener("orientationchange", d, !1)
                    }))
                }

                function t(t) {
                    return function() {
                        !0 !== h[t.base] && t.useEl.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + t.hash)
                    }
                }

                function e(n) {
                    return function() {
                        var t = document.body,
                            e = document.createElement("x");
                        n.onload = null, e.innerHTML = n.responseText, (e = e.getElementsByTagName("svg")[0]) && (e.setAttribute("aria-hidden", "true"), e.style.position = "absolute", e.style.width = 0, e.style.height = 0, e.style.overflow = "hidden", t.insertBefore(e, t.firstChild)), r()
                    }
                }

                function n(t) {
                    return function() {
                        t.onerror = null, t.ontimeout = null, r()
                    }
                }
                var i, o, a, s, l, u, c = 0;
                for (f(), u = document.getElementsByTagName("use"), s = 0; s < u.length; s += 1) {
                    try {
                        o = u[s].getBoundingClientRect()
                    } catch (t) {
                        o = !1
                    }
                    i = (a = u[s].getAttributeNS("http://www.w3.org/1999/xlink", "href").split("#"))[0], a = a[1], l = o && 0 === o.left && 0 === o.right && 0 === o.top && 0 === o.bottom, o && 0 === o.width && 0 === o.height && !l ? i.length && (!0 !== (l = h[i]) && setTimeout(t({
                        useEl: u[s],
                        base: i,
                        hash: a
                    }), 0), void 0 === l && (void 0 !== (a = p(i)) && (l = new a, (h[i] = l).onload = e(l), l.onerror = n(l), l.ontimeout = n(l), l.open("GET", i), l.send(), c += 1))) : l || (void 0 === h[i] ? h[i] = !0 : h[i].onload && (h[i].abort(), delete h[i].onload, h[i] = !0))
                }
                u = "", c += 1, r()
            }, window.addEventListener("load", function t() {
                window.removeEventListener("load", t, !1), n = setTimeout(e, 0)
            }, !1)
        }
    }();
var menuOpenOrClosed = "closed",
    openCloseMenu = function() {
        window.jQuery && ("closed" === menuOpenOrClosed ? ($("html").addClass("mobile-menu-active"), menuOpenOrClosed = "open", $("#hamburger-x-icon").addClass("open")) : ($("html").removeClass("mobile-menu-active"), menuOpenOrClosed = "closed", $("#hamburger-x-icon").removeClass("open")))
    };
! function(m, y, t, e) {
    "use strict";

    function o(l, f, e, t) {
        function n() {
            var i, o, a, s;
            h = 1 < y.devicePixelRatio, r(e), 0 <= f("delay") && setTimeout(function() {
                u(!0)
            }, f("delay")), (f("delay") < 0 || f("combined")) && (t.e = (i = f("throttle"), o = function(t) {
                "resize" === t.type && (g = v = -1), u(t.all)
            }, s = 0, function(t, e) {
                function n() {
                    s = +new Date, o.call(l, t)
                }
                var r = +new Date - s;
                a && clearTimeout(a), i < r || !f("enableThrottle") || e ? n() : a = setTimeout(n, i - r)
            }), t.a = function(t) {
                r(t), e.push.apply(e, t)
            }, t.g = function() {
                return e = m(e).filter(function() {
                    return !m(this).data(f("loadedName"))
                })
            }, u(), m(f("appendScroll")).on("scroll." + l.name + " resize." + l.name, t.e))
        }

        function r(t) {
            if (t = m(t).filter(function() {
                    return !m(this).data(f("handledName")) && (m(this).attr(f("attribute")) || m(this).attr(f("loaderAttribute")))
                }).data("plugin_" + l.name, l), f("defaultImage") || f("placeholder"))
                for (var e = 0; e < t.length; e++) {
                    var n = m(t[e]),
                        r = t[e].tagName.toLowerCase(),
                        i = "background-image";
                    "img" == r && f("defaultImage") && !n.attr("src") ? n.attr("src", f("defaultImage")) : "img" == r || !f("placeholder") || n.css(i) && "none" != n.css(i) || n.css(i, "url(" + f("placeholder") + ")")
                }
        }

        function u(c) {
            if (e.length) {
                for (var h = !1, d = f("imageBase") ? f("imageBase") : "", t = 0; t < e.length; t++) ! function(t) {
                    if (o = t.getBoundingClientRect(), a = f("scrollDirection"), s = f("threshold"), l = (0 <= v ? v : v = m(y).height()) + s > o.top && -s < o.bottom, u = (0 <= g ? g : g = m(y).width()) + s > o.left && -s < o.right, ("vertical" == a ? l : "horizontal" == a ? u : l && u) || c) {
                        var e, n = m(t),
                            r = t.tagName.toLowerCase(),
                            i = n.attr(f("attribute"));
                        n.data(f("handledName")) || f("visibleOnly") && !n.is(":visible") || !(i && ("img" == r && d + i != n.attr("src") || "img" != r && d + i != n.css("background-image")) || (e = n.attr(f("loaderAttribute")))) || (h = !0, n.data(f("handledName"), !0), p(n, r, d, e))
                    }
                    var o, a, s, l, u
                }(e[t]);
                h && (e = m(e).filter(function() {
                    return !m(this).data(f("handledName"))
                }))
            } else f("autoDestroy") && l.destroy()
        }

        function p(e, t, n, r) {
            ++c;
            var i = function() {
                s("onError", e), a()
            };
            if (s("beforeLoad", e), r) e.off("error").one("error", i), e.one("load", function() {
                f("removeAttribute") && e.removeAttr(f("loaderAttribute")), e.data(f("loadedName"), !0), s("afterLoad", e), a()
            }), s(r, e, function(t) {
                t ? e.load() : e.error()
            }) || e.error();
            else {
                var o = m(new Image);
                o.one("error", i), o.one("load", function() {
                    e.hide(), "img" == t ? e.attr("src", o.attr("src")) : e.css("background-image", "url('" + o.attr("src") + "')"), e[f("effect")](f("effectTime")), f("removeAttribute") && e.removeAttr(f("attribute") + " " + f("retinaAttribute")), e.data(f("loadedName"), !0), s("afterLoad", e), o.remove(), a()
                }), o.attr("src", n + e.attr(f(h && e.attr(f("retinaAttribute")) ? "retinaAttribute" : "attribute"))), o.complete && o.load()
            }
        }

        function a() {
            --c, e.length || c || s("onFinishedAll")
        }

        function s(t, e, n) {
            return !!(t = f(t)) && (t.apply(l, [].slice.call(arguments, 1)), !0)
        }
        var c = 0,
            g = -1,
            v = -1,
            h = !1;
        "event" == f("bind") ? n() : m(y).on("load." + l.name, n)
    }

    function n(t, e) {
        var n = this,
            r = m.extend({}, n.configuration, e),
            i = {};
        return n.config = function(t, e) {
            return void 0 === e ? r[t] : (r[t] = e, n)
        }, n.addItems = function(t) {
            return i.a && i.a("string" === m.type(t) ? m(t) : t), n
        }, n.getItems = function() {
            return i.g ? i.g() : {}
        }, n.update = function(t) {
            return i.e && i.e({}, !t), n
        }, n.loadAll = function() {
            return i.e && i.e({
                all: !0
            }, !0), n
        }, n.destroy = function() {
            return m(n.config("appendScroll")).off("." + n.name, i.e), m(y).off("." + n.name), void(i = {})
        }, o(n, n.config, t, i), n.config("chainable") ? t : n
    }
    m.fn.Lazy = m.fn.lazy = function(t) {
        return new n(this, t)
    }, m.extend(n.prototype, {
        name: "lazy",
        configuration: {
            chainable: !0,
            autoDestroy: !0,
            bind: "load",
            threshold: 500,
            visibleOnly: !1,
            appendScroll: y,
            scrollDirection: "both",
            imageBase: null,
            defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            placeholder: null,
            delay: -1,
            combined: !1,
            attribute: "data-src",
            retinaAttribute: "data-retina",
            loaderAttribute: "data-loader",
            removeAttribute: !0,
            handledName: "handled",
            loadedName: "loaded",
            effect: "show",
            effectTime: 0,
            enableThrottle: !0,
            throttle: 250,
            beforeLoad: null,
            afterLoad: null,
            onError: null,
            onFinishedAll: null
        }
    })
}(jQuery, window, document);
var resizeEqualHeightElements = function() {
    $(".equal-height-row").each(function() {
        var n = {},
            t = $(this).find(".equal-elem"),
            e = $(this).find(".equal-float-candidate");
        e.height(1e3), t.each(function() {
            $(this).height("auto");
            var t = $(this).offset(),
                e = $(this).outerHeight();
            n[t.top] = void 0 === n[t.top] || e > n[t.top] ? e : n[t.top], $(this).attr("data-eqh-postop", t.top)
        }), t.each(function() {
            var t = $(this).attr("data-eqh-postop");
            $(this).css("height", n[t] + "px")
        }), e.height("auto")
    })
};
$(window).load(function() {
        $(window).bind("orientationchange resize load", function() {
            resizeEqualHeightElements()
        }).trigger("resize")
    }),
    function(t) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
        else if ("function" == typeof define && define.amd) define([], t);
        else {
            var e;
            "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.Asana = t()
        }
    }(function() {
        var L, t, e;
        return function o(a, s, l) {
            function u(n, t) {
                if (!s[n]) {
                    if (!a[n]) {
                        var e = "function" == typeof require && require;
                        if (!t && e) return e(n, !0);
                        if (c) return c(n, !0);
                        var r = new Error("Cannot find module '" + n + "'");
                        throw r.code = "MODULE_NOT_FOUND", r
                    }
                    var i = s[n] = {
                        exports: {}
                    };
                    a[n][0].call(i.exports, function(t) {
                        var e = a[n][1][t];
                        return u(e || t)
                    }, i, i.exports, o, a, s, l)
                }
                return s[n].exports
            }
            for (var c = "function" == typeof require && require, t = 0; t < l.length; t++) u(l[t]);
            return u
        }({
            1: [function(t, e, n) {
                n.Client = t("./lib/client"), n.Dispatcher = t("./lib/dispatcher"), n.auth = t("./lib/auth"), n.errors = t("./lib/errors"), n.resources = t("./lib/resources"), n.VERSION = t("./package.json").version
            }, {
                "./lib/auth": 8,
                "./lib/client": 15,
                "./lib/dispatcher": 17,
                "./lib/errors": 20,
                "./lib/resources": 37,
                "./package.json": 85
            }],
            2: [function(t, e, n) {
                var r = t("url"),
                    a = t("request"),
                    i = t("bluebird"),
                    s = t("./oauth_error"),
                    o = function(t) {
                        return new i(function(i, o) {
                            a(t, function(t, e, n) {
                                if (t) return o(t);
                                if (200 !== e.statusCode) return o(n);
                                var r = JSON.parse(n);
                                return r.error ? o(new s(r)) : i(r)
                            })
                        })
                    };

                function l(t) {
                    this.clientId = t.clientId, this.clientSecret = t.clientSecret || null, this.redirectUri = t.redirectUri || null, this.scope = t.scope || "default", this.asanaBaseUrl = t.asanaBaseUrl || "https://app.asana.com/"
                }
                l.prototype.asanaAuthorizeUrl = function(t) {
                    return t = t || {}, r.resolve(t.asanaBaseUrl || this.asanaBaseUrl, r.format({
                        pathname: "/-/oauth_authorize",
                        query: {
                            client_id: this.clientId,
                            response_type: "code",
                            redirect_uri: t.redirectUri || this.redirectUri,
                            scope: this.scope
                        }
                    }))
                }, l.prototype.asanaTokenUrl = function(t) {
                    return t = t || {}, r.resolve(t.asanaBaseUrl || this.asanaBaseUrl, "/-/oauth_token")
                }, l.prototype.accessTokenFromCode = function(t, e) {
                    e = e || {};
                    var n = {
                        method: "POST",
                        url: this.asanaTokenUrl(e),
                        formData: {
                            grant_type: "authorization_code",
                            client_id: this.clientId,
                            client_secret: this.clientSecret,
                            redirect_uri: e.redirectUri || this.redirectUri,
                            code: t
                        }
                    };
                    return o(n)
                }, l.prototype.accessTokenFromRefreshToken = function(t, e) {
                    e = e || {};
                    var n = {
                        method: "POST",
                        url: this.asanaTokenUrl(e),
                        formData: {
                            grant_type: "refresh_token",
                            client_id: this.clientId,
                            client_secret: this.clientSecret,
                            redirect_uri: e.redirectUri || this.redirectUri,
                            refresh_token: t
                        }
                    };
                    return o(n)
                }, e.exports = l
            }, {
                "./oauth_error": 11,
                bluebird: 51,
                request: 52,
                url: 82
            }],
            3: [function(t, e, n) {
                function r() {}
                r.prototype.authenticateRequest = function(t) {
                    throw new Error("not implemented", t)
                }, r.prototype.establishCredentials = function() {
                    throw new Error("not implemented")
                }, r.prototype.refreshCredentials = function() {
                    throw new Error("not implemented")
                }, e.exports = r
            }, {}],
            4: [function(t, e, n) {
                var r = t("./native_flow"),
                    i = t("./redirect_flow"),
                    o = t("./chrome_extension_flow"),
                    a = t("../default_environment");
                e.exports = function(t) {
                    return void 0 !== (t = t || a()).chrome && t.chrome.runtime && t.chrome.runtime.id ? t.chrome.tabs && t.chrome.tabs.create ? o : null : void 0 !== t.window && t.window.navigator ? i : void 0 !== t.process && t.process.env ? r : null
                }
            }, {
                "../default_environment": 16,
                "./chrome_extension_flow": 7,
                "./native_flow": 9,
                "./redirect_flow": 14
            }],
            5: [function(t, e, n) {
                var r = t("url"),
                    i = t("./oauth_util");

                function o(t) {
                    this.options = t
                }
                o.prototype.startAuthorization = function(t, e) {
                    throw new Error("Not implemented", t, e)
                }, o.prototype.finishAuthorization = function(t) {
                    throw new Error("Not implemented", t)
                }, o.prototype.receiverUrl = function() {
                    var t = this.options.redirectUri || this.options.app.redirectUri || "";
                    return r.resolve(window.location.href, t)
                }, o.prototype.asanaBaseUrl = function() {
                    return this.options.app.asanaBaseUrl
                }, o.prototype.getStateParam = function() {
                    return i.randomState()
                }, o.prototype.authorizeUrl = function() {
                    return r.resolve(this.asanaBaseUrl(), r.format({
                        pathname: "/-/oauth_authorize",
                        query: {
                            client_id: this.options.app.clientId,
                            response_type: "token",
                            redirect_uri: this.receiverUrl(),
                            scope: this.options.app.scope,
                            state: this.state
                        }
                    }))
                }, o.prototype.run = function() {
                    var t = this;
                    return t.state = t.getStateParam(t.options), t.startAuthorization(t.authorizeUrl(), t.state).then(function() {
                        return t.finishAuthorization(t.state)
                    })
                }, e.exports = o
            }, {
                "./oauth_util": 12,
                url: 82
            }],
            6: [function(t, e, n) {
                var r = t("util"),
                    i = t("bluebird"),
                    o = t("./authenticator");

                function a(t) {
                    this.apiKey = t
                }
                r.inherits(a, o), a.prototype.authenticateRequest = function(t) {
                    return t.auth = {
                        username: this.apiKey,
                        password: ""
                    }, t
                }, a.prototype.establishCredentials = function() {
                    return i.resolve()
                }, a.prototype.refreshCredentials = function() {
                    return i.resolve(!1)
                }, e.exports = a
            }, {
                "./authenticator": 3,
                bluebird: 51,
                util: 84
            }],
            7: [function(t, e, n) {
                var r = t("util"),
                    c = t("./oauth_util"),
                    i = t("./base_browser_flow"),
                    h = t("./oauth_error"),
                    o = t("bluebird");

                function a(t) {
                    i.call(this, t), this._authorizationPromise = null, this._receiverUrl = chrome.runtime.getURL(t.receiverPath || "asana_oauth_receiver.html")
                }
                r.inherits(a, i), a.prototype.receiverUrl = function() {
                    return this._receiverUrl
                }, a.prototype.startAuthorization = function(t, s) {
                    var l = this,
                        u = null;
                    return l._authorizationPromise = new o(function(i, o) {
                        var a = function(t, e) {
                            if (e && e.tab && e.tab.id === u && e.tab.url.substring(0, l._receiverUrl.length) === l._receiverUrl) {
                                var n = t.receivedUrl;
                                if (n) {
                                    var r = c.parseOauthResultFromUrl(n);
                                    if (r.state === s) s = null, chrome.tabs.remove(u, function() {
                                        chrome.runtime.lastError
                                    }), chrome.runtime.onMessage.removeListener(a), r.error ? o(new h(r)) : i(r)
                                }
                            }
                        };
                        chrome.runtime.onMessage.addListener(a), chrome.tabs.create({
                            url: t,
                            active: !0
                        }, function(t) {
                            u = t.id
                        })
                    }), o.resolve()
                }, a.prototype.finishAuthorization = function() {
                    return this._authorizationPromise
                }, a.runReceiver = function() {
                    window.addEventListener("load", function() {
                        var t = window.location.href;
                        c.removeOauthResultFromCurrentUrl(), chrome.runtime.sendMessage({
                            receivedUrl: t
                        }), window.close()
                    }, !1)
                }, e.exports = a
            }, {
                "./base_browser_flow": 5,
                "./oauth_error": 11,
                "./oauth_util": 12,
                bluebird: 51,
                util: 84
            }],
            8: [function(t, e, n) {
                n.BaseBrowserFlow = t("./base_browser_flow"), n.ChromeExtensionFlow = t("./chrome_extension_flow"), n.NativeFlow = t("./native_flow"), n.PopupFlow = t("./popup_flow"), n.RedirectFlow = t("./redirect_flow"), n.autoDetect = t("./auto_detect"), n.OauthError = t("./oauth_error"), n.App = t("./app")
            }, {
                "./app": 2,
                "./auto_detect": 4,
                "./base_browser_flow": 5,
                "./chrome_extension_flow": 7,
                "./native_flow": 9,
                "./oauth_error": 11,
                "./popup_flow": 13,
                "./redirect_flow": 14
            }],
            9: [function(s, l, t) {
                (function(e) {
                    var i = s("readline"),
                        o = s("bluebird"),
                        n = s("./oauth_util");

                    function r(t) {
                        return ["* * * * * * * * * * * * * * * * * * * * * * * * * * *", "Please open a browser to the url:", "", t, "", "and follow the prompts to authorize this application.", "* * * * * * * * * * * * * * * * * * * * * * * * * * *"].join("\n")
                    }

                    function a() {
                        return "Enter the code here: "
                    }

                    function t(t) {
                        this.app = t.app, this.instructions = t.instructions || r, this.prompt = t.prompt || a, this.redirectUri = n.NATIVE_REDIRECT_URI
                    }
                    t.prototype.run = function() {
                        var e = this;
                        return e.promptForCode(e.authorizeUrl()).then(function(t) {
                            return e.accessToken(t)
                        })
                    }, t.prototype.authorizeUrl = function() {
                        return this.app.asanaAuthorizeUrl({
                            redirectUri: this.redirectUri
                        })
                    }, t.prototype.accessToken = function(t) {
                        return this.app.accessTokenFromCode(t, {
                            redirectUri: this.redirectUri
                        })
                    }, t.prototype.promptForCode = function(t) {
                        var n = this,
                            r = i.createInterface({
                                input: e.stdin,
                                output: e.stdout
                            });
                        return new o(function(e) {
                            console.log(n.instructions(t)), r.question(n.prompt(), function(t) {
                                return r.close(), e(t)
                            })
                        })
                    }, l.exports = t
                }).call(this, s("_process"))
            }, {
                "./oauth_util": 12,
                _process: 65,
                bluebird: 51,
                readline: 54
            }],
            10: [function(t, e, n) {
                var r = t("util"),
                    i = t("bluebird"),
                    o = t("./authenticator");

                function a(t) {
                    o.call(this), "string" == typeof t.credentials ? this.credentials = {
                        access_token: t.credentials
                    } : this.credentials = t.credentials || null, this.flow = t.flow || null, this.app = t.app
                }
                r.inherits(a, o), a.prototype.authenticateRequest = function(t) {
                    if (null === this.credentials) throw new Error("Cannot authenticate a request without first obtaining credentials");
                    return t.headers = t.headers || {}, t.headers.Authorization = "Bearer " + this.credentials.access_token, t
                }, a.prototype.establishCredentials = function() {
                    var e = this;
                    return e.flow ? (e.credentials = null, e.flow.run().then(function(t) {
                        e.credentials = t
                    })) : e.credentials.access_token ? i.resolve() : e.credentials.refresh_token ? e.refreshCredentials() : i.reject(new Error("Invalid credentials"))
                }, a.prototype.refreshCredentials = function() {
                    var e = this;
                    if (e.credentials && e.credentials.refresh_token) {
                        if (!e.refreshPromise) {
                            var n = e.credentials.refresh_token;
                            e.refreshPromise = e.app.accessTokenFromRefreshToken(n).then(function(t) {
                                return t.refresh_token || (t.refresh_token = n), e.credentials = t, !(e.refreshPromise = null)
                            })
                        }
                        return e.refreshPromise
                    }
                    return e.flow ? this.establishCredentials().then(function(t) {
                        return null !== t
                    }) : i.resolve(!1)
                }, e.exports = a
            }, {
                "./authenticator": 3,
                bluebird: 51,
                util: 84
            }],
            11: [function(t, e, n) {
                function r(t) {
                    if (Error.call(this), "object" != typeof t || !t.error) throw new Error("Invalid Oauth error: " + t);
                    this.code = t.error, this.description = t.error_description || null, this.uri = t.error_uri || null
                }
                t("util").inherits(r, Error), e.exports = r
            }, {
                util: 84
            }],
            12: [function(t, e, n) {
                var r = t("querystring"),
                    i = t("url");
                e.exports = {
                    NATIVE_REDIRECT_URI: "urn:ietf:wg:oauth:2.0:oob",
                    NATIVE_AUTO_REDIRECT_URI: "urn:ietf:wg:oauth:2.0:oob:auto",
                    randomState: function() {
                        return "asana_" + Math.random().toString(36) + Date.now().toString(36)
                    },
                    parseOauthResultFromUrl: function(t) {
                        var e = i.parse(t);
                        return e.hash ? r.parse(e.hash.substr(1)) : null
                    },
                    removeOauthResultFromCurrentUrl: function() {
                        if (window.history && window.history.replaceState) {
                            var t = window.location.href,
                                e = t.indexOf("#");
                            window.history.replaceState({}, document.title, t.substring(0, e))
                        } else window.location.hash = ""
                    }
                }
            }, {
                querystring: 69,
                url: 82
            }],
            13: [function(t, e, n) {
                var l = t("util"),
                    c = t("./oauth_util"),
                    r = t("bluebird"),
                    i = t("./base_browser_flow"),
                    h = t("./oauth_error");

                function o(t) {
                    i.call(this, t), this._authorizationPromise = null
                }
                l.inherits(o, i), o.prototype.startAuthorization = function(e, o) {
                    var n, a, s, l = this;

                    function u() {
                        n && a && (clearInterval(a), a = null), s && (window.removeEventListener("message", s, !1), s = null)
                    }
                    return l._authorizationPromise = new r(function(r, i) {
                        if (s = function(t) {
                                var e;
                                try {
                                    e = t.data.receivedUrl
                                } catch (t) {}
                                if (e) {
                                    var n = c.parseOauthResultFromUrl(e);
                                    n.state === o && (o = null, u(), n.error ? i(new h(n)) : r(n))
                                }
                            }, window.addEventListener("message", s, !1), !(n = window.open(e, "asana_oauth", l._popupParams(800, 600)))) return u(), void i(new h({
                            error: "access_denied",
                            error_description: "The popup window containing the authorization UI was blocked by the browser."
                        }));
                        var t = !1;
                        a = setInterval(function() {
                            n.closed && (t ? (u(), i(new h({
                                error: "access_denied",
                                error_description: "The popup window containing the authorization UI was closed by the user."
                            }))) : t = !0)
                        }, 500)
                    }), r.resolve()
                }, o.prototype.finishAuthorization = function() {
                    return this._authorizationPromise
                }, o.prototype._popupParams = function(t, e) {
                    var n = window.screenX || window.screenLeft || 0,
                        r = window.screenY || window.screenTop || 0,
                        i = window.outerWidth || document.documentElement.clientWidth,
                        o = window.outerHeight || document.documentElement.clientHeight,
                        a = Math.max(n, Math.round(n + (i - t) / 2)),
                        s = Math.max(r, Math.round(r + (o - e) / 2.5));
                    return l.format("left=%d,top=%d,width=%d,height=%d,dialog=yes,dependent=yes,scrollbars=yes,location=yes", a, s, t, e)
                }, o.runReceiver = function() {
                    window.addEventListener("load", function() {
                        var t = window.location.href;
                        c.removeOauthResultFromCurrentUrl();
                        var e = window.opener;
                        window.parent !== window.top && (e = e || window.parent), window.opener ? (console.log("Posting message", t, window.location.origin), e.postMessage({
                            receivedUrl: t
                        }, window.location.origin), window.close()) : console.log("No opener found for this window, not sending message")
                    }, !1)
                }, e.exports = o
            }, {
                "./base_browser_flow": 5,
                "./oauth_error": 11,
                "./oauth_util": 12,
                bluebird: 51,
                util: 84
            }],
            14: [function(t, e, n) {
                var r = t("util"),
                    i = t("./oauth_util"),
                    o = t("./base_browser_flow"),
                    a = t("./oauth_error"),
                    s = t("bluebird");

                function l(t) {
                    o.call(this, t)
                }
                r.inherits(l, o), l.prototype.getStateParam = function() {
                    var t = i.parseOauthResultFromUrl(window.location.href);
                    return null !== t && t.state ? t.state : o.prototype.getStateParam.call(this)
                }, l.prototype.startAuthorization = function(t) {
                    return null !== i.parseOauthResultFromUrl(window.location.href) ? s.resolve() : (window.location.href = t, new s(function() {}))
                }, l.prototype.finishAuthorization = function() {
                    var t = window.location.href;
                    i.removeOauthResultFromCurrentUrl();
                    var e = i.parseOauthResultFromUrl(t);
                    return e.error ? s.reject(new a(e)) : s.resolve(e)
                }, e.exports = l
            }, {
                "./base_browser_flow": 5,
                "./oauth_error": 11,
                "./oauth_util": 12,
                bluebird: 51,
                util: 84
            }],
            15: [function(t, e, n) {
                var r = t("./dispatcher"),
                    i = t("./resources"),
                    o = t("./auth/basic_authenticator"),
                    a = t("./auth/oauth_authenticator"),
                    s = t("./auth/app"),
                    l = t("./auth/auto_detect");

                function u(t, e) {
                    e = e || {}, this.dispatcher = t, this.attachments = new i.Attachments(this.dispatcher), this.events = new i.Events(this.dispatcher), this.projects = new i.Projects(this.dispatcher), this.stories = new i.Stories(this.dispatcher), this.tags = new i.Tags(this.dispatcher), this.tasks = new i.Tasks(this.dispatcher), this.teams = new i.Teams(this.dispatcher), this.users = new i.Users(this.dispatcher), this.workspaces = new i.Workspaces(this.dispatcher), this.app = new s(e)
                }
                u.prototype.authorize = function() {
                    var t = this;
                    return t.dispatcher.authorize().then(function() {
                        return t
                    })
                }, u.prototype.useBasicAuth = function(t) {
                    return this.dispatcher.setAuthenticator(new o(t)), this
                }, u.prototype.useAccessToken = function(t) {
                    var e = new a({
                        credentials: t
                    });
                    return this.dispatcher.setAuthenticator(e), this
                }, u.prototype.useOauth = function(t) {
                    (t = t || {}).app = this.app;
                    var e = t.flowType || l();
                    if (!t.credentials && null === e) throw new Error("Could not autodetect Oauth flow type");
                    var n = new e(t),
                        r = new a({
                            app: this.app,
                            credentials: t.credentials,
                            flow: n
                        });
                    return this.dispatcher.setAuthenticator(r), this
                }, u.create = function(t) {
                    return new u(new r({
                        asanaBaseUrl: (t = t || {}).asanaBaseUrl,
                        timeout: t.requestTimeout
                    }), t)
                }, e.exports = u
            }, {
                "./auth/app": 2,
                "./auth/auto_detect": 4,
                "./auth/basic_authenticator": 6,
                "./auth/oauth_authenticator": 10,
                "./dispatcher": 17,
                "./resources": 37
            }],
            16: [function(t, n, e) {
                (function(e) {
                    n.exports = function() {
                        var t = {};
                        return "undefined" != typeof window && (t.window = window), "undefined" != typeof chrome && (t.chrome = chrome), void 0 !== e && (t.process = e), t
                    }
                }).call(this, t("_process"))
            }, {
                _process: 65
            }],
            17: [function(a, t, e) {
                (function(e) {
                    var l = a("./errors"),
                        u = a("bluebird"),
                        n = a("request"),
                        r = a("querystring"),
                        i = a("../package.json").version,
                        c = Object.keys(l).reduce(function(t, e) {
                            var n = new l[e](null);
                            return n.status && (t[n.status] = l[e]), t
                        }, {});

                    function o(t) {
                        t = t || {}, this.authenticator = t.authenticator || null, this.asanaBaseUrl = t.asanaBaseUrl || "https://app.asana.com/", this.retryOnRateLimit = t.retryOnRateLimit || !1, this.handleUnauthorized = void 0 !== t.handleUnauthorized ? t.handleUnauthorized : o.maybeReauthorize, this._cachedVersionInfo = null, this.requestTimeout = t.requestTimeout || null
                    }
                    o.API_PATH = "api/1.0", o.maybeReauthorize = function() {
                        return !!this.authenticator && this.authenticator.refreshCredentials()
                    }, o.prototype.url = function(t) {
                        return this.asanaBaseUrl + o.API_PATH + t
                    }, o.prototype.setAuthenticator = function(t) {
                        return this.authenticator = t, this
                    }, o.prototype.authorize = function() {
                        if (null === this.authenticator) throw new Error("No authenticator configured for dispatcher");
                        return this.authenticator.establishCredentials()
                    }, o.prototype.dispatch = function(t, e) {
                        var s = this;
                        return e = e || {}, this.requestTimeout && (t.timeout = this.requestTimeout), new u(function(o, a) {
                            ! function i() {
                                null !== s.authenticator && s.authenticator.authenticateRequest(t), s._addVersionInfo(t), n(t, function(t, e, n) {
                                    if (t) return a(t);
                                    if (!c[e.statusCode]) return o(n);
                                    var r = new c[e.statusCode](n);
                                    if (s.retryOnRateLimit && r instanceof l.RateLimitEnforced) setTimeout(i, 1e3 * r.retryAfterSeconds + 500);
                                    else {
                                        if (!(s.handleUnauthorized && r instanceof l.NoAuthorization)) return a(r);
                                        u.resolve(s.handleUnauthorized()).then(function(t) {
                                            t ? i() : a(r)
                                        })
                                    }
                                })
                            }()
                        })
                    }, o.prototype.get = function(t, e, n) {
                        var r = {
                            method: "GET",
                            url: this.url(t),
                            json: !0
                        };
                        return e && (r.qs = e), this.dispatch(r, n)
                    }, o.prototype.post = function(t, e, n) {
                        var r = {
                            method: "POST",
                            url: this.url(t),
                            json: {
                                data: e
                            }
                        };
                        return this.dispatch(r, n)
                    }, o.prototype.put = function(t, e, n) {
                        var r = {
                            method: "PUT",
                            url: this.url(t),
                            json: {
                                data: e
                            }
                        };
                        return this.dispatch(r, n)
                    }, o.prototype.delete = function(t, e) {
                        var n = {
                            method: "DELETE",
                            url: this.url(t)
                        };
                        return this.dispatch(n, e)
                    }, o.prototype._addVersionInfo = function(t) {
                        this._cachedVersionInfo || (this._cachedVersionInfo = this._generateVersionInfo()), t.headers = t.headers || {}, t.headers["X-Asana-Client-Lib"] = r.stringify(this._cachedVersionInfo)
                    }, o.prototype._generateVersionInfo = function() {
                        if ("undefined" == typeof navigator || "undefined" == typeof window) {
                            var t = a("os");
                            return {
                                version: i,
                                language: "NodeJS",
                                language_version: e.version,
                                os: t.type(),
                                os_version: t.release()
                            }
                        }
                        return {
                            version: i,
                            language: "BrowserJS"
                        }
                    }, t.exports = o
                }).call(this, a("_process"))
            }, {
                "../package.json": 85,
                "./errors": 20,
                _process: 65,
                bluebird: 51,
                os: 64,
                querystring: 69,
                request: 52
            }],
            18: [function(t, e, n) {
                function r(t) {
                    this.message = t;
                    try {
                        throw new Error(t)
                    } catch (t) {
                        this.stack = t.stack
                    }
                }
                r.prototype = Object.create(Error.prototype), e.exports = r
            }, {}],
            19: [function(t, e, n) {
                var r = t("util"),
                    i = t("./error");

                function o(t) {
                    i.call(this, "Forbidden"), this.status = 403, this.value = t
                }
                r.inherits(o, Error), e.exports = o
            }, {
                "./error": 18,
                util: 84
            }],
            20: [function(t, e, n) {
                n.InvalidRequest = t("./invalid_request"), n.NoAuthorization = t("./no_authorization"), n.Forbidden = t("./forbidden"), n.NotFound = t("./not_found"), n.RateLimitEnforced = t("./rate_limit_enforced"), n.ServerError = t("./server_error")
            }, {
                "./forbidden": 19,
                "./invalid_request": 21,
                "./no_authorization": 22,
                "./not_found": 23,
                "./rate_limit_enforced": 24,
                "./server_error": 25
            }],
            21: [function(t, e, n) {
                var r = t("util"),
                    i = t("./error");

                function o(t) {
                    i.call(this, "Invalid Request"), this.status = 400, this.value = t
                }
                r.inherits(o, Error), e.exports = o
            }, {
                "./error": 18,
                util: 84
            }],
            22: [function(t, e, n) {
                var r = t("util"),
                    i = t("./error");

                function o(t) {
                    i.call(this, "No Authorization"), this.status = 401, this.value = t
                }
                r.inherits(o, Error), e.exports = o
            }, {
                "./error": 18,
                util: 84
            }],
            23: [function(t, e, n) {
                var r = t("util"),
                    i = t("./error");

                function o(t) {
                    i.call(this, "Not Found"), this.status = 404, this.value = t
                }
                r.inherits(o, Error), e.exports = o
            }, {
                "./error": 18,
                util: 84
            }],
            24: [function(t, e, n) {
                var r = t("util"),
                    i = t("./error");

                function o(t) {
                    i.call(this, "Rate Limit Enforced"), this.status = 429, this.value = t, this.retryAfterSeconds = t && parseInt(t.retry_after, 10)
                }
                r.inherits(o, Error), e.exports = o
            }, {
                "./error": 18,
                util: 84
            }],
            25: [function(t, e, n) {
                var r = t("util"),
                    i = t("./error");

                function o(t) {
                    i.call(this, "Server Error"), this.status = 500, this.value = t
                }
                r.inherits(o, Error), e.exports = o
            }, {
                "./error": 18,
                util: 84
            }],
            26: [function(t, e, n) {
                var r = t("./gen/attachments");
                e.exports = r
            }, {
                "./gen/attachments": 28
            }],
            27: [function(t, e, n) {
                var r = t("../util/event_stream"),
                    i = t("./gen/events");
                i.prototype.get = function(t, e) {
                    var n = {
                        resource: t
                    };
                    return e && (n.sync = e), this.dispatcher.get("/events", n)
                }, i.prototype.stream = function(t, e) {
                    return new r(this, t, e)
                }, i.EventStream = r, e.exports = i
            }, {
                "../util/event_stream": 48,
                "./gen/events": 29
            }],
            28: [function(t, e, n) {
                var r = t("../resource"),
                    i = t("util");
                t("lodash");

                function o(t) {
                    r.call(this, t)
                }
                i.inherits(o, r), o.prototype.findById = function(t, e, n) {
                    var r = i.format("/attachments/%s", t);
                    return this.dispatchGet(r, e, n)
                }, o.prototype.findByTask = function(t, e, n) {
                    var r = i.format("/tasks/%s/attachments", t);
                    return this.dispatchGetCollection(r, e, n)
                }, e.exports = o
            }, {
                "../resource": 39,
                lodash: 63,
                util: 84
            }],
            29: [function(t, e, n) {
                var r = t("../resource"),
                    i = t("util");
                t("lodash");

                function o(t) {
                    r.call(this, t)
                }
                i.inherits(o, r), e.exports = o
            }, {
                "../resource": 39,
                lodash: 63,
                util: 84
            }],
            30: [function(t, e, n) {
                var r = t("../resource"),
                    i = t("util");
                t("lodash");

                function o(t) {
                    r.call(this, t)
                }
                i.inherits(o, r), o.prototype.create = function(t, e) {
                    var n = i.format("/projects");
                    return this.dispatchPost(n, t, e)
                }, o.prototype.createInWorkspace = function(t, e, n) {
                    var r = i.format("/workspaces/%s/projects", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.createInTeam = function(t, e, n) {
                    var r = i.format("/teams/%s/projects", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.findById = function(t, e, n) {
                    var r = i.format("/projects/%s", t);
                    return this.dispatchGet(r, e, n)
                }, o.prototype.update = function(t, e, n) {
                    var r = i.format("/projects/%s", t);
                    return this.dispatchPut(r, e, n)
                }, o.prototype.delete = function(t, e) {
                    var n = i.format("/projects/%s", t);
                    return this.dispatchDelete(n, e)
                }, o.prototype.findAll = function(t, e) {
                    var n = i.format("/projects");
                    return this.dispatchGetCollection(n, t, e)
                }, o.prototype.findByWorkspace = function(t, e, n) {
                    var r = i.format("/workspaces/%s/projects", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.findByTeam = function(t, e, n) {
                    var r = i.format("/teams/%s/projects", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.sections = function(t, e, n) {
                    var r = i.format("/projects/%s/sections", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.tasks = function(t, e, n) {
                    var r = i.format("/projects/%s/tasks", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.addFollowers = function(t, e, n) {
                    var r = i.format("/projects/%s/addFollowers", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.removeFollowers = function(t, e, n) {
                    var r = i.format("/projects/%s/removeFollowers", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.addMembers = function(t, e, n) {
                    var r = i.format("/projects/%s/addMembers", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.removeMembers = function(t, e, n) {
                    var r = i.format("/projects/%s/removeMembers", t);
                    return this.dispatchPost(r, e, n)
                }, e.exports = o
            }, {
                "../resource": 39,
                lodash: 63,
                util: 84
            }],
            31: [function(t, e, n) {
                var r = t("../resource"),
                    i = t("util");
                t("lodash");

                function o(t) {
                    r.call(this, t)
                }
                i.inherits(o, r), o.prototype.findByTask = function(t, e, n) {
                    var r = i.format("/tasks/%s/stories", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.findById = function(t, e, n) {
                    var r = i.format("/stories/%s", t);
                    return this.dispatchGet(r, e, n)
                }, o.prototype.createOnTask = function(t, e, n) {
                    var r = i.format("/tasks/%s/stories", t);
                    return this.dispatchPost(r, e, n)
                }, e.exports = o
            }, {
                "../resource": 39,
                lodash: 63,
                util: 84
            }],
            32: [function(t, e, n) {
                var r = t("../resource"),
                    i = t("util");
                t("lodash");

                function o(t) {
                    r.call(this, t)
                }
                i.inherits(o, r), o.prototype.create = function(t, e) {
                    var n = i.format("/tags");
                    return this.dispatchPost(n, t, e)
                }, o.prototype.createInWorkspace = function(t, e, n) {
                    var r = i.format("/workspaces/%s/tags", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.findById = function(t, e, n) {
                    var r = i.format("/tags/%s", t);
                    return this.dispatchGet(r, e, n)
                }, o.prototype.update = function(t, e, n) {
                    var r = i.format("/tags/%s", t);
                    return this.dispatchPut(r, e, n)
                }, o.prototype.delete = function(t, e) {
                    var n = i.format("/tags/%s", t);
                    return this.dispatchDelete(n, e)
                }, o.prototype.findAll = function(t, e) {
                    var n = i.format("/tags");
                    return this.dispatchGetCollection(n, t, e)
                }, o.prototype.findByWorkspace = function(t, e, n) {
                    var r = i.format("/workspaces/%s/tags", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.getTasksWithTag = function(t, e, n) {
                    var r = i.format("/tags/%s/tasks", t);
                    return this.dispatchGetCollection(r, e, n)
                }, e.exports = o
            }, {
                "../resource": 39,
                lodash: 63,
                util: 84
            }],
            33: [function(t, e, n) {
                var r = t("../resource"),
                    i = t("util");
                t("lodash");

                function o(t) {
                    r.call(this, t)
                }
                i.inherits(o, r), o.prototype.create = function(t, e) {
                    var n = i.format("/tasks");
                    return this.dispatchPost(n, t, e)
                }, o.prototype.createInWorkspace = function(t, e, n) {
                    var r = i.format("/workspaces/%s/tasks", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.findById = function(t, e, n) {
                    var r = i.format("/tasks/%s", t);
                    return this.dispatchGet(r, e, n)
                }, o.prototype.update = function(t, e, n) {
                    var r = i.format("/tasks/%s", t);
                    return this.dispatchPut(r, e, n)
                }, o.prototype.delete = function(t, e) {
                    var n = i.format("/tasks/%s", t);
                    return this.dispatchDelete(n, e)
                }, o.prototype.findByProject = function(t, e, n) {
                    var r = i.format("/projects/%s/tasks", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.findByTag = function(t, e, n) {
                    var r = i.format("/tags/%s/tasks", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.findAll = function(t, e) {
                    var n = i.format("/tasks");
                    return this.dispatchGetCollection(n, t, e)
                }, o.prototype.addFollowers = function(t, e, n) {
                    var r = i.format("/tasks/%s/addFollowers", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.removeFollowers = function(t, e, n) {
                    var r = i.format("/tasks/%s/removeFollowers", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.projects = function(t, e, n) {
                    var r = i.format("/tasks/%s/projects", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.addProject = function(t, e, n) {
                    var r = i.format("/tasks/%s/addProject", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.removeProject = function(t, e, n) {
                    var r = i.format("/tasks/%s/removeProject", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.tags = function(t, e, n) {
                    var r = i.format("/tasks/%s/tags", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.addTag = function(t, e, n) {
                    var r = i.format("/tasks/%s/addTag", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.removeTag = function(t, e, n) {
                    var r = i.format("/tasks/%s/removeTag", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.subtasks = function(t, e, n) {
                    var r = i.format("/tasks/%s/subtasks", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.addSubtask = function(t, e, n) {
                    var r = i.format("/tasks/%s/subtasks", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.stories = function(t, e, n) {
                    var r = i.format("/tasks/%s/stories", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.addComment = function(t, e, n) {
                    var r = i.format("/tasks/%s/stories", t);
                    return this.dispatchPost(r, e, n)
                }, e.exports = o
            }, {
                "../resource": 39,
                lodash: 63,
                util: 84
            }],
            34: [function(t, e, n) {
                var r = t("../resource"),
                    i = t("util");
                t("lodash");

                function o(t) {
                    r.call(this, t)
                }
                i.inherits(o, r), o.prototype.findById = function(t, e, n) {
                    var r = i.format("/teams/%s", t);
                    return this.dispatchGet(r, e, n)
                }, o.prototype.findByOrganization = function(t, e, n) {
                    var r = i.format("/organizations/%s/teams", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.users = function(t, e, n) {
                    var r = i.format("/teams/%s/users", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.addUser = function(t, e, n) {
                    var r = i.format("/teams/%s/addUser", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.removeUser = function(t, e, n) {
                    var r = i.format("/teams/%s/removeUser", t);
                    return this.dispatchPost(r, e, n)
                }, e.exports = o
            }, {
                "../resource": 39,
                lodash: 63,
                util: 84
            }],
            35: [function(t, e, n) {
                var r = t("../resource"),
                    i = t("util");
                t("lodash");

                function o(t) {
                    r.call(this, t)
                }
                i.inherits(o, r), o.prototype.me = function(t, e) {
                    var n = i.format("/users/me");
                    return this.dispatchGet(n, t, e)
                }, o.prototype.findById = function(t, e, n) {
                    var r = i.format("/users/%s", t);
                    return this.dispatchGet(r, e, n)
                }, o.prototype.findByWorkspace = function(t, e, n) {
                    var r = i.format("/workspaces/%s/users", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.findAll = function(t, e) {
                    var n = i.format("/users");
                    return this.dispatchGetCollection(n, t, e)
                }, e.exports = o
            }, {
                "../resource": 39,
                lodash: 63,
                util: 84
            }],
            36: [function(t, e, n) {
                var r = t("../resource"),
                    i = t("util");
                t("lodash");

                function o(t) {
                    r.call(this, t)
                }
                i.inherits(o, r), o.prototype.findById = function(t, e, n) {
                    var r = i.format("/workspaces/%s", t);
                    return this.dispatchGet(r, e, n)
                }, o.prototype.findAll = function(t, e) {
                    var n = i.format("/workspaces");
                    return this.dispatchGetCollection(n, t, e)
                }, o.prototype.update = function(t, e, n) {
                    var r = i.format("/workspaces/%s", t);
                    return this.dispatchPut(r, e, n)
                }, o.prototype.typeahead = function(t, e, n) {
                    var r = i.format("/workspaces/%s/typeahead", t);
                    return this.dispatchGetCollection(r, e, n)
                }, o.prototype.addUser = function(t, e, n) {
                    var r = i.format("/workspaces/%s/addUser", t);
                    return this.dispatchPost(r, e, n)
                }, o.prototype.removeUser = function(t, e, n) {
                    var r = i.format("/workspaces/%s/removeUser", t);
                    return this.dispatchPost(r, e, n)
                }, e.exports = o
            }, {
                "../resource": 39,
                lodash: 63,
                util: 84
            }],
            37: [function(t, e, n) {
                n.Resource = t("./resource"), n.Attachments = t("./attachments"), n.Events = t("./events"), n.Projects = t("./projects"), n.Stories = t("./stories"), n.Tags = t("./tags"), n.Tasks = t("./tasks"), n.Teams = t("./teams"), n.Users = t("./users"), n.Workspaces = t("./workspaces")
            }, {
                "./attachments": 26,
                "./events": 27,
                "./projects": 38,
                "./resource": 39,
                "./stories": 40,
                "./tags": 41,
                "./tasks": 42,
                "./teams": 43,
                "./users": 44,
                "./workspaces": 45
            }],
            38: [function(t, e, n) {
                var r = t("./gen/projects");
                e.exports = r
            }, {
                "./gen/projects": 30
            }],
            39: [function(t, e, n) {
                var i = t("../util/collection");

                function o(t) {
                    this.dispatcher = t
                }
                o.DEFAULT_PAGE_LIMIT = 50, o.getCollection = function(t, e, n, r) {
                    return (n = n || {}).limit = n.limit || o.DEFAULT_PAGE_LIMIT, i.fromDispatch(t.get(e, n, r), t, r)
                }, o.unwrap = function(t) {
                    return t.then(function(t) {
                        return t.data
                    })
                }, o.prototype.dispatchGet = function(t, e, n) {
                    return o.unwrap(this.dispatcher.get(t, e, n))
                }, o.prototype.dispatchGetCollection = function(t, e, n) {
                    return o.getCollection(this.dispatcher, t, e, n)
                }, o.prototype.dispatchPost = function(t, e, n) {
                    return o.unwrap(this.dispatcher.post(t, e, n))
                }, o.prototype.dispatchPut = function(t, e, n) {
                    return o.unwrap(this.dispatcher.put(t, e, n))
                }, o.prototype.dispatchDelete = function(t, e) {
                    return o.unwrap(this.dispatcher.delete(t, e))
                }, e.exports = o
            }, {
                "../util/collection": 47
            }],
            40: [function(t, e, n) {
                var r = t("./gen/stories");
                e.exports = r
            }, {
                "./gen/stories": 31
            }],
            41: [function(t, e, n) {
                var r = t("./gen/tags");
                e.exports = r
            }, {
                "./gen/tags": 32
            }],
            42: [function(t, e, n) {
                var i = t("util"),
                    r = t("./gen/tasks"),
                    o = t("lodash");
                r.prototype.findByExternalId = function(t, e) {
                    var n = i.format("/tasks/%s", encodeURIComponent("external:" + t));
                    return this.dispatchGet(n, e)
                }, r.prototype.setParent = function(t, e, n) {
                    var r = i.format("/tasks/%s/setParent", t);
                    return n = o.extend({}, n || {}, {
                        parent: null !== e ? String(e) : null
                    }), this.dispatchPost(r, n)
                }, e.exports = r
            }, {
                "./gen/tasks": 33,
                lodash: 63,
                util: 84
            }],
            43: [function(t, e, n) {
                var r = t("./gen/teams");
                e.exports = r
            }, {
                "./gen/teams": 34
            }],
            44: [function(t, e, n) {
                var r = t("./gen/users");
                e.exports = r
            }, {
                "./gen/users": 35
            }],
            45: [function(t, e, n) {
                var r = t("./gen/workspaces");
                e.exports = r
            }, {
                "./gen/workspaces": 36
            }],
            46: [function(t, e, n) {
                var r = t("stream").Readable;

                function i(t) {
                    r.call(this, t), this._buffer = []
                }
                t("util").inherits(i, r), i.prototype._read = function() {
                    if (0 < this._buffer.length) {
                        for (var t = 0; t < this._buffer.length; t++)
                            if (!this.push(this._buffer[t])) return void(this._buffer = this._buffer.slice(t));
                        this._buffer = []
                    }
                    this._readUnbuffered()
                }, i.prototype.pushBuffered = function(t) {
                    var e = 0 < this._buffer.length;
                    return e || this.push(t) || (e = !0), e && this._buffer.push(t), !e
                }, i.prototype._readUnbuffered = function() {
                    throw new Error("not implemented")
                }, e.exports = i
            }, {
                stream: 70,
                util: 84
            }],
            47: [function(t, e, n) {
                var r = t("bluebird"),
                    i = t("./resource_stream");

                function o(t, e, n) {
                    if (!o.isCollectionResponse(t)) throw new Error("Cannot create Collection from response that does not have resources");
                    this.data = t.data, this._response = t, this._dispatcher = e, this._dispatchOptions = n
                }
                o.fromDispatch = function(t, e, n) {
                    return t.then(function(t) {
                        return new o(t, e, n)
                    })
                }, o.isCollectionResponse = function(t) {
                    return "object" == typeof t && "object" == typeof t.data && "number" == typeof t.data.length
                }, o.prototype.stream = function() {
                    return new i(this)
                }, o.prototype.nextPage = function() {
                    var t = this._response.next_page;
                    if (null === t) return r.resolve(null);
                    if ("object" == typeof t) {
                        var e = t.uri;
                        return o.fromDispatch(this._dispatcher.dispatch({
                            method: "GET",
                            url: e,
                            json: !0
                        }, this._dispatchOptions), this._dispatcher, this._dispatchOptions)
                    }
                    throw new Error("Cannot fetch next page of response that does not have paging info")
                }, o.prototype.fetch = function(o) {
                    var t = this;
                    return o = o || 1e5, new r(function(n, r) {
                        var i = [];
                        ! function t(e) {
                            null === e ? n(i) : ([].push.apply(i, e.data), i.length >= o ? (i = i.slice(0, o), n(i)) : e.nextPage().then(t).catch(r))
                        }(t)
                    })
                }, e.exports = o
            }, {
                "./resource_stream": 49,
                bluebird: 51
            }],
            48: [function(t, e, n) {
                var r = t("./buffered_readable");

                function i(t, e, n) {
                    r.call(this, {
                        objectMode: !0
                    }), this.resourceId = e, this.events = t, this.syncToken = null, this.options = n || {}, this.options.periodSeconds = this.options.periodSeconds || 5, this._lastPollTime = 0, this._polling = !1
                }
                t("util").inherits(i, r), i.prototype._readUnbuffered = function() {
                    this._polling || this._schedule()
                }, i.prototype._schedule = function() {
                    var t = this;
                    if (0 === t._lastPollTime) t._poll();
                    else {
                        var e = Date.now(),
                            n = Math.max(0, 1e3 * t.options.periodSeconds - (e - t._lastPollTime));
                        setTimeout(function() {
                            t._poll()
                        }, n)
                    }
                }, i.prototype._poll = function() {
                    var n = this;
                    n._polling = !0, n._lastPollTime = Date.now(), n.events.get(n.resourceId, n.syncToken).then(function(t) {
                        n.syncToken = t.sync;
                        var e = !0;
                        t.data && 0 < t.data.length && t.data.forEach(function(t) {
                            e = e && n.pushBuffered(t)
                        }), e && n._schedule()
                    }).catch(function(t) {
                        n.emit("error", t), n._schedule()
                    })
                }, e.exports = i
            }, {
                "./buffered_readable": 46,
                util: 84
            }],
            49: [function(t, e, n) {
                var r = t("./buffered_readable");

                function i(t) {
                    r.call(this, {
                        objectMode: !0
                    }), this._collection = t, this._fetching = !1, this._pushCollection()
                }
                t("util").inherits(i, r), i.prototype._pushCollection = function() {
                    var e = this;
                    e._collection.data.forEach(function(t) {
                        e.pushBuffered(t)
                    })
                }, i.prototype._readUnbuffered = function() {
                    var e = this;
                    e._collection ? e._fetching || (e._fetching = !0, e._collection.nextPage().then(function(t) {
                        e._fetching = !1, t ? (e._collection = t, e._pushCollection()) : e.pushBuffered(null)
                    }).catch(function(t) {
                        e._fetching = !1, e._collection = null, e.emit("error", t)
                    })) : e.pushBuffered(null)
                }, e.exports = i
            }, {
                "./buffered_readable": 46,
                util: 84
            }],
            50: [function(t, e, n) {
                ! function(t) {
                    "use strict";
                    var c = "undefined" != typeof Uint8Array ? Uint8Array : Array,
                        n = "+".charCodeAt(0),
                        r = "/".charCodeAt(0),
                        i = "0".charCodeAt(0),
                        o = "a".charCodeAt(0),
                        a = "A".charCodeAt(0),
                        s = "-".charCodeAt(0),
                        l = "_".charCodeAt(0);

                    function h(t) {
                        var e = t.charCodeAt(0);
                        return e === n || e === s ? 62 : e === r || e === l ? 63 : e < i ? -1 : e < i + 10 ? e - i + 26 + 26 : e < a + 26 ? e - a : e < o + 26 ? e - o + 26 : void 0
                    }
                    t.toByteArray = function(t) {
                        var e, n, r, i, o, a;
                        if (0 < t.length % 4) throw new Error("Invalid string. Length must be a multiple of 4");
                        var s = t.length;
                        o = "=" === t.charAt(s - 2) ? 2 : "=" === t.charAt(s - 1) ? 1 : 0, a = new c(3 * t.length / 4 - o), r = 0 < o ? t.length - 4 : t.length;
                        var l = 0;

                        function u(t) {
                            a[l++] = t
                        }
                        for (n = e = 0; e < r; e += 4, n += 3) u((16711680 & (i = h(t.charAt(e)) << 18 | h(t.charAt(e + 1)) << 12 | h(t.charAt(e + 2)) << 6 | h(t.charAt(e + 3)))) >> 16), u((65280 & i) >> 8), u(255 & i);
                        return 2 === o ? u(255 & (i = h(t.charAt(e)) << 2 | h(t.charAt(e + 1)) >> 4)) : 1 === o && (u((i = h(t.charAt(e)) << 10 | h(t.charAt(e + 1)) << 4 | h(t.charAt(e + 2)) >> 2) >> 8 & 255), u(255 & i)), a
                    }, t.fromByteArray = function(t) {
                        var e, n, r, i, o = t.length % 3,
                            a = "";

                        function s(t) {
                            return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(t)
                        }
                        for (e = 0, r = t.length - o; e < r; e += 3) n = (t[e] << 16) + (t[e + 1] << 8) + t[e + 2], a += s((i = n) >> 18 & 63) + s(i >> 12 & 63) + s(i >> 6 & 63) + s(63 & i);
                        switch (o) {
                            case 1:
                                a += s((n = t[t.length - 1]) >> 2), a += s(n << 4 & 63), a += "==";
                                break;
                            case 2:
                                a += s((n = (t[t.length - 2] << 8) + t[t.length - 1]) >> 10), a += s(n >> 4 & 63), a += s(n << 2 & 63), a += "="
                        }
                        return a
                    }
                }(void 0 === n ? this.base64js = {} : n)
            }, {}],
            51: [function(t, n, r) {
                (function(O, s) {
                    ! function(t) {
                        if ("object" == typeof r && void 0 !== n) n.exports = t();
                        else if ("function" == typeof L && L.amd) L([], t);
                        else {
                            var e;
                            "undefined" != typeof window ? e = window : void 0 !== s ? e = s : "undefined" != typeof self && (e = self), e.Promise = t()
                        }
                    }(function() {
                        var t, e, n;
                        return function o(a, s, l) {
                            function u(n, t) {
                                if (!s[n]) {
                                    if (!a[n]) {
                                        var e = "function" == typeof _dereq_ && _dereq_;
                                        if (!t && e) return e(n, !0);
                                        if (c) return c(n, !0);
                                        var r = new Error("Cannot find module '" + n + "'");
                                        throw r.code = "MODULE_NOT_FOUND", r
                                    }
                                    var i = s[n] = {
                                        exports: {}
                                    };
                                    a[n][0].call(i.exports, function(t) {
                                        var e = a[n][1][t];
                                        return u(e || t)
                                    }, i, i.exports, o, a, s, l)
                                }
                                return s[n].exports
                            }
                            for (var c = "function" == typeof _dereq_ && _dereq_, t = 0; t < l.length; t++) u(l[t]);
                            return u
                        }({
                            1: [function(t, e, n) {
                                "use strict";
                                e.exports = function(t) {
                                    var r = t._SomePromiseArray;

                                    function e(t) {
                                        var e = new r(t),
                                            n = e.promise();
                                        return e.setHowMany(1), e.setUnwrap(), e.init(), n
                                    }
                                    t.any = function(t) {
                                        return e(t)
                                    }, t.prototype.any = function() {
                                        return e(this)
                                    }
                                }
                            }, {}],
                            2: [function(t, e, n) {
                                "use strict";
                                var r;
                                try {
                                    throw new Error
                                } catch (t) {
                                    r = t
                                }
                                var i = t("./schedule.js"),
                                    o = t("./queue.js"),
                                    a = t("./util.js");

                                function s() {
                                    this._isTickUsed = !1, this._lateQueue = new o(16), this._normalQueue = new o(16), this._trampolineEnabled = !0;
                                    var t = this;
                                    this.drainQueues = function() {
                                        t._drainQueues()
                                    }, this._schedule = i.isStatic ? i(this.drainQueues) : i
                                }

                                function l(t, e, n) {
                                    this._lateQueue.push(t, e, n), this._queueTick()
                                }

                                function u(t, e, n) {
                                    this._normalQueue.push(t, e, n), this._queueTick()
                                }

                                function c(t) {
                                    this._normalQueue._pushOne(t), this._queueTick()
                                }
                                s.prototype.disableTrampolineIfNecessary = function() {
                                    a.hasDevTools && (this._trampolineEnabled = !1)
                                }, s.prototype.enableTrampoline = function() {
                                    this._trampolineEnabled || (this._trampolineEnabled = !0, this._schedule = function(t) {
                                        setTimeout(t, 0)
                                    })
                                }, s.prototype.haveItemsQueued = function() {
                                    return 0 < this._normalQueue.length()
                                }, s.prototype.throwLater = function(t, e) {
                                    if (1 === arguments.length && (e = t, t = function() {
                                            throw e
                                        }), "undefined" != typeof setTimeout) setTimeout(function() {
                                        t(e)
                                    }, 0);
                                    else try {
                                        this._schedule(function() {
                                            t(e)
                                        })
                                    } catch (t) {
                                        throw new Error("No async scheduler available\n\n    See http://goo.gl/m3OTXk\n")
                                    }
                                }, a.hasDevTools ? (i.isStatic && (i = function(t) {
                                    setTimeout(t, 0)
                                }), s.prototype.invokeLater = function(t, e, n) {
                                    this._trampolineEnabled ? l.call(this, t, e, n) : this._schedule(function() {
                                        setTimeout(function() {
                                            t.call(e, n)
                                        }, 100)
                                    })
                                }, s.prototype.invoke = function(t, e, n) {
                                    this._trampolineEnabled ? u.call(this, t, e, n) : this._schedule(function() {
                                        t.call(e, n)
                                    })
                                }, s.prototype.settlePromises = function(t) {
                                    this._trampolineEnabled ? c.call(this, t) : this._schedule(function() {
                                        t._settlePromises()
                                    })
                                }) : (s.prototype.invokeLater = l, s.prototype.invoke = u, s.prototype.settlePromises = c), s.prototype.invokeFirst = function(t, e, n) {
                                    this._normalQueue.unshift(t, e, n), this._queueTick()
                                }, s.prototype._drainQueue = function(t) {
                                    for (; 0 < t.length();) {
                                        var e = t.shift();
                                        if ("function" == typeof e) {
                                            var n = t.shift(),
                                                r = t.shift();
                                            e.call(n, r)
                                        } else e._settlePromises()
                                    }
                                }, s.prototype._drainQueues = function() {
                                    this._drainQueue(this._normalQueue), this._reset(), this._drainQueue(this._lateQueue)
                                }, s.prototype._queueTick = function() {
                                    this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues))
                                }, s.prototype._reset = function() {
                                    this._isTickUsed = !1
                                }, e.exports = new s, e.exports.firstLineError = r
                            }, {
                                "./queue.js": 28,
                                "./schedule.js": 31,
                                "./util.js": 38
                            }],
                            3: [function(t, e, n) {
                                "use strict";
                                e.exports = function(o, a, s) {
                                    var n = function(t, e) {
                                            this._reject(e)
                                        },
                                        l = function(t, e) {
                                            e.promiseRejectionQueued = !0, e.bindingPromise._then(n, n, null, this, t)
                                        },
                                        u = function(t, e) {
                                            this._isPending() && this._resolveCallback(e.target)
                                        },
                                        c = function(t, e) {
                                            e.promiseRejectionQueued || this._reject(t)
                                        };
                                    o.prototype.bind = function(t) {
                                        var e = s(t),
                                            n = new o(a);
                                        n._propagateFrom(this, 1);
                                        var r = this._target();
                                        if (n._setBoundTo(e), e instanceof o) {
                                            var i = {
                                                promiseRejectionQueued: !1,
                                                promise: n,
                                                target: r,
                                                bindingPromise: e
                                            };
                                            r._then(a, l, n._progress, n, i), e._then(u, c, n._progress, n, i)
                                        } else n._resolveCallback(r);
                                        return n
                                    }, o.prototype._setBoundTo = function(t) {
                                        void 0 !== t ? (this._bitField = 131072 | this._bitField, this._boundTo = t) : this._bitField = -131073 & this._bitField
                                    }, o.prototype._isBound = function() {
                                        return 131072 == (131072 & this._bitField)
                                    }, o.bind = function(t, e) {
                                        var n = s(t),
                                            r = new o(a);
                                        return r._setBoundTo(n), n instanceof o ? n._then(function() {
                                            r._resolveCallback(e)
                                        }, r._reject, r._progress, r, null) : r._resolveCallback(e), r
                                    }
                                }
                            }, {}],
                            4: [function(t, e, n) {
                                "use strict";
                                var r;
                                "undefined" != typeof Promise && (r = Promise);
                                var i = t("./promise.js")();
                                i.noConflict = function() {
                                    try {
                                        Promise === i && (Promise = r)
                                    } catch (t) {}
                                    return i
                                }, e.exports = i
                            }, {
                                "./promise.js": 23
                            }],
                            5: [function(t, e, n) {
                                "use strict";
                                var r = Object.create;
                                if (r) {
                                    var i = r(null),
                                        o = r(null);
                                    i[" size"] = o[" size"] = 0
                                }
                                e.exports = function(i) {
                                    var r, o = t("./util.js"),
                                        a = o.canEvaluate;
                                    o.isIdentifier;

                                    function e(t, e) {
                                        var n;
                                        if (null != t && (n = t[e]), "function" != typeof n) {
                                            var r = "Object " + o.classString(t) + " has no method '" + o.toString(e) + "'";
                                            throw new i.TypeError(r)
                                        }
                                        return n
                                    }

                                    function s(t) {
                                        return e(t, this.pop()).apply(t, this)
                                    }

                                    function l(t) {
                                        return t[this]
                                    }

                                    function u(t) {
                                        var e = +this;
                                        return e < 0 && (e = Math.max(0, e + t.length)), t[e]
                                    }
                                    i.prototype.call = function(t) {
                                        for (var e = arguments.length, n = new Array(e - 1), r = 1; r < e; ++r) n[r - 1] = arguments[r];
                                        return n.push(t), this._then(s, void 0, void 0, n, void 0)
                                    }, i.prototype.get = function(t) {
                                        var e;
                                        if ("number" == typeof t) e = u;
                                        else if (a) {
                                            var n = r(t);
                                            e = null !== n ? n : l
                                        } else e = l;
                                        return this._then(e, void 0, void 0, t, void 0)
                                    }
                                }
                            }, {
                                "./util.js": 38
                            }],
                            6: [function(i, t, e) {
                                "use strict";
                                t.exports = function(t) {
                                    var e = i("./errors.js"),
                                        n = i("./async.js"),
                                        r = e.CancellationError;
                                    t.prototype._cancel = function(t) {
                                        if (!this.isCancellable()) return this;
                                        for (var e, n = this; void 0 !== (e = n._cancellationParent) && e.isCancellable();) n = e;
                                        this._unsetCancellable(), n._target()._rejectCallback(t, !1, !0)
                                    }, t.prototype.cancel = function(t) {
                                        return this.isCancellable() && (void 0 === t && (t = new r), n.invokeLater(this._cancel, this, t)), this
                                    }, t.prototype.cancellable = function() {
                                        return this._cancellable() || (n.enableTrampoline(), this._setCancellable(), this._cancellationParent = void 0), this
                                    }, t.prototype.uncancellable = function() {
                                        var t = this.then();
                                        return t._unsetCancellable(), t
                                    }, t.prototype.fork = function(t, e, n) {
                                        var r = this._then(t, e, n, void 0, void 0);
                                        return r._setCancellable(), r._cancellationParent = void 0, r
                                    }
                                }
                            }, {
                                "./async.js": 2,
                                "./errors.js": 13
                            }],
                            7: [function(t, e, n) {
                                "use strict";
                                e.exports = function() {
                                    var i, s = t("./async.js"),
                                        a = t("./util.js"),
                                        c = /[\\\/]bluebird[\\\/]js[\\\/](main|debug|zalgo|instrumented)/,
                                        l = null,
                                        o = null,
                                        u = !1;

                                    function h(t) {
                                        this._parent = t;
                                        var e = this._length = 1 + (void 0 === t ? 0 : t._length);
                                        r(this, h), 32 < e && this.uncycle()
                                    }

                                    function d(t) {
                                        for (var e = [], n = 0; n < t.length; ++n) {
                                            var r = t[n],
                                                i = l.test(r) || "    (No stack trace)" === r,
                                                o = i && p(r);
                                            i && !o && (u && " " !== r.charAt(0) && (r = "    " + r), e.push(r))
                                        }
                                        return e
                                    }

                                    function f(t) {
                                        var e;
                                        if ("function" == typeof t) e = "[function " + (t.name || "anonymous") + "]";
                                        else {
                                            e = t.toString();
                                            if (/\[object [a-zA-Z0-9$_]+\]/.test(e)) try {
                                                e = JSON.stringify(t)
                                            } catch (t) {}
                                            0 === e.length && (e = "(empty array)")
                                        }
                                        return "(<" + function(t) {
                                            if (t.length < 41) return t;
                                            return t.substr(0, 38) + "..."
                                        }(e) + ">, no stack trace)"
                                    }
                                    a.inherits(h, Error), h.prototype.uncycle = function() {
                                        var t = this._length;
                                        if (!(t < 2)) {
                                            for (var e = [], n = {}, r = 0, i = this; void 0 !== i; ++r) e.push(i), i = i._parent;
                                            for (r = (t = this._length = r) - 1; 0 <= r; --r) {
                                                var o = e[r].stack;
                                                void 0 === n[o] && (n[o] = r)
                                            }
                                            for (r = 0; r < t; ++r) {
                                                var a = n[e[r].stack];
                                                if (void 0 !== a && a !== r) {
                                                    0 < a && (e[a - 1]._parent = void 0, e[a - 1]._length = 1), e[r]._parent = void 0, e[r]._length = 1;
                                                    var s = 0 < r ? e[r - 1] : this;
                                                    a < t - 1 ? (s._parent = e[a + 1], s._parent.uncycle(), s._length = s._parent._length + 1) : (s._parent = void 0, s._length = 1);
                                                    for (var l = s._length + 1, u = r - 2; 0 <= u; --u) e[u]._length = l, l++;
                                                    return
                                                }
                                            }
                                        }
                                    }, h.prototype.parent = function() {
                                        return this._parent
                                    }, h.prototype.hasParent = function() {
                                        return void 0 !== this._parent
                                    }, h.prototype.attachExtraTrace = function(t) {
                                        if (!t.__stackCleaned__) {
                                            this.uncycle();
                                            for (var e = h.parseStackAndMessage(t), n = e.message, r = [e.stack], i = this; void 0 !== i;) r.push(d(i.stack.split("\n"))), i = i._parent;
                                            ! function(t) {
                                                for (var e = t[0], n = 1; n < t.length; ++n) {
                                                    for (var r = t[n], i = e.length - 1, o = e[i], a = -1, s = r.length - 1; 0 <= s; --s)
                                                        if (r[s] === o) {
                                                            a = s;
                                                            break
                                                        }
                                                    for (var s = a; 0 <= s; --s) {
                                                        var l = r[s];
                                                        if (e[i] !== l) break;
                                                        e.pop(), i--
                                                    }
                                                    e = r
                                                }
                                            }(r),
                                            function(t) {
                                                for (var e = 0; e < t.length; ++e)(0 === t[e].length || e + 1 < t.length && t[e][0] === t[e + 1][0]) && (t.splice(e, 1), e--)
                                            }(r), a.notEnumerableProp(t, "stack", function(t, e) {
                                                for (var n = 0; n < e.length - 1; ++n) e[n].push("From previous event:"), e[n] = e[n].join("\n");
                                                n < e.length && (e[n] = e[n].join("\n"));
                                                return t + "\n" + e.join("\n")
                                            }(n, r)), a.notEnumerableProp(t, "__stackCleaned__", !0)
                                        }
                                    }, h.parseStackAndMessage = function(t) {
                                        var e = t.stack;
                                        return {
                                            message: t.toString(),
                                            stack: d(e = "string" == typeof e && 0 < e.length ? function(t) {
                                                for (var e = t.stack.replace(/\s+$/g, "").split("\n"), n = 0; n < e.length; ++n) {
                                                    var r = e[n];
                                                    if ("    (No stack trace)" === r || l.test(r)) break
                                                }
                                                return 0 < n && (e = e.slice(n)), e
                                            }(t) : ["    (No stack trace)"])
                                        }
                                    }, h.formatAndLogError = function(t, e) {
                                        if ("undefined" != typeof console) {
                                            var n;
                                            if ("object" == typeof t || "function" == typeof t) {
                                                var r = t.stack;
                                                n = e + o(r, t)
                                            } else n = e + String(t);
                                            "function" == typeof i ? i(n) : "function" != typeof console.log && "object" != typeof console.log || console.log(n)
                                        }
                                    }, h.unhandledRejection = function(t) {
                                        h.formatAndLogError(t, "^--- With additional stack trace: ")
                                    }, h.isSupported = function() {
                                        return "function" == typeof r
                                    }, h.fireRejectionEvent = function(t, e, n, r) {
                                        var i = !1;
                                        try {
                                            "function" == typeof e && (i = !0, "rejectionHandled" === t ? e(r) : e(n, r))
                                        } catch (t) {
                                            s.throwLater(t)
                                        }
                                        var o = !1;
                                        try {
                                            o = m(t, n, r)
                                        } catch (t) {
                                            o = !0, s.throwLater(t)
                                        }
                                        var a = !1;
                                        if (v) try {
                                            a = v(t.toLowerCase(), {
                                                reason: n,
                                                promise: r
                                            })
                                        } catch (t) {
                                            a = !0, s.throwLater(t)
                                        }
                                        o || i || a || "unhandledRejection" !== t || h.formatAndLogError(n, "Unhandled rejection ")
                                    };
                                    var p = function() {
                                            return !1
                                        },
                                        n = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;

                                    function g(t) {
                                        var e = t.match(n);
                                        if (e) return {
                                            fileName: e[1],
                                            line: parseInt(e[2], 10)
                                        }
                                    }
                                    h.setBounds = function(t, e) {
                                        if (h.isSupported()) {
                                            for (var n, r, i = t.stack.split("\n"), o = e.stack.split("\n"), a = -1, s = -1, l = 0; l < i.length; ++l) {
                                                if (u = g(i[l])) {
                                                    n = u.fileName, a = u.line;
                                                    break
                                                }
                                            }
                                            for (l = 0; l < o.length; ++l) {
                                                var u;
                                                if (u = g(o[l])) {
                                                    r = u.fileName, s = u.line;
                                                    break
                                                }
                                            }
                                            a < 0 || s < 0 || !n || !r || n !== r || s <= a || (p = function(t) {
                                                if (c.test(t)) return !0;
                                                var e = g(t);
                                                return !!(e && e.fileName === n && a <= e.line && e.line <= s)
                                            })
                                        }
                                    };
                                    var v, r = function() {
                                            var t = /^\s*at\s*/,
                                                e = function(t, e) {
                                                    return "string" == typeof t ? t : void 0 !== e.name && void 0 !== e.message ? e.toString() : f(e)
                                                };
                                            if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
                                                Error.stackTraceLimit = Error.stackTraceLimit + 6, l = t, o = e;
                                                var n = Error.captureStackTrace;
                                                return p = function(t) {
                                                        return c.test(t)
                                                    },
                                                    function(t, e) {
                                                        Error.stackTraceLimit = Error.stackTraceLimit + 6, n(t, e), Error.stackTraceLimit = Error.stackTraceLimit - 6
                                                    }
                                            }
                                            var r, i = new Error;
                                            if ("string" == typeof i.stack && 0 <= i.stack.split("\n")[0].indexOf("stackDetection@")) return l = /@/, o = e, u = !0,
                                                function(t) {
                                                    t.stack = (new Error).stack
                                                };
                                            try {
                                                throw new Error
                                            } catch (t) {
                                                r = "stack" in t
                                            }
                                            return "stack" in i || !r || "number" != typeof Error.stackTraceLimit ? (o = function(t, e) {
                                                return "string" == typeof t ? t : "object" != typeof e && "function" != typeof e || void 0 === e.name || void 0 === e.message ? f(e) : e.toString()
                                            }, null) : (l = t, o = e, function(e) {
                                                Error.stackTraceLimit = Error.stackTraceLimit + 6;
                                                try {
                                                    throw new Error
                                                } catch (t) {
                                                    e.stack = t.stack
                                                }
                                                Error.stackTraceLimit = Error.stackTraceLimit - 6
                                            })
                                        }(),
                                        m = function() {
                                            if (a.isNode) return function(t, e, n) {
                                                return "rejectionHandled" === t ? O.emit(t, n) : O.emit(t, e, n)
                                            };
                                            var r = !1,
                                                e = !0;
                                            try {
                                                var t = new self.CustomEvent("test");
                                                r = t instanceof CustomEvent
                                            } catch (t) {}
                                            if (!r) try {
                                                var n = document.createEvent("CustomEvent");
                                                n.initCustomEvent("testingtheevent", !1, !0, {}), self.dispatchEvent(n)
                                            } catch (t) {
                                                e = !1
                                            }
                                            e && (v = function(t, e) {
                                                var n;
                                                return r ? n = new self.CustomEvent(t, {
                                                    detail: e,
                                                    bubbles: !1,
                                                    cancelable: !0
                                                }) : self.dispatchEvent && (n = document.createEvent("CustomEvent")).initCustomEvent(t, !1, !0, e), !!n && !self.dispatchEvent(n)
                                            });
                                            var o = {};
                                            return o.unhandledRejection = "onunhandledRejection".toLowerCase(), o.rejectionHandled = "onrejectionHandled".toLowerCase(),
                                                function(t, e, n) {
                                                    var r = o[t],
                                                        i = self[r];
                                                    return !!i && ("rejectionHandled" === t ? i.call(self, n) : i.call(self, e, n), !0)
                                                }
                                        }();
                                    return "undefined" != typeof console && void 0 !== console.warn && (i = function(t) {
                                        console.warn(t)
                                    }, a.isNode && O.stderr.isTTY ? i = function(t) {
                                        O.stderr.write("[31m" + t + "[39m\n")
                                    } : a.isNode || "string" != typeof(new Error).stack || (i = function(t) {
                                        console.warn("%c" + t, "color: red")
                                    })), h
                                }
                            }, {
                                "./async.js": 2,
                                "./util.js": 38
                            }],
                            8: [function(r, t, e) {
                                "use strict";
                                t.exports = function(d) {
                                    var t = r("./util.js"),
                                        e = r("./errors.js"),
                                        f = t.tryCatch,
                                        p = t.errorObj,
                                        g = r("./es5.js").keys,
                                        v = e.TypeError;

                                    function n(t, e, n) {
                                        this._instances = t, this._callback = e, this._promise = n
                                    }
                                    return n.prototype.doFilter = function(t) {
                                        for (var e, n, r, i = this._callback, o = this._promise._boundValue(), a = 0, s = this._instances.length; a < s; ++a) {
                                            var l = this._instances[a],
                                                u = l === Error || null != l && l.prototype instanceof Error;
                                            if (u && t instanceof l) return (c = f(i).call(o, t)) === p ? (d.e = c.e, d) : c;
                                            if ("function" == typeof l && !u) {
                                                var c, h = (e = t, void 0, n = {}, (r = f(l).call(n, e)) === p ? r : g(n).length ? (p.e = new v("Catch filter must inherit from Error or be a simple predicate function\n\n    See http://goo.gl/o84o68\n"), p) : r);
                                                if (h === p) {
                                                    t = p.e;
                                                    break
                                                }
                                                if (h) return (c = f(i).call(o, t)) === p ? (d.e = c.e, d) : c
                                            }
                                        }
                                        return d.e = t, d
                                    }, n
                                }
                            }, {
                                "./errors.js": 13,
                                "./es5.js": 14,
                                "./util.js": 38
                            }],
                            9: [function(t, e, n) {
                                "use strict";
                                e.exports = function(t, e, n) {
                                    var r = [];

                                    function i() {
                                        this._trace = new e(o())
                                    }

                                    function o() {
                                        var t = r.length - 1;
                                        if (0 <= t) return r[t]
                                    }
                                    return i.prototype._pushContext = function() {
                                            n() && void 0 !== this._trace && r.push(this._trace)
                                        }, i.prototype._popContext = function() {
                                            n() && void 0 !== this._trace && r.pop()
                                        }, t.prototype._peekContext = o, t.prototype._pushContext = i.prototype._pushContext, t.prototype._popContext = i.prototype._popContext,
                                        function() {
                                            if (n()) return new i
                                        }
                                }
                            }, {}],
                            10: [function(c, t, e) {
                                "use strict";
                                t.exports = function(t, i) {
                                    var n, r, o = t._getDomain,
                                        e = c("./async.js"),
                                        a = c("./errors.js").Warning,
                                        s = c("./util.js"),
                                        l = s.canAttachTrace,
                                        u = s.isNode && (!!O.env.BLUEBIRD_DEBUG || "development" === O.env.NODE_ENV);
                                    return s.isNode && 0 == O.env.BLUEBIRD_DEBUG && (u = !1), u && e.disableTrampolineIfNecessary(), t.prototype._ignoreRejections = function() {
                                            this._unsetRejectionIsUnhandled(), this._bitField = 16777216 | this._bitField
                                        }, t.prototype._ensurePossibleRejectionHandled = function() {
                                            0 == (16777216 & this._bitField) && (this._setRejectionIsUnhandled(), e.invokeLater(this._notifyUnhandledRejection, this, void 0))
                                        }, t.prototype._notifyUnhandledRejectionIsHandled = function() {
                                            i.fireRejectionEvent("rejectionHandled", n, void 0, this)
                                        }, t.prototype._notifyUnhandledRejection = function() {
                                            if (this._isRejectionUnhandled()) {
                                                var t = this._getCarriedStackTrace() || this._settledValue;
                                                this._setUnhandledRejectionIsNotified(), i.fireRejectionEvent("unhandledRejection", r, t, this)
                                            }
                                        }, t.prototype._setUnhandledRejectionIsNotified = function() {
                                            this._bitField = 524288 | this._bitField
                                        }, t.prototype._unsetUnhandledRejectionIsNotified = function() {
                                            this._bitField = -524289 & this._bitField
                                        }, t.prototype._isUnhandledRejectionNotified = function() {
                                            return 0 < (524288 & this._bitField)
                                        }, t.prototype._setRejectionIsUnhandled = function() {
                                            this._bitField = 2097152 | this._bitField
                                        }, t.prototype._unsetRejectionIsUnhandled = function() {
                                            this._bitField = -2097153 & this._bitField, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), this._notifyUnhandledRejectionIsHandled())
                                        }, t.prototype._isRejectionUnhandled = function() {
                                            return 0 < (2097152 & this._bitField)
                                        }, t.prototype._setCarriedStackTrace = function(t) {
                                            this._bitField = 1048576 | this._bitField, this._fulfillmentHandler0 = t
                                        }, t.prototype._isCarryingStackTrace = function() {
                                            return 0 < (1048576 & this._bitField)
                                        }, t.prototype._getCarriedStackTrace = function() {
                                            return this._isCarryingStackTrace() ? this._fulfillmentHandler0 : void 0
                                        }, t.prototype._captureStackTrace = function() {
                                            return u && (this._trace = new i(this._peekContext())), this
                                        }, t.prototype._attachExtraTrace = function(t, e) {
                                            if (u && l(t)) {
                                                var n = this._trace;
                                                if (void 0 !== n && e && (n = n._parent), void 0 !== n) n.attachExtraTrace(t);
                                                else if (!t.__stackCleaned__) {
                                                    var r = i.parseStackAndMessage(t);
                                                    s.notEnumerableProp(t, "stack", r.message + "\n" + r.stack.join("\n")), s.notEnumerableProp(t, "__stackCleaned__", !0)
                                                }
                                            }
                                        }, t.prototype._warn = function(t) {
                                            var e = new a(t),
                                                n = this._peekContext();
                                            if (n) n.attachExtraTrace(e);
                                            else {
                                                var r = i.parseStackAndMessage(e);
                                                e.stack = r.message + "\n" + r.stack.join("\n")
                                            }
                                            i.formatAndLogError(e, "")
                                        }, t.onPossiblyUnhandledRejection = function(t) {
                                            var e = o();
                                            r = "function" == typeof t ? null === e ? t : e.bind(t) : void 0
                                        }, t.onUnhandledRejectionHandled = function(t) {
                                            var e = o();
                                            n = "function" == typeof t ? null === e ? t : e.bind(t) : void 0
                                        }, t.longStackTraces = function() {
                                            if (e.haveItemsQueued() && !1 === u) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/DT1qyG\n");
                                            (u = i.isSupported()) && e.disableTrampolineIfNecessary()
                                        }, t.hasLongStackTraces = function() {
                                            return u && i.isSupported()
                                        }, i.isSupported() || (t.longStackTraces = function() {}, u = !1),
                                        function() {
                                            return u
                                        }
                                }
                            }, {
                                "./async.js": 2,
                                "./errors.js": 13,
                                "./util.js": 38
                            }],
                            11: [function(t, e, n) {
                                "use strict";
                                var s = t("./util.js").isPrimitive;
                                e.exports = function(e) {
                                    var n = function() {
                                            return this
                                        },
                                        r = function() {
                                            throw this
                                        },
                                        i = function() {},
                                        o = function() {
                                            throw void 0
                                        },
                                        a = function(t, e) {
                                            return 1 === e ? function() {
                                                throw t
                                            } : 2 === e ? function() {
                                                return t
                                            } : void 0
                                        };
                                    e.prototype.return = e.prototype.thenReturn = function(t) {
                                        return void 0 === t ? this.then(i) : s(t) ? this._then(a(t, 2), void 0, void 0, void 0, void 0) : (t instanceof e && t._ignoreRejections(), this._then(n, void 0, void 0, t, void 0))
                                    }, e.prototype.throw = e.prototype.thenThrow = function(t) {
                                        return void 0 === t ? this.then(o) : s(t) ? this._then(a(t, 1), void 0, void 0, void 0, void 0) : this._then(r, void 0, void 0, t, void 0)
                                    }
                                }
                            }, {
                                "./util.js": 38
                            }],
                            12: [function(t, e, n) {
                                "use strict";
                                e.exports = function(t, n) {
                                    var r = t.reduce;
                                    t.prototype.each = function(t) {
                                        return r(this, t, null, n)
                                    }, t.each = function(t, e) {
                                        return r(t, e, null, n)
                                    }
                                }
                            }, {}],
                            13: [function(t, e, n) {
                                "use strict";
                                var r, i, o = t("./es5.js"),
                                    a = o.freeze,
                                    s = t("./util.js"),
                                    l = s.inherits,
                                    u = s.notEnumerableProp;

                                function c(e, n) {
                                    function r(t) {
                                        if (!(this instanceof r)) return new r(t);
                                        u(this, "message", "string" == typeof t ? t : n), u(this, "name", e), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this)
                                    }
                                    return l(r, Error), r
                                }
                                var h = c("Warning", "warning"),
                                    d = c("CancellationError", "cancellation error"),
                                    f = c("TimeoutError", "timeout error"),
                                    p = c("AggregateError", "aggregate error");
                                try {
                                    r = TypeError, i = RangeError
                                } catch (t) {
                                    r = c("TypeError", "type error"), i = c("RangeError", "range error")
                                }
                                for (var g = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), v = 0; v < g.length; ++v) "function" == typeof Array.prototype[g[v]] && (p.prototype[g[v]] = Array.prototype[g[v]]);
                                o.defineProperty(p.prototype, "length", {
                                    value: 0,
                                    configurable: !1,
                                    writable: !0,
                                    enumerable: !0
                                }), p.prototype.isOperational = !0;
                                var m = 0;

                                function y(t) {
                                    if (!(this instanceof y)) return new y(t);
                                    u(this, "name", "OperationalError"), u(this, "message", t), this.cause = t, this.isOperational = !0, t instanceof Error ? (u(this, "message", t.message), u(this, "stack", t.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)
                                }
                                p.prototype.toString = function() {
                                    var t = Array(4 * m + 1).join(" "),
                                        e = "\n" + t + "AggregateError of:\n";
                                    m++, t = Array(4 * m + 1).join(" ");
                                    for (var n = 0; n < this.length; ++n) {
                                        for (var r = this[n] === this ? "[Circular AggregateError]" : this[n] + "", i = r.split("\n"), o = 0; o < i.length; ++o) i[o] = t + i[o];
                                        e += (r = i.join("\n")) + "\n"
                                    }
                                    return m--, e
                                }, l(y, Error);
                                var b = Error.__BluebirdErrorTypes__;
                                b || (b = a({
                                    CancellationError: d,
                                    TimeoutError: f,
                                    OperationalError: y,
                                    RejectionError: y,
                                    AggregateError: p
                                }), u(Error, "__BluebirdErrorTypes__", b)), e.exports = {
                                    Error: Error,
                                    TypeError: r,
                                    RangeError: i,
                                    CancellationError: b.CancellationError,
                                    OperationalError: b.OperationalError,
                                    TimeoutError: b.TimeoutError,
                                    AggregateError: b.AggregateError,
                                    Warning: h
                                }
                            }, {
                                "./es5.js": 14,
                                "./util.js": 38
                            }],
                            14: [function(t, e, n) {
                                var r = function() {
                                    "use strict";
                                    return void 0 === this
                                }();
                                if (r) e.exports = {
                                    freeze: Object.freeze,
                                    defineProperty: Object.defineProperty,
                                    getDescriptor: Object.getOwnPropertyDescriptor,
                                    keys: Object.keys,
                                    names: Object.getOwnPropertyNames,
                                    getPrototypeOf: Object.getPrototypeOf,
                                    isArray: Array.isArray,
                                    isES5: r,
                                    propertyIsWritable: function(t, e) {
                                        var n = Object.getOwnPropertyDescriptor(t, e);
                                        return !(n && !n.writable && !n.set)
                                    }
                                };
                                else {
                                    var i = {}.hasOwnProperty,
                                        o = {}.toString,
                                        a = {}.constructor.prototype,
                                        s = function(t) {
                                            var e = [];
                                            for (var n in t) i.call(t, n) && e.push(n);
                                            return e
                                        };
                                    e.exports = {
                                        isArray: function(t) {
                                            try {
                                                return "[object Array]" === o.call(t)
                                            } catch (t) {
                                                return !1
                                            }
                                        },
                                        keys: s,
                                        names: s,
                                        defineProperty: function(t, e, n) {
                                            return t[e] = n.value, t
                                        },
                                        getDescriptor: function(t, e) {
                                            return {
                                                value: t[e]
                                            }
                                        },
                                        freeze: function(t) {
                                            return t
                                        },
                                        getPrototypeOf: function(t) {
                                            try {
                                                return Object(t).constructor.prototype
                                            } catch (t) {
                                                return a
                                            }
                                        },
                                        isES5: r,
                                        propertyIsWritable: function() {
                                            return !0
                                        }
                                    }
                                }
                            }, {}],
                            15: [function(t, e, n) {
                                "use strict";
                                e.exports = function(t, r) {
                                    var i = t.map;
                                    t.prototype.filter = function(t, e) {
                                        return i(this, t, e, r)
                                    }, t.filter = function(t, e, n) {
                                        return i(t, e, n, r)
                                    }
                                }
                            }, {}],
                            16: [function(e, t, n) {
                                "use strict";
                                t.exports = function(o, a, s) {
                                    var t = e("./util.js"),
                                        l = t.isPrimitive,
                                        u = t.thrower;

                                    function c() {
                                        return this
                                    }

                                    function h() {
                                        throw this
                                    }

                                    function d(t, e, n) {
                                        var r, i, o;
                                        return r = l(e) ? n ? (o = e, function() {
                                            return o
                                        }) : (i = e, function() {
                                            throw i
                                        }) : n ? c : h, t._then(r, u, void 0, e, void 0)
                                    }

                                    function r(t) {
                                        var e = this.promise,
                                            n = this.handler,
                                            r = e._isBound() ? n.call(e._boundValue()) : n();
                                        if (void 0 !== r) {
                                            var i = s(r, e);
                                            if (i instanceof o) return d(i = i._target(), t, e.isFulfilled())
                                        }
                                        return e.isRejected() ? (a.e = t, a) : t
                                    }

                                    function i(t) {
                                        var e = this.promise,
                                            n = this.handler,
                                            r = e._isBound() ? n.call(e._boundValue(), t) : n(t);
                                        if (void 0 !== r) {
                                            var i = s(r, e);
                                            if (i instanceof o) return d(i = i._target(), t, !0)
                                        }
                                        return t
                                    }
                                    o.prototype._passThroughHandler = function(t, e) {
                                        if ("function" != typeof t) return this.then();
                                        var n = {
                                            promise: this,
                                            handler: t
                                        };
                                        return this._then(e ? r : i, e ? r : void 0, void 0, n, void 0)
                                    }, o.prototype.lastly = o.prototype.finally = function(t) {
                                        return this._passThroughHandler(t, !0)
                                    }, o.prototype.tap = function(t) {
                                        return this._passThroughHandler(t, !1)
                                    }
                                }
                            }, {
                                "./util.js": 38
                            }],
                            17: [function(e, t, n) {
                                "use strict";
                                t.exports = function(s, r, i, l) {
                                    var a = e("./errors.js").TypeError,
                                        t = e("./util.js"),
                                        u = t.errorObj,
                                        c = t.tryCatch,
                                        o = [];

                                    function h(t, e, n, r) {
                                        (this._promise = new s(i))._captureStackTrace(), this._stack = r, this._generatorFunction = t, this._receiver = e, this._generator = void 0, this._yieldHandlers = "function" == typeof n ? [n].concat(o) : o
                                    }
                                    h.prototype.promise = function() {
                                        return this._promise
                                    }, h.prototype._run = function() {
                                        this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, this._next(void 0)
                                    }, h.prototype._continue = function(t) {
                                        if (t === u) return this._promise._rejectCallback(t.e, !1, !0);
                                        var e = t.value;
                                        if (!0 === t.done) this._promise._resolveCallback(e);
                                        else {
                                            var n = l(e, this._promise);
                                            if (!(n instanceof s) && null === (n = function(t, e, n) {
                                                    for (var r = 0; r < e.length; ++r) {
                                                        n._pushContext();
                                                        var i = c(e[r])(t);
                                                        if (n._popContext(), i === u) {
                                                            n._pushContext();
                                                            var o = s.reject(u.e);
                                                            return n._popContext(), o
                                                        }
                                                        var a = l(i, n);
                                                        if (a instanceof s) return a
                                                    }
                                                    return null
                                                }(n, this._yieldHandlers, this._promise))) return void this._throw(new a("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/4Y4pDk\n\n".replace("%s", e) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
                                            n._then(this._next, this._throw, void 0, this, null)
                                        }
                                    }, h.prototype._throw = function(t) {
                                        this._promise._attachExtraTrace(t), this._promise._pushContext();
                                        var e = c(this._generator.throw).call(this._generator, t);
                                        this._promise._popContext(), this._continue(e)
                                    }, h.prototype._next = function(t) {
                                        this._promise._pushContext();
                                        var e = c(this._generator.next).call(this._generator, t);
                                        this._promise._popContext(), this._continue(e)
                                    }, s.coroutine = function(n, t) {
                                        if ("function" != typeof n) throw new a("generatorFunction must be a function\n\n    See http://goo.gl/6Vqhm0\n");
                                        var r = Object(t).yieldHandler,
                                            i = h,
                                            o = (new Error).stack;
                                        return function() {
                                            var t = n.apply(this, arguments),
                                                e = new i(void 0, void 0, r, o);
                                            return e._generator = t, e._next(void 0), e.promise()
                                        }
                                    }, s.coroutine.addYieldHandler = function(t) {
                                        if ("function" != typeof t) throw new a("fn must be a function\n\n    See http://goo.gl/916lJJ\n");
                                        o.push(t)
                                    }, s.spawn = function(t) {
                                        if ("function" != typeof t) return r("generatorFunction must be a function\n\n    See http://goo.gl/6Vqhm0\n");
                                        var e = new h(t, this),
                                            n = e.promise();
                                        return e._run(s.spawn), n
                                    }
                                }
                            }, {
                                "./errors.js": 13,
                                "./util.js": 38
                            }],
                            18: [function(i, t, e) {
                                "use strict";
                                t.exports = function(t, a, e, n) {
                                    var r = i("./util.js");
                                    r.canEvaluate, r.tryCatch, r.errorObj;
                                    t.join = function() {
                                        var t, e = arguments.length - 1;
                                        0 < e && "function" == typeof arguments[e] && (t = arguments[e]);
                                        for (var n = arguments.length, r = new Array(n), i = 0; i < n; ++i) r[i] = arguments[i];
                                        t && r.pop();
                                        var o = new a(r).promise();
                                        return void 0 !== t ? o.spread(t) : o
                                    }
                                }
                            }, {
                                "./util.js": 38
                            }],
                            19: [function(n, t, e) {
                                "use strict";
                                t.exports = function(c, t, i, h, o) {
                                    var a = c._getDomain,
                                        s = n("./async.js"),
                                        e = n("./util.js"),
                                        d = e.tryCatch,
                                        f = e.errorObj,
                                        p = {},
                                        l = [];

                                    function u(t, e, n, r) {
                                        this.constructor$(t), this._promise._captureStackTrace();
                                        var i = a();
                                        this._callback = null === i ? e : i.bind(e), this._preservedValues = r === o ? new Array(this.length()) : null, this._limit = n, this._inFlight = 0, this._queue = 1 <= n ? [] : l, s.invoke(g, this, void 0)
                                    }

                                    function g() {
                                        this._init$(void 0, -2)
                                    }

                                    function v(t, e, n, r) {
                                        var i = "object" == typeof n && null !== n ? n.concurrency : 0;
                                        return new u(t, e, i = "number" == typeof i && isFinite(i) && 1 <= i ? i : 0, r)
                                    }
                                    e.inherits(u, t), u.prototype._init = function() {}, u.prototype._promiseFulfilled = function(t, e) {
                                        var n = this._values,
                                            r = this.length(),
                                            i = this._preservedValues,
                                            o = this._limit;
                                        if (n[e] === p) {
                                            if (n[e] = t, 1 <= o && (this._inFlight--, this._drainQueue(), this._isResolved())) return
                                        } else {
                                            if (1 <= o && this._inFlight >= o) return n[e] = t, void this._queue.push(e);
                                            null !== i && (i[e] = t);
                                            var a = this._callback,
                                                s = this._promise._boundValue();
                                            this._promise._pushContext();
                                            var l = d(a).call(s, t, e, r);
                                            if (this._promise._popContext(), l === f) return this._reject(l.e);
                                            var u = h(l, this._promise);
                                            if (u instanceof c) {
                                                if ((u = u._target())._isPending()) return 1 <= o && this._inFlight++, n[e] = p, u._proxyPromiseArray(this, e);
                                                if (!u._isFulfilled()) return this._reject(u._reason());
                                                l = u._value()
                                            }
                                            n[e] = l
                                        }
                                        r <= ++this._totalResolved && (null !== i ? this._filter(n, i) : this._resolve(n))
                                    }, u.prototype._drainQueue = function() {
                                        for (var t = this._queue, e = this._limit, n = this._values; 0 < t.length && this._inFlight < e;) {
                                            if (this._isResolved()) return;
                                            var r = t.pop();
                                            this._promiseFulfilled(n[r], r)
                                        }
                                    }, u.prototype._filter = function(t, e) {
                                        for (var n = e.length, r = new Array(n), i = 0, o = 0; o < n; ++o) t[o] && (r[i++] = e[o]);
                                        r.length = i, this._resolve(r)
                                    }, u.prototype.preservedValues = function() {
                                        return this._preservedValues
                                    }, c.prototype.map = function(t, e) {
                                        return "function" != typeof t ? i("fn must be a function\n\n    See http://goo.gl/916lJJ\n") : v(this, t, e, null).promise()
                                    }, c.map = function(t, e, n, r) {
                                        return "function" != typeof e ? i("fn must be a function\n\n    See http://goo.gl/916lJJ\n") : v(t, e, n, r).promise()
                                    }
                                }
                            }, {
                                "./async.js": 2,
                                "./util.js": 38
                            }],
                            20: [function(e, t, n) {
                                "use strict";
                                t.exports = function(o, a, t, s) {
                                    var l = e("./util.js"),
                                        u = l.tryCatch;
                                    o.method = function(n) {
                                        if ("function" != typeof n) throw new o.TypeError("fn must be a function\n\n    See http://goo.gl/916lJJ\n");
                                        return function() {
                                            var t = new o(a);
                                            t._captureStackTrace(), t._pushContext();
                                            var e = u(n).apply(this, arguments);
                                            return t._popContext(), t._resolveFromSyncValue(e), t
                                        }
                                    }, o.attempt = o.try = function(t, e, n) {
                                        if ("function" != typeof t) return s("fn must be a function\n\n    See http://goo.gl/916lJJ\n");
                                        var r = new o(a);
                                        r._captureStackTrace(), r._pushContext();
                                        var i = l.isArray(e) ? u(t).apply(n, e) : u(t).call(n, e);
                                        return r._popContext(), r._resolveFromSyncValue(i), r
                                    }, o.prototype._resolveFromSyncValue = function(t) {
                                        t === l.errorObj ? this._rejectCallback(t.e, !1, !0) : this._resolveCallback(t, !0)
                                    }
                                }
                            }, {
                                "./util.js": 38
                            }],
                            21: [function(e, t, n) {
                                "use strict";
                                t.exports = function(t) {
                                    var r = e("./util.js"),
                                        i = e("./async.js"),
                                        o = r.tryCatch,
                                        a = r.errorObj;

                                    function s(t, e) {
                                        if (!r.isArray(t)) return l.call(this, t, e);
                                        var n = o(e).apply(this._boundValue(), [null].concat(t));
                                        n === a && i.throwLater(n.e)
                                    }

                                    function l(t, e) {
                                        var n = this._boundValue(),
                                            r = void 0 === t ? o(e).call(n, null) : o(e).call(n, null, t);
                                        r === a && i.throwLater(r.e)
                                    }

                                    function u(t, e) {
                                        if (!t) {
                                            var n = this._target()._getCarriedStackTrace();
                                            n.cause = t, t = n
                                        }
                                        var r = o(e).call(this._boundValue(), t);
                                        r === a && i.throwLater(r.e)
                                    }
                                    t.prototype.asCallback = t.prototype.nodeify = function(t, e) {
                                        if ("function" == typeof t) {
                                            var n = l;
                                            void 0 !== e && Object(e).spread && (n = s), this._then(n, u, void 0, this, t)
                                        }
                                        return this
                                    }
                                }
                            }, {
                                "./async.js": 2,
                                "./util.js": 38
                            }],
                            22: [function(t, e, n) {
                                "use strict";
                                e.exports = function(s, l) {
                                    var u = t("./util.js"),
                                        c = t("./async.js"),
                                        h = u.tryCatch,
                                        d = u.errorObj;
                                    s.prototype.progressed = function(t) {
                                        return this._then(void 0, void 0, t, void 0, void 0)
                                    }, s.prototype._progress = function(t) {
                                        this._isFollowingOrFulfilledOrRejected() || this._target()._progressUnchecked(t)
                                    }, s.prototype._progressHandlerAt = function(t) {
                                        return 0 === t ? this._progressHandler0 : this[(t << 2) + t - 5 + 2]
                                    }, s.prototype._doProgressWith = function(t) {
                                        var e = t.value,
                                            n = t.handler,
                                            r = t.promise,
                                            i = t.receiver,
                                            o = h(n).call(i, e);
                                        if (o === d) {
                                            if (null != o.e && "StopProgressPropagation" !== o.e.name) {
                                                var a = u.canAttachTrace(o.e) ? o.e : new Error(u.toString(o.e));
                                                r._attachExtraTrace(a), r._progress(o.e)
                                            }
                                        } else o instanceof s ? o._then(r._progress, null, null, r, void 0) : r._progress(o)
                                    }, s.prototype._progressUnchecked = function(t) {
                                        for (var e = this._length(), n = this._progress, r = 0; r < e; r++) {
                                            var i = this._progressHandlerAt(r),
                                                o = this._promiseAt(r);
                                            if (o instanceof s) "function" == typeof i ? c.invoke(this._doProgressWith, this, {
                                                handler: i,
                                                promise: o,
                                                receiver: this._receiverAt(r),
                                                value: t
                                            }) : c.invoke(n, o, t);
                                            else {
                                                var a = this._receiverAt(r);
                                                "function" == typeof i ? i.call(a, t, o) : a instanceof l && !a._isResolved() && a._promiseProgressed(t, o)
                                            }
                                        }
                                    }
                                }
                            }, {
                                "./async.js": 2,
                                "./util.js": 38
                            }],
                            23: [function(S, t, e) {
                                "use strict";
                                t.exports = function() {
                                    var u, s = function() {
                                            return new h("circular promise resolution chain\n\n    See http://goo.gl/LhFpo0\n")
                                        },
                                        t = function() {
                                            return new x.PromiseInspection(this._target())
                                        },
                                        e = function(t) {
                                            return x.reject(new h(t))
                                        },
                                        o = S("./util.js");
                                    u = o.isNode ? function() {
                                        var t = O.domain;
                                        return void 0 === t && (t = null), t
                                    } : function() {
                                        return null
                                    }, o.notEnumerableProp(x, "_getDomain", u);
                                    var l = {},
                                        c = S("./async.js"),
                                        n = S("./errors.js"),
                                        h = x.TypeError = n.TypeError;
                                    x.RangeError = n.RangeError, x.CancellationError = n.CancellationError, x.TimeoutError = n.TimeoutError, x.OperationalError = n.OperationalError, x.RejectionError = n.OperationalError, x.AggregateError = n.AggregateError;
                                    var d = function() {},
                                        a = {},
                                        f = {
                                            e: null
                                        },
                                        p = S("./thenables.js")(x, d),
                                        g = S("./promise_array.js")(x, d, p, e),
                                        r = S("./captured_trace.js")(),
                                        i = S("./debuggability.js")(x, r),
                                        v = S("./context.js")(x, r, i),
                                        m = S("./catch_filter.js")(f),
                                        y = S("./promise_resolver.js"),
                                        b = y._nodebackForPromise,
                                        _ = o.errorObj,
                                        w = o.tryCatch;

                                    function x(t) {
                                        if ("function" != typeof t) throw new h("the promise constructor requires a resolver function\n\n    See http://goo.gl/EC22Yn\n");
                                        if (this.constructor !== x) throw new h("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/KsIlge\n");
                                        this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, this._progressHandler0 = void 0, this._promise0 = void 0, this._receiver0 = void 0, this._settledValue = void 0, t !== d && this._resolveFromResolver(t)
                                    }

                                    function k(t) {
                                        var e = new x(d);
                                        e._fulfillmentHandler0 = t, e._rejectionHandler0 = t, e._progressHandler0 = t, e._promise0 = t, e._receiver0 = t, e._settledValue = t
                                    }
                                    return x.prototype.toString = function() {
                                        return "[object Promise]"
                                    }, x.prototype.caught = x.prototype.catch = function(t) {
                                        var e = arguments.length;
                                        if (1 < e) {
                                            var n, r = new Array(e - 1),
                                                i = 0;
                                            for (n = 0; n < e - 1; ++n) {
                                                var o = arguments[n];
                                                if ("function" != typeof o) return x.reject(new h("Catch filter must inherit from Error or be a simple predicate function\n\n    See http://goo.gl/o84o68\n"));
                                                r[i++] = o
                                            }
                                            r.length = i, t = arguments[n];
                                            var a = new m(r, t, this);
                                            return this._then(void 0, a.doFilter, void 0, a, void 0)
                                        }
                                        return this._then(void 0, t, void 0, void 0, void 0)
                                    }, x.prototype.reflect = function() {
                                        return this._then(t, t, void 0, this, void 0)
                                    }, x.prototype.then = function(t, e, n) {
                                        if (i() && 0 < arguments.length && "function" != typeof t && "function" != typeof e) {
                                            var r = ".then() only accepts functions but was passed: " + o.classString(t);
                                            1 < arguments.length && (r += ", " + o.classString(e)), this._warn(r)
                                        }
                                        return this._then(t, e, n, void 0, void 0)
                                    }, x.prototype.done = function(t, e, n) {
                                        this._then(t, e, n, void 0, void 0)._setIsFinal()
                                    }, x.prototype.spread = function(t, e) {
                                        return this.all()._then(t, e, void 0, a, void 0)
                                    }, x.prototype.isCancellable = function() {
                                        return !this.isResolved() && this._cancellable()
                                    }, x.prototype.toJSON = function() {
                                        var t = {
                                            isFulfilled: !1,
                                            isRejected: !1,
                                            fulfillmentValue: void 0,
                                            rejectionReason: void 0
                                        };
                                        return this.isFulfilled() ? (t.fulfillmentValue = this.value(), t.isFulfilled = !0) : this.isRejected() && (t.rejectionReason = this.reason(), t.isRejected = !0), t
                                    }, x.prototype.all = function() {
                                        return new g(this).promise()
                                    }, x.prototype.error = function(t) {
                                        return this.caught(o.originatesFromRejection, t)
                                    }, x.is = function(t) {
                                        return t instanceof x
                                    }, x.fromNode = function(t) {
                                        var e = new x(d),
                                            n = w(t)(b(e));
                                        return n === _ && e._rejectCallback(n.e, !0, !0), e
                                    }, x.all = function(t) {
                                        return new g(t).promise()
                                    }, x.defer = x.pending = function() {
                                        var t = new x(d);
                                        return new y(t)
                                    }, x.resolve = x.fulfilled = x.cast = function(t) {
                                        var e = p(t);
                                        if (!(e instanceof x)) {
                                            var n = e;
                                            (e = new x(d))._fulfillUnchecked(n)
                                        }
                                        return e
                                    }, x.reject = x.rejected = function(t) {
                                        var e = new x(d);
                                        return e._captureStackTrace(), e._rejectCallback(t, !0), e
                                    }, x.setScheduler = function(t) {
                                        if ("function" != typeof t) throw new h("fn must be a function\n\n    See http://goo.gl/916lJJ\n");
                                        var e = c._schedule;
                                        return c._schedule = t, e
                                    }, x.prototype._then = function(t, e, n, r, i) {
                                        var o = void 0 !== i,
                                            a = o ? i : new x(d);
                                        o || (a._propagateFrom(this, 5), a._captureStackTrace());
                                        var s = this._target();
                                        s !== this && (void 0 === r && (r = this._boundTo), o || a._setIsMigrated());
                                        var l = s._addCallbacks(t, e, n, a, r, u());
                                        return s._isResolved() && !s._isSettlePromisesQueued() && c.invoke(s._settlePromiseAtPostResolution, s, l), a
                                    }, x.prototype._settlePromiseAtPostResolution = function(t) {
                                        this._isRejectionUnhandled() && this._unsetRejectionIsUnhandled(), this._settlePromiseAt(t)
                                    }, x.prototype._length = function() {
                                        return 131071 & this._bitField
                                    }, x.prototype._isFollowingOrFulfilledOrRejected = function() {
                                        return 0 < (939524096 & this._bitField)
                                    }, x.prototype._isFollowing = function() {
                                        return 536870912 == (536870912 & this._bitField)
                                    }, x.prototype._setLength = function(t) {
                                        this._bitField = -131072 & this._bitField | 131071 & t
                                    }, x.prototype._setFulfilled = function() {
                                        this._bitField = 268435456 | this._bitField
                                    }, x.prototype._setRejected = function() {
                                        this._bitField = 134217728 | this._bitField
                                    }, x.prototype._setFollowing = function() {
                                        this._bitField = 536870912 | this._bitField
                                    }, x.prototype._setIsFinal = function() {
                                        this._bitField = 33554432 | this._bitField
                                    }, x.prototype._isFinal = function() {
                                        return 0 < (33554432 & this._bitField)
                                    }, x.prototype._cancellable = function() {
                                        return 0 < (67108864 & this._bitField)
                                    }, x.prototype._setCancellable = function() {
                                        this._bitField = 67108864 | this._bitField
                                    }, x.prototype._unsetCancellable = function() {
                                        this._bitField = -67108865 & this._bitField
                                    }, x.prototype._setIsMigrated = function() {
                                        this._bitField = 4194304 | this._bitField
                                    }, x.prototype._unsetIsMigrated = function() {
                                        this._bitField = -4194305 & this._bitField
                                    }, x.prototype._isMigrated = function() {
                                        return 0 < (4194304 & this._bitField)
                                    }, x.prototype._receiverAt = function(t) {
                                        var e = 0 === t ? this._receiver0 : this[5 * t - 5 + 4];
                                        if (e !== l) return void 0 === e && this._isBound() ? this._boundValue() : e
                                    }, x.prototype._promiseAt = function(t) {
                                        return 0 === t ? this._promise0 : this[5 * t - 5 + 3]
                                    }, x.prototype._fulfillmentHandlerAt = function(t) {
                                        return 0 === t ? this._fulfillmentHandler0 : this[5 * t - 5 + 0]
                                    }, x.prototype._rejectionHandlerAt = function(t) {
                                        return 0 === t ? this._rejectionHandler0 : this[5 * t - 5 + 1]
                                    }, x.prototype._boundValue = function() {
                                        var t = this._boundTo;
                                        return void 0 !== t && t instanceof x ? t.isFulfilled() ? t.value() : void 0 : t
                                    }, x.prototype._migrateCallbacks = function(t, e) {
                                        var n = t._fulfillmentHandlerAt(e),
                                            r = t._rejectionHandlerAt(e),
                                            i = t._progressHandlerAt(e),
                                            o = t._promiseAt(e),
                                            a = t._receiverAt(e);
                                        o instanceof x && o._setIsMigrated(), void 0 === a && (a = l), this._addCallbacks(n, r, i, o, a, null)
                                    }, x.prototype._addCallbacks = function(t, e, n, r, i, o) {
                                        var a = this._length();
                                        if (131066 <= a && (a = 0, this._setLength(0)), 0 === a) this._promise0 = r, void 0 !== i && (this._receiver0 = i), "function" != typeof t || this._isCarryingStackTrace() || (this._fulfillmentHandler0 = null === o ? t : o.bind(t)), "function" == typeof e && (this._rejectionHandler0 = null === o ? e : o.bind(e)), "function" == typeof n && (this._progressHandler0 = null === o ? n : o.bind(n));
                                        else {
                                            var s = 5 * a - 5;
                                            this[s + 3] = r, this[s + 4] = i, "function" == typeof t && (this[s + 0] = null === o ? t : o.bind(t)), "function" == typeof e && (this[s + 1] = null === o ? e : o.bind(e)), "function" == typeof n && (this[s + 2] = null === o ? n : o.bind(n))
                                        }
                                        return this._setLength(a + 1), a
                                    }, x.prototype._setProxyHandlers = function(t, e) {
                                        var n = this._length();
                                        if (131066 <= n && (n = 0, this._setLength(0)), 0 === n) this._promise0 = e, this._receiver0 = t;
                                        else {
                                            var r = 5 * n - 5;
                                            this[r + 3] = e, this[r + 4] = t
                                        }
                                        this._setLength(n + 1)
                                    }, x.prototype._proxyPromiseArray = function(t, e) {
                                        this._setProxyHandlers(t, e)
                                    }, x.prototype._resolveCallback = function(t, e) {
                                        if (!this._isFollowingOrFulfilledOrRejected()) {
                                            if (t === this) return this._rejectCallback(s(), !1, !0);
                                            var n = p(t, this);
                                            if (!(n instanceof x)) return this._fulfill(t);
                                            var r = 1 | (e ? 4 : 0);
                                            this._propagateFrom(n, r);
                                            var i = n._target();
                                            if (i._isPending()) {
                                                for (var o = this._length(), a = 0; a < o; ++a) i._migrateCallbacks(this, a);
                                                this._setFollowing(), this._setLength(0), this._setFollowee(i)
                                            } else i._isFulfilled() ? this._fulfillUnchecked(i._value()) : this._rejectUnchecked(i._reason(), i._getCarriedStackTrace())
                                        }
                                    }, x.prototype._rejectCallback = function(t, e, n) {
                                        n || o.markAsOriginatingFromRejection(t);
                                        var r = o.ensureErrorObject(t),
                                            i = r === t;
                                        this._attachExtraTrace(r, !!e && i), this._reject(t, i ? void 0 : r)
                                    }, x.prototype._resolveFromResolver = function(t) {
                                        var e = this;
                                        this._captureStackTrace(), this._pushContext();
                                        var n = !0,
                                            r = w(t)(function(t) {
                                                null !== e && (e._resolveCallback(t), e = null)
                                            }, function(t) {
                                                null !== e && (e._rejectCallback(t, n), e = null)
                                            });
                                        n = !1, this._popContext(), void 0 !== r && r === _ && null !== e && (e._rejectCallback(r.e, !0, !0), e = null)
                                    }, x.prototype._settlePromiseFromHandler = function(t, e, n, r) {
                                        var i;
                                        if (!r._isRejected())
                                            if (r._pushContext(), i = e !== a || this._isRejected() ? w(t).call(e, n) : w(t).apply(this._boundValue(), n), r._popContext(), i === _ || i === r || i === f) {
                                                var o = i === r ? s() : i.e;
                                                r._rejectCallback(o, !1, !0)
                                            } else r._resolveCallback(i)
                                    }, x.prototype._target = function() {
                                        for (var t = this; t._isFollowing();) t = t._followee();
                                        return t
                                    }, x.prototype._followee = function() {
                                        return this._rejectionHandler0
                                    }, x.prototype._setFollowee = function(t) {
                                        this._rejectionHandler0 = t
                                    }, x.prototype._cleanValues = function() {
                                        this._cancellable() && (this._cancellationParent = void 0)
                                    }, x.prototype._propagateFrom = function(t, e) {
                                        0 < (1 & e) && t._cancellable() && (this._setCancellable(), this._cancellationParent = t), 0 < (4 & e) && t._isBound() && this._setBoundTo(t._boundTo)
                                    }, x.prototype._fulfill = function(t) {
                                        this._isFollowingOrFulfilledOrRejected() || this._fulfillUnchecked(t)
                                    }, x.prototype._reject = function(t, e) {
                                        this._isFollowingOrFulfilledOrRejected() || this._rejectUnchecked(t, e)
                                    }, x.prototype._settlePromiseAt = function(t) {
                                        var e = this._promiseAt(t),
                                            n = e instanceof x;
                                        if (n && e._isMigrated()) return e._unsetIsMigrated(), c.invoke(this._settlePromiseAt, this, t);
                                        var r = this._isFulfilled() ? this._fulfillmentHandlerAt(t) : this._rejectionHandlerAt(t),
                                            i = this._isCarryingStackTrace() ? this._getCarriedStackTrace() : void 0,
                                            o = this._settledValue,
                                            a = this._receiverAt(t);
                                        this._clearCallbackDataAtIndex(t), "function" == typeof r ? n ? this._settlePromiseFromHandler(r, a, o, e) : r.call(a, o, e) : a instanceof g ? a._isResolved() || (this._isFulfilled() ? a._promiseFulfilled(o, e) : a._promiseRejected(o, e)) : n && (this._isFulfilled() ? e._fulfill(o) : e._reject(o, i)), 4 <= t && 4 == (31 & t) && c.invokeLater(this._setLength, this, 0)
                                    }, x.prototype._clearCallbackDataAtIndex = function(t) {
                                        if (0 === t) this._isCarryingStackTrace() || (this._fulfillmentHandler0 = void 0), this._rejectionHandler0 = this._progressHandler0 = this._receiver0 = this._promise0 = void 0;
                                        else {
                                            var e = 5 * t - 5;
                                            this[e + 3] = this[e + 4] = this[e + 0] = this[e + 1] = this[e + 2] = void 0
                                        }
                                    }, x.prototype._isSettlePromisesQueued = function() {
                                        return -1073741824 == (-1073741824 & this._bitField)
                                    }, x.prototype._setSettlePromisesQueued = function() {
                                        this._bitField = -1073741824 | this._bitField
                                    }, x.prototype._unsetSettlePromisesQueued = function() {
                                        this._bitField = 1073741823 & this._bitField
                                    }, x.prototype._queueSettlePromises = function() {
                                        c.settlePromises(this), this._setSettlePromisesQueued()
                                    }, x.prototype._fulfillUnchecked = function(t) {
                                        if (t === this) {
                                            var e = s();
                                            return this._attachExtraTrace(e), this._rejectUnchecked(e, void 0)
                                        }
                                        this._setFulfilled(), this._settledValue = t, this._cleanValues(), 0 < this._length() && this._queueSettlePromises()
                                    }, x.prototype._rejectUncheckedCheckError = function(t) {
                                        var e = o.ensureErrorObject(t);
                                        this._rejectUnchecked(t, e === t ? void 0 : e)
                                    }, x.prototype._rejectUnchecked = function(t, e) {
                                        if (t === this) {
                                            var n = s();
                                            return this._attachExtraTrace(n), this._rejectUnchecked(n)
                                        }
                                        this._setRejected(), this._settledValue = t, this._cleanValues(), this._isFinal() ? c.throwLater(function(t) {
                                            throw "stack" in t && c.invokeFirst(r.unhandledRejection, void 0, t), t
                                        }, void 0 === e ? t : e) : (void 0 !== e && e !== t && this._setCarriedStackTrace(e), 0 < this._length() ? this._queueSettlePromises() : this._ensurePossibleRejectionHandled())
                                    }, x.prototype._settlePromises = function() {
                                        this._unsetSettlePromisesQueued();
                                        for (var t = this._length(), e = 0; e < t; e++) this._settlePromiseAt(e)
                                    }, o.notEnumerableProp(x, "_makeSelfResolutionError", s), S("./progress.js")(x, g), S("./method.js")(x, d, p, e), S("./bind.js")(x, d, p), S("./finally.js")(x, f, p), S("./direct_resolve.js")(x), S("./synchronous_inspection.js")(x), S("./join.js")(x, g, p, d), x.Promise = x, S("./map.js")(x, g, e, p, d), S("./cancel.js")(x), S("./using.js")(x, e, p, v), S("./generators.js")(x, e, d, p), S("./nodeify.js")(x), S("./call_get.js")(x), S("./props.js")(x, g, p, e), S("./race.js")(x, d, p, e), S("./reduce.js")(x, g, e, p, d), S("./settle.js")(x, g), S("./some.js")(x, g, e), S("./promisify.js")(x, d), S("./any.js")(x), S("./each.js")(x, d), S("./timers.js")(x, d), S("./filter.js")(x, d), o.toFastProperties(x), o.toFastProperties(x.prototype), k({
                                        a: 1
                                    }), k({
                                        b: 2
                                    }), k({
                                        c: 3
                                    }), k(1), k(function() {}), k(void 0), k(!1), k(new x(d)), r.setBounds(c.firstLineError, o.lastLineError), x
                                }
                            }, {
                                "./any.js": 1,
                                "./async.js": 2,
                                "./bind.js": 3,
                                "./call_get.js": 5,
                                "./cancel.js": 6,
                                "./captured_trace.js": 7,
                                "./catch_filter.js": 8,
                                "./context.js": 9,
                                "./debuggability.js": 10,
                                "./direct_resolve.js": 11,
                                "./each.js": 12,
                                "./errors.js": 13,
                                "./filter.js": 15,
                                "./finally.js": 16,
                                "./generators.js": 17,
                                "./join.js": 18,
                                "./map.js": 19,
                                "./method.js": 20,
                                "./nodeify.js": 21,
                                "./progress.js": 22,
                                "./promise_array.js": 24,
                                "./promise_resolver.js": 25,
                                "./promisify.js": 26,
                                "./props.js": 27,
                                "./race.js": 29,
                                "./reduce.js": 30,
                                "./settle.js": 32,
                                "./some.js": 33,
                                "./synchronous_inspection.js": 34,
                                "./thenables.js": 35,
                                "./timers.js": 36,
                                "./using.js": 37,
                                "./util.js": 38
                            }],
                            24: [function(e, t, n) {
                                "use strict";
                                t.exports = function(c, r, h, d) {
                                    var f = e("./util.js").isArray;

                                    function t(t) {
                                        var e, n = this._promise = new c(r);
                                        t instanceof c && (e = t, n._propagateFrom(e, 5)), this._values = t, this._length = 0, this._totalResolved = 0, this._init(void 0, -2)
                                    }
                                    return t.prototype.length = function() {
                                        return this._length
                                    }, t.prototype.promise = function() {
                                        return this._promise
                                    }, t.prototype._init = function t(e, n) {
                                        var r = h(this._values, this._promise);
                                        if (r instanceof c) {
                                            if (r = r._target(), !(this._values = r)._isFulfilled()) return r._isPending() ? void r._then(t, this._reject, void 0, this, n) : void this._reject(r._reason());
                                            if (r = r._value(), !f(r)) {
                                                var i = new c.TypeError("expecting an array, a promise or a thenable\n\n    See http://goo.gl/s8MMhc\n");
                                                return void this.__hardReject__(i)
                                            }
                                        } else if (!f(r)) return void this._promise._reject(d("expecting an array, a promise or a thenable\n\n    See http://goo.gl/s8MMhc\n")._reason());
                                        if (0 !== r.length) {
                                            var o = this.getActualLength(r.length);
                                            this._length = o, this._values = this.shouldCopyValues() ? new Array(o) : this._values;
                                            for (var a = this._promise, s = 0; s < o; ++s) {
                                                var l = this._isResolved(),
                                                    u = h(r[s], a);
                                                u instanceof c ? (u = u._target(), l ? u._ignoreRejections() : u._isPending() ? u._proxyPromiseArray(this, s) : u._isFulfilled() ? this._promiseFulfilled(u._value(), s) : this._promiseRejected(u._reason(), s)) : l || this._promiseFulfilled(u, s)
                                            }
                                        } else -5 === n ? this._resolveEmptyArray() : this._resolve(function(t) {
                                            switch (t) {
                                                case -2:
                                                    return [];
                                                case -3:
                                                    return {}
                                            }
                                        }(n))
                                    }, t.prototype._isResolved = function() {
                                        return null === this._values
                                    }, t.prototype._resolve = function(t) {
                                        this._values = null, this._promise._fulfill(t)
                                    }, t.prototype.__hardReject__ = t.prototype._reject = function(t) {
                                        this._values = null, this._promise._rejectCallback(t, !1, !0)
                                    }, t.prototype._promiseProgressed = function(t, e) {
                                        this._promise._progress({
                                            index: e,
                                            value: t
                                        })
                                    }, t.prototype._promiseFulfilled = function(t, e) {
                                        this._values[e] = t, ++this._totalResolved >= this._length && this._resolve(this._values)
                                    }, t.prototype._promiseRejected = function(t, e) {
                                        this._totalResolved++, this._reject(t)
                                    }, t.prototype.shouldCopyValues = function() {
                                        return !0
                                    }, t.prototype.getActualLength = function(t) {
                                        return t
                                    }, t
                                }
                            }, {
                                "./util.js": 38
                            }],
                            25: [function(t, e, n) {
                                "use strict";
                                var a = t("./util.js"),
                                    s = a.maybeWrapAsError,
                                    r = t("./errors.js"),
                                    i = r.TimeoutError,
                                    l = r.OperationalError,
                                    o = a.haveGetters,
                                    u = t("./es5.js");
                                var c, h = /^(?:name|message|stack|cause)$/;

                                function d(t) {
                                    var e, n;
                                    if ((n = t) instanceof Error && u.getPrototypeOf(n) === Error.prototype) {
                                        (e = new l(t)).name = t.name, e.message = t.message, e.stack = t.stack;
                                        for (var r = u.keys(t), i = 0; i < r.length; ++i) {
                                            var o = r[i];
                                            h.test(o) || (e[o] = t[o])
                                        }
                                        return e
                                    }
                                    return a.markAsOriginatingFromRejection(t), t
                                }

                                function f(a) {
                                    return function(t, e) {
                                        if (null !== a) {
                                            if (t) {
                                                var n = d(s(t));
                                                a._attachExtraTrace(n), a._reject(n)
                                            } else if (2 < arguments.length) {
                                                for (var r = arguments.length, i = new Array(r - 1), o = 1; o < r; ++o) i[o - 1] = arguments[o];
                                                a._fulfill(i)
                                            } else a._fulfill(e);
                                            a = null
                                        }
                                    }
                                }
                                if (c = o ? function(t) {
                                        this.promise = t
                                    } : function(t) {
                                        this.promise = t, this.asCallback = f(t), this.callback = this.asCallback
                                    }, o) {
                                    var p = {
                                        get: function() {
                                            return f(this.promise)
                                        }
                                    };
                                    u.defineProperty(c.prototype, "asCallback", p), u.defineProperty(c.prototype, "callback", p)
                                }
                                c._nodebackForPromise = f, c.prototype.toString = function() {
                                    return "[object PromiseResolver]"
                                }, c.prototype.resolve = c.prototype.fulfill = function(t) {
                                    if (!(this instanceof c)) throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.\n\n    See http://goo.gl/sdkXL9\n");
                                    this.promise._resolveCallback(t)
                                }, c.prototype.reject = function(t) {
                                    if (!(this instanceof c)) throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.\n\n    See http://goo.gl/sdkXL9\n");
                                    this.promise._rejectCallback(t)
                                }, c.prototype.progress = function(t) {
                                    if (!(this instanceof c)) throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.\n\n    See http://goo.gl/sdkXL9\n");
                                    this.promise._progress(t)
                                }, c.prototype.cancel = function(t) {
                                    this.promise.cancel(t)
                                }, c.prototype.timeout = function() {
                                    this.reject(new i("timeout"))
                                }, c.prototype.isResolved = function() {
                                    return this.promise.isResolved()
                                }, c.prototype.toJSON = function() {
                                    return this.promise.toJSON()
                                }, e.exports = c
                            }, {
                                "./errors.js": 13,
                                "./es5.js": 14,
                                "./util.js": 38
                            }],
                            26: [function(r, t, e) {
                                "use strict";
                                t.exports = function(l, u) {
                                    var d = {},
                                        p = r("./util.js"),
                                        c = r("./promise_resolver.js")._nodebackForPromise,
                                        h = p.withAppended,
                                        f = p.maybeWrapAsError,
                                        t = p.canEvaluate,
                                        g = r("./errors").TypeError,
                                        v = {
                                            __isPromisified__: !0
                                        },
                                        e = new RegExp("^(?:" + ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"].join("|") + ")$"),
                                        m = function(t) {
                                            return p.isIdentifier(t) && "_" !== t.charAt(0) && "constructor" !== t
                                        };

                                    function o(t) {
                                        return !e.test(t)
                                    }

                                    function y(t) {
                                        try {
                                            return !0 === t.__isPromisified__
                                        } catch (t) {
                                            return !1
                                        }
                                    }

                                    function b(t, e, n, r) {
                                        for (var i, o, a, s, l = p.inheritedDataKeys(t), u = [], c = 0; c < l.length; ++c) {
                                            var h = l[c],
                                                d = t[h],
                                                f = r === m || m(h, d, t);
                                            "function" != typeof d || y(d) || (i = t, o = h, a = e, void 0, (s = p.getDataPropertyOrDefault(i, o + a, v)) && y(s)) || !r(h, d, t, f) || u.push(h, d)
                                        }
                                        return function(t, e, n) {
                                            for (var r = 0; r < t.length; r += 2) {
                                                var i = t[r];
                                                if (n.test(i))
                                                    for (var o = i.replace(n, ""), a = 0; a < t.length; a += 2)
                                                        if (t[a] === o) throw new g("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/iWrZbw\n".replace("%s", e))
                                            }
                                        }(u, e, n), u
                                    }
                                    var n, _ = function(t) {
                                        return t.replace(/([$])/, "\\$")
                                    };
                                    var w = t ? n : function(i, o, t, e) {
                                        var a = function() {
                                                return this
                                            }(),
                                            s = i;

                                        function n() {
                                            var t = o;
                                            o === d && (t = this);
                                            var e = new l(u);
                                            e._captureStackTrace();
                                            var n = "string" == typeof s && this !== a ? this[s] : i,
                                                r = c(e);
                                            try {
                                                n.apply(t, h(arguments, r))
                                            } catch (t) {
                                                e._rejectCallback(f(t), !0, !0)
                                            }
                                            return e
                                        }
                                        return "string" == typeof s && (i = e), p.notEnumerableProp(n, "__isPromisified__", !0), n
                                    };

                                    function x(t, e, n, r) {
                                        for (var i = new RegExp(_(e) + "$"), o = b(t, e, i, n), a = 0, s = o.length; a < s; a += 2) {
                                            var l = o[a],
                                                u = o[a + 1],
                                                c = l + e;
                                            if (r === w) t[c] = w(l, d, l, u, e);
                                            else {
                                                var h = r(u, function() {
                                                    return w(l, d, l, u, e)
                                                });
                                                p.notEnumerableProp(h, "__isPromisified__", !0), t[c] = h
                                            }
                                        }
                                        return p.toFastProperties(t), t
                                    }
                                    l.promisify = function(t, e) {
                                        if ("function" != typeof t) throw new g("fn must be a function\n\n    See http://goo.gl/916lJJ\n");
                                        if (y(t)) return t;
                                        var n, r, i = (n = t, r = arguments.length < 2 ? d : e, w(n, r, void 0, n));
                                        return p.copyDescriptors(t, i, o), i
                                    }, l.promisifyAll = function(t, e) {
                                        if ("function" != typeof t && "object" != typeof t) throw new g("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/9ITlV0\n");
                                        var n = (e = Object(e)).suffix;
                                        "string" != typeof n && (n = "Async");
                                        var r = e.filter;
                                        "function" != typeof r && (r = m);
                                        var i = e.promisifier;
                                        if ("function" != typeof i && (i = w), !p.isIdentifier(n)) throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/8FZo5V\n");
                                        for (var o = p.inheritedDataKeys(t), a = 0; a < o.length; ++a) {
                                            var s = t[o[a]];
                                            "constructor" !== o[a] && p.isClass(s) && (x(s.prototype, n, r, i), x(s, n, r, i))
                                        }
                                        return x(t, n, r, i)
                                    }
                                }
                            }, {
                                "./errors": 13,
                                "./promise_resolver.js": 25,
                                "./util.js": 38
                            }],
                            27: [function(u, t, e) {
                                "use strict";
                                t.exports = function(r, t, i, o) {
                                    var e = u("./util.js"),
                                        a = e.isObject,
                                        s = u("./es5.js");

                                    function l(t) {
                                        for (var e = s.keys(t), n = e.length, r = new Array(2 * n), i = 0; i < n; ++i) {
                                            var o = e[i];
                                            r[i] = t[o], r[i + n] = o
                                        }
                                        this.constructor$(r)
                                    }

                                    function n(t) {
                                        var e, n = i(t);
                                        return a(n) ? (e = n instanceof r ? n._then(r.props, void 0, void 0, void 0, void 0) : new l(n).promise(), n instanceof r && e._propagateFrom(n, 4), e) : o("cannot await properties of a non-object\n\n    See http://goo.gl/OsFKC8\n")
                                    }
                                    e.inherits(l, t), l.prototype._init = function() {
                                        this._init$(void 0, -3)
                                    }, l.prototype._promiseFulfilled = function(t, e) {
                                        if (this._values[e] = t, ++this._totalResolved >= this._length) {
                                            for (var n = {}, r = this.length(), i = 0, o = this.length(); i < o; ++i) n[this._values[i + r]] = this._values[i];
                                            this._resolve(n)
                                        }
                                    }, l.prototype._promiseProgressed = function(t, e) {
                                        this._promise._progress({
                                            key: this._values[e + this.length()],
                                            value: t
                                        })
                                    }, l.prototype.shouldCopyValues = function() {
                                        return !1
                                    }, l.prototype.getActualLength = function(t) {
                                        return t >> 1
                                    }, r.prototype.props = function() {
                                        return n(this)
                                    }, r.props = function(t) {
                                        return n(t)
                                    }
                                }
                            }, {
                                "./es5.js": 14,
                                "./util.js": 38
                            }],
                            28: [function(t, e, n) {
                                "use strict";

                                function r(t) {
                                    this._capacity = t, this._length = 0, this._front = 0
                                }
                                r.prototype._willBeOverCapacity = function(t) {
                                    return this._capacity < t
                                }, r.prototype._pushOne = function(t) {
                                    var e = this.length();
                                    this._checkCapacity(e + 1), this[this._front + e & this._capacity - 1] = t, this._length = e + 1
                                }, r.prototype._unshiftOne = function(t) {
                                    var e = this._capacity;
                                    this._checkCapacity(this.length() + 1);
                                    var n = (this._front - 1 & e - 1 ^ e) - e;
                                    this[n] = t, this._front = n, this._length = this.length() + 1
                                }, r.prototype.unshift = function(t, e, n) {
                                    this._unshiftOne(n), this._unshiftOne(e), this._unshiftOne(t)
                                }, r.prototype.push = function(t, e, n) {
                                    var r = this.length() + 3;
                                    if (this._willBeOverCapacity(r)) return this._pushOne(t), this._pushOne(e), void this._pushOne(n);
                                    var i = this._front + r - 3;
                                    this._checkCapacity(r);
                                    var o = this._capacity - 1;
                                    this[i + 0 & o] = t, this[i + 1 & o] = e, this[i + 2 & o] = n, this._length = r
                                }, r.prototype.shift = function() {
                                    var t = this._front,
                                        e = this[t];
                                    return this[t] = void 0, this._front = t + 1 & this._capacity - 1, this._length--, e
                                }, r.prototype.length = function() {
                                    return this._length
                                }, r.prototype._checkCapacity = function(t) {
                                    this._capacity < t && this._resizeTo(this._capacity << 1)
                                }, r.prototype._resizeTo = function(t) {
                                    var e = this._capacity;
                                    this._capacity = t,
                                        function(t, e, n, r, i) {
                                            for (var o = 0; o < i; ++o) n[o + r] = t[o + e], t[o + e] = void 0
                                        }(this, 0, this, e, this._front + this._length & e - 1)
                                }, e.exports = r
                            }, {}],
                            29: [function(t, e, n) {
                                "use strict";
                                e.exports = function(u, c, h, d) {
                                    var f = t("./util.js").isArray,
                                        p = function(e) {
                                            return e.then(function(t) {
                                                return n(t, e)
                                            })
                                        };

                                    function n(t, e) {
                                        var n = h(t);
                                        if (n instanceof u) return p(n);
                                        if (!f(t)) return d("expecting an array, a promise or a thenable\n\n    See http://goo.gl/s8MMhc\n");
                                        var r = new u(c);
                                        void 0 !== e && r._propagateFrom(e, 5);
                                        for (var i = r._fulfill, o = r._reject, a = 0, s = t.length; a < s; ++a) {
                                            var l = t[a];
                                            (void 0 !== l || a in t) && u.cast(l)._then(i, o, void 0, r, null)
                                        }
                                        return r
                                    }
                                    u.race = function(t) {
                                        return n(t, void 0)
                                    }, u.prototype.race = function() {
                                        return n(this, void 0)
                                    }
                                }
                            }, {
                                "./util.js": 38
                            }],
                            30: [function(n, t, e) {
                                "use strict";
                                t.exports = function(p, t, i, g, l) {
                                    var u = p._getDomain,
                                        c = n("./async.js"),
                                        e = n("./util.js"),
                                        v = e.tryCatch,
                                        m = e.errorObj;

                                    function o(t, e, n, r) {
                                        this.constructor$(t), this._promise._captureStackTrace(), this._preservedValues = r === l ? [] : null, this._zerothIsAccum = void 0 === n, this._gotAccum = !1, this._reducingIndex = this._zerothIsAccum ? 1 : 0, this._valuesPhase = void 0;
                                        var i = g(n, this._promise),
                                            o = !1,
                                            a = i instanceof p;
                                        a && ((i = i._target())._isPending() ? i._proxyPromiseArray(this, -1) : i._isFulfilled() ? (n = i._value(), this._gotAccum = !0) : (this._reject(i._reason()), o = !0)), a || this._zerothIsAccum || (this._gotAccum = !0);
                                        var s = u();
                                        this._callback = null === s ? e : s.bind(e), this._accum = n, o || c.invoke(h, this, void 0)
                                    }

                                    function h() {
                                        this._init$(void 0, -5)
                                    }

                                    function a(t, e, n, r) {
                                        return "function" != typeof e ? i("fn must be a function\n\n    See http://goo.gl/916lJJ\n") : new o(t, e, n, r).promise()
                                    }
                                    e.inherits(o, t), o.prototype._init = function() {}, o.prototype._resolveEmptyArray = function() {
                                        (this._gotAccum || this._zerothIsAccum) && this._resolve(null !== this._preservedValues ? [] : this._accum)
                                    }, o.prototype._promiseFulfilled = function(t, e) {
                                        var n = this._values;
                                        n[e] = t;
                                        var r, i = this.length(),
                                            o = this._preservedValues,
                                            a = null !== o,
                                            s = this._gotAccum,
                                            l = this._valuesPhase;
                                        if (!l)
                                            for (l = this._valuesPhase = new Array(i), r = 0; r < i; ++r) l[r] = 0;
                                        if (r = l[e], 0 === e && this._zerothIsAccum ? (this._accum = t, this._gotAccum = s = !0, l[e] = 0 === r ? 1 : 2) : -1 === e ? (this._accum = t, this._gotAccum = s = !0) : 0 === r ? l[e] = 1 : (l[e] = 2, this._accum = t), s) {
                                            for (var u, c = this._callback, h = this._promise._boundValue(), d = this._reducingIndex; d < i; ++d)
                                                if (2 !== (r = l[d])) {
                                                    if (1 !== r) return;
                                                    if (t = n[d], this._promise._pushContext(), a ? (o.push(t), u = v(c).call(h, t, d, i)) : u = v(c).call(h, this._accum, t, d, i), this._promise._popContext(), u === m) return this._reject(u.e);
                                                    var f = g(u, this._promise);
                                                    if (f instanceof p) {
                                                        if ((f = f._target())._isPending()) return l[d] = 4, f._proxyPromiseArray(this, d);
                                                        if (!f._isFulfilled()) return this._reject(f._reason());
                                                        u = f._value()
                                                    }
                                                    this._reducingIndex = d + 1, this._accum = u
                                                } else this._reducingIndex = d + 1;
                                            this._resolve(a ? o : this._accum)
                                        }
                                    }, p.prototype.reduce = function(t, e) {
                                        return a(this, t, e, null)
                                    }, p.reduce = function(t, e, n, r) {
                                        return a(t, e, n, r)
                                    }
                                }
                            }, {
                                "./async.js": 2,
                                "./util.js": 38
                            }],
                            31: [function(t, e, n) {
                                "use strict";
                                var r, i = t("./util");
                                if (i.isNode && "undefined" == typeof MutationObserver) {
                                    var o = s.setImmediate,
                                        a = O.nextTick;
                                    r = i.isRecentNode ? function(t) {
                                        o.call(s, t)
                                    } : function(t) {
                                        a.call(O, t)
                                    }
                                } else "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && window.navigator.standalone ? r = "undefined" != typeof setImmediate ? function(t) {
                                    setImmediate(t)
                                } : "undefined" != typeof setTimeout ? function(t) {
                                    setTimeout(t, 0)
                                } : function() {
                                    throw new Error("No async scheduler available\n\n    See http://goo.gl/m3OTXk\n")
                                } : (r = function(t) {
                                    var e = document.createElement("div");
                                    return new MutationObserver(t).observe(e, {
                                            attributes: !0
                                        }),
                                        function() {
                                            e.classList.toggle("foo")
                                        }
                                }).isStatic = !0;
                                e.exports = r
                            }, {
                                "./util": 38
                            }],
                            32: [function(i, t, e) {
                                "use strict";
                                t.exports = function(t, e) {
                                    var r = t.PromiseInspection;

                                    function n(t) {
                                        this.constructor$(t)
                                    }
                                    i("./util.js").inherits(n, e), n.prototype._promiseResolved = function(t, e) {
                                        this._values[t] = e, ++this._totalResolved >= this._length && this._resolve(this._values)
                                    }, n.prototype._promiseFulfilled = function(t, e) {
                                        var n = new r;
                                        n._bitField = 268435456, n._settledValue = t, this._promiseResolved(e, n)
                                    }, n.prototype._promiseRejected = function(t, e) {
                                        var n = new r;
                                        n._bitField = 134217728, n._settledValue = t, this._promiseResolved(e, n)
                                    }, t.settle = function(t) {
                                        return new n(t).promise()
                                    }, t.prototype.settle = function() {
                                        return new n(this).promise()
                                    }
                                }
                            }, {
                                "./util.js": 38
                            }],
                            33: [function(u, t, e) {
                                "use strict";
                                t.exports = function(t, e, i) {
                                    var n = u("./util.js"),
                                        r = u("./errors.js").RangeError,
                                        o = u("./errors.js").AggregateError,
                                        a = n.isArray;

                                    function s(t) {
                                        this.constructor$(t), this._howMany = 0, this._unwrap = !1, this._initialized = !1
                                    }

                                    function l(t, e) {
                                        if ((0 | e) !== e || e < 0) return i("expecting a positive integer\n\n    See http://goo.gl/1wAmHx\n");
                                        var n = new s(t),
                                            r = n.promise();
                                        return n.setHowMany(e), n.init(), r
                                    }
                                    n.inherits(s, e), s.prototype._init = function() {
                                        if (this._initialized)
                                            if (0 !== this._howMany) {
                                                this._init$(void 0, -5);
                                                var t = a(this._values);
                                                !this._isResolved() && t && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()))
                                            } else this._resolve([])
                                    }, s.prototype.init = function() {
                                        this._initialized = !0, this._init()
                                    }, s.prototype.setUnwrap = function() {
                                        this._unwrap = !0
                                    }, s.prototype.howMany = function() {
                                        return this._howMany
                                    }, s.prototype.setHowMany = function(t) {
                                        this._howMany = t
                                    }, s.prototype._promiseFulfilled = function(t) {
                                        this._addFulfilled(t), this._fulfilled() === this.howMany() && (this._values.length = this.howMany(), 1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values))
                                    }, s.prototype._promiseRejected = function(t) {
                                        if (this._addRejected(t), this.howMany() > this._canPossiblyFulfill()) {
                                            for (var e = new o, n = this.length(); n < this._values.length; ++n) e.push(this._values[n]);
                                            this._reject(e)
                                        }
                                    }, s.prototype._fulfilled = function() {
                                        return this._totalResolved
                                    }, s.prototype._rejected = function() {
                                        return this._values.length - this.length()
                                    }, s.prototype._addRejected = function(t) {
                                        this._values.push(t)
                                    }, s.prototype._addFulfilled = function(t) {
                                        this._values[this._totalResolved++] = t
                                    }, s.prototype._canPossiblyFulfill = function() {
                                        return this.length() - this._rejected()
                                    }, s.prototype._getRangeError = function(t) {
                                        var e = "Input array must contain at least " + this._howMany + " items but contains only " + t + " items";
                                        return new r(e)
                                    }, s.prototype._resolveEmptyArray = function() {
                                        this._reject(this._getRangeError(0))
                                    }, t.some = function(t, e) {
                                        return l(t, e)
                                    }, t.prototype.some = function(t) {
                                        return l(this, t)
                                    }, t._SomePromiseArray = s
                                }
                            }, {
                                "./errors.js": 13,
                                "./util.js": 38
                            }],
                            34: [function(t, e, n) {
                                "use strict";
                                e.exports = function(t) {
                                    function e(t) {
                                        void 0 !== t ? (t = t._target(), this._bitField = t._bitField, this._settledValue = t._settledValue) : (this._bitField = 0, this._settledValue = void 0)
                                    }
                                    e.prototype.value = function() {
                                        if (!this.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/hc1DLj\n");
                                        return this._settledValue
                                    }, e.prototype.error = e.prototype.reason = function() {
                                        if (!this.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/hPuiwB\n");
                                        return this._settledValue
                                    }, e.prototype.isFulfilled = t.prototype._isFulfilled = function() {
                                        return 0 < (268435456 & this._bitField)
                                    }, e.prototype.isRejected = t.prototype._isRejected = function() {
                                        return 0 < (134217728 & this._bitField)
                                    }, e.prototype.isPending = t.prototype._isPending = function() {
                                        return 0 == (402653184 & this._bitField)
                                    }, e.prototype.isResolved = t.prototype._isResolved = function() {
                                        return 0 < (402653184 & this._bitField)
                                    }, t.prototype.isPending = function() {
                                        return this._target()._isPending()
                                    }, t.prototype.isRejected = function() {
                                        return this._target()._isRejected()
                                    }, t.prototype.isFulfilled = function() {
                                        return this._target()._isFulfilled()
                                    }, t.prototype.isResolved = function() {
                                        return this._target()._isResolved()
                                    }, t.prototype._value = function() {
                                        return this._settledValue
                                    }, t.prototype._reason = function() {
                                        return this._unsetRejectionIsUnhandled(), this._settledValue
                                    }, t.prototype.value = function() {
                                        var t = this._target();
                                        if (!t.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/hc1DLj\n");
                                        return t._settledValue
                                    }, t.prototype.reason = function() {
                                        var t = this._target();
                                        if (!t.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/hPuiwB\n");
                                        return t._unsetRejectionIsUnhandled(), t._settledValue
                                    }, t.PromiseInspection = e
                                }
                            }, {}],
                            35: [function(t, e, n) {
                                "use strict";
                                e.exports = function(s, l) {
                                    var u = t("./util.js"),
                                        c = u.errorObj,
                                        o = u.isObject;

                                    function a(t) {
                                        return t.then
                                    }
                                    var h = {}.hasOwnProperty;
                                    return function(t, e) {
                                        if (o(t)) {
                                            if (t instanceof s) return t;
                                            if (i = t, h.call(i, "_promise0")) {
                                                var n = new s(l);
                                                return t._then(n._fulfillUnchecked, n._rejectUncheckedCheckError, n._progressUnchecked, n, null), n
                                            }
                                            var r = u.tryCatch(a)(t);
                                            if (r === c) return e && e._pushContext(), n = s.reject(r.e), e && e._popContext(), n;
                                            if ("function" == typeof r) return function(t, e, n) {
                                                var r = new s(l),
                                                    i = r;
                                                n && n._pushContext(), r._captureStackTrace(), n && n._popContext();
                                                var o = !0,
                                                    a = u.tryCatch(e).call(t, function(t) {
                                                        r && (r._resolveCallback(t), r = null)
                                                    }, function(t) {
                                                        r && (r._rejectCallback(t, o, !0), r = null)
                                                    }, function(t) {
                                                        r && "function" == typeof r._progress && r._progress(t)
                                                    });
                                                return o = !1, r && a === c && (r._rejectCallback(a.e, !0, !0), r = null), i
                                            }(t, r, e)
                                        }
                                        var i;
                                        return t
                                    }
                                }
                            }, {
                                "./util.js": 38
                            }],
                            36: [function(t, e, n) {
                                "use strict";
                                e.exports = function(r, i) {
                                    var o = t("./util.js"),
                                        a = r.TimeoutError,
                                        s = function(t) {
                                            return e(+this).thenReturn(t)
                                        },
                                        e = r.delay = function(t, e) {
                                            if (void 0 === e) {
                                                e = t, t = void 0;
                                                var n = new r(i);
                                                return setTimeout(function() {
                                                    n._fulfill()
                                                }, e), n
                                            }
                                            return e = +e, r.resolve(t)._then(s, null, null, e, void 0)
                                        };

                                    function n(t) {
                                        var e = this;
                                        return e instanceof Number && (e = +e), clearTimeout(e), t
                                    }

                                    function l(t) {
                                        var e = this;
                                        throw e instanceof Number && (e = +e), clearTimeout(e), t
                                    }
                                    r.prototype.delay = function(t) {
                                        return e(this, t)
                                    }, r.prototype.timeout = function(t, r) {
                                        t = +t;
                                        var i = this.then().cancellable();
                                        i._cancellationParent = this;
                                        var e = setTimeout(function() {
                                            var t, e, n;
                                            e = r, (t = i).isPending() && (!o.isPrimitive(e) && e instanceof Error ? n = e : ("string" != typeof e && (e = "operation timed out"), n = new a(e)), o.markAsOriginatingFromRejection(n), t._attachExtraTrace(n), t._cancel(n))
                                        }, t);
                                        return i._then(n, l, void 0, e, void 0)
                                    }
                                }
                            }, {
                                "./util.js": 38
                            }],
                            37: [function(a, t, e) {
                                "use strict";
                                t.exports = function(c, h, d, e) {
                                    var n = a("./errors.js").TypeError,
                                        t = a("./util.js").inherits,
                                        r = c.PromiseInspection;

                                    function f(t) {
                                        for (var e = t.length, n = 0; n < e; ++n) {
                                            var r = t[n];
                                            if (r.isRejected()) return c.reject(r.error());
                                            t[n] = r._settledValue
                                        }
                                        return t
                                    }

                                    function u(t) {
                                        setTimeout(function() {
                                            throw t
                                        }, 0)
                                    }

                                    function i(i, o) {
                                        var a = 0,
                                            s = i.length,
                                            l = c.defer();
                                        return function t() {
                                            if (s <= a) return l.resolve();
                                            var e, n, r = (e = i[a++], (n = d(e)) !== e && "function" == typeof e._isDisposable && "function" == typeof e._getDisposer && e._isDisposable() && n._setDisposable(e._getDisposer()), n);
                                            if (r instanceof c && r._isDisposable()) {
                                                try {
                                                    r = d(r._getDisposer().tryDispose(o), i.promise)
                                                } catch (t) {
                                                    return u(t)
                                                }
                                                if (r instanceof c) return r._then(t, u, null, null, null)
                                            }
                                            t()
                                        }(), l.promise
                                    }

                                    function p(t) {
                                        var e = new r;
                                        return e._settledValue = t, e._bitField = 268435456, i(this, e).thenReturn(t)
                                    }

                                    function g(t) {
                                        var e = new r;
                                        return e._settledValue = t, e._bitField = 134217728, i(this, e).thenThrow(t)
                                    }

                                    function v(t, e, n) {
                                        this._data = t, this._promise = e, this._context = n
                                    }

                                    function o(t, e, n) {
                                        this.constructor$(t, e, n)
                                    }

                                    function m(t) {
                                        return v.isDisposer(t) ? (this.resources[this.index]._setDisposable(t), t.promise()) : t
                                    }
                                    v.prototype.data = function() {
                                        return this._data
                                    }, v.prototype.promise = function() {
                                        return this._promise
                                    }, v.prototype.resource = function() {
                                        return this.promise().isFulfilled() ? this.promise().value() : null
                                    }, v.prototype.tryDispose = function(t) {
                                        var e = this.resource(),
                                            n = this._context;
                                        void 0 !== n && n._pushContext();
                                        var r = null !== e ? this.doDispose(e, t) : null;
                                        return void 0 !== n && n._popContext(), this._promise._unsetDisposable(), this._data = null, r
                                    }, v.isDisposer = function(t) {
                                        return null != t && "function" == typeof t.resource && "function" == typeof t.tryDispose
                                    }, t(o, v), o.prototype.doDispose = function(t, e) {
                                        return this.data().call(t, t, e)
                                    }, c.using = function() {
                                        var t = arguments.length;
                                        if (t < 2) return h("you must pass at least 2 arguments to Promise.using");
                                        var e, n = arguments[t - 1];
                                        if ("function" != typeof n) return h("fn must be a function\n\n    See http://goo.gl/916lJJ\n");
                                        var r = !0;
                                        2 === t && Array.isArray(arguments[0]) ? (t = (e = arguments[0]).length, r = !1) : (e = arguments, t--);
                                        for (var i = new Array(t), o = 0; o < t; ++o) {
                                            var a = e[o];
                                            if (v.isDisposer(a)) {
                                                var s = a;
                                                (a = a.promise())._setDisposable(s)
                                            } else {
                                                var l = d(a);
                                                l instanceof c && (a = l._then(m, null, null, {
                                                    resources: i,
                                                    index: o
                                                }, void 0))
                                            }
                                            i[o] = a
                                        }
                                        var u = c.settle(i).then(f).then(function(t) {
                                            var e;
                                            u._pushContext();
                                            try {
                                                e = r ? n.apply(void 0, t) : n.call(void 0, t)
                                            } finally {
                                                u._popContext()
                                            }
                                            return e
                                        })._then(p, g, void 0, i, void 0);
                                        return i.promise = u
                                    }, c.prototype._setDisposable = function(t) {
                                        this._bitField = 262144 | this._bitField, this._disposer = t
                                    }, c.prototype._isDisposable = function() {
                                        return 0 < (262144 & this._bitField)
                                    }, c.prototype._getDisposer = function() {
                                        return this._disposer
                                    }, c.prototype._unsetDisposable = function() {
                                        this._bitField = -262145 & this._bitField, this._disposer = void 0
                                    }, c.prototype.disposer = function(t) {
                                        if ("function" == typeof t) return new o(t, this, e());
                                        throw new n
                                    }
                                }
                            }, {
                                "./errors.js": 13,
                                "./util.js": 38
                            }],
                            38: [function(t, e, n) {
                                "use strict";
                                var u = t("./es5.js"),
                                    r = "undefined" == typeof navigator,
                                    i = function() {
                                        try {
                                            var t = {};
                                            return u.defineProperty(t, "f", {
                                                get: function() {
                                                    return 3
                                                }
                                            }), 3 === t.f
                                        } catch (t) {
                                            return !1
                                        }
                                    }(),
                                    o = {
                                        e: {}
                                    },
                                    a;

                                function s() {
                                    try {
                                        var t = a;
                                        return a = null, t.apply(this, arguments)
                                    } catch (t) {
                                        return o.e = t, o
                                    }
                                }

                                function l(t) {
                                    return a = t, s
                                }
                                var c = function(e, n) {
                                    var r = {}.hasOwnProperty;

                                    function t() {
                                        for (var t in this.constructor = e, (this.constructor$ = n).prototype) r.call(n.prototype, t) && "$" !== t.charAt(t.length - 1) && (this[t + "$"] = n.prototype[t])
                                    }
                                    return t.prototype = n.prototype, e.prototype = new t, e.prototype
                                };

                                function h(t) {
                                    return null == t || !0 === t || !1 === t || "string" == typeof t || "number" == typeof t
                                }

                                function d(t) {
                                    return !h(t)
                                }

                                function f(t) {
                                    return h(t) ? new Error(C(t)) : t
                                }

                                function p(t, e) {
                                    var n, r = t.length,
                                        i = new Array(r + 1);
                                    for (n = 0; n < r; ++n) i[n] = t[n];
                                    return i[n] = e, i
                                }

                                function g(t, e, n) {
                                    if (!u.isES5) return {}.hasOwnProperty.call(t, e) ? t[e] : void 0;
                                    var r = Object.getOwnPropertyDescriptor(t, e);
                                    return null != r ? null == r.get && null == r.set ? r.value : n : void 0
                                }

                                function v(t, e, n) {
                                    if (h(t)) return t;
                                    var r = {
                                        value: n,
                                        configurable: !0,
                                        enumerable: !1,
                                        writable: !0
                                    };
                                    return u.defineProperty(t, e, r), t
                                }

                                function m(t) {
                                    throw t
                                }
                                var y = function() {
                                        var i = [Array.prototype, Object.prototype, Function.prototype],
                                            s = function(t) {
                                                for (var e = 0; e < i.length; ++e)
                                                    if (i[e] === t) return !0;
                                                return !1
                                            };
                                        if (u.isES5) {
                                            var l = Object.getOwnPropertyNames;
                                            return function(t) {
                                                for (var e = [], n = Object.create(null); null != t && !s(t);) {
                                                    var r;
                                                    try {
                                                        r = l(t)
                                                    } catch (t) {
                                                        return e
                                                    }
                                                    for (var i = 0; i < r.length; ++i) {
                                                        var o = r[i];
                                                        if (!n[o]) {
                                                            n[o] = !0;
                                                            var a = Object.getOwnPropertyDescriptor(t, o);
                                                            null != a && null == a.get && null == a.set && e.push(o)
                                                        }
                                                    }
                                                    t = u.getPrototypeOf(t)
                                                }
                                                return e
                                            }
                                        }
                                        var o = {}.hasOwnProperty;
                                        return function(t) {
                                            if (s(t)) return [];
                                            var e = [];
                                            t: for (var n in t)
                                                if (o.call(t, n)) e.push(n);
                                                else {
                                                    for (var r = 0; r < i.length; ++r)
                                                        if (o.call(i[r], n)) continue t;
                                                    e.push(n)
                                                }
                                            return e
                                        }
                                    }(),
                                    b = /this\s*\.\s*\S+\s*=/;

                                function _(t) {
                                    try {
                                        if ("function" == typeof t) {
                                            var e = u.names(t.prototype),
                                                n = u.isES5 && 1 < e.length,
                                                r = 0 < e.length && !(1 === e.length && "constructor" === e[0]),
                                                i = b.test(t + "") && 0 < u.names(t).length;
                                            if (n || r || i) return !0
                                        }
                                        return !1
                                    } catch (t) {
                                        return !1
                                    }
                                }

                                function w(t) {
                                    function e() {}
                                    e.prototype = t;
                                    for (var n = 8; n--;) new e;
                                    return t
                                }
                                var x = /^[a-z$_][a-z$_0-9]*$/i;

                                function k(t) {
                                    return x.test(t)
                                }

                                function S(t, e, n) {
                                    for (var r = new Array(t), i = 0; i < t; ++i) r[i] = e + i + n;
                                    return r
                                }

                                function C(t) {
                                    try {
                                        return t + ""
                                    } catch (t) {
                                        return "[no string representation]"
                                    }
                                }

                                function T(t) {
                                    try {
                                        v(t, "isOperational", !0)
                                    } catch (t) {}
                                }

                                function A(t) {
                                    return null != t && (t instanceof Error.__BluebirdErrorTypes__.OperationalError || !0 === t.isOperational)
                                }

                                function E(t) {
                                    return t instanceof Error && u.propertyIsWritable(t, "stack")
                                }
                                var j = "stack" in new Error ? function(t) {
                                    return E(t) ? t : new Error(C(t))
                                } : function(t) {
                                    if (E(t)) return t;
                                    try {
                                        throw new Error(C(t))
                                    } catch (t) {
                                        return t
                                    }
                                };

                                function P(t) {
                                    return {}.toString.call(t)
                                }

                                function M(t, e, n) {
                                    for (var r = u.names(t), i = 0; i < r.length; ++i) {
                                        var o = r[i];
                                        if (n(o)) try {
                                            u.defineProperty(e, o, u.getDescriptor(t, o))
                                        } catch (t) {}
                                    }
                                }
                                var I = {
                                        isClass: _,
                                        isIdentifier: k,
                                        inheritedDataKeys: y,
                                        getDataPropertyOrDefault: g,
                                        thrower: m,
                                        isArray: u.isArray,
                                        haveGetters: i,
                                        notEnumerableProp: v,
                                        isPrimitive: h,
                                        isObject: d,
                                        canEvaluate: r,
                                        errorObj: o,
                                        tryCatch: l,
                                        inherits: c,
                                        withAppended: p,
                                        maybeWrapAsError: f,
                                        toFastProperties: w,
                                        filledRange: S,
                                        toString: C,
                                        canAttachTrace: E,
                                        ensureErrorObject: j,
                                        originatesFromRejection: A,
                                        markAsOriginatingFromRejection: T,
                                        classString: P,
                                        copyDescriptors: M,
                                        hasDevTools: "undefined" != typeof chrome && chrome && "function" == typeof chrome.loadTimes,
                                        isNode: void 0 !== O && "[object process]" === P(O).toLowerCase()
                                    },
                                    R;
                                I.isRecentNode = I.isNode && (R = O.versions.node.split(".").map(Number), 0 === R[0] && 10 < R[1] || 0 < R[0]), I.isNode && I.toFastProperties(O);
                                try {
                                    throw new Error
                                } catch (t) {
                                    I.lastLineError = t
                                }
                                e.exports = I
                            }, {
                                "./es5.js": 14
                            }]
                        }, {}, [4])(4)
                    }), "undefined" != typeof window && null !== window ? window.P = window.Promise : "undefined" != typeof self && null !== self && (self.P = self.Promise)
                }).call(this, t("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                _process: 65
            }],
            52: [function(t, e, n) {
                var r, i;
                r = this, i = function() {
                    var u = XMLHttpRequest;
                    if (!u) throw new Error("missing XMLHttpRequest");
                    c.log = {
                        trace: d,
                        debug: d,
                        info: d,
                        warn: d,
                        error: d
                    };

                    function c(t, e) {
                        if ("function" != typeof e) throw new Error("Bad callback given: " + e);
                        if (!t) throw new Error("No options given");
                        var n = t.onResponse;
                        if ((t = "string" == typeof t ? {
                                uri: t
                            } : JSON.parse(JSON.stringify(t))).onResponse = n, t.verbose && (c.log = function() {
                                var t, e, n = {},
                                    r = ["trace", "debug", "info", "warn", "error"];
                                for (e = 0; e < r.length; e++) n[t = r[e]] = d, "undefined" != typeof console && console && console[t] && (n[t] = f(console, t));
                                return n
                            }()), t.url && (t.uri = t.url, delete t.url), !t.uri && "" !== t.uri) throw new Error("options.uri is a required argument");
                        if ("string" != typeof t.uri) throw new Error("options.uri must be a string");
                        for (var r = ["proxy", "_redirectsFollowed", "maxRedirects", "followRedirect"], i = 0; i < r.length; i++)
                            if (t[r[i]]) throw new Error("options." + r[i] + " is not supported");
                        if (t.callback = e, t.method = t.method || "GET", t.headers = t.headers || {}, t.body = t.body || null, t.timeout = t.timeout || c.DEFAULT_TIMEOUT, t.headers.host) throw new Error("Options.headers.host is not supported");
                        t.json && (t.headers.accept = t.headers.accept || "application/json", "GET" !== t.method && (t.headers["content-type"] = "application/json"), "boolean" != typeof t.json ? t.body = JSON.stringify(t.json) : "string" != typeof t.body && (t.body = JSON.stringify(t.body)));
                        var o = function(t) {
                            var e = [];
                            for (var n in t) t.hasOwnProperty(n) && e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
                            return e.join("&")
                        };
                        if (t.qs) {
                            var a = "string" == typeof t.qs ? t.qs : o(t.qs); - 1 !== t.uri.indexOf("?") ? t.uri = t.uri + "&" + a : t.uri = t.uri + "?" + a
                        }
                        if (t.form) {
                            if ("string" == typeof t.form) throw "form name unsupported";
                            if ("POST" === t.method) {
                                var s = (t.encoding || "application/x-www-form-urlencoded").toLowerCase();
                                switch (t.headers["content-type"] = s) {
                                    case "application/x-www-form-urlencoded":
                                        t.body = o(t.form).replace(/%20/g, "+");
                                        break;
                                    case "multipart/form-data":
                                        var l = function(t) {
                                            var e = {};
                                            e.boundry = "-------------------------------" + Math.floor(1e9 * Math.random());
                                            var n = [];
                                            for (var r in t) t.hasOwnProperty(r) && n.push("--" + e.boundry + '\nContent-Disposition: form-data; name="' + r + '"\n\n' + t[r] + "\n");
                                            return n.push("--" + e.boundry + "--"), e.body = n.join(""), e.length = e.body.length, e.type = "multipart/form-data; boundary=" + e.boundry, e
                                        }(t.form);
                                        t.body = l.body, t.headers["content-type"] = l.type;
                                        break;
                                    default:
                                        throw new Error("unsupported encoding:" + s)
                                }
                            }
                        }
                        return t.onResponse = t.onResponse || d, !0 === t.onResponse && (t.onResponse = e, t.callback = d), !t.headers.authorization && t.auth && (t.headers.authorization = "Basic " + function(t) {
                                var e, n, r, i, o, a, s, l, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                                    c = 0,
                                    h = 0,
                                    d = "",
                                    f = [];
                                if (!t) return t;
                                for (; e = t.charCodeAt(c++), n = t.charCodeAt(c++), r = t.charCodeAt(c++), i = (l = e << 16 | n << 8 | r) >> 18 & 63, o = l >> 12 & 63, a = l >> 6 & 63, s = 63 & l, f[h++] = u.charAt(i) + u.charAt(o) + u.charAt(a) + u.charAt(s), c < t.length;);
                                switch (d = f.join(""), t.length % 3) {
                                    case 1:
                                        d = d.slice(0, -2) + "==";
                                        break;
                                    case 2:
                                        d = d.slice(0, -1) + "="
                                }
                                return d
                            }(t.auth.username + ":" + t.auth.password)),
                            function(n) {
                                var r = new u,
                                    i = !1,
                                    e = function(t) {
                                        var e, n = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/;
                                        try {
                                            e = location.href
                                        } catch (t) {
                                            (e = document.createElement("a")).href = "", e = e.href
                                        }
                                        var r = n.exec(e.toLowerCase()) || [],
                                            i = n.exec(t.toLowerCase());
                                        return !(!i || i[1] == r[1] && i[2] == r[2] && (i[3] || ("http:" === i[1] ? 80 : 443)) == (r[3] || ("http:" === r[1] ? 80 : 443)))
                                    }(n.uri),
                                    t = "withCredentials" in r;
                                if (h += 1, r.seq_id = h, r.id = h + ": " + n.method + " " + n.uri, r._id = r.id, e && !t) {
                                    var o = new Error("Browser does not support cross-origin request: " + n.uri);
                                    return o.cors = "unsupported", n.callback(o, r)
                                }
                                r.timeoutTimer = setTimeout(function() {
                                    i = !0;
                                    var t = new Error("ETIMEDOUT");
                                    return t.code = "ETIMEDOUT", t.duration = n.timeout, c.log.error("Timeout", {
                                        id: r._id,
                                        milliseconds: n.timeout
                                    }), n.callback(t, r)
                                }, n.timeout);
                                var a = {
                                    response: !1,
                                    loading: !1,
                                    end: !1
                                };
                                r.onreadystatechange = function(t) {
                                    if (i) return c.log.debug("Ignoring timed out state change", {
                                        state: r.readyState,
                                        id: r.id
                                    });
                                    if (c.log.debug("State change", {
                                            state: r.readyState,
                                            id: r.id,
                                            timed_out: i
                                        }), r.readyState === u.OPENED)
                                        for (var e in c.log.debug("Request started", {
                                                id: r.id
                                            }), n.headers) r.setRequestHeader(e, n.headers[e]);
                                    else r.readyState === u.HEADERS_RECEIVED ? s() : r.readyState === u.LOADING ? (s(), l()) : r.readyState === u.DONE && (s(), l(), function() {
                                        if (!a.end) {
                                            if (a.end = !0, c.log.debug("Request done", {
                                                    id: r.id
                                                }), r.body = r.responseText, n.json) try {
                                                r.body = JSON.parse(r.responseText)
                                            } catch (t) {
                                                return n.callback(t, r)
                                            }
                                            n.callback(null, r, r.body)
                                        }
                                    }())
                                }, r.open(n.method, n.uri, !0), e && (r.withCredentials = !!n.withCredentials);
                                return r.send(n.body), r;

                                function s() {
                                    if (!a.response) {
                                        if (a.response = !0, c.log.debug("Got response", {
                                                id: r.id,
                                                status: r.status
                                            }), clearTimeout(r.timeoutTimer), r.statusCode = r.status, e && 0 == r.statusCode) {
                                            var t = new Error("CORS request rejected: " + n.uri);
                                            return t.cors = "rejected", a.loading = !0, a.end = !0, n.callback(t, r)
                                        }
                                        n.onResponse(null, r)
                                    }
                                }

                                function l() {
                                    a.loading || (a.loading = !0, c.log.debug("Response body loading", {
                                        id: r.id
                                    }))
                                }
                            }(t)
                    }
                    var h = 0;
                    c.withCredentials = !1, c.DEFAULT_TIMEOUT = 18e4, c.defaults = function(i, t) {
                        var e = function(r) {
                                return function(t, e) {
                                    for (var n in t = "string" == typeof t ? {
                                            uri: t
                                        } : JSON.parse(JSON.stringify(t)), i) void 0 === t[n] && (t[n] = i[n]);
                                    return r(t, e)
                                }
                            },
                            n = e(c);
                        return n.get = e(c.get), n.post = e(c.post), n.put = e(c.put), n.head = e(c.head), n
                    };

                    function d() {}

                    function f(n, r) {
                        return function(t, e) {
                            "object" == typeof e && (t += " " + JSON.stringify(e));
                            return n[r].call(n, t)
                        }
                    }
                    return ["get", "put", "post", "head"].forEach(function(t) {
                        var n = t.toUpperCase();
                        c[t.toLowerCase()] = function(t) {
                            "string" == typeof t ? t = {
                                method: n,
                                uri: t
                            } : (t = JSON.parse(JSON.stringify(t))).method = n;
                            var e = [t].concat(Array.prototype.slice.apply(arguments, [1]));
                            return c.apply(this, e)
                        }
                    }), c.couch = function(t, i) {
                        return "string" == typeof t && (t = {
                            uri: t
                        }), t.json = !0, t.body && (t.json = t.body), delete t.body, i = i || d, c(t, function(t, e, n) {
                            if (t) return i(t, e, n);
                            if ((e.statusCode < 200 || 299 < e.statusCode) && n.error) {
                                for (var r in t = new Error("CouchDB error: " + (n.error.reason || n.error.error)), n) t[r] = n[r];
                                return i(t, e, n)
                            }
                            return i(t, e, n)
                        })
                    }, c
                }, "function" == typeof L && L.amd ? L([], i) : "object" == typeof n ? e.exports = i() : r.returnExports = i()
            }, {}],
            53: [function(t, e, n) {}, {}],
            54: [function(t, e, n) {
                arguments[4][53][0].apply(n, arguments)
            }, {
                dup: 53
            }],
            55: [function(R, t, O) {
                (function(t) {
                    var r = R("base64-js"),
                        o = R("ieee754"),
                        a = R("is-array");
                    O.Buffer = s, O.SlowBuffer = function t(e, n) {
                        if (!(this instanceof t)) return new t(e, n);
                        var r = new s(e, n);
                        delete r.parent;
                        return r
                    }, O.INSPECT_MAX_BYTES = 50, s.poolSize = 8192;
                    var n = {};

                    function e() {
                        return s.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
                    }

                    function s(t) {
                        return this instanceof s ? (this.length = 0, this.parent = void 0, "number" == typeof t ? function(t, e) {
                            if (t = u(t, e < 0 ? 0 : 0 | c(e)), !s.TYPED_ARRAY_SUPPORT)
                                for (var n = 0; n < e; n++) t[n] = 0;
                            return t
                        }(this, t) : "string" == typeof t ? function(t, e, n) {
                            "string" == typeof n && "" !== n || (n = "utf8");
                            var r = 0 | i(e, n);
                            return (t = u(t, r)).write(e, n), t
                        }(this, t, 1 < arguments.length ? arguments[1] : "utf8") : function(t, e) {
                            if (s.isBuffer(e)) return n = t, r = e, i = 0 | c(r.length), n = u(n, i), r.copy(n, 0, 0, i), n;
                            var n, r, i;
                            if (a(e)) return function(t, e) {
                                var n = 0 | c(e.length);
                                t = u(t, n);
                                for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
                                return t
                            }(t, e);
                            if (null == e) throw new TypeError("must start with number, buffer, array or string");
                            if ("undefined" != typeof ArrayBuffer) {
                                if (e.buffer instanceof ArrayBuffer) return l(t, e);
                                if (e instanceof ArrayBuffer) return function(t, e) {
                                    s.TYPED_ARRAY_SUPPORT ? (e.byteLength, t = s._augment(new Uint8Array(e))) : t = l(t, new Uint8Array(e));
                                    return t
                                }(t, e)
                            }
                            return e.length ? function(t, e) {
                                var n = 0 | c(e.length);
                                t = u(t, n);
                                for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
                                return t
                            }(t, e) : function(t, e) {
                                var n, r = 0;
                                "Buffer" === e.type && a(e.data) && (n = e.data, r = 0 | c(n.length)), t = u(t, r);
                                for (var i = 0; i < r; i += 1) t[i] = 255 & n[i];
                                return t
                            }(t, e)
                        }(this, t)) : 1 < arguments.length ? new s(t, arguments[1]) : new s(t)
                    }

                    function l(t, e) {
                        var n = 0 | c(e.length);
                        t = u(t, n);
                        for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
                        return t
                    }

                    function u(t, e) {
                        return s.TYPED_ARRAY_SUPPORT ? (t = s._augment(new Uint8Array(e))).__proto__ = s.prototype : (t.length = e, t._isBuffer = !0), 0 !== e && e <= s.poolSize >>> 1 && (t.parent = n), t
                    }

                    function c(t) {
                        if (t >= e()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + e().toString(16) + " bytes");
                        return 0 | t
                    }

                    function i(t, e) {
                        "string" != typeof t && (t = "" + t);
                        var n = t.length;
                        if (0 === n) return 0;
                        for (var r = !1;;) switch (e) {
                            case "ascii":
                            case "binary":
                            case "raw":
                            case "raws":
                                return n;
                            case "utf8":
                            case "utf-8":
                                return P(t).length;
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return 2 * n;
                            case "hex":
                                return n >>> 1;
                            case "base64":
                                return M(t).length;
                            default:
                                if (r) return P(t).length;
                                e = ("" + e).toLowerCase(), r = !0
                        }
                    }

                    function v(t, e, n, r) {
                        n = Number(n) || 0;
                        var i = t.length - n;
                        r ? i < (r = Number(r)) && (r = i) : r = i;
                        var o = e.length;
                        if (o % 2 != 0) throw new Error("Invalid hex string");
                        o / 2 < r && (r = o / 2);
                        for (var a = 0; a < r; a++) {
                            var s = parseInt(e.substr(2 * a, 2), 16);
                            if (isNaN(s)) throw new Error("Invalid hex string");
                            t[n + a] = s
                        }
                        return a
                    }

                    function m(t, e, n, r) {
                        return I(function(t) {
                            for (var e = [], n = 0; n < t.length; n++) e.push(255 & t.charCodeAt(n));
                            return e
                        }(e), t, n, r)
                    }

                    function h(t, e, n) {
                        return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n))
                    }

                    function d(t, e, n) {
                        n = Math.min(t.length, n);
                        for (var r = [], i = e; i < n;) {
                            var o, a, s, l, u = t[i],
                                c = null,
                                h = 239 < u ? 4 : 223 < u ? 3 : 191 < u ? 2 : 1;
                            if (i + h <= n) switch (h) {
                                case 1:
                                    u < 128 && (c = u);
                                    break;
                                case 2:
                                    128 == (192 & (o = t[i + 1])) && 127 < (l = (31 & u) << 6 | 63 & o) && (c = l);
                                    break;
                                case 3:
                                    o = t[i + 1], a = t[i + 2], 128 == (192 & o) && 128 == (192 & a) && 2047 < (l = (15 & u) << 12 | (63 & o) << 6 | 63 & a) && (l < 55296 || 57343 < l) && (c = l);
                                    break;
                                case 4:
                                    o = t[i + 1], a = t[i + 2], s = t[i + 3], 128 == (192 & o) && 128 == (192 & a) && 128 == (192 & s) && 65535 < (l = (15 & u) << 18 | (63 & o) << 12 | (63 & a) << 6 | 63 & s) && l < 1114112 && (c = l)
                            }
                            null === c ? (c = 65533, h = 1) : 65535 < c && (c -= 65536, r.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), r.push(c), i += h
                        }
                        return function(t) {
                            var e = t.length;
                            if (e <= f) return String.fromCharCode.apply(String, t);
                            var n = "",
                                r = 0;
                            for (; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += f));
                            return n
                        }(r)
                    }(s.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
                        function t() {}
                        try {
                            var e = new Uint8Array(1);
                            return e.foo = function() {
                                return 42
                            }, e.constructor = t, 42 === e.foo() && e.constructor === t && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
                        } catch (t) {
                            return !1
                        }
                    }()) && (s.prototype.__proto__ = Uint8Array.prototype, s.__proto__ = Uint8Array), s.isBuffer = function(t) {
                        return !(null == t || !t._isBuffer)
                    }, s.compare = function(t, e) {
                        if (!s.isBuffer(t) || !s.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                        if (t === e) return 0;
                        for (var n = t.length, r = e.length, i = 0, o = Math.min(n, r); i < o && t[i] === e[i];) ++i;
                        return i !== o && (n = t[i], r = e[i]), n < r ? -1 : r < n ? 1 : 0
                    }, s.isEncoding = function(t) {
                        switch (String(t).toLowerCase()) {
                            case "hex":
                            case "utf8":
                            case "utf-8":
                            case "ascii":
                            case "binary":
                            case "base64":
                            case "raw":
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return !0;
                            default:
                                return !1
                        }
                    }, s.concat = function(t, e) {
                        if (!a(t)) throw new TypeError("list argument must be an Array of Buffers.");
                        if (0 === t.length) return new s(0);
                        var n;
                        if (void 0 === e)
                            for (n = e = 0; n < t.length; n++) e += t[n].length;
                        var r = new s(e),
                            i = 0;
                        for (n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.copy(r, i), i += o.length
                        }
                        return r
                    }, s.byteLength = i, s.prototype.length = void 0, s.prototype.parent = void 0, s.prototype.toString = function() {
                        var t = 0 | this.length;
                        return 0 === t ? "" : 0 === arguments.length ? d(this, 0, t) : function(t, e, n) {
                            var r = !1;
                            if (t || (t = "utf8"), (e |= 0) < 0 && (e = 0), (n = void 0 === n || n === 1 / 0 ? this.length : 0 | n) > this.length && (n = this.length), n <= e) return "";
                            for (;;) switch (t) {
                                case "hex":
                                    return y(this, e, n);
                                case "utf8":
                                case "utf-8":
                                    return d(this, e, n);
                                case "ascii":
                                    return p(this, e, n);
                                case "binary":
                                    return g(this, e, n);
                                case "base64":
                                    return h(this, e, n);
                                case "ucs2":
                                case "ucs-2":
                                case "utf16le":
                                case "utf-16le":
                                    return b(this, e, n);
                                default:
                                    if (r) throw new TypeError("Unknown encoding: " + t);
                                    t = (t + "").toLowerCase(), r = !0
                            }
                        }.apply(this, arguments)
                    }, s.prototype.equals = function(t) {
                        if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                        return this === t || 0 === s.compare(this, t)
                    }, s.prototype.inspect = function() {
                        var t = "",
                            e = O.INSPECT_MAX_BYTES;
                        return 0 < this.length && (t = this.toString("hex", 0, e).match(/.{2}/g).join(" "), this.length > e && (t += " ... ")), "<Buffer " + t + ">"
                    }, s.prototype.compare = function(t) {
                        if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                        return this === t ? 0 : s.compare(this, t)
                    }, s.prototype.indexOf = function(t, e) {
                        if (2147483647 < e ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e >>= 0, 0 === this.length) return -1;
                        if (e >= this.length) return -1;
                        if (e < 0 && (e = Math.max(this.length + e, 0)), "string" == typeof t) return 0 === t.length ? -1 : String.prototype.indexOf.call(this, t, e);
                        if (s.isBuffer(t)) return n(this, t, e);
                        if ("number" == typeof t) return s.TYPED_ARRAY_SUPPORT && "function" === Uint8Array.prototype.indexOf ? Uint8Array.prototype.indexOf.call(this, t, e) : n(this, [t], e);

                        function n(t, e, n) {
                            for (var r = -1, i = 0; n + i < t.length; i++)
                                if (t[n + i] === e[-1 === r ? 0 : i - r]) {
                                    if (-1 === r && (r = i), i - r + 1 === e.length) return n + r
                                } else r = -1;
                            return -1
                        }
                        throw new TypeError("val must be string, number or Buffer")
                    }, s.prototype.get = function(t) {
                        return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(t)
                    }, s.prototype.set = function(t, e) {
                        return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(t, e)
                    }, s.prototype.write = function(t, e, n, r) {
                        if (void 0 === e) r = "utf8", n = this.length, e = 0;
                        else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;
                        else if (isFinite(e)) e |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0);
                        else {
                            var i = r;
                            r = e, e = 0 | n, n = i
                        }
                        var o = this.length - e;
                        if ((void 0 === n || o < n) && (n = o), 0 < t.length && (n < 0 || e < 0) || e > this.length) throw new RangeError("attempt to write outside buffer bounds");
                        r || (r = "utf8");
                        for (var a, s, l, u, c, h, d, f, p, g = !1;;) switch (r) {
                            case "hex":
                                return v(this, t, e, n);
                            case "utf8":
                            case "utf-8":
                                return f = e, p = n, I(P(t, (d = this).length - f), d, f, p);
                            case "ascii":
                                return m(this, t, e, n);
                            case "binary":
                                return m(this, t, e, n);
                            case "base64":
                                return u = this, c = e, h = n, I(M(t), u, c, h);
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return s = e, l = n, I(function(t, e) {
                                    for (var n, r, i, o = [], a = 0; a < t.length && !((e -= 2) < 0); a++) n = t.charCodeAt(a), r = n >> 8, i = n % 256, o.push(i), o.push(r);
                                    return o
                                }(t, (a = this).length - s), a, s, l);
                            default:
                                if (g) throw new TypeError("Unknown encoding: " + r);
                                r = ("" + r).toLowerCase(), g = !0
                        }
                    }, s.prototype.toJSON = function() {
                        return {
                            type: "Buffer",
                            data: Array.prototype.slice.call(this._arr || this, 0)
                        }
                    };
                    var f = 4096;

                    function p(t, e, n) {
                        var r = "";
                        n = Math.min(t.length, n);
                        for (var i = e; i < n; i++) r += String.fromCharCode(127 & t[i]);
                        return r
                    }

                    function g(t, e, n) {
                        var r = "";
                        n = Math.min(t.length, n);
                        for (var i = e; i < n; i++) r += String.fromCharCode(t[i]);
                        return r
                    }

                    function y(t, e, n) {
                        var r = t.length;
                        (!e || e < 0) && (e = 0), (!n || n < 0 || r < n) && (n = r);
                        for (var i = "", o = e; o < n; o++) i += j(t[o]);
                        return i
                    }

                    function b(t, e, n) {
                        for (var r = t.slice(e, n), i = "", o = 0; o < r.length; o += 2) i += String.fromCharCode(r[o] + 256 * r[o + 1]);
                        return i
                    }

                    function _(t, e, n) {
                        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                        if (n < t + e) throw new RangeError("Trying to access beyond buffer length")
                    }

                    function w(t, e, n, r, i, o) {
                        if (!s.isBuffer(t)) throw new TypeError("buffer must be a Buffer instance");
                        if (i < e || e < o) throw new RangeError("value is out of bounds");
                        if (n + r > t.length) throw new RangeError("index out of range")
                    }

                    function x(t, e, n, r) {
                        e < 0 && (e = 65535 + e + 1);
                        for (var i = 0, o = Math.min(t.length - n, 2); i < o; i++) t[n + i] = (e & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
                    }

                    function k(t, e, n, r) {
                        e < 0 && (e = 4294967295 + e + 1);
                        for (var i = 0, o = Math.min(t.length - n, 4); i < o; i++) t[n + i] = e >>> 8 * (r ? i : 3 - i) & 255
                    }

                    function S(t, e, n, r, i, o) {
                        if (i < e || e < o) throw new RangeError("value is out of bounds");
                        if (n + r > t.length) throw new RangeError("index out of range");
                        if (n < 0) throw new RangeError("index out of range")
                    }

                    function C(t, e, n, r, i) {
                        return i || S(t, e, n, 4, 34028234663852886e22, -34028234663852886e22), o.write(t, e, n, r, 23, 4), n + 4
                    }

                    function T(t, e, n, r, i) {
                        return i || S(t, e, n, 8, 17976931348623157e292, -17976931348623157e292), o.write(t, e, n, r, 52, 8), n + 8
                    }
                    s.prototype.slice = function(t, e) {
                        var n, r = this.length;
                        if ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : r < t && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : r < e && (e = r), e < t && (e = t), s.TYPED_ARRAY_SUPPORT) n = s._augment(this.subarray(t, e));
                        else {
                            var i = e - t;
                            n = new s(i, void 0);
                            for (var o = 0; o < i; o++) n[o] = this[o + t]
                        }
                        return n.length && (n.parent = this.parent || this), n
                    }, s.prototype.readUIntLE = function(t, e, n) {
                        t |= 0, e |= 0, n || _(t, e, this.length);
                        for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
                        return r
                    }, s.prototype.readUIntBE = function(t, e, n) {
                        t |= 0, e |= 0, n || _(t, e, this.length);
                        for (var r = this[t + --e], i = 1; 0 < e && (i *= 256);) r += this[t + --e] * i;
                        return r
                    }, s.prototype.readUInt8 = function(t, e) {
                        return e || _(t, 1, this.length), this[t]
                    }, s.prototype.readUInt16LE = function(t, e) {
                        return e || _(t, 2, this.length), this[t] | this[t + 1] << 8
                    }, s.prototype.readUInt16BE = function(t, e) {
                        return e || _(t, 2, this.length), this[t] << 8 | this[t + 1]
                    }, s.prototype.readUInt32LE = function(t, e) {
                        return e || _(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                    }, s.prototype.readUInt32BE = function(t, e) {
                        return e || _(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                    }, s.prototype.readIntLE = function(t, e, n) {
                        t |= 0, e |= 0, n || _(t, e, this.length);
                        for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
                        return (i *= 128) <= r && (r -= Math.pow(2, 8 * e)), r
                    }, s.prototype.readIntBE = function(t, e, n) {
                        t |= 0, e |= 0, n || _(t, e, this.length);
                        for (var r = e, i = 1, o = this[t + --r]; 0 < r && (i *= 256);) o += this[t + --r] * i;
                        return (i *= 128) <= o && (o -= Math.pow(2, 8 * e)), o
                    }, s.prototype.readInt8 = function(t, e) {
                        return e || _(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                    }, s.prototype.readInt16LE = function(t, e) {
                        e || _(t, 2, this.length);
                        var n = this[t] | this[t + 1] << 8;
                        return 32768 & n ? 4294901760 | n : n
                    }, s.prototype.readInt16BE = function(t, e) {
                        e || _(t, 2, this.length);
                        var n = this[t + 1] | this[t] << 8;
                        return 32768 & n ? 4294901760 | n : n
                    }, s.prototype.readInt32LE = function(t, e) {
                        return e || _(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                    }, s.prototype.readInt32BE = function(t, e) {
                        return e || _(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                    }, s.prototype.readFloatLE = function(t, e) {
                        return e || _(t, 4, this.length), o.read(this, t, !0, 23, 4)
                    }, s.prototype.readFloatBE = function(t, e) {
                        return e || _(t, 4, this.length), o.read(this, t, !1, 23, 4)
                    }, s.prototype.readDoubleLE = function(t, e) {
                        return e || _(t, 8, this.length), o.read(this, t, !0, 52, 8)
                    }, s.prototype.readDoubleBE = function(t, e) {
                        return e || _(t, 8, this.length), o.read(this, t, !1, 52, 8)
                    }, s.prototype.writeUIntLE = function(t, e, n, r) {
                        t = +t, e |= 0, n |= 0, r || w(this, t, e, n, Math.pow(2, 8 * n), 0);
                        var i = 1,
                            o = 0;
                        for (this[e] = 255 & t; ++o < n && (i *= 256);) this[e + o] = t / i & 255;
                        return e + n
                    }, s.prototype.writeUIntBE = function(t, e, n, r) {
                        t = +t, e |= 0, n |= 0, r || w(this, t, e, n, Math.pow(2, 8 * n), 0);
                        var i = n - 1,
                            o = 1;
                        for (this[e + i] = 255 & t; 0 <= --i && (o *= 256);) this[e + i] = t / o & 255;
                        return e + n
                    }, s.prototype.writeUInt8 = function(t, e, n) {
                        return t = +t, e |= 0, n || w(this, t, e, 1, 255, 0), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
                    }, s.prototype.writeUInt16LE = function(t, e, n) {
                        return t = +t, e |= 0, n || w(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : x(this, t, e, !0), e + 2
                    }, s.prototype.writeUInt16BE = function(t, e, n) {
                        return t = +t, e |= 0, n || w(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : x(this, t, e, !1), e + 2
                    }, s.prototype.writeUInt32LE = function(t, e, n) {
                        return t = +t, e |= 0, n || w(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : k(this, t, e, !0), e + 4
                    }, s.prototype.writeUInt32BE = function(t, e, n) {
                        return t = +t, e |= 0, n || w(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : k(this, t, e, !1), e + 4
                    }, s.prototype.writeIntLE = function(t, e, n, r) {
                        if (t = +t, e |= 0, !r) {
                            var i = Math.pow(2, 8 * n - 1);
                            w(this, t, e, n, i - 1, -i)
                        }
                        var o = 0,
                            a = 1,
                            s = t < 0 ? 1 : 0;
                        for (this[e] = 255 & t; ++o < n && (a *= 256);) this[e + o] = (t / a >> 0) - s & 255;
                        return e + n
                    }, s.prototype.writeIntBE = function(t, e, n, r) {
                        if (t = +t, e |= 0, !r) {
                            var i = Math.pow(2, 8 * n - 1);
                            w(this, t, e, n, i - 1, -i)
                        }
                        var o = n - 1,
                            a = 1,
                            s = t < 0 ? 1 : 0;
                        for (this[e + o] = 255 & t; 0 <= --o && (a *= 256);) this[e + o] = (t / a >> 0) - s & 255;
                        return e + n
                    }, s.prototype.writeInt8 = function(t, e, n) {
                        return t = +t, e |= 0, n || w(this, t, e, 1, 127, -128), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
                    }, s.prototype.writeInt16LE = function(t, e, n) {
                        return t = +t, e |= 0, n || w(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : x(this, t, e, !0), e + 2
                    }, s.prototype.writeInt16BE = function(t, e, n) {
                        return t = +t, e |= 0, n || w(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : x(this, t, e, !1), e + 2
                    }, s.prototype.writeInt32LE = function(t, e, n) {
                        return t = +t, e |= 0, n || w(this, t, e, 4, 2147483647, -2147483648), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : k(this, t, e, !0), e + 4
                    }, s.prototype.writeInt32BE = function(t, e, n) {
                        return t = +t, e |= 0, n || w(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : k(this, t, e, !1), e + 4
                    }, s.prototype.writeFloatLE = function(t, e, n) {
                        return C(this, t, e, !0, n)
                    }, s.prototype.writeFloatBE = function(t, e, n) {
                        return C(this, t, e, !1, n)
                    }, s.prototype.writeDoubleLE = function(t, e, n) {
                        return T(this, t, e, !0, n)
                    }, s.prototype.writeDoubleBE = function(t, e, n) {
                        return T(this, t, e, !1, n)
                    }, s.prototype.copy = function(t, e, n, r) {
                        if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), 0 < r && r < n && (r = n), r === n) return 0;
                        if (0 === t.length || 0 === this.length) return 0;
                        if (e < 0) throw new RangeError("targetStart out of bounds");
                        if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
                        if (r < 0) throw new RangeError("sourceEnd out of bounds");
                        r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
                        var i, o = r - n;
                        if (this === t && n < e && e < r)
                            for (i = o - 1; 0 <= i; i--) t[i + e] = this[i + n];
                        else if (o < 1e3 || !s.TYPED_ARRAY_SUPPORT)
                            for (i = 0; i < o; i++) t[i + e] = this[i + n];
                        else t._set(this.subarray(n, n + o), e);
                        return o
                    }, s.prototype.fill = function(t, e, n) {
                        if (t || (t = 0), e || (e = 0), n || (n = this.length), n < e) throw new RangeError("end < start");
                        if (n !== e && 0 !== this.length) {
                            if (e < 0 || e >= this.length) throw new RangeError("start out of bounds");
                            if (n < 0 || n > this.length) throw new RangeError("end out of bounds");
                            var r;
                            if ("number" == typeof t)
                                for (r = e; r < n; r++) this[r] = t;
                            else {
                                var i = P(t.toString()),
                                    o = i.length;
                                for (r = e; r < n; r++) this[r] = i[r % o]
                            }
                            return this
                        }
                    }, s.prototype.toArrayBuffer = function() {
                        if ("undefined" != typeof Uint8Array) {
                            if (s.TYPED_ARRAY_SUPPORT) return new s(this).buffer;
                            for (var t = new Uint8Array(this.length), e = 0, n = t.length; e < n; e += 1) t[e] = this[e];
                            return t.buffer
                        }
                        throw new TypeError("Buffer.toArrayBuffer not supported in this browser")
                    };
                    var A = s.prototype;
                    s._augment = function(t) {
                        return t.constructor = s, t._isBuffer = !0, t._set = t.set, t.get = A.get, t.set = A.set, t.write = A.write, t.toString = A.toString, t.toLocaleString = A.toString, t.toJSON = A.toJSON, t.equals = A.equals, t.compare = A.compare, t.indexOf = A.indexOf, t.copy = A.copy, t.slice = A.slice, t.readUIntLE = A.readUIntLE, t.readUIntBE = A.readUIntBE, t.readUInt8 = A.readUInt8, t.readUInt16LE = A.readUInt16LE, t.readUInt16BE = A.readUInt16BE, t.readUInt32LE = A.readUInt32LE, t.readUInt32BE = A.readUInt32BE, t.readIntLE = A.readIntLE, t.readIntBE = A.readIntBE, t.readInt8 = A.readInt8, t.readInt16LE = A.readInt16LE, t.readInt16BE = A.readInt16BE, t.readInt32LE = A.readInt32LE, t.readInt32BE = A.readInt32BE, t.readFloatLE = A.readFloatLE, t.readFloatBE = A.readFloatBE, t.readDoubleLE = A.readDoubleLE, t.readDoubleBE = A.readDoubleBE, t.writeUInt8 = A.writeUInt8, t.writeUIntLE = A.writeUIntLE, t.writeUIntBE = A.writeUIntBE, t.writeUInt16LE = A.writeUInt16LE, t.writeUInt16BE = A.writeUInt16BE, t.writeUInt32LE = A.writeUInt32LE, t.writeUInt32BE = A.writeUInt32BE, t.writeIntLE = A.writeIntLE, t.writeIntBE = A.writeIntBE, t.writeInt8 = A.writeInt8, t.writeInt16LE = A.writeInt16LE, t.writeInt16BE = A.writeInt16BE, t.writeInt32LE = A.writeInt32LE, t.writeInt32BE = A.writeInt32BE, t.writeFloatLE = A.writeFloatLE, t.writeFloatBE = A.writeFloatBE, t.writeDoubleLE = A.writeDoubleLE, t.writeDoubleBE = A.writeDoubleBE, t.fill = A.fill, t.inspect = A.inspect, t.toArrayBuffer = A.toArrayBuffer, t
                    };
                    var E = /[^+\/0-9A-Za-z-_]/g;

                    function j(t) {
                        return t < 16 ? "0" + t.toString(16) : t.toString(16)
                    }

                    function P(t, e) {
                        var n;
                        e = e || 1 / 0;
                        for (var r = t.length, i = null, o = [], a = 0; a < r; a++) {
                            if (55295 < (n = t.charCodeAt(a)) && n < 57344) {
                                if (!i) {
                                    if (56319 < n) {
                                        -1 < (e -= 3) && o.push(239, 191, 189);
                                        continue
                                    }
                                    if (a + 1 === r) {
                                        -1 < (e -= 3) && o.push(239, 191, 189);
                                        continue
                                    }
                                    i = n;
                                    continue
                                }
                                if (n < 56320) {
                                    -1 < (e -= 3) && o.push(239, 191, 189), i = n;
                                    continue
                                }
                                n = 65536 + (i - 55296 << 10 | n - 56320)
                            } else i && -1 < (e -= 3) && o.push(239, 191, 189);
                            if (i = null, n < 128) {
                                if ((e -= 1) < 0) break;
                                o.push(n)
                            } else if (n < 2048) {
                                if ((e -= 2) < 0) break;
                                o.push(n >> 6 | 192, 63 & n | 128)
                            } else if (n < 65536) {
                                if ((e -= 3) < 0) break;
                                o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                            } else {
                                if (!(n < 1114112)) throw new Error("Invalid code point");
                                if ((e -= 4) < 0) break;
                                o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                            }
                        }
                        return o
                    }

                    function M(t) {
                        return r.toByteArray(function(t) {
                            var e;
                            if ((t = (e = t, e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")).replace(E, "")).length < 2) return "";
                            for (; t.length % 4 != 0;) t += "=";
                            return t
                        }(t))
                    }

                    function I(t, e, n, r) {
                        for (var i = 0; i < r && !(i + n >= e.length || i >= t.length); i++) e[i + n] = t[i];
                        return i
                    }
                }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                "base64-js": 50,
                ieee754: 58,
                "is-array": 60
            }],
            56: [function(t, e, n) {
                (function(t) {
                    function e(t) {
                        return Object.prototype.toString.call(t)
                    }
                    n.isArray = function(t) {
                        return Array.isArray ? Array.isArray(t) : "[object Array]" === e(t)
                    }, n.isBoolean = function(t) {
                        return "boolean" == typeof t
                    }, n.isNull = function(t) {
                        return null === t
                    }, n.isNullOrUndefined = function(t) {
                        return null == t
                    }, n.isNumber = function(t) {
                        return "number" == typeof t
                    }, n.isString = function(t) {
                        return "string" == typeof t
                    }, n.isSymbol = function(t) {
                        return "symbol" == typeof t
                    }, n.isUndefined = function(t) {
                        return void 0 === t
                    }, n.isRegExp = function(t) {
                        return "[object RegExp]" === e(t)
                    }, n.isObject = function(t) {
                        return "object" == typeof t && null !== t
                    }, n.isDate = function(t) {
                        return "[object Date]" === e(t)
                    }, n.isError = function(t) {
                        return "[object Error]" === e(t) || t instanceof Error
                    }, n.isFunction = function(t) {
                        return "function" == typeof t
                    }, n.isPrimitive = function(t) {
                        return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t
                    }, n.isBuffer = t.isBuffer
                }).call(this, {
                    isBuffer: t("../../is-buffer/index.js")
                })
            }, {
                "../../is-buffer/index.js": 61
            }],
            57: [function(t, e, n) {
                function r() {
                    this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
                }

                function s(t) {
                    return "function" == typeof t
                }

                function l(t) {
                    return "object" == typeof t && null !== t
                }

                function u(t) {
                    return void 0 === t
                }((e.exports = r).EventEmitter = r).prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function(t) {
                    if ("number" != typeof t || t < 0 || isNaN(t)) throw TypeError("n must be a positive number");
                    return this._maxListeners = t, this
                }, r.prototype.emit = function(t) {
                    var e, n, r, i, o, a;
                    if (this._events || (this._events = {}), "error" === t && (!this._events.error || l(this._events.error) && !this._events.error.length)) {
                        if ((e = arguments[1]) instanceof Error) throw e;
                        throw TypeError('Uncaught, unspecified "error" event.')
                    }
                    if (u(n = this._events[t])) return !1;
                    if (s(n)) switch (arguments.length) {
                        case 1:
                            n.call(this);
                            break;
                        case 2:
                            n.call(this, arguments[1]);
                            break;
                        case 3:
                            n.call(this, arguments[1], arguments[2]);
                            break;
                        default:
                            for (r = arguments.length, i = new Array(r - 1), o = 1; o < r; o++) i[o - 1] = arguments[o];
                            n.apply(this, i)
                    } else if (l(n)) {
                        for (r = arguments.length, i = new Array(r - 1), o = 1; o < r; o++) i[o - 1] = arguments[o];
                        for (r = (a = n.slice()).length, o = 0; o < r; o++) a[o].apply(this, i)
                    }
                    return !0
                }, r.prototype.on = r.prototype.addListener = function(t, e) {
                    var n;
                    if (!s(e)) throw TypeError("listener must be a function");
                    (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, s(e.listener) ? e.listener : e), this._events[t] ? l(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, l(this._events[t]) && !this._events[t].warned) && ((n = u(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners) && 0 < n && this._events[t].length > n && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace()));
                    return this
                }, r.prototype.once = function(t, e) {
                    if (!s(e)) throw TypeError("listener must be a function");
                    var n = !1;

                    function r() {
                        this.removeListener(t, r), n || (n = !0, e.apply(this, arguments))
                    }
                    return r.listener = e, this.on(t, r), this
                }, r.prototype.removeListener = function(t, e) {
                    var n, r, i, o;
                    if (!s(e)) throw TypeError("listener must be a function");
                    if (!this._events || !this._events[t]) return this;
                    if (i = (n = this._events[t]).length, r = -1, n === e || s(n.listener) && n.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);
                    else if (l(n)) {
                        for (o = i; 0 < o--;)
                            if (n[o] === e || n[o].listener && n[o].listener === e) {
                                r = o;
                                break
                            }
                        if (r < 0) return this;
                        1 === n.length ? (n.length = 0, delete this._events[t]) : n.splice(r, 1), this._events.removeListener && this.emit("removeListener", t, e)
                    }
                    return this
                }, r.prototype.removeAllListeners = function(t) {
                    var e, n;
                    if (!this._events) return this;
                    if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
                    if (0 === arguments.length) {
                        for (e in this._events) "removeListener" !== e && this.removeAllListeners(e);
                        return this.removeAllListeners("removeListener"), this._events = {}, this
                    }
                    if (s(n = this._events[t])) this.removeListener(t, n);
                    else
                        for (; n.length;) this.removeListener(t, n[n.length - 1]);
                    return delete this._events[t], this
                }, r.prototype.listeners = function(t) {
                    return this._events && this._events[t] ? s(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
                }, r.listenerCount = function(t, e) {
                    return t._events && t._events[e] ? s(t._events[e]) ? 1 : t._events[e].length : 0
                }
            }, {}],
            58: [function(t, e, n) {
                n.read = function(t, e, n, r, i) {
                    var o, a, s = 8 * i - r - 1,
                        l = (1 << s) - 1,
                        u = l >> 1,
                        c = -7,
                        h = n ? i - 1 : 0,
                        d = n ? -1 : 1,
                        f = t[e + h];
                    for (h += d, o = f & (1 << -c) - 1, f >>= -c, c += s; 0 < c; o = 256 * o + t[e + h], h += d, c -= 8);
                    for (a = o & (1 << -c) - 1, o >>= -c, c += r; 0 < c; a = 256 * a + t[e + h], h += d, c -= 8);
                    if (0 === o) o = 1 - u;
                    else {
                        if (o === l) return a ? NaN : 1 / 0 * (f ? -1 : 1);
                        a += Math.pow(2, r), o -= u
                    }
                    return (f ? -1 : 1) * a * Math.pow(2, o - r)
                }, n.write = function(t, e, n, r, i, o) {
                    var a, s, l, u = 8 * o - i - 1,
                        c = (1 << u) - 1,
                        h = c >> 1,
                        d = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                        f = r ? 0 : o - 1,
                        p = r ? 1 : -1,
                        g = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, a = c) : (a = Math.floor(Math.log(e) / Math.LN2), e * (l = Math.pow(2, -a)) < 1 && (a--, l *= 2), 2 <= (e += 1 <= a + h ? d / l : d * Math.pow(2, 1 - h)) * l && (a++, l /= 2), c <= a + h ? (s = 0, a = c) : 1 <= a + h ? (s = (e * l - 1) * Math.pow(2, i), a += h) : (s = e * Math.pow(2, h - 1) * Math.pow(2, i), a = 0)); 8 <= i; t[n + f] = 255 & s, f += p, s /= 256, i -= 8);
                    for (a = a << i | s, u += i; 0 < u; t[n + f] = 255 & a, f += p, a /= 256, u -= 8);
                    t[n + f - p] |= 128 * g
                }
            }, {}],
            59: [function(t, e, n) {
                "function" == typeof Object.create ? e.exports = function(t, e) {
                    t.super_ = e, t.prototype = Object.create(e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    })
                } : e.exports = function(t, e) {
                    t.super_ = e;
                    var n = function() {};
                    n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
                }
            }, {}],
            60: [function(t, e, n) {
                var r = Array.isArray,
                    i = Object.prototype.toString;
                e.exports = r || function(t) {
                    return !!t && "[object Array]" == i.call(t)
                }
            }, {}],
            61: [function(t, e, n) {
                e.exports = function(t) {
                    return !(null == t || !(t._isBuffer || t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)))
                }
            }, {}],
            62: [function(t, e, n) {
                e.exports = Array.isArray || function(t) {
                    return "[object Array]" == Object.prototype.toString.call(t)
                }
            }, {}],
            63: [function(t, b, _) {
                (function(y) {
                    (function() {
                        var pi, t, e, gi = "3.10.1",
                            vi = 1,
                            mi = 2,
                            yi = 4,
                            bi = 8,
                            _i = 16,
                            wi = 32,
                            xi = 64,
                            ki = 128,
                            Si = 256,
                            Ci = 30,
                            Ti = "...",
                            Ai = 150,
                            Ei = 16,
                            ji = 200,
                            Pi = 1,
                            Mi = 2,
                            Ii = "Expected a function",
                            Ri = "__lodash_placeholder__",
                            Oi = "[object Arguments]",
                            Li = "[object Array]",
                            Di = "[object Boolean]",
                            Fi = "[object Date]",
                            Bi = "[object Error]",
                            zi = "[object Function]",
                            n = "[object Map]",
                            $i = "[object Number]",
                            Ni = "[object Object]",
                            Ui = "[object RegExp]",
                            r = "[object Set]",
                            Vi = "[object String]",
                            i = "[object WeakMap]",
                            Wi = "[object ArrayBuffer]",
                            Hi = "[object Float32Array]",
                            qi = "[object Float64Array]",
                            Yi = "[object Int8Array]",
                            Gi = "[object Int16Array]",
                            Xi = "[object Int32Array]",
                            Ji = "[object Uint8Array]",
                            Qi = "[object Uint8ClampedArray]",
                            Ki = "[object Uint16Array]",
                            Zi = "[object Uint32Array]",
                            to = /\b__p \+= '';/g,
                            eo = /\b(__p \+=) '' \+/g,
                            no = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
                            ro = /&(?:amp|lt|gt|quot|#39|#96);/g,
                            io = /[&<>"'`]/g,
                            oo = RegExp(ro.source),
                            ao = RegExp(io.source),
                            so = /<%-([\s\S]+?)%>/g,
                            lo = /<%([\s\S]+?)%>/g,
                            uo = /<%=([\s\S]+?)%>/g,
                            co = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
                            ho = /^\w*$/,
                            fo = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,
                            po = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
                            go = RegExp(po.source),
                            vo = /[\u0300-\u036f\ufe20-\ufe23]/g,
                            mo = /\\(\\)?/g,
                            yo = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
                            bo = /\w*$/,
                            _o = /^0[xX]/,
                            wo = /^\[object .+?Constructor\]$/,
                            xo = /^\d+$/,
                            ko = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,
                            So = /($^)/,
                            Co = /['\n\r\u2028\u2029\\]/g,
                            To = (t = "[A-Z\\xc0-\\xd6\\xd8-\\xde]", e = "[a-z\\xdf-\\xf6\\xf8-\\xff]+", RegExp(t + "+(?=" + t + e + ")|" + t + "?" + e + "|" + t + "+|[0-9]+", "g")),
                            Ao = ["Array", "ArrayBuffer", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Math", "Number", "Object", "RegExp", "Set", "String", "_", "clearTimeout", "isFinite", "parseFloat", "parseInt", "setTimeout", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap"],
                            Eo = -1,
                            jo = {};
                        jo[Hi] = jo[qi] = jo[Yi] = jo[Gi] = jo[Xi] = jo[Ji] = jo[Qi] = jo[Ki] = jo[Zi] = !0, jo[Oi] = jo[Li] = jo[Wi] = jo[Di] = jo[Fi] = jo[Bi] = jo[zi] = jo[n] = jo[$i] = jo[Ni] = jo[Ui] = jo[r] = jo[Vi] = jo[i] = !1;
                        var Po = {};
                        Po[Oi] = Po[Li] = Po[Wi] = Po[Di] = Po[Fi] = Po[Hi] = Po[qi] = Po[Yi] = Po[Gi] = Po[Xi] = Po[$i] = Po[Ni] = Po[Ui] = Po[Vi] = Po[Ji] = Po[Qi] = Po[Ki] = Po[Zi] = !0, Po[Bi] = Po[zi] = Po[n] = Po[r] = Po[i] = !1;
                        var o = {
                                "Ã€": "A",
                                "Ã": "A",
                                "Ã‚": "A",
                                "Ãƒ": "A",
                                "Ã„": "A",
                                "Ã…": "A",
                                "Ã ": "a",
                                "Ã¡": "a",
                                "Ã¢": "a",
                                "Ã£": "a",
                                "Ã¤": "a",
                                "Ã¥": "a",
                                "Ã‡": "C",
                                "Ã§": "c",
                                "Ã": "D",
                                "Ã°": "d",
                                "Ãˆ": "E",
                                "Ã‰": "E",
                                "ÃŠ": "E",
                                "Ã‹": "E",
                                "Ã¨": "e",
                                "Ã©": "e",
                                "Ãª": "e",
                                "Ã«": "e",
                                "ÃŒ": "I",
                                "Ã": "I",
                                "ÃŽ": "I",
                                "Ã": "I",
                                "Ã¬": "i",
                                "Ã­": "i",
                                "Ã®": "i",
                                "Ã¯": "i",
                                "Ã‘": "N",
                                "Ã±": "n",
                                "Ã’": "O",
                                "Ã“": "O",
                                "Ã”": "O",
                                "Ã•": "O",
                                "Ã–": "O",
                                "Ã˜": "O",
                                "Ã²": "o",
                                "Ã³": "o",
                                "Ã´": "o",
                                "Ãµ": "o",
                                "Ã¶": "o",
                                "Ã¸": "o",
                                "Ã™": "U",
                                "Ãš": "U",
                                "Ã›": "U",
                                "Ãœ": "U",
                                "Ã¹": "u",
                                "Ãº": "u",
                                "Ã»": "u",
                                "Ã¼": "u",
                                "Ã": "Y",
                                "Ã½": "y",
                                "Ã¿": "y",
                                "Ã†": "Ae",
                                "Ã¦": "ae",
                                "Ãž": "Th",
                                "Ã¾": "th",
                                "ÃŸ": "ss"
                            },
                            a = {
                                "&": "&amp;",
                                "<": "&lt;",
                                ">": "&gt;",
                                '"': "&quot;",
                                "'": "&#39;",
                                "`": "&#96;"
                            },
                            s = {
                                "&amp;": "&",
                                "&lt;": "<",
                                "&gt;": ">",
                                "&quot;": '"',
                                "&#39;": "'",
                                "&#96;": "`"
                            },
                            l = {
                                function: !0,
                                object: !0
                            },
                            u = {
                                0: "x30",
                                1: "x31",
                                2: "x32",
                                3: "x33",
                                4: "x34",
                                5: "x35",
                                6: "x36",
                                7: "x37",
                                8: "x38",
                                9: "x39",
                                A: "x41",
                                B: "x42",
                                C: "x43",
                                D: "x44",
                                E: "x45",
                                F: "x46",
                                a: "x61",
                                b: "x62",
                                c: "x63",
                                d: "x64",
                                e: "x65",
                                f: "x66",
                                n: "x6e",
                                r: "x72",
                                t: "x74",
                                u: "x75",
                                v: "x76",
                                x: "x78"
                            },
                            c = {
                                "\\": "\\",
                                "'": "'",
                                "\n": "n",
                                "\r": "r",
                                "\u2028": "u2028",
                                "\u2029": "u2029"
                            },
                            h = l[typeof _] && _ && !_.nodeType && _,
                            d = l[typeof b] && b && !b.nodeType && b,
                            f = h && d && "object" == typeof y && y && y.Object && y,
                            p = l[typeof self] && self && self.Object && self,
                            g = l[typeof window] && window && window.Object && window,
                            v = d && d.exports === h && h,
                            Mo = f || g !== (this && this.window) && g || p || this;

                        function Io(t, e) {
                            if (t !== e) {
                                var n = null === t,
                                    r = t === pi,
                                    i = t == t,
                                    o = null === e,
                                    a = e === pi,
                                    s = e == e;
                                if (e < t && !o || !i || n && !a && s || r && s) return 1;
                                if (t < e && !n || !s || o && !r && i || a && i) return -1
                            }
                            return 0
                        }

                        function Ro(t, e, n) {
                            for (var r = t.length, i = n ? r : -1; n ? i-- : ++i < r;)
                                if (e(t[i], i, t)) return i;
                            return -1
                        }

                        function Oo(t, e, n) {
                            if (e != e) return Wo(t, n);
                            for (var r = n - 1, i = t.length; ++r < i;)
                                if (t[r] === e) return r;
                            return -1
                        }

                        function Lo(t) {
                            return "function" == typeof t || !1
                        }

                        function Do(t) {
                            return null == t ? "" : t + ""
                        }

                        function Fo(t, e) {
                            for (var n = -1, r = t.length; ++n < r && -1 < e.indexOf(t.charAt(n)););
                            return n
                        }

                        function Bo(t, e) {
                            for (var n = t.length; n-- && -1 < e.indexOf(t.charAt(n)););
                            return n
                        }

                        function zo(t, e) {
                            return Io(t.criteria, e.criteria) || t.index - e.index
                        }

                        function $o(t) {
                            return o[t]
                        }

                        function No(t) {
                            return a[t]
                        }

                        function Uo(t, e, n) {
                            return e ? t = u[t] : n && (t = c[t]), "\\" + t
                        }

                        function Vo(t) {
                            return "\\" + c[t]
                        }

                        function Wo(t, e, n) {
                            for (var r = t.length, i = e + (n ? 0 : -1); n ? i-- : ++i < r;) {
                                var o = t[i];
                                if (o != o) return i
                            }
                            return -1
                        }

                        function Ho(t) {
                            return !!t && "object" == typeof t
                        }

                        function m(t) {
                            return t <= 160 && 9 <= t && t <= 13 || 32 == t || 160 == t || 5760 == t || 6158 == t || 8192 <= t && (t <= 8202 || 8232 == t || 8233 == t || 8239 == t || 8287 == t || 12288 == t || 65279 == t)
                        }

                        function qo(t, e) {
                            for (var n = -1, r = t.length, i = -1, o = []; ++n < r;) t[n] === e && (t[n] = Ri, o[++i] = n);
                            return o
                        }

                        function Yo(t) {
                            for (var e = -1, n = t.length; ++e < n && m(t.charCodeAt(e)););
                            return e
                        }

                        function Go(t) {
                            for (var e = t.length; e-- && m(t.charCodeAt(e)););
                            return e
                        }

                        function Xo(t) {
                            return s[t]
                        }
                        var Jo = function t(e) {
                            var j = (e = e ? Jo.defaults(Mo.Object(), e, Jo.pick(Mo, Ao)) : Mo).Array,
                                n = e.Date,
                                r = e.Error,
                                v = e.Function,
                                i = e.Math,
                                o = e.Number,
                                m = e.Object,
                                y = e.RegExp,
                                a = e.String,
                                b = e.TypeError,
                                s = j.prototype,
                                l = m.prototype,
                                u = a.prototype,
                                c = v.prototype.toString,
                                _ = l.hasOwnProperty,
                                h = 0,
                                w = l.toString,
                                d = Mo._,
                                f = y("^" + c.call(_).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                                p = e.ArrayBuffer,
                                x = e.clearTimeout,
                                g = e.parseFloat,
                                k = i.pow,
                                S = l.propertyIsEnumerable,
                                C = Le(e, "Set"),
                                T = e.setTimeout,
                                A = s.splice,
                                E = e.Uint8Array,
                                P = Le(e, "WeakMap"),
                                M = i.ceil,
                                I = Le(m, "create"),
                                R = i.floor,
                                O = Le(j, "isArray"),
                                L = e.isFinite,
                                D = Le(m, "keys"),
                                F = i.max,
                                B = i.min,
                                z = Le(n, "now"),
                                $ = e.parseInt,
                                N = i.random,
                                U = o.NEGATIVE_INFINITY,
                                V = o.POSITIVE_INFINITY,
                                W = 4294967295,
                                H = W - 1,
                                q = W >>> 1,
                                Y = 9007199254740991,
                                G = P && new P,
                                X = {};

                            function J(t) {
                                if (Ho(t) && !cr(t) && !(t instanceof Z)) {
                                    if (t instanceof K) return t;
                                    if (_.call(t, "__chain__") && _.call(t, "__wrapped__")) return Ze(t)
                                }
                                return new K(t)
                            }

                            function Q() {}

                            function K(t, e, n) {
                                this.__wrapped__ = t, this.__actions__ = n || [], this.__chain__ = !!e
                            }
                            J.support = {};

                            function Z(t) {
                                this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = V, this.__views__ = []
                            }

                            function tt() {
                                this.__data__ = {}
                            }

                            function et(t) {
                                var e = t ? t.length : 0;
                                for (this.data = {
                                        hash: I(null),
                                        set: new C
                                    }; e--;) this.push(t[e])
                            }

                            function nt(t, e) {
                                var n = t.data;
                                return ("string" == typeof e || pr(e) ? n.set.has(e) : n.hash[e]) ? 0 : -1
                            }

                            function rt(t, e) {
                                var n = -1,
                                    r = t.length;
                                for (e || (e = j(r)); ++n < r;) e[n] = t[n];
                                return e
                            }

                            function it(t, e) {
                                for (var n = -1, r = t.length; ++n < r && !1 !== e(t[n], n, t););
                                return t
                            }

                            function ot(t, e) {
                                for (var n = -1, r = t.length; ++n < r;)
                                    if (!e(t[n], n, t)) return !1;
                                return !0
                            }

                            function at(t, e) {
                                for (var n = -1, r = t.length, i = -1, o = []; ++n < r;) {
                                    var a = t[n];
                                    e(a, n, t) && (o[++i] = a)
                                }
                                return o
                            }

                            function st(t, e) {
                                for (var n = -1, r = t.length, i = j(r); ++n < r;) i[n] = e(t[n], n, t);
                                return i
                            }

                            function lt(t, e) {
                                for (var n = -1, r = e.length, i = t.length; ++n < r;) t[i + n] = e[n];
                                return t
                            }

                            function ut(t, e, n, r) {
                                var i = -1,
                                    o = t.length;
                                for (r && o && (n = t[++i]); ++i < o;) n = e(n, t[i], i, t);
                                return n
                            }

                            function ct(t, e) {
                                for (var n = -1, r = t.length; ++n < r;)
                                    if (e(t[n], n, t)) return !0;
                                return !1
                            }

                            function ht(t, e, n, r) {
                                return t !== pi && _.call(r, n) ? t : e
                            }

                            function dt(t, e, n) {
                                for (var r = -1, i = Lr(e), o = i.length; ++r < o;) {
                                    var a = i[r],
                                        s = t[a],
                                        l = n(s, e[a], a, t, e);
                                    (l == l ? l === s : s != s) && (s !== pi || a in t) || (t[a] = l)
                                }
                                return t
                            }

                            function ft(t, e) {
                                return null == e ? t : gt(e, Lr(e), t)
                            }

                            function pt(t, e) {
                                for (var n = -1, r = null == t, i = !r && Fe(t), o = i ? t.length : 0, a = e.length, s = j(a); ++n < a;) {
                                    var l = e[n];
                                    s[n] = i ? Be(l, o) ? t[l] : pi : r ? pi : t[l]
                                }
                                return s
                            }

                            function gt(t, e, n) {
                                n || (n = {});
                                for (var r = -1, i = e.length; ++r < i;) {
                                    var o = e[r];
                                    n[o] = t[o]
                                }
                                return n
                            }

                            function vt(t, e, n) {
                                var r = typeof t;
                                return "function" == r ? e === pi ? t : Zt(t, e, n) : null == t ? ei : "object" == r ? Ft(t) : e === pi ? si(t) : Bt(t, e)
                            }

                            function mt(n, r, i, t, e, o, a) {
                                var s;
                                if (i && (s = e ? i(n, t, e) : i(n)), s !== pi) return s;
                                if (!pr(n)) return n;
                                var l, u, c, h, d = cr(n);
                                if (d) {
                                    if (c = (u = n).length, h = new u.constructor(c), c && "string" == typeof u[0] && _.call(u, "index") && (h.index = u.index, h.input = u.input), s = h, !r) return rt(n, s)
                                } else {
                                    var f = w.call(n),
                                        p = f == zi;
                                    if (f != Ni && f != Oi && (!p || e)) return Po[f] ? function(t, e, n) {
                                        var r = t.constructor;
                                        switch (e) {
                                            case Wi:
                                                return te(t);
                                            case Di:
                                            case Fi:
                                                return new r(+t);
                                            case Hi:
                                            case qi:
                                            case Yi:
                                            case Gi:
                                            case Xi:
                                            case Ji:
                                            case Qi:
                                            case Ki:
                                            case Zi:
                                                var i = t.buffer;
                                                return new r(n ? te(i) : i, t.byteOffset, t.length);
                                            case $i:
                                            case Vi:
                                                return new r(t);
                                            case Ui:
                                                var o = new r(t.source, bo.exec(t));
                                                o.lastIndex = t.lastIndex
                                        }
                                        return o
                                    }(n, f, r) : e ? n : {};
                                    if ("function" == typeof(l = (p ? {} : n).constructor) && l instanceof l || (l = m), s = new l, !r) return ft(s, n)
                                }
                                o || (o = []), a || (a = []);
                                for (var g = o.length; g--;)
                                    if (o[g] == n) return a[g];
                                return o.push(n), a.push(s), (d ? it : Pt)(n, function(t, e) {
                                    s[e] = mt(t, r, i, e, n, o, a)
                                }), s
                            }
                            J.templateSettings = {
                                escape: so,
                                evaluate: lo,
                                interpolate: uo,
                                variable: "",
                                imports: {
                                    _: J
                                }
                            };
                            var yt = function() {
                                function n() {}
                                return function(t) {
                                    if (pr(t)) {
                                        n.prototype = t;
                                        var e = new n;
                                        n.prototype = pi
                                    }
                                    return e || {}
                                }
                            }();

                            function bt(t, e, n) {
                                if ("function" != typeof t) throw new b(Ii);
                                return T(function() {
                                    t.apply(pi, n)
                                }, e)
                            }

                            function _t(t, e) {
                                var n = t ? t.length : 0,
                                    r = [];
                                if (!n) return r;
                                var i = -1,
                                    o = Ie(),
                                    a = o == Oo,
                                    s = a && e.length >= ji ? se(e) : null,
                                    l = e.length;
                                s && (o = nt, a = !1, e = s);
                                t: for (; ++i < n;) {
                                    var u = t[i];
                                    if (a && u == u) {
                                        for (var c = l; c--;)
                                            if (e[c] === u) continue t;
                                        r.push(u)
                                    } else o(e, u, 0) < 0 && r.push(u)
                                }
                                return r
                            }
                            var wt = oe(Pt),
                                xt = oe(Mt, !0);

                            function kt(t, r) {
                                var i = !0;
                                return wt(t, function(t, e, n) {
                                    return i = !!r(t, e, n)
                                }), i
                            }

                            function St(t, r) {
                                var i = [];
                                return wt(t, function(t, e, n) {
                                    r(t, e, n) && i.push(t)
                                }), i
                            }

                            function Ct(t, r, e, i) {
                                var o;
                                return e(t, function(t, e, n) {
                                    if (r(t, e, n)) return o = i ? e : t, !1
                                }), o
                            }

                            function Tt(t, e, n, r) {
                                r || (r = []);
                                for (var i = -1, o = t.length; ++i < o;) {
                                    var a = t[i];
                                    Ho(a) && Fe(a) && (n || cr(a) || ur(a)) ? e ? Tt(a, e, n, r) : lt(r, a) : n || (r[r.length] = a)
                                }
                                return r
                            }
                            var At = ae(),
                                Et = ae(!0);

                            function jt(t, e) {
                                return At(t, e, Dr)
                            }

                            function Pt(t, e) {
                                return At(t, e, Lr)
                            }

                            function Mt(t, e) {
                                return Et(t, e, Lr)
                            }

                            function It(t, e) {
                                for (var n = -1, r = e.length, i = -1, o = []; ++n < r;) {
                                    var a = e[n];
                                    fr(t[a]) && (o[++i] = a)
                                }
                                return o
                            }

                            function Rt(t, e, n) {
                                if (null != t) {
                                    n !== pi && n in Qe(t) && (e = [n]);
                                    for (var r = 0, i = e.length; null != t && r < i;) t = t[e[r++]];
                                    return r && r == i ? t : pi
                                }
                            }

                            function Ot(t, e, n, r, i, o) {
                                return t === e || (null == t || null == e || !pr(t) && !Ho(e) ? t != t && e != e : function(t, e, n, r, i, o, a) {
                                    var s = cr(t),
                                        l = cr(e),
                                        u = Li,
                                        c = Li;
                                    s || ((u = w.call(t)) == Oi ? u = Ni : u != Ni && (s = _r(t))), l || ((c = w.call(e)) == Oi ? c = Ni : c != Ni && (l = _r(e)));
                                    var h = u == Ni,
                                        d = c == Ni,
                                        f = u == c;
                                    if (f && !s && !h) return function(t, e, n) {
                                        switch (n) {
                                            case Di:
                                            case Fi:
                                                return +t == +e;
                                            case Bi:
                                                return t.name == e.name && t.message == e.message;
                                            case $i:
                                                return t != +t ? e != +e : t == +e;
                                            case Ui:
                                            case Vi:
                                                return t == e + ""
                                        }
                                        return !1
                                    }(t, e, u);
                                    if (!i) {
                                        var p = h && _.call(t, "__wrapped__"),
                                            g = d && _.call(e, "__wrapped__");
                                        if (p || g) return n(p ? t.value() : t, g ? e.value() : e, r, i, o, a)
                                    }
                                    if (!f) return !1;
                                    o || (o = []), a || (a = []);
                                    for (var v = o.length; v--;)
                                        if (o[v] == t) return a[v] == e;
                                    o.push(t), a.push(e);
                                    var m = (s ? function(t, e, n, r, i, o, a) {
                                        var s = -1,
                                            l = t.length,
                                            u = e.length;
                                        if (l != u && !(i && l < u)) return !1;
                                        for (; ++s < l;) {
                                            var c = t[s],
                                                h = e[s],
                                                d = r ? r(i ? h : c, i ? c : h, s) : pi;
                                            if (d !== pi) {
                                                if (d) continue;
                                                return !1
                                            }
                                            if (i) {
                                                if (!ct(e, function(t) {
                                                        return c === t || n(c, t, r, i, o, a)
                                                    })) return !1
                                            } else if (c !== h && !n(c, h, r, i, o, a)) return !1
                                        }
                                        return !0
                                    } : function(t, e, n, r, i, o, a) {
                                        var s = Lr(t),
                                            l = s.length,
                                            u = Lr(e).length;
                                        if (l != u && !i) return !1;
                                        for (var c = l; c--;) {
                                            var h = s[c];
                                            if (!(i ? h in e : _.call(e, h))) return !1
                                        }
                                        for (var d = i; ++c < l;) {
                                            h = s[c];
                                            var f = t[h],
                                                p = e[h],
                                                g = r ? r(i ? p : f, i ? f : p, h) : pi;
                                            if (!(g === pi ? n(f, p, r, i, o, a) : g)) return !1;
                                            d || (d = "constructor" == h)
                                        }
                                        if (!d) {
                                            var v = t.constructor,
                                                m = e.constructor;
                                            if (v != m && "constructor" in t && "constructor" in e && !("function" == typeof v && v instanceof v && "function" == typeof m && m instanceof m)) return !1
                                        }
                                        return !0
                                    })(t, e, n, r, i, o, a);
                                    return o.pop(), a.pop(), m
                                }(t, e, Ot, n, r, i, o))
                            }

                            function Lt(t, e, n) {
                                var r = e.length,
                                    i = r,
                                    o = !n;
                                if (null == t) return !i;
                                for (t = Qe(t); r--;) {
                                    var a = e[r];
                                    if (o && a[2] ? a[1] !== t[a[0]] : !(a[0] in t)) return !1
                                }
                                for (; ++r < i;) {
                                    var s = (a = e[r])[0],
                                        l = t[s],
                                        u = a[1];
                                    if (o && a[2]) {
                                        if (l === pi && !(s in t)) return !1
                                    } else {
                                        var c = n ? n(l, u, s) : pi;
                                        if (!(c === pi ? Ot(u, l, n, !0) : c)) return !1
                                    }
                                }
                                return !0
                            }

                            function Dt(t, r) {
                                var i = -1,
                                    o = Fe(t) ? j(t.length) : [];
                                return wt(t, function(t, e, n) {
                                    o[++i] = r(t, e, n)
                                }), o
                            }

                            function Ft(t) {
                                var e = Oe(t);
                                if (1 == e.length && e[0][2]) {
                                    var n = e[0][0],
                                        r = e[0][1];
                                    return function(t) {
                                        return null != t && t[n] === r && (r !== pi || n in Qe(t))
                                    }
                                }
                                return function(t) {
                                    return Lt(t, e)
                                }
                            }

                            function Bt(n, r) {
                                var i = cr(n),
                                    o = $e(n) && Ve(r),
                                    a = n + "";
                                return n = Ke(n),
                                    function(t) {
                                        if (null == t) return !1;
                                        var e = a;
                                        if (t = Qe(t), (i || !o) && !(e in t)) {
                                            if (null == (t = 1 == n.length ? t : Rt(t, Vt(n, 0, -1)))) return !1;
                                            e = un(n), t = Qe(t)
                                        }
                                        return t[e] === r ? r !== pi || e in t : Ot(r, t[e], pi, !0)
                                    }
                            }

                            function zt(e) {
                                return function(t) {
                                    return null == t ? pi : t[e]
                                }
                            }

                            function $t(t, e) {
                                for (var n = t ? e.length : 0; n--;) {
                                    var r = e[n];
                                    if (r != i && Be(r)) {
                                        var i = r;
                                        A.call(t, r, 1)
                                    }
                                }
                                return t
                            }

                            function Nt(t, e) {
                                return t + R(N() * (e - t + 1))
                            }
                            var Ut = G ? function(t, e) {
                                return G.set(t, e), t
                            } : ei;

                            function Vt(t, e, n) {
                                var r = -1,
                                    i = t.length;
                                (e = null == e ? 0 : +e || 0) < 0 && (e = i < -e ? 0 : i + e), (n = n === pi || i < n ? i : +n || 0) < 0 && (n += i), i = n < e ? 0 : n - e >>> 0, e >>>= 0;
                                for (var o = j(i); ++r < i;) o[r] = t[r + e];
                                return o
                            }

                            function Wt(t, r) {
                                var i;
                                return wt(t, function(t, e, n) {
                                    return !(i = r(t, e, n))
                                }), !!i
                            }

                            function Ht(t, e) {
                                var n = t.length;
                                for (t.sort(e); n--;) t[n] = t[n].value;
                                return t
                            }

                            function qt(t, n, r) {
                                var e = je(),
                                    i = -1;
                                return n = st(n, function(t) {
                                    return e(t)
                                }), Ht(Dt(t, function(e) {
                                    return {
                                        criteria: st(n, function(t) {
                                            return t(e)
                                        }),
                                        index: ++i,
                                        value: e
                                    }
                                }), function(t, e) {
                                    return function(t, e, n) {
                                        for (var r = -1, i = t.criteria, o = e.criteria, a = i.length, s = n.length; ++r < a;) {
                                            var l = Io(i[r], o[r]);
                                            if (l) {
                                                if (s <= r) return l;
                                                var u = n[r];
                                                return l * ("asc" === u || !0 === u ? 1 : -1)
                                            }
                                        }
                                        return t.index - e.index
                                    }(t, e, r)
                                })
                            }

                            function Yt(t, e) {
                                var n = -1,
                                    r = Ie(),
                                    i = t.length,
                                    o = r == Oo,
                                    a = o && ji <= i,
                                    s = a ? se() : null,
                                    l = [];
                                s ? (r = nt, o = !1) : (a = !1, s = e ? [] : l);
                                t: for (; ++n < i;) {
                                    var u = t[n],
                                        c = e ? e(u, n, t) : u;
                                    if (o && u == u) {
                                        for (var h = s.length; h--;)
                                            if (s[h] === c) continue t;
                                        e && s.push(c), l.push(u)
                                    } else r(s, c, 0) < 0 && ((e || a) && s.push(c), l.push(u))
                                }
                                return l
                            }

                            function Gt(t, e) {
                                for (var n = -1, r = e.length, i = j(r); ++n < r;) i[n] = t[e[n]];
                                return i
                            }

                            function Xt(t, e, n, r) {
                                for (var i = t.length, o = r ? i : -1;
                                    (r ? o-- : ++o < i) && e(t[o], o, t););
                                return n ? Vt(t, r ? 0 : o, r ? o + 1 : i) : Vt(t, r ? o + 1 : 0, r ? i : o)
                            }

                            function Jt(t, e) {
                                var n = t;
                                n instanceof Z && (n = n.value());
                                for (var r = -1, i = e.length; ++r < i;) {
                                    var o = e[r];
                                    n = o.func.apply(o.thisArg, lt([n], o.args))
                                }
                                return n
                            }

                            function Qt(t, e, n) {
                                var r = 0,
                                    i = t ? t.length : r;
                                if ("number" == typeof e && e == e && i <= q) {
                                    for (; r < i;) {
                                        var o = r + i >>> 1,
                                            a = t[o];
                                        (n ? a <= e : a < e) && null !== a ? r = o + 1 : i = o
                                    }
                                    return i
                                }
                                return Kt(t, e, ei, n)
                            }

                            function Kt(t, e, n, r) {
                                e = n(e);
                                for (var i = 0, o = t ? t.length : 0, a = e != e, s = null === e, l = e === pi; i < o;) {
                                    var u = R((i + o) / 2),
                                        c = n(t[u]),
                                        h = c !== pi,
                                        d = c == c;
                                    if (a) var f = d || r;
                                    else f = s ? d && h && (r || null != c) : l ? d && (r || h) : null != c && (r ? c <= e : c < e);
                                    f ? i = u + 1 : o = u
                                }
                                return B(o, H)
                            }

                            function Zt(o, a, t) {
                                if ("function" != typeof o) return ei;
                                if (a === pi) return o;
                                switch (t) {
                                    case 1:
                                        return function(t) {
                                            return o.call(a, t)
                                        };
                                    case 3:
                                        return function(t, e, n) {
                                            return o.call(a, t, e, n)
                                        };
                                    case 4:
                                        return function(t, e, n, r) {
                                            return o.call(a, t, e, n, r)
                                        };
                                    case 5:
                                        return function(t, e, n, r, i) {
                                            return o.call(a, t, e, n, r, i)
                                        }
                                }
                                return function() {
                                    return o.apply(a, arguments)
                                }
                            }

                            function te(t) {
                                var e = new p(t.byteLength);
                                return new E(e).set(new E(t)), e
                            }

                            function ee(t, e, n) {
                                for (var r = n.length, i = -1, o = F(t.length - r, 0), a = -1, s = e.length, l = j(s + o); ++a < s;) l[a] = e[a];
                                for (; ++i < r;) l[n[i]] = t[i];
                                for (; o--;) l[a++] = t[i++];
                                return l
                            }

                            function ne(t, e, n) {
                                for (var r = -1, i = n.length, o = -1, a = F(t.length - i, 0), s = -1, l = e.length, u = j(a + l); ++o < a;) u[o] = t[o];
                                for (var c = o; ++s < l;) u[c + s] = e[s];
                                for (; ++r < i;) u[c + n[r]] = t[o++];
                                return u
                            }

                            function re(s, l) {
                                return function(t, r, e) {
                                    var i = l ? l() : {};
                                    if (r = je(r, e, 3), cr(t))
                                        for (var n = -1, o = t.length; ++n < o;) {
                                            var a = t[n];
                                            s(i, a, r(a, n, t), t)
                                        } else wt(t, function(t, e, n) {
                                            s(i, t, r(t, e, n), n)
                                        });
                                    return i
                                }
                            }

                            function ie(l) {
                                return sr(function(t, e) {
                                    var n = -1,
                                        r = null == t ? 0 : e.length,
                                        i = 2 < r ? e[r - 2] : pi,
                                        o = 2 < r ? e[2] : pi,
                                        a = 1 < r ? e[r - 1] : pi;
                                    for ("function" == typeof i ? (i = Zt(i, a, 5), r -= 2) : r -= (i = "function" == typeof a ? a : pi) ? 1 : 0, o && ze(e[0], e[1], o) && (i = r < 3 ? pi : i, r = 1); ++n < r;) {
                                        var s = e[n];
                                        s && l(t, s, i)
                                    }
                                    return t
                                })
                            }

                            function oe(o, a) {
                                return function(t, e) {
                                    var n = t ? Re(t) : 0;
                                    if (!Ue(n)) return o(t, e);
                                    for (var r = a ? n : -1, i = Qe(t);
                                        (a ? r-- : ++r < n) && !1 !== e(i[r], r, i););
                                    return t
                                }
                            }

                            function ae(l) {
                                return function(t, e, n) {
                                    for (var r = Qe(t), i = n(t), o = i.length, a = l ? o : -1; l ? a-- : ++a < o;) {
                                        var s = i[a];
                                        if (!1 === e(r[s], s, r)) break
                                    }
                                    return t
                                }
                            }

                            function se(t) {
                                return I && C ? new et(t) : null
                            }

                            function le(o) {
                                return function(t) {
                                    for (var e = -1, n = Kr(Wr(t)), r = n.length, i = ""; ++e < r;) i = o(i, n[e], e);
                                    return i
                                }
                            }

                            function ue(r) {
                                return function() {
                                    var t = arguments;
                                    switch (t.length) {
                                        case 0:
                                            return new r;
                                        case 1:
                                            return new r(t[0]);
                                        case 2:
                                            return new r(t[0], t[1]);
                                        case 3:
                                            return new r(t[0], t[1], t[2]);
                                        case 4:
                                            return new r(t[0], t[1], t[2], t[3]);
                                        case 5:
                                            return new r(t[0], t[1], t[2], t[3], t[4]);
                                        case 6:
                                            return new r(t[0], t[1], t[2], t[3], t[4], t[5]);
                                        case 7:
                                            return new r(t[0], t[1], t[2], t[3], t[4], t[5], t[6])
                                    }
                                    var e = yt(r.prototype),
                                        n = r.apply(e, t);
                                    return pr(n) ? n : e
                                }
                            }

                            function ce(o) {
                                return function t(e, n, r) {
                                    r && ze(e, n, r) && (n = pi);
                                    var i = Ee(e, o, pi, pi, pi, pi, pi, n);
                                    return i.placeholder = t.placeholder, i
                                }
                            }

                            function he(n, r) {
                                return sr(function(t) {
                                    var e = t[0];
                                    return null == e ? e : (t.push(r), n.apply(pi, t))
                                })
                            }

                            function de(u, c) {
                                return function(t, e, n) {
                                    if (n && ze(t, e, n) && (e = pi), 1 == (e = je(e, n, 3)).length) {
                                        var r = function(t, e, n, r) {
                                            for (var i = -1, o = t.length, a = r, s = a; ++i < o;) {
                                                var l = t[i],
                                                    u = +e(l);
                                                n(u, a) && (a = u, s = l)
                                            }
                                            return s
                                        }(t = cr(t) ? t : Je(t), e, u, c);
                                        if (!t.length || r !== c) return r
                                    }
                                    return i = e, o = u, l = s = a = c, wt(t, function(t, e, n) {
                                        var r = +i(t, e, n);
                                        (o(r, s) || r === a && r === l) && (s = r, l = t)
                                    }), l;
                                    var i, o, a, s, l
                                }
                            }

                            function fe(i, o) {
                                return function(t, e, n) {
                                    if (e = je(e, n, 3), cr(t)) {
                                        var r = Ro(t, e, o);
                                        return -1 < r ? t[r] : pi
                                    }
                                    return Ct(t, e, i)
                                }
                            }

                            function pe(r) {
                                return function(t, e, n) {
                                    return t && t.length ? Ro(t, e = je(e, n, 3), r) : -1
                                }
                            }

                            function ge(r) {
                                return function(t, e, n) {
                                    return Ct(t, e = je(e, n, 3), r, !0)
                                }
                            }

                            function ve(l) {
                                return function() {
                                    for (var i, o = arguments.length, t = l ? o : -1, e = 0, a = j(o); l ? t-- : ++t < o;) {
                                        var n = a[e++] = arguments[t];
                                        if ("function" != typeof n) throw new b(Ii);
                                        !i && K.prototype.thru && "wrapper" == Me(n) && (i = new K([], !0))
                                    }
                                    for (t = i ? -1 : o; ++t < o;) {
                                        var r = Me(n = a[t]),
                                            s = "wrapper" == r ? Pe(n) : pi;
                                        i = s && Ne(s[0]) && s[1] == (ki | bi | wi | Si) && !s[4].length && 1 == s[9] ? i[Me(s[0])].apply(i, s[3]) : 1 == n.length && Ne(n) ? i[r]() : i.thru(n)
                                    }
                                    return function() {
                                        var t = arguments,
                                            e = t[0];
                                        if (i && 1 == t.length && cr(e) && e.length >= ji) return i.plant(e).value();
                                        for (var n = 0, r = o ? a[n].apply(this, t) : e; ++n < o;) r = a[n].call(this, r);
                                        return r
                                    }
                                }
                            }

                            function me(r, i) {
                                return function(t, e, n) {
                                    return "function" == typeof e && n === pi && cr(t) ? r(t, e) : i(t, Zt(e, n, 3))
                                }
                            }

                            function ye(r) {
                                return function(t, e, n) {
                                    return "function" == typeof e && n === pi || (e = Zt(e, n, 3)), r(t, e, Dr)
                                }
                            }

                            function be(r) {
                                return function(t, e, n) {
                                    return "function" == typeof e && n === pi || (e = Zt(e, n, 3)), r(t, e)
                                }
                            }

                            function _e(a) {
                                return function(t, i, e) {
                                    var o = {};
                                    return i = je(i, e, 3), Pt(t, function(t, e, n) {
                                        var r = i(t, e, n);
                                        t = a ? t : r, o[e = a ? r : e] = t
                                    }), o
                                }
                            }

                            function we(r) {
                                return function(t, e, n) {
                                    return t = Do(t), (r ? t : "") + Ce(t, e, n) + (r ? "" : t)
                                }
                            }

                            function xe(r) {
                                var i = sr(function(t, e) {
                                    var n = qo(e, i.placeholder);
                                    return Ee(t, r, pi, e, n)
                                });
                                return i
                            }

                            function ke(u, c) {
                                return function(t, e, n, r) {
                                    var i, o, a, s, l = arguments.length < 3;
                                    return "function" == typeof e && r === pi && cr(t) ? u(t, e, n, l) : (i = t, o = je(e, r, 4), a = n, s = l, c(i, function(t, e, n) {
                                        a = s ? (s = !1, t) : o(a, t, e, n)
                                    }), a)
                                }
                            }

                            function Se(d, f, p, g, v, m, y, b, _, w) {
                                var x = f & ki,
                                    k = f & vi,
                                    S = f & mi,
                                    C = f & bi,
                                    T = f & yi,
                                    A = f & _i,
                                    E = S ? pi : ue(d);
                                return function t() {
                                    for (var e = arguments.length, n = e, r = j(e); n--;) r[n] = arguments[n];
                                    if (g && (r = ee(r, g, v)), m && (r = ne(r, m, y)), C || A) {
                                        var i = t.placeholder,
                                            o = qo(r, i);
                                        if ((e -= o.length) < w) {
                                            var a = b ? rt(b) : pi,
                                                s = F(w - e, 0);
                                            f |= C ? wi : xi, f &= ~(C ? xi : wi), T || (f &= ~(vi | mi));
                                            var l = [d, f, p, C ? r : pi, C ? o : pi, C ? pi : r, C ? pi : o, a, _, s],
                                                u = Se.apply(pi, l);
                                            return Ne(d) && Ge(u, l), u.placeholder = i, u
                                        }
                                    }
                                    var c = k ? p : this,
                                        h = S ? c[d] : d;
                                    return b && (r = function(t, e) {
                                        for (var n = t.length, r = B(e.length, n), i = rt(t); r--;) {
                                            var o = e[r];
                                            t[r] = Be(o, n) ? i[o] : pi
                                        }
                                        return t
                                    }(r, b)), x && _ < r.length && (r.length = _), this && this !== Mo && this instanceof t && (h = E || ue(d)), h.apply(c, r)
                                }
                            }

                            function Ce(t, e, n) {
                                var r = t.length;
                                if ((e = +e) <= r || !L(e)) return "";
                                var i = e - r;
                                return Gr(n = null == n ? " " : n + "", M(i / n.length)).slice(0, i)
                            }

                            function Te(t) {
                                var n = i[t];
                                return function(t, e) {
                                    return (e = e === pi ? 0 : +e || 0) ? (e = k(10, e), n(t * e) / e) : n(t)
                                }
                            }

                            function Ae(o) {
                                return function(t, e, n, r) {
                                    var i = je(n);
                                    return null == n && i === vt ? Qt(t, e, o) : Kt(t, e, i(n, r, 1), o)
                                }
                            }

                            function Ee(t, e, n, r, i, o, a, s) {
                                var l = e & mi;
                                if (!l && "function" != typeof t) throw new b(Ii);
                                var u = r ? r.length : 0;
                                if (u || (e &= ~(wi | xi), r = i = pi), u -= i ? i.length : 0, e & xi) {
                                    var c = r,
                                        h = i;
                                    r = i = pi
                                }
                                var d, f, p, g = l ? pi : Pe(t),
                                    v = [t, e, n, r, i, c, h, o, a, s];
                                if (g && (function(t, e) {
                                        var n = t[1],
                                            r = e[1],
                                            i = n | r,
                                            o = i < ki,
                                            a = r == ki && n == bi || r == ki && n == Si && t[7].length <= e[8] || r == (ki | Si) && n == bi;
                                        if (o || a) {
                                            r & vi && (t[2] = e[2], i |= n & vi ? 0 : yi);
                                            var s = e[3];
                                            if (s) {
                                                var l = t[3];
                                                t[3] = l ? ee(l, s, e[4]) : rt(s), t[4] = l ? qo(t[3], Ri) : rt(e[4])
                                            }(s = e[5]) && (l = t[5], t[5] = l ? ne(l, s, e[6]) : rt(s), t[6] = l ? qo(t[5], Ri) : rt(e[6])), (s = e[7]) && (t[7] = rt(s)), r & ki && (t[8] = null == t[8] ? e[8] : B(t[8], e[8])), null == t[9] && (t[9] = e[9]), t[0] = e[0], t[1] = i
                                        }
                                    }(v, g), e = v[1], s = v[9]), v[9] = null == s ? l ? 0 : t.length : F(s - u, 0) || 0, e == vi) var m = (d = v[0], f = v[2], p = ue(d), function t() {
                                    return (this && this !== Mo && this instanceof t ? p : d).apply(f, arguments)
                                });
                                else m = e != wi && e != (vi | wi) || v[4].length ? Se.apply(pi, v) : function(a, t, s, l) {
                                    var u = t & vi,
                                        c = ue(a);
                                    return function t() {
                                        for (var e = -1, n = arguments.length, r = -1, i = l.length, o = j(i + n); ++r < i;) o[r] = l[r];
                                        for (; n--;) o[r++] = arguments[++e];
                                        return (this && this !== Mo && this instanceof t ? c : a).apply(u ? s : this, o)
                                    }
                                }.apply(pi, v);
                                return (g ? Ut : Ge)(m, v)
                            }

                            function je(t, e, n) {
                                var r = J.callback || ti;
                                return r = r === ti ? vt : r, n ? r(t, e, n) : r
                            }
                            var Pe = G ? function(t) {
                                return G.get(t)
                            } : ai;

                            function Me(t) {
                                for (var e = t.name, n = X[e], r = n ? n.length : 0; r--;) {
                                    var i = n[r],
                                        o = i.func;
                                    if (null == o || o == t) return i.name
                                }
                                return e
                            }

                            function Ie(t, e, n) {
                                var r = J.indexOf || sn;
                                return r = r === sn ? Oo : r, t ? r(t, e, n) : r
                            }
                            var Re = zt("length");

                            function Oe(t) {
                                for (var e = $r(t), n = e.length; n--;) e[n][2] = Ve(e[n][1]);
                                return e
                            }

                            function Le(t, e) {
                                var n = null == t ? pi : t[e];
                                return gr(n) ? n : pi
                            }

                            function De(t, e, n) {
                                null == t || $e(e, t) || (t = 1 == (e = Ke(e)).length ? t : Rt(t, Vt(e, 0, -1)), e = un(e));
                                var r = null == t ? t : t[e];
                                return null == r ? pi : r.apply(t, n)
                            }

                            function Fe(t) {
                                return null != t && Ue(Re(t))
                            }

                            function Be(t, e) {
                                return t = "number" == typeof t || xo.test(t) ? +t : -1, e = null == e ? Y : e, -1 < t && t % 1 == 0 && t < e
                            }

                            function ze(t, e, n) {
                                if (!pr(n)) return !1;
                                var r = typeof e;
                                if ("number" == r ? Fe(n) && Be(e, n.length) : "string" == r && e in n) {
                                    var i = n[e];
                                    return t == t ? t === i : i != i
                                }
                                return !1
                            }

                            function $e(t, e) {
                                var n = typeof t;
                                return !!("string" == n && ho.test(t) || "number" == n) || !cr(t) && (!co.test(t) || null != e && t in Qe(e))
                            }

                            function Ne(t) {
                                var e = Me(t);
                                if (!(e in Z.prototype)) return !1;
                                var n = J[e];
                                if (t === n) return !0;
                                var r = Pe(n);
                                return !!r && t === r[0]
                            }

                            function Ue(t) {
                                return "number" == typeof t && -1 < t && t % 1 == 0 && t <= Y
                            }

                            function Ve(t) {
                                return t == t && !pr(t)
                            }

                            function We(t, e) {
                                t = Qe(t);
                                for (var n = -1, r = e.length, i = {}; ++n < r;) {
                                    var o = e[n];
                                    o in t && (i[o] = t[o])
                                }
                                return i
                            }

                            function He(t, r) {
                                var i = {};
                                return jt(t, function(t, e, n) {
                                    r(t, e, n) && (i[e] = t)
                                }), i
                            }
                            var qe, Ye, Ge = (Ye = qe = 0, function(t, e) {
                                var n = Wn(),
                                    r = Ei - (n - Ye);
                                if (Ye = n, 0 < r) {
                                    if (++qe >= Ai) return t
                                } else qe = 0;
                                return Ut(t, e)
                            });

                            function Xe(t) {
                                for (var e = Dr(t), n = e.length, r = n && t.length, i = !!r && Ue(r) && (cr(t) || ur(t)), o = -1, a = []; ++o < n;) {
                                    var s = e[o];
                                    (i && Be(s, r) || _.call(t, s)) && a.push(s)
                                }
                                return a
                            }

                            function Je(t) {
                                return null == t ? [] : Fe(t) ? pr(t) ? t : m(t) : Ur(t)
                            }

                            function Qe(t) {
                                return pr(t) ? t : m(t)
                            }

                            function Ke(t) {
                                if (cr(t)) return t;
                                var i = [];
                                return Do(t).replace(fo, function(t, e, n, r) {
                                    i.push(n ? r.replace(mo, "$1") : e || t)
                                }), i
                            }

                            function Ze(t) {
                                return t instanceof Z ? t.clone() : new K(t.__wrapped__, t.__chain__, rt(t.__actions__))
                            }
                            var tn = sr(function(t, e) {
                                return Ho(t) && Fe(t) ? _t(t, Tt(e, !1, !0)) : []
                            });

                            function en(t, e, n) {
                                return t && t.length ? ((n ? ze(t, e, n) : null == e) && (e = 1), Vt(t, e < 0 ? 0 : e)) : []
                            }

                            function nn(t, e, n) {
                                var r = t ? t.length : 0;
                                return r ? ((n ? ze(t, e, n) : null == e) && (e = 1), Vt(t, 0, (e = r - (+e || 0)) < 0 ? 0 : e)) : []
                            }
                            var rn = pe(),
                                on = pe(!0);

                            function an(t) {
                                return t ? t[0] : pi
                            }

                            function sn(t, e, n) {
                                var r = t ? t.length : 0;
                                if (!r) return -1;
                                if ("number" == typeof n) n = n < 0 ? F(r + n, 0) : n;
                                else if (n) {
                                    var i = Qt(t, e);
                                    return i < r && (e == e ? e === t[i] : t[i] != t[i]) ? i : -1
                                }
                                return Oo(t, e, n || 0)
                            }
                            var ln = sr(function(t) {
                                for (var e = t.length, n = e, r = j(c), i = Ie(), o = i == Oo, a = []; n--;) {
                                    var s = t[n] = Fe(s = t[n]) ? s : [];
                                    r[n] = o && 120 <= s.length ? se(n && s) : null
                                }
                                var l = t[0],
                                    u = -1,
                                    c = l ? l.length : 0,
                                    h = r[0];
                                t: for (; ++u < c;)
                                    if (s = l[u], (h ? nt(h, s) : i(a, s, 0)) < 0) {
                                        for (n = e; --n;) {
                                            var d = r[n];
                                            if ((d ? nt(d, s) : i(t[n], s, 0)) < 0) continue t
                                        }
                                        h && h.push(s), a.push(s)
                                    }
                                return a
                            });

                            function un(t) {
                                var e = t ? t.length : 0;
                                return e ? t[e - 1] : pi
                            }
                            var cn = sr(function(t, e) {
                                var n = pt(t, e = Tt(e));
                                return $t(t, e.sort(Io)), n
                            });

                            function hn(t) {
                                return en(t, 1)
                            }
                            var dn = Ae(),
                                fn = Ae(!0);
                            var pn = sr(function(t) {
                                return Yt(Tt(t, !1, !0))
                            });

                            function gn(t, e, n, r) {
                                if (!t || !t.length) return [];
                                null != e && "boolean" != typeof e && (n = ze(t, e, r = n) ? pi : e, e = !1);
                                var i = je();
                                return null == n && i === vt || (n = i(n, r, 3)), e && Ie() == Oo ? function(t, e) {
                                    for (var n, r = -1, i = t.length, o = -1, a = []; ++r < i;) {
                                        var s = t[r],
                                            l = e ? e(s, r, t) : s;
                                        r && n === l || (n = l, a[++o] = s)
                                    }
                                    return a
                                }(t, n) : Yt(t, n)
                            }

                            function vn(t) {
                                if (!t || !t.length) return [];
                                var e = -1,
                                    n = 0;
                                t = at(t, function(t) {
                                    if (Fe(t)) return n = F(t.length, n), !0
                                });
                                for (var r = j(n); ++e < n;) r[e] = st(t, zt(e));
                                return r
                            }

                            function mn(t, e, n) {
                                if (!t || !t.length) return [];
                                var r = vn(t);
                                return null == e ? r : (e = Zt(e, n, 4), st(r, function(t) {
                                    return ut(t, e, pi, !0)
                                }))
                            }
                            var yn = sr(function(t, e) {
                                return Fe(t) ? _t(t, e) : []
                            });
                            var bn = sr(vn);

                            function _n(t, e) {
                                var n = -1,
                                    r = t ? t.length : 0,
                                    i = {};
                                for (!r || e || cr(t[0]) || (e = []); ++n < r;) {
                                    var o = t[n];
                                    e ? i[o] = e[n] : o && (i[o[0]] = o[1])
                                }
                                return i
                            }
                            var wn = sr(function(t) {
                                var e = t.length,
                                    n = 2 < e ? t[e - 2] : pi,
                                    r = 1 < e ? t[e - 1] : pi;
                                return 2 < e && "function" == typeof n ? e -= 2 : (n = 1 < e && "function" == typeof r ? (--e, r) : pi, r = pi), t.length = e, mn(t, n, r)
                            });

                            function xn(t) {
                                var e = J(t);
                                return e.__chain__ = !0, e
                            }

                            function kn(t, e, n) {
                                return e.call(n, t)
                            }
                            var Sn = sr(function(e) {
                                return e = Tt(e), this.thru(function(t) {
                                    return function(t, e) {
                                        for (var n = -1, r = t.length, i = -1, o = e.length, a = j(r + o); ++n < r;) a[n] = t[n];
                                        for (; ++i < o;) a[n++] = e[i];
                                        return a
                                    }(cr(t) ? t : [Qe(t)], e)
                                })
                            });
                            var Cn = sr(function(t, e) {
                                    return pt(t, Tt(e))
                                }),
                                Tn = re(function(t, e, n) {
                                    _.call(t, n) ? ++t[n] : t[n] = 1
                                });

                            function An(t, e, n) {
                                var r = cr(t) ? ot : kt;
                                return n && ze(t, e, n) && (e = pi), "function" == typeof e && n === pi || (e = je(e, n, 3)), r(t, e)
                            }

                            function En(t, e, n) {
                                return (cr(t) ? at : St)(t, e = je(e, n, 3))
                            }
                            var jn = fe(wt),
                                Pn = fe(xt, !0);
                            var Mn = me(it, wt),
                                In = me(function(t, e) {
                                    for (var n = t.length; n-- && !1 !== e(t[n], n, t););
                                    return t
                                }, xt),
                                Rn = re(function(t, e, n) {
                                    _.call(t, n) ? t[n].push(e) : t[n] = [e]
                                });

                            function On(t, e, n, r) {
                                var i = t ? Re(t) : 0;
                                return Ue(i) || (i = (t = Ur(t)).length), n = "number" != typeof n || r && ze(e, n, r) ? 0 : n < 0 ? F(i + n, 0) : n || 0, "string" == typeof t || !cr(t) && br(t) ? n <= i && -1 < t.indexOf(e, n) : !!i && -1 < Ie(t, e, n)
                            }
                            var Ln = re(function(t, e, n) {
                                    t[n] = e
                                }),
                                Dn = sr(function(t, n, r) {
                                    var i = -1,
                                        o = "function" == typeof n,
                                        a = $e(n),
                                        s = Fe(t) ? j(t.length) : [];
                                    return wt(t, function(t) {
                                        var e = o ? n : a && null != t ? t[n] : pi;
                                        s[++i] = e ? e.apply(t, r) : De(t, n, r)
                                    }), s
                                });

                            function Fn(t, e, n) {
                                return (cr(t) ? st : Dt)(t, e = je(e, n, 3))
                            }
                            var Bn = re(function(t, e, n) {
                                t[n ? 0 : 1].push(e)
                            }, function() {
                                return [
                                    [],
                                    []
                                ]
                            });
                            var zn = ke(ut, wt),
                                $n = ke(function(t, e, n, r) {
                                    var i = t.length;
                                    for (r && i && (n = t[--i]); i--;) n = e(n, t[i], i, t);
                                    return n
                                }, xt);

                            function Nn(t, e, n) {
                                if (n ? ze(t, e, n) : null == e) return 0 < (r = (t = Je(t)).length) ? t[Nt(0, r - 1)] : pi;
                                var r, i = -1,
                                    o = xr(t),
                                    a = (r = o.length) - 1;
                                for (e = B(e < 0 ? 0 : +e || 0, r); ++i < e;) {
                                    var s = Nt(i, a),
                                        l = o[s];
                                    o[s] = o[i], o[i] = l
                                }
                                return o.length = e, o
                            }

                            function Un(t, e, n) {
                                var r = cr(t) ? ct : Wt;
                                return n && ze(t, e, n) && (e = pi), "function" == typeof e && n === pi || (e = je(e, n, 3)), r(t, e)
                            }
                            var Vn = sr(function(t, e) {
                                if (null == t) return [];
                                var n = e[2];
                                return n && ze(e[0], e[1], n) && (e.length = 1), qt(t, Tt(e), [])
                            });
                            var Wn = z || function() {
                                return (new n).getTime()
                            };

                            function Hn(t, e) {
                                var n;
                                if ("function" != typeof e) {
                                    if ("function" != typeof t) throw new b(Ii);
                                    var r = t;
                                    t = e, e = r
                                }
                                return function() {
                                    return 0 < --t && (n = e.apply(this, arguments)), t <= 1 && (e = pi), n
                                }
                            }
                            var qn = sr(function(t, e, n) {
                                    var r = vi;
                                    if (n.length) {
                                        var i = qo(n, qn.placeholder);
                                        r |= wi
                                    }
                                    return Ee(t, r, e, n, i)
                                }),
                                Yn = sr(function(t, e) {
                                    for (var n = -1, r = (e = e.length ? Tt(e) : Or(t)).length; ++n < r;) {
                                        var i = e[n];
                                        t[i] = Ee(t[i], vi, t)
                                    }
                                    return t
                                }),
                                Gn = sr(function(t, e, n) {
                                    var r = vi | mi;
                                    if (n.length) {
                                        var i = qo(n, Gn.placeholder);
                                        r |= wi
                                    }
                                    return Ee(e, r, t, n, i)
                                }),
                                Xn = ce(bi),
                                Jn = ce(_i);

                            function Qn(r, i, t) {
                                var o, a, s, l, u, c, h, d = 0,
                                    f = !1,
                                    p = !0;
                                if ("function" != typeof r) throw new b(Ii);
                                if (i = i < 0 ? 0 : +i || 0, !0 === t) {
                                    var g = !0;
                                    p = !1
                                } else pr(t) && (g = !!t.leading, f = "maxWait" in t && F(+t.maxWait || 0, i), p = "trailing" in t ? !!t.trailing : p);

                                function e(t, e) {
                                    e && x(e), a = c = h = pi, t && (d = Wn(), s = r.apply(u, o), c || a || (o = u = pi))
                                }

                                function v() {
                                    var t = i - (Wn() - l);
                                    t <= 0 || i < t ? e(h, a) : c = T(v, t)
                                }

                                function m() {
                                    e(p, c)
                                }

                                function n() {
                                    if (o = arguments, l = Wn(), u = this, h = p && (c || !g), !1 === f) var t = g && !c;
                                    else {
                                        a || g || (d = l);
                                        var e = f - (l - d),
                                            n = e <= 0 || f < e;
                                        n ? (a && (a = x(a)), d = l, s = r.apply(u, o)) : a || (a = T(m, e))
                                    }
                                    return n && c ? c = x(c) : c || i === f || (c = T(v, i)), t && (n = !0, s = r.apply(u, o)), !n || c || a || (o = u = pi), s
                                }
                                return n.cancel = function() {
                                    c && x(c), a && x(a), d = 0, a = c = h = pi
                                }, n
                            }
                            var Kn = sr(function(t, e) {
                                    return bt(t, 1, e)
                                }),
                                Zn = sr(function(t, e, n) {
                                    return bt(t, e, n)
                                }),
                                tr = ve(),
                                er = ve(!0);

                            function nr(i, o) {
                                if ("function" != typeof i || o && "function" != typeof o) throw new b(Ii);
                                var a = function() {
                                    var t = arguments,
                                        e = o ? o.apply(this, t) : t[0],
                                        n = a.cache;
                                    if (n.has(e)) return n.get(e);
                                    var r = i.apply(this, t);
                                    return a.cache = n.set(e, r), r
                                };
                                return a.cache = new nr.Cache, a
                            }
                            var rr = sr(function(n, r) {
                                if (r = Tt(r), "function" != typeof n || !ot(r, Lo)) throw new b(Ii);
                                var i = r.length;
                                return sr(function(t) {
                                    for (var e = B(t.length, i); e--;) t[e] = r[e](t[e]);
                                    return n.apply(this, t)
                                })
                            });
                            var ir = xe(wi),
                                or = xe(xi),
                                ar = sr(function(t, e) {
                                    return Ee(t, Si, pi, pi, pi, Tt(e))
                                });

                            function sr(o, a) {
                                if ("function" != typeof o) throw new b(Ii);
                                return a = F(a === pi ? o.length - 1 : +a || 0, 0),
                                    function() {
                                        for (var t = arguments, e = -1, n = F(t.length - a, 0), r = j(n); ++e < n;) r[e] = t[a + e];
                                        switch (a) {
                                            case 0:
                                                return o.call(this, r);
                                            case 1:
                                                return o.call(this, t[0], r);
                                            case 2:
                                                return o.call(this, t[0], t[1], r)
                                        }
                                        var i = j(a + 1);
                                        for (e = -1; ++e < a;) i[e] = t[e];
                                        return i[a] = r, o.apply(this, i)
                                    }
                            }

                            function lr(t, e) {
                                return e < t
                            }

                            function ur(t) {
                                return Ho(t) && Fe(t) && _.call(t, "callee") && !S.call(t, "callee")
                            }
                            var cr = O || function(t) {
                                return Ho(t) && Ue(t.length) && w.call(t) == Li
                            };

                            function hr(t, e, n, r) {
                                var i = (n = "function" == typeof n ? Zt(n, r, 3) : pi) ? n(t, e) : pi;
                                return i === pi ? Ot(t, e, n) : !!i
                            }

                            function dr(t) {
                                return Ho(t) && "string" == typeof t.message && w.call(t) == Bi
                            }

                            function fr(t) {
                                return pr(t) && w.call(t) == zi
                            }

                            function pr(t) {
                                var e = typeof t;
                                return !!t && ("object" == e || "function" == e)
                            }

                            function gr(t) {
                                return null != t && (fr(t) ? f.test(c.call(t)) : Ho(t) && wo.test(t))
                            }

                            function vr(t) {
                                return "number" == typeof t || Ho(t) && w.call(t) == $i
                            }

                            function mr(t) {
                                var e, n;
                                return !(!Ho(t) || w.call(t) != Ni || ur(t) || !(_.call(t, "constructor") || "function" != typeof(e = t.constructor) || e instanceof e)) && (jt(t, function(t, e) {
                                    n = e
                                }), n === pi || _.call(t, n))
                            }

                            function yr(t) {
                                return pr(t) && w.call(t) == Ui
                            }

                            function br(t) {
                                return "string" == typeof t || Ho(t) && w.call(t) == Vi
                            }

                            function _r(t) {
                                return Ho(t) && Ue(t.length) && !!jo[w.call(t)]
                            }

                            function wr(t, e) {
                                return t < e
                            }

                            function xr(t) {
                                var e = t ? Re(t) : 0;
                                return Ue(e) ? e ? rt(t) : [] : Ur(t)
                            }

                            function kr(t) {
                                return gt(t, Dr(t))
                            }
                            var Sr = ie(function o(a, s, l, u, c) {
                                    if (!pr(a)) return a;
                                    var h = Fe(s) && (cr(s) || _r(s)),
                                        d = h ? pi : Lr(s);
                                    return it(d || s, function(t, e) {
                                        if (d && (t = s[e = t]), Ho(t)) u || (u = []), c || (c = []),
                                            function(t, e, n, r, i, o, a) {
                                                for (var s = o.length, l = e[n]; s--;)
                                                    if (o[s] == l) return t[n] = a[s];
                                                var u = t[n],
                                                    c = i ? i(u, l, n, t, e) : pi,
                                                    h = c === pi;
                                                h && (Fe(c = l) && (cr(l) || _r(l)) ? c = cr(u) ? u : Fe(u) ? rt(u) : [] : mr(l) || ur(l) ? c = ur(u) ? kr(u) : mr(u) ? u : {} : h = !1), o.push(l), a.push(c), h ? t[n] = r(c, l, i, o, a) : (c == c ? c !== u : u == u) && (t[n] = c)
                                            }(a, s, e, o, l, u, c);
                                        else {
                                            var n = a[e],
                                                r = l ? l(n, t, e, a, s) : pi,
                                                i = r === pi;
                                            i && (r = t), r === pi && (!h || e in a) || !i && (r == r ? r === n : n != n) || (a[e] = r)
                                        }
                                    }), a
                                }),
                                Cr = ie(function(t, e, n) {
                                    return n ? dt(t, e, n) : ft(t, e)
                                });
                            var Tr = he(Cr, function(t, e) {
                                    return t === pi ? e : t
                                }),
                                Ar = he(Sr, function t(e, n) {
                                    return e === pi ? n : Sr(e, n, t)
                                }),
                                Er = ge(Pt),
                                jr = ge(Mt),
                                Pr = ye(At),
                                Mr = ye(Et),
                                Ir = be(Pt),
                                Rr = be(Mt);

                            function Or(t) {
                                return It(t, Dr(t))
                            }
                            var Lr = D ? function(t) {
                                var e = null == t ? pi : t.constructor;
                                return "function" == typeof e && e.prototype === t || "function" != typeof t && Fe(t) ? Xe(t) : pr(t) ? D(t) : []
                            } : Xe;

                            function Dr(t) {
                                if (null == t) return [];
                                pr(t) || (t = m(t));
                                var e = t.length;
                                e = e && Ue(e) && (cr(t) || ur(t)) && e || 0;
                                for (var n = t.constructor, r = -1, i = "function" == typeof n && n.prototype === t, o = j(e), a = 0 < e; ++r < e;) o[r] = r + "";
                                for (var s in t) a && Be(s, e) || "constructor" == s && (i || !_.call(t, s)) || o.push(s);
                                return o
                            }
                            var Fr = _e(!0),
                                Br = _e(),
                                zr = sr(function(t, e) {
                                    if (null == t) return {};
                                    if ("function" != typeof e[0]) return e = st(Tt(e), a), We(t, _t(Dr(t), e));
                                    var r = Zt(e[0], e[1], 3);
                                    return He(t, function(t, e, n) {
                                        return !r(t, e, n)
                                    })
                                });

                            function $r(t) {
                                t = Qe(t);
                                for (var e = -1, n = Lr(t), r = n.length, i = j(r); ++e < r;) {
                                    var o = n[e];
                                    i[e] = [o, t[o]]
                                }
                                return i
                            }
                            var Nr = sr(function(t, e) {
                                return null == t ? {} : "function" == typeof e[0] ? He(t, Zt(e[0], e[1], 3)) : We(t, Tt(e))
                            });

                            function Ur(t) {
                                return Gt(t, Lr(t))
                            }
                            var Vr = le(function(t, e, n) {
                                return e = e.toLowerCase(), t + (n ? e.charAt(0).toUpperCase() + e.slice(1) : e)
                            });

                            function Wr(t) {
                                return (t = Do(t)) && t.replace(ko, $o).replace(vo, "")
                            }
                            var Hr = le(function(t, e, n) {
                                return t + (n ? "-" : "") + e.toLowerCase()
                            });
                            var qr = we(),
                                Yr = we(!0);

                            function Gr(t, e) {
                                var n = "";
                                if (t = Do(t), (e = +e) < 1 || !t || !L(e)) return n;
                                for (; e % 2 && (n += t), t += t, e = R(e / 2););
                                return n
                            }
                            var Xr = le(function(t, e, n) {
                                    return t + (n ? "_" : "") + e.toLowerCase()
                                }),
                                Jr = le(function(t, e, n) {
                                    return t + (n ? " " : "") + (e.charAt(0).toUpperCase() + e.slice(1))
                                });

                            function Qr(t, e, n) {
                                var r = t;
                                return (t = Do(t)) ? (n ? ze(r, e, n) : null == e) ? t.slice(Yo(t), Go(t) + 1) : (e += "", t.slice(Fo(t, e), Bo(t, e) + 1)) : t
                            }

                            function Kr(t, e, n) {
                                return n && ze(t, e, n) && (e = pi), (t = Do(t)).match(e || To) || []
                            }
                            var Zr = sr(function(t, e) {
                                try {
                                    return t.apply(pi, e)
                                } catch (t) {
                                    return dr(t) ? t : new r(t)
                                }
                            });

                            function ti(t, e, n) {
                                return n && ze(t, e, n) && (e = pi), Ho(t) ? ni(t) : vt(t, e)
                            }

                            function ei(t) {
                                return t
                            }

                            function ni(t) {
                                return Ft(mt(t, !0))
                            }
                            var ri = sr(function(e, n) {
                                    return function(t) {
                                        return De(t, e, n)
                                    }
                                }),
                                ii = sr(function(e, n) {
                                    return function(t) {
                                        return De(e, t, n)
                                    }
                                });

                            function oi(r, t, e) {
                                if (null == e) {
                                    var n = pr(t),
                                        i = n ? Lr(t) : pi,
                                        o = i && i.length ? It(t, i) : pi;
                                    (o ? o.length : n) || (o = !1, e = t, t = r, r = this)
                                }
                                o || (o = It(t, Lr(t)));
                                var a = !0,
                                    s = -1,
                                    l = fr(r),
                                    u = o.length;
                                !1 === e ? a = !1 : pr(e) && "chain" in e && (a = e.chain);
                                for (; ++s < u;) {
                                    var c = o[s],
                                        h = t[c];
                                    r[c] = h, l && (r.prototype[c] = function(n) {
                                        return function() {
                                            var t = this.__chain__;
                                            if (a || t) {
                                                var e = r(this.__wrapped__);
                                                return (e.__actions__ = rt(this.__actions__)).push({
                                                    func: n,
                                                    args: arguments,
                                                    thisArg: r
                                                }), e.__chain__ = t, e
                                            }
                                            return n.apply(r, lt([this.value()], arguments))
                                        }
                                    }(h))
                                }
                                return r
                            }

                            function ai() {}

                            function si(t) {
                                return $e(t) ? zt(t) : (n = (e = t) + "", e = Ke(e), function(t) {
                                    return Rt(t, e, n)
                                });
                                var e, n
                            }
                            var li, ui = Te("ceil"),
                                ci = Te("floor"),
                                hi = de(lr, U),
                                di = de(wr, V),
                                fi = Te("round");
                            return J.prototype = Q.prototype, (K.prototype = yt(Q.prototype)).constructor = K, (Z.prototype = yt(Q.prototype)).constructor = Z, tt.prototype.delete = function(t) {
                                return this.has(t) && delete this.__data__[t]
                            }, tt.prototype.get = function(t) {
                                return "__proto__" == t ? pi : this.__data__[t]
                            }, tt.prototype.has = function(t) {
                                return "__proto__" != t && _.call(this.__data__, t)
                            }, tt.prototype.set = function(t, e) {
                                return "__proto__" != t && (this.__data__[t] = e), this
                            }, et.prototype.push = function(t) {
                                var e = this.data;
                                "string" == typeof t || pr(t) ? e.set.add(t) : e.hash[t] = !0
                            }, nr.Cache = tt, J.after = function(t, e) {
                                if ("function" != typeof e) {
                                    if ("function" != typeof t) throw new b(Ii);
                                    var n = t;
                                    t = e, e = n
                                }
                                return t = L(t = +t) ? t : 0,
                                    function() {
                                        if (--t < 1) return e.apply(this, arguments)
                                    }
                            }, J.ary = function(t, e, n) {
                                return n && ze(t, e, n) && (e = pi), e = t && null == e ? t.length : F(+e || 0, 0), Ee(t, ki, pi, pi, pi, pi, e)
                            }, J.assign = Cr, J.at = Cn, J.before = Hn, J.bind = qn, J.bindAll = Yn, J.bindKey = Gn, J.callback = ti, J.chain = xn, J.chunk = function(t, e, n) {
                                e = (n ? ze(t, e, n) : null == e) ? 1 : F(R(e) || 1, 1);
                                for (var r = 0, i = t ? t.length : 0, o = -1, a = j(M(i / e)); r < i;) a[++o] = Vt(t, r, r += e);
                                return a
                            }, J.compact = function(t) {
                                for (var e = -1, n = t ? t.length : 0, r = -1, i = []; ++e < n;) {
                                    var o = t[e];
                                    o && (i[++r] = o)
                                }
                                return i
                            }, J.constant = function(t) {
                                return function() {
                                    return t
                                }
                            }, J.countBy = Tn, J.create = function(t, e, n) {
                                var r = yt(t);
                                return n && ze(t, e, n) && (e = pi), e ? ft(r, e) : r
                            }, J.curry = Xn, J.curryRight = Jn, J.debounce = Qn, J.defaults = Tr, J.defaultsDeep = Ar, J.defer = Kn, J.delay = Zn, J.difference = tn, J.drop = en, J.dropRight = nn, J.dropRightWhile = function(t, e, n) {
                                return t && t.length ? Xt(t, je(e, n, 3), !0, !0) : []
                            }, J.dropWhile = function(t, e, n) {
                                return t && t.length ? Xt(t, je(e, n, 3), !0) : []
                            }, J.fill = function(t, e, n, r) {
                                var i = t ? t.length : 0;
                                return i ? (n && "number" != typeof n && ze(t, e, n) && (n = 0, r = i), function(t, e, n, r) {
                                    var i = t.length;
                                    for ((n = null == n ? 0 : +n || 0) < 0 && (n = i < -n ? 0 : i + n), (r = r === pi || i < r ? i : +r || 0) < 0 && (r += i), i = r < n ? 0 : r >>> 0, n >>>= 0; n < i;) t[n++] = e;
                                    return t
                                }(t, e, n, r)) : []
                            }, J.filter = En, J.flatten = function(t, e, n) {
                                var r = t ? t.length : 0;
                                return n && ze(t, e, n) && (e = !1), r ? Tt(t, e) : []
                            }, J.flattenDeep = function(t) {
                                return t && t.length ? Tt(t, !0) : []
                            }, J.flow = tr, J.flowRight = er, J.forEach = Mn, J.forEachRight = In, J.forIn = Pr, J.forInRight = Mr, J.forOwn = Ir, J.forOwnRight = Rr, J.functions = Or, J.groupBy = Rn, J.indexBy = Ln, J.initial = function(t) {
                                return nn(t, 1)
                            }, J.intersection = ln, J.invert = function(t, e, n) {
                                n && ze(t, e, n) && (e = pi);
                                for (var r = -1, i = Lr(t), o = i.length, a = {}; ++r < o;) {
                                    var s = i[r],
                                        l = t[s];
                                    e ? _.call(a, l) ? a[l].push(s) : a[l] = [s] : a[l] = s
                                }
                                return a
                            }, J.invoke = Dn, J.keys = Lr, J.keysIn = Dr, J.map = Fn, J.mapKeys = Fr, J.mapValues = Br, J.matches = ni, J.matchesProperty = function(t, e) {
                                return Bt(t, mt(e, !0))
                            }, J.memoize = nr, J.merge = Sr, J.method = ri, J.methodOf = ii, J.mixin = oi, J.modArgs = rr, J.negate = function(t) {
                                if ("function" != typeof t) throw new b(Ii);
                                return function() {
                                    return !t.apply(this, arguments)
                                }
                            }, J.omit = zr, J.once = function(t) {
                                return Hn(2, t)
                            }, J.pairs = $r, J.partial = ir, J.partialRight = or, J.partition = Bn, J.pick = Nr, J.pluck = function(t, e) {
                                return Fn(t, si(e))
                            }, J.property = si, J.propertyOf = function(e) {
                                return function(t) {
                                    return Rt(e, Ke(t), t + "")
                                }
                            }, J.pull = function() {
                                var t = arguments,
                                    e = t[0];
                                if (!e || !e.length) return e;
                                for (var n = 0, r = Ie(), i = t.length; ++n < i;)
                                    for (var o = 0, a = t[n]; - 1 < (o = r(e, a, o));) A.call(e, o, 1);
                                return e
                            }, J.pullAt = cn, J.range = function(t, e, n) {
                                n && ze(t, e, n) && (e = n = pi), t = +t || 0, null == e ? (e = t, t = 0) : e = +e || 0;
                                for (var r = -1, i = F(M((e - t) / ((n = null == n ? 1 : +n || 0) || 1)), 0), o = j(i); ++r < i;) o[r] = t, t += n;
                                return o
                            }, J.rearg = ar, J.reject = function(t, r, e) {
                                var n = cr(t) ? at : St;
                                return r = je(r, e, 3), n(t, function(t, e, n) {
                                    return !r(t, e, n)
                                })
                            }, J.remove = function(t, e, n) {
                                var r = [];
                                if (!t || !t.length) return r;
                                var i = -1,
                                    o = [],
                                    a = t.length;
                                for (e = je(e, n, 3); ++i < a;) {
                                    var s = t[i];
                                    e(s, i, t) && (r.push(s), o.push(i))
                                }
                                return $t(t, o), r
                            }, J.rest = hn, J.restParam = sr, J.set = function(t, e, n) {
                                if (null == t) return t;
                                for (var r = e + "", i = -1, o = (e = null != t[r] || $e(e, t) ? [r] : Ke(e)).length, a = o - 1, s = t; null != s && ++i < o;) {
                                    var l = e[i];
                                    pr(s) && (i == a ? s[l] = n : null == s[l] && (s[l] = Be(e[i + 1]) ? [] : {})), s = s[l]
                                }
                                return t
                            }, J.shuffle = function(t) {
                                return Nn(t, V)
                            }, J.slice = function(t, e, n) {
                                var r = t ? t.length : 0;
                                return r ? (n && "number" != typeof n && ze(t, e, n) && (e = 0, n = r), Vt(t, e, n)) : []
                            }, J.sortBy = function(t, r, e) {
                                if (null == t) return [];
                                e && ze(t, r, e) && (r = pi);
                                var i = -1;
                                return r = je(r, e, 3), Ht(Dt(t, function(t, e, n) {
                                    return {
                                        criteria: r(t, e, n),
                                        index: ++i,
                                        value: t
                                    }
                                }), zo)
                            }, J.sortByAll = Vn, J.sortByOrder = function(t, e, n, r) {
                                return null == t ? [] : (r && ze(e, n, r) && (n = pi), cr(e) || (e = null == e ? [] : [e]), cr(n) || (n = null == n ? [] : [n]), qt(t, e, n))
                            }, J.spread = function(e) {
                                if ("function" != typeof e) throw new b(Ii);
                                return function(t) {
                                    return e.apply(this, t)
                                }
                            }, J.take = function(t, e, n) {
                                return t && t.length ? ((n ? ze(t, e, n) : null == e) && (e = 1), Vt(t, 0, e < 0 ? 0 : e)) : []
                            }, J.takeRight = function(t, e, n) {
                                var r = t ? t.length : 0;
                                return r ? ((n ? ze(t, e, n) : null == e) && (e = 1), Vt(t, (e = r - (+e || 0)) < 0 ? 0 : e)) : []
                            }, J.takeRightWhile = function(t, e, n) {
                                return t && t.length ? Xt(t, je(e, n, 3), !1, !0) : []
                            }, J.takeWhile = function(t, e, n) {
                                return t && t.length ? Xt(t, je(e, n, 3)) : []
                            }, J.tap = function(t, e, n) {
                                return e.call(n, t), t
                            }, J.throttle = function(t, e, n) {
                                var r = !0,
                                    i = !0;
                                if ("function" != typeof t) throw new b(Ii);
                                return !1 === n ? r = !1 : pr(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), Qn(t, e, {
                                    leading: r,
                                    maxWait: +e,
                                    trailing: i
                                })
                            }, J.thru = kn, J.times = function(t, e, n) {
                                if ((t = R(t)) < 1 || !L(t)) return [];
                                var r = -1,
                                    i = j(B(t, W));
                                for (e = Zt(e, n, 1); ++r < t;) r < W ? i[r] = e(r) : e(r);
                                return i
                            }, J.toArray = xr, J.toPlainObject = kr, J.transform = function(t, r, i, e) {
                                var n = cr(t) || _r(t);
                                if (r = je(r, e, 4), null == i)
                                    if (n || pr(t)) {
                                        var o = t.constructor;
                                        i = n ? cr(t) ? new o : [] : yt(fr(o) ? o.prototype : pi)
                                    } else i = {};
                                return (n ? it : Pt)(t, function(t, e, n) {
                                    return r(i, t, e, n)
                                }), i
                            }, J.union = pn, J.uniq = gn, J.unzip = vn, J.unzipWith = mn, J.values = Ur, J.valuesIn = function(t) {
                                return Gt(t, Dr(t))
                            }, J.where = function(t, e) {
                                return En(t, Ft(e))
                            }, J.without = yn, J.wrap = function(t, e) {
                                return Ee(e = null == e ? ei : e, wi, pi, [t], [])
                            }, J.xor = function() {
                                for (var t = -1, e = arguments.length; ++t < e;) {
                                    var n = arguments[t];
                                    if (Fe(n)) var r = r ? lt(_t(r, n), _t(n, r)) : n
                                }
                                return r ? Yt(r) : []
                            }, J.zip = bn, J.zipObject = _n, J.zipWith = wn, J.backflow = er, J.collect = Fn, J.compose = er, J.each = Mn, J.eachRight = In, J.extend = Cr, J.iteratee = ti, J.methods = Or, J.object = _n, J.select = En, J.tail = hn, J.unique = gn, oi(J, J), J.add = function(t, e) {
                                return (+t || 0) + (+e || 0)
                            }, J.attempt = Zr, J.camelCase = Vr, J.capitalize = function(t) {
                                return (t = Do(t)) && t.charAt(0).toUpperCase() + t.slice(1)
                            }, J.ceil = ui, J.clone = function(t, e, n, r) {
                                return e && "boolean" != typeof e && ze(t, e, n) ? e = !1 : "function" == typeof e && (r = n, n = e, e = !1), "function" == typeof n ? mt(t, e, Zt(n, r, 1)) : mt(t, e)
                            }, J.cloneDeep = function(t, e, n) {
                                return "function" == typeof e ? mt(t, !0, Zt(e, n, 1)) : mt(t, !0)
                            }, J.deburr = Wr, J.endsWith = function(t, e, n) {
                                e += "";
                                var r = (t = Do(t)).length;
                                return n = n === pi ? r : B(n < 0 ? 0 : +n || 0, r), 0 <= (n -= e.length) && t.indexOf(e, n) == n
                            }, J.escape = function(t) {
                                return (t = Do(t)) && ao.test(t) ? t.replace(io, No) : t
                            }, J.escapeRegExp = function(t) {
                                return (t = Do(t)) && go.test(t) ? t.replace(po, Uo) : t || "(?:)"
                            }, J.every = An, J.find = jn, J.findIndex = rn, J.findKey = Er, J.findLast = Pn, J.findLastIndex = on, J.findLastKey = jr, J.findWhere = function(t, e) {
                                return jn(t, Ft(e))
                            }, J.first = an, J.floor = ci, J.get = function(t, e, n) {
                                var r = null == t ? pi : Rt(t, Ke(e), e + "");
                                return r === pi ? n : r
                            }, J.gt = lr, J.gte = function(t, e) {
                                return e <= t
                            }, J.has = function(t, e) {
                                if (null == t) return !1;
                                var n = _.call(t, e);
                                if (!n && !$e(e)) {
                                    if (null == (t = 1 == (e = Ke(e)).length ? t : Rt(t, Vt(e, 0, -1)))) return !1;
                                    e = un(e), n = _.call(t, e)
                                }
                                return n || Ue(t.length) && Be(e, t.length) && (cr(t) || ur(t))
                            }, J.identity = ei, J.includes = On, J.indexOf = sn, J.inRange = function(t, e, n) {
                                return e = +e || 0, n === pi ? (n = e, e = 0) : n = +n || 0, t >= B(e, n) && t < F(e, n)
                            }, J.isArguments = ur, J.isArray = cr, J.isBoolean = function(t) {
                                return !0 === t || !1 === t || Ho(t) && w.call(t) == Di
                            }, J.isDate = function(t) {
                                return Ho(t) && w.call(t) == Fi
                            }, J.isElement = function(t) {
                                return !!t && 1 === t.nodeType && Ho(t) && !mr(t)
                            }, J.isEmpty = function(t) {
                                return null == t || (Fe(t) && (cr(t) || br(t) || ur(t) || Ho(t) && fr(t.splice)) ? !t.length : !Lr(t).length)
                            }, J.isEqual = hr, J.isError = dr, J.isFinite = function(t) {
                                return "number" == typeof t && L(t)
                            }, J.isFunction = fr, J.isMatch = function(t, e, n, r) {
                                return n = "function" == typeof n ? Zt(n, r, 3) : pi, Lt(t, Oe(e), n)
                            }, J.isNaN = function(t) {
                                return vr(t) && t != +t
                            }, J.isNative = gr, J.isNull = function(t) {
                                return null === t
                            }, J.isNumber = vr, J.isObject = pr, J.isPlainObject = mr, J.isRegExp = yr, J.isString = br, J.isTypedArray = _r, J.isUndefined = function(t) {
                                return t === pi
                            }, J.kebabCase = Hr, J.last = un, J.lastIndexOf = function(t, e, n) {
                                var r = t ? t.length : 0;
                                if (!r) return -1;
                                var i = r;
                                if ("number" == typeof n) i = (n < 0 ? F(r + n, 0) : B(n || 0, r - 1)) + 1;
                                else if (n) {
                                    var o = t[i = Qt(t, e, !0) - 1];
                                    return (e == e ? e === o : o != o) ? i : -1
                                }
                                if (e != e) return Wo(t, i, !0);
                                for (; i--;)
                                    if (t[i] === e) return i;
                                return -1
                            }, J.lt = wr, J.lte = function(t, e) {
                                return t <= e
                            }, J.max = hi, J.min = di, J.noConflict = function() {
                                return Mo._ = d, this
                            }, J.noop = ai, J.now = Wn, J.pad = function(t, e, n) {
                                e = +e;
                                var r = (t = Do(t)).length;
                                if (e <= r || !L(e)) return t;
                                var i = (e - r) / 2,
                                    o = R(i);
                                return (n = Ce("", M(i), n)).slice(0, o) + t + n
                            }, J.padLeft = qr, J.padRight = Yr, J.parseInt = function(t, e, n) {
                                return (n ? ze(t, e, n) : null == e) ? e = 0 : e && (e = +e), t = Qr(t), $(t, e || (_o.test(t) ? 16 : 10))
                            }, J.random = function(t, e, n) {
                                n && ze(t, e, n) && (e = n = pi);
                                var r = null == t,
                                    i = null == e;
                                if (null == n && (i && "boolean" == typeof t ? (n = t, t = 1) : "boolean" == typeof e && (n = e, i = !0)), r && i && (i = !(e = 1)), t = +t || 0, i ? (e = t, t = 0) : e = +e || 0, n || t % 1 || e % 1) {
                                    var o = N();
                                    return B(t + o * (e - t + g("1e-" + ((o + "").length - 1))), e)
                                }
                                return Nt(t, e)
                            }, J.reduce = zn, J.reduceRight = $n, J.repeat = Gr, J.result = function(t, e, n) {
                                var r = null == t ? pi : t[e];
                                return r === pi && (null == t || $e(e, t) || (r = null == (t = 1 == (e = Ke(e)).length ? t : Rt(t, Vt(e, 0, -1))) ? pi : t[un(e)]), r = r === pi ? n : r), fr(r) ? r.call(t) : r
                            }, J.round = fi, J.runInContext = t, J.size = function(t) {
                                var e = t ? Re(t) : 0;
                                return Ue(e) ? e : Lr(t).length
                            }, J.snakeCase = Xr, J.some = Un, J.sortedIndex = dn, J.sortedLastIndex = fn, J.startCase = Jr, J.startsWith = function(t, e, n) {
                                return t = Do(t), n = null == n ? 0 : B(n < 0 ? 0 : +n || 0, t.length), t.lastIndexOf(e, n) == n
                            }, J.sum = function(t, e, n) {
                                return n && ze(t, e, n) && (e = pi), 1 == (e = je(e, n, 3)).length ? function(t, e) {
                                    for (var n = t.length, r = 0; n--;) r += +e(t[n]) || 0;
                                    return r
                                }(cr(t) ? t : Je(t), e) : (r = e, i = 0, wt(t, function(t, e, n) {
                                    i += +r(t, e, n) || 0
                                }), i);
                                var r, i
                            }, J.template = function(a, t, e) {
                                var n = J.templateSettings;
                                e && ze(a, t, e) && (t = e = pi), a = Do(a);
                                var s, l, r = dt(ft({}, (t = dt(ft({}, e || t), n, ht)).imports), n.imports, ht),
                                    i = Lr(r),
                                    o = Gt(r, i),
                                    u = 0,
                                    c = t.interpolate || So,
                                    h = "__p += '",
                                    d = y((t.escape || So).source + "|" + c.source + "|" + (c === uo ? yo : So).source + "|" + (t.evaluate || So).source + "|$", "g"),
                                    f = "//# sourceURL=" + ("sourceURL" in t ? t.sourceURL : "lodash.templateSources[" + ++Eo + "]") + "\n";
                                a.replace(d, function(t, e, n, r, i, o) {
                                    return n || (n = r), h += a.slice(u, o).replace(Co, Vo), e && (s = !0, h += "' +\n__e(" + e + ") +\n'"), i && (l = !0, h += "';\n" + i + ";\n__p += '"), n && (h += "' +\n((__t = (" + n + ")) == null ? '' : __t) +\n'"), u = o + t.length, t
                                }), h += "';\n";
                                var p = t.variable;
                                p || (h = "with (obj) {\n" + h + "\n}\n"), h = (l ? h.replace(to, "") : h).replace(eo, "$1").replace(no, "$1;"), h = "function(" + (p || "obj") + ") {\n" + (p ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (s ? ", __e = _.escape" : "") + (l ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + h + "return __p\n}";
                                var g = Zr(function() {
                                    return v(i, f + "return " + h).apply(pi, o)
                                });
                                if (g.source = h, dr(g)) throw g;
                                return g
                            }, J.trim = Qr, J.trimLeft = function(t, e, n) {
                                var r = t;
                                return (t = Do(t)) ? (n ? ze(r, e, n) : null == e) ? t.slice(Yo(t)) : t.slice(Fo(t, e + "")) : t
                            }, J.trimRight = function(t, e, n) {
                                var r = t;
                                return (t = Do(t)) ? (n ? ze(r, e, n) : null == e) ? t.slice(0, Go(t) + 1) : t.slice(0, Bo(t, e + "") + 1) : t
                            }, J.trunc = function(t, e, n) {
                                n && ze(t, e, n) && (e = pi);
                                var r = Ci,
                                    i = Ti;
                                if (null != e)
                                    if (pr(e)) {
                                        var o = "separator" in e ? e.separator : o;
                                        r = "length" in e ? +e.length || 0 : r, i = "omission" in e ? Do(e.omission) : i
                                    } else r = +e || 0;
                                if (r >= (t = Do(t)).length) return t;
                                var a = r - i.length;
                                if (a < 1) return i;
                                var s = t.slice(0, a);
                                if (null == o) return s + i;
                                if (yr(o)) {
                                    if (t.slice(a).search(o)) {
                                        var l, u, c = t.slice(0, a);
                                        for (o.global || (o = y(o.source, (bo.exec(o) || "") + "g")), o.lastIndex = 0; l = o.exec(c);) u = l.index;
                                        s = s.slice(0, null == u ? a : u)
                                    }
                                } else if (t.indexOf(o, a) != a) {
                                    var h = s.lastIndexOf(o); - 1 < h && (s = s.slice(0, h))
                                }
                                return s + i
                            }, J.unescape = function(t) {
                                return (t = Do(t)) && oo.test(t) ? t.replace(ro, Xo) : t
                            }, J.uniqueId = function(t) {
                                var e = ++h;
                                return Do(t) + e
                            }, J.words = Kr, J.all = An, J.any = Un, J.contains = On, J.eq = hr, J.detect = jn, J.foldl = zn, J.foldr = $n, J.head = an, J.include = On, J.inject = zn, oi(J, (li = {}, Pt(J, function(t, e) {
                                J.prototype[e] || (li[e] = t)
                            }), li), !1), J.sample = Nn, J.prototype.sample = function(e) {
                                return this.__chain__ || null != e ? this.thru(function(t) {
                                    return Nn(t, e)
                                }) : Nn(this.value())
                            }, J.VERSION = gi, it(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
                                J[t].placeholder = J
                            }), it(["drop", "take"], function(r, i) {
                                Z.prototype[r] = function(t) {
                                    var e = this.__filtered__;
                                    if (e && !i) return new Z(this);
                                    t = null == t ? 1 : F(R(t) || 0, 0);
                                    var n = this.clone();
                                    return e ? n.__takeCount__ = B(n.__takeCount__, t) : n.__views__.push({
                                        size: t,
                                        type: r + (n.__dir__ < 0 ? "Right" : "")
                                    }), n
                                }, Z.prototype[r + "Right"] = function(t) {
                                    return this.reverse()[r](t).reverse()
                                }
                            }), it(["filter", "map", "takeWhile"], function(t, e) {
                                var r = e + 1,
                                    i = r != Mi;
                                Z.prototype[t] = function(t, e) {
                                    var n = this.clone();
                                    return n.__iteratees__.push({
                                        iteratee: je(t, e, 1),
                                        type: r
                                    }), n.__filtered__ = n.__filtered__ || i, n
                                }
                            }), it(["first", "last"], function(t, e) {
                                var n = "take" + (e ? "Right" : "");
                                Z.prototype[t] = function() {
                                    return this[n](1).value()[0]
                                }
                            }), it(["initial", "rest"], function(t, e) {
                                var n = "drop" + (e ? "" : "Right");
                                Z.prototype[t] = function() {
                                    return this.__filtered__ ? new Z(this) : this[n](1)
                                }
                            }), it(["pluck", "where"], function(t, e) {
                                var n = e ? "filter" : "map",
                                    r = e ? Ft : si;
                                Z.prototype[t] = function(t) {
                                    return this[n](r(t))
                                }
                            }), Z.prototype.compact = function() {
                                return this.filter(ei)
                            }, Z.prototype.reject = function(e, t) {
                                return e = je(e, t, 1), this.filter(function(t) {
                                    return !e(t)
                                })
                            }, Z.prototype.slice = function(t, e) {
                                t = null == t ? 0 : +t || 0;
                                var n = this;
                                return n.__filtered__ && (0 < t || e < 0) ? new Z(n) : (t < 0 ? n = n.takeRight(-t) : t && (n = n.drop(t)), e !== pi && (n = (e = +e || 0) < 0 ? n.dropRight(-e) : n.take(e - t)), n)
                            }, Z.prototype.takeRightWhile = function(t, e) {
                                return this.reverse().takeWhile(t, e).reverse()
                            }, Z.prototype.toArray = function() {
                                return this.take(V)
                            }, Pt(Z.prototype, function(h, t) {
                                var d = /^(?:filter|map|reject)|While$/.test(t),
                                    f = /^(?:first|last)$/.test(t),
                                    p = J[f ? "take" + ("last" == t ? "Right" : "") : t];
                                p && (J.prototype[t] = function() {
                                    var e = f ? [1] : arguments,
                                        n = this.__chain__,
                                        t = this.__wrapped__,
                                        r = !!this.__actions__.length,
                                        i = t instanceof Z,
                                        o = e[0],
                                        a = i || cr(t);
                                    a && d && "function" == typeof o && 1 != o.length && (i = a = !1);
                                    var s = function(t) {
                                            return f && n ? p(t, 1)[0] : p.apply(pi, lt([t], e))
                                        },
                                        l = {
                                            func: kn,
                                            args: [s],
                                            thisArg: pi
                                        },
                                        u = i && !r;
                                    if (f && !n) return u ? ((t = t.clone()).__actions__.push(l), h.call(t)) : p.call(pi, this.value())[0];
                                    if (!f && a) {
                                        t = u ? t : new Z(this);
                                        var c = h.apply(t, e);
                                        return c.__actions__.push(l), new K(c, n)
                                    }
                                    return this.thru(s)
                                })
                            }), it(["join", "pop", "push", "replace", "shift", "sort", "splice", "split", "unshift"], function(t) {
                                var n = (/^(?:replace|split)$/.test(t) ? u : s)[t],
                                    r = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
                                    i = /^(?:join|pop|replace|shift)$/.test(t);
                                J.prototype[t] = function() {
                                    var e = arguments;
                                    return i && !this.__chain__ ? n.apply(this.value(), e) : this[r](function(t) {
                                        return n.apply(t, e)
                                    })
                                }
                            }), Pt(Z.prototype, function(t, e) {
                                var n = J[e];
                                if (n) {
                                    var r = n.name;
                                    (X[r] || (X[r] = [])).push({
                                        name: e,
                                        func: n
                                    })
                                }
                            }), X[Se(pi, mi).name] = [{
                                name: "wrapper",
                                func: pi
                            }], Z.prototype.clone = function() {
                                var t = new Z(this.__wrapped__);
                                return t.__actions__ = rt(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = rt(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = rt(this.__views__), t
                            }, Z.prototype.reverse = function() {
                                if (this.__filtered__) {
                                    var t = new Z(this);
                                    t.__dir__ = -1, t.__filtered__ = !0
                                } else(t = this.clone()).__dir__ *= -1;
                                return t
                            }, Z.prototype.value = function() {
                                var t = this.__wrapped__.value(),
                                    e = this.__dir__,
                                    n = cr(t),
                                    r = e < 0,
                                    i = n ? t.length : 0,
                                    o = function(t, e, n) {
                                        for (var r = -1, i = n.length; ++r < i;) {
                                            var o = n[r],
                                                a = o.size;
                                            switch (o.type) {
                                                case "drop":
                                                    t += a;
                                                    break;
                                                case "dropRight":
                                                    e -= a;
                                                    break;
                                                case "take":
                                                    e = B(e, t + a);
                                                    break;
                                                case "takeRight":
                                                    t = F(t, e - a)
                                            }
                                        }
                                        return {
                                            start: t,
                                            end: e
                                        }
                                    }(0, i, this.__views__),
                                    a = o.start,
                                    s = o.end,
                                    l = s - a,
                                    u = r ? s : a - 1,
                                    c = this.__iteratees__,
                                    h = c.length,
                                    d = 0,
                                    f = B(l, this.__takeCount__);
                                if (!n || i < ji || i == l && f == l) return Jt(r && n ? t.reverse() : t, this.__actions__);
                                var p = [];
                                t: for (; l-- && d < f;) {
                                    for (var g = -1, v = t[u += e]; ++g < h;) {
                                        var m = c[g],
                                            y = m.iteratee,
                                            b = m.type,
                                            _ = y(v);
                                        if (b == Mi) v = _;
                                        else if (!_) {
                                            if (b == Pi) continue t;
                                            break t
                                        }
                                    }
                                    p[d++] = v
                                }
                                return p
                            }, J.prototype.chain = function() {
                                return xn(this)
                            }, J.prototype.commit = function() {
                                return new K(this.value(), this.__chain__)
                            }, J.prototype.concat = Sn, J.prototype.plant = function(t) {
                                for (var e, n = this; n instanceof Q;) {
                                    var r = Ze(n);
                                    e ? i.__wrapped__ = r : e = r;
                                    var i = r;
                                    n = n.__wrapped__
                                }
                                return i.__wrapped__ = t, e
                            }, J.prototype.reverse = function() {
                                var t = this.__wrapped__,
                                    e = function(t) {
                                        return n && n.__dir__ < 0 ? t : t.reverse()
                                    };
                                if (t instanceof Z) {
                                    var n = t;
                                    return this.__actions__.length && (n = new Z(this)), (n = n.reverse()).__actions__.push({
                                        func: kn,
                                        args: [e],
                                        thisArg: pi
                                    }), new K(n, this.__chain__)
                                }
                                return this.thru(e)
                            }, J.prototype.toString = function() {
                                return this.value() + ""
                            }, J.prototype.run = J.prototype.toJSON = J.prototype.valueOf = J.prototype.value = function() {
                                return Jt(this.__wrapped__, this.__actions__)
                            }, J.prototype.collect = J.prototype.map, J.prototype.head = J.prototype.first, J.prototype.select = J.prototype.filter, J.prototype.tail = J.prototype.rest, J
                        }();
                        "function" == typeof L && "object" == typeof L.amd && L.amd ? (Mo._ = Jo, L(function() {
                            return Jo
                        })) : h && d ? v ? (d.exports = Jo)._ = Jo : h._ = Jo : Mo._ = Jo
                    }).call(this)
                }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {}],
            64: [function(t, e, n) {
                n.endianness = function() {
                    return "LE"
                }, n.hostname = function() {
                    return "undefined" != typeof location ? location.hostname : ""
                }, n.loadavg = function() {
                    return []
                }, n.uptime = function() {
                    return 0
                }, n.freemem = function() {
                    return Number.MAX_VALUE
                }, n.totalmem = function() {
                    return Number.MAX_VALUE
                }, n.cpus = function() {
                    return []
                }, n.type = function() {
                    return "Browser"
                }, n.release = function() {
                    return "undefined" != typeof navigator ? navigator.appVersion : ""
                }, n.networkInterfaces = n.getNetworkInterfaces = function() {
                    return {}
                }, n.arch = function() {
                    return "javascript"
                }, n.platform = function() {
                    return "browser"
                }, n.tmpdir = n.tmpDir = function() {
                    return "/tmp"
                }, n.EOL = "\n"
            }, {}],
            65: [function(t, e, n) {
                var r = e.exports = {},
                    i = [],
                    o = !1;

                function a() {
                    if (!o) {
                        var t;
                        o = !0;
                        for (var e = i.length; e;) {
                            t = i, i = [];
                            for (var n = -1; ++n < e;) t[n]();
                            e = i.length
                        }
                        o = !1
                    }
                }

                function s() {}
                r.nextTick = function(t) {
                    i.push(t), o || setTimeout(a, 0)
                }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = s, r.addListener = s, r.once = s, r.off = s, r.removeListener = s, r.removeAllListeners = s, r.emit = s, r.binding = function(t) {
                    throw new Error("process.binding is not supported")
                }, r.cwd = function() {
                    return "/"
                }, r.chdir = function(t) {
                    throw new Error("process.chdir is not supported")
                }, r.umask = function() {
                    return 0
                }
            }, {}],
            66: [function(t, I, R) {
                (function(M) {
                    ! function(t) {
                        var e = "object" == typeof R && R,
                            n = "object" == typeof I && I && I.exports == e && I,
                            r = "object" == typeof M && M;
                        r.global !== r && r.window !== r || (t = r);
                        var i, o, m = 2147483647,
                            y = 36,
                            b = 1,
                            _ = 26,
                            a = 38,
                            s = 700,
                            w = 72,
                            x = 128,
                            k = "-",
                            l = /^xn--/,
                            u = /[^ -~]/,
                            c = /\x2E|\u3002|\uFF0E|\uFF61/g,
                            h = {
                                overflow: "Overflow: input needs wider integers to process",
                                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                                "invalid-input": "Invalid input"
                            },
                            d = y - b,
                            S = Math.floor,
                            C = String.fromCharCode;

                        function T(t) {
                            throw RangeError(h[t])
                        }

                        function f(t, e) {
                            for (var n = t.length; n--;) t[n] = e(t[n]);
                            return t
                        }

                        function p(t, e) {
                            return f(t.split(c), e).join(".")
                        }

                        function A(t) {
                            for (var e, n, r = [], i = 0, o = t.length; i < o;) 55296 <= (e = t.charCodeAt(i++)) && e <= 56319 && i < o ? 56320 == (64512 & (n = t.charCodeAt(i++))) ? r.push(((1023 & e) << 10) + (1023 & n) + 65536) : (r.push(e), i--) : r.push(e);
                            return r
                        }

                        function E(t) {
                            return f(t, function(t) {
                                var e = "";
                                return 65535 < t && (e += C((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += C(t)
                            }).join("")
                        }

                        function j(t, e) {
                            return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
                        }

                        function P(t, e, n) {
                            var r = 0;
                            for (t = n ? S(t / s) : t >> 1, t += S(t / e); d * _ >> 1 < t; r += y) t = S(t / d);
                            return S(r + (d + 1) * t / (t + a))
                        }

                        function g(t) {
                            var e, n, r, i, o, a, s, l, u, c, h, d = [],
                                f = t.length,
                                p = 0,
                                g = x,
                                v = w;
                            for ((n = t.lastIndexOf(k)) < 0 && (n = 0), r = 0; r < n; ++r) 128 <= t.charCodeAt(r) && T("not-basic"), d.push(t.charCodeAt(r));
                            for (i = 0 < n ? n + 1 : 0; i < f;) {
                                for (o = p, a = 1, s = y; f <= i && T("invalid-input"), h = t.charCodeAt(i++), (y <= (l = h - 48 < 10 ? h - 22 : h - 65 < 26 ? h - 65 : h - 97 < 26 ? h - 97 : y) || l > S((m - p) / a)) && T("overflow"), p += l * a, !(l < (u = s <= v ? b : v + _ <= s ? _ : s - v)); s += y) a > S(m / (c = y - u)) && T("overflow"), a *= c;
                                v = P(p - o, e = d.length + 1, 0 == o), S(p / e) > m - g && T("overflow"), g += S(p / e), p %= e, d.splice(p++, 0, g)
                            }
                            return E(d)
                        }

                        function v(t) {
                            var e, n, r, i, o, a, s, l, u, c, h, d, f, p, g, v = [];
                            for (d = (t = A(t)).length, e = x, o = w, a = n = 0; a < d; ++a)(h = t[a]) < 128 && v.push(C(h));
                            for (r = i = v.length, i && v.push(k); r < d;) {
                                for (s = m, a = 0; a < d; ++a) e <= (h = t[a]) && h < s && (s = h);
                                for (s - e > S((m - n) / (f = r + 1)) && T("overflow"), n += (s - e) * f, e = s, a = 0; a < d; ++a)
                                    if ((h = t[a]) < e && ++n > m && T("overflow"), h == e) {
                                        for (l = n, u = y; !(l < (c = u <= o ? b : o + _ <= u ? _ : u - o)); u += y) g = l - c, p = y - c, v.push(C(j(c + g % p, 0))), l = S(g / p);
                                        v.push(C(j(l, 0))), o = P(n, f, r == i), n = 0, ++r
                                    }++n, ++e
                            }
                            return v.join("")
                        }
                        if (i = {
                                version: "1.2.4",
                                ucs2: {
                                    decode: A,
                                    encode: E
                                },
                                decode: g,
                                encode: v,
                                toASCII: function(t) {
                                    return p(t, function(t) {
                                        return u.test(t) ? "xn--" + v(t) : t
                                    })
                                },
                                toUnicode: function(t) {
                                    return p(t, function(t) {
                                        return l.test(t) ? g(t.slice(4).toLowerCase()) : t
                                    })
                                }
                            }, "function" == typeof L && "object" == typeof L.amd && L.amd) L("punycode", function() {
                            return i
                        });
                        else if (e && !e.nodeType)
                            if (n) n.exports = i;
                            else
                                for (o in i) i.hasOwnProperty(o) && (e[o] = i[o]);
                        else t.punycode = i
                    }(this)
                }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {}],
            67: [function(t, e, n) {
                "use strict";
                e.exports = function(t, e, n, r) {
                    e = e || "&", n = n || "=";
                    var i = {};
                    if ("string" != typeof t || 0 === t.length) return i;
                    var o = /\+/g;
                    t = t.split(e);
                    var a = 1e3;
                    r && "number" == typeof r.maxKeys && (a = r.maxKeys);
                    var s, l, u = t.length;
                    0 < a && a < u && (u = a);
                    for (var c = 0; c < u; ++c) {
                        var h, d, f, p, g = t[c].replace(o, "%20"),
                            v = g.indexOf(n);
                        0 <= v ? (h = g.substr(0, v), d = g.substr(v + 1)) : (h = g, d = ""), f = decodeURIComponent(h), p = decodeURIComponent(d), s = i, l = f, Object.prototype.hasOwnProperty.call(s, l) ? m(i[f]) ? i[f].push(p) : i[f] = [i[f], p] : i[f] = p
                    }
                    return i
                };
                var m = Array.isArray || function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                }
            }, {}],
            68: [function(t, e, n) {
                "use strict";
                var o = function(t) {
                    switch (typeof t) {
                        case "string":
                            return t;
                        case "boolean":
                            return t ? "true" : "false";
                        case "number":
                            return isFinite(t) ? t : "";
                        default:
                            return ""
                    }
                };
                e.exports = function(n, r, i, t) {
                    return r = r || "&", i = i || "=", null === n && (n = void 0), "object" == typeof n ? s(l(n), function(t) {
                        var e = encodeURIComponent(o(t)) + i;
                        return a(n[t]) ? s(n[t], function(t) {
                            return e + encodeURIComponent(o(t))
                        }).join(r) : e + encodeURIComponent(o(n[t]))
                    }).join(r) : t ? encodeURIComponent(o(t)) + i + encodeURIComponent(o(n)) : ""
                };
                var a = Array.isArray || function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                };

                function s(t, e) {
                    if (t.map) return t.map(e);
                    for (var n = [], r = 0; r < t.length; r++) n.push(e(t[r], r));
                    return n
                }
                var l = Object.keys || function(t) {
                    var e = [];
                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.push(n);
                    return e
                }
            }, {}],
            69: [function(t, e, n) {
                "use strict";
                n.decode = n.parse = t("./decode"), n.encode = n.stringify = t("./encode")
            }, {
                "./decode": 67,
                "./encode": 68
            }],
            70: [function(t, e, n) {
                e.exports = r;
                var c = t("events").EventEmitter;

                function r() {
                    c.call(this)
                }
                t("inherits")(r, c), r.Readable = t("readable-stream/readable.js"), r.Writable = t("readable-stream/writable.js"), r.Duplex = t("readable-stream/duplex.js"), r.Transform = t("readable-stream/transform.js"), r.PassThrough = t("readable-stream/passthrough.js"), (r.Stream = r).prototype.pipe = function(e, t) {
                    var n = this;

                    function r(t) {
                        e.writable && !1 === e.write(t) && n.pause && n.pause()
                    }

                    function i() {
                        n.readable && n.resume && n.resume()
                    }
                    n.on("data", r), e.on("drain", i), e._isStdio || t && !1 === t.end || (n.on("end", a), n.on("close", s));
                    var o = !1;

                    function a() {
                        o || (o = !0, e.end())
                    }

                    function s() {
                        o || (o = !0, "function" == typeof e.destroy && e.destroy())
                    }

                    function l(t) {
                        if (u(), 0 === c.listenerCount(this, "error")) throw t
                    }

                    function u() {
                        n.removeListener("data", r), e.removeListener("drain", i), n.removeListener("end", a), n.removeListener("close", s), n.removeListener("error", l), e.removeListener("error", l), n.removeListener("end", u), n.removeListener("close", u), e.removeListener("close", u)
                    }
                    return n.on("error", l), e.on("error", l), n.on("end", u), n.on("close", u), e.on("close", u), e.emit("pipe", n), e
                }
            }, {
                events: 57,
                inherits: 59,
                "readable-stream/duplex.js": 71,
                "readable-stream/passthrough.js": 77,
                "readable-stream/readable.js": 78,
                "readable-stream/transform.js": 79,
                "readable-stream/writable.js": 80
            }],
            71: [function(t, e, n) {
                e.exports = t("./lib/_stream_duplex.js")
            }, {
                "./lib/_stream_duplex.js": 72
            }],
            72: [function(s, l, t) {
                (function(t) {
                    l.exports = o;
                    var e = Object.keys || function(t) {
                            var e = [];
                            for (var n in t) e.push(n);
                            return e
                        },
                        n = s("core-util-is");
                    n.inherits = s("inherits");
                    var r = s("./_stream_readable"),
                        i = s("./_stream_writable");

                    function o(t) {
                        if (!(this instanceof o)) return new o(t);
                        r.call(this, t), i.call(this, t), t && !1 === t.readable && (this.readable = !1), t && !1 === t.writable && (this.writable = !1), this.allowHalfOpen = !0, t && !1 === t.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", a)
                    }

                    function a() {
                        this.allowHalfOpen || this._writableState.ended || t.nextTick(this.end.bind(this))
                    }
                    n.inherits(o, r),
                        function(t, e) {
                            for (var n = 0, r = t.length; n < r; n++) e(t[n], n)
                        }(e(i.prototype), function(t) {
                            o.prototype[t] || (o.prototype[t] = i.prototype[t])
                        })
                }).call(this, s("_process"))
            }, {
                "./_stream_readable": 74,
                "./_stream_writable": 76,
                _process: 65,
                "core-util-is": 56,
                inherits: 59
            }],
            73: [function(t, e, n) {
                e.exports = o;
                var r = t("./_stream_transform"),
                    i = t("core-util-is");

                function o(t) {
                    if (!(this instanceof o)) return new o(t);
                    r.call(this, t)
                }
                i.inherits = t("inherits"), i.inherits(o, r), o.prototype._transform = function(t, e, n) {
                    n(null, t)
                }
            }, {
                "./_stream_transform": 75,
                "core-util-is": 56,
                inherits: 59
            }],
            74: [function(p, t, e) {
                (function(g) {
                    t.exports = n;
                    var v = p("isarray"),
                        d = p("buffer").Buffer;
                    n.ReadableState = e;
                    var m = p("events").EventEmitter;
                    m.listenerCount || (m.listenerCount = function(t, e) {
                        return t.listeners(e).length
                    });
                    var o, a = p("stream"),
                        c = p("core-util-is");
                    c.inherits = p("inherits");
                    var y = p("util");

                    function e(t, e) {
                        var n = p("./_stream_duplex"),
                            r = (t = t || {}).highWaterMark,
                            i = t.objectMode ? 16 : 16384;
                        this.highWaterMark = r || 0 === r ? r : i, this.highWaterMark = ~~this.highWaterMark, this.buffer = [], this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.objectMode = !!t.objectMode, e instanceof n && (this.objectMode = this.objectMode || !!t.readableObjectMode), this.defaultEncoding = t.defaultEncoding || "utf8", this.ranOut = !1, this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (o || (o = p("string_decoder/").StringDecoder), this.decoder = new o(t.encoding), this.encoding = t.encoding)
                    }

                    function n(t) {
                        p("./_stream_duplex");
                        if (!(this instanceof n)) return new n(t);
                        this._readableState = new e(t, this), this.readable = !0, a.call(this)
                    }

                    function r(t, e, n, r, i) {
                        var o, a, s, l = function(t, e) {
                            var n = null;
                            c.isBuffer(e) || c.isString(e) || c.isNullOrUndefined(e) || t.objectMode || (n = new TypeError("Invalid non-string/buffer chunk"));
                            return n
                        }(e, n);
                        if (l) t.emit("error", l);
                        else if (c.isNullOrUndefined(n)) e.reading = !1, e.ended || function(t, e) {
                            if (e.decoder && !e.ended) {
                                var n = e.decoder.end();
                                n && n.length && (e.buffer.push(n), e.length += e.objectMode ? 1 : n.length)
                            }
                            e.ended = !0, h(t)
                        }(t, e);
                        else if (e.objectMode || n && 0 < n.length)
                            if (e.ended && !i) {
                                var u = new Error("stream.push() after EOF");
                                t.emit("error", u)
                            } else if (e.endEmitted && i) {
                            u = new Error("stream.unshift() after end event");
                            t.emit("error", u)
                        } else !e.decoder || i || r || (n = e.decoder.write(n)), i || (e.reading = !1), e.flowing && 0 === e.length && !e.sync ? (t.emit("data", n), t.read(0)) : (e.length += e.objectMode ? 1 : n.length, i ? e.buffer.unshift(n) : e.buffer.push(n), e.needReadable && h(t)), o = t, (a = e).readingMore || (a.readingMore = !0, g.nextTick(function() {
                            ! function(t, e) {
                                for (var n = e.length; !e.reading && !e.flowing && !e.ended && e.length < e.highWaterMark && (y("maybeReadMore read 0"), t.read(0), n !== e.length);) n = e.length;
                                e.readingMore = !1
                            }(o, a)
                        }));
                        else i || (e.reading = !1);
                        return !(s = e).ended && (s.needReadable || s.length < s.highWaterMark || 0 === s.length)
                    }
                    y = y && y.debuglog ? y.debuglog("stream") : function() {}, c.inherits(n, a), n.prototype.push = function(t, e) {
                        var n = this._readableState;
                        return c.isString(t) && !n.objectMode && (e = e || n.defaultEncoding) !== n.encoding && (t = new d(t, e), e = ""), r(this, n, t, e, !1)
                    }, n.prototype.unshift = function(t) {
                        return r(this, this._readableState, t, "", !0)
                    }, n.prototype.setEncoding = function(t) {
                        return o || (o = p("string_decoder/").StringDecoder), this._readableState.decoder = new o(t), this._readableState.encoding = t, this
                    };
                    var i = 8388608;

                    function s(t, e) {
                        return 0 === e.length && e.ended ? 0 : e.objectMode ? 0 === t ? 0 : 1 : isNaN(t) || c.isNull(t) ? e.flowing && e.buffer.length ? e.buffer[0].length : e.length : t <= 0 ? 0 : (t > e.highWaterMark && (e.highWaterMark = function(t) {
                            if (i <= t) t = i;
                            else {
                                t--;
                                for (var e = 1; e < 32; e <<= 1) t |= t >> e;
                                t++
                            }
                            return t
                        }(t)), t > e.length ? e.ended ? e.length : (e.needReadable = !0, 0) : t)
                    }

                    function h(t) {
                        var e = t._readableState;
                        e.needReadable = !1, e.emittedReadable || (y("emitReadable", e.flowing), e.emittedReadable = !0, e.sync ? g.nextTick(function() {
                            l(t)
                        }) : l(t))
                    }

                    function l(t) {
                        y("emit readable"), t.emit("readable"), b(t)
                    }

                    function b(t) {
                        var e = t._readableState;
                        if (y("flow", e.flowing), e.flowing)
                            do {
                                var n = t.read()
                            } while (null !== n && e.flowing)
                    }

                    function u(t, e) {
                        var n, r = e.buffer,
                            i = e.length,
                            o = !!e.decoder,
                            a = !!e.objectMode;
                        if (0 === r.length) return null;
                        if (0 === i) n = null;
                        else if (a) n = r.shift();
                        else if (!t || i <= t) n = o ? r.join("") : d.concat(r, i), r.length = 0;
                        else {
                            if (t < r[0].length) n = (c = r[0]).slice(0, t), r[0] = c.slice(t);
                            else if (t === r[0].length) n = r.shift();
                            else {
                                n = o ? "" : new d(t);
                                for (var s = 0, l = 0, u = r.length; l < u && s < t; l++) {
                                    var c = r[0],
                                        h = Math.min(t - s, c.length);
                                    o ? n += c.slice(0, h) : c.copy(n, s, 0, h), h < c.length ? r[0] = c.slice(h) : r.shift(), s += h
                                }
                            }
                        }
                        return n
                    }

                    function f(t) {
                        var e = t._readableState;
                        if (0 < e.length) throw new Error("endReadable called on non-empty stream");
                        e.endEmitted || (e.ended = !0, g.nextTick(function() {
                            e.endEmitted || 0 !== e.length || (e.endEmitted = !0, t.readable = !1, t.emit("end"))
                        }))
                    }
                    n.prototype.read = function(t) {
                        y("read", t);
                        var e = this._readableState,
                            n = t;
                        if ((!c.isNumber(t) || 0 < t) && (e.emittedReadable = !1), 0 === t && e.needReadable && (e.length >= e.highWaterMark || e.ended)) return y("read: emitReadable", e.length, e.ended), 0 === e.length && e.ended ? f(this) : h(this), null;
                        if (0 === (t = s(t, e)) && e.ended) return 0 === e.length && f(this), null;
                        var r, i = e.needReadable;
                        return y("need readable", i), (0 === e.length || e.length - t < e.highWaterMark) && y("length less than watermark", i = !0), (e.ended || e.reading) && y("reading or ended", i = !1), i && (y("do read"), e.reading = !0, e.sync = !0, 0 === e.length && (e.needReadable = !0), this._read(e.highWaterMark), e.sync = !1), i && !e.reading && (t = s(n, e)), r = 0 < t ? u(t, e) : null, c.isNull(r) && (e.needReadable = !0, t = 0), e.length -= t, 0 !== e.length || e.ended || (e.needReadable = !0), n !== t && e.ended && 0 === e.length && f(this), c.isNull(r) || this.emit("data", r), r
                    }, n.prototype._read = function(t) {
                        this.emit("error", new Error("not implemented"))
                    }, n.prototype.pipe = function(e, t) {
                        var n = this,
                            r = this._readableState;
                        switch (r.pipesCount) {
                            case 0:
                                r.pipes = e;
                                break;
                            case 1:
                                r.pipes = [r.pipes, e];
                                break;
                            default:
                                r.pipes.push(e)
                        }
                        r.pipesCount += 1, y("pipe count=%d opts=%j", r.pipesCount, t);
                        var i = (!t || !1 !== t.end) && e !== g.stdout && e !== g.stderr ? a : u;

                        function o(t) {
                            y("onunpipe"), t === n && u()
                        }

                        function a() {
                            y("onend"), e.end()
                        }
                        r.endEmitted ? g.nextTick(i) : n.once("end", i), e.on("unpipe", o);
                        var s, l = (s = n, function() {
                            var t = s._readableState;
                            y("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && m.listenerCount(s, "data") && (t.flowing = !0, b(s))
                        });

                        function u() {
                            y("cleanup"), e.removeListener("close", d), e.removeListener("finish", f), e.removeListener("drain", l), e.removeListener("error", h), e.removeListener("unpipe", o), n.removeListener("end", a), n.removeListener("end", u), n.removeListener("data", c), !r.awaitDrain || e._writableState && !e._writableState.needDrain || l()
                        }

                        function c(t) {
                            y("ondata"), !1 === e.write(t) && (y("false write response, pause", n._readableState.awaitDrain), n._readableState.awaitDrain++, n.pause())
                        }

                        function h(t) {
                            y("onerror", t), p(), e.removeListener("error", h), 0 === m.listenerCount(e, "error") && e.emit("error", t)
                        }

                        function d() {
                            e.removeListener("finish", f), p()
                        }

                        function f() {
                            y("onfinish"), e.removeListener("close", d), p()
                        }

                        function p() {
                            y("unpipe"), n.unpipe(e)
                        }
                        return e.on("drain", l), n.on("data", c), e._events && e._events.error ? v(e._events.error) ? e._events.error.unshift(h) : e._events.error = [h, e._events.error] : e.on("error", h), e.once("close", d), e.once("finish", f), e.emit("pipe", n), r.flowing || (y("pipe resume"), n.resume()), e
                    }, n.prototype.unpipe = function(t) {
                        var e = this._readableState;
                        if (0 === e.pipesCount) return this;
                        if (1 === e.pipesCount) return t && t !== e.pipes || (t || (t = e.pipes), e.pipes = null, e.pipesCount = 0, e.flowing = !1, t && t.emit("unpipe", this)), this;
                        if (!t) {
                            var n = e.pipes,
                                r = e.pipesCount;
                            e.pipes = null, e.pipesCount = 0, e.flowing = !1;
                            for (var i = 0; i < r; i++) n[i].emit("unpipe", this);
                            return this
                        }
                        return -1 === (i = function(t, e) {
                            for (var n = 0, r = t.length; n < r; n++)
                                if (t[n] === e) return n;
                            return -1
                        }(e.pipes, t)) || (e.pipes.splice(i, 1), e.pipesCount -= 1, 1 === e.pipesCount && (e.pipes = e.pipes[0]), t.emit("unpipe", this)), this
                    }, n.prototype.addListener = n.prototype.on = function(t, e) {
                        var n = a.prototype.on.call(this, t, e);
                        if ("data" === t && !1 !== this._readableState.flowing && this.resume(), "readable" === t && this.readable) {
                            var r = this._readableState;
                            if (!r.readableListening)
                                if (r.readableListening = !0, r.emittedReadable = !1, r.needReadable = !0, r.reading) r.length && h(this);
                                else {
                                    var i = this;
                                    g.nextTick(function() {
                                        y("readable nexttick read 0"), i.read(0)
                                    })
                                }
                        }
                        return n
                    }, n.prototype.resume = function() {
                        var n, r, t = this._readableState;
                        return t.flowing || (y("resume"), t.flowing = !0, t.reading || (y("resume read 0"), this.read(0)), n = this, (r = t).resumeScheduled || (r.resumeScheduled = !0, g.nextTick(function() {
                            var t, e;
                            t = n, (e = r).resumeScheduled = !1, t.emit("resume"), b(t), e.flowing && !e.reading && t.read(0)
                        }))), this
                    }, n.prototype.pause = function() {
                        return y("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (y("pause"), this._readableState.flowing = !1, this.emit("pause")), this
                    }, n.prototype.wrap = function(e) {
                        var n = this._readableState,
                            r = !1,
                            i = this;
                        for (var t in e.on("end", function() {
                                if (y("wrapped end"), n.decoder && !n.ended) {
                                    var t = n.decoder.end();
                                    t && t.length && i.push(t)
                                }
                                i.push(null)
                            }), e.on("data", function(t) {
                                (y("wrapped data"), n.decoder && (t = n.decoder.write(t)), t && (n.objectMode || t.length)) && (i.push(t) || (r = !0, e.pause()))
                            }), e) c.isFunction(e[t]) && c.isUndefined(this[t]) && (this[t] = function(t) {
                            return function() {
                                return e[t].apply(e, arguments)
                            }
                        }(t));
                        return function(t, e) {
                            for (var n = 0, r = t.length; n < r; n++) e(t[n], n)
                        }(["error", "close", "destroy", "pause", "resume"], function(t) {
                            e.on(t, i.emit.bind(i, t))
                        }), i._read = function(t) {
                            y("wrapped _read", t), r && (r = !1, e.resume())
                        }, i
                    }, n._fromList = u
                }).call(this, p("_process"))
            }, {
                "./_stream_duplex": 72,
                _process: 65,
                buffer: 55,
                "core-util-is": 56,
                events: 57,
                inherits: 59,
                isarray: 62,
                stream: 70,
                "string_decoder/": 81,
                util: 53
            }],
            75: [function(t, e, n) {
                e.exports = o;
                var r = t("./_stream_duplex"),
                    a = t("core-util-is");

                function i(t, n) {
                    this.afterTransform = function(t, e) {
                        return function(t, e, n) {
                            var r = t._transformState;
                            r.transforming = !1;
                            var i = r.writecb;
                            if (!i) return t.emit("error", new Error("no writecb in Transform class"));
                            r.writechunk = null, r.writecb = null, a.isNullOrUndefined(n) || t.push(n);
                            i && i(e);
                            var o = t._readableState;
                            o.reading = !1, (o.needReadable || o.length < o.highWaterMark) && t._read(o.highWaterMark)
                        }(n, t, e)
                    }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null
                }

                function o(t) {
                    if (!(this instanceof o)) return new o(t);
                    r.call(this, t), this._transformState = new i(t, this);
                    var e = this;
                    this._readableState.needReadable = !0, this._readableState.sync = !1, this.once("prefinish", function() {
                        a.isFunction(this._flush) ? this._flush(function(t) {
                            s(e, t)
                        }) : s(e)
                    })
                }

                function s(t, e) {
                    if (e) return t.emit("error", e);
                    var n = t._writableState,
                        r = t._transformState;
                    if (n.length) throw new Error("calling transform done when ws.length != 0");
                    if (r.transforming) throw new Error("calling transform done when still transforming");
                    return t.push(null)
                }
                a.inherits = t("inherits"), a.inherits(o, r), o.prototype.push = function(t, e) {
                    return this._transformState.needTransform = !1, r.prototype.push.call(this, t, e)
                }, o.prototype._transform = function(t, e, n) {
                    throw new Error("not implemented")
                }, o.prototype._write = function(t, e, n) {
                    var r = this._transformState;
                    if (r.writecb = n, r.writechunk = t, r.writeencoding = e, !r.transforming) {
                        var i = this._readableState;
                        (r.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
                    }
                }, o.prototype._read = function(t) {
                    var e = this._transformState;
                    a.isNull(e.writechunk) || !e.writecb || e.transforming ? e.needTransform = !0 : (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform))
                }
            }, {
                "./_stream_duplex": 72,
                "core-util-is": 56,
                inherits: 59
            }],
            76: [function(g, t, e) {
                (function(l) {
                    t.exports = i;
                    var c = g("buffer").Buffer;
                    i.WritableState = r;
                    var h = g("core-util-is");
                    h.inherits = g("inherits");
                    var n = g("stream");

                    function d(t, e, n) {
                        this.chunk = t, this.encoding = e, this.callback = n
                    }

                    function r(t, e) {
                        var n = g("./_stream_duplex"),
                            r = (t = t || {}).highWaterMark,
                            i = t.objectMode ? 16 : 16384;
                        this.highWaterMark = r || 0 === r ? r : i, this.objectMode = !!t.objectMode, e instanceof n && (this.objectMode = this.objectMode || !!t.writableObjectMode), this.highWaterMark = ~~this.highWaterMark, this.needDrain = !1, this.ending = !1, this.ended = !1;
                        var o = (this.finished = !1) === t.decodeStrings;
                        this.decodeStrings = !o, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(t) {
                            ! function(t, e) {
                                var n = t._writableState,
                                    r = n.sync,
                                    i = n.writecb;
                                if (a = n, a.writing = !1, a.writecb = null, a.length -= a.writelen, a.writelen = 0, e) ! function(t, e, n, r, i) {
                                    n ? l.nextTick(function() {
                                        e.pendingcb--, i(r)
                                    }) : (e.pendingcb--, i(r));
                                    t._writableState.errorEmitted = !0, t.emit("error", r)
                                }(t, n, r, e, i);
                                else {
                                    var o = p(t, n);
                                    o || n.corked || n.bufferProcessing || !n.buffer.length || u(t, n), r ? l.nextTick(function() {
                                        s(t, n, o, i)
                                    }) : s(t, n, o, i)
                                }
                                var a
                            }(e, t)
                        }, this.writecb = null, this.writelen = 0, this.buffer = [], this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1
                    }

                    function i(t) {
                        var e = g("./_stream_duplex");
                        if (!(this instanceof i || this instanceof e)) return new i(t);
                        this._writableState = new r(t, this), this.writable = !0, n.call(this)
                    }

                    function f(t, e, n, r, i, o, a) {
                        e.writelen = r, e.writecb = a, e.writing = !0, e.sync = !0, n ? t._writev(i, e.onwrite) : t._write(i, o, e.onwrite), e.sync = !1
                    }

                    function s(t, e, n, r) {
                        var i, o;
                        n || (i = t, 0 === (o = e).length && o.needDrain && (o.needDrain = !1, i.emit("drain"))), e.pendingcb--, r(), a(t, e)
                    }

                    function u(t, n) {
                        if (n.bufferProcessing = !0, t._writev && 1 < n.buffer.length) {
                            for (var r = [], e = 0; e < n.buffer.length; e++) r.push(n.buffer[e].callback);
                            n.pendingcb++, f(t, n, !0, n.length, n.buffer, "", function(t) {
                                for (var e = 0; e < r.length; e++) n.pendingcb--, r[e](t)
                            }), n.buffer = []
                        } else {
                            for (e = 0; e < n.buffer.length; e++) {
                                var i = n.buffer[e],
                                    o = i.chunk,
                                    a = i.encoding,
                                    s = i.callback,
                                    l = n.objectMode ? 1 : o.length;
                                if (f(t, n, !1, l, o, a, s), n.writing) {
                                    e++;
                                    break
                                }
                            }
                            e < n.buffer.length ? n.buffer = n.buffer.slice(e) : n.buffer.length = 0
                        }
                        n.bufferProcessing = !1
                    }

                    function p(t, e) {
                        return e.ending && 0 === e.length && !e.finished && !e.writing
                    }

                    function o(t, e) {
                        e.prefinished || (e.prefinished = !0, t.emit("prefinish"))
                    }

                    function a(t, e) {
                        var n = p(0, e);
                        return n && (0 === e.pendingcb ? (o(t, e), e.finished = !0, t.emit("finish")) : o(t, e)), n
                    }
                    h.inherits(i, n), i.prototype.pipe = function() {
                        this.emit("error", new Error("Cannot pipe. Not readable."))
                    }, i.prototype.write = function(t, e, n) {
                        var r, i, o, a = this._writableState,
                            s = !1;
                        return h.isFunction(e) && (n = e, e = null), h.isBuffer(t) ? e = "buffer" : e || (e = a.defaultEncoding), h.isFunction(n) || (n = function() {}), a.ended ? (r = this, i = n, o = new Error("write after end"), r.emit("error", o), l.nextTick(function() {
                            i(o)
                        })) : function(t, e, n, r) {
                            var i = !0;
                            if (!(h.isBuffer(n) || h.isString(n) || h.isNullOrUndefined(n) || e.objectMode)) {
                                var o = new TypeError("Invalid non-string/buffer chunk");
                                t.emit("error", o), l.nextTick(function() {
                                    r(o)
                                }), i = !1
                            }
                            return i
                        }(this, a, t, n) && (a.pendingcb++, s = function(t, e, n, r, i) {
                            o = e, a = n, s = r, !o.objectMode && !1 !== o.decodeStrings && h.isString(a) && (a = new c(a, s)), n = a, h.isBuffer(n) && (r = "buffer");
                            var o, a, s;
                            var l = e.objectMode ? 1 : n.length;
                            e.length += l;
                            var u = e.length < e.highWaterMark;
                            u || (e.needDrain = !0);
                            e.writing || e.corked ? e.buffer.push(new d(n, r, i)) : f(t, e, !1, l, n, r, i);
                            return u
                        }(this, a, t, e, n)), s
                    }, i.prototype.cork = function() {
                        this._writableState.corked++
                    }, i.prototype.uncork = function() {
                        var t = this._writableState;
                        t.corked && (t.corked--, t.writing || t.corked || t.finished || t.bufferProcessing || !t.buffer.length || u(this, t))
                    }, i.prototype._write = function(t, e, n) {
                        n(new Error("not implemented"))
                    }, i.prototype._writev = null, i.prototype.end = function(t, e, n) {
                        var r = this._writableState;
                        h.isFunction(t) ? (n = t, e = t = null) : h.isFunction(e) && (n = e, e = null), h.isNullOrUndefined(t) || this.write(t, e), r.corked && (r.corked = 1, this.uncork()), r.ending || r.finished || function(t, e, n) {
                            e.ending = !0, a(t, e), n && (e.finished ? l.nextTick(n) : t.once("finish", n));
                            e.ended = !0
                        }(this, r, n)
                    }
                }).call(this, g("_process"))
            }, {
                "./_stream_duplex": 72,
                _process: 65,
                buffer: 55,
                "core-util-is": 56,
                inherits: 59,
                stream: 70
            }],
            77: [function(t, e, n) {
                e.exports = t("./lib/_stream_passthrough.js")
            }, {
                "./lib/_stream_passthrough.js": 73
            }],
            78: [function(t, e, n) {
                (n = e.exports = t("./lib/_stream_readable.js")).Stream = t("stream"), (n.Readable = n).Writable = t("./lib/_stream_writable.js"), n.Duplex = t("./lib/_stream_duplex.js"), n.Transform = t("./lib/_stream_transform.js"), n.PassThrough = t("./lib/_stream_passthrough.js")
            }, {
                "./lib/_stream_duplex.js": 72,
                "./lib/_stream_passthrough.js": 73,
                "./lib/_stream_readable.js": 74,
                "./lib/_stream_transform.js": 75,
                "./lib/_stream_writable.js": 76,
                stream: 70
            }],
            79: [function(t, e, n) {
                e.exports = t("./lib/_stream_transform.js")
            }, {
                "./lib/_stream_transform.js": 75
            }],
            80: [function(t, e, n) {
                e.exports = t("./lib/_stream_writable.js")
            }, {
                "./lib/_stream_writable.js": 76
            }],
            81: [function(t, e, n) {
                var r = t("buffer").Buffer,
                    i = r.isEncoding || function(t) {
                        switch (t && t.toLowerCase()) {
                            case "hex":
                            case "utf8":
                            case "utf-8":
                            case "ascii":
                            case "binary":
                            case "base64":
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                            case "raw":
                                return !0;
                            default:
                                return !1
                        }
                    };
                var o = n.StringDecoder = function(t) {
                    switch (this.encoding = (t || "utf8").toLowerCase().replace(/[-_]/, ""), function(t) {
                        if (t && !i(t)) throw new Error("Unknown encoding: " + t)
                    }(t), this.encoding) {
                        case "utf8":
                            this.surrogateSize = 3;
                            break;
                        case "ucs2":
                        case "utf16le":
                            this.surrogateSize = 2, this.detectIncompleteChar = s;
                            break;
                        case "base64":
                            this.surrogateSize = 3, this.detectIncompleteChar = l;
                            break;
                        default:
                            return void(this.write = a)
                    }
                    this.charBuffer = new r(6), this.charReceived = 0, this.charLength = 0
                };

                function a(t) {
                    return t.toString(this.encoding)
                }

                function s(t) {
                    this.charReceived = t.length % 2, this.charLength = this.charReceived ? 2 : 0
                }

                function l(t) {
                    this.charReceived = t.length % 3, this.charLength = this.charReceived ? 3 : 0
                }
                o.prototype.write = function(t) {
                    for (var e = ""; this.charLength;) {
                        var n = t.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : t.length;
                        if (t.copy(this.charBuffer, this.charReceived, 0, n), this.charReceived += n, this.charReceived < this.charLength) return "";
                        if (t = t.slice(n, t.length), !(55296 <= (i = (e = this.charBuffer.slice(0, this.charLength).toString(this.encoding)).charCodeAt(e.length - 1)) && i <= 56319)) {
                            if (this.charReceived = this.charLength = 0, 0 === t.length) return e;
                            break
                        }
                        this.charLength += this.surrogateSize, e = ""
                    }
                    this.detectIncompleteChar(t);
                    var r = t.length;
                    this.charLength && (t.copy(this.charBuffer, 0, t.length - this.charReceived, r), r -= this.charReceived);
                    var i;
                    r = (e += t.toString(this.encoding, 0, r)).length - 1;
                    if (55296 <= (i = e.charCodeAt(r)) && i <= 56319) {
                        var o = this.surrogateSize;
                        return this.charLength += o, this.charReceived += o, this.charBuffer.copy(this.charBuffer, o, 0, o), t.copy(this.charBuffer, 0, 0, o), e.substring(0, r)
                    }
                    return e
                }, o.prototype.detectIncompleteChar = function(t) {
                    for (var e = 3 <= t.length ? 3 : t.length; 0 < e; e--) {
                        var n = t[t.length - e];
                        if (1 == e && n >> 5 == 6) {
                            this.charLength = 2;
                            break
                        }
                        if (e <= 2 && n >> 4 == 14) {
                            this.charLength = 3;
                            break
                        }
                        if (e <= 3 && n >> 3 == 30) {
                            this.charLength = 4;
                            break
                        }
                    }
                    this.charReceived = e
                }, o.prototype.end = function(t) {
                    var e = "";
                    if (t && t.length && (e = this.write(t)), this.charReceived) {
                        var n = this.charReceived,
                            r = this.charBuffer,
                            i = this.encoding;
                        e += r.slice(0, n).toString(i)
                    }
                    return e
                }
            }, {
                buffer: 55
            }],
            82: [function(t, e, n) {
                var M = t("punycode");

                function y() {
                    this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
                }
                n.parse = o, n.resolve = function(t, e) {
                    return o(t, !1, !0).resolve(e)
                }, n.resolveObject = function(t, e) {
                    return t ? o(t, !1, !0).resolveObject(e) : e
                }, n.format = function(t) {
                    U(t) && (t = o(t));
                    return t instanceof y ? t.format() : y.prototype.format.call(t)
                }, n.Url = y;
                var I = /^([a-z0-9.+-]+:)/i,
                    r = /:[0-9]*$/,
                    i = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]),
                    R = ["'"].concat(i),
                    O = ["%", "/", "?", ";", "#"].concat(R),
                    L = ["/", "?", "#"],
                    D = /^[a-z0-9A-Z_-]{0,63}$/,
                    F = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
                    B = {
                        javascript: !0,
                        "javascript:": !0
                    },
                    z = {
                        javascript: !0,
                        "javascript:": !0
                    },
                    $ = {
                        http: !0,
                        https: !0,
                        ftp: !0,
                        gopher: !0,
                        file: !0,
                        "http:": !0,
                        "https:": !0,
                        "ftp:": !0,
                        "gopher:": !0,
                        "file:": !0
                    },
                    N = t("querystring");

                function o(t, e, n) {
                    if (t && s(t) && t instanceof y) return t;
                    var r = new y;
                    return r.parse(t, e, n), r
                }

                function U(t) {
                    return "string" == typeof t
                }

                function s(t) {
                    return "object" == typeof t && null !== t
                }

                function b(t) {
                    return null === t
                }
                y.prototype.parse = function(t, e, n) {
                    if (!U(t)) throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
                    var r = t;
                    r = r.trim();
                    var i = I.exec(r);
                    if (i) {
                        var o = (i = i[0]).toLowerCase();
                        this.protocol = o, r = r.substr(i.length)
                    }
                    if (n || i || r.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                        var a = "//" === r.substr(0, 2);
                        !a || i && z[i] || (r = r.substr(2), this.slashes = !0)
                    }
                    if (!z[i] && (a || i && !$[i])) {
                        for (var s, l, u = -1, c = 0; c < L.length; c++) {
                            -1 !== (h = r.indexOf(L[c])) && (-1 === u || h < u) && (u = h)
                        } - 1 !== (l = -1 === u ? r.lastIndexOf("@") : r.lastIndexOf("@", u)) && (s = r.slice(0, l), r = r.slice(l + 1), this.auth = decodeURIComponent(s)), u = -1;
                        for (c = 0; c < O.length; c++) {
                            var h; - 1 !== (h = r.indexOf(O[c])) && (-1 === u || h < u) && (u = h)
                        } - 1 === u && (u = r.length), this.host = r.slice(0, u), r = r.slice(u), this.parseHost(), this.hostname = this.hostname || "";
                        var d = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                        if (!d)
                            for (var f = this.hostname.split(/\./), p = (c = 0, f.length); c < p; c++) {
                                var g = f[c];
                                if (g && !g.match(D)) {
                                    for (var v = "", m = 0, y = g.length; m < y; m++) 127 < g.charCodeAt(m) ? v += "x" : v += g[m];
                                    if (!v.match(D)) {
                                        var b = f.slice(0, c),
                                            _ = f.slice(c + 1),
                                            w = g.match(F);
                                        w && (b.push(w[1]), _.unshift(w[2])), _.length && (r = "/" + _.join(".") + r), this.hostname = b.join(".");
                                        break
                                    }
                                }
                            }
                        if (255 < this.hostname.length ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), !d) {
                            var x = this.hostname.split("."),
                                k = [];
                            for (c = 0; c < x.length; ++c) {
                                var S = x[c];
                                k.push(S.match(/[^A-Za-z0-9_-]/) ? "xn--" + M.encode(S) : S)
                            }
                            this.hostname = k.join(".")
                        }
                        var C = this.port ? ":" + this.port : "",
                            T = this.hostname || "";
                        this.host = T + C, this.href += this.host, d && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== r[0] && (r = "/" + r))
                    }
                    if (!B[o])
                        for (c = 0, p = R.length; c < p; c++) {
                            var A = R[c],
                                E = encodeURIComponent(A);
                            E === A && (E = escape(A)), r = r.split(A).join(E)
                        }
                    var j = r.indexOf("#"); - 1 !== j && (this.hash = r.substr(j), r = r.slice(0, j));
                    var P = r.indexOf("?");
                    if (-1 !== P ? (this.search = r.substr(P), this.query = r.substr(P + 1), e && (this.query = N.parse(this.query)), r = r.slice(0, P)) : e && (this.search = "", this.query = {}), r && (this.pathname = r), $[o] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
                        C = this.pathname || "", S = this.search || "";
                        this.path = C + S
                    }
                    return this.href = this.format(), this
                }, y.prototype.format = function() {
                    var t = this.auth || "";
                    t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"), t += "@");
                    var e = this.protocol || "",
                        n = this.pathname || "",
                        r = this.hash || "",
                        i = !1,
                        o = "";
                    this.host ? i = t + this.host : this.hostname && (i = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (i += ":" + this.port)), this.query && s(this.query) && Object.keys(this.query).length && (o = N.stringify(this.query));
                    var a = this.search || o && "?" + o || "";
                    return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || $[e]) && !1 !== i ? (i = "//" + (i || ""), n && "/" !== n.charAt(0) && (n = "/" + n)) : i || (i = ""), r && "#" !== r.charAt(0) && (r = "#" + r), a && "?" !== a.charAt(0) && (a = "?" + a), e + i + (n = n.replace(/[?#]/g, function(t) {
                        return encodeURIComponent(t)
                    })) + (a = a.replace("#", "%23")) + r
                }, y.prototype.resolve = function(t) {
                    return this.resolveObject(o(t, !1, !0)).format()
                }, y.prototype.resolveObject = function(e) {
                    if (U(e)) {
                        var t = new y;
                        t.parse(e, !1, !0), e = t
                    }
                    var n = new y;
                    if (Object.keys(this).forEach(function(t) {
                            n[t] = this[t]
                        }, this), n.hash = e.hash, "" === e.href) return n.href = n.format(), n;
                    if (e.slashes && !e.protocol) return Object.keys(e).forEach(function(t) {
                        "protocol" !== t && (n[t] = e[t])
                    }), $[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"), n.href = n.format(), n;
                    if (e.protocol && e.protocol !== n.protocol) {
                        if (!$[e.protocol]) return Object.keys(e).forEach(function(t) {
                            n[t] = e[t]
                        }), n.href = n.format(), n;
                        if (n.protocol = e.protocol, e.host || z[e.protocol]) n.pathname = e.pathname;
                        else {
                            for (var r = (e.pathname || "").split("/"); r.length && !(e.host = r.shift()););
                            e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== r[0] && r.unshift(""), r.length < 2 && r.unshift(""), n.pathname = r.join("/")
                        }
                        if (n.search = e.search, n.query = e.query, n.host = e.host || "", n.auth = e.auth, n.hostname = e.hostname || e.host, n.port = e.port, n.pathname || n.search) {
                            var i = n.pathname || "",
                                o = n.search || "";
                            n.path = i + o
                        }
                        return n.slashes = n.slashes || e.slashes, n.href = n.format(), n
                    }
                    var a = n.pathname && "/" === n.pathname.charAt(0),
                        s = e.host || e.pathname && "/" === e.pathname.charAt(0),
                        l = s || a || n.host && e.pathname,
                        u = l,
                        c = n.pathname && n.pathname.split("/") || [],
                        h = (r = e.pathname && e.pathname.split("/") || [], n.protocol && !$[n.protocol]);
                    if (h && (n.hostname = "", n.port = null, n.host && ("" === c[0] ? c[0] = n.host : c.unshift(n.host)), n.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === r[0] ? r[0] = e.host : r.unshift(e.host)), e.host = null), l = l && ("" === r[0] || "" === c[0])), s) n.host = e.host || "" === e.host ? e.host : n.host, n.hostname = e.hostname || "" === e.hostname ? e.hostname : n.hostname, n.search = e.search, n.query = e.query, c = r;
                    else if (r.length) c || (c = []), c.pop(), c = c.concat(r), n.search = e.search, n.query = e.query;
                    else if (null != e.search) {
                        if (h) n.hostname = n.host = c.shift(), (v = !!(n.host && 0 < n.host.indexOf("@")) && n.host.split("@")) && (n.auth = v.shift(), n.host = n.hostname = v.shift());
                        return n.search = e.search, n.query = e.query, b(n.pathname) && b(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), n.href = n.format(), n
                    }
                    if (!c.length) return n.pathname = null, n.search ? n.path = "/" + n.search : n.path = null, n.href = n.format(), n;
                    for (var d = c.slice(-1)[0], f = (n.host || e.host) && ("." === d || ".." === d) || "" === d, p = 0, g = c.length; 0 <= g; g--) "." == (d = c[g]) ? c.splice(g, 1) : ".." === d ? (c.splice(g, 1), p++) : p && (c.splice(g, 1), p--);
                    if (!l && !u)
                        for (; p--; p) c.unshift("..");
                    !l || "" === c[0] || c[0] && "/" === c[0].charAt(0) || c.unshift(""), f && "/" !== c.join("/").substr(-1) && c.push("");
                    var v, m = "" === c[0] || c[0] && "/" === c[0].charAt(0);
                    h && (n.hostname = n.host = m ? "" : c.length ? c.shift() : "", (v = !!(n.host && 0 < n.host.indexOf("@")) && n.host.split("@")) && (n.auth = v.shift(), n.host = n.hostname = v.shift()));
                    return (l = l || n.host && c.length) && !m && c.unshift(""), c.length ? n.pathname = c.join("/") : (n.pathname = null, n.path = null), b(n.pathname) && b(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), n.auth = e.auth || n.auth, n.slashes = n.slashes || e.slashes, n.href = n.format(), n
                }, y.prototype.parseHost = function() {
                    var t = this.host,
                        e = r.exec(t);
                    e && (":" !== (e = e[0]) && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t)
                }
            }, {
                punycode: 66,
                querystring: 69
            }],
            83: [function(t, e, n) {
                e.exports = function(t) {
                    return t && "object" == typeof t && "function" == typeof t.copy && "function" == typeof t.fill && "function" == typeof t.readUInt8
                }
            }, {}],
            84: [function(d, t, A) {
                (function(r, i) {
                    var s = /%[sdj%]/g;
                    A.format = function(t) {
                        if (!_(t)) {
                            for (var e = [], n = 0; n < arguments.length; n++) e.push(l(arguments[n]));
                            return e.join(" ")
                        }
                        n = 1;
                        for (var r = arguments, i = r.length, o = String(t).replace(s, function(t) {
                                if ("%%" === t) return "%";
                                if (i <= n) return t;
                                switch (t) {
                                    case "%s":
                                        return String(r[n++]);
                                    case "%d":
                                        return Number(r[n++]);
                                    case "%j":
                                        try {
                                            return JSON.stringify(r[n++])
                                        } catch (t) {
                                            return "[Circular]"
                                        }
                                    default:
                                        return t
                                }
                            }), a = r[n]; n < i; a = r[++n]) y(a) || !c(a) ? o += " " + a : o += " " + l(a);
                        return o
                    }, A.deprecate = function(t, e) {
                        if (w(i.process)) return function() {
                            return A.deprecate(t, e).apply(this, arguments)
                        };
                        if (!0 === r.noDeprecation) return t;
                        var n = !1;
                        return function() {
                            if (!n) {
                                if (r.throwDeprecation) throw new Error(e);
                                r.traceDeprecation ? console.trace(e) : console.error(e), n = !0
                            }
                            return t.apply(this, arguments)
                        }
                    };
                    var t, o = {};

                    function l(t, e) {
                        var n = {
                            seen: [],
                            stylize: u
                        };
                        return 3 <= arguments.length && (n.depth = arguments[2]), 4 <= arguments.length && (n.colors = arguments[3]), m(e) ? n.showHidden = e : e && A._extend(n, e), w(n.showHidden) && (n.showHidden = !1), w(n.depth) && (n.depth = 2), w(n.colors) && (n.colors = !1), w(n.customInspect) && (n.customInspect = !0), n.colors && (n.stylize = a), f(n, t, n.depth)
                    }

                    function a(t, e) {
                        var n = l.styles[e];
                        return n ? "[" + l.colors[n][0] + "m" + t + "[" + l.colors[n][1] + "m" : t
                    }

                    function u(t, e) {
                        return t
                    }

                    function f(e, n, r) {
                        if (e.customInspect && n && C(n.inspect) && n.inspect !== A.inspect && (!n.constructor || n.constructor.prototype !== n)) {
                            var t = n.inspect(r, e);
                            return _(t) || (t = f(e, t, r)), t
                        }
                        var i = function(t, e) {
                            if (w(e)) return t.stylize("undefined", "undefined");
                            if (_(e)) {
                                var n = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                                return t.stylize(n, "string")
                            }
                            if (b(e)) return t.stylize("" + e, "number");
                            if (m(e)) return t.stylize("" + e, "boolean");
                            if (y(e)) return t.stylize("null", "null")
                        }(e, n);
                        if (i) return i;
                        var o, a = Object.keys(n),
                            s = (o = {}, a.forEach(function(t, e) {
                                o[t] = !0
                            }), o);
                        if (e.showHidden && (a = Object.getOwnPropertyNames(n)), S(n) && (0 <= a.indexOf("message") || 0 <= a.indexOf("description"))) return p(n);
                        if (0 === a.length) {
                            if (C(n)) {
                                var l = n.name ? ": " + n.name : "";
                                return e.stylize("[Function" + l + "]", "special")
                            }
                            if (x(n)) return e.stylize(RegExp.prototype.toString.call(n), "regexp");
                            if (k(n)) return e.stylize(Date.prototype.toString.call(n), "date");
                            if (S(n)) return p(n)
                        }
                        var u, c = "",
                            h = !1,
                            d = ["{", "}"];
                        (v(n) && (h = !0, d = ["[", "]"]), C(n)) && (c = " [Function" + (n.name ? ": " + n.name : "") + "]");
                        return x(n) && (c = " " + RegExp.prototype.toString.call(n)), k(n) && (c = " " + Date.prototype.toUTCString.call(n)), S(n) && (c = " " + p(n)), 0 !== a.length || h && 0 != n.length ? r < 0 ? x(n) ? e.stylize(RegExp.prototype.toString.call(n), "regexp") : e.stylize("[Object]", "special") : (e.seen.push(n), u = h ? function(e, n, r, i, t) {
                            for (var o = [], a = 0, s = n.length; a < s; ++a) T(n, String(a)) ? o.push(g(e, n, r, i, String(a), !0)) : o.push("");
                            return t.forEach(function(t) {
                                t.match(/^\d+$/) || o.push(g(e, n, r, i, t, !0))
                            }), o
                        }(e, n, r, s, a) : a.map(function(t) {
                            return g(e, n, r, s, t, h)
                        }), e.seen.pop(), function(t, e, n) {
                            if (60 < t.reduce(function(t, e) {
                                    return 0, 0 <= e.indexOf("\n") && 0, t + e.replace(/\u001b\[\d\d?m/g, "").length + 1
                                }, 0)) return n[0] + ("" === e ? "" : e + "\n ") + " " + t.join(",\n  ") + " " + n[1];
                            return n[0] + e + " " + t.join(", ") + " " + n[1]
                        }(u, c, d)) : d[0] + c + d[1]
                    }

                    function p(t) {
                        return "[" + Error.prototype.toString.call(t) + "]"
                    }

                    function g(t, e, n, r, i, o) {
                        var a, s, l;
                        if ((l = Object.getOwnPropertyDescriptor(e, i) || {
                                value: e[i]
                            }).get ? s = l.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special") : l.set && (s = t.stylize("[Setter]", "special")), T(r, i) || (a = "[" + i + "]"), s || (t.seen.indexOf(l.value) < 0 ? -1 < (s = y(n) ? f(t, l.value, null) : f(t, l.value, n - 1)).indexOf("\n") && (s = o ? s.split("\n").map(function(t) {
                                return "  " + t
                            }).join("\n").substr(2) : "\n" + s.split("\n").map(function(t) {
                                return "   " + t
                            }).join("\n")) : s = t.stylize("[Circular]", "special")), w(a)) {
                            if (o && i.match(/^\d+$/)) return s;
                            (a = JSON.stringify("" + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2), a = t.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = t.stylize(a, "string"))
                        }
                        return a + ": " + s
                    }

                    function v(t) {
                        return Array.isArray(t)
                    }

                    function m(t) {
                        return "boolean" == typeof t
                    }

                    function y(t) {
                        return null === t
                    }

                    function b(t) {
                        return "number" == typeof t
                    }

                    function _(t) {
                        return "string" == typeof t
                    }

                    function w(t) {
                        return void 0 === t
                    }

                    function x(t) {
                        return c(t) && "[object RegExp]" === e(t)
                    }

                    function c(t) {
                        return "object" == typeof t && null !== t
                    }

                    function k(t) {
                        return c(t) && "[object Date]" === e(t)
                    }

                    function S(t) {
                        return c(t) && ("[object Error]" === e(t) || t instanceof Error)
                    }

                    function C(t) {
                        return "function" == typeof t
                    }

                    function e(t) {
                        return Object.prototype.toString.call(t)
                    }

                    function n(t) {
                        return t < 10 ? "0" + t.toString(10) : t.toString(10)
                    }
                    A.debuglog = function(e) {
                        if (w(t) && (t = r.env.NODE_DEBUG || ""), e = e.toUpperCase(), !o[e])
                            if (new RegExp("\\b" + e + "\\b", "i").test(t)) {
                                var n = r.pid;
                                o[e] = function() {
                                    var t = A.format.apply(A, arguments);
                                    console.error("%s %d: %s", e, n, t)
                                }
                            } else o[e] = function() {};
                        return o[e]
                    }, (A.inspect = l).colors = {
                        bold: [1, 22],
                        italic: [3, 23],
                        underline: [4, 24],
                        inverse: [7, 27],
                        white: [37, 39],
                        grey: [90, 39],
                        black: [30, 39],
                        blue: [34, 39],
                        cyan: [36, 39],
                        green: [32, 39],
                        magenta: [35, 39],
                        red: [31, 39],
                        yellow: [33, 39]
                    }, l.styles = {
                        special: "cyan",
                        number: "yellow",
                        boolean: "yellow",
                        undefined: "grey",
                        null: "bold",
                        string: "green",
                        date: "magenta",
                        regexp: "red"
                    }, A.isArray = v, A.isBoolean = m, A.isNull = y, A.isNullOrUndefined = function(t) {
                        return null == t
                    }, A.isNumber = b, A.isString = _, A.isSymbol = function(t) {
                        return "symbol" == typeof t
                    }, A.isUndefined = w, A.isRegExp = x, A.isObject = c, A.isDate = k, A.isError = S, A.isFunction = C, A.isPrimitive = function(t) {
                        return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t
                    }, A.isBuffer = d("./support/isBuffer");
                    var h = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                    function T(t, e) {
                        return Object.prototype.hasOwnProperty.call(t, e)
                    }
                    A.log = function() {
                        var t, e;
                        console.log("%s - %s", (t = new Date, e = [n(t.getHours()), n(t.getMinutes()), n(t.getSeconds())].join(":"), [t.getDate(), h[t.getMonth()], e].join(" ")), A.format.apply(A, arguments))
                    }, A.inherits = d("inherits"), A._extend = function(t, e) {
                        if (!e || !c(e)) return t;
                        for (var n = Object.keys(e), r = n.length; r--;) t[n[r]] = e[n[r]];
                        return t
                    }
                }).call(this, d("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                "./support/isBuffer": 83,
                _process: 65,
                inherits: 59
            }],
            85: [function(t, e, n) {
                e.exports = {
                    name: "asana",
                    version: "0.14.0",
                    description: "Official NodeJS and BrowserJS client for the Asana API",
                    main: "index.js",
                    scripts: {
                        test: "node_modules/.bin/gulp test"
                    },
                    repository: {
                        type: "git",
                        url: "git://github.com/Asana/node-asana.git"
                    },
                    keywords: ["asana", "api", "oauth"],
                    author: "Phips Peter",
                    license: "MIT",
                    bugs: {
                        url: "https://github.com/Asana/node-asana/issues"
                    },
                    homepage: "https://github.com/Asana/node-asana",
                    dependencies: {
                        bluebird: "^2.3.0",
                        "browser-request": "^0.3.2",
                        lodash: "^3.1.0",
                        request: "^2.45.0"
                    },
                    devDependencies: {
                        browserify: "^8.0.3",
                        gulp: "^3.8.5",
                        "gulp-bump": "^0.1.11",
                        "gulp-filter": "^2.0.0",
                        "gulp-git": "^0.5.6",
                        "gulp-istanbul": "^0.6.0",
                        "gulp-jshint": "^1.6.4",
                        "gulp-mocha": "^2.0.0",
                        "gulp-shell": "^0.2.11",
                        "gulp-tag-version": "^1.2.1",
                        "gulp-uglify": "^1.0.2",
                        "jshint-stylish": "^1.0.0",
                        rewire: "^2.0.1",
                        sinon: "^1.12.2",
                        through: "^2.3.6",
                        "vinyl-buffer": "^1.0.0",
                        "vinyl-source-stream": "^1.0.0"
                    },
                    browser: {
                        request: "browser-request"
                    }
                }
            }, {}]
        }, {}, [1])(1)
    }),
    function(a, s) {
        var e = function(t, e) {
            this.element = t, this.$element = s(t), this.options = e
        };
        e.defaults = (e.prototype = {
            defaults: {
                client_id: null,
                redirect_uri: null,
                task_name: "Task Name",
                task_description: "Task Description",
                form_prefix: "#addAsana"
            },
            init: function() {
                this.config = s.extend({}, this.defaults, this.options), this.createClient(), this.triggerFlow()
            },
            createClient: function() {
                client = Asana.Client.create({
                    clientId: this.config.client_id,
                    redirectUri: this.config.redirect_uri
                }), client.useOauth({
                    flowType: Asana.auth.PopupFlow
                })
            },
            formValues: function() {
                var t = this.config.task_name,
                    e = this.config.task_description,
                    n = this.config.form_prefix;
                s(n + "-taskName").val(t).attr("value", t), s(n + "-taskDescription").val(e).text(e)
            },
            flowSuccess: function() {
                var t = this.config.form_prefix;
                s(t + " .dialog-header select").hide(), s(t + " .dialog-header h3").hide().fadeIn().text("Success! The link has been added."), s(t + " .dialog-content--form").hide(), s(t + " .dialog-content--success").fadeIn(), s(t + " .message").hide()
            },
            flowReset: function() {
                var t = this.config.form_prefix;
                s(t + " .dialog-header select").show(), s(t + " .dialog-header h3").text("Add link to"), s(t + " .dialog-content--form").show(), s(t + " .dialog-content--success").hide(), s(t + "-workspaces").val("workspace"), this.formValues()
            },
            triggerFlow: function() {
                var i = this,
                    o = this.config.form_prefix;
                client.authorize().then(function() {
                    return client.users.me().then(function(t) {
                        s(o + " .dialog-content--loader").hide(), s(o + " .dialog-content--form").fadeIn();
                        var e, n = t.id;
                        i.formValues();
                        var r = client.workspaces.findAll({
                            id: n
                        });
                        1 == s(o + "-workspaces option").size() && r.then(function(t) {
                            s(t.data).each(function(t, e) {
                                var n = s("<option></option>").attr("id", e.id).attr("value", e.name).text(e.name);
                                s(o + "-workspaces").append(n)
                            })
                        }), s(o + "-workspaces").change(function() {
                            var t = o + "-workspaces option:selected";
                            selectedWorkspaceName = s(t).val(), e = s(t).attr("id")
                        }), s(o + "-submit").click(function(t) {
                            t.preventDefault(), "undefined" == typeof selectedWorkspaceName ? s(o + " .message--error").fadeIn() : (client.tasks.createInWorkspace(e, {
                                name: s(o + "-taskName").val(),
                                assignee: {
                                    id: n
                                },
                                notes: s(o + "-taskDescription").val()
                            }), i.flowSuccess(), a.setTimeout(function() {
                                a.location.hash = "#close"
                            }, 2250), a.setTimeout(function() {
                                i.flowReset(), selectedWorkspaceName = void 0
                            }, 2500))
                        })
                    })
                }).catch(function(t) {
                    console.log(t)
                })
            }
        }).defaults, s.fn.AddAsana = function(t) {
            return this.each(function() {
                new e(this, t).init()
            })
        }, a.AddAsana = e
    }(window, jQuery),
    function(c) {
        function t(t) {
            c(".siteHeader").toggleClass("-is-scrolling", c(this).scrollTop() > t), c(".siteHeader").hasClass("-is-inverted") && (c(".siteHeader-logo, .horizontalNavigation-item, .listDropdown-item").toggleClass("-inverted", c(this).scrollTop() < t), c(".siteHeader-button").toggleClass("-light", c(this).scrollTop() < t))
        }
        c(document).ready(function() {
            c("[data-grid]").each(function(t, e) {
                var n = parseInt(c(e).find(">*").css("marginBottom"));
                c(e).find(">*:last-child").css("cssText", "margin-bottom: " + n + "px !important"), c(e).css("cssText", "margin-bottom: " + -n + "px !important")
            }), c(".signup-dialog-button").click(function() {
                setTimeout(function() {
                    c("#signup-email-signup-modal").focus()
                }, 300)
            }), c(".delay").Lazy({
                effect: "fadeIn",
                effectTime: 750
            }), c("a.twitter-link, a.facebook-link, a.linkedin-link").click(function(t) {
                t.preventDefault(), window.open(c(this).attr("href"), "social_window", "height=450, width=550, top=" + (c(window).height() / 2 - 225) + ", left=" + c(window).width() / 2 + ", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")
            });
            var t = c(".button--apply"),
                i = c(".jobApplication");
            t.click(function(t) {
                var e = c(this);
                t.preventDefault(), e.each(function() {
                    c(".button--apply").hide()
                }), i.fadeIn(), c("html, body").animate({
                    scrollTop: i.offset().top
                }, 1500);
                var n = new(window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver)(function(t) {
                        t.forEach(function(t) {
                            if ("attributes" === t.type && "height" === t.attributeName) {
                                var e = c(".jobApplication").children().children().attr("height") + "px";
                                c(".jobApplication").children().children()[0].setAttribute("style", "width:100%;border:none;min-height:" + e)
                            }
                        })
                    }),
                    r = c(".jobApplication").children().children()[0];
                n.observe(r, {
                    attributes: !0
                })
            }), c(".accordionList").find("dt").click(function(t) {
                t.stopPropagation(), c(this).toggleClass("open").next().slideToggle("fast"), c(".accordionList dd").not(c(this).next()).slideUp("fast"), c(".accordionList dt").not(c(this)).removeClass("open")
            });
            var e = c(".js-surveymonkey"),
                n = c(".js-surveymonkey a");
            if (e.length) {
                var r = e.attr("src"),
                    o = encodeURIComponent(AsanaHelpers.getParameterByName("t", window.location.href)),
                    a = r + "?t=" + o;
                o && (e.attr("src", a), n.attr("href", a))
            }
            c(window).width() < 768 && c(".customerLogos-logo").slice(8).addClass("-is-hidden"), c(".customerLogos-more").click(function(t) {
                t.preventDefault(), c(".customerLogos-logo.-is-hidden").slice(0, 18).removeClass("-is-hidden"), 0 === c(".customerLogos-logo.-is-hidden").length && (c(".customerLogos-more").hide(), c(".customerLogos-shadow").fadeOut("slow"))
            });
            var s = c("[data-android-button]"),
                l = s.attr("href"),
                u = "&referrer=" + encodeURIComponent(window.location.search.substring(1));
            s.each(function() {
                c(this).attr("href", l + u)
            })
        }), c(document).ready(function() {
            t(150)
        }), c(document).scroll(function() {
            t(150)
        })
    }(jQuery);
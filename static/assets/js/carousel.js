! function(o) {
    var e = o(window),
        a = o(document),
        r = {
            updateLeftNav: function(e) {
                var a = o(".sidebar li"),
                    t = o(".sidebar li a[data-filter='" + e + "']");
                a.removeClass("-is-active"), t.parent().addClass("-is-active")
            },
            updateUrl: function(e) {
                var a = {
                    currentCategory: e
                };
                history.pushState(a, "", window.location.pathname + "?category=" + e)
            },
            filterCategory: function(e) {
                var a = o(".filterable .app:not([data-app-category*='" + e + "']:visible)"),
                    t = o(".filterable .app[data-app-category*='" + e + "']:hidden"); - 1 !== window.whitelistedCategories.indexOf(e) && (r.updateLeftNav(e), r.updateUrl(e), a.hide(), t.fadeIn("slow"))
            }
        };
    e.on("load", function() {
        var e = AsanaHelpers.getParameterByName("category");
        e && (r.filterCategory(e), o("html, body").animate({
            scrollTop: o("#directory").offset().top - 350
        }, 500))
    }), a.ready(function() {
        var e = o(".sidebar li a"),
            a = o(".sidebar-select"),
            t = o(".appsCarousel"),
            i = o("#sticky");
        e.on("click tap", function() {
            var e = o(this).data("filter");
            r.filterCategory(e)
        }), a.on("change", function() {
            var e = o(this).find(":selected").val();
            r.filterCategory(e)
        }),  i.sticky({

        }), e.click(function() {
            document.getElementById("apps-directory-scroll-to").scrollIntoView()
        })
    })
}(jQuery);
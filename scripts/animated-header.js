var animatedHeader = (function() {
    var doc = $(document.documentElement),
        header = $(".navbar"),
        didScroll = false,
        changeHeaderOn = 100;

    function scrollPage() {
        if (scrollY() > changeHeaderOn) {
            header.addClass("scrolled");
        }
        else {
            header.removeClass("scrolled");
        }
        didScroll = false;
    }

    function scrollY() {
        return window.pageYOffset || doc.scrollTop;
    }

    $(window).scroll(function(event) {
        if (!didScroll) {
            didScroll = true;
            setTimeout(scrollPage, 100);
        }
    });
})();
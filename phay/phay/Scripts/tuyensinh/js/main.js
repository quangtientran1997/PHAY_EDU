$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    $('.scrollToTop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    function goToByScroll(id) {
        id = id.replace("link", "");
        // Scroll
        $('html,body').animate({
            scrollTop: $("#" + id).offset().top
        }, 'slow');
    }

    $(".scrollToBox .item").click(function (e) {
        e.preventDefault();
        goToByScroll(this.id);
    });

    $(".close-icon").click(function () {
        $(".fixed-contact").toggleClass("Open");
    });

});
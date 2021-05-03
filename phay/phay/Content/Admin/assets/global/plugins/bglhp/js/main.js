function Wo_HidePosInfo() {
    $(".postText").attr('opened', '0');
    $(".postText").css('height', '45px');
    $("body").removeClass('pub-focus');
    $(".publisher-box-footer").slideUp(100);
    fetch_url = 1;
}

function Wo_ShowPosInfo() {
    $(".postText").attr('opened', '1');
    $(".postText").css('height', '112px').focus();
    $("body").addClass('pub-focus');
    $(".publisher-box-footer").slideDown(100);
}
$(document).on('focus', '#publisher-box-focus', function() {
    $("body").addClass('pub-focus');
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $(".publisher-box-footer").slideDown(100);
        $(".postText").attr('opened', '1');
    }
});

$('#focus-overlay').on('click', function() {
    Wo_HidePosInfo();
});

$(".menu-btn > a").on("click", function(){
    $(".menu-top").toggleClass("active");
    return false;
});

$('body').delegate('.like-btn-comment','click', function() {
    var id = $( this ).attr( 'data-id' );
    $(function (data) {
        if(data.status == 200) {
        $('.reactions-comment-container-' + id).toggle();
            $('.comment-status-reaction').removeClass("active-like");
        }
    });  
});

$('body').delegate('.like-btn-comment','mouseenter', function() {
    var id = $( this ).attr( 'data-id' );
    setTimeout( function () {
        $('.reactions-comment-container-' + id).fadeIn(50);
    }, 500);
});

$('body').delegate('.like-btn-comment','mouseleave', function() {
    var id = $( this ).attr( 'data-id' );
    setTimeout( function () {
      if( $('.reactions-comment-container'+':hover').length == 0 && $('#comment-' + ' .wo-reaction-comment:hover').length == 0 ){
        $('.reactions-comment-container-' + id).fadeOut(50);
      }
    }, 500);
});

function Wo_OpenReplyBox(id) {
    $('#comment-' + id).find('.comment-replies').slideDown(50, function () {
        $('#comment-' + id).find('.comment-reply').slideDown(50);
    });
}

jQuery(document).ready(function($) {
    if($('.border-scroll').length>0){
            $('.border-scroll').niceScroll({
                cursorborder: 'none',
                cursorcolor: '#eaeaea',
                usetransition: true,
                autohidemode: "scroll",
            });
        }
});

$(document).ready(function() {
    var mnArr = [];
    var mainMn = $('#mainMn');
    mainMn.find('li').each(function () {
        var obj = $(this);
        mnArr.push(obj);
    });
    $('.mainMnBtn').bind('click', function () {
            //show modal
            mainMn.css({display:'block', opacity:0, marginTop:'10%'});
            mainMn.animate({ opacity:1, marginTop:'0%'}, 200);

            mainMn.find('li').css({ marginTop: '20px', fontSize: '2em', opacity:0});
            for(var i=0; i < mnArr.length; i++){
                mnArr[i].delay(i*50 + 100).animate({ marginTop: '0px', fontSize: '1.6em', opacity:1},160, 'linear');
            }
    });

    mainMn.find('.closeMn').bind('click', function () {
         mainMn.animate({ opacity:0}, 200, function () {
            mainMn.hide();
        });
    });
});

$('.collapse').on('show.bs.collapse', function () {
    $('.collapse.in').collapse('hide');
});

// chatPopup

//$(document).ready(function() {  
//    var accItem = document.getElementsByClassName('group_box');
//    var accHD = document.getElementsByClassName('title');
//    for (i = 0; i < accHD.length; i++) {
//        accHD[i].addEventListener('click', toggleItem, false);
//    }
//    function toggleItem() {
//        var itemClass = this.parentNode.className;
//        for (i = 0; i < accItem.length; i++) {
//            accItem[i].className = 'group_box close_box';
//        }
//        if (itemClass == 'group_box close_box') {
//            this.parentNode.className = 'group_box open_box';
//        }
//    }
//});

$(document).ready(function(){
    $( "a.scrollLink" ).click(function( event ) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);
    });
});

$(document).ready(function() {
    jQuery(document).ready(function() {
        jQuery("#accordion-menu").jqueryAccordionMenu();
        jQuery(".colors a").click(function() {
            if ($(this).attr("class") != "default") {
                $("#accordion-menu").removeClass();
                $("#accordion-menu").addClass("accordion-menu").addClass($(this).attr("class"));
            } else {
                $("#accordion-menu").removeClass();
                $("#accordion-menu").addClass("accordion-menu");
            }
        });
    });
});

;
(function($, window, document, undefined) {
    var pluginName = "jqueryAccordionMenu";
    var defaults = {
        speed: 300,
        showDelay: 0,
        hideDelay: 0,
        singleOpen: true,
        clickEffect: true
    };

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init()
    };
    $.extend(Plugin.prototype, {
        init: function() {
            this.openSubmenu();
            // this.submenuIndicators();
            if (defaults.clickEffect) {
                this.addClickEffect()
            }
        },
        openSubmenu: function() {
            $(this.element).children("ul").find("li").bind("click touchstart", function(e) {
                e.stopPropagation();
                e.preventDefault();
                if ($(this).children(".submenu").length > 0) {
                    if ($(this).children(".submenu").css("display") == "none") {
                        $(this).children(".submenu").delay(defaults.showDelay).slideDown(defaults.speed);
                        $(this).children(".submenu").siblings("a").addClass("submenu-indicator-minus");
                        if (defaults.singleOpen) {
                            $(this).siblings().children(".submenu").slideUp(defaults.speed);
                            $(this).siblings().children(".submenu").siblings("a").removeClass("submenu-indicator-minus")
                        }
                        return false
                    } else {
                        $(this).children(".submenu").delay(defaults.hideDelay).slideUp(defaults.speed)
                    }
                    if ($(this).children(".submenu").siblings("a").hasClass("submenu-indicator-minus")) {
                        $(this).children(".submenu").siblings("a").removeClass("submenu-indicator-minus")
                    }
                }
                window.location.href = $(this).children("a").attr("href")
            })
        },
        addClickEffect: function() {
            var ink, d, x, y;
            $(this.element).find("a").bind("click touchstart", function(e) {
                $(".ink").remove();
                if ($(this).children(".ink").length === 0) {
                    $(this).prepend("<span class='ink'></span>")
                }
                ink = $(this).find(".ink");
                ink.removeClass("animate-ink");
                if (!ink.height() && !ink.width()) {
                    d = Math.max($(this).outerWidth(), $(this).outerHeight());
                    ink.css({
                        height: d,
                        width: d
                    })
                }
                x = e.pageX - $(this).offset().left - ink.width() / 2;
                y = e.pageY - $(this).offset().top - ink.height() / 2;
                ink.css({
                    top: y + 'px',
                    left: x + 'px'
                }).addClass("animate-ink")
            })
        }
    });
    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options))
            }
        });
        return this
    }
})(jQuery, window, document);

function OpenDiemDanh() {
	$(".diemdanh-lop").addClass("open");
};

function CloseDiemDanh() {
	$(".diemdanh-lop").removeClass("open");
};
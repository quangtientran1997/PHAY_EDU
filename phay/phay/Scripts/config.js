var desktop_class = '.desktop';
var tab_container_class = 'tab_container';
var widthScreen = window.outerWidth;
var tabs = [];
var storageKey = 'tabs';
var mediumScreenWidth = 992;
var expandedHome = false;

var animation = {
    infiniteAnimation: 'infinite',
    bounce: 'animated bounce',
    flash: 'animated flash',
    pulse: 'animated pulse',
    rubberBand: 'animated rubberBand',
    shake: 'animated shake',
    headShake: 'animated headShake',
    swing: 'animated swing',
    tada: 'animated tada',
    wobble: 'animated wobble',
    jello: 'animated jello',
    bounceIn: 'animated bounceIn',
    bounceInDown: 'animated bounceInDown',
    bounceInLeft: 'animated bounceInLeft',
    bounceInRight: 'animated bounceInRight',
    bounceInUp: 'animated bounceInUp',
    bounceOut: 'animated bounceOut',
    bounceOutDown: 'animated bounceOutDown',
    bounceOutLeft: 'animated bounceOutLeft',
    bounceOutRight: 'animated bounceOutRight',
    bounceOutUp: 'animated bounceOutUp',
    fadeIn: 'animated fadeIn',
    fadeInDown: 'animated fadeInDown',
    fadeInDownBig: 'animated fadeInDownBig',
    fadeInLeft: 'animated fadeInLeft',
    fadeInLeftBig: 'animated fadeInLeftBig',
    fadeInRight: 'animated fadeInRight',
    fadeInRightBig: 'animated fadeInRightBig',
    fadeInUp: 'animated fadeInUp',
    fadeInUpBig: 'animated fadeInUpBig',
    fadeOut: 'animated fadeOut',
    fadeOutDown: 'animated fadeOutDown',
    fadeOutDownBig: 'animated fadeOutDownBig',
    fadeOutLeft: 'animated fadeOutLeft',
    fadeOutLeftBig: 'animated fadeOutLeftBig',
    fadeOutRight: 'animated fadeOutRight',
    fadeOutRightBig: 'animated fadeOutRightBig',
    fadeOutUp: 'animated fadeOutUp',
    fadeOutUpBig: 'animated fadeOutUpBig',
    flipInX: 'animated flipInX',
    flipInY: 'animated flipInY',
    flipOutX: 'animated flipOutX',
    flipOutY: 'animated flipOutY',
    lightSpeedIn: 'animated lightSpeedIn',
    lightSpeedOut: 'animated lightSpeedOut',
    rotateIn: 'animated rotateIn',
    rotateInDownLeft: 'animated rotateInDownLeft',
    rotateInDownRight: 'animated rotateInDownRight',
    rotateInUpLeft: 'animated rotateInUpLeft',
    rotateInUpRight: 'animated rotateInUpRight',
    rotateOut: 'animated rotateOut',
    rotateOutDownLeft: 'animated rotateOutDownLeft',
    rotateOutDownRight: 'animated rotateOutDownRight',
    rotateOutUpLeft: 'animated rotateOutUpLeft',
    rotateOutUpRight: 'animated rotateOutUpRight',
    hinge: 'animated hinge',
    jackInTheBox: 'animated jackInTheBox',
    rollIn: 'animated rollIn',
    rollOut: 'animated rollOut',
    zoomIn: 'animated zoomIn',
    zoomInDown: 'animated zoomInDown',
    zoomInLeft: 'animated zoomInLeft',
    zoomInRight: 'animated zoomInRight',
    zoomInUp: 'animated zoomInUp',
    zoomOut: 'animated zoomOut',
    zoomOutDown: 'animated zoomOutDown',
    zoomOutLeft: 'animated zoomOutLeft',
    zoomOutRight: 'animated zoomOutRight',
    zoomOutUp: 'animated zoomOutUp',
    slideInDown: 'animated slideInDown',
    slideInLeft: 'animated slideInLeft',
    slideInRight: 'animated slideInRight',
    slideInUp: 'animated slideInUp',
    slideOutDown: 'animated slideOutDown',
    slideOutLeft: 'animated slideOutLeft',
    slideOutRight: 'animated slideOutRight',
    slideOutUp: 'animated slideOutUp'
}

$(function () {
    //set localStorage
    var tabArr = $.parseJSON(localStorage.getItem(storageKey));
    if (tabArr != null) {
        $('.tab_container .nav > .tabs_bag').removeClass('hidden');
        tabs = tabArr;
        for (var i = 0; i < tabArr.length; i++) {
            var tab_id = tabArr[i].TabId;
            var tab_header = tabArr[i].TabHeader;
            var tab_content = tabArr[i].TabContent;
            var tab_bag_item = tabArr[i].TabheaderCollpase;

            if (i != tabArr.length - 1) {
                tab_content = '<div role="tabpanel" class="tab-pane full-height active_tabs" id="' + tab_id + '">';
                tab_content += '<div class="iframe-loading-overlay">';
                tab_content += '<i class="fa fa-spinner fa-pulse fa-3x fa-fw" style= "position:absolute;top:10%;left:50%;color:white;margin-top:-45px;margin-left:-45px;font-size:90px;" ></i>';
                tab_content += '<div class="clearfix"></div></div>';
                tab_content += '<div class="clearfix"></div></div>';
            }

            //$('#tablist').prepend(tab_header);
            $('#tablist > .tab_pined').after(tab_header);
            $('#tab_content').prepend(tab_content);
            $('.tabs_bag').find('.dropdown-menu').prepend(tab_bag_item);

            iframeLoading(tab_id);

            removeActive();
            setTabActive(tab_id);
        }
        $('.dropdown-menu li').removeClass('active_tabs');
        TabContainer.setTabOverflow();
    }

    responsive.onResponsive(function () {
        $('.tab_container').find('#tablist').attr('class', 'nav nav-tabs');
        $('#no-responvive ul.parent_menu').remove();
        $('#responsive ul.parent_menu').attr('class', 'nav navbar-nav parent_menu');
    });

    $('.small-box > .inner > h3').each(function (index, item) {
        if (parseInt($(item).text()) > 0) {
            $(item).addClass(animation.pulse + ' ' + animation.infiniteAnimation);
        }
    });
    //$('#tablist').css('width', '90%');
    $('.scrollbar').mCustomScrollbar({
        autoHideScrollbar: true,
        theme: "dark-3"
    });
});

$('body').on('click', '#taskbar_button', function () {
    if ($('.dropup').hasClass('open')) {
        $('.dropup').removeClass('dropup open');
        $(this).attr('aria-expanded', false);
    }
    else {
        $(this).parent().addClass('dropup open');
        $(this).attr('aria-expanded', true);
        $(".main_menu").append("<div id=\"background-popupmenu\"></div>");
    }
});

$('body').on('click', '#background-popupmenu', function () {
    $('.dropup').removeClass('dropup open');
    $('#taskbar_button').attr('aria-expanded', false);
    $('#background-popupmenu').remove();
});

$('body').on('hide.bs.dropdown', '.dropup', function (event) {
    event.preventDefault();
});

$('body').on('show.bs.dropdown', '.dropup', function (event) {
});

$('body').on('show.bs.collapse', '.parent_menu .collapse', function () {
    $(this).parent().find('i[data-has-submenu="true"]').attr('class', 'fa fa-angle-up');
})

$('body').on('hide.bs.collapse', '.parent_menu .collapse', function () {
    $(this).parent().find('i[data-has-submenu="true"]').attr('class', 'fa fa-angle-down');
});

$('body').on('click', '.open_window', function () {
    if ($(this).attr('data-collapse') && $(this).attr('data-collapse') != "") {
        $('body').addClass('page-sidebar-closed');
        $('.page-sidebar-menu').addClass('page-sidebar-menu-closed');
    }
    //$(desktop_class).append(container);
    $('.tab_container .nav > .tabs_bag').removeClass('hidden');
    var tieu_de = $(this).attr('data-title');	//data-title
    var data_href = $(this).attr('data-href'); //data-href
    var category_id = $(this).attr('data-category-id');
    //var iframeContainer = '<div class="col-md-12 full-height"><div class="row full-height"><div class="embed-responsive embed-responsive-16by9 full-height"> <iframe class="embed-responsive-item full-height" src="' + data_href + '"></iframe> </div></div></div>';
    var iframeContainer = '<div class="full-height"><div class="full-height"><div class="embed-responsive full-height"> <iframe id="box-iframe-screen" allow="microphone; camera; fullscreen" sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-downloads allow-popups-to-escape-sandbox" class="embed-responsive-item full-height" src="' + data_href + '" style="padding-bottom:5px;"></iframe> <div class="clearfix"></div></div><div class="clearfix"></div></div><div class="clearfix"></div></div>';

    createTab(tieu_de, iframeContainer, category_id, $(this).attr('data-collapse'));
});

$('body').on('click', '[role="tab"]', function () {
    var data_tab_id = $(this).attr('data-tab-id');
    $('.dropdown-menu').removeClass('active_tabs');
});

$('body').on('click', '.window[data-window-id]', function () {
    var windowId = $(this).attr('data-window-id');
});

$('body').on('click', desktop_class, function () {
    closeMenu();
});

$('body').on('click', '.tab_container .tab-fixed .nav .close_tab', function () {
    var tab_id = $(this).parent().attr('data-tab-id');
    var tab_list_remove = $('.tab_container .tab-fixed > .nav > li > ' + 'a[data-tab-id="' + tab_id + '"]').parents('li[data-category-id]');
    var tab_dropdown_remove = $('.tabs_bag .dropdown-menu > li > a[data-tab-id="' + tab_id + '"]').parent();
    var tab_content = $('#tab_content > #' + tab_id);

    if (tab_list_remove.hasClass('active_tabs') && tab_content.hasClass('active_tabs')) {
        $(tab_list_remove).remove();
        $(tab_content).remove();

        var first = $('.tab_container .nav > li').first().find('a').attr('data-tab-id');
        removeActive();
        setTabActive(first)
    }
    else {
        $(tab_list_remove).remove();
        $(tab_content).remove();
    }
    $(tab_dropdown_remove).remove();
    if ($('#tablist > li[data-category-id]').length <= 1) {
        $('.tab_container .nav > .tabs_bag').addClass('hidden');
    }
    removeTabFromLocalStorage(tab_id);

    var tabArr = $.parseJSON(localStorage.getItem(storageKey));
    if (tabArr != null) {
        try {
            tab_id = tabArr[tabArr.length - 1].TabId;
            setTabActive(tab_id);
            iframeLoading($('a #' + tab_id));
        } catch (exx) { }
    }
});

$('body').on('click', '.close_Alltab', function () {
    removeAllTabFromLocalStorage();
});

function tabActive(sender) {

    try {
        $("body,html").animate({ scrollTop: 0 }, 400);
    } catch (e) {

    }
    //
    var tabArr = $.parseJSON(localStorage.getItem(storageKey));
    var tab_id = $(sender).attr('data-tab-id');
    var thisTabIsActiving = $('#' + tab_id).hasClass('active_tabs');
    var k = $(sender).attr('data-collapse');

    ////if ($(sender).attr('data-collapse') && $(sender).attr('data-collapse') != "") {
    ////    $('body').addClass('page-sidebar-closed');
    ////}

    //if (widthScreen < mediumScreenWidth)
    //{
    //	$('li[role="presentation"][data-category-id] > a').css('display', 'none');
    //	$('li[role="presentation"][data-category-id] > a[data-tab-id="' + tab_id + '"]').css('display', 'block');
    //	removeActive();
    //	setTabActive(tab_id);
    //	return;
    //}

    removeActive();
    setTabActive(tab_id);

    if (tab_id == "home") {
        expandedHome = !Boolean(expandedHome);
        //var expanded = $(sender).attr('aria-expanded');
        if (expandedHome == true) {
            $('#tab_content > #home').append('<div class="iframe-loading-overlay"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="position:absolute;top:10%;left:50%;color:#397FAE;margin-top:-45px;margin-left:-45px;font-size:90px;"></i></div>')
            var tabHomeContent = '<div role="tabpanel" class="tab-pane full-height active_tabs" id="home"><div class="full-height"><div class="full-height"><div class="embed-responsive full-height"> <iframe id="box-iframe-screen" allow="microphone; camera; fullscreen" sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-downloads allow-popups-to-escape-sandbox" class="embed-responsive-item full-height" src="/HeThong/Dashboard" style="padding-bottom:5px;"></iframe> <div class="clearfix"></div></div><div class="clearfix"></div></div><div class="clearfix"></div></div><div class="iframe-loading-overlay"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style= "position:absolute;top:10%;left:50%;color:#397FAE;margin-top:-45px;margin-left:-45px;font-size:90px;" ></i></div></div>';
            $('#tab_content > #' + tab_id).remove();
            $('#tab_content').prepend(tabHomeContent);
            iframeLoading(tab_id);
            return false;
        }
    } else {
        expandedHome = false;
        if (tabArr != null) {
            for (var i = 0; i < tabArr.length; i++) {
                if (tab_id == tabArr[i].TabId && (thisTabIsActiving == true || $('#tab_content > #' + tab_id).find('iframe').length <= 0) /*$('#tab_content > #' + tab_id).html() == ''*/) {
                    $('#tab_content > #' + tab_id).remove();
                    $('#tab_content').prepend(tabArr[i].TabContent);
                    iframeLoading(tab_id);
                    return false;
                }
            }
        }
    }

}

function closeMenu() {
    $('.dropup').removeClass('dropup open');
    $(this).attr('aria-expanded', false);
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function createTab(title, content, category_id, sidebar_collapse) {
    expandedHome = true;

    var isExist = $('.tab_container .nav').find('li[data-category-id="' + category_id + '"]');
    if ($(isExist).index() == -1) {
        removeActive();
        var tabId = guid();
        var href = 'tab_' + tabId;
        var tab_header = '<li role="presentation" data-category-id="' + category_id + '" class="active_tabs animated bounceIn"><a role="button" aria-controls="' + href + '" role="tab" onclick="tabActive(this)" data-tab-id="' + tabId + '" data-toggle="tab">' + title + '<i role="button" class="fa fa-close close_tab" aria-hidden="true"></i></a></li>';
        var tab_content = '<div role="tabpanel" class="tab-pane full-height active_tabs" id="' + tabId + '">' + content
        tab_content += '<div class="iframe-loading-overlay">';
        tab_content += '<i class="fa fa-spinner fa-pulse fa-3x fa-fw" style= "position:absolute;top:10%;left:50%;color:#397FAE;margin-top:-45px;margin-left:-45px;font-size:90px;" ></i>';
        tab_content += '</div>';
        tab_content += '</div>';

        var tab_bag_item = '<li data-category-id="' + category_id + '"><a onclick="tabActive(this)" role="button" data-tab-id="' + tabId + '" ' + (sidebar_collapse != undefined ? 'data-collapse="' + sidebar_collapse + '"' : '') + '>' + title + '<i role="button" class="fa fa-close close_tab" oncl aria-hidden="true"></i></a></li>';

        $('#tablist > .tab_pined').after(tab_header);
        $('#tab_content').prepend(tab_content);
        $('.tabs_bag').find('.dropdown-menu').prepend(tab_bag_item);

        iframeLoading(tabId);

        var jsonObjectTab = {
            TabId: tabId,
            TabHeader: tab_header,
            TabheaderCollpase: tab_bag_item,
            TabContent: tab_content
        };

        TabContainer.setTabOverflow();
        saveTabToLocalStorage(jsonObjectTab);
    }
    else {
        //removeActive();
        //$(isExist).addClass('active_tabs');
        //      setTabActive($(isExist).children('a').first().attr('data-tab-id'));

        if (sidebar_collapse != undefined) {
            $(isExist).children('a').first().attr('data-collapse', sidebar_collapse);
        }
        tabActive($(isExist).children('a').first());
    }
    try {
        $("body,html").animate({ scrollTop: 0 }, 800);
    } catch (e) {

    }
}

function createNewTab(title, data_href, category_id, sidebar_collapse) {

    expandedHome = true;

    var iframeContainer = '<div class="full-height"><div class="full-height"><div class="embed-responsive full-height"> <iframe id="box-iframe-screen" allow="microphone; camera; fullscreen" sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-downloads allow-popups-to-escape-sandbox" class="embed-responsive-item full-height" src="' + data_href + '" style="padding-bottom:45px;"></iframe> <div class="clearfix"></div></div><div class="clearfix"></div></div><div class="clearfix"></div></div>';

    createTab(title, iframeContainer, category_id, sidebar_collapse);
}

function saveTabToLocalStorage(jsonObjectTab) {
    tabs.push(jsonObjectTab);

    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(tabs));
    }
}

function removeActive() {
    //remove all active_tabs class
    $('.' + tab_container_class).find('a[data-tab-id]').parent().removeClass('active_tabs');
    $('.' + tab_container_class).find('.tab-pane').removeClass('active_tabs');
}

function setTabActive(tab_id) {

    var tab = $('.tab_container >.tab-fixed > .nav > li[data-category-id] > a[data-tab-id="' + tab_id + '"]').parents('li');
    if ($(tab).hasClass('tab_overflow')) {
        $('#tablist > .tab_pined').after(tab);
        TabContainer.setTabOverflow();
    }
    //set new active_tabs class when a element is added
    //$('.tab_container >.tab-fixed > .nav > li[data-category-id] > a[data-tab-id="' + tab_id + '"]').parents('li').addClass('active_tabs');
    //$('.tab_container >.tab-fixed > .nav > li[data-category-id="0"][class="tab_pined"]').after(tabActive);
    $('.tab_container .nav li[data-category-id] a[data-tab-id="' + tab_id + '"]').parents('li').addClass('active_tabs');
    $('#' + tab_id).addClass('active_tabs');
    $('.dropdown-menu').removeClass('active_tabs');
}

function removeAllTabFromLocalStorage() {
    //localStorage.clear();
    tabs = [];
    localStorage.setItem(storageKey, JSON.stringify(tabs));
    document.location.reload(true);
}

function removeTabFromLocalStorage(tab_id) {
    if (tabs.length <= 1) {
        localStorage.clear();
        tabs = [];

        $('#tab_content > #home').append('<div class="iframe-loading-overlay"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="position:absolute;top:10%;left:50%;color:#397FAE;margin-top:-45px;margin-left:-45px;font-size:90px;"></i></div>')
        var tabHomeContent = '<div role="tabpanel" class="tab-pane full-height active_tabs" id="home"><div class="full-height"><div class="full-height"><div class="embed-responsive full-height"> <iframe id="box-iframe-screen" allow="microphone; camera; fullscreen" sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-downloads allow-popups-to-escape-sandbox" class="embed-responsive-item full-height" src="/HeThong/Dashboard" style="padding-bottom:5px;"></iframe> <div class="clearfix"></div></div><div class="clearfix"></div></div><div class="clearfix"></div></div><div class="iframe-loading-overlay"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style= "position:absolute;top:10%;left:50%;color:#397FAE;margin-top:-45px;margin-left:-45px;font-size:90px;" ></i></div></div>';
        $('#tab_content > #' + tab_id).remove();
        $('#tab_content').prepend(tabHomeContent);
        iframeLoading('home');
    }

    if (tabs.length > 1) {
        var arr = tabs;
        tabs = [];
        arr.forEach(function (item, index) {
            if (item.TabId != tab_id) {
                saveTabToLocalStorage(item);
            }
        });
    }
}

var icon_full = 'fa fa-arrows-alt';
var icon_mini = 'fa fa-compress';
function fullScreen(sender) {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    var docElm = document.documentElement;
    if (!isInFullScreen) {
        $(sender).find('#fullScreen').attr('class', icon_mini);
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
        else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    }
    else {
        $(sender).find('#fullScreen').attr('class', icon_full);

        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

//class="open_window" data-href="#" data-category-id="9" data-title="Ngành tuyển sinh" - để mởi tab

var responsive = {
    mediumScreen: 992,
    onResponsive: function (callback) {
        if (window.outerWidth < this.mediumScreen) {
            callback();
        }
    },
    setActive: function (callback) {
        if (window.outerWidth < this.mediumScreen) {
            callback();
        }
    }
}

var TabContainer = {
    mainClass: '.tab-fixed > .nav[role="tablist"]',
    setTabOverflow: function () {
        /*-----Offset X--------*/
        var offsetX = 0;
        $('#tablist > li').each(function (index, item) {
            if ((!$(this).attr('data-category-id') || $(this).attr('data-category-id') == '0') && $(this).hasClass('dropdown') == false) {
                offsetX += $(this).outerWidth();
            }
        });
        /*---------------------*/

        var sum = 0;
        $('#tablist > li[data-category-id]').removeClass('tab_overflow');
        $('#tablist > li[data-category-id]').each(function (index, item) {
            sum += $(this).outerWidth();

            if (sum > ($('#tablist').outerWidth() - offsetX)) {
                $(item).addClass('tab_overflow');
            }
        });
        return sum;
    }
}

function logOut(title, message, action) {
    BootstrapDialog.show({
        title: '<span style="font-size: 17px;">' + title + '</span>',
        message: message,
        closable: false,
        buttons: [{
            label: 'Đồng ý',
            cssClass: 'btn-danger',
            action: function (dialog) {
                location.replace(action);
            }
        }, {
            label: 'Đóng',
            cssClass: 'btn-primary',
            action: function (dialog) {
                dialog.close()
            }
        }]
    });
}

function clearCache(action) {
    window.location = action + window.location.href;
}

function changePassword(action) {
    //var iframeContainer = '<div class="col-md-12"><div class="row"><div class="embed-responsive embed-responsive-16by9"> <iframe id="box-iframe-screen" class="embed-responsive-item" src="' + action + '"></iframe> </div></div></div>';
    var iframeContainer = '<div class="col-md-12"><div class="row"><div class="embed-responsive"> <iframe id="box-iframe-screen" allow="microphone; camera; fullscreen" sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-downloads allow-popups-to-escape-sandbox" class="embed-responsive-item" src="' + action + '"></iframe> </div></div></div>';
    BootstrapDialog.show({
        title: '<span style="font-size: 17px;">Thay đổi mật khẩu</span>',
        message: iframeContainer,
        closable: false,
        buttons: [{
            label: 'Đóng',
            cssClass: 'btn-primary',
            action: function (dialog) {
                dialog.close()
            }
        }]
    });
}

function refreshTab(sender) {

    var tab_id = $('#tab_content > .tab-pane.active_tabs').attr('id');
    var tabArr = $.parseJSON(localStorage.getItem(storageKey));
    if (tabArr != null) {
        for (var i = 0; i < tabArr.length; i++) {
            if (tab_id == tabArr[i].TabId) {
                $('#tab_content > #' + tab_id).remove();
                $('#tab_content').prepend(tabArr[i].TabContent);
                iframeLoading(tab_id);
                return false;
            }
        }
    }
}

function iframeLoading(tab_id) {
    $('#tab_content > #' + tab_id).find('iframe').load(function () {
        $('#tab_content > #' + tab_id).find('.iframe-loading-overlay').css('display', 'none');
    }, function () {
        $('#tab_content > #' + tab_id).find('.iframe-loading-overlay').css('display', 'none');
    });
}
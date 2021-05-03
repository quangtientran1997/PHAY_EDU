//function Update(name, url, e) {
//    $(e).gridPopupEditor(name, url, function () { Refresh(e); });
//}

function Update(name, url, e, title) {
    $(e).popupEditor(name, url, title, function () { Refresh(e); });
}

function Refresh(e)
{
    $.ajax({
        url: $(e).attr('data-url'),
        success: function (rs) {
            $(e).html(rs);
        },
        beforeSend: function () {
            kendo.ui.progress($('body'), true);
        },
        complete: function () {
            kendo.ui.progress($('body'), false);
        },
    });
}

function Delete(msg, url, e)
{
    $.confirm(msg, function () {
        $.ajax({
            url: url,
            type: 'post',
            success: function () {
                Refresh(e);
            },
            beforeSend: function () {
                kendo.ui.progress($('body'), true);
            },
            complete: function () {
                kendo.ui.progress($('body'), false);
            },
        });
    }, function () { });
}
function ASC_LoadingMask(value, locationID, formElement) {
    if (value) {
        var html = "<div class=\"k-loading-mask\" style=\"width: 100%; height: 100%; top: 0; left: 0px; z-index: 100 !important;\"><span class=\"k-loading-text\">Chờ...</span><div class=\"k-loading-image\"></div><div class=\"k-loading-color\"></div></div>";
        if (formElement) {
            $(html).appendTo($("#" + locationID).parent());
        } else {
            $(html).appendTo($("#" + locationID));
        }
    } else {
        $(".k-loading-mask").remove();
    }
}

function paramsToQueries(params) {
    var res = [];

    if (params.length > 0) {
        Object.keys(params).each(function (key) {
            res.push(key + "=" + params[key]);
        });
    }
    return (res.length > 0) ? ("?" + res.join("&")) : "";
}
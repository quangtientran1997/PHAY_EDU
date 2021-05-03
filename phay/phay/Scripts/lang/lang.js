var uid = $("#UID").val();
var jsonUrl = "../Content/lang/" + uid + ".json";
$.ajax({
    url: jsonUrl,
    dataType: "json",
    async: false,
    success: function (jsdata) {
        $("[lang]").each(function (index) {
            var val = jsdata[$(this).attr("lang")];
            $(this).html(val);
            $(this).attr("placeholder", val);
        });
    },
    error: function () {

    },
});
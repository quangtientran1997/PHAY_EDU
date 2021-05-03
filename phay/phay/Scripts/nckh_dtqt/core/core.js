R = {
    Init: function () {

    },
    RegisterEvent: function () {

    },
    Confirm: function (text, callback) {
        toastr.warning("<div style='text-align:right;'><button type='button' id='confirmDeleteYes' class='btn blue btn-sm'>Đồng ý</button><button id=\"cancelFunction\" class=\"btn btn-default btn-sm\">Đóng</button><div><div class='clearfix'></div>", text,
            {
                closeButton: false,
                allowHtml: true,
                timeOut: 0,
                extendedTimeOut: 0,
                positionClass: 'toast-center toast-top-center',
                onShown: function (toast) {
                    $("#confirmDeleteYes").off('click').on('click',function () {
                        callback();
                    });
                    $('#cancelFunction').off('click').on('click', function () {
                        console.log('hided');
                    })
                }
            });
    }
}
R.Init();
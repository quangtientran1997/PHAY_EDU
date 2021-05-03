function isNumberKey(evt) {
    var e = evt || window.event;
    var charCode = e.which || e.keyCode;
    if (charCode > 32 && (charCode <= 47 || charCode > 57) && charCode != 46) {
        return false;
    }
    if (e.shiftKey) {
        return false;
    }

    return true;
}
function Loading() {
    $('.boxLoading').html('<div class="iframe-loading-overlay" style="display: block;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="position:absolute;top:50%;left:50%;color:#397FAE;margin-top:-45px;margin-left:-45px;font-size:90px;"></i></div>');
}
function ClearLoading() {
    $('.boxLoading').html('');
}
function ClearHTML() {
    $('#content-tracuu').html('');
}
function LoadingMask(value) {
    if (value) {
        var html = "<div class=\"k-loading-mask\" style=\"width: 100%; height: 100%; top: 0px; left: 0px;\"><span class=\"k-loading-text\">Loading...</span><div class=\"k-loading-image\"></div><div class=\"k-loading-color\"></div></div>";
        $(html).appendTo(document.body);
    } else {
        $(".k-loading-mask").remove();
    }
}
function removeLoadingMarkFull() {
    $('.k-loading-mask').remove();
}
function loadingMarkFull() {
    var html = '<div class="k-loading-mask" style="width: 100%;height: 100%;top: 0px;left: 0px;z-index: 99999999999999;display: block;background-color: #607d8b2b;position: fixed;bottom: 0px;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="position:absolute;top:10px;left:50%;color:#f73900;margin-top:20%;margin-left:-45px;font-size:90px;"></i></div>';
    $(html).appendTo(document.body);
}
function ReturnDuLieuTimKiem() {
    var _tuKhoa = $('#txtTuKhoa').val();
    var _hoTen = $('#txtHoTen').val();
    return {
        pTuKhoa: _tuKhoa,
        pHoTen: _hoTen
    };
}
function CheckData() {
    var _tuKhoa = $('#txtTuKhoa').val();
    var _hoTen = $('#txtHoTen').val();
    _tuKhoa = (_tuKhoa != undefined && _tuKhoa != "" && _tuKhoa != 0) ? _tuKhoa : null;
    _hoTen = (_hoTen != undefined && _hoTen != "" && _hoTen != 0) ? _hoTen : null;
    if (_tuKhoa != null) {
        return true;
    } else {
        $.warning("Nhập thông tin CMND/Căn cước hoặc mã sinh viên để tra cứu.");
        return false;
    }
}
function LoadGird() {
    loadingMarkFull();
    if (CheckData()) {
        $.ajax({
            url: '/TuyenSinhDangKy/TraCuuKetQuaTrungTuyen',
            type: 'POST',
            dataType: 'html',
            data: {
                param: ReturnDuLieuTimKiem()
            },
            beforeSend: function () {
                loadingMarkFull();
            },
            success: function (data) {
                removeLoadingMarkFull();
                ClearHTML();
                $('#content-tracuu').html(data);
            }
        });
    }
    else {
        removeLoadingMarkFull();
    }
}
$(document).ready(function () {
    $("#btn-tracuu").click(function (event) {
        LoadGird();
    });
});
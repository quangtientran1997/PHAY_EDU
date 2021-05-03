function addtionalHocKy() {
    var _value = $('#cboHocKy').val();
    _value = (_value != undefined && _value != "" && _value != 0) ? _value : null;

    return {
        pIDHocKy: _value,
        pIDDoiTuongKhaoSat: 1
    }
}
function addtionalDotKhaoSat() {
    var _value = $("#cboDotKhaoSat").val();
    _value = (_value != undefined && _value != "" && _value != 0) ? _value : null;
    return {
        pIDDotKhaoSat: _value
    }
}
function Loading() {
    $('.boxLoading').html('<div class="iframe-loading-overlay" style="display: block;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="position:absolute;top:50%;left:50%;color:#397FAE;margin-top:-45px;margin-left:-45px;font-size:90px;"></i></div>');
}
function ClearLoading() {
    $('.boxLoading').html('');
}
function ClearHTML() {
    $('#ViewThongKeDanhGiaGiangDay').html('');
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
    var idHocKy = $("#cboHocKy").val();
    var idDotKhaoSat = $("#cboDotKhaoSat").val();
    var idLHP = null; //$("#cboLopHocPhanKhaoSat").val();
    var txtLHP = $("#txtLopHocPhan").val();
    idHocKy = (idHocKy != undefined && idHocKy != "" && idHocKy != 0) ? idHocKy : null;
    idDotKhaoSat = (idDotKhaoSat != undefined && idDotKhaoSat != "" && idDotKhaoSat != 0) ? idDotKhaoSat : null;
    //idLHP = (idLHP != undefined && idLHP != "" && idLHP != 0) ? idLHP : null;
    return {
        IDHocKy: idHocKy,
        IDDotKhaoSat: idDotKhaoSat,
        IDLopHocPhan: idLHP,
        MaLopHocPhan: txtLHP
    };
}
function CheckData() {
    var messageError = "";
    var idHocKy = $("#cboHocKy").val();
    idHocKy = (idHocKy != undefined && idHocKy != "" && idHocKy != 0) ? idHocKy : null;
    if (idHocKy != null) {
        return true;
    } else if (idHocKy == null) {
        messageError += "Chọn học kỳ";
        $.warning(messageError);
        return false;
    }
}
function LoadGird() {
    loadingMarkFull();
    if (CheckData()) {
        $.ajax({
            url: '/GiangVien/GetThongTinThongKeKetQuaKhaoSat',
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
                $('#ViewThongKeDanhGiaGiangDay').html(data);
            }
        });
    }
    else {
        removeLoadingMarkFull();
    }
}
$(document).ready(function () {
    $("#btnTraCuu").click(function (event) {
        LoadGird();
    });
});
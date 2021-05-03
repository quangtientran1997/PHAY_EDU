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
    $('#content').html('');
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
function post_to_url(path, params, method) {
    method = method || "post";
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();

    removeLoadingMarkFull();
}
function addtionalHeDaoTao() {
    var _cboDotTuyenSinh = $('#cboDotTuyenSinh').val();
    var _cboCoSo = $('#cboCoSo').val();
    _cboDotTuyenSinh = (_cboDotTuyenSinh != undefined && _cboDotTuyenSinh != "" && _cboDotTuyenSinh != 0) ? _cboDotTuyenSinh : null;
    _cboCoSo = (_cboCoSo != undefined && _cboCoSo != "" && _cboCoSo != 0) ? _cboCoSo : null;
    return {
        pIDCoSo: _cboCoSo,
        pIDDotTuyenSinh: _cboDotTuyenSinh
    }
}
function addtionalLoaiHinhDaoTao() {
    var _cboDotTuyenSinh = $('#cboDotTuyenSinh').val();
    var _cboCoSo = $('#cboCoSo').val();
    var _cboHeDaoTao = $('#cboHeDaoTao').val();

    _cboDotTuyenSinh = (_cboDotTuyenSinh != undefined && _cboDotTuyenSinh != "" && _cboDotTuyenSinh != 0) ? _cboDotTuyenSinh : null;
    _cboCoSo = (_cboCoSo != undefined && _cboCoSo != "" && _cboCoSo != 0) ? _cboCoSo : null;
    _cboHeDaoTao = (_cboHeDaoTao != undefined && _cboHeDaoTao != "" && _cboHeDaoTao != 0) ? _cboHeDaoTao : null;
    return {
        pIDCoSo: _cboCoSo,
        pIDDotTuyenSinh: _cboDotTuyenSinh,
        pIDHeDaoTao: _cboHeDaoTao
    }
}
function ReturnDuLieuTimKiem(_path, _tenFile, _tenFileImport) {
    var _idDotTuyenSinh = $('#cboDotTuyenSinh').val();
    var _idCoSo = $('#cboCoSo').val();
    var _idHeDaoTao = $('#cboHeDaoTao').val();
    var _idLoaiDaoTao = $('#cboLoaiDaoTao').val();
    var _checkImportBacLoai = null;
    var _checkLienThong = null;
    var _checkSuDungCotHoTen = null;

    _idDotTuyenSinh = (_idDotTuyenSinh != undefined && _idDotTuyenSinh != "" && _idDotTuyenSinh != 0) ? _idDotTuyenSinh : null;
    _idCoSo = (_idCoSo != undefined && _idCoSo != "" && _idCoSo != 0) ? _idCoSo : null;
    _idHeDaoTao = (_idHeDaoTao != undefined && _idHeDaoTao != "" && _idHeDaoTao != 0) ? _idHeDaoTao : null;
    _idLoaiDaoTao = (_idLoaiDaoTao != undefined && _idLoaiDaoTao != "" && _idLoaiDaoTao != 0) ? _idLoaiDaoTao : null;
    if ($('#checkImportBacLoai').is(":checked")) {
        _checkImportBacLoai = true;
    }
    else {
        _checkImportBacLoai = false;
    }
    if ($('#checkLienThong').is(":checked")) {
        _checkLienThong = true;
    }
    else {
        _checkLienThong = false;
    }
    if ($('#checkSuDungCotHOTEN').is(":checked")) {
        _checkSuDungCotHoTen = true;
    }
    else {
        _checkSuDungCotHoTen = false;
    }
    if (_path != "" && _path != undefined && _path != null) {
        return {
            pIDDotTuyenSinh: _idDotTuyenSinh,
            pIDCoSo: _idCoSo,
            pIDHeDaoTao: _idHeDaoTao,
            pIDLoaiHinhDaoTao: _idLoaiDaoTao,
            pImportBacLoai: _checkImportBacLoai,
            pLienThong: _checkLienThong,
            pSuDungCotHoTen: _checkSuDungCotHoTen,
            pPathFileImport: _path,
            pTenFileUploadImport: _tenFile,
            pTenFileImport: _tenFileImport
        };
    } else {
        return {
            pIDDotTuyenSinh: _idDotTuyenSinh,
            pIDCoSo: _idCoSo,
            pIDHeDaoTao: _idHeDaoTao,
            pIDLoaiHinhDaoTao: _idLoaiDaoTao,
            pImportBacLoai: _checkImportBacLoai,
            pLienThong: _checkLienThong,
            pSuDungCotHoTen: _checkSuDungCotHoTen
        };
    }

}
function CheckData() {
    var messageError = "";
    var _idDotTuyenSinh = $('#cboDotTuyenSinh').val();
    var _idCoSo = $('#cboCoSo').val();
    var _idHeDaoTao = $('#cboHeDaoTao').val();
    var _idLoaiDaoTao = $('#cboLoaiDaoTao').val();

    _idDotTuyenSinh = (_idDotTuyenSinh != undefined && _idDotTuyenSinh != "" && _idDotTuyenSinh != 0) ? _idDotTuyenSinh : null;
    _idCoSo = (_idCoSo != undefined && _idCoSo != "" && _idCoSo != 0) ? _idCoSo : null;
    _idHeDaoTao = (_idHeDaoTao != undefined && _idHeDaoTao != "" && _idHeDaoTao != 0) ? _idHeDaoTao : null;
    _idLoaiDaoTao = (_idLoaiDaoTao != undefined && _idLoaiDaoTao != "" && _idLoaiDaoTao != 0) ? _idLoaiDaoTao : null;
    if (_idDotTuyenSinh == null) {
        messageError += "Chọn Đợt tuyển sinh</br>";
    }
    if (_idCoSo == null) {
        messageError += "Chọn Cơ sở</br>";
    }
    if (_idHeDaoTao == null) {
        messageError += "Chọn Bậc đào tạo</br>";
    }
    if (_idLoaiDaoTao == null) {
        messageError += "Chọn Loại đào tạo</br>";
    }
    if (messageError != "") {
        $.warning(messageError);
        return false;
    }
    return true;
}
function Import() {
    var _path = $('#pathUploadFile').val();
    var _tenFile = $('#tenUploadFile').val();
    var _tenFileImport = $('#tenFileImport').val();
    if (_path != "" && _path != undefined && _path != null) {
        $(".conent-detail").html("");
        var _url = '/TuyenSinhDangKy/ThucHien_ImportThiSinhTrungTuyen';
        $.ajax({
            url: _url,
            type: 'post',
            async: true,
            data: {
                param: ReturnDuLieuTimKiem(_path, _tenFile, _tenFileImport),
            },
            datatype: "html",
            success: function (rs) {
                removeLoadingMarkFull();
                $('#FileImport').val('');
                $('#ten-file-import').text("Chưa chọn file Import");
                $(".conent-detail").html(rs);
                RefeshHistoryImport();
            }
        });
    } else {
        removeLoadingMarkFull();
        $.warning("Có lỗi khi thực hiện import");
    }
}
function UploadFile() {
    loadingMarkFull();
    var formData = new FormData();
    var file = document.getElementById("FileImport").files[0];
    formData.append("file", file);
    $.ajax({
        url: '/TuyenSinhDangKy/SaveFile_ImportThiSinhTrungTuyen',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (resultUploadFile) {
            $('#errorUploadFile').val(resultUploadFile.mess);
            $('#pathUploadFile').val(resultUploadFile.path);
            $('#tenUploadFile').val(resultUploadFile.tenFileUpLoad);
            $('#tenFileImport').val(resultUploadFile.tenFileImport);
            setTimeout(Import(), 3000);
        }
    });
}
function ThucHien() {
    if (CheckData()) {
        var _fileImport = $('#FileImport').val();
        if (_fileImport == null || _fileImport == "" || _fileImport == undefined) {
            $.warning("Chọn file Import");
        } else {
            UploadFile();
        }
    }
}
function ExportMauImport() {
    loadingMarkFull();
    post_to_url("/TuyenSinhDangKy/ImportThiSinhTrungTuyen_ExportMauMacDinh", ReturnDuLieuTimKiem(""), 'post');
    removeLoadingMarkFull();
}
function ReturnDuLieuImportThatBai(_key, _title) {
    return {
        pGuid: _key,
        pTitleFile: _title
    };
}
function ExportImportThatBai(_key, _title) {
    var check = 0;
    var grid = $('#gridImportThatbai').data("kendoGrid");
    if (grid == undefined || grid == null) {
        check = 1;
    }
    else {
        var count = grid.dataSource.total();
        if (count <= 0) {
            check = 1;
        }
    }

    if (check == 1) {
        $.warning("Không có dữ liệu để xuất excel");
        removeLoadingMarkFull();
        return;
    } else {
        loadingMarkFull();
        post_to_url("/TuyenSinhDangKy/ImportThiSinhTrungTuyen_ExportImportThatBai", ReturnDuLieuImportThatBai(_key, _title), 'post');
        removeLoadingMarkFull();
    }
}
function RefeshHistoryImport() {
    $("#gridLichSuImport").gridRefresh();
}
$(document).ready(function () {
    $('#cboDotTuyenSinh').change(function () {
        $("#cboHeDaoTao").data("kendoComboBox").dataSource.read();
        $('#content').html('<div class="col-md-12" style="padding-top:15px"><div class="bold">Danh sách thông tin thí sinh</div></div>');
    });
    $('#cboCoSo').change(function () {
        $("#cboHeDaoTao").data("kendoComboBox").dataSource.read();
        $('#content').html('<div class="col-md-12" style="padding-top:15px"><div class="bold">Danh sách thông tin thí sinh</div></div>');
    });
    $('#cboHeDaoTao').change(function () {
        $("#cboLoaiDaoTao").data("kendoComboBox").value(null);
        $("#cboLoaiDaoTao").data("kendoComboBox").dataSource.read();
    });
    $('#FileImport').change(function () {
        if (!this.files[0].name.match(/.(xls|xlsx|dbf)$/i)) {
            $.warning("File import không đúng định dạng. </br> Chỉ cho upload file định dạng xls/xlsx");
            $('#FileImport').val('');
            $('#ten-file-import').text("Chưa chọn file Import");
        } else {
            var tenFile = this.files[0].name;
            $('#ten-file-import').text(tenFile);
        }
    });
    $('.btnXoaFileImport').on('click', function (evt) {
        $('#FileImport').val('');
        $('#ten-file-import').text("Chưa chọn file Import");
    });
});
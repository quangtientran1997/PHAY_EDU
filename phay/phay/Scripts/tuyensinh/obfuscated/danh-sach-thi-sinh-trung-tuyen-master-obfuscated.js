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
function addtionalNganhDaoTao() {
    var _cboDotTuyenSinh = $('#cboDotTuyenSinh').val();
    var _cboCoSo = $('#cboCoSo').val();
    var _cboHeDaoTao = $('#cboHeDaoTao').val();
    var _cboLoaiDaoTao = $('#cboLoaiDaoTao').val();
    _cboDotTuyenSinh = (_cboDotTuyenSinh != undefined && _cboDotTuyenSinh != "" && _cboDotTuyenSinh != 0) ? _cboDotTuyenSinh : null;
    _cboCoSo = (_cboCoSo != undefined && _cboCoSo != "" && _cboCoSo != 0) ? _cboCoSo : null;
    _cboHeDaoTao = (_cboHeDaoTao != undefined && _cboHeDaoTao != "" && _cboHeDaoTao != 0) ? _cboHeDaoTao : null;
    _cboLoaiDaoTao = (_cboLoaiDaoTao != undefined && _cboLoaiDaoTao != "" && _cboLoaiDaoTao != 0) ? _cboLoaiDaoTao : null;
    return {
        pIDCoSo: _cboCoSo,
        pIDDotTuyenSinh: _cboDotTuyenSinh,
        pIDHeDaoTao: _cboHeDaoTao,
        pIDLoaiHinhDaoTao: _cboLoaiDaoTao
    }
}
function addtionalChuyenNganhDaoTao() {
    var _cboDotTuyenSinh = $('#cboDotTuyenSinh').val();
    var _cboCoSo = $('#cboCoSo').val();
    var _cboHeDaoTao = $('#cboHeDaoTao').val();
    var _cboLoaiDaoTao = $('#cboLoaiDaoTao').val();
    var _cboNganhDaoTao = $('#cboNganh').val();
    _cboDotTuyenSinh = (_cboDotTuyenSinh != undefined && _cboDotTuyenSinh != "" && _cboDotTuyenSinh != 0) ? _cboDotTuyenSinh : null;
    _cboCoSo = (_cboCoSo != undefined && _cboCoSo != "" && _cboCoSo != 0) ? _cboCoSo : null;
    _cboHeDaoTao = (_cboHeDaoTao != undefined && _cboHeDaoTao != "" && _cboHeDaoTao != 0) ? _cboHeDaoTao : null;
    _cboLoaiDaoTao = (_cboLoaiDaoTao != undefined && _cboLoaiDaoTao != "" && _cboLoaiDaoTao != 0) ? _cboLoaiDaoTao : null;
    _cboNganhDaoTao = (_cboNganhDaoTao != undefined && _cboNganhDaoTao != "" && _cboNganhDaoTao != 0) ? _cboNganhDaoTao : null;
    return {
        pIDCoSo: _cboCoSo,
        pIDDotTuyenSinh: _cboDotTuyenSinh,
        pIDHeDaoTao: _cboHeDaoTao,
        pIDLoaiHinhDaoTao: _cboLoaiDaoTao,
        pIDNganh: _cboNganhDaoTao
    }
}
function addtionalBanTuyenSinh() {
    var _text = $("[name='cboBanTuyenSinh_input']").val();
    return {
        text: _text
    }
}
function addtionalDonViDuThi() {
    var _text = $("[name='cboDonViDuThi_input']").val();
    var _cboBanTuyenSinh = $('#cboBanTuyenSinh').val();
    _cboBanTuyenSinh = (_cboBanTuyenSinh != undefined && _cboBanTuyenSinh != "" && _cboBanTuyenSinh != 0) ? _cboBanTuyenSinh : null;
    return {
        pIDBanTuyenSinh: _cboBanTuyenSinh,
        text: _text
    }
}
function addtionalPhanLoaiThiSinh() {
    var _text = $("[name='cboPhanLoaiThiSinh_input']").val();
    return {
        text: _text
    }
}
function addtionalDoiTuongChinhSach() {
    var _text = $("[name='cboDoiTuongChinhSach_input']").val();
    return {
        text: _text
    }
}
function addtionalNgoaiNgu() {
    var _text = $("[name='cboNgoaiNgu_input']").val();
    return {
        text: _text
    }
}
function additionalTieuChiTuyenSinh() {
    var lstID_TieuChiHT = $('#TS_IDTieuChiHienThi').val();
    if (lstID_TieuChiHT == null || lstID_TieuChiHT == "" || lstID_TieuChiHT.trim().length <= 0) {
        idTieuChiTuyenSinh: "";
    }
    return {
        lstIDHienThi: lstID_TieuChiHT
    };
}
function addtionalHinhThucNopHoSo() {
    var _text = $("[name='cboHinhThucNopHoSo_input']").val();
    return {
        text: _text
    }
}
function addtionalHinhThucNhanHoSo() {
    var _text = $("[name='cboHinhThucNhanHoSo_input']").val();
    return {
        text: _text
    }
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
function ChangeNgayNhapHoc() {
    var temp = $('#pTuNgayNhapHoc').val();
    var arr = temp.split("/");
    var date = arr[2] + '-' + arr[1] + '-' + arr[0];
    var x = new Date(date);
    x.setDate(x.getDate() + 7);
    var todayDate = kendo.toString(kendo.parseDate(x), 'dd/MM/yyyy');
    $("#pDenNgayNhapHoc").data('kendoDatePicker').value(todayDate);
}
function ChangeNgayXetTrungTuyen() {
    var temp = $('#pTuNgayXetTrungTuyen').val();
    var arr = temp.split("/");
    var date = arr[2] + '-' + arr[1] + '-' + arr[0];
    var x = new Date(date);
    x.setDate(x.getDate() + 7);
    var todayDate = kendo.toString(kendo.parseDate(x), 'dd/MM/yyyy');
    $("#pDenNgayXetTrungTuyen").data('kendoDatePicker').value(todayDate);
}
function ReturnDuLieuTimKiem() {
    var _idDotTuyenSinh = $('#cboDotTuyenSinh').val();
    var _idCoSo = $('#cboCoSo').val();
    var _idHeDaoTao = $('#cboHeDaoTao').val();
    var _idLoaiDaoTao = $('#cboLoaiDaoTao').val();
    var _idNganh = $('#cboNganh').val();
    var _idChuyenNganh = $('#cboChuyenNganh').val();
    var _idBanTuyenSinh = $('#cboBanTuyenSinh').val();
    var _idDonViDuThi = $('#cboDonViDuThi').val();
    var _idPhanLoaiThiSinh = $('#cboPhanLoaiThiSinh').val();
    var _idTrangThaiNhapHoc = $('#cboTrangThaiNhapHoc').val();
    var _maHoSo = $('#txtMaHoSo').val();
    var _soBaoDanh = $('#txtSoBaoDanh').val();
    var _khoi = $('#txtKhoi').val();
    var _hoDem = $('#txtHoDem').val();
    var _ten = $('#txtTen').val();
    var _cmnd = $('#txtCMND').val();
    var _idTrangThaiDaIn = $('#cboTrangThaiDaIn').val();
    var _idHinhThucNopHoSo = $('#cboHinhThucNopHoSo').val();
    var _idTieuChiTuyenSinh = null; //$("#cboTieuChiTuyenSinh").data('kendoComboBox').value();
    var _idDoiTuongChinhSach = $('#cboDoiTuongChinhSach').val();
    var _idHinhThucNhanHoSo = $('#cboHinhThucNhanHoSo').val();
    var _tuNgayNhapHoc = $("#pTuNgayNhapHoc").val() != "" ? $("#pTuNgayNhapHoc").data("kendoDatePicker").value().toJSON() : null;
    var _denNgayNhaphoc = $("#pDenNgayNhapHoc").val() != "" ? $("#pDenNgayNhapHoc").data("kendoDatePicker").value().toJSON() : null;
    var _idNgoaiNgu = $('#cboNgoaiNgu').val();
    var _nguoiXetTrungTuyen = $('#txtNguoiXetTrungTuyen').val();
    var _tuNgayXetTrungTuyen = $("#pTuNgayXetTrungTuyen").val() != "" ? $("#pTuNgayXetTrungTuyen").data("kendoDatePicker").value().toJSON() : null;
    var _denNgayXetTrungTuyen = $("#pDenNgayXetTrungTuyen").val() != "" ? $("#pDenNgayXetTrungTuyen").data("kendoDatePicker").value().toJSON() : null;
    var _idTrangThaiGuiMail = $('#cboTrangThaiGuiMail').val();
    var _idDotXetHoSo = $('#cboDotXetHS').val();
    var _maSinhVien = "";
    var _idLopHoc = null;
    var _lstIDTieuChiTuyenSinh = $('.ArrIDTieuChiTS-multiple').select2('val');
    var _truongTHPT = "";
    var _truongTHCS = "";
    var _idHanhKiem = null;
    var _tenMay = "";
    var _thuTuMay = null;
    var _idDaNopDuHoSo = null;
    var _idTruongTHPT = null;
    var _lstIDKhoaHoc = null; //$('.ArrIDKhoaHoc-multiple').select2('val');

    _idDotTuyenSinh = (_idDotTuyenSinh != undefined && _idDotTuyenSinh != "" && _idDotTuyenSinh != 0) ? _idDotTuyenSinh : null;
    _idCoSo = (_idCoSo != undefined && _idCoSo != "" && _idCoSo != 0) ? _idCoSo : null;
    _idHeDaoTao = (_idHeDaoTao != undefined && _idHeDaoTao != "" && _idHeDaoTao != 0) ? _idHeDaoTao : null;
    _idLoaiDaoTao = (_idLoaiDaoTao != undefined && _idLoaiDaoTao != "" && _idLoaiDaoTao != 0) ? _idLoaiDaoTao : null;
    _idChuyenNganh = (_idChuyenNganh != undefined && _idChuyenNganh != "" && _idChuyenNganh != 0) ? _idChuyenNganh : null;
    _idBanTuyenSinh = (_idBanTuyenSinh != undefined && _idBanTuyenSinh != "" && _idBanTuyenSinh != 0) ? _idBanTuyenSinh : null;
    _idDonViDuThi = (_idDonViDuThi != undefined && _idDonViDuThi != "" && _idDonViDuThi != 0) ? _idDonViDuThi : null;
    _idPhanLoaiThiSinh = (_idPhanLoaiThiSinh != undefined && _idPhanLoaiThiSinh != "" && _idPhanLoaiThiSinh != 0) ? _idPhanLoaiThiSinh : null;
    _idTrangThaiNhapHoc = (_idTrangThaiNhapHoc != undefined && _idTrangThaiNhapHoc != "" && _idTrangThaiNhapHoc != 0) ? _idTrangThaiNhapHoc : null;
    _idTrangThaiGuiMail = (_idTrangThaiGuiMail != undefined && _idTrangThaiGuiMail != "" && _idTrangThaiGuiMail != 0) ? _idTrangThaiGuiMail : null;
    _idDotXetHoSo = (_idDotXetHoSo != undefined && _idDotXetHoSo != "" && _idDotXetHoSo != 0) ? _idDotXetHoSo : null;
    _idTrangThaiDaIn = (_idTrangThaiDaIn != undefined && _idTrangThaiDaIn != "" && _idTrangThaiDaIn != 0) ? _idTrangThaiDaIn : null;
    _idTieuChiTuyenSinh = (_idTieuChiTuyenSinh != undefined && _idTieuChiTuyenSinh != "" && _idTieuChiTuyenSinh != 0) ? _idTieuChiTuyenSinh : null;
    _idDoiTuongChinhSach = (_idDoiTuongChinhSach != undefined && _idDoiTuongChinhSach != "" && _idDoiTuongChinhSach != 0) ? _idDoiTuongChinhSach : null;
    _idNgoaiNgu = (_idNgoaiNgu != undefined && _idNgoaiNgu != "" && _idNgoaiNgu != 0) ? _idNgoaiNgu : null;
    _idHinhThucNopHoSo = (_idHinhThucNopHoSo != undefined && _idHinhThucNopHoSo != "" && _idHinhThucNopHoSo != 0) ? _idHinhThucNopHoSo : null;
    _idHinhThucNhanHoSo = (_idHinhThucNhanHoSo != undefined && _idHinhThucNhanHoSo != "" && _idHinhThucNhanHoSo != 0) ? _idHinhThucNhanHoSo : null;
    return {
        pIDDotTuyenSinh: _idDotTuyenSinh,
        pIDCoSo: _idCoSo,
        pIDHeDaoTao: _idHeDaoTao,
        pIDLoaiHinhDaoTao: _idLoaiDaoTao,
        pIDNganh: _idNganh,
        pIDChuyenNganh: _idChuyenNganh,
        pIDBanTuyenSinh: _idBanTuyenSinh,
        pIDDonViDuThi: _idDonViDuThi,
        pIDPhanLoaiThiSinh: _idPhanLoaiThiSinh,
        pIDTrangThaiNhapHoc: _idTrangThaiNhapHoc,
        pMaHoSo: _maHoSo,
        pSoBaoDanh: _soBaoDanh,
        pKhoi: _khoi,
        pHoDem: _hoDem,
        pTen: _ten,
        pCMND: _cmnd,
        pIDTrangThaiDaIn: _idTrangThaiDaIn,
        pIDHinhThucNopHoSo: _idHinhThucNopHoSo,
        pIDTieuChiTuyenSinh: _lstIDTieuChiTuyenSinh,
        pIDDoiTuongChinhSach: _idDoiTuongChinhSach,
        pTuNgayNhapHoc: _tuNgayNhapHoc,
        pDenNgayNhapHoc: _denNgayNhaphoc,
        pIDHinhThucNhanHoSo: _idHinhThucNhanHoSo,
        pIDNgoaiNgu: _idNgoaiNgu,
        pNguoiXetTrungTuyen: _nguoiXetTrungTuyen,
        pTuNgayXetTrungTuyen: _tuNgayXetTrungTuyen,
        pDenNgayXetTrungTuyen: _denNgayXetTrungTuyen,
        pIDTrangThaiDaGuiMail: _idTrangThaiGuiMail,
        pIDDotXetHoSo: _idDotXetHoSo,
        pMaSinhVien: _maSinhVien,
        pIDLopHoc: _idLopHoc,
        pArrIDKhoaHoc: _lstIDKhoaHoc,
        pTruongTHPT: _truongTHPT,
        pTruongTHCS: _truongTHCS,
        pIDHanhKiem: _idHanhKiem,
        pTenMay: _tenMay,
        pThuTuMay: _thuTuMay,
        pDaNopDuHoSo: _idDaNopDuHoSo,
        pIDTruongTHPT: _idTruongTHPT
    };
}
function CheckData() {
    var messageError = "";
    var _idDotTuyenSinh = $('#cboDotTuyenSinh').val();
    _idDotTuyenSinh = (_idDotTuyenSinh != undefined && _idDotTuyenSinh != "" && _idDotTuyenSinh != 0) ? _idDotTuyenSinh : null;
    if (_idDotTuyenSinh != null) {
        return true;
    } else if (_idDotTuyenSinh == null) {
        messageError += "Chọn đợt tuyển sinh</br>";
        $.warning(messageError);
        return false;
    }
}
function LoadGird() {
    loadingMarkFull();
    if (CheckData()) {
        $.ajax({
            url: '/TuyenSinhDangKy/DanhSachThiSinhTrungTuyen',
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
                $('#content').html(data);
            }
        });
    }
    else {
        removeLoadingMarkFull();
    }
}
function inGiayBaoTrungTuyen(target) {
    toastr.clear();
    toastr.remove();
    var grid = $('#gridThongTinThiSinhTrungTuyen');
    var models = $(grid).gridSelectedModels();
    if (models != null && models.length > 0) {
        var arrID = [];
        $.each(models, function (index, value) {
            arrID.push(value.Id);
        });
        if (arrID.length > 0) {
            var strID = arrID.join(',');

            var url_guimail = '/TuyenSinhDangKy/InGBTTDanhSachThiSinhTrungTuyen?strID=' + strID;
            $.ajax({
                url: url_guimail,
                type: 'Get',
                async: false,
                datatype: "html",
                success: function (data) {
                    $('<div id="popupInGBTT"></div>').appendTo(document.body);
                    $('#popupInGBTT').html(data);
                    $('#popupInGBTT').kendoWindow({
                        visible: false,
                        title: "In giấy báo trúng tuyển",
                        modal: true,
                        close: () => { }
                    }).data('kendoWindow').center().open();
                }
            });
        } else {
            e.warning("Vui lòng chọn dữ liệu");
        }
    }
    else {
        $.warning("Vui lòng chọn dữ liệu");
    }
}
function guiMailTrungTuyen(target) {
    toastr.clear();
    toastr.remove();
    var grid = $('#gridThongTinThiSinhTrungTuyen');
    var models = $(grid).gridSelectedModels();
    if (models != null && models.length > 0) {
        var arrID = [];
        $.each(models, function (index, value) {
            arrID.push(value.Id);
        });
        if (arrID.length > 0) {
            var strID = arrID.join(',');

            var url_guimail = '/TuyenSinhDangKy/GuiMailDanhSachThiSinhTrungTuyen?strID=' + strID;
            $.ajax({
                url: url_guimail,
                type: 'Get',
                async: false,
                datatype: "html",
                success: function (data) {
                    $('<div id="popupChuyenDot"></div>').appendTo(document.body);
                    $('#popupChuyenDot').html(data);
                    $('#popupChuyenDot').kendoWindow({
                        visible: false,
                        title: "Gửi mail trúng tuyển",
                        modal: true,
                        close: () => { }
                    }).data('kendoWindow').center().open();
                }
            });
        } else {
            e.warning("Vui lòng chọn dữ liệu");
        }
    }
    else {
        $.warning("Vui lòng chọn dữ liệu");
    }
}
function xemChiTietHoSoTrungTuyen(_id) {
    var grid = $('#gridThongTinThiSinhTrungTuyen');
    var pageSize = grid.data("kendoGrid").dataSource._pageSize;
    var pageNumber = grid.data("kendoGrid").dataSource._page;
    var total = grid.data("kendoGrid").dataSource.total();
    var arrID = [];
    var models = $(grid).gridModelItems();
    if (models != null && models.length > 0) {
        $.each(models, function (index, value) {
            arrID.push(value.Id);
        });
        var _url = '/TuyenSinhDangKy/DanhSachThiSinhTrungTuyen_XemChiTiet';
        $.ajax({
            url: _url,
            type: 'post',
            data: {
                pListID: arrID.join(','),
                pId: _id,
                pPageNumber: pageNumber,
                pPageSize: pageSize,
                pTotal: total,
                pIndex: 0
            },
            async: false,
            datatype: "html",
            success: function (data) {
                $('<div id="popupDetailThiSinhTrungTuyen"></div>').appendTo(document.body);
                $('#popupDetailThiSinhTrungTuyen').html(data);
                $('#popupDetailThiSinhTrungTuyen').kendoWindow({
                    visible: false,
                    title: "Chi tiết thí sinh trúng tuyển",
                    modal: true,
                    close: () => { }
                }).data('kendoWindow').center().open();
            }
        });
    }
}
function nextPageDetail() {
    LoadDataPageDetail(1);
}
function previousPageDetail() {
    LoadDataPageDetail(2);
}
function LoadDataPageDetail(_check) {
    $(".btnPrevious").addClass("hiddenClass");
    $(".btnNext").addClass("hiddenClass");
    var _id = 0;
    var _index = $('#_IndexObj').val();
    var _ids = $('#_IDs').val();
    var _pageSize = $('#_PageSize').val();
    var _pageNumber = $('#_PageNumber').val();
    var _total = $('#_Total').val();
    var _arrID = _ids.split(",");
    if (_check == 1) {
        _index = parseInt(_index) + 1;
    }
    else if (_check == 2) {
        _index = parseInt(_index) - 1;
    }
    for (var i = 1; i <= _arrID.length; i++) {
        if (i == parseInt(_index)) {
            _id = parseInt(_arrID[i - 1]);
            $('#_IndexObj').val(parseInt(_index));
            break;
        }
    }
    if (_id > 0 && parseInt(_index) <= _arrID.length) {
        if (parseInt(_index) > 1) {
            $(".btnPrevious").removeClass("hiddenClass");
        }
        if (parseInt(_index) < _arrID.length) {
            $(".btnNext").removeClass("hiddenClass");
        }
        $('#chiTietThongTinThiSinhTrungTuyen').html("");
        $.ajax({
            url: '/TuyenSinhDangKy/DanhSachThiSinhTrungTuyen_XemChiTiet_TheoTruong',
            type: 'POST',
            dataType: 'html',
            data: {
                pID: parseInt(_id)
            },
            success: function (data) {
                $('#chiTietThongTinThiSinhTrungTuyen').html(data);
            }
        });

    }
}
function ReturnDuLieuXacNhan() {

}
function xacNhanNopDuHoSo(target,_check) {
    toastr.clear();
    toastr.remove();
    var grid = $('#gridThongTinThiSinhTrungTuyen');
    var models = $(grid).gridSelectedModels();
    var _txt = _check ? "Xác nhận Đã nộp đủ các hồ sơ đã chọn" : "Xác nhận Chưa nộp đủ các hồ sơ đã chọn";
    if (models != null && models.length > 0) {
        var lstobj = [];
        $.each(models, function (index, value) {
            lstobj.push(value.Id + "_" + value.HoDem + "_" +value.Ten);
        });
        if (lstobj != null && lstobj.length > 0) {
            if (CheckData()) {
                $('<div class="modal-backdrop fade in"></div>').appendTo(document.body);
                toastr.options.onclick = function () {
                    $('.modal-backdrop').remove();
                    toastr.remove();
                };
                toastr.success("<div style='text-align:right;'><button type='button' class='btn grey-cascade btn-sm' style='margin-right:15px;'>Không</button><button type='button' id='confirmDeleteYes' class='btn blue btn-sm'>Đồng ý</button><div><div class='clearfix'></div>", 'Bạn có chắc chắn muốn ' + _txt + ' ?',
                    {
                        closeButton: false,
                        allowHtml: true,
                        timeOut: 0,
                        extendedTimeOut: 0,
                        positionClass: 'toast-center toast-top-center',
                        onShown: function (toast) {
                            $("#confirmDeleteYes").click(function () {
                                $.ajax({
                                    url: '/TuyenSinhDangKy/XacNhanNopDuHoSoDanhSachThiSinhTrungTuyen',
                                    type: 'Post',
                                    async: false,
                                    data: {
                                        pGuid: lstobj.join(','),
                                        pCheckDaNop: _check
                                    },
                                    datatype: "html",
                                    success: function (data) {
                                        if (data.Errors == null || data.Errors == undefined || data.Errors.Warning == undefined || data.Errors.Warning == null) {
                                            $.success("Thực hiện thành công");
                                        } else {
                                            $.warning(data.Errors.Warning.errors);
                                        }
                                    },
                                    error: function (err) {
                                        $.warning(err);
                                    }
                                });

                                $(grid).gridRefresh(target);
                            });
                        }
                    });
            }
        } else {
            e.warning("Vui lòng chọn dữ liệu " + _txt);
        }
    }
    else {
        $.warning("Vui lòng chọn dữ liệu " + _txt);
    }
}
$(document).ready(function () {
    $.fn.select2.defaults.set('width', '100%'); $('.ArrIDTieuChiTS-multiple').select2();
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
        $("#cboNganh").data("kendoComboBox").value(null);
        $("#cboNganh").data("kendoComboBox").dataSource.read();
    });
    $('#cboLoaiDaoTao').change(function () {
        $("#cboNganh").data("kendoComboBox").value(null);
        $("#cboNganh").data("kendoComboBox").dataSource.read();
    });
    $('#cboNganh').change(function () {
        $("#cboChuyenNganh").data("kendoComboBox").value(null);
        $("#cboChuyenNganh").data("kendoComboBox").dataSource.read();
    });
    $('#pTuNgayNhapHoc').change(function () {
        ChangeNgayNhapHoc();
    });
    $('#pDenNgayNhapHoc').change(function () {
        var tempFrom = $('#pTuNgayNhapHoc').val();
        var arrFrom = tempFrom.split("/");
        var dateFrom = arrFrom[2] + '-' + arrFrom[1] + '-' + arrFrom[0];
        var xForm = new Date(dateFrom);
        var tempTo = $('#pDenNgayNhapHoc').val();
        var arrTo = tempTo.split("/");
        var dateTo = arrTo[2] + '-' + arrTo[1] + '-' + arrTo[0];
        var xTo = new Date(dateTo);
        var a = compare_dates(xForm, xTo);
        if (!compare_dates(xForm, xTo)) {
            xForm.setDate(xForm.getDate() + 7);
            var todayDate = kendo.toString(kendo.parseDate(xForm), 'dd/MM/yyyy');
            $("#pDenNgayNhapHoc").data('kendoDatePicker').value(todayDate);
            $.warning("Đến ngày nhập học không được phép nhỏ hơn từ ngày");
        }
    });
    $('#pTuNgayXetTrungTuyen').change(function () {
        ChangeNgayXetTrungTuyen();
    });
    $('#pDenNgayXetTrungTuyen').change(function () {
        var tempFrom = $('#pTuNgayXetTrungTuyen').val();
        var arrFrom = tempFrom.split("/");
        var dateFrom = arrFrom[2] + '-' + arrFrom[1] + '-' + arrFrom[0];
        var xForm = new Date(dateFrom);
        var tempTo = $('#pDenNgayXetTrungTuyen').val();
        var arrTo = tempTo.split("/");
        var dateTo = arrTo[2] + '-' + arrTo[1] + '-' + arrTo[0];
        var xTo = new Date(dateTo);
        var a = compare_dates(xForm, xTo);
        if (!compare_dates(xForm, xTo)) {
            xForm.setDate(xForm.getDate() + 7);
            var todayDate = kendo.toString(kendo.parseDate(xForm), 'dd/MM/yyyy');
            $("#pDenNgayXetTrungTuyen").data('kendoDatePicker').value(todayDate);
            $.warning("Đến ngày xét trúng tuyển không được phép nhỏ hơn từ ngày");
        }
    });
    $(".btnTraCuu").click(function (event) {
        LoadGird();
    });
    $("#btnXuatExcel").click(function (event) {
        loadingMarkFull();
        var grid = $('#gridThongTinThiSinhTrungTuyen').data("kendoGrid");
        if (grid == undefined || grid == null || grid.dataSource.total() <= 0) {
            $.warning("Không có dữ liệu để xuất excel");
            removeLoadingMarkFull();
            return;
        } else {
            post_to_url("/TuyenSinhDangKy/DanhSachThiSinhTrungTuyen_ExportMauMacDinh", ReturnDuLieuTimKiem(), 'post');
            removeLoadingMarkFull();
        }

    });
});
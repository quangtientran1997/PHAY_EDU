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
function addtionalNgheDaoTao() {
    var _cboDotTuyenSinh = $('#cboDotTuyenSinh').val();
    var _cboCoSo = $('#cboCoSo').val();
    var _cboHeDaoTao = $('#cboHeDaoTao').val();
    var _cboLoaiDaoTao = $('#cboLoaiDaoTao').val();
    var _cboNganh = $('#cboNganh').val();
    _cboDotTuyenSinh = (_cboDotTuyenSinh != undefined && _cboDotTuyenSinh != "" && _cboDotTuyenSinh != 0) ? _cboDotTuyenSinh : null;
    _cboCoSo = (_cboCoSo != undefined && _cboCoSo != "" && _cboCoSo != 0) ? _cboCoSo : null;
    _cboHeDaoTao = (_cboHeDaoTao != undefined && _cboHeDaoTao != "" && _cboHeDaoTao != 0) ? _cboHeDaoTao : null;
    _cboLoaiDaoTao = (_cboLoaiDaoTao != undefined && _cboLoaiDaoTao != "" && _cboLoaiDaoTao != 0) ? _cboLoaiDaoTao : null;
    _cboNganh = (_cboNganh != undefined && _cboNganh != "" && _cboNganh != 0) ? _cboNganh : null;
    return {
        pIDCoSo: _cboCoSo,
        pIDDotTuyenSinh: _cboDotTuyenSinh,
        pIDHeDaoTao: _cboHeDaoTao,
        pIDLoaiHinhDaoTao: _cboLoaiDaoTao,
        pIDNganh: _cboNganh
    }
}
function compare_dates(date1, date2) {
    if (date1 > date2) return (false);
    else if (date1 < date2) return (true);
    else return (false);
}
function ChangeTuNgay() {
    var temp = $('#pTuNgay').val();
    var arr = temp.split("/");
    var date = arr[2] + '-' + arr[1] + '-' + arr[0];
    var x = new Date(date);
    x.setDate(x.getDate() + 7);
    var todayDate = kendo.toString(kendo.parseDate(x), 'dd/MM/yyyy');
    $("#pDenNgay").data('kendoDatePicker').value(todayDate);
}
function reloadGrid(IdDot, IdCoSo) {
    loadingMarkFull();
    ClearHTML();
    var messageError = "";
    var _idDot = IdDot;
    var _idCoSo = IdCoSo;

    _idDot = (_idDot != undefined && _idDot != "" && _idDot != 0) ? _idDot : null;
    _idCoSo = (_idCoSo != undefined && _idCoSo != "" && _idCoSo != 0) ? _idCoSo : null;

    if (_idDot != null && _idCoSo != null) {
        $.ajax({
            url: '/TuyenSinhDangKy/DuyetHoSoThiSinhOnline',
            type: 'POST',
            dataType: 'html',
            data: {
                param: {
                    pIDDotTuyenSinh: _idDot,
                    pIDCoSo: _idCoSo
                }
            },
            beforeSend: function () {
                loadingMarkFull();
            },
            success: function (data) {
                removeLoadingMarkFull();
                $('#content').html(data);
            }
        });
    }
    else {
        if (_idDot == null) {
            messageError += "Chọn đợt tuyển sinh</br>";
        }
        if (_idCoSo == null) {
            messageError += "Chọn cơ sở</br>";
        }

        $.warning(messageError);
        removeLoadingMarkFull();
    }
}
function ThemHoSoThiSinh() {
    loadingMarkFull();
    var messageError = "";

    var _idDotTuyenSinh = $('#cboDotTuyenSinh').val();
    var _idCoSo = $('#cboCoSo').val();

    _idDotTuyenSinh = (_idDotTuyenSinh != undefined && _idDotTuyenSinh != "" && _idDotTuyenSinh != 0) ? _idDotTuyenSinh : null;
    _idCoSo = (_idCoSo != undefined && _idCoSo != "" && _idCoSo != 0) ? _idCoSo : null;

    if (_idDotTuyenSinh != null && _idCoSo != null) {
        $.ajax({
            url: '/TuyenSinhDangKy/ThemMoiHoSoThiSinh',
            type: 'POST',
            dataType: 'html',
            data: {
                param: {
                    pIDDotTuyenSinh: _idDotTuyenSinh,
                    pIDCoSo: _idCoSo
                }
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
        if (_idDotTuyenSinh == null) {
            messageError += "Chọn đợt tuyển sinh</br>";
        }
        if (_idCoSo == null) {
            messageError += "Chọn cơ sở</br>";
        }

        $.warning(messageError);
        removeLoadingMarkFull();
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
function gridDuyetList(target, url, isduyet) {
    toastr.clear();
    toastr.remove();
    var qt = "không duyệt"
    if (isduyet == true) {
        qt = "duyệt"
    }
    var grid = $('#gridHoSo');
    var models = $(grid).gridSelectedModels();
    if (models != null && models.length > 0) {
        var arr = [];
        $.each(models, function (index, value) {
            arr.push(value.ID);
        });
        if (arr.length > 0) {
            $('<div class="modal-backdrop fade in"></div>').appendTo(document.body);
            toastr.options.onclick = function () {
                $('.modal-backdrop').remove();
                toastr.remove();
            };
            toastr.success("<div style='text-align:right;'><button type='button' class='btn grey-cascade btn-sm' style='margin-right:15px;'>Không</button><button type='button' id='confirmDeleteYes' class='btn blue btn-sm'>Đồng ý</button><div><div class='clearfix'></div>", 'Bạn có chắc chắn muốn ' + qt + ' ?',
                {
                    closeButton: false,
                    allowHtml: true,
                    timeOut: 0,
                    extendedTimeOut: 0,
                    positionClass: 'toast-center toast-top-center',
                    onShown: function (toast) {
                        $("#confirmDeleteYes").click(function () {
                            var strID = arr.join(',');

                            var url_duyet = '/TuyenSinhDangKy/UpdateDuyetHoSo';
                            $.ajax({
                                url: url_duyet,
                                type: 'Post',
                                async: false,
                                data: {
                                    strID: strID,
                                    pIsDuyet: isduyet
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
        } else {
            e.warning("Vui lòng chọn dữ liệu");
        }
    }
    else {
        $.warning("Vui lòng chọn dữ liệu");
    }
}
function gridDuyetOne(target, id, isduyet) {
    toastr.clear();
    toastr.remove();
    var qt = "không duyệt"
    if (isduyet == true) {
        qt = "duyệt"
    }

    var grid = $('#gridHoSo');
    if (id != null && id > 0) {
        $('<div class="modal-backdrop fade in"></div>').appendTo(document.body);
        toastr.options.onclick = function () {
            $('.modal-backdrop').remove();
            toastr.remove();
        };
        toastr.success("<div style='text-align:right;'><button type='button' class='btn grey-cascade btn-sm' style='margin-right:15px;'>Không</button><button type='button' id='confirmDeleteYes' class='btn blue btn-sm'>Đồng ý</button><div><div class='clearfix'></div>", 'Bạn có chắc chắn muốn ' + qt + ' ?',
            {
                closeButton: false,
                allowHtml: true,
                timeOut: 0,
                extendedTimeOut: 0,
                positionClass: 'toast-center toast-top-center',
                onShown: function (toast) {
                    $("#confirmDeleteYes").click(function () {
                        var url_duyet = '/TuyenSinhDangKy/UpdateDuyetHoSo';
                        $.ajax({
                            url: url_duyet,
                            type: 'Post',
                            async: false,
                            data: {
                                strID: id,
                                pIsDuyet: isduyet
                            },
                            datatype: "json",
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
    else {
        $.warning("Vui lòng chọn dữ liệu");
    }
}
function gridListChuyenDotTuyenSinh(target) {
    toastr.clear();
    toastr.remove();
    var grid = $('#gridHoSo');
    var models = $(grid).gridSelectedModels();
    if (models != null && models.length > 0) {
        var arrID = [];
        $.each(models, function (index, value) {
            arrID.push(value.ID);
            //if (value.TrangThaiDuyet === 4 || value.TrangThaiDuyet === 5) {
            //    return $.warning("Không được chuyển đợt xét tuyển cho thí sinh trạng thái Trúng tuyển, Dự kiến trúng tuyển");
            //}
        });
        if (arrID.length > 0) {
            var strID = arrID.join(',');

            var url_chuyendot = '/TuyenSinhDangKy/ChuyenDotXetTuyen?strID=' + strID;
            $.ajax({
                url: url_chuyendot,
                type: 'Get',
                async: false,
                datatype: "html",
                success: function (data) {
                    $('<div id="popupChuyenDot"></div>').appendTo(document.body);
                    $('#popupChuyenDot').html(data);
                    $('#popupChuyenDot').kendoWindow({
                        visible: false,
                        title: "Cập nhật đợt xét tuyển",
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
function additionalTieuChiTuyenSinh() {
    var lstID_TieuChiHT = $('#TS_IDTieuChiHienThi').val();
    if (lstID_TieuChiHT == null || lstID_TieuChiHT == "" || lstID_TieuChiHT.trim().length <= 0) {
        idTieuChiTuyenSinh: "";
    }
    return {
        lstIDHienThi: lstID_TieuChiHT
    };
}
function guiMailThongBao(target) {
    toastr.clear();
    toastr.remove();
    var grid = $('#gridHoSo');
    var models = $(grid).gridSelectedModels();
    if (models != null && models.length > 0) {
        var arrID = [];
        $.each(models, function (index, value) {
            arrID.push(value.ID);
        });
        if (arrID.length > 0) {
            var strID = arrID.join(',');

            var url_guimail = '/TuyenSinhDangKy/GuiMailThongBao?strID=' + strID;
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
                        title: "Gửi mail thông báo",
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
function gridResetMatKhauList(target, url, isduyet) {
    toastr.clear();
    toastr.remove();
    var grid = $('#gridHoSo');
    var models = $(grid).gridSelectedModels();
    if (models != null && models.length > 0) {
        var arr = [];
        $.each(models, function (index, value) {
            arr.push(value.ID);
        });
        if (arr.length > 0) {
            $('<div class="modal-backdrop fade in"></div>').appendTo(document.body);
            toastr.options.onclick = function () {
                $('.modal-backdrop').remove();
                toastr.remove();
            };
            toastr.success("<div style='text-align:right;'><button type='button' class='btn grey-cascade btn-sm' style='margin-right:15px;'>Không</button><button type='button' id='confirmDeleteYes' class='btn blue btn-sm'>Đồng ý</button><div><div class='clearfix'></div>", 'Bạn có chắc chắn muốn cập nhật thông tin đăng nhập hồ sơ thí sinh ?',
                {
                    closeButton: false,
                    allowHtml: true,
                    timeOut: 0,
                    extendedTimeOut: 0,
                    positionClass: 'toast-center toast-top-center',
                    onShown: function (toast) {
                        $("#confirmDeleteYes").click(function () {
                            var strID = arr.join(',');
                            var url_duyet = '/TuyenSinhDangKy/UpdateThongTinDangNhapHoSoThiSinh';
                            $.ajax({
                                url: url_duyet,
                                type: 'Post',
                                async: false,
                                data: {
                                    pIDS: strID,
                                    pIsReset: true,
                                    pMatKhau: null
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
        } else {
            e.warning("Vui lòng chọn dữ liệu");
        }
    }
    else {
        $.warning("Vui lòng chọn dữ liệu");
    }
}
function CapNhatThongTinDangNhap(target,_id, _matkhau) {
    toastr.clear();
    toastr.remove();
    $('<div class="modal-backdrop fade in"></div>').appendTo(document.body);
    toastr.options.onclick = function () {
        $('.modal-backdrop').remove();
        toastr.remove();
    };
    toastr.success("<div style='text-align:right;'><button type='button' class='btn grey-cascade btn-sm' style='margin-right:15px;'>Không</button><button type='button' id='confirmDeleteYes' class='btn blue btn-sm'>Đồng ý</button><div><div class='clearfix'></div>", 'Bạn có chắc chắn muốn cập nhật thông tin đăng nhập hồ sơ thí sinh ?',
        {
            closeButton: false,
            allowHtml: true,
            timeOut: 0,
            extendedTimeOut: 0,
            positionClass: 'toast-center toast-top-center',
            onShown: function (toast) {
                $("#confirmDeleteYes").click(function () {
                    var arr = [];
                    arr.push(_id);
                    var url_duyet = '/TuyenSinhDangKy/UpdateThongTinDangNhapHoSoThiSinh';
                    $.ajax({
                        url: url_duyet,
                        type: 'Post',
                        async: false,
                        data: {
                            pIDS: arr.join(','),
                            pIsReset: false,
                            pMatKhau: _matkhau
                        },
                        datatype: "html",
                        success: function (data) {
                            if (data.Errors == null || data.Errors == undefined || data.Errors.Warning == undefined || data.Errors.Warning == null) {
                                $.success("Thực hiện thành công");
                                var grid = $('#gridHoSo');
                                $(grid).gridRefresh(target);
                            } else {
                                $.warning(data.Errors.Warning.errors);
                            }
                        },
                        error: function (err) {
                            $.warning(err);
                        }
                    });
                    
                });
            }
        });
} 
function gridDuyetTrungTuyenTrucTiepList(target, url, isduyet) {
    toastr.clear();
    toastr.remove();
    var qt = "không duyệt"
    if (isduyet == true) {
        qt = "duyệt"
    }
    var grid = $('#gridHoSo');
    var models = $(grid).gridSelectedModels();
    if (models != null && models.length > 0) {
        var arr = [];
        $.each(models, function (index, value) {
            arr.push(value.ID);
        });
        if (arr.length > 0) {
            $('<div class="modal-backdrop fade in"></div>').appendTo(document.body);
            toastr.options.onclick = function () {
                $('.modal-backdrop').remove();
                toastr.remove();
            };
            toastr.success("<div style='text-align:right;'><button type='button' class='btn grey-cascade btn-sm' style='margin-right:15px;'>Không</button><button type='button' id='confirmDeleteYes' class='btn blue btn-sm'>Đồng ý</button><div><div class='clearfix'></div>", 'Bạn có chắc chắn muốn ' + qt + ' trúng tuyển?',
                {
                    closeButton: false,
                    allowHtml: true,
                    timeOut: 0,
                    extendedTimeOut: 0,
                    positionClass: 'toast-center toast-top-center',
                    onShown: function (toast) {
                        $("#confirmDeleteYes").click(function () {
                            var strID = arr.join(',');
                            var url_duyet = '/TuyenSinhDangKy/DuyetKetQuaXetTuyenTrucTiep';
                            $.ajax({
                                url: url_duyet,
                                type: 'Post',
                                async: false,
                                data: {
                                    strID: strID,
                                    pIsDuyet: isduyet
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
        } else {
            e.warning("Vui lòng chọn dữ liệu");
        }
    }
    else {
        $.warning("Vui lòng chọn dữ liệu");
    }
}
function gridExportHoSoThiSinh(target) {
    toastr.clear();
    toastr.remove();
    var grid = $('#gridHoSo');
    var models = $(grid).gridSelectedModels();
    if (models != null && models.length > 0) {
        var arrID = [];
        $.each(models, function (index, value) {
            arrID.push(value.ID);
        });
        if (arrID != undefined
            && arrID != null
            && arrID != ""
            && arrID.length > 0) {
            var _url = '/TuyenSinhDangKy/ExportHoSoDinhKem?strID=' + arrID.join(',');
            $.ajax({
                url: _url,
                type: 'Get',
                async: false,
                datatype: "html",
                success: function (data) {
                    $('<div id="popupExportHoSoDinhkem"></div>').appendTo(document.body);
                    $('#popupExportHoSoDinhkem').html(data);
                    $('#popupExportHoSoDinhkem').kendoWindow({
                        visible: false,
                        title: "Xuất hồ sơ đính kèm",
                        modal: true,
                        close: () => { }
                    }).data('kendoWindow').center().open();
                }
            });
        } else {
            e.warning("Có lỗi xảy ra khi thao tác: không tìm thấy dữ liệu đã chọn");
        }
    }
    else {
        $.warning("Vui lòng chọn dữ liệu");
    }
}
$(document).ready(function () {
    $.fn.select2.defaults.set('width', '100%'); $('.ArrIDTrangThai-multiple').select2();
    $('#cboDotTuyenSinh').change(function () {
        $("#cboHeDaoTao").data("kendoComboBox").dataSource.read();
        $('#content').html('<div class="col-md-12" style="padding-top:15px"><div class="bold">Thông tin hồ sơ thí sinh</div></div>');
    });
    $('#cboCoSo').change(function () {
        $("#cboHeDaoTao").data("kendoComboBox").dataSource.read();
        $('#content').html('<div class="col-md-12" style="padding-top:15px"><div class="bold">Thông tin hồ sơ thí sinh</div></div>');
    });
    $('#pTuNgay').change(function () {
        ChangeTuNgay();
    });
    $('#pDenNgay').change(function () {
        var tempFrom = $('#pTuNgay').val();
        var arrFrom = tempFrom.split("/");
        var dateFrom = arrFrom[2] + '-' + arrFrom[1] + '-' + arrFrom[0];
        var xForm = new Date(dateFrom);
        var tempTo = $('#pDenNgay').val();
        var arrTo = tempTo.split("/");
        var dateTo = arrTo[2] + '-' + arrTo[1] + '-' + arrTo[0];
        var xTo = new Date(dateTo);
        var a = compare_dates(xForm, xTo);
        if (!compare_dates(xForm, xTo)) {
            xForm.setDate(xForm.getDate() + 7);
            var todayDate = kendo.toString(kendo.parseDate(xForm), 'dd/MM/yyyy');
            $("#pDenNgay").data('kendoDatePicker').value(todayDate);
            $.warning("Đến ngày không được phép nhỏ hơn từ ngày");
        }
    });
    $("#btnXuatExcel").click(function (event) {
        loadingMarkFull();
        var grid = $('#gridHoSo').data("kendoGrid");
        if (grid == undefined || grid == null) {
            $.warning("Không có dữ liệu để xuất excel");
            removeLoadingMarkFull();
            return;
        }
        else {
            var count = grid.dataSource.total();
            if (count > 0) {
                var _idTrangThai = $('.ArrIDTrangThai-multiple').select2('val');
                var _tuNgay = $("#pTuNgay").val() != "" ? $("#pTuNgay").data("kendoDatePicker").value().toJSON() : null;
                var _denNgay = $("#pDenNgay").val() != "" ? $("#pDenNgay").data("kendoDatePicker").value().toJSON() : null;
                var _pDotXetHS = $('#pDotXetHS').val();
                var _pTrangThaiInGBST = $('#pTrangThaiInGBST').val();
                var _pTrangThaiInGBGiuCho = $('#pTrangThaiInGBGiuCho').val();
                var _pDaLienLac = $('#pDaLienLac').val();
                var _pIDHinhNopHS = $('#pIDHinhNopHS').val();
                var _pIDNguonThongTin = $('#pIDNguonThongTin').val();
                var _pIDTieuChiTuyenSinh = $("#pIDTieuChiTuyenSinh").data('kendoComboBox').value();
                var _pIDTrangThaiNhapHoc = $('#pIDTrangThaiNhapHoc').val();
                var _txtSoCMND = $('#txtSoCMND').val();
                _pIDTrangThaiNhapHoc = (_pIDTrangThaiNhapHoc != undefined && _pIDTrangThaiNhapHoc != "" && _pIDTrangThaiNhapHoc != 0) ? _pIDTrangThaiNhapHoc : 1;
                post_to_url("/TuyenSinhDangKy/Export_XuatMauMacDinh",
                    {
                        pIDDotTuyenSinh: $("#cboDotTuyenSinh").val(),
                        pIDCoSo: $("#cboCoSo").val(),
                        pIDHeDaoTao: $("#cboHeDaoTao").val(),
                        pIDLoaiHinhDaoTao: $("#cboLoaiDaoTao").val(),
                        pIDNganh: $("#cboNganh").val(),
                        pIDChuyenNganh: $("#cboChuyenNganh").val(),
                        pMaHoSo: $("#txtMaHoSo").val(),
                        pHoTen: $("#txtHoTen").val(),
                        pArrTrangThai: _idTrangThai,
                        pTuNgay: _tuNgay,
                        pDenNgay: _denNgay,
                        pDotXetHS: _pDotXetHS,
                        pTrangThaiInGBST: _pTrangThaiInGBST,
                        pTrangThaiInGBGiuCho: _pTrangThaiInGBGiuCho,
                        pDaLienLac: _pDaLienLac != "" ? (_pDaLienLac == 1 ? true : false) : null,
                        pIDHinhNopHS: _pIDHinhNopHS,
                        pIDNguonThongTin: _pIDNguonThongTin,
                        pIDTieuChiTuyenSinh: _pIDTieuChiTuyenSinh,
                        pIDTrangThaiNhapHoc: _pIDTrangThaiNhapHoc,
                        pSoCMND: _txtSoCMND
                    }, 'post');
                removeLoadingMarkFull();
            }
            else {
                $.warning("Không có dữ liệu để xuất excel");
                removeLoadingMarkFull();
                return;
            }
        }

    });
    $("#btnXuatExcel2").click(function (event) {
        loadingMarkFull();
        var grid = $('#gridHoSo').data("kendoGrid");
        if (grid == undefined || grid == null) {
            $.warning("Không có dữ liệu để xuất excel");
            removeLoadingMarkFull();
            return;
        }
        else {
            var count = grid.dataSource.total();
            if (count > 0) {
                var _idTrangThai = $('.ArrIDTrangThai-multiple').select2('val');
                var _tuNgay = $("#pTuNgay").val() != "" ? $("#pTuNgay").data("kendoDatePicker").value().toJSON() : null;
                var _denNgay = $("#pDenNgay").val() != "" ? $("#pDenNgay").data("kendoDatePicker").value().toJSON() : null;
                var _pDotXetHS = $('#pDotXetHS').val();
                var _pTrangThaiInGBST = $('#pTrangThaiInGBST').val();
                var _pTrangThaiInGBGiuCho = $('#pTrangThaiInGBGiuCho').val();
                var _pDaLienLac = $('#pDaLienLac').val();
                var _pIDHinhNopHS = $('#pIDHinhNopHS').val();
                var _pIDNguonThongTin = $('#pIDNguonThongTin').val();
                var _pIDTieuChiTuyenSinh = $("#pIDTieuChiTuyenSinh").data('kendoComboBox').value();
                var _pIDTrangThaiNhapHoc = $('#pIDTrangThaiNhapHoc').val();
                var _txtSoCMND = $('#txtSoCMND').val();
                _pIDTrangThaiNhapHoc = (_pIDTrangThaiNhapHoc != undefined && _pIDTrangThaiNhapHoc != "" && _pIDTrangThaiNhapHoc != 0) ? _pIDTrangThaiNhapHoc : 1;
                post_to_url("/TuyenSinhDangKy/Export_XuatDanhSachXetTuyenOnline",
                    {
                        pIDDotTuyenSinh: $("#cboDotTuyenSinh").val(),
                        pIDCoSo: $("#cboCoSo").val(),
                        pIDHeDaoTao: $("#cboHeDaoTao").val(),
                        pIDLoaiHinhDaoTao: $("#cboLoaiDaoTao").val(),
                        pIDNganh: $("#cboNganh").val(),
                        pIDChuyenNganh: $("#cboChuyenNganh").val(),
                        pMaHoSo: $("#txtMaHoSo").val(),
                        pHoTen: $("#txtHoTen").val(),
                        pArrTrangThai: _idTrangThai,
                        pTuNgay: _tuNgay,
                        pDenNgay: _denNgay,
                        pDotXetHS: _pDotXetHS,
                        pTrangThaiInGBST: _pTrangThaiInGBST,
                        pTrangThaiInGBGiuCho: _pTrangThaiInGBGiuCho,
                        pDaLienLac: _pDaLienLac != "" ? (_pDaLienLac == 1 ? true : false) : null,
                        pIDHinhNopHS: _pIDHinhNopHS,
                        pIDNguonThongTin: _pIDNguonThongTin,
                        pIDTieuChiTuyenSinh: _pIDTieuChiTuyenSinh,
                        pIDTrangThaiNhapHoc: _pIDTrangThaiNhapHoc,
                        pSoCMND: _txtSoCMND
                    }, 'post');
                removeLoadingMarkFull();
            }
            else {
                $.warning("Không có dữ liệu để xuất excel");
                removeLoadingMarkFull();
                return;
            }
        }
    });
    $(".btnTraCuu").click(function (event) {
        loadingMarkFull();
        var messageError = "";
        var _idDotTuyenSinh = $('#cboDotTuyenSinh').val();
        var _idCoSo = $('#cboCoSo').val();
        var _idHeDaoTao = $('#cboHeDaoTao').val();
        var _idLoaiDaoTao = $('#cboLoaiDaoTao').val();
        var _idNganh = $('#cboNganh').val();
        var _idChuyenNganh = $('#cboChuyenNganh').val();
        var _txtMaHoSo = $('#txtMaHoSo').val();
        var _txtHoTen = $('#txtHoTen').val();
        var _idTrangThai = $('.ArrIDTrangThai-multiple').select2('val');
        var _tuNgay = $("#pTuNgay").val() != "" ? $("#pTuNgay").data("kendoDatePicker").value().toJSON() : null;
        var _denNgay = $("#pDenNgay").val() != "" ? $("#pDenNgay").data("kendoDatePicker").value().toJSON() : null;

        var _pDotXetHS = $('#pDotXetHS').val();
        var _pTrangThaiInGBST = $('#pTrangThaiInGBST').val();
        var _pTrangThaiInGBGiuCho = $('#pTrangThaiInGBGiuCho').val();
        var _pDaLienLac = $('#pDaLienLac').val();
        var _pIDHinhNopHS = $('#pIDHinhNopHS').val();
        var _pIDNguonThongTin = $('#pIDNguonThongTin').val();
        var _pIDTieuChiTuyenSinh = $("#pIDTieuChiTuyenSinh").data('kendoComboBox').value();
        var _pIDTrangThaiNhapHoc = $('#pIDTrangThaiNhapHoc').val();
        var _txtSoCMND = $('#txtSoCMND').val();
        _idDotTuyenSinh = (_idDotTuyenSinh != undefined && _idDotTuyenSinh != "" && _idDotTuyenSinh != 0) ? _idDotTuyenSinh : null;
        _idCoSo = (_idCoSo != undefined && _idCoSo != "" && _idCoSo != 0) ? _idCoSo : null;
        _pIDTrangThaiNhapHoc = (_pIDTrangThaiNhapHoc != undefined && _pIDTrangThaiNhapHoc != "" && _pIDTrangThaiNhapHoc != 0) ? _pIDTrangThaiNhapHoc : 1;
        if (_idDotTuyenSinh != null && _idCoSo != null) {
            $.ajax({
                url: '/TuyenSinhDangKy/DuyetHoSoThiSinhOnline',
                type: 'POST',
                dataType: 'html',
                data: {
                    param: {
                        pIDDotTuyenSinh: _idDotTuyenSinh,
                        pIDCoSo: _idCoSo,
                        pIDHeDaoTao: _idHeDaoTao,
                        pIDLoaiHinhDaoTao: _idLoaiDaoTao,
                        pIDNganh: _idNganh,
                        pIDChuyenNganh: _idChuyenNganh,
                        pMaHoSo: _txtMaHoSo,
                        pHoTen: _txtHoTen,
                        pArrTrangThai: _idTrangThai,
                        pTuNgay: _tuNgay,
                        pDenNgay: _denNgay,
                        pDotXetHS: _pDotXetHS,
                        pTrangThaiInGBST: _pTrangThaiInGBST,
                        pTrangThaiInGBGiuCho: _pTrangThaiInGBGiuCho,
                        pDaLienLac: _pDaLienLac != "" ? (_pDaLienLac == 1 ? true : false) : null,
                        pIDHinhNopHS: _pIDHinhNopHS,
                        pIDNguonThongTin: _pIDNguonThongTin,
                        pIDTieuChiTuyenSinh: _pIDTieuChiTuyenSinh,
                        pIDTrangThaiNhapHoc: _pIDTrangThaiNhapHoc,
                        pSoCMND: _txtSoCMND
                    }
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
            if (_idDotTuyenSinh == null) {
                messageError += "Chọn đợt tuyển sinh</br>";
            }
            if (_idCoSo == null) {
                messageError += "Chọn cơ sở</br>";
            }

            $.warning(messageError);
            removeLoadingMarkFull();
        }
    });
    $('#cboHeDaoTao').change(function () {
        $("#cboLoaiDaoTao").data("kendoComboBox").value(null);
        $("#cboLoaiDaoTao").data("kendoComboBox").dataSource.read();
        $("#cboNganh").data("kendoComboBox").value(null);
        $("#cboNganh").data("kendoComboBox").dataSource.read();
        $("#cboChuyenNganh").data("kendoComboBox").value(null);
        $("#cboChuyenNganh").data("kendoComboBox").dataSource.read();
    });
    $('#cboLoaiDaoTao').change(function () {
        $("#cboNganh").data("kendoComboBox").value(null);
        $("#cboNganh").data("kendoComboBox").dataSource.read();
        $("#cboChuyenNganh").data("kendoComboBox").value(null);
        $("#cboChuyenNganh").data("kendoComboBox").dataSource.read();
    });
    $('#cboNganh').change(function () {
        $("#cboChuyenNganh").data("kendoComboBox").value(null);
        $("#cboChuyenNganh").data("kendoComboBox").dataSource.read();
    });
});
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
function additionalTieuChiTuyenSinh() {
    var lstID_TieuChiHT = $('#TS_IDTieuChiHienThi').val();
    if (lstID_TieuChiHT == null || lstID_TieuChiHT == "" || lstID_TieuChiHT.trim().length <= 0) {
        idTieuChiTuyenSinh: "";
    }
    return {
        lstIDHienThi: lstID_TieuChiHT
    };
}
function ReturnDuLieuTimKiem() {
    var _idDotTuyenSinh = $('#cboDotTuyenSinh').val();
    var _idCoSo = $('#cboCoSo').val();
    var _idHeDaoTao = $('#cboHeDaoTao').val();
    var _idLoaiDaoTao = $('#cboLoaiDaoTao').val();
    var _idNganh = $('#cboNganh').val();
    var _idTieuChiTuyenSinh = $("#cboTieuChiTuyenSinh").data('kendoComboBox').value();
    var _idDotXetHS = $('#cboDotXetHS').val();
    var _idTrangThaiGuiMail = $('#cboTrangThaiGuiMail').val();
    var _idTrangThaiThiSinh = $('#cboTrangThaiThiSinh').val();
    var _maHoSo = $('#txtMaHoSo').val();
    var _idTrangThaiNhapHoSo = $('#cboTrangThaiNhapHoSo').val();
    _idDotTuyenSinh = (_idDotTuyenSinh != undefined && _idDotTuyenSinh != "" && _idDotTuyenSinh != 0) ? _idDotTuyenSinh : null;
    _idCoSo = (_idCoSo != undefined && _idCoSo != "" && _idCoSo != 0) ? _idCoSo : null;
    _idTieuChiTuyenSinh = (_idTieuChiTuyenSinh != undefined && _idTieuChiTuyenSinh != "" && _idTieuChiTuyenSinh != 0) ? _idTieuChiTuyenSinh : null;
    _idDotXetHS = (_idDotXetHS != undefined && _idDotXetHS != "" && _idDotXetHS != 0) ? _idDotXetHS : null;
    return {
        pIDDotTuyenSinh: _idDotTuyenSinh,
        pIDCoSo: _idCoSo,
        pIDHeDaoTao: _idHeDaoTao,
        pIDLoaiHinhDaoTao: _idLoaiDaoTao,
        pIDNganh: _idNganh,
        pIDTieuChiTuyenSinh: _idTieuChiTuyenSinh,
        pIDDotXetHS: _idDotXetHS,
        pIDTrangThaiGuiMail: _idTrangThaiGuiMail,
        pIDTrangThaiHoSo: _idTrangThaiThiSinh,
        pMaHoSo: _maHoSo,
        pMode: 0,
        pTuNgayDangKy: null,
        pDenNgayDangKy: null,
        pTuNgayGuiMaiOnline: null,
        pDenNgayGuiMaiOnline: null,
        pIDTrangThaiNhapHoSo: _idTrangThaiNhapHoSo
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
            url: '/TuyenSinhDangKy/DuyetKetQuaXetTuyen',
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
function gridDuyetList(target, url, isduyet) {
    toastr.clear();
    toastr.remove();
    var qt = "không duyệt";
    var url_duyet = '/TuyenSinhDangKy/Update_DuyetKetQuaXetTuyen';
    if (isduyet == true) {
        qt = "duyệt";
    }
    var grid = $('#gridThongTinSinhVienKQXT');
    var models = $(grid).gridSelectedModels();
    if (models != null && models.length > 0) {
        var arr = [];
        $.each(models, function (index, value) {
            arr.push(value.Id);
        });
        if (arr != null && arr.length > 0) {
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
                                        $.success("Thực hiện " + qt + " kết quả xét tuyển thành công");
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
            e.warning("Có lỗi xảy ra khi " + qt + " kết quả xét tuyển");
            removeLoadingMarkFull();
            return;
        }
    }
    else {
        $.warning("Vui lòng chọn dữ liệu " + qt + " kết quả xét tuyển");
        removeLoadingMarkFull();
        return;
    }
}
function gridHuyKQXTList(target, url) {
    toastr.clear();
    toastr.remove();
    var _url = '/TuyenSinhDangKy/HuyKQXT_DuyetKetQuaXetTuyen';
    var grid = $('#gridThongTinSinhVienKQXT');
    var models = $(grid).gridSelectedModels();
    if (models != null && models.length > 0) {
        var arr = [];
        $.each(models, function (index, value) {
            arr.push(value.Id);
        });
        if (arr != null && arr.length > 0) {
            $('<div class="modal-backdrop fade in"></div>').appendTo(document.body);
            toastr.options.onclick = function () {
                $('.modal-backdrop').remove();
                toastr.remove();
            };
            toastr.success("<div style='text-align:right;'><button type='button' class='btn grey-cascade btn-sm' style='margin-right:15px;'>Không</button><button type='button' id='confirmDeleteYes' class='btn blue btn-sm'>Đồng ý</button><div><div class='clearfix'></div>", 'Bạn có chắc chắn muốn Hủy kết quả xét tuyển?',
                {
                    closeButton: false,
                    allowHtml: true,
                    timeOut: 0,
                    extendedTimeOut: 0,
                    positionClass: 'toast-center toast-top-center',
                    onShown: function (toast) {
                        $("#confirmDeleteYes").click(function () {
                            var strID = arr.join(',');
                            $.ajax({
                                url: _url,
                                type: 'Post',
                                async: false,
                                data: {
                                    strID: strID
                                },
                                datatype: "html",
                                success: function (data) {
                                    if (data.Errors == null || data.Errors == undefined || data.Errors.Warning == undefined || data.Errors.Warning == null) {
                                        $.success("Thực hiện Hủy kết quả xét tuyển thành công");
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
            e.warning("Có lỗi xảy ra khi Hủy kết quả xét tuyển");
            removeLoadingMarkFull();
            return;
        }
    }
    else {
        $.warning("Vui lòng chọn dữ liệu Hủy kết quả xét tuyển");
        removeLoadingMarkFull();
        return;
    }
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
        $("#cboNganh").data("kendoComboBox").value(null);
        $("#cboNganh").data("kendoComboBox").dataSource.read();
    });
    $('#cboLoaiDaoTao').change(function () {
        $("#cboNganh").data("kendoComboBox").value(null);
        $("#cboNganh").data("kendoComboBox").dataSource.read();
    });
    $(".btnTraCuu").click(function (event) {
        LoadGird();
    });
    $("#btnXuatExcelDuyetKQXT").click(function (event) {
        loadingMarkFull();
        var check = 0;
        var grid = $('#gridThongTinSinhVienKQXT').data("kendoGrid");
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
            post_to_url("/TuyenSinhDangKy/Export_DuyetKetQuaXetTuyen", ReturnDuLieuTimKiem(), 'post');
            removeLoadingMarkFull();
        }
    });
    $("#btnGuiMailXetTuyen").click(function (event) {
        loadingMarkFull();
        var models = $('#gridThongTinSinhVienKQXT').gridSelectedModels();
        if (models != null && models.length > 0) {
            var arrID = [];
            $.each(models, function (index, value) {
                arrID.push(value.Id);
            });
            if (arrID != null && arrID.length > 0) {
                $.ajax({
                    url: '/TuyenSinhDangKy/GuiMailTrungTuyen',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        param: ReturnDuLieuTimKiem(),
                        pIDs: arrID.join(',')
                    },
                    beforeSend: function () {
                        loadingMarkFull();
                    },
                    success: function (mess) {
                        removeLoadingMarkFull();
                        if (mess != null && mess != undefined && mess == "") {
                            $.success("Thực hiện gửi mail duyệt kết quả thành công ");
                            LoadGird();
                        }
                        else {
                            $.warning(mess);
                        }
                        removeLoadingMarkFull();
                    },
                    error: function (err) {
                        $.warning(err);
                        removeLoadingMarkFull();
                    }
                });

            } else {
                $.warning("Có lỗi xảy ra khi gửi mail trúng tuyển: không có dữ liệu");
                removeLoadingMarkFull();
                return;
            }

        } else {
            $.warning("Vui lòng chọn dữ liệu để gửi mail trúng tuyển");
            removeLoadingMarkFull();
            return;
        }
    });
    $("#btnGuiMailNhacNhoHoSo").click(function (event) {
        loadingMarkFull();
        var models = $('#gridThongTinSinhVienKQXT').gridSelectedModels();
        if (models != null && models.length > 0) {
            var arrID = [];
            $.each(models, function (index, value) {
                arrID.push(value.Id);
            });
            if (arrID != null && arrID.length > 0) {
                $.ajax({
                    url: '/TuyenSinhDangKy/GuiMailNhacNhoNhapDuHoSo',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        param: ReturnDuLieuTimKiem(),
                        pIDs: arrID.join(',')
                    },
                    beforeSend: function () {
                        loadingMarkFull();
                    },
                    success: function (mess) {
                        removeLoadingMarkFull();
                        if (mess != null && mess != undefined && mess == "") {
                            $.success("Thực hiện gửi mail nhắc nhở thành công ");
                            LoadGird();
                        }
                        else {
                            $.warning(mess);
                        }
                        removeLoadingMarkFull();
                    },
                    error: function (err) {
                        $.warning(err);
                        removeLoadingMarkFull();
                    }
                });

            } else {
                $.warning("Có lỗi xảy ra khi gửi mail nhắc nhở: không có dữ liệu");
                removeLoadingMarkFull();
                return;
            }

        } else {
            $.warning("Vui lòng chọn dữ liệu để gửi mail  nhắc nhở");
            removeLoadingMarkFull();
            return;
        }
    });
});
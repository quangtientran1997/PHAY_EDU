R.V_User = {
    Init: function () {
        R.V_User.RegisterEvent();
        R.V_User.FirstDetail();
        R.V_User.CheckAddThanhVienWhenBinding('.tbl-tham-gia', '#gridThanhVien');
        R.V_User.ControllerBase = "/NCKHDeTaiCapQuocTe"
    },
    RegisterEvent: function () {

        
        $('.send-request-yc').off('click').on('click', function () {
            var kichbanId = $(this).data('kbht');
            R.V_User.ViewRequestYeuCau(kichbanId);
            
        })

        $('.gui-request-yc').off('click').on('click', function () {
            var param = {
                IDYeuCau: 0,
                IDDeTai: R.V_User.GetCurrentDeTaiId(),
                LoaiYeuCau: 1, //Loai yeu cau kich ban xet duyet
                ChiTietYeuCauMetaData: "",
                NoiDungYeuCau: CKEDITOR.instances['noi-dung-yeu-cau'].getData(),
                IsChuyenKichBan: 1
            }
            
            console.log(param);
            R.V_User.SendRequestYeuCau(param);
        })

        $('.select-dt').off('click').on('click', function () {
            //remove active class
            $('.select-dt').each(function (element) {
                $(this).removeClass('active');
            })
            $(this).addClass('active');
            var id = $(this).data('id');
            R.V_User.GetDetailByDeTaiID(id);
        })
        $('.add-detai').off('click').on('click', function () {
            var id = 0;
            R.V_User.ViewSaveDeTai(id);
        })
        $('._btnDelete_more').off('click').on('click', function () {
            $(this).closest('tr').remove();
        })
        $('._btnDelete').off('click').on('click', function () {
            $(this).closest('tr').remove();
        })
        $('.save-dt').off('click').on('click', function () {
            R.V_User.SaveDeTai();
            
        })
        $('.add-tptg-more').off('click').on('click', function () {
            //alert(1);
            R.V_User.AddThanhVienNgoaiHeThong();
        })
        $('.add-tptg').off('click').on('click', function () {
            R.V_User.PopupAddThanhVien();
        })
        $('#gridThanhVien input[type=checkbox]').off('change').on('change', function () {
            var $row = $(this).closest('tr');
            var dataItem = $("#gridThanhVien").data("kendoGrid").dataItem($row);
            if ($(this).is(':checked')) {
                R.V_User.ToRootAddThanhVien("._root_addtgpt", dataItem);
            }
            if ($(this).is(':checked') == false) {

                R.V_User.ToRootRemoveThanhVien(".tbl-tham-gia", dataItem);
            }

        })
        $('#close').off('click').on('click', function () {
            $("#gridThanhVien").kendoGrid('destroy').empty();
            $('#popup-chonthanhphan').html('')
        })
        $('.close-modal').off('click').on('click', function () {
            R.V_User.CloseKendoPopup();
        })
    },
    CloseKendoPopup: function () {
        $('.window-popup').kendoWindowClose();
    },
    SendRequestYeuCau: function (param) {
        debugger
        var url = R.V_User.ControllerBase + "/SaveRequestYeuCau"
        $.post(url, param, function (response) {
            $.success(response);
            $('.gui-request-yc').text("Đã gửi yêu cầu");
            $('.gui-request-yc').prop("disabled", true);
            R.V_User.RegisterEvent();

            R.V_User.CloseKendoPopup();
            R.V_User.GetDetailByDeTaiID(R.V_User.GetCurrentDeTaiId);
            
        })
    },
    GetCurrentDeTaiId: function () {
        //select-dt
        var id = 0;
        $('.select-dt').each(function (elm) {
            if ($(this).hasClass('active')) {
                id = $(this).data('id');
                return id;
            }
        })
        return id;
    },
    SaveDeTai: function () {
        var idDeTai = $('#ID').val();
        var idThongBao = $('#IDThongBao').val();
        var maDeTai = $('#Ma').val();
        var tenDeTai = $('#Ten').val();
        var tenQuocTe = $('#TenQuocTe').val();
        var dvtt = $('#DonViTienTe').val();
        var kp_dukien = $('#KP_DuKien').val();
        var ngaybd = $('#NgayBatDau').val();
        var ngaykt = $('#NgayKetThuc').val();
        var ngaydknt = $('#NgayDKNgiemThu').val();
        var idCapDo = $('#IDCapDo').val();
        var idLinhVuc = $('#IDLinhVuc').val();
        var idNam = $('#IDNam').val();
        var idTrangThai = $('#IDTrangThai').val();
        var nhanSuHeThong = [];
        $('.tbl-tham-gia').find('.cloned').each(function (element) {
            //console.log($(this));
            var id = $(this).find('._id').attr('value');
            //$(this).find('_vaitro').removeAttr('onchange');
            var vaitro = $(this).find('._vaitro').val();
            var tv = {
                IDDeTai: idDeTai,
                IDNhanSu: parseInt(id),
                IDVaiTro: parseInt(vaitro)
            }
            nhanSuHeThong.push(tv);
        });
        var nhanSuNgoaiHeThong = [];
        $('.ngoai-the-thong').find('.cloned_more').each(function (element) {
            var tv = {
                IDDeTai: idDeTai,
                Ma: $(this).find('._ma_more').val(),
                Ten: $(this).find('._ten_more').val(),
                HocVi: $(this).find('._hocvi_more').val(),
                DonVi: $(this).find('._donvi_more').val(),
                ChuyenMon: $(this).find('._chuyenmon_more').val(),
                DienThoai: $(this).find('._dienthoai_more').val(),
                Email: $(this).find('._email_more').val(),
                VaiTro: parseInt($(this).find('._vaitro_more').val())
            }
            nhanSuNgoaiHeThong.push(tv);
        })



        var tomtat = $('.mtdt-tom-tat').val();
        var muctieu = CKEDITOR.instances['mtdt-muc-tieu'].getData();
        var noidung = CKEDITOR.instances['mtdt-noi-dung'].getData();
        var mota = CKEDITOR.instances['mtdt-san-pham'].getData();

        var noiDungMetaData = {
            TomTat: tomtat,
            MucTieu: muctieu,
            NoiDung: noidung,
            MoTa: mota
        }

        var param = {
            ID: idDeTai,
            IdThongBao: parseInt(idThongBao),
            MaDeTai: maDeTai,
            TenDeTai: tenDeTai,
            TenQuocTe: tenQuocTe,
            Dvtt: dvtt,
            Kp_dukien: parseFloat(kp_dukien),
            Ngaybd: R.V_User.ConvertDateTimeKendo(ngaybd),
            Ngaykt: R.V_User.ConvertDateTimeKendo(ngaykt),
            Ngaydknt: R.V_User.ConvertDateTimeKendo(ngaydknt),
            IdCapDo: parseInt(idCapDo),
            IdLinhVuc: parseInt(idLinhVuc),
            IdNam: parseInt(idNam),
            IdTrangThai: parseInt(idTrangThai),
            NhanSuHeThong: JSON.stringify(nhanSuHeThong),
            NhanSuNgoaiHeThong: JSON.stringify(nhanSuNgoaiHeThong),
            NoiDungMetaData: JSON.stringify(noiDungMetaData)
        }
        
        //Bat kiem tra
        var isOk = false;
        var errorMsg = [];
        if (idThongBao == 0 || idThongBao === "undefined") 
            errorMsg.push("Mời chọn ID Thông báo");
        if (maDeTai == "" || maDeTai === "undefined")
            errorMsg.push("Mời bạn nhập Mã đề tài");
        if (tenDeTai == "" || tenDeTai === "undefined")
            errorMsg.push("Mời bạn nhập Tên đề tài");
        if (idNam == 0 || idNam === "undefined")
            errorMsg.push("Mời chọn Niên khóa");
        if (idLinhVuc == 0 || idLinhVuc === "undefined")
            errorMsg.push("Mời chọn Lĩnh vực");
        if (errorMsg.length == 0)
            isOk = true;

        if (!isOk) {
            var htm = "";
            for (var i = 0; i < errorMsg.length; i++) {
                htm += "<ul>";
                htm += "<li>" + errorMsg[i] + "</li>";
                htm += "</ul>";
            }
            console.log(param);
            //console.log(htm);
            $.warning(htm);
        }

        if (isOk) {
            var url = "/NCKHDeTaiCapQuocTe/SaveDeTaiQuocTe";
            console.log(param);
            $.post(url, param, function (response) {
                $.success(response);
                R.V_User.CloseKendoPopup();
            })
        }
            
        
    },
    AddThanhVienNgoaiHeThong: function () {
        console.log()
        var $cloneParent = $('._root_addtgpt_more');
        var $r = $cloneParent.last().clone();
        $r.addClass('cloned_more');
        $r.css("display", "");
        $('.ngoai-the-thong').append($r)
    },
    PopupAddThanhVien: function () {
        var url = "/NCKHDeTaiCapQuocTe/ViewAddThanhVien";
        $.post(url, null, function (response) {
            
            $('#popup-chonthanhphan').html('').html(response);
            
            R.V_User.RegisterEvent();
            //console.log(response);
        })
    },
    ViewRequestYeuCau: function (kichbanId) {
        var url = R.V_User.ControllerBase + "/ViewSendReQuestYeuCau?kichbanId=" + kichbanId + "&isManager=0";
        var t = "Yêu cầu";
        $('.main-detail').gridPopupEditor('popupYeuCau', url, t);
    },
    ViewSaveDeTai: function (id) {
        var url = "/NCKHDeTaiCapQuocTe/pViewSaveDeTai?id=" + id;
        var t = "";
        if (id > 0)
            t = "Cập nhật";
        if (id <= 0)
            t = "Tạo mới";

        $('.main-detail').gridPopupEditor('popupAddUpdate', url, t);

    },
    ToRootAddThanhVien: function (elClone, paramsArr) {
        //Kiem tra neu co roi thi khong can them vao lai nua; neu unckeck thi phai bo di


        var elm = paramsArr;
        var $r = $(elClone).last().clone();
        $r.addClass('cloned');
        $r.find('._id').attr('value', elm.IdNhanSu);
        $r.find('._ma').text(elm.MaNhanSu);
        $r.find('._ten').text(elm.Ten);
        $r.find('._hocvi').text(elm.TenHocVi);
        $r.find('._donvi').text(elm.TenDonVi);
        $r.find('._chuyenmon').text(elm.TenChuyenMon);
        $r.find('._dienthoai').text(elm.SoDienThoai);
        //$r.find('._vaitro').text(elm.Ten);
        $r.css('display', '');
        //console.log($r);
        $(elClone).parent().append($r);

        //R.V_User.RegisterEvent();
    },
    ToRootRemoveThanhVien: function (elRoot, paramsArr) {
        console.log(paramsArr);
        $(elRoot).find('tr.cloned').each(function (element) {
            var id = parseInt($(this).find('._id').attr('value'));
            if (id == paramsArr.IdNhanSu) {
                $(this).remove();
            }

            //$(this).remove();
        });

    },
    CheckAddThanhVienWhenBinding: function (elRoot, elBinding) {
        var idList = [];
        $(elRoot).find('.cloned').each(function (element) {
            var id = $(this).find('._id').attr('value');
            idList.push(parseInt(id));
        });
        console.log(idList);

        $(elBinding).find('tbody tr').each(function (element) {

            var $row = $(this);
            //console.log($row);
            var dataItem = $("#gridThanhVien").data("kendoGrid").dataItem($row);
            var idcker = dataItem.IdNhanSu;
            for (var a = 0; a < idList.length; a++)
                if (idcker == idList[a])
                    $row.find('input[type=checkbox]').prop('checked', true);
            //console.log(dataItem);


        })

    },
    GetDetailByDeTaiID: function (id) {
        var url = "/NCKHDeTaiCapQuocTe/pViewChiTietDeTai?id=" + id;
        $.get(url, function (res) {
            $('.detail-container').html('').html(res);
            $('#tabNoiDung ._vaitro').each(function (element) {
                $(this).prop('disabled', true)
            })
            R.V_User.RegisterEvent();
        })
    },
    FirstDetail: function () {
        var r = $('.select-dt.active').data('id');
        //console.log(r)
        R.V_User.GetDetailByDeTaiID(r);
    },
    ConvertDateTimeKendo: function (d) {
        if (d != null && d != "") {
            var spl = d.split("/");
            var date = spl[0];
            var month = spl[1];
            var year = spl[2];
            return year + '-' + month + '-' + date;
        }
    }
}
R.V_User.Init();
R.V_Manager = {
    Init: function () {
        R.V_Manager.ControllerBase = "/NCKHDeTaiCapQuocTe";
        R.V_Manager.StatusBatDau = 1;
        R.V_Manager.StatusHuy = 31;
        R.V_Manager.StatusTrienKhai = 12;
        R.V_Manager.CheckAddThanhVienWhenBinding('.tbl-tham-gia', '#gridThanhVien');
        R.V_Manager.FormatAllNumber();
        R.V_Manager.SetUpGiaoDienGrid();
        R.V_Manager.PhanQuyenNutRequestResponse();
        R.V_Manager.HiddenButton();
        //R.V_Manager.PickingCurrentTab();
        R.V_Manager.SelectedDeTaiId = 0;
        R.V_Manager.RegisterEvent();
    },
    HiddenButton: function () {
        $('.response-yeu-cau').each(function (element) {
            if ($(this).data('yeucauid') <= 0) {
                $(this).prop('disabled', true);
                $(this).removeClass('btn-success');
                $(this).text('Hiện không có yêu cầu mới');
            }
        })
        $('.request-yeu-cau').each(function (element) {
            if ($(this).data('yeucauid') > 0) {
                $(this).prop('disabled', true);
                $(this).removeClass('btn-success');
                $(this).text('Yêu cầu đã được gửi');
            }
            //yeucaukpid
        })

        $('.request-yeu-cau-kinh-phi').each(function (element) {

            if ($(this).data('yeucaukpid') > 0) {
                $(this).prop('disabled', true);
                $(this).removeClass('btn-success');
                $(this).text('Yêu cầu đã được gửi');
            }
        }) 
    },
    SetUpGiaoDienGrid: function () {

        $('.k-master-row').each(function () {
            var $row = $(this);
            var dataItem = $("#gridDeTai").data("kendoGrid").dataItem($row);
            //console.log(dataItem);
            var idTrangThai = dataItem.IDTrangThai;
            if (idTrangThai >= R.V_Manager.StatusTrienKhai) {
                $row.find('._edit_de_tai').closest('td').remove();
                $row.find('._delete_de_tai').text("Hủy").addClass('huy-de-tai').removeClass('_delete_de_tai').data('id', dataItem.ID);
            }
            if (idTrangThai == R.V_Manager.StatusHuy) {
                var $grouped = $row.find('.can-group').first();
                $grouped.addClass('grouped').removeClass('can-group');
                var numberrow = 0;
                $row.find('.can-group').each(function (element) {
                    numberrow++;
                    $(this).remove();
                })
                var htm = "";
                htm += "<button class=\"btn btn-danger\" style=\"float:right;\" disabled>";
                htm += "Đề tài đã bị hủy";
                htm += "</button>";
                $row.find('.grouped').first().attr('colspan', numberrow+1).html('').html(htm);
                
            }
        })
        $('#popupAddUpdate').find('input').each(function (element) {
            if ($(this).val() == "0")
                $(this).val('')
        })
        R.V_Manager.RegisterEvent();

    },
    RegisterEvent: function () {
        $('.huy-de-tai').off('click').on('click', function () {
            var id = $(this).data('id');
            R.Confirm("Bạn có muốn hủy đề tài", function () {
                R.V_Manager.HuyDeTai(id);
            })
            //R.V_Manager.HuyDeTai();
        })
        $('._delete_de_tai').off('click').on('click', function () {
            var id = $(this).data('id');
            R.Confirm("Bạn có muốn xóa đề tài", function () {
                R.V_Manager.XoaDeTai(id);
            })
            //R.V_Manager.HuyDeTai();
        })
        $('.close-modal').off('click').on('click', function () {
            R.V_Manager.CloseKendoPopup();
        })
        $('.close-kendo-tab').off('click').on('click', function () {
            R.V_Manager.CloseKendoPopup();
        })
        $('._chi_tiet_xet_duyet').off('click').on('click', function () {
            var id = $(this).data('id');
            R.V_Manager.ViewDetailYeuCau(id);
        })
        $('._add-hop-dong').off('click').on('click', function () {

            var id = 0;
            R.V_Manager.ViewSaveHopDong(id);

        });
        $('#btn_Search').off('click').on('click', function () {
            //alert(1);
            R.V_Manager.ReloadGrid();
        })
        $('._lich_su_giai_ngan_yc').off('click').on('click', function () {
            var id = $(this).data('giainganid');
            R.V_Manager.ViewChiTietGiaiNgan(id);

        })
        $('.request-yeu-cau').off('click').on('click', function () {
            var kbhientai = $(this).data('kichbanhientai');
            var idDeTai = $(this).data('iddetai');

            sessionStorage.setItem("idDeTai", idDeTai);

            R.V_Manager.ViewRequestYeuCau(kbhientai, idDeTai);

        })
        $('.request-yeu-cau-kinh-phi').off('click').on('click', function () {
            var kbhientai = $(this).data('kichbanhientai');
            var idDeTai = $(this).data('iddetai');

            sessionStorage.setItem("idDeTai", idDeTai);

            R.V_Manager.ViewRequestYeuCau(kbhientai, idDeTai);
        })
        $('.response-yeu-cau').off('click').on('click', function () {
            var kichbanId = $(this).data('kichbanhientai');
            //var kichbanId = 1;
            var yeucauId = $(this).data('yeucauid');
            var loai = $(this).data('loai');
            var param = {
                idYeuCau: yeucauId,
                idKichBan: kichbanId,
                loai: loai
            }

            R.V_Manager.ViewResponseYeuCau(param);

        })
        $('.gui-request-yc').off('click').on('click', function () {
            //debugger
            //ChiTietYeuCauMetaData
            var $file = $('#ChiTietYeuCauMetaData');
            var file = [];
            $file.find('li').each(function (elm) {
                var link = $(this).find('a').attr('href');
                var name = $(this).find('a').text();
                var pfile = {
                    Link: link,
                    Name: name,
                }
                file.push(pfile)
            });
            var hoiDongId = 0;
            var hoiDongName = "";
            var $slbHoiDong = $('select[class=chon-hoi-dong]');
            if ($slbHoiDong !== "undefined") {
                hoiDongId = $slbHoiDong.val();
                hoiDongName = $slbHoiDong.find(':selected').text();
            }
            var p = {
                HoiDongId: hoiDongId,
                HoiDongName: hoiDongName,
                Files: file
            }
            chiTietMetaData = JSON.stringify(p);
            var idDeTai = sessionStorage.getItem("idDeTai");
            var param = {
                IDYeuCau: 0,
                IDDeTai: parseInt(idDeTai),
                LoaiYeuCau: 1, //Loai yeu cau kich ban xet duyet
                ChiTietYeuCauMetaData: chiTietMetaData,
                NoiDungYeuCau: CKEDITOR.instances['noi-dung-yeu-cau'].getData(),
                IsChuyenKichBan: 1
            }
            console.log(param);
            R.V_Manager.SendRequestYeuCau(param);
        })
        $('.gui-response-yc').off('click').on('click', function () {
            var yeucauId = $(this).data('idyeucau');
            var trangThaiXetDuyet = $('.trang-thai-xet-duyet').val();
            var chiTietMetaData = "";

            var $file = $('#ChiTietXetDuyetMetaData');

            var file = [];
            $file.find('li').each(function (elm) {
                var link = $(this).find('a').attr('href');
                var name = $(this).find('a').text();
                var pfile = {
                    Link: link,
                    Name: name,
                }
                file.push(pfile)
            });

            var hoiDongId = 0;
            var hoiDongName = "";
            var $slbHoiDong = $('select[class=chon-hoi-dong]');
            if ($slbHoiDong !== "undefined") {
                hoiDongId = $slbHoiDong.val();
                hoiDongName = $slbHoiDong.find(':selected').text();
            }
            var p = {
                HoiDongId: hoiDongId,
                HoiDongName: hoiDongName,
                Files: file
            }
            chiTietMetaData = JSON.stringify(p);
            var NoiDungXetDuyet = CKEDITOR.instances['noi-dung-xet-duyet'].getData();

            var param = {
                IDYeuCau: yeucauId,
                TrangThaiXetDuyet: parseInt(trangThaiXetDuyet),
                ChiTietXetDuyetMetaData: chiTietMetaData,
                NoiDungXetDuyet: NoiDungXetDuyet
            }
            if (yeucauId > 0) {
                R.V_Manager.SaveResponseYeuCau(param);
                console.log(param)
            }

        })
        $('.gui-response-yc-kinh-phi').off('click').on('click', function () {
            var yeucauId = $(this).data('idyeucau');
            var trangThaiXetDuyet = $('.trang-thai-xet-duyet').val();
            var chiTietMetaData = "";

            var $file = $('#ChiTietXetDuyetMetaData');

            var file = [];
            $file.find('li').each(function (elm) {
                var link = $(this).find('a').attr('href');
                var name = $(this).find('a').text();
                var pfile = {
                    Link: link,
                    Name: name,
                }
                file.push(pfile)
            });

            var hoiDongId = 0;
            var hoiDongName = "";
            var $slbHoiDong = $('select[class=chon-hoi-dong]');
            if ($slbHoiDong !== "undefined") {
                hoiDongId = $slbHoiDong.val();
                hoiDongName = $slbHoiDong.find(':selected').text();
            }
            var p = {
                HoiDongId: hoiDongId,
                HoiDongName: hoiDongName,
                Files: file
            }
            chiTietMetaData = JSON.stringify(p);
            var NoiDungXetDuyet = CKEDITOR.instances['noi-dung-xet-duyet'].getData();

            var param = {
                IDYeuCau: yeucauId,
                TrangThaiXetDuyet: parseInt(trangThaiXetDuyet),
                ChiTietXetDuyetMetaData: chiTietMetaData,
                NoiDungXetDuyet: NoiDungXetDuyet
            }
            if (yeucauId > 0) {
                R.V_Manager.SaveResponseYeuCauKinhPhi(param);
                //console.log(param)
            }
        })
        $('.close_modal').off('click').on('click', function () {
            R.V_Manager.CloseKendoPopup();
        })
        $('._edit_de_tai').off('click').on('click', function () {
            var id = $(this).data('id');
            R.V_Manager.ViewSaveDeTai(id);
        })
        $('.save-dt').off('click').on('click', function () {
            R.V_Manager.SaveDeTai();

        })
        $('._btnDelete_more').off('click').on('click', function () {
            $(this).closest('tr').remove();
        })
        $('._btnDelete').off('click').on('click', function () {
            $(this).closest('tr').remove();
        })
        $('.save-dt').off('click').on('click', function () {
            R.V_Manager.SaveDeTai();

        })
        $('.add-tptg-more').off('click').on('click', function () {
            //alert(1);
            R.V_Manager.AddThanhVienNgoaiHeThong();
        })
        $('.add-tptg').off('click').on('click', function () {
            R.V_Manager.PopupAddThanhVien();
        })
        $('#gridThanhVien input[type=checkbox]').off('change').on('change', function () {
            var $row = $(this).closest('tr');
            var dataItem = $("#gridThanhVien").data("kendoGrid").dataItem($row);
            if ($(this).is(':checked')) {
                R.V_Manager.ToRootAddThanhVien("._root_addtgpt", dataItem);
            }
            if ($(this).is(':checked') == false) {

                R.V_Manager.ToRootRemoveThanhVien(".tbl-tham-gia", dataItem);
            }

        })
        $('#close').off('click').on('click', function () {
            $("#gridThanhVien").kendoGrid('destroy').empty();
            $('#popup-chonthanhphan').html('')
        })
        $('.them-moi-de-tai').off('click').on('click', function () {
            var id = 0;
            R.V_Manager.ViewSaveDeTai(id);
        })
        $('.gui-request-yc-kinh-phi').off('click').on('click', function () {
            var $file = $('#ChiTietYeuCauMetaData');
            var file = [];
            $file.find('li').each(function (elm) {
                var link = $(this).find('a').attr('href');
                var name = $(this).find('a').text();
                var pfile = {
                    Link: link,
                    Name: name,
                }
                file.push(pfile)
            });
            var hoiDongId = 0;
            var hoiDongName = "";
            var $slbHoiDong = $('select[class=chon-hoi-dong]');
            if ($slbHoiDong !== "undefined") {
                hoiDongId = $slbHoiDong.val();
                hoiDongName = $slbHoiDong.find(':selected').text();
            }

            var p = {
                HoiDongId: hoiDongId,
                HoiDongName: hoiDongName,
                Files: file
            }
            var param = {
                IDYeuCau: 0,
                IdDeTai: $('.id-de-tai-kp').data('id'),
                ChiTietYeuCauMetaData: JSON.stringify(p),
                KinhPhiYeuCau: parseFloat($('._so_tien_de_xuat').val()),
                NoiDungYeuCau: CKEDITOR.instances['noi-dung-yeu-cau'].getData(),
            }
            R.V_Manager.SendRequestYeuCauKinhPhi(param);
        });
        $('.save-lich-su-giai-ngan').off('click').on('click', function () {
            var sotien = $('#thuc-tien-giai-ngan').val();
            var idgiaingan = $(this).data('id');
            var chiTietGiaiNgan = "";
            var param = {
                IDLichSu: 0,
                IDGiaiNgan: idgiaingan,
                SoTienGiaiNgan: sotien,
                ChiTietGiaiNganMetaData: chiTietGiaiNgan
            }
            R.V_Manager.SaveLichSuGiaiNgan(param);
        });
        $('.add-ung-dung').off('click').on('click', function () {
            //_root_ung_dung
            R.V_Manager.AddUngDungDeTai();
        })
        $('.xoa-ung-dung').off('click').on('click', function () {
            $(this).closest('tr').remove();
        })
        $('._file_remove').off('click').on('click', function () {
            $(this).closest('tr').remove();
        })
        $('._save_hop_dong').off('click').on('click', function () {
            var id = $('._hopdong_id').data('id');
            var idDeTai = $('.box-tabs-detai').data('id');
            var ten = $('._hopdong_ten').val();
            var noidung = CKEDITOR.instances['noi-dung-hop-dong'].getData();
            var file = [];
            $('.tbl-hop-dong').find('tr').each(function (element) {
                var name = $(this).find('._file_name').text();
                var link = $(this).find('._file_link').attr('href');
                var pfile = {
                    Link: link,
                    Name: name,
                }
                file.push(pfile)
            })
            var param = {
                Id: id,
                IdDeTai: idDeTai,
                Ten: ten,
                NoiDung: noidung,
                FileDinhKemMetaData: JSON.stringify(file)
            }
            //console.log(param);
            R.V_Manager.SaveHopDong(param);
        })
        $('._sua-hop-dong').off('click').on('click', function () {
            var id = $(this).data('id');
            R.V_Manager.ViewSaveHopDong(id);
        })
        $('._xoa-hop-dong').off('click').on('click', function () {
            var id_affected = $('.box-tabs-detai').data('id');
            var ids = [];
            var id = $(this).data('id');
            ids.push(id);
            R.Confirm("Bạn muốn xóa hợp đồng?", function () {

                R.V_Manager.XoaHopDong(ids.toString(), id_affected);
            })

        });
        $('._add-tien-do').off('click').on('click', function () {
            var id = 0;
            R.V_Manager.ViewSaveTienDo(id);
        });
        $('._save_tien_do').off('click').on('click', function () {
            var mota = "";
            var ngaybatdau = R.V_Manager.ConvertDateTimeKendo($('#NgayBatDau').val());
            var ngayketthuc = R.V_Manager.ConvertDateTimeKendo($('#NgayKetThuc').val());
            var nguoithuchien = $('._tiendo_nguoi_thuc_hien').val();
            var tennguoithuchien = $('._tiendo_nguoi_thuc_hien option:selected').text();
            var nd = CKEDITOR.instances['noi-dung-tien-do'].getData();
            var kq = CKEDITOR.instances['ket-qua-tien-do'].getData();
            var file = [];
            $('.tbl-tien-do').find('tr').each(function (element) {
                var name = $(this).find('._file_name').text();
                var link = $(this).find('._file_link').attr('href');
                var pfile = {
                    Link: link,
                    Name: name,
                }
                file.push(pfile)
            })
            var json_NCKH_DTQT_NoiDungTienDo = {
                NoiDung: nd,
                KetQua: kq,
                IdNguoiBaoCao: nguoithuchien,
                TenNguoiBaoCao: tennguoithuchien,
                Files: file
            }
            var param = {
                ID: $('._tiendo_id').data('id'),
                IDDeTai: $('.box-tabs-detai').data('id'),
                MoTa: mota,
                NoiDung: JSON.stringify(json_NCKH_DTQT_NoiDungTienDo),
                NgayBatDau: ngaybatdau,
                NgayKetThuc: ngayketthuc
            }
            console.log(param);
            R.V_Manager.SaveBaoCaoTienDo(param);
        })
        $('._sua-tien-do').off('click').on('click', function () {
            var id = $(this).data('id');
            R.V_Manager.ViewSaveTienDo(id)
        })
        $('._xoa-tien-do').off('click').on('click', function () {
            var id_affected = $('.box-tabs-detai').data(id);
            var ids = [];
            var id = $(this).data('id');
            ids.push(id);
            R.Confirm("Bạn muốn xóa báo cáo tiến độ?", function () {

                R.V_Manager.XoaBaoCaoTienDo(ids.toString(), id_affected);
            })
        })
        $('#nhom-the-loai').off('change').on('change', function () {
            R.V_Manager.ChangeNhomTheLoai();
        })
        $('._bao_cao_tien_do').off('click').on('click', function () {
            var idTienDo = $(this).data('id');
            R.V_Manager.ViewSaveBaoCaoTienDo(idTienDo)
        })
        $('._save_bao_cao_tien_do').off('click').on('click', function () {
            var id = $(this).data('id');
            R.V_Manager.SaveBaoCaoTienDoDeTai(id);
        })
        $('._check_tien_do').off('change').on('change', function () {
            //Tat tat ca
            $('._check_tien_do').each(function (element) {
                $(this).prop('checked', false);

                $('._binding_bao_cao_tr_').each(function (element) {
                    
                    $(this).css('display', 'none');
                })
            })
            if ($(this).prop('checked', true)) {
                //alert(true);
                $(this).prop('checked', false);
            }
            if ($(this).prop('checked', false)) {
                //alert(false);
                $(this).prop('checked', true);
                var idTienDo = $(this).data('number');
                R.V_Manager.BindingBaoCaoTienDoTbl(idTienDo);
            }
            
            //Bat kiem tra 
            
        })
    },
    BindingBaoCaoTienDoTbl: function (id) {
        var url = R.V_Manager.ControllerBase + "/pViewChiTietXetDuyetTienDoTable?idTienDo=" + id;
        $.get(url, function (response) {
            //Tim den tr co number tuong tu
            $('._binding_bao_cao_tr_').each(function (element) {
                if ($(this).data('number') == parseInt(id)) {
                    $(this).css('display', '');
                    $(this).find('._binding_bao_cao_td').html('').html(response);
                }
            })
            R.V_Manager.RegisterEvent();
        })
    },
    SaveBaoCaoTienDoDeTai: function (idTienDo) {
     

        var IdBaoCao = 0;
        var IdTienDo = idTienDo;
        var TrangThai = $('input[name="_baocao_tiendo_trangthai"]:checked').data('value');
        var IdNhanSu = $('._baocao_tiendo_nguoi_thuc_hien').val();
        var TenNhanSu = $('._baocao_tiendo_nguoi_thuc_hien option:selected').text();
        var ngayBaoCao = R.V_Manager.ConvertDateTimeKendo($('#NgayBaoCao').val());
        var noidung = CKEDITOR.instances["noi-dung-bao-cao"].getData();
        var ketqua = CKEDITOR.instances["ket-qua-bao-cao"].getData();
        var file = [];
        $('.tbl-tien-do').find('tr').each(function (element) {
            var name = $(this).find('._file_name').text();
            var link = $(this).find('._file_link').attr('href');
            var pfile = {
                Link: link,
                Name: name,
            }
            file.push(pfile)
        })
        var param = {
            IdBaoCao: IdBaoCao,
            IdTienDo: IdTienDo,
            IdNhanSu: IdNhanSu,
            TenNhanSu: TenNhanSu,
            NgayBaoCao: ngayBaoCao,
            NoiDung: noidung,
            KetQua: ketqua,
            Files: JSON.stringify(file),
            TrangThai: TrangThai
        }
        console.log(param);
        var url = R.V_Manager.ControllerBase + '/SaveBaoCaoTienDoThucHien';
        //$.post(url, param, function (response) {
        //    $.success(response);
        //})

    },
    ReloadDetailGrid: function (id) {
        var rl_url = "/NCKHDeTaiCapQuocTe/pViewChiTietDeTai?id=" + id;
        $.get(rl_url, function (response) {
            $('.detail-de-tai').html('').html(response);
            R.V_Manager.RegisterEvent();
        })
    },
    XoaHopDong: function (ids, id_affected) {
        var url = R.V_Manager.ControllerBase + "/DeleteHopDongs?ids=" + ids;
        $.get(url, function (response) {
            $.success(response);
            R.V_Manager.ReloadDetailGrid(id_affected);
        })
    },
    ChangeNhomTheLoai: function () {
        var id = $('#nhom-the-loai').val();
        if (id === "undefined")
            id = 0;
        var url = R.V_Manager.ControllerBase + "/pViewChangeNhomTheLoai?id=" + id;
        $.get(url, function (response) {
            $('#the-loai-binding').html('').html(response);
            $('#popupAddUpdate').find('input').each(function (element) {
                if ($(this).val() == "0")
                    $(this).val('')
            })
            R.V_Manager.RegisterEvent();
        })
    },
    XoaBaoCaoTienDo: function (ids, id_affected) {
        var url = R.V_Manager.ControllerBase + "/DeleteHopDongs?ids=" + ids;
        $.get(url, function (response) {
            $.success(response);
            R.V_Manager.ReloadDetailGrid(id_affected);
        })
    },
    XoaDeTai: function (id) {
        var param = {
            id: id
        }
        var url = R.V_Manager.ControllerBase + "/XoaDeTaiQuocTe";
        $.post(url, param, function (response) {
            $.success(response);
            R.V_Manager.ReloadGrid();
            R.V_Manager.RegisterEvent();
        })
    },
    HuyDeTai: function (id) {
        var param = {
            id: id
        }
        var url = R.V_Manager.ControllerBase + "/HuyDeTaiQuocTe";
        $.post(url, param, function (response) {
            $.success(response);
            R.V_Manager.ReloadGrid();
            R.V_Manager.RegisterEvent();
        })
    },
    ViewDetailYeuCau: function (id) {
        var url = R.V_Manager.ControllerBase + "/pViewChiTietYeuCau?idYeuCau=" + id;
        var t = "Chi tiết";
        $('.main-detail').gridPopupEditor('popupChiTietYeuCau', url, t);
    },
    SaveBaoCaoTienDo: function (param) {
        var url = R.V_Manager.ControllerBase + "/SaveBaoCaoTienDo";
        $.post(url, param, function (response) {
            $.success(response);
            R.V_Manager.CloseKendoPopup();
            var rl_url = "/NCKHDeTaiCapQuocTe/pViewChiTietDeTai?id=" + param.IdDeTai;
            $.get(rl_url, function (response) {
                $('.detail-de-tai').html('').html(response);
                
                R.V_Manager.RegisterEvent();
            })
        })
    },
    ViewSaveBaoCaoTienDo: function (id) {
        var idDeTai = $('.box-tabs-detai').data('id');
        var url = R.V_Manager.ControllerBase + "/pViewXetDuyetTienDo?id=" + id + '&detaiId=' + idDeTai;
        var t = "";
        if (id > 0)
            t = "Cập nhật";
        if (id <= 0)
            t = "Tạo mới";
        $('.main-detail').gridPopupEditor('popupAddUpdateTienDo', url, t);
    },
    ViewSaveTienDo: function (id) {
        var idDeTai = $('.box-tabs-detai').data('id');
        var url = R.V_Manager.ControllerBase + "/pViewAddTienDo?id=" + id + '&detaiId=' + idDeTai;
        var t = "";
        if (id > 0)
            t = "Cập nhật";
        if (id <= 0)
            t = "Tạo mới";
        $('.main-detail').gridPopupEditor('popupAddUpdateTienDo', url, t);
    },
    DeleteHopDongs: function (ids) {
        var param = {
            ids: ids
        }
        var url = R.V_Manager.ControllerBase + "/DeleteHopDongs";
        $.post(url, param, function (response) {
            $.success(response);
        })
    },
    SaveHopDong: function (param) {
        var url = R.V_Manager.ControllerBase + "/SaveHopDong";
        $.post(url, param, function (response) {
            $.success(response);
            R.V_Manager.CloseKendoPopup();
            var rl_url = "/NCKHDeTaiCapQuocTe/pViewChiTietDeTai?id=" + param.IdDeTai;
            $.get(rl_url, function (response) {
                $('.detail-de-tai').html('').html(response);
                $('.nav').find('li').each(function (element) {
                    $(this).removeClass('active');
                    $(this).find('a').attr('aria-expanded', false);
                })
                $('.nav').find('a').each(function (element) {
                    //$(this).removeClass('active');
                    if ($(this).attr('href') == "#tabHopDong") {
                        $(this).parent().addClass('active');
                        $(this).attr('aria-expanded', true);
                    }
                        
                })
                $('.detail-de-tai').find('#tabHoiDong').toggle();
                R.V_Manager.RegisterEvent();
            })
        })
    },
    SaveLichSuGiaiNgan: function (param) {
        //SaveLichSuGiaiNgan
        var url = R.V_Manager.ControllerBase + "/SaveLichSuGiaiNgan";
        $.post(url, param, function (response) {
            $.success(response);
            R.V_Manager.RegisterEvent();
            R.V_Manager.ReloadGrid();
            R.V_Manager.CloseKendoPopup();
        })
        //console.log(param);
    },
    AddTableHoSoDeTai: function () {
        var $file = $('#FileLuuTruMetaData');
        var file = [];
        $file.find('li').each(function (elm) {
            var link = $(this).find('a').attr('href');
            var name = $(this).find('a').text();
            var pfile = {
                Link: link,
                Name: name,
            }
            file.push(pfile)
        });
        var htm = "";
        for (var i = 0; i < file.length; i++) {
            htm += "<tr>";

            htm += "<td class=\"_file_name\" style=\"width:80%;\">" + file[i].Name + "</td>"
            htm += "<td style=\"width: 10%\">" + "<a class=\"_file_link\" href=\"" + file[i].Link + "\">Link</a>" + "</td>"
            htm += "<td>" + "<button class=\"_file_remove\">x</button>" + "</td>"

            htm += "</tr>";
        }
        $('.tbl-ho-so-de-tai tbody').html('').html(htm);
        R.V_Manager.RegisterEvent();
    },
    AddTableHopDongDeTai: function () {
        var $file = $('#FileDinhKemMetaData');
        var file = [];
        $file.find('li').each(function (elm) {
            var link = $(this).find('a').attr('href');
            var name = $(this).find('a').text();
            var pfile = {
                Link: link,
                Name: name,
            }
            file.push(pfile)
        });
        var htm = "";
        for (var i = 0; i < file.length; i++) {
            htm += "<tr>";

            htm += "<td class=\"_file_name\" style=\"width:80%;\">" + file[i].Name + "</td>"
            htm += "<td style=\"width: 10%\">" + "<a class=\"_file_link\" href=\"" + file[i].Link + "\">Link</a>" + "</td>"
            htm += "<td>" + "<button class=\"_file_remove\">x</button>" + "</td>"

            htm += "</tr>";
        }
        $('.tbl-hop-dong tbody').append(htm);
        R.V_Manager.RegisterEvent();
    },
    AddTableTienDoThucHien: function () {
        var $file = $('#NoiDung');
        var file = [];
        $file.find('li').each(function (elm) {
            var link = $(this).find('a').attr('href');
            var name = $(this).find('a').text();
            var pfile = {
                Link: link,
                Name: name,
            }
            file.push(pfile)
        });
        var htm = "";
        for (var i = 0; i < file.length; i++) {
            htm += "<tr>";

            htm += "<td class=\"_file_name\" style=\"width:80%;\">" + file[i].Name + "</td>"
            htm += "<td style=\"width: 10%\">" + "<a class=\"_file_link\" href=\"" + file[i].Link + "\">Link</a>" + "</td>"
            htm += "<td>" + "<a href=\"javascript:void(0)\" class=\"_file_remove\">x</a>" + "</td>"

            htm += "</tr>";
        }
        $('.tbl-tien-do tbody').append(htm);
        R.V_Manager.RegisterEvent();
    },
    ViewChiTietGiaiNgan: function (id) {
        var url = R.V_Manager.ControllerBase + "/ViewLichSuGiaiNgan?idGiaiNgan=" + id;
        console.log(url);
        $('.main-detail').gridPopupEditor('popupLSGN', url, "Xem lịch sử");
    },
    ViewSaveHopDong: function (id) {
        var url = "/NCKHDeTaiCapQuocTe/pViewSaveHopDong?idHopDong=" + id;
        var t = "";
        if (id > 0)
            t = "Cập nhật";
        if (id <= 0)
            t = "Tạo mới";

        $('.main-detail').gridPopupEditor('popupAddUpdateHopDong', url, t);
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
    SaveDeTai: function () {
        var idDeTai = $('.current-detai-id').data('id');
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
        var idTheLoai = $('#IDTheLoai').val();
        var idQuocGia = $('#IDQuocGia').val();

        //FileLuuTruMetaData
        var $file = $('#FileLuuTruMetaData');
        var file = [];
        $('.tbl-ho-so-de-tai').find('tr').each(function (elm) {
            var name = $(this).find('._file_name').text();
            var link = $(this).find('._file_link').attr('href');
            var pfile = {
                Link: link,
                Name: name,
            }
            file.push(pfile)
        });
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

        var ungdung = [];
        $('.body-ung-dung .cloned_ung_dung').each(function (element) {
            var u = {
                LinhVuc: $(this).find('.linh-vuc-ung-dung').val(),
                NoiDung: $(this).find('.noi-dung-ung-dung').val(),
            }
            ungdung.push(u);
        })

        var noiDungMetaData = {
            TomTat: tomtat,
            MucTieu: muctieu,
            NoiDung: noidung,
            MoTa: mota,
            UngDungs: ungdung
        }

        var param = {
            ID: idDeTai,
            IdThongBao: parseInt(idThongBao),
            MaDeTai: maDeTai,
            TenDeTai: tenDeTai,
            TenQuocTe: tenQuocTe,
            Dvtt: dvtt,
            Kp_dukien: parseFloat(kp_dukien),
            Ngaybd: R.V_Manager.ConvertDateTimeKendo(ngaybd),
            Ngaykt: R.V_Manager.ConvertDateTimeKendo(ngaykt),
            Ngaydknt: R.V_Manager.ConvertDateTimeKendo(ngaydknt),
            IdCapDp: parseInt(idCapDo),
            IdLinhVuc: parseInt(idLinhVuc),
            IdTheLoai: parseInt(idTheLoai),
            IdQuocGia: parseInt(idQuocGia),
            IdNam: parseInt(idNam),
            IdTrangThai: parseInt(idTrangThai),
            NhanSuHeThong: JSON.stringify(nhanSuHeThong),
            NhanSuNgoaiHeThong: JSON.stringify(nhanSuNgoaiHeThong),
            NoiDungMetaData: JSON.stringify(noiDungMetaData),
            FileLuuTruMetaData: JSON.stringify(file)
        }
        //console.log(param);
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
            //console.log(param);
            //console.log(htm);
            $.warning(htm);
        }

        if (isOk) {
            var url = "/NCKHDeTaiCapQuocTe/SaveDeTaiQuocTe";
            console.log(param);
            $.post(url, param, function (response) {
                $.success(response);
                R.V_Manager.ReloadGrid();
                R.V_Manager.CloseKendoPopup();

            })
        }


    },
    FormatAllNumber: function () {
        $('.number-format').each(function (element) {
            var x = $(this).text();
            $(this).text(R.V_Manager.FormatNumber(x));
        })
    },
    FormatNumber: function (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    AddUngDungDeTai: function () {
        console.log()
        var $cloneParent = $('._root_ung_dung');
        var $r = $cloneParent.last().clone();
        $r.addClass('cloned_ung_dung');
        $r.removeClass("_root_ung_dung");
        $r.css("display", "");
        $('._root_ung_dung').parent().append($r)
        R.V_Manager.RegisterEvent();
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

            R.V_Manager.RegisterEvent();
            //console.log(response);
        })
    },
    ReloadGrid: function () {
        $('#gridDeTai').data('kendoGrid').dataSource.read();
    },
    CloseKendoPopup: function () {
        $('.window-popup').kendoWindowClose();
    },
    SendRequestYeuCau: function (param) {
        var url = R.V_Manager.ControllerBase + "/SaveRequestYeuCau"
        $.post(url, param, function (response) {
            $.success(response);
            $('.request-yeu-cau').text("Đã gửi yêu cầu");
            $('.request-yeu-cau').prop("disabled", true);
            sessionStorage.removeItem("idDeTai");
            R.V_Manager.RegisterEvent();

            R.V_Manager.CloseKendoPopup();
            R.V_Manager.CloseKendoPopup();
            R.V_Manager.ReloadGrid();
            //R.V_Manager.GetDetailByDeTaiID(R.V_Manager.GetCurrentDeTaiId);

        })
    },
    PhanQuyenNutRequestResponse: function () {
        var list = $('.list_quyen_active').data('listquyen');
        var quyenRequest = [];
        var quyenResponse = [];
        //console.log(list);
        list.forEach(function (element) {
            //console.log(element);
            if (element.startsWith('request_')) {
                var id = element.split('_')[1];
                if (id !== 'undefined')
                    quyenRequest.push(parseInt(id));
            }
            if (element.startsWith('response_')) {
                var id = element.split('_')[1];
                if (id !== 'undefined')
                    quyenResponse.push(parseInt(id));
            }
        })
        $('.response-yeu-cau').each(function (element) {
            var kbId = $(this).data('kichbanhientai');
            if (quyenResponse.indexOf(kbId) == -1) {
                $(this).text('Không đủ quyền');
                $(this).prop('disabled', true);
                $(this).removeClass('btn-success');
            }
                
            

        })
        $('.request-yeu-cau').each(function (element) {
            var kbId = $(this).data('kichbanhientai');
            if (quyenRequest.indexOf(kbId) == -1) {
                $(this).text('Không đủ quyền');
                $(this).prop('disabled', true);
                $(this).removeClass('btn-success');
            }
                
            
            //yeucaukpid
        })

        $('.request-yeu-cau-kinh-phi').each(function (element) {
            var kbId = $(this).data('kichbanhientai');
            if (quyenRequest.indexOf(kbId) == -1) {
                $(this).text('Không đủ quyền');
                $(this).prop('disabled', true);
                $(this).removeClass('btn-success');
            }
                
            
        }) 
        //console.log(quyenRequest, quyenResponse);

    },
    SendRequestYeuCauKinhPhi: function (param) {
        //console.log(param);
        var url = R.V_Manager.ControllerBase + "/SaveRequestYeuCauKinhPhi";
        $.post(url, param, function (response) {
            $.success(response);
            R.V_Manager.ReloadGrid();
            R.V_Manager.CloseKendoPopup();
            R.V_Manager.RegisterEvent();
        })
    },
    ViewRequestYeuCau: function (kichbanId, idDeTai) {
        var url = R.V_Manager.ControllerBase + "/ViewSendReQuestYeuCau?kichbanId=" + kichbanId + "&idDetai=" + idDeTai;
        var t = "Yêu cầu";
        $('.main-detail').gridPopupEditor('popupYeuCau', url, t);
    },
    CloseKendoPopup: function () {
        $('.window-popup').kendoWindowClose();
    },
    SaveResponseYeuCau: function (param) {
        //Kiem tra
        var checker = false;
        if (param.TrangThaiXetDuyet > 0)
            checker = true;

        var url = R.V_Manager.ControllerBase + "/SaveResponseYeuCau";
        if (checker) {
            $.post(url, param, function (response) {
                $.success(response);
                R.V_Manager.CloseKendoPopup();
                R.V_Manager.ReloadGrid();
            })
        } else {
            $.warning("Chọn trạng thái xét duyệt");
        }

    },
    SaveResponseYeuCauKinhPhi: function (param) {
        //Kiem tra
        var checker = false;
        if (param.TrangThaiXetDuyet > 0)
            checker = true;

        var url = R.V_Manager.ControllerBase + "/SaveResponseYeuCauKinhPhi";
        if (checker) {
            $.post(url, param, function (response) {
                $.success(response);
                R.V_Manager.CloseKendoPopup();
                R.V_Manager.ReloadGrid();
            })
        } else {
            $.warning("Chọn trạng thái xét duyệt");
        }

    },
    ViewResponseYeuCau: function (param) {
        var url = R.V_Manager.ControllerBase + "/ViewResponseYeuCau?idYeuCau=" + param.idYeuCau + "&idKichBan=" + param.idKichBan + "&type=" + param.loai;
        console.log(url);
        var t = "Yêu cầu";
        $('.main-detail').gridPopupEditor('popupYeuCau', url, t);
    },
    CollapseDetailDeTai: function (id) {
        var url = "/NCKHDeTaiCapQuocTe/pViewChiTietDeTai?id=" + id;
        $.get(url, function (res) {
            $('.detail-de-tai').html('').html(res);
            //$('#tabNoiDung ._vaitro').each(function (element) {
            //    $(this).prop('disabled', true)
            //})
            //R.V_Manager.PickingCurrentTab();
            R.V_Manager.PhanQuyenNutRequestResponse();
            R.V_Manager.RegisterEvent();
        })
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
        //console.log(paramsArr)
        //console.log($r);
        $(elClone).parent().append($r);

        //R.V_Manager.RegisterEvent();
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
    ConvertDateTimeKendo: function (d) {
        if (d != null && d != "") {
            var spl = d.split("/");
            var date = spl[0];
            var month = spl[1];
            var year = spl[2];
            return year + '-' + month + '-' + date;
        }
    },
    PickingCurrentTab: function (el) {
        $('#tabHoSo').toggle();
    }
}
R.V_Manager.Init();
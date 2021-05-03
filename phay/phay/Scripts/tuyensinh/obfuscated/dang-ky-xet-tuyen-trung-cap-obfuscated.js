function isNumberKey(evt) {
    var e = evt || window.event;
    var charCode = e.which || e.keyCode;
    if (charCode > 31 && (charCode < 47 || charCode > 57)) {
        return false;
    }
    if (e.shiftKey) {
        return false;
    }
    return true;
}
function isNumberKeySDT(evt) {
    var e = evt || window.event;
    var charCode = e.which || e.keyCode;
    if (charCode > 32 && (charCode <= 47 || charCode > 57)) {
        return false;
    }
    if (e.shiftKey) {
        return false;
    }

    return true;
}
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.view-Image-thisinh').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
function ToFixNumber(obj) {
    var valueLamTron = $("#TS_LamTronDiemTheoSo").val();
    return parseFloat(obj).toFixed(parseInt(valueLamTron));
}
function GetKey_TS(_key) {
    var valueKey = $(_key).val();
    if (valueKey == "" || valueKey == undefined || valueKey == null) {
        valueKey = 0;
    }
    return valueKey;
}
function ChangeKhuVuc() {
    var checkGoiYKVUT = $("#TS_GoiYKVUTTheoDK").val();
    if (checkGoiYKVUT == "1") {
        var check = $("#TS_GetKVUTTheoHKTT").val();
        var idHuyen = $("#IDHuyen").val();
        var idXa = $("#IDPhuongXa").val();
        var idTruong10 = $("#IDTruongPTTHLop10").val();
        var idTruong11 = $("#IDTruongPTTHLop11").val();
        var idTruong12 = $("#IDTruongPTTHLop12").val();
        if (idHuyen == null || idHuyen == "" || idHuyen == undefined) {
            idHuyen = 0;
        }
        if (idXa == null || idXa == "" || idXa == undefined) {
            idXa = 0;
        }
        if (idTruong10 == null || idTruong10 == "" || idTruong10 == undefined) {
            idTruong10 = 0;
        }
        if (idTruong11 == null || idTruong11 == "" || idTruong11 == undefined) {
            idTruong11 = 0;
        }
        if (idTruong12 == null || idTruong12 == "" || idTruong12 == undefined) {
            idTruong12 = 0;
        }

        try {
            if (check == "1") {
                $.ajax({
                    url: "/TuyenSinhDangKy/GetKhuVucUuTienTheoNoiHocLauNhat",
                    type: 'Get',
                    dataType: 'json',
                    data: {
                        idTruong10: idTruong10,
                        idTruong11: idTruong11,
                        idTruong12: idTruong12,
                        idHuyen: idHuyen,
                        idXa: idXa
                    },
                    success: function (data) {
                        var cboKhuVuc = $('#IDKhuVuc');
                        if (data.id != -1) {
                            cboKhuVuc.val(data.id);
                            setTimeout(SetDiemUuTien(), 1000);
                        } else {
                            cboKhuVuc.val(null);
                        }
                        //cboKhuVuc.dataSource.read();
                        //cboKhuVuc.refresh();
                    }
                });
            }
            else {
                $.ajax({
                    url: "/TuyenSinhDangKy/GetKhuVucUuTienTheoTruong",
                    type: 'Get',
                    dataType: 'json',
                    data: { idTruong: idTruong12 },
                    success: function (data) {
                        var cboKhuVuc = $('#IDKhuVuc');
                        if (data.id != -1) {
                            cboKhuVuc.val(data.id);
                            setTimeout(SetDiemUuTien(), 1000);
                        } else {
                            cboKhuVuc.val(null);
                        }
                    }
                });
            }

        } catch (e) { }
    }

}
function SetDiemUuTien() {
    var idKhuVuc = $('#IDKhuVuc').val();
    var idDoiTuong = $('#IDDoiTuong').val();
    if (idKhuVuc == "" || idKhuVuc == undefined || idKhuVuc == null) {
        idKhuVuc = 0;
    }
    if (idDoiTuong == "" || idDoiTuong == undefined || idDoiTuong == null) {
        idDoiTuong = 0;
    }
    if (idKhuVuc > 0 || idDoiTuong > 0) {
        $.ajax({
            url: "/TuyenSinhDangKy/GetDiemUuTien",
            type: 'Get',
            dataType: 'json',
            data: {
                idKhuVuc: parseInt(idKhuVuc),
                idDoiTuong: parseInt(idDoiTuong)
            },
            success: function (e) {
                $("#DiemUuTien").val(parseFloat(e.rs).toFixed(2));
                setTimeout(CapNhatDiemToHopMon(), 1000);
            }
        });
    }
}
function GetSoNguyenVong() {
    var value = $("#TS_SoNguyenVong").val();
    if (value == "" || value == undefined || value == null) {
        value = 1;
    }
    return parseInt(value)
}
function AnHienThiToHopMon(check) {
    for (var i = 1; i <= 10; i++) {
        if (check == 1) {
            $(".clsToHopMon_" + i).addClass("hiddenfileds");
        }
        else {
            $(".clsToHopMon_" + i).removeClass("hiddenfileds");
        }
    }
}
function addtionalNoiSinh() {
    var _text = $("[name='NoiSinh_IDTinh_input']").val();
    return {
        text: _text
    }
}
function addtionalNoiSinhTinh() {
    var _value = $('#NoiSinh_IDTinh').val();
    var _text = $("[name='NoiSinh_IDHuyen_input']").val();
    _value = (_value != undefined && _value != "" && _value != 0) ? _value : null;
    return {
        pIDTinh: _value,
        text: _text
    }
}
function addtionalNoiSinhHuyen() {
    var _value = $('#NoiSinh_IDHuyen').val();
    var _text = $("[name='NoiSinh_IDPhuongXa_input']").val();
    _value = (_value != undefined && _value != "" && _value != 0) ? _value : null;
    return {
        pIDHuyen: _value,
        text: _text
    }
}
function addtionalHKTT() {
    var _text = $("[name='IDTinh_input']").val();
    return {
        text: _text
    }
}
function addtionalHKTTTinh() {
    var _value = $('#IDTinh').val();
    var _text = $("[name='IDHuyen_input']").val();
    _value = (_value != undefined && _value != "" && _value != 0) ? _value : null;
    return {
        pIDTinh: _value,
        text: _text
    }
}
function addtionalHKTTHuyen() {
    var _value = $('#IDHuyen').val();
    var _text = $("[name='IDPhuongXa_input']").val();
    _value = (_value != undefined && _value != "" && _value != 0) ? _value : null;
    return {
        pIDHuyen: _value,
        text: _text
    }
}
function addtionalNhanGiayBao() {
    var _text = $("[name='NhanGiayBao_IDTinh_input']").val();
    return {
        text: _text
    }
}
function addtionalNhanGiayBaoTinh() {
    var _value = $('#NhanGiayBao_IDTinh').val();
    var _text = $("[name='NhanGiayBao_IDHuyen_input']").val();
    _value = (_value != undefined && _value != "" && _value != 0) ? _value : null;
    return {
        pIDTinh: _value,
        text: _text
    }
}
function addtionalNhanGiayBaoHuyen() {
    var _value = $('#NhanGiayBao_IDHuyen').val();
    var _text = $("[name='NhanGiayBao_IDPhuongXa_input']").val();
    _value = (_value != undefined && _value != "" && _value != 0) ? _value : null;
    return {
        pIDHuyen: _value,
        text: _text
    }
}
function addtionalTHCS() {
    var _text = $("[name='IDTinhTHCS_input']").val();
    return {
        text: _text
    }
}
function addtionalTinhHocTHCS() {
    var _value = $('#IDTinhTHCS').val();
    var _text = $("[name='IDHuyenTHCS_input']").val();
    _value = (_value != undefined && _value != "" && _value != 0) ? _value : null;
    return {
        pIDTinh: _value,
        text: _text
    }
}
function addtionalTinhHuyenHocTHCS() {
    var _valueTinh = $('#IDTinhTHCS').val();
    var _valueHuyen = $('#IDHuyenTHCS').val();
    var _text = $("[name='IDTruongTHCS_input']").val();
    _valueTinh = (_valueTinh != undefined && _valueTinh != "" && _valueTinh != 0) ? _valueTinh : null;
    _valueHuyen = (_valueHuyen != undefined && _valueHuyen != "" && _valueHuyen != 0) ? _valueHuyen : null;
    return {
        pIDTinh: _valueTinh,
        pIDHuyen: _valueHuyen,
        text: _text
    }
}
function addtionalHocLop10() {
    var _text = $("[name='IDTinhLop10_input']").val();
    return {
        text: _text
    }
}
function addtionalTinhHocLop10() {
    var _value = $('#IDTinhLop10').val();
    var _text = $("[name='IDHuyenLop10_input']").val();
    _value = (_value != undefined && _value != "" && _value != 0) ? _value : null;
    return {
        pIDTinh: _value,
        text: _text
    }
}
function addtionalTinhHuyenHocLop10() {
    var _valueTinh = $('#IDTinhLop10').val();
    var _valueHuyen = $('#IDHuyenLop10').val();
    var _text = $("[name='IDTruongPTTHLop10_input']").val();
    _valueTinh = (_valueTinh != undefined && _valueTinh != "" && _valueTinh != 0) ? _valueTinh : null;
    _valueHuyen = (_valueHuyen != undefined && _valueHuyen != "" && _valueHuyen != 0) ? _valueHuyen : null;
    return {
        pIDTinh: _valueTinh,
        pIDHuyen: _valueHuyen,
        text: _text
    }
}
function addtionalHocLop11() {
    var _text = $("[name='IDTinhLop11_input']").val();
    return {
        text: _text
    }
}
function addtionalTinhHocLop11() {
    var _value = $('#IDTinhLop11').val();
    var _text = $("[name='IDHuyenLop11_input']").val();
    _value = (_value != undefined && _value != "" && _value != 0) ? _value : null;
    return {
        pIDTinh: _value,
        text: _text
    }
}
function addtionalTinhHuyenHocLop11() {
    var _valueTinh = $('#IDTinhLop11').val();
    var _valueHuyen = $('#IDHuyenLop11').val();
    var _text = $("[name='IDTruongPTTHLop11_input']").val();
    _valueTinh = (_valueTinh != undefined && _valueTinh != "" && _valueTinh != 0) ? _valueTinh : null;
    _valueHuyen = (_valueHuyen != undefined && _valueHuyen != "" && _valueHuyen != 0) ? _valueHuyen : null;
    return {
        pIDTinh: _valueTinh,
        pIDHuyen: _valueHuyen,
        text: _text
    }
}
function addtionalHocLop12() {
    var _text = $("[name='IDTinhLop12_input']").val();
    return {
        text: _text
    }
}
function addtionalTinhHocLop12() {
    var _value = $('#IDTinhLop12').val();
    var _text = $("[name='IDHuyenLop12_input']").val();
    _value = (_value != undefined && _value != "" && _value != 0) ? _value : null;
    return {
        pIDTinh: _value,
        text: _text
    }
}
function addtionalTinhHuyenHocLop12() {
    var _valueTinh = $('#IDTinhLop12').val();
    var _valueHuyen = $('#IDHuyenLop12').val();
    var _text = $("[name='IDTruongPTTHLop12_input']").val();
    _valueTinh = (_valueTinh != undefined && _valueTinh != "" && _valueTinh != 0) ? _valueTinh : null;
    _valueHuyen = (_valueHuyen != undefined && _valueHuyen != "" && _valueHuyen != 0) ? _valueHuyen : null;
    return {
        pIDTinh: _valueTinh,
        pIDHuyen: _valueHuyen,
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
function GetDannhSachNVDaDangKy() {
    var result = "";
    try {
        var nv1 = $("#IDCTTuyenSinh").val();
        var nv2 = $("#IDCTTuyenSinh2").val();
        var nv3 = $("#IDCTTuyenSinh3").val();
        var nv4 = $("#IDCTTuyenSinh4").val();
        var nv5 = $("#IDCTTuyenSinh5").val();
        var nv6 = $("#IDCTTuyenSinh6").val();
        var nv7 = $("#IDCTTuyenSinh7").val();
        var nv8 = $("#IDCTTuyenSinh8").val();
        var nv9 = $("#IDCTTuyenSinh9").val();
        var nv10 = $("#IDCTTuyenSinh10").val();
        if (nv1 == "" || nv1 == null || nv1 == undefined) {
            nv1 = 0;
        }
        if (nv2 == "" || nv2 == null || nv2 == undefined) {
            nv2 = 0;
        }
        if (nv3 == "" || nv3 == null || nv3 == undefined) {
            nv3 = 0;
        }
        if (nv4 == "" || nv4 == null || nv4 == undefined) {
            nv4 = 0;
        }
        if (nv5 == "" || nv5 == null || nv5 == undefined) {
            nv5 = 0;
        }
        if (nv6 == "" || nv6 == null || nv6 == undefined) {
            nv6 = 0;
        }
        if (nv7 == "" || nv7 == null || nv7 == undefined) {
            nv7 = 0;
        }
        if (nv8 == "" || nv8 == null || nv8 == undefined) {
            nv8 = 0;
        }
        if (nv8 == "" || nv9 == null || nv9 == undefined) {
            nv8 = 0;
        }
        if (nv10 == "" || nv10 == null || nv10 == undefined) {
            nv10 = 0;
        }
        result = (nv1 != 0 ? nv1 : "")
            + (nv2 != 0 ? "-" + nv2 : "")
            + (nv3 != 0 ? "-" + nv3 : "")
            + (nv4 != 0 ? "-" + nv4 : "")
            + (nv5 != 0 ? "-" + nv5 : "")
            + (nv6 != 0 ? "-" + nv6 : "")
            + (nv7 != 0 ? "-" + nv7 : "")
            + (nv8 != 0 ? "-" + nv8 : "")
            + (nv9 != 0 ? "-" + nv9 : "")
            + (nv10 != 0 ? "-" + nv10 : "");
    }
    catch {

    }
    return result;
}
function additionalHeLoai() {
    var _idDaTotNghiep = $('#IDThiSinhTotNghiep').val();
    var _idCoSo = $('#IDCoSo').val();
    _idDaTotNghiep = (_idDaTotNghiep != undefined && _idDaTotNghiep != "" && _idDaTotNghiep != 0) ? _idDaTotNghiep : null;
    _idCoSo = (_idCoSo != undefined && _idCoSo != "" && _idCoSo != 0) ? _idCoSo : null;
    return {
        pIDCoSo: _idCoSo,
        pIDDaTotNghiep: _idDaTotNghiep
    }
}
function additionalNganh() {
    var _idDotTuyenSinh = $('#IDTuyenSinh').val();
    var _idCoSo = $('#IDCoSo').val();
    _idDotTuyenSinh = (_idDotTuyenSinh != undefined && _idDotTuyenSinh != "" && _idDotTuyenSinh != 0) ? _idDotTuyenSinh : null;
    _idCoSo = (_idCoSo != undefined && _idCoSo != "" && _idCoSo != 0) ? _idCoSo : null;
    return {
        pIDCoSo: _idCoSo,
        pIDDotTuyenSinh: _idDotTuyenSinh,
        pIDHeDaoTao: null,
        pIDLoaiHinhDaoTao: null
    }
}
function additionalCTTS(nv, nganh, heLoai, index) {
    var _heLoai = heLoai.split(",");
    var _idDotTuyenSinh = $('#IDTuyenSinh').val();
    var _idCoSo = $('#IDCoSo').val();
    var _lstHeDaoToa = _heLoai[0];
    var _lstLoaiHinhDaoTao = _heLoai[1];
    var _lstNganhDangKy = GetDannhSachNVDaDangKy();
    var _checkLoadMaTuyenSinh = false;
    var _checkBoLoadHeDTvaLoaiHinhDT = false;
    var _checkSortTenCTTS = false;
    var _text = "";
    _idDotTuyenSinh = (_idDotTuyenSinh != undefined && _idDotTuyenSinh != "" && _idDotTuyenSinh != 0) ? _idDotTuyenSinh : null;
    _idCoSo = (_idCoSo != undefined && _idCoSo != "" && _idCoSo != 0) ? _idCoSo : null;
    if ($('#TS_NVHienThiMaTuyenSinh').val() == "1") {
        _checkLoadMaTuyenSinh = true;
    }
    if ($('#TS_NVHienThiHDTVaLoaiHinhDT').val() == "0") {
        _checkBoLoadHeDTvaLoaiHinhDT = true;
    }
    switch (parseInt(index)) {
        case 1:
            _text = $("[name='IDCTTuyenSinh_input']").val();
            break;
        case 2:
            _text = $("[name='IDCTTuyenSinh2_input']").val();
            break;
        case 3:
            _text = $("[name='IDCTTuyenSinh3_input']").val();
            break;
        case 4:
            _text = $("[name='IDCTTuyenSinh4_input']").val();
            break;
        case 5:
            _text = $("[name='IDCTTuyenSinh5_input']").val();
            break;
        case 6:
            _text = $("[name='IDCTTuyenSinh6_input']").val();
            break;
        case 7:
            _text = $("[name='IDCTTuyenSinh7_input']").val();
            break;
        case 8:
            _text = $("[name='IDCTTuyenSinh8_input']").val();
            break;
        case 9:
            _text = $("[name='IDCTTuyenSinh9_input']").val();
            break;
        case 10:
            _text = $("[name='IDCTTuyenSinh10_input']").val();
            break;
    }
    if ($('#TS_SortTenCTTS').val() == "1") {
        _checkSortTenCTTS = true;
    }
    return {
        pIdDotTuyenSinh: parseInt(_idDotTuyenSinh),
        pIdCoSo: parseInt(_idCoSo),
        plstIDHeDaoTao: _lstHeDaoToa,
        plstIDLoaiHinhDT: _lstLoaiHinhDaoTao,
        plstIDNganhDaDangKy: _lstNganhDangKy,
        pIdCTTSDK: parseInt(nv),
        pIsBoLoadHeDTvaLoaiHinhDT: _checkBoLoadHeDTvaLoaiHinhDT,
        pIsLoadMaTuyenSinh: _checkLoadMaTuyenSinh,
        pIdNganh: nganh,
        pText: _text,
        pIsSortTen: _checkSortTenCTTS
    }
}
function additionalNV1() {
    var _nv = $("#IDCTTuyenSinh").val();
    var _nganh = $("#IDNganh1").val();
    var _heLoai = $("#IDHeLoai").val();
    _nv = (_nv != undefined && _nv != "" && _nv != 0) ? _nv : null;
    _nganh = (_nganh != undefined && _nganh != "" && _nganh != 0) ? _nganh : null;
    _heLoai = (_heLoai != undefined && _heLoai != "" && _heLoai != 0) ? _heLoai : null;
    return additionalCTTS(_nv, _nganh, _heLoai, 1);
}
function additionalToHopMon(e) {
    var ctts = $("#" + e).val();
    ctts = (ctts != undefined && ctts != "" && ctts != 0) ? parseInt(ctts) : null;
    //var _TieuChiTuyenSinh = $("#IDTieuChiTuyenSinh").val();
    //_TieuChiTuyenSinh = (_TieuChiTuyenSinh != undefined && _TieuChiTuyenSinh != "" && _TieuChiTuyenSinh != 0) ? _TieuChiTuyenSinh : null;
    return {
        pIDCTTS: ctts,
        pIDTieuChiTS: null
    }
}
function additionalToHopMonNV1() {
    return additionalToHopMon("IDCTTuyenSinh");
}
function GetDiemUuTien() {
    var diemUuTien = $('#DiemUuTien').val();
    if (diemUuTien == null && diemUuTien == undefined && diemUuTien == "") {
        diemUuTien = 0;
    } else {
        diemUuTien = diemUuTien.replace(",", ".");
    }
    return parseFloat(diemUuTien).toFixed(2);
}
function GetTenMonThiNhapDiem(idMonThi) {
    return $("#TS_TenMon_" + idMonThi).val();
}
function ConvertDiemNhap(obj) {
    var value = $('#' + obj).val();
    if (value != null && value != "" && value != undefined && parseFloat(value) > 0) {
        var temp = parseFloat(value / 10);
        temp = ToFixNumber(temp);
        $('#' + obj).data("kendoNumericTextBox").value(temp.replace(",", "."));
    }
}
function CheckTotNghiepTHPT(idDaTotNghiep) {
    var check = false;
    var idDaTotNghiepTHPT = $("#TS_DaTotNghiepTHPT").val();
    if (idDaTotNghiepTHPT == "" || idDaTotNghiepTHPT == undefined || idDaTotNghiepTHPT == null) {
        idDaTotNghiepTHPT = 0;
    }
    if (parseInt(idDaTotNghiep) == parseInt(idDaTotNghiepTHPT)) {
        check = true;
    }
    return check;
}
function HienThiDaTotNghiep() {
    $('#IDTieuChiTuyenSinh').val(null);
    $(".clsXetTuyenTS_THCS").addClass("hiddenfileds");
    $(".clsXetTuyenTS_THPT").addClass("hiddenfileds");
    $(".clsToHopMon_1").addClass("hiddenfileds");
    var idDaTotNghiep = $("#IDThiSinhTotNghiep").val();
    if (idDaTotNghiep == "" || idDaTotNghiep == undefined || idDaTotNghiep == null) {
        idDaTotNghiep = 0;
    }
    if (idDaTotNghiep > 0) {
        if (CheckTotNghiepTHPT(idDaTotNghiep)) {
            $(".clsXetTuyenTS_THPT").removeClass("hiddenfileds");
        }
        else {
            $(".clsXetTuyenTS_THCS").removeClass("hiddenfileds");
        }
        XetIDTieuChiTuyenSinh(idDaTotNghiep);
        XoaDuLieu(idDaTotNghiep);
    }
}
function XoaDuLieu(idDaTotNghiep) {
    if (CheckTotNghiepTHPT(idDaTotNghiep)) {
        var numerictextboxLop9 = $('#DiemLop9CN').data("kendoNumericTextBox");
        numerictextboxLop9.value(null);
        $("#IDHocLucTHCS").val(null);
        var comboboxTHCS_Tinh = $("#IDTinhTHCS").data("kendoComboBox");
        var comboboxTHCS_Huyen = $("#IDHuyenTHCS").data("kendoComboBox");
        var comboboxTHCS_Xa = $("#IDTruongTHCS").data("kendoComboBox");
        comboboxTHCS_Tinh.value(null);
        comboboxTHCS_Huyen.value(null);
        comboboxTHCS_Xa.value(null);
    }
    else {
        var numerictextboxLop10 = $('#DiemLop10CN').data("kendoNumericTextBox");
        var numerictextboxLop11 = $('#DiemLop11CN').data("kendoNumericTextBox");
        var numerictextboxLop12 = $('#DiemLop12CN').data("kendoNumericTextBox");
        numerictextboxLop10.value(null);
        numerictextboxLop11.value(null);
        numerictextboxLop12.value(null);
        $("#IDHocLucLop10").val(null);
        $("#IDHocLucLop11").val(null);
        $("#IDHocLucLop12").val(null);
        var comboboxTHPT_Tinh_Lop10 = $("#IDTinhLop10").data("kendoComboBox");
        var comboboxTHPT_Huyen_Lop10 = $("#IDHuyenLop10").data("kendoComboBox");
        var comboboxTHPT_Xa_Lop10 = $("#IDTruongPTTHLop10").data("kendoComboBox");
        comboboxTHPT_Tinh_Lop10.value(null);
        comboboxTHPT_Huyen_Lop10.value(null);
        comboboxTHPT_Xa_Lop10.value(null);
        var comboboxTHPT_Tinh_Lop11 = $("#IDTinhLop11").data("kendoComboBox");
        var comboboxTHPT_Huyen_Lop11 = $("#IDHuyenLop11").data("kendoComboBox");
        var comboboxTHPT_Xa_Lop11 = $("#IDTruongPTTHLop11").data("kendoComboBox");
        comboboxTHPT_Tinh_Lop11.value(null);
        comboboxTHPT_Huyen_Lop11.value(null);
        comboboxTHPT_Xa_Lop11.value(null);
        var comboboxTHPT_Tinh_Lop12 = $("#IDTinhLop12").data("kendoComboBox");
        var comboboxTHPT_Huyen_Lop12 = $("#IDHuyenLop12").data("kendoComboBox");
        var comboboxTHPT_Xa_Lop12 = $("#IDTruongPTTHLop12").data("kendoComboBox");
        comboboxTHPT_Tinh_Lop12.value(null);
        comboboxTHPT_Huyen_Lop12.value(null);
        comboboxTHPT_Xa_Lop12.value(null);
    }
}
function LoadDuLieuNhanGiayBao(_id, _idParent1, _idParent2, _check, _text) {
    if (parseInt(_check) == 1) {
        $.ajax({
            url: '/TuyenSinh/GetIndexCombobox',
            data: {
                pID: parseInt(_id),
                pIDParent: parseInt(_idParent1),
                pIDParent1: parseInt(_idParent2),
                pCheck: parseInt(_check),
                pText: _text
            },
            success: function (e) {
                var $cbx = $("#NhanGiayBao_IDTinh").data("kendoComboBox");
                $cbx.select(e.rs);
                $("#NhanGiayBao_IDHuyen").data("kendoComboBox").dataSource.read();
            }
        });
    } else if (parseInt(_check) == 2) {

        $.ajax({
            url: '/TuyenSinh/GetIndexCombobox',
            data: {
                pID: parseInt(_id),
                pIDParent: parseInt(_idParent1),
                pIDParent1: parseInt(_idParent2),
                pCheck: parseInt(_check),
                pText: _text
            },
            success: function (e) {
                var $cbx = $("#NhanGiayBao_IDHuyen").data("kendoComboBox");
                $cbx.select(e.rs);
                $("#NhanGiayBao_IDPhuongXa").data("kendoComboBox").dataSource.read();
            }
        });
    } else if (parseInt(_check) == 3) {

        $.ajax({
            url: '/TuyenSinh/GetIndexCombobox',
            data: {
                pID: parseInt(_id),
                pIDParent: parseInt(_idParent1),
                pIDParent1: parseInt(_idParent2),
                pCheck: parseInt(_check),
                pText: _text
            },
            success: function (e) {
                var $cbx = $("#NhanGiayBao_IDPhuongXa").data("kendoComboBox");
                $cbx.select(e.rs);
            }
        });
    }
}
function GetDuLieuNhanGiayBao(check) {
    var idTinh = $("#IDTinh").val();
    var idTinh_NhanGiayBao = $("#NhanGiayBao_IDTinh").val();
    var idHuyen = $("#IDHuyen").val();
    var idHuyen_NhanGiayBao = $("#NhanGiayBao_IDHuyen").val();
    var idXa = $("#IDPhuongXa").val();
    var idXa_NhanGiayBao = $("#NhanGiayBao_IDPhuongXa").val();
    var diachi = $("#DiaChiLienLac").val();
    var diachi_NhanGiayBao = $("#DiaChiNhanGiayBao").val();
    if (idTinh == null || idTinh == "" || idTinh == undefined) {
        idTinh = 0;
    }
    if (idTinh_NhanGiayBao == null || idTinh_NhanGiayBao == "" || idTinh_NhanGiayBao == undefined) {
        idTinh_NhanGiayBao = 0;
    }
    if (idHuyen == null || idHuyen == "" || idHuyen == undefined) {
        idHuyen = 0;
    }
    if (idHuyen_NhanGiayBao == null || idHuyen_NhanGiayBao == "" || idHuyen_NhanGiayBao == undefined) {
        idHuyen_NhanGiayBao = 0;
    }
    if (idXa == null || idXa == "" || idXa == undefined) {
        idXa = 0;
    }
    if (idXa_NhanGiayBao == null || idXa_NhanGiayBao == "" || idXa_NhanGiayBao == undefined) {
        idXa_NhanGiayBao = 0;
    }
    if (check == 0) {
        if (parseInt(idTinh) == parseInt(idTinh_NhanGiayBao)
            && parseInt(idHuyen) == parseInt(idHuyen_NhanGiayBao)
            && parseInt(idXa) == parseInt(idXa_NhanGiayBao)
            && diachi == diachi_NhanGiayBao
            && parseInt(idTinh) > 0) {
            $("#CheckXacNhanGiayBao").prop("checked", true);
        }
    } else {
        if (parseInt(idTinh) > 0 && parseInt(idTinh_NhanGiayBao) == 0) {
            var $cbxTinh = $("#NhanGiayBao_IDTinh").data("kendoComboBox");
            $cbxTinh.value(idTinh);
            $("#NhanGiayBao_IDHuyen").data("kendoComboBox").dataSource.read();
            var $cbxHuyen = $("#NhanGiayBao_IDHuyen").data("kendoComboBox");
            $cbxHuyen.value(idHuyen);
            $("#NhanGiayBao_IDPhuongXa").data("kendoComboBox").dataSource.read();
            var $cbxHuyen = $("#NhanGiayBao_IDPhuongXa").data("kendoComboBox");
            $cbxHuyen.value(idXa);
            //LoadDuLieuNhanGiayBao(parseInt(idTinh), 0, 0, 1, '');
            //setTimeout(LoadDuLieuNhanGiayBao(parseInt(idHuyen), parseInt(idTinh), 0, 2, ''), 2000);
            //setTimeout(LoadDuLieuNhanGiayBao(parseInt(idXa), parseInt(idHuyen), 0, 3, ''), 3000);
            $("#DiaChiNhanGiayBao").val(diachi);
        }
    }
}
function XetIDTieuChiTuyenSinh(_id) {
    var _key = $('#TS_CauHinhDaTotNghiep').val();
    if (_key != null && _key != undefined && _key != "") {
        var arrTemp = _key.split(";");
        for (var i = 0; i < arrTemp.length; i++) {
            var arrTemp1 = arrTemp[i].split("_");
            if (parseInt(arrTemp1[0]) == parseInt(_id)) {
                var arrTemp2 = arrTemp1[1].split("#");
                if (parseInt(arrTemp2[1]) > 0) {
                    $('#IDTieuChiTuyenSinh').val(parseInt(arrTemp2[1]));
                }
            }
        }
    }
}
function ValidateDiemNhap(obj, text) {
    var _diemNhap = $(obj).val();
    _diemNhap = (_diemNhap != undefined && _diemNhap != "" && _diemNhap != 0) ? _diemNhap : null;
    if (_diemNhap != null && parseFloat(_diemNhap) > 10) {
        var numerictextbox = $(obj).data("kendoNumericTextBox");
        numerictextbox.value(null);
        numerictextbox.focus();
        $.error(text + " có giá trị lớn hơn 10 điểm, yêu cầu nhập lại.");
    }
}
function LoadDuoiTuongUuTien() {
    var _key = GetKey_TS("#TS_LoadDTUTTheoIDPhuongXaHKTTVaIDDanToc");
    if (_key == "1") {
        var cboDoiTuong = $("#IDDoiTuong").data("kendoComboBox");
        cboDoiTuong.dataSource.read();
        setTimeout(() => {
            CheckDoiTuongUuTien();
        }, 1000);
    }
}
function CheckDoiTuongUuTien() {
    var cboDoiTuong = $("#IDDoiTuong").data("kendoComboBox");
    if (cboDoiTuong.dataSource.data().length == 1) {
        cboDoiTuong.select(0);
        cboDoiTuong.readonly();
    } else {
        cboDoiTuong.value(null);
        cboDoiTuong.enable(true);
    }
}
function addtionalDTUT() {
    var _text = $("[name='IDDoiTuong_input']").val();
    var valueIDPhuongXa = $("#IDPhuongXa").val();
    var valueIDDanToc = $("#IDDanToc").val();
    if (valueIDPhuongXa == "" || valueIDPhuongXa == undefined || valueIDPhuongXa == null) {
        valueIDPhuongXa = null;
    }
    if (valueIDDanToc == "" || valueIDDanToc == undefined || valueIDDanToc == null) {
        valueIDDanToc = null;
    }
    return {
        text: _text,
    }
}
$(document).ready(function () {
    $('#btnDK').click(function (e) {
        var temp = 0;
        var CheckXacNhanThongTin = $('#TS_CheckXacNhanThongTin').val();
        if (CheckXacNhanThongTin == "1") {
            if ($('#CheckXacNhan').is(":checked") == false) {
                temp += 1;
                $.warning('Chưa chọn xác nhận thông tin');
            }
        }
        if (temp == 0) {
            var capcha = $('#Captcha').val();
            if (capcha != null && capcha != undefined && capcha != "") {
                $.confirm('Bạn đồng ý nộp hồ sơ?', function () {
                    $('#frm-dkhs').submit();
                }, function () { });
            }
            else {
                $.warning('Chưa nhập mã bảo vệ');
            }
        }
    });
    $('#btnReset').click(function () {
        $('#frm-dkhs').reset();
    });
    GetDuLieuNhanGiayBao(0);
    $("#CheckXacNhanGiayBao").change(function () {
        if (this.checked) {
            GetDuLieuNhanGiayBao(1);
        }
    });
    //SetDiemUuTien();
    //$('#IDDoiTuong').change(function () {
    //    SetDiemUuTien();
    //});
    //$('#IDKhuVuc').change(function () {
    //    SetDiemUuTien();
    //});
    //$("#HinhAnhThiSinh").change(function () {
    //    readURL(this);
    //});
    LoadDuoiTuongUuTien();
    $('#IDDanToc').change(function () {
        LoadDuoiTuongUuTien();
    });
    $('#IDPhuongXa').change(function () {
        LoadDuoiTuongUuTien();
    });
    HienThiDaTotNghiep();
    $('#IDThiSinhTotNghiep').change(function () {
        HienThiDaTotNghiep();
    });
    $('#IDCTTuyenSinh').change(function () {
    });
    $('#IDToHopMon').change(function () {
    });
    $('#IDTinhLop10').change(function () {
        var idTinh_Lop10 = $("#IDTinhLop10").val();
        var idTinh_Lop11 = $("#IDTinhLop11").val();
        var idTinh_Lop12 = $("#IDTinhLop12").val();
        if (idTinh_Lop10 == null || idTinh_Lop10 == "" || idTinh_Lop10 == undefined) {
            idTinh_Lop10 = 0;
        }
        if (idTinh_Lop11 == null || idTinh_Lop11 == "" || idTinh_Lop11 == undefined) {
            idTinh_Lop11 = 0;
        }
        if (idTinh_Lop12 == null || idTinh_Lop12 == "" || idTinh_Lop12 == undefined) {
            idTinh_Lop12 = 0;
        }
        if (parseInt(idTinh_Lop10) > 0) {
            $.ajax({
                url: '/TuyenSinh/GetIndexCombobox',
                data: {
                    pID: parseInt(idTinh_Lop10),
                    pIDParent: 0,
                    pIDParent1: 0,
                    pCheck: 1,
                    pText: ''
                },
                success: function (e) {
                    if (parseInt(idTinh_Lop11) == 0) {
                        var $cbx = $("#IDTinhLop11").data("kendoComboBox");
                        $cbx.select(e.rs);
                        $("#IDHuyenLop11").data("kendoComboBox").dataSource.read();
                        $("#IDTruongPTTHLop11").data("kendoComboBox").dataSource.read();
                    }
                    if (parseInt(idTinh_Lop12) == 0) {
                        var $cbx = $("#IDTinhLop12").data("kendoComboBox");
                        $cbx.select(e.rs);
                        $("#IDHuyenLop12").data("kendoComboBox").dataSource.read();
                        $("#IDTruongPTTHLop12").data("kendoComboBox").dataSource.read();
                    }
                }
            });
        }
    });
    $('#IDHuyenLop10').change(function () {
        $("#IDTruongPTTHLop10").data("kendoComboBox").dataSource.read();
        var idTinh_Lop10 = $("#IDTinhLop10").val();
        var idTinh_Lop11 = $("#IDTinhLop11").val();
        var idTinh_Lop12 = $("#IDTinhLop12").val();
        var idHuyen_Lop10 = $("#IDHuyenLop10").val();
        var idHuyen_Lop11 = $("#IDHuyenLop11").val();
        var idHuyen_Lop12 = $("#IDHuyenLop12").val();
        if (idTinh_Lop10 == null || idTinh_Lop10 == "" || idTinh_Lop10 == undefined) {
            idTinh_Lop10 = 0;
        }
        if (idTinh_Lop11 == null || idTinh_Lop11 == "" || idTinh_Lop11 == undefined) {
            idTinh_Lop11 = 0;
        }
        if (idTinh_Lop12 == null || idTinh_Lop12 == "" || idTinh_Lop12 == undefined) {
            idTinh_Lop12 = 0;
        }
        if (idHuyen_Lop10 == null || idHuyen_Lop10 == "" || idHuyen_Lop10 == undefined) {
            idHuyen_Lop10 = 0;
        }
        if (idHuyen_Lop11 == null || idHuyen_Lop11 == "" || idHuyen_Lop11 == undefined) {
            idHuyen_Lop11 = 0;
        }
        if (idHuyen_Lop12 == null || idHuyen_Lop12 == "" || idHuyen_Lop12 == undefined) {
            idHuyen_Lop12 = 0;
        }
        if (parseInt(idTinh_Lop10) > 0 && parseInt(idHuyen_Lop10) > 0) {
            $.ajax({
                url: '/TuyenSinh/GetIndexCombobox',
                data: {
                    pID: parseInt(idHuyen_Lop10),
                    pIDParent: parseInt(idTinh_Lop10),
                    pIDParent1: 0,
                    pCheck: 2,
                    pText: ''
                },
                success: function (e) {
                    if (parseInt(idTinh_Lop11) == parseInt(idTinh_Lop10) && parseInt(idHuyen_Lop11) == 0) {
                        var $cbx = $("#IDHuyenLop11").data("kendoComboBox");
                        $cbx.select(e.rs);
                        $("#IDTruongPTTHLop11").data("kendoComboBox").dataSource.read();
                    }
                    if (parseInt(idTinh_Lop12) == parseInt(idTinh_Lop10) && parseInt(idHuyen_Lop12) == 0) {
                        var $cbx = $("#IDHuyenLop12").data("kendoComboBox");
                        $cbx.select(e.rs);
                        $("#IDTruongPTTHLop12").data("kendoComboBox").dataSource.read();
                    }
                }
            });
        }
    });
    $('#IDTruongPTTHLop10').change(function () {
        var idTinh_Lop10 = $("#IDTinhLop10").val();
        var idTinh_Lop11 = $("#IDTinhLop11").val();
        var idTinh_Lop12 = $("#IDTinhLop12").val();
        var idHuyen_Lop10 = $("#IDHuyenLop10").val();
        var idHuyen_Lop11 = $("#IDHuyenLop11").val();
        var idHuyen_Lop12 = $("#IDHuyenLop12").val();
        var idTruong_Lop10 = $("#IDTruongPTTHLop10").val();
        var idTruong_Lop11 = $("#IDTruongPTTHLop11").val();
        var idTruong_Lop12 = $("#IDTruongPTTHLop12").val();
        if (idTinh_Lop10 == null || idTinh_Lop10 == "" || idTinh_Lop10 == undefined) {
            idTinh_Lop10 = 0;
        }
        if (idTinh_Lop11 == null || idTinh_Lop11 == "" || idTinh_Lop11 == undefined) {
            idTinh_Lop11 = 0;
        }
        if (idTinh_Lop12 == null || idTinh_Lop12 == "" || idTinh_Lop12 == undefined) {
            idTinh_Lop12 = 0;
        }
        if (idHuyen_Lop10 == null || idHuyen_Lop10 == "" || idHuyen_Lop10 == undefined) {
            idHuyen_Lop10 = 0;
        }
        if (idHuyen_Lop11 == null || idHuyen_Lop11 == "" || idHuyen_Lop11 == undefined) {
            idHuyen_Lop11 = 0;
        }
        if (idHuyen_Lop12 == null || idHuyen_Lop12 == "" || idHuyen_Lop12 == undefined) {
            idHuyen_Lop12 = 0;
        }
        if (idTruong_Lop10 == null || idTruong_Lop10 == "" || idTruong_Lop10 == undefined) {
            idTruong_Lop10 = 0;
        }
        if (idTruong_Lop11 == null || idTruong_Lop11 == "" || idTruong_Lop11 == undefined) {
            idTruong_Lop11 = 0;
        }
        if (idTruong_Lop12 == null || idTruong_Lop12 == "" || idTruong_Lop12 == undefined) {
            idTruong_Lop12 = 0;
        }
        if (parseInt(idTinh_Lop10) > 0 && parseInt(idHuyen_Lop10) > 0 && parseInt(idTruong_Lop10) > 0) {
            $.ajax({
                url: '/TuyenSinh/GetIndexCombobox',
                data: {
                    pID: parseInt(idTruong_Lop10),
                    pIDParent: parseInt(idTinh_Lop10),
                    pIDParent1: parseInt(idHuyen_Lop10),
                    pCheck: 4,
                    pText: ''
                },
                success: function (e) {
                    if (parseInt(idTinh_Lop11) == parseInt(idTinh_Lop10)
                        && parseInt(idHuyen_Lop11) == parseInt(idHuyen_Lop10)
                        && parseInt(idTruong_Lop11) == 0) {
                        var $cbx = $("#IDTruongPTTHLop11").data("kendoComboBox");
                        $cbx.select(e.rs);
                    }
                    if (parseInt(idTinh_Lop12) == parseInt(idTinh_Lop10)
                        && parseInt(idHuyen_Lop12) == parseInt(idHuyen_Lop10)
                        && parseInt(idTruong_Lop12) == 0) {
                        var $cbx = $("#IDTruongPTTHLop12").data("kendoComboBox");
                        $cbx.select(e.rs);
                    }
                }
            });
        }
    });
    $('#IDHuyenTHCS').change(function () {
        $("#IDTruongTHCS").data("kendoComboBox").dataSource.read();
    });
    $('#IDHuyenLop11').change(function () {
        $("#IDTruongPTTHLop11").data("kendoComboBox").dataSource.read();
    });
    $('#IDHuyenLop12').change(function () {
        $("#IDTruongPTTHLop11").data("kendoComboBox").dataSource.read();
    });
    $('#DiemLop9CN').change(function () {
        ValidateDiemNhap("#DiemLop9CN", "Điểm trung bình Lớp 9");
    });
    $('#DiemLop10CN').change(function () {
        ValidateDiemNhap("#DiemLop10CN", "Điểm trung bình Lớp 10");
    });
    $('#DiemLop11CN').change(function () {
        ValidateDiemNhap("#DiemLop11CN", "Điểm trung bình Lớp 11");
    });
    $('#DiemLop12CN').change(function () {
        ValidateDiemNhap("#DiemLop12CN", "Điểm trung bình Lớp 12");
    });
});
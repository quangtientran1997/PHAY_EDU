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
                setTimeout(CapNhatDiemToHopMon(),1000);
            }
        });
    }
}
function AddNV() {
    var value = $("#NV-HienThi").val();
    var nv = parseInt(value) + 1;
    $(".nv-" + nv).removeClass("hiddenfileds");
    $("#NV-HienThi").val(nv);
    if (nv == GetSoNguyenVong()) {
        $("#buttonAddNV").addClass("hiddenfileds");
        var nvXoa = nv - 1;
        $(".delete-nv-" + nvXoa).addClass("hiddenfileds");
    }
    else {
        $("#buttonAddNV").removeClass("hiddenfileds");
        if (nv > 2) {
            var nvXoa = nv - 1;
            $(".delete-nv-" + nv).addClass("hiddenfileds");
        }
    }
}
function DeleteNV(i) {
    $(".nv-" + i).addClass("hiddenfileds");
    var value = $("#NV-HienThi").val();
    var nvXoa = parseInt(value) - 1;
    $("#NV-HienThi").val(nvXoa);
    $(".delete-nv-" + nvXoa).removeClass("hiddenfileds");
    if (value <= GetSoNguyenVong()) {
        $("#buttonAddNV").removeClass("hiddenfileds");
    }
    if (i == 1) {
        $('#IDCTTuyenSinh').data("kendoComboBox").value("");
        $('#IDToHopMon').data("kendoComboBox").value("");
    }
    else {
        $('#IDCTTuyenSinh' + i).data("kendoComboBox").value("");
        $('#IDToHopMon' + i).data("kendoComboBox").value("");
    }
}
function GetKey_TS(_key) {
    var valueKey = $(_key).val();
    if (valueKey == "" || valueKey == undefined || valueKey == null) {
        valueKey = 0;
    }
    return valueKey;
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
    catch{

    }
    return result;
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
function additionalCTTS(nv, nganh) {
    var _idDotTuyenSinh = $('#IDTuyenSinh').val();
    var _idCoSo = $('#IDCoSo').val();
    var _lstHeDaoToa = "";
    var _lstLoaiHinhDaoTao = "";
    var _lstNganhDangKy = GetDannhSachNVDaDangKy();
    var _checkLoadMaTuyenSinh = false;
    var _checkBoLoadHeDTvaLoaiHinhDT = false;
    _idDotTuyenSinh = (_idDotTuyenSinh != undefined && _idDotTuyenSinh != "" && _idDotTuyenSinh != 0) ? _idDotTuyenSinh : null;
    _idCoSo = (_idCoSo != undefined && _idCoSo != "" && _idCoSo != 0) ? _idCoSo : null;
    if ($('#TS_NVHienThiMaTuyenSinh').val() == "1") {
        _checkLoadMaTuyenSinh = true;
    }
    if ($('#TS_NVHienThiHDTVaLoaiHinhDT').val() == "0") {
        _checkBoLoadHeDTvaLoaiHinhDT = true;
    }
    return {
        pIdDotTuyenSinh: parseInt(_idDotTuyenSinh),
        pIdCoSo: parseInt(_idCoSo),
        plstIDHeDaoTao: "",
        plstIDLoaiHinhDT: "",
        plstIDNganhDaDangKy: _lstNganhDangKy,
        pIdCTTSDK: parseInt(nv),
        pIsBoLoadHeDTvaLoaiHinhDT: _checkBoLoadHeDTvaLoaiHinhDT,
        pIsLoadMaTuyenSinh: _checkLoadMaTuyenSinh,
        pIdNganh: nganh
    }
}
function additionalNV1() {
    var _nv = $("#IDCTTuyenSinh").val();
    var _nganh = $("#IDNganh1").val();
    _nv = (_nv != undefined && _nv != "" && _nv != 0) ? _nv : null;
    _nganh = (_nganh != undefined && _nganh != "" && _nganh != 0) ? _nganh : null;
    return additionalCTTS(_nv, _nganh);
}
function additionalNV2() {
    var _nv = $("#IDCTTuyenSinh2").val();
    var _nganh = $("#IDNganh2").val();
    _nv = (_nv != undefined && _nv != "" && _nv != 0) ? _nv : null;
    _nganh = (_nganh != undefined && _nganh != "" && _nganh != 0) ? _nganh : null;
    return additionalCTTS(_nv, _nganh);
}
function additionalNV3() {
    var _nv = $("#IDCTTuyenSinh3").val();
    var _nganh = $("#IDNganh3").val();
    _nv = (_nv != undefined && _nv != "" && _nv != 0) ? _nv : null;
    _nganh = (_nganh != undefined && _nganh != "" && _nganh != 0) ? _nganh : null;
    return additionalCTTS(_nv, _nganh);
}
function additionalNV4() {
    var _nv = $("#IDCTTuyenSinh4").val();
    var _nganh = $("#IDNganh4").val();
    _nv = (_nv != undefined && _nv != "" && _nv != 0) ? _nv : null;
    _nganh = (_nganh != undefined && _nganh != "" && _nganh != 0) ? _nganh : null;
    return additionalCTTS(_nv, _nganh);
}
function additionalNV5() {
    var _nv = $("#IDCTTuyenSinh5").val();
    var _nganh = $("#IDNganh5").val();
    _nv = (_nv != undefined && _nv != "" && _nv != 0) ? _nv : null;
    _nganh = (_nganh != undefined && _nganh != "" && _nganh != 0) ? _nganh : null;
    return additionalCTTS(_nv, _nganh);
}
function additionalNV6() {
    var _nv = $("#IDCTTuyenSinh6").val();
    var _nganh = $("#IDNganh6").val();
    _nv = (_nv != undefined && _nv != "" && _nv != 0) ? _nv : null;
    _nganh = (_nganh != undefined && _nganh != "" && _nganh != 0) ? _nganh : null;
    return additionalCTTS(_nv, _nganh);
}
function additionalNV7() {
    var _nv = $("#IDCTTuyenSinh7").val();
    var _nganh = $("#IDNganh7").val();
    _nv = (_nv != undefined && _nv != "" && _nv != 0) ? _nv : null;
    _nganh = (_nganh != undefined && _nganh != "" && _nganh != 0) ? _nganh : null;
    return additionalCTTS(_nv, _nganh);
}
function additionalNV8() {
    var _nv = $("#IDCTTuyenSinh8").val();
    var _nganh = $("#IDNganh8").val();
    _nv = (_nv != undefined && _nv != "" && _nv != 0) ? _nv : null;
    _nganh = (_nganh != undefined && _nganh != "" && _nganh != 0) ? _nganh : null;
    return additionalCTTS(_nv, _nganh);
}
function additionalNV9() {
    var _nv = $("#IDCTTuyenSinh9").val();
    var _nganh = $("#IDNganh9").val();
    _nv = (_nv != undefined && _nv != "" && _nv != 0) ? _nv : null;
    _nganh = (_nganh != undefined && _nganh != "" && _nganh != 0) ? _nganh : null;
    return additionalCTTS(_nv, _nganh);
}
function additionalNV10() {
    var _nv = $("#IDCTTuyenSinh10").val();
    var _nganh = $("#IDNganh10").val();
    _nv = (_nv != undefined && _nv != "" && _nv != 0) ? _nv : null;
    _nganh = (_nganh != undefined && _nganh != "" && _nganh != 0) ? _nganh : null;
    return additionalCTTS(_nv, _nganh);
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
function additionalToHopMonNV2() {
    return additionalToHopMon("IDCTTuyenSinh2");
}
function additionalToHopMonNV3() {
    return additionalToHopMon("IDCTTuyenSinh3");
}
function additionalToHopMonNV4() {
    return additionalToHopMon("IDCTTuyenSinh4");
}
function additionalToHopMonNV5() {
    return additionalToHopMon("IDCTTuyenSinh5");
}
function additionalToHopMonNV6() {
    return additionalToHopMon("IDCTTuyenSinh6");
}
function additionalToHopMonNV7() {
    return additionalToHopMon("IDCTTuyenSinh7");
}
function additionalToHopMonNV8() {
    return additionalToHopMon("IDCTTuyenSinh8");
}
function additionalToHopMonNV9() {
    return additionalToHopMon("IDCTTuyenSinh9");
}
function additionalToHopMonNV10() {
    return additionalToHopMon("IDCTTuyenSinh10");
}
function GetDiemUuTien() {
    var diemUuTien = $('#DiemUuTien').val();
    if (diemUuTien == null && diemUuTien == undefined && diemUuTien == "") {
        diemUuTien = 0;
    }else {
        diemUuTien = diemUuTien.replace(",", ".");
    }
    return parseFloat(diemUuTien).toFixed(2);
}
function GetTenMonThiNhapDiem(idMonThi) {
    return $("#TS_TenMon_" + idMonThi).val();
}
function ValidateDiemMonThiNhap(check) {
    var lstIDMonThi = $("#TS_IDsMonThiSuDung").val();
    var arr = lstIDMonThi.split(",");
    for (var i = 0; i < arr.length; i++) {
        var tenMonThi = GetTenMonThiNhapDiem(arr[i]);
        if (check == 1) {
            var obj_Diem_THPT = "#DiemMonTHPT-" + arr[i];
            ValidateDiemNhap(obj_Diem_THPT, "Điểm " + tenMonThi);
        }
        else {
            var obj_HK1_Lop10 = "#DiemMon-" + arr[i] + "-HK1Lop10";
            var obj_HK2_Lop10 = "#DiemMon-" + arr[i] + "-HK2Lop10";
            var obj_HK1_Lop11 = "#DiemMon-" + arr[i] + "-HK1Lop11";
            var obj_HK2_Lop11 = "#DiemMon-" + arr[i] + "-HK2Lop11";
            var obj_HK1_Lop12 = "#DiemMon-" + arr[i] + "-HK1Lop12";
            var obj_HK2_Lop12 = "#DiemMon-" + arr[i] + "-HK2Lop12";
            ValidateDiemNhap(obj_HK1_Lop10, "Điểm môn " + tenMonThi + " HK1 Lớp 10");
            ValidateDiemNhap(obj_HK2_Lop10, "Điểm môn " + tenMonThi + " HK2 Lớp 10");
            ValidateDiemNhap(obj_HK1_Lop11, "Điểm môn " + tenMonThi + " HK1 Lớp 11");
            ValidateDiemNhap(obj_HK2_Lop11, "Điểm môn " + tenMonThi + " HK2 Lớp 11");
            ValidateDiemNhap(obj_HK1_Lop12, "Điểm môn " + tenMonThi + " HK1 Lớp 12");
            ValidateDiemNhap(obj_HK2_Lop12, "Điểm môn " + tenMonThi + " HK2 Lớp 12");
        }
    }
}
function ValidateDiemNhap(obj, text) {
    var _diemNhap = $(obj).val();
    _diemNhap = (_diemNhap != undefined && _diemNhap != "" && _diemNhap != 0) ? _diemNhap : null;
    if (_diemNhap != null && parseFloat(_diemNhap) > 10) {
        var numerictextbox = $( obj).data("kendoNumericTextBox");
        numerictextbox.value(null);
        numerictextbox.focus();
        $.error(text + " có giá trị lớn hơn 10 điểm, yêu cầu nhập lại.");
    }
}
function ConvertDiemNhap(obj) {
    var value = $('#' + obj).val();
    if (value != null && value != "" && value != undefined && parseFloat(value) > 0) {
        var temp = parseFloat(value / 10);
        temp = ToFixNumber(temp);
        $('#' + obj).data("kendoNumericTextBox").value(temp.replace(",", "."));
    }
}
function GetIDMonThuocToHopMon(idToHopMon, vt) {
    var result = $('#TS_IDMon' + vt + '_' + idToHopMon).val();
    if (result == "" || result == undefined || result == null) {
        result = 0;
    }
    return result;
}
function DisplayColumnDiemNhap(checkHK1Lop10, checkHK2Lop10, checkHK1Lop11, checkHK2Lop11, checkHK1Lop12, checkHK2Lop12) {
    if (checkHK1Lop10 == 1) {
        $(".clsNhapDiemTHMHK1Lop10").removeClass("hiddenfileds");
    }
    if (checkHK2Lop10 == 1) {
        $(".clsNhapDiemTHMHK2Lop10").removeClass("hiddenfileds");
    }
    if (checkHK1Lop11 == 1) {
        $(".clsNhapDiemTHMHK1Lop11").removeClass("hiddenfileds");
    }
    if (checkHK2Lop11 == 1) {
        $(".clsNhapDiemTHMHK2Lop11").removeClass("hiddenfileds");
    }
    if (checkHK1Lop12 == 1) {
        $(".clsNhapDiemTHMHK1Lop12").removeClass("hiddenfileds");
    }
    if (checkHK2Lop12 == 1) {
        $(".clsNhapDiemTHMHK2Lop12").removeClass("hiddenfileds");
    }
}
function CheckDKketQuaTHPT() {
    var _IDTieuChiNhapDiemKetQuaTHPT = $("#TS_IDTieuChiNhapDiemKetQuaTHPT").val();
    var idTieuChiTuyenSinh = $("#IDTieuChiTuyenSinh").val();
    if (idTieuChiTuyenSinh == "" || idTieuChiTuyenSinh == undefined || idTieuChiTuyenSinh == null) {
        idTieuChiTuyenSinh = 0;
    }
    var arrIDTieuChiNhapDiemKetQuaTHPT = _IDTieuChiNhapDiemKetQuaTHPT.split(",");
    var checkIDTieuChiNhapDiemKetQuaTHPT = arrIDTieuChiNhapDiemKetQuaTHPT.find(function (obj) {
        return obj == idTieuChiTuyenSinh;
    });
    if (checkIDTieuChiNhapDiemKetQuaTHPT != null && checkIDTieuChiNhapDiemKetQuaTHPT != undefined && parseInt(checkIDTieuChiNhapDiemKetQuaTHPT) == parseInt(idTieuChiTuyenSinh)) {
        return true;
    }
    return false;
}
function GetDiemTheoIDMonTHPT(id) {
    var _diemNhap = $("#DiemMonTHPT-" + id).val();
    if (_diemNhap == undefined || _diemNhap == "" || _diemNhap == null) {
        _diemNhap = 0;
    }
    _diemNhap = parseFloat(_diemNhap);
    return ToFixNumber(_diemNhap);
}
function DiemTrungBinhTheoMon(idMonThi) {
    var _idTieuChiTuyenSinh = $("#IDTieuChiTuyenSinh").val();
    var _idTieuChi1 = $("#TS_IDTieuChi1").val();
    var _idTieuChi2 = $("#TS_IDTieuChi2").val();
    var _idTieuChi3 = $("#TS_IDTieuChi3").val();
    var _idTieuChi4 = $("#TS_IDTieuChi4").val();
    var _idTieuChi5 = $("#TS_IDTieuChi5").val();
    var result = 0;
    var diemHK1_Lop10 = $("#DiemMon-" + idMonThi + "-HK1Lop10").val();
    if (diemHK1_Lop10 == null || diemHK1_Lop10 == undefined || diemHK1_Lop10 == "") {
        diemHK1_Lop10 = 0;
    }
    var diemHK2_Lop10 = $("#DiemMon-" + idMonThi + "-HK2Lop10").val();
    if (diemHK2_Lop10 == null || diemHK2_Lop10 == undefined || diemHK2_Lop10 == "") {
        diemHK2_Lop10 = 0;
    }
    var diemHK1_Lop11 = $("#DiemMon-" + idMonThi + "-HK1Lop11").val();
    if (diemHK1_Lop11 == null || diemHK1_Lop11 == undefined || diemHK1_Lop11 == "") {
        diemHK1_Lop11 = 0;
    }
    var diemHK2_Lop11 = $("#DiemMon-" + idMonThi + "-HK2Lop11").val();
    if (diemHK2_Lop11 == null || diemHK2_Lop11 == undefined || diemHK2_Lop11 == "") {
        diemHK2_Lop11 = 0;
    }
    var diemHK1_Lop12 = $("#DiemMon-" + idMonThi + "-HK1Lop12").val();
    if (diemHK1_Lop12 == null || diemHK1_Lop12 == undefined || diemHK1_Lop12 == "") {
        diemHK1_Lop12 = 0;
    }
    var diemHK2_Lop12 = $("#DiemMon-" + idMonThi + "-HK2Lop12").val();
    if (diemHK2_Lop12 == null || diemHK2_Lop12 == undefined || diemHK2_Lop12 == "") {
        diemHK2_Lop12 = 0;
    }
    diemHK1_Lop10 = ToFixNumber(diemHK1_Lop10);
    diemHK2_Lop10 = ToFixNumber(diemHK2_Lop10);
    diemHK1_Lop11 = ToFixNumber(diemHK1_Lop11);
    diemHK2_Lop11 = ToFixNumber(diemHK2_Lop11);
    diemHK1_Lop12 = ToFixNumber(diemHK1_Lop12);
    diemHK2_Lop12 = ToFixNumber(diemHK2_Lop12);
    var _nameTruong = $("#TS_TruongDK").val();
    //$.ajax({
    //    url: '/Scripts/TuyenSinh/dang-ky-xet-tuyen-' + _nameTruong + '.js',
    //    dataType: 'script'
    //});
    switch (_nameTruong) {
        case "BVU":
            if (parseInt(_idTieuChiTuyenSinh) == parseInt(_idTieuChi1)) {
                $(".clsNhapDiemTHMLop12").removeClass("hiddenfileds");
                DisplayColumnDiemNhap(0, 0, 0, 0, 1, 1);
                result = parseFloat(parseFloat(diemHK1_Lop12) + parseFloat(diemHK2_Lop12));
            } else if (parseInt(_idTieuChiTuyenSinh) == parseInt(_idTieuChi2)) {
                $(".clsNhapDiemTHMLop11").removeClass("hiddenfileds");
                $(".clsNhapDiemTHMLop12").removeClass("hiddenfileds");
                DisplayColumnDiemNhap(0, 0, 0, 1, 1, 0);
                result = parseFloat(parseFloat(diemHK2_Lop11) + parseFloat(diemHK1_Lop12));
            } else if (parseInt(_idTieuChiTuyenSinh) == parseInt(_idTieuChi3)) {
                $(".clsNhapDiemTHMLop11").removeClass("hiddenfileds");
                $(".clsNhapDiemTHMLop12").removeClass("hiddenfileds");
                DisplayColumnDiemNhap(0, 0, 0, 1, 0, 1);
                result = parseFloat(parseFloat(diemHK2_Lop11) + parseFloat(diemHK2_Lop12));
            }
            result = parseFloat(result / 2);
            break;
        case "UFBA":
            if (parseInt(_idTieuChiTuyenSinh) == parseInt(_idTieuChi1)) {
                result = parseFloat(diemHK1_Lop11) + parseFloat(diemHK2_Lop11) + parseFloat(diemHK1_Lop12);
            } else if (parseInt(_idTieuChiTuyenSinh) == parseInt(_idTieuChi2)) {

            } else if (parseInt(_idTieuChiTuyenSinh) == parseInt(_idTieuChi3)) {

            } else if (parseInt(_idTieuChiTuyenSinh) == parseInt(_idTieuChi4)) {

            } else if (parseInt(_idTieuChiTuyenSinh) == parseInt(_idTieuChi5)) {

            }
            result = parseFloat(result / 3);
            break;
    }
    result = ToFixNumber(result);
    $(".DiemTBMon-" + idMonThi).text(result + " điểm");
    $("#DiemTBMon-" + idMonThi + "-THM").val(result);
    return result;
}
function GetTongDiemToHopMon(_thm) {
    var result = 0;
    var mon1 = $("#TS_IDMon1_" + _thm).val();
    var mon2 = $("#TS_IDMon2_" + _thm).val();
    var mon3 = $("#TS_IDMon3_" + _thm).val();
    if (CheckDKketQuaTHPT()) {
        result = parseFloat(GetDiemTheoIDMonTHPT(mon1)) + parseFloat(GetDiemTheoIDMonTHPT(mon2)) + parseFloat(GetDiemTheoIDMonTHPT(mon3));
    }
    else {
        result = parseFloat(DiemTrungBinhTheoMon(mon1)) + parseFloat(DiemTrungBinhTheoMon(mon2)) + parseFloat(DiemTrungBinhTheoMon(mon3));
    }
    return ToFixNumber(result);
}
function SetDiemToHopMon(idTieuChiTuyenSinh) {
    for (var i = 1; i <= 10; i++) {
        $("#TongDiemToHopMon" + i).text("0.00" + " điểm")
    }
    var _ToHopMon = $('#TS_IDsToHopMonDKXT').val();
    if (_ToHopMon != null && _ToHopMon != "" && _ToHopMon != undefined) {
        var arrToHopMon = _ToHopMon.split(",");
        if (idTieuChiTuyenSinh > 0) {
            for (var i = 0; i < arrToHopMon.length; i++) {
                var _DiemToHopMon = GetTongDiemToHopMon(parseInt(arrToHopMon[i]));
                _DiemToHopMon = ToFixNumber(_DiemToHopMon);
                var _DiemXetTuyen = parseFloat(_DiemToHopMon) + parseFloat(GetDiemUuTien());
                _DiemXetTuyen = ToFixNumber(_DiemXetTuyen);
                $(".TongDiemToHopMon_" + arrToHopMon[i]).text(_DiemToHopMon + " điểm");
                $(".TongDiemToHopMonXT_" + arrToHopMon[i]).text(_DiemXetTuyen + " điểm");
                CapNhatDiemTheoToHopMon(1);
                CapNhatDiemTheoToHopMon(2);
                CapNhatDiemTheoToHopMon(3);
                CapNhatDiemTheoToHopMon(4);
                CapNhatDiemTheoToHopMon(5);
                CapNhatDiemTheoToHopMon(6);
                CapNhatDiemTheoToHopMon(7);
                CapNhatDiemTheoToHopMon(8);
                CapNhatDiemTheoToHopMon(9);
                CapNhatDiemTheoToHopMon(10);
            }
            XetToHopMonDiemCaoNhat(idTieuChiTuyenSinh);
        }
        else {
            for (var i = 0; i < arrToHopMon.length; i++) {
                var _DiemToHopMon = 0;
                _DiemToHopMon = ToFixNumber(_DiemToHopMon);
                var _DiemXetTuyen = parseFloat(_DiemToHopMon) + parseFloat(GetDiemUuTien());
                _DiemXetTuyen = ToFixNumber(_DiemXetTuyen);
                $(".TongDiemToHopMon_" + arrToHopMon[i]).text(_DiemToHopMon + " điểm");
                $(".TongDiemToHopMonXT_" + arrToHopMon[i]).text(_DiemXetTuyen + " điểm");
            }
        }
    }
}
function CapNhatNguyenVong(nv) {
    $("#TongDiemToHopMon" + nv).text("0.00" + " điểm");
    if (nv < 10) {
        for (var i = parseInt(nv + 1); i <= 10; i++) {
            $("#TongDiemToHopMon" + i).text("0.00" + " điểm");
        }
    }
}
function CapNhatDiemTheoToHopMon(nv) {
    $("#TongDiemToHopMon" + nv).text("0.00 điểm");
    var idCTTuyenSinh = $('#IDCTTuyenSinh' + nv).val();
    var idToHopMon = $('#IDToHopMon' + nv).val();
    if (nv == 1) {
        idCTTuyenSinh = $('#IDCTTuyenSinh').val();
        idToHopMon = $('#IDToHopMon').val();
    }
    if (idCTTuyenSinh != null && idCTTuyenSinh != undefined && idCTTuyenSinh != ""
        && idToHopMon != "" && idToHopMon != null && idToHopMon != undefined) {
        var _DiemToHopMon = GetTongDiemToHopMon(parseInt(idToHopMon));
        _DiemToHopMon = ToFixNumber(_DiemToHopMon);
        var _DiemXetTuyen = parseFloat(_DiemToHopMon) + parseFloat(GetDiemUuTien());
        _DiemXetTuyen = ToFixNumber(_DiemXetTuyen);
        $(".TongDiemToHopMon_" + idToHopMon).text(_DiemToHopMon + " điểm");
        $(".TongDiemToHopMonXT_" + idToHopMon).text(_DiemXetTuyen + " điểm");
        $("#TongDiemToHopMon" + nv).text(_DiemXetTuyen + " điểm");
    }

}
function CapNhatDiemToHopMon() {
    var idTieuChiTuyenSinh = $("#IDTieuChiTuyenSinh").val();
    if (idTieuChiTuyenSinh == "" || idTieuChiTuyenSinh == undefined || idTieuChiTuyenSinh == null) {
        idTieuChiTuyenSinh = 0;
    }
    SetDiemToHopMon(idTieuChiTuyenSinh);
}
function XetToHopMonDiemCaoNhat(idTieuChiTuyenSinh) {
    $(".HT_ToHopMonDiemCaoNhat_2").addClass("hiddenfileds");
    $(".HT_ToHopMonDiemCaoNhat_3").addClass("hiddenfileds");
    $(".ToHopMonDiemCaoNhat_1").text("");
    $(".TongDiemToHopMonDiemCaoNhat_1").text("");
    $(".TongDiemToHopMonXTDiemCaoNhat_1").text("");
    $(".ToHopMonDiemCaoNhat_2").text("");
    $(".TongDiemToHopMonDiemCaoNhat_2").text("");
    $(".TongDiemToHopMonXTDiemCaoNhat_2").text("");
    $(".ToHopMonDiemCaoNhat_2").text("");
    $(".TongDiemToHopMonDiemCaoNhat_3").text("");
    $(".TongDiemToHopMonXTDiemCaoNhat_3").text("");
    var arrToHopMonDiemCao = [];
    var _ToHopMon = $('#TS_IDsToHopMonDKXT').val();
    if (_ToHopMon != null && _ToHopMon != "" && _ToHopMon != undefined) {
        var arrToHopMon = _ToHopMon.split(",");
        var _diemToHopMonCaoNhat = 0;
        arrToHopMonDiemCao.push(parseInt(arrToHopMon[0]));
        _diemToHopMonCaoNhat = parseFloat(GetTongDiemToHopMon(parseInt(arrToHopMon[0])));
        for (var i = 1; i < arrToHopMon.length; i++) {
            var diemToHopMon = GetTongDiemToHopMon(parseInt(arrToHopMon[i]));
            if (parseFloat(diemToHopMon) > parseFloat(_diemToHopMonCaoNhat)) {
                _diemToHopMonCaoNhat = parseFloat(diemToHopMon);
                arrToHopMonDiemCao = [];
                arrToHopMonDiemCao.push(parseInt(arrToHopMon[i]));
            }
            else if (parseFloat(diemToHopMon) == parseFloat(_diemToHopMonCaoNhat)) {
                arrToHopMonDiemCao.push(parseInt(arrToHopMon[i]));
            }
        }
    }
    if (arrToHopMonDiemCao != null && arrToHopMonDiemCao.length > 0) {
        var dem = 1;
        for (var i = 0; i < arrToHopMonDiemCao.length; i++) {
            if (arrToHopMonDiemCao[i] != null && arrToHopMonDiemCao[i] != undefined && arrToHopMonDiemCao[i] != "" && dem <= 3) {
                var tenToHopMon = $('#TS_TenToHopMon_' + arrToHopMonDiemCao[i]).val();
                var _DiemToHopMon = GetTongDiemToHopMon(parseInt(arrToHopMonDiemCao[i]));
                _DiemToHopMon = ToFixNumber(_DiemToHopMon);
                var _DiemXetTuyen = parseFloat(_DiemToHopMon) + parseFloat(GetDiemUuTien());
                _DiemXetTuyen = ToFixNumber(_DiemXetTuyen);
                $(".ToHopMonDiemCaoNhat_" + dem).text(tenToHopMon);
                $(".TongDiemToHopMonDiemCaoNhat_" + dem).text(_DiemToHopMon + " điểm");
                $(".TongDiemToHopMonXTDiemCaoNhat_" + dem).text(_DiemXetTuyen + " điểm");
                if (dem > 1) {
                    $(".HT_ToHopMonDiemCaoNhat_" + dem).removeClass("hiddenfileds");
                }
            }
            dem += 1; 
        }
    }
}
function CheckHinhThucNhapDiem(idTieuChi) {
    var result = 0;
    var _IDTieuChiKhongHienThiToHopMon = $("#TS_IDTieuChiKhongHienThiToHopMon").val();
    var _IDTieuChiNhapDiemTBLop101112 = $("#TS_IDTieuChiNhapDiemTBLop101112").val();
    var _IDTieuChiNhapDiemTBHKLop101112 = $("#TS_IDTieuChiNhapDiemTBHKLop101112").val();
    var _IDTieuChiNhapDiemKetQuaTHPT = $("#TS_IDTieuChiNhapDiemKetQuaTHPT").val();
    var _IDTieuChiNhapDiemTheoToHopMon = $("#TS_IDTieuChiNhapDiemTheoToHopMon").val();
    var arrIDTieuChiKhongHTToHopMon = _IDTieuChiKhongHienThiToHopMon.split(",");
    var arrIDTieuChiNhapDiemTBLop101112 = _IDTieuChiNhapDiemTBLop101112.split(",");
    var arrIDTieuChiNhapDiemTBHKLop101112 = _IDTieuChiNhapDiemTBHKLop101112.split(",");
    var arrIDTieuChiNhapDiemKetQuaTHPT = _IDTieuChiNhapDiemKetQuaTHPT.split(",");
    var arrIDTieuChiNhapDiemTheoToHopMon = _IDTieuChiNhapDiemTheoToHopMon.split(",");
    var checkKhongHTToHopMon = arrIDTieuChiKhongHTToHopMon.find(function (obj) {
        return obj == idTieuChi;
    });
    var checkIDTieuChiNhapDiemTBLop101112 = arrIDTieuChiNhapDiemTBLop101112.find(function (obj) {
        return obj == idTieuChi;
    });
    var checkIDTieuChiNhapDiemTBHKLop101112 = arrIDTieuChiNhapDiemTBHKLop101112.find(function (obj) {
        return obj == idTieuChi;
    });
    var checkIDTieuChiNhapDiemKetQuaTHPT = arrIDTieuChiNhapDiemKetQuaTHPT.find(function (obj) {
        return obj == idTieuChi;
    });
    var checkIDTieuChiNhapDiemTheoToHopMon = arrIDTieuChiNhapDiemTheoToHopMon.find(function (obj) {
        return obj == idTieuChi;
    });
    if (checkKhongHTToHopMon != null && checkKhongHTToHopMon != undefined && parseInt(checkKhongHTToHopMon) == parseInt(idTieuChi)) {
        AnHienThiToHopMon(1);
    }
    else {
        AnHienThiToHopMon(0);
    }
    if (checkIDTieuChiNhapDiemTBLop101112 != null && checkIDTieuChiNhapDiemTBLop101112 != undefined && parseInt(checkIDTieuChiNhapDiemTBLop101112) == parseInt(idTieuChi)) {
        $(".clsXetTuyenTS_TieuChi_TB101112").removeClass("hiddenfileds");
    }
    if (checkIDTieuChiNhapDiemTBHKLop101112 != null && checkIDTieuChiNhapDiemTBHKLop101112 != undefined && parseInt(checkIDTieuChiNhapDiemTBHKLop101112) == parseInt(idTieuChi)) {
        $(".clsXetTuyenTS_TieuChi_TB6HK").removeClass("hiddenfileds");
    }
    if (checkIDTieuChiNhapDiemKetQuaTHPT != null && checkIDTieuChiNhapDiemKetQuaTHPT != undefined && parseInt(checkIDTieuChiNhapDiemKetQuaTHPT) == parseInt(idTieuChi)) {
        $(".clsXetTuyenTS_TieuChi_KetQuaTHPTQuocGia").removeClass("hiddenfileds");
        $("#IsXetTuyenKetQuaTHPT").val(true);
        SetDiemToHopMon(idTieuChi);
    }
    if (checkIDTieuChiNhapDiemTheoToHopMon != null && checkIDTieuChiNhapDiemTheoToHopMon != undefined && parseInt(checkIDTieuChiNhapDiemTheoToHopMon) == parseInt(idTieuChi)) {
        $(".clsXetTuyenTS_TieuChi_NhapDiemTheoTHM").removeClass("hiddenfileds");
        $(".clsNhapDiemTHMLop10").addClass("hiddenfileds");
        $(".clsNhapDiemTHMLop11").addClass("hiddenfileds");
        $(".clsNhapDiemTHMLop12").addClass("hiddenfileds");
        $(".clsNhapDiemTHMHK1Lop10").addClass("hiddenfileds");
        $(".clsNhapDiemTHMHK2Lop10").addClass("hiddenfileds");
        $(".clsNhapDiemTHMHK1Lop11").addClass("hiddenfileds");
        $(".clsNhapDiemTHMHK2Lop11").addClass("hiddenfileds");
        $(".clsNhapDiemTHMHK1Lop12").addClass("hiddenfileds");
        $(".clsNhapDiemTHMHK2Lop12").addClass("hiddenfileds");
        var _nameTruong = $("#TS_TruongDK").val();
        switch (_nameTruong) {
            case "BVU":
                break;
            case "UFBA":
                $(".clsNhapDiemTHMLop11").removeClass("hiddenfileds");
                $(".clsNhapDiemTHMLop12").removeClass("hiddenfileds");
                DisplayColumnDiemNhap(0, 0, 1, 1, 1, 0);
                break;
        }
        SetDiemToHopMon(idTieuChi);
    }
    return result;
}
function HienThiPhuongThucXetTuyen() {
    $("#IsXetTuyenKetQuaTHPT").val(false);
    var idTieuChiTuyenSinh = $("#IDTieuChiTuyenSinh").val();
    if (idTieuChiTuyenSinh == "" || idTieuChiTuyenSinh == undefined || idTieuChiTuyenSinh == null) {
        idTieuChiTuyenSinh = 0;
    }
    SetDiemToHopMon(idTieuChiTuyenSinh);
    //$(".HT_ToHopMonDiemCaoNhat_1").addClass("hiddenfileds");
    $(".HT_ToHopMonDiemCaoNhat_2").addClass("hiddenfileds");
    $(".HT_ToHopMonDiemCaoNhat_3").addClass("hiddenfileds");
    $(".clsXetTuyenTS_TieuChi_KetQuaTHPTQuocGia").addClass("hiddenfileds");
    $(".clsXetTuyenTS_TieuChi_TB101112").addClass("hiddenfileds");
    $(".clsXetTuyenTS_TieuChi_TB6HK").addClass("hiddenfileds");
    $(".clsXetTuyenTS_TieuChi_NhapDiemTheoTHM").addClass("hiddenfileds");
    if (idTieuChiTuyenSinh > 0) {
        CheckHinhThucNhapDiem(idTieuChiTuyenSinh);
    }
    var checkNV = 1;
    for (var i = 2; i <= GetSoNguyenVong(); i++) {
        var idCTTuyenSinh = $('#IDCTTuyenSinh' + i).val();
        if (idCTTuyenSinh != "" && idCTTuyenSinh != null && idCTTuyenSinh != undefined){
            checkNV += 1;
        }
    }
    if (checkNV > 1) {
        $("#NV-HienThi").val(checkNV);
        switch (checkNV) {
            case 2:
                $(".nv-2").removeClass("hiddenfileds");
                break;
            case 3:
                $(".nv-2").removeClass("hiddenfileds");
                $(".nv-3").removeClass("hiddenfileds");
                break;
            case 4:
                $(".nv-2").removeClass("hiddenfileds");
                $(".nv-3").removeClass("hiddenfileds");
                $(".nv-4").removeClass("hiddenfileds");
                break;
            case 5:
                $(".nv-2").removeClass("hiddenfileds");
                $(".nv-3").removeClass("hiddenfileds");
                $(".nv-4").removeClass("hiddenfileds");
                $(".nv-5").removeClass("hiddenfileds");
                break;
            case 6:
                $(".nv-2").removeClass("hiddenfileds");
                $(".nv-3").removeClass("hiddenfileds");
                $(".nv-4").removeClass("hiddenfileds");
                $(".nv-5").removeClass("hiddenfileds");
                $(".nv-6").removeClass("hiddenfileds");
                break;
            case 7:
                $(".nv-2").removeClass("hiddenfileds");
                $(".nv-3").removeClass("hiddenfileds");
                $(".nv-4").removeClass("hiddenfileds");
                $(".nv-5").removeClass("hiddenfileds");
                $(".nv-6").removeClass("hiddenfileds");
                $(".nv-7").removeClass("hiddenfileds");
                break;
            case 8:
                $(".nv-2").removeClass("hiddenfileds");
                $(".nv-3").removeClass("hiddenfileds");
                $(".nv-4").removeClass("hiddenfileds");
                $(".nv-5").removeClass("hiddenfileds");
                $(".nv-6").removeClass("hiddenfileds");
                $(".nv-7").removeClass("hiddenfileds");
                $(".nv-8").removeClass("hiddenfileds");
                break;
            case 9:
                $(".nv-2").removeClass("hiddenfileds");
                $(".nv-3").removeClass("hiddenfileds");
                $(".nv-4").removeClass("hiddenfileds");
                $(".nv-5").removeClass("hiddenfileds");
                $(".nv-6").removeClass("hiddenfileds");
                $(".nv-7").removeClass("hiddenfileds");
                $(".nv-8").removeClass("hiddenfileds");
                $(".nv-9").removeClass("hiddenfileds");
                break;
            case 10:
                $(".nv-2").removeClass("hiddenfileds");
                $(".nv-3").removeClass("hiddenfileds");
                $(".nv-4").removeClass("hiddenfileds");
                $(".nv-5").removeClass("hiddenfileds");
                $(".nv-6").removeClass("hiddenfileds");
                $(".nv-7").removeClass("hiddenfileds");
                $(".nv-8").removeClass("hiddenfileds");
                $(".nv-9").removeClass("hiddenfileds");
                $(".nv-10").removeClass("hiddenfileds");
                break;
        }
        if (checkNV <= GetSoNguyenVong()) {
            $("#buttonAddNV").removeClass("hiddenfileds");
        }
    }
}
function ChechNhapDuDiemMonTheoToHopMon(idMonThi,vt) {
    var result = false;
    var diemHK1_Lop10 = $("#DiemMon-" + idMonThi + "-HK1Lop10").val();
    var diemHK2_Lop10 = $("#DiemMon-" + idMonThi + "-HK2Lop10").val();
    var diemHK1_Lop11 = $("#DiemMon-" + idMonThi + "-HK1Lop11").val();
    var diemHK2_Lop11 = $("#DiemMon-" + idMonThi + "-HK2Lop11").val();
    var diemHK1_Lop12 = $("#DiemMon-" + idMonThi + "-HK1Lop12").val();
    var diemHK2_Lop12 = $("#DiemMon-" + idMonThi + "-HK2Lop12").val();
    switch (vt) {
        case 1:
            if (diemHK1_Lop10 == null || diemHK1_Lop10 == undefined || diemHK1_Lop10 == "") {
                result = true;
            }
            break;
        case 2:
            if (diemHK2_Lop10 == null || diemHK2_Lop10 == undefined || diemHK2_Lop10 == "") {
                result = true;
            }
            break;
        case 3:
            if (diemHK1_Lop11 == null || diemHK1_Lop11 == undefined || diemHK1_Lop11 == "") {
                result = true;
            }
            break;
        case 4:
            if (diemHK2_Lop11 == null || diemHK2_Lop11 == undefined || diemHK2_Lop11 == "") {
                result = true;
            }
            break;
        case 5:
            if (diemHK1_Lop12 == null || diemHK1_Lop12 == undefined || diemHK1_Lop12 == "") {
                result = true;
            }
            break;
        case 6:
            if (diemHK2_Lop12 == null || diemHK2_Lop12 == undefined || diemHK2_Lop12 == "") {
                result = true;
            }
            break;
    }
    return result;
}
function ValidateDangKy() {
    var result = "";
    var check = 0;
    var idTieuChiTuyenSinh = $("#IDTieuChiTuyenSinh").val();
    if (idTieuChiTuyenSinh == "" || idTieuChiTuyenSinh == undefined || idTieuChiTuyenSinh == null) {
        idTieuChiTuyenSinh = 0;
    }
    var _IDTieuChiNhapDiemKetQuaTHPT = $("#TS_IDTieuChiNhapDiemKetQuaTHPT").val();
    var _IDTieuChiNhapDiemTheoToHopMon = $("#TS_IDTieuChiNhapDiemTheoToHopMon").val();
    var arrIDTieuChiNhapDiemKetQuaTHPT = _IDTieuChiNhapDiemKetQuaTHPT.split(",");
    var arrIDTieuChiNhapDiemTheoToHopMon = _IDTieuChiNhapDiemTheoToHopMon.split(",");
    var checkIDTieuChiNhapDiemKetQuaTHPT = arrIDTieuChiNhapDiemKetQuaTHPT.find(function (obj) {
        return obj == idTieuChiTuyenSinh;
    });
    var checkIDTieuChiNhapDiemTheoToHopMon = arrIDTieuChiNhapDiemTheoToHopMon.find(function (obj) {
        return obj == idTieuChiTuyenSinh;
    });

    if (checkIDTieuChiNhapDiemKetQuaTHPT != null && checkIDTieuChiNhapDiemKetQuaTHPT != undefined && parseInt(checkIDTieuChiNhapDiemKetQuaTHPT) == parseInt(idTieuChiTuyenSinh)) {
        check = 1;
    }
    if (checkIDTieuChiNhapDiemTheoToHopMon != null && checkIDTieuChiNhapDiemTheoToHopMon != undefined && parseInt(checkIDTieuChiNhapDiemTheoToHopMon) == parseInt(idTieuChiTuyenSinh)) {
        check = 1;
    }
    if (check == 1) {
        for (var i = 1; i < GetSoNguyenVong(); i++) {
            var idCTTuyenSinh = $('#IDCTTuyenSinh' + i).val();
            var idToHopMon = $('#IDToHopMon' + i).val();
            if (i == 1) {
                idCTTuyenSinh = $('#IDCTTuyenSinh').val();
                idToHopMon = $('#IDToHopMon').val();
            }
            if (idCTTuyenSinh != null && idCTTuyenSinh != undefined && idCTTuyenSinh != ""
                && idToHopMon != "" && idToHopMon != null && idToHopMon != undefined) {
                var mon1 = $("#TS_IDMon1_" + idToHopMon).val();
                var mon2 = $("#TS_IDMon2_" + idToHopMon).val();
                var mon3 = $("#TS_IDMon3_" + idToHopMon).val();
                var tenMon1 = GetTenMonThiNhapDiem(parseInt(mon1));
                var tenMon2 = GetTenMonThiNhapDiem(parseInt(mon2));
                var tenMon3 = GetTenMonThiNhapDiem(parseInt(mon3));
                if (CheckDKketQuaTHPT()) {
                    var _diemNhap1 = $("#DiemMonTHPT-" + mon1).val();
                    var _diemNhap2 = $("#DiemMonTHPT-" + mon2).val();
                    var _diemNhap3 = $("#DiemMonTHPT-" + mon3).val();
                    if (_diemNhap1 == undefined || _diemNhap1 == "" || _diemNhap1 == null) {
                        result = "Chưa nhập điểm môn " + tenMon1;
                        var numerictextbox1 = $("#DiemMonTHPT-" + mon1).data("kendoNumericTextBox");
                        numerictextbox1.focus();
                        break;
                    }
                    else if (_diemNhap2 == undefined || _diemNhap2 == "" || _diemNhap2 == null) {
                        result = "Chưa nhập điểm môn " + tenMon2;
                        var numerictextbox2 = $("#DiemMonTHPT-" + mon2).data("kendoNumericTextBox");
                        numerictextbox2.focus();
                        break;
                    }
                    else if (_diemNhap3 == undefined || _diemNhap3 == "" || _diemNhap3 == null) {
                        result = "Chưa nhập điểm môn " + tenMon3;
                        var numerictextbox3 = $("#DiemMonTHPT-" + mon3).data("kendoNumericTextBox");
                        numerictextbox3.focus();
                        break;
                    }
                }
                else {
                    var checkError = 0;
                    var _nameTruong = $("#TS_TruongDK").val();
                    switch (_nameTruong) {
                        case "UFBA":
                            if (ChechNhapDuDiemMonTheoToHopMon(parseInt(mon1), 3)) {
                                result = "Chưa nhập điểm môn " + tenMon1 + " HK1_Lớp 11";
                                checkError = 1;
                                var numerictextboxMon1HK1_Lop11 = $("#DiemMon-" + mon1 + "-HK1Lop11").data("kendoNumericTextBox");
                                numerictextboxMon1HK1_Lop11.focus();
                            } else if (ChechNhapDuDiemMonTheoToHopMon(parseInt(mon1), 4)) {
                                result = "Chưa nhập điểm môn " + tenMon1 + " HK2_Lớp 11";
                                checkError = 1;
                                var numerictextboxMon1HK2_Lop11 = $("#DiemMon-" + mon1 + "-HK2Lop11").data("kendoNumericTextBox");
                                numerictextboxMon1HK2_Lop11.focus();
                            } else if (ChechNhapDuDiemMonTheoToHopMon(parseInt(mon1), 5)) {
                                result = "Chưa nhập điểm môn " + tenMon1 + " HK1_Lớp 12";
                                checkError = 1;
                                var numerictextboxMon1HK1_Lop12 = $("#DiemMon-" + mon1 + "-HK1Lop12").data("kendoNumericTextBox");
                                numerictextboxMon1HK1_Lop12.focus();
                            } else if (ChechNhapDuDiemMonTheoToHopMon(parseInt(mon2), 3)) {
                                result = "Chưa nhập điểm môn " + tenMon2 + " HK1_Lớp 11";
                                checkError = 1;
                                var numerictextboxMon2HK1_Lop11 = $("#DiemMon-" + mon2 + "-HK1Lop11").data("kendoNumericTextBox");
                                numerictextboxMon2HK1_Lop11.focus();
                            } else if (ChechNhapDuDiemMonTheoToHopMon(parseInt(mon2), 4)) {
                                result = "Chưa nhập điểm môn " + tenMon2 + " HK2_Lớp 11";
                                checkError = 1;
                                var numerictextboxMon2HK2_Lop11 = $("#DiemMon-" + mon2 + "-HK2Lop11").data("kendoNumericTextBox");
                                numerictextboxMon2HK2_Lop11.focus();
                            } else if (ChechNhapDuDiemMonTheoToHopMon(parseInt(mon2), 5)) {
                                result = "Chưa nhập điểm môn " + tenMon2 + " HK1_Lớp 12";
                                checkError = 1;
                                var numerictextboxMon2HK1_Lop12 = $("#DiemMon-" + mon2 + "-HK1Lop12").data("kendoNumericTextBox");
                                numerictextboxMon2HK1_Lop12.focus();
                            } else if (ChechNhapDuDiemMonTheoToHopMon(parseInt(mon3), 3)) {
                                result = "Chưa nhập điểm môn " + tenMon3 + " HK1_Lớp 11";
                                checkError = 1;
                                var numerictextboxMon3HK1_Lop11 = $("#DiemMon-" + mon3 + "-HK1Lop11").data("kendoNumericTextBox");
                                numerictextboxMon3HK1_Lop11.focus();
                            } else if (ChechNhapDuDiemMonTheoToHopMon(parseInt(mon3), 4)) {
                                result = "Chưa nhập điểm môn " + tenMon3 + " HK2_Lớp 11";
                                checkError = 1;
                                var numerictextboxMon3HK2_Lop11 = $("#DiemMon-" + mon3 + "-HK2Lop11").data("kendoNumericTextBox");
                                numerictextboxMon3HK2_Lop11.focus();
                            } else if (ChechNhapDuDiemMonTheoToHopMon(parseInt(mon3), 5)) {
                                result = "Chưa nhập điểm môn " + tenMon3 + " HK1_Lớp 12";
                                checkError = 1;
                                var numerictextboxMon2HK1_Lop12 = $("#DiemMon-" + mon3 + "-HK1Lop12").data("kendoNumericTextBox");
                                numerictextboxMon2HK1_Lop12.focus();
                            }
                            break;
                    }
                }
            }
        }
    }
    return result;
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
                var KiemTraNhapDuDiemMonTheoToHopMon = $('#TS_KiemTraNhapDuDiemMonTheoToHopMon').val();
                if (KiemTraNhapDuDiemMonTheoToHopMon == "1") {
                    var txtError = ValidateDangKy();
                    if (txtError != "") {
                        temp += 1;
                        $.error(txtError);
                    }
                }
                if (temp == 0) {
                    $.confirm('Bạn đồng ý nộp hồ sơ?', function () {
                        $('#frm-dkhs').submit();
                    }, function () {
                    });
                }
            }
            else {
                $.warning('Chưa nhập mã bảo vệ');
            }
        }
    });
    $('#btnReset').click(function () {
        $('#frm-dkhs').reset();
    });
    SetDiemUuTien();
    LoadDuoiTuongUuTien();
    $('#IDDanToc').change(function () {
        LoadDuoiTuongUuTien();
    });
    $('#IDTinh').change(function () {
        
    });
    $('#IDHuyen').change(function () {

    });
    $('#IDPhuongXa').change(function () {
        LoadDuoiTuongUuTien();
    });
    $('#IDHuyenTHCS').change(function () {
        $("#IDTruongTHCS").data("kendoComboBox").dataSource.read();
    });
    $('#IDHuyenLop10').change(function () {
        $("#IDTruongPTTHLop10").data("kendoComboBox").dataSource.read();
    });
    $('#IDHuyenLop11').change(function () {
        $("#IDTruongPTTHLop11").data("kendoComboBox").dataSource.read();
    });
    $('#IDHuyenLop12').change(function () {
        $("#IDTruongPTTHLop11").data("kendoComboBox").dataSource.read();
    });
    $('#IDDoiTuong').change(function () {
        SetDiemUuTien();
    });
    $('#IDKhuVuc').change(function () {
        SetDiemUuTien();
    });
    $("#HinhAnhThiSinh").change(function () {
        readURL(this);
    });
    HienThiPhuongThucXetTuyen();
    $('#IDCTTuyenSinh').change(function () {
        CapNhatNguyenVong(1);
    });
    $('#IDToHopMon').change(function () {
        CapNhatDiemTheoToHopMon(1);
    });
    $('#IDCTTuyenSinh2').change(function () {
        CapNhatNguyenVong(2);
    });
    $('#IDToHopMon2').change(function () {
        CapNhatDiemTheoToHopMon(2);
    });
    $('#IDCTTuyenSinh3').change(function () {
        CapNhatNguyenVong(3);
    });
    $('#IDToHopMon3').change(function () {
        CapNhatDiemTheoToHopMon(3);
    });
    $('#IDCTTuyenSinh4').change(function () {
        CapNhatNguyenVong(4);
    });
    $('#IDToHopMon4').change(function () {
        CapNhatDiemTheoToHopMon(4);
    });
    $('#IDCTTuyenSinh5').change(function () {
        CapNhatNguyenVong(5);
    });
    $('#IDToHopMon5').change(function () {
        CapNhatDiemTheoToHopMon(5);
    });
    $('#IDCTTuyenSinh6').change(function () {
        CapNhatNguyenVong(6);
    });
    $('#IDToHopMon6').change(function () {
        CapNhatDiemTheoToHopMon(6);
    });
    $('#IDCTTuyenSinh7').change(function () {
        CapNhatNguyenVong(7);
    });
    $('#IDToHopMon7').change(function () {
        CapNhatDiemTheoToHopMon(7);
    });
    $('#IDCTTuyenSinh8').change(function () {
        CapNhatNguyenVong(8);
    });
    $('#IDToHopMon8').change(function () {
        CapNhatDiemTheoToHopMon(8);
    });
    $('#IDCTTuyenSinh9').change(function () {
        CapNhatNguyenVong(9);
    });
    $('#IDToHopMon9').change(function () {
        CapNhatDiemTheoToHopMon(9);
    });
    $('#IDCTTuyenSinh10').change(function () {
        CapNhatNguyenVong(10);
    });
    $('#IDToHopMon10').change(function () {
        CapNhatDiemTheoToHopMon(10);
    });
    $('#DiemLop10CN').change(function () {
        ValidateDiemNhap("#DiemLop10CN", "Điểm TB Lớp 10");
    });
    $('#DiemLop11CN').change(function () {
        ValidateDiemNhap("#DiemLop11CN", "Điểm TB Lớp 11");
    });
    $('#DiemLop12CN').change(function () {
        ValidateDiemNhap("#DiemLop12CN", "Điểm TB Lớp 12");
    });
    $('#DiemLop10HK1').change(function () {
        ValidateDiemNhap("#DiemLop10HK1", "Điểm TB HK1-Lớp 10");
    });
    $('#DiemLop10HK2').change(function () {
        ValidateDiemNhap("#DiemLop10HK2", "Điểm TB HK2-Lớp 10");
    });
    $('#DiemLop11HK1').change(function () {
        ValidateDiemNhap("#DiemLop11HK1", "Điểm TB HK1-Lớp 11");
    });
    $('#DiemLop11HK2').change(function () {
        ValidateDiemNhap("#DiemLop11HK2", "Điểm TB HK2-Lớp 11");
    });
    $('#DiemLop12HK1').change(function () {
        ValidateDiemNhap("#DiemLop12HK1", "Điểm TB HK1-Lớp 12");
    });
    $('#DiemLop12HK2').change(function () {
        ValidateDiemNhap("#DiemLop12HK2", "Điểm TB HK2-Lớp 12");
    });
    $('#IDTieuChiTuyenSinh').change(function () {
        HienThiPhuongThucXetTuyen();
    });
    var lstIDMonThi = $("#TS_IDsMonThiSuDung").val();
    var arr = lstIDMonThi.split(",");
    for (var i = 0; i < arr.length; i++) {
        var obj_DiemTHPT = "DiemMonTHPT-" + arr[i];
        var obj_Diem_HK1_Lop10 = "DiemMon-" + arr[i] + "-HK1Lop10";
        var obj_Diem_HK2_Lop10 = "DiemMon-" + arr[i] + "-HK2Lop10";
        var obj_Diem_HK1_Lop11 = "DiemMon-" + arr[i] + "-HK1Lop11";
        var obj_Diem_HK2_Lop11 = "DiemMon-" + arr[i] + "-HK2Lop11";
        var obj_Diem_HK1_Lop12 = "DiemMon-" + arr[i] + "-HK1Lop12";
        var obj_Diem_HK2_Lop12 = "DiemMon-" + arr[i] + "-HK2Lop12";
        $("#" + obj_DiemTHPT).change(function () {
            ValidateDiemMonThiNhap(1);
            CapNhatDiemToHopMon();
        });
        $("#" + obj_Diem_HK1_Lop10).change(function () {
            ValidateDiemMonThiNhap(0);
            CapNhatDiemToHopMon();
        });
        $("#" + obj_Diem_HK2_Lop10).change(function () {
            ValidateDiemMonThiNhap(0);
            CapNhatDiemToHopMon();
        });
        $("#" + obj_Diem_HK1_Lop11).change(function () {
            ValidateDiemMonThiNhap(0);
            CapNhatDiemToHopMon();
        });
        $("#" + obj_Diem_HK2_Lop11).change(function () {
            ValidateDiemMonThiNhap(0);
            CapNhatDiemToHopMon();
        });
        $("#" + obj_Diem_HK1_Lop12).change(function () {
            ValidateDiemMonThiNhap(0);
            CapNhatDiemToHopMon();
        });
        $("#" + obj_Diem_HK2_Lop12).change(function () {
            ValidateDiemMonThiNhap(0);
            CapNhatDiemToHopMon();
        });
    }
    $('.btnXoaFileKhungHoSoUpload').on('click', function (evt) {
        var _key = $(this).attr('data-key');
        if (_key != "") {
            $('#file-khunghoso-' + _key).val('');
            $('#file-chosen-khunghoso-' + _key).text("Chưa chọn file");
        }
    });
    var lstIDKhungHoSo = $("#TS_IDKhungHoSoCapNhat").val();
    var arrIDKhungHoSo = lstIDKhungHoSo.split(",");
    for (var j = 0; j < arrIDKhungHoSo.length; j++) {
        $('#file-khunghoso-' + arrIDKhungHoSo[j]).change(function () {
            var _idHoSo = this.id.split("-")[2];
            var tenFile = this.files[0].name;
            $('#file-chosen-khunghoso-' + _idHoSo).text(tenFile);
        });
    }
});
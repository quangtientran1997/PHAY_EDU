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
function convertFloat(value) {
    try {
        var tempStr = value.toString();
        value = tempStr.replace(",", ".");
        return parseFloat(value).toFixed(2);
    }
    catch (err) {
        return null;
    }
}
function emptyIfNull(value) {
    if (value != null && value !== "") {
        return convertFloat(value);
    }
    else {
        return "";
    }
}
function onChangeNhapDiem(textBox) {
    if (textBox.value != '' && textBox.value != undefined && textBox.value != null && !isNaN(textBox.value)) {
        textBox.value = convertFloat(textBox.value);
    }
    else {
        textBox.value = null;
    }
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
function HeaderCTTS() {
    var html = "<tr class='title'>";
    html += "<th class='k-header'><input type='checkbox' id='checkALLCTTSXetTuyenDeAn' /></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>Cơ sở</span></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>Bậc đào tạo</span></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>Loại đào tạo</span></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>Ngành</span></th>";
    if (CheckTuyenSinhTheoChuyenNganh()) {
        html += "<th class='k-header'><span align='center' class='k-link'>Chuyên ngành</span></th>";
    }
    html += "<th class='k-header'><span align='center' class='k-link'>Đợt xét</span></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>Chỉ tiêu</span></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>SL nguyện vọng</span></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>SL trúng tuyển</span></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>Còn lại</span></th>";
    html += "</tr>";
    return html;
}
function LoadSumCTTS(slNguyenVong, slTrungTuyen, slConLai) {
    var col = 7;
    if (CheckTuyenSinhTheoChuyenNganh()) {
        col = 8;
    }
    var html = "<tr class='titleKetQuaSum'>";
    html += "<th colspan='" + col + "' class='k-header'></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>" + slNguyenVong + "</span></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>" + slTrungTuyen + "</span></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>" + slConLai + "</span></th>";
    html += "</tr>";
    return html;
}
function LoadTrCTTS(_clsName,_idCTTS, _tenCoSo, _tenHeDaoTao, _tenLoaiDaoTao, _tenNganh, _tenNghe, _dotXetHS, _chiTieu, _slNguyenVong, _slTrungTuyen, _slConLai) {
    if (_tenCoSo == null || _tenCoSo == undefined || _tenCoSo == "null") {
        _tenCoSo = "";
    }
    if (_tenHeDaoTao == null || _tenHeDaoTao == undefined || _tenHeDaoTao == "null") {
        _tenHeDaoTao = "";
    }
    if (_tenLoaiDaoTao == null || _tenLoaiDaoTao == undefined || _tenLoaiDaoTao == "null") {
        _tenLoaiDaoTao = "";
    }
    if (_tenNganh == null || _tenNganh == undefined || _tenNganh == "null") {
        _tenNganh = "";
    }
    if (_tenNghe == null || _tenNghe == undefined || _tenNghe == "null") {
        _tenNghe = "";
    }
    if (_dotXetHS == null || _dotXetHS == undefined || _dotXetHS == "null") {
        _dotXetHS = "";
    }
    if (_chiTieu == null || _chiTieu == undefined || _chiTieu == "null" || isNaN(_chiTieu)) {
        _chiTieu = "";
    }
    if (_slNguyenVong == null || _slNguyenVong == undefined || _slNguyenVong == "" || isNaN(_slNguyenVong)) {
        _slNguyenVong = "0";
    }
    if (_slTrungTuyen == null || _slTrungTuyen == undefined || _slTrungTuyen == "" || isNaN(_slTrungTuyen)) {
        _slTrungTuyen = "0";
    }
    if (_slConLai == null || _slConLai == undefined || _slConLai == "" || isNaN(_slConLai)) {
        _slConLai = "0";
    }
    var html = "";
    html += "<tr class='" + _clsName + "'>";
    html += "<td class='txt-center'><input type='checkbox' id='checkCTTSXetTuyenDeAn_" + _idCTTS + "' class='checkCTTSXetTuyenDeAn' data-key='" + _idCTTS + "' /></td>";
    html += "<td>" + _tenCoSo + "</td>";
    html += "<td>" + _tenHeDaoTao + "</td>";
    html += "<td>" + _tenLoaiDaoTao + "</td>";
    html += "<td>" + _tenNganh + "</td>";
    if (CheckTuyenSinhTheoChuyenNganh()) {
        html += "<td>" + _tenNghe + "</td>";
    }
    html += "<td class='txt-center'>" + _dotXetHS + "</td>";
    html += "<td class='txt-center'>" + _chiTieu + "</td>";
    html += "<td class='txt-center'>" + _slNguyenVong + "</td>";
    html += "<td class='txt-center'>" + _slTrungTuyen + "</td>";
    html += "<td class='txt-center'>" + _slConLai + "</td>";
    html += "</tr>";
    return html;
}
function HeaderToHopMon() {
    var html = "<tr class='title'>";
    html += "<th class='k-header'><input type='checkbox' id='checkALLTHMXetTuyenDeAn' /></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>Ngành</span></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>Tổ hợp môn</span></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>SL hồ sơ</span></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>Điểm tiêu chí</span></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>Điểm xét tuyển</span></th>";
    html += "<th class='k-header'><span align='center' class='k-link'>SL trúng tuyển</span></th>";
    html += "</tr>";
    return html;
}
function LoadSumToHopMon(slHoSo, slTrungTuyen) {
    var html = "<tr class='titleKetQuaSum'>";
    html += "<td colspan='3' class='k-header'></td>";
    html += "<th class='k-header'><span align='center' class='k-link'>" + slHoSo + "</span></th>";
    html += "<td colspan='2' class='k-header'></td>";
    html += "<th class='k-header'><span align='center' class='k-link'>" + slTrungTuyen + "</span></th>";
    html += "</tr>";
    return html;
}
function LoadTrToHopMon(_clsName,_idCTTS, _idToHopMon, _tenNganh, _tenToHopMon, _slHoSo, _diemTieuChi, _diemXetTuyen, _slTrungTuyen) {
    if (_idCTTS == null || _idCTTS == undefined || _idCTTS == "null" || isNaN(_idCTTS)) {
        _idCTTS = "0";
    }
    if (_idToHopMon == null || _idToHopMon == undefined || _idToHopMon == "null" || isNaN(_idToHopMon)) {
        _idToHopMon = "0";
    }
    if (_tenNganh == null || _tenNganh == undefined || _tenNganh == "null") {
        _tenNganh = "";
    }
    if (_tenToHopMon == null || _tenToHopMon == undefined || _tenToHopMon == "null") {
        _tenToHopMon = "";
    }
    var html = "";
    html += "<tr class='" + _clsName + "'>";
    html += "<td class='txt-center'><input type='checkbox' id='checkTHMXetTuyenDeAn_" + _idCTTS + "_" + _idToHopMon + "' class='checkTHMXetTuyenDeAn' data-key='" + _idCTTS + "_" + _idToHopMon + "' /></td>";
    html += "<td class='txt-center'>" + _tenNganh + " <input id='TS_CheckNganhXET_" + _idCTTS + "_" + _idToHopMon + "' type='hidden' value='" + _tenNganh + "'> </td>";
    html += "<td class='txt-center'>" + _tenToHopMon + "</td>";
    html += "<td class='txt-center'>" + _slHoSo + "</td>";
    html += "<td class='txt-center'> " + LoadNhapDiem(true, _idToHopMon, _idCTTS, _diemTieuChi); + " </td>";
    html += "<td class='txt-center'> " + LoadNhapDiem(false, _idToHopMon, _idCTTS, _diemXetTuyen); + " </td>";
    html += "<td class='txt-center'>" + _slTrungTuyen + "</td>";
    html += "</tr>";
    return html;
}
function FotterNoData(col) {
    var html = "<tr class='titleKetQuaSum'>";
    html += "<td class='txt-center' colspan='" + col + "'><label class='required txt-bold'>Không có dữ liệu hiển thị</label></td>";
    html += "</tr>";
    return html;
}
function CheckData() {
    var messageError = "";
    var _idDotTuyenSinh = $('#cboDotTuyenSinh').val();
    var _idCoSo = $('#cboCoSo').val();
    var _idTieuChiTuyenSinh = $("#cboTieuChiTuyenSinh").data('kendoComboBox').value();
    var _idDotXetHS = $('#cboDotXetHS').val();
    _idDotTuyenSinh = (_idDotTuyenSinh != undefined && _idDotTuyenSinh != "" && _idDotTuyenSinh != 0) ? _idDotTuyenSinh : null;
    _idCoSo = (_idCoSo != undefined && _idCoSo != "" && _idCoSo != 0) ? _idCoSo : null;
    _idTieuChiTuyenSinh = (_idTieuChiTuyenSinh != undefined && _idTieuChiTuyenSinh != "" && _idTieuChiTuyenSinh != 0) ? _idTieuChiTuyenSinh : null;
    _idDotXetHS = (_idDotXetHS != undefined && _idDotXetHS != "" && _idDotXetHS != 0) ? _idDotXetHS : null;
    if (_idDotTuyenSinh != null && _idTieuChiTuyenSinh != null && _idDotXetHS != null) {
        return true;
    } else {
        if (_idDotTuyenSinh == null) {
            messageError += "Chọn đợt tuyển sinh</br>";
        }
        else if (_idTieuChiTuyenSinh == null) {
            messageError += "Chọn tiêu chí</br>";
        }
        else if (_idDotXetHS == null) {
            messageError += "Chọn đợt xét hồ sơ</br>";
        }
        $.warning(messageError);
        return false;
    }

}
function LoadCheck_CTTS() {
    var html = "";
    html += "<script> $(document).ready(function () {";
    html += "$('input:checkbox#checkALLCTTSXetTuyenDeAn').on('change', function () {";
    html += "        if (this.checked) {";
    html += "            $('input:checkbox[class=checkCTTSXetTuyenDeAn]').prop('checked', this.checked);";
    html += "        }";
    html += "        else {";
    html += "            $('input:checkbox[class=checkCTTSXetTuyenDeAn]').prop('checked', this.checked);";
    html += "        }";
    html += "        LoadALLDuLieuCTTS();";
    html += "    });";
    html += "    $('input:checkbox.checkCTTSXetTuyenDeAn').on('change', function () { LoadALLDuLieuCTTS();";
    //html += "        if (this.checked) {";
    //html += "            var _key = $(this).attr('data-key');";
    //html += "            LoadDuLieuCTTS(_key);";
    //html += "        }";
    //html += "        else {";
    //html += "            LoadALLDuLieuCTTS();";
    //html += "        }";
    html += "    });";
    html += "});";
    html += "</script >";
    return html;
}
function LoadCheck_ToHopMon() {
    var html = "";
    html += "<script> $(document).ready(function () {";
    html += "$('input:checkbox#checkALLTHMXetTuyenDeAn').change(function () {";
    html += "   if (this.checked) {";
    html += "        $('input:checkbox[class=checkTHMXetTuyenDeAn]').prop('checked', this.checked);";
    html += "    }";
    html += "    else {";
    html += "       $('input:checkbox[class=checkTHMXetTuyenDeAn]').prop('checked', this.checked);";
    html += "    }";
    html += "}); ";
    html += "$('input:checkbox.checkTHMXetTuyenDeAn').on('change', function () {";
    //html += "    if (this.checked) {";
    //html += "        var _key = $(this).attr('data-key');";
    //html += "        alert(_key);";
    //html += "    }";
    //html += "    else {";
    //html += "        alert('Text_THM'); ";
    //html += "    }";
    html += "});";
    html += "});";
    html += "</script >";
    return html;

}
function LoadNhapDiem(isDiemTieuChi, _idToHopMon, _idCTTS, _value) {
    var _html = "";
    var clsName = "_DiemTieuChi_" + _idCTTS + "_" + _idToHopMon;
    if (!isDiemTieuChi) {
        clsName = "_DiemXetTuyen_" + _idCTTS + "_" + _idToHopMon;
    }
    _value = emptyIfNull(_value);
    _html += "<input maxlength='5' class='k-textbox k-input diemNhapToHopMonXetTuyenDeAn' id='" + clsName + "' value='" + _value + "' data-old-value='" + _value + "'  name='" + clsName + "' type='text' onchange='onChangeNhapDiem(this)' onkeypress = 'return isNumberKey(event);' />";
    return _html;
}
function CheckTuyenSinhTheoChuyenNganh() {
    var result = false;
    var _check = $('#TS_CheckTuyenSinhChuyenNganh').val();
    if (_check != null && _check != undefined && _check != "" && _check == "1") {
        result = true;
    }
    return result;
}
function ReturnDuLieuTimKiem(_ctts, _keyToHopMon, _keyDiemTieuChi, _keyDiemXetTuyen) {
    var _idDotTuyenSinh = $('#cboDotTuyenSinh').val();
    var _idCoSo = $('#cboCoSo').val();
    var _idHeDaoTao = $('#cboHeDaoTao').val();
    var _idLoaiDaoTao = $('#cboLoaiDaoTao').val();
    var _idNganh = $('#cboNganh').val();
    var _idTieuChiTuyenSinh = $("#cboTieuChiTuyenSinh").data('kendoComboBox').value();
    var _idDotXetHS = $('#cboDotXetHS').val();
    var _idNguyenVongNganh = $('#cboNVNganh').val();
    var _checkAnToHopMon = null;
    var _checkXetTheoTieuChiTungMon = null;
    var _checkXetTheoChiTieu = null;
    _idDotTuyenSinh = (_idDotTuyenSinh != undefined && _idDotTuyenSinh != "" && _idDotTuyenSinh != 0) ? _idDotTuyenSinh : null;
    _idCoSo = (_idCoSo != undefined && _idCoSo != "" && _idCoSo != 0) ? _idCoSo : null;
    _idTieuChiTuyenSinh = (_idTieuChiTuyenSinh != undefined && _idTieuChiTuyenSinh != "" && _idTieuChiTuyenSinh != 0) ? _idTieuChiTuyenSinh : null;
    _idDotXetHS = (_idDotXetHS != undefined && _idDotXetHS != "" && _idDotXetHS != 0) ? _idDotXetHS : null;
    if ($('#checkAnToHopMon').is(":checked")) {
        _checkAnToHopMon = true;
    }
    else {
        _checkAnToHopMon = false;
    }
    if ($('#CheckXetTieuChiTheoTungMon').is(":checked")) {
        _checkXetTheoTieuChiTungMon = true;
    }
    else {
        _checkXetTheoTieuChiTungMon = false;
    }
    if ($('#CheckXetChiTieu').is(":checked")) {
        _checkXetTheoChiTieu = true;
    }
    else {
        _checkXetTheoChiTieu = false;
    }
    return {
        pIDDotTuyenSinh: _idDotTuyenSinh,
        pIDCoSo: _idCoSo,
        pIDHeDaoTao: _idHeDaoTao,
        pIDLoaiHinhDaoTao: _idLoaiDaoTao,
        pIDNganh: _idNganh,
        pIDTieuChiTuyenSinh: _idTieuChiTuyenSinh,
        pIDDotXetHS: _idDotXetHS,
        pIDNVNganh: _idNguyenVongNganh,
        pCheckAnToHopMon: _checkAnToHopMon,
        pIDCTTSs: _ctts,
        pCheckXetTieuChiTheoTungMon: _checkXetTheoTieuChiTungMon,
        pCheckXetTheoChiTieu: _checkXetTheoChiTieu,
        pKeyToHopMons: _keyToHopMon,
        pKeyDiemTieuChis: _keyDiemTieuChi,
        pKeyDiemXetTuyens: _keyDiemXetTuyen
    };
}
function LoadGird() {
    loadingMarkFull();
    if (CheckData()) {
        $.ajax({
            url: '/TuyenSinhDangKy/XetTuyenTheoDeAn',
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
function LoadDuLieuCTTS() {
    loadingMarkFull();
    $('#TS_CheckCountDuLieuXetTuyen').val(0);
    if (CheckData()) {
        var _ctts = "";
        var _keyToHopMon = "";
        var _keyDiemTieuChi = "";
        var _keyDiemXetTuyen = "";
        var _html = "";
        _html += "<thead class='k-grid-header'>";
        _html += HeaderCTTS();
        $.ajax({
            url: '/TuyenSinhDangKy/GetDanhSachCTTS_XetTuyenTheoDeAn',
            type: 'POST',
            dataType: 'json',
            data: {
                param: ReturnDuLieuTimKiem(_ctts, _keyToHopMon, _keyDiemTieuChi, _keyDiemXetTuyen)
            },
            beforeSend: function () {
                loadingMarkFull();
            },
            success: function (data) {
                removeLoadingMarkFull();
                if (data.pData != null && data.pData.length > 0) {
                    _html += LoadSumCTTS(data.pSoLuongNguyenVong, data.pSoLuongTrungTuyen, data.pSoLuongConLai);
                    _html += "</thead>";
                    for (var i = 0; i < data.pData.length; i++) {
                        var _clsName = "";
                        if (i % 2 != 0) {
                            _clsName = "k-alt";
                        }
                        _html += LoadTrCTTS(
                            _clsName,
                            parseInt(data.pData[i].IDCTTuyenSinh),
                            data.pData[i].TenCoSo,
                            data.pData[i].TenHeDaoTao,
                            data.pData[i].TenLoaiHinhDT,
                            data.pData[i].TenNganh,
                            data.pData[i].TenNghe,
                            data.pData[i].DotXetHoSo,
                            data.pData[i].ChiTieuDeAn,
                            parseInt(data.pData[i].SoLuongHoSo),
                            parseInt(data.pData[i].SoLuongTrungTuyen),
                            parseInt(data.pData[i].P_ConLai)
                        );
                    }
                    _html += LoadCheck_CTTS();
                }
                else {
                    _html += "</thead>";
                    if (CheckTuyenSinhTheoChuyenNganh()) {
                        _html += FotterNoData(11);
                    }
                    else {
                        _html += FotterNoData(10);
                    }
                    
                }
                $('#tblDanhSachCTTSXetTuyenDeAn').html(_html);
            }
        });

    }
    else {
        removeLoadingMarkFull();
    }
}
function LoadALLDuLieuCTTS() {
    var arrCTTS = [];
    $('input:checkbox.checkCTTSXetTuyenDeAn').each(function () {
        if (this.checked) {
            var _key = $(this).attr('data-key');
            arrCTTS.push(_key);
        }
    });
    LoadDuLieuTHM(arrCTTS.join());
}
function LoadDuLieuTHM(_ctts) {
    loadingMarkFull();
    $('#TS_CheckCountDuLieuXetTuyen').val(0);
    if (CheckData()) {
        var _html = "";
        var _keyToHopMon = "";
        var _keyDiemTieuChi = "";
        var _keyDiemXetTuyen = "";
        _html += "<thead class='k-grid-header'>";
        _html += HeaderToHopMon();
        $.ajax({
            url: '/TuyenSinhDangKy/GetDanhSachTHM_XetTuyenTheoDeAn',
            type: 'POST',
            dataType: 'json',
            data: {
                param: ReturnDuLieuTimKiem(_ctts, _keyToHopMon, _keyDiemTieuChi, _keyDiemXetTuyen)
            },
            beforeSend: function () {
                loadingMarkFull();
            },
            success: function (data) {
                removeLoadingMarkFull();
                if (data.pData != null && data.pData.length > 0) {
                    $('#TS_CheckCountDuLieuXetTuyen').val(data.pData.length);
                    _html += LoadSumToHopMon(data.pSoLuongHoSo, data.pSoLuongTrungTuyen);
                    _html += "</thead>";
                    for (var i = 0; i < data.pData.length; i++) {
                        var _diemTieuChi = "";
                        var _diemXetTuyen = "";
                        if (data.pData[i].DiemTieuChi1 != null && data.pData[i].DiemTieuChi1 != undefined && data.pData[i].DiemTieuChi1 != "") {
                            _diemTieuChi = data.pData[i].DiemTieuChi1;
                        }
                        if (data.pData[i].DiemChuan != null && data.pData[i].DiemChuan != undefined && data.pData[i].DiemChuan != "") {
                            _diemXetTuyen = data.pData[i].DiemChuan;
                        }
                        var _clsName = "";
                        if (i % 2 != 0) {
                            _clsName = "k-alt";
                        }
                        _html += LoadTrToHopMon(
                            _clsName,
                            parseInt(data.pData[i].IDCTTuyenSinh),
                            parseInt(data.pData[i].IDToHopMon),
                            data.pData[i].TenNganh,
                            data.pData[i].MaToHopMon,
                            parseInt(data.pData[i].SoLuongHoSo),
                            _diemTieuChi,
                            _diemXetTuyen,
                            parseInt(data.pData[i].SoLuongTrungTuyen),
                        );
                    }
                    _html += LoadCheck_ToHopMon();
                }
                else {
                    _html += "</thead>";
                    _html += FotterNoData(7);
                }
                $('#tblDanhSachToHopMonXetTuyenDeAn').html(_html);
            }
        });

    }
    else {
        removeLoadingMarkFull();
    }
}
function XetTuyen(check) {
    if (CheckData()) {
        var check_CountDuLieuXetTuyen = $('#TS_CheckCountDuLieuXetTuyen').val();
        if (parseInt(check_CountDuLieuXetTuyen) <= 0) {
            $.warning("Không có dữ liệu để xét tuyển");
        }
        else {
            var isXetTuyen = true;
            var _text = 'Xét tuyển';
            var messError = "";
            var _ctts = "";
            var _keyToHopMon = "";
            var _keyDiemTieuChi = "";
            var _keyDiemXetTuyen = "";
            var arrKeyToHopMon = [];
            var arrKeyDiemTieuChi = [];
            var arrKeyDiemXetTuyen = [];
            if (check == 0) {
                _text = 'Hủy xét tuyển';
                isXetTuyen = false;
            }

            $('input:checkbox.checkTHMXetTuyenDeAn').each(function () {
                if (this.checked) {
                    var _key = $(this).attr('data-key');
                    arrKeyToHopMon.push(_key);
                }
            });

            if (arrKeyToHopMon != null && arrKeyToHopMon.length > 0) {
                for (var i = 0; i < arrKeyToHopMon.length; i++) {
                    var checkDiemXetTuyen = 0;
                    var _diemTieuChi = $('#_DiemTieuChi_' + arrKeyToHopMon[i]).val();
                    var _diemXetTuyen = $('#_DiemXetTuyen_' + arrKeyToHopMon[i]).val();
                    if (_diemTieuChi == null || _diemTieuChi == "" || _diemTieuChi == undefined || isNaN(_diemTieuChi)) {
                        _diemTieuChi = "-1";
                    }
                    if (_diemXetTuyen == null || _diemXetTuyen == undefined || _diemXetTuyen == "" || isNaN(_diemXetTuyen)) {
                        checkDiemXetTuyen = 1;
                        _diemXetTuyen = "-1";
                    }

                    if (checkDiemXetTuyen == 1 && check == 1) {
                        var _tenNganh = $('#TS_CheckNganhXET_' + arrKeyToHopMon[i]).val();
                        messError = "Ngành " + _tenNganh + " chưa có điểm xét tuyển.";
                        $.warning(messError);
                        break;
                    }
                    else {
                        arrKeyDiemTieuChi.push(_diemTieuChi);
                        arrKeyDiemXetTuyen.push(_diemXetTuyen);
                    }

                }
            }
            else {
                messError = "Chưa chọn dữ liệu để " + _text;
                $.warning(messError);
            }

            if (messError == ""
                && arrKeyDiemTieuChi != null && arrKeyDiemTieuChi.length > 0
                && arrKeyDiemXetTuyen != null && arrKeyDiemXetTuyen.length > 0
                && arrKeyDiemTieuChi.length == arrKeyDiemXetTuyen.length
                && arrKeyDiemXetTuyen.length == arrKeyToHopMon.length) {
                _keyToHopMon = arrKeyToHopMon.join("#");
                _keyDiemTieuChi = arrKeyDiemTieuChi.join("#");
                _keyDiemXetTuyen = arrKeyDiemXetTuyen.join("#");
                var arrCTTS = [];
                $('input:checkbox.checkCTTSXetTuyenDeAn').each(function () {
                    if (this.checked) {
                        var _key = $(this).attr('data-key');
                        arrCTTS.push(_key);
                    }
                });
                _ctts = arrCTTS.join();
                if (_keyToHopMon != "" && _keyDiemXetTuyen != "" && _ctts != "") {
                    $.ajax({
                        url: '/TuyenSinhDangKy/CapNhat_XetTuyenTheoDeAn',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            param: ReturnDuLieuTimKiem(_ctts, _keyToHopMon, _keyDiemTieuChi, _keyDiemXetTuyen),
                            pIsXetTuyen: isXetTuyen
                        },
                        beforeSend: function () {
                            loadingMarkFull();
                        },
                        success: function (data) {
                            removeLoadingMarkFull();
                            if (check == 1 && data != null && data != undefined && !isNaN(data) && parseInt(data) >= 0) {
                                $.success("Xét tuyển hồ sơ thành công " + data + " hồ sơ");
                                LoadALLDuLieuCTTS();
                            }
                            else if (check == 0 && data != null && data != undefined && data == "") {
                                $.success("Hủy xét tuyển hồ sơ thành công");
                                LoadALLDuLieuCTTS();
                            }
                            else {
                                $.warning(data);
                            }
                        },
                        error: function (err) {
                            $.warning(err.statusText);
                            removeLoadingMarkFull();
                        }
                    });
                }
                else {
                    console.log('ctts: ' + _ctts);
                    console.log('keyToHopMon: ' + _keyToHopMon);
                    console.log('keyDiemTieuChi: ' + _keyDiemTieuChi);
                    console.log('keyDiemXetTuyen: ' + _keyDiemXetTuyen);
                    messError = "Dữ liệu để " + _text + " không hợp lệ";
                    $.warning(messError);
                }
            }
        }
    }
}
$(document).ready(function () {
    $('#cboDotTuyenSinh').change(function () {
        $("#cboHeDaoTao").data("kendoComboBox").dataSource.read();
        $('#content').html('<div class="col-md-12" style="padding-top:15px"><div class="bold">Danh sách xét tuyển</div></div>');
    });
    $('#cboCoSo').change(function () {
        $("#cboHeDaoTao").data("kendoComboBox").dataSource.read();
        $('#content').html('<div class="col-md-12" style="padding-top:15px"><div class="bold">Danh sách xét tuyển</div></div>');
    });
    $(".btnTraCuu").click(function (event) {
        LoadGird();
    });
    $("#btnXetTuyenDeAn").click(function (event) {
        XetTuyen(1);
    });
    $("#btnHuyXetTuyenDeAn").click(function (event) {
        XetTuyen(0);
    });
    $("#btnXuatExcelXetTuyenDeAn").click(function (event) {
        loadingMarkFull();
        var check_CountDuLieuXetTuyen = $('#TS_CheckCountDuLieuXetTuyen').val();
        if (parseInt(check_CountDuLieuXetTuyen) <= 0) {
            $.warning("Không có dữ liệu để xuất excel");
            removeLoadingMarkFull();
            return;
        }
        else {
            if (CheckData()) {
                var arrCTTS = [];
                $('input:checkbox.checkCTTSXetTuyenDeAn').each(function () {
                    if (this.checked) {
                        var _key = $(this).attr('data-key');
                        arrCTTS.push(_key);
                    }
                });
                post_to_url("/TuyenSinhDangKy/Export_XetTuyenDeAn", ReturnDuLieuTimKiem(arrCTTS.join()), 'post');
                removeLoadingMarkFull();
            }
        }

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
});
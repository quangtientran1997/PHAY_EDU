let timerInterval = null;
var qrCode = null;
var qrCode2 = null;
var isKetThuc = true;

function GetDanhSachSinhVienDiemDanh(idLich) {
    debugger
    clearInterval(timerInterval);
    ClearHTML();
    GenCodeDiemDanh(idLich);
    $.ajax({
        url: "/GiangVien/DanhSachSinhVienDiemDanhByCode",
        type: 'POST',
        dataType: 'html',
        data: {
            idLichDay: idLich
        },
        beforeSend: function () {
            loadingMarkFull();
        },
        success: function (data) {
            removeLoadingMarkFull();
            $('#box_view_sinhvien').html(data);
        }
    });

}

function GenCodeDiemDanh(idLich) {
    qrCode = null;
    qrCode2 = null;
    clearInterval(timerInterval);
    isKetThuc = false;

    $.ajax({
        url: "/GiangVien/CodeDiemDanh",
        type: 'POST',
        dataType: 'html',
        data: {
            idLichDay: idLich
        },
        beforeSend: function () {
            loadingMarkFull();
        },
        success: function (data) {
            removeLoadingMarkFull();
            $('#box_QRCode').html(data);            
        }
    });
}

function GetLichDayTheoNgay() {
    ClearHTML();
    clearInterval(timerInterval);
    $.ajax({
        url: "/GiangVien/GetLichDayTheoNgay",
        type: 'POST',
        dataType: 'html',
        beforeSend: function () {
            loadingMarkFull();
        },
        success: function (data) {
            removeLoadingMarkFull();
            $('#box-view-lichday').html(data);
        }
    });
}


function GetQRCode(idLich) {
    debugger    
    $("#view-screen").show();

    console.log($('#box_view_sinhvien [name=treeLichHoc]')[0]);

    clearInterval(timerInterval);
    $.ajax({
        url: "/GiangVien/GenCodeDiemDanh",
        type: 'Get',
        dataType: 'json',
        data: {
            IDLichDay: idLich
        },
        beforeSend: function () {
        },
        success: function (data) {
            $('#btnKetThuc').removeAttr('disabled');
            $('#btnKetThuc').show();
            $('#btnBatDau').hide();
            $('#btnBatDau').attr("disabled", "disabled");
            $('#btnDiemDanhSV').hide();
            $('#btnDiemDanhSV').attr("disabled", "disabled");
            debugger
            var code = data.Code;
            if (qrCode == null || qrCode == undefined || qrCode == '') {
                qrCode = $("#qrcode").kendoQRCode({
                    value: code,
                    size: 150,
                    color: "#000000"
                }).data("kendoQRCode");
            }
            else {
                qrCode.value(code);
            }

            if (qrCode2 == null || qrCode2 == undefined || qrCode2 == '') {
                qrCode2 = $("#qrcode2").kendoQRCode({
                    value: code,
                    size: 500,
                    color: "#000000"
                }).data("kendoQRCode");
            }
            else {
                qrCode2.value(code);
            }

            $('#qrcapchar').text(code);
            $('#qrcapchar2').text(code);
            $('#Code').val(code);

            var timeEnd = data.TimeEnd;//new Date(parseInt(data.TimeEnd.substr(6))).getTime();
            var timeStart = data.TimeStart;//new Date(parseInt(data.TimeStart.substr(6))).getTime();
            var dist = (timeEnd - timeStart);

            TimeCountDown(dist, idLich);
        }
    });
}

function KetThucDiemDanh(idLich) {
    $("#view-screen").hide();
    $.ajax({
        url: "/GiangVien/KetThucDiemDanhByCode",
        type: 'Post',
        dataType: 'json',
        data: {
            IDLichDay: idLich
        },
        beforeSend: function () {
        },
        success: function (data) {
            var t = "";
            if (data.Errors || data.errors) {
                var a = void 0 == data.Errors ? data.errors : data.Errors;
                a && ($.each(a, function (data, a) {
                    "errors" in a && $.each(a.errors, function () {
                        t += this + "<br/>"
                    })
                }), t = t.substr(0, t.lastIndexOf("<br/>")))
            }
            if (t != null && t != "") {
                $.warning(t);
            } else {
                debugger
                $.success("Điểm danh kết thúc.");

                $('#btnBatDau').removeAttr('disabled');
                $('#btnBatDau').show();
                $('#btnKetThuc').hide();
                $('#btnKetThuc').attr("disabled", "disabled");
                $('#btnDiemDanhSV').removeAttr('disabled');
                $('#btnDiemDanhSV').show();

                GenCodeDiemDanh(idLich);

                clearInterval(timerInterval);

                qrCode = null; qrCode2 = null;

                isKetThuc = true;
            }
        }
        });
    }

function TimeCountDown(distance, idlich) {
    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 10;
    const ALERT_THRESHOLD = 5;

    const COLOR_CODES = {
        info: {
            color: "green"
        },
        warning: {
            color: "orange",
            threshold: WARNING_THRESHOLD
        },
        alert: {
            color: "red",
            threshold: ALERT_THRESHOLD
        }
    };

    const TIME_LIMIT = distance;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let remainingPathColor = COLOR_CODES.info.color;

    document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
        timeLeft
    )} giây</span>
</div>
`;

    document.getElementById("app2").innerHTML = ` <span id="base-time-clock">${formatTime(
        timeLeft
    )} giây</span>`;

    startTimer();

    function onTimesUp() {
        debugger;
        clearInterval(timerInterval);
        GetQRCode(idlich);

    }

    function startTimer() {
        debugger
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            if (timeLeft <= 0) {
                onTimesUp();
            }
            document.getElementById("base-timer-label").innerHTML = formatTime(
                timeLeft
            ) + " giây";

            document.getElementById("base-time-clock").innerHTML = formatTime(
                timeLeft
            ) + " giây";
            setCircleDasharray();
            setRemainingPathColor(timeLeft);


        }, 1000);
    }

    function formatTime(time) {
        let seconds = time;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${seconds}`;
    }

    function setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= alert.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(warning.color);
        }
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }

}

function Loading() {
    $('.boxLoading').html('<div class="iframe-loading-overlay" style="display: block;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="position:absolute;top:50%;left:50%;color:#397FAE;margin-top:-45px;margin-left:-45px;font-size:90px;"></i></div>');
}
function ClearLoading() {
    $('.boxLoading').html('');
}
function ClearHTML() {
    $('#box_view_sinhvien').html('<div class="col-md-12" style="padding-top:15px"><div class="bold">Thông tin sinh viên.</div></div>');
}
function removeLoadingMarkFull() {
    $('.k-loading-mask').remove();
}
function loadingMarkFull() {
    var html = '<div class="k-loading-mask" style="width: 100%;height: 100%;top: 0px;left: 0px;z-index: 99999999999999;display: block;background-color: #607d8b2b;position: fixed;bottom: 0px;"><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style="position:absolute;top:10px;left:50%;color:#f73900;margin-top:20%;margin-left:-45px;font-size:90px;"></i></div>';
    $(html).appendTo(document.body);
}


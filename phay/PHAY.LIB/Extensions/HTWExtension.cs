using PHAY.LIB.Common;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using System.Web.Mvc.Html;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;
using System.Linq.Expressions;
using System;
using System.Web;
using PHAY.LIB.DropDownList;
using System.Collections.Generic;
using System.Web.Routing;
using System.Linq;

namespace PHAY.LIB.Extensions
{
    public static partial class HTWExtension
    {
        public enum LocalizationPrefix
        {
            [System.ComponentModel.Description("Editor_")]
            Editor = 0,
            [System.ComponentModel.Description("Pager_")]
            Pager,
            [System.ComponentModel.Description("Grid_")]
            Grid,
            [System.ComponentModel.Description("Group_")]
            Group,
            [System.ComponentModel.Description("Filter_")]
            Filter,
            [System.ComponentModel.Description("Upload_")]
            Upload
        }

        #region DropDownList

        public static MvcHtmlString CMSDropDownList(this HtmlHelper htmlHelper, string name, EnumDropDownList enumDropDownList, object value = null, string placeholder = "Chọn", object htmlAttibutes = null, object vl = null, bool isFrontEnd = false, string onChange = "", int? idDefault = 0)
        {
            var select = new TagBuilder("select");
            var options = "";
            TagBuilder option;
            option = new TagBuilder("option");
            option.MergeAttribute("value", "");
            option.SetInnerText(placeholder);
            options += option.ToString(TagRenderMode.Normal) + "\n";

            try
            {

                var data = new List<DropdownSelectListViewModel>();
                data = (List<DropdownSelectListViewModel>)DropdownModel.GetDataForDopdown(enumDropDownList, vl, isFrontEnd, idDefault);

                if (data != null && data.Count() > 0)
                {
                    //Group 
                    var dataGroup = data.Where(m => m.TextGroup != null && m.TextGroup != "").GroupBy(m => m.TextGroup).ToList();
                    if (dataGroup != null && dataGroup.Count() > 0)
                    {
                        foreach (var g in dataGroup)
                        {
                            var dataForGroup = data.Where(m => m.TextGroup == g.Key).ToList();
                            if (dataForGroup != null)
                            {
                                TagBuilder optgroup = new TagBuilder("optgroup");
                                optgroup.MergeAttribute("label", g.Key);

                                var optionForOptGroup = "";

                                foreach (var item in dataForGroup)
                                {
                                    TagBuilder optionItem = new TagBuilder("option");
                                    optionItem.MergeAttribute("value", item.Value.ToString());
                                    optionItem.SetInnerText(item.Text);
                                    try
                                    {
                                        if (value != null)
                                        {
                                            if (value.ToString() == item.Value)
                                            {
                                                optionItem.MergeAttribute("selected", "selected");
                                            }

                                        }
                                    }
                                    catch (Exception) { }
                                    optionForOptGroup += optionItem.ToString(TagRenderMode.Normal) + "\n";
                                }

                                optgroup.InnerHtml = optionForOptGroup;

                                options += optgroup.ToString(TagRenderMode.Normal) + "\n";
                            }
                        }
                    }
                    else
                    {
                        foreach (var item in data)
                        {
                            option = new TagBuilder("option");
                            option.MergeAttribute("value", item.Value.ToString());
                            option.SetInnerText(item.Text);
                            try
                            {
                                if (value != null)
                                {
                                    if (value.ToString() == item.Value)
                                    {
                                        option.MergeAttribute("selected", "selected");
                                    }

                                }
                            }
                            catch (Exception ex)
                            {

                            }
                            options += option.ToString(TagRenderMode.Normal) + "\n";
                        }
                    }
                }
                //select.MergeAttribute("data-val", "true");
                //select.MergeAttribute("data-val-required", "The field is required.");
                select.MergeAttribute("placeholder", placeholder);
                select.MergeAttribute("class", "form-control");
                select.MergeAttribute("id", name);
                select.MergeAttribute("name", name);
                select.MergeAttribute("onchange", onChange + "(this)");
                select.MergeAttributes(new RouteValueDictionary(htmlAttibutes), true);
                select.InnerHtml = options;


            }
            catch (Exception)
            {

            }


            return new MvcHtmlString(select.ToString(TagRenderMode.Normal));
        }

        public static MvcHtmlString CMSDropDownListFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, EnumDropDownList enumDropDownList, string placeholder = "Chọn", object htmlAttibutes = null, object vl = null, bool isFrontEnd = false, string onChange = "", int? idDefault = 0)
        {
            if (expression == null)
            {
                throw new ArgumentNullException("expression");
            }
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression<TModel, TProperty>(expression, htmlHelper.ViewData);
            object val = null;
            if (metadata.Model != null)
            {
                try
                {
                    val = metadata.Model.ToString();// int.Parse(metadata.Model.ToString());
                }
                catch (Exception) { }
            }
            string name = ExpressionHelper.GetExpressionText((LambdaExpression)expression);
            return CMSDropDownList(htmlHelper, name, enumDropDownList, val, placeholder, htmlAttibutes, vl, isFrontEnd, onChange, idDefault);
        }
        #endregion

        public static Kendo.Mvc.UI.Fluent.GridBuilder<T> CMSConfigs<T>(this Kendo.Mvc.UI.Fluent.GridBuilder<T> grid, bool isEnabled = false) where T : class
        {
            var com = grid.ToComponent();

            // Thiết lập pagesize mặc định
            if (com.Pageable.Enabled)
            {
                com.Pageable.PageSizes = new int[] { 10, 20, 50 };
            }

            // Thiết lập reorder column
            com.Reorderable.Enabled = true;

            // Thêm event
            if (!com.Events.ContainsKey("dataBinding"))
            {
                com.Events.Add("dataBinding", new Kendo.Mvc.ClientHandlerDescriptor { HandlerName = "function (e) { $(this).gridEventDataBinding(e); }" });
            }

            LocalizationGrid(com);

            return grid;
        }

        public static void LocalizationGrid<T>(Kendo.Mvc.UI.Grid<T> com) where T : class
        {

            if (com.Pageable.Enabled)
            {
                UpdateKendoUILocalizationMessage(com.Pageable.Messages, LocalizationPrefix.Pager);
            }

        }

        private static void UpdateKendoUILocalizationMessage(object obj, LocalizationPrefix prefix)
        {
            // Chỉ cập nhật tiếng Việt
            if (CommonBase.KendoUIResourceManager != null &&
                CommonBase.CurrentCultureName == "vi-VN")
            {
                foreach (var prop in obj.GetType().GetProperties())
                {
                    var propName = prefix.GetEnumDesciption() + prop.Name;
                    string val = CommonBase.KendoUIResourceManager.GetString(propName);

                    if (!val.IsNullOrEmpty())
                    {
                        prop.SetValue(obj, val);
                    }
                }
            }
        }

        #region Form
        public static MvcForm CMSPopupForm(this AjaxHelper ajaxHelper, CMSPopupFormOptions options = null)
        {
            string jsObject = "null";
            string actionName = null;
            string controllerName = null;
            object routeValues = null;

            options = options ?? new CMSPopupFormOptions();

            options.Url = ajaxHelper.ViewContext.RequestContext.HttpContext.Request.Url.ToString();

            options.FormID = options.FormID.IsNullOrEmpty() ? "frm" + CommonBase.GetUnique(5) : options.FormID;

            jsObject = options.ToJson(true);
            actionName = options.ActionName;
            controllerName = options.ControllerName;
            routeValues = options.RouteValues;

            var ajaxOptions = new AjaxOptions
            {
                OnBegin = string.Format("popupEditorBegin(xhr, {0})", jsObject),
                OnSuccess = string.IsNullOrEmpty(options.OnSuccess) ? string.Format("popupEditorSuccess(data, status, xhr, {0})", jsObject) : string.Format("{0}(data, status, xhr, {1})", options.OnSuccess.Trim(), jsObject),
                OnFailure = string.IsNullOrEmpty(options.OnFailure) ? string.Format("popupEditorFailure(xhr, status, {0})", jsObject) : string.Format("{0}(xhr, status, {1})", options.OnFailure.Trim(), jsObject),
                LoadingElementId = "",
            };

            return System.Web.Mvc.Ajax.AjaxExtensions.BeginForm(ajaxHelper, actionName, controllerName, routeValues,
                ajaxOptions, new { data_validation = "true", data_before_validate = options.OnBeforeValidate, id = options.FormID, data_ms_success = options.Message });
        }

        public static MvcForm CMSFormFilter(this HtmlHelper html, string gridID, string searchSuffix, string name = "formFilter")
        {
            return html.BeginForm(null, null, FormMethod.Post, new
            {
                data_role = "filter",
                data_grid_id = gridID,
                data_search_suffix = searchSuffix,
                name = name,
                id = name
            });
        }
        #endregion

        public static Kendo.Mvc.UI.Fluent.GridBoundColumnBuilder<TModel> Select<TModel, TProperty>(this Kendo.Mvc.UI.Fluent.GridColumnFactory<TModel> columns,
           Expression<Func<TModel, TProperty>> expression, string enableField = null) where TModel : class
        {
            var propertyName = GetPropertyName(expression);

            var clientTemplate = string.Format("<input select=\"selected\" name=\"grid_ckb_select\" id=\"grid_ckb_select_#={0}#\" data-field=\"{0}\" type=\"checkbox\" title=\"\" value=\"#={0}#\" onclick=\"$('[id={1}]').gridSelectedChange(this);\" {2}/>",
                propertyName, columns.Container.Name, (!enableField.IsNullOrEmpty() ? string.Format("#=!{0} ? disabled=\"disabled\" : \"\" #", enableField) : ""));

            return columns.Bound(expression)
                .ClientTemplate(clientTemplate)
                .HeaderTemplate(string.Format("<input select=\"selecteAll\" data-field=\"{2}\" type=\"checkbox\" title=\"{1}\" onclick=\"$('[id={0}]').gridSelecteAll(this);\"/>",
                    columns.Container.Name, "", propertyName))
                .Width(35)
                .HtmlAttributes(new { style = "text-align:center" })
                .HeaderHtmlAttributes(new { style = "text-align:center" })
                .Sortable(false)
                .Filterable(false);
        }

        public static string GetPropertyName<TModel, TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            MemberExpression member = expression.Body as MemberExpression;
            System.Reflection.PropertyInfo propInfo = member.Member as System.Reflection.PropertyInfo;

            return propInfo.Name;
        }

        public static GridBoundColumnBuilder<TModel> FormatCheckBoxColumn<TModel>(this GridBoundColumnBuilder<TModel> columns) where TModel : class
        {
            columns.Width(40).HtmlAttributes(new { @class = "td-checkbox" });
            return columns;
        }

        public static Kendo.Mvc.UI.Fluent.GridTemplateColumnBuilder<TModel> ButtonDelete<TModel>(this Kendo.Mvc.UI.Fluent.GridColumnFactory<TModel> columns,
           string actionName, string controllerName = null, object routeValues = null,
           string validateActionName = null, string validateControllerName = null, object validateRouteValues = null,
           string mesConfirm = "", string mesSuccess = "") where TModel : class
        {
            if (string.IsNullOrEmpty(controllerName))
            {
                controllerName = HttpContext.Current.Request.RequestContext.RouteData.Values["controller"].ToString();
            }

            TagBuilder html = new TagBuilder("a");

            if (!actionName.IsNullOrEmpty())
            {
                //var isCoQuyen = CommonBase.HasAuthorized(controllerName, actionName);
                //if (isCoQuyen == null || isCoQuyen != true)
                //{

                //}
                //else
                //{
                    //html.AddCssClass("btn btn-primary");
                    html.MergeAttribute("data-confirm-msg", "Xóa dữ liệu được chọn ? ");
                    html.MergeAttribute("data-not-selected-msg", "Chưa chọn dữ liệu");
                    html.MergeAttribute("title", "Xóa");
                    html.MergeAttribute("data_toggle", "modal");
                    html.MergeAttribute("data-target", "##box-modal-thongbao");
                    html.MergeAttribute("OnClick", "$('[id=" + columns.Container.Name + "]').gridDeleteOne(this, '" + CommonBase.GetUrl(actionName, controllerName, routeValues) + "','" +
                              CommonBase.GetUrl(validateActionName, validateControllerName, validateRouteValues) + "','" + mesConfirm + "','" + mesSuccess + "')");

                    html.InnerHtml = "<i class=\"fa fa-trash\"></i>";
                //}
            }

            return columns.Template(new Action<TModel>(delegate (TModel model) { }))
                .ClientTemplate(html.ToString(TagRenderMode.Normal))
                .HtmlAttributes(new { style = "text-align:center" })
                .Width(40);
        }

        public static GridTemplateColumnBuilder<TModel> RecordIndexExtend<TModel>(this GridColumnFactory<TModel> column) where TModel : class
        {
            return
                column.RecordIndex().HeaderTemplate("<span align='center' class='k-link'>STT</span>")
                                    .HtmlAttributes(new { style = "text-align:center" }).HeaderHtmlAttributes(new { data_field_extend = "STT" });
        }

        public static Kendo.Mvc.UI.Fluent.GridTemplateColumnBuilder<TModel> RecordIndex<TModel>(this Kendo.Mvc.UI.Fluent.GridColumnFactory<TModel> columns) where TModel : class
        {
            return columns.Template(new Action<TModel>(delegate (TModel model) { }))
                .ClientTemplate("#= dataSourceRecordIndexIncrease() #")
                .HtmlAttributes(new { style = "text-align:right" })
                .Width(40);
        }

        public static GridBoundColumnBuilder<TModel> Align<TModel>(this GridBoundColumnBuilder<TModel> columns, Alignment align) where TModel : class
        {
            switch (align)
            {
                case Alignment.Left:
                    {
                        return columns.HtmlAttributes(new { style = "text-align:left" });
                    }
                case Alignment.Right:
                    {
                        return columns.HtmlAttributes(new { style = "text-align:right" });
                    }
                case Alignment.Center:
                    {
                        return columns.HtmlAttributes(new { style = "text-align:center" });
                    }
                default:
                    {
                        return columns.HtmlAttributes(new { style = "text-align:left" });
                    }
            }
        }
        public static MvcHtmlString CMSEnumDropDownList(this HtmlHelper helper, string name, Type typeOfEnum, object value = null, string placeholder = "Chọn", object htmlAttibutes = null, string onChange = "")
        {
            var data = GetEnumSelectListItem(typeOfEnum);
            var select = new TagBuilder("select");
            var options = "";
            TagBuilder option;

            if (placeholder != null)
            {
                option = new TagBuilder("option");
                option.MergeAttribute("value", "");
                option.SetInnerText(placeholder);
                options += option.ToString(TagRenderMode.Normal) + "\n";
            }

            if (data != null && data.Count() > 0)
            {
                foreach (var item in data)
                {
                    option = new TagBuilder("option");
                    option.MergeAttribute("value", item.Value.ToString());
                    option.SetInnerText(item.Text);
                    try
                    {
                        if (value != null)
                        {
                            if (value.ToString() == item.Value)
                            {
                                option.MergeAttribute("selected", "selected");
                            }

                        }
                    }

                    catch (Exception) { }
                    options += option.ToString(TagRenderMode.Normal) + "\n";
                }
            }

            select.MergeAttribute("placeholder", placeholder);
            select.MergeAttribute("class", "form-control");
            select.MergeAttribute("id", name);
            select.MergeAttribute("name", name);
            select.MergeAttribute("onchange", onChange + "(this)");
            select.MergeAttributes(new RouteValueDictionary(htmlAttibutes), true);
            select.InnerHtml = options;
            return new MvcHtmlString(select.ToString(TagRenderMode.Normal));
        }
        public static MvcHtmlString CMSEnumDropDownListFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression, Type typeOfEnum, string placeholder = "Chọn", object htmlAttibutes = null, string onChange = "")
        {
            if (expression == null)
            {
                throw new ArgumentNullException("expression");
            }
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression<TModel, TProperty>(expression, htmlHelper.ViewData);

            int? val = null;
            if (metadata.Model != null)
            {
                try
                {
                    val = int.Parse(metadata.Model.ToString());
                }
                catch (Exception) { }
            }

            string name = ExpressionHelper.GetExpressionText((LambdaExpression)expression);
            return CMSEnumDropDownList(htmlHelper, name, typeOfEnum, val, placeholder, htmlAttibutes, onChange);
        }

        public static List<SelectListItem> GetEnumSelectListItem(Type type, bool nullable = true)
        {
            var data = new List<SelectListItem>();
            foreach (var e in Enum.GetValues(type))
            {
                string text = ((Enum)Enum.Parse(type, e.ToString())).GetEnumDesciption();
                text = text ?? e.ToString();
                data.Add(new SelectListItem
                {
                    Text = text,
                    Value = ((int)e).ToString()
                });
            }
            return data;
        }

        public static Kendo.Mvc.UI.Fluent.GridTemplateColumnBuilder<TModel> ButtonChangeBitCMS<TModel, TProperty>(this Kendo.Mvc.UI.Fluent.GridColumnFactory<TModel> columns, Expression<Func<TModel, TProperty>> expression,
            string actionName, string controllerName = null, object routeValues = null, string title = "Hiển thị") where TModel : class
        {
            var propertyName = GetPropertyName(expression);
            TagBuilder html = new TagBuilder("a");
            html.MergeAttribute("data-confirm-msg", "Bạn muốn thay đổi dữ liệu đang chọn ? ");
            html.MergeAttribute("title", " #if(" + propertyName + ") {#Bỏ #}#" + title);
            html.MergeAttribute("OnClick", "$('[id=" + columns.Container.Name + "]').gridBit(this,'" + CommonBase.GetUrl(actionName, controllerName, routeValues) + "')");

            html.InnerHtml = "<span class=\"fa fa-check  #if(" + propertyName + "){# font-green-jungle #}else{# font-grey#}#\"></span>";
            return columns.Template(new Action<TModel>(delegate (TModel model) { }))
                .ClientTemplate(html.ToString(TagRenderMode.Normal))
                .HtmlAttributes(new { style = "text-align:center" })
                .Width(40);

        }
    }
    public enum Alignment
    {
        Left,
        Center,
        Right
    }
}

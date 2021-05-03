using PHAY.LIB.Common;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;

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
    }
}

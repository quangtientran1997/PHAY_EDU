using PHAY.DATA.Models;
using PHAY.LIB.Common;
using PHAY.LIB.ConnectKey;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace PHAY.LIB.DropDownList
{
    public static class DropdownModel
    {
        private static int ordering = 0;
        private static List<SelectListItem> lstSelect = new List<SelectListItem>();
        private static HTWEntities _Contenxt = new HTWEntities();
        private static List<int> lstID = new List<int>();
        //Connect root        
        private static string connectionString = WebConnect.GetConnectString_RootHTW;
        public static List<DropdownSelectListViewModel> GetDataForDopdown(EnumDropDownList enumDropdown, object value = null, bool isFrontEnd = false, int? idDefault = 0)
        {
            List<DropdownSelectListViewModel> data = null;
            HTWEntities en = new HTWEntities();
            int? forWeb = -1;
            int? userId = -1;
            int? IDTruong = -1;
            try
            {
                var user = CommonBase.CurrentUserInfo;
                userId = user.ID;
            }
            catch (Exception)
            {
            }

            try
            {
                switch (enumDropdown)
                {
                    #region Hệ thống

                    case EnumDropDownList.NhomNguoiDung:
                        //Lấy các nhóm do mình tạo ra
                        data = en.ACL_NhomNguoiDung.Where(m => m.IsDelete != true && m.IsNhom == true && m.IDThamChieu == CommonBase.CurrentUserInfo.ID)
                                           .ToList().OrderBy(m => m.Ten)
                                           .Select(m => new DropdownSelectListViewModel { Value = m.ID.ToString(), Text = m.Ten })
                                           .ToList();
                        break;

                    //case EnumDropDownList.NhomCauHinhCha_TuGiaoDien:
                    //    using (var _ContextRoot = new HTWEntities(connectionString))
                    //    {
                    //        data = _ContextRoot.SYS_NhomCauHinh.Where(m => m.IsDelete != true && m.IDGiaoDien == (int?)value && m.IDThamChieu == null)
                    //                       .ToList().OrderByDescending(m => m.SoThuTu)
                    //                       .Select(m => new DropdownSelectListViewModel { Value = m.ID.ToString(), Text = m.TenNhom })
                    //                       .ToList();
                    //    }
                    //    break;

                    #endregion
                    default:
                        break;
                }

            }
            catch (Exception)
            {
            }

            return data;
        }
    }
    public class DropdownSelectListViewModel
    {
        public bool Selected { get; set; }
        public string Value { get; set; }
        public string Text { get; set; }
        public string TextGroup { get; set; }
    }
    
}

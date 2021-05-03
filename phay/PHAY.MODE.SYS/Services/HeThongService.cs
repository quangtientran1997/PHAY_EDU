using PHAY.LIB.Base;
using PHAY.LIB.Common;
using PHAY.MOD.SYS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PHAY.MOD.SYS.Services
{
    public class HeThongService : BaseService
    {
        #region Menu quyền

        public List<MenuQuyenViewModel> GetMenuQuyenManHinh()
        {
            var user = CommonBase.CurrentUserInfo;

            //Bắt buộc phải có quyền xem
            var menuQuyen = CommonBase.GetACLCache(user.ID)
                                      .Where(m => m.LoaiQuyen == (int)LoaiAction.Xem)
                                      .Select(m => new MenuQuyenViewModel
                                      {
                                          TenNhomManHinh = m.TenNhom,
                                          TenManHinh = m.TenManHinh,
                                          TenController = m.TenController,
                                          TenAction = m.TenAction,
                                          Area = m.Area,
                                          IDNhom = m.IDNhom,
                                          IDManHinh = m.ID,
                                          SoThuTu = m.SoThuTu,
                                          CssNhom = m.CssNhom,
                                          CssManHinh = m.CssManHinh,
                                          GroupManHinh = m.GroupManHinh,
                                          GroupSubManHinh = m.GroupSubManHinh,
                                          CssBadgeManHinh = m.CssBadgeManHinh,
                                          CssBadgeNhom = m.CssBadgeNhom
                                      }).Distinct().ToList();


            return menuQuyen;

        }


        #endregion
    }
}
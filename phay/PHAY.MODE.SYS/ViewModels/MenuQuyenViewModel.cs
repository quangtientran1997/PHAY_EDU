using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PHAY.MOD.SYS.ViewModels
{
    public class MenuQuyenViewModel
    {
        public int IDNhom { get; set; }
        public int IDManHinh { get; set; }
        public string TenNhomManHinh { get; set; }
        public string TenManHinh { get; set; }
        public string TenAction { get; set; }
        public string TenController { get; set; }
        public string Area { get; set; }
        public int? SoThuTu { get; set; }
        public string CssNhom { get; set; }
        public string CssManHinh { get; set; }
        public string CssBadgeNhom { get; set; }
        public string CssBadgeManHinh { get; set; }
        public string GroupManHinh { get; set; }
        public string GroupSubManHinh { get; set; }
    }
}
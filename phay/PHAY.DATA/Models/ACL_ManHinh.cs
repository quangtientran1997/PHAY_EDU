//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PHAY.DATA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ACL_ManHinh
    {
        public int ID { get; set; }
        public Nullable<int> IDThamChieu { get; set; }
        public string TenManHinh { get; set; }
        public string TenAction { get; set; }
        public string TenController { get; set; }
        public string Area { get; set; }
        public string GhiChu { get; set; }
        public Nullable<int> SoThuTu { get; set; }
        public string CssClass { get; set; }
        public string GroupManHinh { get; set; }
        public Nullable<bool> IsSuDung { get; set; }
        public Nullable<int> IDNguoiTao { get; set; }
        public Nullable<System.DateTime> NgayTao { get; set; }
        public Nullable<int> IDNguoiCapNhat { get; set; }
        public Nullable<System.DateTime> NgayCapNhat { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public Nullable<int> IDNguoiDelete { get; set; }
        public Nullable<System.DateTime> NgayDelete { get; set; }
        public string CssBadge { get; set; }
    }
}
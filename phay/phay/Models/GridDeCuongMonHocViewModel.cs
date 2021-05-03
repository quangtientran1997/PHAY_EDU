using PHAY.DATA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace phay.Models
{
    public class GridDeCuongMonHocViewModel : EntityModelBase
    {
        public Nullable<int> IDKhoa { get; set; }
        public string TenKhoa { get; set; }
        public Nullable<int> IDMonHoc { get; set; }
        public string TenMonHoc { get; set; }

        public string TenTaiLieu { get; set; }
        public Nullable<bool> IsDuyet { get; set; }
        public Nullable<System.DateTime> NgayTao { get; set; }
        public Nullable<int> SoThuTu { get; set; }
    }
}
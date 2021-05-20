using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHAY.LIB.Common
{
    public class UserInformation
    {
        public int ID { get; set; }
        public string Guid { get; set; }
        public int? IDThamChieu { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public bool IsActive { get; set; }
        public int? IDMapDoiTuong { get; set; }
        public int? LoaiDoiTuong { get; set; }
    }
    public enum AuthorizeTypes
    {
        Everyone,
        MustHavePermission,
        AuthorizedUsers
    }
    public enum LoaiAction
    {
        [Description("Xem")]
        Xem = 1,

        [Description("Thêm")]
        Them = 2,

        [Description("Sửa")]
        Sua = 3,

        [Description("Xóa")]
        Xoa = 4,

        [Description("Tùy chọn")]
        TuyChon = 5,
    }
    public enum LoginStates
    {
        Success = 0,
        WrongInfo = 1,
        Disabled = 2,
        NotHadPermissions = 3
    }

    public enum Enum_TrangThaiKichHoat
    {
        [Description("Chưa kích hoạt")]
        ChuaKichHoat = 0,

        [Description("Đã kích hoạt")]
        DaKichHoat = 1
    }

}

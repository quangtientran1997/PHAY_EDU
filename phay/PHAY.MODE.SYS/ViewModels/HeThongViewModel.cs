using PHAY.DATA.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PHAY.MOD.SYS.ViewModels
{
    #region Nhóm người dùng
    public class GridNhomNguoiDungViewModel : EntityModelBase
    {
        public Nullable<int> IDThamChieu { get; set; }
        public string Ten { get; set; }
        public int CountUser { get; set; }
        public int ForWeb { get; set; }
    }

    [MetadataType(typeof(AddUpdateNhomNguoiDungMetadata))]
    public class AddUpdateNhomNguoiDungViewModel : ACL_NhomNguoiDung
    {

    }

    public class AddUpdateNhomNguoiDungMetadata
    {
        [Required(ErrorMessage = "Nhập tên nhóm")]
        [DisplayName("Tên nhóm")]
        public string Ten { get; set; }
    }
    #endregion

    #region Người dùng

    public class ParamGetNguoiDung
    {
        public string TK_TenDangNhap { get; set; }
        public string TK_HoTen { get; set; }
        public Nullable<int> TK_IDTrangThaiKichHoat { get; set; }
        public Nullable<int> TK_IDNhomNguoiDung { get; set; }

    }

    public class GridNguoiDungViewModel : EntityModelBase
    {
        public Nullable<int> IDThamChieu { get; set; }
        public string TenDangNhap { get; set; }
        public string HoDem { get; set; }
        public string Ten { get; set; }
        public string DiaChi { get; set; }
        public string Email { get; set; }
        public string SoDienThoai { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string TenNhom { get; set; }
    }

    [MetadataType(typeof(AddUpdateNguoiDungMetadata))]
    public class AddUpdateNguoiDungViewModel : ACL_NhomNguoiDung
    {
        public int[] FileHinhDaiDien { get; set; }
    }

    public class AddUpdateNguoiDungMetadata
    {
        [Required(ErrorMessage = "Chọn nhóm")]
        [DisplayName("Nhóm người dùng")]
        public Nullable<int> IDThamChieu { get; set; }

        [Required(ErrorMessage = "Nhập họ và tên")]
        [DisplayName("Họ và tên")]
        public string Ten { get; set; }
    }

    public class DoiThongTinDangNhapViewModel
    {
        [Required(ErrorMessage = "Chọn người dùng")]
        [DisplayName("Người dùng")]
        public int IDNguoiDung { get; set; }

        [Required(ErrorMessage = "Nhập tên đăng nhập")]
        [DisplayName("Tên đăng nhập")]
        public string TenDangNhap { get; set; }


        [Required(ErrorMessage = "Nhập mật khẩu")]
        [DisplayName("Mật khẩu")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Nhập lại mật khẩu")]
        [DisplayName("Nhập lại mật khẩu")]
        public string RePassword { get; set; }
    }

    #endregion
}
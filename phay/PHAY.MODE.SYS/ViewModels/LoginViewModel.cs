using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PHAY.MOD.SYS.ViewModels
{
    public class LoginViewModel
    {
        [StringLength(50)]
        [Required(ErrorMessage = "Nhập tên đăng nhập")]
        [DisplayName("Tên đăng nhập")]
        public string UserName { get; set; }

        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Nhập mật khẩu")]
        [DisplayName("Mật khẩu")]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
        public bool IsGiangVien { get; set; }
        public bool IsCoSoGDNN { get; set; }
        public string ReturnUrl { get; set; }

        public string Loc { get; set; }
        public string LocIP { get; set; }
        public string LocCity { get; set; }
        public string LocRegion { get; set; }
        public string LocCountry { get; set; }
        public string LocTimezone { get; set; }

        public string rQuery { get; set; }
        //[ValidateCaptcha(ErrorMessage = "Mã bảo vệ không hợp lệ")]
        //public string Captcha { get; set; }
    }
}
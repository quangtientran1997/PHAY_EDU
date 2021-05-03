using PHAY.LIB.Base;
using PHAY.LIB.Common;
using PHAY.MOD.SYS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PHAY.MOD.SYS.Services
{
    public class ASecurityService : BaseService
    {
        internal LoginStates CheckLogin(LoginViewModel model, ModelStateDictionary modelState, ref UserInformation userInfo)
        {
            LoginStates loginState = LoginStates.WrongInfo;
            string password = model.Password;
            string userName = model.UserName;
            string passwordHash = CommonBase.MD5(password);

            UserInformation user = null;

            user = (from us in Context.ACL_NhomNguoiDung.Where(x => x.TenDangNhap.Equals(userName, StringComparison.Ordinal)
                                                                 && x.MatKhau.Equals(passwordHash, StringComparison.Ordinal))
                    where us.IsDelete != true
                    select new UserInformation
                    {
                        ID = us.ID,
                        IDThamChieu = us.IDThamChieu,
                        IDMapDoiTuong = us.IDMapDoiTuong,
                        FullName = us.HoDem + " " + us.Ten,
                        UserName = us.TenDangNhap,
                        LoaiDoiTuong = us.LoaiDoiTuong,
                        IsActive = us.IsActive ?? false,


                    }
                 ).FirstOrDefault();


            if (user != null)
            {
                user.Guid = LIB.Security.EncryptionHelper.EncryptStr(user.ID.ToString());

                if (!user.IsActive)
                {
                    loginState = LoginStates.Disabled;
                }
                else
                {
                    loginState = LoginStates.Success;
                }
                userInfo = user;

            }
            else
            {
                loginState = LoginStates.WrongInfo;
            }

            return loginState;
        }

    }
}
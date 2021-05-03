using PHAY.LIB.Base;
using PHAY.LIB.Caching;
using PHAY.LIB.Common;
using PHAY.LIB.Extensions;
using PHAY.LIB.Security;
using PHAY.MOD.SYS.Services;
using PHAY.MOD.SYS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace PHAY.MOD.SYS.Controllers
{
    public class ASecurityController : ControllerBase<ASecurityService>
    {
        #region Login
        [AllowAnonymous]
        public ActionResult Login()
        {
            string loginURL = System.Configuration.ConfigurationManager.AppSettings["LoginURL"];
            if (!string.IsNullOrEmpty(loginURL))
            {
                return Redirect(loginURL);
            }

            string viewNameLogin = "Login";
            

            var model = new LoginViewModel();

            return View(viewNameLogin, model);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> Login(LoginViewModel model)
        {
            string viewNameLogin = "Login";

            if (CommonBase.CurrentUserInfo != null && CommonBase.CurrentUserInfo.ID > 0)
            {
                return RedirectToAction("Index", "HeThong");
            }
            if (ModelState.IsValid)
            {
                //try
                //{
                //    model.Password = CMSCrypto.DecryptPassword(model.UserName, model.Password);
                //}
                //catch (Exception ex)
                //{
                //    return View(viewNameLogin, model).Warning("Thông tin đăng nhập không đúng");
                //}

                //Nếu tài khoản master => url?r=asc
                //Tránh trường hợp khách hàng đổi mật khẩu DB để đăng nhập vào master
                if (model.UserName.ToLower() == "master")
                {
                    if (string.IsNullOrEmpty(model.rQuery) || model.rQuery != "phay")
                    {
                        return View(viewNameLogin, model).Warning("Thông tin đăng nhập không đúng");
                    }
                }

                var userInfo = new UserInformation();
                LoginStates loginState = LoginStates.WrongInfo;

                // Nếu kiểm tra code này trước thì trường hợp đăng nhập bằng alias không được do đang kiểm theo mã nhân sự
                var nguoiDung = Business.Context.ACL_NhomNguoiDung
                                        .Where(m => m.TenDangNhap == model.UserName
                                                    && m.IsDelete != true)
                                        .FirstOrDefault();
                if (nguoiDung != null)
                {
                    if (nguoiDung.IsActive.GetValueOrDefault(false) != true)
                    {
                        //Tài khoản bị vô hiệu hóa, chưa kích hoạt
                        loginState = LoginStates.Disabled;
                    }
                    else
                    {
                        loginState = Business.CheckLogin(model, ModelState, ref userInfo);
                    }
                }

                if (loginState == LoginStates.Success)
                {
                    FormsAuthentication.SetAuthCookie(model.UserName, model.RememberMe);

                    Session.Add(CommonBase.SES_USER_INFO, userInfo);

                    //Kiểm tra và lưu thông báo SLDTBXH



                    var cacheManager = new DevTrends.MvcDonutCaching.OutputCacheManager();
                    cacheManager.RemoveItems();
                    CMSCache.Clear();

                    return RedirectToAction("Index", "HeThong");
                }
                else if (loginState == LoginStates.WrongInfo)
                {
                    return View(viewNameLogin, model).Warning("Sai tên đăng nhập hoặc mật khẩu!");
                }
                else if (loginState == LoginStates.Disabled)
                {
                    return View(viewNameLogin, model).Warning("Tài khoản này đã bị vô hiệu!");
                }

            }

            return View(viewNameLogin, model).Warning("Vui lòng nhập đầy đủ thông tin");
        }
        #endregion
    }
}
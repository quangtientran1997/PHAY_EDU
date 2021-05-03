using PHAY.LIB.Common;
using PHAY.LIB.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace PHAY.LIB.Security
{
    public class CMSAuthorizeAttribute : AuthorizeAttribute, IAuthorizationFilter
    {
        #region Properties

        public AuthorizeTypes AuthorizeType { get; set; }


        public string CustomAuthorizeMethod { get; set; }
        public AuthorizeTypes AuthorizeTypes { get; set; }
        public bool ReturnJson { get; set; }
        public string ActionName { get; set; }


        #endregion

        public CMSAuthorizeAttribute()
        {
        }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {

            bool skipAuthorization = filterContext.ActionDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true)
               || filterContext.ActionDescriptor.ControllerDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true);

            // Bỏ qua phân quyền
            if (skipAuthorization)//|| (CommonBase.CurrentUserInfo != null && CommonBase.CurrentUserInfo.IsAdmin)
            {
                return;
            }

            // Global filter
            bool hasAttribute = filterContext.ActionDescriptor.IsDefined(typeof(CMSAuthorizeAttribute), true)
                || filterContext.ActionDescriptor.ControllerDescriptor.IsDefined(typeof(CMSAuthorizeAttribute), true);

            // Thuộc tính đã được khai báo trên controller hoặc action
            if (hasAttribute)
            {
                // Cho tất cả mọi người
                if (AuthorizeType == AuthorizeTypes.Everyone
                    || filterContext.ActionDescriptor.GetCustomAttributes(typeof(CMSAuthorizeAttribute), true).Any(x => ((CMSAuthorizeAttribute)x).AuthorizeType == AuthorizeTypes.Everyone)
                    )
                {
                    return;
                }

                // Chỉ cần đăng nhập là được
                if (AuthorizeType == AuthorizeTypes.AuthorizedUsers
                    || filterContext.ActionDescriptor.GetCustomAttributes(typeof(CMSAuthorizeAttribute), true).Any(x => ((CMSAuthorizeAttribute)x).AuthorizeType == AuthorizeTypes.AuthorizedUsers)
                    )
                {
                    // Đã đăng nhập
                    if (filterContext.RequestContext.HttpContext.Request.IsAuthenticated)
                    {
                        return;
                    }
                    else
                    {
                        filterContext.Result = new RedirectResult("~/ASecurity/Logout").Warning("Vui lòng đăng nhập lại hệ thống");

                        //HandleUnauthorizedRequest(filterContext);
                        return;
                    }
                }
            }

            #region Phải được phân quyền: AuthorizeTypes == AuthorizeTypes.MustHavePermission (mặc định)

            // Đã đăng nhập
            if (filterContext.RequestContext.HttpContext.Request.IsAuthenticated)
            {
                //Check kiem tra quyen
                try
                {
                    if (CommonBase.CurrentUserInfo != null)
                    {
                        string verb = filterContext.HttpContext.Request.HttpMethod;

                        string ac = filterContext.ActionDescriptor.GetCustomAttributes(typeof(CMSAuthorizeAttribute), true).Select(x => ((CMSAuthorizeAttribute)x).ActionName).FirstOrDefault();

                        string actionName = !string.IsNullOrEmpty(ac) ? ac : filterContext.ActionDescriptor.ActionName;
                        string controllerName = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;
                        string controllerFullName = filterContext.ActionDescriptor.ControllerDescriptor.ControllerType.FullName;

                        bool hasAuthorized = CommonBase.HasAuthorized(controllerFullName, actionName) ?? false;
                        if (hasAuthorized)
                        {
                            return;
                        }
                        else
                        {
                            if (filterContext.ActionDescriptor.GetCustomAttributes(typeof(CMSAuthorizeAttribute), true).Any(x => ((CMSAuthorizeAttribute)x).ReturnJson == true))
                            {
                                filterContext.Result = new JsonResult()
                                {
                                    JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                                    Data = new
                                    {
                                        Errors = new
                                        {
                                            Warning = new { errors = new string[] { "Bạn không có quyền chức năng này" } }
                                        }
                                    }
                                };
                            }
                            else
                            {
                                filterContext.Result = new RedirectResult("~/HeThong/Auth").Warning("Bạn không có quyền chức năng này");
                            }

                            return;
                        }
                    }
                    else
                    {
                        filterContext.Result = new RedirectResult("~/ASecurity/Logout").Warning("Vui lòng đăng nhập lại hệ thống");
                        return;
                    }

                }
                catch (Exception)
                {
                    filterContext.Result = new RedirectResult("~/ASecurity/Logout").Warning("Vui lòng đăng nhập lại hệ thống");

                    return;
                }
            }
            else
            {
                HandleUnauthorizedRequest(filterContext);
                return;
            }


            base.OnAuthorization(filterContext);

            #endregion
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            string controllerName = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;
            base.HandleUnauthorizedRequest(filterContext);

            //filterContext.Result = new RedirectResult("~/ASecurity/");
        }
    }
}

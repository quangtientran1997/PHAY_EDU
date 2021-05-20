using NLog;
using PHAY.DATA.Models;
using PHAY.LIB.Caching;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace PHAY.LIB.Common
{
    public static class CommonBase
    {
        #region Props

        private static Logger logger = LogManager.GetLogger("ASCLogger");

        #endregion
        public static System.Resources.ResourceManager KendoUIResourceManager { get; set; }
        public const string CKE_CULTURE = "Culture";
        #region Const
        public const string SES_USER_INFO = "UserInfo";
        public const string F_LayoutAdmin = "~/Views/Shared/Admin/_LayoutInTabs.cshtml";
        #endregion
        public static string CurrentCultureName
        {
            get
            {
                if (!System.Web.HttpContext.Current.Request.Cookies.AllKeys.Contains(CKE_CULTURE))
                {
                    return DefaultCultureName;
                }

                return System.Web.HttpContext.Current.Request.Cookies[CKE_CULTURE].Value;
            }
            set
            {
                // Chưa có session thì lấy thông tin từ csdl và tạo mới
                if (!System.Web.HttpContext.Current.Request.Cookies.AllKeys.Contains(CKE_CULTURE))
                {
                    var cookie = new System.Web.HttpCookie(CKE_CULTURE, value);

                    System.Web.HttpContext.Current.Response.Cookies.Add(cookie);
                }
                else
                {
                    System.Web.HttpContext.Current.Response.Cookies[CKE_CULTURE].Value = value;
                }
            }
        }

        public static string GetCultureName()
        {
            string culture = "vi-VN";

            try
            {
                culture = ((System.Web.Configuration.GlobalizationSection)(System.Configuration.ConfigurationManager.GetSection("system.web/globalization"))).UICulture;
            }
            catch
            {

            }

            return culture;
        }

        public static string DefaultCultureName
        {
            get;
            set;
        }
        public static string GetEnumDesciption(this Enum val)
        {
            string name = Enum.GetName(val.GetType(), val);
            System.Reflection.FieldInfo obj = val.GetType().GetField(name);
            if (obj != null)
            {
                object[] attributes = obj.GetCustomAttributes(typeof(System.ComponentModel.DescriptionAttribute), false);
                return attributes.Length > 0 ? ((System.ComponentModel.DescriptionAttribute)attributes[0]).Description : null;
            }
            return null;
        }

        public static UserInformation CurrentUserInfo
        {
            get
            {
                UserInformation info = null;
                if (System.Web.HttpContext.Current.Session != null)
                {
                    if (System.Web.HttpContext.Current.Session[SES_USER_INFO] == null)
                    {
                        RenewCurrentUserInfoSession();
                    }

                    if (System.Web.HttpContext.Current.Session[SES_USER_INFO] != null)
                    {
                        info = (UserInformation)System.Web.HttpContext.Current.Session[SES_USER_INFO];
                    }
                }
                return info;
            }
        }

        public static void RenewCurrentUserInfoSession()
        {
            try
            {
                var formsIdentity = (FormsIdentity)HttpContext.Current.User.Identity;
                if (formsIdentity.Ticket != null)
                {
                    var useName = formsIdentity.Ticket.Name;
                    if (!string.IsNullOrEmpty(useName))
                    {
                        HTWEntities en = new HTWEntities();

                        UserInformation info;

                        info = (from us in en.ACL_NhomNguoiDung.Where(x => x.TenDangNhap == useName)
                                where us.IsActive == true && us.IsDelete != true
                                select new UserInformation
                                {
                                    ID = us.ID,
                                    IDThamChieu = us.IDThamChieu,
                                    IDMapDoiTuong = us.IDMapDoiTuong,
                                    LoaiDoiTuong = us.LoaiDoiTuong,
                                    FullName = us.HoDem + " " + us.Ten,
                                    UserName = us.TenDangNhap,
                                    IsActive = us.IsActive ?? false,
                                }
                                ).FirstOrDefault();

                        if (info != null)
                        {
                            info.Guid = PHAY.LIB.Security.EncryptionHelper.EncryptStr(info.ID.ToString());

                        }

                        if (System.Web.HttpContext.Current.Session[SES_USER_INFO] == null)
                        {
                            System.Web.HttpContext.Current.Session.Add(SES_USER_INFO, info);
                        }
                        else
                        {
                            System.Web.HttpContext.Current.Session[SES_USER_INFO] = info;
                        }

                    }
                }
            }
            catch (Exception)
            {
            }
        }

        public static bool? HasAuthorized(string tenController, string tenAction)
        {
            if (string.IsNullOrEmpty(tenController))
            {
                tenController = HttpContext.Current.Request.RequestContext.RouteData.Values["controller"].ToString();
            }
            try
            {
                var user = CurrentUserInfo;
                if (user != null)
                {
                    //var dataCache = GetACLCache(user.ID);
                    //if (dataCache != null)
                    //{
                    //    return dataCache.Any(m => (m.ActionTenController == tenController || m.TenController == tenController) && m.ActionTenAction == tenAction);
                    //}
                }
                return false;
            }
            catch (Exception)
            {
                return null;
            }
        }

        #region Log

        public static void WriteLog(string sms)
        {
            string log = string.Empty;
            try
            {
                log = $"{GetController()}_{GetAction()}_{sms}";
            }
            catch (Exception ex)
            {
                log = sms;
            }
            logger.Log(LogLevel.Info, log);
        }

        #endregion

        public static string GetController()
        {
            var routeValues = HttpContext.Current.Request.RequestContext.RouteData.Values;

            if (routeValues.ContainsKey("controller"))
                return (string)routeValues["controller"];

            return string.Empty;
        }

        public static string GetAction()
        {
            var routeValues = HttpContext.Current.Request.RequestContext.RouteData.Values;

            if (routeValues.ContainsKey("action"))
                return (string)routeValues["action"];

            return string.Empty;
        }

        public static List<SP_ACL_QuyenNhom_Result> GetACLCache(int pUserID)
        {
            List<SP_ACL_QuyenNhom_Result> data = null;

            string domain = GetDomain();

            var keyCache = string.Format("GetACLCache_{0}_{1}", domain, pUserID);

            if (!CMSCache.IsExisted(keyCache))
            {
                HTWEntities Context = new HTWEntities();

                Context.Configuration.AutoDetectChangesEnabled = false;
                Context.Configuration.LazyLoadingEnabled = true;

                var result = Context.SP_ACL_QuyenNhom(null, pUserID).ToList();

                if (result != null && result.Count() > 0)
                {
                    CMSCache.Add(keyCache, result.ToList());
                }
            }
            data = (List<SP_ACL_QuyenNhom_Result>)CMSCache.Get(keyCache);

            return data;

        }

        public static string GetDomain()
        {
            string domainDev = System.Configuration.ConfigurationManager.AppSettings["DomainDev"];
            if (!string.IsNullOrEmpty(domainDev))
            {
                return domainDev;
            }

            string usePort = System.Configuration.ConfigurationManager.AppSettings["UsePort"];
            if (usePort == "1")
            {
                return HttpContext.Current.Request.Url.Authority;
            }
            else
            {
                string domain = HttpContext.Current.Request.Url.Host;
                domain = domain.Replace("http://", "").Replace("www.", "");
                return domain;
            }

        }

        #region MD5
        public static string MD5(string value)
        {
            System.Security.Cryptography.MD5 md5Hasher = System.Security.Cryptography.MD5.Create();
            byte[] data = md5Hasher.ComputeHash(Encoding.Default.GetBytes(value));

            StringBuilder sBuilder = new StringBuilder();

            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("X2"));
            }
            return sBuilder.ToString().ToLower();
        }

        public static string MD5(byte[] input)
        {
            System.Security.Cryptography.MD5 md5Hasher = System.Security.Cryptography.MD5.Create();
            byte[] data = md5Hasher.ComputeHash(input);

            StringBuilder sBuilder = new StringBuilder();

            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("X2"));
            }
            return sBuilder.ToString().ToLower();
        }

        public static string MD5(Stream input)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                if (input != null)
                {
                    input.CopyTo(stream);
                    return MD5(stream.ToArray());
                }
            }

            return string.Empty;
        }

        public static string GetUnique(int size)
        {
            char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();

            byte[] data = new byte[1];

            System.Security.Cryptography.RNGCryptoServiceProvider crypto = new System.Security.Cryptography.RNGCryptoServiceProvider();

            crypto.GetNonZeroBytes(data);

            data = new byte[size];

            crypto.GetNonZeroBytes(data);

            StringBuilder result = new StringBuilder(size);

            foreach (byte b in data)
            {
                result.Append(chars[b % (chars.Length - 1)]);
            }
            return result.ToString();
        }


        #endregion

        public static string GetUrl(string actionName, string controllerName, object routeValues)
        {
            // Không có action
            if (string.IsNullOrEmpty(actionName))
            {
                return null;
            }

            UrlHelper url = new UrlHelper(System.Web.HttpContext.Current.Request.RequestContext);

            // Là RouteValueDictionary
            if (routeValues is System.Web.Routing.RouteValueDictionary)
            {
                return url.Action(actionName, controllerName, routeValues as System.Web.Routing.RouteValueDictionary);
            }

            return url.Action(actionName, controllerName, routeValues);
        }

    }
}

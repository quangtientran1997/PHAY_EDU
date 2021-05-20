using PHAY.LIB.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PHAY.MOD.SYS.Controllers
{
    public class CommonController : Controller
    {
        public static string RequestValidate { get; set; }

        [AllowAnonymous]
        public ActionResult GetPrivateKey(string salt = null)
        {
            salt = string.IsNullOrEmpty(salt) ? string.Empty : salt;
            return Content(CMSCrypto.GenPrivateKey(salt));
        }

        [AllowAnonymous]
        public ActionResult NoRouter()
        {
            return View();
        }
    }
}
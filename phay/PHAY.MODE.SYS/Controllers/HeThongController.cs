using PHAY.LIB.Base;
using PHAY.LIB.Common;
using PHAY.LIB.Security;
using PHAY.MOD.SYS.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PHAY.MOD.SYS.Controllers
{
    public class HeThongController : ControllerBase<HeThongService>
    {
        #region Get menu quyền

        //[CMSAuthorizeAttribute(AuthorizeType = AuthorizeTypes.AuthorizedUsers)]
        public ActionResult MenuQuyenForManHinh(string viewNameMenu = "MenuQuyenForManHinh")
        {
            var model = Business.GetMenuQuyenManHinh();

            return View(viewNameMenu,model);
        }

        #endregion

        [CMSAuthorizeAttribute(AuthorizeType = AuthorizeTypes.AuthorizedUsers)]

        public ActionResult Index()
        {
            //CheckQuyen();
            //ViewBag.ThongKeTrongThang = Business.GetThongKeTruyCap(true);
            //ViewBag.ThongKeTrongNam = Business.GetThongKeTruyCap(false);

            return View();
        }

        [CMSAuthorizeAttribute(AuthorizeType = AuthorizeTypes.AuthorizedUsers)]
        //[KhaoSatSuKienFilterAttribute]
        public ActionResult Dashboard()
        {
            return View();
        }
    }
}
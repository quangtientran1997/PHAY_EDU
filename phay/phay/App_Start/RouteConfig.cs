using PHAY.LIB.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace phay
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            #region Method
            routes.CMSMapRoute(
                 "login",
                 "login.html",
                 new { controller = "ASecurity", action = "Login", area = "", id = UrlParameter.Optional },
                 null,
                 new[] { "PHAY.MOD.SYS.Controllers" }
             );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
            #endregion
        }
    }
}

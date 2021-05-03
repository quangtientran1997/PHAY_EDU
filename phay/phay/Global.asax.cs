using phay.App_Start;
using PHAY.LIB.Common;
using PHAY.LIB.Module;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace phay
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            //FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            Bootstraper.Start();
            AppStarter.SetupCMS(BundleTable.Bundles, RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            try
            {
                CommonBase.DefaultCultureName = CommonBase.GetCultureName();
                CommonBase.KendoUIResourceManager = PHAY.DATA.Resources.ResourceKendoUI.ResourceManager;

            }
            catch (Exception)
            {
            }
        }
    }
}

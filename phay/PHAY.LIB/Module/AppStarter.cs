using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Optimization;
using System.Web.Routing;

namespace PHAY.LIB.Module
{
    public class AppStarter : ModuleAppBase
    {
        private static AppStarter SetupApplication(object bundles, object routes)
        {
            AppStarter app = new AppStarter(bundles, routes);
            return app;
        }

        public static new AppStarter Instance
        {
            get { return ModuleAppBase.Instance as AppStarter; }
            set { ModuleAppBase.Instance = value; }
        }

        public static void SetupCMS(BundleCollection bundles, RouteCollection routes)
        {
            SetupApplication(bundles, routes);
        }

        protected override void AddAdditionalRazorViewLocationsCore(List<string> listRazorView)
        {

        }

        protected AppStarter(object bundles, object routes)
            : base(bundles, routes)
        {

        }
    }
}

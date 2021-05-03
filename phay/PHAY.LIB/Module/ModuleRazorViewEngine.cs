using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace PHAY.LIB.Module
{
    public class ModuleRazorViewEngine : System.Web.Mvc.RazorViewEngine
    {
        public delegate bool VirtualPathHandler(ref string virtualPath);
        protected List<VirtualPathHandler> m_handlers = new List<VirtualPathHandler>();

        public ModuleRazorViewEngine(bool findModules)
        {
            if (findModules)
                setupViewLocations(ModuleAppBase.Instance.RazorViewLocations);
        }
        //hbdsandjknajsn
        public ModuleRazorViewEngine(List<string> viewLocations, bool findModules)
            : base()
        {
            setupViewLocations(viewLocations);
            if (findModules)
                setupViewLocations(ModuleAppBase.Instance.RazorViewLocations);
        }

        public void setupViewLocations(List<string> viewLocations)
        {
            string[] tempArray = new string[ViewLocationFormats.Length + viewLocations.Count];
            ViewLocationFormats.CopyTo(tempArray, 0);

            for (int i = 0; i < viewLocations.Count; i++)
            {
                tempArray[ViewLocationFormats.Length + i] = viewLocations[i];
            }

            ViewLocationFormats = tempArray;
            PartialViewLocationFormats = ViewLocationFormats;
        }

        public void registerVirtualPathHandler(VirtualPathHandler handler)
        {
            m_handlers.Add(handler);
        }

        private bool IsAppResourcePath(string virtualPath)
        {
            string vpath = calculateVirtualPath(virtualPath);
            String checkPath = VirtualPathUtility.ToAppRelative(vpath);
            return checkPath.StartsWith("~/ASC.MOD/", StringComparison.InvariantCultureIgnoreCase);
        }

        protected override bool FileExists(ControllerContext controllerContext, string virtualPath)
        {
            string vpath = calculateVirtualPath(virtualPath);
            if (IsAppResourcePath(vpath))
            {
                return System.Web.Hosting.HostingEnvironment.VirtualPathProvider.FileExists(vpath);
            }
            else
                return base.FileExists(controllerContext, vpath);
        }

        protected virtual string calculateVirtualPath(string virtualPath)
        {
            string calcPath = virtualPath;

            foreach (VirtualPathHandler handler in m_handlers)
            {
                if (handler(ref calcPath))
                    break;
            }

            return calcPath;
        }

    }
}

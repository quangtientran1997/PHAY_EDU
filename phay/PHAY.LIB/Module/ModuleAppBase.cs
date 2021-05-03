using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.ComponentModel.Composition.Hosting;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Optimization;
using System.Web.Routing;

namespace PHAY.LIB.Module
{
    public class ModuleAppBase : ModuleApplication
    {
        public enum ResourceTypes { HeaderResource, FooterResource, ThemeWebResource, ThemeAdminResource, ActionFilter, Route, Widget };
        protected static string ModuleAssemblyNameFormat = "ASC.MOD*.dll";
        public static ModuleAppBase Instance
        {
            get { return HttpContext.Current.Application["moduleApp"] as ModuleAppBase; }
            protected set { HttpContext.Current.Application["moduleApp"] = value; }
        }

        [ImportMany]
        protected IEnumerable<Lazy<IPHAYModule, IPHAYModuleData>> m_modules = null;
        protected CompositionContainer m_modulesContainer;
        protected BundleCollection m_bundles = null;
        protected RouteCollection m_routes = null;
        protected ModuleRazorViewEngine m_razonEngine = null;

        public virtual IPHAYModule GetModule(string id)
        {
            foreach (Lazy<IPHAYModule, IPHAYModuleData> module in m_modules)
            {
                if (string.Compare(module.Metadata.Id, id, true) == 0)
                    return module.Value;
            }
            return null;
        }

        public class ModuleRoute
        {
            public IPHAYModule Module { get; set; }
            public Route Route { get; set; }
        }

        protected List<ModuleRoute> m_registeredRoutes = new List<ModuleRoute>();

        public void RegisterRoute(Route route, IPHAYModule module)
        {
            m_registeredRoutes.Add(new ModuleRoute() { Module = module, Route = route });
        }

        public Route RegisterRoute(IPHAYModule module, string name, string url, object defaults, object constraints, string[] namespaces)
        {
            Route r = m_routes.MapRoute(name, url, defaults, constraints, namespaces);
            m_routes.Remove(r);
            m_registeredRoutes.Add(new ModuleRoute() { Module = module, Route = r });
            return r;
        }

        public ModuleRazorViewEngine RazorEngine { get { return m_razonEngine; } }

        protected virtual void RenderWidget(HtmlHelper html, object model, object widgetOptions)
        {
            //if (HTWResource(ResourceTypes.Widget, module))
            //{
            //    //PreRenderWidget(html, module, widget);
            //    html.RenderAction(widget.Action, widget.Controller, new RouteValueDictionary(new { area = widget.Area, m = model, widgetOptions }));
            //    //PostRenderWidget(html, module, widget);
            //}

            html.RenderAction("AllWibget", "WebWibget", new RouteValueDictionary(new { area = "", m = model, widgetOptions }));

            html.RenderAction("AllWibget", "WebWibget", new RouteValueDictionary(new { area = "", w_viewName = "AllWibget_2", m = model, widgetOptions }));
        }
        public void RenderWidget(HtmlHelper html, string widgetId, object model = null, object widgetOptions = null)
        {
            //foreach (Lazy<IASCModule, IASCModuleData> module in m_modules)
            //{
            //    string name = module.Metadata.Name;
            //    foreach (Widget widg in module.Value.Widgets)
            //        if (string.Compare(widg.Id, widgetId, true) == 0)
            //        {
            //            RenderWidget(html, module.Value, widg, model, widgetOptions);
            //            return;
            //        }
            //}

            if (!string.IsNullOrEmpty(widgetId))
            {
                RenderWidget(html, model, widgetOptions);

            }
        }
        protected ModuleAppBase(object bundles, object routes)
        {
            Instance = this;

            m_bundles = bundles as BundleCollection;
            m_routes = routes as RouteCollection;

            HostingEnvironment.RegisterVirtualPathProvider(new AssemblyResource());
            RefreshModules();
            SetupViewEngines();
        }

        public IEnumerable<Lazy<IPHAYModule, IPHAYModuleData>> Modules
        {
            get
            {
                return m_modules;
            }
        }

        public virtual void SetupRoutes()
        {
            foreach (ModuleRoute r in m_registeredRoutes)
            {
                if (HTWResource(ResourceTypes.Route, r.Module))
                    m_routes.Add(r.Route);
            }
        }

        public BundleCollection Bundles { get { return m_bundles; } }

        protected CompositionContainer ModulesContainer { get { return m_modulesContainer; } }

        protected virtual AggregateCatalog AddMefCatalogs(AggregateCatalog catalog)
        {
            catalog.Catalogs.Add(new DirectoryCatalog(HttpContext.Current.Server.MapPath("~/bin"), ModuleAppBase.ModuleAssemblyNameFormat));

            return catalog;
        }

        protected virtual void SetupViewEngines()
        {
            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(m_razonEngine = new ModuleRazorViewEngine(true));
            //ViewEngines.Engines.Add(new CustomWebViewEngine());
        }

        protected virtual void RefreshModules()
        {
            try
            {
                m_modulesContainer = new CompositionContainer(AddMefCatalogs(new AggregateCatalog()));
                m_modulesContainer.ComposeParts(this);
            }
            catch (CompositionException compositionException)
            {
                Console.WriteLine(compositionException.ToString());
            }
            catch (ReflectionTypeLoadException ex)
            {
                StringBuilder sb = new StringBuilder();
                foreach (Exception exSub in ex.LoaderExceptions)
                {
                    sb.AppendLine(exSub.Message);
                    if (exSub is FileNotFoundException)
                    {
                        FileNotFoundException exFileNotFound = exSub as FileNotFoundException;
                        if (!string.IsNullOrEmpty(exFileNotFound.FusionLog))
                        {
                            sb.AppendLine("ASC Log:");
                            sb.AppendLine(exFileNotFound.FusionLog);
                        }
                    }
                    sb.AppendLine();
                }
                string errorMessage = sb.ToString();
                //Display or log the error based on your application.
            }
            foreach (Lazy<IPHAYModule, IPHAYModuleData> module in m_modules)
            {
                module.Value.SetupExtensions(this);
            }

        }

        protected void AddAdditionalRazorViewLocations(List<string> lst)
        {
            AddAdditionalRazorViewLocationsCore(lst);
        }

        protected virtual void AddAdditionalRazorViewLocationsCore(List<string> lst)
        {
        }

        public List<string> RazorViewLocations
        {
            get
            {
                List<string> views = new List<string>();
                foreach (Lazy<IPHAYModule, IPHAYModuleData> module in m_modules)
                {
                    views.AddRange(module.Value.RazorViewLocations);
                }
                AddAdditionalRazorViewLocations(views);

                return views;
            }
        }

        protected bool HTWResource(ResourceTypes type, IPHAYModule module)
        {
            return HTWResourceCore(type, module);
        }

        protected virtual bool HTWResourceCore(ResourceTypes type, IPHAYModule module)
        {
            return true;
        }
    }
}

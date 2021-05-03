using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Routing;

namespace PHAY.LIB.Extensions
{
    public static class RouteExtensions
    {
        #region MapRoute Not Area
        public static Route CMSMapRoute(this RouteCollection routes, string name, string url, object defaults)
        {
            return CMSMapRoute(routes, name, url, defaults, null, null);
        }

        public static Route CMSMapRoute(this RouteCollection routes, string name, string url, object defaults, string[] namespaces)
        {
            return CMSMapRoute(routes, name, url, defaults, null, namespaces);
        }

        public static Route CMSMapRoute(this RouteCollection routes, string name, string url, object defaults, string namespaces)
        {
            return CMSMapRoute(routes, name, url, defaults, null, new string[] { namespaces });
        }

        public static Route CMSMapRoute(this RouteCollection routes, string name, string url, object defaults, object constraints, string[] namespaces)
        {
            if (routes == null)
            {
                throw new ArgumentNullException("routes");
            }
            if (url == null)
            {
                throw new ArgumentNullException("url");
            }

            Route route = new Route(url, new MvcRouteHandler())
            {
                Defaults = new RouteValueDictionary(defaults),
                Constraints = new RouteValueDictionary(constraints),
                DataTokens = new RouteValueDictionary()
            };

            if ((namespaces != null) && (namespaces.Length > 0))
            {
                route.DataTokens["Namespaces"] = namespaces;

            }
            route.SetRouteName(name);
            routes.Add(name, route);

            return route;
        }
        #endregion

        #region MapRoute Area

        public static Route CMSMapRoute(this AreaRegistrationContext @this, string name, string url, object defaults)
        {
            return CMSMapRoute(@this, name, url, defaults, null, null);
        }

        public static Route CMSMapRoute(this AreaRegistrationContext @this, string name, string url, object defaults, string[] namespaces)
        {
            return CMSMapRoute(@this, name, url, defaults, null, namespaces);
        }

        public static Route CMSMapRoute(this AreaRegistrationContext @this, string name, string url, object defaults, string namespaces)
        {
            return CMSMapRoute(@this, name, url, defaults, null, new string[] { namespaces });
        }

        public static Route CMSMapRoute(this AreaRegistrationContext @this, string name, string url, object defaults, object constraints, string[] namespaces)
        {
            if (namespaces == null && @this.Namespaces != null)
            {
                namespaces = @this.Namespaces.ToArray();
            }

            var route = @this.Routes.CMSMapRoute(name, url, defaults, constraints, namespaces);
            route.DataTokens["area"] = @this.AreaName;
            route.SetRouteName(name);

            var useNamespaceFallback = (namespaces == null || namespaces.Length == 0);
            route.DataTokens["UseNamespaceFallback"] = useNamespaceFallback;

            return route;
        }
        #endregion

    }

    public class LowercaseRoute : Route
    {
        public LowercaseRoute(string url, IRouteHandler routeHandler)
            : base(url, routeHandler)
        {
        }

        public LowercaseRoute(string url, RouteValueDictionary defaults, IRouteHandler routeHandler)
            : base(url, defaults, routeHandler)
        {
        }

        public LowercaseRoute(string url, RouteValueDictionary defaults, RouteValueDictionary constraints, IRouteHandler routeHandler)
            : base(url, defaults, constraints, routeHandler)
        {
        }

        public LowercaseRoute(string url, RouteValueDictionary defaults, RouteValueDictionary constraints, RouteValueDictionary dataTokens, IRouteHandler routeHandler)
            : base(url, defaults, constraints, dataTokens, routeHandler)
        {
        }

        public override VirtualPathData GetVirtualPath(RequestContext requestContext, RouteValueDictionary values)
        {
            var path = base.GetVirtualPath(requestContext, values);

            if (path != null)
                path.VirtualPath = path.VirtualPath.ToLowerInvariant();

            return path;
        }
    }

    public static class GetRouteNameExtension
    {
        public static string GetRouteName(this Route route)
        {
            if (route == null)
            {
                return null;
            }
            return route.DataTokens.GetRouteName();
        }

        public static string GetRouteName(this RouteData routeData)
        {
            if (routeData == null)
            {
                return null;
            }
            return routeData.DataTokens.GetRouteName();
        }

        public static string GetRouteName(this RouteValueDictionary routeValues)
        {
            if (routeValues == null)
            {
                return null;
            }
            object routeName = null;
            routeValues.TryGetValue("__RouteName", out routeName);
            return routeName as string;
        }

        public static Route SetRouteName(this Route route, string routeName)
        {
            if (route == null)
            {
                throw new ArgumentNullException("route");
            }
            if (route.DataTokens == null)
            {
                route.DataTokens = new RouteValueDictionary();
            }
            route.DataTokens["__RouteName"] = routeName;
            return route;
        }

    }
}

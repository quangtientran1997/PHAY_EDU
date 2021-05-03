using PHAY.DATA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHAY.LIB.ConnectKey
{
    public static class WebConnect
    {
        public const string F_WebKey_HTWRootWeb = "WebRootWeb";
        public const string F_WebKey_HTWEntities = "WebKey001";
        public static string GetConnectString_HTWEntities
        {
            get
            {
                try
                {
                    //Connect connect = new Connect();
                    //return connect.GetAppConfig(F_WebKey_HTWEntities);
                    return WebConnect.GetConnectString_RootHTW;
                    //return System.Configuration.ConfigurationManager.AppSettings["WebKey001"];
                }
                catch (Exception)
                {
                    throw new Exception("WebConnect::" + F_WebKey_HTWEntities);
                }
            }
        }
        public static string GetConnectString_RootHTW
        {
            get
            {
                try
                {
                    //Connect connect = new Connect();
                    //HTWEntities Context = new HTWEntities();
                    return System.Configuration.ConfigurationManager.AppSettings["WebRootWeb"];
                }
                catch (Exception ex)
                {
                    throw new Exception("WebConnect::" + F_WebKey_HTWRootWeb);
                }
            }
        }
    }
}

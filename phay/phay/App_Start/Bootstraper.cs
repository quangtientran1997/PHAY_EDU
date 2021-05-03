using PHAY.Services.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace phay.App_Start
{
    public class Bootstraper
    {
        public static void Start()
        {
            var webConnectionString = PHAY.LIB.ConnectKey.WebConnect.GetConnectString_HTWEntities;

            if (!string.IsNullOrEmpty(webConnectionString))
            {
                PHAY.DATA.Models.HTWEntities.ConnectionString = webConnectionString;

                WebModuleRegistration.RegisterWEBConnectionString(webConnectionString);
                WebModuleRegistration.Registration();
            }
        }
    }
}
using PHAY.Services.Infrastructure.Container;
using PHAY.Services.Web.Repositories.CMS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHAY.Services.Web
{
    public class WebModuleRegistration
    {
        /// <summary>
        /// Register Business Services
        /// </summary>
        public static void Registration()
        {
            WebContainerFactory.Container.Register<IWebCmsRepository, WebCmsRepository>(new System.Data.SqlClient.SqlConnection(Connections.GetConnection(Connections.WEB_CONNECTION_KEY)));
            //WebContainerFactory.Container.Register<IWebCmsService, WebCmsService>();
        }

        #region Web
        /// <summary>
        /// Register WEB connection string
        /// </summary>
        /// <param name="connectionString"></param>
        public static void RegisterWEBConnectionString(string connectionString)
        {
            if (!string.IsNullOrEmpty(connectionString))
            {
                Connections.RegisterConnectionString(Connections.WEB_CONNECTION_KEY, connectionString);
            }
            else
            {
                throw new Exception("Connection string cannot be null, please update a valid connection string");
            }
        }

        #endregion

    }
}

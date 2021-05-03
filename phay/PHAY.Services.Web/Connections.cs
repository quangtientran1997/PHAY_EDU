using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHAY.Services.Web
{
    public static class Connections
    {
        /// <summary>
        /// WEB Connection string
        /// </summary>
        public const string WEB_CONNECTION_KEY = "WEB";

        /// <summary>
        /// Sql Connection
        /// </summary>
        private static readonly Dictionary<string, string> SqlConnections = new Dictionary<string, string>();

        /// <summary>
        /// Get connection string from Key
        /// </summary>
        /// <param name="connection_key"></param>
        /// <returns></returns>
        public static string GetConnection(string connection_key)
        {
            if (SqlConnections.ContainsKey(connection_key))
            {
                return SqlConnections[connection_key];
            }
            return null;
        }

        /// <summary>
        /// Register connection string by key
        /// </summary>
        /// <param name="key"></param>
        /// <param name="connectionString"></param>
        public static void RegisterConnectionString(string key, string connectionString)
        {
            SqlConnections[key] = connectionString;
        }
    }
}

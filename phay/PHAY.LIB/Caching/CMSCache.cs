using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Text;
using System.Threading.Tasks;

namespace PHAY.LIB.Caching
{
    public static class CMSCache
    {
        public const string KEY_PREFIX = "CMSCache";

        #region Properties

        private static ObjectCache Cache
        {
            get
            {
                return System.Runtime.Caching.MemoryCache.Default;
            }
        }

        #endregion

        #region Private Methods

        private static string GetKey(string key)
        {
            return string.Format("{0}@{1}", KEY_PREFIX, key);
        }

        #endregion

        #region Public Methods

        public static object Get(string key)
        {
            return Cache[GetKey(key)];
        }

        public static void Add(string key, object data, int expiration = 30)
        {
            CacheItemPolicy policy = new CacheItemPolicy();
            policy.AbsoluteExpiration = DateTime.Now + TimeSpan.FromMinutes(expiration);

            Cache.Add(new CacheItem(GetKey(key), data), policy);
        }

        public static object AddOrGetExisting(string key, Func<object> data, int cacheTimeInMinute = 30)
        {
            if (!Cache.Contains(GetKey(key)))
            {
                Add(key, data(), cacheTimeInMinute);
            }

            return Cache[GetKey(key)];
        }

        public static bool IsExisted(string key)
        {
            return (Cache[GetKey(key)] != null);
        }

        public static void Remove(string key)
        {
            Cache.Remove(GetKey(key));
        }

        public static void Clear()
        {
            foreach (var key in Cache.Where(m => m.Key.StartsWith(KEY_PREFIX)).Select(m => m.Key).ToList())
            {
                Cache.Remove(key);
            }
        }
        #endregion
    }
}

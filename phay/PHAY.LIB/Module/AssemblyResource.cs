using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Caching;
using System.Web.Hosting;

namespace PHAY.LIB.Module
{
    public class AssemblyResourceHelper
    {
        public static string FixPartName(string s)
        {
            if (!string.IsNullOrEmpty(s) && s.Length > 0)
            {
                if (char.IsNumber(s[0]))
                {
                    s = "_" + s;
                }
            }

            return s;
        }
    }
    public class AssemblyResource : VirtualPathProvider
    {
        protected Dictionary<string, Assembly> m_moduleAssemblies = new Dictionary<string, Assembly>();
        protected List<string> m_moduleLocations = new List<string>();
        public static string FixResourceUrl(string virtualPath)
        {
            return virtualPath;
        }

        protected static Dictionary<string, bool> s_foundPaths = new Dictionary<string, bool>();

        protected string m_virtualBase = "~/PHAY.MOD/";

        public AssemblyResource()
        {
            m_moduleLocations.Add(HttpRuntime.BinDirectory);
            m_moduleLocations.Add(Path.Combine(HttpRuntime.AppDomainAppPath, "PHAY.MOD"));
        }

        private bool IsAppResourcePath(string virtualPath)
        {
            String checkPath = VirtualPathUtility.ToAppRelative(virtualPath);
            return checkPath.StartsWith(m_virtualBase, StringComparison.InvariantCultureIgnoreCase);
        }

        public override VirtualFile GetFile(string virtualPath)
        {

            if (IsAppResourcePath(virtualPath))
                return new AssemblyResourceVirtualFile(FixResourceUrl(virtualPath));
            else
                return base.GetFile(virtualPath);
        }

        public override CacheDependency GetCacheDependency(string virtualPath, IEnumerable virtualPathDependencies, DateTime utcStart)
        {
            if (IsAppResourcePath(virtualPath))
            {
                return null;
            }
            return base.GetCacheDependency(virtualPath, virtualPathDependencies, utcStart);
        }

        protected string findAssembly(string name)
        {
            string fullName = null;

            foreach (string loc in m_moduleLocations)
                if (File.Exists(fullName = Path.Combine(loc, name)))
                    return fullName;

            return null;
        }

        public override bool FileExists(string virtualPath)
        {
            virtualPath = FixResourceUrl(virtualPath);
            bool exists = false;
            lock (s_foundPaths)
            {
                if (s_foundPaths.ContainsKey(virtualPath))
                    exists = true;
            }

            if (!exists)
            {
                if (IsAppResourcePath(virtualPath))
                {
                    string path = VirtualPathUtility.ToAppRelative(virtualPath);
                    string[] parts = path.Split('/');

                    if (parts.Length >= 4)
                    {
                        string assemblyName = parts[2];
                        string resourceName = parts[3];

                        if (parts.Length > 4)
                        {
                            parts[3] = AssemblyResourceHelper.FixPartName(parts[3]);

                            StringBuilder buff = new StringBuilder(parts[3]);
                            for (var p = 4; p < parts.Length; p++)
                            {
                                parts[p] = AssemblyResourceHelper.FixPartName(parts[p]);
                                buff.Append(".").Append(parts[p]);
                            }
                            resourceName = buff.ToString();
                        }

                        if (!assemblyName.EndsWith(".dll", StringComparison.InvariantCultureIgnoreCase))
                        {
                            // kiểm tra assembly trong Core
                            if (assemblyName.Contains(".Core") && resourceName.Contains("Views."))
                            {
                                string coreName = resourceName.Split('.')[1];
                                resourceName = coreName + "." + resourceName;
                            }
                            resourceName = assemblyName + "." + resourceName;
                            assemblyName += ".dll";
                        }

                        Assembly assembly = null;
                        string originalAssemblyName = assemblyName;
                        assemblyName = findAssembly(assemblyName);    // kiểm tra tồn tại trong bin

                        lock (m_moduleAssemblies)
                        {
                            if (assemblyName != null)
                            {
                                if (!m_moduleAssemblies.TryGetValue(assemblyName, out assembly))
                                {
                                    byte[] assemblyBytes = File.ReadAllBytes(assemblyName);
                                    assembly = Assembly.Load(assemblyBytes);
                                    m_moduleAssemblies[assemblyName] = assembly;
                                }
                            }
                        }

                        if (assembly != null)
                        {
                            string[] resourceList = assembly.GetManifestResourceNames();   // Lấy tất cả resource có trong assembly
                            bool found = Array.Exists(resourceList, delegate (string r) { return r.Equals(resourceName); }); // so sánh resourceName có tồn tại trong assembly không
                            if (found == true)
                            {
                                lock (s_foundPaths)
                                {
                                    s_foundPaths[virtualPath] = found;
                                }
                            }

                            exists = found;
                        }
                    }
                }
                else
                    exists = base.FileExists(virtualPath);
            }

            return exists;
        }

    }

    public class AssemblyResourceVirtualFile : System.Web.Hosting.VirtualFile
    {
        private string path;

        public AssemblyResourceVirtualFile(string virtualPath)
            : base(virtualPath)
        {
            virtualPath = AssemblyResource.FixResourceUrl(virtualPath);
            path = VirtualPathUtility.ToAppRelative(virtualPath);
        }

        public override Stream Open()
        {
            string[] parts = path.Split('/');
            string assemblyName = parts[2];
            string resourceName = parts[3];
            if (parts.Length > 4)
            {
                parts[3] = AssemblyResourceHelper.FixPartName(parts[3]);

                StringBuilder buff = new StringBuilder(parts[3]);
                for (var p = 4; p < parts.Length; p++)
                {
                    parts[p] = AssemblyResourceHelper.FixPartName(parts[p]);
                    buff.Append(".").Append(parts[p]);
                }
                resourceName = buff.ToString();
            }
            if (!assemblyName.EndsWith(".dll", StringComparison.InvariantCultureIgnoreCase))
            {
                if (assemblyName.Contains(".Core") && resourceName.Contains("Views."))
                {
                    string coreName = resourceName.Split('.')[1];
                    resourceName = coreName + "." + resourceName;
                }
                resourceName = assemblyName + "." + resourceName;
                assemblyName += ".dll";
            }

            string originalAssemblyName = assemblyName;

            assemblyName = Path.Combine(HttpRuntime.BinDirectory, assemblyName);

            if (File.Exists(assemblyName))
            {
                byte[] assemblyBytes = File.ReadAllBytes(assemblyName);
                Assembly assembly = Assembly.Load(assemblyBytes);

                if (assembly != null)
                {
                    return assembly.GetManifestResourceStream(resourceName);
                }
            }

            return null;
        }

    }
}

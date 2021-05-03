using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Optimization;

namespace PHAY.LIB.Module
{
    public interface ModuleApplication
    {
        BundleCollection Bundles { get; }
    }
}

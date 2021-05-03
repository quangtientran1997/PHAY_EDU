using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHAY.Services.Infrastructure.Container
{
    public class WebContainerFactory
    {
        private static readonly Lazy<IContainerService> lazyInstance = new Lazy<IContainerService>(() => new UnityContainerService());
        public static IContainerService Container { get { return lazyInstance.Value; } }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Unity;

namespace PHAY.Services.Infrastructure.Container
{
    class UnityContainerService : IContainerService
    {
        IUnityContainer container = new UnityContainer();

        public void Register<T1, T2>()
        {
            this.container.RegisterType(typeof(T1), typeof(T2));
        }

        public void Register<T1, T2>(params object[] constructorParameters)
        {
            this.container.RegisterType(typeof(T1), typeof(T2), new Unity.Injection.InjectionConstructor(constructorParameters));
        }

        public T1 Resolve<T1>()
        {
            return this.container.Resolve<T1>();
        }
    }
}

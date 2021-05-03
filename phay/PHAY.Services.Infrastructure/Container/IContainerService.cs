using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHAY.Services.Infrastructure.Container
{
    public interface IContainerService
    {
        void Register<T1, T2>();
        void Register<T1, T2>(params object[] constructorParameters);
        T1 Resolve<T1>();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace PHAY.LIB.Base
{
    public class ControllerBase : Controller
    {
    }

    public partial class ControllerBase<T> : ControllerBase where T : BaseService
    {
        #region Variables

        private T _business;

        #endregion

        #region Properties

        protected T Business
        {
            get
            {
                if (_business == null)
                {
                    _business = Activator.CreateInstance<T>();
                }

                return _business;
            }
        }

        #endregion


    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace PHAY.LIB.Module
{
    public class DynamicActionFilter
    {
        public string Controller { get; set; }
        public string Action { get; set; }
        public IActionFilter Filter { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHAY.DATA.Models
{
    public class EntityModelBase
    {
        public const string F_ID = "ID";
        public virtual int ID { get; set; }
        public string GuID { get; set; }
    }
}

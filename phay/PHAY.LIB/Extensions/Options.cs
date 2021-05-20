using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHAY.LIB.Extensions
{
    public class CMSPopupFormOptions : JsonObject
    {
        [Json]
        public string FormID { get; set; }
        [Json]
        public bool? AutoClose { get; set; }

        [Json]
        public string OnSuccess { get; set; }

        [Json]
        public string OnFailure { get; set; }

        [Json]
        public string Url { get; set; }

        [Json]
        public string PopupID { get; set; }

        [Json]
        public string GridID { get; set; }

        [Json]
        public bool IsAdd { get; set; }

        [Json]
        public string Message { get; set; }

        [Json]
        public string ReturnUrl { get; set; }

        public string OnBeforeValidate { get; set; }
        public string ActionName { get; set; }
        public string ControllerName { get; set; }
        public object RouteValues { get; set; }

    }

    public class JsonAttribute : Attribute
    {

    }

    public abstract class JsonObject
    {
        public string ToJson(bool hasAttributeOnly = false, bool lowerFirstCharacter = false)
        {
            Kendo.Mvc.Infrastructure.JavaScriptInitializer scriptInitializer = new Kendo.Mvc.Infrastructure.JavaScriptInitializer();
            string js = string.Empty;
            Dictionary<string, object> data = new Dictionary<string, object>();

            foreach (var prop in this.GetType().GetProperties())
            {
                string value = string.Empty;
                object objVal = prop.GetValue(this);

                var propertyName = prop.Name;

                propertyName = lowerFirstCharacter ? (propertyName.Substring(0, 1).ToLower() + propertyName.Substring(1)) : propertyName;


                if (hasAttributeOnly)
                {
                    // Class chứa attribute
                    if (this.GetType().IsDefined(typeof(JsonAttribute), true) ||
                        // Property chứa attribute
                        Attribute.IsDefined(prop, typeof(JsonAttribute)))
                    {
                        data.Add(propertyName, objVal);
                    }
                }
                else
                {
                    data.Add(propertyName, objVal);
                }
            }

            return scriptInitializer.Serialize(data);
        }
    }
}

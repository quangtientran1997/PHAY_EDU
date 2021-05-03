using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Routing;

namespace PHAY.LIB.Module
{
    public interface IPHAYModule : IPHAYModuleSys
    {
        List<string> RazorViewLocations { get; }
        List<Route> Routes { get; }
        List<DynamicActionFilter> ActionFilters { get; }
        //List<Widget> Widgets { get; }
        void SetupExtensions(ModuleApplication app);
        bool Enabled { get; set; }
    }

    public interface IPHAYModuleSys
    {
        ModuleApplication App { get; }
    }

    public interface IPHAYModuleData
    {
        string Id { get; }
        string ParentId { get; }
        string Name { get; }
        string Description { get; }
    }

    [MetadataAttribute]
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class ASCModuleMetadataAttribute : ExportAttribute
    {
        public ASCModuleMetadataAttribute(string id, string parentId, string name, string description)
            : base(typeof(IPHAYModuleData))
        {
            Id = id;
            ParentId = parentId;
            Name = name;
            Description = description;
        }

        public string Id { get; set; }
        public string ParentId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}

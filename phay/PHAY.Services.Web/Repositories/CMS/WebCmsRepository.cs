using ASC.Services.Infrastructure.DataAccessObject.Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHAY.Services.Web.Repositories.CMS
{
    public class WebCmsRepository : DapperDataAccessObject, IWebCmsRepository
    {
        public WebCmsRepository(SqlConnection sqlConnection) : base(sqlConnection)
        {
        }
    }
}

using PHAY.DATA.Models;
using PHAY.LIB.Common;
using PHAY.LIB.ConnectKey;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHAY.LIB.Base
{
    public class BaseService
    {
        //Connect root        
        private static string connectionString = WebConnect.GetConnectString_RootHTW;

        #region Variables

        private HTWEntities _context;

        #endregion

        #region Public Methods

        public void CreateNewContext()
        {
            _context = new HTWEntities();
        }


        public void CommonUpdate(object obj, long ID)
        {
            try
            {
                var user = CommonBase.CurrentUserInfo;
                if (user != null)
                {
                    
                }
                else
                {
                    
                }
            }
            catch (Exception ex)
            {
                CommonBase.WriteLog(ex.Message);
            }
        }

        public void CommonDelete(object obj)
        {
            try
            {
                var user = CommonBase.CurrentUserInfo;
               
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region Properties

        public HTWEntities Context
        {
            get
            {
                if (_context == null)
                {
                    CreateNewContext();
                }

                return _context;
            }
        }

        #endregion
    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHAY.Services.Infrastructure.DataAccessObject
{
    public interface IDataAccessObject<T>
    {
        #region Property members
        #endregion

        #region Operation methods
        /// <summary>
        /// Add an generic object to its related datatable
        /// </summary>
        /// <param name="item"></param>
        void Add(T item);

        /// <summary>
        /// Update a generic object
        /// </summary>
        /// <param name="item"></param>
        void Update(T item);

        /// <summary>
        /// Update an generic object except some properties in Exclude list
        /// </summary>
        /// <param name="item"></param>
        /// <param name="ExcludedProperties"></param>
        void Update(T item, string[] ExcludedProperties);

        /// <summary>
        /// Delete a generic object
        /// </summary>
        /// <param name="item"></param>
        void Delete(T item);

        /// <summary>
        /// Find objects base on pre-conditions
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        IEnumerable<T> Find(System.Linq.Expressions.Expression<Func<T, bool>> predicate);

        /// <summary>
        /// Get a list of object
        /// </summary>
        /// <returns></returns>
        IEnumerable<T> FindAll();

        /// <summary>
        /// Find an object by its id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        T FindById(int id);

        /// <summary>
        /// Find an object by its id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        T FindById(string id);

        /// <summary>
        /// Find an object by its id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        T FindById(Guid id);

        /// <summary>
        /// Get object by store procedure
        /// </summary>
        /// <param name="spName"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        IEnumerable<T> GetByStoreProcedure(string spName, object param);

        /// <summary>
        /// Get object by a raw sql script
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        IEnumerable<T> GetByRawSql(string sql, object param);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="_storeName"></param>
        /// <param name="_params"></param>
        /// <param name="_values"></param>
        /// <returns></returns>
        DataSet ExcuteStoredProcedure(string _storeName, string[] _params, object[] _values);
        #endregion
    }

    public interface IDataAccessObject
    {
        #region Property members
        #endregion

        #region Operation methods
        /// <summary>
        /// Add an generic object to its related datatable
        /// </summary>
        /// <param name="item"></param>
        void Add<T>(T item) where T : class;

        /// <summary>
        /// Update a generic object
        /// </summary>
        /// <param name="item"></param>
        void Update<T>(T item) where T : class;

        /// <summary>
        /// Update an generic object except some properties in Exclude list
        /// </summary>
        /// <param name="item"></param>
        /// <param name="ExcludedProperties"></param>
        void Update<T>(T item, string[] ExcludedProperties) where T : class;

        /// <summary>
        /// Delete a generic object
        /// </summary>
        /// <param name="item"></param>
        void Delete<T>(T item) where T : class;

        /// <summary>
        /// Find objects base on pre-conditions
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        IEnumerable<T> Find<T>(System.Linq.Expressions.Expression<Func<T, bool>> predicate) where T : class;

        /// <summary>
        /// Get a list of object
        /// </summary>
        /// <returns></returns>
        IEnumerable<T> FindAll<T>() where T : class;

        /// <summary>
        /// Find an object by its id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        T FindById<T>(int id) where T : class;

        /// <summary>
        /// Find an object by its id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        T FindById<T>(string id) where T : class;

        /// <summary>
        /// Find an object by its id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        T FindById<T>(Guid id) where T : class;

        /// <summary>
        /// Get object by store procedure
        /// </summary>
        /// <param name="spName"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        IEnumerable<T> GetByStoreProcedure<T>(string spName, object param) where T : class;

        /// <summary>
        /// Get object by a raw sql script
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="param"></param>
        /// <returns></returns>
        IEnumerable<T> GetByRawSql<T>(string sql, object param) where T : class;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="_storeName"></param>
        /// <param name="_params"></param>
        /// <param name="_values"></param>
        /// <returns></returns>
        DataSet ExcuteStoredProcedure(string _storeName, string[] _params, object[] _values);

        #endregion
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Data.SqlClient;
using Dapper;
using System.Data;
using Dapper.Contrib.Extensions;
using PHAY.Services.Infrastructure.DataAccessObject;

namespace ASC.Services.Infrastructure.DataAccessObject.Dapper
{
    public class DapperDataAccessObject<T> : IDataAccessObject<T> where T : class
    {
        private SqlConnection _sqlConnection;
        private SqlConnection SqlConnection
        {
            get
            {
                if (_sqlConnection.State != ConnectionState.Open)
                {
                    _sqlConnection.Open();
                }
                return _sqlConnection;
            }
        }
        public DapperDataAccessObject(SqlConnection sqlConnection)
        {
            this._sqlConnection = sqlConnection;
        }

        public void Add(T item)
        {
            this.SqlConnection.Insert<T>(item);
        }

        public void Update(T item)
        {
            this.SqlConnection.Update(item);
        }

        public void Update(T item, string[] ExcludedProperties)
        {
            this.SqlConnection.Update(item, ExcludedProperties);
        }

        public void Delete(T item)
        {
            this.SqlConnection.Delete<T>(item);
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return this.SqlConnection.Find<T>(predicate);
        }

        public IEnumerable<T> FindAll()
        {
            return this.SqlConnection.GetAll<T>();
        }

        public T FindById(int id)
        {
            return this.SqlConnection.Get<T>(id);
        }

        public T FindById(string id)
        {
            return this.SqlConnection.Get<T>(id);
        }

        public T FindById(Guid id)
        {
            return this.SqlConnection.Get<T>(id);
        }

        public IEnumerable<T> GetByRawSql(string sql, object param)
        {
            return this.SqlConnection.Query<T>(sql, param);
        }

        public IEnumerable<T> GetByStoreProcedure(string spName, object param)
        {
            return this.SqlConnection.Query<T>(spName, param, commandType: CommandType.StoredProcedure);
        }

        public DataSet GetData(SqlCommand cmd)
        {
            DataSet ds = null;
            try
            {
                cmd.Connection = this.SqlConnection;
                ds = new DataSet();
                SqlDataAdapter adap = new SqlDataAdapter(cmd);
                adap.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return ds;
        }

        public DataSet GetData(String strSQL)
        {

            DataSet ds = null;
            try
            {
                ds = new DataSet();
                SqlDataAdapter adap = new SqlDataAdapter(strSQL, this.SqlConnection);
                adap.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return ds;
        }

        public DataSet ExcuteStoredProcedure(string StrSQL, string[] Params, object[] Values)
        {
            SqlCommand cmd = new SqlCommand(StrSQL);
            cmd.CommandType = CommandType.StoredProcedure;

            if (Params != null)
            {
                for (int i = 0; i < Params.Length; i++)
                {
                    if (Values[i] == null)
                    {
                        Values[i] = DBNull.Value;
                    }
                    cmd.Parameters.Add(new SqlParameter("@" + Params[i], Values[i]));
                }
            }

            return GetData(cmd);
        }
    }
    public class DapperDataAccessObject : IDataAccessObject
    {
        private SqlConnection _sqlConnection;
        private SqlConnection SqlConnection
        {
            get
            {
                if (_sqlConnection.State != ConnectionState.Open)
                {
                    _sqlConnection.Open();
                }
                return _sqlConnection;
            }
        }

        public DapperDataAccessObject(SqlConnection sqlConnection)
        {
            _sqlConnection = sqlConnection;
        }

        public void Add<T>(T item) where T : class
        {
            this.SqlConnection.Insert<T>(item);
        }

        public void Update<T>(T item) where T : class
        {
            this.SqlConnection.Update(item);
        }

        public void Update<T>(T item, string[] ExcludedProperties) where T : class
        {
            this.SqlConnection.Update(item, ExcludedProperties);
        }

        public void Delete<T>(T item) where T : class
        {
            this.SqlConnection.Delete<T>(item);
        }

        public IEnumerable<T> Find<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            return this.SqlConnection.Find<T>(predicate);
        }

        public IEnumerable<T> FindAll<T>() where T : class
        {
            return this.SqlConnection.GetAll<T>();
        }

        public T FindById<T>(int id) where T : class
        {
            return this.SqlConnection.Get<T>(id);
        }

        public T FindById<T>(string id) where T : class
        {
            return this.SqlConnection.Get<T>(id);
        }

        public T FindById<T>(Guid id) where T : class
        {
            return this.SqlConnection.Get<T>(id);
        }

        public IEnumerable<T> GetByRawSql<T>(string sql, object param) where T : class
        {
            return this.SqlConnection.Query<T>(sql, param);
        }

        public IEnumerable<T> GetByStoreProcedure<T>(string spName, object param) where T : class
        {
            return this.SqlConnection.Query<T>(spName, param, commandType: CommandType.StoredProcedure);
        }

        public DataSet ExcuteStoredProcedure(string _storeName, string[] _params, object[] _values)
        {
            SqlCommand cmd = new SqlCommand(_storeName);
            cmd.CommandType = CommandType.StoredProcedure;

            if (_params != null)
            {
                for (int i = 0; i < _params.Length; i++)
                {
                    if (_values[i] == null)
                    {
                        _values[i] = DBNull.Value;
                    }
                    cmd.Parameters.Add(new SqlParameter("@" + _params[i], _values[i]));
                }
            }

            return GetData(cmd);
        }

        public DataSet GetData(SqlCommand cmd)
        {
            DataSet ds = null;
            try
            {
                cmd.Connection = this.SqlConnection;
                ds = new DataSet();
                SqlDataAdapter adap = new SqlDataAdapter(cmd);
                adap.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return ds;
        }

        public DataSet GetData(String strSQL)
        {

            DataSet ds = null;
            try
            {
                ds = new DataSet();
                SqlDataAdapter adap = new SqlDataAdapter(strSQL, this.SqlConnection);
                adap.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return ds;
        }

    }
}

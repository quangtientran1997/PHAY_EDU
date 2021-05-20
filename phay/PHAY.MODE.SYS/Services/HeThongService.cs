using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using PHAY.DATA.Models;
using PHAY.LIB.Base;
using PHAY.LIB.Common;
using PHAY.MOD.SYS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PHAY.MOD.SYS.Services
{
    public class HeThongService : BaseService
    {
        #region Menu quyền

        public List<MenuQuyenViewModel> GetMenuQuyenManHinh()
        {
            var user = CommonBase.CurrentUserInfo;

            //Bắt buộc phải có quyền xem
            var menuQuyen = CommonBase.GetACLCache(user.ID)
                                      .Where(m => m.LoaiQuyen == (int)LoaiAction.Xem)
                                      .Select(m => new MenuQuyenViewModel
                                      {
                                          TenNhomManHinh = m.TenNhom,
                                          TenManHinh = m.TenManHinh,
                                          TenController = m.TenController,
                                          TenAction = m.TenAction,
                                          Area = m.Area,
                                          IDNhom = m.IDNhom,
                                          IDManHinh = m.ID,
                                          SoThuTu = m.SoThuTu,
                                          CssNhom = m.CssNhom,
                                          CssManHinh = m.CssManHinh,
                                          GroupManHinh = m.GroupManHinh,
                                          GroupSubManHinh = m.GroupSubManHinh,
                                          CssBadgeManHinh = m.CssBadgeManHinh,
                                          CssBadgeNhom = m.CssBadgeNhom
                                      }).Distinct().ToList();


            return menuQuyen;

        }


        #endregion

        #region Nhóm người dùng
        internal DataSourceResult GetNhomNguoiDungForGrid(DataSourceRequest request)
        {
            var user = CommonBase.CurrentUserInfo;
            var nhomNguoiDung = Context.ACL_NhomNguoiDung.Where(m => m.IsDelete != true && m.IsNhom == true).AsQueryable();

            //Lấy các nhóm người dùng có tham chiếu thuộc user đăng nhập
            nhomNguoiDung = nhomNguoiDung.Where(n => n.IDThamChieu == user.ID || n.IDNguoiTao == user.ID);

            var result = (from nhom in nhomNguoiDung
                          join nd in Context.ACL_NhomNguoiDung.Where(m => m.IsDelete != true) on nhom.ID equals nd.IDThamChieu into nd1
                          from nd2 in nd1.DefaultIfEmpty()
                          group nd2 by new { nhom.ID, nhom.Ten, nd2.IDThamChieu } into g
                          select new GridNhomNguoiDungViewModel
                          {
                              ID = g.Key.ID,
                              Ten = g.Key.Ten,
                              CountUser = g.Count(c => c.IDThamChieu != null)
                          }).ToList();

            return result.ToDataSourceResult(request);
        }

        internal int AddUpdateNhomNguoiDung(AddUpdateNhomNguoiDungViewModel model, ModelStateDictionary modelState)
        {
            var user = CommonBase.CurrentUserInfo;
            var entity = model.ID != 0 ? GetOneNhomNguoiDung(model.ID) : new ACL_NhomNguoiDung();

            if (entity == null)
            {
                entity = new ACL_NhomNguoiDung();
            }

            entity.Ten = model.Ten;
            entity.IsNhom = true;

            if (entity.ID <= 0)
            {
                entity.IDThamChieu = model.IDThamChieu;
                entity.IDThamChieu = user.ID;
                entity.IDNguoiTao = user.ID;
                entity.NgayTao = DateTime.Now;
                Context.ACL_NhomNguoiDung.Add(entity);
            }
            else
            {
                entity.IDNguoiCapNhat = user.ID;
                entity.NgayCapNhat = DateTime.Now;
            }

            return Context.SaveChanges();
        }

        private ACL_NhomNguoiDung GetOneNhomNguoiDung(int pId)
        {
            return Context.ACL_NhomNguoiDung.Where(m => m.ID == pId).FirstOrDefault();
        }

        public AddUpdateNhomNguoiDungViewModel GetOneNhomNguoiDungViewModel(int pId)
        {
            var model = new AddUpdateNhomNguoiDungViewModel();
            var result = Context.ACL_NhomNguoiDung.Where(m => m.ID == pId).FirstOrDefault();
            if (result != null)
            {
                model.ID = result.ID;
                model.IDThamChieu = result.IDThamChieu;
                model.Ten = result.Ten;
            }

            return model;
        }

        public int DeleteNhomNguoiDung(int[] ids)
        {
            int rs = 0;

            using (var dbContextTransaction = Context.Database.BeginTransaction())
            {
                var query = Context.ACL_NhomNguoiDung.Where(x => ids.Contains(x.ID)).ToList();
                if (query != null && query.Count() > 0)
                {
                    var user = CommonBase.CurrentUserInfo;
                    foreach (var item in query)
                    {
                        item.IsDelete = true;
                        item.IDNguoiDelete = user.ID;
                        item.NgayDelete = DateTime.Now;
                        rs += Context.SaveChanges();
                    }
                }

                dbContextTransaction.Commit();
            }

            return rs;
        }

        #endregion

        #region Người dùng
        internal DataSourceResult GetNguoiDungForGrid(DataSourceRequest request, ParamGetNguoiDung param)
        {
            var user = CommonBase.CurrentUserInfo;

            #region OLD

            var nguoiDung = Context.ACL_NhomNguoiDung
                                   .Where(nd => nd.IsDelete != true && nd.IsNhom != true)
                                   .AsQueryable();
            //Lấy người dùng thuộc nhóm user đăng nhập tạo ra
            nguoiDung = from nd in nguoiDung
                        join nhom in Context.ACL_NhomNguoiDung.Where(m => m.IsDelete != true && m.IDThamChieu == user.ID) on nd.IDThamChieu equals nhom.ID
                        select nd;
            var result = (from nd in nguoiDung
                          join nhom in Context.ACL_NhomNguoiDung on nd.IDThamChieu equals nhom.ID
                          select new GridNguoiDungViewModel
                          {
                              ID = nd.ID,
                              IDThamChieu = nd.IDThamChieu,
                              HoDem = nd.HoDem,
                              Ten = nd.Ten,
                              SoDienThoai = nd.SoDienThoai,
                              Email = nd.Email,
                              DiaChi = nd.DiaChi,
                              IsActive = nd.IsActive ?? false,
                              TenNhom = nhom.Ten,
                              TenDangNhap = nd.TenDangNhap,
                          }).ToList().ToDataSourceResult(request);
            #endregion

            return result;
        }

        internal int AddUpdateNguoiDung(AddUpdateNguoiDungViewModel model, ModelStateDictionary modelState)
        {
            int kq = 0;
            using (var dbContextTransaction = Context.Database.BeginTransaction())
            {
                var user = CommonBase.CurrentUserInfo;
                var isQuyenChonTruong = CommonBase.HasAuthorized("ASC.MOD.SYS.Controllers.HeThongController", "IsQuyenChonTruong");

                var entity = model.ID != 0 ? GetOneNguoiDung(model.ID) : new ACL_NhomNguoiDung();

                if (entity == null)
                {
                    entity = new ACL_NhomNguoiDung();
                }

                entity.IDThamChieu = model.IDThamChieu;

                if (!string.IsNullOrEmpty(model.Ten))
                {
                    int lastIndex = model.Ten.Trim().LastIndexOf(' ');

                    if (lastIndex != -1)
                    {
                        entity.HoDem = model.Ten.Substring(0, lastIndex);
                        entity.Ten = model.Ten.Substring(lastIndex + 1);
                    }
                    else
                    {
                        entity.Ten = model.Ten;
                    }
                }

                entity.SoDienThoai = model.SoDienThoai;
                entity.SoDiDong = model.SoDiDong;
                entity.DiaChi = model.DiaChi;
                entity.Email = model.Email;
                //entity.LoaiDoiTuong = model.LoaiDoiTuong;
                entity.IsActive = model.IsActive;


                if (model.FileHinhDaiDien != null && model.FileHinhDaiDien.Length > 0)
                {
                    entity.IDHinhDaiDien = model.FileHinhDaiDien[0];
                }

                if (entity.ID <= 0)
                {
                    entity.TenDangNhap = model.TenDangNhap;
                    entity.MatKhau = CommonBase.MD5(model.MatKhau);
                    entity.IDNguoiTao = user.ID;
                    entity.NgayTao = DateTime.Now;

                    int? idTaiKhoan = null;
                    var taiKhoan = new ACL_TaiKhoan();
                    taiKhoan.TenDangNhap = model.TenDangNhap;
                    taiKhoan.MatKhau = CommonBase.MD5(model.MatKhau);
                    taiKhoan.HoTen = model.HoDem + " " + model.Ten;
                    taiKhoan.DiaChi = model.DiaChi;
                    taiKhoan.Email = model.Email;
                    taiKhoan.SoDienThoai = model.SoDienThoai;
                    taiKhoan.IDThamChieu = user.ID;
                    taiKhoan.IDNguoiTao = user.ID;
                    taiKhoan.NgayTao = DateTime.Now;

                    Context.ACL_TaiKhoan.Add(taiKhoan);
                    kq += Context.SaveChanges();

                    idTaiKhoan = taiKhoan.ID;
                    entity.IDMapDoiTuong = idTaiKhoan;

                    Context.ACL_NhomNguoiDung.Add(entity);
                }
                else
                {
                    bool isCoQuyenDoiMatKhau = CommonBase.HasAuthorized("ASC.MOD.SYS.Controllers.HeThongController", "IsDoiMatKhau") ?? false;

                    entity.IDNguoiCapNhat = user.ID;
                    entity.NgayCapNhat = DateTime.Now;

                    var taiKhoan = Context.ACL_TaiKhoan.Where(m => m.ID == entity.IDMapDoiTuong).FirstOrDefault();
                    if (taiKhoan != null)
                    {
                        taiKhoan.TenDangNhap = model.TenDangNhap;
                        if (isCoQuyenDoiMatKhau && !string.IsNullOrEmpty(model.MatKhau) && entity.MatKhau != model.MatKhau)
                        {
                            taiKhoan.MatKhau = CommonBase.MD5(model.MatKhau);
                        }
                        taiKhoan.HoTen = model.HoDem + " " + model.Ten;
                        taiKhoan.DiaChi = model.DiaChi;
                        taiKhoan.Email = model.Email;
                        taiKhoan.SoDienThoai = model.SoDienThoai;
                        taiKhoan.IDNguoiCapNhat = user.ID;
                        taiKhoan.NgayCapNhat = DateTime.Now;

                        Context.SaveChanges();
                    }

                    if (isCoQuyenDoiMatKhau && !string.IsNullOrEmpty(model.MatKhau) && entity.MatKhau != model.MatKhau)
                    {
                        entity.MatKhau = CommonBase.MD5(model.MatKhau);
                    }
                }

                kq += Context.SaveChanges();


                dbContextTransaction.Commit();
            }

            return kq;
        }

        public ACL_NhomNguoiDung GetOneNguoiDung(int pId)
        {
            return Context.ACL_NhomNguoiDung.Where(m => m.ID == pId).FirstOrDefault();
        }

        public AddUpdateNguoiDungViewModel GetOneNguoiDungViewModel(int pId)
        {
            var user = CommonBase.CurrentUserInfo;
            var model = new AddUpdateNguoiDungViewModel();
            var result = Context.ACL_NhomNguoiDung.Where(m => m.ID == pId).FirstOrDefault();
            if (result != null)
            {
                model.ID = result.ID;
                model.IDThamChieu = result.IDThamChieu;
                model.HoDem = result.HoDem;
                model.Ten = result.HoDem + " " + result.Ten;
                model.SoDienThoai = result.SoDienThoai;
                model.SoDiDong = result.SoDiDong;
                model.DiaChi = result.DiaChi;
                model.Email = result.Email;
                model.LoaiDoiTuong = result.LoaiDoiTuong;
                model.IsActive = result.IsActive;
                model.MatKhau = result.MatKhau;
                model.IDHinhDaiDien = result.IDHinhDaiDien;

                model.FileHinhDaiDien = new int[] { model.IDHinhDaiDien.GetValueOrDefault(0) };
            }

            return model;
        }


        public int DeleteNguoiDung(int[] ids)
        {
            int rs = 0;

            using (var dbContextTransaction = Context.Database.BeginTransaction())
            {
                var query = Context.ACL_NhomNguoiDung.Where(x => ids.Contains(x.ID)).ToList();
                if (query != null && query.Count() > 0)
                {
                    var user = CommonBase.CurrentUserInfo;
                    foreach (var item in query)
                    {
                        item.IsDelete = true;
                        item.IDNguoiDelete = user.ID;
                        item.NgayDelete = DateTime.Now;
                        rs += Context.SaveChanges();
                    }
                }

                dbContextTransaction.Commit();
            }

            return rs;
        }

        public bool ChangeIsActiveNguoiDung(int id)
        {
            try
            {
                var user = CommonBase.CurrentUserInfo;
                ACL_NhomNguoiDung model = GetOneNguoiDung(id);
                if (model != null)
                {
                    model.IsActive = model.IsActive == false ? true : false;
                    model.IDNguoiCapNhat = user.ID;
                    model.NgayCapNhat = DateTime.Now;
                    int kq = Context.SaveChanges();
                    if (kq > 0)
                    {
                        return true;
                    }
                }
            }
            catch (Exception) { }
            return false;
        }


        internal int DoiThongTinDangNhapNguoiDung(DoiThongTinDangNhapViewModel model, ModelStateDictionary modelState)
        {
            var user = CommonBase.CurrentUserInfo;
            var entity = model.IDNguoiDung != 0 ? GetOneNguoiDung(model.IDNguoiDung) : new ACL_NhomNguoiDung();
            int kq = 0;

            if (entity != null)
            {
                if (entity.IDMapDoiTuong.GetValueOrDefault(0) > 0)
                {
                    using (var dbContextTransaction = Context.Database.BeginTransaction())
                    {
                        var taiKhoan = Context.ACL_TaiKhoan.Where(m => m.ID == entity.IDMapDoiTuong).FirstOrDefault();
                        taiKhoan.TenDangNhap = model.TenDangNhap;
                        taiKhoan.MatKhau = CommonBase.MD5(model.Password);
                        taiKhoan.IDNguoiCapNhat = user.ID;
                        taiKhoan.NgayCapNhat = DateTime.Now;

                        kq += Context.SaveChanges();


                        entity.MatKhau = CommonBase.MD5(model.Password);
                        entity.TenDangNhap = model.TenDangNhap;
                        entity.IDNguoiCapNhat = user.ID;
                        entity.NgayCapNhat = DateTime.Now;

                        kq += Context.SaveChanges();


                        dbContextTransaction.Commit();

                    }
                }
                else
                {
                    entity.MatKhau = CommonBase.MD5(model.Password);
                    entity.TenDangNhap = model.TenDangNhap;

                    entity.IDNguoiCapNhat = user.ID;
                    entity.NgayCapNhat = DateTime.Now;

                    kq += Context.SaveChanges();
                }
            }

            return kq;
        }


        #endregion
    }
}
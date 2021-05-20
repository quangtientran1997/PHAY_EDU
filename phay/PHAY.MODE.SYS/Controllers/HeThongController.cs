using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using PHAY.LIB.Base;
using PHAY.LIB.Common;
using PHAY.LIB.Security;
using PHAY.MOD.SYS.Services;
using PHAY.MOD.SYS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PHAY.MOD.SYS.Controllers
{
    [CMSAuthorizeAttribute(AuthorizeType = AuthorizeTypes.AuthorizedUsers)]
    public class HeThongController : ControllerBase<HeThongService>
    {
        #region Get menu quyền

        //[CMSAuthorizeAttribute(AuthorizeType = AuthorizeTypes.AuthorizedUsers)]
        public ActionResult MenuQuyenForManHinh(string viewNameMenu = "MenuQuyenForManHinh")
        {
            var model = Business.GetMenuQuyenManHinh();

            return View(viewNameMenu,model);
        }

        #endregion

        [CMSAuthorizeAttribute(AuthorizeType = AuthorizeTypes.AuthorizedUsers)]

        public ActionResult Index()
        {
            //CheckQuyen();
            //ViewBag.ThongKeTrongThang = Business.GetThongKeTruyCap(true);
            //ViewBag.ThongKeTrongNam = Business.GetThongKeTruyCap(false);

            return View();
        }

        [CMSAuthorizeAttribute(AuthorizeType = AuthorizeTypes.AuthorizedUsers)]
        //[KhaoSatSuKienFilterAttribute]
        public ActionResult Dashboard()
        {
            return View();
        }

        #region Nhóm người dùng
        public ActionResult NhomNguoiDung()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GridReadNhomNguoiDung([DataSourceRequest] DataSourceRequest request)
        {
            var models = Business.GetNhomNguoiDungForGrid(request);

            return Json(models, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddNhomNguoiDung()
        {
            ViewBag.IsAdd = true;
            var model = new AddUpdateNhomNguoiDungViewModel();
            model.IsNhom = true;

            return View("AddEditNhomNguoiDung", model);
        }

        [HttpPost]
        public ActionResult AddNhomNguoiDung(AddUpdateNhomNguoiDungViewModel model)
        {
            if (ModelState.IsValid)
            {
                Business.AddUpdateNhomNguoiDung(model, ModelState);
            }
            return Json(ModelState.ToDataSourceResult());
        }

        public ActionResult EditNhomNguoiDung(int pID)
        {
            //int pID = int.Parse(EncryptionHelper.DecryptStr(guid));
            ViewBag.IsAdd = false;
            var model = Business.GetOneNhomNguoiDungViewModel(pID);

            return View("AddEditNhomNguoiDung", model);
        }

        [HttpPost]
        public ActionResult EditNhomNguoiDung(AddUpdateNhomNguoiDungViewModel model)
        {
            if (ModelState.IsValid)
            {
                Business.AddUpdateNhomNguoiDung(model, ModelState);
            }
            return Json(ModelState.ToDataSourceResult());
        }


        [HttpPost]
        //[CMSAuthorizeAttribute(AuthorizeType = AuthorizeTypes.MustHavePermission, ReturnJson = true)]
        public ActionResult DeleteNhomNguoiDung(List<int> models)
        {
            if (models != null && models.Count > 0)
            {
                int[] ids = models.ToArray();
                int kq = Business.DeleteNhomNguoiDung(ids);
                if (kq <= 0)
                {
                    ModelState.AddModelError("Warning", "Xóa không thành công");
                }
            }
            else
            {
                ModelState.AddModelError("Warning", "Chưa chọn dữ liệu để xóa");
            }

            return Json(ModelState.ToDataSourceResult());
        }


        [HttpPost]
        [CMSAuthorizeAttribute(AuthorizeType = AuthorizeTypes.MustHavePermission, ReturnJson = true)]
        public ActionResult DeleteOneNhomNguoiDung(int pID)
        {
            //int id = int.Parse(EncryptionHelper.DecryptStr(guid));
            int[] ids = new int[] { pID };
            int kq = Business.DeleteNhomNguoiDung(ids);
            if (kq <= 0)
            {
                ModelState.AddModelError("Warning", "Không có dữ liệu thay đổi");
            }
            return Json(ModelState.ToDataSourceResult());
        }
        #endregion

        #region Người dùng

        public ActionResult NguoiDung()
        {
            var param = new ParamGetNguoiDung();

            var isAdd = CommonBase.HasAuthorized("PHAY.MOD.SYS.Controllers.HeThongController", "AddNguoiDung").GetValueOrDefault(false);
            var isEdit = CommonBase.HasAuthorized("PHAY.MOD.SYS.Controllers.HeThongController", "EditNguoiDung").GetValueOrDefault(false);
            var isDelete = CommonBase.HasAuthorized("PHAY.MOD.SYS.Controllers.HeThongController", "DeleteNguoiDung").GetValueOrDefault(false);

            ViewBag.IsAdd = isAdd;
            ViewBag.IsEdit = isEdit;
            ViewBag.IsDelte = isDelete;

            return View(param);
        }

        [HttpPost]
        public ActionResult GridReadNguoiDung([DataSourceRequest] DataSourceRequest request, ParamGetNguoiDung param)
        {
            var models = Business.GetNguoiDungForGrid(request, param);

            return Json(models, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddNguoiDung(int? pIDNhom)
        {
            var user = CommonBase.CurrentUserInfo;
            ViewBag.IsAdd = true;
            var model = new AddUpdateNguoiDungViewModel();
            model.IDThamChieu = pIDNhom;

            var isQuyenChonTruong = CommonBase.HasAuthorized("PHAY.MOD.SYS.Controllers.HeThongController", "IsQuyenChonTruong").GetValueOrDefault(false);
            ViewBag.IsChonTruong = isQuyenChonTruong;

            return View("AddEditNguoiDung", model);
        }

        [HttpPost]
        public ActionResult AddNguoiDung(AddUpdateNguoiDungViewModel model)
        {
            var isQuyenChonTruong = CommonBase.HasAuthorized("PHAY.MOD.SYS.Controllers.HeThongController", "IsQuyenChonTruong").GetValueOrDefault(false);

            if (string.IsNullOrEmpty(model.TenDangNhap))
            {
                ModelState.AddModelError("Warning", "Nhập tên đăng nhập");
            }
            if (string.IsNullOrEmpty(model.MatKhau))
            {
                ModelState.AddModelError("Warning", "Nhập mật khẩu");
            }
            if (ModelState.IsValid)
            {
                int kq = Business.AddUpdateNguoiDung(model, ModelState);
                if (kq <= 0)
                {
                    ModelState.AddModelError("Error", "Thêm người dùng không thành công");
                }
            }
            return Json(ModelState.ToDataSourceResult());
        }

        [CMSAuthorizeAttribute(AuthorizeType = AuthorizeTypes.MustHavePermission, ActionName = "AddNguoiDung")]
        public ActionResult CopyNguoiDung(int pID)
        {
            var isQuyenChonTruong = CommonBase.HasAuthorized("PHAY.MOD.SYS.Controllers.HeThongController", "IsQuyenChonTruong").GetValueOrDefault(false);
            ViewBag.IsChonTruong = isQuyenChonTruong;

            //int pID = int.Parse(EncryptionHelper.DecryptStr(guid));
            ViewBag.IsAdd = true;
            var model = Business.GetOneNguoiDungViewModel(pID);
            model.ID = 0;
            model.HoDem = null;
            model.Ten = null;
            model.TenDangNhap = null;
            model.MatKhau = null;
            model.Email = null;
            model.SoDienThoai = null;
            model.DiaChi = null;

            return View("AddEditNguoiDung", model);
        }

        public ActionResult EditNguoiDung(int pID)
        {
            var isQuyenChonTruong = CommonBase.HasAuthorized("PHAY.MOD.SYS.Controllers.HeThongController", "IsQuyenChonTruong").GetValueOrDefault(false);
            ViewBag.IsChonTruong = isQuyenChonTruong;

            //int pID = int.Parse(EncryptionHelper.DecryptStr(guid));
            ViewBag.IsAdd = false;
            var model = Business.GetOneNguoiDungViewModel(pID);

            return View("AddEditNguoiDung", model);
        }

        [HttpPost]
        public ActionResult EditNguoiDung(AddUpdateNguoiDungViewModel model)
        {
            var isQuyenChonTruong = CommonBase.HasAuthorized("PHAY.MOD.SYS.Controllers.HeThongController", "IsQuyenChonTruong").GetValueOrDefault(false);

            if (ModelState.IsValid)
            {
                int kq = Business.AddUpdateNguoiDung(model, ModelState);
                if (kq <= 0)
                {
                    ModelState.AddModelError("Warning", "Cập nhật không thành công");
                }
            }
            return Json(ModelState.ToDataSourceResult());
        }


        [HttpPost]
        [CMSAuthorizeAttribute(AuthorizeType = AuthorizeTypes.MustHavePermission, ReturnJson = true)]
        public ActionResult DeleteNguoiDung(List<int> models)
        {
            if (models != null && models.Count > 0)
            {
                int[] ids = models.ToArray();
                int kq = Business.DeleteNguoiDung(ids);
                if (kq <= 0)
                {
                    ModelState.AddModelError("Warning", "Xóa không thành công");
                }
            }
            else
            {
                ModelState.AddModelError("Warning", "Chưa chọn dữ liệu để xóa");
            }

            return Json(ModelState.ToDataSourceResult());
        }


        [HttpPost]
        [CMSAuthorizeAttribute(AuthorizeType = AuthorizeTypes.MustHavePermission, ReturnJson = true)]
        public ActionResult DeleteOneNguoiDung(int pID)
        {
            //int id = int.Parse(EncryptionHelper.DecryptStr(guid));
            int[] ids = new int[] { pID };
            int kq = Business.DeleteNguoiDung(ids);
            if (kq <= 0)
            {
                ModelState.AddModelError("Warning", "Không có dữ liệu thay đổi");
            }
            return Json(ModelState.ToDataSourceResult());
        }


        [HttpPost]
        [CMSAuthorizeAttribute(AuthorizeType = AuthorizeTypes.MustHavePermission, ReturnJson = true)]
        public ActionResult ChangeIsActiveNguoiDung(int pID)
        {
            //int id = int.Parse(EncryptionHelper.DecryptStr(guid));
            bool flag = Business.ChangeIsActiveNguoiDung(pID);
            return Json(flag, JsonRequestBehavior.AllowGet);
        }


        public ActionResult DoiThongTinDangNhapNguoiDung(int pID)
        {
            var model = new DoiThongTinDangNhapViewModel();
            var nd = Business.GetOneNguoiDung(pID);
            model.IDNguoiDung = nd.ID;
            model.TenDangNhap = nd.TenDangNhap;
            return View("DoiThongTinDangNhapNguoiDung", model);
        }


        [HttpPost]
        public ActionResult DoiThongTinDangNhapNguoiDung(DoiThongTinDangNhapViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (Business.Context.ACL_NhomNguoiDung.Any(m => m.TenDangNhap == model.TenDangNhap && m.ID != model.IDNguoiDung && m.IsDelete != true))
                {
                    ModelState.AddModelError("Warning", "Tên đăng nhập đã tồn tại. Vùng lòng chọn tên khác");
                }
                else
                {
                    if (model.Password != model.RePassword)
                    {
                        ModelState.AddModelError("Warning", "Mật khẩu mới không khớp");
                    }
                    else
                    {
                        int kq = Business.DoiThongTinDangNhapNguoiDung(model, ModelState);
                        if (kq <= 0)
                        {
                            ModelState.AddModelError("Warning", "Đổi thông tin đăng nhập không thành công");
                        }
                    }
                }

            }
            return Json(ModelState.ToDataSourceResult());
        }

        #endregion

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PHAY.LIB.Security
{
    public static class EncryptionHelper
    {
        #region Property
        private static string _passEncrypt = "[aG]An%@-hG+ee2ky34@!";
        private static string _saltKey = "ij7[xsobI_rXulYjFv-c";
        private static string _VectorIV = "0By@GrXF_t6V[h!kWTg";

        private static CMSEncryption encrytion = new CMSEncryption(_passEncrypt, _saltKey, _VectorIV);
        #endregion

        #region Public Method

        public static string EncryptStr(string plainText)
        {
            try
            {
                plainText = EncodeURL(encrytion.Encrypt(plainText));
                return plainText;
            }
            catch
            {
                return null;
            }
        }

        public static string EncryptStr_2(string plainText)
        {
            try
            {
                plainText = EncodeURL(encrytion.Encrypt(plainText, _passEncrypt));
                return plainText;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public static string EncryptInt(int plainText)
        {
            try
            {
                string pText = EncodeURL(encrytion.Encrypt(plainText.ToString()));
                return pText;
            }
            catch
            {
                return null;
            }
        }

        public static string DecryptStr(string cipherText)
        {
            try
            {
                cipherText = encrytion.Decrypt(DecodeURL(cipherText)).Trim();
                return cipherText;
            }
            catch
            {
                return null;
            }
        }

        public static string DecryptStr_2(string cipherText)
        {
            try
            {
                cipherText = encrytion.Decrypt(DecodeURL(cipherText), _passEncrypt).Trim();
                return cipherText;
            }
            catch
            {
                return null;
            }
        }

        public static int DescryptInt(string cipherText)
        {
            try
            {
                int cpText = Convert.ToInt32(encrytion.Decrypt(DecodeURL(cipherText)).Trim());
                return cpText;
            }
            catch
            {
                return -1;
            }
        }

        public static string EncryptToStr(this string plainText)
        {
            return EncryptStr(plainText);
        }

        public static string EncryptToInt(this int plainText)
        {
            return EncryptInt(plainText);
        }

        public static string DecryptToStr(this string cipherText)
        {
            return DecryptStr(cipherText);
        }

        public static int DescryptToInt(this string cipherText)
        {
            return DescryptInt(cipherText);
        }

        public static string EncryptDES(this string plainText, string publicKey)
        {
            return encrytion.EncryptDES(plainText, publicKey);
        }

        public static string DecryptDES(this string cipherText, string publicKey)
        {
            return encrytion.DecryptDES(cipherText, publicKey);
        }
        #endregion

        #region Private Method

        private static string EncodeURL(string strPlain)
        {
            strPlain = strPlain.Replace('+', '-').Replace('/', '_').Replace("=", "");
            return strPlain;
        }

        private static string DecodeURL(string strCipher)
        {
            if (strCipher.Length % 4 != 0)
            {
                strCipher += new string('=', 4 - (strCipher.Length % 4));
            }
            strCipher = strCipher.Replace('-', '+').Replace('_', '/');
            return strCipher;
        }
        #endregion
    }
}

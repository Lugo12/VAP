using System;
using System.Collections;
using System.Web.Services;

namespace VAP
{
    public partial class Carrito : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static bool GetCarrito(ArrayList productos, float total, int cliente)
        {
            try {

                return true;
            }catch(Exception)
            {
                return false;
            }
        }
    }
}
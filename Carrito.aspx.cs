using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Web.Services;

namespace VAP
{
    public partial class Carrito : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        //clase para usar las propiedades de los objetos producto que vienen del cliente
        public class ProductoFiltrado
        {
            private string int_carrito;
            private string txt_id_variante;
            public string Int_carrito { get => int_carrito; set => int_carrito = value; }
            public string Txt_id_variante { get => txt_id_variante; set => txt_id_variante = value; }
        }
        [WebMethod]
        public static string GetCarrito(List<ProductoFiltrado> productos, decimal total, string id)
        {
            try {
                using (VAP_ProjectEntities db = new VAP_ProjectEntities())
                {
                    db.CreaVentaNueva(DateTime.Now, total, int.Parse(id));   
                    foreach(ProductoFiltrado p in productos)
                    {
                        db.AgrgarProductoVenta(int.Parse(p.Int_carrito), p.Txt_id_variante);
                    }
                    return JsonConvert.SerializeObject("Ok", Formatting.Indented);
                }
            }catch(Exception e)
            {
                return JsonConvert.SerializeObject(e, Formatting.Indented);
            }
        }
    }
}
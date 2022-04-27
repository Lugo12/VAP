using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using Newtonsoft.Json;

namespace VAP
{
    public partial class Default : System.Web.UI.Page
    {
        static string json;     //string que sera enviado a la parte del cliente
        protected void Page_Load(object sender, EventArgs e)
        {
            using (VAP_ProjectEntities db = new VAP_ProjectEntities()) {        //uso de entity framework
                var dbProductos = db.producto.Where(d => d.txt_estado_prenda == "vigente");     //Select de la tabla productos
                List<producto> productos = new List<producto>();

                foreach (var oProducto in dbProductos)      
                {
                    List<variantes_producto> variantes = new List<variantes_producto>();
                    var dbVariantes = db.variantes_producto.Where(d => d.id_prenda == oProducto.id_prenda);

                    foreach (var oVariante in dbVariantes)
                    {
                        variantes.Add(new variantes_producto        //por cada variante de un producto la almacenamos en una Lista
                        {
                            id_prenda = oVariante.id_prenda,
                            id_variante = oVariante.id_variante,
                            int_cantidad_prenda = oVariante.int_cantidad_prenda,
                            txt_id_variante = oVariante.txt_id_variante,
                            txt_talla_prenda = oVariante.txt_talla_prenda,
                            txt_color_prenda = oVariante.txt_color_prenda
                        });
                    }

                    productos.Add(new producto      //por cada producto de la tabla lo almacenamos en la lista de objetos
                    {
                        id_prenda = oProducto.id_prenda,
                        txt_tipo_prenda = oProducto.txt_tipo_prenda,
                        txt_concepto_prenda = oProducto.txt_concepto_prenda,
                        txt_marca_prenda = oProducto.txt_marca_prenda,
                        dec_precio_prenda = oProducto.dec_precio_prenda,
                        img_blanco_prenda = oProducto.img_blanco_prenda,
                        img_negro_prenda = oProducto.img_negro_prenda,
                        txt_estado_prenda = oProducto.txt_estado_prenda,
                        variantes_producto = (ICollection<variantes_producto>)variantes     //almacenamos todas las variantes de un producto
                    });
                }

                json = JsonConvert.SerializeObject(productos, Formatting.Indented);     //Parseamos la lista a formato JSON
            }
        }

        [WebMethod]
        public static string GetCatalogo() { return json; }     //Envio de la cadena JSON al cliente
    }
}
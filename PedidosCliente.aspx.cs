using Newtonsoft.Json;
using System;
using System.Linq;
using System.Web.Services;
using System.Web.UI.WebControls;

namespace VAP
{
    public partial class PedidosCliente : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }
        //Funciones que solicita el cliente
        [WebMethod]
        public static string GetPedidos(string id_cliente)
        {
            try
            {
                using (VAP_ProjectEntities db = new VAP_ProjectEntities())
                {
                    return JsonConvert.SerializeObject(db.GetPedidos(int.Parse(id_cliente)).ToList(), Formatting.Indented);
                }
            }
            catch (Exception e)
            {
                return JsonConvert.SerializeObject(e, Formatting.Indented);
            }
        }
        [WebMethod]
        public static bool DelPedido(string idCliente, string idPedido)
        {
            try
            {
                using (VAP_ProjectEntities db = new VAP_ProjectEntities())
                {
                    db.CancelarPedido(int.Parse(idPedido), int.Parse(idCliente));
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
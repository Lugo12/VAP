using Newtonsoft.Json;
using System;
using System.Linq;
using System.Web.Services;

namespace VAP
{
    public partial class Perfil : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        //Funciones que solicita el cliente
        [WebMethod]
        public static string EditCliente(string id, string nombre, string apellidos, string celular, string correo, string estado)
        {
            try
            {
                using(VAP_ProjectEntities db = new VAP_ProjectEntities())
                {
                    if(estado == "editado")
                    {
                        if (db.ComprobarPass(correo).ToList().Count > 0) return JsonConvert.SerializeObject("correo_existente",Formatting.Indented);
                    }
                    db.EditarInfCliente(int.Parse(id), nombre, apellidos, long.Parse(celular), correo);
                    Default.cliente = JsonConvert.SerializeObject(db.ComprobarPass(correo).ToList(), Formatting.Indented);
                    return JsonConvert.SerializeObject("Ok", Formatting.Indented);
                }
            }
            catch(Exception e)
            {
                return JsonConvert.SerializeObject(e, Formatting.Indented);
            }
        }
    }
}
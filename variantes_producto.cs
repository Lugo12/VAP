//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace VAP
{
    using System;
    using System.Collections.Generic;
    
    public partial class variantes_producto
    {
        public int id_variante { get; set; }
        public string txt_id_variante { get; set; }
        public string txt_color_prenda { get; set; }
        public string txt_talla_prenda { get; set; }
        public int int_cantidad_prenda { get; set; }
        public int id_prenda { get; set; }
    
        public virtual producto producto { get; set; }
    }
}

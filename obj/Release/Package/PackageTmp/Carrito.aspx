<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/MasterPageCliente.Master" AutoEventWireup="true" CodeBehind="Carrito.aspx.cs" Inherits="VAP.Carrito" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%--HEADER CARRITO--%>
    <section class="base head_carrito oculto">
        <h2>Mi Carrito</h2>
    </section>
    <%--BODY CARRITO--%>
    <section class="base body_carrito oculto"></section>
    <%--TEMPLATE CARRITO--%>
    <template id="template_carrito">
        <div class="producto_carrito card text-white">
            <div class="card-header">
                <h4 class="header_carrito"></h4>
            </div>
            <div class="body_carrito card-body">
                <div class="image_carrito"><img src="#" alt="<image failed>"/></div>
                <h5 class="precio_carrito card-text"></h5>
                <p class="texto_carrito card-text"></p>
                <h6 class="cantidad_carrito card-text"></h6>
                <div class="acciones_carrito">
                    <button type="button" class="boton del" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar uno">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <button type="button" class="boton del_All oculto" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Eliminar todo">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    </template>
    <script src="Recursos/js/carrito.js?n=1" type="module"></script>
</asp:Content>

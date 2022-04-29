<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/MasterPageCliente.Master" AutoEventWireup="true" CodeBehind="Carrito.aspx.cs" Inherits="VAP.Carrito" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="base head_carrito oculto">
        <h2>Mi Carrito</h2>
    </section>
    <section class="base body_carrito oculto"></section>
    <template id="template_carrito">
        <div class="producto_carrito card text-white">
            <div class="header_carrito card-header"></div>
            <div class="body_carrito card-body">
                <h4 class="precio_carrito card-title"></h4>
                <p class="texto_carrito card-text"></p>
            </div>
        </div>
    </template>
    <script src="Recursos/js/carrito.js" type="module"></script>
</asp:Content>

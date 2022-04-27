<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/MasterPageCliente.Master" AutoEventWireup="true" CodeBehind="Carrito.aspx.cs" Inherits="VAP.Carrito" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="base head">
        <h2>Mi Carrito</h2>
        <h2 id="totalCarrito"></h2>
    </section>

    <section class="base body_carrito"></section>

    <div class="mensaje mensaje_carrito oculto">
        <h2>Aun no has agregado productos a tu carrito</h2>
    </div>
</asp:Content>

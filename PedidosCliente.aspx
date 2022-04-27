<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/MasterPageCliente.Master" AutoEventWireup="true" CodeBehind="PedidosCliente.aspx.cs" Inherits="VAP.PedidosCliente" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="base">
        <h2>Mis Pedidos</h2>
    </section>

    <section class="base body_pedido_cliente"></section> 

    <div class="mensaje mensaje_pedido_cliente oculto">
        <h2>Parece que no tienes pedidos por el momento</h2>
    </div>
</asp:Content>

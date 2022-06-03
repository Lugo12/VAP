<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/MasterPageCliente.Master" AutoEventWireup="true" CodeBehind="PedidosCliente.aspx.cs" Inherits="VAP.PedidosCliente" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%--HEADER PEDIDOS CLIENTE--%>
    <section class="base oculto head_pedido_cliente">
        <h2>Mis Pedidos</h2>
    </section>
    <%--BODY PEDIDOS CLIENTE--%>
    <section class="base body_pedido_cliente oculto"></section>
    <%--MODAL PEDIDOS--%>
    <div class="modal_pedidos modal fade" id="modal_pedidos" tabindex="-1" aria-labelledby="titulo_modal_pedidos" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="header_modal_pedidos modal-header">
                    <h5 class="modal-title" id="titulo_modal_pedidos"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div class="body_modal_pedidos modal-body"></div>
                <div class="modal-footer">
                    <button type="button" class="boton btn btn-info" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <%--MODAL CONFIRMAR CANCELACIÓN--%>
    <div class="modal_cancel modal fade" id="modal_cancel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="titulo_modal_cancel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="titulo_modal_cancel">¿Cancelar Pedido?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="mensajeCancelacion"></p>
                </div>
                <div class="modal-footer">
                    <button id="cancelarPedido" type="button" class="boton btn btn-success" data-bs-dismiss="modal">Si</button>
                    <button type="button" class="boton btn btn-warning" data-bs-dismiss="modal">No</button>
                </div>
            </div>
        </div>
    </div>
    <%--TEMPLATE PEDIDOS--%>
    <template id="template_pedidos_cliente">
        <div class="pedido_pedidos card text-white">
            <div class="header_pedido_cliente card-header">
                <h3 class="header_pedido text-white"></h3>
            </div>
            <div class="body_pedido card-body">
                <div class="detalles_pedido">
                    <p id="fecha_pp"></p>
                    <p id="total_pp"></p>
                    <h5 class="text-white" id="estado_pp"></h5>
                </div>
                <div class="acciones_pedido"><button type="button" class="boton detalles_pedido_btn btn" data-bs-toggle="modal" data-bs-target="#modal_pedidos">Detalles</button></div>
            </div>            
        </div>
    </template>    
    <%--TEMPLATE DETALLES PEDIDOS--%>
    <template id="template_pedidos_cliente_detalles">
        <article class="producto_pedido">
            <div class="imagen_pp">
                <img id="imagen_pp" src="#" alt="<image failed>" />
            </div>
            <div class="detalles_pp">
                <p id="tipo_pp"></p>
                <p id="marca_pp"></p>
                <p id="precio_pp"></p>
            </div>
            <div class="caracteristicas_pp">
                <p id="color_pp"></p>
                <p id="talla_pp"></p>
                <p id="cantidad_pp"></p>
            </div>
        </article>
    </template>    
    <script src="Recursos/js/pedidosCliente.js?n=1" type="module"></script>
</asp:Content>

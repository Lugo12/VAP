<%@ Page Title="Catálogo" Language="C#" MasterPageFile="~/MasterPages/MasterPageCliente.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="VAP.Default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%--HEADER FILTROS Y ORDERBY--%>
    <section class="base head head_catalogo oculto">
        <div class="btn-group catalogo_tipo" role="group" aria-label="Button group with nested dropdown">
            <button type="button" class="btn btn-primary">Filtro</button>
            <div class="btn-group" role="group">
                <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a class="dropdown-item" id="flt_Todo" href="#">Todo</a>
                    <a class="dropdown-item" id="flt_Sudadera" href="#">Sudadera</a>
                    <a class="dropdown-item" id="flt_Playera" href="#">Playera</a>
                </div>
            </div>
        </div>
        <div class="btn-group catalogo_orden" role="group" aria-label="Button group with nested dropdown">
            <button type="button" class="btn btn-primary">Ordenar por</button>
            <div class="btn-group" role="group">
                <button id="btnGroupDrop2" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop2">
                    <a class="dropdown-item" id="ob_Menor" href="#">Menor Precio</a>
                    <a class="dropdown-item" id="ob_Mayor" href="#">Mayor Precio</a>
                </div>
            </div>
        </div>
    </section>
    <%--BODY DEL CATALOGO--%>
    <section class="body_catalogo oculto"></section>
    <%--MODAL DETALLES--%>
    <div class="modal fade" id="modal_detalles" tabindex="-1" aria-labelledby="titulo_modal_detalles" aria-hidden="true">
        <div class="producto_modal modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="titulo_modal_detalles"></h5>
                    <button type="button" class="cerrar_modal btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="cuerpo_modal modal-body">
                    <div class="imagen_modal">
                        <img id="imagen_modal" src="#" alt="<image failed>" />
                    </div>
                    <div class="contenido_modal">
                        <h2 id="precio_modal"></h2>
                        <p id="concepto_modal"></p>
                        <div class="talla_modal btn-group" role="group" aria-label="Basic radio toggle button group">
                            <div class="radio_modal">
                                <input type="radio" class="btn-check" name="talla" id="btnradioCH" autocomplete="off">
                                <label class="CH btn btn-outline-primary" for="btnradioCH">CH</label>
                            </div>
                            <div class="radio_modal">
                                <input type="radio" class="btn-check" name="talla" id="btnradioM" autocomplete="off">
                                <label class="M btn btn-outline-primary" for="btnradioM">M</label>
                            </div>
                            <div class="radio_modal">
                                <input type="radio" class="btn-check" name="talla" id="btnradioG" autocomplete="off">
                                <label class="G btn btn-outline-primary" for="btnradioG">G</label>
                            </div>
                            <div class="radio_modal">
                                <input type="radio" class="btn-check" name="talla" id="btnradioEG" autocomplete="off">
                                <label class="EG btn btn-outline-primary" for="btnradioEG">EG</label>
                            </div>
                        </div>
                        <p class="p">Color</p>
                        <div class="color_modal btn-group" role="group" aria-label="Basic radio toggle button group">
                            <div class="radio_modal">
                                <input type="radio" class="btn-check" name="color" id="btnradioN" autocomplete="off">
                                <label class="color negro btn btn-outline-primary" for="btnradioN"></label>
                            </div>
                            <div class="radio_modal">
                                <input type="radio" class="btn-check" name="color" id="btnradioB" autocomplete="off">
                                <label class="color blanco btn btn-outline-primary" for="btnradioB"></label>
                            </div>
                        </div>
                        <h5 id="modal_existencias" class="invisible"></h5>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="agregar_carrito" class="boton btn btn-primary disabled" data-bs-dismiss="modal">Agregar al Carrito</button>
                    <button type="button" class="boton cerrar_modal btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                    </div>
            </div>
        </div>
    </div>
    <%--TEMPLATE PRODUCTOS--%>
    <template id="template_catalogo">
        <div class="producto_catalogo card text-white bg-dark">
            <div class="header_producto card-header"></div>
            <div class="image_producto">
                <img src="#" alt="<image failed>" data-bs-toggle="modal" data-bs-target="#modal_detalles">
            </div>
            <div class="card-body">
                <h3 class="title_producto card-title"></h3>    
            </div>
            <button type="button" class="boton detalles_producto btn" data-bs-toggle="modal" data-bs-target="#modal_detalles">Detalles</button>
        </div>
    </template>
    <script type="module" src="Recursos/js/catalogo.js"></script>
</asp:Content>

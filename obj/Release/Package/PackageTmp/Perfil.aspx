<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/MasterPageCliente.Master" AutoEventWireup="true" CodeBehind="Perfil.aspx.cs" Inherits="VAP.Perfil" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%--PERFIL--%>
    <section class="perfil oculto">
        <h3>Información del usuario</h3>
        <article class="datos nombre">
            <span class="perfil_texto">Nombre:</span>
            <span id="nombre_usuario" class="perfil_texto label"></span>
            <input maxlength="20" name="nombre" type="text" class="nombre_usuario input_perfil form-control form-control-sm oculto" id="nombre"/>
        </article>
        <article class="datos apellidos">
            <span class="perfil_texto">Apellidos:</span>
            <span id="apellidos_usuario" class="perfil_texto label"></span>
            <input name="apellidos" maxlength="30" type="text" class="apellidos_usuario input_perfil form-control form-control-sm oculto" id="apellidos"/>
        </article>
        <article class="datos celular">
            <span class="perfil_texto">Celular:</span>
            <span id="celular_usuario" class="perfil_texto label"></span>
            <input maxlength="10" name="telefono" type="text" class="celular_usuario input_perfil form-control form-control-sm oculto" id="celular"/>
        </article>
        <article class="datos correo">
            <span class="perfil_texto">Correo:</span>
            <span id="correo_usuario" class="perfil_texto label"></span>
            <input maxlength="30" name="correo" type="text" class="correo_usuario input_perfil form-control form-control-sm oculto" id="correo"/>
        </article>
        <article class="footer_perfil">
            <input type="button" class="btn boton btn-info btn_perfil" id="editarPerfil" value="Editar" />
            <input type="button" class="btn boton btn-danger btn_perfil oculto" id="cancelarPerfil" value="Cancelar" />
            <input type="button" class="btn boton btn-success btn_perfil oculto" id="guardarPerfil" value="Guardar" />
        </article>
    </section>
    <script src="Recursos/js/perfil.js" type="module"></script>
</asp:Content>

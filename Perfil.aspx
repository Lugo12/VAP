<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPages/MasterPageCliente.Master" AutoEventWireup="true" CodeBehind="Perfil.aspx.cs" Inherits="VAP.Perfil" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%--PERFIL--%>
    <section class="perfil">
        <h3>Información del usuario</h3>
        <article class="datos nombre">
            <span class="perfil_texto">Nombre:</span>
            <span class="perfil_texto nombre_usuario label"></span>
            <input type="text" class="nombre_usuario input_perfil form-control form-control-sm oculto" id="nombre"/>
        </article>
        <article class="datos apellidos">
            <span class="perfil_texto">Apellidos:</span>
            <span class="perfil_texto apellidos_usuario label"></span>
            <input type="text" class="apellidos_usuario input_perfil form-control form-control-sm oculto" id="apellidos"/>
        </article>
        <article class="datos celular">
            <span class="perfil_texto">Celular:</span>
            <span class="perfil_texto celular_usuario label"></span>
            <input type="text" class="celular_usuario input_perfil form-control form-control-sm oculto" id="celular"/>
        </article>
        <article class="datos correo">
            <span class="perfil_texto">Correo:</span>
            <span class="perfil_texto correo_usuario label"></span>
            <input type="text" class="correo_usuario input_perfil form-control form-control-sm oculto" id="correo"/>
        </article>
        <article class="footer_perfil">
            <input type="button" class="btn btn-info btn_perfil" id="editarPerfil" value="Editar" />
            <input type="button" class="btn btn-danger btn_perfil oculto" id="cancelarPerfil" value="Cancelar" />
            <input type="submit" class="btn btn-success btn_perfil oculto" id="guardarPerfil" value="Guardar" />
        </article>
    </section>
    <script src="Recursos/js/perfil.js"></script>
</asp:Content>

USE [master]
GO
/****** Object:  Database [VAP_Project]    Script Date: 03/05/2022 09:37:33 p. m. ******/
CREATE DATABASE [VAP_Project]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'VAP_Project', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\VAP_Project.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'VAP_Project_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\VAP_Project_0.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [VAP_Project] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [VAP_Project].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [VAP_Project] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [VAP_Project] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [VAP_Project] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [VAP_Project] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [VAP_Project] SET ARITHABORT OFF 
GO
ALTER DATABASE [VAP_Project] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [VAP_Project] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [VAP_Project] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [VAP_Project] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [VAP_Project] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [VAP_Project] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [VAP_Project] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [VAP_Project] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [VAP_Project] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [VAP_Project] SET  DISABLE_BROKER 
GO
ALTER DATABASE [VAP_Project] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [VAP_Project] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [VAP_Project] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [VAP_Project] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [VAP_Project] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [VAP_Project] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [VAP_Project] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [VAP_Project] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [VAP_Project] SET  MULTI_USER 
GO
ALTER DATABASE [VAP_Project] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [VAP_Project] SET DB_CHAINING OFF 
GO
ALTER DATABASE [VAP_Project] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [VAP_Project] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [VAP_Project] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [VAP_Project] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'VAP_Project', N'ON'
GO
ALTER DATABASE [VAP_Project] SET QUERY_STORE = OFF
GO
USE [VAP_Project]
GO
/****** Object:  Table [dbo].[administrador]    Script Date: 03/05/2022 09:37:38 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[administrador](
	[id_administrador] [int] IDENTITY(1,1) NOT NULL,
	[txt_correo_admin] [varchar](45) NOT NULL,
	[txt_contraseña_admin] [varbinary](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_administrador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cliente]    Script Date: 03/05/2022 09:37:38 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cliente](
	[id_cliente] [int] IDENTITY(1,1) NOT NULL,
	[txt_nombre_cliente] [varchar](20) NOT NULL,
	[txt_apellidos_cliente] [varchar](40) NOT NULL,
	[int_celular_cliente] [bigint] NOT NULL,
	[txt_correo_cliente] [varchar](45) NOT NULL,
	[txt_contraseña_cliente] [varbinary](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_cliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[pedido]    Script Date: 03/05/2022 09:37:38 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[pedido](
	[id_pedido] [int] IDENTITY(1,1) NOT NULL,
	[d_fecha_pedido] [date] NOT NULL,
	[dec_total_pedido] [decimal](8, 2) NOT NULL,
	[txt_estado_pedido] [varchar](9) NOT NULL,
	[id_cliente] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_pedido] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[producto]    Script Date: 03/05/2022 09:37:38 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[producto](
	[id_prenda] [int] IDENTITY(1,1) NOT NULL,
	[txt_tipo_prenda] [varchar](8) NOT NULL,
	[txt_concepto_prenda] [varchar](45) NOT NULL,
	[txt_marca_prenda] [varchar](20) NOT NULL,
	[dec_precio_prenda] [decimal](6, 2) NOT NULL,
	[img_blanco_prenda] [varchar](100) NOT NULL,
	[img_negro_prenda] [varchar](100) NOT NULL,
	[txt_estado_prenda] [varchar](13) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_prenda] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[producto_seleccionado]    Script Date: 03/05/2022 09:37:38 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[producto_seleccionado](
	[int_cantidad_subpedido] [int] NOT NULL,
	[txt_id_variante] [varchar](6) NOT NULL,
	[id_pedido] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[variantes_producto]    Script Date: 03/05/2022 09:37:38 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[variantes_producto](
	[id_variante] [int] IDENTITY(1,1) NOT NULL,
	[txt_id_variante] [varchar](6) NOT NULL,
	[txt_color_prenda] [varchar](6) NOT NULL,
	[txt_talla_prenda] [varchar](2) NOT NULL,
	[int_cantidad_prenda] [int] NOT NULL,
	[id_prenda] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_variante] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[venta]    Script Date: 03/05/2022 09:37:38 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[venta](
	[id_venta] [int] IDENTITY(1,1) NOT NULL,
	[id_pedido] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_venta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[cliente] ON 

INSERT [dbo].[cliente] ([id_cliente], [txt_nombre_cliente], [txt_apellidos_cliente], [int_celular_cliente], [txt_correo_cliente], [txt_contraseña_cliente]) VALUES (1, N'Daniel', N'Flores', 5510197267, N'daniel_eduardo02@gmail.com', 0x02000000D2FC469898DD8DF8439A6B41D994392F79E62B11B2877DA0083126D0E00F235A3372FAB45BC13F30C8C2399DE9D7AFE4)
INSERT [dbo].[cliente] ([id_cliente], [txt_nombre_cliente], [txt_apellidos_cliente], [int_celular_cliente], [txt_correo_cliente], [txt_contraseña_cliente]) VALUES (2, N'Brenda', N'Guerrero', 55958473, N'vgsky@gmail.com', 0x02000000770D70D1BBC81E6CFA17F1C3EAA366DF353C4E011D40C9E9CF31CF4208B46926)
INSERT [dbo].[cliente] ([id_cliente], [txt_nombre_cliente], [txt_apellidos_cliente], [int_celular_cliente], [txt_correo_cliente], [txt_contraseña_cliente]) VALUES (3, N'cliente2', N'simon', 551459729, N'gagag8wiw@hotmail.com', 0x02000000B89A61F3571B6CD8F0377FD09F9FE36CDBCFDB75A747CC6A0EA9DB8574CD33AC)
SET IDENTITY_INSERT [dbo].[cliente] OFF
GO
SET IDENTITY_INSERT [dbo].[pedido] ON 

INSERT [dbo].[pedido] ([id_pedido], [d_fecha_pedido], [dec_total_pedido], [txt_estado_pedido], [id_cliente]) VALUES (1, CAST(N'2021-12-16' AS Date), CAST(800.00 AS Decimal(8, 2)), N'pendiente', 1)
INSERT [dbo].[pedido] ([id_pedido], [d_fecha_pedido], [dec_total_pedido], [txt_estado_pedido], [id_cliente]) VALUES (2, CAST(N'2021-12-16' AS Date), CAST(550.00 AS Decimal(8, 2)), N'pendiente', 1)
INSERT [dbo].[pedido] ([id_pedido], [d_fecha_pedido], [dec_total_pedido], [txt_estado_pedido], [id_cliente]) VALUES (3, CAST(N'2021-12-16' AS Date), CAST(400.00 AS Decimal(8, 2)), N'pendiente', 1)
SET IDENTITY_INSERT [dbo].[pedido] OFF
GO
SET IDENTITY_INSERT [dbo].[producto] ON 

INSERT [dbo].[producto] ([id_prenda], [txt_tipo_prenda], [txt_concepto_prenda], [txt_marca_prenda], [dec_precio_prenda], [img_blanco_prenda], [img_negro_prenda], [txt_estado_prenda]) VALUES (1, N'sudadera', N'Sudadera sin mangas Rocky', N'HC', CAST(400.00 AS Decimal(6, 2)), N'Imagenes/sudaderaRokcy mamadoHCBlanco.png', N'Imagenes/sudaderaRokcy mamadoHCNegro.png', N'vigente')
INSERT [dbo].[producto] ([id_prenda], [txt_tipo_prenda], [txt_concepto_prenda], [txt_marca_prenda], [dec_precio_prenda], [img_blanco_prenda], [img_negro_prenda], [txt_estado_prenda]) VALUES (2, N'playera', N'Playera personaje Rei Ayanami', N'Eva00', CAST(150.00 AS Decimal(6, 2)), N'Imagenes/playeraRei AyanamiEva00Blanco.jpg', N'Imagenes/playeraRei AyanamiEva00Negro.jpg', N'vigente')
INSERT [dbo].[producto] ([id_prenda], [txt_tipo_prenda], [txt_concepto_prenda], [txt_marca_prenda], [dec_precio_prenda], [img_blanco_prenda], [img_negro_prenda], [txt_estado_prenda]) VALUES (3, N'sudadera', N'Sudadera casual', N'Zara', CAST(300.00 AS Decimal(6, 2)), N'Imagenes/sudaderaSimpleZaraBlanco.jpg', N'Imagenes/sudaderaSimpleZaraNegro.jpg', N'vigente')
INSERT [dbo].[producto] ([id_prenda], [txt_tipo_prenda], [txt_concepto_prenda], [txt_marca_prenda], [dec_precio_prenda], [img_blanco_prenda], [img_negro_prenda], [txt_estado_prenda]) VALUES (4, N'sudadera', N'Sudadera para hombre', N'Shein', CAST(450.00 AS Decimal(6, 2)), N'Imagenes/sudaderaNasaSheinBlanco.png', N'Imagenes/sudaderaNasaSheinNegro.png', N'vigente')
INSERT [dbo].[producto] ([id_prenda], [txt_tipo_prenda], [txt_concepto_prenda], [txt_marca_prenda], [dec_precio_prenda], [img_blanco_prenda], [img_negro_prenda], [txt_estado_prenda]) VALUES (5, N'sudadera', N'Sudadera con estampado de Sol', N'Shein', CAST(350.00 AS Decimal(6, 2)), N'Imagenes/sudaderaSolSheinBlanco.png', N'Imagenes/sudaderaSolSheinNegro.png', N'vigente')
INSERT [dbo].[producto] ([id_prenda], [txt_tipo_prenda], [txt_concepto_prenda], [txt_marca_prenda], [dec_precio_prenda], [img_blanco_prenda], [img_negro_prenda], [txt_estado_prenda]) VALUES (6, N'sudadera', N'Sudadera Vandal', N'Shein', CAST(450.00 AS Decimal(6, 2)), N'Imagenes/sudaderaVandalSheinBlanco.png', N'Imagenes/sudaderaVandalSheinNegro.png', N'vigente')
INSERT [dbo].[producto] ([id_prenda], [txt_tipo_prenda], [txt_concepto_prenda], [txt_marca_prenda], [dec_precio_prenda], [img_blanco_prenda], [img_negro_prenda], [txt_estado_prenda]) VALUES (7, N'playera', N'Sudadera estilo anime', N'Datsuki', CAST(140.00 AS Decimal(6, 2)), N'Imagenes/playeraAnimeDatsukiBlanco.png', N'Imagenes/playeraAnimeDatsukiNegro.png', N'vigente')
INSERT [dbo].[producto] ([id_prenda], [txt_tipo_prenda], [txt_concepto_prenda], [txt_marca_prenda], [dec_precio_prenda], [img_blanco_prenda], [img_negro_prenda], [txt_estado_prenda]) VALUES (8, N'sudadera', N'Sudadera Rokcy', N'HC', CAST(600.00 AS Decimal(6, 2)), N'Imagenes/sudaderaRokcyHCBlanco.png', N'Imagenes/sudaderaRokcyHCNegro.png', N'vigente')
SET IDENTITY_INSERT [dbo].[producto] OFF
GO
INSERT [dbo].[producto_seleccionado] ([int_cantidad_subpedido], [txt_id_variante], [id_pedido]) VALUES (1, N'1CHB', 1)
INSERT [dbo].[producto_seleccionado] ([int_cantidad_subpedido], [txt_id_variante], [id_pedido]) VALUES (1, N'2MB', 1)
INSERT [dbo].[producto_seleccionado] ([int_cantidad_subpedido], [txt_id_variante], [id_pedido]) VALUES (2, N'1CHB', 2)
INSERT [dbo].[producto_seleccionado] ([int_cantidad_subpedido], [txt_id_variante], [id_pedido]) VALUES (1, N'2CHN', 2)
INSERT [dbo].[producto_seleccionado] ([int_cantidad_subpedido], [txt_id_variante], [id_pedido]) VALUES (3, N'1CHN', 3)
GO
SET IDENTITY_INSERT [dbo].[variantes_producto] ON 

INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (1, N'1CHB', N'blanco', N'CH', 30, 1)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (2, N'1CHN', N'negro', N'CH', 30, 1)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (3, N'1MB', N'blanco', N'M', 30, 1)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (4, N'1MN', N'negro', N'M', 30, 1)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (5, N'1GB', N'blanco', N'G', 30, 1)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (6, N'1GN', N'negro', N'G', 30, 1)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (7, N'1EGB', N'blanco', N'EG', 30, 1)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (8, N'1EGN', N'negro', N'EG', 30, 1)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (9, N'2CHB', N'blanco', N'CH', 30, 2)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (10, N'2CHN', N'negro', N'CH', 30, 2)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (11, N'2MB', N'blanco', N'M', 30, 2)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (12, N'2MN', N'negro', N'M', 30, 2)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (13, N'2GB', N'blanco', N'G', 30, 2)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (14, N'2GN', N'negro', N'G', 30, 2)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (15, N'2EGB', N'blanco', N'EG', 30, 2)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (16, N'2EGN', N'negro', N'EG', 30, 2)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (17, N'3CHB', N'blanco', N'CH', 30, 3)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (18, N'3CHN', N'negro', N'CH', 30, 3)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (19, N'3MB', N'blanco', N'M', 30, 3)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (20, N'3MN', N'negro', N'M', 30, 3)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (21, N'3GB', N'blanco', N'G', 30, 3)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (22, N'3GN', N'negro', N'G', 30, 3)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (23, N'3EGB', N'blanco', N'EG', 30, 3)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (24, N'3EGN', N'negro', N'EG', 30, 3)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (25, N'4CHB', N'blanco', N'CH', 30, 4)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (26, N'4CHN', N'negro', N'CH', 30, 4)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (27, N'4MB', N'blanco', N'M', 30, 4)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (28, N'4MN', N'negro', N'M', 30, 4)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (29, N'4GB', N'blanco', N'G', 30, 4)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (30, N'4GN', N'negro', N'G', 30, 4)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (31, N'4EGB', N'blanco', N'EG', 30, 4)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (32, N'4EGN', N'negro', N'EG', 30, 4)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (33, N'5CHB', N'blanco', N'CH', 30, 5)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (34, N'5CHN', N'negro', N'CH', 30, 5)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (35, N'5MB', N'blanco', N'M', 30, 5)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (36, N'5MN', N'negro', N'M', 30, 5)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (37, N'5GB', N'blanco', N'G', 30, 5)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (38, N'5GN', N'negro', N'G', 30, 5)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (39, N'5EGB', N'blanco', N'EG', 30, 5)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (40, N'5EGN', N'negro', N'EG', 30, 5)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (41, N'6CHB', N'blanco', N'CH', 30, 6)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (42, N'6CHN', N'negro', N'CH', 30, 6)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (43, N'6MB', N'blanco', N'M', 30, 6)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (44, N'6MN', N'negro', N'M', 30, 6)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (45, N'6GB', N'blanco', N'G', 30, 6)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (46, N'6GN', N'negro', N'G', 30, 6)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (47, N'6EGB', N'blanco', N'EG', 30, 6)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (48, N'6EGN', N'negro', N'EG', 30, 6)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (49, N'7CHB', N'blanco', N'CH', 30, 7)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (50, N'7CHN', N'negro', N'CH', 30, 7)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (51, N'7MB', N'blanco', N'M', 30, 7)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (52, N'7MN', N'negro', N'M', 30, 7)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (53, N'7GB', N'blanco', N'G', 30, 7)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (54, N'7GN', N'negro', N'G', 30, 7)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (55, N'7EGB', N'blanco', N'EG', 30, 7)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (56, N'7EGN', N'negro', N'EG', 30, 7)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (57, N'8CHB', N'blanco', N'CH', 30, 8)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (58, N'8CHN', N'negro', N'CH', 30, 8)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (59, N'8MB', N'blanco', N'M', 30, 8)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (60, N'8MN', N'negro', N'M', 30, 8)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (61, N'8GB', N'blanco', N'G', 30, 8)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (62, N'8GN', N'negro', N'G', 30, 8)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (63, N'8EGB', N'blanco', N'EG', 30, 8)
INSERT [dbo].[variantes_producto] ([id_variante], [txt_id_variante], [txt_color_prenda], [txt_talla_prenda], [int_cantidad_prenda], [id_prenda]) VALUES (64, N'8EGN', N'negro', N'EG', 30, 8)
SET IDENTITY_INSERT [dbo].[variantes_producto] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK_VARIANTES_PRODUCTO_TXT_ID_VARIANTE]    Script Date: 03/05/2022 09:37:39 p. m. ******/
ALTER TABLE [dbo].[variantes_producto] ADD  CONSTRAINT [UK_VARIANTES_PRODUCTO_TXT_ID_VARIANTE] UNIQUE NONCLUSTERED 
(
	[txt_id_variante] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[pedido] ADD  DEFAULT ('pendiente') FOR [txt_estado_pedido]
GO
ALTER TABLE [dbo].[producto] ADD  DEFAULT ('vigente') FOR [txt_estado_prenda]
GO
ALTER TABLE [dbo].[pedido]  WITH CHECK ADD  CONSTRAINT [fk_pedido_cliente] FOREIGN KEY([id_cliente])
REFERENCES [dbo].[cliente] ([id_cliente])
GO
ALTER TABLE [dbo].[pedido] CHECK CONSTRAINT [fk_pedido_cliente]
GO
ALTER TABLE [dbo].[producto_seleccionado]  WITH CHECK ADD  CONSTRAINT [fk_pedido_completo] FOREIGN KEY([id_pedido])
REFERENCES [dbo].[pedido] ([id_pedido])
GO
ALTER TABLE [dbo].[producto_seleccionado] CHECK CONSTRAINT [fk_pedido_completo]
GO
ALTER TABLE [dbo].[producto_seleccionado]  WITH CHECK ADD  CONSTRAINT [fk_producto_pedido] FOREIGN KEY([txt_id_variante])
REFERENCES [dbo].[variantes_producto] ([txt_id_variante])
GO
ALTER TABLE [dbo].[producto_seleccionado] CHECK CONSTRAINT [fk_producto_pedido]
GO
ALTER TABLE [dbo].[variantes_producto]  WITH CHECK ADD  CONSTRAINT [fk_variante_prenda] FOREIGN KEY([id_prenda])
REFERENCES [dbo].[producto] ([id_prenda])
GO
ALTER TABLE [dbo].[variantes_producto] CHECK CONSTRAINT [fk_variante_prenda]
GO
ALTER TABLE [dbo].[venta]  WITH CHECK ADD  CONSTRAINT [fk_venta_pedido] FOREIGN KEY([id_pedido])
REFERENCES [dbo].[pedido] ([id_pedido])
GO
ALTER TABLE [dbo].[venta] CHECK CONSTRAINT [fk_venta_pedido]
GO
ALTER TABLE [dbo].[pedido]  WITH CHECK ADD CHECK  (([txt_estado_pedido]='cancelado' OR [txt_estado_pedido]='entregado' OR [txt_estado_pedido]='enviado' OR [txt_estado_pedido]='empacado' OR [txt_estado_pedido]='pendiente'))
GO
ALTER TABLE [dbo].[producto]  WITH CHECK ADD CHECK  (([txt_estado_prenda]='descontinuado' OR [txt_estado_prenda]='vigente'))
GO
ALTER TABLE [dbo].[producto]  WITH CHECK ADD CHECK  (([txt_tipo_prenda]='sudadera' OR [txt_tipo_prenda]='playera'))
GO
ALTER TABLE [dbo].[variantes_producto]  WITH CHECK ADD CHECK  (([txt_color_prenda]='blanco' OR [txt_color_prenda]='negro'))
GO
ALTER TABLE [dbo].[variantes_producto]  WITH CHECK ADD CHECK  (([txt_talla_prenda]='EG' OR [txt_talla_prenda]='G' OR [txt_talla_prenda]='M' OR [txt_talla_prenda]='CH'))
GO
/****** Object:  StoredProcedure [dbo].[AgrgarProductoVenta]    Script Date: 03/05/2022 09:37:39 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[AgrgarProductoVenta] 
	-- Add the parameters for the stored procedure here
	@cantidad int,
	@idVariante VARCHAR(6)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    Declare @venta int;
	set @venta = (select max(pedido.id_pedido) from pedido);

	insert into producto_seleccionado
	([int_cantidad_subpedido],[txt_id_variante],[id_pedido])
	values 
	(@cantidad, @idVariante,@venta);

	declare @cantExist int;
	set @cantExist =(select variantes_producto.int_cantidad_prenda 
	from variantes_producto
	where txt_id_variante = @idVariante);

	update variantes_producto set 
	int_cantidad_prenda =(@cantExist - @cantidad)
	where txt_id_variante = @idVariante

END
GO
/****** Object:  StoredProcedure [dbo].[CancelarPedido]    Script Date: 03/05/2022 09:37:39 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[CancelarPedido]
	-- Add the parameters for the stored procedure here
	@idPedido int, 
	@idCliente int 

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	UPDATE pedido SET 
	txt_estado_pedido = 'cancelado'
	where id_cliente = @idCliente 
	and id_pedido = @idPedido
	
END
GO
/****** Object:  StoredProcedure [dbo].[ComprobarPass]    Script Date: 03/05/2022 09:37:39 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ComprobarPass]
	-- Add the parameters for the stored procedure here
	@correo varchar(40) 
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @llave nvarchar(128)
	SET @llave = 'encryp';  
	


	select *, Pass=CONVERT(varchar(max), 
	DECRYPTBYPASSPHRASE(@llave ,cliente.txt_contraseña_cliente)) 
	from cliente 
	where txt_correo_cliente = @correo 
    
END
GO
/****** Object:  StoredProcedure [dbo].[CrearCliente]    Script Date: 03/05/2022 09:37:39 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[CrearCliente]
	-- Add the parameters for the stored procedure here
	
	@nombre_cliente VARCHAR(20),
	@apellidos_cliente VARCHAR(40),
	@celular_cliente BIGINT,
	@correo_cliente VARCHAR(45),
	@contraseña_cliente VARCHAR(MAX)

AS
BEGIN
	
	SET NOCOUNT ON;
	 
	declare @pss VARBINARY(MAX)
	set @pss = (ENCRYPTBYPASSPHRASE('encryp',@contraseña_cliente))
	
	IF NOT EXISTS (select cliente.txt_correo_cliente from cliente where cliente.txt_correo_cliente = @correo_cliente)
	BEGIN
		INSERT INTO cliente
		([txt_nombre_cliente],
		[txt_apellidos_cliente],
		[int_celular_cliente],
		[txt_correo_cliente],
		[txt_contraseña_cliente])
		values
		(@nombre_cliente, 
		@apellidos_cliente,
		@celular_cliente,
		@correo_cliente, 
		@pss);
		select*from cliente
	END
END
GO
/****** Object:  StoredProcedure [dbo].[CrearProducto]    Script Date: 03/05/2022 09:37:39 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[CrearProducto]
	
	@txt_tipo_prenda VARCHAR(8),
	@txt_concepto_prenda VARCHAR(45),
	@txt_marca_prenda VARCHAR(20),
	@dec_precio_prenda DECIMAL(6,2),
	@img_blanco_prenda VARCHAR(100),
	@img_negro_prenda VARCHAR(100),
	@txt_estado_prenda VARCHAR(13)

AS
BEGIN

	SET NOCOUNT ON;
	
	INSERT INTO producto
	([txt_tipo_prenda],
	[txt_concepto_prenda],
	[txt_marca_prenda],
	[dec_precio_prenda],
	[img_blanco_prenda],
	[img_negro_prenda],
	[txt_estado_prenda])
	VALUES 
	(@txt_tipo_prenda,
	@txt_concepto_prenda,
	@txt_marca_prenda,
	@dec_precio_prenda,
	@img_blanco_prenda,
	@img_negro_prenda,
	@txt_estado_prenda) 
   
END
GO
/****** Object:  StoredProcedure [dbo].[CrearVariante]    Script Date: 03/05/2022 09:37:39 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[CrearVariante]
	-- Add the parameters for the stored procedure here
	@txt_color_prenda VARCHAR(6),
	@txt_talla_prenda VARCHAR(2),
	@int_cantidad_prenda INT,
	@idVariante  VARCHAR(6),
	@idprenda int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    insert variantes_producto 
	([txt_id_variante],[txt_color_prenda],[txt_talla_prenda],[int_cantidad_prenda],[id_prenda])
	values
	(@idVariante, @txt_color_prenda,@txt_talla_prenda,@int_cantidad_prenda,@idprenda)
END
GO
/****** Object:  StoredProcedure [dbo].[CreaVentaNueva]    Script Date: 03/05/2022 09:37:39 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[CreaVentaNueva]
	-- Add the parameters for the stored procedure here
	@fecha_pedido DATE,
    @total_pedido DECIMAL(8,2),
    @id_cliente int 


AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    insert into pedido 
	([d_fecha_pedido],[dec_total_pedido],[txt_estado_pedido],[id_cliente])
	values 
	(@fecha_pedido,@total_pedido,'pendiente', @id_cliente)
END
GO
/****** Object:  StoredProcedure [dbo].[EditarInfCliente]    Script Date: 03/05/2022 09:37:39 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EditarInfCliente]
	-- Add the parameters for the stored procedure here
	@idcliente int,
	@nomCliente VARCHAR(20),
	@ApeCliente VARCHAR(40),
	@celClietne bigint,
	@correoCliente VARCHAR(45)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   Update cliente set 
   txt_nombre_cliente = @nomCliente,
   txt_apellidos_cliente = @ApeCliente,
   int_celular_cliente =  @celClietne,
   txt_correo_cliente = @correoCliente
   where id_cliente = @idcliente;
END
GO
/****** Object:  StoredProcedure [dbo].[GetPedidos]    Script Date: 03/05/2022 09:37:39 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetPedidos] 
	-- Add the parameters for the stored procedure here
	@id_cliente int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
	pedido.id_pedido,
	d_fecha_pedido,
	dec_total_pedido,
	txt_estado_pedido,
	txt_tipo_prenda,
	txt_marca_prenda,
	dec_precio_prenda,
	img_blanco_prenda,
	img_negro_prenda,
	txt_color_prenda,
	txt_talla_prenda,
	int_cantidad_subpedido,
	pedido.id_cliente
	from producto_seleccionado 
	join pedido on producto_seleccionado.id_pedido = pedido.id_pedido 
	join variantes_producto on producto_seleccionado.txt_id_variante = variantes_producto.txt_id_variante
	join producto on variantes_producto.id_prenda = producto.id_prenda 
	where pedido.id_cliente = @id_cliente
	order by d_fecha_pedido

END
GO
USE [master]
GO
ALTER DATABASE [VAP_Project] SET  READ_WRITE 
GO

USE [master]
GO
/****** Object:  Database [eCanteen09242015]    Script Date: 9/24/2015 8:51:24 PM ******/
CREATE DATABASE [eCanteen09242015]
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [eCanteen09242015].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [eCanteen09242015] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [eCanteen09242015] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [eCanteen09242015] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [eCanteen09242015] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [eCanteen09242015] SET ARITHABORT OFF 
GO
ALTER DATABASE [eCanteen09242015] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [eCanteen09242015] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [eCanteen09242015] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [eCanteen09242015] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [eCanteen09242015] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [eCanteen09242015] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [eCanteen09242015] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [eCanteen09242015] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [eCanteen09242015] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [eCanteen09242015] SET  DISABLE_BROKER 
GO
ALTER DATABASE [eCanteen09242015] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [eCanteen09242015] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [eCanteen09242015] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [eCanteen09242015] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [eCanteen09242015] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [eCanteen09242015] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [eCanteen09242015] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [eCanteen09242015] SET RECOVERY FULL 
GO
ALTER DATABASE [eCanteen09242015] SET  MULTI_USER 
GO
ALTER DATABASE [eCanteen09242015] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [eCanteen09242015] SET DB_CHAINING OFF 
GO
ALTER DATABASE [eCanteen09242015] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [eCanteen09242015] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [eCanteen09242015] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'eCanteen09242015', N'ON'
GO
USE [eCanteen09242015]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 9/24/2015 8:51:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Email] [nvarchar](256) NOT NULL,
	[Contact] [nvarchar](11) NOT NULL,
	[Employer] [nvarchar](256) NULL,
	[Password] [nvarchar](64) NOT NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[FoodItem]    Script Date: 9/24/2015 8:51:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FoodItem](
	[Id] [uniqueidentifier] NOT NULL,
	[VendorId] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[Availability] [bit] NOT NULL,
 CONSTRAINT [PK_FoodItem] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Menu]    Script Date: 9/24/2015 8:51:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Menu](
	[Id] [uniqueidentifier] NOT NULL,
	[Type] [nvarchar](50) NOT NULL,
	[VendorId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Menu] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MenuFoodItem]    Script Date: 9/24/2015 8:51:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MenuFoodItem](
	[Id] [uniqueidentifier] NOT NULL,
	[MenuId] [uniqueidentifier] NOT NULL,
	[FoodItemId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_MenuFoodItem] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Order]    Script Date: 9/24/2015 8:51:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[Id] [uniqueidentifier] NOT NULL,
	[CustomerId] [uniqueidentifier] NOT NULL,
	[VenderId] [uniqueidentifier] NOT NULL,
	[SubTotal] [decimal](18, 2) NOT NULL,
	[ServiceTax] [decimal](18, 2) NOT NULL,
	[Vat] [decimal](18, 2) NOT NULL,
	[Discount] [decimal](18, 2) NOT NULL,
	[Total] [decimal](18, 2) NOT NULL,
	[TimeSlot] [int] NOT NULL,
	[Status] [int] NOT NULL,
	[PaymentStatus] [int] NOT NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[OrderItem]    Script Date: 9/24/2015 8:51:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderItem](
	[Id] [uniqueidentifier] NOT NULL,
	[OrderId] [uniqueidentifier] NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[Quantity] [int] NOT NULL,
	[FoodItemId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_OrderItem] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Payment]    Script Date: 9/24/2015 8:51:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[Id] [uniqueidentifier] NOT NULL,
	[OrderId] [uniqueidentifier] NOT NULL,
	[Amount] [decimal](18, 2) NOT NULL,
	[PaymentStatus] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_Payment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Site]    Script Date: 9/24/2015 8:51:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Site](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Address] [nvarchar](256) NOT NULL,
	[Contact] [nvarchar](11) NULL,
	[Owner] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_Site] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Vendor]    Script Date: 9/24/2015 8:51:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vendor](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Email] [nvarchar](256) NOT NULL,
	[Contact] [nvarchar](11) NOT NULL,
	[Password] [nvarchar](64) NOT NULL,
	[SiteId] [uniqueidentifier] NOT NULL,
	[ShopNo] [nvarchar](8) NULL,
 CONSTRAINT [PK_Vendor] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Index [IX_Order]    Script Date: 9/24/2015 8:51:24 PM ******/
CREATE NONCLUSTERED INDEX [IX_Order] ON [dbo].[Order]
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[FoodItem]  WITH CHECK ADD  CONSTRAINT [FK_FoodItem_Vendor] FOREIGN KEY([VendorId])
REFERENCES [dbo].[Vendor] ([Id])
GO
ALTER TABLE [dbo].[FoodItem] CHECK CONSTRAINT [FK_FoodItem_Vendor]
GO
ALTER TABLE [dbo].[Menu]  WITH CHECK ADD  CONSTRAINT [FK_Menu_Vendor] FOREIGN KEY([VendorId])
REFERENCES [dbo].[Vendor] ([Id])
GO
ALTER TABLE [dbo].[Menu] CHECK CONSTRAINT [FK_Menu_Vendor]
GO
ALTER TABLE [dbo].[MenuFoodItem]  WITH CHECK ADD  CONSTRAINT [FK_MenuFoodItem_FoodItem] FOREIGN KEY([FoodItemId])
REFERENCES [dbo].[FoodItem] ([Id])
GO
ALTER TABLE [dbo].[MenuFoodItem] CHECK CONSTRAINT [FK_MenuFoodItem_FoodItem]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Customer_Order] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customer] ([Id])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Customer_Order]
GO
ALTER TABLE [dbo].[OrderItem]  WITH CHECK ADD  CONSTRAINT [FK_OrderItem_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Order] ([Id])
GO
ALTER TABLE [dbo].[OrderItem] CHECK CONSTRAINT [FK_OrderItem_Order]
GO
ALTER TABLE [dbo].[Payment]  WITH CHECK ADD  CONSTRAINT [FK_Payment_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Order] ([Id])
GO
ALTER TABLE [dbo].[Payment] CHECK CONSTRAINT [FK_Payment_Order]
GO
ALTER TABLE [dbo].[Vendor]  WITH CHECK ADD  CONSTRAINT [FK_Vendor_Site] FOREIGN KEY([SiteId])
REFERENCES [dbo].[Site] ([Id])
GO
ALTER TABLE [dbo].[Vendor] CHECK CONSTRAINT [FK_Vendor_Site]
GO
USE [master]
GO
ALTER DATABASE [eCanteen09242015] SET  READ_WRITE 
GO

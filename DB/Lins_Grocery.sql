USE [master]
GO
/****** Object:  Database [LinsGrocery]    Script Date: 15/05/2023 23:57:42 ******/
CREATE DATABASE [LinsGrocery]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'LinsGrocery', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\LinsGrocery.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'LinsGrocery_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\LinsGrocery_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [LinsGrocery] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [LinsGrocery].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [LinsGrocery] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [LinsGrocery] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [LinsGrocery] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [LinsGrocery] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [LinsGrocery] SET ARITHABORT OFF 
GO
ALTER DATABASE [LinsGrocery] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [LinsGrocery] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [LinsGrocery] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [LinsGrocery] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [LinsGrocery] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [LinsGrocery] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [LinsGrocery] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [LinsGrocery] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [LinsGrocery] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [LinsGrocery] SET  DISABLE_BROKER 
GO
ALTER DATABASE [LinsGrocery] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [LinsGrocery] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [LinsGrocery] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [LinsGrocery] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [LinsGrocery] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [LinsGrocery] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [LinsGrocery] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [LinsGrocery] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [LinsGrocery] SET  MULTI_USER 
GO
ALTER DATABASE [LinsGrocery] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [LinsGrocery] SET DB_CHAINING OFF 
GO
ALTER DATABASE [LinsGrocery] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [LinsGrocery] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [LinsGrocery] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [LinsGrocery] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [LinsGrocery] SET QUERY_STORE = ON
GO
ALTER DATABASE [LinsGrocery] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [LinsGrocery]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 15/05/2023 23:57:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[category_id] [int] IDENTITY(1,1) NOT NULL,
	[category_name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 15/05/2023 23:57:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employees](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[user_name] [varchar](50) NOT NULL,
	[first_name] [varchar](50) NOT NULL,
	[last_name] [varchar](50) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[password] [varchar](100) NOT NULL,
	[job_title] [varchar](50) NOT NULL,
	[is_active] [bit] NOT NULL,
	[date_created] [datetime] NOT NULL,
 CONSTRAINT [PK_Employees] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 15/05/2023 23:57:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[product_id] [int] IDENTITY(1,1) NOT NULL,
	[product_title] [nvarchar](100) NOT NULL,
	[product_name] [nvarchar](100) NOT NULL,
	[category_id] [int] NOT NULL,
	[product_description] [nvarchar](max) NOT NULL,
	[product_weight] [decimal](10, 2) NOT NULL,
	[product_weight_msr] [nvarchar](5) NOT NULL,
	[unit_price] [money] NOT NULL,
	[image_data] [nvarchar](max) NOT NULL,
	[units_in_stock] [smallint] NOT NULL,
	[quantity_per_unit] [int] NOT NULL,
	[discontinued] [bit] NOT NULL,
	[discount] [int] NOT NULL,
	[product_extra] [nvarchar](50) NULL,
	[product_current_price] [money] NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserCart]    Script Date: 15/05/2023 23:57:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserCart](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[product_id] [int] NOT NULL,
	[quantity] [int] NOT NULL,
 CONSTRAINT [PK_UserCart_1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 15/05/2023 23:57:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[user_name] [nvarchar](50) NOT NULL,
	[user_email] [nvarchar](50) NOT NULL,
	[user_password] [nvarchar](255) NOT NULL,
	[user_type] [nvarchar](10) NULL,
	[jwt_token] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Categories] ON 

INSERT [dbo].[Categories] ([category_id], [category_name]) VALUES (1, N'Fruits')
INSERT [dbo].[Categories] ([category_id], [category_name]) VALUES (2, N'Vegetables')
INSERT [dbo].[Categories] ([category_id], [category_name]) VALUES (3, N'Meat & Poultry')
INSERT [dbo].[Categories] ([category_id], [category_name]) VALUES (4, N'Fish & Seafood')
INSERT [dbo].[Categories] ([category_id], [category_name]) VALUES (5, N'Fridge & Deli')
INSERT [dbo].[Categories] ([category_id], [category_name]) VALUES (6, N'Bakery')
INSERT [dbo].[Categories] ([category_id], [category_name]) VALUES (7, N'Frozen')
INSERT [dbo].[Categories] ([category_id], [category_name]) VALUES (8, N'Pantry')
INSERT [dbo].[Categories] ([category_id], [category_name]) VALUES (9, N'Beer & Wine')
INSERT [dbo].[Categories] ([category_id], [category_name]) VALUES (10, N'Drinks')
SET IDENTITY_INSERT [dbo].[Categories] OFF
GO
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (1, N'almonds', N'almond', 1, N'Almonds are a type of tree nut that are highly nutritious and have been a popular snack and ingredient in various cuisines   for centuries. They are native to the Middle East but are now grown in many regions across the world, including California, Spain, Italy, and Australia. Almonds are 4% water, 22% carbohydrates, 21% protein, and 50% fat (table). In a 100-gram (3+1⁄2-ounce) reference amount, almonds supply 2,420 kilojoules (579 kilocalories) of food energy. The almond is a nutritionally dense food (table), providing a rich source (20% or more of the Daily Value, DV) of the B vitamins riboflavin and niacin, vitamin E, and the essential minerals calcium, copper, iron, magnesium, manganese, phosphorus, and zinc. Almonds are a moderate source (10–19% DV) of the B vitamins thiamine, vitamin B6, and folate, choline, and the essential mineral potassium. They also contain substantial dietary fiber, the monounsaturated fat, oleic acid, and the polyunsaturated fat, linoleic acid. Typical of nuts and seeds, almonds are a source of phytosterols such as beta-sitosterol, stigmasterol, campesterol, sitostanol, and campestanol.', CAST(350.00 AS Decimal(10, 2)), N'g', 4.9900, N'/images/08052023_almonds.jpg', 100, 30, 0, 0, N'Organic', 4.9900)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (2, N'apples', N'apple', 1, N'Apples are rich in fiber, vitamins, and minerals, all of which benefit human health. They also provideTrusted Source an array of antioxidants. These substances helpTrusted Source neutralize free radicals. Free radicals are reactive molecules that can build up as a result of natural processes and environmental pressures. If too many free radicals accumulate in the body, they can cause oxidative stress. This can lead to cell damage. Cell damage can contribute to a range of conditions, including cancer and diabetes. Apples are an important sourceTrusted Source of antioxidants considering their widespread consumption, particularly in Northern Europe and the United States.', CAST(1.00 AS Decimal(10, 2)), N'kg', 6.0000, N'/images/08052023_apples.jpg', 135, 10, 0, 0, N'Organic', 6.0000)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (3, N'avocado', N'avocado', 1, N'The avocado has a smooth and creamy texture. It is rich in monounsaturated fats and is much higher in fat than most other fruits. Avocados have a unique nutrition profile. They contain lots of fiber and are rich in vitamins and minerals, such as B-vitamins, vitamin K, potassium, copper, vitamin E, and vitamin C. Research has linked eating avocados with various health benefits, such as a reduced risk of cardiovascular disease. They are also very satiating and may be useful for weight loss. There are many types of avocados, varying in color, size, and shape. People can eat avocado raw, in smoothies, or in dips, including guacamole. Avocados are usually pear-shaped to round, and they come in a variety of colors, ranging from pale green to almost black when fully ripe. The most popular type is called Hass avocado, which is round with black skin.', CAST(3.00 AS Decimal(10, 2)), N'kg', 9.9900, N'/images/08052023_avocado.jpg', 86, 12, 0, 0, N'Organic', 9.9900)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (4, N'bananas', N'banana', 1, N'Bananas are among the most important food crops on the planet. They come from a family of plants called Musa that are native to Southeast Asia and grown in many of the warmer areas of the world. Bananas are a healthy source of fiber, potassium, vitamin B6, vitamin C, and various antioxidants and phytonutrients. Many types and sizes exist. Their color usually ranges from green to yellow, but some varieties are red.', CAST(500.00 AS Decimal(10, 2)), N'g', 8.0000, N'/images/08052023_bananas.jpg', 150, 8, 0, 0, N'Organic', 8.0000)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (5, N'Whole wheat bread', N'bread', 6, N'Bread is a staple food prepared from a dough of flour (usually wheat) and water, usually by baking. Throughout recorded history and around the world, it has been an important part of many cultures diet. It is one of the oldest human-made foods, having been of significance since the dawn of agriculture, and plays an essential role in both religious rituals and secular culture.', CAST(750.00 AS Decimal(10, 2)), N'g', 12.0000, N'/images/08052023_bread.jpg', 72, 1, 0, 0, N'Whole wheat', 12.0000)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (6, N'cherries', N'Organic cherries', 1, N'A cherry is the fruit of many plants of the genus Prunus, and is a fleshy drupe (stone fruit). Commercial cherries are obtained from cultivars of several species, such as the sweet Prunus avium and the sour Prunus cerasus. The name ''cherry'' also refers to the cherry tree and its wood, and is sometimes applied to almonds and visually similar flowering trees in the genus Prunus, as in ''ornamental cherry'' or ''cherry blossom''. Wild cherry may refer to any of the cherry species growing outside cultivation, although Prunus avium is often referred to specifically by the name ''wild cherry'' in the British Isles.', CAST(350.00 AS Decimal(10, 2)), N'g', 9.9900, N'/images/08052023_cherries.jpg', 23, 20, 0, 0, N'Organic', 9.9900)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (7, N'eggs', N'egg', 8, N'Long-vilified for their high cholesterol content by well-meaning doctors and scientists researching heart disease, eggs now seem to be making a bit of a comeback. So what changed? While it’s true that just one large egg yolk has 200 mg of cholesterol—making it one of the richest sources of dietary cholesterol—eggs also contain additional nutrients that may help lower the risk for heart disease. In addition, the moderate amount of fat in an egg, about 5 grams, is mostly monounsaturated and polyunsaturated fat. It’s also crucial to distinguish between dietary cholesterol and cholesterol in the blood, which are only weakly related. The focus on dietary cholesterol alone was de-emphasized as more attention was placed on the influence of saturated and trans fat on blood cholesterol. Accordingly, the Dietary Guidelines for Americans 2015 removed the prior recommendation to limit consumption of dietary cholesterol to 300 mg per day.', CAST(1.00 AS Decimal(10, 2)), N'kg', 7.9900, N'/images/08052023_eggs.jpg', 88, 12, 0, 0, N'Organic', 7.9900)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (8, N'grapes', N'grape', 1, N'A grape is a fruit, botanically a berry, of the deciduous woody vines of the flowering plant genus Vitis. Grapes are a non-climacteric type of fruit, generally occurring in clusters. The cultivation of grapes began perhaps 8,000 years ago, and the fruit has been used as human food over history. Eaten fresh or in dried form (as raisins, currants and sultanas), grapes also hold cultural significance in many parts of the world, particularly for their role in winemaking. Other grape-derived products include various types of jam, juice, vinegar and oil.', CAST(2.00 AS Decimal(10, 2)), N'kg', 15.0000, N'/images/08052023_grapes.jpg', 63, 50, 0, 0, N'Organic', 15.0000)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (9, N'lemons', N'lemonlemon', 1, N'The lemon (Citrus limon) is a species of small evergreen trees in the flowering plant family Rutaceae, native to Asia, primarily Northeast India (Assam), Northern Myanmar or China. The tree''s ellipsoidal yellow fruit is used for culinary and non-culinary purposes throughout the world, primarily for its juice, which has both culinary and cleaning uses.[2] The pulp and rind are also used in cooking and baking. The juice of the lemon is about 5% to 6% citric acid, with a pH of around 2.2, giving it a sour taste. The distinctive sour taste of lemon juice makes it a key ingredient in drinks and foods such as lemonade and lemon meringue pie.', CAST(600.00 AS Decimal(10, 2)), N'g', 9.9900, N'/images/08052023_lemons.jpg', 44, 8, 0, 0, N'Organic', 9.9900)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (10, N'lettuce', N'lettuce', 2, N'Lettuce (Lactuca sativa) is an annual plant of the family Asteraceae. It is most often grown as a leaf vegetable, but sometimes for its stem and seeds. Lettuce is most often used for salads, although it is also seen in other kinds of food, such as soups, sandwiches and wraps; it can also be grilled. One variety, celtuce (asparagus lettuce), is grown for its stems, which are eaten either raw or cooked. In addition to its main use as a leafy green, it has also gathered religious and medicinal significance over centuries of human consumption. Europe and North America originally dominated the market for lettuce, but by the late 20th century the consumption of lettuce had spread throughout the world. As of 2021, world production of lettuce and chicory was 27 million tonnes, 53 percent of which came from China.', CAST(150.00 AS Decimal(10, 2)), N'g', 9.9900, N'/images/08052023_lettuce.jpg', 0, 1, 0, 0, N'Organic', 9.9900)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (11, N'Baguette', N'Baguette', 6, N'A baguette is a long, thin type of bread of French origin that is commonly made from basic lean dough. It is distinguishable by its length and crisp crust. A baguette has a diameter of about 5 to 6 centimetres and a usual length of about 65 cm, although a baguette can be up to 1 m long.', CAST(500.00 AS Decimal(10, 2)), N'g', 1.9900, N'/images/08052023_baguette.jpg', 0, 1, 0, 0, N'Local bakery', 1.9900)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (12, N'Sea Cod', N'Cod', 4, N'Cod is the common name for the demersal fish genus Gadus, belonging to the family Gadidae. Cod is also used as part of the common name for a number of other fish species, and one species that belongs to genus Gadus is commonly not called cod.', CAST(750.00 AS Decimal(10, 2)), N'g', 30.0000, N'/images/08052023_bass.jpg', 8, 1, 0, 25, N'Ocean grown', 22.5000)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (13, N'blue cheese', N'blue cheese', 5, N'Blue cheese is semi-soft cheese with a sharp, salty flavor. It is made with cultures of the edible mold Penicillium, giving it spots or veins throughout the cheese in shades of blue or green.', CAST(250.00 AS Decimal(10, 2)), N'g', 6.9900, N'/images/08052023_blue-cheese.jpg', 50, 1, 0, 0, N'Local made', 1.9900)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (14, N'brie cheese', N'brie cheese', 5, N'Brie is a soft cow''s-milk cheese named after Brie, the French region from which it originated. It is pale in color with a slight grayish tinge under a rind of white mould. The rind is typically eaten, with its flavor depending largely upon the ingredients used and its manufacturing environment.', CAST(250.00 AS Decimal(10, 2)), N'g', 5.9900, N'/images/08052023_Brie.jpg', 30, 1, 0, 0, N'Local made', 5.9900)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (15, N'camembert cheese', N'camembert cheese', 5, N'Camembert is a moist, soft, creamy, surface-ripened cow''s milk cheese. It was first made in the late 18th century in Camembert, Normandy, in northwest France. It is sometimes compared in look and taste to brie cheese, albeit with a slightly lower butterfat content than brie''s typical 60% and 75% by weight.', CAST(250.00 AS Decimal(10, 2)), N'g', 7.9900, N'/images/08052023_Camembert.jpg', 22, 1, 0, 0, N'Local made', 5.9900)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (16, N'cherry tomatoes', N'cherry tomatoes', 2, N'The cherry tomato is a type of small round tomato believed to be an intermediate genetic admixture between wild currant-type tomatoes and domesticated garden tomatoes. Cherry tomatoes range in size from a thumbtip up to the size of a golf ball, and can range from spherical to slightly oblong in shape.', CAST(500.00 AS Decimal(10, 2)), N'g', 11.9900, N'/images/08052023_cherry-tomatos.jpg', 50, 40, 0, 10, N'Organic', 10.7910)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (17, N'chicken breast', N'chicken breast', 3, N'The chicken is a domesticated junglefowl species, with attributes of wild species such as the grey and the Ceylon junglefowl that are originally from Southeast Asia. Rooster and cock are terms for adult male birds, and a younger male may be called a cockerel. A male that has been castrated is a capon.', CAST(1.00 AS Decimal(10, 2)), N'kg', 23.0000, N'/images/08052023_chicken-breast.jpg', 35, 16, 0, 0, N'Organic', 23.0000)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (18, N'croissant', N'croissant', 6, N'A croissant is a buttery, flaky, viennoiserie pastry inspired by the shape of the Austrian kipferl but using the French yeast-leavened laminated dough.', CAST(350.00 AS Decimal(10, 2)), N'g', 8.0000, N'/images/08052023_croissant.jpg', 50, 12, 0, 0, N'Local bakery', 23.0000)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (19, N'cucumber', N'cucumber', 2, N'The cucumber is a widely-cultivated creeping vine plant in the family Cucurbitaceae that bears cylindrical to spherical fruits, which are used as culinary vegetables. Considered an annual plant, there are three main types of cucumber—slicing, pickling, and seedless—within which several cultivars have been created.', CAST(1.00 AS Decimal(10, 2)), N'kg', 8.0000, N'/images/08052023_cucumber.jpg', 100, 30, 0, 0, N'Organic', 8.0000)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (20, N'frozen peas', N'peas', 7, N'What are peas? Peas are not actually a vegetable but a small, edible legume and as such they belong to the same family as lentils, chickpeas, beans and peanuts. Peas grow in pods on a vine and once the pod is plump, they are ripe for picking.', CAST(1.00 AS Decimal(10, 2)), N'kg', 6.0000, N'/images/08052023_frozen-peas.jpg', 30, 100, 0, 0, N'Organic', 8.0000)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (21, N'mango juice', N'mango', 10, N'Punto Fa, S.L., trading as Mango, is a Spanish clothing design and manufacturing company, founded in Barcelona, Spain, by brothers Isak Andic and Nahman Andic. It designs, manufactures and markets women''s and men''s clothing and accessories.', CAST(250.00 AS Decimal(10, 2)), N'ml', 3.9900, N'/images/08052023_mango-juice.jpg', 22, 1, 0, 0, N'Organic', 3.9900)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (22, N'orange juice', N'orange', 10, N'Orange S.A., formerly France Télécom S.A. is a French multinational telecommunications corporation. It has 266 million customers worldwide and employs 89,000 people in France, and 59,000 elsewhere. In 2015, the group had revenue of €40 billion. The company''s head office is located in the 15th arrondissement of Paris.', CAST(250.00 AS Decimal(10, 2)), N'ml', 3.9900, N'/images/08052023_orange-juice.jpg', 22, 1, 0, 0, N'Organic', 3.9900)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (23, N'olive oil', N'olive oil', 8, N'Olive oil is a liquid fat obtained by pressing whole olives, the fruit of Olea europaea, a traditional tree crop of the Mediterranean Basin, and extracting the oil. It is commonly used in cooking, for frying foods or as a salad dressing.', CAST(750.00 AS Decimal(10, 2)), N'ml', 15.0000, N'/images/08052023_olive-oil.jpg', 10, 1, 0, 8, N'Organic', 13.8000)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (24, N'pasta', N'pasta', 8, N'Pasta is a type of food typically made from an unleavened dough of wheat flour mixed with water or eggs, and formed into sheets or other shapes, then cooked by boiling or baking.', CAST(500.00 AS Decimal(10, 2)), N'g', 8.0000, N'/images/08052023_pasta.jpg', 50, 50, 0, 0, N'Gluten free', 8.0000)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (25, N'red wine', N'red wine', 9, N'Red wine is a type of wine made from dark-colored grape varieties. The color of the wine can range from intense violet, typical of young wines, through to brick red for mature wines and brown for older red wines.', CAST(1.20 AS Decimal(10, 2)), N'l', 28.0000, N'/images/08052023_red-wine.jpg', 30, 1, 0, 0, N'Local vinegar', 8.0000)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (26, N'white wine', N'white wine', 9, N'White wine is a wine that is fermented without skin contact. The colour can be straw-yellow, yellow-green, or yellow-gold. It is produced by the alcoholic fermentation of the non-coloured pulp of grapes, which may have a skin of any colour. White wine has existed for at least 4,000 years.', CAST(1.00 AS Decimal(10, 2)), N'l', 30.0000, N'/images/08052023_white-wine.jpg', 42, 1, 0, 0, N'Local vinegar', 30.0000)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (27, N'salmon', N'salmon', 4, N'Salmon is the common name for several commercially important species of euryhaline ray-finned fish from the family Salmonidae, which are native to tributaries of the North Atlantic and North Pacific basin. Other closely related fish in the same family include trout, char, grayling, whitefish, lenok and taimen.', CAST(2.00 AS Decimal(10, 2)), N'kg', 37.0000, N'/images/08052023_salmon.jpg', 25, 1, 0, 12, N'Ocean grown', 32.5600)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (28, N'steak', N'steak', 3, N'A steak is a thick cut of meat generally sliced across the muscle fibers, sometimes including a bone. It is normally grilled or fried. Steak can be diced, cooked in sauce, such as in steak and kidney pie, or minced and formed into patties, such as hamburgers.', CAST(450.00 AS Decimal(10, 2)), N'g', 47.0000, N'/images/08052023_steak.jpg', 20, 1, 0, 10, N'Grass fed', 42.3000)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (29, N'tomatoes', N'tomatoes', 2, N'The tomato (Solanum lycopersicum) is a fruit from the nightshade family native to South America. Despite botanically being a fruit, it''s generally eaten and prepared like a vegetable. They are a great source of vitamin C, potassium, folate, and vitamin K.', CAST(1.20 AS Decimal(10, 2)), N'kg', 4.9900, N'/images/08052023_tomatos.jpg', 50, 8, 0, 0, N'Organic', 4.9900)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (30, N'Mixed Rice', N'rice', 8, N'Rice is the seed of the grass species Oryza sativa or less commonly O. glaberrima. The name wild rice is usually used for species of the genera Zizania and Porteresia, both wild and domesticated, although the term may also be used for primitive or uncultivated varieties of Oryza', CAST(500.00 AS Decimal(10, 2)), N'g', 2.5000, N'/images/09052023_rice.jpg', 68, 1, 0, 7, N'Organic', 2.3250)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (33, N'Corn', N'Corn', 2, N'Corn, also known as maize, is a starchy vegetable that comes as kernels on a cob, covered by a husk. Corn is one of the most popular vegetables in the U.S. that sometimes gets a bad rap because it has a lot of natural sugar and carbs. But don''t overlook the health benefits of this versatile veggie.

Corn is a favorite of summertime cookouts. Popped, it makes the perfect snack for movie nights or parties. Dried and ground into flour, its seeds become cornmeal for tortillas, chips, and crackers. In this form, it''s a grain, not a vegetable.', CAST(1.50 AS Decimal(10, 2)), N'kg', 6.0000, N'/images/09052023_corn.jpg', 50, 10, 0, 0, N'Organic', 6.0000)
INSERT [dbo].[Products] ([product_id], [product_title], [product_name], [category_id], [product_description], [product_weight], [product_weight_msr], [unit_price], [image_data], [units_in_stock], [quantity_per_unit], [discontinued], [discount], [product_extra], [product_current_price]) VALUES (34, N'Butter', N'Butter', 5, N'Butter is a dairy product made from the fat and protein components of churned cream. It is a semi-solid emulsion at room temperature, consisting of approximately 80% butterfat. It is used at room temperature as a spread, melted as a condiment, and used as a fat in baking, sauce-making, pan frying, and other cooking procedures.', CAST(300.00 AS Decimal(10, 2)), N'g', 8.0000, N'/images/09052023_butter.jpg', 80, 1, 0, 25, N'Grass-Fed', 6.0000)
SET IDENTITY_INSERT [dbo].[Products] OFF
GO
SET IDENTITY_INSERT [dbo].[UserCart] ON 

INSERT [dbo].[UserCart] ([id], [user_id], [product_id], [quantity]) VALUES (1, 2, 2, 1)
INSERT [dbo].[UserCart] ([id], [user_id], [product_id], [quantity]) VALUES (2, 2, 8, 2)
INSERT [dbo].[UserCart] ([id], [user_id], [product_id], [quantity]) VALUES (4, 2, 4, 3)
INSERT [dbo].[UserCart] ([id], [user_id], [product_id], [quantity]) VALUES (5, 2, 7, 3)
INSERT [dbo].[UserCart] ([id], [user_id], [product_id], [quantity]) VALUES (6, 2, 6, 2)
INSERT [dbo].[UserCart] ([id], [user_id], [product_id], [quantity]) VALUES (7, 2, 9, 2)
INSERT [dbo].[UserCart] ([id], [user_id], [product_id], [quantity]) VALUES (8, 2, 10, 3)
INSERT [dbo].[UserCart] ([id], [user_id], [product_id], [quantity]) VALUES (9, 2, 15, 2)
INSERT [dbo].[UserCart] ([id], [user_id], [product_id], [quantity]) VALUES (10, 2, 14, 4)
INSERT [dbo].[UserCart] ([id], [user_id], [product_id], [quantity]) VALUES (11, 2, 13, 1)
INSERT [dbo].[UserCart] ([id], [user_id], [product_id], [quantity]) VALUES (12, 2, 12, 2)
INSERT [dbo].[UserCart] ([id], [user_id], [product_id], [quantity]) VALUES (13, 2, 11, 4)
INSERT [dbo].[UserCart] ([id], [user_id], [product_id], [quantity]) VALUES (14, 2, 16, 1)
INSERT [dbo].[UserCart] ([id], [user_id], [product_id], [quantity]) VALUES (15, 2, 17, 2)
INSERT [dbo].[UserCart] ([id], [user_id], [product_id], [quantity]) VALUES (16, 2, 18, 3)
SET IDENTITY_INSERT [dbo].[UserCart] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([user_id], [user_name], [user_email], [user_password], [user_type], [jwt_token]) VALUES (2, N'Yotam Lin', N'linyotam@gmail.com', N'$2a$11$K6wtL/6eWFSpZFWawyWZZeGFoAfJhPTcM6YQ9mmxnk2R1wVxJSlle', N'customer', N'')
INSERT [dbo].[Users] ([user_id], [user_name], [user_email], [user_password], [user_type], [jwt_token]) VALUES (3, N'Ella Lin', N'ellalin1805@gmail.com', N'$2a$11$hcpHgSSU/Eid88RrbmlmuucWxpoijKawut0zwZPb4BDVBdkZDUuqy', N'customer', N'')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[Employees] ADD  CONSTRAINT [DF_Employees_is_active]  DEFAULT ((1)) FOR [is_active]
GO
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [DF_Products_discountinued]  DEFAULT ((0)) FOR [discontinued]
GO
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [DF_Products_discount]  DEFAULT ((0)) FOR [discount]
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD  CONSTRAINT [FK_Employees_Users] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[Employees] CHECK CONSTRAINT [FK_Employees_Users]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Categories] FOREIGN KEY([category_id])
REFERENCES [dbo].[Categories] ([category_id])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Categories]
GO
ALTER TABLE [dbo].[UserCart]  WITH CHECK ADD  CONSTRAINT [FK_UserCart_Products] FOREIGN KEY([product_id])
REFERENCES [dbo].[Products] ([product_id])
GO
ALTER TABLE [dbo].[UserCart] CHECK CONSTRAINT [FK_UserCart_Products]
GO
ALTER TABLE [dbo].[UserCart]  WITH CHECK ADD  CONSTRAINT [FK_UserCart_Users] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[UserCart] CHECK CONSTRAINT [FK_UserCart_Users]
GO
USE [master]
GO
ALTER DATABASE [LinsGrocery] SET  READ_WRITE 
GO

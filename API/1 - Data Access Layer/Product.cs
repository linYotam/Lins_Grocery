using System;
using System.Collections.Generic;

namespace Grocery;

public partial class Product
{
    public int ProductId { get; set; }

    public string ProductTitle { get; set; } = null!;

    public string ProductName { get; set; } = null!;

    public int CategoryId { get; set; } = 0;    

    public string ProductDescription { get; set; } = null!;

    public decimal Weight { get; set; } = 0;

    public string WeightMsr { get; set; } = "";

    public decimal UnitPrice { get; set; } = 0;

    public string ImageData { get; set; } = "";

    public short UnitsInStock { get; set; } = 0;

    public int QuantityPerUnit { get; set; } = 0;

    public bool Discountinued { get; set; } = false;

    public int Discount { get; set; } = 0;

    public string Extra{ get; set; } = "";

    public decimal CurrentPrice { get; set; } = 0;

    public virtual Category Category { get; set; } = null!;
}

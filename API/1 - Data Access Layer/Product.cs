using System;
using System.Collections.Generic;

namespace Grocery;

public partial class Product
{
    public int ProductId { get; set; }

    public string ProductTitle { get; set; } = null!;

    public string ProductName { get; set; } = null!;

    public int CategoryId { get; set; }

    public string ProductDescription { get; set; } = null!;

    public decimal ProductWeight { get; set; }

    public string ProductWeightMsr { get; set; } = null!;

    public decimal UnitPrice { get; set; }

    public string ImageData { get; set; } = null!;

    public short UnitsInStock { get; set; }

    public int QuantityPerUnit { get; set; }

    public bool Discontinued { get; set; }

    public int Discount { get; set; }

    public string? ProductExtra { get; set; }

    public decimal? ProductCurrentPrice { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<UserCart> UserCarts { get; set; } = new List<UserCart>();
}

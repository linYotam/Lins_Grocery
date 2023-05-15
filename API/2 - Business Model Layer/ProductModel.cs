using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grocery
{
    public class ProductModel : IValidatableObject
    {
        public int ID { get; set; }

        [Required(ErrorMessage = "Missing Product Title")]
        [MinLength(2, ErrorMessage = "Name must be a minimum of 2 chars")]
        [MaxLength(250, ErrorMessage = "Title can't exceeds 250 chars")]
        [IllegalChars]
        public string Title { get; set; } = "";

        [Required(ErrorMessage = "Missing Product Name")]
        [MinLength(2, ErrorMessage = "Name must be a minimum of 2 chars")]
        [MaxLength(250, ErrorMessage = "Name can't exceeds 250 chars")]
        [IllegalChars]
        public string Name { get; set; } = "";

        [Required (ErrorMessage = "Missing Category ID")]
        [Range(1, int.MaxValue, ErrorMessage = "Value must be greater than 0")]
        public int CategoryId { get; set; }

        [MinLength(2, ErrorMessage = "Description must be a minimum of 2 chars")]
        public string Description { get; set; } = "";

        public decimal Weight { get; set; } = 0;
        public string WeightMsr { get; set; } = "";

        [Required(ErrorMessage = "Missing Product Price")]
        [Range(1, 1000, ErrorMessage = "Price must be between 1 to 1000")]
        public decimal Price { get; set; } = 0;

        public string ImageData { get; set; } = "";

        [Required(ErrorMessage = "Missing Product Stock")]
        [Range(1, 200, ErrorMessage = "Stock must be between 1 to 200")]
        public short Stock { get; set; }

        [Required(ErrorMessage = "Missing Product Quantity")]
        [Range(1, 200, ErrorMessage = "Quantity must be between 1 to 200")]
        public int Quantity { get; set; } = 0;

        public bool Discontinued { get; set; } = false;

        public int Discount { get; set; } = 0;

        public string Extra { get; set; } = "";

        public decimal CurrentPrice { get; set; } = 0;

        public ProductModel() { }

        public ProductModel(Product product)
        {
            ID = product.ProductId;
            Title = product.ProductTitle;
            Name = product.ProductName;
            Description = product.ProductDescription;
            Weight = product.ProductWeight;
            WeightMsr= product.ProductWeightMsr;
            Price = product.UnitPrice;
            ImageData = product.ImageData;
            Stock = product.UnitsInStock;
            Quantity = product.QuantityPerUnit;
            Discontinued = product.Discontinued;
            CategoryId = product.CategoryId;
            Discount = product.Discount;
            Extra  = product.ProductExtra;
            CurrentPrice = (decimal)product.ProductCurrentPrice;
        }

        public Product ConvertToProduct()
        {
            return new Product
            {
                ProductId = ID,
                ProductTitle = Title,
                ProductName = Name,
                ProductDescription = Description,
                ProductWeight = Weight,
                ProductWeightMsr = WeightMsr,
                UnitPrice = Price,
                ImageData = ImageData,
                UnitsInStock = Stock,
                QuantityPerUnit = Quantity,
                Discontinued = Discontinued,
                CategoryId = CategoryId,
                Discount = Discount,
                ProductExtra = Extra,
                ProductCurrentPrice = CurrentPrice
        };
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();

            if (Price == 0 && Stock == 0)
            {
                List<string> members = new List<string> { nameof(Stock), nameof(Price) };
                errors.Add(new ValidationResult($"Both {nameof(Price)} and {nameof(Stock)} can't be zero", members));
            }
            return errors;
        }
    }
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grocery
{
    public class ProductsLogic : BaseLogic
    {


        public async Task<List<ProductModel>> GetAllProductsAsync()
        {
            return await DB.Products.Select(p => new ProductModel(p)).ToListAsync();
        }

        public async Task<ProductModel?> GetOneProductAsync(int id)
        {
            return await DB.Products.Where(p => p.ProductId == id).Select(p => new ProductModel(p)).SingleOrDefaultAsync();
        }

        public async Task<ProductModel> AddProductAsync(ProductModel productModel)
        {
            Product product = productModel.ConvertToProduct();

            DB.Products.Add(product);
            await DB.SaveChangesAsync();
            productModel.ID = product.ProductId;
            return productModel;
        }

        public async Task<ProductModel?> UpdateFullProductAsync(ProductModel productModel)
        {
            Product? product = DB.Products.SingleOrDefault(p => p.ProductId == productModel.ID);

            if (product == null) return null;

            product.ProductTitle = productModel.Title;
            product.ProductName = productModel.Name;
            product.CategoryId = productModel.CategoryId;
            product.ProductDescription = productModel.Description;
            product.ProductWeight = productModel.Weight;
            product.ProductWeightMsr = productModel.WeightMsr;
            product.UnitPrice = productModel.Price;
            product.ImageData = productModel.ImageData;
            product.UnitsInStock = productModel.Stock;
            product.QuantityPerUnit = productModel.Quantity;
            product.Discontinued = productModel.Discontinued;
            product.Discount = productModel.Discount;
            product.ProductExtra = productModel.Extra;
            product.ProductCurrentPrice = productModel.CurrentPrice;

            await DB.SaveChangesAsync();

            return productModel;
        }

        public async Task<ProductModel?> UpdatePartialProductAsync(ProductModel productModel)
        {
            Product? product = DB.Products.SingleOrDefault(p => p.ProductId == productModel.ID);

            if (product == null) return null;

            if (productModel.Title != null )  
                product.ProductTitle = productModel.Title;
            if (productModel.Name != null)  
                product.ProductName = productModel.Name;
            product.CategoryId = productModel.CategoryId;
            if (productModel.Description != null)  
                product.ProductDescription = productModel.Description;
            product.ProductWeight = productModel.Weight;
            if (productModel.WeightMsr != null)  
                product.ProductWeightMsr = productModel.WeightMsr;
            product.UnitPrice = productModel.Price;
            if (productModel.ImageData != null && productModel.ImageData != "")  
                product.ImageData = productModel.ImageData;
            product.UnitsInStock = productModel.Stock;
            product.QuantityPerUnit = productModel.Quantity;
            product.Discontinued = productModel.Discontinued;
            product.Discount = productModel.Discount;
            if (productModel.Extra != null)  
                product.ProductExtra = productModel.Extra;
            if (productModel.CurrentPrice != null)
                product.ProductCurrentPrice = productModel.CurrentPrice;

            await DB.SaveChangesAsync();

            return productModel;
        }

        public async Task DeleteProductAsync(int id)
        {
            Product? productToDelete = await DB.Products.FindAsync(id);

            if (productToDelete == null) throw new ArgumentException($"Product with ID {id} not found.");

            DB.Products.Remove(productToDelete);
            await DB.SaveChangesAsync();
        }

        public async Task<List<ProductModel>> GetProductsCheaperThan(decimal price)
        {
            return await DB.Products.Where(p => p.UnitPrice < price).Select(p => new ProductModel(p)).ToListAsync();
        }

        public async Task<List<ProductModel>> GetProductsExpensiveThan(decimal price)
        {
            return await DB.Products.Where(p => p.UnitPrice > price).Select(p => new ProductModel(p)).ToListAsync();
        }
    }
}

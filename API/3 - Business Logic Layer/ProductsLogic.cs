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

            product.ProductName = productModel.Name;
            product.ProductDescription = productModel.Description;
            product.ImageData = productModel.ImageData;
            product.Discountinued = productModel.Discountinued;
            product.CategoryId = productModel.CategoryId;
            product.UnitPrice = productModel.Price;
            product.UnitsInStock = productModel.Stock;
            product.QuantityPerUnit = productModel.Quantity;
            product.Discount = productModel.Discount;

            await DB.SaveChangesAsync();

            return productModel;
        }

        public async Task<ProductModel?> UpdatePartialProductAsync(ProductModel productModel)
        {
            Product? product = DB.Products.SingleOrDefault(p => p.ProductId == productModel.ID);

            if (product == null) return null;

            if (productModel.Name != null) product.ProductName = productModel.Name;
            if (productModel.Description != null) product.ProductDescription = productModel.Description;
            if (productModel.ImageData != null) product.ImageData = productModel.ImageData;
            product.Discountinued = productModel.Discountinued;
            product.CategoryId = productModel.CategoryId;
            product.UnitPrice = productModel.Price;
            product.UnitsInStock = productModel.Stock;
            product.Discount = productModel.Discount;
            if (productModel.Quantity != null) product.QuantityPerUnit = productModel.Quantity;

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

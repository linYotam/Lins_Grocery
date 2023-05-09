using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Server;
using System;
using System.Security.Cryptography;
using System.Xml;
using static System.Net.Mime.MediaTypeNames;

namespace Grocery
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase, IDisposable
    {
        private readonly ProductsLogic logic = new ProductsLogic();
        private readonly IWebHostEnvironment _environment;

        public ProductsController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        [HttpGet]
        [Route("api/images")]
        public IActionResult GetImages()
        {
            var imagesPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
            var imagesUrls = Directory.GetFiles(imagesPath)
                .Select(filePath => {
                    var fileName = Path.GetFileName(filePath);
                    var imageUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}/images/{fileName}";
                    return imageUrl;
                })
                .ToList();

            return Ok(imagesUrls);
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                List<ProductModel> products = await logic.GetAllProductsAsync();
                if (products == null) return NotFound("Products not found");

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetOneProduct(int id)
        {
            try
            {
                ProductModel? product = await logic.GetOneProductAsync(id);

                if (product == null) return NotFound($"id {id} not found");

                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // GET /api/products/cheaper-than/price=23
        [HttpGet]
        [Route("cheaper-than")]
        public async Task<IActionResult> GetProductsCheaperThan(decimal price)
        {
            try
            {
                List<ProductModel> products = await logic.GetProductsCheaperThan(price);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // GET /api/products/expensive-than/price=23
        [HttpGet]
        [Route("expensive-than")]
        public async Task<IActionResult> GetProductsExpensiveThan(decimal price)
        {
            try
            {
                List<ProductModel> products = await logic.GetProductsExpensiveThan(price);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //[HttpPost]
        //public async Task<IActionResult> AddProduct(ProductModel productModel)
        //{
        //    try
        //    {
        //        ProductModel addedProduct = await logic.AddProductAsync(productModel);
        //        return Created("api/products/" + addedProduct.ID, addedProduct);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}

        [HttpPost]
        public async Task<IActionResult> AddProduct()
        {
            try
            {

                // Read the form data from the request body
                var formCollection = await Request.ReadFormAsync();

                var imageFile = formCollection.Files["imageData"];

                // Extract fields
                var productModel = new ProductModel
                {
                    Title = formCollection["title"],
                    Name = formCollection["name"],
                    CategoryId = int.Parse(formCollection["categoryId"]),
                    Description = formCollection["description"],
                    Weight= decimal.Parse(formCollection["weight"]),
                    WeightMsr = formCollection["weightMsr"],
                    Price = decimal.Parse(formCollection["price"]),
                    Stock = short.Parse(formCollection["stock"]),
                    Quantity = int.Parse(formCollection["quantity"]),
                    Discountinued = bool.Parse(formCollection["discountinued"]),
                    Discount = int.Parse(formCollection["discount"])
                };
                
                // Check if an image file was provided
                if (imageFile != null && imageFile.Length > 0)
                {

                    // Save the image file to local storage
                    string date = DateTime.Now.ToString("ddMMyyyy");
                    var fileName = $"{date}_{formCollection["imageName"]}";
                    var imagePath = Path.Combine(_environment.WebRootPath, "images", fileName);

                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    { 
                        await imageFile.CopyToAsync(stream);
                    }

                    // Save the URL of the image to the database
                    productModel.ImageData = $"/images/{fileName}";
                    ProductModel addedProduct = await logic.AddProductAsync(productModel);
                    return Created("api/products/" + addedProduct.ID, addedProduct);
                }

                    // Handle the case where no image file was provided
                    return BadRequest("No image selected");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateFullProduct(int id, ProductModel productModel)
        {
            try
            {
                productModel.ID = id;
                ProductModel? updatedProduct = await logic.UpdateFullProductAsync(productModel);

                if (updatedProduct == null) return NotFound($"id {id} not found.");

                return Ok(updatedProduct);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<IActionResult> UpdatePartialProduct(int id, ProductModel productModel)
        {
            try
            {
                productModel.ID = id;
                ProductModel? updatedProduct = await logic.UpdatePartialProductAsync(productModel);

                if (updatedProduct == null) return NotFound($"id {id} not found.");

                return Ok(updatedProduct);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                await logic.DeleteProductAsync(id);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        public void Dispose()
        {
            logic.Dispose();
        }
    }
}

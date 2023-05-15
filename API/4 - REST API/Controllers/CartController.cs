using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Grocery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase, IDisposable
    {

        private readonly UserCartLogic logic = new UserCartLogic();
        private readonly IWebHostEnvironment _environment;

        [HttpPost]
        public async Task<IActionResult> AddCartItem(UserCartModel userCartModel)
        {
            try
            {
                UserCartModel addedCart = await logic.AddCartItem(userCartModel);
                return Created("api/cart/" + addedCart.UserId, addedCart);

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error message: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetUserCartAsync(int id)
        {
            try
            {
                List<UserCartModel> cart = await logic.GetUserCartAsync(id); 

                if (cart == null) return NotFound($"Cart for userid {id} not found");

                return Ok(cart);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProductFromCart(int id)
        {
            try
            {
                await logic.DeleteProductFromCart(id);
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

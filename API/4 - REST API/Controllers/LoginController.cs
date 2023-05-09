using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Grocery
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase, IDisposable
    {
        private readonly UserLogic logic = new UserLogic();

        [HttpPost]
        public async Task<IActionResult> Login(UserModel model)
        {
            try
            {
                UserModel? user = await logic.Login(model);

                if (user == null) return NotFound($"user with email: {model.Email} not found. make sure email & password are correct!");

                return Ok(user);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error message: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        public void Dispose()
        {

            logic.Dispose();

        }
    }

}

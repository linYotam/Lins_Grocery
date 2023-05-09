using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Grocery
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrationController : ControllerBase, IDisposable
    {

        private readonly UserLogic logic = new UserLogic();
        //private readonly JwtHelper jwtHelper = new JwtHelper("ninja");

        [HttpPost]
        public async Task<IActionResult> Register(UserModel userModel)
        {
            try
            {
                UserModel addedUser = await logic.AddUserAsync(userModel);
                //addedUser.JwtToken = jwtHelper.GetJwtToken(addedUser.Name, addedUser.Type);  

                return Created("api/users/" + addedUser.ID, addedUser);

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

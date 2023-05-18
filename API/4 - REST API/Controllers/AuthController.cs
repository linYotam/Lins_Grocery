using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Grocery
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase, IDisposable
    {

        //private readonly UserLogic logic = new UserLogic();
        //private readonly JwtHelper jwtHelper = new JwtHelper("ninja");

        private readonly JwtHelper jwtHelper;
        private readonly UserLogic logic;


        public AuthController(JwtHelper jwtHelper, UserLogic logic)
        {
            this.jwtHelper = jwtHelper;
            this.logic = logic; 
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(UserModel userModel)
        {
            try
            {
                UserModel? addedUser = await logic.AddUserAsync(userModel);
                addedUser.JwtToken = jwtHelper.GetJwtToken(addedUser.Email, addedUser.Type);  

                return Created("api/users/" + addedUser.ID, addedUser);

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error message: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(CredentialsModel model)
        {
            try
            {
                UserModel? user = await logic.GetUserByCredentials(model);

                if (user == null) return Unauthorized("Incorrect email or password");

                user.JwtToken = jwtHelper.GetJwtToken(user.Email, user.Type);

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

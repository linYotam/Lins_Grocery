using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Grocery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {

        [HttpGet]
        public IActionResult GetHomeData()
        {
            HomeModel model = new HomeModel { Message = "Welcome" };
            return Ok(model);
        }
    }
}

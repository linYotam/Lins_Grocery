using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Grocery
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase, IDisposable
    {
        //private readonly CategoriesLogic logic = new CategoriesLogic();

        private readonly CategoriesLogic logic;

        public CategoriesController(CategoriesLogic categoriesLogic)
        {
            logic = categoriesLogic;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                List<CategoryModel> categories = await logic.GetAllCategoriesAsync();
                return Ok(categories);
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

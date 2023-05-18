using Grocery;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grocery
{
    public class CategoriesLogic : BaseLogic
    {
        public CategoriesLogic(DbContextOptions<LinsGroceryContext> options) : base(options)
        {
            
        }

        public async Task<List<CategoryModel>> GetAllCategoriesAsync()
        {
            return await DB.Categories.Select(cat => new CategoryModel(cat)).ToListAsync();
        }
    }
}

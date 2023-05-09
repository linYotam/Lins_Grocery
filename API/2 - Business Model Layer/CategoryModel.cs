using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grocery
{
    public class CategoryModel
    {
        public int ID { get; set; }

        [Required(ErrorMessage = "Missing Category Name")]
        public string Name { get; set; } = null!;

        public CategoryModel(Category category)
        {
            ID = category.CategoryId;
            Name = category.CategoryName;
        }

        public Category ConvertToCategory()
        {
            return new Category
            { 
                CategoryId = ID,
                CategoryName = Name,
            };
        }
    }
}

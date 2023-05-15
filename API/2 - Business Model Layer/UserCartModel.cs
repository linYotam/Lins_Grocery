
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net; 

namespace Grocery
{
    public class UserCartModel 
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; }


        public UserCartModel() { }

        public UserCartModel(UserCart userCart)
        {
            Id = userCart.Id;
            UserId = userCart.UserId;
            ProductId = userCart.ProductId;
            Quantity = userCart.Quantity;
      
        }

        public UserCart ConvertToUserCart()
        {

            return new UserCart
            {
                Id = Id,
                UserId = UserId,
                ProductId = ProductId,
                Quantity = Quantity,     
            };
        }
    }
}

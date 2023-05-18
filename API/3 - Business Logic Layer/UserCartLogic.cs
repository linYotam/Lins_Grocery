using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;

namespace Grocery
{
    public class UserCartLogic : BaseLogic
    {

        public UserCartLogic(DbContextOptions<LinsGroceryContext> options): base(options)
        {
            
        }

        public async Task<UserCartModel> AddCartItem(UserCartModel userCartModel) 
        {
            //Check if the product already exist in cart
            var existingCartItem = await DB.UserCarts.FirstOrDefaultAsync(cart => cart.UserId == userCartModel.UserId && cart.ProductId == userCartModel.ProductId);
            UserCart userCart = userCartModel.ConvertToUserCart();

            //Product already exist in cart
            if (existingCartItem != null)
            {
                existingCartItem.Quantity = userCartModel.Quantity;
            }
            else
            {
                DB.UserCarts.Add(userCart);
            }

            //Create new cart ID 
            await DB.SaveChangesAsync();
            userCartModel.Id = userCart.Id;
            return userCartModel;
        }

        public async Task DeleteProductFromCart(int id)
        {
            UserCart? productToDelete = await DB.UserCarts.FirstOrDefaultAsync(cart => cart.ProductId == id);

            if (productToDelete == null) throw new ArgumentException($"Product with ID {id} not found.");

            DB.UserCarts.Remove(productToDelete);
            await DB.SaveChangesAsync();
        }


        public async Task<List<UserCartModel>> GetUserCartAsync(int userId)
        {
            return await DB.UserCarts.Where(cart => cart.UserId == userId).Select(cart => new UserCartModel(cart)).ToListAsync<UserCartModel>();
        }

    }
}

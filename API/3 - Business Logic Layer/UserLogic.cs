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
    public class UserLogic : BaseLogic
    {

        public UserLogic(DbContextOptions<LinsGroceryContext> options) : base(options)
        {
            
        }

        private readonly GroceryCrypt crypt = new GroceryCrypt();

        public async Task<UserModel?> AddUserAsync(UserModel userModel)
        {
            var userExist = await DB.Users.FirstOrDefaultAsync(u => u.UserEmail == userModel.Email);
            if (userExist != null) throw new Exception("User with email: '" + userModel.Email + "' is already taken");

            string originalPassword = crypt.Decrypt(userModel.Password);

            // Encrypt the password Before saving to DB
            userModel.Password = BCrypt.Net.BCrypt.HashPassword(originalPassword);

            User user = userModel.ConvertToUser();

            DB.Users.Add(user);
            await DB.SaveChangesAsync();
            userModel.ID = user.UserId;
            return userModel;
        }


        public async Task<UserModel?> Login(UserModel userModel)
        {

            var user = await DB.Users.SingleOrDefaultAsync(u => u.UserEmail == userModel.Email);
            if (user != null)
            {

                string originalPassword = crypt.Decrypt(userModel.Password);

                bool passwordMatches = BCrypt.Net.BCrypt.Verify(originalPassword, user.UserPassword);
                if (passwordMatches)
                {
                    // return user data if login is successful
                    return new UserModel(user);
                }
            } 
            return null; 

        }

        public async Task<UserModel?> GetUserByCredentials(CredentialsModel credentials)
        {
            var user = await DB.Users.SingleOrDefaultAsync(u => u.UserEmail == credentials.Email);
            if (user != null)
            {

                string originalPassword = crypt.Decrypt(credentials.Password);

                bool passwordMatches = BCrypt.Net.BCrypt.Verify(originalPassword, user.UserPassword);
                if (passwordMatches)
                {
                    // return user data if login is successful
                    return new UserModel(user);
                }
            }
            return null;
        }

    }
}

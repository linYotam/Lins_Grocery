using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Grocery
{
    public class JwtHelper
    {
        private readonly SymmetricSecurityKey symmetricSecurityKey;

        public JwtHelper(string key) //Must be a minimum of 16 chars
        {
            byte[] keyBytes = Encoding.ASCII.GetBytes(key);
            symmetricSecurityKey = new SymmetricSecurityKey(keyBytes);
        }

        public string GetJwtToken(string username, string role)
        {
            // Create JWT Claims:
            Claim claimByUsername = new Claim(ClaimTypes.Name, username);
            Claim claimByRole = new Claim(ClaimTypes.Role, role);
            List<Claim> claims = new List<Claim> { claimByUsername, claimByRole };
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims);

            // Encrypitons:
            SigningCredentials signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha512);

            // Descriptor:
            SecurityTokenDescriptor securityTokenDescriptor = new SecurityTokenDescriptor();
            securityTokenDescriptor.Subject = claimsIdentity;
            securityTokenDescriptor.SigningCredentials = signingCredentials;
            securityTokenDescriptor.Expires = DateTime.UtcNow.AddDays(1);

            // Token:
            JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
            string token = jwtSecurityTokenHandler.WriteToken(securityToken);

            return token;

        }
    }
}

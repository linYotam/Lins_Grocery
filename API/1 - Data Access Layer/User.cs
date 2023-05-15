using System;
using System.Collections.Generic;

namespace Grocery;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string UserEmail { get; set; } = null!;

    public string UserPassword { get; set; } = null!;

    public string? UserType { get; set; }

    public string JwtToken { get; set; } = null!;

    public virtual Employee? Employee { get; set; }

    public virtual ICollection<UserCart> UserCarts { get; set; } = new List<UserCart>();
}

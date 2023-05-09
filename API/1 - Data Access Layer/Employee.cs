using System;
using System.Collections.Generic;

namespace Grocery;

public partial class Employee
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string JobTitle { get; set; } = null!;

    public bool? IsActive { get; set; }

    public DateTime DateCreated { get; set; }

    public virtual User User { get; set; } = null!;
}

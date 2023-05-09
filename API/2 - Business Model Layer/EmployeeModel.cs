using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grocery
{
    public class EmployeeModel
    {
        public int ID { get; set; }

        public string UserName { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string JobTitle { get; set; } = null!;

        public bool? IsActive { get; set; }

        public DateTime DateCreated { get; set; }

        public EmployeeModel() { }

        public EmployeeModel(Employee employee)
        {
            ID = employee.UserId;
            UserName = employee.UserName;
            FirstName = employee.FirstName;
            LastName = employee.LastName;
            Email = employee.Email;
            Password = employee.Password;
            JobTitle = employee.JobTitle;
            IsActive = employee.IsActive;
            DateCreated = employee.DateCreated;
        }
    }
}



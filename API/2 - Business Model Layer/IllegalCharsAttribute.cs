using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grocery
{
    public class IllegalCharsAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null) return ValidationResult.Success;

            if (value.ToString().Contains("--")) return new ValidationResult("-- is illegal");

            if (value.ToString().Contains(";")) return new ValidationResult("; is illegal");

            return ValidationResult.Success;
        }
    }
}

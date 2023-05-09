using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grocery
{
    public abstract class BaseLogic : IDisposable
    {

        protected readonly LinsGroceryContext DB = new LinsGroceryContext();

        public void Dispose()
        {
            DB.Dispose();
        }
    }
}

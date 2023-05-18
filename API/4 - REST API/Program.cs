using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting.Internal;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.FileProviders;

namespace Grocery
{
    public class Program
    {
        public IConfiguration Configuration { get; set; }

        public static void Main(string[] args)
        {

            // 1. Create Builder
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyOrigin",
                    builder => builder.AllowAnyOrigin()
                                      .AllowAnyHeader()
                                      .AllowAnyMethod());
            });
            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configure the IWebHostEnvironment
            builder.Services.AddSingleton<IWebHostEnvironment>(env => builder.Environment);

            builder.Services.AddDbContext<LinsGroceryContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("LinsGroceryConnection"));
            });

            //var program = new Program();
            //program.Configuration = builder.Configuration;

            JwtHelper jwtHelper = new JwtHelper(builder.Configuration.GetValue<string>("JWT:Key"));

            builder.Services.AddSingleton(jwtHelper);

            //Enable JWT authentication
            builder.Services.AddAuthentication(options => jwtHelper.SetAuthenticationOptions(options)).AddJwtBearer(options => jwtHelper.SetBearerOptions(options));

            builder.Services.AddScoped<CategoriesLogic>(); // Change the lifetime to scoped
            builder.Services.AddScoped<ProductsLogic>();
            builder.Services.AddScoped<UserCartLogic>();
            builder.Services.AddScoped<UserLogic>();

            // 2. Build
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors(options => options.AllowAnyOrigin()
                                          .AllowAnyMethod()
                                          .AllowAnyHeader());

            // Add static files to the pipeline
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images")),
                RequestPath = "/images"
            });

            app.MapControllers();

            // 3. Run
            app.Run();
        }

    }
}
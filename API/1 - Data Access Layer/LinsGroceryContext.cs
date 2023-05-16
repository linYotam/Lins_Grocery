using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Grocery;

public partial class LinsGroceryContext : DbContext
{
    public LinsGroceryContext()
    {
    }

    public LinsGroceryContext(DbContextOptions<LinsGroceryContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserCart> UserCarts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-5A98KU6\\SQLEXPRESS;Database=LinsGrocery;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(50)
                .HasColumnName("category_name");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.UserId);

            entity.Property(e => e.UserId)
                .ValueGeneratedOnAdd()
                .HasColumnName("user_id");
            entity.Property(e => e.DateCreated)
                .HasColumnType("datetime")
                .HasColumnName("date_created");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("first_name");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("((1))")
                .HasColumnName("is_active");
            entity.Property(e => e.JobTitle)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("job_title");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("last_name");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("user_name");

            entity.HasOne(d => d.User).WithOne(p => p.Employee)
                .HasForeignKey<Employee>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Employees_Users");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.Discount).HasColumnName("discount");
            entity.Property(e => e.Discontinued).HasColumnName("discontinued");
            entity.Property(e => e.ImageData).HasColumnName("image_data");
            entity.Property(e => e.ProductCurrentPrice)
                .HasColumnType("money")
                .HasColumnName("product_current_price");
            entity.Property(e => e.ProductDescription).HasColumnName("product_description");
            entity.Property(e => e.ProductExtra)
                .HasMaxLength(50)
                .HasColumnName("product_extra");
            entity.Property(e => e.ProductName)
                .HasMaxLength(100)
                .HasColumnName("product_name");
            entity.Property(e => e.ProductTitle)
                .HasMaxLength(100)
                .HasColumnName("product_title");
            entity.Property(e => e.ProductWeight)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("product_weight");
            entity.Property(e => e.ProductWeightMsr)
                .HasMaxLength(5)
                .HasColumnName("product_weight_msr");
            entity.Property(e => e.QuantityPerUnit).HasColumnName("quantity_per_unit");
            entity.Property(e => e.UnitPrice)
                .HasColumnType("money")
                .HasColumnName("unit_price");
            entity.Property(e => e.UnitsInStock).HasColumnName("units_in_stock");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Products_Categories");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.JwtToken)
                .HasMaxLength(255)
                .HasColumnName("jwt_token");
            entity.Property(e => e.UserEmail)
                .HasMaxLength(50)
                .HasColumnName("user_email");
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .HasColumnName("user_name");
            entity.Property(e => e.UserPassword)
                .HasMaxLength(255)
                .HasColumnName("user_password");
            entity.Property(e => e.UserType)
                .HasMaxLength(10)
                .HasColumnName("user_type");
        });

        modelBuilder.Entity<UserCart>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.ToTable("UserCart");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Product).WithMany(p => p.UserCarts)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserCart_Products");

            entity.HasOne(d => d.User).WithMany(p => p.UserCarts)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserCart_Users");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace webshopAPI.domain.Entities;

public partial class WebshopContext : DbContext
{
    public WebshopContext()
    {
    }

    public WebshopContext(DbContextOptions<WebshopContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cart> Cart { get; set; }

    public virtual DbSet<Faq> Faq { get; set; }

    public virtual DbSet<Order> Order { get; set; }

    public virtual DbSet<OrderItems> OrderItems { get; set; }

    public virtual DbSet<Product> Product { get; set; }

    public virtual DbSet<ProductCategory> ProductCategory { get; set; }

    public virtual DbSet<PromotionMail> PromotionMail { get; set; }

    public virtual DbSet<Review> Review { get; set; }

    public virtual DbSet<Service> Service { get; set; }

    public virtual DbSet<Users> Users { get; set; }

    public virtual DbSet<Vendor> Vendor { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DANI-LAPTOP\\SQLEXPRESS;Initial Catalog=Webshop;Integrated Security=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cart>(entity =>
        {
            entity.ToTable("cart");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ProductId).HasColumnName("productId");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Product).WithMany(p => p.Cart)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_cart_product");

            entity.HasOne(d => d.User).WithMany(p => p.Cart)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_cart_users");
        });

        modelBuilder.Entity<Faq>(entity =>
        {
            entity.ToTable("faq");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Answer)
                .IsRequired()
                .HasMaxLength(500)
                .HasColumnName("answer");
            entity.Property(e => e.Question)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("question");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("order");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.PaymentMethod)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("paymentMethod");
            entity.Property(e => e.ShipmentMethod)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("shipmentMethod");
            entity.Property(e => e.Timestamp)
                .HasColumnType("datetime")
                .HasColumnName("timestamp");
            entity.Property(e => e.UserId).HasColumnName("userId");
        });

        modelBuilder.Entity<OrderItems>(entity =>
        {
            entity.ToTable("orderItems");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.OrderId).HasColumnName("orderId");
            entity.Property(e => e.ProductId).HasColumnName("productId");
            entity.Property(e => e.Quantity).HasColumnName("quantity");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_orderItems_order");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_orderItems_product");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("product");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Active).HasColumnName("active");
            entity.Property(e => e.CategoryId).HasColumnName("categoryId");
            entity.Property(e => e.Discount).HasColumnName("discount");
            entity.Property(e => e.ImageUrl)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("imageUrl");
            entity.Property(e => e.OurChoice).HasColumnName("ourChoice");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.ProductDescription)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("productDescription");
            entity.Property(e => e.ProductName)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("productName");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.Trending).HasColumnName("trending");
            entity.Property(e => e.VendorId).HasColumnName("vendorId");

            entity.HasOne(d => d.Category).WithMany(p => p.Product)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_product_productCategory");

            entity.HasOne(d => d.Vendor).WithMany(p => p.Product)
                .HasForeignKey(d => d.VendorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_product_vendor");
        });

        modelBuilder.Entity<ProductCategory>(entity =>
        {
            entity.ToTable("productCategory");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryName)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("categoryName");
        });

        modelBuilder.Entity<PromotionMail>(entity =>
        {
            entity.ToTable("promotionMail");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.ToTable("review");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ProductId).HasColumnName("productId");
            entity.Property(e => e.ReviewText)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("reviewText");
            entity.Property(e => e.Star).HasColumnName("star");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Product).WithMany(p => p.Review)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_review_product");

            entity.HasOne(d => d.User).WithMany(p => p.Review)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_review_users");
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.ToTable("service");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.ErrorDescription)
                .IsRequired()
                .HasMaxLength(500)
                .HasColumnName("errorDescription");
            entity.Property(e => e.OrderId).HasColumnName("orderId");

            entity.HasOne(d => d.Order).WithMany(p => p.Service)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_service_order");
        });

        modelBuilder.Entity<Users>(entity =>
        {
            entity.ToTable("users");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Active).HasColumnName("active");
            entity.Property(e => e.Address)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("address");
            entity.Property(e => e.Admin).HasColumnName("admin");
            entity.Property(e => e.AvatarUrl)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("avatarUrl");
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .IsRequired()
                .HasMaxLength(20)
                .HasColumnName("password");
            entity.Property(e => e.PhoneNumber)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("phoneNumber");
            entity.Property(e => e.PostalNumber)
                .IsRequired()
                .HasMaxLength(20)
                .HasColumnName("postalNumber");
            entity.Property(e => e.Username)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        modelBuilder.Entity<Vendor>(entity =>
        {
            entity.ToTable("vendor");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.VendorName)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("vendorName");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
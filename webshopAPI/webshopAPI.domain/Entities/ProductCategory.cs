﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace webshopAPI.domain.Entities;

public partial class ProductCategory
{
    public int Id { get; set; }

    public string CategoryName { get; set; }

    public virtual ICollection<Product> Product { get; set; } = new List<Product>();
}
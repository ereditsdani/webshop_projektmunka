﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace webshopAPI.domain.Entities;

public partial class Service
{
    public int Id { get; set; }

    public string Email { get; set; }

    public string ErrorDescription { get; set; }

    public int OrderId { get; set; }

    public bool? Solved { get; set; }

    public virtual Order Order { get; set; }
}
namespace webshopAPI.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }

        public string ProductName { get; set; }

        public string ProductDescription { get; set; }

        public int Price { get; set; }

        public int? Discount { get; set; }

        public int Quantity { get; set; }

        public ProductCategoryDTO ProductCategory { get; set; }

        public VendorDTO ProductVendor { get; set; }

        public bool Trending { get; set; }

        public string ImageUrl { get; set; }

        public bool OurChoice { get; set; }
        public int OrderAmount { get; set; }
    }
}

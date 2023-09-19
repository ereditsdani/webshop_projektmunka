using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;
using webshopAPI.DTOs;
using webshopAPI.Services.Abstract;

namespace webshopAPI.Services.Concrete
{
    public class ProductService : IProductService
    {
        public readonly IProductRepository _productRepository;
        public readonly IProductCategoryRepository _productCategoryRepository;
        public readonly IVendorRepository _vendorRepository;

        public ProductService(IProductRepository productRepository, IProductCategoryRepository productCategoryRepository, IVendorRepository vendorRepository)
        {
            _productRepository = productRepository;
            _productCategoryRepository = productCategoryRepository;
            _vendorRepository = vendorRepository;
        }

        public List<ProductDTO> GetProducts()
        {
            try
            {
                List<Product> products = _productRepository.GetProducts();
                List<ProductDTO> productDTOs = new List<ProductDTO>();
                ProductCategory productCategory;
                ProductCategoryDTO productCategoryDTO;
                Vendor vendor;
                VendorDTO vendorDTO;
                ProductDTO productDTO;
                foreach (var product in products)
                {
                    productCategoryDTO = new();
                    productCategory = _productCategoryRepository.GetProductCategoryById(product.CategoryId);
                    productCategoryDTO.Id = productCategory.Id;
                    productCategoryDTO.CategoryName = productCategory.CategoryName;

                    vendorDTO = new();
                    vendor = _vendorRepository.GetVendorById(product.VendorId);
                    vendorDTO.Id = vendor.Id;
                    vendorDTO.VendorName = vendor.VendorName;

                    productDTO = new();
                    productDTO.Id = product.Id;
                    productDTO.ProductName = product.ProductName;
                    productDTO.Trending = product.Trending;
                    productDTO.Price = product.Price;
                    productDTO.Quantity = product.Quantity;
                    productDTO.ImageUrl = product.ImageUrl;
                    productDTO.OurChoice = product.OurChoice;
                    productDTO.ProductDescription = product.ProductDescription;
                    productDTO.ProductVendor = vendorDTO;
                    productDTO.Discount = product.Discount;
                    productDTO.ProductCategory = productCategoryDTO;

                    productDTOs.Add(productDTO);
                }

                return productDTOs;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

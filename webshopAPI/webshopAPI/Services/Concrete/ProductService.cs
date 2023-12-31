﻿using webshopAPI.domain.Entities;
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

        public void DeleteProducts(List<ProductDTO> products)
        {
            try
            {
                List<Product> deleteProducts = new();
                Product seged;

                foreach (var item in products)
                {
                    seged = new();
                    seged.Id = item.Id;
                    deleteProducts.Add(seged);
                }
                _productRepository.DeleteProduct(deleteProducts);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void EditProduct(ProductDTO product)
        {
            Product newProduct = new();

            newProduct.Id = product.Id;
            newProduct.ProductName = product.ProductName;
            newProduct.ProductDescription = product.ProductDescription;
            newProduct.Price = product.Price;
            newProduct.Discount = product.Discount;
            newProduct.Quantity = product.Quantity;
            newProduct.CategoryId = product.ProductCategory.Id;
            newProduct.VendorId = product.ProductVendor.Id;
            newProduct.Trending = product.Trending;
            newProduct.ImageUrl = product.ImageUrl;
            newProduct.OurChoice = product.OurChoice;

            _productRepository.EditProduct(newProduct);
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

        public void SaveNewProduct(ProductDTO product)
        {
            try
            {
                Product newProduct = new();

                newProduct.ProductName = product.ProductName;
                newProduct.ProductDescription = product.ProductDescription;
                newProduct.Price = product.Price;
                newProduct.Discount = product.Discount;
                newProduct.Quantity = product.Quantity;
                newProduct.CategoryId = product.ProductCategory.Id;
                newProduct.VendorId = product.ProductVendor.Id;
                newProduct.Trending = product.Trending;
                newProduct.ImageUrl = product.ImageUrl;
                newProduct.OurChoice = product.OurChoice;

                _productRepository.SaveNewProduct(newProduct);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

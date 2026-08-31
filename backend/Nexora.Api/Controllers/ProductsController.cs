using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nexora.Api.Data;
using Nexora.Api.DTOs;
using Nexora.Api.Models;

namespace Nexora.Api.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly NexoraDbContext _context;

        public ProductsController(NexoraDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(string id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(ProductCreateDto dto)
        {
            var product = new Product
            {
                Id = Guid.NewGuid().ToString(),
                Name = dto.Name,
                Category = dto.Category,
                Price = dto.Price,
                OldPrice = dto.OldPrice,
                Rating = dto.Rating,
                Description = dto.Description,
                Specs = dto.Specs,
                Image = dto.Image
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Created($"api/products/{product.Id}", product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(string id, ProductUpdateDto dto)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            product.Name = dto.Name;
            product.Category = dto.Category;
            product.Price = dto.Price;
            product.OldPrice = dto.OldPrice;
            product.Rating = dto.Rating;
            product.Description = dto.Description;
            product.Specs = dto.Specs;
            product.Image = dto.Image;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

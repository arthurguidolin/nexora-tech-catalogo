using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nexora.Api.Data;
using Nexora.Api.DTOs;
using Nexora.Api.Models;

namespace Nexora.Api.Controllers
{
    [ApiController]
    [Route("api/cart")]
    public class CartController : ControllerBase
    {
        private readonly NexoraDbContext _context;

        public CartController(NexoraDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItemReadDto>>> GetCartItems()
        {
            var items = await _context.CartItems
                .Select(item => new CartItemReadDto
                {
                    Id = item.Id,
                    UserEmail = item.UserEmail,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity
                })
                .ToListAsync();

            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CartItemReadDto>> GetCartItemById(Guid id)
        {
            var item = await _context.CartItems.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            var readDto = new CartItemReadDto
            {
                Id = item.Id,
                UserEmail = item.UserEmail,
                ProductId = item.ProductId,
                Quantity = item.Quantity
            };

            return Ok(readDto);
        }

        [HttpPost]
        public async Task<ActionResult<CartItemReadDto>> CreateCartItem(CartItemCreateDto dto)
        {
            var item = new CartItem
            {
                Id = Guid.NewGuid(),
                UserEmail = dto.UserEmail,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity
            };

            _context.CartItems.Add(item);
            await _context.SaveChangesAsync();

            var readDto = new CartItemReadDto
            {
                Id = item.Id,
                UserEmail = item.UserEmail,
                ProductId = item.ProductId,
                Quantity = item.Quantity
            };

            return CreatedAtAction(nameof(GetCartItemById), new { id = item.Id }, readDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCartItem(Guid id, CartItemUpdateDto dto)
        {
            var item = await _context.CartItems.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            item.Quantity = dto.Quantity;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(Guid id)
        {
            var item = await _context.CartItems.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nexora.Api.Data;
using Nexora.Api.DTOs;
using Nexora.Api.Models;

namespace Nexora.Api.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly NexoraDbContext _context;

        public OrdersController(NexoraDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderReadDto>>> GetOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.Items)
                .Select(o => new OrderReadDto
                {
                    Id = o.Id,
                    OrderNumber = o.OrderNumber,
                    UserEmail = o.UserEmail,
                    Subtotal = o.Subtotal,
                    Discount = o.Discount,
                    Total = o.Total,
                    Address = o.Address,
                    PaymentMethod = o.PaymentMethod,
                    CreatedAt = o.CreatedAt,
                    Items = o.Items.Select(i => new OrderItemReadDto
                    {
                        Id = i.Id,
                        ProductId = i.ProductId,
                        ProductName = i.ProductName,
                        Price = i.Price,
                        Quantity = i.Quantity
                    }).ToList()
                })
                .ToListAsync();

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderReadDto>> GetOrderById(Guid id)
        {
            var order = await _context.Orders
                .Include(o => o.Items)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            var readDto = new OrderReadDto
            {
                Id = order.Id,
                OrderNumber = order.OrderNumber,
                UserEmail = order.UserEmail,
                Subtotal = order.Subtotal,
                Discount = order.Discount,
                Total = order.Total,
                Address = order.Address,
                PaymentMethod = order.PaymentMethod,
                CreatedAt = order.CreatedAt,
                Items = order.Items.Select(i => new OrderItemReadDto
                {
                    Id = i.Id,
                    ProductId = i.ProductId,
                    ProductName = i.ProductName,
                    Price = i.Price,
                    Quantity = i.Quantity
                }).ToList()
            };

            return Ok(readDto);
        }

        [HttpPost]
        public async Task<ActionResult<OrderReadDto>> CreateOrder(OrderCreateDto dto)
        {
            var orderId = Guid.NewGuid();
            var timePart = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString().Substring(7);
            var randomPart = Random.Shared.Next(100000, 999999);
            var orderNumber = $"NEX-{timePart}{randomPart}";

            var order = new Order
            {
                Id = orderId,
                OrderNumber = orderNumber,
                UserEmail = dto.UserEmail,
                Subtotal = dto.Subtotal,
                Discount = dto.Discount,
                Total = dto.Total,
                Address = dto.Address,
                PaymentMethod = dto.PaymentMethod,
                CreatedAt = DateTime.UtcNow,
                Items = dto.Items.Select(i => new OrderItem
                {
                    Id = Guid.NewGuid(),
                    OrderId = orderId,
                    ProductId = i.ProductId,
                    ProductName = i.ProductName,
                    Price = i.Price,
                    Quantity = i.Quantity
                }).ToList()
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            var readDto = new OrderReadDto
            {
                Id = order.Id,
                OrderNumber = order.OrderNumber,
                UserEmail = order.UserEmail,
                Subtotal = order.Subtotal,
                Discount = order.Discount,
                Total = order.Total,
                Address = order.Address,
                PaymentMethod = order.PaymentMethod,
                CreatedAt = order.CreatedAt,
                Items = order.Items.Select(i => new OrderItemReadDto
                {
                    Id = i.Id,
                    ProductId = i.ProductId,
                    ProductName = i.ProductName,
                    Price = i.Price,
                    Quantity = i.Quantity
                }).ToList()
            };

            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, readDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(Guid id, OrderUpdateDto dto)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            order.Address = dto.Address;
            order.PaymentMethod = dto.PaymentMethod;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            var order = await _context.Orders
                .Include(o => o.Items)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

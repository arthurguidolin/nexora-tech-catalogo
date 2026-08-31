namespace Nexora.Api.DTOs
{
    public class OrderCreateDto
    {
        public required string UserEmail { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
        public required string Address { get; set; }
        public required string PaymentMethod { get; set; }
        public List<OrderItemCreateDto> Items { get; set; } = new();
    }
}

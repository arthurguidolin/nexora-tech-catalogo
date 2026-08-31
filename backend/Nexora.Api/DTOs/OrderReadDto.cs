namespace Nexora.Api.DTOs
{
    public class OrderReadDto
    {
        public Guid Id { get; set; }
        public required string OrderNumber { get; set; }
        public required string UserEmail { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
        public required string Address { get; set; }
        public required string PaymentMethod { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<OrderItemReadDto> Items { get; set; } = new();
    }
}

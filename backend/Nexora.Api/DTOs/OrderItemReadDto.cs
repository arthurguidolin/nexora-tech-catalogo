namespace Nexora.Api.DTOs
{
    public class OrderItemReadDto
    {
        public Guid Id { get; set; }
        public required string ProductId { get; set; }
        public required string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}

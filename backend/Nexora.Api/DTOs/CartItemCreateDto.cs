namespace Nexora.Api.DTOs
{
    public class CartItemCreateDto
    {
        public required string UserEmail { get; set; }
        public required string ProductId { get; set; }
        public int Quantity { get; set; } = 1;
    }
}

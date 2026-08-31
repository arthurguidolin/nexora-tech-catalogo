namespace Nexora.Api.DTOs
{
    public class CartItemReadDto
    {
        public Guid Id { get; set; }
        public required string UserEmail { get; set; }
        public required string ProductId { get; set; }
        public int Quantity { get; set; }
    }
}

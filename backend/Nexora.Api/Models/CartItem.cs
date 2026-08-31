namespace Nexora.Api.Models
{
    public class CartItem
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string UserEmail { get; set; }
        public required string ProductId { get; set; }
        public int Quantity { get; set; }
    }
}

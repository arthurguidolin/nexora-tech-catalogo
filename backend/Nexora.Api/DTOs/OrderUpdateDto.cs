namespace Nexora.Api.DTOs
{
    public class OrderUpdateDto
    {
        public required string Address { get; set; }
        public required string PaymentMethod { get; set; }
    }
}

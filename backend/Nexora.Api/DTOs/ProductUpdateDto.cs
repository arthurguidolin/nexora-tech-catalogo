namespace Nexora.Api.DTOs
{
    public class ProductUpdateDto
    {
        public required string Name { get; set; }
        public required string Category { get; set; }
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public double Rating { get; set; }
        public required string Description { get; set; }
        public required string Specs { get; set; }
        public required string Image { get; set; }
    }
}

namespace Nexora.Api.Models
{
    public class Product
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required string Category { get; set; }
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public double Rating { get; set; }
        public required string Description { get; set; }
        public required string Specs { get; set; }
        public required string Image { get; set; }

        // Propriedade calculada baseada na regra do frontend: Math.round((1 - price / oldPrice) * 100)
        public int Discount
        {
            get
            {
                if (OldPrice.HasValue && OldPrice.Value > 0)
                {
                    return (int)Math.Round((1 - (Price / OldPrice.Value)) * 100);
                }
                return 0;
            }
        }
    }
}

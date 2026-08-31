namespace Nexora.Api.DTOs
{
    public class UserReadDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
    }
}

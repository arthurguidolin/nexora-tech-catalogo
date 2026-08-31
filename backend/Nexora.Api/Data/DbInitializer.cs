using Nexora.Api.Models;

namespace Nexora.Api.Data
{
    public static class DbInitializer
    {
        public static void Initialize(NexoraDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Products.Count() < 24)
            {
                context.Products.RemoveRange(context.Products);
                context.SaveChanges();
            }
            else
            {
                return; // Todos os 24 produtos já estão no banco
            }

            var products = new Product[]
            {
                // Placas de vídeo (GPUs)
                new Product { Id = "g1", Name = "Gainward GeForce RTX 5070 12GB", Category = "gpu", Price = 2199m, OldPrice = 2499m, Rating = 4.8, Description = "Potência avançada para jogar em alta resolução com ray tracing.", Specs = "12GB GDDR7 • GeForce RTX 5070 • DLSS 4", Image = "assets/images/gpu/gpu1.png" },
                new Product { Id = "g2", Name = "ZOTAC Gaming GeForce RTX 5060 8GB", Category = "gpu", Price = 3699m, OldPrice = 4099m, Rating = 4.9, Description = "Desempenho equilibrado para games em Full HD e QHD.", Specs = "8GB GDDR7 • GeForce RTX 5060 • DLSS 4", Image = "assets/images/gpu/gpu2.png" },
                new Product { Id = "g3", Name = "AORUS Xtreme GeForce RTX 5090 32GB", Category = "gpu", Price = 1999m, OldPrice = null, Rating = 4.7, Description = "Desempenho extremo para games em 4K e criação profissional.", Specs = "32GB GDDR7 • GeForce RTX 5090 • Waterforce • DLSS 4", Image = "assets/images/gpu/gpu3.png" },
                new Product { Id = "g4", Name = "PowerColor Hellhound Radeon RX 7600 8GB", Category = "gpu", Price = 3899m, OldPrice = 4299m, Rating = 4.8, Description = "Uma placa eficiente para jogar em 1080p com alta fluidez.", Specs = "8GB GDDR6 • RDNA 3 • DisplayPort 2.1", Image = "assets/images/gpu/gpu4.png" },

                // Processadores (CPUs)
                new Product { Id = "c1", Name = "Ryzen 7 8700F", Category = "cpu", Price = 1249m, OldPrice = 1399m, Rating = 4.8, Description = "Desempenho sólido para jogos e multitarefa com ótima eficiência.", Specs = "6 núcleos • 12 threads • até 5.1 GHz • 32MB Cache", Image = "assets/images/cpu/cpu1.png" },
                new Product { Id = "c2", Name = "Ryzen 9 7900", Category = "cpu", Price = 1799m, OldPrice = null, Rating = 4.9, Description = "Potência refinada para produtividade, streaming e gaming sem travamentos.", Specs = "8 núcleos • 16 threads • até 5.3 GHz • 40MB Cache", Image = "assets/images/cpu/cpu2.png" },
                new Product { Id = "c3", Name = "Core i3 13400F", Category = "cpu", Price = 1799m, OldPrice = 1999m, Rating = 4.8, Description = "Arquitetura híbrida para criar, compor e competir com excelente equilíbrio.", Specs = "14 núcleos • 20 threads • até 5.3 GHz • 24MB Cache", Image = "assets/images/cpu/cpu3.png" },
                new Product { Id = "c4", Name = "Ryzen 7 5700X", Category = "cpu", Price = 1149m, OldPrice = null, Rating = 4.9, Description = "Performance premium para workloads pesados, jogos e edição profissional.", Specs = "20 núcleos • 28 threads • até 5.6 GHz • 33MB Cache", Image = "assets/images/cpu/cpu4.png" },

                // Monitores
                new Product { Id = "m1", Name = "Asus Tuf Gaming 27\" 240Hz", Category = "monitors", Price = 1099m, OldPrice = 1299m, Rating = 4.8, Description = "Velocidade e cores vibrantes para sua arena.", Specs = "27\" Fast IPS • 240Hz • 0.3ms • QHD", Image = "assets/images/monitors/monitor1.png" },
                new Product { Id = "m2", Name = "Asus ProArt 27\" 4K", Category = "monitors", Price = 1799m, OldPrice = null, Rating = 4.9, Description = "Cores precisas e resolução 4K para criação profissional.", Specs = "27\" IPS • 60Hz • 5ms • 4K UHD", Image = "assets/images/monitors/monitor2.png" },
                new Product { Id = "m3", Name = "BenQ 28.2\" 4K UHD", Category = "monitors", Price = 2099m, OldPrice = 2399m, Rating = 4.8, Description = "Mais linhas de código e produtividade para o seu fluxo de trabalho.", Specs = "28.2\" IPS • 60Hz • 4K UHD • Modo programação", Image = "assets/images/monitors/monitor3.png" },
                new Product { Id = "m4", Name = "Samsung OLED 49\" DQHD 240Hz", Category = "monitors", Price = 3299m, OldPrice = null, Rating = 4.7, Description = "Imersão ultrawide com contraste OLED e fluidez para competir.", Specs = "49\" OLED • DQHD • 240Hz • 0.03ms", Image = "assets/images/monitors/monitor4.png" },

                // Teclados
                new Product { Id = "k1", Name = "Tecaldo Mecânico 75%", Category = "keyboards", Price = 349m, OldPrice = null, Rating = 4.7, Description = "Compacto, preciso e feito para vencer.", Specs = "60% • Switch red • RGB", Image = "assets/images/keyboards/teclado1.png" },
                new Product { Id = "k2", Name = "Teclado Magnético Hot-Swap", Category = "keyboards", Price = 499m, OldPrice = 599m, Rating = 4.8, Description = "A resposta tátil que seu jogo pede.", Specs = "75% • Switch brown • Hot-swap", Image = "assets/images/keyboards/teclado2.png" },
                new Product { Id = "k3", Name = "Teclado Redragon TKL RGB", Category = "keyboards", Price = 649m, OldPrice = null, Rating = 4.9, Description = "O formato TKL que equilibra espaço e controle.", Specs = "TKL • Switch blue • RGB", Image = "assets/images/keyboards/teclado3.png" },
                new Product { Id = "k4", Name = "Logitech GPRO X", Category = "keyboards", Price = 899m, OldPrice = 999m, Rating = 4.9, Description = "O teclado definitivo para seu setup.", Specs = "Full size • Switch optical • PBT", Image = "assets/images/keyboards/teclado4.png" },

                // Mouses
                new Product { Id = "mo1", Name = "Redragon Wireless", Category = "mice", Price = 179m, OldPrice = null, Rating = 4.6, Description = "Leveza que acompanha seus reflexos.", Specs = "59g • 8000 DPI • 6 botões", Image = "assets/images/mice/mouse1.png" },
                new Product { Id = "mo2", Name = "Zowie", Category = "mice", Price = 279m, OldPrice = 329m, Rating = 4.8, Description = "Ergonomia e precisão sem fio.", Specs = "69g • 16000 DPI • Wireless", Image = "assets/images/mice/mouse2.png" },
                new Product { Id = "mo3", Name = "Marvo Wireless", Category = "mice", Price = 399m, OldPrice = null, Rating = 4.8, Description = "Sensor premium para a sua melhor jogada.", Specs = "63g • 26000 DPI • PTFE", Image = "assets/images/mice/mouse3.png" },
                new Product { Id = "mo4", Name = "Havit Wireless", Category = "mice", Price = 599m, OldPrice = null, Rating = 4.9, Description = "O auge do controle competitivo.", Specs = "58g • 30000 DPI • 4K wireless", Image = "assets/images/mice/mouse4.png" },

                // Acessórios
                new Product { Id = "a1", Name = "Mousepad Logitech", Category = "accessories", Price = 129m, OldPrice = null, Rating = 4.7, Description = "Superfície ampla e estável com acabamento premium para precisão.", Specs = "900 × 400mm • Base emborrachada • Borda antiderrapante", Image = "assets/images/accessories/acessorio4.png" },
                new Product { Id = "a2", Name = "Microfone Gamer RGB", Category = "accessories", Price = 149m, OldPrice = 179m, Rating = 4.6, Description = "Som nítido e visual marcante para stream, calls e gravações.", Specs = "USB • 48kHz • RGB • Suporte ajustável", Image = "assets/images/accessories/acessorio2.png" },
                new Product { Id = "a3", Name = "HUB USB", Category = "accessories", Price = 229m, OldPrice = null, Rating = 4.7, Description = "Conexões rápidas para todos os seus dispositivos.", Specs = "USB-C • 5 portas • 5Gbps • LED RGB", Image = "assets/images/accessories/acessorio3.png" },
                new Product { Id = "a4", Name = "Suporte para Monitor", Category = "accessories", Price = 399m, OldPrice = 449m, Rating = 4.8, Description = "Ergonomia e espaço para uma mesa impecável.", Specs = "17–32\" • Pistão a gás • VESA • Ajuste em altura", Image = "assets/images/accessories/acessorio1.png" }
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}

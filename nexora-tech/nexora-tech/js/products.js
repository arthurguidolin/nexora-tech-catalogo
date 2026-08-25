const categories = [
  {
    id: 'gpu',
    name: 'Placas de vídeo',
    icon: '◈',
    description: 'Gráficos sem limites'
  },
  {
    id: 'cpu',
    name: 'Processadores',
    icon: '◉',
    description: 'Potência em cada núcleo'
  },
  {
    id: 'monitors',
    name: 'Monitores',
    icon: '▣',
    description: 'Imersão em alta definição'
  },
  {
    id: 'keyboards',
    name: 'Teclados',
    icon: '⌨',
    description: 'Precisão a cada toque'
  },
  {
    id: 'mice',
    name: 'Mouses',
    icon: '◒',
    description: 'Controle na velocidade'
  },
  {
    id: 'accessories',
    name: 'Acessórios',
    icon: '✦',
    description: 'Detalhes que fazem diferença'
  }
];

const monitorImages = {
  m1: 'assets/images/monitors/monitor1.png',
  m2: 'assets/images/monitors/monitor2.png',
  m3: 'assets/images/monitors/monitor3.png',
  m4: 'assets/images/monitors/monitor4.png'
};

const gpuImages = {
  g1: 'assets/images/gpu/gpu1.png',
  g2: 'assets/images/gpu/gpu2.png',
  g3: 'assets/images/gpu/gpu3.png',
  g4: 'assets/images/gpu/gpu4.png'
};

const cpuImages = {
  c1: 'assets/images/cpu/cpu1.png',
  c2: 'assets/images/cpu/cpu2.png',
  c3: 'assets/images/cpu/cpu3.png',
  c4: 'assets/images/cpu/cpu4.png'
};

const accessoryImages = {
  a1: 'assets/images/accessories/acessorio4.png',
  a2: 'assets/images/accessories/acessorio2.png',
  a3: 'assets/images/accessories/acessorio3.png',
  a4: 'assets/images/accessories/acessorio1.png'
};

const mouseImages = {
  mo1: 'assets/images/mice/mouse1.png',
  mo2: 'assets/images/mice/mouse2.png',
  mo3: 'assets/images/mice/mouse3.png',
  mo4: 'assets/images/mice/mouse4.png'
};

const keyboardImages = {
  k1: 'assets/images/keyboards/teclado1.png',
  k2: 'assets/images/keyboards/teclado2.png',
  k3: 'assets/images/keyboards/teclado3.png',
  k4: 'assets/images/keyboards/teclado4.png'
};

const products = [
  // Placas de vídeo
  [
    'g1',
    'Gainward GeForce RTX 5070 12GB',
    'gpu',
    2199,
    2499,
    4.8,
    'Potência avançada para jogar em alta resolução com ray tracing.',
    '12GB GDDR7 • GeForce RTX 5070 • DLSS 4'
  ],
  [
    'g2',
    'ZOTAC Gaming GeForce RTX 5060 8GB',
    'gpu',
    3699,
    4099,
    4.9,
    'Desempenho equilibrado para games em Full HD e QHD.',
    '8GB GDDR7 • GeForce RTX 5060 • DLSS 4'
  ],
  [
    'g3',
    'AORUS Xtreme GeForce RTX 5090 32GB',
    'gpu',
    1999,
    null,
    4.7,
    'Desempenho extremo para games em 4K e criação profissional.',
    '32GB GDDR7 • GeForce RTX 5090 • Waterforce • DLSS 4'
  ],
  [
    'g4',
    'PowerColor Hellhound Radeon RX 7600 8GB',
    'gpu',
    3899,
    4299,
    4.8,
    'Uma placa eficiente para jogar em 1080p com alta fluidez.',
    '8GB GDDR6 • RDNA 3 • DisplayPort 2.1'
  ],

  // Processadores
  [
    'c1',
    'Ryzen 7 8700F',
    'cpu',
    1249,
    1399,
    4.8,
    'Desempenho sólido para jogos e multitarefa com ótima eficiência.',
    '6 núcleos • 12 threads • até 5.1 GHz • 32MB Cache'
  ],
  [
    'c2',
    'Ryzen 9 7900',
    'cpu',
    1799,
    null,
    4.9,
    'Potência refinada para produtividade, streaming e gaming sem travamentos.',
    '8 núcleos • 16 threads • até 5.3 GHz • 40MB Cache'
  ],
  [
    'c3',
    'Core i3 13400F',
    'cpu',
    1799,
    1999,
    4.8,
    'Arquitetura híbrida para criar, compor e competir com excelente equilíbrio.',
    '14 núcleos • 20 threads • até 5.3 GHz • 24MB Cache'
  ],
  [
    'c4',
    'Ryzen 7 5700X',
    'cpu',
    1149,
    null,
    4.9,
    'Performance premium para workloads pesados, jogos e edição profissional.',
    '20 núcleos • 28 threads • até 5.6 GHz • 33MB Cache'
  ],

  // Monitores
  [
    'm1',
    'Asus Tuf Gaming 27" 240Hz',
    'monitors',
    1099,
    1299,
    4.8,
    'Velocidade e cores vibrantes para sua arena.',
    '27" Fast IPS • 240Hz • 0.3ms • QHD'
  ],
  [
    'm2',
    'Asus ProArt 27" 4K',
    'monitors',
    1799,
    null,
    4.9,
    'Cores precisas e resolução 4K para criação profissional.',
    '27" IPS • 60Hz • 5ms • 4K UHD'
  ],
  [
    'm3',
    'BenQ 28.2" 4K UHD',
    'monitors',
    2099,
    2399,
    4.8,
    'Mais linhas de código e produtividade para o seu fluxo de trabalho.',
    '28.2" IPS • 60Hz • 4K UHD • Modo programação'
  ],
  [
    'm4',
    'Samsung OLED 49" DQHD 240Hz',
    'monitors',
    3299,
    null,
    4.7,
    'Imersão ultrawide com contraste OLED e fluidez para competir.',
    '49" OLED • DQHD • 240Hz • 0.03ms'
  ],

  // Teclados
  [
    'k1',
    'Tecaldo Mecânico 75%',
    'keyboards',
    349,
    null,
    4.7,
    'Compacto, preciso e feito para vencer.',
    '60% • Switch red • RGB'
  ],
  [
    'k2',
    'Teclado Magnético Hot-Swap',
    'keyboards',
    499,
    599,
    4.8,
    'A resposta tátil que seu jogo pede.',
    '75% • Switch brown • Hot-swap'
  ],
  [
    'k3',
    'Teclado Redragon TKL RGB',
    'keyboards',
    649,
    null,
    4.9,
    'O formato TKL que equilibra espaço e controle.',
    'TKL • Switch blue • RGB'
  ],
  [
    'k4',
    'Logitech GPRO X',
    'keyboards',
    899,
    999,
    4.9,
    'O teclado definitivo para seu setup.',
    'Full size • Switch optical • PBT'
  ],

  // Mouses
  [
    'mo1',
    'Redragon Wireless',
    'mice',
    179,
    null,
    4.6,
    'Leveza que acompanha seus reflexos.',
    '59g • 8000 DPI • 6 botões'
  ],
  [
    'mo2',
    'Zowie',
    'mice',
    279,
    329,
    4.8,
    'Ergonomia e precisão sem fio.',
    '69g • 16000 DPI • Wireless'
  ],
  [
    'mo3',
    'Marvo Wireless',
    'mice',
    399,
    null,
    4.8,
    'Sensor premium para a sua melhor jogada.',
    '63g • 26000 DPI • PTFE'
  ],
  [
    'mo4',
    'Havit Wireless',
    'mice',
    599,
    null,
    4.9,
    'O auge do controle competitivo.',
    '58g • 30000 DPI • 4K wireless'
  ],

  // Acessórios
  [
    'a1',
    'Mousepad Logitech',
    'accessories',
    129,
    null,
    4.7,
    'Superfície ampla e estável com acabamento premium para precisão.',
    '900 × 400mm • Base emborrachada • Borda antiderrapante'
  ],
  [
    'a2',
    'Microfone Gamer RGB',
    'accessories',
    149,
    179,
    4.6,
    'Som nítido e visual marcante para stream, calls e gravações.',
    'USB • 48kHz • RGB • Suporte ajustável'
  ],
  [
    'a3',
    'HUB USB',
    'accessories',
    229,
    null,
    4.7,
    'Conexões rápidas para todos os seus dispositivos.',
    'USB-C • 5 portas • 5Gbps • LED RGB'
  ],
  [
    'a4',
    'Suporte para Monitor',
    'accessories',
    399,
    449,
    4.8,
    'Ergonomia e espaço para uma mesa impecável.',
    '17–32" • Pistão a gás • VESA • Ajuste em altura'
  ]
].map(
  ([
    id,
    name,
    category,
    price,
    oldPrice,
    rating,
    description,
    specs
  ]) => ({
    id,
    name,
    category,
    price,
    oldPrice,

    discount: oldPrice
      ? Math.round((1 - price / oldPrice) * 100)
      : 0,

    rating,
    description,
    specs,

    image:
      monitorImages[id] ||
      gpuImages[id] ||
      cpuImages[id] ||
      keyboardImages[id] ||
      mouseImages[id] ||
      accessoryImages[id] ||
      null
  })
);
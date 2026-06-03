export type Category = "ranks" | "coins" | "bundles";

export interface Product {
  id: string;
  name: string;
  price: string;
  rawPrice: number;
  originalPrice?: string;
  description: string;
  badge?: string;
  badgeVariant?: "emerald" | "gold" | "cyan";
  perks?: string[];
  popular?: boolean;
  command: string;
}

export const storeItems: Record<Category, Product[]> = {
  ranks: [
    {
      id: "semente",
      name: "Semente",
      price: "R$ 14,90",
      rawPrice: 14.9,
      description: "Tudo começa com uma semente. Plante suas raízes no RootsSky.",
      badge: "Iniciante",
      badgeVariant: "emerald",
      perks: [
        "Acesso ao Passe VIP",
        "Prefixo [🌱] exclusivo",
        "2 /sethome",
        "/fly na sua ilha",
        "Chat colorido",
        "Trilha de folhas",
      ],
      command: "pex user {name} group set semente; passeadmin givevip {name}"
    },
    {
      id: "raiz_viva",
      name: "Raiz Viva",
      price: "R$ 29,90",
      rawPrice: 29.9,
      description: "As raízes que sustentam os céus. Poder e presença.",
      badge: "Popular",
      badgeVariant: "gold",
      popular: true,
      perks: [
        "Acesso ao Passe VIP",
        "Todas as vantagens Semente",
        "Prefixo [🌿] exclusivo",
        "5 /sethome",
        "/fly em todo lugar",
        "Fila prioritária",
        "Kit semanal",
        "Aura de raízes",
      ],
      command: "pex user {name} group set raiz_viva; passeadmin givevip {name}"
    },
    {
      id: "yggdrasil",
      name: "Yggdrasil",
      price: "R$ 59,90",
      rawPrice: 59.9,
      description: "A Árvore do Mundo. O rank lendário definitivo.",
      badge: "Lendário",
      badgeVariant: "cyan",
      perks: [
        "Acesso ao Passe VIP",
        "Todas as vantagens Raiz Viva",
        "Prefixo [🌳] exclusivo",
        "10 /sethome",
        "Mensagem de entrada",
        'Pet "Sprite da Floresta"',
        "Aura Yggdrasil",
        "Kit lendário",
      ],
      command: "pex user {name} group set yggdrasil; passeadmin givevip {name}"
    },
  ],
  coins: [
    {
      id: "coins_1k",
      name: "1.000 Moedas",
      price: "R$ 9,90",
      rawPrice: 9.9,
      description: "Um impulso de moedas para sua ilha.",
      perks: ["Entrega instantânea", "Use na /shop"],
      command: "eco give {name} 1000"
    },
    {
      id: "coins_5k",
      name: "5.000 Moedas",
      price: "R$ 39,90",
      rawPrice: 39.9,
      originalPrice: "R$ 49,50",
      description: "Melhor custo-benefício — economize 20%!",
      badge: "20% OFF",
      badgeVariant: "gold",
      popular: true,
      perks: [
        "Entrega instantânea",
        "Use na /shop",
        "Bônus de 20% no valor",
      ],
      command: "eco give {name} 5000"
    },
    {
      id: "coins_10k",
      name: "10.000 Moedas",
      price: "R$ 69,90",
      rawPrice: 69.9,
      originalPrice: "R$ 99,00",
      description: "O pacote definitivo — economize 30%!",
      badge: "30% OFF",
      badgeVariant: "cyan",
      perks: [
        "Entrega instantânea",
        "Use na /shop",
        "Bônus de 30% no valor",
      ],
      command: "eco give {name} 10000"
    },
  ],
  bundles: [
    {
      id: "pacote_semente",
      name: "Pacote Semente",
      price: "R$ 24,90",
      rawPrice: 24.9,
      originalPrice: "R$ 34,80",
      description: "Tudo que você precisa para começar forte.",
      badge: "Economize 28%",
      badgeVariant: "emerald",
      perks: [
        "Acesso ao Passe VIP",
        "Rank Semente",
        "1.000 Moedas",
        "Kit Iniciante",
        "Expansão de Ilha",
      ],
      command: "pex user {name} group set semente; eco give {name} 1000; passeadmin givevip {name}"
    },
    {
      id: "pacote_raiz_viva",
      name: "Pacote Raiz Viva",
      price: "R$ 54,90",
      rawPrice: 54.9,
      originalPrice: "R$ 79,80",
      description: "O pacote mais popular para jogadores dedicados.",
      badge: "Mais Popular",
      badgeVariant: "gold",
      popular: true,
      perks: [
        "Acesso ao Passe VIP",
        "Rank Raiz Viva",
        "5.000 Moedas",
        "Kit Premium",
        "2x Expansão de Ilha",
        "Pet Exclusivo",
      ],
      command: "pex user {name} group set raiz_viva; eco give {name} 5000; passeadmin givevip {name}"
    },
    {
      id: "pacote_yggdrasil",
      name: "Pacote Yggdrasil",
      price: "R$ 99,90",
      rawPrice: 99.9,
      originalPrice: "R$ 158,80",
      description: "O pacote completo definitivo. Economize 37%!",
      badge: "Melhor Oferta",
      badgeVariant: "cyan",
      perks: [
        "Acesso ao Passe VIP",
        "Rank Yggdrasil",
        "10.000 Moedas",
        "Todos os Kits",
        "5x Expansão de Ilha",
        "3 Pets Exclusivos",
        "Aura Personalizada",
      ],
      command: "pex user {name} group set yggdrasil; eco give {name} 10000; passeadmin givevip {name}"
    },
  ],
};

// Catalogo achatado para facilitar a busca no backend por ID
export const CATALOG = Object.values(storeItems).reduce((acc, items) => {
  items.forEach(item => {
    acc[item.id] = item;
  });
  return acc;
}, {} as Record<string, Product>);

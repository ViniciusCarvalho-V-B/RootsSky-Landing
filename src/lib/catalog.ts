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
      id: "raiz_ascendente",
      name: "Raiz Ascendente",
      price: "R$ 1,00",
      rawPrice: 1.00,
      description: "O primeiro passo em direção aos céus. Tag: [Ascendente]",
      badge: "VIP I",
      badgeVariant: "emerald",
      perks: [
        "Acesso ao Passe VIP",
        "10% a mais de dinheiro ao vender itens",
        "10% a mais de XP no AuraSkills",
        "Acesso ao Kit Ascendente semanal",
        "Acesso ao chat colorido",
      ],
      command: "lp user {name} group set ascendente; passeadmin givevip {name}; eco give {name} 100000; crates key give {name} spawner_key 3; crates key give {name} epic_key 5; crates key give {name} block_key 10"
    },
    {
      id: "raiz_ancestral",
      name: "Raiz Ancestral",
      price: "R$ 24,99",
      rawPrice: 24.99,
      description: "As raízes que sustentam os céus. Tag: [Ancestral]",
      badge: "VIP II",
      badgeVariant: "gold",
      popular: true,
      perks: [
        "Todos benefícios do Raiz Ascendente",
        "15% a mais de dinheiro na venda",
        "20% a mais de XP no AuraSkills",
        "Acesso ao Kit Ancestral semanal",
        "Acesso ao /is fly na própria ilha",
        "Acesso virtual: /craft, /feed, /ec",
      ],
      command: "lp user {name} group set ancestral; passeadmin givevip {name}; eco give {name} 250000; crates key give {name} spawner_key 7; crates key give {name} epic_key 15; crates key give {name} block_key 20"
    },
    {
      id: "raiz_celeste",
      name: "Raiz Celeste",
      price: "R$ 49,99",
      rawPrice: 49.99,
      description: "O poder supremo das ilhas flutuantes. Tag: [Celeste]",
      badge: "VIP III",
      badgeVariant: "cyan",
      perks: [
        "Todos benefícios dos VIPs anteriores",
        "25% a mais de dinheiro na venda",
        "30% a mais de XP no AuraSkills",
        "Acesso ao Kit Celeste semanal",
        "Acesso ao /fly em qualquer lugar",
        "Upgrades extras na Ilha e 3 baús virtuais",
      ],
      command: "lp user {name} group set celeste; passeadmin givevip {name}; crates key give {name} spawner_key 15; crates key give {name} epic_key 30; crates key give {name} block_key 30"
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

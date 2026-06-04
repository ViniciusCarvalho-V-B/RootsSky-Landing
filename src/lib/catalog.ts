export type Category = "ranks" | "keys";

export interface ProductOption {
  id: string; // ex: "chave_rara_5"
  label: string; // "5 Chaves (-10%)"
  quantity: number; // 5
  price: string; // "R$ 4,45"
  rawPrice: number; // 4.45
  originalPrice?: string; // "R$ 4,95"
  badge?: string; // "10% OFF"
  duration?: string; // "30d", "90d", etc
  command?: string; // Para sobrescrever o comando base
}

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
  command: string; // Aceita {quantity} se houver options
  options?: ProductOption[];
}

export const storeItems: Record<Category, Product[]> = {
  ranks: [
    {
      id: "raiz_ascendente",
      name: "Raiz Ascendente",
      price: "R$ 10,99",
      rawPrice: 10.99,
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
      command: "lp user {name} parent addtemp ascendente {duration}; passeadmin givevip {name} {duration}; eco give {name} 100000; crates key give {name} spawner_key 3; crates key give {name} epic_key 5; crates key give {name} blocks_key 10; minecraft:title @a times 10 80 20; minecraft:title @a title {\"text\":\"NOVA RAIZ ASCENDENTE!\",\"color\":\"green\",\"bold\":true}; minecraft:title @a subtitle [{\"text\":\"O jogador \",\"color\":\"gray\"},{\"text\":\"{name}\",\"color\":\"green\",\"bold\":true},{\"text\":\" adquiriu o VIP I!\",\"color\":\"gray\"}]",
      options: [
        { id: "ascendente_1m", label: "1 Mês", quantity: 1, duration: "30d", rawPrice: 10.99, price: "R$ 10,99" },
        { id: "ascendente_3m", label: "3 Meses", quantity: 1, duration: "90d", rawPrice: 31.32, price: "R$ 31,32", originalPrice: "R$ 32,97", badge: "5% OFF" },
        { id: "ascendente_6m", label: "6 Meses", quantity: 1, duration: "180d", rawPrice: 59.34, price: "R$ 59,34", originalPrice: "R$ 65,94", badge: "10% OFF" },
        { id: "ascendente_12m", label: "12 Meses", quantity: 1, duration: "365d", rawPrice: 112.09, price: "R$ 112,09", originalPrice: "R$ 131,88", badge: "15% OFF" },
      ]
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
      command: "lp user {name} parent addtemp ancestral {duration}; passeadmin givevip {name} {duration}; eco give {name} 250000; crates key give {name} spawner_key 7; crates key give {name} epic_key 15; crates key give {name} blocks_key 20; minecraft:title @a times 10 80 20; minecraft:title @a title {\"text\":\"NOVA RAIZ ANCESTRAL!\",\"color\":\"dark_green\",\"bold\":true}; minecraft:title @a subtitle [{\"text\":\"O jogador \",\"color\":\"gray\"},{\"text\":\"{name}\",\"color\":\"dark_green\",\"bold\":true},{\"text\":\" adquiriu o VIP II!\",\"color\":\"gray\"}]",
      options: [
        { id: "ancestral_1m", label: "1 Mês", quantity: 1, duration: "30d", rawPrice: 24.99, price: "R$ 24,99" },
        { id: "ancestral_3m", label: "3 Meses", quantity: 1, duration: "90d", rawPrice: 71.22, price: "R$ 71,22", originalPrice: "R$ 74,97", badge: "5% OFF" },
        { id: "ancestral_6m", label: "6 Meses", quantity: 1, duration: "180d", rawPrice: 134.94, price: "R$ 134,94", originalPrice: "R$ 149,94", badge: "10% OFF" },
        { id: "ancestral_12m", label: "12 Meses", quantity: 1, duration: "365d", rawPrice: 254.89, price: "R$ 254,89", originalPrice: "R$ 299,88", badge: "15% OFF" },
      ]
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
      command: "lp user {name} parent addtemp celeste {duration}; passeadmin givevip {name} {duration}; crates key give {name} spawner_key 15; crates key give {name} epic_key 30; crates key give {name} blocks_key 30; crates key give @a epic_key 1; minecraft:title @a times 10 100 20; minecraft:title @a title {\"text\":\"NOVA RAIZ CELESTE!\",\"color\":\"aqua\",\"bold\":true}; minecraft:title @a subtitle [{\"text\":\"O jogador \",\"color\":\"gray\"},{\"text\":\"{name}\",\"color\":\"aqua\",\"bold\":true},{\"text\":\" adquiriu o VIP III!\",\"color\":\"gray\"}]; minecraft:execute as @a at @s run minecraft:playsound minecraft:ui.toast.challenge_complete master @s ~ ~ ~ 1 1",
      options: [
        { id: "celeste_1m", label: "1 Mês", quantity: 1, duration: "30d", rawPrice: 49.99, price: "R$ 49,99" },
        { id: "celeste_3m", label: "3 Meses", quantity: 1, duration: "90d", rawPrice: 142.47, price: "R$ 142,47", originalPrice: "R$ 149,97", badge: "5% OFF" },
        { id: "celeste_6m", label: "6 Meses", quantity: 1, duration: "180d", rawPrice: 269.94, price: "R$ 269,94", originalPrice: "R$ 299,94", badge: "10% OFF" },
        { id: "celeste_12m", label: "12 Meses", quantity: 1, duration: "365d", rawPrice: 509.89, price: "R$ 509,89", originalPrice: "R$ 599,88", badge: "15% OFF" },
      ]
    },
  ],
  keys: [
    {
      id: "chave_rara",
      name: "Chave Rara",
      price: "R$ 0,99",
      rawPrice: 0.99,
      description: "Desbloqueie caixas raras e consiga recompensas básicas.",
      perks: ["Itens Básicos", "Moedas", "XP"],
      command: "crates key give {name} rara_key {quantity}",
      options: [
        { id: "chave_rara_1", label: "1 Chave", quantity: 1, rawPrice: 0.99, price: "R$ 0,99" },
        { id: "chave_rara_5", label: "5 Chaves", quantity: 5, rawPrice: 4.45, price: "R$ 4,45", originalPrice: "R$ 4,95", badge: "10% OFF" },
        { id: "chave_rara_10", label: "10 Chaves", quantity: 10, rawPrice: 8.41, price: "R$ 8,41", originalPrice: "R$ 9,90", badge: "15% OFF" },
        { id: "chave_rara_20", label: "20 Chaves", quantity: 20, rawPrice: 15.84, price: "R$ 15,84", originalPrice: "R$ 19,80", badge: "20% OFF" },
      ]
    },
    {
      id: "chave_blocos",
      name: "Chave de Blocos",
      price: "R$ 1,50",
      rawPrice: 1.50,
      description: "Caixa focada em blocos de construção e decoração.",
      perks: ["Blocos Raros", "Decorações", "Itens de Ilha"],
      command: "crates key give {name} blocks_key {quantity}",
      options: [
        { id: "chave_blocos_1", label: "1 Chave", quantity: 1, rawPrice: 1.50, price: "R$ 1,50" },
        { id: "chave_blocos_5", label: "5 Chaves", quantity: 5, rawPrice: 6.75, price: "R$ 6,75", originalPrice: "R$ 7,50", badge: "10% OFF" },
        { id: "chave_blocos_10", label: "10 Chaves", quantity: 10, rawPrice: 12.75, price: "R$ 12,75", originalPrice: "R$ 15,00", badge: "15% OFF" },
        { id: "chave_blocos_20", label: "20 Chaves", quantity: 20, rawPrice: 24.00, price: "R$ 24,00", originalPrice: "R$ 30,00", badge: "20% OFF" },
      ]
    },
    {
      id: "chave_epica",
      name: "Chave Épica",
      price: "R$ 1,99",
      rawPrice: 1.99,
      description: "Acesse recompensas valiosas e itens especiais.",
      badge: "Mais Vendida",
      badgeVariant: "gold",
      popular: true,
      perks: ["Equipamentos Fortes", "Boosters", "Itens Raros"],
      command: "crates key give {name} epic_key {quantity}",
      options: [
        { id: "chave_epica_1", label: "1 Chave", quantity: 1, rawPrice: 1.99, price: "R$ 1,99" },
        { id: "chave_epica_5", label: "5 Chaves", quantity: 5, rawPrice: 8.95, price: "R$ 8,95", originalPrice: "R$ 9,95", badge: "10% OFF" },
        { id: "chave_epica_10", label: "10 Chaves", quantity: 10, rawPrice: 16.91, price: "R$ 16,91", originalPrice: "R$ 19,90", badge: "15% OFF" },
        { id: "chave_epica_20", label: "20 Chaves", quantity: 20, rawPrice: 31.84, price: "R$ 31,84", originalPrice: "R$ 39,80", badge: "20% OFF" },
      ]
    },
    {
      id: "chave_spawner",
      name: "Chave Spawner",
      price: "R$ 2,99",
      rawPrice: 2.99,
      description: "A chance de conseguir spawners raros para sua farm.",
      badge: "Valioso",
      badgeVariant: "cyan",
      perks: ["Spawners", "Ovos de Monstros", "Dinheiro"],
      command: "crates key give {name} spawner_key {quantity}",
      options: [
        { id: "chave_spawner_1", label: "1 Chave", quantity: 1, rawPrice: 2.99, price: "R$ 2,99" },
        { id: "chave_spawner_5", label: "5 Chaves", quantity: 5, rawPrice: 13.45, price: "R$ 13,45", originalPrice: "R$ 14,95", badge: "10% OFF" },
        { id: "chave_spawner_10", label: "10 Chaves", quantity: 10, rawPrice: 25.41, price: "R$ 25,41", originalPrice: "R$ 29,90", badge: "15% OFF" },
        { id: "chave_spawner_20", label: "20 Chaves", quantity: 20, rawPrice: 47.84, price: "R$ 47,84", originalPrice: "R$ 59,80", badge: "20% OFF" },
      ]
    }
  ]
};

// Catalogo achatado para facilitar a busca no backend por ID
export const CATALOG = Object.values(storeItems).reduce((acc, items) => {
  items.forEach(item => {
    acc[item.id] = item;
    // Cadastrar também as opções como produtos válidos no carrinho/checkout
    if (item.options) {
      item.options.forEach(opt => {
        // Criar um pseudo-produto para cada opção, herdando o ID base mas substituindo valores
        acc[opt.id] = {
          ...item,
          id: opt.id,
          name: `${item.name} (${opt.label})`,
          price: opt.price,
          rawPrice: opt.rawPrice,
          originalPrice: opt.originalPrice,
          // Vamos substituir {quantity} e {duration} no comando base
          command: opt.command || item.command
            .replace("{quantity}", opt.quantity.toString())
            .replace(/{duration}/g, opt.duration || "30d")
        };
      });
    }
  });
  return acc;
}, {} as Record<string, Product>);

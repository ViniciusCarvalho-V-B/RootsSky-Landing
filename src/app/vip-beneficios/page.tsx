import DynamicPage from "@/components/DynamicPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const defaultVipBenefits = `
Ao adquirir um rank VIP em nossa loja, você não apenas apoia os custos de manutenção e desenvolvimento do servidor, mas também ganha recompensas exclusivas, facilitadores de jogabilidade e cosméticos únicos que destacam sua presença no **RootsSky**.

Abaixo, detalhamos os principais benefícios de se tornar um VIP.

## 🌿 Raiz Ascendente (VIP I)

O primeiro passo para dominar os céus. Excelente para quem quer um impulso inicial.

- **Acesso ao Passe VIP**: Desbloqueie as recompensas Premium do nosso Passe de Batalha (Ganha chaves, dinheiro e cosméticos a cada nível).
- **Tag Exclusiva**: Tag \`[Ascendente]\` no chat e no Tablist.
- **Chat Colorido**: Destaque-se podendo usar cores no chat global.
- **Bônus Econômicos**: 
  - Receba +10% de moedas extras ao vender itens na loja.
  - Receba +10% de bônus na experiência de Habilidades (AuraSkills).
- **Kit Ascendente**: Acesso semanal a ferramentas encantadas de nível médio, blocos de construção e moedas de bônus.

## ☀️ Raiz Ancestral (VIP II)

O pacote favorito da comunidade, oferecendo o maior custo-benefício em comodidade.

- **Todos os benefícios do Raiz Ascendente**.
- **Tag Exclusiva**: Tag dourada \`[Ancestral]\` no chat e no Tablist.
- **/is fly**: Voe livremente dentro dos limites da sua própria ilha. Essencial para construir projetos épicos!
- **Kits Melhorados**: Acesso semanal ao Kit Ancestral (itens de diamante e maçãs douradas).
- **Acesso Virtual VIP**: 
  - \`/craft\`: Abra uma bancada de trabalho de qualquer lugar.
  - \`/ec\`: Acesse seu baú do fim de qualquer lugar.
  - \`/feed\`: Recupere sua fome instantaneamente.
- **Bônus Maiores**: +15% de bônus na venda de itens e +20% de XP no AuraSkills.

## 👑 Raiz Celeste (VIP III)

O ápice do poder no RootsSky. O VIP para os jogadores mais dedicados.

- **Todos os benefícios do VIP I e VIP II**.
- **Tag Exclusiva**: Tag ciano vibrante \`[Celeste]\` no chat e no Tablist.
- **Voo Global (/fly)**: Permissão para voar no Spawn, áreas de evento e mundo aberto (onde permitido), não apenas na sua ilha.
- **Kit Celeste**: Acesso ao melhor kit semanal do servidor, com armaduras supremas, chaves raras e muito dinheiro.
- **Expansão Massiva de Ilha**:
  - Limite de tamanho de ilha significativamente maior.
  - Limite de Spawners dobrado.
  - Limite de funis aumentado para otimizar suas farms gigantescas.
- **Bônus Máximos**: +25% de bônus financeiro e +30% de XP nas suas habilidades!

---

> **Dica:** Lembre-se: Todas as vantagens são ativadas **instantaneamente** após a confirmação do pagamento. Digite \`/vips\` no jogo para ver informações detalhadas sobre os Kits in-game.
`;

export default function VipBeneficiosPage() {
  return (
    <>
      <Header />
      <DynamicPage slug="vip-beneficios" defaultTitle="🌟 Benefícios VIP" defaultContent={defaultVipBenefits} />
      <Footer />
    </>
  );
}

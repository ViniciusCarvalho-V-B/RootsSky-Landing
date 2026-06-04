import DynamicPage from "@/components/DynamicPage";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const defaultTOS = `
Bem-vindo ao RootsSky. Ao acessar, jogar ou utilizar qualquer serviço relacionado ao nosso servidor (incluindo o servidor do Minecraft, o site e a nossa loja), você concorda com estes Termos de Serviço em sua totalidade. Se você não concordar com qualquer parte deste documento, você deve cessar imediatamente o uso de nossos serviços.

## 1. Modificação dos Termos

O RootsSky reserva-se o direito de atualizar ou modificar estes Termos de Serviço a qualquer momento, sem aviso prévio. É de sua inteira responsabilidade revisar esta página periodicamente para garantir que você esteja ciente de quaisquer alterações. O uso continuado dos nossos serviços após a publicação das alterações constitui sua aceitação tácita.

## 2. Direitos da Equipe e Moderação

1. **Acesso aos Serviços:** O acesso ao RootsSky é um privilégio, não um direito. A equipe de administração reserva-se o direito exclusivo de banir, suspender, silenciar (mutar) ou negar acesso a qualquer jogador, a qualquer momento e por qualquer motivo, sem obrigação de fornecer justificativa, especialmente quando houver violação de nossas Regras.
2. **Propriedade das Contas e Itens:** Todos os dados, progressos, estatísticas, propriedades virtuais (ilhas, moedas, itens no jogo) e ranks na loja são de propriedade exclusiva da administração do RootsSky. Você detém apenas uma licença de uso limitada e temporária destas propriedades enquanto sua conta estiver em situação regular.

## 3. Disposições da Loja e Produtos

1. **Não Afiliado à Mojang:** O servidor RootsSky não é de forma alguma afiliado, endossado, associado ou suportado pela Mojang AB ou Microsoft Corporation. "Minecraft" é uma marca registrada da Mojang AB. 
2. **Alteração de Vantagens (Perks):** O RootsSky reserva-se o direito de adicionar, remover, modificar ou balancear vantagens (perks) de Ranks, Kits ou quaisquer itens virtuais oferecidos na loja sem notificação prévia. Caso uma vantagem se mostre prejudicial ao balanceamento do servidor, ela será ajustada, e nenhuma compensação será devida pela modificação de atributos de um produto digital.
3. **Punições Não Isentam o Acordo:** Se você for punido, banido ou bloqueado dos nossos serviços por quebrar nossas regras de conduta (hacks, toxicidade, etc), você não terá direito ao estorno do dinheiro gasto na loja, independentemente do tempo passado desde a compra. 

## 4. Responsabilidade e Isenção de Danos

O RootsSky fornece os serviços "no estado em que se encontram" (as is), sem garantias de qualquer tipo, expressas ou implícitas. O RootsSky não será responsável por perdas de itens por bugs, encerramento de atividades, rollbacks, exclusão acidental ou interrupção de conexão de servidores, e não será responsabilizado por qualquer dano direto, indireto, acidental ou consequencial decorrente do uso de nossos serviços.

## 5. Acordo Inteiro

Estes Termos, juntamente com nossas Regras Oficiais e Política de Reembolso, constituem a totalidade do acordo entre o jogador e o RootsSky.
`;

export default function TermosPage() {
  return (
    <>
      <Header />
      <DynamicPage slug="termos" defaultTitle="⚖️ Termos de Serviço" defaultContent={defaultTOS} />
      <Footer />
    </>
  );
}

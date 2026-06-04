import DynamicPage from "@/components/DynamicPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const defaultRefunds = `
Esta política tem força de contrato digital irrevogável entre você (o comprador e/ou titular do meio de pagamento) e a rede RootsSky, e entra em vigor no momento exato em que uma transação é confirmada em nossa loja.

## 1. Natureza dos Bens Virtuais

Todos os produtos, itens, ranks, chaves, pacotes e serviços oferecidos pela loja do RootsSky são estritamente **bens virtuais e intangíveis**. 
Ao concluir uma compra, você não está adquirindo um bem físico, software ou título de propriedade, mas sim uma licença limitada, intransferível e revogável de uso de um privilégio digital exclusivo dentro de nossos servidores de Minecraft.

## 2. Política Estrita de Não-Reembolso (No-Refund Policy)

**NÃO OFERECEMOS REEMBOLSOS, DEVOLUÇÕES OU TROCAS** sob nenhuma circunstância.
Devido à natureza imediata e digital dos nossos produtos (os itens são creditados automaticamente à sua conta assim que o pagamento é aprovado), a entrega é considerada concluída instantaneamente. Ao adquirir qualquer produto, você concorda expressamente em renunciar ao direito de arrependimento, visto que o consumo do serviço/bem virtual ocorre no momento da entrega.

## 3. Contestações e Chargebacks (Fraude)

Toda e qualquer tentativa de forçar um reembolso através da administradora do cartão de crédito, banco, Mercado Pago ou qualquer provedor de pagamentos (processo conhecido como "Chargeback" ou "Disputa") será tratada como tentativa de fraude e quebra de contrato.

Em caso de abertura de disputa ou chargeback:
1. **Banimento Permanente:** A conta do jogador associada à compra será imediata e permanentemente banida (Blacklisted) de toda a rede RootsSky.
2. **Revogação de Itens:** Todos os privilégios, bens virtuais e itens adquiridos serão imediatamente revogados sem aviso prévio.
3. **Bloqueio de IP:** O endereço de IP e todos os identificadores de máquina associados ao jogador poderão ser banidos permanentemente da nossa rede.
4. **Resolução de Disputas:** Este documento (Política de Reembolso) em conjunto com os Termos de Serviço e registros internos de conexão do seu personagem ao nosso servidor, provando a entrega do item digital, será imediatamente encaminhado à instituição financeira provando que o bem digital foi entregue e consumido, contestando a fraude.

## 4. Consentimento dos Pais ou Responsáveis

Se você é menor de idade (menor de 18 anos), você deve ter o consentimento expresso e a permissão do titular do cartão de crédito ou conta bancária antes de realizar qualquer compra na loja do RootsSky.
Se for descoberto que uma compra foi realizada sem autorização prévia de um responsável, a compra continuará não sendo reembolsável pelos motivos expostos no item 2, e a conta do jogador poderá ser suspensa devido ao uso indevido da plataforma.

## 5. Indisponibilidade e Término do Serviço

O RootsSky não garante a perpetuidade dos servidores. Caso os servidores do RootsSky sejam descontinuados, formatados (wipe) ou desligados por qualquer motivo técnico ou administrativo, você não terá direito a reembolso pelas compras anteriores efetuadas, considerando o tempo de serviço já usufruído.

---
**Ao clicar em "Comprar" em qualquer item de nossa loja, você confirma que leu, entendeu e aceitou plenamente esta Política de Reembolso.**
`;

export default function ReembolsoPage() {
  return (
    <>
      <Header />
      <DynamicPage slug="reembolso" defaultTitle="⚖️ Política de Reembolso" defaultContent={defaultRefunds} />
      <Footer />
    </>
  );
}

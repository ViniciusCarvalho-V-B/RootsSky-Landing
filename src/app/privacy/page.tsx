import DynamicPage from "@/components/DynamicPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const defaultPrivacy = `
Última atualização: ${new Date().toLocaleDateString("pt-BR")}

## 1. Coleta de Dados
Coletamos as seguintes informações para processar sua compra e entregar seus itens no servidor:
- Nickname do Minecraft
- UUID do Minecraft
- Dados de pagamento processados com segurança pelo Mercado Pago (não armazenamos dados de cartão)

## 2. Uso dos Dados
As informações coletadas são utilizadas exclusivamente para:
- Entregar os produtos virtuais em sua conta no jogo.
- Histórico de compras para suporte e prevenção a fraudes.
- Exibir as "Últimas Compras" ou "Top Apoiadores" em nosso site, caso você não opte por ocultar no momento da compra.

## 3. Segurança
Adotamos medidas rigorosas para proteger suas informações pessoais contra acesso não autorizado. Todas as transações financeiras são criptografadas e ocorrem em ambiente seguro.

## 4. Seus Direitos (LGPD)
De acordo com a Lei Geral de Proteção de Dados, você tem o direito de:
- Acessar seus dados armazenados.
- Solicitar a exclusão dos seus dados (Nickname/UUID do nosso banco de dados).
- Revogar consentimentos.

Para exercer seus direitos, acesse a nossa página de [Solicitação de Exclusão](/privacy/request-deletion) ou abra um ticket em nosso Discord oficial.

## 5. Contato
Para dúvidas ou solicitações, abra um ticket em nosso Discord.
`;

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <DynamicPage slug="privacy" defaultTitle="🛡️ Política de Privacidade" defaultContent={defaultPrivacy} />
      <Footer />
    </>
  );
}

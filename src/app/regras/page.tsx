import DynamicPage from "@/components/DynamicPage";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const defaultRules = `
Seja bem-vindo ao RootsSky! Para manter uma comunidade divertida e segura, todos os jogadores devem respeitar as regras abaixo.

## 💬 Convivência e Chat

**Respeite todos os jogadores**
Ofensas, discriminação, ameaças, perseguição ou comportamento tóxico não serão tolerados.

**Não faça spam ou flood**
Evite repetir mensagens, comandos, símbolos, divulgações ou marcar pessoas sem necessidade.

**Não divulgue outros servidores ou links sem permissão**
Divulgação de servidores, sites, redes sociais ou links suspeitos pode resultar em punição.

## 🎮 Jogabilidade

**Hacks e trapaças são proibidos**
O uso de clientes modificados, autoclickers abusivos, x-ray, fly, kill aura ou qualquer vantagem injusta é totalmente proibido.

**Macros e farms AFK são permitidas**
Você pode utilizar farms automáticas e permanecer AFK. Macros simples são permitidos.

**Não pratique anti-jogo, roubos ou fraudes**
Enganar jogadores, aplicar golpes, abusar de confiança ou prejudicar ilhas de propósito poderá resultar em punição.

**Abuso de bugs é proibido**
Caso encontre um bug, reporte para a equipe. Jogadores que ajudarem reportando falhas importantes poderão receber recompensas.

**Construções inadequadas serão punidas**
Construções ofensivas, impróprias ou feitas para prejudicar a experiência dos jogadores não são permitidas. Use o bom senso.

## ⚠️ Importante

A equipe poderá aplicar punições de acordo com a gravidade de cada situação, mesmo que um comportamento específico não esteja descrito exatamente acima.

Ao jogar no RootsSky, você concorda em respeitar estas regras.

🌿 **Jogue com respeito, evolua sua ilha e divirta-se!**
`;

export default function RegrasPage() {
  return (
    <>
      <Header />
      <DynamicPage slug="regras" defaultTitle="📜 Regras do RootsSky" defaultContent={defaultRules} />
      <Footer />
    </>
  );
}

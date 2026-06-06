# RootsSky - Plataforma Web & E-Commerce ⚔️

RootsSky é a plataforma web completa e painel de e-commerce desenvolvida para o servidor de Minecraft **RootsSky**. Este repositório contém a aplicação Full-Stack construída para operar em produção, gerenciando a loja virtual, integrações de pagamento automáticas, estatísticas e painel administrativo.

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![MercadoPago](https://img.shields.io/badge/MercadoPago-00B1EA?style=for-the-badge&logo=mercadopago&logoColor=white)

## 🌟 Funcionalidades

### 🛒 Loja & Pagamentos (E-Commerce)
* **Vitrine de Produtos:** Venda de VIPs (Ranks), Chaves de Caixas e Benefícios.
* **Carrinho e Checkout:** Fluxo de compra dinâmico e validação de nickname/UUID do Minecraft.
* **Integração MercadoPago:** Pagamentos via Pix gerados em tempo real utilizando a API oficial.
* **Webhooks Assíncronos:** O sistema aguarda o retorno do MercadoPago e valida a compra instantaneamente, entregando o produto virtual no servidor sem intervenção humana.
* **Sistema de Cupons:** Cupons de desconto dinâmicos com suporte a limitação de uso, data de expiração e regras de elegibilidade por produto.

### 🛡️ Painel Administrativo
* **Dashboard em Tempo Real:** Acompanhamento de receita total, compras recentes, top apoiadores e progresso das metas financeiras mensais.
* **Gestão de Conteúdo (CMS):** Criação e edição de Páginas Customizadas, Benefícios de VIPs e Postagens/Atualizações do blog.
* **Gestão de Cupons:** Criação e ativação/desativação de cupons promocionais.
* **Enquetes e Feedback:** Sistema para criação de enquetes interativas e sistema de "Upvote/Downvote" para sugestões da comunidade.

## 🚀 Tecnologias Utilizadas

**Frontend:**
* [Next.js 14](https://nextjs.org/) (App Router)
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Lucide Icons](https://lucide.dev/)
* [React Hot Toast](https://react-hot-toast.com/) (Notificações)

**Backend & Infraestrutura:**
* Node.js (Vercel Serverless Functions)
* [Prisma ORM](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/) hospedado na [Supabase](https://supabase.com/)
* [MercadoPago SDK](https://www.mercadopago.com.br/developers)

## ⚙️ Rodando Localmente

### Pré-requisitos
* Node.js 18+
* Uma conta no Supabase (para o PostgreSQL)
* Uma conta de Desenvolvedor no MercadoPago

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/ViniciusCarvalho-V-B/RootsSky-Landing.git
cd RootsSky-Landing
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto baseado no `.env.example` (se houver) e preencha as chaves:
```env
DATABASE_URL="sua-url-do-supabase-postgresql"
MERCADOPAGO_ACCESS_TOKEN="seu-access-token-mp"
MERCADOPAGO_WEBHOOK_SECRET="seu-secret-de-webhook"
ADMIN_PASSWORD="senha-do-painel-admin"
```

4. Sincronize o Banco de Dados (Prisma)
```bash
npx prisma generate
npx prisma db push
```

5. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`.

## 📈 Status do Projeto
O projeto encontra-se em **Produção Ativa**, hospedado na Vercel e servindo aos jogadores do RootsSky.

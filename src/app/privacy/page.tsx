import Link from "next/link";
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-dark-wood text-warm-light pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-forest-deep/80 backdrop-blur-md p-8 rounded-2xl border border-leaf-light/20 shadow-2xl">
        <h1 className="font-cinzel text-3xl text-gold-shine mb-6">Política de Privacidade</h1>
        
        <div className="prose prose-invert prose-gold">
          <p>Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>
          
          <h2>1. Coleta de Dados</h2>
          <p>
            Coletamos as seguintes informações para processar sua compra e entregar seus itens no servidor:
            <ul>
              <li>Nickname do Minecraft</li>
              <li>UUID do Minecraft</li>
              <li>Dados de pagamento processados com segurança pelo Mercado Pago (não armazenamos dados de cartão)</li>
            </ul>
          </p>

          <h2>2. Uso dos Dados</h2>
          <p>
            As informações coletadas são utilizadas exclusivamente para:
            <ul>
              <li>Entregar os produtos virtuais em sua conta no jogo.</li>
              <li>Histórico de compras para suporte e prevenção a fraudes.</li>
              <li>Exibir as "Últimas Compras" ou "Top Apoiadores" em nosso site, caso você não opte por ocultar.</li>
            </ul>
          </p>

          <h2>3. Segurança</h2>
          <p>
            Adotamos medidas rigorosas para proteger suas informações pessoais contra acesso não autorizado. Todas as transações financeiras são criptografadas e ocorrem em ambiente seguro.
          </p>

          <h2>4. Seus Direitos (LGPD)</h2>
          <p>
            De acordo com a Lei Geral de Proteção de Dados, você tem o direito de:
            <ul>
              <li>Acessar seus dados armazenados.</li>
              <li>Solicitar a exclusão dos seus dados (Nickname/UUID do nosso banco de dados).</li>
              <li>Revogar consentimentos.</li>
            </ul>
            Para exercer seus direitos, entre em contato via nosso Discord oficial ou acesse a página de Exclusão de Dados.
          </p>

          <h2>5. Contato</h2>
          <p>
            Para dúvidas ou solicitações, abra um ticket em nosso Discord.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-leaf-light/20 flex gap-4">
          <Link href="/" className="text-gold hover:text-gold-shine transition-colors">
            Voltar ao Início
          </Link>
          <Link href="/privacy/request-deletion" className="text-red-400 hover:text-red-300 transition-colors">
            Solicitar Exclusão de Dados
          </Link>
        </div>
      </div>
    </div>
  );
}

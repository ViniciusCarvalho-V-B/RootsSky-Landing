export async function sendDiscordPurchaseNotification(playerNick: string, products: string[], totalAmount: number) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn("DISCORD_WEBHOOK_URL não configurada.");
    return;
  }

  const embed = {
    title: "🎉 Nova Compra Aprovada!",
    color: 0x4CAF50, // Verde
    fields: [
      {
        name: "Jogador",
        value: playerNick,
        inline: true
      },
      {
        name: "Valor",
        value: `R$ ${totalAmount.toFixed(2).replace('.', ',')}`,
        inline: true
      },
      {
        name: "Produtos",
        value: products.join(", "),
        inline: false
      }
    ],
    thumbnail: {
      url: `https://minotar.net/helm/${playerNick}/100.png`
    },
    footer: {
      text: "RootsSky Store - Entregue automaticamente"
    },
    timestamp: new Date().toISOString()
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] })
    });
  } catch (error) {
    console.error("Erro ao enviar webhook do Discord:", error);
  }
}

export async function sendDiscordUpdateNotification(title: string, content: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;
  
  const embed = {
    title: "📢 Nova Atualização do Servidor!",
    color: 0x4CAF50,
    fields: [
      { name: "Título", value: title, inline: false },
      { name: "Conteúdo", value: content.substring(0, 1024), inline: false }
    ],
    footer: { text: "RootsSky — Atualizações" },
    timestamp: new Date().toISOString()
  };
  
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] })
    });
  } catch (error) {
    console.error("Erro ao enviar webhook de atualização:", error);
  }
}

export async function sendDiscordSuggestionNotification(title: string, description: string | null, type: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;
  
  const embed = {
    title: "🗳️ Nova Sugestão/Enquete Criada!",
    color: 0x5865F2,
    fields: [
      { name: "Título", value: title, inline: false },
      { name: "Tipo", value: type === "updown" ? "👍 Curtir / 👎 Não Curtir" : "📊 Enquete com Opções", inline: true },
      ...(description ? [{ name: "Descrição", value: description.substring(0, 1024), inline: false }] : [])
    ],
    footer: { text: "RootsSky — Sugestões" },
    timestamp: new Date().toISOString()
  };
  
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] })
    });
  } catch (error) {
    console.error("Erro ao enviar webhook de sugestão:", error);
  }
}

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

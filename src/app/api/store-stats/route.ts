import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CATALOG } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Últimas compras aprovadas
    const recentOrders = await prisma.order.findMany({
      where: { status: "COMPLETED" },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { items: true },
    });

    const recentPurchases = recentOrders.map((order) => {
      // Como pode ter mais de um item, pegamos o primeiro para exibir
      const firstItem = order.items[0];
      const productName = firstItem ? (CATALOG[firstItem.productId]?.name || "Produto") : "Produto";
      
      return {
        id: order.id,
        playerNick: order.playerNick,
        productName: productName,
        timeAgo: order.createdAt, // o front formata
      };
    });

    // 2. Top Apoiadores
    // Prisma no SQLite suporta groupBy
    const topGroups = await prisma.order.groupBy({
      by: ['playerNick'],
      where: { status: "COMPLETED" },
      _sum: {
        totalAmount: true,
      },
      orderBy: {
        _sum: {
          totalAmount: 'desc'
        }
      },
      take: 5,
    });

    const topSupporters = topGroups.map((group) => ({
      playerNick: group.playerNick,
      totalAmount: group._sum.totalAmount || 0,
    }));

    // 3. Meta Mensal
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyAgg = await prisma.order.aggregate({
      where: {
        status: "COMPLETED",
        createdAt: {
          gte: startOfMonth,
        },
      },
      _sum: {
        totalAmount: true,
      },
    });

    const monthlyTotal = monthlyAgg._sum.totalAmount || 0;
    const monthlyGoal = 500; // R$ 500
    
    // Evitar que passe de 100% no layout (opcional)
    const monthlyGoalPercentage = Math.min(100, Math.round((monthlyTotal / monthlyGoal) * 100));

    return NextResponse.json({
      recentPurchases,
      topSupporters,
      monthlyGoal: {
        current: monthlyTotal,
        goal: monthlyGoal,
        percentage: monthlyGoalPercentage,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar store stats:", error);
    return NextResponse.json({ error: "Erro ao buscar estatísticas da loja" }, { status: 500 });
  }
}

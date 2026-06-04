import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CATALOG } from "@/lib/catalog";

export const revalidate = 60; // Cache de 60 segundos no Next.js (se usar SSR/ISR)

export async function GET() {
  try {
    // 1. Últimas compras aprovadas
    const recentOrders = await prisma.order.findMany({
      where: { status: { in: ["COMPLETED", "pending_delivery"] } },
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
      where: { status: { in: ["COMPLETED", "pending_delivery"] } },
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
        status: { in: ["COMPLETED", "pending_delivery"] },
        createdAt: {
          gte: startOfMonth,
        },
      },
      _sum: {
        totalAmount: true,
      },
    });

    const monthlyTotal = monthlyAgg._sum.totalAmount || 0;
    const MONTHLY_GOAL = 50.00; // Meta mensal em BRL  
    // Evitar que passe de 100% no layout (opcional)
    const monthlyGoalPercentage = Math.min(100, Math.round((monthlyTotal / MONTHLY_GOAL) * 100));

    return NextResponse.json({
      recentPurchases,
      topSupporters,
      monthlyGoal: {
        current: monthlyTotal,
        goal: MONTHLY_GOAL,
        percentage: monthlyGoalPercentage,
      },
    });
  } catch (error) {
    console.error("Erro na API store-stats:", error);
    return NextResponse.json(
      { error: "Erro ao buscar estatísticas da loja", details: (error as Error).message },
      { status: 500 }
    );
  }
}

import React from "react";
import Card, { CardBadge } from "./Card";
import Button from "./Button";

const announcements = [
  {
    id: 1,
    date: "May 28, 2026",
    category: "Update",
    title: "Season 1 Launch — New Islands & Economy Reset",
    excerpt:
      "The wait is over! Season 1 brings 15 new island templates, a fresh economy, and exciting new challenges for all players.",
  },
  {
    id: 2,
    date: "May 25, 2026",
    category: "Event",
    title: "Weekend PvP Tournament — 50K Prize Pool",
    excerpt:
      "Compete in our first-ever PvP arena tournament this weekend. Top 3 players win exclusive ranks and in-game currency.",
  },
  {
    id: 3,
    date: "May 22, 2026",
    category: "Store",
    title: "New Premium Ranks Available",
    excerpt:
      "Introducing the Celestial and Void Master ranks with exclusive perks, custom trails, and priority queue access.",
  },
  {
    id: 4,
    date: "May 18, 2026",
    category: "Community",
    title: "Island Building Contest Winners",
    excerpt:
      "Congratulations to our top 10 builders! Check out the stunning island creations that won this month's contest.",
  },
];

const categoryColors: Record<string, "emerald" | "gold" | "cyan"> = {
  Update: "emerald",
  Event: "cyan",
  Store: "gold",
  Community: "emerald",
};

export default function AnnouncementGrid() {
  return (
    <section id="announcements">
      <h2 className="font-outfit font-bold text-2xl text-white mb-6">
        Latest News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {announcements.map((post) => (
          <Card key={post.id} className="group">
            <div className="flex items-center gap-3 mb-3">
              <CardBadge variant={categoryColors[post.category] || "emerald"}>
                {post.category}
              </CardBadge>
              <span className="text-xs text-slate-500 font-inter">
                {post.date}
              </span>
            </div>
            <h3 className="font-outfit font-bold text-lg text-white mb-2 group-hover:text-emerald-light transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-slate-400 font-inter mb-4 leading-relaxed">
              {post.excerpt}
            </p>
            <Button variant="outline" className="text-sm px-4 py-2">
              Read More →
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}

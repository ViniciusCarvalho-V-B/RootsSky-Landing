/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";

interface DynamicPageProps {
  slug: string;
  defaultTitle: string;
  defaultContent: string;
}

export default async function DynamicPage({ slug, defaultTitle, defaultContent }: DynamicPageProps) {
  const page = await prisma.page.findUnique({ where: { slug } });

  const title = page?.title || defaultTitle;
  const content = page?.content || defaultContent;

  return (
    <div className="min-h-screen bg-dark-wood pt-[120px] pb-24 stars-bg relative">
      {/* Green ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(27,94,59,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(196,162,101,0.05) 0%, transparent 50%)",
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-cinzel font-black text-4xl sm:text-5xl mb-4 text-gradient-gold uppercase tracking-wide">
            {title}
          </h1>
          <div className="gold-divider" />
        </div>

        <div className="medieval-panel p-8 sm:p-12 prose prose-invert prose-gold max-w-none font-inter text-warm-muted leading-relaxed">
          {/* eslint-disable @typescript-eslint/no-unused-vars */}
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="font-cinzel text-3xl text-gold-shine mb-6 mt-8" {...props} />,
              h2: ({node, ...props}) => <h2 className="font-cinzel text-2xl text-gold mb-4 mt-8" {...props} />,
              h3: ({node, ...props}) => <h3 className="font-cinzel text-xl text-warm-light mb-3 mt-6" {...props} />,
              p: ({node, ...props}) => <p className="mb-4" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-6" {...props} />,
              li: ({node, ...props}) => <li className="text-warm/90" {...props} />,
              strong: ({node, ...props}) => <strong className="text-gold-light" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

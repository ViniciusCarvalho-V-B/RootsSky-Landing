"use client";

import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Update = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export default function UpdatesCarousel() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Touch swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const res = await fetch("/api/admin/updates?limit=10");
        if (res.ok) {
          const data = await res.json();
          setUpdates(data);
        }
      } catch (error) {
        console.error("Erro ao buscar atualizações:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUpdates();
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    if (currentIndex < updates.length - 1) {
      setCurrentIndex(curr => curr + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(curr => curr - 1);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Agora mesmo";
    if (diffInSeconds < 3600) return `Há ${Math.floor(diffInSeconds / 60)} min`;
    if (diffInSeconds < 86400) return `Há ${Math.floor(diffInSeconds / 3600)}h`;
    
    const days = Math.floor(diffInSeconds / 86400);
    if (days === 1) return "Ontem";
    if (days < 30) return `Há ${days} dias`;
    
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
      </div>
    );
  }

  if (updates.length === 0) {
    return (
      <div className="medieval-panel p-6 sm:p-8 flex flex-col items-center justify-center text-center">
        <svg className="w-12 h-12 text-gold/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
        </svg>
        <h3 className="font-cinzel text-gold text-lg mb-2">Nenhuma atualização</h3>
        <p className="text-warm-dim font-inter text-sm max-w-sm">Fique de olho! Novas atualizações sobre o servidor aparecerão aqui em breve.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full group">
      {/* Carousel Container */}
      <div 
        className="overflow-hidden rounded-xl"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          ref={containerRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {updates.map((update) => (
            <div key={update.id} className="w-full flex-shrink-0 px-1">
              <div className="medieval-panel h-full p-5 sm:p-6 md:p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-gold-shine animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                  <h3 className="font-cinzel font-black text-lg sm:text-xl text-gold uppercase tracking-wider line-clamp-1">
                    {update.title}
                  </h3>
                </div>
                
                <div className="gold-divider mb-4 opacity-50" />
                
                <div className="flex-grow prose prose-invert prose-gold max-w-none text-warm/90 font-inter text-sm sm:text-base leading-relaxed line-clamp-4 overflow-hidden">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {update.content}
                  </ReactMarkdown>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gold/10 flex justify-between items-center text-xs sm:text-sm text-warm-dim font-inter">
                  <div className="flex items-center gap-2">
                    <span className="opacity-60">Por:</span>
                    <span className="text-gold/80 font-medium">{update.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5 opacity-80">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDate(update.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {updates.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-[-10px] sm:left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-wood/90 border-2 border-gold/40 text-gold flex items-center justify-center transition-all duration-300 z-10 
              ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-0 sm:group-hover:opacity-100 hover:border-gold hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)]'}`}
            aria-label="Anterior"
          >
            <svg className="w-5 h-5 -ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            disabled={currentIndex === updates.length - 1}
            className={`absolute right-[-10px] sm:right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-wood/90 border-2 border-gold/40 text-gold flex items-center justify-center transition-all duration-300 z-10 
              ${currentIndex === updates.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-0 sm:group-hover:opacity-100 hover:border-gold hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)]'}`}
            aria-label="Próximo"
          >
            <svg className="w-5 h-5 -mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {updates.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {updates.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex 
                  ? 'w-6 h-2 bg-gold shadow-[0_0_8px_rgba(212,175,55,0.6)]' 
                  : 'w-2 h-2 bg-warm-dim/30 hover:bg-gold/50'
              }`}
              aria-label={`Ir para o slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

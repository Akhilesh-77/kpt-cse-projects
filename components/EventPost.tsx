import React, { useState, useRef, useCallback } from 'react';
import { Event } from '../types';

interface EventPostProps {
  event: Event;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const HeartIcon: React.FC<{ isLiked: boolean }> = ({ isLiked }) => (
  <svg
    className={`w-7 h-7 transition-all duration-300 transform ${isLiked ? 'text-red-500 scale-110' : 'text-[var(--text-secondary)]'}`}
    fill={isLiked ? 'currentColor' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
    />
  </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
);

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);


const EventPost: React.FC<EventPostProps> = ({ event, className, style, id }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const clickTimeout = useRef<number | null>(null);
  
  const handleLike = () => {
    setIsLiked(prev => !prev);
  };

  const showHeartAnimation = useCallback(() => {
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 800);
  }, []);

  const handleImageClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      if (!isLiked) {
        setIsLiked(true);
      }
      showHeartAnimation();
    } else {
      clickTimeout.current = window.setTimeout(() => {
        clickTimeout.current = null;
      }, 250);
    }
  };

  const goToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev + 1) % event.images.length);
  };

  const goToPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev - 1 + event.images.length) % event.images.length);
  };
  
  const handleShare = async () => {
    const shareData = {
      title: `KPT CSE Event: ${event.title}`,
      text: event.description,
      url: `${window.location.origin}/#events?post=${event.id}`,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <div
      id={id}
      className={`bg-[var(--bg-secondary)] rounded-xl shadow-lg overflow-hidden border border-[var(--border-color)] ${className}`}
      style={style}
    >
      <div className="p-4">
        <h3 className="text-lg font-bold text-[var(--text-primary)]">{event.title}</h3>
        <p className="text-xs text-[var(--text-muted)]">{event.timestamp}</p>
      </div>

      <div className="relative group">
        <div 
          className="cursor-pointer bg-[var(--bg-tertiary)] aspect-square overflow-hidden"
          onClick={handleImageClick}
        >
          {event.images.map((imgSrc, index) => (
             <img 
               key={index} 
               src={imgSrc} 
               alt={`${event.title} ${index + 1}`} 
               className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
             />
          ))}
        </div>

        {event.images.length > 1 && (
          <>
            <button onClick={goToPrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none z-10 hover:bg-black/60">
                <ChevronLeftIcon />
            </button>
            <button onClick={goToNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none z-10 hover:bg-black/60">
                <ChevronRightIcon />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {event.images.map((_, index) => (
                    <div key={index} className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}></div>
                ))}
            </div>
          </>
        )}

        {showHeart && (
           <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <svg className="w-24 h-24 text-white/90 animate-like-heart" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
           </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <button onClick={handleLike} className="focus:outline-none p-1">
            <HeartIcon isLiked={isLiked} />
          </button>
           <button onClick={handleShare} className="focus:outline-none p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <ShareIcon />
          </button>
        </div>
        <p className="text-[var(--text-secondary)] mt-3 text-sm">{event.description}</p>
      </div>
    </div>
  );
};

export default EventPost;
import React, { useState, useEffect, useCallback } from 'react';
import { Event } from '../types';

interface StoryViewerProps {
  stories: Event[];
  startIndex: number;
  onClose: () => void;
  onViewPost: (eventId: number) => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, startIndex, onClose, onViewPost }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [animationClass, setAnimationClass] = useState('animate-fade-in-up');
  
  const goToNextStory = useCallback(() => {
    if (currentIndex >= stories.length - 1) {
        setAnimationClass('opacity-0 transition-opacity duration-300');
        setTimeout(onClose, 300);
        return;
    }
    setAnimationClass('animate-slide-out-to-left');
    setTimeout(() => {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setCurrentImageIndex(0);
        setAnimationClass('animate-slide-in-from-right');
    }, 300);
  }, [currentIndex, stories.length, onClose]);

  const goToPrevStory = useCallback(() => {
    if (currentIndex <= 0) {
        return;
    }
    setAnimationClass('animate-slide-out-to-right');
    setTimeout(() => {
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
        setCurrentImageIndex(0);
        setAnimationClass('animate-slide-in-from-left');
    }, 300);
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    const currentStory = stories[currentIndex];
    if (currentImageIndex < currentStory.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else {
      goToNextStory();
    }
  }, [currentImageIndex, currentIndex, stories, goToNextStory]);

  const handlePrev = useCallback(() => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    } else {
      goToPrevStory();
    }
  }, [currentImageIndex, goToPrevStory]);
  
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
    const currentStory = stories[currentIndex];
    if (!currentStory) return;

    const imageDuration = 10000 / (currentStory.images.length || 1);
    const timer = setTimeout(handleNext, imageDuration);
    return () => clearTimeout(timer);
  }, [currentIndex, currentImageIndex, stories, handleNext]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  const currentStory = stories[currentIndex];
  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex justify-center items-center p-2 sm:p-4" onClick={onClose}>
      <div 
        className={`relative w-full h-full max-w-md max-h-screen sm:max-h-[95vh] bg-[var(--bg-primary)] rounded-lg overflow-hidden shadow-2xl flex flex-col ${animationClass}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Progress Bars */}
        <div className="absolute top-2 left-2 right-2 flex gap-1 z-20">
            {stories.map((story, storyIndex) => (
              <div key={story.id} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                {storyIndex < currentIndex && <div className="h-full w-full bg-white"></div>}
                {storyIndex === currentIndex && (
                  <div className="h-full w-full" style={{ 
                    width: `${((currentImageIndex + 1) / story.images.length) * 100}%`,
                    transition: 'width 0.2s linear'
                  }}>
                    <div 
                      key={animationKey} 
                      className="h-full bg-white"
                      style={{ 
                          width: `${(1 / story.images.length) * 100}%`,
                          animation: `story-progress ${10000 / story.images.length}ms linear forwards`,
                          marginLeft: `${(currentImageIndex / story.images.length) * 100}%`
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Header */}
        <div className="absolute top-5 left-4 right-4 z-20 flex justify-between items-start">
             <div className="flex items-center gap-2">
                <img src="https://gpt.karnataka.gov.in/kptmangalore/public/uploads/dept_logo1755926888.jpg" alt="Logo" className="w-8 h-8 rounded-full"/>
                <span className="text-white font-semibold text-sm">KPT CSE Dept.</span>
             </div>
            <button onClick={onClose} className="text-white/80 hover:text-white text-3xl">&times;</button>
        </div>
        
        {/* Image */}
        <img src={currentStory.images[currentImageIndex]} alt={currentStory.title} className="w-full h-full object-cover"/>

        {/* Bottom Overlay with Title and "View More" button */}
        <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
            <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg pointer-events-auto">
                 <h3 className="text-white text-lg font-bold text-center drop-shadow-md">{currentStory.title}</h3>
                 <button 
                    onClick={(e) => { e.stopPropagation(); onViewPost(currentStory.id); }} 
                    className="w-full text-center mt-2 text-sm text-white/80 hover:text-white underline"
                 >
                    View More
                 </button>
            </div>
        </div>

        {/* Navigation Overlays */}
        <div className="absolute inset-0 flex">
            <div className="w-1/3 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePrev(); }}></div>
            <div className="w-1/3 h-full"></div>
            <div className="w-1/3 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); handleNext(); }}></div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
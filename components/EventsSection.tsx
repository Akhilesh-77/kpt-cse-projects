import React, { useState, useEffect, useCallback } from 'react';
import { Event } from '../types';
import { demoEvents } from '../data/events';
import StoryViewer from './StoryViewer';
import EventPost from './EventPost';

interface EventsSectionProps {
    onAddEventClick: () => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({ onAddEventClick }) => {
    const [stories, setStories] = useState<Event[]>(demoEvents);
    const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

    const handleOpenStory = (index: number) => {
        setActiveStoryIndex(index);
    };
    
    const handleCloseStory = () => {
        if (activeStoryIndex !== null) {
            const viewedStory = stories[activeStoryIndex];
            // Move viewed story to the end of the list
            setStories(prevStories => [
                ...prevStories.filter(story => story.id !== viewedStory.id),
                viewedStory
            ]);
        }
        setActiveStoryIndex(null);
    };

    const handleViewPost = useCallback((eventId: number) => {
        setActiveStoryIndex(null); // Close the story viewer
        setTimeout(() => {
            const postElement = document.getElementById(`post-${eventId}`);
            if (postElement) {
                postElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Add a temporary highlight effect
                postElement.classList.add('ring-2', 'ring-[var(--accent)]', 'ring-offset-2', 'ring-offset-[var(--bg-primary)]', 'transition-shadow', 'duration-1000', 'ease-out');
                setTimeout(() => {
                    postElement.classList.remove('ring-2', 'ring-[var(--accent)]', 'ring-offset-2', 'ring-offset-[var(--bg-primary)]', 'transition-shadow', 'duration-1000', 'ease-out');
                }, 2500);
            }
        }, 300); // Allow time for modal to close
    }, []);

    // Effect for deep linking
    useEffect(() => {
        const hash = window.location.hash;
        if (!hash.includes('#events')) return;

        const queryString = hash.split('?')[1];
        if (!queryString) return; // FIX: Prevent error if hash has no query string

        const params = new URLSearchParams(queryString);
        const storyId = params.get('event');
        const postId = params.get('post');
        const newUrl = `${window.location.pathname}#events`;

        if (storyId) {
            const storyIndex = stories.findIndex(s => s.id === parseInt(storyId, 10));
            if (storyIndex !== -1) {
                handleOpenStory(storyIndex);
                window.history.replaceState(null, '', newUrl); // Clean URL
            }
        } else if (postId) {
            handleViewPost(parseInt(postId, 10));
            window.history.replaceState(null, '', newUrl); // Clean URL
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleViewPost]); // Run only on mount to check initial URL


    return (
        <section className="container mx-auto px-0 sm:px-6 lg:px-8 py-8">
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            
            {/* Event Stories */}
            <div className="mb-12 px-4 sm:px-0">
                <h2 className="text-2xl font-bold text-[var(--text-secondary)] mb-4 opacity-0 animate-fade-in-up">Stories</h2>
                <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
                    {stories.map((story, index) => (
                        <div
                            key={story.id}
                            onClick={() => handleOpenStory(index)}
                            className="flex-shrink-0 w-28 h-40 rounded-xl overflow-hidden cursor-pointer relative group transform transition-transform duration-300 hover:scale-105 opacity-0 animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <img src={story.images[0]} alt={story.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold break-words">
                                {story.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {activeStoryIndex !== null && (
                <StoryViewer 
                    stories={stories}
                    startIndex={activeStoryIndex}
                    onClose={handleCloseStory}
                    onViewPost={handleViewPost}
                />
            )}

            {/* Event Feed */}
            <div className="px-4 sm:px-0">
                <h2 className="text-2xl font-bold text-[var(--text-secondary)] mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>Feed</h2>
                <div className="max-w-xl mx-auto space-y-8">
                     {demoEvents.slice().reverse().map((event, index) => (
                        <EventPost 
                            key={event.id} 
                            event={event} 
                            id={`post-${event.id}`}
                            className="opacity-0 animate-fade-in-up" 
                            style={{ animationDelay: `${400 + index * 150}ms` }} 
                        />
                     ))}
                </div>
            </div>

            <button
                onClick={onAddEventClick}
                title="Add New Event"
                aria-label="Add New Event"
                className="fixed bottom-6 right-6 bg-[var(--accent)] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-3xl font-bold hover:bg-[var(--accent-hover)] transition-all duration-300 transform hover:scale-110 z-30"
            >
                +
            </button>
        </section>
    );
};

export default EventsSection;
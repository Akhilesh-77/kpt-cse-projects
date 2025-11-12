import React, { useEffect, useState } from 'react';

interface ToastProps {
    message: string | null;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                // Allow fade-out animation to complete before calling onClose
                setTimeout(onClose, 300); 
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    return (
        <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 z-50
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
            {message}
        </div>
    );
};

export default Toast;

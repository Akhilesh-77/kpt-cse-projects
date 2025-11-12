import React, { useState } from 'react';

interface AdminLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            setError('');
            onLogin();
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    if (!isOpen) return null;
    
    const inputClasses = "w-full mt-1 p-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition";
    const buttonClasses = "px-4 py-2 rounded-md font-semibold transition-colors";

    return (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-[var(--bg-secondary)] rounded-xl shadow-2xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-center text-[var(--text-primary)] mb-2">Admin Login</h2>
                        <p className="text-center text-[var(--text-secondary)] mb-6">Enter your credentials to manage students.</p>
                        
                        <div className="mb-4">
                            <label className="font-semibold">Username</label>
                            <input 
                                type="text" 
                                value={username} 
                                onChange={e => setUsername(e.target.value)} 
                                className={inputClasses} 
                                required 
                            />
                        </div>
                        <div className="mb-6">
                            <label className="font-semibold">Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                className={inputClasses} 
                                required 
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                        
                        <button type="submit" className={`${buttonClasses} w-full bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]`}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginModal;
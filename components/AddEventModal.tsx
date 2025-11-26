import React, { useState, useEffect } from 'react';

interface AddEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    setToastMessage: (message: string) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, setToastMessage }) => {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [photos, setPhotos] = useState<FileList | null>(null);
    const [showNotice, setShowNotice] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShowNotice(false);
        }
    }, [isOpen]);

    const resetForm = () => {
        setEventName('');
        setEventDescription('');
        setPhotos(null);
        setShowNotice(false);
        // Reset file input visually
        const fileInput = document.getElementById('event-photo-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhotos(e.target.files);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!eventName.trim() || !eventDescription.trim() || !photos || photos.length === 0) {
            setToastMessage('Please fill all fields and upload at least one photo.');
            return;
        }

        setShowNotice(true);
    };

    const handleProceed = () => {
        // WhatsApp number with country code (91 for India) as required by WhatsApp API
        const phoneNumber = '916363027032';
        
        // Extract filenames from the FileList
        const fileNames = photos ? Array.from(photos).map(f => f.name).join(', ') : '';

        const message = `*Event Submission Request*

*Title:* ${eventName}
*Description:* ${eventDescription}
*Image Files:* ${fileNames}

(Please attach the selected images to this chat)`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Open in new tab immediately without blocking UI
        window.open(whatsappUrl, '_blank');
        
        setToastMessage(`Opening WhatsApp... Please attach ${photos ? photos.length : 0} photo(s).`);
        resetForm();
        onClose();
    };
    
    if (!isOpen) return null;

    const inputClasses = "w-full mt-1 p-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition";
    const buttonClasses = "px-4 py-2 rounded-md font-semibold transition-colors";

    return (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-[var(--bg-secondary)] rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up" onClick={e => e.stopPropagation()}>
                {!showNotice ? (
                    <form onSubmit={handleSubmit}>
                         <div className="p-6">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Add New Event</h2>
                            <p className="text-[var(--text-secondary)] mb-6">Submit event details for admin approval.</p>

                            <div className="mb-4">
                                <label className="font-semibold">Event Name</label>
                                <input type="text" value={eventName} onChange={e => setEventName(e.target.value)} className={inputClasses} required />
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">Event Description</label>
                                <textarea value={eventDescription} onChange={e => setEventDescription(e.target.value)} className={inputClasses} rows={4} required></textarea>
                            </div>
                            
                            <div className="mb-4">
                                <label className="font-semibold">Upload Photos</label>
                                <input 
                                    id="event-photo-upload"
                                    type="file" 
                                    multiple 
                                    accept="image/*" 
                                    onChange={handlePhotoChange} 
                                    className={`w-full text-sm text-[var(--text-secondary)] mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--accent)] file:text-white hover:file:bg-[var(--accent-hover)] ${inputClasses} p-0`}
                                    required
                                />
                                {photos && photos.length > 0 && (
                                    <p className="text-xs text-[var(--text-muted)] mt-2">{photos.length} file(s) selected.</p>
                                )}
                            </div>
                        </div>
                        <div className="bg-[var(--bg-primary)] p-4 flex justify-end space-x-4 rounded-b-xl">
                            <button type="button" onClick={onClose} className={`${buttonClasses} bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--border-color)]`}>Cancel</button>
                            <button type="submit" className={`${buttonClasses} bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]`}>Request to Add Event</button>
                        </div>
                    </form>
                ) : (
                    <div className="p-8 text-center animate-fade-in-up">
                        <div className="w-20 h-20 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--accent)] shadow-inner">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">One Last Step</h3>
                        <p className="text-[var(--text-secondary)] mb-8 leading-relaxed text-base">
                            WhatsApp Web does not allow websites to automatically send uploaded images. Due to browser security restrictions, images cannot be forwarded directly.
                            <br/><br/>
                            <span className="font-semibold text-[var(--accent)] border-b border-[var(--accent)] pb-0.5">Please select the image manually again when WhatsApp opens.</span>
                        </p>
                        <div className="flex justify-center space-x-4">
                             <button 
                                onClick={() => setShowNotice(false)} 
                                className={`${buttonClasses} bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--border-color)]`}
                            >
                                Back
                            </button>
                            <button 
                                onClick={handleProceed} 
                                className={`${buttonClasses} bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] flex items-center shadow-lg hover:shadow-[var(--shadow-color)] transform transition hover:-translate-y-1`}
                            >
                                Open WhatsApp
                                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddEventModal;
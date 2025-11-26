import React, { useState } from 'react';

interface AddEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    setToastMessage: (message: string) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, setToastMessage }) => {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [photos, setPhotos] = useState<FileList | null>(null);

    const resetForm = () => {
        setEventName('');
        setEventDescription('');
        setPhotos(null);
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

        // WhatsApp number with country code (91 for India) as required by WhatsApp API
        const phoneNumber = '916363027032';
        
        // Extract filenames from the FileList
        const fileNames = Array.from(photos).map(f => f.name).join(', ');

        const message = `*Event Submission Request*

*Title:* ${eventName}
*Description:* ${eventDescription}
*Image Files:* ${fileNames}

(Please attach the selected images to this chat)`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        const confirmationMessage = `This action will open WhatsApp to send the event details to the admin.

Please remember to manually attach the ${photos.length} photo(s) you selected to the WhatsApp chat.

Do you want to continue?`;
        
        if (window.confirm(confirmationMessage)) {
            // Open in new tab
            window.open(whatsappUrl, '_blank');
            
            setToastMessage('Opening WhatsApp...');
            resetForm();
            onClose();
        }
    };
    
    if (!isOpen) return null;

    const inputClasses = "w-full mt-1 p-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition";
    const buttonClasses = "px-4 py-2 rounded-md font-semibold transition-colors";

    return (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-[var(--bg-secondary)] rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up" onClick={e => e.stopPropagation()}>
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
            </div>
        </div>
    );
};

export default AddEventModal;
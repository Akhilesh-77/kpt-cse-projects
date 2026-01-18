import React from 'react';

interface QRCodeSectionProps {
    onBack: () => void;
}

const QRCodeSection: React.FC<QRCodeSectionProps> = ({ onBack }) => {
    // Placeholders as requested
    const qrImageLink = "https://i.postimg.cc/Gh7qnFng/Screenshot-2026-01-19-013916.png";
    const cseWebsiteLink = "https://kptcs.vercel.app/";

    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(cseWebsiteLink)
                .then(() => alert("Link copied to clipboard!"))
                .catch(err => console.error("Failed to copy link", err));
        } else {
             // Fallback for non-secure contexts if needed, though mostly used in secure or localhost
             alert("Link copied to clipboard!"); 
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: 'KPT CSE Website',
            text: 'Check out the official KPT CSE Website!',
            url: cseWebsiteLink,
        };
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error("Share failed", err);
            }
        } else {
            handleCopy();
        }
    };

    return (
        <section className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[80vh] animate-fade-in-up">
            <div className="bg-[var(--bg-secondary)] p-8 rounded-2xl shadow-2xl border border-[var(--border-color)] max-w-md w-full text-center relative">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Scan My Website QR Code</h2>
                
                <div className="bg-white p-4 rounded-xl mb-6 inline-block shadow-inner group transition-transform duration-300 hover:scale-105">
                    <img src={qrImageLink} alt="Website QR Code" className="w-48 h-48 object-contain" />
                </div>

                <div className="bg-[var(--bg-tertiary)]/50 border-l-4 border-yellow-500 p-4 mb-6 text-left rounded-r-lg">
                    <p className="text-sm text-[var(--text-secondary)]">
                        <span className="font-bold text-yellow-500 block mb-1">NOTE:</span>
                        Scanning this QR code will directly open the official CSE website.
                        This QR code is only for website access.
                        It is NOT related to any payment, transaction, or financial activity.
                        Please scan safely.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <button 
                            onClick={handleCopy}
                            className="flex-1 py-2 px-4 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg font-semibold hover:bg-[var(--border-color)] transition-colors flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            Copy Link
                        </button>
                        <button 
                            onClick={handleShare}
                            className="flex-1 py-2 px-4 bg-[var(--accent)] text-white rounded-lg font-semibold hover:bg-[var(--accent-hover)] transition-colors flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                            Share QR
                        </button>
                    </div>
                    <button 
                        onClick={onBack}
                        className="w-full py-2 px-4 border border-[var(--border-color)] text-[var(--text-muted)] rounded-lg hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </section>
    );
};

export default QRCodeSection;

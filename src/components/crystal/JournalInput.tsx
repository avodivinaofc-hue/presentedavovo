import { useState, useEffect, useCallback } from 'react';

interface JournalInputProps {
    chapterId: string;
    placeholder?: string;
    onSave?: (value: string) => void;
}

export const JournalInput = ({
    chapterId,
    placeholder = "Escreva aqui os seus pensamentos...",
    onSave
}: JournalInputProps) => {
    const storageKey = `crystal-journal-${chapterId}`;
    const [value, setValue] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            setValue(saved);
        }
    }, [storageKey]);

    // Auto-save with debounce
    const saveToStorage = useCallback((text: string) => {
        localStorage.setItem(storageKey, text);
        setIsSaved(true);
        onSave?.(text);

        setTimeout(() => setIsSaved(false), 2000);
    }, [storageKey, onSave]);

    useEffect(() => {
        if (!value) return;

        const timeoutId = setTimeout(() => {
            saveToStorage(value);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [value, saveToStorage]);

    return (
        <div className="relative">
            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="crystal-journal-input"
                rows={5}
            />

            {/* Save indicator */}
            <div
                className={`absolute bottom-4 right-4 flex items-center gap-2 text-xs transition-opacity duration-300 ${isSaved ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#A78BFA]"
                >
                    <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span className="text-[#A78BFA]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    Guardado
                </span>
            </div>

            {/* Character count */}
            <div className="mt-2 text-right">
                <span
                    className="text-xs text-[#E0D8F0]/40"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                    {value.length} caracteres
                </span>
            </div>
        </div>
    );
};

export default JournalInput;

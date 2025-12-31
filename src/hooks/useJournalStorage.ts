import { useState, useEffect, useCallback } from 'react';

interface JournalEntry {
    chapterId: string;
    content: string;
    timestamp: number;
}

interface JournalStorageState {
    entries: Record<string, JournalEntry>;
    completedChapters: number[];
}

const STORAGE_KEY = 'crystal-temple-journal';

export const useJournalStorage = () => {
    const [state, setState] = useState<JournalStorageState>({
        entries: {},
        completedChapters: []
    });

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setState(JSON.parse(saved));
            }
        } catch (error) {
            console.error('Failed to load journal:', error);
        }
    }, []);

    // Save to localStorage whenever state changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error('Failed to save journal:', error);
        }
    }, [state]);

    const saveEntry = useCallback((chapterId: string, content: string) => {
        setState(prev => ({
            ...prev,
            entries: {
                ...prev.entries,
                [chapterId]: {
                    chapterId,
                    content,
                    timestamp: Date.now()
                }
            }
        }));
    }, []);

    const getEntry = useCallback((chapterId: string): string => {
        return state.entries[chapterId]?.content || '';
    }, [state.entries]);

    const markChapterComplete = useCallback((chapterIndex: number) => {
        setState(prev => {
            if (prev.completedChapters.includes(chapterIndex)) {
                return prev;
            }
            return {
                ...prev,
                completedChapters: [...prev.completedChapters, chapterIndex].sort((a, b) => a - b)
            };
        });
    }, []);

    const isChapterComplete = useCallback((chapterIndex: number): boolean => {
        return state.completedChapters.includes(chapterIndex);
    }, [state.completedChapters]);

    const generateSoulBook = useCallback((): string => {
        const entries = Object.values(state.entries)
            .sort((a, b) => {
                const aNum = parseInt(a.chapterId.replace(/\D/g, '')) || 0;
                const bNum = parseInt(b.chapterId.replace(/\D/g, '')) || 0;
                return aNum - bNum;
            });

        let content = `# O Livro da Sua Alma\n\n`;
        content += `*Gerado em ${new Date().toLocaleDateString('pt-BR')}*\n\n`;
        content += `---\n\n`;

        entries.forEach((entry, index) => {
            if (entry.content.trim()) {
                content += `## Reflexão ${index + 1}\n\n`;
                content += `${entry.content}\n\n`;
                content += `---\n\n`;
            }
        });

        content += `\n*"A sabedoria que você procura está dentro de você."*\n`;

        return content;
    }, [state.entries]);

    const downloadSoulBook = useCallback(() => {
        const content = generateSoulBook();
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'O-Livro-da-Sua-Alma.md';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [generateSoulBook]);

    const resetProgress = useCallback(() => {
        setState({
            entries: {},
            completedChapters: []
        });
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return {
        entries: state.entries,
        completedChapters: state.completedChapters,
        saveEntry,
        getEntry,
        markChapterComplete,
        isChapterComplete,
        generateSoulBook,
        downloadSoulBook,
        resetProgress
    };
};

export default useJournalStorage;

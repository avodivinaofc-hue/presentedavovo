import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ColorScheme = 'mystical' | 'cosmic' | 'earth' | 'ocean' | 'fire';
export type SeasonalTheme = 'default' | 'spring' | 'summer' | 'autumn' | 'winter';

interface ThemePreferences {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  seasonalTheme: SeasonalTheme;
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

interface ThemeContextType {
  preferences: ThemePreferences;
  updatePreferences: (updates: Partial<ThemePreferences>) => void;
  toggleTheme: () => void;
  toggleColorScheme: () => void;
  applySeasonalTheme: () => void;
  resetToDefaults: () => void;
}

const defaultPreferences: ThemePreferences = {
  mode: 'auto',
  colorScheme: 'mystical',
  seasonalTheme: 'default',
  reducedMotion: false,
  highContrast: false,
  fontSize: 'medium',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [preferences, setPreferences] = useState<ThemePreferences>(() => {
    const saved = localStorage.getItem('theme-preferences');
    return saved ? { ...defaultPreferences, ...JSON.parse(saved) } : defaultPreferences;
  });

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  // Detecta tema do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    updateSystemTheme(mediaQuery);
    mediaQuery.addEventListener('change', updateSystemTheme);

    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, []);

  // Aplica tema atual
  const currentTheme = useMemo(() => {
    if (preferences.mode === 'auto') {
      return systemTheme;
    }
    return preferences.mode;
  }, [preferences.mode, systemTheme]);

  // Aplica preferências ao DOM
  useEffect(() => {
    const root = document.documentElement;
    
    // Tema claro/escuro
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${currentTheme}`);
    
    // Esquema de cores
    root.classList.remove('color-mystical', 'color-cosmic', 'color-earth', 'color-ocean', 'color-fire');
    root.classList.add(`color-${preferences.colorScheme}`);
    
    // Tema sazonal
    root.classList.remove('seasonal-spring', 'seasonal-summer', 'seasonal-autumn', 'seasonal-winter');
    if (preferences.seasonalTheme !== 'default') {
      root.classList.add(`seasonal-${preferences.seasonalTheme}`);
    }
    
    // Reduzir movimento
    if (preferences.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // Alto contraste
    if (preferences.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Tamanho da fonte
    root.classList.remove('font-small', 'font-medium', 'font-large');
    root.classList.add(`font-${preferences.fontSize}`);
    
  }, [currentTheme, preferences]);

  // Salva preferências no localStorage
  useEffect(() => {
    localStorage.setItem('theme-preferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = useCallback((updates: Partial<ThemePreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  }, []);

  const toggleTheme = useCallback(() => {
    setPreferences(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : prev.mode === 'dark' ? 'auto' : 'light'
    }));
  }, []);

  const toggleColorScheme = useCallback(() => {
    const schemes: ColorScheme[] = ['mystical', 'cosmic', 'earth', 'ocean', 'fire'];
    setPreferences(prev => {
      const currentIndex = schemes.indexOf(prev.colorScheme);
      const nextIndex = (currentIndex + 1) % schemes.length;
      return { ...prev, colorScheme: schemes[nextIndex] };
    });
  }, []);

  const applySeasonalTheme = useCallback(() => {
    const month = new Date().getMonth();
    let seasonalTheme: SeasonalTheme = 'default';
    
    if (month >= 2 && month <= 4) seasonalTheme = 'spring';
    else if (month >= 5 && month <= 7) seasonalTheme = 'summer';
    else if (month >= 8 && month <= 10) seasonalTheme = 'autumn';
    else seasonalTheme = 'winter';
    
    setPreferences(prev => ({ ...prev, seasonalTheme }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setPreferences(defaultPreferences);
  }, []);

  const value = useMemo(() => ({
    preferences,
    updatePreferences,
    toggleTheme,
    toggleColorScheme,
    applySeasonalTheme,
    resetToDefaults,
  }), [preferences, updatePreferences, toggleTheme, toggleColorScheme, applySeasonalTheme, resetToDefaults]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

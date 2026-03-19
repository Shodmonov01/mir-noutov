import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getWebApp } from '../lib/telegram';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const webApp = getWebApp();
  const [theme, setThemeState] = useState<ThemeMode>(
    (webApp?.colorScheme ?? 'light') as ThemeMode
  );

  useEffect(() => {
    if (!webApp) return;
    webApp.onEvent('themeChanged', () => {
      setThemeState((webApp.colorScheme ?? 'light') as ThemeMode);
    });
  }, [webApp]);

  const setTheme = useCallback((value: ThemeMode) => {
    setThemeState(value);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = React.useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

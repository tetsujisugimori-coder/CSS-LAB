import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeConfig, ThemeId, UIStyle } from '../types';
import { DEFAULT_THEME_ID, THEMES, applyThemeToDocument, getThemeById } from '../themes';

interface ThemeContextType {
  themeId: ThemeId;
  theme: ThemeConfig;
  setThemeId: (id: ThemeId) => void;
  uiStyle: UIStyle;
  setUiStyle: (style: UIStyle) => void;
  themes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_THEME_KEY = 'css_lab_theme_id';
const STORAGE_UISTYLE_KEY = 'css_lab_ui_style';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_THEME_KEY) as ThemeId;
      if (saved && THEMES.some((t) => t.id === saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return DEFAULT_THEME_ID;
  });

  const [uiStyle, setUiStyleState] = useState<UIStyle>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_UISTYLE_KEY) as UIStyle;
      if (saved && ['modern', 'glass', 'neobrutal', 'minimal'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'modern';
  });

  const currentTheme = getThemeById(themeId);

  // Sync to document element whenever theme changes
  useEffect(() => {
    applyThemeToDocument(currentTheme);
    try {
      localStorage.setItem(STORAGE_THEME_KEY, themeId);
    } catch {
      // ignore
    }
  }, [themeId, currentTheme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_UISTYLE_KEY, uiStyle);
    } catch {
      // ignore
    }
  }, [uiStyle]);

  const setThemeId = (newId: ThemeId) => {
    setThemeIdState(newId);
  };

  const setUiStyle = (newStyle: UIStyle) => {
    setUiStyleState(newStyle);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeId,
        theme: currentTheme,
        setThemeId,
        uiStyle,
        setUiStyle,
        themes: THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

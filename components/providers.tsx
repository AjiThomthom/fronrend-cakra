'use client';

import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { useEffect, useState, useMemo } from 'react';

// Wrapper khusus sinkronisasi MUI + Tailwind
function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync mode MUI dengan next-themes
  const theme = useMemo(() => {
    const isDark = resolvedTheme === 'dark';
    return createTheme({
      palette: {
        mode: isDark ? 'dark' : 'light',
        background: {
          default: isDark ? '#020617' : '#f8fafc',
          paper: isDark ? '#0f172a' : '#ffffff',
        },
      },
    });
  }, [resolvedTheme]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <MuiThemeWrapper>{children}</MuiThemeWrapper>
    </NextThemesProvider>
  );
}
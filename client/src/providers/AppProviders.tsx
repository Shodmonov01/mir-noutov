import React from 'react';
import { ChakraProvider, Theme } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { system } from '../theme/telegramDarkTheme';
import { CartProvider } from '../context/CartContext';
import { CheckoutProvider } from '../context/CheckoutContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { AppToaster } from '../lib/notifications';
import { queryClient } from './queryClient';

interface AppProvidersProps {
  children: React.ReactNode;
}

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <Theme appearance={theme} hasBackground>
      {children}
    </Theme>
  );
};

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        <ThemeProvider>
          <ThemeWrapper>
            <CartProvider>
              <CheckoutProvider>
                {children}
                <AppToaster />
              </CheckoutProvider>
            </CartProvider>
          </ThemeWrapper>
        </ThemeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

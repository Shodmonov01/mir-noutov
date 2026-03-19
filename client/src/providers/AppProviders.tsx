import React from 'react';
import { ChakraProvider, Theme } from '@chakra-ui/react';
import { system } from '../theme/telegramDarkTheme';
import { CartProvider } from '../context/CartContext';
import { CheckoutProvider } from '../context/CheckoutContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

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
    <ChakraProvider value={system}>
      <ThemeProvider>
        <ThemeWrapper>
          <CartProvider>
            <CheckoutProvider>{children}</CheckoutProvider>
          </CartProvider>
        </ThemeWrapper>
      </ThemeProvider>
    </ChakraProvider>
  );
};

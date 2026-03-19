import React from 'react';
import { ChakraProvider, defaultSystem, Theme } from '@chakra-ui/react';
import { CartProvider } from '../context/CartContext';
import { CheckoutProvider } from '../context/CheckoutContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <Theme appearance={theme} hasBackground>
      {children}
    </Theme>
  );
};

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ChakraProvider value={defaultSystem}>
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

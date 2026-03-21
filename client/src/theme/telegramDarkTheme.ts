import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

/**
 * Fallback для var(--tg-theme-*) вне Telegram — только rgb()/ключевые слова, без hex (dev-chakra).
 */
const TG = {
  bg: 'var(--tg-theme-bg-color, rgb(24 34 45))',
  secondaryBg: 'var(--tg-theme-secondary-bg-color, rgb(35 46 60))',
  sectionBg: 'var(--tg-theme-section-bg-color, rgb(43 58 74))',
  text: 'var(--tg-theme-text-color, white)',
  hint: 'var(--tg-theme-hint-color, rgb(142 142 147))',
  link: 'var(--tg-theme-link-color, rgb(100 181 246))',
  button: 'var(--tg-theme-button-color, rgb(51 144 236))',
  buttonText: 'var(--tg-theme-button-text-color, white)',
  border: 'var(--tg-theme-section-separator-color, rgb(61 79 95))',
};

const telegramDarkConfig = defineConfig({
  globalCss: {
    ':root': {
      '--safe-area-top': 'env(safe-area-inset-top, 0px)',
      '--safe-area-right': 'env(safe-area-inset-right, 0px)',
      '--safe-area-bottom': 'env(safe-area-inset-bottom, 0px)',
      '--safe-area-left': 'env(safe-area-inset-left, 0px)',
    },
    html: {
      colorScheme: 'light dark',
    },
    body: {
      margin: 0,
      bg: 'bg',
      color: 'fg',
      fontFamily: 'body',
      textRendering: 'optimizeLegibility',
    },
    '#root': {
      width: '100%',
      maxWidth: 'sizes.layout',
      marginInline: 'auto',
      minHeight: 'var(--tg-viewport-stable-height, 100dvh)',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      paddingTop: 'var(--safe-area-top)',
      paddingRight: 'var(--safe-area-right)',
      paddingBottom: 'var(--safe-area-bottom)',
      paddingLeft: 'var(--safe-area-left)',
    },
  },
  theme: {
    tokens: {
      sizes: {
        layout: { value: '30rem' },
        cartThumb: { value: '4.5rem' },
        categoryChip: { value: '5rem' },
        drawerImageMax: { value: '17.5rem' },
        emptyStateMax: { value: '17.5rem' },
        stepperLg: { value: '3rem' },
        stepperSm: { value: '2.25rem' },
        badgeMin: { value: '1.125rem' },
        focusRing: { value: '0.125rem' },
      },
      borderWidths: {
        hairline: { value: '0.0625rem' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: { _light: '{colors.white}', _dark: TG.bg },
          },
          subtle: {
            value: { _light: '{colors.gray.50}', _dark: TG.secondaryBg },
          },
          muted: {
            value: { _light: '{colors.gray.100}', _dark: TG.sectionBg },
          },
          emphasized: {
            value: { _light: '{colors.gray.200}', _dark: '{colors.gray.700}' },
          },
          panel: {
            value: { _light: '{colors.white}', _dark: TG.secondaryBg },
          },
        },
        fg: {
          DEFAULT: {
            value: { _light: '{colors.black}', _dark: TG.text },
          },
          muted: {
            value: { _light: '{colors.gray.600}', _dark: TG.hint },
          },
          subtle: {
            value: { _light: '{colors.gray.500}', _dark: '{colors.gray.400}' },
          },
        },
        border: {
          DEFAULT: {
            value: { _light: '{colors.gray.200}', _dark: TG.border },
          },
          muted: {
            value: { _light: '{colors.gray.100}', _dark: '{colors.gray.600}' },
          },
          subtle: {
            value: { _light: '{colors.gray.100}', _dark: '{colors.gray.800}' },
          },
        },
        gray: {
          subtle: {
            value: { _light: '{colors.gray.100}', _dark: TG.sectionBg },
          },
          muted: {
            value: { _light: '{colors.gray.200}', _dark: '{colors.gray.700}' },
          },
          fg: {
            value: { _light: '{colors.gray.800}', _dark: TG.text },
          },
          border: {
            value: { _light: '{colors.gray.200}', _dark: TG.border },
          },
        },
        blue: {
          solid: {
            value: {
              _light: '{colors.blue.600}',
              _dark: TG.button,
            },
          },
          muted: {
            value: {
              _light: '{colors.blue.100}',
              _dark: 'rgba(51, 144, 236, 0.2)',
            },
          },
          fg: {
            value: {
              _light: '{colors.blue.700}',
              _dark: TG.link,
            },
          },
        },
        red: {
          muted: {
            value: {
              _light: '{colors.red.100}',
              _dark: 'rgba(239, 68, 68, 0.2)',
            },
          },
        },
        green: {
          muted: {
            value: {
              _light: '{colors.green.100}',
              _dark: 'rgba(34, 197, 94, 0.2)',
            },
          },
        },
        orange: {
          muted: {
            value: {
              _light: '{colors.orange.100}',
              _dark: 'rgba(249, 115, 22, 0.2)',
            },
          },
          fg: {
            value: {
              _light: '{colors.orange.600}',
              _dark: '{colors.orange.400}',
            },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, telegramDarkConfig);

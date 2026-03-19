import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

/**
 * Цвета тёмной темы Telegram.
 * var(--tg-theme-*) — когда в TG, иначе fallback.
 */
const TG = {
  bg: 'var(--tg-theme-bg-color, #18222d)',
  secondaryBg: 'var(--tg-theme-secondary-bg-color, #232e3c)',
  sectionBg: 'var(--tg-theme-section-bg-color, #2b3a4a)',
  text: 'var(--tg-theme-text-color, #ffffff)',
  hint: 'var(--tg-theme-hint-color, #8e8e93)',
  link: 'var(--tg-theme-link-color, #64b5f6)',
  button: 'var(--tg-theme-button-color, #3390ec)',
  buttonText: 'var(--tg-theme-button-text-color, #ffffff)',
  border: 'var(--tg-theme-section-separator-color, #3d4f5f)',
};

const telegramDarkConfig = defineConfig({
  theme: {
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
            value: { _light: '{colors.gray.200}', _dark: '#364558' },
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
            value: { _light: '{colors.gray.500}', _dark: '#6b7b8c' },
          },
        },
        border: {
          DEFAULT: {
            value: { _light: '{colors.gray.200}', _dark: TG.border },
          },
          muted: {
            value: { _light: '{colors.gray.100}', _dark: '#2d3d4e' },
          },
          subtle: {
            value: { _light: '{colors.gray.100}', _dark: '#253342' },
          },
        },
        gray: {
          subtle: {
            value: { _light: '{colors.gray.100}', _dark: TG.sectionBg },
          },
          muted: {
            value: { _light: '{colors.gray.200}', _dark: '#364558' },
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

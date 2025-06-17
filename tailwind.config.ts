/* eslint import/no-default-export: 0 */
import { kurocadoStudioTheme } from '@kurocado-studio/ui/theme';

export const content = [
  './src/**/*.{ts,mdx,tsx}',
  './node_modules/@kurocado-studio/ui/dist/**/*.js',
];
export const theme = kurocadoStudioTheme;
export const darkMode = ['class', '[data-mode="dark"]'];
export const plugins = [require('tailwindcss-animate')];

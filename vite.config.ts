/* eslint import/no-default-export: 0 */
/* eslint import/no-cycle: 0 */
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
});

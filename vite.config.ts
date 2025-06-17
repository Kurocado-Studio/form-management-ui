/* eslint import/no-default-export: 0 */
/* eslint import/no-cycle: 0 */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
});

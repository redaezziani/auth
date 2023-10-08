import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const serverApiUrl = 'http://localhost:3000';

export default defineConfig({
  plugins: [react()],
})

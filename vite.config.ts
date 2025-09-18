import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://sergarsilla.is-a.dev',
        changeOrigin: true
      }
    }
  },
  plugins: [react(), mode === "production" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunk for core React libraries
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor';
          }
          // Animations chunk for Framer Motion
          if (id.includes('node_modules/framer-motion')) {
            return 'animations';
          }
          // Router chunk
          if (id.includes('node_modules/react-router')) {
            return 'router';
          }
          // UI components chunk
          if (id.includes('node_modules/lucide-react') ||
            id.includes('node_modules/@radix-ui') ||
            id.includes('/components/ui/')) {
            return 'ui';
          }
          // Utils chunk
          if (id.includes('node_modules/clsx') ||
            id.includes('node_modules/tailwind-merge') ||
            id.includes('node_modules/class-variance-authority')) {
            return 'utils';
          }
          // Analytics chunk (load separately)
          if (id.includes('@vercel/analytics') || id.includes('@vercel/speed-insights')) {
            return 'analytics';
          }
        }
      }
    },
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug', 'console.warn'] : [],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500
  },
  base: '/'
}));

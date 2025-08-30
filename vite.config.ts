import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Otimizações para desenvolvimento
    hmr: {
      overlay: false, // Desabilita overlay de erro para melhor performance
    },
  },
  plugins: [
    react({
      // Otimizações do SWC para melhor performance
      jsxImportSource: "react",
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Otimizações de build para melhor performance
    target: "esnext",
    minify: "esbuild", // Usar esbuild que já está incluído
    rollupOptions: {
      output: {
        // Code splitting para melhor performance
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"],
          utils: ["clsx", "class-variance-authority"],
        },
        // Otimizações de assets
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "asset";
          const info = name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
    // Otimizações de CSS
    cssCodeSplit: true,
    cssMinify: true,
    // Otimizações de assets
    assetsInlineLimit: 4096, // 4kb
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    // Pré-bundle de dependências para melhor performance
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@supabase/supabase-js",
    ],
  },
  // Otimizações para PWA
  define: {
    __DEV__: mode === "development",
  },
  // Otimizações de CSS
  css: {
    devSourcemap: mode === "development",
  },
}));

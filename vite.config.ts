import { defineConfig } from 'vite';
import ViteComponents from 'unplugin-vue-components/vite';
import vue from "@vitejs/plugin-vue";
// 使用你所使用的UI组件库的 resolver
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    ViteComponents({
      resolvers: [
        AntDesignVueResolver(),
      ],
    }),
  ]
  // ...
});
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src')
    }
  }
})

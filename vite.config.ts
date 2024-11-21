import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs:[path.resolve(process.cwd(),'src/assets/svgs')],
      // 指定symbolld格式
      symbolId: 'icon-[dir]-[name]' 
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: "0.0.0.0",
    cors: true,
    port: 8991,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  css:{
	  preprocessorOptions:{
		  scss:{
			  additionalData:`@import "./src/assets/variables.scss";@import "./src/assets/sass/mixins.scss";` //引入scss文件
		  },
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // 'primary-color': '#171D26'
        },
      }
	  }
  }
})

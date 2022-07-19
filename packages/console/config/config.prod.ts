import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      ApiURL: 'http://api.recosele.com',
    },
  },
  outputPath: '/public',
});

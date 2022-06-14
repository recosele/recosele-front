import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      ApiURL: 'https://api.sclogi.jp',
    },
  },
  outputPath: '/public',
});

import { IConfig } from 'umi-types';

const prod_config: IConfig = {
  define: {
    'process.env': {
      ApiURL: 'https://api.sclogi.jp',
    },
  },
  outputPath: '/public',
};

export default prod_config;

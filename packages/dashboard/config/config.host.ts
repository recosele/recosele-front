import { IConfig } from 'umi-types';

const localhost_config: IConfig = {
  define: {
    'process.env': {
      ApiURL: 'http://localhost:4000',
    },
  },
};

export default localhost_config;
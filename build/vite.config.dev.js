import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import config from './config';
import { wrapperEnv } from './utils';

export default defineConfig(({ mode }) => {
  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const pocssEnv = wrapperEnv(mode);
  return {
    resolve: {
      alias: config.alias,
    },
    envPrefix: 'WX_',
    define: {
      'process.env': pocssEnv,
    },
    plugins: [
      reactRefresh({
        exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
        include: '**/*.tsx',
      }),
    ],
    server: {
      port: 8200,
      open: true,
      fs: {
        strict: false,
        allow: ['..'],
      },
    },
  };
});

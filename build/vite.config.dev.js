import { defineConfig, loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import config from './config';
import { processEnv } from './utils';

export default defineConfig(({ mode }) => {
  const root = process.cwd();

  const env = loadEnv(mode, root);
  console.log('loadenv', env);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = processEnv(mode);
  console.log('eeeeee', viteEnv);
  return {
    resolve: {
      alias: config.alias,
    },
    envPrefix: 'REACT_',
    define: {
      process: {},
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

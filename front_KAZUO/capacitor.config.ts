import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kazuo.app',
  appName: 'KazuoApp',
  webDir: 'out',
  server:{ 
     androidScheme: 'https'
  },
};

export default config;

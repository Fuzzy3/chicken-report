import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dk.nyttebjerggaard.chickenreport',
  appName: 'Chicken Report',
  webDir: 'dist/chicken-report/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;

import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.nexus.intranet',
  appName: 'Nexus Intranet',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config

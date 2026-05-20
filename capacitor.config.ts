import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.nexus.intranet',
  appName: 'Nexus Intranet',
  webDir: 'dist',
  // Painted behind the WebView (visible during initial load and behind the
  // translucent status bar area). Matches the app's slate-50 surface.
  backgroundColor: '#f8fafc',
  server: {
    androidScheme: 'https',
  },
  android: {
    backgroundColor: '#f8fafc',
  },
}

export default config

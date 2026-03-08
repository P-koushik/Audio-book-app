import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

import { AppNavigator } from './src/app/AppNavigator';
import { AuthProvider } from './src/features/auth/auth-provider';

export default function App() {
  useEffect(() => {
    const hide = async () => {
      await BootSplash.hide({ fade: true });
    };

    hide();
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

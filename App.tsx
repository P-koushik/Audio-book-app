import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

import { AppNavigator } from './src/app/AppNavigator';

export default function App() {
  useEffect(() => {
    const hide = async () => {
      await BootSplash.hide({ fade: true });
    };

    hide();
  }, []);

  return <AppNavigator />;
}

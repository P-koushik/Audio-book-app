import React, { useState } from 'react';

import { RootRoute, ROUTES } from './routes';
import { AppTabsScreen } from '../features/app/screens/AppTabsScreen';
import { AuthScreen } from '../features/auth/screens/AuthScreen';

export function AppNavigator() {
  const [rootRoute, setRootRoute] = useState<RootRoute>(ROUTES.AUTH);

  if (rootRoute === ROUTES.APP) {
    return <AppTabsScreen />;
  }

  return <AuthScreen onAuthenticated={() => setRootRoute(ROUTES.APP)} />;
}

import { NativeModules, Platform } from 'react-native';

const DEV_BACKEND_PORT = 5000;
const DEV_BACKEND_PATH = '/api/v1';

const getMetroHost = (): string | null => {
  const scriptURL = NativeModules.SourceCode?.scriptURL as string | undefined;

  if (!scriptURL) {
    return null;
  }

  const match = scriptURL.match(/^https?:\/\/([^/:]+)(?::\d+)?/i);
  return match?.[1] ?? null;
};

const getDefaultBackendUrl = (): string => {
  const host = getMetroHost();

  if (host) {
    return `http://${host}:${DEV_BACKEND_PORT}${DEV_BACKEND_PATH}`;
  }

  if (Platform.OS === 'android') {
    return `http://10.0.2.2:${DEV_BACKEND_PORT}${DEV_BACKEND_PATH}`;
  }

  return `http://localhost:${DEV_BACKEND_PORT}${DEV_BACKEND_PATH}`;
};

export const env = {
  backendUrl: getDefaultBackendUrl(),
  googleWebClientId: '1001478107726-kphs6jr84fsk1l53jk7b4arvrhpetvnl.apps.googleusercontent.com',
  googleIosClientId: 'REPLACE_WITH_IOS_CLIENT_ID',
};

import {
  GoogleSignin,
  isCancelledResponse,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential, type UserCredential } from 'firebase/auth';
import { Platform } from 'react-native';

import { env } from '../../constants/env';
import { auth } from '../firebase';

let isConfigured = false;

const validateGoogleConfig = () => {
  if (!env.googleWebClientId || env.googleWebClientId.startsWith('REPLACE_WITH_')) {
    throw new Error('Missing Firebase Google web client ID in mobile auth config.');
  }

  if (Platform.OS === 'ios' && env.googleIosClientId.startsWith('REPLACE_WITH_')) {
    throw new Error('Missing iOS Google client ID in mobile auth config.');
  }
};

export const configureGoogleSignIn = () => {
  if (isConfigured) {
    return;
  }

  validateGoogleConfig();

  GoogleSignin.configure({
    webClientId: env.googleWebClientId,
    iosClientId: Platform.OS === 'ios' ? env.googleIosClientId : undefined,
  });

  isConfigured = true;
};

export const signInWithGoogle = async (): Promise<UserCredential | null> => {
  configureGoogleSignIn();

  if (Platform.OS === 'android') {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  }

  try {
    const result = await GoogleSignin.signIn();

    if (isCancelledResponse(result)) {
      return null;
    }

    if (!isSuccessResponse(result)) {
      return null;
    }

    const idToken = result.data.idToken;

    if (!idToken) {
      throw new Error('Google sign-in did not return an ID token.');
    }

    const credential = GoogleAuthProvider.credential(idToken);

    return signInWithCredential(auth, credential);
  } catch (error) {
    if (isErrorWithCode(error) && error.code === statusCodes.SIGN_IN_CANCELLED) {
      return null;
    }

    throw error;
  }
};

export const signOutGoogle = async (): Promise<void> => {
  try {
    await GoogleSignin.signOut();
  } catch {
    // Ignore when there is no cached Google session to clear.
  }
};

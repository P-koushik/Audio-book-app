import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type UserCredential,
} from 'firebase/auth';

import { api } from '../../lib/api';
import { auth } from '../../services/firebase';
import { signInWithGoogle } from '../../services/auth/google';

export type AuthPayload = {
  email: string;
  password: string;
};

export async function login(payload: AuthPayload): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, payload.email, payload.password);
}

export async function signup(payload: AuthPayload): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, payload.email, payload.password);
}

export async function syncSigninWithBackend(): Promise<{ message: string }> {
  return api.post('/signin');
}

export async function loginWithGoogle(): Promise<UserCredential | null> {
  return signInWithGoogle();
}

export type AuthUser = {
  id: string;
  email?: string;
  name?: string;
  photoUrl?: string | null;
} | null;

export type AuthContextType = {
  user: AuthUser;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

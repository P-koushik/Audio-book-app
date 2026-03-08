export type AuthPayload = {
  email: string;
  password: string;
};

const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export async function login(payload: AuthPayload): Promise<{ success: boolean }> {
  await wait(500);
  return {
    success: Boolean(payload.email && payload.password),
  };
}

export async function signup(
  payload: AuthPayload,
): Promise<{ success: boolean }> {
  await wait(500);
  return {
    success: Boolean(payload.email && payload.password),
  };
}

export async function loginWithGoogle(): Promise<{ success: boolean }> {
  await wait(500);
  return { success: true };
}

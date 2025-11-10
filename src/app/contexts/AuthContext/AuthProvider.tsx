import { useCallback, useLayoutEffect, useState } from 'react';
import { AuthContext } from '.';
import { AuthService } from '@app/services/AuthService';
import { AuthTokensManager } from '@app/lib/AuthTokensManager';
import { useAccount } from '@app/hooks/queries/useAccount';
import { Service } from '@app/services/Services';
import * as SplashScreen from 'expo-splash-screen';
import { useQueryClient } from '@tanstack/react-query';
import { useForceRender } from '@app/app/useForceRender';

SplashScreen.preventAutoHideAsync();

interface ISetupAuthParams {
  accessToken: string;
  refreshToken: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { account, loadAccount } = useAccount({ enable: false });
  const queryClient = useQueryClient();
  const forceRender = useForceRender();

  const [isReady, setIsReady] = useState(false);

  const setupAuth = useCallback(async (tokens: ISetupAuthParams) => {
    Service.setAccessToken(tokens.accessToken);
    await loadAccount();
    await SplashScreen.hideAsync();
    setIsReady(true);
  }, []);

  useLayoutEffect(() => {
    async function load() {
      const tokens = await AuthTokensManager.load();

      if (!tokens) {
        setIsReady(true);
        await SplashScreen.hideAsync();
        return;
      }

      await setupAuth(tokens);
    }

    load();
  }, [loadAccount]);

  const signIn = useCallback(async (payload: AuthService.SignInPayload) => {
    const tokens = await AuthService.signIn(payload);
    await AuthTokensManager.save(tokens);
    await setupAuth(tokens);
  }, []);

  const signUp = useCallback(async (payload: AuthService.SignUpPayload) => {
    const tokens = await AuthService.signUp(payload);
    await AuthTokensManager.save(tokens);
    await setupAuth(tokens);
  }, []);

  const signOut = useCallback(async () => {
    Service.removeAccessToken();
    queryClient.clear();
    forceRender();
    await AuthTokensManager.clear();
  }, [queryClient]);

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ signedIn: !!account, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

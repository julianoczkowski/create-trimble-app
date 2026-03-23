# Add Trimble Identity Authentication (SolidJS)

Use this rule when the user asks to add authentication, TID, Trimble Identity, login, or sign-in functionality to their SolidJS app.

## Overview

This adds OAuth 2.0 / OpenID Connect authentication via Trimble Identity. It uses the `TIDClient` class from `@trimble-oss/trimble-id-react` (which is framework-agnostic despite the name) wrapped in a SolidJS-native context provider. All app routes are protected behind authentication.

## Step 1: Install the SDK

```bash
npm install @trimble-oss/trimble-id-react
```

Note: Only `TIDClient` is imported from this package. The React-specific components (`TIDProvider`, `useAuth`) are NOT used. We create SolidJS-native equivalents below.

## Step 2: Add Environment Variables

Add to `.env.development`:

```env
VITE_TID_CONFIGURATION_ENDPOINT=https://stage.id.trimblecloud.com/.well-known/openid-configuration
VITE_TID_CLIENT_ID=your-client-id-here
VITE_TID_REDIRECT_URL=http://localhost:5173/callback
VITE_TID_LOGOUT_REDIRECT_URL=http://localhost:5173/logout-callback
VITE_TID_SCOPES=your-app-scope
```

Add to `.env.production`:

```env
VITE_TID_CONFIGURATION_ENDPOINT=https://id.trimble.com/.well-known/openid-configuration
VITE_TID_CLIENT_ID=your-client-id-here
VITE_TID_REDIRECT_URL=https://your-domain.com/callback
VITE_TID_LOGOUT_REDIRECT_URL=https://your-domain.com/logout-callback
VITE_TID_SCOPES=your-app-scope
```

## Step 3: Create Auth Module Files

Create the following files in `src/auth/`. This is a SolidJS wrapper around `TIDClient`.

### `src/auth/constants.ts`

```ts
export const LIST_PARAMS_REQUIRED: string[] = ["code", "state"];
```

### `src/auth/utils.ts`

```ts
import { LIST_PARAMS_REQUIRED } from "./constants";

export const removeSearchParams = (url: string): string => {
  return url.split("?")[0];
};

export const getSearchParams = (url: string): URLSearchParams => {
  let searchParams = url;
  if (!url.startsWith("?")) {
    try {
      searchParams = new URL(url).search;
    } catch (_e) {
      /* ignore */
    }
  }
  return new URLSearchParams(searchParams);
};

export const hasAuthParams = (
  url: string = window.location.href,
  redirectUrl?: string,
): boolean => {
  if (redirectUrl != null) {
    const cleanRedirectUrl = removeSearchParams(redirectUrl);
    const cleanUrl = removeSearchParams(url ?? "");
    if (cleanRedirectUrl !== cleanUrl) {
      return false;
    }
  }
  const searchParams = getSearchParams(url);
  for (const paramRequired of LIST_PARAMS_REQUIRED) {
    if (!searchParams.has(paramRequired)) {
      return false;
    }
  }
  return true;
};
```

### `src/auth/useReducer.ts`

```ts
import { createStore, reconcile } from "solid-js/store";

export function useReducer<T extends object, A extends object>(
  reducer: (state: T, action: A) => T,
  state: T,
): [T, (action: A) => void] {
  const [store, setStore] = createStore<T>(state);
  const dispatch = (action: A): void => {
    state = reducer(state, action);
    setStore(reconcile(state));
  };
  return [store, dispatch];
}
```

### `src/auth/state.ts`

```ts
export interface TIDUser {
  id?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
  account_id?: string;
}

export interface TIDAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: TIDUser;
  error?: Error;
}

export const initialTIDAuthState: TIDAuthState = {
  isLoading: true,
  isAuthenticated: false,
};
```

### `src/auth/reducer.ts`

```ts
import type { TIDUser } from "./state";
import type { TIDAuthState } from "./state";

type Action =
  | { type: "INIT"; user?: TIDUser }
  | { type: "LOGOUT" }
  | { type: "GET_ACCESS_TOKEN_COMPLETE"; user?: TIDUser }
  | { type: "HANDLE_CALLBACK_COMPLETE"; user?: TIDUser }
  | { type: "ERROR"; error: Error };

export const reducer = (state: TIDAuthState, action: Action): TIDAuthState => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: action.user != null,
        user: action.user,
        error: undefined,
      };
    case "HANDLE_CALLBACK_COMPLETE":
    case "GET_ACCESS_TOKEN_COMPLETE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: action.user != null,
        user: action.user,
        error: undefined,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
  }
};
```

### `src/auth/TIDContext.tsx`

```tsx
import type { TIDAuthState } from "./state";
import { Accessor, createContext } from "solid-js";

export interface LoginWithRedirectOptions {
  onRedirect?(url: string): void;
}

export interface LogoutOptions {
  onRedirect?(url: string): void;
  disabledAutoRedirect?: boolean;
}

export interface TIDContextState extends TIDAuthState {
  handleCallback(url?: string): Promise<{ authState: unknown }>;
  getAccessTokenSilently(): Promise<string>;
  loginWithRedirect(options?: LoginWithRedirectOptions): Promise<void>;
  logout(options?: LogoutOptions): Promise<void>;
}

export const TIDContext = createContext<Accessor<TIDContextState> | null>(null);
```

### `src/auth/TIDProvider.tsx`

```tsx
import {
  TIDContext,
  type TIDContextState,
  type LoginWithRedirectOptions,
  type LogoutOptions,
} from "./TIDContext";
import { reducer } from "./reducer";
import { initialTIDAuthState } from "./state";
import { TIDClient } from "@trimble-oss/trimble-id-react";
import {
  createSignal,
  createMemo,
  onMount,
  type ParentComponent,
  type ParentProps,
  useContext,
  createEffect,
} from "solid-js";
import { hasAuthParams } from "./utils";
import { useReducer } from "./useReducer";

export interface TIDProviderProps extends ParentProps {
  tidClient?: TIDClient;
  configurationEndpoint?: string;
  clientId?: string;
  redirectUrl?: string;
  logoutRedirectUrl?: string;
  scopes?: string[];
  onRedirectCallback?(authState: { returnTo?: string }): void;
  checkRedirectUrlMatch?: boolean;
}

export const TIDProvider: ParentComponent<TIDProviderProps> = (props) => {
  const context = useContext(TIDContext);
  const [currentState, dispatch] = useReducer(reducer, initialTIDAuthState);
  const [client, setClient] = createSignal<TIDClient>();

  const clientConfig = createMemo(() => ({
    config: {
      configurationEndpoint: props.configurationEndpoint ?? "",
      clientId: props.clientId ?? "",
      redirectUrl: props.redirectUrl ?? "",
      logoutRedirectUrl: props.logoutRedirectUrl ?? "",
      scopes: props.scopes ?? [""],
    },
  }));

  onMount(() => {
    if (context != null) {
      throw new Error("TID Provider already defined");
    }
    setClient(props.tidClient ?? new TIDClient(clientConfig()));
  });

  let ignoreInit = false;
  const redirectUrlMatch = createMemo(() =>
    props.checkRedirectUrlMatch ? client()?.getRedirectUrl() : undefined,
  );

  createEffect(() => {
    if (ignoreInit || !client()) return;
    ignoreInit = true;

    (async () => {
      try {
        let user;
        if (hasAuthParams(undefined, redirectUrlMatch())) {
          const { authState } = await client()!.handleCallback();
          user = await client()!.getUser();
          props.onRedirectCallback?.(authState as { returnTo?: string });
        } else {
          await client()!.loadUserSession();
          user = await client()!.getUser();
        }
        dispatch({ type: "INIT", user: user as any });
      } catch (error) {
        const err =
          typeof error === "string" ? new Error(error) : (error as Error);
        dispatch({ type: "ERROR", error: err });
      }
    })().catch((error: unknown) => {
      dispatch({ type: "ERROR", error: error as Error });
    });
  });

  const getAccessTokenSilently = async (): Promise<string> => {
    const token = await client()!.getAccessTokenSilently();
    const user = await client()!.getUser();
    dispatch({ type: "GET_ACCESS_TOKEN_COMPLETE", user: user as any });
    return token;
  };

  const loginWithRedirect = async (
    options?: LoginWithRedirectOptions,
  ): Promise<void> => {
    await client()!.loginWithRedirect(options);
  };

  const logout = async (options?: LogoutOptions): Promise<void> => {
    await client()!.logout(options);
    if (options?.disabledAutoRedirect) {
      dispatch({ type: "LOGOUT" });
    }
  };

  const handleCallback = async (url?: string) => {
    const { authState } = await client()!.handleCallback(url);
    const user = await client()!.getUser();
    dispatch({ type: "HANDLE_CALLBACK_COMPLETE", user: user as any });
    return { authState };
  };

  const contextState = createMemo<TIDContextState>(() => ({
    ...currentState,
    getAccessTokenSilently,
    loginWithRedirect,
    handleCallback,
    logout,
  }));

  return (
    <TIDContext.Provider value={contextState}>
      {props.children}
    </TIDContext.Provider>
  );
};
```

### `src/auth/useAuth.ts`

```ts
import { Accessor, useContext } from "solid-js";
import { TIDContext, type TIDContextState } from "./TIDContext";

export const useAuth = (): Accessor<TIDContextState> => {
  const auth = useContext(TIDContext);
  if (!auth) {
    throw new Error("useAuth must be used within a TIDProvider");
  }
  return auth;
};
```

### `src/auth/AuthenticationGuard.tsx`

```tsx
import { createEffect, type ParentComponent, Show } from "solid-js";
import { useAuth } from "./useAuth";
import ModusLoader from "../components/ModusLoader";

export const AuthenticationGuard: ParentComponent = (props) => {
  const authState = useAuth();

  createEffect(() => {
    if (!authState().isLoading && !authState().isAuthenticated) {
      authState()
        .loginWithRedirect()
        .catch((error: unknown) => {
          console.error("Error logging in", error);
        });
    }
  });

  return (
    <Show
      when={authState().isAuthenticated}
      fallback={
        <div class="flex items-center justify-center h-screen bg-background">
          <ModusLoader size="lg" />
        </div>
      }
    >
      {props.children}
    </Show>
  );
};
```

### `src/auth/index.ts`

```ts
export { TIDProvider } from "./TIDProvider";
export type { TIDProviderProps } from "./TIDProvider";
export { useAuth } from "./useAuth";
export { AuthenticationGuard } from "./AuthenticationGuard";
export type {
  TIDContextState,
  LoginWithRedirectOptions,
  LogoutOptions,
} from "./TIDContext";
export type { TIDUser, TIDAuthState } from "./state";
```

## Step 4: Create Callback Pages

Create `src/pages/CallbackPage.tsx`:

```tsx
export default function CallbackPage() {
  return (
    <div class="flex items-center justify-center h-screen bg-background">
      <div class="text-foreground-60">Completing sign in...</div>
    </div>
  );
}
```

Create `src/pages/LogoutCallbackPage.tsx`:

```tsx
import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function LogoutCallbackPage() {
  const navigate = useNavigate();
  onMount(() => navigate("/", { replace: true }));

  return (
    <div class="flex items-center justify-center h-screen bg-background">
      <div class="text-foreground-60">Signing out...</div>
    </div>
  );
}
```

## Step 5: Update App.tsx

Wrap the app with `TIDProvider` and add callback routes. Place `AuthenticationGuard` around protected routes:

```tsx
import { TIDProvider } from "./auth";
import { AuthenticationGuard } from "./auth";
import { TIDClient } from "@trimble-oss/trimble-id-react";
import CallbackPage from "./pages/CallbackPage";
import LogoutCallbackPage from "./pages/LogoutCallbackPage";

const tidClient = new TIDClient({
  config: {
    configurationEndpoint: import.meta.env.VITE_TID_CONFIGURATION_ENDPOINT,
    clientId: import.meta.env.VITE_TID_CLIENT_ID,
    redirectUrl: import.meta.env.VITE_TID_REDIRECT_URL,
    logoutRedirectUrl: import.meta.env.VITE_TID_LOGOUT_REDIRECT_URL,
    scopes: (import.meta.env.VITE_TID_SCOPES || "")
      .split(",")
      .map((s: string) => s.trim()),
  },
});

// In the component tree:
<ThemeProvider>
  <ModusProvider>
    <TIDProvider
      tidClient={tidClient}
      onRedirectCallback={(authState) => {
        window.location.replace(authState?.returnTo || "/");
      }}
    >
      <Router>
        {/* Public auth callback routes */}
        <Route path="/callback" component={CallbackPage} />
        <Route path="/logout-callback" component={LogoutCallbackPage} />

        {/* Protected routes */}
        <Route
          path="/"
          component={() => (
            <AuthenticationGuard>
              {/* Existing app content / routes */}
            </AuthenticationGuard>
          )}
        />
      </Router>
    </TIDProvider>
  </ModusProvider>
</ThemeProvider>;
```

## Step 6: Update Navbar for Auth

In the component that renders `ModusNavbar`, use `useAuth()` to populate the user card and handle sign out:

```tsx
import { useAuth } from "./auth";

function AppNavbar() {
  const auth = useAuth();

  const userCard = () => ({
    name: auth().user?.name || auth().user?.given_name || "",
    email: auth().user?.email || "",
    avatarSrc: auth().user?.picture || "",
    avatarAlt: "User Avatar",
  });

  return (
    <ModusNavbar
      userCard={userCard()}
      visibility={{
        mainMenu: true,
        notifications: true,
        apps: true,
        help: true,
        user: auth().isAuthenticated,
      }}
      onSignOutClick={() => auth().logout()}
    />
  );
}
```

## Step 7: Using Access Tokens for API Calls

```tsx
import { useAuth } from "./auth";

function MyApiComponent() {
  const auth = useAuth();

  const fetchData = async () => {
    const token = await auth().getAccessTokenSilently();
    const response = await fetch("https://api.example.com/data", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  };
}
```

## Environment Variable Reference

| Variable                          | Description                                              |
| --------------------------------- | -------------------------------------------------------- |
| `VITE_TID_CONFIGURATION_ENDPOINT` | TID OpenID well-known config URL                         |
| `VITE_TID_CLIENT_ID`              | OAuth client ID from Trimble Developer Console           |
| `VITE_TID_REDIRECT_URL`           | Callback URL after login                                 |
| `VITE_TID_LOGOUT_REDIRECT_URL`    | Redirect URL after logout                                |
| `VITE_TID_SCOPES`                 | Comma-separated scopes (app name from Developer Console) |

## Developer Console Setup

1. Go to [Trimble Developer Console](https://console.trimble.com)
2. Create a new application
3. Set Grant Type to "Authorization Code Grant" with "Use Refresh tokens"
4. Set Callback URL to `http://localhost:5173/callback`
5. Set Logout URL to `http://localhost:5173/logout-callback`
6. Note the Client ID and configure scopes

## Notes

- In-memory token storage by default (most secure, SDK v1.0+)
- Tokens auto-refresh via refresh token (valid 9 days)
- The SolidJS wrapper uses `TIDClient` from `@trimble-oss/trimble-id-react` - this class is framework-agnostic
- `useAuth()` returns an `Accessor<TIDContextState>` - access properties via `auth().isAuthenticated`, `auth().user`, etc.
- For staging/dev, use `stage.id.trimblecloud.com`; for production, use `id.trimble.com`
- The auth wrapper source in `src/auth/` is based on `@trimble/trimble-id-solidjs` from the trimble-web-apps monorepo

# Add Trimble Identity Authentication (React)

Use this rule when the user asks to add authentication, TID, Trimble Identity, login, or sign-in functionality to their React app.

## Overview

This adds OAuth 2.0 / OpenID Connect authentication via Trimble Identity using the official `@trimble-oss/trimble-id-react` SDK. All app routes are protected behind authentication, with automatic redirect to the TID login page for unauthenticated users.

## Step 1: Install the SDK

```bash
npm install @trimble-oss/trimble-id-react
```

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

## Step 3: Create TID Auth Provider Wrapper

Create `src/contexts/TIDAuthProvider.tsx`:

```tsx
import { TIDProvider, TIDClient } from "@trimble-oss/trimble-id-react";
import type { ReactNode } from "react";

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

interface TIDAuthProviderProps {
  children: ReactNode;
}

export default function TIDAuthProvider({ children }: TIDAuthProviderProps) {
  const handleRedirectCallback = (authState: { returnTo?: string }) => {
    const returnTo = authState?.returnTo || "/";
    window.location.replace(returnTo);
  };

  return (
    <TIDProvider
      tidClient={tidClient}
      onRedirectCallback={handleRedirectCallback}
    >
      {children}
    </TIDProvider>
  );
}
```

## Step 4: Create Auth Guard Component

Create `src/components/AuthGuard.tsx`:

```tsx
import { useAuth, AuthenticationGuard } from "@trimble-oss/trimble-id-react";
import type { ReactNode } from "react";
import ModusLoader from "./ModusLoader";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  return (
    <AuthenticationGuard
      renderComponent={<>{children}</>}
      loader={
        <div className="flex items-center justify-center h-screen bg-background">
          <ModusLoader size="lg" />
        </div>
      }
    />
  );
}
```

## Step 5: Create Callback Pages

Create `src/pages/CallbackPage.tsx`:

```tsx
import { useEffect } from "react";
import { useAuth } from "@trimble-oss/trimble-id-react";

export default function CallbackPage() {
  const { handleCallback } = useAuth();

  useEffect(() => {
    handleCallback().catch(console.error);
  }, [handleCallback]);

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-foreground-60">Completing sign in...</div>
    </div>
  );
}
```

Create `src/pages/LogoutCallbackPage.tsx`:

```tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-foreground-60">Signing out...</div>
    </div>
  );
}
```

## Step 6: Update App.tsx

Wrap the app with `TIDAuthProvider` and add callback routes. The provider should wrap the Router. Add `AuthGuard` around protected routes:

```tsx
import TIDAuthProvider from "./contexts/TIDAuthProvider";
import AuthGuard from "./components/AuthGuard";
import CallbackPage from "./pages/CallbackPage";
import LogoutCallbackPage from "./pages/LogoutCallbackPage";

// In the component tree:
<ThemeProvider>
  <ModusProvider>
    <TIDAuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public auth callback routes */}
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/logout-callback" element={<LogoutCallbackPage />} />

          {/* Protected routes */}
          <Route
            path="/*"
            element={<AuthGuard>{/* Existing routes go here */}</AuthGuard>}
          />
        </Routes>
      </BrowserRouter>
    </TIDAuthProvider>
  </ModusProvider>
</ThemeProvider>;
```

## Step 7: Update ModusNavbar Usage for Auth

In the component that renders `ModusNavbar`, use `useAuth()` to populate the user card and handle sign out:

```tsx
import { useAuth } from "@trimble-oss/trimble-id-react";

function AppNavbar() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  const userCard = {
    name: user?.name || user?.given_name || "",
    email: user?.email || "",
    avatarSrc: user?.picture || "",
    avatarAlt: "User Avatar",
  };

  return (
    <ModusNavbar
      userCard={userCard}
      visibility={{
        mainMenu: true,
        notifications: true,
        apps: true,
        help: true,
        user: isAuthenticated,
      }}
      onSignOutClick={() => logout()}
    />
  );
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

- In-memory token storage (most secure, default in SDK v1.0+)
- Tokens auto-refresh via refresh token (valid 9 days)
- Use `getAccessTokenSilently()` from `useAuth()` for API calls
- For staging/dev, use `stage.id.trimblecloud.com`; for production, use `id.trimble.com`

# Add Trimble Identity Authentication (Angular)

Use this rule when the user asks to add authentication, TID, Trimble Identity, login, or sign-in functionality to their Angular app.

## Overview

This adds OAuth 2.0 / OpenID Connect authentication via Trimble Identity using the core `@trimble-oss/trimble-id` SDK wrapped in Angular-native services, guards, and interceptors. All app routes are protected behind authentication, with automatic redirect to the TID login page for unauthenticated users.

## Step 1: Install the SDK

```bash
npm install @trimble-oss/trimble-id
```

## Step 2: Add Environment Variables

Update `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  devPanel: true,
  tid: {
    configurationEndpoint: 'https://stage.id.trimblecloud.com/.well-known/openid-configuration',
    clientId: 'your-client-id-here',
    redirectUrl: 'http://localhost:4200/callback',
    logoutRedirectUrl: 'http://localhost:4200/logout-callback',
    scopes: ['your-app-scope'],
  },
};
```

Update `src/environments/environment.ts`:

```typescript
export const environment = {
  production: true,
  devPanel: false,
  tid: {
    configurationEndpoint: 'https://id.trimble.com/.well-known/openid-configuration',
    clientId: 'your-client-id-here',
    redirectUrl: 'https://your-domain.com/callback',
    logoutRedirectUrl: 'https://your-domain.com/logout-callback',
    scopes: ['your-app-scope'],
  },
};
```

## Step 3: Create the Auth Service

Create `src/app/services/auth.service.ts`:

```typescript
import { Injectable, signal, computed } from '@angular/core';
import { TIDClient } from '@trimble-oss/trimble-id';
import { environment } from '../../environments/environment';

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

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly client = new TIDClient({
    config: {
      configurationEndpoint: environment.tid.configurationEndpoint,
      clientId: environment.tid.clientId,
      redirectUrl: environment.tid.redirectUrl,
      logoutRedirectUrl: environment.tid.logoutRedirectUrl,
      scopes: environment.tid.scopes,
    },
  });

  private readonly _user = signal<TIDUser | undefined>(undefined);
  private readonly _isLoading = signal(true);
  private readonly _error = signal<Error | undefined>(undefined);

  readonly user = this._user.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly isAuthenticated = computed(() => this._user() != null);

  async initialize(): Promise<void> {
    try {
      if (this.hasAuthParams()) {
        const { authState } = await this.client.handleCallback();
        const user = await this.client.getUser();
        this._user.set(user as TIDUser | undefined);
        const returnTo = (authState as { returnTo?: string })?.returnTo || '/';
        window.location.replace(returnTo);
      } else {
        await this.client.loadUserSession();
        const user = await this.client.getUser();
        this._user.set(user as TIDUser | undefined);
      }
    } catch (error) {
      this._error.set(error instanceof Error ? error : new Error(String(error)));
    } finally {
      this._isLoading.set(false);
    }
  }

  async loginWithRedirect(): Promise<void> {
    await this.client.loginWithRedirect();
  }

  async logout(): Promise<void> {
    await this.client.logout();
  }

  async getAccessTokenSilently(): Promise<string> {
    const token = await this.client.getAccessTokenSilently();
    const user = await this.client.getUser();
    this._user.set(user as TIDUser | undefined);
    return token;
  }

  private hasAuthParams(): boolean {
    const params = new URLSearchParams(window.location.search);
    const currentUrl = window.location.origin + window.location.pathname;
    const redirectUrl = environment.tid.redirectUrl.split('?')[0];
    return currentUrl === redirectUrl && params.has('code') && params.has('state');
  }
}
```

## Step 4: Create the Auth Guard

Create `src/app/guards/auth.guard.ts`:

```typescript
import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Wait for initialization to complete
  if (authService.isLoading()) {
    // Auth is still initializing, allow navigation (initialize handles redirect)
    return true;
  }

  if (authService.isAuthenticated()) {
    return true;
  }

  // Not authenticated — redirect to TID login
  await authService.loginWithRedirect();
  return false;
};
```

## Step 5: Create the Auth Interceptor

Create `src/app/interceptors/auth.interceptor.ts`:

```typescript
import { inject } from '@angular/core';
import { type HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = async (req, next) => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    try {
      const token = await authService.getAccessTokenSilently();
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next(authReq);
    } catch {
      return next(req);
    }
  }

  return next(req);
};
```

## Step 6: Create Callback Components

Create `src/app/pages/callback/callback.component.ts`:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-callback',
  template: `
    <div class="flex items-center justify-center h-screen bg-background">
      <div class="text-foreground-60">Completing sign in...</div>
    </div>
  `,
})
export class CallbackComponent {}
```

Create `src/app/pages/logout-callback/logout-callback.component.ts`:

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-callback',
  template: `
    <div class="flex items-center justify-center h-screen bg-background">
      <div class="text-foreground-60">Signing out...</div>
    </div>
  `,
})
export class LogoutCallbackComponent implements OnInit {
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
```

## Step 7: Update App Configuration

Update `src/app/app.config.ts` to initialize the auth service and register the interceptor:

```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... existing providers ...
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => {
        return () => authService.initialize();
      },
      deps: [AuthService],
      multi: true,
    },
  ],
};
```

Note: There is already an `APP_INITIALIZER` for Modus components. Keep both — `multi: true` allows multiple initializers.

## Step 8: Update Routes

Update `src/app/app.routes.ts` to add callback routes and protect existing routes:

```typescript
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Public auth callback routes (no guard)
  {
    path: 'callback',
    loadComponent: () =>
      import('./pages/callback/callback.component').then((m) => m.CallbackComponent),
  },
  {
    path: 'logout-callback',
    loadComponent: () =>
      import('./pages/logout-callback/logout-callback.component').then(
        (m) => m.LogoutCallbackComponent,
      ),
  },
  // Protected routes
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
  // ... add canActivate: [authGuard] to all other protected routes
];
```

## Step 9: Update Navbar for Auth

In the component that renders `ModusNavbar`, inject `AuthService` and wire up the user card and sign out:

```typescript
import { AuthService } from './services/auth.service';

@Component({
  // ...
})
export class AppNavbar {
  private readonly authService = inject(AuthService);

  readonly userCard = computed(() => {
    const user = this.authService.user();
    return {
      name: user?.name || user?.given_name || '',
      email: user?.email || '',
      avatarSrc: user?.picture || '',
      avatarAlt: 'User Avatar',
    };
  });

  readonly navbarVisibility = computed(() => ({
    mainMenu: true,
    notifications: true,
    apps: true,
    help: true,
    user: this.authService.isAuthenticated(),
  }));

  onSignOut(): void {
    this.authService.logout();
  }
}
```

Then in the template:

```html
<modus-navbar
  [userCard]="userCard()"
  [visibility]="navbarVisibility()"
  (signOutClick)="onSignOut()"
></modus-navbar>
```

## Step 10: Using Access Tokens for API Calls

The `authInterceptor` automatically attaches the Bearer token to all HTTP requests. If you need the token manually:

```typescript
import { AuthService } from '../services/auth.service';

@Component({ /* ... */ })
export class MyComponent {
  private readonly authService = inject(AuthService);

  async fetchData(): Promise<void> {
    const token = await this.authService.getAccessTokenSilently();
    // Use token for manual fetch calls outside HttpClient
  }
}
```

## Environment Variable Reference

| Variable | Description |
|----------|-------------|
| `environment.tid.configurationEndpoint` | TID OpenID well-known config URL |
| `environment.tid.clientId` | OAuth client ID from Trimble Developer Console |
| `environment.tid.redirectUrl` | Callback URL after login |
| `environment.tid.logoutRedirectUrl` | Redirect URL after logout |
| `environment.tid.scopes` | Array of scopes (app name from Developer Console) |

## Developer Console Setup

1. Go to [Trimble Developer Console](https://console.trimble.com)
2. Create a new application
3. Set Grant Type to "Authorization Code Grant" with "Use Refresh tokens"
4. Set Callback URL to `http://localhost:4200/callback`
5. Set Logout URL to `http://localhost:4200/logout-callback`
6. Note the Client ID and configure scopes

## Notes

- Uses `@trimble-oss/trimble-id` (core SDK) — no Angular-specific SDK needed
- In-memory token storage by default (most secure, SDK v1.0+)
- Tokens auto-refresh via refresh token (valid 9 days)
- Auth initializes via `APP_INITIALIZER` before the app renders
- The `authInterceptor` automatically attaches Bearer tokens to all `HttpClient` requests
- For staging/dev, use `stage.id.trimblecloud.com`; for production, use `id.trimble.com`
- All auth state uses Angular signals (`signal`, `computed`) for reactive updates

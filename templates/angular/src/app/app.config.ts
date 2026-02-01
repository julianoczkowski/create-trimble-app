import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { defineCustomElements } from '@trimble-oss/moduswebcomponents/loader';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        // Pass resourcesUrl to defineCustomElements for logo asset path resolution
        return () =>
          defineCustomElements(window, {
            resourcesUrl: window.location.origin + '/modus-wc/',
          });
      },
      multi: true,
    },
  ],
};

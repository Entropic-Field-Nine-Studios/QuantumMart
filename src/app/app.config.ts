import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor';
import { UserStore } from './core/stores/user.store';
import { CustomTitleStrategyService } from './title/customTitleStrategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
    provideAppInitializer(() => {
      inject(UserStore).init();
    }),
    { provide: TitleStrategy, useClass: CustomTitleStrategyService },
  ],
};

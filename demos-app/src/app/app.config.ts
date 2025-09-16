import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { theme } from '../theme/primeng-config';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DynamicImportLoader } from './i18n/dynamic-import-loader';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    providePrimeNG({
      theme,
    }),
    importProvidersFrom([
      TranslateModule.forRoot({
        fallbackLang: localStorage.getItem('lang') ?? environment.defaultLang,
        loader: {
          provide: TranslateLoader,
          useClass: DynamicImportLoader,
        },
      }),
    ]),
  ],
};

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { FakeApiInterceptorService } from './services/interceptors/fake-api-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
              provideRouter(routes),
              provideHttpClient(withInterceptorsFromDi()),
              {provide: HTTP_INTERCEPTORS, useClass: FakeApiInterceptorService, multi: true}
              ]
};
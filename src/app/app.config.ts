import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { errorHandlerInterceptor } from './interceptor/api.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withInterceptors([errorHandlerInterceptor])), 
  provideAnimations(),
  provideToastr({
    timeOut: 4000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
  }),
  ]
};


import { ApplicationConfig } from '@angular/core';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideKirby, withGlobalSetup } from '@kirbydesign/designsystem';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideKirby(withGlobalSetup())],
};

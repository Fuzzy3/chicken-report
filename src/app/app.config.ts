import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HammerModule } from '@angular/platform-browser';
import { MAT_TABS_CONFIG } from '@angular/material/tabs';
import { KirbyModule } from '@kirbydesign/designsystem';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), { provide: MAT_TABS_CONFIG, useValue: {animationDuration: 150 }}, importProvidersFrom(KirbyModule)],
};

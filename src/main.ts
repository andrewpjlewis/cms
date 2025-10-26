import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing';

bootstrapApplication(App, {
  providers: [importProvidersFrom(AppRoutingModule)]
}).catch(err => console.error(err));

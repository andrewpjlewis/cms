import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing';
import { HttpClientModule } from '@angular/common/http';


bootstrapApplication(App, {
  providers: [
    importProvidersFrom(AppRoutingModule, HttpClientModule)
  ]
}).catch(err => console.error(err));
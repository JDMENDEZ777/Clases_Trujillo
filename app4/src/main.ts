// Cambia esto:
// import { App } from './app/app'; 

// Por esto:
import { AppComponent } from './app/app'; // Quitamos el '.component' porque tu archivo se llama app.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
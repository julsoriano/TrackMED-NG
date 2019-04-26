import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import { AppModule } from './app/app.module.lr';

import { environment } from './environments/environment';

// import { AppInjector } from './app/app-injector.service';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

/*
// https://blogs.msdn.microsoft.com/premier_developer/2018/06/17/angular-how-to-simplify-components-with-typescript-inheritance/
platformBrowserDynamic().bootstrapModule(AppModule).then((moduleRef) => {
  AppInjector.setInjector(moduleRef.injector);
}); 
*/

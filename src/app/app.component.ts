import { Component } from '@angular/core';
// import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { MedComponentPopupComponent } from '../app/popup/medcomponent.popup';
import { SystemPopupComponent } from '../app/popup/system.popup';

/*
@NgModule({
  declarations: [ AppComponent ],
  exports: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  constructor(injector: Injector) 
  {
    // Custom Elements: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
  
    // Convert popup components to autonomous custom elements
    const MedComponentPopupElement = createCustomElement(MedComponentPopupComponent, {injector});
    const SystemPopupElement = createCustomElement(SystemPopupComponent, {injector});

    // Register custom elements with the browser.
    customElements.define('medcomponentpopup-element', MedComponentPopupElement);
    customElements.define('systempopup-element', SystemPopupElement);

  }
  
  title = 'TrackMED-NG';
}

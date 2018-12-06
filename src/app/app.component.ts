import { Component } from '@angular/core';
// import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { PopupComponent } from './popup.component';
import { NestedComponent } from '../app/nestedTable/nestedTable.component';

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
  
  constructor(injector: Injector, 
        ) 
  {
    // Custom Elements: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
  
    // Convert `PopupComponent` to an autonomous custom element.
    const PopupElement = createCustomElement(PopupComponent, {injector});
    //const NestedElement = createCustomElement(PopupComponent, {injector});

    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
    // customElements.define('nested-element', NestedElement);
  }
  
  title = 'TrackMED-NG';
}

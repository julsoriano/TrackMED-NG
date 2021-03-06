import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AppComponent } from './app.component.pv';

import { HttpClientModule }    from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // needs a polyfill
import { PageNotFoundComponent }   from './page-not-found/page-not-found.component';

// TrackMED Tables
import { BaseComponent } from './base/base.component';
import { DescriptionComponent } from './description/description.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './location/location.component';
import { Model_ManufacturerComponent } from './modelmanufacturer/modelmanufacturer.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { OwnerComponent } from './owner/owner.component';
import { StatusComponent } from './status/status.component';

// Custom Elements
import { MedComponentPopupComponent } from './popup/medcomponent.popup';
import { SystemPopupComponent } from './popup/system.popup';

// Material support
import { MatDialogModule } from '@angular/material';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // needs a polyfill
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/*
@NgModule({
  declarations: [ AppComponent ],
  exports: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
*/
@NgModule({
  declarations: [
    AppComponent, 
    PageNotFoundComponent,  
  // DashboardComponent,
  // MessagesComponent,
  // EditDialogComponent,

  // Auxiliary Tables
    BaseComponent, 
    HomeComponent,
    NavMenuComponent,

  // TrackMED Tables
    DescriptionComponent,
    LocationComponent,
    Model_ManufacturerComponent,
    OwnerComponent,
    StatusComponent,

  // Custom Elements
    MedComponentPopupComponent,
    SystemPopupComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    /* 
    
    NoopAnimationsModule,
   
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses. Remove it when a real server is ready to receive requests.
    //  HttpClientInMemoryWebApiModule.forRoot(
    //    InMemoryDataService, { dataEncapsulation: false }
    //  )
   */
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA, 
    NO_ERRORS_SCHEMA
  ],
  // no need to place any providers due to the `providedIn` flag...
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    MedComponentPopupComponent,
    SystemPopupComponent
  ]
})
export class AppModule { }
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { AppRoutingModule } from './app-routing.module.lr';
import { AppComponent } from './app.component.lr';
// import { AppComponent } from './app.component.pv';

import { HttpClientModule,  HTTP_INTERCEPTORS }    from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // needs a polyfill
import { PageNotFoundComponent }   from './page-not-found/page-not-found.component';

// TrackMED Tables
import { BaseComponent } from './base/base.component';
import { DescriptionComponent } from './description/description.component';
// import { HomeComponent } from './home/home.component';
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

// User Login and Registration
import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { routing }        from './app-routing.module.lr';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

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
    SystemPopupComponent,
    
  // Login and Registration
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    routing
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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MedComponentPopupComponent,
    SystemPopupComponent
  ]
})
export class AppModule { }

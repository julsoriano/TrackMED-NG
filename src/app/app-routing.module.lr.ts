import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent }    from './page-not-found/page-not-found.component';

// import { DashboardComponent }   from './dashboard/dashboard.component';
// import { TablesComponent } from './tables/tables.component';
// import { TableDetailComponent } from './table-detail/table-detail.component';

import { HomeComponent } from './home/home.component.lr';
import { DescriptionComponent } from './description/description.component';
import { LocationComponent } from './location/location.component';
import { Model_ManufacturerComponent } from './modelmanufacturer/modelmanufacturer.component';
import { OwnerComponent } from './owner/owner.component';
import { StatusComponent } from './status/status.component';

// Login and Registraion
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard]  },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'detail/:id', component: TableDetailComponent },
  // { path: 'tables', component: TablesComponent },
  { path: 'Description', component: DescriptionComponent },
  { path: 'Location', component: LocationComponent },
  { path: 'Model_Manufacturer', component: Model_ManufacturerComponent },
  { path: 'Owner', component: OwnerComponent },
  { path: 'Status', component: StatusComponent },
  // { path: '**', component: PageNotFoundComponent },

  // Login and Registraion
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ] 
})

export class AppRoutingModule {}
export const routing = RouterModule.forRoot(routes);

import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent }    from './page-not-found/page-not-found.component';

// import { DashboardComponent }   from './dashboard/dashboard.component';
import { TablesComponent } from './tables/tables.component';
import { TableDetailComponent } from './table-detail/table-detail.component';

import { HomeComponent } from './home/home.component';
import { DescriptionComponent } from './description/description.component';
import { LocationComponent } from './location/location.component';
import { Model_ManufacturerComponent } from './modelmanufacturer/modelmanufacturer.component';
import { OwnerComponent } from './owner/owner.component';
import { StatusComponent } from './status/status.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'  },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: TableDetailComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'Description', component: DescriptionComponent },
  { path: 'Location', component: LocationComponent },
  { path: 'Model_Manufacturer', component: Model_ManufacturerComponent },
  { path: 'Owner', component: OwnerComponent },
  { path: 'Status', component: StatusComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ] 
})

export class AppRoutingModule {}

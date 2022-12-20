import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UprodListComponent } from './components/uprod-list/uprod-list.component';
//import { UprodDetailsComponent } from './components/uprod-details/uprod-details.component';
//import { AddUprodComponent } from './components/add-uprod/add-uprod.component';


//const routes: Routes = [];
const routes: Routes = [
  { path: '', redirectTo: 'uprod', pathMatch: 'full' },
  { path: 'uprod', component: UprodListComponent },
 // { path: 'uprod/:id', component: UprodDetailsComponent },
  //{ path: 'add', component: AddUprodComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

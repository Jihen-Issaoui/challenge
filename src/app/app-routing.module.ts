import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UprodListComponent } from './components/uprod-list/uprod-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'uprod', pathMatch: 'full' },
  { path: 'uprod', component: UprodListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

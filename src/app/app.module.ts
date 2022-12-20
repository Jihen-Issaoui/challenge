import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
//import { AddUprodComponent } from './components/add-uprod/add-uprod.component';
//import { UprodDetailsComponent } from './components/uprod-details/uprod-details.component';
import { UprodListComponent } from './components/uprod-list/uprod-list.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
//import { FormControl } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
/*  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatListModule,
  MatSidenavModule,
  MatGridListModule,
  MatCheckboxModule
} from '@angular/material';*/

const materialModules = [  
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatGridListModule,
  MatCardModule,
  MatAutocompleteModule
 /* MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  
  MatSelectModule,
  MatListModule,
  MatSidenavModule,
  MatGridListModule,
  MatCheckboxModule*/
]
@NgModule({
  declarations: [
    AppComponent,
  //  AddUprodComponent,
   // UprodDetailsComponent,
    UprodListComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatGridListModule,
  MatCardModule,
  FormsModule,
  HttpClientModule,
  MatAutocompleteModule,
  Ng2SearchPipeModule,
  //FormControl
 /* MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  
  MatSelectModule,
  MatListModule,
  MatSidenavModule,
  
  MatCheckboxModule*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule } from 'ng2-datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicineHomeComponent } from './medicine-home/medicine-home.component';
import { SearchDataPipe } from './pipe/searchdata.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MedicineHomeComponent,
    SearchDataPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    DatepickerModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: MedicineHomeComponent },])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

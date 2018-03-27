import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here


import { AppComponent } from './app.component';
import { CommonService } from './_services/common.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './/app-routing.module';
import { CrimeEducationComponent } from './crime-education/crime-education.component';
import { CrimeWorkComponent } from './crime-work/crime-work.component';
import { WorkEducationComponent } from './work-education/work-education.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CrimeEducationComponent,
    CrimeWorkComponent,
    WorkEducationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    AppRoutingModule
  ],
  providers: [
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrimeEducationComponent } from './crime-education/crime-education.component';
import { CrimeWorkComponent } from './crime-work/crime-work.component';
import { WorkEducationComponent } from './work-education/work-education.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'crime-education',
    component: CrimeEducationComponent
  },
  {
    path: 'crime-work',
    component: CrimeWorkComponent
  },
  {
    path: 'work-education',
    component: WorkEducationComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }

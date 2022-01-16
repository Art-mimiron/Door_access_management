import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonDetailsComponent } from './person-details/person-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'persons'
  },
  {
    path: 'persons',
    children: [
      {
        path: '',
        component: PersonListComponent
      },
      {
        path: ':personId',
        component: PersonDetailsComponent
      },
      {
        path: 'new',
        component: PersonDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

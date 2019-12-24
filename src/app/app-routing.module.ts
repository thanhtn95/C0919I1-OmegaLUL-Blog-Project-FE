import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';



const routes: Routes = [
  { path: 'blog',
    loadChildren: './blog/blog.module#BlogModule'
  }
];
@NgModule({
  // declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

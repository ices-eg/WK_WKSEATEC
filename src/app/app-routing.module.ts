import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GalleryComponent } from './gallery/gallery.component';


const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'gallery',component:GalleryComponent},
  {path:'',redirectTo:'/gallery',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

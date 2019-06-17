import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DraggableComponent } from './draggable/draggable.component';
import {AngularDraggableModule} from 'angular2-draggable';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DraggableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularDraggableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

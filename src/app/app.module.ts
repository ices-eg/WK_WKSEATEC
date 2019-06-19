import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DraggableComponent } from './draggable/draggable.component';
import {AngularDraggableModule} from 'angular2-draggable';
import {FormsModule} from '@angular/forms';
import { WidgetsComponent } from './widgets/widgets.component';
import { SafePipe } from './safepipe';
import { GalleryComponent } from './gallery/gallery.component';
import {FilterPipe} from './filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DraggableComponent,
    WidgetsComponent,
    SafePipe,
    GalleryComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularDraggableModule,
    FormsModule
  ],
  providers: [FilterPipe],
  bootstrap: [AppComponent],
  exports:[FilterPipe]
})
export class AppModule { }

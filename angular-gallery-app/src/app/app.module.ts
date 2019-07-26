import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DraggableComponent } from './draggable/draggable.component';
import {AngularDraggableModule} from 'angular2-draggable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WidgetsComponent } from './widgets/widgets.component';
import { SafePipe } from './safepipe';
import { GalleryComponent } from './gallery/gallery.component';
import {FilterPipe} from './filter.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormModalComponent} from './form-modal/form-modal.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DraggableComponent,
    WidgetsComponent,
    SafePipe,
    GalleryComponent,
    FilterPipe,
    FormModalComponent
   // HttpClientModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularDraggableModule,
    FormsModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FilterPipe],
  bootstrap: [AppComponent],
  exports:[FilterPipe],
  entryComponents:[FormModalComponent]
})
export class AppModule { }

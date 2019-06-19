import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Widget } from '../widget';
import { WidgetService } from '../widget.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  widgets: Widget[];
  constructor(private widgetService:WidgetService,router:Router) {
      
   }

  ngOnInit() {
    this.getWidgets();
  }

  getWidgets():void{
    this.widgetService.getWidgets()
    .subscribe(widgets=>this.widgets =widgets);
  }
}

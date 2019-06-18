import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../widget.service'
import { Widget } from '../widget';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {

  widgets: Widget[];
  

  constructor(private widgetService:WidgetService) { }

  ngOnInit() {
    this.getWidgets();
  }

  getWidgets():void{
    this.widgetService.getWidgets()
    .subscribe(widgets => this.widgets = widgets);
  }

  addWidget(widget:Widget):void{
    this.widgetService.addWidget(widget);
  }

}

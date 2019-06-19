import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../widget.service'
import { Widget } from '../widget';
import { Router } from '@angular/router';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {

  widgets: Widget[];
  myFilter:{};

  constructor(private widgetService:WidgetService,public router:Router) { }

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

  search(search:string):void{
    this.myFilter = {name:search};
  }

}

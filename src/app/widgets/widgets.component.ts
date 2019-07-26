import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../widget.service'
import { Widget } from '../widget';
import { Router } from '@angular/router';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {

  widgets: Widget[];
  myFilter: {};

  constructor(private widgetService: WidgetService, public router: Router) { }

  ngOnInit() {
    this.getWidgets();

  }

  //subscribe to widget services getWidgets method to retrieve saved widgets
  getWidgets(): void {
    this.widgetService.getSavedWidgets()
      .subscribe(widgets => this.widgets = widgets);
  }

  //add widgets to the view when a widgets add button is clicked
  addWidget(widget: Widget): void {
    this.widgetService.addViewWidget(widget);
  }

  //access the custom filter pipe for searching to filter the saved widgets list
  search(search: string): void {
    this.myFilter = { name: search };
  }

}

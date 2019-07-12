import { ViewChild, Component, OnInit, ElementRef, AfterViewInit } from '@angular/core'
import { WidgetService } from '../widget.service';
import { Widget } from '../widget';
import { Subscription } from 'rxjs';
import { Draggable } from '../Draggable';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {

  widgetViewList: Draggable[];
  private sub: Subscription;
  isFront: boolean;

  @ViewChild('dragBounds', { static: true }) dragBounds: ElementRef;
  constructor(private widgetService: WidgetService) { }


  ngOnInit() {
    this.widgetService.refreshNeeded.subscribe(() => {
      this.getWidgets();
    });
    this.getWidgets();
    this.isFront = false;
  }

  getWidgets() {
    this.sub = this.widgetService.getViewWidgets().subscribe((widgets) => {
      this.widgetViewList = widgets;
      console.log(this.widgetViewList);
    });
  }

  widgetClicked(widget, indx, ref: ElementRef): void {
    this.widgetViewList.forEach(e => {
      e.active = false;
    });
    widget.active = true;
  }

  onDimensionsChanged(event) {
    console.log(event);
  }

  downloadDashboard(){
    this.widgetService.postDashboard(this.widgetViewList).subscribe(dashboard=>{
      /* console.log(dashboard);
      saveAs(dashboard); */
      const blob = new Blob([dashboard],{
        type:'application/zip'
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    },err=>{
      alert('Problem downloading file');
      console.error(err);
    });
  }

}

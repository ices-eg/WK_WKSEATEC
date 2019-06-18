import {ViewChild, Component, OnInit, ElementRef } from '@angular/core'
import {WidgetService} from '../widget.service';
import { Widget } from '../widget';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {

  widgetList:Widget[];
  private sub:Subscription;
  
  @ViewChild('dragBounds',{static:true}) dragBounds:ElementRef;
  constructor(private widgetService:WidgetService) { }

  ngOnInit() {
    this.widgetService.refreshNeeded.subscribe(()=>{
      this.getWidgets();
    });
    this.getWidgets();
  }

  getWidgets(){
    this.sub = this.widgetService.getViewWidgets().subscribe(widgets=>this.widgetList=widgets);
    console.log(this.widgetList);
  }

}

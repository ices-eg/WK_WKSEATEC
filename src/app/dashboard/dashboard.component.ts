import {ViewChild, Component, OnInit, ElementRef, AfterViewInit } from '@angular/core'
import {WidgetService} from '../widget.service';
import { Widget } from '../widget';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit{

  widgetList:Widget[];
  private sub:Subscription;
  isFront:boolean;
  
  @ViewChild('dragBounds',{static:true}) dragBounds:ElementRef;
  constructor(private widgetService:WidgetService) { }


  ngOnInit() {
    this.widgetService.refreshNeeded.subscribe(()=>{
      this.getWidgets();
    });
    this.getWidgets();
    this.isFront=false;
  }

  getWidgets(){
    this.sub = this.widgetService.getViewWidgets().subscribe((widgets)=>{
      this.widgetList=widgets;
      console.log(this.widgetList); 
    });
  }

  widgetClicked(widget,indx,ref:ElementRef):void{
    
    this.widgetList.forEach(e => {
      e.active = false; 
    });
    widget.active = true;
    console.log(widget);
  }

  onNotify(event){
    console.log(event);
  }

}

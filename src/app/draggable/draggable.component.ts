import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { WidgetService } from '../widget.service';


declare const require:any;

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.css']
})

export class DraggableComponent implements OnInit {
@Input('source') urlSource:string;
@Input('index') idx:number;
@Input('boundsRegion') boundsArea:ElementRef;

  

  constructor(private widgetService:WidgetService) { }

  ngOnInit() {
    console.log(this.boundsArea);
  }

  getURL(){
    
  }

  remove():void{
    this.widgetService.removeWidget(this.idx);
  }
  
}

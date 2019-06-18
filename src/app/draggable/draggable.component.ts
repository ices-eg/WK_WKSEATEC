import { Component, OnInit, Input, ElementRef } from '@angular/core';


declare const require:any;

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.css']
})

export class DraggableComponent implements OnInit {
@Input('source') urlSource:string;
@Input('boundsRegion') boundsArea:ElementRef;

  

  constructor() { }

  ngOnInit() {
    console.log(this.boundsArea);
  }

  getURL(){
    
  }

  
}

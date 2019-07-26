import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { WidgetService } from '../widget.service';
import { Draggable } from '../Draggable';

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.css']
})

export class DraggableComponent implements OnInit, AfterViewInit {
  private urlSource: string;

  @Input('draggable') draggable: Draggable;
  @Input('idx') idx: number;
  @Input('boundsRegion') boundsArea: ElementRef;
  @Output() notify: EventEmitter<Draggable> = new EventEmitter<Draggable>();

  @ViewChild('draggable', { static: false }) element: ElementRef;

  //initialise the size and position variables for this draggable component
  public width:number = 400;
  public height:number = 400;
  public offsetLeft:number;
  public offsetTop:number;

  constructor(private widgetService: WidgetService) { }

  //on init, set up our necessary values and keep track of widgets position etc so we can access them when we download
  ngOnInit() {
    console.log("Init Draggable: "+this.draggable)
    this.urlSource = this.draggable.widget.widgetURL;
    this.width = this.draggable.sizeX;
    this.height = this.draggable.sizeY;
    this.offsetLeft = this.draggable.offsetLeft;
    this.offsetTop = this.draggable.offsetTop;
    //alert the dashboard parent component that the draggable is ready
    this.notify.emit(this.draggable);
  }

//remove this draggable from the view
  remove(): void {
    console.log(this.idx);
    this.widgetService.removeViewWidget(this.idx);
  }

  //after the view has initialised
  ngAfterViewInit() {
    //check if we are loading a dashboard or a normal widget
    if(this.draggable.idx < 0) {
      //if so, assign the draggables initial values
      this.draggable.offsetLeft = this.element.nativeElement.offsetLeft;
      this.draggable.offsetTop = this.element.nativeElement.offsetTop;
      this.draggable.sizeX = 400;
      this.draggable.sizeY = 400;
      this.draggable.idx = this.idx;

    }
    this.notify.emit(this.draggable);
  }
  //when the drag event has ended, update the values
  onDragEnd(event) {
    this.draggable.offsetLeft = event.x;
    this.draggable.offsetTop = event.y;
    this.notify.emit(this.draggable);
  }

  //when the resizing event has ended, update the values
  onSizeEnd(event) {
    this.draggable.sizeX = event.size.width;
    this.draggable.sizeY = event.size.height;
    this.notify.emit(this.draggable);
  }

  onLoadFrame(iFrame) {
    console.log((iFrame.contentWindow || iFrame.contentDocument))
  }

  oniFrameError(event) {
    console.log(event);
  }
}

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

  public width:number;
  public height:number;
  public offsetLeft:number;
  public offsetTop:number;

  constructor(private widgetService: WidgetService) { }

  ngOnInit() {
    console.log("Init Draggable: "+this.draggable)
    this.urlSource = this.draggable.widget.widgetURL;
    this.width = this.draggable.sizeX;
    this.height = this.draggable.sizeY;
    this.offsetLeft = this.draggable.offsetLeft;
    this.offsetTop = this.draggable.offsetTop;
  }

  getURL() {

  }

  remove(): void {
    console.log(this.idx);
    this.widgetService.removeViewWidget(this.idx);
  }

  ngAfterViewInit() {
    if(this.draggable.idx < 0) {
      console.log("Only run online")
      this.draggable.offsetLeft = this.element.nativeElement.offsetLeft;
      this.draggable.offsetTop = this.element.nativeElement.offsetTop;
      this.draggable.sizeX = 400;
      this.draggable.sizeY = 400;
      this.draggable.idx = this.idx;

    }
    this.notify.emit(this.draggable);
  }
  onDragEnd(event) {
    this.draggable.offsetLeft = event.x;
    this.draggable.offsetTop = event.y;
    this.notify.emit(this.draggable);
  }

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

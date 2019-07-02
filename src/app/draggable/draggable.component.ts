import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { WidgetService } from '../widget.service';
import { Draggable } from '../Draggable';

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.css']
})

export class DraggableComponent implements OnInit, AfterViewInit {
  @Input('source') urlSource: string;
  @Input('id') id: number;
  @Input('idx') idx: number;
  @Input('boundsRegion') boundsArea: ElementRef;
  @Output() notify: EventEmitter<Draggable> = new EventEmitter<Draggable>();

  @ViewChild('draggable', { static: false }) element: ElementRef;

  dragValues = new Draggable;

  constructor(private widgetService: WidgetService) { }

  ngOnInit() {
  }

  getURL() {

  }

  remove(): void {
    console.log(this.idx);
    this.widgetService.removeViewWidget(this.idx);
  }

  ngAfterViewInit() {
    this.dragValues.offsetLeft = this.element.nativeElement.offsetLeft;
    this.dragValues.offsetTop = this.element.nativeElement.offsetTop;
    this.dragValues.sizeX = 400;
    this.dragValues.sizeY = 400;
    this.dragValues.id = this.id;
    this.dragValues.idx = this.idx;
    this.notify.emit(this.dragValues);
  }
  onDragEnd(event) {
    this.dragValues.offsetLeft = event.x;
    this.dragValues.offsetTop = event.y;
    this.notify.emit(this.dragValues);
  }

  onSizeEnd(event) {
    this.dragValues.sizeX = event.size.height;
    this.dragValues.sizeY = event.size.width;
    this.notify.emit(this.dragValues);
  }
}

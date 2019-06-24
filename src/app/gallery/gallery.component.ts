import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Widget } from '../widget';
import { WidgetService } from '../widget.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormModalComponent} from '../form-modal/form-modal.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  widgets: Widget[];
  constructor(private widgetService:WidgetService,router:Router,private modalService:NgbModal) {
      
   }

  ngOnInit() {
    this.getWidgets();
  }

  getWidgets():void{
    this.widgetService.getWidgets()
    .subscribe(widgets=>this.widgets =widgets);
  }

  openFormModal(){
    const modalRef = this.modalService.open(FormModalComponent,{size:'lg'});

    modalRef.result.then((result)=>{
      console.log(result);
    }).catch((error)=>{
      console.log(error);
    });
  }

  saveWidget(widget:Widget){
    console.log("Clicked");
    this.widgetService.saveWidget(widget)
    .subscribe();
  }
}

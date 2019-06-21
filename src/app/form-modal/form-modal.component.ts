import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WidgetService } from '../widget.service';
import { Widget } from '../widget';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  myForm:FormGroup;

  constructor(public activeModal:NgbActiveModal,private formBuilder:FormBuilder,private widgetService:WidgetService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  closeModal(){
    this.activeModal.close('Modal Closed');
  }

   createForm(){
    this.myForm = this.formBuilder.group({
      name:'',
      docker:'',
      github:'',
      author:''
    });
  }

   submitForm():void{
    //TODO post form to server
    var widget = new Widget(this.myForm.value);
    //console.log(widget);
    this.widgetService.postWidget(widget).subscribe(widget=> console.log(widget));
    this.activeModal.close(this.myForm.value);
  }

}

import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from './form-modal/form-modal.component';
import { resource } from 'selenium-webdriver/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-web-gallery';

  sidebarWidth:number;
  isHidden:boolean;
  currRoute:string;
  loadComponent:boolean;

  constructor(private router:Router, private modalService:NgbModal){
    this.sidebarWidth= 0;
    this.isHidden=true;
    this.currRoute = router.url;
    this.loadComponent=false;
  }

  //handle animmation of sidebar tray
  myGallery():void{
    this.currRoute=this.router.url;
    if(this.isHidden){
      this.sidebarWidth =25;
      this.isHidden=false;
      this.loadComponent=true;
    }
    else{
      this.sidebarWidth=0;
      this.isHidden=true;
      this.loadComponent=false;
    }
    console.log(this.currRoute);
  }

  
}

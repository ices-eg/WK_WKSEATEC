import { Component } from '@angular/core';
import {Router} from '@angular/router';

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

  constructor(private router:Router){
    this.sidebarWidth= 0;
    this.isHidden=true;
    this.currRoute = router.url;
  }

  myGallery():void{
    if(this.isHidden){
      this.sidebarWidth =25;
      this.isHidden=false;
    }
    else{
      this.sidebarWidth=0;
      this.isHidden=true;
    }
  }
}

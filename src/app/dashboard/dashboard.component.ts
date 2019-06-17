import {ViewChild, Component, OnInit, ElementRef } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  
  @ViewChild('dragBounds',{static:true}) dragBounds:ElementRef;
  constructor() { }

  ngOnInit() {
    
  }

}

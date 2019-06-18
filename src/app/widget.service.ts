import { Injectable } from '@angular/core';
import {Widget} from './widget';
import {WIDGETS} from './mock-widgets';
import { Observable,of, Subject, BehaviorSubject, Subscription} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  private _refreshNeeded = new Subject<void>();

  private viewList:Widget[];

  get refreshNeeded(){
    return this._refreshNeeded;
  }

  constructor() {
    this.viewList=[];
   }

  getWidgets(): Observable<Widget[]>{
    return of(WIDGETS);
  }

  public addWidget(item:Widget){
    this.viewList.push(item);
    this.refreshNeeded.next();
  }

  public removeWidget(index:number){
    this.viewList.splice(index,1);
    this.refreshNeeded.next();
  }

  public getViewWidgets():Observable<Widget[]>{
    return of(this.viewList);
  }
}

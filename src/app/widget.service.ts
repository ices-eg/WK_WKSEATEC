import { Injectable } from '@angular/core';
import {Widget} from './widget';
import {WIDGETS} from './mock-widgets';
import { Observable,of, Subject, BehaviorSubject, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError,map,tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    
  })
};

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  private _refreshNeeded = new Subject<void>();

  private viewList:Widget[];

  private baseURL = 'http://localhost:3000/';
  private widgetsURL = 'get-widgets';
  private postURL = 'post-widget';
  private saveWidgetURL = 'save-widget';
  private getSavedWidgetsURL = 'get-saved-widgets';
  private saveDashURL = 'save-dashboard';
  private loadDashURL = 'load-dashboard';
  private downloadDashURL = 'download-dashboard';

  get refreshNeeded(){
    return this._refreshNeeded;
  }

  constructor( private http:HttpClient) {
    this.viewList=[];
   }

  getWidgets(): Observable<Widget[]>{
    //return of(WIDGETS);
    console.log(this.baseURL+this.getWidgets);
    return this.http.get<Widget[]>('http://localhost:3000/get-widgets',httpOptions)
    .pipe(catchError(this.handleError<Widget[]>('getWidgets',[])));
  }

   postWidget(widget:Widget):Observable<Widget>{
     console.log(widget);
    return this.http.post<Widget>('http://localhost:3000/post-widget',widget,httpOptions)
    .pipe(
      tap(_=>console.log('posted')),
      catchError(this.handleError('postWidget',widget))
    );
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

  private handleError<T>(operation = 'operation',result?:T){
    return(error:any):Observable<T>=>{
      console.log(error);

      console.log('$(operation) failed: $(error.message)');

      return of(result as T);
    }
  }
}

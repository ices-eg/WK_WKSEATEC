import { Injectable } from '@angular/core';
import {Widget} from './widget';
import {WIDGETS} from './mock-widgets';
import { Observable,of, Subject, BehaviorSubject, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError,map,tap} from 'rxjs/operators';
import { Draggable } from './Draggable';

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

  //private viewList:Widget[];

  private viewList:Draggable[];

  private baseURL = 'express:3000/';

  get refreshNeeded(){
    return this._refreshNeeded;
  }

  constructor( private http:HttpClient) {
    this.viewList=[];
   }

  getWidgets(): Observable<Widget[]>{
    //return of(WIDGETS);
    console.log(this.baseURL+this.getWidgets);
    return this.http.get<Widget[]>('/api/get-widgets',httpOptions)
    .pipe(
      tap(_=>console.log("got widgets")),
      catchError(this.handleError<Widget[]>('getWidgets',[])));
  }

   postWidget(widget:Widget):Observable<Widget>{
     console.log(widget);
    return this.http.post<Widget>('/api/post-widget',widget,httpOptions)
    .pipe(
      tap(_=>console.log('posted')),
      catchError(this.handleError('postWidget',widget))
    );
  }

  public saveWidget(item:Widget):Observable<Widget>{
    return this.http.post<any>('/api/save-widget',item,httpOptions)
    .pipe(
      tap(_=>console.log("posted")),
      catchError(this.handleError('saveWidget',item))
    );
  }
  
  public getSavedWidgets():Observable<Widget[]>{
    return this.http.get<Widget[]>('/api/get-saved-widgets',httpOptions)
    .pipe(
      tap(_=>console.log("got saved widgets")),
      catchError(this.handleError<Widget[]>('getSavedWidgets',[]))
    );
  }

  public addViewWidget(item:Widget){
    return this.http.get<any>('/api/get-widget-url/',{params:{name:item.docker},headers:httpOptions.headers})
    .subscribe((res)=>{
     // var url = 'http://localhost:'+res;
     var url = res.url;
      let returnWidget = new Widget({name:item.name,author:item.author,github:item.github,docker:item.docker,widgetURL:url,id:item.id});
      let returnDraggable = new Draggable({offsetLeft:0,offsetTop:0,sizeX:400,sizeY:400,widget:returnWidget});

      this.viewList.push(returnDraggable);
      this.refreshNeeded.next();
    });
  }

  public removeViewWidget(index:number){
    this.viewList.splice(index,1);
    this.refreshNeeded.next();
  }

  public getViewWidgets():Observable<Draggable[]>{
    return of(this.viewList);
  }

  public postDashboard(dashboard:Draggable[]){
    return this.http.post<Draggable[]>('/api/save-dashboard',dashboard,httpOptions)
    .pipe(
      tap(_=>console.log("Dashboard posted")),
      catchError(this.handleError('postDashboard',dashboard))
    );
  }

  private handleError<T>(operation = 'operation',result?:T){
    return(error:any):Observable<T>=>{
      console.log(error);

      console.log('$(operation) failed: $(error.message)');

      return of(result as T);
    }
  }
}

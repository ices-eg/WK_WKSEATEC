import { Injectable } from '@angular/core';
import {Widget} from './widget';
import {WIDGETS} from './mock-widgets';
import { Observable,of, Subject, BehaviorSubject, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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

  //subject to alert our subscribers when they need to refresh
  private _refreshNeeded = new Subject<void>();

  private viewList:Draggable[];

  private baseURL = 'express:3000/';

  get refreshNeeded(){
    return this._refreshNeeded;
  }

  constructor( private http:HttpClient) {
      this.viewList = [];
      this.loadDashboard();
   }

  //retrieve all widgets from server
  getWidgets(): Observable<Widget[]>{
    return this.http.get<Widget[]>('/api/get-widgets',httpOptions)
    .pipe(
      tap(_=>console.log("got widgets")),
      catchError(this.handleError<Widget[]>('getWidgets',[])));
  }

  //post widget to server
   postWidget(widget:Widget):Observable<Widget>{
     console.log(widget);
    return this.http.post<Widget>('/api/post-widget',widget,httpOptions)
    .pipe(
      tap(_=>console.log('posted')),
      catchError(this.handleError('postWidget',widget))
    );
  }

  //save widget to users widget tray(users are not yet implemented)
  public saveWidget(item:Widget):Observable<Widget>{
    return this.http.post<any>('/api/save-widget',item,httpOptions)
    .pipe(
      tap(_=>console.log("posted")),
      catchError(this.handleError('saveWidget',item))
    );
  }
  
  //returns users saved widgets.
  public getSavedWidgets():Observable<Widget[]>{
    return this.http.get<Widget[]>('/api/get-saved-widgets',httpOptions)
    .pipe(
      tap(_=>console.log("got saved widgets")),
      catchError(this.handleError<Widget[]>('getSavedWidgets',[]))
    );
  }

  //request the url for the widget passed in as an argument, once received, insert the widget into a Draggable object and push to the view array
  public addViewWidget(item:Widget){
    return this.http.get<any>('/api/get-widget-url/',{params:{name:item.docker},headers:httpOptions.headers})
    .subscribe((res)=>{
     var url = res.url;
      let returnWidget = new Widget({name:item.name,author:item.author,github:item.github,docker:item.docker,widgetURL:url,id:item.id});
      let returnDraggable = new Draggable({offsetLeft:0,offsetTop:0,sizeX:400,sizeY:400,widget:returnWidget});

      this.viewList.push(returnDraggable);
      this.refreshNeeded.next();
    });
  }

  //remove widget from view array
  public removeViewWidget(index:number){
    this.viewList.splice(index,1);
    this.refreshNeeded.next();
  }

  //return an Observable to our view widgets
  public getViewWidgets():Observable<Draggable[]>{
    return of(this.viewList);
  }

  //download the current dashboard, we post the dashboard data to the server and retrieve a zip with all required files to run offline
  public postDashboard(dashboard:Draggable[]):Observable<any>{
    return this.http.post('/api/save-dashboard',dashboard,{responseType:'arraybuffer', headers:new HttpHeaders().append("Content-Type","application/json")})
    .pipe(
      tap(_=>console.log("Dashboard posted")),
      catchError(this.handleError('postDashboard',dashboard))
    );
  }

  //for when running offline, we load in all the widgets located in the downloaded JSON file to the view array
  public loadDashboard():void{
    this.http.get<Draggable[]>('/api/load-dashboard',httpOptions)
    .pipe(
      tap(_=>console.log("Loaded Dashboard")),
      catchError(this.handleError<Draggable[]>('loadDashboard',[]))
    ).subscribe(draggables=>{
      console.log(draggables);
        this.viewList = draggables;
        this.refreshNeeded.next();
    });
    
  }
//Generic error handling
  private handleError<T>(operation = 'operation',result?:T){
    return(error:any):Observable<T>=>{
      console.log(error);

      console.log('$(operation) failed: $(error.message)');

      return of(result as T);
    }
  }
}

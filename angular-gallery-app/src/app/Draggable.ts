import { Widget } from './widget';

export class Draggable{
    offsetLeft:number;
    offsetTop:number;
    sizeX:number;
    sizeY:number;
    widget:Widget;
    idx?:number;
    active?:boolean;

    constructor(data:any){
        this.offsetLeft = data.offsetLeft;
        this.offsetTop = data.offsetTop;
        this.sizeX = data.sizeX;
        this.sizeY = data.sizeY;
        this.widget = data.widget;
    }
}